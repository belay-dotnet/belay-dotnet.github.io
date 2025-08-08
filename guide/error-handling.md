# Error Handling

Belay.NET provides comprehensive error handling to help you build robust IoT applications. Learn how to handle device connection issues, execution errors, and implement proper error recovery patterns.

## Exception Hierarchy

Belay.NET uses a structured exception hierarchy derived from `BelayException`:

```csharp
BelayException
├── DeviceConnectionException      // Connection and communication failures
├── DeviceExecutionException       // Python code execution errors  
├── DeviceTimeoutException         // Operation timeout errors
├── DeviceConfigurationException   // Configuration and setup errors
└── DeviceStateException          // Invalid device state errors
```

## Connection Error Handling

Handle device connection failures gracefully:

```csharp
using Belay.Core;
using Belay.Core.Communication;
using Belay.Core.Exceptions;

public async Task<bool> TryConnectAsync(string port)
{
    try
    {
        using var device = new Device(new SerialDeviceCommunication(port));
        await device.StartAsync();
        
        Console.WriteLine($"✅ Connected to device on {port}");
        return true;
    }
    catch (DeviceConnectionException ex)
    {
        Console.WriteLine($"❌ Connection failed: {ex.Message}");
        
        // Check specific connection failure reasons
        switch (ex.Reason)
        {
            case ConnectionFailureReason.PortNotFound:
                Console.WriteLine($"💡 Port {port} not found. Available ports:");
                foreach (var availablePort in SerialPort.GetPortNames())
                    Console.WriteLine($"   - {availablePort}");
                break;
                
            case ConnectionFailureReason.PortInUse:
                Console.WriteLine("💡 Port is already in use by another application");
                break;
                
            case ConnectionFailureReason.AccessDenied:
                Console.WriteLine("💡 Access denied. Try running as administrator or check permissions");
                break;
                
            case ConnectionFailureReason.DeviceNotResponding:
                Console.WriteLine("💡 Device not responding. Check firmware and USB connection");
                break;
        }
        
        return false;
    }
}
```

## Execution Error Handling

Handle Python code execution errors with detailed context:

```csharp
public async Task<float> ReadSensorWithErrorHandlingAsync()
{
    try
    {
        return await _device.ExecuteAsync<float>(@"
# This might fail if sensor is not connected
sensor_value = adc.read_u16()
if sensor_value == 0:
    raise ValueError('Sensor not connected')
temperature = sensor_value * 3.3 / 65536 * 100
temperature
");
    }
    catch (DeviceExecutionException ex)
    {
        Console.WriteLine($"❌ Python execution error: {ex.Message}");
        Console.WriteLine($"🐍 Exception type: {ex.PythonExceptionType}");
        Console.WriteLine($"📍 Line number: {ex.LineNumber}");
        Console.WriteLine($"📋 Traceback:\n{ex.PythonTraceback}");
        
        // Handle specific Python exception types
        switch (ex.PythonExceptionType)
        {
            case "ValueError":
                Console.WriteLine("💡 Check sensor connections and wiring");
                return float.NaN; // Return sentinel value
                
            case "AttributeError":
                Console.WriteLine("💡 Check that required modules are imported");
                throw; // Re-throw as this is a code error
                
            case "OSError":
                Console.WriteLine("💡 Hardware error - check device connections");
                return float.NaN;
                
            default:
                Console.WriteLine("💡 Unexpected error - check Python code");
                throw; // Re-throw unknown errors
        }
    }
}
```

## Timeout Handling

Handle operation timeouts with retry logic:

```csharp
public async Task<T> ExecuteWithRetryAsync<T>(string code, int maxAttempts = 3, TimeSpan? timeout = null)
{
    var actualTimeout = timeout ?? TimeSpan.FromSeconds(30);
    
    for (int attempt = 1; attempt <= maxAttempts; attempt++)
    {
        try
        {
            using var cts = new CancellationTokenSource(actualTimeout);
            return await _device.ExecuteAsync<T>(code, cts.Token);
        }
        catch (DeviceTimeoutException ex) when (attempt < maxAttempts)
        {
            Console.WriteLine($"⏱️ Timeout on attempt {attempt}/{maxAttempts}: {ex.Message}");
            Console.WriteLine($"🔄 Retrying in {attempt * 1000}ms...");
            
            await Task.Delay(attempt * 1000); // Exponential backoff
        }
        catch (DeviceTimeoutException ex) when (attempt == maxAttempts)
        {
            Console.WriteLine($"❌ All {maxAttempts} attempts timed out");
            throw new DeviceExecutionException(
                $"Operation failed after {maxAttempts} attempts", ex);
        }
    }
    
    throw new InvalidOperationException("This should never be reached");
}
```

## State Management Errors

Handle device state errors with automatic recovery:

