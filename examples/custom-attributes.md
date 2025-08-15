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
- **Direct Execution Integration**: Using attributes with direct Python execution
- **Policy Implementation**: Implementing custom retry, timeout, and caching policies
- **Method Interception**: Advanced method interception patterns
- **Performance Optimization**: Custom attributes for performance-critical scenarios
- **Domain-Specific Attributes**: Creating attributes for specific hardware or use cases
- **Validation Attributes**: Input validation and parameter checking
- **Logging Attributes**: Custom logging and telemetry collection

## Custom Attribute Implementation

```csharp
// Example custom caching attribute
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

// Usage with simplified Device API
public interface ISensorInterface
{
    [Task]
    [CacheResult(CacheDurationMs = 60000, CacheKey = "device_info")]
    [PythonCode("sys.version")]
    Task<string> GetDeviceInfoAsync();
        
    [Task]
    [CacheResult(10000)] // Cache for 10 seconds
    [PythonCode(@"
        import machine
        sensor = machine.ADC(machine.Pin(26))
        reading = sensor.read_u16()
        temperature = (reading * 3.3 / 65535) * 100
        temperature
    ")]
    Task<float> ReadTemperatureAsync();
}

// Direct usage with Device
using var device = Device.FromConnectionString("serial:COM3");
await device.ConnectAsync();

var sensor = device.CreateProxy<ISensorInterface>();
var temp = await sensor.ReadTemperatureAsync(); // Cached result
```

## Related Documentation

- [Attribute Programming](/guide/attributes) - Core attribute system concepts
- [Configuration](/guide/configuration) - Custom attribute configuration
- [Testing](/guide/testing) - Testing custom attributes
- [Device Programming](/articles/device-programming) - Direct device execution patterns

**Need help now?** Check our [GitHub Discussions](https://github.com/belay-dotnet/Belay.NET/discussions) or review the [attribute programming guide](/guide/attributes).