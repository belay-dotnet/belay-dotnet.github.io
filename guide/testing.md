# Testing

::: warning Documentation in Progress
This documentation is currently being developed. The testing infrastructure is implemented and includes unit tests, integration tests, and subprocess testing.

**Status**: ✅ Core functionality complete, 📝 Documentation in progress  
**Expected completion**: After Issue 002-110 (Testing Infrastructure Improvements)
:::

## Coming Soon

This page will provide comprehensive guidance for testing Belay.NET applications, including:

- **Unit Testing**: Testing device communication logic without hardware
- **Integration Testing**: Testing with real MicroPython devices
- **Subprocess Testing**: Hardware-independent testing with MicroPython unix port
- **Mock Strategies**: Creating effective mocks for device communication
- **Test Categories**: Organizing tests by scope and execution requirements
- **Continuous Integration**: Setting up automated testing in CI/CD pipelines
- **Performance Testing**: Benchmarking communication speed and reliability
- **Hardware Test Setup**: Configuring physical devices for automated testing

## Quick Preview

```csharp
// Example of what's coming - comprehensive testing strategies
[TestClass]
public class DeviceCommunicationTests
{
    private Device _device;
    private Mock<IDeviceCommunication> _mockCommunication;

    [TestInitialize]
    public void Setup()
    {
        _mockCommunication = new Mock<IDeviceCommunication>();
        _device = new Device(_mockCommunication.Object);
    }

    [TestMethod]
    public async Task ExecuteAsync_SimpleCode_ReturnsResult()
    {
        // Arrange
        const string code = "2 + 2";
        const string expectedResult = "4";
        
        _mockCommunication.Setup(c => c.ExecuteAsync(code, It.IsAny<CancellationToken>()))
                         .ReturnsAsync(expectedResult);

        // Act
        var result = await _device.ExecuteAsync(code);

        // Assert
        Assert.AreEqual(expectedResult, result);
        _mockCommunication.Verify(c => c.ExecuteAsync(code, It.IsAny<CancellationToken>()), Times.Once);
    }

    [TestMethod]
    public async Task ExecuteAsync_DeviceError_ThrowsDeviceExecutionException()
    {
        // Arrange
        const string code = "invalid_python_code";
        
        _mockCommunication.Setup(c => c.ExecuteAsync(code, It.IsAny<CancellationToken>()))
                         .ThrowsAsync(new DeviceExecutionException("Syntax error"));

        // Act & Assert
        await Assert.ThrowsExceptionAsync<DeviceExecutionException>(() => 
            _device.ExecuteAsync(code));
    }
}

// Integration testing with subprocess
[TestClass]
[TestCategory("Integration")]
[TestCategory("Subprocess")]
public class SubprocessIntegrationTests
{
    private Device _device;

    [TestInitialize]
    public async Task Setup()
    {
        // Use MicroPython unix port for hardware-independent testing
        _device = Device.FromConnectionString("subprocess:micropython");
        await _device.ConnectAsync();
    }

    [TestCleanup]
    public async Task Cleanup()
    {
        await _device.DisconnectAsync();
        _device.Dispose();
    }

    [TestMethod]
    public async Task BasicPythonExecution_WorksCorrectly()
    {
        // Test basic Python execution
        var result = await _device.ExecuteAsync("print('Hello World')");
        Assert.IsTrue(result.Contains("Hello World"));
    }

    [TestMethod]
    public async Task MathOperations_ReturnCorrectResults()
    {
        var result = await _device.ExecuteAsync<int>("2 + 3");
        Assert.AreEqual(5, result);
    }
}

// Hardware testing with physical devices
[TestClass]
[TestCategory("Integration")]
[TestCategory("Hardware")]
public class HardwareIntegrationTests
{
    private Device _device;

    [TestInitialize]
    public async Task Setup()
    {
        // Skip if no hardware available
        var devices = await Device.DiscoverDevicesAsync();
        if (devices.Length == 0)
        {
            Assert.Inconclusive("No MicroPython devices found for hardware testing");
        }

        _device = Device.FromConnectionString(devices[0].ConnectionString);
        await _device.ConnectAsync();
    }

    [TestMethod]
    public async Task DeviceInfo_ReturnsValidInformation()
    {
        var info = await _device.ExecuteAsync<string>("import sys; sys.version");
        Assert.IsTrue(info.Contains("MicroPython"));
    }
}
```