```csharp
public class ResilientDevice : IDisposable
{
    private Device _device;
    private readonly string _port;
    private volatile bool _isConnected;

    public ResilientDevice(string port)
    {
        _port = port;
    }

    public async Task<T> ExecuteAsync<T>(string code)
    {
        const int maxReconnectAttempts = 3;
        
        for (int attempt = 1; attempt <= maxReconnectAttempts; attempt++)
        {
            try
            {
                await EnsureConnectedAsync();
                return await _device.ExecuteAsync<T>(code);
            }
            catch (DeviceStateException ex) when (attempt < maxReconnectAttempts)
            {
                Console.WriteLine($"🔄 Device state error, reconnecting (attempt {attempt}/{maxReconnectAttempts}): {ex.Message}");
                
                // Force reconnection
                await DisconnectAsync();
                await Task.Delay(1000 * attempt); // Progressive delay
            }
        }
        
        throw new DeviceExecutionException($"Failed to execute after {maxReconnectAttempts} reconnection attempts");
    }

    private async Task EnsureConnectedAsync()
    {
        if (_device == null || !_isConnected)
        {
            await ConnectAsync();
        }
    }

    private async Task ConnectAsync()
    {
        try
        {
            _device?.Dispose();
            _device = new Device(new SerialDeviceCommunication(_port));
            await _device.StartAsync();
            _isConnected = true;
            Console.WriteLine("✅ Device connected successfully");
        }
        catch (Exception)
        {
            _isConnected = false;
            throw;
        }
    }

    private async Task DisconnectAsync()
    {
        if (_device != null)
        {
            try
            {
                await _device.StopAsync();
            }
            catch
            {
                // Ignore errors during disconnection
            }
            finally
            {
                _device.Dispose();
                _device = null;
                _isConnected = false;
            }
        }
    }

    public void Dispose()
    {
        DisconnectAsync().GetAwaiter().GetResult();
    }
}
```

## Global Error Handling

Implement application-wide error handling:

```csharp
public class DeviceErrorHandler
{
    private readonly ILogger<DeviceErrorHandler> _logger;
    private readonly IDeviceHealthMonitor _healthMonitor;
    
    public DeviceErrorHandler(ILogger<DeviceErrorHandler> logger, IDeviceHealthMonitor healthMonitor)
    {
        _logger = logger;
        _healthMonitor = healthMonitor;
    }
    
    public async Task<ExecutionResult<T>> SafeExecuteAsync<T>(
        Device device, 
        string code, 
        string operationName = "Unknown")
    {
        try
        {
            var result = await device.ExecuteAsync<T>(code);
            
            _logger.LogInformation("Operation {OperationName} completed successfully", operationName);
            await _healthMonitor.RecordSuccessAsync(device.Id, operationName);
            
            return ExecutionResult<T>.Success(result);
        }
        catch (DeviceConnectionException ex)
        {
            _logger.LogError(ex, "Connection error during {OperationName}", operationName);
            await _healthMonitor.RecordFailureAsync(device.Id, operationName, ex);
            
            return ExecutionResult<T>.Failure($"Connection error: {ex.Message}");
        }
        catch (DeviceExecutionException ex)
        {
            _logger.LogError(ex, "Execution error during {OperationName}: {PythonException} at line {LineNumber}", 
                operationName, ex.PythonExceptionType, ex.LineNumber);
            await _healthMonitor.RecordFailureAsync(device.Id, operationName, ex);
            
            return ExecutionResult<T>.Failure($"Execution error: {ex.Message}");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unexpected error during {OperationName}", operationName);
            await _healthMonitor.RecordFailureAsync(device.Id, operationName, ex);
            
            return ExecutionResult<T>.Failure($"Unexpected error: {ex.Message}");
        }
    }
}

public class ExecutionResult<T>
{
    public bool Success { get; }
    public T? Value { get; }
    public string? ErrorMessage { get; }
    
    private ExecutionResult(bool success, T? value, string? errorMessage)
    {
        Success = success;
        Value = value;
        ErrorMessage = errorMessage;
    }
    
    public static ExecutionResult<T> Success(T value) => new(true, value, null);
    public static ExecutionResult<T> Failure(string errorMessage) => new(false, default, errorMessage);
}
```

## Error Recovery Patterns

### Circuit Breaker Pattern

Prevent cascade failures with circuit breaker:

```csharp
public class DeviceCircuitBreaker
{
    private readonly int _failureThreshold;
    private readonly TimeSpan _timeout;
    private int _failureCount;
    private DateTime _nextAttempt = DateTime.MinValue;
    private CircuitState _state = CircuitState.Closed;

    public async Task<T> ExecuteAsync<T>(Func<Task<T>> operation)
    {
        if (_state == CircuitState.Open)
        {
            if (DateTime.UtcNow < _nextAttempt)
                throw new DeviceStateException("Circuit breaker is open");
                
            _state = CircuitState.HalfOpen;
        }

        try
        {
            var result = await operation();
            OnSuccess();
            return result;
        }
        catch (Exception)
        {
            OnFailure();
            throw;
        }
    }

    private void OnSuccess()
    {
        _failureCount = 0;
        _state = CircuitState.Closed;
    }

    private void OnFailure()
    {
        _failureCount++;
        if (_failureCount >= _failureThreshold)
        {
            _state = CircuitState.Open;
            _nextAttempt = DateTime.UtcNow.Add(_timeout);
        }
    }
}

enum CircuitState { Closed, Open, HalfOpen }
```

