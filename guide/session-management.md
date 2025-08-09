# Session Management

Belay.NET's session management system provides advanced device lifecycle handling, resource management, and connection pooling for production applications. Learn how to manage device sessions efficiently and safely.

## Session Concepts

### Device Sessions
A device session represents the complete lifecycle of device communication:

- **Initialization**: Device connection and setup
- **Active Usage**: Code execution and data exchange  
- **Monitoring**: Health checks and status tracking
- **Cleanup**: Resource disposal and connection closing

### Session States

```csharp
public enum DeviceSessionState
{
    Inactive,       // Session manager is not active
    Active,         // Session manager is active and can create sessions
    Shutdown,       // Session manager is shutting down
    Disposed        // Session manager has been disposed
}
```

## Basic Session Usage

### Creating and Managing Sessions

```csharp
using Belay.Core;
using Belay.Core.Communication;
using Belay.Core.Sessions;
using Microsoft.Extensions.Logging;

public async Task BasicSessionExample()
{
    // Set up logging
    using var loggerFactory = LoggerFactory.Create(builder => 
        builder.AddConsole());
    
    // Create device communication
    var logger = loggerFactory.CreateLogger<SerialDeviceCommunication>();
    var communication = new SerialDeviceCommunication("COM3", 115200, logger: logger);
    
    // Create session manager
    using var sessionManager = new DeviceSessionManager(loggerFactory);
    
    try
    {
        // Create a session
        var session = await sessionManager.CreateSessionAsync(communication);
        
        Console.WriteLine($"Session created: {session.SessionId}");
        Console.WriteLine($"Session active: {session.IsActive}");
        Console.WriteLine($"Manager state: {sessionManager.State}");
        
        // Execute operations through communication
        var result = await communication.ExecuteAsync("2 + 3");
        Console.WriteLine($"Result: {result}");
        
        // Get session statistics
        var stats = await sessionManager.GetSessionStatsAsync();
        Console.WriteLine($"Active sessions: {stats.ActiveSessionCount}");
        
        // Execute operation within session context
        var temperature = await sessionManager.ExecuteInSessionAsync(communication, async session =>
        {
            return await communication.ExecuteAsync<float>(@"
from machine import ADC, Pin
sensor = ADC(Pin(26))
sensor.read_u16() * 3.3 / 65536 * 100");
        });
        
        Console.WriteLine($"Temperature: {temperature:F1}°C");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Session error: {ex.Message}");
    }
    // Session manager automatically disposed via using statement
}
```

### Session with Dependency Injection

```csharp
using Belay.Extensions;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

public class SensorService : BackgroundService
{
    private readonly IDeviceSessionManager _sessionManager;
    private readonly IDeviceCommunication _communication;
    private readonly ILogger<SensorService> _logger;
    
    public SensorService(
        IDeviceSessionManager sessionManager, 
        IDeviceCommunication communication,
        ILogger<SensorService> logger)
    {
        _sessionManager = sessionManager;
        _communication = communication;
        _logger = logger;
    }
    
    public async Task<SensorData> ReadSensorAsync()
    {
        return await _sessionManager.ExecuteInSessionAsync(_communication, async session =>
        {
            _logger.LogInformation("Reading sensor data in session {SessionId}", session.SessionId);
            
            var result = await _communication.ExecuteAsync(@"
{
    'temperature': temp_sensor.read(),
    'humidity': humidity_sensor.read(),
    'pressure': pressure_sensor.read(),
    'timestamp': time.time()
}");
            return JsonSerializer.Deserialize<SensorData>(result);
        });
    }
    
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                var data = await ReadSensorAsync();
                _logger.LogInformation("Sensor reading: {Temperature}°C", data.Temperature);
                await Task.Delay(TimeSpan.FromMinutes(1), stoppingToken);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error reading sensor data");
                await Task.Delay(TimeSpan.FromSeconds(30), stoppingToken);
            }
        }
    }
}

// Registration in Program.cs
var builder = Host.CreateDefaultBuilder(args);

builder.ConfigureServices(services =>
{
    // Add Belay.NET with session management
    services.AddBelay(options =>
    {
        options.DefaultPort = "COM3";
        options.DefaultBaudRate = 115200;
        options.EnableSessionManagement = true;
    });
    
    // Add the sensor service
    services.AddHostedService<SensorService>();
});

var host = builder.Build();
await host.RunAsync();
```

## Advanced Session Patterns

### Session Pooling

Reuse sessions for better performance:

