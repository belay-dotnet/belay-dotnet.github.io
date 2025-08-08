# What is Belay.NET?

Belay.NET is a C# library that enables seamless integration between .NET applications and MicroPython/CircuitPython devices. It allows you to treat MicroPython devices as off-the-shelf hardware components in your .NET applications.

## Key Features

### 🚀 **Zero Friction Integration**
Write C# methods that execute on MicroPython devices as if they were local functions.

```csharp
[Task]
public async Task<bool> ReadSensor() => """
    import machine
    adc = machine.ADC(0)
    return adc.read() > 512
""";

var isHigh = await device.ReadSensor(); // Executes on device!
```

### 🔄 **Async-First Architecture**
Built from the ground up with async/await patterns for responsive applications.

### 🏗️ **Enterprise Ready**
- Full dependency injection support
- Structured logging integration  
- Health monitoring
- Configuration management
- Comprehensive error handling

### 🎯 **Strongly Typed**
Compile-time type safety with generic return types and automatic JSON serialization.

### 🔌 **Multiple Connection Types**
- USB Serial (recommended)
- WebREPL for wireless connections
- Subprocess for testing and development

## Use Cases

### IoT Applications
Control sensors, actuators, and displays from .NET applications.

### Home Automation
Integrate MicroPython devices into home automation systems built with .NET.

### Industrial Control
Monitor and control industrial equipment using MicroPython devices.

### Educational Projects  
Teach embedded programming concepts using familiar .NET tools.

### Prototyping
Rapidly prototype IoT solutions by combining .NET business logic with MicroPython hardware control.

## Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   .NET App      │    │   Belay.NET     │    │  MicroPython    │
│                 │    │                 │    │     Device      │
│  ┌───────────┐  │    │  ┌───────────┐  │    │  ┌───────────┐  │
│  │ Business  │  │    │  │   Device  │  │    │  │  Python   │  │
│  │  Logic    │◄─┼────┼─►│   Proxy   │◄─┼────┼─►│   Code    │  │
│  └───────────┘  │    │  └───────────┘  │    │  └───────────┘  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Why Belay.NET?

### **Familiar Development Experience**
Write device code using C# methods and attributes. No need to learn new tools or deployment processes.

### **Reliable Communication**
Robust protocol handling with automatic error recovery and connection management.

### **Production Ready**  
Built with enterprise patterns: dependency injection, logging, configuration, and health monitoring.

### **Cross-Platform**
Works on Windows, macOS, and Linux with .NET 6+.

## Getting Started

Ready to start? Check out our [Getting Started Guide](/guide/getting-started) to build your first Belay.NET application in minutes.