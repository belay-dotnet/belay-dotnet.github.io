# Health Monitoring

Belay.NET provides comprehensive health monitoring capabilities for tracking device connectivity, performance, and overall system health. Build production-ready IoT applications with built-in observability and alerting.

## Health Check System

### Basic Health Checks

Register Belay.NET health checks in your application:

```csharp
using Belay.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add Belay.NET with health checks
builder.Services.AddBelay(options =>
{
    options.EnableHealthChecks = true;
    options.HealthCheckInterval = TimeSpan.FromMinutes(1);
});

// Register health checks
builder.Services.AddHealthChecks()
    .AddBelayDeviceHealthChecks()
    .AddBelaySessionHealthChecks()
    .AddBelayConnectionPoolHealthChecks();

var app = builder.Build();

// Health check endpoints
app.MapHealthChecks("/health");
app.MapHealthChecks("/health/ready", new HealthCheckOptions
{
    Predicate = check => check.Tags.Contains("ready")
});
app.MapHealthChecks("/health/live", new HealthCheckOptions
{
    Predicate = check => check.Tags.Contains("live")
});

app.Run();
```

### Device-Specific Health Checks

Monitor individual devices:

```csharp
public class DeviceHealthMonitor
{
    private readonly IDeviceFactory _deviceFactory;
    private readonly ILogger<DeviceHealthMonitor> _logger;
    private readonly IMetrics _metrics;
    
    public async Task<DeviceHealthStatus> CheckDeviceHealthAsync(string deviceId)
    {
        var healthStatus = new DeviceHealthStatus
        {
            DeviceId = deviceId,
            CheckTimestamp = DateTime.UtcNow
        };
        
        try
        {
            using var device = await _deviceFactory.CreateDeviceAsync(deviceId);
            
            // Connectivity check
            var connectivityResult = await CheckConnectivityAsync(device);
            healthStatus.Connectivity = connectivityResult;
            
            // Performance check
            var performanceResult = await CheckPerformanceAsync(device);
            healthStatus.Performance = performanceResult;
            
            // Resource usage check
            var resourceResult = await CheckResourceUsageAsync(device);
            healthStatus.Resources = resourceResult;
            
            // Overall health calculation
            healthStatus.OverallHealth = CalculateOverallHealth(
                connectivityResult, performanceResult, resourceResult);
            
            // Record metrics
            RecordHealthMetrics(deviceId, healthStatus);
            
            return healthStatus;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Health check failed for device {DeviceId}", deviceId);
            
            healthStatus.OverallHealth = HealthLevel.Critical;
            healthStatus.ErrorMessage = ex.Message;
            
            return healthStatus;
        }
    }
    
    private async Task<HealthCheckResult> CheckConnectivityAsync(Device device)
    {
        try
        {
            var startTime = DateTime.UtcNow;
            var response = await device.ExecuteAsync<bool>("True");
            var responseTime = DateTime.UtcNow - startTime;
            
            if (!response)
            {
                return new HealthCheckResult(HealthLevel.Critical, "Device not responding", responseTime);
            }
            
            if (responseTime > TimeSpan.FromSeconds(5))
            {
                return new HealthCheckResult(HealthLevel.Warning, "Slow response time", responseTime);
            }
            
            return new HealthCheckResult(HealthLevel.Healthy, "Device responding normally", responseTime);
        }
        catch (Exception ex)
        {
            return new HealthCheckResult(HealthLevel.Critical, $"Connection failed: {ex.Message}", TimeSpan.Zero);
        }
    }
    
    private async Task<HealthCheckResult> CheckPerformanceAsync(Device device)
    {
        try
        {
            // Test code execution performance
            var startTime = DateTime.UtcNow;
            await device.ExecuteAsync(@"
# Performance test - mathematical operations
result = sum(i * i for i in range(1000))
");
            var executionTime = DateTime.UtcNow - startTime;
            
            if (executionTime > TimeSpan.FromSeconds(10))
            {
                return new HealthCheckResult(HealthLevel.Warning, "Slow execution performance", executionTime);
            }
            
            return new HealthCheckResult(HealthLevel.Healthy, "Performance normal", executionTime);
        }
        catch (Exception ex)
        {
            return new HealthCheckResult(HealthLevel.Critical, $"Performance check failed: {ex.Message}", TimeSpan.Zero);
        }
    }
    
    private async Task<HealthCheckResult> CheckResourceUsageAsync(Device device)
    {
        try
        {
            var resources = await device.ExecuteAsync<Dictionary<string, object>>(@"
import gc
import micropython

{
    'free_memory': gc.mem_free(),
    'allocated_memory': gc.mem_alloc(),
    'stack_use': micropython.stack_use() if hasattr(micropython, 'stack_use') else 0
}
");
            
            var freeMemory = Convert.ToInt64(resources["free_memory"]);
            var allocatedMemory = Convert.ToInt64(resources["allocated_memory"]);
            var totalMemory = freeMemory + allocatedMemory;
            var memoryUsagePercentage = (double)allocatedMemory / totalMemory * 100;
            
            if (memoryUsagePercentage > 90)
            {
                return new HealthCheckResult(HealthLevel.Critical, $"High memory usage: {memoryUsagePercentage:F1}%", TimeSpan.Zero);
            }
            
            if (memoryUsagePercentage > 80)
            {
                return new HealthCheckResult(HealthLevel.Warning, $"Elevated memory usage: {memoryUsagePercentage:F1}%", TimeSpan.Zero);
            }
            
            return new HealthCheckResult(HealthLevel.Healthy, $"Memory usage normal: {memoryUsagePercentage:F1}%", TimeSpan.Zero);
        }
        catch (Exception ex)
        {
            return new HealthCheckResult(HealthLevel.Warning, $"Resource check failed: {ex.Message}", TimeSpan.Zero);
        }
    }
}

public class DeviceHealthStatus
{
    public string DeviceId { get; set; } = string.Empty;
    public DateTime CheckTimestamp { get; set; }
    public HealthCheckResult Connectivity { get; set; } = null!;
    public HealthCheckResult Performance { get; set; } = null!;
    public HealthCheckResult Resources { get; set; } = null!;
    public HealthLevel OverallHealth { get; set; }
    public string? ErrorMessage { get; set; }
}

public class HealthCheckResult
{
    public HealthLevel Level { get; }
    public string Message { get; }
    public TimeSpan ResponseTime { get; }
    
    public HealthCheckResult(HealthLevel level, string message, TimeSpan responseTime)
    {
        Level = level;
        Message = message;
        ResponseTime = responseTime;
    }
}

public enum HealthLevel
{
    Healthy,
    Warning,
    Critical
}
```

