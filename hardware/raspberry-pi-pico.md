# Raspberry Pi Pico Setup Guide


The Raspberry Pi Pico is an excellent platform for MicroPython development, offering powerful dual-core processing, extensive GPIO capabilities, and excellent Belay.NET integration. The Pico W variant adds WiFi and Bluetooth connectivity for IoT applications.

## Key Features

- **Dual-Core ARM Cortex-M0+**: 133MHz RP2040 microcontroller
- **Extensive GPIO**: 26 digital I/O pins with multiple peripheral options
- **Built-in Temperature Sensor**: Internal RP2040 temperature monitoring
- **Rich Peripherals**: PWM, ADC, I2C, SPI, UART support
- **Large Flash Memory**: 2MB onboard flash storage
- **USB Native**: Direct USB connection without external chips
- **Pico W Wireless**: Built-in WiFi and Bluetooth (Pico W only)

## Getting Started

### Hardware Requirements

- Raspberry Pi Pico or Pico W
- USB-A to Micro-USB cable
- MicroPython firmware (see installation section)

### Basic Connection

```csharp
using Belay.Core;
using Belay.Attributes;

// Connect to Pico
using var device = Device.FromConnectionString("serial:COM3");  // Windows
// using var device = Device.FromConnectionString("serial:/dev/ttyACM0");  // Linux
// using var device = Device.FromConnectionString("serial:/dev/cu.usbmodem143201");  // macOS

await device.ConnectAsync();
Console.WriteLine("Pico connected successfully!");

// Test basic functionality
var platform = await device.ExecuteAsync<string>("import sys; sys.platform");
Console.WriteLine($"Platform: {platform}");  // Should output "rp2"

await device.DisconnectAsync();
```

### Pico Controller Class

Create a specialized controller for Pico-specific features:

```csharp
public class PicoController
{
    private readonly Device device;
    
    public PicoController(Device device)
    {
        this.device = device;
    }
    
    [Setup]
    public async Task InitializePicoAsync()
    {
        await device.ExecuteAsync(@"
from machine import Pin, ADC
import rp2

# Built-in LED on GPIO 25
led = Pin(25, Pin.OUT)

# Internal temperature sensor
temp_sensor = ADC(4)
        ");
    }
    
    [Task]
    public async Task SetLedAsync(bool state)
    {
        await device.ExecuteAsync(state ? "led.on()" : "led.off()");
    }
    
    [Task]
    public async Task<float> ReadTemperatureAsync()
    {
        return await device.ExecuteAsync<float>(@"
# RP2040 temperature calculation
reading = temp_sensor.read_u16() * 3.3 / 65535
temperature = 27 - (reading - 0.706) / 0.001721
round(temperature, 1)
        ");
    }
    
    [Task(Cache = true)]
    public async Task<string> GetSystemInfoAsync()
    {
        return await device.ExecuteAsync<string>(@"
import sys
f'Pico - MicroPython {sys.version} on {sys.platform}'
        ");
    }
}

// Usage
using var device = Device.FromConnectionString("serial:COM3");
await device.ConnectAsync();

var pico = new PicoController(device);
await pico.InitializePicoAsync();

// Test LED
for (int i = 0; i < 5; i++)
{
    await pico.SetLedAsync(true);
    await Task.Delay(500);
    await pico.SetLedAsync(false);
    await Task.Delay(500);
}

// Read temperature
var temp = await pico.ReadTemperatureAsync();
Console.WriteLine($"Temperature: {temp:F1}°C");
```

## Firmware Installation

### MicroPython Installation (Recommended)

#### Step 1: Download Firmware

