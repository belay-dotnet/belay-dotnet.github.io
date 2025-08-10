# Connection Types


Belay.NET supports multiple connection types for communicating with MicroPython devices. This guide covers all supported connection methods, configuration options, and platform-specific considerations.

## Supported Connection Types

- **USB Serial Connection**: Primary method using USB-to-serial communication
- **Subprocess Connection**: MicroPython unix port for hardware-independent development
- **Auto-Discovery**: Automatic device detection across all connection types
- **Connection Pooling**: Managing multiple simultaneous device connections
- **WebREPL Connection**: Wireless connections (planned for v0.3.0)

## USB Serial Connection

USB Serial is the primary connection method for most MicroPython devices.

### Basic Serial Connection

```csharp
using Belay.Core;

// Windows - COM port
using var device = Device.FromConnectionString("serial:COM3");

// Linux - USB device
using var device = Device.FromConnectionString("serial:/dev/ttyUSB0");  // ESP32/CH340
using var device = Device.FromConnectionString("serial:/dev/ttyACM0");  // Pico/CDC

// macOS - USB device
using var device = Device.FromConnectionString("serial:/dev/cu.usbmodem143201");  // Pico
using var device = Device.FromConnectionString("serial:/dev/cu.SLAB_USBtoUART");  // ESP32/CP210x

// Connect and test
await device.ConnectAsync();
var result = await device.ExecuteAsync<string>("print('Hello from device!')");
Console.WriteLine(result);
await device.DisconnectAsync();
```

### Platform-Specific Port Identification

#### Windows
```bash
# Check Device Manager -> Ports (COM & LPT)
# Look for:
# - "Silicon Labs CP210x USB to UART Bridge (COM3)"
# - "CH340 USB-SERIAL CH340 (COM4)" 
# - "USB Serial Device (COM5)"
```

#### Linux
```bash
# List USB devices
ls /dev/tty{USB,ACM}*

# Check device info
dmesg | grep tty

# Common patterns:
# /dev/ttyUSB0 - ESP32 with CH340/CP210x
# /dev/ttyACM0 - Raspberry Pi Pico
# /dev/ttyUSB1 - Multiple devices
```

#### macOS
```bash
# List serial devices
ls /dev/cu.*

# Common patterns:
# /dev/cu.usbmodem* - Raspberry Pi Pico
# /dev/cu.SLAB_USBtoUART - ESP32 with CP210x
# /dev/cu.wchusbserial* - ESP32 with CH340
```

### Connection String Options

```csharp
// Basic connection
var device = Device.FromConnectionString("serial:COM3");

// With baud rate (if non-standard)
var device = Device.FromConnectionString("serial:COM3:9600");

// Future: With additional parameters
// var device = Device.FromConnectionString("serial:COM3:115200:8N1");
```

## Subprocess Connection

Subprocess connections use the MicroPython unix port for hardware-independent development and testing.

### Basic Subprocess Connection

```csharp
// Use MicroPython in PATH
using var device = Device.FromConnectionString("subprocess:micropython");

// Use specific MicroPython binary
using var device = Device.FromConnectionString("subprocess:/path/to/micropython");
using var device = Device.FromConnectionString("subprocess:../../micropython/ports/unix/build-standard/micropython");

// Connect and test
await device.ConnectAsync();
var platform = await device.ExecuteAsync<string>("import sys; sys.platform");
Console.WriteLine(platform);  // Should output "unix"
```

### Building MicroPython Unix Port

```bash
# Clone MicroPython (if not already done)
git clone https://github.com/micropython/micropython.git
cd micropython

# Build unix port
cd ports/unix
make submodules
make

# Test the build
./build-standard/micropython
# Should start MicroPython REPL
```

### Subprocess Use Cases

```csharp
// Unit testing without hardware
[TestMethod]
public async Task TestTaskAttributes()
{
    using var device = Device.FromConnectionString("subprocess:micropython");
    await device.ConnectAsync();
    
    var controller = new TestController(device);
    var result = await controller.CalculateAsync(5, 3);
    
    Assert.AreEqual(8, result);
}

// Development without hardware
public static async Task Main(string[] args)
{
    using var device = Device.FromConnectionString("subprocess:micropython");
    await device.ConnectAsync();
    
    // Test your code without needing physical hardware
    await TestMyDeviceLogic(device);
}
```

## Auto-Discovery

Belay.NET can automatically discover and connect to available MicroPython devices.

### Basic Auto-Discovery

```csharp
// Discover first available device
using var device = await Device.DiscoverFirstAsync();
if (device == null)
{
    Console.WriteLine("No MicroPython devices found");
    return;
}

await device.ConnectAsync();
Console.WriteLine($"Connected to device: {device.ConnectionString}");
```

### Discover All Devices

