# Hardware Compatibility

Belay.NET works with a wide range of MicroPython and CircuitPython compatible devices.

## Quick Compatibility Reference

| Device | MicroPython | CircuitPython | Connection | Status |
|--------|-------------|---------------|------------|--------|
| Raspberry Pi Pico | ✅ | ✅ | USB Serial | Fully Supported |
| ESP32 | ✅ | ✅ | USB Serial | Fully Supported |
| ESP8266 | ✅ | ❌ | USB Serial | Fully Supported |
| PyBoard | ✅ | ❌ | USB Serial | Fully Supported |
| CircuitPython Boards | ❌ | ✅ | USB Serial | Fully Supported |

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

## Getting Started

1. **Install firmware** on your device (MicroPython or CircuitPython)
2. **Connect via USB** and note the COM port / device path
3. **Install Belay.NET** in your .NET project
4. **Create a device connection** using the appropriate communication class

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