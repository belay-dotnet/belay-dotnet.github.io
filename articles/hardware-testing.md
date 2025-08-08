# Hardware Testing Guide

::: warning Documentation in Progress
This documentation is currently being developed. Hardware testing infrastructure is implemented with support for physical devices and subprocess testing.

**Status**: ✅ Core functionality complete, 📝 Documentation in progress  
**Expected completion**: After hardware validation testing phase
:::

## Coming Soon

This comprehensive guide will cover testing Belay.NET applications with real hardware, including:

- **Test Hardware Setup**: Configuring MicroPython devices for automated testing
- **Hardware Test Categories**: Unit, integration, and end-to-end testing with devices
- **Device Discovery Testing**: Automated device detection and connection testing
- **Protocol Validation**: Testing Raw REPL and communication protocols
- **Performance Benchmarking**: Measuring communication speed and reliability
- **Multi-Device Testing**: Testing with multiple simultaneous devices
- **CI/CD Integration**: Setting up hardware testing in continuous integration
- **Test Data Management**: Managing sensor data and test scenarios

## Quick Preview

```csharp
// Example of what's coming - hardware testing infrastructure
[TestClass]
[TestCategory("Hardware")]
public class HardwareValidationTests
{
    private static List<DeviceInfo> _availableDevices;
    private Device _testDevice;

    [ClassInitialize]
    public static async Task ClassInitialize(TestContext context)
    {
        // Discover all available test devices
        _availableDevices = (await Device.DiscoverDevicesAsync()).ToList();
        
        if (_availableDevices.Count == 0)
        {
            Assert.Inconclusive("No MicroPython devices available for hardware testing");
        }

        context.WriteLine($"Found {_availableDevices.Count} test device(s):");
        foreach (var device in _availableDevices)
        {
            context.WriteLine($"  - {device.Name} ({device.Port})");
        }
    }

    [TestInitialize]
    public async Task TestInitialize()
    {
        // Connect to first available device
        _testDevice = Device.FromConnectionString(_availableDevices[0].ConnectionString);
        await _testDevice.ConnectAsync();
        
        // Verify device is responsive
        var response = await _testDevice.ExecuteAsync("print('Test device ready')");
        Assert.IsTrue(response.Contains("Test device ready"));
    }

    [TestCleanup]
    public async Task TestCleanup()
    {
        if (_testDevice != null)
        {
            await _testDevice.DisconnectAsync();
            _testDevice.Dispose();
        }
    }

    [TestMethod]
    public async Task DeviceInfo_ReturnsValidMicroPythonVersion()
    {
        var version = await _testDevice.ExecuteAsync<string>("import sys; sys.version");
        
        Assert.IsTrue(version.Contains("MicroPython"), 
            $"Expected MicroPython version, got: {version}");
    }

    [TestMethod]
    public async Task BasicGpioControl_WorksCorrectly()
    {
        // Test basic GPIO operations
        await _testDevice.ExecuteAsync(@"
from machine import Pin
led = Pin(25, Pin.OUT)  # Built-in LED on most boards
led.on()
");

        await Task.Delay(100); // Allow LED to turn on

        await _testDevice.ExecuteAsync("led.off()");
        
        // If we get here without exceptions, GPIO control works
        Assert.IsTrue(true);
    }

    [TestMethod]
    public async Task LargeDataTransfer_HandlesCorrectly()
    {
        // Test handling of large data transfers
        var testData = string.Join("", Enumerable.Range(0, 1000).Select(i => $"data_{i:D4}\n"));
        var expectedLength = testData.Length;

        var code = $@"
test_data = '''{testData}'''
len(test_data)
";
        
        var actualLength = await _testDevice.ExecuteAsync<int>(code);
        Assert.AreEqual(expectedLength, actualLength);
    }

    [TestMethod]
    public async Task ErrorHandling_ReportsDeviceErrors()
    {
        // Test that device errors are properly reported
        await Assert.ThrowsExceptionAsync<DeviceExecutionException>(async () =>
        {
            await _testDevice.ExecuteAsync("this_will_cause_a_syntax_error!");
        });
    }

    [TestMethod]
    public async Task PerformanceBenchmark_MeetsMinimumRequirements()
    {
        const int iterations = 100;
        var stopwatch = Stopwatch.StartNew();

        for (int i = 0; i < iterations; i++)
        {
            await _testDevice.ExecuteAsync("pass");
        }

        stopwatch.Stop();
        var averageLatency = stopwatch.Elapsed.TotalMilliseconds / iterations;

        // Assert reasonable performance (adjust based on hardware)
        Assert.IsTrue(averageLatency < 100, 
            $"Average latency {averageLatency:F2}ms exceeds 100ms threshold");
    }
}

// Multi-device testing
[TestClass]
[TestCategory("Hardware")]
[TestCategory("MultiDevice")]
public class MultiDeviceHardwareTests
{
    private List<Device> _testDevices;

    [TestInitialize]
    public async Task Setup()
    {
        var availableDevices = await Device.DiscoverDevicesAsync();
        
        if (availableDevices.Length < 2)
        {
            Assert.Inconclusive("Multi-device testing requires at least 2 devices");
        }

        _testDevices = new List<Device>();
        
        // Connect to up to 3 devices for testing
        for (int i = 0; i < Math.Min(3, availableDevices.Length); i++)
        {
            var device = Device.FromConnectionString(availableDevices[i].ConnectionString);
            await device.ConnectAsync();
            _testDevices.Add(device);
        }
    }

    [TestCleanup]
    public async Task Cleanup()
    {
        if (_testDevices != null)
        {
            foreach (var device in _testDevices)
            {
                await device.DisconnectAsync();
                device.Dispose();
            }
        }
    }

    [TestMethod]
    public async Task MultiDevice_ParallelExecution_WorksCorrectly()
    {
        var tasks = _testDevices.Select(async (device, index) =>
        {
            var result = await device.ExecuteAsync<int>($"device_id = {index}; device_id * 10");
            return new { DeviceIndex = index, Result = result };
        });

        var results = await Task.WhenAll(tasks);

        for (int i = 0; i < results.Length; i++)
        {
            Assert.AreEqual(i * 10, results[i].Result);
        }
    }
}
```