## Real-Time Monitoring

### System Health Dashboard

Create a real-time health monitoring dashboard:

```csharp
public class HealthDashboardHub : Hub
{
    private readonly IDeviceHealthMonitor _healthMonitor;
    
    public async Task JoinMonitoring()
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, "health-monitoring");
    }
    
    public async Task LeaveMonitoring()
    {
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, "health-monitoring");
    }
}

public class HealthMonitoringService : BackgroundService
{
    private readonly IDeviceHealthMonitor _healthMonitor;
    private readonly IHubContext<HealthDashboardHub> _hubContext;
    private readonly IDeviceRegistry _deviceRegistry;
    
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                var devices = await _deviceRegistry.GetAllDevicesAsync();
                var healthReports = new List<DeviceHealthStatus>();
                
                // Check health of all devices in parallel
                var healthTasks = devices.Select(async device =>
                {
                    return await _healthMonitor.CheckDeviceHealthAsync(device.Id);
                });
                
                var results = await Task.WhenAll(healthTasks);
                healthReports.AddRange(results);
                
                // Send updates to connected clients
                await _hubContext.Clients.Group("health-monitoring")
                    .SendAsync("HealthUpdate", healthReports, stoppingToken);
                
                // Wait before next check
                await Task.Delay(TimeSpan.FromMinutes(1), stoppingToken);
            }
            catch (Exception ex)
            {
                // Log error but continue monitoring
                Console.WriteLine($"Health monitoring error: {ex.Message}");
                await Task.Delay(TimeSpan.FromSeconds(30), stoppingToken);
            }
        }
    }
}
```

### Metrics Collection

Collect and export metrics for monitoring systems:

```csharp
public class DeviceMetricsCollector
{
    private readonly IMeterFactory _meterFactory;
    private readonly Meter _meter;
    private readonly Counter<int> _deviceConnections;
    private readonly Counter<int> _deviceOperations;
    private readonly Histogram<double> _operationDuration;
    private readonly Gauge<int> _activeDevices;
    
    public DeviceMetricsCollector(IMeterFactory meterFactory)
    {
        _meterFactory = meterFactory;
        _meter = meterFactory.Create("Belay.NET.Devices");
        
        _deviceConnections = _meter.CreateCounter<int>(
            "device_connections_total",
            description: "Total number of device connections");
            
        _deviceOperations = _meter.CreateCounter<int>(
            "device_operations_total", 
            description: "Total number of device operations");
            
        _operationDuration = _meter.CreateHistogram<double>(
            "device_operation_duration_seconds",
            description: "Duration of device operations in seconds");
            
        _activeDevices = _meter.CreateGauge<int>(
            "active_devices",
            description: "Number of currently active devices");
    }
    
    public void RecordConnection(string deviceId, bool success)
    {
        _deviceConnections.Add(1, new TagList
        {
            ["device_id"] = deviceId,
            ["success"] = success.ToString()
        });
    }
    
    public void RecordOperation(string deviceId, string operation, TimeSpan duration, bool success)
    {
        _deviceOperations.Add(1, new TagList
        {
            ["device_id"] = deviceId,
            ["operation"] = operation,
            ["success"] = success.ToString()
        });
        
        _operationDuration.Record(duration.TotalSeconds, new TagList
        {
            ["device_id"] = deviceId,
            ["operation"] = operation
        });
    }
    
    public void UpdateActiveDeviceCount(int count)
    {
        _activeDevices.Record(count);
    }
}
```

## Alerting System

### Alert Management

Create a flexible alerting system:

```csharp
public interface IAlertingService
{
    Task SendAlertAsync(Alert alert);
    Task SendAlertAsync(string deviceId, AlertLevel level, string message);
    Task ClearAlertAsync(string deviceId, string alertType);
}

public class AlertingService : IAlertingService
{
    private readonly IEmailSender _emailSender;
    private readonly ISlackNotifier _slackNotifier;
    private readonly IPushNotificationService _pushNotifier;
    private readonly ILogger<AlertingService> _logger;
    
    public async Task SendAlertAsync(Alert alert)
    {
        try
        {
            var tasks = new List<Task>();
            
            // Send email for critical alerts
            if (alert.Level >= AlertLevel.Critical)
            {
                tasks.Add(_emailSender.SendAsync(
                    to: "admin@company.com",
                    subject: $"CRITICAL: Device Alert - {alert.DeviceId}",
                    body: FormatAlertEmail(alert)));
            }
            
            // Send Slack notification for all alerts
            tasks.Add(_slackNotifier.SendAsync(
                channel: "#iot-alerts",
                message: FormatSlackMessage(alert)));
            
            // Send push notification for warnings and above
            if (alert.Level >= AlertLevel.Warning)
            {
                tasks.Add(_pushNotifier.SendAsync(
                    title: "Device Alert",
                    message: alert.Message,
                    data: new { deviceId = alert.DeviceId, level = alert.Level.ToString() }));
            }
            
            await Task.WhenAll(tasks);
            
            _logger.LogInformation("Alert sent for device {DeviceId}: {Message}", alert.DeviceId, alert.Message);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to send alert for device {DeviceId}", alert.DeviceId);
        }
    }
    
    public async Task SendAlertAsync(string deviceId, AlertLevel level, string message)
    {
        var alert = new Alert
        {
            DeviceId = deviceId,
            Level = level,
            Message = message,
            Timestamp = DateTime.UtcNow,
            AlertType = "health_check"
        };
        
        await SendAlertAsync(alert);
    }
    
    public async Task ClearAlertAsync(string deviceId, string alertType)
    {
        // Implementation to clear/resolve alerts
        _logger.LogInformation("Alert cleared for device {DeviceId}, type {AlertType}", deviceId, alertType);
    }
}

public class Alert
{
    public string DeviceId { get; set; } = string.Empty;
    public AlertLevel Level { get; set; }
    public string Message { get; set; } = string.Empty;
    public DateTime Timestamp { get; set; }
    public string AlertType { get; set; } = string.Empty;
    public Dictionary<string, object> Properties { get; set; } = new();
}

public enum AlertLevel
{
    Info,
    Warning,
    Critical
}
```