### Bulkhead Pattern

Isolate failures between different device operations:

```csharp
public class DeviceOperationIsolator
{
    private readonly SemaphoreSlim _sensorSemaphore = new(3); // Max 3 concurrent sensor operations
    private readonly SemaphoreSlim _actuatorSemaphore = new(2); // Max 2 concurrent actuator operations

    public async Task<T> ExecuteSensorOperationAsync<T>(Func<Task<T>> operation)
    {
        await _sensorSemaphore.WaitAsync();
        try
        {
            return await operation();
        }
        finally
        {
            _sensorSemaphore.Release();
        }
    }

    public async Task ExecuteActuatorOperationAsync(Func<Task> operation)
    {
        await _actuatorSemaphore.WaitAsync();
        try
        {
            await operation();
        }
        finally
        {
            _actuatorSemaphore.Release();
        }
    }
}
```

## Testing Error Scenarios

Write tests for error conditions:

```csharp
[TestMethod]
public async Task Device_WhenPythonRaisesException_ShouldThrowDeviceExecutionException()
{
    // Arrange
    using var device = await Device.ConnectAsync("COM3");
    
    // Act & Assert
    var ex = await Assert.ThrowsExceptionAsync<DeviceExecutionException>(async () =>
    {
        await device.ExecuteAsync("raise ValueError('Test error')");
    });
    
    Assert.AreEqual("ValueError", ex.PythonExceptionType);
    Assert.IsTrue(ex.Message.Contains("Test error"));
}

[TestMethod]
public async Task Device_WhenConnectionLost_ShouldThrowDeviceConnectionException()
{
    // Arrange
    var mockCommunication = new Mock<IDeviceCommunication>();
    mockCommunication.Setup(c => c.SendAsync(It.IsAny<string>(), It.IsAny<CancellationToken>()))
                    .ThrowsAsync(new InvalidOperationException("Connection lost"));
    
    using var device = new Device(mockCommunication.Object);
    
    // Act & Assert
    await Assert.ThrowsExceptionAsync<DeviceConnectionException>(async () =>
    {
        await device.ExecuteAsync("print('test')");
    });
}
```

## Best Practices

### 1. Always Use Using Statements
```csharp
// ✅ Good - Ensures proper cleanup
using var device = new Device(communication);
await device.StartAsync();

// ❌ Bad - May leak resources
var device = new Device(communication);
await device.StartAsync();
// Missing disposal
```

### 2. Handle Specific Exception Types
```csharp
// ✅ Good - Specific error handling
catch (DeviceConnectionException ex)
{
    // Handle connection issues
}
catch (DeviceExecutionException ex)
{
    // Handle Python execution errors
}

// ❌ Bad - Generic error handling
catch (Exception ex)
{
    // Can't provide specific guidance to user
}
```

### 3. Log Errors with Context
```csharp
// ✅ Good - Structured logging with context
_logger.LogError(ex, "Failed to read sensor {SensorType} on device {DeviceId}", 
    sensorType, deviceId);

// ❌ Bad - Generic error message
_logger.LogError(ex, "Error occurred");
```

### 4. Implement Graceful Degradation
```csharp
public async Task<SensorReading> ReadSensorAsync()
{
    try
    {
        var value = await _device.ExecuteAsync<float>("sensor.read()");
        return new SensorReading(value, DateTime.UtcNow, SensorStatus.Normal);
    }
    catch (DeviceExecutionException)
    {
        // Graceful degradation - return stale data or estimated value
        return new SensorReading(float.NaN, DateTime.UtcNow, SensorStatus.Error);
    }
}
```

## Monitoring and Alerting

Integrate with monitoring systems:

```csharp
public class DeviceErrorReporter
{
    private readonly IMetrics _metrics;
    private readonly IAlertingService _alerting;
    
    public async Task ReportErrorAsync(Device device, Exception error)
    {
        // Record metrics
        _metrics.Counter("device_errors_total")
               .WithTag("device_id", device.Id)
               .WithTag("error_type", error.GetType().Name)
               .Increment();
        
        // Send alerts for critical errors
        if (error is DeviceConnectionException && IsCriticalDevice(device))
        {
            await _alerting.SendAlertAsync(new Alert
            {
                Severity = AlertSeverity.Critical,
                Message = $"Critical device {device.Id} connection lost",
                Device = device.Id,
                Timestamp = DateTime.UtcNow
            });
        }
    }
}
```

## Summary

Effective error handling in Belay.NET involves:

- **Structured Exceptions**: Use the exception hierarchy for specific error types
- **Connection Resilience**: Handle connection failures with retry and reconnection logic
- **Execution Errors**: Parse Python errors and provide meaningful feedback
- **Recovery Patterns**: Implement circuit breakers and bulkheads for fault tolerance
- **Monitoring**: Track errors and alert on critical failures
- **Testing**: Write tests for error scenarios to ensure robust applications

Next: Learn about [Session Management](/guide/session-management) for advanced device lifecycle handling.