1. Visit [MicroPython Pico Downloads](https://micropython.org/download/rpi-pico/)
2. Download the latest stable firmware:
   - **Pico**: `rp2-pico-20231005-v1.21.0.uf2`
   - **Pico W**: `rp2-pico-w-20231005-v1.21.0.uf2`

#### Step 2: Enter BOOTSEL Mode

1. **Disconnect** the Pico from USB
2. **Hold down** the BOOTSEL button on the Pico
3. **Connect** the USB cable while holding BOOTSEL
4. **Release** the BOOTSEL button
5. The Pico will appear as a USB mass storage device named **RPI-RP2**

#### Step 3: Install Firmware

1. **Copy** (drag and drop) the `.uf2` firmware file to the **RPI-RP2** drive
2. The Pico will **automatically reboot** and start MicroPython
3. The **RPI-RP2** drive will disappear and be replaced by a **serial port**

#### Step 4: Verify Installation

1. **Connect** to the serial port using a terminal:

```bash
# Windows - check Device Manager for COM port
python -m serial.tools.miniterm COM3 115200

# Linux
screen /dev/ttyACM0 115200
# or
python -m serial.tools.miniterm /dev/ttyACM0 115200

# macOS
screen /dev/cu.usbmodem143201 115200
```

2. You should see the MicroPython REPL prompt: `>>>`
3. Test with: `print("Hello from Pico!")`

### CircuitPython Installation (Limited Support)

**Note**: Belay.NET is optimized for MicroPython. CircuitPython support is experimental.

1. Download CircuitPython from [circuitpython.org](https://circuitpython.org/board/raspberry_pi_pico/)
2. Follow the same BOOTSEL procedure as MicroPython
3. Some Belay.NET features may not work correctly with CircuitPython

### Troubleshooting Installation

**Pico not entering BOOTSEL mode**:
- Try a different USB cable (data cable, not charging-only)
- Hold BOOTSEL button longer before connecting USB
- Try a different USB port

**RPI-RP2 drive not appearing**:
- Check USB cable connection
- Try a different computer
- Ensure BOOTSEL button was held during connection

**Serial port not appearing after firmware install**:
- Wait 10-15 seconds for drivers to load
- Check Device Manager (Windows) or `dmesg` (Linux)
- Try disconnecting and reconnecting USB

## Hardware Specifications

### Raspberry Pi Pico vs Pico W

| Feature | Raspberry Pi Pico | Raspberry Pi Pico W |
|---------|-------------------|---------------------|
| **Microcontroller** | RP2040 | RP2040 |
| **CPU** | Dual-core ARM Cortex-M0+ @ 133MHz | Dual-core ARM Cortex-M0+ @ 133MHz |
| **Memory** | 264KB SRAM, 2MB Flash | 264KB SRAM, 2MB Flash |
| **GPIO Pins** | 26 digital I/O | 26 digital I/O (3 used for WiFi) |
| **ADC** | 3 × 12-bit ADC + 1 temperature | 3 × 12-bit ADC + 1 temperature |
| **PWM** | 8 × PWM channels, 16 outputs | 8 × PWM channels, 16 outputs |
| **Communication** | 2 × UART, 2 × I2C, 2 × SPI | 2 × UART, 2 × I2C, 2 × SPI |
| **Wireless** | None | 802.11b/g/n WiFi, Bluetooth 5.2 |
| **Connection** | USB Serial | USB Serial + WebREPL (planned) |
| **Price** | ~$4 | ~$6 |

### Key Features

- **Built-in LED**: GPIO 25 (all Pico variants)
- **Temperature Sensor**: Internal RP2040 sensor accessible via ADC(4)
- **Unique ID**: Hardware unique identifier for device identification
- **Flash Memory**: Large 2MB storage for files and programs
- **USB Native**: No external USB-to-serial chip required
- **3.3V Logic**: Compatible with most modern sensors and modules

## GPIO Pin Reference

### Standard GPIO Pins

| GPIO | Pin | Function | ADC | PWM | I2C | SPI | UART | Notes |
|------|-----|----------|-----|-----|-----|-----|------|-------|
| 0 | 1 | I/O | - | 0A | - | RX | TX | |
| 1 | 2 | I/O | - | 0B | - | CSn | RX | |
| 2 | 4 | I/O | - | 1A | SDA | SCK | - | I2C1 SDA |
| 3 | 5 | I/O | - | 1B | SCL | TX | - | I2C1 SCL |
| 4 | 6 | I/O | - | 2A | - | RX | - | |
| 5 | 7 | I/O | - | 2B | - | CSn | - | |
| 6 | 9 | I/O | - | 3A | SDA | SCK | - | I2C0 SDA |
| 7 | 10 | I/O | - | 3B | SCL | TX | - | I2C0 SCL |
| 8 | 11 | I/O | - | 4A | - | RX | - | |
| 9 | 12 | I/O | - | 4B | - | CSn | - | |
| 10 | 14 | I/O | - | 5A | SDA | SCK | - | |
| 11 | 15 | I/O | - | 5B | SCL | TX | - | |
| 12 | 16 | I/O | - | 6A | - | RX | - | |
| 13 | 17 | I/O | - | 6B | - | CSn | - | |
| 14 | 19 | I/O | - | 7A | SDA | SCK | - | |
| 15 | 20 | I/O | - | 7B | SCL | TX | - | |
| 16 | 21 | I/O | - | 0A | - | RX | - | |
| 17 | 22 | I/O | - | 0B | - | CSn | - | |
| 18 | 24 | I/O | - | 1A | SDA | SCK | - | |
| 19 | 25 | I/O | - | 1B | SCL | TX | - | |
| 20 | 26 | I/O | - | 2A | - | RX | - | |
| 21 | 27 | I/O | - | 2B | - | CSn | - | |
| 22 | 29 | I/O | - | 3A | SDA | SCK | - | |
| 26 | 31 | I/O | ADC0 | - | - | - | - | Analog input |
| 27 | 32 | I/O | ADC1 | - | - | - | - | Analog input |
| 28 | 34 | I/O | ADC2 | - | - | - | - | Analog input |
| 25 | 30 | I/O | - | - | - | - | - | **Built-in LED** |

### Special Pins

- **ADC(4)**: Internal temperature sensor (not a GPIO pin)
- **GPIO 23-25**: Pico W uses these for WiFi module (unavailable)
- **VSYS**: System voltage input (1.8-5.5V)
- **3V3**: 3.3V output (up to 300mA)
- **VBUS**: USB 5V (when connected)
- **GND**: Ground pins (multiple available)

### Basic GPIO Usage

```csharp
[Setup]
public async Task SetupGPIOAsync()
{
    await device.ExecuteAsync(@"
from machine import Pin, PWM, ADC

# Digital output - LED
led = Pin(25, Pin.OUT)

# Digital input with pull-up
button = Pin(15, Pin.IN, Pin.PULL_UP)

# PWM output
pwm = PWM(Pin(16))
pwm.freq(1000)

# Analog input
adc = ADC(Pin(26))
    ");
}

[Task]
public async Task<int> ReadAnalogAsync(int pin)
{
    return await device.ExecuteAsync<int>($@"
from machine import ADC, Pin
adc = ADC(Pin({pin}))
adc.read_u16()
    ");
}

[Task]
public async Task SetPWMAsync(int pin, int frequency, int dutyCycle)
{
    await device.ExecuteAsync($@"
from machine import PWM, Pin
pwm = PWM(Pin({pin}))
pwm.freq({frequency})
pwm.duty_u16({dutyCycle})  # 0-65535
    ");
}
```

## Pico W WiFi Capabilities

### Basic WiFi Setup

```csharp
public class PicoWController
{
    private readonly Device device;
    
    public PicoWController(Device device)
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
    public async Task<bool> ConnectWiFiAsync(string ssid, string password)
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
result = [net[0].decode('utf-8') for net in networks[:10]]  # Limit to 10
json.dumps(result)
        ");
        return System.Text.Json.JsonSerializer.Deserialize<List<string>>(networks) ?? new();
    }
}
```

## File System Operations

Pico's 2MB flash provides ample space for file storage:

```csharp
using Belay.Sync;

// Upload configuration file
var config = """
{
    "sensor_interval": 30,
    "led_brightness": 128,
    "debug_mode": false
}
""";
await device.FileSystem().WriteFileAsync("/config.json", config);

// Upload Python module
var module = """
def calculate_average(values):
    return sum(values) / len(values) if values else 0

def format_temperature(temp):
    return f"{temp:.1f}°C"
""";
await device.FileSystem().WriteFileAsync("/utils.py", module);

// List files
var files = await device.FileSystem().ListFilesAsync("/");
foreach (var file in files)
{
    Console.WriteLine($"{file.Name}: {file.Size} bytes");
}

// Use uploaded module
var result = await device.ExecuteAsync<float>(@"
import utils
temps = [22.1, 23.5, 21.8, 24.2]
utils.calculate_average(temps)
");
```

## Performance Characteristics

Based on validation testing:

- **Connection Time**: ~1-2 seconds for USB serial
- **Task Execution**: 5-30ms for simple operations
- **Temperature Reading**: ~10ms typical
- **LED Control**: ~5ms typical
- **File Transfer**: ~50KB/s for large files
- **Memory Available**: ~200KB free RAM typical
- **GPIO Speed**: ~100kHz toggle rate
- **ADC Speed**: ~500ksps maximum

## Example Projects

### Complete Validation Example

```bash
# Run comprehensive Pico testing
cd /path/to/belay.net
dotnet run --project examples/PicoHardwareTest/PicoHardwareTest.csproj serial:COM3
```

### Compare Pico vs ESP32

```bash
# Performance comparison
dotnet run --project examples/PlatformComparisonTest/PlatformComparisonTest.csproj serial:/dev/ttyUSB0 serial:/dev/ttyACM0
```

## Troubleshooting

### Connection Issues

**"Port not found"**:
- Check Device Manager (Windows) or `ls /dev/tty*` (Linux)
- Ensure MicroPython is installed (not BOOTSEL mode)
- Try different USB cable or port
- Reset Pico by disconnecting/reconnecting USB

**"Device not responding"**:
- Press the reset button if available
- Check baud rate (115200 is standard)
- Try a different terminal program
- Re-flash MicroPython firmware

### Performance Issues

**Slow Task execution**:
- Use `[Task(Cache = true)]` for repeated operations
- Minimize imports in task code
- Consider batch operations for multiple GPIO changes

**Memory errors**:
- Call `gc.collect()` periodically
- Reduce string operations and large data structures
- Use binary file transfers for large data

### Hardware Issues

**LED not working**:
- Verify GPIO 25 is used for built-in LED
- Check if LED is functional (some boards vary)
- Try external LED on different GPIO pin

**Temperature readings incorrect**:
- RP2040 temperature sensor has ±2°C accuracy
- Allow time for thermal stabilization
- Calibrate against known temperature if needed

**ADC readings noisy**:
- Use ADC averaging: `sum([adc.read_u16() for _ in range(10)]) // 10`
- Ensure stable power supply
- Add filtering capacitors if needed

## Advanced Features

### PIO (Programmable I/O)

```csharp
[Task]
public async Task SetupPIOAsync()
{
    await device.ExecuteAsync(@"
import rp2

@rp2.asm_pio(set_init=rp2.PIO.OUT_LOW)
def blink():
    set(pins, 1) [31]
    set(pins, 0) [31]

# Create and start PIO state machine
sm = rp2.StateMachine(0, blink, freq=2000, set_base=machine.Pin(25))
sm.active(1)
    ");
}
```

### Dual-Core Processing

```csharp
[Task]
public async Task StartCoreTask()
{
    await device.ExecuteAsync(@"
import _thread
import time

def core1_task():
    while True:
        print('Core 1 running')
        time.sleep(1)

_thread.start_new_thread(core1_task, ())
    ");
}
```

## Related Documentation

- [Hardware Compatibility](/hardware/compatibility) - Device compatibility matrix
- [Connection Types](/hardware/connections) - Connection setup guide
- [Getting Started](/guide/getting-started) - Basic Belay.NET setup
- [Configuration Guide](/guide/configuration) - Pico-specific settings
- [Device Communication](/guide/device-communication) - File operations and data transfer
- [Testing Guide](/guide/testing) - Pico hardware testing

## External Resources

- [Raspberry Pi Pico Documentation](https://www.raspberrypi.org/documentation/microcontrollers/)
- [MicroPython Pico Documentation](https://docs.micropython.org/en/latest/rp2/quickref.html)
- [RP2040 Datasheet](https://datasheets.raspberrypi.org/rp2040/rp2040-datasheet.pdf)
- [Pico Pinout Diagram](https://datasheets.raspberrypi.org/pico/Pico-R3-A4-Pinout.pdf)
- [Belay.NET GitHub Repository](https://github.com/belay-dotnet/Belay.NET)

**Need help?** Check our [troubleshooting guide](/hardware/troubleshooting-connections) or ask in [GitHub Discussions](https://github.com/belay-dotnet/Belay.NET/discussions).