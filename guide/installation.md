# Installation

Getting started with Belay.NET is straightforward. Choose your preferred installation method below.

::: info Alpha Release
Belay.NET v0.3.0-alpha is now available on NuGet! This is the first public alpha release featuring:
- ✅ Task attribute system for simplified MicroPython programming
- ✅ Raspberry Pi Pico and ESP32 hardware compatibility  
- ✅ Comprehensive protocol support with adaptive Raw REPL
- ✅ Full async/await programming model

[View Release Notes](https://github.com/belay-dotnet/Belay.NET/releases/tag/v0.3.0-alpha) | [Hardware Compatibility](/hardware/compatibility)
:::

## Prerequisites

- **.NET 6 or later** (Belay.NET targets .NET 6+)
- **MicroPython or CircuitPython device** with firmware installed
- **USB cable** for device connection (or WiFi for WebREPL)

## Package Installation

### Using Package Manager Console (Visual Studio)
```powershell
# Core functionality and device communication
Install-Package Belay.Core -Version 0.3.0-alpha

# Task attributes for simplified device programming
Install-Package Belay.Attributes -Version 0.3.0-alpha
```

### Using .NET CLI
```bash
# Install both core packages
dotnet add package Belay.Core --version 0.3.0-alpha
dotnet add package Belay.Attributes --version 0.3.0-alpha
```

### Using PackageReference
Add to your `.csproj` file:
```xml
<PackageReference Include="Belay.Core" Version="0.3.0-alpha" />
<PackageReference Include="Belay.Attributes" Version="0.3.0-alpha" />
```

## Quick Start

Once installed, you can start using Belay.NET immediately:

```csharp
using Belay.Core;
using Belay.Core.Communication;
using Belay.Attributes;

// Create device connection
using var device = new Device(new SerialDeviceCommunication("COM3"));
await device.StartAsync();

// Execute Python code directly
var result = await device.ExecuteAsync<int>("21 + 21");
Console.WriteLine($"Result: {result}"); // Outputs: Result: 42

// Or use Task attributes for clean device programming
public class MyDeviceProgram
{
    [Task]
    public static int AddNumbers(int a, int b) => a + b;
}

// Deploy and execute Task methods
var taskResult = await device.CallTaskAsync<int>("AddNumbers", 21, 21);
Console.WriteLine($"Task Result: {taskResult}"); // Outputs: Task Result: 42
```

## Package Structure

Belay.NET is distributed as separate NuGet packages:

- **Belay.Core** - Core device communication and protocol handling
- **Belay.Attributes** - Task attribute system for simplified device programming
- **Belay.Extensions** - Dependency injection and ASP.NET Core integration (coming soon)
- **Belay.Sync** - Advanced file synchronization capabilities (coming soon)

::: tip Package Selection
For most applications, install both `Belay.Core` and `Belay.Attributes` packages. The Task attribute system in `Belay.Attributes` provides the cleanest programming experience.
:::

## Development Setup

### For Contributing
If you want to contribute to Belay.NET:

```bash
# Clone the repository
git clone https://github.com/belay-dotnet/Belay.NET.git
cd Belay.NET

# Restore packages
dotnet restore

# Build the solution
dotnet build

# Run tests
dotnet test
```

### Requirements for Development
- **.NET 8 SDK** (for building the library)
- **MicroPython Unix Port** (for testing without hardware)
- **Physical MicroPython device** (for hardware testing)

## Verify Installation

Create a simple console app to verify everything works:

```csharp
using Belay.Core;
using Belay.Core.Communication;

// Replace "COM3" with your device's port
using var device = new Device(new SerialDeviceCommunication("COM3"));

try
{
    await device.StartAsync();
    Console.WriteLine("✅ Successfully connected to device!");
    
    var version = await device.ExecuteAsync<string>("import sys; sys.version");
    Console.WriteLine($"📱 Device Python version: {version}");
}
catch (Exception ex)
{
    Console.WriteLine($"❌ Connection failed: {ex.Message}");
    Console.WriteLine("Check your device connection and COM port.");
}
```

## Next Steps

Now that you have Belay.NET installed:

1. **Follow the [Getting Started Guide](/guide/getting-started)** for a complete tutorial
2. **Check [Device Communication](/guide/device-communication)** to understand connection types
3. **Explore [Examples](/examples/)** for practical use cases
4. **Review [Hardware Compatibility](/hardware/)** for device-specific information

## Troubleshooting

### Package Not Found
Make sure you're using the correct package name: `Belay.NET` (not just `Belay`).

### Connection Issues  
- Verify your device is properly connected
- Check the COM port or device path
- Ensure MicroPython/CircuitPython firmware is installed
- See [Hardware Troubleshooting](/hardware/troubleshooting-connections) for details

### Build Errors
- Ensure you're targeting .NET 6 or later
- Check that all package references are restored correctly