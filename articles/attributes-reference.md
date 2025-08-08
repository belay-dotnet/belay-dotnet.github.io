# Attributes Reference

::: warning Documentation in Progress
This documentation is currently being developed. The complete attribute system is implemented and working.

**Status**: ✅ Core functionality complete, 📝 Documentation in progress  
**Expected completion**: After Issue 002-106 (Cross-Component Integration Layer)
:::

## Coming Soon

This comprehensive reference will document all Belay.NET attributes and their properties, including:

- **[Task] Attribute**: Method execution with caching, retry, and timeout policies
- **[Setup] Attribute**: Device initialization and configuration methods
- **[Thread] Attribute**: Background and long-running operations
- **[Teardown] Attribute**: Cleanup and shutdown methods
- **Custom Attributes**: Creating your own specialized attributes
- **Attribute Combinations**: Using multiple attributes together
- **Best Practices**: Recommended patterns and common pitfalls
- **Performance Considerations**: Optimizing attribute usage

## Quick Reference

```csharp
// Example of what's coming - complete attribute reference
public class AttributeExamples : Device
{
    // Basic task execution
    [Task]
    public async Task<float> BasicSensorReadAsync() =>
        await ExecuteAsync<float>("sensor.read()");

    // Task with caching and timeout
    [Task(Cache = true, CacheDurationMs = 30000, TimeoutMs = 5000)]
    public async Task<string> CachedDeviceInfoAsync() =>
        await ExecuteAsync<string>("sys.version");

    // Task with retry policy
    [Task(RetryAttempts = 3, RetryDelayMs = 1000, TimeoutMs = 10000)]
    public async Task<bool> ReliableOperationAsync() =>
        await ExecuteAsync<bool>("critical_operation()");

    // Exclusive task (no concurrent execution)
    [Task(Exclusive = true, TimeoutMs = 60000)]
    public async Task<string> ExclusiveOperationAsync() =>
        await ExecuteAsync<string>("exclusive_hardware_access()");

    // Setup with priority ordering
    [Setup(Priority = 1)] // Runs first
    public async Task InitializeHardwareAsync() =>
        await ExecuteAsync("hardware_init()");

    [Setup(Priority = 2)] // Runs after priority 1
    public async Task ConfigureSensorsAsync() =>
        await ExecuteAsync("sensor_config()");

    [Setup] // Default priority (0)
    public async Task FinalSetupAsync() =>
        await ExecuteAsync("final_setup()");

    // Background thread
    [Thread(BackgroundExecution = true)]
    public async Task BackgroundMonitoringAsync(CancellationToken cancellationToken)
    {
        while (!cancellationToken.IsCancellationRequested)
        {
            await ExecuteAsync("monitor_systems()");
            await Task.Delay(1000, cancellationToken);
        }
    }

    // Foreground thread with timeout
    [Thread(TimeoutMs = 30000)]
    public async Task TimeLimitedOperationAsync() =>
        await ExecuteAsync("long_running_operation()");

    // Teardown with priority (reverse order)
    [Teardown(Priority = 2)] // Runs first in teardown
    public async Task SaveDataAsync() =>
        await ExecuteAsync("save_critical_data()");

    [Teardown(Priority = 1)] // Runs after priority 2
    public async Task CleanupResourcesAsync() =>
        await ExecuteAsync("cleanup_resources()");

    [Teardown] // Default priority (0), runs last
    public async Task FinalCleanupAsync() =>
        await ExecuteAsync("final_cleanup()");
}
```

## Attribute Properties Reference

### [Task] Attribute Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `Cache` | `bool` | `false` | Enable result caching |
| `CacheDurationMs` | `int` | `30000` | Cache duration in milliseconds |
| `TimeoutMs` | `int` | `30000` | Operation timeout |
| `RetryAttempts` | `int` | `0` | Number of retry attempts |
| `RetryDelayMs` | `int` | `1000` | Delay between retries |
| `Exclusive` | `bool` | `false` | Prevent concurrent execution |

### [Setup] Attribute Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `Priority` | `int` | `0` | Execution order (higher first) |
| `TimeoutMs` | `int` | `30000` | Setup timeout |
| `Required` | `bool` | `true` | Fail if setup fails |

### [Thread] Attribute Properties  

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `BackgroundExecution` | `bool` | `false` | Run in background |
| `TimeoutMs` | `int` | `Infinite` | Thread timeout |
| `AutoStart` | `bool` | `true` | Start automatically |

### [Teardown] Attribute Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `Priority` | `int` | `0` | Execution order (higher first) |
| `TimeoutMs` | `int` | `10000` | Teardown timeout |
| `IgnoreErrors` | `bool` | `true` | Continue if teardown fails |

## Custom Attributes

```csharp
// Example custom attribute (coming soon)
[AttributeUsage(AttributeTargets.Method)]
public class SensorReadAttribute : TaskAttribute
{
    public int SampleCount { get; set; } = 1;
    public int SampleIntervalMs { get; set; } = 100;
    public bool ValidateRange { get; set; } = true;
    public float MinValue { get; set; } = float.MinValue;
    public float MaxValue { get; set; } = float.MaxValue;

    public SensorReadAttribute()
    {
        // Default sensor read timeout
        TimeoutMs = 5000;
        // Enable caching for sensor data
        Cache = true;
        CacheDurationMs = 1000; // 1 second cache
    }
}

// Usage
[SensorRead(SampleCount = 10, SampleIntervalMs = 50, MinValue = 0, MaxValue = 100)]
public async Task<float> ReadTemperatureAsync() =>
    await ExecuteAsync<float>("temperature_sensor.read_average(10)");
```

## Attribute Combinations

```csharp
// Multiple attributes on a single method
[Setup(Priority = 1)]
[Task(TimeoutMs = 15000)]
public async Task InitializeAndTestAsync()
{
    await ExecuteAsync("initialize_hardware()");
    var result = await ExecuteAsync<bool>("test_hardware()");
    if (!result) throw new DeviceInitializationException("Hardware test failed");
}
```

## Best Practices

### Performance
- Use caching for expensive operations
- Set appropriate timeouts
- Use exclusive execution sparingly
- Batch operations when possible

### Reliability  
- Implement retry logic for critical operations
- Use setup methods for initialization
- Always implement teardown for cleanup
- Handle cancellation tokens properly

### Maintainability
- Use descriptive method names
- Document timeout and retry decisions
- Group related attributes logically
- Test attribute behavior thoroughly

## Related Documentation

- [Attribute Programming Guide](/guide/attributes) - Core concepts and usage patterns
- [Device Programming Guide](/articles/device-programming) - Advanced programming techniques
- [Custom Attributes Guide](/examples/custom-attributes) - Creating your own attributes
- [Testing Guide](/guide/testing) - Testing attributed methods

**Need help now?** Check our [GitHub Discussions](https://github.com/belay-dotnet/Belay.NET/discussions) or review the [attribute examples in our repository](https://github.com/belay-dotnet/Belay.NET/tree/main/examples).