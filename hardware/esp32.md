# ESP32 Setup Guide


The ESP32 is one of the most popular MicroPython platforms for IoT development, offering built-in WiFi and Bluetooth capabilities alongside powerful dual-core processing. Belay.NET provides full support for ESP32 development with seamless Task attribute integration, file synchronization, and platform-specific feature access.

## Key Features

- **Built-in WiFi**: Connect to wireless networks and access internet services
- **Bluetooth Support**: Classic Bluetooth and BLE capabilities
- **Dual-Core CPU**: 240MHz Xtensa LX6 processors for high performance
- **Large Memory**: Typically 4MB+ flash storage and 520KB RAM
- **Rich Peripheral Set**: ADC, DAC, Hall sensor, touch sensors, PWM
- **Multiple Board Variants**: ESP32, ESP32-S2, ESP32-S3, ESP32-C3 support

## Getting Started

### Hardware Requirements

- ESP32 development board (ESP32, ESP32-S2, ESP32-S3, or ESP32-C3)
- USB cable (USB-A to Micro-USB or USB-C depending on board)
- MicroPython firmware installed (see installation section below)

### Basic Connection

```csharp
using Belay.Core;
using Belay.Attributes;

// Connect to ESP32
using var device = Device.FromConnectionString("serial:COM3");  // Windows
// using var device = Device.FromConnectionString("serial:/dev/ttyUSB0");  // Linux

await device.ConnectAsync();
Console.WriteLine("ESP32 connected successfully!");

// Execute basic commands
var info = await device.ExecuteAsync<string>("import sys; sys.version");
Console.WriteLine($"MicroPython version: {info}");

await device.DisconnectAsync();
```

### ESP32 Controller Class

Create a specialized controller to access ESP32-specific features:

```csharp
public class ESP32Controller
{
    private readonly Device device;
    
    public ESP32Controller(Device device)
    {
        this.device = device;
    }
    
    [Setup]
    public async Task InitializeESP32Async()
    {
        await device.ExecuteAsync(@"
from machine import Pin, ADC
import esp32

# GPIO setup
led = Pin(2, Pin.OUT)  # Built-in LED
adc = ADC(Pin(36))     # Analog input
adc.atten(ADC.ATTN_11DB)  # Full 3.3V range
        ");
    }
    
    [Task]
    public async Task SetLedAsync(bool state)
    {
        await device.ExecuteAsync(state ? "led.on()" : "led.off()");
    }
    
    [Task]
    public async Task<int> ReadADCAsync()
    {
        return await device.ExecuteAsync<int>("adc.read()");
    }
    
    [Task]
    public async Task<bool> CheckWiFiAvailabilityAsync()
    {
        return await device.ExecuteAsync<bool>(@"
try:
    import network
    True
except:
    False
        ");
    }
    
    [Task(Cache = true)]
    public async Task<string> GetChipInfoAsync()
    {
        return await device.ExecuteAsync<string>(@"
import esp32
import json
info = {
    'chip_id': hex(esp32.chip_id()),
    'cpu_freq': esp32.cpu_freq(),
    'hall_sensor': esp32.hall_sensor()
}
json.dumps(info)
        ");
    }
}

// Usage
using var device = Device.FromConnectionString("serial:COM3");
await device.ConnectAsync();

var esp32 = new ESP32Controller(device);
await esp32.InitializeESP32Async();

// Test LED
for (int i = 0; i < 5; i++)
{
    await esp32.SetLedAsync(true);
    await Task.Delay(500);
    await esp32.SetLedAsync(false);
    await Task.Delay(500);
}

// Read sensor
var adcValue = await esp32.ReadADCAsync();
Console.WriteLine($"ADC reading: {adcValue} (0-4095)");
```

## Board Support

### Popular ESP32 Boards

