# Adaptive Protocol Detection

Belay.NET's adaptive protocol detection system automatically identifies device capabilities and optimizes communication parameters in real-time. This ensures optimal performance across the wide variety of MicroPython devices without requiring device-specific configuration profiles.

## Overview

### The Problem

MicroPython devices vary significantly in their protocol capabilities:

- **Buffer Sizes**: From 32 bytes (minimal CircuitPython) to 2KB (STM32 Pyboard)
- **Flow Control**: Some devices support raw-paste mode, others don't
- **Timing Sensitivity**: Response times vary from 10ms to several seconds
- **Platform Quirks**: ESP32 USB CDC behavior differs from STM32 native USB

### The Solution

Adaptive protocol detection provides:

1. **Automatic Capability Discovery**: Runtime detection of device features
2. **Performance Optimization**: Real-time parameter tuning based on device behavior
3. **Fallback Strategies**: Graceful degradation when advanced features aren't available
4. **Zero Configuration**: Works out-of-the-box with any MicroPython device

## Detection Process

### Phase 1: Basic REPL Validation

The first phase establishes basic Raw REPL communication:

```csharp
private async Task<DeviceReplCapabilities> DetectBasicCapabilitiesAsync(
    CancellationToken cancellationToken)
{
    var capabilities = new DeviceReplCapabilities();
    var stopwatch = Stopwatch.StartNew();

    try
    {
        // Test basic raw mode entry
        await EnterRawModeAsync(cancellationToken);
        
        capabilities.SupportsRawMode = true;
        capabilities.BasicResponseTime = stopwatch.Elapsed;
        
        logger.LogDebug("Basic REPL capability confirmed in {ResponseTime}ms", 
            stopwatch.ElapsedMilliseconds);
    }
    catch (Exception ex)
    {
        logger.LogWarning("Basic REPL detection failed: {Error}", ex.Message);
        capabilities.SupportsRawMode = false;
        return capabilities;
    }

    return capabilities;
}
```

**Detection Tests:**
- Raw mode entry (`0x01` → `raw REPL` response)
- Basic command execution (`print('test')`)
- Response time measurement
- Character encoding validation

### Phase 2: Advanced Feature Detection

Once basic communication is established, advanced features are probed:

```csharp
private async Task<bool> DetectRawPasteModeAsync(
    DeviceReplCapabilities capabilities, CancellationToken cancellationToken)
{
    try
    {
        // Send raw-paste initialization sequence
        await stream.WriteAsync(RAWPASTE_INIT, cancellationToken); // [0x05, 'A', 0x01]
        
        // Wait for confirmation with timeout
        using var timeoutCts = CancellationTokenSource.CreateLinkedTokenSource(cancellationToken);
        timeoutCts.CancelAfter(rawPasteDetectionTimeout);
        
        byte[] response = new byte[3];
        int bytesRead = await stream.ReadAsync(response, timeoutCts.Token);
        
        if (bytesRead >= 3 && response[0] == (byte)'R')
        {
            // Extract window size (16-bit little-endian)
            capabilities.MaxWindowSize = BitConverter.ToUInt16(response, 1);
            capabilities.SupportsRawPasteMode = true;
            
            logger.LogDebug("Raw-paste mode detected with window size: {WindowSize}", 
                capabilities.MaxWindowSize);
            return true;
        }
    }
    catch (OperationCanceledException)
    {
        logger.LogDebug("Raw-paste mode detection timeout - not supported");
    }
    catch (Exception ex)
    {
        logger.LogDebug("Raw-paste mode detection failed: {Error}", ex.Message);
    }
    
    capabilities.SupportsRawPasteMode = false;
    return false;
}
```

**Advanced Detection Tests:**
- Raw-paste mode support (`0x05 'A' 0x01` → `'R'` response)
- Window size extraction from device response
- Flow control behavior validation
- Large transfer capability assessment

### Phase 3: Performance Characterization

The final phase measures device performance characteristics:

```csharp
private async Task CharacterizeDevicePerformanceAsync(
    DeviceReplCapabilities capabilities, CancellationToken cancellationToken)
{
    var performanceTests = new[]
    {
        ("Small Command", "1+1", 50),
        ("Medium Code", GenerateMediumTestCode(), 200),
        ("Large Transfer", GenerateLargeTestCode(), 1000)
    };

    var responseTimes = new List<TimeSpan>();
    
    foreach (var (testName, code, expectedMs) in performanceTests)
    {
        var stopwatch = Stopwatch.StartNew();
        
        try
        {
            await ExecuteCodeAsync(code, cancellationToken);
            stopwatch.Stop();
            
            responseTimes.Add(stopwatch.Elapsed);
            logger.LogTrace("{TestName} completed in {ElapsedMs}ms", 
                testName, stopwatch.ElapsedMilliseconds);
        }
        catch (Exception ex)
        {
            logger.LogWarning("{TestName} failed: {Error}", testName, ex.Message);
        }
    }
    
    // Calculate performance characteristics
    capabilities.AverageResponseTime = TimeSpan.FromMilliseconds(
        responseTimes.Average(t => t.TotalMilliseconds));
    capabilities.ResponseTimeVariability = CalculateStandardDeviation(responseTimes);
    capabilities.RequiresExtendedStartup = responseTimes.First() > TimeSpan.FromSeconds(2);
    
    // Determine optimal parameters based on performance
    DetermineOptimalParameters(capabilities);
}
```

**Performance Metrics:**
- Average response time across different code sizes
- Response time variability (standard deviation)
- Startup delay requirements
- Transfer throughput characteristics

## Device Fingerprinting

### Platform Detection

Device platform identification uses multiple detection methods:

```csharp
private async Task<string> DetectDevicePlatformAsync(CancellationToken cancellationToken)
{
    try
    {
        // Execute platform detection code
        var platformInfo = await ExecuteAsync<Dictionary<string, string>>(@"
{
    'platform': sys.platform,
    'implementation': sys.implementation.name,
    'version': '.'.join(map(str, sys.version_info[:3])),
    'unique_id': ubinascii.hexlify(machine.unique_id()).decode() if hasattr(machine, 'unique_id') else 'unknown'
}", cancellationToken);
        
        return ClassifyPlatform(platformInfo);
    }
    catch (Exception ex)
    {
        logger.LogWarning("Platform detection failed, using fallback: {Error}", ex.Message);
        return "unknown";
    }
}

private string ClassifyPlatform(Dictionary<string, string> info)
{
    return info["platform"] switch
    {
        "esp32" => info["implementation"] == "circuitpython" ? "esp32-circuitpython" : "esp32-micropython",
        "stm32" => "pyboard",
        "rp2" => info["implementation"] == "circuitpython" ? "pico-circuitpython" : "pico-micropython",
        "linux" => "unix-port",
        _ => $"unknown-{info["platform"]}"
    };
}
```

### Capability Mapping

Based on detected platform, default capabilities are established:

```csharp
private void ApplyPlatformDefaults(DeviceReplCapabilities capabilities, string platform)
{
    var defaults = platform switch
    {
        "esp32-micropython" => new CapabilityDefaults
        {
            PreferredWindowSize = 64,
            StartupDelayMs = 3000,
            InterruptDelayMs = 200,
            MaxRetryAttempts = 5,
            BaseResponseTimeoutMs = 2000
        },
        "pyboard" => new CapabilityDefaults
        {
            PreferredWindowSize = 256,
            StartupDelayMs = 1000,
            InterruptDelayMs = 50,
            MaxRetryAttempts = 3,
            BaseResponseTimeoutMs = 1000
        },
        "pico-micropython" => new CapabilityDefaults
        {
            PreferredWindowSize = 128,
            StartupDelayMs = 1500,
            InterruptDelayMs = 75,
            MaxRetryAttempts = 4,
            BaseResponseTimeoutMs = 1500
        },
        _ => new CapabilityDefaults
        {
            PreferredWindowSize = 32,
            StartupDelayMs = 5000,
            InterruptDelayMs = 500,
            MaxRetryAttempts = 5,
            BaseResponseTimeoutMs = 3000
        }
    };
    
    ApplyDefaults(capabilities, defaults);
}
```

## Adaptive Parameter Optimization

### Real-Time Adjustment

Parameters are continuously optimized based on actual performance:

```csharp
public class AdaptiveParameterOptimizer
{
    private readonly Dictionary<string, PerformanceHistory> deviceHistory = new();
    
    public void RecordOperationPerformance(string deviceId, string operation, 
        TimeSpan duration, bool success, int dataSize = 0)
    {
        if (!deviceHistory.TryGetValue(deviceId, out var history))
        {
            history = new PerformanceHistory();
            deviceHistory[deviceId] = history;
        }
        
        var sample = new PerformanceSample
        {
            Operation = operation,
            Duration = duration,
            Success = success,
            DataSize = dataSize,
            Timestamp = DateTime.UtcNow
        };
        
        history.AddSample(sample);
        
        // Trigger parameter adjustment if needed
        if (history.SampleCount % 10 == 0)
        {
            OptimizeParameters(deviceId, history);
        }
    }
    
    private void OptimizeParameters(string deviceId, PerformanceHistory history)
    {
        var recentSamples = history.GetRecentSamples(TimeSpan.FromMinutes(5));
        var successRate = recentSamples.Count(s => s.Success) / (double)recentSamples.Count;
        var avgResponseTime = recentSamples.Average(s => s.Duration.TotalMilliseconds);
        
        // Adjust window size based on performance
        if (successRate < 0.9 && avgResponseTime > 2000)
        {
            // Poor performance, reduce window size
            capabilities.PreferredWindowSize = Math.Max(32, capabilities.PreferredWindowSize / 2);
            logger.LogInformation("Reduced window size to {WindowSize} due to poor performance", 
                capabilities.PreferredWindowSize);
        }
        else if (successRate > 0.95 && avgResponseTime < 1000)
        {
            // Good performance, can increase window size
            capabilities.PreferredWindowSize = Math.Min(512, capabilities.PreferredWindowSize * 2);
            logger.LogInformation("Increased window size to {WindowSize} due to good performance", 
                capabilities.PreferredWindowSize);
        }
        
        // Adjust timeouts based on actual response times
        var p95ResponseTime = CalculatePercentile(recentSamples.Select(s => s.Duration), 0.95);
        capabilities.BaseResponseTimeoutMs = (int)(p95ResponseTime.TotalMilliseconds * 1.5);
    }
}
```

### Learning and Persistence

Device-specific optimizations are persisted for future sessions:

```csharp
public class DeviceCapabilityCache
{
    private readonly string cacheFilePath;
    
    public async Task SaveCapabilitiesAsync(string deviceId, DeviceReplCapabilities capabilities)
    {
        var cacheEntry = new CapabilityCacheEntry
        {
            DeviceId = deviceId,
            Platform = capabilities.DetectedPlatform,
            Capabilities = capabilities,
            LastUpdated = DateTime.UtcNow,
            LearningDataVersion = CURRENT_VERSION
        };
        
        var json = JsonSerializer.Serialize(cacheEntry, jsonOptions);
        await File.WriteAllTextAsync(GetCacheFilePath(deviceId), json);
        
        logger.LogDebug("Saved capabilities for device {DeviceId}", deviceId);
    }
    
    public async Task<DeviceReplCapabilities?> LoadCapabilitiesAsync(string deviceId)
    {
        try
        {
            var filePath = GetCacheFilePath(deviceId);
            if (!File.Exists(filePath))
                return null;
                
            var json = await File.ReadAllTextAsync(filePath);
            var cacheEntry = JsonSerializer.Deserialize<CapabilityCacheEntry>(json, jsonOptions);
            
            // Validate cache entry age and version
            if (cacheEntry == null || 
                DateTime.UtcNow - cacheEntry.LastUpdated > TimeSpan.FromDays(7) ||
                cacheEntry.LearningDataVersion != CURRENT_VERSION)
            {
                logger.LogDebug("Cache entry for device {DeviceId} is stale, ignoring", deviceId);
                return null;
            }
            
            logger.LogDebug("Loaded cached capabilities for device {DeviceId}", deviceId);
            return cacheEntry.Capabilities;
        }
        catch (Exception ex)
        {
            logger.LogWarning("Failed to load capabilities cache for device {DeviceId}: {Error}", 
                deviceId, ex.Message);
            return null;
        }
    }
}
```

## Fallback Strategies

### Progressive Degradation

When advanced features fail, the system gracefully falls back:

```csharp
public async Task<string> ExecuteWithReliableProtocolAsync(string code, CancellationToken cancellationToken)
{
    var strategies = new List<Func<Task<string>>>
    {
        // Strategy 1: Raw-paste mode with detected window size
        () => ExecuteWithRawPasteModeAsync(code, capabilities.PreferredWindowSize, cancellationToken),
        
        // Strategy 2: Raw-paste mode with conservative window
        () => ExecuteWithRawPasteModeAsync(code, 32, cancellationToken),
        
        // Strategy 3: Chunked raw mode
        () => ExecuteWithChunkedRawModeAsync(code, capabilities.PreferredWindowSize, cancellationToken),
        
        // Strategy 4: Small chunk raw mode
        () => ExecuteWithChunkedRawModeAsync(code, 32, cancellationToken),
        
        // Strategy 5: Line-by-line raw mode (slowest but most compatible)
        () => ExecuteWithLineByLineAsync(code, cancellationToken)
    };
    
    Exception? lastException = null;
    
    for (int i = 0; i < strategies.Count; i++)
    {
        try
        {
            var result = await strategies[i]();
            
            if (i > 0)
            {
                logger.LogInformation("Code execution succeeded using fallback strategy {StrategyIndex}", i + 1);
                
                // Update capability flags to reflect what actually works
                UpdateCapabilitiesFromFallback(i);
            }
            
            return result;
        }
        catch (Exception ex)
        {
            lastException = ex;
            logger.LogWarning("Execution strategy {StrategyIndex} failed: {Error}", i + 1, ex.Message);
            
            // Reset device state before trying next strategy
            await SoftResetDeviceAsync(cancellationToken);
            await Task.Delay(capabilities.InterruptDelayMs, cancellationToken);
        }
    }
    
    throw new DeviceProtocolException("All execution strategies failed", lastException);
}
```

### Error Recovery

Sophisticated error recovery handles various failure modes:

```csharp
private async Task HandleDetectionFailureAsync(DetectionFailureType failureType, 
    Exception exception, CancellationToken cancellationToken)
{
    logger.LogWarning("Detection failure of type {FailureType}: {Error}", failureType, exception.Message);
    
    switch (failureType)
    {
        case DetectionFailureType.Timeout:
            // Device may be slow to respond
            capabilities.StartupDelayMs = Math.Min(capabilities.StartupDelayMs * 2, 10000);
            capabilities.BaseResponseTimeoutMs = Math.Min(capabilities.BaseResponseTimeoutMs * 2, 30000);
            break;
            
        case DetectionFailureType.ProtocolError:
            // Device may not support advanced features
            capabilities.SupportsRawPasteMode = false;
            capabilities.PreferredWindowSize = 32;
            break;
            
        case DetectionFailureType.ConnectionLost:
            // Hardware connection issue
            await ReestablishConnectionAsync(cancellationToken);
            break;
            
        case DetectionFailureType.DeviceReset:
            // Device reset during detection
            await Task.Delay(5000, cancellationToken); // Allow full boot
            capabilities.RequiresExtendedStartup = true;
            break;
    }
    
    // Mark capability as unreliable for future reference
    capabilities.ReliabilityScore = Math.Max(0.1, capabilities.ReliabilityScore - 0.2);
}
```

## Configuration Integration

### Configurable Detection Behavior

Users can control detection behavior through configuration:

```json
{
  "Protocol": {
    "Detection": {
      "EnableAutoDetection": true,
      "DetectionTimeoutMs": 5000,
      "MaxDetectionAttempts": 3,
      "EnableCapabilityCaching": true,
      "CacheExpirationDays": 7,
      "FallbackStrategy": "Progressive",
      "SkipPerformanceCharacterization": false
    }
  }
}
```

### Manual Override Options

Critical scenarios can override detection:

```csharp
var config = new RawReplConfiguration
{
    // Disable auto-detection for time-critical applications
    EnableRawPasteAutoDetection = false,
    
    // Force specific parameters
    PreferredWindowSize = 64,
    BaseResponseTimeoutMs = 2000,
    MaxRetryAttempts = 3,
    
    // Override detected capabilities
    ForceCapabilityOverrides = new Dictionary<string, object>
    {
        ["SupportsRawPasteMode"] = false,
        ["RequiresExtendedStartup"] = true
    }
};
```

## Monitoring and Diagnostics

### Detection Logging

Comprehensive logging provides insight into the detection process:

```csharp
logger.LogInformation("Starting adaptive protocol detection for device {DeviceId}", deviceId);
logger.LogDebug("Phase 1: Basic REPL validation");
logger.LogDebug("Raw mode entry successful, response time: {ResponseTime}ms", responseTime);
logger.LogDebug("Phase 2: Advanced feature detection");
logger.LogDebug("Raw-paste mode {Status}, window size: {WindowSize}", 
    supportsRawPaste ? "supported" : "not supported", windowSize);
logger.LogDebug("Phase 3: Performance characterization");
logger.LogDebug("Average response time: {AvgTime}ms, variability: {Variability}ms", 
    avgTime, variability);
logger.LogInformation("Detection complete. Platform: {Platform}, Reliability: {Score:P1}", 
    platform, reliabilityScore);
```

### Performance Metrics

Detection performance is tracked and reported:

```csharp
public class ProtocolDetectionMetrics
{
    public TimeSpan TotalDetectionTime { get; set; }
    public int DetectionAttempts { get; set; }
    public Dictionary<string, TimeSpan> PhaseTimings { get; set; } = new();
    public double ReliabilityScore { get; set; }
    public List<string> FallbacksUsed { get; set; } = new();
    public Dictionary<string, object> DetectedCapabilities { get; set; } = new();
}
```

## Testing and Validation

### Detection Test Suite

Comprehensive testing validates detection accuracy:

```csharp
[TestClass]
public class ProtocolDetectionTests
{
    [TestMethod]
    public async Task DetectESP32Capabilities_ShouldIdentifyCorrectFeatures()
    {
        // Arrange
        var mockDevice = CreateMockESP32Device();
        var detector = new AdaptiveProtocolDetector();
        
        // Act
        var capabilities = await detector.DetectCapabilitiesAsync(mockDevice);
        
        // Assert
        Assert.AreEqual("esp32-micropython", capabilities.DetectedPlatform);
        Assert.IsTrue(capabilities.SupportsRawPasteMode);
        Assert.AreEqual(64, capabilities.PreferredWindowSize);
        Assert.IsTrue(capabilities.RequiresExtendedStartup);
    }
    
    [TestMethod]
    public async Task FallbackStrategy_WhenRawPasteFails_ShouldUseChunkedMode()
    {
        // Arrange
        var mockDevice = CreateUnreliableDevice();
        var protocol = new AdaptiveRawReplProtocol(mockDevice);
        
        // Act
        var result = await protocol.ExecuteWithReliableProtocolAsync("print('test')");
        
        // Assert
        Assert.AreEqual("test", result.Trim());
        Assert.IsFalse(protocol.Capabilities.SupportsRawPasteMode); // Should be disabled after fallback
    }
}
```

### Performance Benchmarking

Detection performance is benchmarked across devices:

```csharp
[TestMethod]
public async Task DetectionPerformance_ShouldCompleteWithinTimeLimit()
{
    var stopwatch = Stopwatch.StartNew();
    var capabilities = await detector.DetectCapabilitiesAsync(testDevice);
    stopwatch.Stop();
    
    Assert.IsTrue(stopwatch.Elapsed < TimeSpan.FromSeconds(10), 
        $"Detection took {stopwatch.Elapsed.TotalSeconds:F1} seconds, exceeding 10s limit");
}
```

## Related Documentation

- [Raw REPL Protocol Deep Dive](/technical/protocols/raw-repl-protocol) - Protocol fundamentals
- [Raw-Paste Mode and Flow Control](/technical/protocols/raw-paste-mode) - Advanced flow control
- [Configuration Guide](/guide/configuration#adaptive-repl-protocol-configuration) - Configuration options
- Device-Specific Variations - Platform differences *(documentation coming soon)*

## Best Practices

### When to Disable Auto-Detection

- **Time-critical applications**: Skip detection for predictable environments
- **Known devices**: Use cached capabilities for devices with known characteristics
- **Production deployment**: Consider disabling characterization phase for faster startup

### Optimizing Detection Performance

- **Enable caching**: Persistent capability storage reduces repeated detection
- **Tune timeouts**: Adjust detection timeouts based on your device mix
- **Monitor metrics**: Track detection success rates and performance

### Troubleshooting Detection Issues

- **Enable verbose logging**: Set log level to Trace for detailed detection information
- **Check device state**: Ensure device is in clean state before detection
- **Validate connections**: Poor connections can cause false capability detection