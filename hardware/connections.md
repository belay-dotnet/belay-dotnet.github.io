# Connection Types

::: warning Documentation in Progress
This documentation is currently being developed. Serial and subprocess connections are fully implemented.

**Status**: ✅ Serial & subprocess complete, 📋 WebREPL planned for v0.3.0  
**Expected completion**: After Issue 002-106 (Cross-Component Integration Layer)
:::

## Coming Soon

This page will provide detailed guidance for all connection types supported by Belay.NET, including:

- **USB Serial Connection**: The primary connection method for most devices
- **Subprocess Connection**: MicroPython unix port for hardware-independent testing
- **WebREPL Connection**: Wireless connections over WiFi (planned for v0.3.0)
- **Bluetooth Serial**: Bluetooth-based connections (future consideration)
- **Connection String Format**: Standardized connection string specifications
- **Auto-Discovery**: Automatic device detection and connection
- **Connection Pooling**: Managing multiple simultaneous connections

## Current Connection Types

### USB Serial (Primary)
```csharp
// Direct connection to specific port
var device = Device.FromConnectionString("serial:COM3"); // Windows
var device = Device.FromConnectionString("serial:/dev/ttyACM0"); // Linux
var device = Device.FromConnectionString("serial:/dev/cu.usbmodem1234"); // macOS

// Auto-discovery (recommended)
var device = await Device.DiscoverFirstAsync();
```

### Subprocess (Testing)
```csharp
// Connect to MicroPython unix port for testing
var device = Device.FromConnectionString("subprocess:micropython");
var device = Device.FromConnectionString("subprocess:/path/to/micropython");
```

## Quick Setup Examples

```csharp
// Example of what's coming - comprehensive connection management
public class ConnectionManager
{
    public static async Task<Device> ConnectToDeviceAsync(string? preferredPort = null)
    {
        if (!string.IsNullOrEmpty(preferredPort))
        {
            // Try specific port first
            try
            {
                var device = Device.FromConnectionString($"serial:{preferredPort}");
                await device.ConnectAsync();
                return device;
            }
            catch (DeviceConnectionException)
            {
                // Fall through to auto-discovery
            }
        }
        
        // Auto-discover available devices
        var discoveredDevice = await Device.DiscoverFirstAsync();
        if (discoveredDevice == null)
        {
            throw new DeviceConnectionException("No MicroPython devices found");
        }
        
        await discoveredDevice.ConnectAsync();
        return discoveredDevice;
    }
}

// Usage patterns
using var device = await ConnectionManager.ConnectToDeviceAsync("COM3");
// Device is ready for use
```

## Connection Configuration

```csharp
// Advanced connection configuration (coming soon)
var device = Device.FromConnectionString("serial:COM3", options =>
{
    options.BaudRate = 115200;
    options.ConnectionTimeoutMs = 10000;
    options.ReadTimeoutMs = 5000;
    options.WriteTimeoutMs = 5000;
    options.AutoReconnect = true;
    options.ReconnectDelayMs = 1000;
});
```

## Platform-Specific Notes

### Windows
- **Device Manager**: Use Device Manager to identify COM ports
- **Driver Requirements**: Most devices work with built-in drivers
- **Port Names**: Format is `COM1`, `COM2`, etc.

### Linux
- **Permissions**: User may need to be added to `dialout` group
- **Device Names**: Format is `/dev/ttyUSB0`, `/dev/ttyACM0`, etc.
- **Auto-mounting**: Most distributions handle USB devices automatically

### macOS
- **Device Names**: Format is `/dev/cu.usbmodem*` or `/dev/cu.SLAB_USBtoUART`
- **Drivers**: Some devices may require additional drivers (Silicon Labs CP210x, FTDI, etc.)

## Related Documentation

- [Hardware Compatibility](/hardware/compatibility) - Supported devices and connection types
- [Raspberry Pi Pico Setup](/hardware/raspberry-pi-pico) - Pico-specific connection guide
- [Troubleshooting Connections](/hardware/troubleshooting-connections) - Common connection issues

**Need help now?** Check our [GitHub Discussions](https://github.com/belay-dotnet/Belay.NET/discussions) or review the [getting started guide](/guide/getting-started).