### Health-Based Alerting

Automatically send alerts based on health check results:

```csharp
public class HealthBasedAlertingService
{
    private readonly IAlertingService _alertingService;
    private readonly ConcurrentDictionary<string, HealthLevel> _lastHealthStatus = new();
    
    public async Task ProcessHealthCheckResultAsync(string deviceId, DeviceHealthStatus healthStatus)
    {
        var currentHealth = healthStatus.OverallHealth;
        var previousHealth = _lastHealthStatus.GetValueOrDefault(deviceId, HealthLevel.Healthy);
        
        // Alert on health degradation
        if (currentHealth != previousHealth)
        {
            await HandleHealthChangeAsync(deviceId, previousHealth, currentHealth, healthStatus);
        }
        
        // Alert on sustained critical health
        if (currentHealth == HealthLevel.Critical)
        {
            await HandleCriticalHealthAsync(deviceId, healthStatus);
        }
        
        _lastHealthStatus[deviceId] = currentHealth;
    }
    
    private async Task HandleHealthChangeAsync(string deviceId, HealthLevel previous, HealthLevel current, DeviceHealthStatus status)
    {
        var alertLevel = current switch
        {
            HealthLevel.Critical => AlertLevel.Critical,
            HealthLevel.Warning => AlertLevel.Warning,
            HealthLevel.Healthy => AlertLevel.Info,
            _ => AlertLevel.Info
        };
        
        var message = current switch
        {
            HealthLevel.Critical => $"Device {deviceId} health CRITICAL: {status.ErrorMessage ?? "Multiple issues detected"}",
            HealthLevel.Warning => $"Device {deviceId} health WARNING: Performance or resource issues detected",
            HealthLevel.Healthy => $"Device {deviceId} health RECOVERED: All systems normal",
            _ => $"Device {deviceId} health status unknown"
        };
        
        await _alertingService.SendAlertAsync(deviceId, alertLevel, message);
    }
    
    private async Task HandleCriticalHealthAsync(string deviceId, DeviceHealthStatus status)
    {
        // Check if device has been critical for extended period
        // This would require tracking health history
        
        var criticalIssues = new List<string>();
        
        if (status.Connectivity.Level == HealthLevel.Critical)
            criticalIssues.Add("Connection lost");
            
        if (status.Performance.Level == HealthLevel.Critical)
            criticalIssues.Add("Severe performance degradation");
            
        if (status.Resources.Level == HealthLevel.Critical)
            criticalIssues.Add("Resource exhaustion");
        
        if (criticalIssues.Any())
        {
            var message = $"Device {deviceId} CRITICAL: {string.Join(", ", criticalIssues)}";
            await _alertingService.SendAlertAsync(deviceId, AlertLevel.Critical, message);
        }
    }
}
```

## Performance Monitoring

### Performance Baselines

Establish and monitor performance baselines:

```csharp
public class PerformanceBaselineService
{
    private readonly Dictionary<string, PerformanceBaseline> _baselines = new();
    
    public void EstablishBaseline(string deviceId, List<PerformanceMeasurement> measurements)
    {
        if (measurements.Count < 10)
        {
            throw new ArgumentException("Need at least 10 measurements to establish baseline");
        }
        
        var connectionTimes = measurements.Select(m => m.ConnectionTime.TotalMilliseconds).ToList();
        var executionTimes = measurements.Select(m => m.ExecutionTime.TotalMilliseconds).ToList();
        
        _baselines[deviceId] = new PerformanceBaseline
        {
            DeviceId = deviceId,
            EstablishedAt = DateTime.UtcNow,
            ConnectionTime = new PerformanceMetric
            {
                Mean = connectionTimes.Average(),
                StandardDeviation = CalculateStandardDeviation(connectionTimes),
                P95 = CalculatePercentile(connectionTimes, 0.95),
                P99 = CalculatePercentile(connectionTimes, 0.99)
            },
            ExecutionTime = new PerformanceMetric
            {
                Mean = executionTimes.Average(),
                StandardDeviation = CalculateStandardDeviation(executionTimes),
                P95 = CalculatePercentile(executionTimes, 0.95),
                P99 = CalculatePercentile(executionTimes, 0.99)
            }
        };
    }
    
    public PerformanceAnalysis AnalyzePerformance(string deviceId, PerformanceMeasurement measurement)
    {
        if (!_baselines.TryGetValue(deviceId, out var baseline))
        {
            return new PerformanceAnalysis
            {
                Status = PerformanceStatus.Unknown,
                Message = "No baseline established for this device"
            };
        }
        
        var analysis = new PerformanceAnalysis { DeviceId = deviceId };
        
        // Analyze connection time
        var connectionMs = measurement.ConnectionTime.TotalMilliseconds;
        if (connectionMs > baseline.ConnectionTime.P99)
        {
            analysis.ConnectionStatus = PerformanceStatus.Critical;
            analysis.Issues.Add($"Connection time {connectionMs:F1}ms exceeds P99 baseline {baseline.ConnectionTime.P99:F1}ms");
        }
        else if (connectionMs > baseline.ConnectionTime.P95)
        {
            analysis.ConnectionStatus = PerformanceStatus.Warning;
            analysis.Issues.Add($"Connection time {connectionMs:F1}ms exceeds P95 baseline {baseline.ConnectionTime.P95:F1}ms");
        }
        else
        {
            analysis.ConnectionStatus = PerformanceStatus.Normal;
        }
        
        // Analyze execution time
        var executionMs = measurement.ExecutionTime.TotalMilliseconds;
        if (executionMs > baseline.ExecutionTime.P99)
        {
            analysis.ExecutionStatus = PerformanceStatus.Critical;
            analysis.Issues.Add($"Execution time {executionMs:F1}ms exceeds P99 baseline {baseline.ExecutionTime.P99:F1}ms");
        }
        else if (executionMs > baseline.ExecutionTime.P95)
        {
            analysis.ExecutionStatus = PerformanceStatus.Warning;
            analysis.Issues.Add($"Execution time {executionMs:F1}ms exceeds P95 baseline {baseline.ExecutionTime.P95:F1}ms");
        }
        else
        {
            analysis.ExecutionStatus = PerformanceStatus.Normal;
        }
        
        // Overall status
        analysis.Status = analysis.Issues.Any() ? 
            (analysis.Issues.Any(i => i.Contains("P99")) ? PerformanceStatus.Critical : PerformanceStatus.Warning) :
            PerformanceStatus.Normal;
        
        return analysis;
    }
}
```

## Integration with ASP.NET Core

### Health Check UI

Add health check UI to your web application:

```csharp
// Program.cs
builder.Services.AddHealthChecksUI(settings =>
{
    settings.AddHealthCheckEndpoint("Device Health", "/health");
    settings.SetEvaluationTimeInSeconds(30);
    settings.MaximumHistoryEntriesPerEndpoint(50);
}).AddInMemoryStorage();

// Add after app.Build()
app.UseHealthChecksUI(options =>
{
    options.UIPath = "/health-ui";
    options.ApiPath = "/health-ui-api";
});
```

### Custom Health Check Response

Customize health check responses:

```csharp
public class CustomHealthCheckResponseWriter
{
    public static async Task WriteResponse(HttpContext context, HealthReport healthReport)
    {
        context.Response.ContentType = "application/json; charset=utf-8";
        
        var response = new
        {
            status = healthReport.Status.ToString(),
            totalDuration = healthReport.TotalDuration.TotalMilliseconds,
            results = healthReport.Entries.Select(kvp => new
            {
                name = kvp.Key,
                status = kvp.Value.Status.ToString(),
                duration = kvp.Value.Duration.TotalMilliseconds,
                description = kvp.Value.Description,
                data = kvp.Value.Data
            })
        };
        
        await context.Response.WriteAsync(JsonSerializer.Serialize(response, new JsonSerializerOptions
        {
            WriteIndented = true
        }));
    }
}

// Usage
app.MapHealthChecks("/health", new HealthCheckOptions
{
    ResponseWriter = CustomHealthCheckResponseWriter.WriteResponse
});
```

Health monitoring is essential for maintaining reliable IoT systems. Next, learn about [Configuration](/guide/configuration) management for production deployments.