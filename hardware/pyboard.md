# PyBoard Setup Guide

::: warning Documentation in Progress
This documentation is currently being developed. PyBoard support is fully implemented and tested.

**Status**: ✅ Core functionality complete, 📝 Documentation in progress  
**Expected completion**: After hardware validation documentation phase
:::

## Coming Soon

This page will provide complete setup instructions for MicroPython PyBoard, including:

- **PyBoard Variants**: Original PyBoard v1.1, PyBoard D, and PyBoard Lite
- **Driver Installation**: Windows, Linux, and macOS driver setup
- **DFU Mode**: Device Firmware Update mode for firmware installation
- **Pin Configuration**: PyBoard-specific GPIO and peripheral mapping
- **SD Card Support**: File system and storage capabilities
- **RTC Setup**: Real-time clock configuration and battery backup
- **Performance Optimization**: Getting maximum performance from PyBoard

## Quick Start Preview

```csharp
// Example of what's coming - PyBoard-specific device control
public class PyBoardController : Device
{
    [Setup]
    public async Task InitializePyBoardAsync()
    {
        await ExecuteAsync(@"
import pyb
from machine import Pin

# Built-in LEDs (4 LEDs on PyBoard)
led1 = pyb.LED(1)  # Red
led2 = pyb.LED(2)  # Green
led3 = pyb.LED(3)  # Yellow
led4 = pyb.LED(4)  # Blue

# Switch and pins
switch = pyb.Switch()
pin_x1 = pyb.Pin.board.X1
pin_x2 = pyb.Pin.board.X2

# ADC
adc = pyb.ADC(pin_x1)

# Timer and PWM
tim = pyb.Timer(2, freq=1000)
pwm = tim.channel(1, pyb.Timer.PWM, pin=pyb.Pin.board.X1)
");
    }

    [Task]
    public async Task SetLedAsync(int ledNumber, bool state)
    {
        if (ledNumber < 1 || ledNumber > 4)
            throw new ArgumentException("LED number must be 1-4");
            
        await ExecuteAsync($"led{ledNumber}.{'on' if state else 'off'}()");
    }

    [Task]
    public async Task LedSequenceAsync()
    {
        await ExecuteAsync(@"
for i in range(1, 5):
    eval(f'led{i}').on()
    pyb.delay(100)
    eval(f'led{i}').off()
");
    }

    [Task]
    public async Task<bool> ReadSwitchAsync() =>
        await ExecuteAsync<bool>("switch.value()");

    [Task]
    public async Task<int> ReadAdcAsync() =>
        await ExecuteAsync<int>("adc.read()");

    [Task]
    public async Task SetPwmDutyCycleAsync(int dutyCycle) =>
        await ExecuteAsync($"pwm.pulse_width_percent({dutyCycle})");
}

// Usage
using var pyboard = Device.FromConnectionString("serial:COM3");
await pyboard.ConnectAsync();

var controller = new PyBoardController();
await controller.InitializePyBoardAsync();

// LED sequence demo
await controller.LedSequenceAsync();

// Read switch state
var switchPressed = await controller.ReadSwitchAsync();
Console.WriteLine($"Switch pressed: {switchPressed}");

// PWM control
await controller.SetPwmDutyCycleAsync(50); // 50% duty cycle
```

## PyBoard Variants

### PyBoard v1.1 (Original)
- **CPU**: STM32F405RG @ 168MHz
- **Memory**: 192KB RAM, 1MB Flash
- **LEDs**: 4 built-in LEDs (Red, Green, Yellow, Blue)
- **Connectors**: 2 × 20-pin headers
- **Special Features**: Built-in switch, RTC with battery backup

### PyBoard D-series
- **Enhanced Performance**: Faster CPU, more memory
- **Advanced Features**: CAN bus, Ethernet (some models)
- **Compatibility**: Pin-compatible with v1.1

### PyBoard Lite
- **Compact Design**: Smaller form factor
- **Reduced Features**: Fewer pins, no LEDs or switch
- **Cost-Effective**: Budget-friendly option

## Pin Configuration

### GPIO Pins
```csharp
// PyBoard pin naming conventions
await device.ExecuteAsync("pin_x1 = pyb.Pin('X1', pyb.Pin.OUT_PP)");
await device.ExecuteAsync("pin_y1 = pyb.Pin('Y1', pyb.Pin.IN)");

// Alternative board pin access
await device.ExecuteAsync("pin = pyb.Pin.board.X1");
await device.ExecuteAsync("pin = pyb.Pin.board.Y2");
```

### Pin Functions
- **X1-X12**: GPIO pins with 5V tolerance
- **Y1-Y12**: GPIO pins (3.3V only)
- **A0-A7**: ADC inputs (Y11, Y12, X11, X12, etc.)
- **SPI1/SPI2**: Hardware SPI interfaces
- **I2C1/I2C2**: Hardware I2C interfaces
- **UART1-UART6**: Hardware UART interfaces

## Special Features

### Real-Time Clock (RTC)
```csharp
[Task]
public async Task<string> GetTimeAsync() =>
    await ExecuteAsync<string>("str(pyb.RTC().datetime())");

[Task]
public async Task SetTimeAsync(int year, int month, int day, int hour, int minute, int second) =>
    await ExecuteAsync($"pyb.RTC().datetime(({year}, {month}, {day}, 0, {hour}, {minute}, {second}, 0))");
```

### Built-in Accelerometer (PyBoard v1.1)
```csharp
[Task]
public async Task<string> ReadAccelerometerAsync() =>
    await ExecuteAsync<string>("str(pyb.Accel().filtered_xyz())");
```

## Firmware Updates

### DFU Mode
1. Connect PyBoard while holding USR switch
2. PyBoard appears as DFU device
3. Use `pydfu.py` or DFU tools to flash firmware

### Using pydfu.py
```bash
# Download from micropython.org
python pydfu.py -u firmware.dfu
```

## Related Documentation

- [Hardware Compatibility](/hardware/compatibility) - PyBoard compatibility details
- [Connection Types](/hardware/connections) - Serial connection setup
- [Getting Started](/guide/getting-started) - Basic Belay.NET setup
- [Sensor Reading Examples](/examples/sensor-reading) - PyBoard sensor projects

**Need immediate help?** Check [MicroPython PyBoard documentation](https://docs.micropython.org/en/latest/pyboard/quickref.html) or our [GitHub Discussions](https://github.com/belay-dotnet/Belay.NET/discussions).