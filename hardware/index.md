# Hardware Compatibility

Belay.NET works with **any device that runs official MicroPython firmware**. No pre-configuration required - just purchase off-the-shelf hardware, flash official firmware, plug in, and use.

## Official MicroPython Support

**✨ For the most comprehensive and up-to-date list of supported devices, visit the [official MicroPython download page](https://micropython.org/download/)**

Belay.NET is compatible with any device listed on the MicroPython downloads page. This includes hundreds of boards from popular manufacturers like Raspberry Pi, Espressif, Adafruit, SparkFun, and many others.

## Quick Compatibility Reference

| Device | MicroPython | CircuitPython | Connection | Status |
|--------|-------------|---------------|------------|--------|
| Raspberry Pi Pico | ✅ | ✅ | USB Serial | Fully Supported |
| ESP32 | ✅ | ✅ | USB Serial | Fully Supported |
| ESP8266 | ✅ | ❌ | USB Serial | Fully Supported |
| PyBoard | ✅ | ❌ | USB Serial | Fully Supported |
| CircuitPython Boards | ❌ | ✅ | USB Serial | Fully Supported |

## Zero-Configuration Setup

Belay.NET is designed for **zero-friction hardware integration**. Here's how simple it is:

1. **Purchase any MicroPython-compatible device** from the [official downloads page](https://micropython.org/download/)
2. **Flash official MicroPython firmware** (one-time setup, usually via drag-and-drop)
3. **Plug in via USB** - no additional configuration needed
4. **Install Belay.NET** and start coding immediately

**No custom firmware modifications**, **no bootloader changes**, **no device-specific setup** - just official MicroPython and you're ready to go.

## Connection Types

### USB Serial (Recommended)
Direct USB connection provides the most reliable and fastest communication.

```csharp
using var device = new Device(new SerialDeviceCommunication("COM3"));
await device.StartAsync();
```

### WebREPL (MicroPython Only)
Wireless connection over WiFi for MicroPython devices.

```csharp
using var device = new Device(new WebReplDeviceCommunication("192.168.1.100", 8266));
await device.StartAsync();
```

## Detailed Guides

- [Raspberry Pi Pico Setup](/hardware/raspberry-pi-pico)
- [ESP32 Setup](/hardware/esp32) 
- [PyBoard Setup](/hardware/pyboard)
- [CircuitPython Devices](/hardware/circuitpython)

## Testing Your Setup

For comprehensive hardware testing information, see the [Hardware Testing Guide](/hardware-testing-guide).

## Troubleshooting

Having connection issues? Check out our troubleshooting guides:

- [Connection Problems](/hardware/troubleshooting-connections)
- [Performance Issues](/hardware/troubleshooting-performance)