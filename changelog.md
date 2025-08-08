# Changelog

All notable changes to Belay.NET will be documented in this file.

## [0.2.0] - 2025-01-XX

### Added
- **Dependency Injection Infrastructure** - Full Microsoft.Extensions.DependencyInjection support
- **Session Management System** - Advanced device session handling and lifecycle management  
- **Unified Exception Handling** - Comprehensive exception hierarchy with device error mapping
- **Health Monitoring** - Built-in health checks and diagnostics
- **Configuration Management** - Structured configuration with validation
- **Factory Patterns** - IDeviceFactory, ICommunicatorFactory for flexible creation
- **Subprocess Communication** - Testing support without physical hardware
- **Raw REPL Protocol** - Low-level protocol implementation for MicroPython
- **Executor Framework** - Task, Setup, and Teardown execution patterns
- **File Synchronization Foundation** - DeviceFileSystem for file operations

### Changed  
- **Breaking**: Restructured namespaces for better organization
- **Breaking**: Updated Device constructor to require explicit logger
- Improved error handling with detailed device tracebacks
- Enhanced async/await patterns throughout the library
- Better connection state management and recovery

### Fixed
- Raw REPL protocol flow control issues
- Thread safety in concurrent operations
- Memory management in long-running sessions
- Connection recovery after device reset

## [0.1.0] - 2024-XX-XX  

### Added
- Initial release of Belay.NET
- Basic device communication via Serial ports
- Attribute-based method execution
- Simple task execution on MicroPython devices
- Core Device and DeviceCommunication classes

## Roadmap

### [0.3.0] - Planned
- **Package Management System** - NuGet-style package deployment to devices
- **Advanced File Sync** - Bidirectional file synchronization  
- **WebREPL Support** - Wireless device communication
- **Proxy Object System** - Dynamic proxy generation for device objects
- **Performance Optimizations** - Connection pooling and caching

### [1.0.0] - Future
- **Stable API** - Long-term compatibility guarantees
- **Production Hardening** - Enterprise deployment features
- **Extended Hardware Support** - Additional device types and protocols
- **Visual Studio Integration** - Enhanced tooling and debugging

## Migration Guides

### Upgrading from 0.1.x to 0.2.x

The 0.2.0 release includes breaking changes. See the [Migration Guide](https://github.com/belay-dotnet/Belay.NET/wiki/Migration-0.2) for detailed upgrade instructions.

Key changes:
- Updated dependency injection registration
- Modified Device constructor parameters  
- Renamed some exception types
- Changed default configuration values

## Contributing

We welcome contributions! See our [Contributing Guide](/contributing) for details on:
- Submitting bug reports
- Proposing new features  
- Creating pull requests
- Development workflow

## Release Notes

Detailed release notes for each version are available on [GitHub Releases](https://github.com/belay-dotnet/Belay.NET/releases).