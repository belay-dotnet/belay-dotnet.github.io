# Enhanced Executor Framework

The Enhanced Executor Framework provides advanced method interception and pipeline processing capabilities for Belay.NET applications. It extends the existing executor infrastructure with transparent attribute-based programming and seamless C# to MicroPython method routing.

## Overview

The Enhanced Executor Framework introduces several key components:

- **EnhancedExecutor**: Advanced method interception with pipeline processing
- **DeviceProxy**: Dynamic proxy for transparent method routing
- **ExecutionPipeline**: Multi-stage pipeline for attribute processing
- **Extension Methods**: Seamless integration with existing Device API

## Getting Started

### Basic Usage

```csharp
using Belay.Core.Execution;

// Get enhanced executor for a device
var enhancedExecutor = device.GetEnhancedExecutor();

// Execute methods through enhanced pipeline
var calculator = new MathCalculator();
var addMethod = typeof(MathCalculator).GetMethod(nameof(MathCalculator.Add));
var result = await enhancedExecutor.ExecuteAsync<int>(addMethod, calculator, new object[] { 10, 20 });
```

### Device Proxy Pattern

Create interfaces with Belay attributes for transparent execution:

```csharp
public interface ISensorDevice {
    [Setup]
    Task InitializeSensors();

    [Task(TimeoutMs = 2000)]
    Task<float> ReadTemperature();

    [Task(TimeoutMs = 2000)]  
    Task<float> ReadHumidity();

    [Teardown]
    Task Cleanup();
}

// Create proxy that automatically routes method calls
var sensorProxy = device.CreateProxy<ISensorDevice>();

// These calls are automatically executed on the MicroPython device
await sensorProxy.InitializeSensors();
var temp = await sensorProxy.ReadTemperature();
var humidity = await sensorProxy.ReadHumidity();
await sensorProxy.Cleanup();
```

## Pipeline Architecture

The Enhanced Executor uses a multi-stage pipeline:

1. **Validation Stage**: Validates method parameters and context
2. **Task Attribute Stage**: Processes Task attribute configuration
3. **Thread Attribute Stage**: Handles Thread attribute processing
4. **Deployment Stage**: Manages method deployment to device
5. **Execution Stage**: Performs actual method execution

## Performance Features

### Method Interception Caching

The framework caches method interception contexts for improved performance:

```csharp
// First call builds and caches the pipeline
var result1 = await enhancedExecutor.ExecuteAsync<int>(method, instance, args);

// Subsequent calls use cached pipeline configuration
var result2 = await enhancedExecutor.ExecuteAsync<int>(method, instance, args);
```

### Memory Management

Uses `ConditionalWeakTable` for automatic cleanup:

- Device instances can be garbage collected properly
- Cached executors are automatically cleaned up
- No memory leaks from static caches

## Advanced Usage

### Enhanced Device Wrapper

For applications requiring enhanced features as first-class citizens:

```csharp
using var enhancedDevice = new EnhancedDevice(device);

// Direct access to enhanced executor
var stats = enhancedDevice.GetExecutionStatistics();

// Create proxies with enhanced device
var proxy = enhancedDevice.CreateProxy<IMyDevice>();
```

### Execution Statistics

Monitor enhanced executor performance:

```csharp
var stats = device.GetEnhancedExecutionStatistics();
if (stats != null) {
    Console.WriteLine($"Intercepted Methods: {stats.InterceptedMethodCount}");
    Console.WriteLine($"Pipeline Stages: {stats.PipelineStageCount}");
    Console.WriteLine($"Cache Entries: {stats.DeploymentCacheStatistics.CurrentEntryCount}");
}
```

## Thread Safety

The Enhanced Executor Framework is designed for thread-safe operation:

- `ConditionalWeakTable` provides thread-safe caching
- `ConcurrentDictionary` used for method interception cache
- Pipeline stages are stateless and thread-safe

## Error Handling

The framework provides comprehensive error handling:

```csharp
try {
    var result = await enhancedExecutor.ExecuteAsync<int>(method, instance, args);
} catch (ArgumentException ex) {
    // Parameter validation errors
    Console.WriteLine($"Invalid parameters: {ex.Message}");
} catch (InvalidOperationException ex) {
    // Method execution errors
    Console.WriteLine($"Execution failed: {ex.Message}");
}
```

## Best Practices

### Interface Design

Design interfaces with proper Belay attributes:

```csharp
public interface IDeviceController {
    // Use Setup for initialization
    [Setup(Order = 1)]
    Task InitializeHardware();

    // Use Task for device operations
    [Task(Cache = true)]
    Task<string> GetDeviceInfo();

    // Use Thread for background operations
    [Thread(AutoRestart = true)]
    Task StartMonitoring();

    // Use Teardown for cleanup
    [Teardown]
    Task Shutdown();
}
```

### Resource Management

Properly dispose enhanced devices:

```csharp
using var device = new Device(communication, logger, loggerFactory);
using var enhancedDevice = new EnhancedDevice(device);

// Use enhanced device...
```

### Performance Optimization

- Cache method references when making repeated calls
- Use the same enhanced executor instance for multiple operations
- Consider using proxy pattern for frequent method calls

## Integration with Existing Code

The Enhanced Executor Framework is fully backwards compatible:

```csharp
// Existing code continues to work
await device.Task.ExecuteAsync("print('Hello World')");

// Enhanced features available through extensions
var enhancedExecutor = device.GetEnhancedExecutor();
var proxy = device.CreateProxy<IMyDevice>();
```

## See Also

- [Attribute Reference](../articles/attributes-reference.md)
- [Task Executor](task-executor.md)
- [Thread Executor](thread-executor.md)
- [Device Programming](../articles/device-programming.md)