```csharp
// Find all available devices
var devices = await Device.DiscoverDevicesAsync();
Console.WriteLine($"Found {devices.Length} devices:");

foreach (var deviceInfo in devices)
{
    Console.WriteLine($"  {deviceInfo.ConnectionString} - {deviceInfo.Description}");
}

// Connect to specific device
if (devices.Length > 0)
{
    using var device = Device.FromConnectionString(devices[0].ConnectionString);
    await device.ConnectAsync();
    // Use device...
}
```

### Advanced Connection Management

```csharp
public static class ConnectionHelper
{
    public static async Task<Device> ConnectWithFallbackAsync(
        string? preferredConnection = null, 
        bool allowSubprocess = true)
    {
        // Try preferred connection first
        if (!string.IsNullOrEmpty(preferredConnection))
        {
            try
            {
                var device = Device.FromConnectionString(preferredConnection);
                await device.ConnectAsync();
                return device;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Failed to connect to {preferredConnection}: {ex.Message}");
            }
        }
        
        // Try auto-discovery
        try
        {
            var discovered = await Device.DiscoverFirstAsync();
            if (discovered != null)
            {
                await discovered.ConnectAsync();
                return discovered;
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Auto-discovery failed: {ex.Message}");
        }
        
        // Fallback to subprocess if allowed
        if (allowSubprocess)
        {
            try
            {
                var subprocess = Device.FromConnectionString("subprocess:micropython");
                await subprocess.ConnectAsync();
                Console.WriteLine("Using subprocess connection (no hardware found)");
                return subprocess;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Subprocess fallback failed: {ex.Message}");
            }
        }
        
        throw new InvalidOperationException("No MicroPython devices available");
    }
}

// Usage
using var device = await ConnectionHelper.ConnectWithFallbackAsync("serial:COM3");
```

## Connection Configuration

Configure connection behavior through the Belay.NET configuration system.

### Basic Configuration

```csharp
using Microsoft.Extensions.DependencyInjection;
using Belay.Extensions.Configuration;

services.AddBelay(config =>
{
    // Device connection settings
    config.Device.DefaultConnectionTimeoutMs = 10000;
    config.Device.DefaultCommandTimeoutMs = 30000;
    
    // Serial communication settings
    config.Communication.Serial.DefaultBaudRate = 115200;
    config.Communication.Serial.ReadTimeoutMs = 1000;
    config.Communication.Serial.WriteTimeoutMs = 1000;
    
    // Auto-discovery settings
    config.Device.Discovery.EnableAutoDiscovery = true;
    config.Device.Discovery.DiscoveryTimeoutMs = 10000;
    config.Device.Discovery.SerialPortPatterns = new[] 
    {
        "COM*",           // Windows
        "/dev/ttyUSB*",   // Linux USB-serial
        "/dev/ttyACM*"    // Linux CDC devices
    };
});
```

### Environment-Specific Configuration

```json
{
  "Belay": {
    "Device": {
      "DefaultConnectionTimeoutMs": 5000,
      "Discovery": {
        "EnableAutoDiscovery": true,
        "SerialPortPatterns": ["COM*", "/dev/ttyUSB*", "/dev/ttyACM*"]
      }
    },
    "Communication": {
      "Serial": {
        "DefaultBaudRate": 115200,
        "ReadTimeoutMs": 1000,
        "WriteTimeoutMs": 1000
      }
    }
  }
}
```

### Connection Retry Configuration

```csharp
services.AddBelay(config =>
{
    // Retry settings
    config.Device.Retry.MaxRetries = 3;
    config.Device.Retry.InitialRetryDelayMs = 1000;
    config.Device.Retry.BackoffMultiplier = 2.0;
    config.Device.Retry.MaxRetryDelayMs = 30000;
});
```

## Multiple Device Connections

Belay.NET supports connecting to multiple devices simultaneously.

### Concurrent Device Usage

```csharp
// Connect to multiple devices
using var esp32 = Device.FromConnectionString("serial:/dev/ttyUSB0");
using var pico = Device.FromConnectionString("serial:/dev/ttyACM0");

// Connect concurrently
var connectTasks = new[]
{
    esp32.ConnectAsync(),
    pico.ConnectAsync()
};

await Task.WhenAll(connectTasks);
Console.WriteLine("Both devices connected");

// Use devices independently
var esp32Task = esp32.ExecuteAsync("import esp32; esp32.chip_id()");
var picoTask = pico.ExecuteAsync("import machine; machine.unique_id()");

var results = await Task.WhenAll(esp32Task, picoTask);
Console.WriteLine($"ESP32 ID: {results[0]}");
Console.WriteLine($"Pico ID: {results[1]}");
```

### Device Pool Management