## Test Categories

### Unit Tests
- **Mock-based testing**: No hardware required
- **Fast execution**: Runs in milliseconds
- **High coverage**: Tests all code paths
- **CI/CD friendly**: Runs in any environment

### Integration Tests - Subprocess
- **MicroPython unix port**: Hardware-independent
- **Real protocol testing**: Tests actual REPL communication
- **Moderate execution time**: Seconds per test
- **Cross-platform**: Works on Windows, Linux, macOS

### Integration Tests - Hardware
- **Physical devices**: Real MicroPython boards
- **Complete system testing**: End-to-end validation
- **Slower execution**: May take minutes
- **Hardware dependency**: Requires connected devices

### Performance Tests
- **Throughput measurement**: Communication speed testing
- **Latency measurement**: Round-trip time analysis
- **Load testing**: Multiple concurrent operations
- **Memory usage**: Resource consumption validation

## Test Configuration

```csharp
// Test configuration (coming soon)
[TestClass]
public class TestConfiguration
{
    public static IServiceProvider ServiceProvider { get; private set; }

    [AssemblyInitialize]
    public static void AssemblyInitialize(TestContext context)
    {
        var services = new ServiceCollection();
        
        // Configure Belay.NET for testing
        services.AddBelay(config =>
        {
            config.Device.DefaultConnectionTimeoutMs = 5000; // Faster for tests
            config.Execution.DefaultTimeoutMs = 10000;
            config.Logging.LogLevel = LogLevel.Debug; // Verbose for debugging
        });

        // Add test-specific services
        services.AddScoped<IDeviceTestHelper, DeviceTestHelper>();
        services.AddScoped<ITestDataGenerator, TestDataGenerator>();

        ServiceProvider = services.BuildServiceProvider();
    }

    [AssemblyCleanup]
    public static void AssemblyCleanup()
    {
        ServiceProvider?.Dispose();
    }
}
```

## Continuous Integration Setup

```yaml
# Example GitHub Actions workflow (coming soon)
name: Belay.NET Tests

on: [push, pull_request]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup .NET
        uses: actions/setup-dotnet@v3
        with:
          dotnet-version: '8.0.x'
      
      - name: Run unit tests
        run: dotnet test --filter "TestCategory!=Integration" --logger trx --collect:"XPlat Code Coverage"
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3

  subprocess-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup .NET
        uses: actions/setup-dotnet@v3
        with:
          dotnet-version: '8.0.x'
      
      - name: Build MicroPython unix port
        run: |
          cd micropython/ports/unix
          make submodules
          make
      
      - name: Run subprocess integration tests
        run: dotnet test --filter "TestCategory=Subprocess" --logger trx

  hardware-tests:
    runs-on: self-hosted # Requires runners with hardware
    if: github.event_name == 'schedule' # Only run on scheduled builds
    steps:
      - name: Run hardware tests
        run: dotnet test --filter "TestCategory=Hardware" --logger trx
```

## Test Data Management

```csharp
// Test data generators (coming soon)
public class TestDataGenerator
{
    public static string GetValidPythonCode() => "2 + 2";
    
    public static string GetInvalidPythonCode() => "invalid syntax here";
    
    public static string GetLargePythonCode() => 
        string.Join("\n", Enumerable.Range(1, 1000).Select(i => $"x{i} = {i}"));
    
    public static Dictionary<string, object> GetSensorData() => new()
    {
        ["temperature"] = 25.5f,
        ["humidity"] = 60.2f,
        ["pressure"] = 1013.25f
    };
}
```

## Related Documentation

- [Getting Started](/guide/getting-started) - Setting up your first tests
- [Configuration](/guide/configuration) - Test-specific configuration
- [Hardware Compatibility](/hardware/compatibility) - Supported test hardware
- [Performance Troubleshooting](/hardware/troubleshooting-performance) - Performance test setup

**Need help now?** Check our [GitHub Discussions](https://github.com/belay-dotnet/Belay.NET/discussions) or review our [test examples in the repository](https://github.com/belay-dotnet/Belay.NET/tree/main/tests).