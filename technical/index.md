# Technical Reference

This section provides in-depth technical documentation about MicroPython protocols, Belay.NET architecture, and implementation details for advanced users and developers.

## Protocol Documentation

Understanding the low-level communication protocols between .NET applications and MicroPython devices.

### [Raw REPL Protocol Deep Dive](/technical/protocols/raw-repl-protocol)
Complete technical specification of the MicroPython Raw REPL protocol, including flow control, adaptive detection, and device-specific variations.

### [Raw-Paste Mode and Flow Control](/technical/protocols/raw-paste-mode)
Advanced flow control mechanisms for efficient large code deployment with window management and protocol optimization.

### [Adaptive Protocol Detection](/technical/protocols/protocol-detection)
How Belay.NET automatically detects device capabilities and adjusts protocol parameters for optimal compatibility.

## Architecture Documentation

Deep dive into Belay.NET's internal architecture and design patterns.

### [Session Management Architecture](/technical/architecture/session-management)
Complete documentation of the DeviceSessionManager system, lifecycle management, and resource tracking.

### [Executor Framework Internals](/technical/architecture/executor-framework)  
Method interception, code deployment, caching strategies, and custom executor development.

## MicroPython Reference

Essential MicroPython knowledge for .NET developers working with embedded devices.

### [MicroPython Internals for .NET Developers](/technical/micropython/internals)
Memory model, garbage collection, threading constraints, and optimization strategies.

### [Device-Specific Protocol Variations](/technical/micropython/device-variations)
Detailed comparison of protocol behavior across ESP32, STM32, RP2040, and other MicroPython platforms.

## Who Should Use This Section

- **Advanced Users** debugging complex device communication issues
- **System Architects** designing large-scale IoT solutions  
- **Contributors** implementing new features or fixing protocol issues
- **Hardware Engineers** understanding device-specific behavior
- **Performance Engineers** optimizing communication protocols

## Getting Help

For questions about technical implementation details:

- [GitHub Discussions - Technical](https://github.com/belay-dotnet/Belay.NET/discussions/categories/technical)
- [Contributing Guide](/contributing) for development questions
- [API Reference](/api/) for implementation details

**Looking for user guides?** Start with the [Getting Started Guide](/guide/getting-started) for practical usage information.