# Custom Attributes

::: warning Documentation in Progress
This documentation is currently being developed. The executor framework and attribute system is implemented and supports extensibility.

**Status**: ✅ Core functionality complete, 📝 Documentation in progress  
**Expected completion**: After Issue 002-106 (Cross-Component Integration Layer)
:::

## Coming Soon

This page will provide guidance for creating custom attributes to extend Belay.NET's functionality, including:

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