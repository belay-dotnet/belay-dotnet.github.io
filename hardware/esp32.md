# ESP32 Setup Guide

::: warning Documentation in Progress
This documentation is currently being developed. ESP32 support is fully implemented and tested.

**Status**: ✅ Core functionality complete, 📝 Documentation in progress  
**Expected completion**: After hardware validation documentation phase
:::

## Coming Soon

This page will provide complete setup instructions for ESP32 development boards, including:

- **Firmware Installation**: MicroPython firmware installation for various ESP32 boards
- **Driver Installation**: CP210x and CH340 USB-to-serial driver setup
- **WiFi Configuration**: Connecting ESP32 to WiFi networks
- **WebREPL Setup**: Wireless programming and debugging (planned for v0.3.0)
- **Pin Mapping**: ESP32-specific GPIO and peripheral configuration
- **Power Management**: Sleep modes and power optimization
- **Board Variants**: Support for ESP32, ESP32-S2, ESP32-S3, and ESP32-C3

## Quick Start Preview

```csharp
// Example of what's coming - ESP32-specific device control
public class Esp32Controller : Device
{
    [Setup]
    public async Task InitializeEsp32Async()
    {
        await ExecuteAsync(@"
from machine import Pin, PWM, ADC
import network

# GPIO setup
led = Pin(2, Pin.OUT)  # Built-in LED (varies by board)
button = Pin(0, Pin.IN, Pin.PULL_UP)  # Boot button
adc = ADC(Pin(36))  # Analog input
pwm = PWM(Pin(4))
pwm.freq(1000)

# WiFi setup (optional)
wlan = network.WLAN(network.STA_IF)
wlan.active(True)
");
    }

    [Task]
    public async Task ConnectWiFiAsync(string ssid, string password)
    {
        var code = $@"
wlan.connect('{ssid}', '{password}')
import time
timeout = 10
while not wlan.isconnected() and timeout > 0:
    time.sleep(1)
    timeout -= 1
print('Connected' if wlan.isconnected() else 'Failed')
wlan.isconnected()
";
        var connected = await ExecuteAsync<bool>(code);
        if (!connected)
            throw new DeviceExecutionException("WiFi connection failed");
    }

    [Task]
    public async Task<string> GetWiFiStatusAsync() =>
        await ExecuteAsync<string>("str(wlan.ifconfig()) if wlan.isconnected() else 'Not connected'");

    [Task]
    public async Task<int> ReadAnalogAsync() =>
        await ExecuteAsync<int>("adc.read()");

    [Task]
    public async Task SetLedAsync(bool state) =>
        await ExecuteAsync($"led.{'on' if state else 'off'}()");
}

// Usage
using var esp32 = Device.FromConnectionString("serial:COM3");
await esp32.ConnectAsync();

var controller = new Esp32Controller();
await controller.InitializeEsp32Async();

// Connect to WiFi
await controller.ConnectWiFiAsync("YourNetworkName", "YourPassword");
var wifiStatus = await controller.GetWiFiStatusAsync();
Console.WriteLine($"WiFi Status: {wifiStatus}");

// Read analog sensor
var analogValue = await controller.ReadAnalogAsync();
Console.WriteLine($"Analog reading: {analogValue}");
```

## Popular ESP32 Boards

### ESP32 DevKit V1
- **USB Chip**: CP2102 or CH340
- **Built-in LED**: Pin 2
- **Flash Button**: Pin 0
- **ADC Pins**: 0, 2, 4, 12-15, 25-27, 32-39

### ESP32-S2/S3
- **Native USB**: Direct USB connection without USB-to-serial chip
- **Enhanced Features**: More GPIO, better WiFi performance
- **Pin Differences**: Refer to board-specific pinout diagrams

### ESP32-C3
- **RISC-V Architecture**: Different from ARM-based ESP32
- **WiFi + Bluetooth 5**: Full wireless stack
- **Fewer Pins**: Compact form factor with fewer GPIO

## Firmware Installation

### Using esptool.py
```bash
# Install esptool
pip install esptool

# Erase flash
esptool.py --chip esp32 --port COM3 erase_flash

# Flash MicroPython firmware
esptool.py --chip esp32 --port COM3 --baud 460800 write_flash -z 0x1000 esp32-20210902-v1.17.bin
```

### Board-Specific Notes
- **ESP32**: Standard installation process
- **ESP32-S2**: May require holding boot button during flashing
- **ESP32-C3**: Different partition layout, use C3-specific firmware

## Common GPIO Pin Functions

| Pin | Function | Notes |
|-----|----------|-------|
| 0 | Boot/Flash | Pull-up resistor, boot button |
| 1 | TX | UART0 transmit |
| 2 | LED | Built-in LED on many boards |
| 3 | RX | UART0 receive |
| 4-5 | GPIO | General purpose I/O |
| 6-11 | Flash | Connected to SPI flash (don't use) |
| 12-15 | GPIO | General purpose, ADC2 |
| 16-17 | GPIO | General purpose |
| 18-19 | GPIO | SPI pins |
| 21-22 | GPIO | I2C pins (SDA/SCL) |
| 25-27 | GPIO | ADC2, DAC |
| 32-39 | GPIO | ADC1 (36-39 input only) |

## Related Documentation

- [Hardware Compatibility](/hardware/compatibility) - ESP32 variant compatibility
- [Connection Types](/hardware/connections) - USB and WebREPL setup
- [Getting Started](/guide/getting-started) - Basic Belay.NET setup
- [Multiple Devices](/examples/multiple-devices) - Managing multiple ESP32s

**Need immediate help?** Check [ESP32 MicroPython documentation](https://docs.micropython.org/en/latest/esp32/quickref.html) or our [GitHub Discussions](https://github.com/belay-dotnet/Belay.NET/discussions).