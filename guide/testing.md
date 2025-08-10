# Testing


Belay.NET provides comprehensive testing infrastructure supporting unit tests, integration tests, and hardware validation. This guide covers all testing approaches from mock-based unit tests to full hardware-in-the-loop testing.

## Test Architecture Overview

Belay.NET's testing strategy follows a layered approach:

- **Unit Tests**: Fast, isolated tests with mocks (no hardware)
- **Subprocess Tests**: Integration tests using MicroPython unix port
- **Hardware Tests**: End-to-end validation with physical devices
- **Performance Tests**: Benchmarking and validation testing

## Testing Framework

Belay.NET uses:
- **MSTest**: Primary testing framework
- **Moq**: Mocking framework for unit tests
- **MicroPython unix port**: Hardware-independent integration testing
- **Custom validation tools**: Hardware testing infrastructure

## Unit Testing

Unit tests validate core functionality without hardware dependencies using mocks.

### Setting up Unit Tests

```csharp
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Belay.Core;
using Belay.Core.Communication;

[TestClass]
public class DeviceTests
{
    private Mock<IDeviceCommunication> mockCommunication;
    private Device device;

    [TestInitialize]
    public void Setup()
    {
        mockCommunication = new Mock<IDeviceCommunication>();
        // Note: Direct Device constructor with IDeviceCommunication is internal
        // Use Device.FromConnectionString("mock:") for testing
    }

    [TestMethod]
    public async Task ExecuteAsync_ValidCode_ReturnsResult()
    {
        // Arrange
        mockCommunication.Setup(c => c.ExecuteAsync("2 + 2", It.IsAny<CancellationToken>()))
                        .ReturnsAsync("4");

        // Act & Assert - actual unit test patterns depend on internal architecture
        // See existing unit tests in tests/Belay.Tests.Unit/ for current patterns
    }
}
```

### Testing Task Attributes

```csharp
[TestClass]
public class TaskAttributeTests
{
    private TestDeviceController controller;
    
    [TestInitialize]
    public void Setup()
    {
        // Use subprocess for Task attribute testing
        var device = Device.FromConnectionString("subprocess:../../micropython/ports/unix/build-standard/micropython");
        controller = new TestDeviceController(device);
    }
    
    [TestMethod]
    public async Task CachedTask_SecondCall_ReturnsCachedResult()
    {
        await controller.ConnectAsync();
        
        // First call - not cached
        var start1 = DateTime.UtcNow;
        var result1 = await controller.GetCachedValueAsync();
        var time1 = (DateTime.UtcNow - start1).TotalMilliseconds;
        
        // Second call - cached
        var start2 = DateTime.UtcNow;
        var result2 = await controller.GetCachedValueAsync();
        var time2 = (DateTime.UtcNow - start2).TotalMilliseconds;
        
        // Assert
        Assert.AreEqual(result1, result2);
        Assert.IsTrue(time2 < time1 / 2, "Cached call should be significantly faster");
    }
    
    [TestMethod]
    public async Task ExclusiveTask_ConcurrentCalls_ExecuteSequentially()
    {
        await controller.ConnectAsync();
        
        var tasks = Enumerable.Range(0, 5).Select(_ => controller.ExclusiveOperationAsync()).ToArray();
        var results = await Task.WhenAll(tasks);
        
        // All tasks should complete successfully without interference
        Assert.AreEqual(5, results.Length);
        Assert.IsTrue(results.All(r => !string.IsNullOrEmpty(r)));
    }
}

public class TestDeviceController
{
    private readonly Device device;
    
    public TestDeviceController(Device device)
    {
        this.device = device;
    }
    
    public async Task ConnectAsync() => await device.ConnectAsync();
    
    [Task(Cache = true)]
    public async Task<string> GetCachedValueAsync()
    {
        return await device.ExecuteAsync<string>(@"
import time
time.sleep_ms(100)  # Simulate work
'cached_result_' + str(time.ticks_ms())
        ");
    }
    
    [Task(Exclusive = true)]
    public async Task<string> ExclusiveOperationAsync()
    {
        return await device.ExecuteAsync<string>(@"
import time
start = time.ticks_ms()
time.sleep_ms(50)
'exclusive_' + str(start)
        ");
    }
}
```

## Subprocess Testing

