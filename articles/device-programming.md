# Device Programming Guide

This comprehensive guide covers advanced device programming patterns with Belay.NET, focusing on session management, resource tracking, and production-ready patterns.

## Core Concepts

### Device Sessions

A device session in Belay.NET represents the complete lifecycle of device communication:

- **Session Creation**: Initialize communication and detect device capabilities
- **Resource Tracking**: Monitor deployed methods, background threads, and session resources
- **Lifecycle Management**: Handle connection states, errors, and cleanup
- **Performance Profiling**: Analyze device performance characteristics

### Session Management Architecture

The session management system consists of several key components:

- **DeviceSessionManager**: Central coordinator for all device sessions
- **DeviceCapabilities**: Detects and tracks device features and performance
- **ResourceTracker**: Manages session resources and prevents memory leaks
- **FileSystemContext**: Provides file system state and caching capabilities

## Session Management Examples

### Basic Session Usage

```csharp
using Belay.Core.Sessions;
using Microsoft.Extensions.Logging;

public class IoTDeviceController
{
    private readonly IDeviceSessionManager _sessionManager;
    private readonly ILogger<IoTDeviceController> _logger;

    public IoTDeviceController(ILoggerFactory loggerFactory)
    {
        _sessionManager = new DeviceSessionManager(loggerFactory);
        _logger = loggerFactory.CreateLogger<IoTDeviceController>();
    }

    public async Task<DeviceInfo> InitializeDeviceAsync(IDeviceCommunication communication)
    {
        // Create a managed session
        var session = await _sessionManager.CreateSessionAsync(communication);
        
        _logger.LogInformation("Session {SessionId} created", session.SessionId);
        
        // Device capabilities are automatically detected
        if (_sessionManager.Capabilities != null)
        {
            _logger.LogInformation("Device type: {DeviceType}", 
                _sessionManager.Capabilities.DeviceType);
            _logger.LogInformation("Supported features: {Features}", 
                _sessionManager.Capabilities.SupportedFeatures);
        }

        // Execute initialization within session context
        return await _sessionManager.ExecuteInSessionAsync(communication, async session =>
        {
            await communication.ExecuteAsync(@"
from machine import Pin, Timer, ADC, PWM
import time
import gc

# Hardware initialization
led = Pin(25, Pin.OUT)
sensor = ADC(Pin(26))
motor = PWM(Pin(16))
motor.freq(1000)

# System status
print(f'Free memory: {gc.mem_free()} bytes')
print('Hardware initialized successfully')
");

            // Get device information
            var deviceInfo = await communication.ExecuteAsync<Dictionary<string, object>>(@"
{
    'platform': sys.platform,
    'version': sys.version,
    'memory_free': gc.mem_free(),
    'unique_id': ubinascii.hexlify(machine.unique_id()).decode()
}");

            return new DeviceInfo
            {
                Platform = deviceInfo["platform"].ToString(),
                Version = deviceInfo["version"].ToString(),
                MemoryFree = Convert.ToInt32(deviceInfo["memory_free"]),
                UniqueId = deviceInfo["unique_id"].ToString()
            };
        });
    }
}

    [Task(Cache = true, CacheDurationMs = 5000)]
    public async Task<Dictionary<string, float>> GetSystemStatusAsync()
    {
        var code = @"
import gc
import sys
{
    'memory_free': gc.mem_free(),
    'memory_allocated': gc.mem_alloc(),
    'temperature': sensor.read_u16() * 3.3 / 65536,
    'uptime': time.ticks_ms()
}
";
        return await ExecuteAsync<Dictionary<string, float>>(code);
    }

    [Task(Exclusive = true, TimeoutMs = 30000)]
    public async Task<List<float>> CollectSensorDataAsync(int samples, int intervalMs)
    {
        await _criticalSectionLock.WaitAsync();
        try
        {
            var code = $@"
sensor_readings.clear()
for i in range({samples}):
    reading = sensor.read_u16() * 3.3 / 65536
    sensor_readings.append(reading)
    if i < {samples - 1}:
        time.sleep_ms({intervalMs})
sensor_readings
";
            return await ExecuteAsync<List<float>>(code);
        }
        finally
        {
            _criticalSectionLock.Release();
        }
    }

    [Thread(BackgroundExecution = true)]
    public async Task MonitorCriticalSystemsAsync(CancellationToken cancellationToken)
    {
        while (!cancellationToken.IsCancellationRequested)
        {
            try
            {
                var status = await GetSystemStatusAsync();
                
                if (status["temperature"] > 70.0f) // Overheating
                {
                    _logger.LogWarning("Device overheating: {Temperature}°C", status["temperature"]);
                    await ExecuteAsync("led.on()"); // Warning indicator
                }
                else
                {
                    await ExecuteAsync("led.off()");
                }

                if (status["memory_free"] < 10000) // Low memory
                {
                    _logger.LogWarning("Low memory: {FreeMemory} bytes", status["memory_free"]);
                    await ExecuteAsync("gc.collect()"); // Force garbage collection
                }

                await Task.Delay(TimeSpan.FromSeconds(10), cancellationToken);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in system monitoring");
                await Task.Delay(TimeSpan.FromSeconds(30), cancellationToken);
            }
        }
    }

    [Teardown]
    public async Task SafeShutdownAsync()
    {
        await ExecuteAsync(@"
# Safe shutdown sequence
led.off()
motor.duty_u16(0)
print('Device shutdown complete')
");
    }
}
```

## Advanced Patterns

### State Management
- Persistent device state across connections
- State synchronization between host and device
- Recovery from unexpected disconnections

### Performance Optimization
- Batching operations for efficiency
- Caching strategies for frequently accessed data  
- Minimizing round-trip communications

### Error Recovery
- Automatic retry with exponential backoff
- Circuit breaker patterns for failing devices
- Graceful degradation strategies

### Resource Management
- Memory management on constrained devices
- Connection pooling for multiple devices
- Proper disposal patterns

## Related Documentation

- [Attribute Programming](/guide/attributes) - Core attribute system
- [Session Management](/guide/session-management) - Connection lifecycle management
- [Error Handling](/guide/error-handling) - Robust error handling strategies
- [Performance Troubleshooting](/hardware/troubleshooting-performance) - Optimization techniques

**Need help now?** Check our [GitHub Discussions](https://github.com/belay-dotnet/Belay.NET/discussions) or review the [core API documentation](/api/).