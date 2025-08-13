# ICD-002: Device Communication Contract

**Version**: 1.0  
**Date**: 2025-01-13  
**Status**: Active  

## Overview

This document defines the simplified communication contract for MicroPython devices, replacing the complex `IDeviceCommunication` hierarchy with a clear, minimal interface.

## Core Operations

### Primary Interface

```csharp
public interface IDeviceConnection
{
    // Core execution - this is 90% of all operations
    Task<string> ExecutePython(string code, CancellationToken cancellationToken = default);
    Task<T> ExecutePython<T>(string code, CancellationToken cancellationToken = default);
    
    // File operations
    Task WriteFile(string devicePath, byte[] data, CancellationToken cancellationToken = default);
    Task<byte[]> ReadFile(string devicePath, CancellationToken cancellationToken = default);
    Task DeleteFile(string devicePath, CancellationToken cancellationToken = default);
    Task<string[]> ListFiles(string devicePath = "/", CancellationToken cancellationToken = default);
    
    // Connection management
    Task Connect(CancellationToken cancellationToken = default);
    Task Disconnect();
    bool IsConnected { get; }
    
    // Device info
    string DeviceInfo { get; }
    string ConnectionString { get; }
}
```

## Attribute Handling Contract

Instead of complex executor hierarchies, use simple attribute handling:

```csharp
public static class AttributeHandler
{
    public static async Task<T> HandleMethod<T>(IDeviceConnection device, MethodInfo method, object[] args)
    {
        var pythonCode = GeneratePythonCode(method, args);
        var policies = GetExecutionPolicies(method);
        
        return await ExecuteWithPolicies<T>(device, pythonCode, policies);
    }
    
    private static async Task<T> ExecuteWithPolicies<T>(IDeviceConnection device, string code, ExecutionPolicies policies)
    {
        if (policies.RequiresLock) await AcquireLock();
        try 
        {
            using var timeout = CreateTimeout(policies.Timeout);
            return await device.ExecutePython<T>(code, timeout.Token);
        }
        finally 
        {
            if (policies.RequiresLock) ReleaseLock();
        }
    }
}
```

## Exception Contract

Replace complex exception hierarchy with simple, informative exceptions:

```csharp
public class DeviceException : Exception
{
    public string? DeviceOutput { get; init; }
    public string? ExecutedCode { get; init; }
    public string? ConnectionString { get; init; }
    
    public DeviceException(string message, Exception? innerException = null) : base(message, innerException) { }
    
    public DeviceException(string message, string? deviceOutput, string? executedCode = null, string? connectionString = null) 
        : base(message)
    {
        DeviceOutput = deviceOutput;
        ExecutedCode = executedCode;
        ConnectionString = connectionString;
    }
}

// Specific cases if needed
public class DeviceConnectionException : DeviceException 
{
    public DeviceConnectionException(string message, string connectionString) : base(message) 
    {
        ConnectionString = connectionString;
    }
}

public class DeviceTimeoutException : DeviceException
{
    public TimeSpan Timeout { get; }
    
    public DeviceTimeoutException(TimeSpan timeout, string? executedCode = null) 
        : base($"Device operation timed out after {timeout}")
    {
        Timeout = timeout;
        ExecutedCode = executedCode;
    }
}
```

## Communication Implementations

### Serial Device Connection
```csharp
public class SerialDeviceConnection : IDeviceConnection
{
    private readonly SerialPort serialPort;
    private readonly RawReplProtocol protocol;
    
    public async Task<T> ExecutePython<T>(string code, CancellationToken cancellationToken = default)
    {
        try 
        {
            var result = await protocol.ExecuteCode(serialPort.BaseStream, code);
            return ParseResult<T>(result);
        }
        catch (Exception ex) 
        {
            throw new DeviceException($"Execution failed: {ex.Message}", result, code, ConnectionString);
        }
    }
    
    // Simple, direct implementation without abstractions
}
```