Subprocess tests use the MicroPython unix port for hardware-independent integration testing.

### Setting up Subprocess Tests

1. **Build MicroPython unix port**:

```bash
cd micropython/ports/unix
make submodules
make
```

2. **Create subprocess test**:

```csharp
[TestClass]
[TestCategory("Subprocess")]
public class SubprocessIntegrationTests
{
    private Device device;

    [TestInitialize]
    public async Task Setup()
    {
        var micropythonPath = Path.GetFullPath("../../micropython/ports/unix/build-standard/micropython");
        device = Device.FromConnectionString($"subprocess:{micropythonPath}");
        await device.ConnectAsync();
    }

    [TestCleanup]
    public async Task Cleanup()
    {
        await device?.DisconnectAsync();
        device?.Dispose();
    }

    [TestMethod]
    public async Task BasicExecution_ReturnsCorrectResult()
    {
        var result = await device.ExecuteAsync<int>("2 + 2");
        Assert.AreEqual(4, result);
    }

    [TestMethod]
    public async Task PythonModules_ImportSuccessfully()
    {
        var result = await device.ExecuteAsync<string>(@"
import sys
import json
import time
'modules_loaded'
        ");
        Assert.AreEqual("modules_loaded", result);
    }

    [TestMethod]
    public async Task FileOperations_WorkCorrectly()
    {
        // Test basic file operations
        await device.ExecuteAsync(@"
with open('/tmp/test.txt', 'w') as f:
    f.write('Hello World')
        ");
        
        var content = await device.ExecuteAsync<string>(@"
with open('/tmp/test.txt', 'r') as f:
    f.read()
        ");
        
        Assert.AreEqual("Hello World", content);
    }
}
```

### Running Subprocess Tests

```bash
# Run only subprocess tests
dotnet test --filter "TestCategory=Subprocess"

# Run with verbose output
dotnet test --filter "TestCategory=Subprocess" --logger "console;verbosity=detailed"
```

## Hardware Testing

Hardware tests validate functionality with real MicroPython devices.

### Hardware Test Setup

1. **Connect devices**: ESP32, Raspberry Pi Pico, or other MicroPython boards
2. **Identify connection strings**: Use device manager or `/dev/tty*` to find ports
3. **Configure test environment**: Set up test configuration

### Example Hardware Tests

```csharp
[TestClass]
[TestCategory("Hardware")]
[TestCategory("ESP32")]
public class ESP32HardwareTests
{
    private Device device;
    private ESP32Controller controller;
    
    [TestInitialize]
    public async Task Setup()
    {
        // Use environment variable or skip test if not available
        var connectionString = Environment.GetEnvironmentVariable("BELAY_ESP32_CONNECTION");
        if (string.IsNullOrEmpty(connectionString))
        {
            Assert.Inconclusive("ESP32 not available - set BELAY_ESP32_CONNECTION environment variable");
        }
        
        device = Device.FromConnectionString(connectionString);
        await device.ConnectAsync();
        
        controller = new ESP32Controller(device);
        await controller.InitializeESP32Async();
    }
    
    [TestCleanup]
    public async Task Cleanup()
    {
        await device?.DisconnectAsync();
        device?.Dispose();
    }
    
    [TestMethod]
    public async Task LED_CanControl()
    {
        await controller.SetLedAsync(true);
        await Task.Delay(500);
        await controller.SetLedAsync(false);
        // LED control doesn't return status, just verify no exception
    }
    
    [TestMethod]
    public async Task ADC_ReturnsValidRange()
    {
        var reading = await controller.ReadADCAsync();
        Assert.IsTrue(reading >= 0 && reading <= 4095, "ADC reading should be 0-4095 for 12-bit ADC");
    }
    
    [TestMethod]
    public async Task WiFi_IsAvailable()
    {
        var available = await controller.CheckWiFiAvailabilityAsync();
        Assert.IsTrue(available, "ESP32 should have WiFi capability");
    }
}
```

### Running Hardware Tests

```bash
# Set up environment variables
export BELAY_ESP32_CONNECTION="serial:/dev/ttyUSB0"
export BELAY_PICO_CONNECTION="serial:/dev/ttyACM0"

# Run hardware tests
dotnet test --filter "TestCategory=Hardware"

# Run specific platform tests
dotnet test --filter "TestCategory=ESP32"
dotnet test --filter "TestCategory=Pico"
```