#### ESP32 DevKit V1 (Most Common)
- **Microcontroller**: ESP32-WROOM-32
- **USB-to-Serial**: CP2102 or CH340
- **Built-in LED**: GPIO 2
- **Boot Button**: GPIO 0
- **Flash Memory**: 4MB
- **ADC Pins**: 0, 2, 4, 12-15, 25-27, 32-39 (12-bit resolution)
- **Connection**: `serial:COM3` (Windows) or `serial:/dev/ttyUSB0` (Linux)

#### ESP32-S2
- **Key Features**: Native USB, no Bluetooth, enhanced security
- **USB Connection**: Direct USB (no USB-to-serial chip needed)
- **Built-in LED**: Varies by board (often GPIO 15)
- **Connection**: `serial:COM3` (Windows) or `serial:/dev/ttyACM0` (Linux)

#### ESP32-S3
- **Key Features**: Native USB, dual-core, enhanced AI acceleration
- **WiFi + Bluetooth**: Both supported
- **Built-in LED**: Varies by board (often GPIO 48)
- **Connection**: `serial:COM3` (Windows) or `serial:/dev/ttyACM0` (Linux)

#### ESP32-C3
- **Architecture**: RISC-V (not Xtensa)
- **Features**: WiFi + Bluetooth 5, lower power consumption
- **Built-in LED**: GPIO 8 (common)
- **Pins**: Fewer GPIO pins (compact design)
- **Connection**: `serial:COM3` (Windows) or `serial:/dev/ttyUSB0` (Linux)

### Board Detection

Use this code to automatically detect your ESP32 variant:

```csharp
[Task(Cache = true)]
public async Task<string> DetectBoardTypeAsync()
{
    return await device.ExecuteAsync<string>(@"
import sys
platform_info = sys.platform
if 'esp32s3' in platform_info:
    'ESP32-S3'
elif 'esp32s2' in platform_info:
    'ESP32-S2' 
elif 'esp32c3' in platform_info:
    'ESP32-C3'
else:
    'ESP32 (Classic)'
    ");
}
```

## Firmware Installation

### Prerequisites

Install the ESP flash tool:

```bash
# Using pip
pip install esptool

# On Ubuntu/Debian
sudo apt install esptool

# On macOS with Homebrew
brew install esptool
```

### Download MicroPython Firmware

