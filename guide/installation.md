# Installation

Getting started with Belay.NET is straightforward. Choose your preferred installation method below.

## Prerequisites

- **.NET 6 or later** (Belay.NET targets .NET 6+)
- **MicroPython or CircuitPython device** with firmware installed
- **USB cable** for device connection (or WiFi for WebREPL)

## Package Installation

### Using Package Manager Console (Visual Studio)
```powershell
Install-Package Belay.NET
```

### Using .NET CLI
```bash
dotnet add package Belay.NET
```

### Using PackageReference
Add to your `.csproj` file:
```xml
<PackageReference Include="Belay.NET" Version="0.2.0" />
```

## Quick Start

Once installed, you can start using Belay.NET immediately:

```csharp
using Belay.Core;
using Belay.Core.Communication;

// Create device connection
using var device = new Device(new SerialDeviceCommunication("COM3"));
await device.StartAsync();

// Execute Python code on the device
var result = await device.ExecuteAsync<int>("21 + 21");
Console.WriteLine($"Result: {result}"); // Outputs: Result: 42
```

## Package Structure

The main Belay.NET package includes:

- **Belay.Core** - Core device communication
- **Belay.Attributes** - Attribute-based programming
- **Belay.Extensions** - Dependency injection extensions
- **Belay.Sync** - File synchronization (coming soon)

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