```csharp
public class DevicePool : IDisposable
{
    private readonly List<Device> devices = new();
    
    public async Task<Device[]> DiscoverAndConnectAllAsync()
    {
        var discovered = await Device.DiscoverDevicesAsync();
        
        foreach (var deviceInfo in discovered)
        {
            try
            {
                var device = Device.FromConnectionString(deviceInfo.ConnectionString);
                await device.ConnectAsync();
                devices.Add(device);
                Console.WriteLine($"Connected to {deviceInfo.ConnectionString}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Failed to connect to {deviceInfo.ConnectionString}: {ex.Message}");
            }
        }
        
        return devices.ToArray();
    }
    
    public async Task ExecuteOnAllAsync(string code)
    {
        var tasks = devices.Select(d => d.ExecuteAsync(code));
        await Task.WhenAll(tasks);
    }
    
    public void Dispose()
    {
        foreach (var device in devices)
        {
            device.Dispose();
        }
        devices.Clear();
    }
}

// Usage
using var pool = new DevicePool();
var devices = await pool.DiscoverAndConnectAllAsync();
Console.WriteLine($"Connected to {devices.Length} devices");

// Execute on all devices
await pool.ExecuteOnAllAsync("print('Hello from all devices!')");
```

## Platform-Specific Setup

### Windows Setup

**Finding COM Ports**:
1. Open **Device Manager** (Windows key + X, then M)
2. Expand **Ports (COM & LPT)**
3. Look for your device:
   - `Silicon Labs CP210x USB to UART Bridge (COM3)`
   - `CH340 USB-SERIAL CH340 (COM4)`
   - `USB Serial Device (COM5)`