## Performance Testing

Performance tests validate timing characteristics and throughput.

```csharp
[TestClass]
[TestCategory("Performance")]
public class PerformanceTests
{
    private Device device;
    
    [TestInitialize]
    public async Task Setup()
    {
        // Use subprocess for consistent performance measurement
        var micropythonPath = Path.GetFullPath("../../micropython/ports/unix/build-standard/micropython");
        device = Device.FromConnectionString($"subprocess:{micropythonPath}");
        await device.ConnectAsync();
    }
    
    [TestMethod]
    public async Task SimpleExecution_CompletesWithinTimeout()
    {
        var stopwatch = System.Diagnostics.Stopwatch.StartNew();
        
        var result = await device.ExecuteAsync<int>("2 + 2");
        
        stopwatch.Stop();
        
        Assert.AreEqual(4, result);
        Assert.IsTrue(stopwatch.ElapsedMilliseconds < 1000, "Simple execution should complete within 1 second");
    }
    
    [TestMethod]
    public async Task TaskCaching_ImprovesPerformance()
    {
        var controller = new TestDeviceController(device);
        
        // Measure first call (uncached)
        var stopwatch1 = System.Diagnostics.Stopwatch.StartNew();
        var result1 = await controller.GetCachedValueAsync();
        stopwatch1.Stop();
        
        // Measure second call (cached)
        var stopwatch2 = System.Diagnostics.Stopwatch.StartNew();
        var result2 = await controller.GetCachedValueAsync();
        stopwatch2.Stop();
        
        Assert.AreEqual(result1, result2);
        Assert.IsTrue(stopwatch2.ElapsedMilliseconds < stopwatch1.ElapsedMilliseconds / 2,
            "Cached call should be at least 2x faster");
    }
    
    [TestMethod]
    public async Task ConcurrentExecution_HandlesLoad()
    {
        var tasks = Enumerable.Range(0, 10)
            .Select(i => device.ExecuteAsync<int>($"{i} * 2"))
            .ToArray();
        
        var stopwatch = System.Diagnostics.Stopwatch.StartNew();
        var results = await Task.WhenAll(tasks);
        stopwatch.Stop();
        
        // Verify results
        for (int i = 0; i < 10; i++)
        {
            Assert.AreEqual(i * 2, results[i]);
        }
        
        // Should complete within reasonable time
        Assert.IsTrue(stopwatch.ElapsedMilliseconds < 10000, "10 concurrent operations should complete within 10 seconds");
    }
}
```

## Test Configuration

Configure tests for different environments and scenarios.

### Environment Variables

```bash
# Hardware connections
export BELAY_ESP32_CONNECTION="serial:/dev/ttyUSB0"
export BELAY_PICO_CONNECTION="serial:/dev/ttyACM0"
export BELAY_MICROPYTHON_PATH="../../micropython/ports/unix/build-standard/micropython"

# Test settings
export BELAY_TEST_TIMEOUT_MS="30000"
export BELAY_TEST_LOG_LEVEL="Debug"
```

### Test Configuration Class

```csharp
public static class TestConfiguration
{
    public static string ESP32Connection => Environment.GetEnvironmentVariable("BELAY_ESP32_CONNECTION") ?? "";
    public static string PicoConnection => Environment.GetEnvironmentVariable("BELAY_PICO_CONNECTION") ?? "";
    public static string MicroPythonPath => Environment.GetEnvironmentVariable("BELAY_MICROPYTHON_PATH") ?? 
        Path.GetFullPath("../../micropython/ports/unix/build-standard/micropython");
    
    public static int TestTimeoutMs => int.Parse(Environment.GetEnvironmentVariable("BELAY_TEST_TIMEOUT_MS") ?? "10000");
    
    public static bool HasESP32Hardware => !string.IsNullOrEmpty(ESP32Connection);
    public static bool HasPicoHardware => !string.IsNullOrEmpty(PicoConnection);
    
    public static void SkipIfNoHardware(string platform)
    {
        var hasHardware = platform.ToLower() switch
        {
            "esp32" => HasESP32Hardware,
            "pico" => HasPicoHardware,
            _ => false
        };
        
        if (!hasHardware)
        {
            Assert.Inconclusive($"{platform} hardware not available - configure BELAY_{platform.ToUpper()}_CONNECTION");
        }
    }
}
```

