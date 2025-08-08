# ASP.NET Core Integration

::: warning Documentation in Progress
This documentation is currently being developed. The dependency injection infrastructure for ASP.NET Core is implemented in Issue 002-104.

**Status**: ✅ Core functionality complete, 📝 Documentation in progress  
**Expected completion**: After Issue 002-106 (Cross-Component Integration Layer)
:::

## Coming Soon

This page will provide complete guidance for integrating Belay.NET with ASP.NET Core applications, including:

- **Dependency Injection Setup**: Configuring Belay.NET services in ASP.NET Core
- **Controller Integration**: Using device communication in MVC controllers
- **Web API Endpoints**: Creating REST APIs for device control
- **Background Services**: Long-running device monitoring services
- **Health Checks**: Monitoring device connectivity in production
- **Configuration Management**: Environment-specific device settings
- **Authentication & Authorization**: Securing device endpoints
- **Real-time Updates**: SignalR integration for live device data

## Quick Preview

```csharp
// Example of what's coming - ASP.NET Core device controller
[ApiController]
[Route("api/[controller]")]
public class DeviceController : ControllerBase
{
    private readonly IDeviceFactory _deviceFactory;
    private readonly ILogger<DeviceController> _logger;

    public DeviceController(IDeviceFactory deviceFactory, ILogger<DeviceController> logger)
    {
        _deviceFactory = deviceFactory;
        _logger = logger;
    }

    [HttpGet("temperature")]
    public async Task<ActionResult<float>> GetTemperature()
    {
        using var device = _deviceFactory.CreateSerialDevice("COM3");
        await device.ConnectAsync();
        
        var temperature = await device.ExecuteAsync<float>("sensor.read_temperature()");
        return Ok(temperature);
    }

    [HttpPost("led/{state}")]
    public async Task<ActionResult> SetLed(bool state)
    {
        using var device = _deviceFactory.CreateSerialDevice("COM3");
        await device.ConnectAsync();
        
        await device.ExecuteAsync($"led.{'on' if state else 'off'}()");
        return Ok();
    }
}

// Startup.cs configuration
public void ConfigureServices(IServiceCollection services)
{
    services.AddBelay(config =>
    {
        config.Device.DefaultConnectionTimeoutMs = 5000;
        config.Communication.Serial.DefaultBaudRate = 115200;
    });
    
    services.AddHealthChecks()
        .AddBelay(); // Device connectivity health checks
}
```

## Related Documentation

- [Dependency Injection Guide](/guide/dependency-injection) - Core DI setup and configuration
- [Health Monitoring](/guide/health-monitoring) - Production monitoring strategies  
- [Configuration](/guide/configuration) - Environment-specific settings
- [Session Management](/guide/session-management) - Advanced connection pooling

**Need help now?** Check our [GitHub Discussions](https://github.com/belay-dotnet/Belay.NET/discussions) or review the [dependency injection guide](/guide/dependency-injection).