## Test Hardware Requirements

### Minimum Test Setup
- **1 MicroPython Device**: Raspberry Pi Pico, ESP32, or PyBoard
- **USB Connection**: Stable USB cable and port
- **Firmware**: Latest MicroPython or CircuitPython firmware

### Recommended Test Setup
- **3+ Different Device Types**: Pico, ESP32, PyBoard for compatibility testing
- **Multiple Instances**: 2-3 of each device type for parallel testing  
- **Test Fixtures**: Breadboard, LEDs, sensors for GPIO testing
- **USB Hub**: Powered hub for multiple device connections

### Advanced Test Setup
- **Automated Test Rig**: Relay-controlled power switching
- **Environmental Chamber**: Temperature and humidity control
- **Load Testing**: 10+ devices for stress testing
- **Network Testing**: ESP32 devices for WiFi/WebREPL testing

## Test Categories

### Connection Tests
- Device discovery and enumeration
- Connection establishment and teardown
- Reconnection after device reset
- Timeout and error handling

### Protocol Tests
- Raw REPL protocol validation
- Raw-paste mode for large transfers
- Flow control and buffer management
- Character encoding and special characters

### Performance Tests
- Communication latency measurement
- Data throughput testing
- Memory usage monitoring
- CPU utilization tracking

### Reliability Tests
- Extended operation testing (24+ hours)
- Connection recovery testing
- Error injection and recovery
- Resource leak detection

## CI/CD Integration

```yaml
# Example GitHub Actions workflow (coming soon)
name: Hardware Testing

on:
  schedule:
    - cron: '0 2 * * *' # Daily at 2 AM
  workflow_dispatch: # Manual trigger

jobs:
  hardware-tests:
    runs-on: self-hosted # Requires runners with connected hardware
    
    strategy:
      matrix:
        device: [pico, esp32, pyboard]
        
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup .NET
        uses: actions/setup-dotnet@v3
        with:
          dotnet-version: '8.0.x'
      
      - name: Identify test devices
        run: |
          dotnet run --project tools/DeviceDiscovery -- --json > devices.json
          cat devices.json
      
      - name: Run hardware tests
        run: |
          dotnet test tests/Belay.Hardware.Tests \
            --filter "TestCategory=Hardware&DeviceType=${{ matrix.device }}" \
            --logger "trx;LogFileName=hardware-${{ matrix.device }}.trx" \
            --collect:"XPlat Code Coverage"
      
      - name: Upload test results
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: hardware-test-results-${{ matrix.device }}
          path: |
            **/*.trx
            **/*.coverage
```

## Related Documentation

- [Hardware Compatibility](/hardware/compatibility) - Supported devices and setup requirements
- [Connection Troubleshooting](/hardware/troubleshooting-connections) - Common hardware issues
- [Testing Guide](/guide/testing) - General testing strategies
- [Performance Troubleshooting](/hardware/troubleshooting-performance) - Performance testing setup

**Need help now?** Check our [GitHub Discussions](https://github.com/belay-dotnet/Belay.NET/discussions) for hardware testing questions, or review our [hardware testing examples](https://github.com/belay-dotnet/Belay.NET/tree/main/tests/hardware).