### Custom Test Attributes

```csharp
[AttributeUsage(AttributeTargets.Method)]
public class HardwareTestAttribute : TestCategoryAttribute
{
    public HardwareTestAttribute(string platform) : base("Hardware")
    {
        Platform = platform;
    }
    
    public string Platform { get; }
}

// Usage
[TestMethod]
[HardwareTest("ESP32")]
public async Task ESP32_SpecificTest()
{
    TestConfiguration.SkipIfNoHardware("ESP32");
    // Test implementation
}
```

## Test Execution

### Running All Tests

```bash
# Run all tests
dotnet test

# Run with coverage
dotnet test --collect:"XPlat Code Coverage"

# Run with detailed output
dotnet test --logger "console;verbosity=detailed"
```

### Running Specific Test Categories

```bash
# Unit tests only (fast)
dotnet test --filter "TestCategory!=Integration&TestCategory!=Hardware&TestCategory!=Subprocess"

# Subprocess integration tests
dotnet test --filter "TestCategory=Subprocess"

# Hardware tests (requires connected devices)
dotnet test --filter "TestCategory=Hardware"

# Specific platform hardware tests
dotnet test --filter "TestCategory=ESP32"
dotnet test --filter "TestCategory=Pico"

# Performance tests
dotnet test --filter "TestCategory=Performance"
```

### Test Project Structure

Belay.NET includes several test projects:

```
tests/
├── Belay.Tests.Unit/           # Unit tests with mocks
├── Belay.Tests.Integration/    # Integration tests
├── Belay.Tests.Subprocess/     # Subprocess-based tests
└── Belay.Tests.Performance/    # Performance validation
```

### Continuous Integration

Example CI configuration for different test types:

```yaml
name: Belay.NET Tests

on: [push, pull_request]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          submodules: recursive
          
      - name: Setup .NET
        uses: actions/setup-dotnet@v3
        with:
          dotnet-version: '8.0.x'
      
      - name: Restore dependencies
        run: dotnet restore
        
      - name: Build
        run: dotnet build --no-restore
      
      - name: Run unit tests
        run: |
          dotnet test tests/Belay.Tests.Unit/ \
            --no-build --verbosity normal \
            --logger trx --collect:"XPlat Code Coverage"
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: '**/coverage.cobertura.xml'

  integration-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          submodules: recursive
          
      - name: Setup .NET
        uses: actions/setup-dotnet@v3
        with:
          dotnet-version: '8.0.x'
      
      - name: Install build dependencies
        run: sudo apt-get update && sudo apt-get install -y build-essential
      
      - name: Build MicroPython unix port
        run: |
          cd micropython/ports/unix
          make submodules
          make -j$(nproc)
      
      - name: Run subprocess integration tests
        run: |
          dotnet test tests/Belay.Tests.Subprocess/ \
            --verbosity normal --logger trx
            
      - name: Run integration tests
        run: |
          dotnet test tests/Belay.Tests.Integration/ \
            --verbosity normal --logger trx

  hardware-tests:
    runs-on: [self-hosted, belay-hardware]
    if: github.event_name == 'schedule' || github.event_name == 'workflow_dispatch'
    steps:
      - uses: actions/checkout@v4
        with:
          submodules: recursive
          
      - name: Run ESP32 hardware tests
        run: |
          export BELAY_ESP32_CONNECTION="serial:/dev/ttyUSB0"
          dotnet test --filter "TestCategory=ESP32" --logger trx
          
      - name: Run Pico hardware tests
        run: |
          export BELAY_PICO_CONNECTION="serial:/dev/ttyACM0"
          dotnet test --filter "TestCategory=Pico" --logger trx
```

## Validation Tools

Belay.NET includes validation tools for comprehensive testing:

### Protocol Comparison Tool

```bash
# Compare subprocess vs hardware protocol behavior
dotnet run --project examples/ProtocolComparison/ProtocolComparison.csproj \
  ../../micropython/ports/unix/build-standard/micropython \
  serial:/dev/ttyUSB0
```

### Platform Comparison Tool

```bash
# Compare ESP32 vs Pico performance
dotnet run --project examples/PlatformComparisonTest/PlatformComparisonTest.csproj \
  serial:/dev/ttyUSB0 serial:/dev/ttyACM0
```