### Subprocess Device Connection  
```csharp
public class SubprocessDeviceConnection : IDeviceConnection
{
    private readonly Process micropythonProcess;
    
    public async Task<T> ExecutePython<T>(string code, CancellationToken cancellationToken = default)
    {
        try 
        {
            await micropythonProcess.StandardInput.WriteLineAsync(code);
            var result = await micropythonProcess.StandardOutput.ReadToEndAsync();
            return ParseResult<T>(result);
        }
        catch (Exception ex) 
        {
            throw new DeviceException($"Subprocess execution failed: {ex.Message}", ex);
        }
    }
    
    // Direct subprocess communication without layers
}
```

## Caching Contract

Replace complex caching infrastructure with simple memoization:

```csharp
public static class SimpleCache
{
    private static readonly ConcurrentDictionary<string, object> Cache = new();
    
    public static T GetOrCreate<T>(string key, Func<T> factory)
    {
        return (T)Cache.GetOrAdd(key, _ => factory()!);
    }
    
    public static async Task<T> GetOrCreateAsync<T>(string key, Func<Task<T>> factory)
    {
        if (Cache.TryGetValue(key, out var cached))
            return (T)cached;
            
        var result = await factory();
        Cache.TryAdd(key, result!);
        return result;
    }
    
    public static void Clear() => Cache.Clear();
    public static bool Remove(string key) => Cache.TryRemove(key, out _);
}
```

## Data Format Contract

### JSON Serialization
```csharp
public static class ResultParser
{
    private static readonly JsonSerializerOptions Options = new()
    {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        NumberHandling = JsonNumberHandling.AllowReadingFromString
    };
    
    public static T ParseResult<T>(string deviceOutput)
    {
        if (typeof(T) == typeof(string))
            return (T)(object)deviceOutput;
            
        if (string.IsNullOrWhiteSpace(deviceOutput))
            return default(T)!;
            
        try 
        {
            return JsonSerializer.Deserialize<T>(deviceOutput, Options)!;
        }
        catch (JsonException ex)
        {
            throw new DeviceException($"Failed to parse device output as {typeof(T).Name}: {ex.Message}", deviceOutput);
        }
    }
}
```

## Configuration Contract

Replace complex configuration classes with simple records:

```csharp
public record DeviceSettings
{
    public TimeSpan DefaultTimeout { get; init; } = TimeSpan.FromSeconds(30);
    public int MaxRetries { get; init; } = 3;
    public bool EnableCaching { get; init; } = true;
    public int BaudRate { get; init; } = 115200;
}

public record SerialSettings : DeviceSettings
{
    public string PortName { get; init; } = string.Empty;
    public Parity Parity { get; init; } = Parity.None;
    public int DataBits { get; init; } = 8;
    public StopBits StopBits { get; init; } = StopBits.One;
}

public record SubprocessSettings : DeviceSettings  
{
    public string MicroPythonPath { get; init; } = "micropython";
    public string[] Arguments { get; init; } = [];
}
```

## Usage Examples

### Simple Device Usage
```csharp
// Direct, no-magic approach
using var device = new SerialDeviceConnection("COM3");
await device.Connect();

var temperature = await device.ExecutePython<float>(@"
    import machine
    adc = machine.ADC(machine.Pin(26))
    temperature = adc.read_u16() * 3.3 / 65535 * 100
    print(temperature)
");

Console.WriteLine($"Temperature: {temperature}°C");
```

### Attribute-Based Device (Optional)
```csharp
public interface ISensorDevice
{
    [Task("return read_temperature()")]
    Task<float> ReadTemperature();
    
    [Task("return read_humidity()")]  
    Task<float> ReadHumidity();
}

// Simple wrapper generation (no complex proxy)
public class SensorDevice : ISensorDevice
{
    private readonly IDeviceConnection device;
    
    public async Task<float> ReadTemperature() =>
        await device.ExecutePython<float>("return read_temperature()");
        
    public async Task<float> ReadHumidity() =>
        await device.ExecutePython<float>("return read_humidity()");
}
```

This contract eliminates ~3000 lines of abstraction code while providing the same functionality with better clarity and debuggability.