```csharp
public class PooledDeviceSessionManager : IDeviceSessionManager
{
    private readonly ConcurrentBag<IDeviceSession> _availableSessions = new();
    private readonly ConcurrentDictionary<string, IDeviceSession> _activeSessions = new();
    private readonly SemaphoreSlim _semaphore;
    
    public PooledDeviceSessionManager(int maxSessions = 10)
    {
        _semaphore = new SemaphoreSlim(maxSessions);
    }
    
    public async Task<IDeviceSession> GetSessionAsync(string deviceId)
    {
        await _semaphore.WaitAsync();
        
        try
        {
            // Try to reuse an existing session
            if (_availableSessions.TryTake(out var session) && session.IsHealthy)
            {
                _activeSessions[deviceId] = session;
                return session;
            }
            
            // Create a new session
            session = await CreateNewSessionAsync(deviceId);
            _activeSessions[deviceId] = session;
            return session;
        }
        catch
        {
            _semaphore.Release();
            throw;
        }
    }
    
    public async Task ReturnSessionAsync(string deviceId, IDeviceSession session)
    {
        try
        {
            if (_activeSessions.TryRemove(deviceId, out _) && session.IsHealthy)
            {
                // Return healthy sessions to the pool
                _availableSessions.Add(session);
            }
            else
            {
                // Dispose unhealthy sessions
                await session.DisposeAsync();
            }
        }
        finally
        {
            _semaphore.Release();
        }
    }
}
```

### Long-Running Sessions

Manage sessions that stay active for extended periods:

```csharp
public class LongRunningDeviceSession : IDisposable
{
    private readonly IDeviceSession _session;
    private readonly Timer _heartbeatTimer;
    private readonly Timer _healthCheckTimer;
    private volatile bool _disposed;
    
    public LongRunningDeviceSession(IDeviceSession session)
    {
        _session = session;
        
        // Send heartbeat every 30 seconds
        _heartbeatTimer = new Timer(SendHeartbeat, null, 
            TimeSpan.FromSeconds(30), TimeSpan.FromSeconds(30));
            
        // Health check every 5 minutes
        _healthCheckTimer = new Timer(PerformHealthCheck, null,
            TimeSpan.FromMinutes(5), TimeSpan.FromMinutes(5));
    }
    
    private async void SendHeartbeat(object? state)
    {
        if (_disposed) return;
        
        try
        {
            await _session.ExecuteAsync("# heartbeat");
        }
        catch (Exception ex)
        {
            // Log heartbeat failure but continue
            Console.WriteLine($"Heartbeat failed: {ex.Message}");
        }
    }
    
    private async void PerformHealthCheck(object? state)
    {
        if (_disposed) return;
        
        try
        {
            // Check device responsiveness
            var response = await _session.ExecuteAsync<bool>("True");
            if (!response)
            {
                await ReconnectAsync();
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Health check failed: {ex.Message}");
            await ReconnectAsync();
        }
    }
    
    private async Task ReconnectAsync()
    {
        try
        {
            await _session.ReconnectAsync();
            Console.WriteLine("Session reconnected successfully");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Reconnection failed: {ex.Message}");
        }
    }
    
    public void Dispose()
    {
        if (_disposed) return;
        
        _disposed = true;
        _heartbeatTimer?.Dispose();
        _healthCheckTimer?.Dispose();
        _session?.Dispose();
    }
}
```

### Session Monitoring

Track session performance and health:

```csharp
public class SessionMonitor
{
    private readonly IMetrics _metrics;
    private readonly ILogger<SessionMonitor> _logger;
    private readonly ConcurrentDictionary<string, SessionMetrics> _sessionMetrics = new();
    
    public void RecordSessionCreated(string sessionId)
    {
        _sessionMetrics[sessionId] = new SessionMetrics
        {
            CreatedAt = DateTime.UtcNow,
            OperationCount = 0,
            ErrorCount = 0
        };
        
        _metrics.Gauge("active_sessions").Set(_sessionMetrics.Count);
    }
    
    public void RecordOperation(string sessionId, TimeSpan duration, bool success)
    {
        if (_sessionMetrics.TryGetValue(sessionId, out var metrics))
        {
            metrics.OperationCount++;
            if (!success) metrics.ErrorCount++;
            
            _metrics.Histogram("session_operation_duration")
                   .WithTag("session_id", sessionId)
                   .Observe(duration.TotalMilliseconds);
                   
            _metrics.Counter("session_operations_total")
                   .WithTag("session_id", sessionId)
                   .WithTag("success", success.ToString())
                   .Increment();
        }
    }
    
    public void RecordSessionClosed(string sessionId)
    {
        if (_sessionMetrics.TryRemove(sessionId, out var metrics))
        {
            var sessionDuration = DateTime.UtcNow - metrics.CreatedAt;
            
            _logger.LogInformation("Session {SessionId} closed. Duration: {Duration}, Operations: {Operations}, Errors: {Errors}",
                sessionId, sessionDuration, metrics.OperationCount, metrics.ErrorCount);
                
            _metrics.Histogram("session_duration")
                   .WithTag("session_id", sessionId)
                   .Observe(sessionDuration.TotalMinutes);
                   
            _metrics.Gauge("active_sessions").Set(_sessionMetrics.Count);
        }
    }
}

public class SessionMetrics
{
    public DateTime CreatedAt { get; set; }
    public int OperationCount { get; set; }
    public int ErrorCount { get; set; }
}
```