### Hardware Validation Tools

```bash
# ESP32 hardware validation
dotnet run --project examples/ESP32HardwareTest/ESP32HardwareTest.csproj serial:/dev/ttyUSB0

# Pico hardware validation
dotnet run --project examples/PicoHardwareTest/PicoHardwareTest.csproj serial:/dev/ttyACM0
```

## Test Data Helpers

```csharp
public static class TestHelpers
{
    public static string GetValidPythonCode() => "2 + 2";
    
    public static string GetInvalidPythonCode() => "this is not valid python syntax";
    
    public static string GetLargePythonCode(int lines = 100) => 
        string.Join("\n", Enumerable.Range(1, lines).Select(i => $"var{i} = {i} * 2"));
    
    public static byte[] GetTestBinaryData(int size = 1024)
    {
        var data = new byte[size];
        Random.Shared.NextBytes(data);
        return data;
    }
    
    public static string GetTestJsonData() => 
        """
        {
            "temperature": 25.5,
            "humidity": 60.2,
            "timestamp": "2025-01-01T12:00:00Z"
        }
        """;
        
    public static async Task WaitForDeviceAsync(Device device, int timeoutMs = 5000)
    {
        var cancellation = new CancellationTokenSource(timeoutMs);
        while (!cancellation.Token.IsCancellationRequested)
        {
            try
            {
                await device.ExecuteAsync("1", cancellation.Token);
                return;
            }
            catch
            {
                await Task.Delay(100, cancellation.Token);
            }
        }
        throw new TimeoutException("Device did not become ready within timeout");
    }
}
```

## Best Practices

### Test Organization

1. **Separate test projects** by scope (unit, integration, hardware)
2. **Use test categories** for filtering (TestCategory attribute)
3. **Environment detection** for hardware availability
4. **Proper cleanup** in TestCleanup methods

### Performance Testing

1. **Use subprocess** for consistent performance measurement
2. **Measure multiple runs** and calculate averages
3. **Set reasonable timeouts** based on expected performance
4. **Test cached vs uncached** operations separately

### Hardware Testing

1. **Check availability** before running hardware tests
2. **Use environment variables** for connection strings
3. **Reset device state** between tests
4. **Handle platform differences** in test expectations

### Error Handling

1. **Test both success and failure paths**
2. **Validate exception types** and messages
3. **Test timeout scenarios**
4. **Verify resource cleanup** after errors

## Running Tests Locally

### Prerequisites

1. **.NET 8.0 SDK** installed
2. **MicroPython unix port** built (for subprocess tests)
3. **Hardware devices** connected (for hardware tests)
4. **Environment variables** configured

### Quick Start

```bash
# Clone and build
git clone --recursive https://github.com/belay-dotnet/Belay.NET.git
cd Belay.NET

# Build MicroPython unix port
cd micropython/ports/unix
make submodules && make
cd ../../..

# Run unit tests
dotnet test tests/Belay.Tests.Unit/

# Run subprocess tests
dotnet test tests/Belay.Tests.Subprocess/

# Run with hardware (if available)
export BELAY_ESP32_CONNECTION="serial:/dev/ttyUSB0"
dotnet test --filter "TestCategory=ESP32"
```

## Related Documentation

- [Getting Started](/guide/getting-started) - Basic Belay.NET setup
- [Configuration](/guide/configuration) - Test-specific configuration
- [ESP32 Setup](/hardware/esp32) - ESP32 hardware testing
- [Raspberry Pi Pico](/hardware/raspberry-pi-pico) - Pico hardware testing
- [Hardware Connections](/hardware/connections) - Connecting test devices

## External Resources

- [MSTest Documentation](https://docs.microsoft.com/en-us/dotnet/core/testing/unit-testing-with-mstest)
- [Moq Framework](https://github.com/moq/moq4)
- [MicroPython Testing](https://docs.micropython.org/en/latest/develop/testing.html)
- [Belay.NET GitHub Tests](https://github.com/belay-dotnet/Belay.NET/tree/main/tests)

**Need help?** Check our [test examples](https://github.com/belay-dotnet/Belay.NET/tree/main/tests) or ask in [GitHub Discussions](https://github.com/belay-dotnet/Belay.NET/discussions).