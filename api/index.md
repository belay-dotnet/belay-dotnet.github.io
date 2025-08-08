# API Reference

The Belay.NET API documentation provides detailed information about all public classes, methods, and interfaces.

## Core Namespaces

### Belay.Core
Core device communication and management functionality.

- **Device** - Main device connection and communication class
- **IDeviceCommunication** - Interface for device communication protocols
- **DeviceExecutionException** - Exception handling for device errors

### Belay.Attributes
Decorative attributes for method execution on MicroPython devices.

- **TaskAttribute** - Execute methods as tasks on the device
- **SetupAttribute** - Mark setup methods for device initialization  
- **TeardownAttribute** - Mark cleanup methods for device teardown

### Belay.Extensions
Dependency injection and configuration extensions.

- **ServiceCollectionExtensions** - DI registration methods
- **BelayConfiguration** - Configuration options
- **IDeviceFactory** - Factory for creating device instances

### Belay.Sync
File synchronization and device file system operations.

- **IDeviceFileSystem** - Interface for device file operations
- **DeviceFileInfo** - Information about device files and directories

## Documentation Status

::: warning
Full API documentation is currently being generated from XML comments in the source code. 
This section will be expanded with detailed class and method documentation.
:::

## Usage Examples

For practical examples of using these APIs, see the [Examples](/examples/) section.

## Contributing

Found an error in the documentation? [Edit this page on GitHub](https://github.com/belay-dotnet/belay/edit/main/docs/api/index.md) or [open an issue](https://github.com/belay-dotnet/belay/issues).