1. Visit [MicroPython ESP32 Downloads](https://micropython.org/download/esp32/)
2. Download the latest stable firmware for your board:
   - **ESP32**: `esp32-20231005-v1.21.0.bin`
   - **ESP32-S2**: `esp32s2-20231005-v1.21.0.bin`
   - **ESP32-S3**: `esp32s3-20231005-v1.21.0.bin`
   - **ESP32-C3**: `esp32c3-20231005-v1.21.0.bin`

### Flashing Process

#### Step 1: Put ESP32 in Download Mode

1. **ESP32 DevKit**: Hold BOOT button, press EN (reset) button, release EN, release BOOT
2. **ESP32-S2/S3**: Hold BOOT button while plugging in USB cable
3. **ESP32-C3**: Usually enters download mode automatically

#### Step 2: Identify Serial Port

```bash
# Windows
# Check Device Manager → Ports (COM & LPT)
# Look for: Silicon Labs CP210x or CH340

# Linux
ls /dev/ttyUSB*
# or
dmesg | grep tty

# macOS
ls /dev/cu.usbserial-*
```

#### Step 3: Erase and Flash

```bash
# Erase existing flash (recommended)
esptool.py --chip esp32 --port COM3 erase_flash

# Flash MicroPython (adjust port and firmware file)
esptool.py --chip esp32 --port COM3 --baud 460800 write_flash -z 0x1000 esp32-20231005-v1.21.0.bin

# For ESP32-S2
esptool.py --chip esp32s2 --port COM3 --baud 460800 write_flash -z 0x1000 esp32s2-20231005-v1.21.0.bin

# For ESP32-C3
esptool.py --chip esp32c3 --port COM3 --baud 460800 write_flash -z 0x1000 esp32c3-20231005-v1.21.0.bin
```

#### Step 4: Verify Installation

1. Reset the ESP32 (press EN button)
2. Open a serial terminal:

```bash
# Using Python serial tools
python -m serial.tools.miniterm COM3 115200

# Using screen (Linux/macOS)
screen /dev/ttyUSB0 115200

# Using PuTTY (Windows)
# Set Connection Type: Serial, Speed: 115200
```

3. You should see the MicroPython REPL prompt: `>>>`

### Troubleshooting Installation

#### Common Issues

**"Failed to connect to ESP32"**:
- Check USB cable (data cable, not charging-only)
- Verify correct serial port
- Try different baud rate (115200)
- Hold BOOT button longer during reset sequence

**"Invalid head of packet"**:
- ESP32 not in download mode
- Wrong serial port selected
- USB cable or driver issue

**"Timed out waiting for packet header"**:
- Lower baud rate to 115200
- Try different USB cable
- Check power supply (use powered USB hub if needed)

#### Driver Installation

**Windows**:
- **CP210x**: Download from [Silicon Labs](https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers)
- **CH340**: Download from [WCH](http://www.wch.cn/downloads/CH341SER_EXE.html)

**Linux**:
```bash
# Add user to dialout group
sudo usermod -a -G dialout $USER
# Log out and back in

# Install drivers (usually included)
sudo apt install linux-modules-extra-$(uname -r)
```

**macOS**:
- CP210x: Install from Silicon Labs website
- CH340: May require disabling System Integrity Protection temporarily

## GPIO Reference

### ESP32 Classic Pin Functions

| Pin | Function | Type | Notes |
|-----|----------|------|-------|
| 0 | Boot/Flash | Input | Pull-up resistor, boot button, **avoid for output** |
| 1 | UART TX | I/O | UART0 transmit, **avoid during boot** |
| 2 | Built-in LED | Output | Built-in LED on most DevKit boards |
| 3 | UART RX | I/O | UART0 receive, **avoid during boot** |
| 4 | GPIO | I/O | General purpose, safe to use |
| 5 | GPIO | I/O | General purpose, safe to use |
| 6-11 | **RESERVED** | - | **DO NOT USE** - Connected to SPI flash |
| 12 | GPIO/ADC2 | I/O | Strapping pin, ADC2_CH5 |
| 13 | GPIO/ADC2 | I/O | General purpose, ADC2_CH4 |
| 14 | GPIO/ADC2 | I/O | General purpose, ADC2_CH6 |
| 15 | GPIO/ADC2 | I/O | Strapping pin, ADC2_CH3 |
| 16 | GPIO | I/O | General purpose, safe to use |
| 17 | GPIO | I/O | General purpose, safe to use |
| 18 | GPIO/SPI | I/O | SPI SCK, general purpose |
| 19 | GPIO/SPI | I/O | SPI MISO, general purpose |
| 21 | GPIO/I2C | I/O | I2C SDA, general purpose |
| 22 | GPIO/I2C | I/O | I2C SCL, general purpose |
| 23 | GPIO/SPI | I/O | SPI MOSI, general purpose |
| 25 | GPIO/ADC2/DAC1 | I/O | ADC2_CH8, DAC channel 1 |
| 26 | GPIO/ADC2/DAC2 | I/O | ADC2_CH9, DAC channel 2 |
| 27 | GPIO/ADC2 | I/O | ADC2_CH7, general purpose |
| 32 | GPIO/ADC1 | I/O | ADC1_CH4, general purpose |
| 33 | GPIO/ADC1 | I/O | ADC1_CH5, general purpose |
| 34 | GPIO/ADC1 | **Input Only** | ADC1_CH6, no pull-up/down |
| 35 | GPIO/ADC1 | **Input Only** | ADC1_CH7, no pull-up/down |
| 36 (VP) | GPIO/ADC1 | **Input Only** | ADC1_CH0, no pull-up/down |
| 39 (VN) | GPIO/ADC1 | **Input Only** | ADC1_CH3, no pull-up/down |

### Safe Pins for General Use

**Recommended for outputs**: 2, 4, 5, 16, 17, 18, 19, 21, 22, 23, 25, 26, 27, 32, 33  
**Input only**: 34, 35, 36, 39  
**Avoid during boot**: 0, 1, 3, 12, 15  
**Never use**: 6, 7, 8, 9, 10, 11 (flash pins)

### ADC Configuration

```csharp
[Setup]
public async Task SetupADCAsync()
{
    await device.ExecuteAsync(@"
from machine import ADC, Pin

# ADC1 pins (recommended) - work with WiFi
adc1 = ADC(Pin(36))  # VP pin
adc1.atten(ADC.ATTN_11DB)  # 0-3.3V range

# ADC2 pins (avoid when WiFi is active)
adc2 = ADC(Pin(25))
adc2.atten(ADC.ATTN_11DB)
    ");
}

[Task]
public async Task<int> ReadAnalogAsync(int pin)
{
    return await device.ExecuteAsync<int>($@"
from machine import ADC, Pin
adc = ADC(Pin({pin}))
adc.atten(ADC.ATTN_11DB)
adc.read()
    ");
}
```

### PWM Output

```csharp
[Task]
public async Task SetPWMAsync(int pin, int frequency, int dutyCycle)
{
    await device.ExecuteAsync($@"
from machine import PWM, Pin
pwm = PWM(Pin({pin}))
pwm.freq({frequency})
pwm.duty({dutyCycle})  # 0-1023
    ");
}
```

## WiFi Capabilities

### Basic WiFi Connection

```csharp
public class ESP32WiFiController
{
    private readonly Device device;
    
    public ESP32WiFiController(Device device)
    {
        this.device = device;
    }
    
    [Setup]
    public async Task InitializeWiFiAsync()
    {
        await device.ExecuteAsync(@"
import network
wlan = network.WLAN(network.STA_IF)
wlan.active(True)
        ");
    }
    
    [Task]
    public async Task<bool> ConnectAsync(string ssid, string password)
    {
        var result = await device.ExecuteAsync<string>($@"
wlan.connect('{ssid}', '{password}')
import time
timeout = 10
while not wlan.isconnected() and timeout > 0:
    time.sleep(1)
    timeout -= 1
'connected' if wlan.isconnected() else 'failed'
        ");
        return result == "connected";
    }
    
    [Task]
    public async Task<string> GetIPAddressAsync()
    {
        return await device.ExecuteAsync<string>(@"
if wlan.isconnected():
    wlan.ifconfig()[0]
else:
    'Not connected'
        ");
    }
    
    [Task]
    public async Task<List<string>> ScanNetworksAsync()
    {
        var networks = await device.ExecuteAsync<string>(@"
import json
networks = wlan.scan()
result = [net[0].decode('utf-8') for net in networks]
json.dumps(result)
        ");
        return System.Text.Json.JsonSerializer.Deserialize<List<string>>(networks) ?? new();
    }
}

// Usage
var wifiController = new ESP32WiFiController(device);
await wifiController.InitializeWiFiAsync();

var networks = await wifiController.ScanNetworksAsync();
Console.WriteLine($"Found {networks.Count} networks");

var connected = await wifiController.ConnectAsync("YourNetwork", "YourPassword");
if (connected)
{
    var ip = await wifiController.GetIPAddressAsync();
    Console.WriteLine($"Connected with IP: {ip}");
}
```

## File Transfer

ESP32's larger flash memory makes it excellent for file synchronization:

```csharp
using Belay.Sync;

// Upload files to ESP32
await device.FileSystem().WriteFileAsync("/config.json", jsonData);
await device.FileSystem().WriteFileAsync("/webpage.html", htmlContent);

// Download files from ESP32
var logData = await device.FileSystem().ReadFileAsync("/system.log");

// List files
var files = await device.FileSystem().ListFilesAsync("/");
foreach (var file in files)
{
    Console.WriteLine($"{file.Name}: {file.Size} bytes");
}
```

## Performance Characteristics

Based on validation testing:

- **Connection Time**: ~2-3 seconds for USB serial
- **Task Execution**: 10-50ms for simple operations
- **ADC Reading**: ~5ms typical
- **LED Control**: ~3ms typical
- **File Transfer**: ~100KB/s for large files
- **Memory Available**: ~100-200KB free RAM typical
- **Cache Performance**: 10-100x speedup for cached operations

## Example Projects

### Complete Validation Example

Run comprehensive ESP32 testing:

```bash
cd /path/to/belay.net
dotnet run --project examples/ESP32HardwareTest/ESP32HardwareTest.csproj serial:COM3
```

### Platform Comparison

Compare ESP32 vs Raspberry Pi Pico performance:

```bash
dotnet run --project examples/PlatformComparisonTest/PlatformComparisonTest.csproj serial:COM3 serial:COM4
```

## Troubleshooting

### Connection Issues

**"Port not found"**:
- Check Device Manager (Windows) or `ls /dev/tty*` (Linux)
- Install CP210x or CH340 drivers
- Try different USB cable

**"Device not responding"**:
- Reset ESP32 (press EN button)
- Check baud rate (115200 is standard)
- Verify MicroPython is installed correctly

### Performance Issues

**Slow Task execution**:
- Use `[Task(Cache = true)]` for repeated operations
- Minimize MicroPython imports in task code
- Consider exclusive execution for critical sections

**Memory errors**:
- Call `gc.collect()` periodically
- Avoid large string operations
- Use binary file transfers for large data

### WiFi Issues

**Connection fails**:
- Check signal strength
- Verify credentials
- Some ESP32 boards don't support 5GHz networks
- Try different WiFi channels

**ADC2 not working**:
- ADC2 pins conflict with WiFi
- Use ADC1 pins (32-39) when WiFi is active
- Disable WiFi temporarily for ADC2 readings

## Advanced Features

### Hall Sensor

```csharp
[Task]
public async Task<int> ReadHallSensorAsync()
{
    return await device.ExecuteAsync<int>("esp32.hall_sensor()");
}
```

### Touch Sensors

```csharp
[Task]
public async Task<int> ReadTouchAsync(int pin)
{
    return await device.ExecuteAsync<int>($@"
from machine import TouchPad, Pin
touch = TouchPad(Pin({pin}))
touch.read()
    ");
}
```

### Deep Sleep

```csharp
[Task]
public async Task EnterDeepSleepAsync(int milliseconds)
{
    await device.ExecuteAsync($@"
from machine import deepsleep
deepsleep({milliseconds})
    ");
}
```

## Related Documentation

- [Hardware Compatibility](/hardware/compatibility) - ESP32 variant compatibility
- [Connection Types](/hardware/connections) - USB and WebREPL setup  
- [Getting Started](/guide/getting-started) - Basic Belay.NET setup
- [Multiple Devices](/examples/multiple-devices) - Managing multiple ESP32s
- [File Synchronization](/guide/file-sync) - Upload/download files

## External Resources

- [ESP32 MicroPython Documentation](https://docs.micropython.org/en/latest/esp32/quickref.html)
- [ESP32 Pinout Reference](https://randomnerdtutorials.com/esp32-pinout-reference-gpios/)
- [Belay.NET GitHub Repository](https://github.com/belay-dotnet/Belay.NET)
- [Community Discussions](https://github.com/belay-dotnet/Belay.NET/discussions)

**Need help?** Check our troubleshooting guide or ask questions in [GitHub Discussions](https://github.com/belay-dotnet/Belay.NET/discussions).