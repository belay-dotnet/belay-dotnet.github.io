# CircuitPython Device Support

::: warning Documentation in Progress
This documentation is currently being developed. CircuitPython support is in beta with core functionality implemented.

**Status**: 🧪 Beta support, 📝 Documentation in progress  
**Expected completion**: After CircuitPython validation testing
:::

## Coming Soon

This page will provide setup and usage guidance for CircuitPython devices, including:

- **Supported Boards**: Adafruit and community CircuitPython boards
- **Firmware Installation**: CircuitPython firmware installation process
- **Library Management**: Installing and managing CircuitPython libraries
- **Pin Compatibility**: CircuitPython vs MicroPython pin differences
- **Feature Limitations**: Known limitations and workarounds
- **Adafruit Ecosystem**: Integration with Adafruit learning guides
- **Performance Considerations**: CircuitPython-specific optimizations

## Current Beta Status

CircuitPython devices work with Belay.NET using the same Raw REPL protocol as MicroPython, but there are some differences:

### ✅ Working Features
- Basic device connection and communication
- Code execution via Raw REPL protocol
- File transfer capabilities
- Most attribute-based programming patterns

### 🔄 Limitations (Beta)
- Some MicroPython-specific modules not available
- Different pin naming conventions
- Library compatibility differences
- Performance variations

## Quick Start Preview

```csharp
// Example of what's coming - CircuitPython device control
public class CircuitPythonController : Device
{
    [Setup]
    public async Task InitializeCircuitPythonAsync()
    {
        await ExecuteAsync(@"
import board
import digitalio
import analogio

# Built-in LED (varies by board)
led = digitalio.DigitalInOut(board.LED)
led.direction = digitalio.Direction.OUTPUT

# Analog input
analog_in = analogio.AnalogIn(board.A0)

# Digital input with pull-up
button = digitalio.DigitalInOut(board.BUTTON)
button.direction = digitalio.Direction.INPUT
button.pull = digitalio.Pull.UP
");
    }

    [Task]
    public async Task SetLedAsync(bool state) =>
        await ExecuteAsync($"led.value = {(state ? "True" : "False")}");

    [Task]
    public async Task<bool> ReadButtonAsync() =>
        await ExecuteAsync<bool>("not button.value");  // Inverted for pull-up

    [Task]
    public async Task<int> ReadAnalogAsync() =>
        await ExecuteAsync<int>("analog_in.value");

    [Task]
    public async Task<float> ReadAnalogVoltageAsync() =>
        await ExecuteAsync<float>("analog_in.value * 3.3 / 65536");
}

// Usage
using var device = Device.FromConnectionString("serial:COM3");
await device.ConnectAsync();

var controller = new CircuitPythonController();
await controller.InitializeCircuitPythonAsync();

// Control LED
await controller.SetLedAsync(true);
await Task.Delay(1000);
await controller.SetLedAsync(false);

// Read sensors
var analogValue = await controller.ReadAnalogAsync();
var voltage = await controller.ReadAnalogVoltageAsync();
Console.WriteLine($"Analog: {analogValue}, Voltage: {voltage:F2}V");
```

## Popular CircuitPython Boards

### Adafruit Feather Series
- **Feather M4 Express**: SAMD51 @ 120MHz
- **Feather ESP32-S2**: WiFi-enabled with native USB
- **Feather RP2040**: Raspberry Pi RP2040 chip

### Adafruit ItsyBitsy Series
- **ItsyBitsy M4**: Compact SAMD51 board
- **ItsyBitsy RP2040**: Tiny RP2040 board

### Raspberry Pi Pico
- **CircuitPython Support**: Alternative firmware to MicroPython
- **Pin Compatibility**: Same hardware, different software approach

## Key Differences from MicroPython

### Pin Naming
```csharp
// MicroPython style
await device.ExecuteAsync("from machine import Pin; led = Pin(25, Pin.OUT)");

// CircuitPython style
await device.ExecuteAsync("import board, digitalio; led = digitalio.DigitalInOut(board.LED)");
```

### Library Structure
```csharp
// MicroPython
await device.ExecuteAsync("from machine import ADC, Pin; adc = ADC(Pin(26))");

// CircuitPython
await device.ExecuteAsync("import board, analogio; adc = analogio.AnalogIn(board.A0)");
```

### Module Availability
- **CircuitPython**: Rich Adafruit library ecosystem
- **MicroPython**: More low-level hardware access
- **Compatibility**: Some modules may not be interchangeable

## Library Management

### CircuitPython Bundle
CircuitPython uses a different library system:
1. Download CircuitPython library bundle from Adafruit
2. Copy required libraries to `/lib` folder on device
3. Import libraries in your Python code

### Common Libraries
- `adafruit_motor`: Motor control
- `adafruit_sensors`: Various sensor drivers
- `adafruit_display`: Display drivers
- `neopixel`: RGB LED strips

## Validation Status

| Feature | Status | Notes |
|---------|--------|-------|
| **Basic Communication** | ✅ Working | Raw REPL compatible |
| **File Transfer** | ✅ Working | Standard file operations |
| **Attribute System** | ✅ Working | Task, Setup, Thread, Teardown |
| **Error Handling** | ✅ Working | Exception mapping functional |
| **Library Compatibility** | 🔄 Testing | Some MicroPython libraries incompatible |
| **Performance** | 🔄 Testing | Evaluating vs MicroPython |

## Related Documentation

- [Hardware Compatibility](/hardware/compatibility) - Full compatibility matrix
- [Getting Started](/guide/getting-started) - Basic setup guide
- [Attribute Programming](/guide/attributes) - Using attributes with CircuitPython
- [Raspberry Pi Pico](/hardware/raspberry-pi-pico) - Pico with CircuitPython

**Need immediate help?** Check [CircuitPython documentation](https://docs.circuitpython.org/) or our [GitHub Discussions](https://github.com/belay-dotnet/Belay.NET/discussions) for CircuitPython-specific questions.