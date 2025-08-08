# Raspberry Pi Pico Setup Guide

::: warning Documentation in Progress
This documentation is currently being developed. Pico support is fully implemented and tested.

**Status**: ✅ Core functionality complete, 📝 Documentation in progress  
**Expected completion**: After hardware validation documentation phase
:::

## Coming Soon

This page will provide complete setup instructions for Raspberry Pi Pico and Pico W, including:

- **Firmware Installation**: Step-by-step MicroPython and CircuitPython installation
- **Driver Setup**: Windows, Linux, and macOS driver installation
- **Connection Verification**: Testing your Pico connection with Belay.NET
- **Pin Configuration**: GPIO pin mapping and peripheral setup
- **Troubleshooting**: Common Pico-specific issues and solutions
- **Performance Optimization**: Getting the best performance from your Pico
- **Pico W WiFi Setup**: Wireless capabilities and WebREPL configuration

## Quick Start Preview

```csharp
// Example of what's coming - Pico-specific device control
public class PicoController : Device
{
    [Setup]
    public async Task InitializePicoAsync()
    {
        await ExecuteAsync(@"
from machine import Pin, PWM
led = Pin(25, Pin.OUT)  # Built-in LED
button = Pin(15, Pin.IN, Pin.PULL_UP)  # External button
pwm = PWM(Pin(16))  # PWM output
pwm.freq(1000)
");
    }

    [Task]
    public async Task<bool> ReadButtonAsync() =>
        await ExecuteAsync<bool>("button.value() == 0");  # Active low

    [Task]
    public async Task SetLedAsync(bool state) =>
        await ExecuteAsync($"led.{'on' if state else 'off'}()");

    [Task]
    public async Task SetPwmDutyCycleAsync(int dutyCycle) =>
        await ExecuteAsync($"pwm.duty_u16({dutyCycle})");
}

// Usage
using var pico = Device.FromConnectionString("serial:COM3");
await pico.ConnectAsync();

var controller = new PicoController();
await controller.InitializePicoAsync();

// Control the built-in LED
await controller.SetLedAsync(true);
await Task.Delay(1000);
await controller.SetLedAsync(false);

// Read button state
var buttonPressed = await controller.ReadButtonAsync();
Console.WriteLine($"Button pressed: {buttonPressed}");
```

## Firmware Installation

### MicroPython Installation
1. Download the latest MicroPython firmware for Pico from [micropython.org](https://micropython.org/download/rpi-pico/)
2. Hold BOOTSEL button while connecting USB cable
3. Drag and drop the `.uf2` file to the RPI-RP2 drive
4. Pico will reboot and be ready for Belay.NET

### CircuitPython Installation (Beta Support)
1. Download CircuitPython firmware from [circuitpython.org](https://circuitpython.org/board/raspberry_pi_pico/)
2. Follow similar BOOTSEL procedure
3. Note: Some Belay.NET features may have limited support

## Hardware Specifications

| Feature | Raspberry Pi Pico | Raspberry Pi Pico W |
|---------|-------------------|---------------------|
| **Microcontroller** | RP2040 | RP2040 |
| **CPU** | Dual-core ARM Cortex-M0+ @ 133MHz | Dual-core ARM Cortex-M0+ @ 133MHz |
| **Memory** | 264KB SRAM, 2MB Flash | 264KB SRAM, 2MB Flash |
| **GPIO Pins** | 26 digital I/O | 26 digital I/O |
| **ADC** | 3 × 12-bit ADC | 3 × 12-bit ADC |
| **PWM** | 8 × PWM channels | 8 × PWM channels |
| **Communication** | 2 × UART, 2 × I2C, 2 × SPI | 2 × UART, 2 × I2C, 2 × SPI |
| **Wireless** | None | 802.11b/g/n WiFi, Bluetooth 5.2 |
| **Connection** | USB Serial | USB Serial, WebREPL* |

_*WebREPL support coming in v0.3.0_

## Related Documentation

- [Hardware Compatibility](/hardware/compatibility) - Full device compatibility matrix
- [Connection Types](/hardware/connections) - Connection setup and configuration
- [Getting Started](/guide/getting-started) - Basic Belay.NET setup
- [Sensor Reading Examples](/examples/sensor-reading) - Pico sensor projects

**Need immediate help?** Check [Raspberry Pi Pico documentation](https://www.raspberrypi.org/documentation/microcontrollers/) or our [GitHub Discussions](https://github.com/belay-dotnet/Belay.NET/discussions).