**Driver Installation**:
- **ESP32 with CP210x**: Download from [Silicon Labs](https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers)
- **ESP32 with CH340**: Download from [WCH](http://www.wch.cn/downloads/CH341SER_EXE.html)
- **Raspberry Pi Pico**: Uses built-in CDC drivers (no additional drivers needed)

**PowerShell Commands**:
```powershell
# List COM ports
Get-CimInstance -Class Win32_SerialPort | Select-Object Name, DeviceID

# List USB devices
Get-CimInstance -Class Win32_PnPEntity | Where-Object {$_.Name -like "*USB*"}
```

### Linux Setup

**Permission Setup**:
```bash
# Add user to dialout group
sudo usermod -a -G dialout $USER

# Log out and back in, or use:
newgrp dialout

# Verify group membership
groups
```

**Finding Devices**:
```bash
# List all USB serial devices
ls /dev/tty{USB,ACM}*

# Monitor USB device connections
sudo dmesg -w
# Then plug in your device

# Get device information
udevadm info --name=/dev/ttyUSB0

# List USB devices with vendor/product info
lsusb
```

**Troubleshooting**:
```bash
# Check if device is detected
dmesg | grep tty

# Check permissions
ls -l /dev/ttyUSB0

# Temporary permission fix (not recommended for permanent use)
sudo chmod 666 /dev/ttyUSB0
```

### macOS Setup

**Finding Devices**:
```bash
# List all serial devices
ls /dev/cu.*

# Common device patterns:
# ESP32 with CP210x: /dev/cu.SLAB_USBtoUART
# ESP32 with CH340: /dev/cu.wchusbserial*
# Raspberry Pi Pico: /dev/cu.usbmodem*

# Get USB device information
system_profiler SPUSBDataType
```

**Driver Installation**:
- **CP210x**: Download from Silicon Labs website
- **CH340**: Download from WCH website
- **FTDI**: Usually included with macOS

**Troubleshooting**:
```bash
# Check for driver conflicts
kextstat | grep -i usb

# Restart USB subsystem (if needed)
sudo kextunload -b com.apple.driver.usb.AppleUSBHostCompositeDevice
sudo kextload -b com.apple.driver.usb.AppleUSBHostCompositeDevice
```

## Common Device Types

### ESP32 Boards

**Connection Strings**:
```csharp
// Windows
var device = Device.FromConnectionString("serial:COM3");

// Linux
var device = Device.FromConnectionString("serial:/dev/ttyUSB0");

// macOS
var device = Device.FromConnectionString("serial:/dev/cu.SLAB_USBtoUART");
```

**Identification**:
- **CP210x chips**: Silicon Labs CP2102/CP2104
- **CH340 chips**: WCH CH340C/CH340G
- **Native USB**: ESP32-S2/S3 with native USB

### Raspberry Pi Pico

**Connection Strings**:
```csharp
// Windows
var device = Device.FromConnectionString("serial:COM4");

// Linux
var device = Device.FromConnectionString("serial:/dev/ttyACM0");

// macOS
var device = Device.FromConnectionString("serial:/dev/cu.usbmodem143201");
```

**Identification**:
- Uses USB CDC (Communications Device Class)
- No external USB-to-serial chip required
- Appears as `/dev/ttyACM*` on Linux

### CircuitPython Devices

**Limited Support**:
```csharp
// CircuitPython devices may work but are not fully tested
var device = Device.FromConnectionString("serial:COM5");

// Some features may not work correctly
// Recommend using MicroPython when possible
```

## Connection Testing

### Validate Connection

```csharp
public static async Task<bool> TestConnectionAsync(string connectionString)
{
    try
    {
        using var device = Device.FromConnectionString(connectionString);
        await device.ConnectAsync();
        
        // Test basic functionality
        var result = await device.ExecuteAsync<int>("2 + 2");
        if (result != 4)
        {
            Console.WriteLine("Device responded but calculation failed");
            return false;
        }
        
        // Test platform detection
        var platform = await device.ExecuteAsync<string>("import sys; sys.platform");
        Console.WriteLine($"Connected to {platform} device");
        
        await device.DisconnectAsync();
        return true;
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Connection test failed: {ex.Message}");
        return false;
    }
}

// Test multiple connection strings
var testConnections = new[]
{
    "serial:COM3",
    "serial:/dev/ttyUSB0",
    "serial:/dev/ttyACM0",
    "subprocess:micropython"
};

foreach (var conn in testConnections)
{
    Console.WriteLine($"Testing {conn}...");
    var success = await TestConnectionAsync(conn);
    Console.WriteLine($"  Result: {(success ? "SUCCESS" : "FAILED")}");
}
```

### Comprehensive Validation

```bash
# Use validation tools to test connections

# Test ESP32 connection
dotnet run --project examples/ESP32HardwareTest/ESP32HardwareTest.csproj serial:COM3

# Test Pico connection
dotnet run --project examples/PicoHardwareTest/PicoHardwareTest.csproj serial:/dev/ttyACM0

# Protocol comparison (subprocess vs hardware)
dotnet run --project examples/ProtocolComparison/ProtocolComparison.csproj micropython serial:COM3
```

## Troubleshooting

### Common Issues

**"Port not found" or "Access denied"**:
- Verify device is connected and recognized by OS
- Check permissions (Linux: add user to `dialout` group)
- Try different USB cable (data cable, not charging-only)
- Close other programs using the port (Arduino IDE, etc.)

**"Device not responding"**:
- Reset the device (press reset button or disconnect/reconnect USB)
- Verify MicroPython firmware is installed (not bootloader mode)
- Try different baud rate: `serial:COM3:9600`
- Check for driver issues

**"Connection timeout"**:
- Increase timeout in configuration
- Try different USB port
- Check for electromagnetic interference
- Verify device is not in deep sleep mode

### Debug Information

```csharp
// Enable verbose logging for connection debugging
services.AddBelay(config =>
{
    config.Communication.RawRepl.EnableVerboseLogging = true;
    config.ExceptionHandling.IncludeStackTraces = true;
});

// Test with error handling
try
{
    using var device = Device.FromConnectionString("serial:COM3");
    await device.ConnectAsync();
    Console.WriteLine("Connection successful");
}
catch (DeviceConnectionException ex)
{
    Console.WriteLine($"Connection failed: {ex.Message}");
    Console.WriteLine($"Inner exception: {ex.InnerException?.Message}");
}
catch (TimeoutException ex)
{
    Console.WriteLine($"Connection timeout: {ex.Message}");
}
```

## Best Practices

1. **Use Auto-Discovery**: Let Belay.NET find devices automatically when possible
2. **Handle Connection Failures**: Always wrap connections in try-catch blocks
3. **Resource Management**: Use `using` statements to ensure proper disposal
4. **Connection Validation**: Test connections before using them in production
5. **Environment Variables**: Use environment variables for connection strings in CI/CD
6. **Fallback Strategies**: Implement fallback to subprocess for development
7. **Multiple Devices**: Design for multiple device scenarios from the start

## Related Documentation

- [Getting Started](/guide/getting-started) - Basic Belay.NET setup
- [Configuration Guide](/guide/configuration) - Connection configuration options
- [ESP32 Setup](/hardware/esp32) - ESP32-specific connection guide
- [Raspberry Pi Pico](/hardware/raspberry-pi-pico) - Pico-specific setup
- [Testing Guide](/guide/testing) - Testing with different connection types
- [Hardware Compatibility](/hardware/compatibility) - Supported devices matrix

## External Resources

- [MicroPython Documentation](https://docs.micropython.org/)
- [CP210x Driver Downloads](https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers)
- [CH340 Driver Downloads](http://www.wch.cn/downloads/CH341SER_EXE.html)
- [Raspberry Pi Pico Documentation](https://www.raspberrypi.org/documentation/microcontrollers/)

**Need help?** Check our [GitHub Discussions](https://github.com/belay-dotnet/Belay.NET/discussions) for connection troubleshooting and examples.