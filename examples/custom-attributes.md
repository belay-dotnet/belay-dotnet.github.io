# Custom Attributes

This guide demonstrates how to create custom attributes to extend Belay.NET's functionality, including the powerful new **PythonCodeAttribute** for embedding Python code directly in method declarations.

## PythonCodeAttribute - Direct Python Code Embedding

The `PythonCodeAttribute` allows you to embed Python code directly within C# method declarations with automatic parameter substitution:

```csharp
using Belay.Attributes;

public interface ILedController
{
    [Task]
    [PythonCode(@"
        import machine
        led = machine.Pin({pin}, machine.Pin.OUT)
        led.value({state})
        print(f'LED on pin {pin} set to {state}')
    ")]
    Task SetLEDAsync(int pin, bool state);

    [Task]
    [PythonCode(@"
        import machine
        sensor = machine.ADC(machine.Pin({pin}))
        reading = sensor.read_u16()
        temperature = (reading * 3.3 / 65535) * 100
        temperature
    ")]
    Task<float> ReadTemperatureAsync(int pin);
}
```

### Parameter Substitution

The attribute automatically substitutes method parameters using `{paramName}` syntax:

```csharp
[PythonCode(@"
    result = calculate_complex_value({x}, {y}, '{operation}')
    result
")]
Task<float> CalculateAsync(float x, float y, string operation);
```

### Method Interception Usage

Use with method interception for seamless C# to Python execution:

```csharp
using var device = Device.FromConnectionString("serial:COM3");
await device.ConnectAsync();

// Create proxy - automatically converts method calls to Python execution
var controller = device.CreateProxy<ILedController>();

// These method calls execute the embedded Python code on the device
await controller.SetLEDAsync(25, true);    // Turn on built-in LED
var temp = await controller.ReadTemperatureAsync(26); // Read from ADC pin
```

## Advanced Custom Attribute Patterns

This section covers additional patterns for extending Belay.NET's functionality:

- **Custom Attribute Creation**: Extending the base attribute classes
- **Executor Integration**: Creating custom executors for specialized behavior
- **Policy Implementation**: Implementing custom retry, timeout, and caching policies
- **Method Interception**: Advanced method interception patterns
- **Performance Optimization**: Custom attributes for performance-critical scenarios
- **Domain-Specific Attributes**: Creating attributes for specific hardware or use cases
- **Validation Attributes**: Input validation and parameter checking
- **Logging Attributes**: Custom logging and telemetry collection

## Quick Preview

```csharp
// Example of what's coming - custom caching attribute
[AttributeUsage(AttributeTargets.Method)]
public class CacheResultAttribute : TaskAttribute
{
    public int CacheDurationMs { get; set; } = 30000;
    public string? CacheKey { get; set; }
    
    public CacheResultAttribute(int cacheDurationMs = 30000)
    {
        CacheDurationMs = cacheDurationMs;
    }
}

// Custom executor for cached operations
public class CachedTaskExecutor : TaskExecutor
{
    private readonly IMemoryCache _cache;
    
    public CachedTaskExecutor(Device device, IDeviceSessionManager sessionManager, 
        IMemoryCache cache, ILogger<CachedTaskExecutor> logger)
        : base(device, sessionManager, logger)
    {
        _cache = cache;
    }
    
    protected override async Task<T> ExecuteWithPoliciesAsync<T>(
        string code, MethodInfo method, CancellationToken cancellationToken)
    {
        var cacheAttr = method.GetCustomAttribute<CacheResultAttribute>();
        if (cacheAttr != null)
        {
            var cacheKey = cacheAttr.CacheKey ?? $"{method.Name}_{code.GetHashCode()}";
            
            if (_cache.TryGetValue(cacheKey, out T cachedResult))
            {
                return cachedResult;
            }
            
            var result = await base.ExecuteWithPoliciesAsync<T>(code, method, cancellationToken);
            
            var cacheOptions = new MemoryCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = TimeSpan.FromMilliseconds(cacheAttr.CacheDurationMs)
            };
            
            _cache.Set(cacheKey, result, cacheOptions);
            return result;
        }
        
        return await base.ExecuteWithPoliciesAsync<T>(code, method, cancellationToken);
    }
}

// Usage example
public class SensorDevice : Device
{
    [CacheResult(CacheDurationMs = 60000, CacheKey = "device_info")]
    public async Task<string> GetDeviceInfoAsync() =>
        await ExecuteAsync<string>("sys.version");
        
    [CacheResult(10000)] // Cache for 10 seconds
    public async Task<float> ReadTemperatureAsync() =>
        await ExecuteAsync<float>("sensor.read_temp()");
}
```

## Related Documentation

- [Attribute Programming](/guide/attributes) - Core attribute system concepts
- [Session Management](/guide/session-management) - Executor framework integration
- [Configuration](/guide/configuration) - Custom attribute configuration
- [Testing](/guide/testing) - Testing custom attributes and executors

**Need help now?** Check our [GitHub Discussions](https://github.com/belay-dotnet/Belay.NET/discussions) or review the [attribute programming guide](/guide/attributes).