## Session Configuration

### Configuration Options

```csharp
public class DeviceSessionOptions
{
    /// <summary>Connection timeout for initial device connection</summary>
    public TimeSpan ConnectionTimeout { get; set; } = TimeSpan.FromSeconds(30);
    
    /// <summary>Timeout for individual operations</summary>
    public TimeSpan OperationTimeout { get; set; } = TimeSpan.FromSeconds(10);
    
    /// <summary>How long to keep idle sessions alive</summary>
    public TimeSpan IdleTimeout { get; set; } = TimeSpan.FromMinutes(5);
    
    /// <summary>Enable automatic reconnection on connection loss</summary>
    public bool EnableAutoReconnect { get; set; } = true;
    
    /// <summary>Maximum number of reconnection attempts</summary>
    public int MaxReconnectAttempts { get; set; } = 3;
    
    /// <summary>Delay between reconnection attempts</summary>
    public TimeSpan ReconnectDelay { get; set; } = TimeSpan.FromSeconds(1);
    
    /// <summary>Enable session health monitoring</summary>
    public bool EnableHealthChecks { get; set; } = true;
    
    /// <summary>Interval between health checks</summary>
    public TimeSpan HealthCheckInterval { get; set; } = TimeSpan.FromMinutes(1);
    
    /// <summary>Device communication settings</summary>
    public DeviceCommunicationOptions Communication { get; set; } = new();
}
```

### Configuration via appsettings.json

```json
{
  "DeviceSessions": {
    "DefaultTimeout": "00:00:30",
    "IdleTimeout": "00:05:00", 
    "EnableAutoReconnect": true,
    "MaxReconnectAttempts": 3,
    "ReconnectDelay": "00:00:01",
    "EnableHealthChecks": true,
    "HealthCheckInterval": "00:01:00",
    "MaxConcurrentSessions": 10,
    "EnableSessionPooling": true
  }
}
```

## Session Events

Handle session lifecycle events:

```csharp
public class DeviceSessionEventHandler
{
    public DeviceSessionEventHandler(IDeviceSessionManager sessionManager)
    {
        sessionManager.SessionCreated += OnSessionCreated;
        sessionManager.SessionConnected += OnSessionConnected;
        sessionManager.SessionDisconnected += OnSessionDisconnected;
        sessionManager.SessionError += OnSessionError;
        sessionManager.SessionDisposed += OnSessionDisposed;
    }
    
    private async Task OnSessionCreated(SessionCreatedEventArgs args)
    {
        Console.WriteLine($"Session {args.SessionId} created for device {args.DeviceId}");
        
        // Perform any initialization logic
        await InitializeSessionAsync(args.Session);
    }
    
    private async Task OnSessionConnected(SessionConnectedEventArgs args)
    {
        Console.WriteLine($"Session {args.SessionId} connected successfully");
        
        // Send device configuration or setup commands
        await args.Session.ExecuteAsync(@"
import machine
import time
print('Device initialized via session')
");
    }
    
    private async Task OnSessionDisconnected(SessionDisconnectedEventArgs args)
    {
        Console.WriteLine($"Session {args.SessionId} disconnected: {args.Reason}");
        
        if (args.Reason == DisconnectionReason.Unexpected)
        {
            // Attempt automatic reconnection
            await args.Session.ReconnectAsync();
        }
    }
    
    private async Task OnSessionError(SessionErrorEventArgs args)
    {
        Console.WriteLine($"Session {args.SessionId} error: {args.Error.Message}");
        
        // Record error metrics and potentially trigger alerts
        await RecordErrorAsync(args.SessionId, args.Error);
    }
    
    private async Task OnSessionDisposed(SessionDisposedEventArgs args)
    {
        Console.WriteLine($"Session {args.SessionId} disposed");
        
        // Cleanup any session-specific resources
        await CleanupSessionResourcesAsync(args.SessionId);
    }
}
```

## Testing Session Management

Write comprehensive tests for session behavior:

```csharp
[TestClass]
public class DeviceSessionTests
{
    [TestMethod]
    public async Task Session_WhenCreated_ShouldBeInCreatedState()
    {
        // Arrange
        var options = new DeviceSessionOptions { Port = "COM3" };
        
        // Act
        using var session = new DeviceSession(options);
        
        // Assert
        Assert.AreEqual(DeviceSessionState.Created, session.State);
    }
    
    [TestMethod]
    public async Task Session_WhenConnected_ShouldTransitionToConnectedState()
    {
        // Arrange
        var mockCommunication = new Mock<IDeviceCommunication>();
        var session = new DeviceSession(mockCommunication.Object);
        
        // Act
        await session.ConnectAsync();
        
        // Assert
        Assert.AreEqual(DeviceSessionState.Connected, session.State);
    }
    
    [TestMethod]
    public async Task Session_WhenDisposed_ShouldCleanupResources()
    {
        // Arrange
        var mockCommunication = new Mock<IDeviceCommunication>();
        var session = new DeviceSession(mockCommunication.Object);
        await session.ConnectAsync();
        
        // Act
        session.Dispose();
        
        // Assert
        Assert.AreEqual(DeviceSessionState.Disposed, session.State);
        mockCommunication.Verify(c => c.DisposeAsync(), Times.Once);
    }
}
```

## Best Practices

### 1. Always Use Using Statements
```csharp
// ✅ Good - Automatic resource cleanup
using var session = await sessionManager.CreateSessionAsync(deviceId);

// ❌ Bad - Manual cleanup required
var session = await sessionManager.CreateSessionAsync(deviceId);
// Must remember to dispose manually
```

### 2. Handle Session State Changes
```csharp
// ✅ Good - Monitor session state
session.StateChanged += (sender, args) =>
{
    Console.WriteLine($"Session state changed: {args.OldState} -> {args.NewState}");
};

// ❌ Bad - No state monitoring
// Operations may fail if session is in wrong state
```

### 3. Implement Proper Timeout Handling
```csharp
// ✅ Good - Appropriate timeouts
var options = new DeviceSessionOptions
{
    ConnectionTimeout = TimeSpan.FromSeconds(30),  // Enough time for connection
    OperationTimeout = TimeSpan.FromSeconds(10),   // Reasonable for operations
    IdleTimeout = TimeSpan.FromMinutes(5)          // Balance resource usage
};

// ❌ Bad - No timeouts or too aggressive
var options = new DeviceSessionOptions
{
    ConnectionTimeout = TimeSpan.FromSeconds(1),   // Too short
    OperationTimeout = Timeout.InfiniteTimeSpan,   // Never times out
    IdleTimeout = TimeSpan.Zero                    // Immediate disposal
};
```

### 4. Use Session Pooling for High Throughput
```csharp
// ✅ Good - Reuse sessions for better performance
services.AddDeviceSessionManagement(options =>
{
    options.EnableSessionPooling = true;
    options.MaxConcurrentSessions = 20;
});

// ❌ Bad - Create new session for every operation
// Leads to connection overhead and resource waste
```

## Production Deployment

### Health Checks Integration

```csharp
public class DeviceSessionHealthCheck : IHealthCheck
{
    private readonly IDeviceSessionManager _sessionManager;
    
    public async Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, 
        CancellationToken cancellationToken = default)
    {
        try
        {
            var activeSessions = _sessionManager.GetActiveSessionCount();
            var maxSessions = _sessionManager.MaxSessions;
            
            var data = new Dictionary<string, object>
            {
                ["active_sessions"] = activeSessions,
                ["max_sessions"] = maxSessions,
                ["utilization"] = (double)activeSessions / maxSessions
            };
            
            if (activeSessions >= maxSessions * 0.9)
            {
                return HealthCheckResult.Degraded("High session utilization", null, data);
            }
            
            return HealthCheckResult.Healthy("Session management healthy", data);
        }
        catch (Exception ex)
        {
            return HealthCheckResult.Unhealthy("Session management failed", ex);
        }
    }
}

// Registration
services.AddHealthChecks()
        .AddCheck<DeviceSessionHealthCheck>("device_sessions");
```

### Logging and Monitoring

```csharp
public class SessionEventLogger
{
    private readonly ILogger<SessionEventLogger> _logger;
    
    public SessionEventLogger(ILogger<SessionEventLogger> logger)
    {
        _logger = logger;
    }
    
    public void LogSessionEvent(string sessionId, string eventType, object? data = null)
    {
        _logger.LogInformation("Session event: {SessionId} - {EventType} - {Data}", 
            sessionId, eventType, data);
    }
}
```

Session management is crucial for building robust, production-ready IoT applications with Belay.NET. Next, learn about [Health Monitoring](/guide/health-monitoring) to track your device fleet's status.