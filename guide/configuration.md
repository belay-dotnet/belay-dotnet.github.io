# Configuration

::: warning Documentation in Progress
This documentation is currently being developed. The configuration management system is implemented in Issue 002-104.

**Status**: ✅ Core functionality complete, 📝 Documentation in progress  
**Expected completion**: After Issue 002-106 (Cross-Component Integration Layer)
:::

## Coming Soon

This page will provide comprehensive guidance for configuring Belay.NET applications, including:

- **BelayConfiguration Structure**: Complete configuration options and hierarchy
- **Environment-Specific Settings**: Development, staging, and production configurations
- **Connection Configuration**: Serial port settings, timeouts, and retry policies
- **Performance Tuning**: Optimizing communication and execution parameters
- **Logging Configuration**: Structured logging setup and verbosity levels
- **Health Check Settings**: Monitoring and alerting configuration
- **Security Configuration**: Secure communication and authentication settings
- **ASP.NET Core Integration**: Configuration with dependency injection

## Quick Preview

```csharp
// Example of what's coming - comprehensive Belay.NET configuration
public void ConfigureServices(IServiceCollection services)
{
    services.AddBelay(config =>
    {
        // Device connection settings
        config.Device.DefaultConnectionTimeoutMs = 10000;
        config.Device.AutoReconnect = true;
        config.Device.ReconnectDelayMs = 2000;
        config.Device.MaxReconnectAttempts = 5;

        // Serial communication settings
        config.Communication.Serial.DefaultBaudRate = 115200;
        config.Communication.Serial.ReadTimeoutMs = 5000;
        config.Communication.Serial.WriteTimeoutMs = 5000;
        config.Communication.Serial.ReadBufferSize = 4096;
        config.Communication.Serial.WriteBufferSize = 4096;

        // Execution settings
        config.Execution.DefaultTimeoutMs = 30000;
        config.Execution.DefaultRetryAttempts = 3;
        config.Execution.RetryDelayMs = 1000;
        config.Execution.CacheEnabled = true;
        config.Execution.CacheDefaultDurationMs = 30000;

        // Session management
        config.Session.MaxConcurrentSessions = 10;
        config.Session.SessionTimeoutMs = 300000; // 5 minutes
        config.Session.IdleTimeoutMs = 60000;     // 1 minute
        config.Session.CleanupIntervalMs = 30000; // 30 seconds

        // Adaptive REPL protocol configuration
        config.Protocol.RawRepl.EnableAdaptiveTiming = true;
        config.Protocol.RawRepl.EnableAdaptiveFlowControl = true;
        config.Protocol.RawRepl.EnableRawPasteAutoDetection = true;
        config.Protocol.RawRepl.BaseResponseTimeoutMs = 2000;
        config.Protocol.RawRepl.MaxResponseTimeoutMs = 30000;
        config.Protocol.RawRepl.StartupDelayMs = 2000;
        config.Protocol.RawRepl.MaxStartupDelayMs = 10000;
        config.Protocol.RawRepl.InterruptDelayMs = 100;
        config.Protocol.RawRepl.MaxRetryAttempts = 3;
        config.Protocol.RawRepl.RetryDelayMs = 100;
        config.Protocol.RawRepl.MinimumWindowSize = 16;
        config.Protocol.RawRepl.MaximumWindowSize = 2048;
        config.Protocol.RawRepl.PreferredWindowSize = null; // Auto-detect
        config.Protocol.RawRepl.EnableVerboseLogging = false;

        // Health check settings
        config.HealthChecks.Enabled = true;
        config.HealthChecks.CheckIntervalMs = 30000;
        config.HealthChecks.FailureThreshold = 3;
        config.HealthChecks.TimeoutMs = 10000;

        // Logging settings
        config.Logging.LogLevel = LogLevel.Information;
        config.Logging.EnablePerformanceLogging = true;
        config.Logging.EnableProtocolLogging = false; // Security: disable in production
    });
}
```

## Configuration Sources

```csharp
// Configuration from multiple sources (coming soon)
public void Configure(IConfiguration configuration)
{
    services.AddBelay(config =>
    {
        // Bind from appsettings.json
        configuration.GetSection("Belay").Bind(config);
        
        // Override with environment variables
        config.Device.DefaultConnectionTimeoutMs = 
            int.Parse(Environment.GetEnvironmentVariable("BELAY_CONNECTION_TIMEOUT") ?? "10000");
            
        // Override with command line arguments
        if (args.Contains("--debug"))
        {
            config.Logging.LogLevel = LogLevel.Debug;
            config.Logging.EnableProtocolLogging = true;
        }
    });
}
```

## appsettings.json Structure

```json
{
  "Belay": {
    "Device": {
      "DefaultConnectionTimeoutMs": 10000,
      "AutoReconnect": true,
      "ReconnectDelayMs": 2000,
      "MaxReconnectAttempts": 5
    },
    "Communication": {
      "Serial": {
        "DefaultBaudRate": 115200,
        "ReadTimeoutMs": 5000,
        "WriteTimeoutMs": 5000,
        "ReadBufferSize": 4096,
        "WriteBufferSize": 4096
      }
    },
    "Execution": {
      "DefaultTimeoutMs": 30000,
      "DefaultRetryAttempts": 3,
      "RetryDelayMs": 1000,
      "CacheEnabled": true,
      "CacheDefaultDurationMs": 30000
    },
    "Protocol": {
      "RawRepl": {
        "EnableAdaptiveTiming": true,
        "EnableAdaptiveFlowControl": true,
        "EnableRawPasteAutoDetection": true,
        "BaseResponseTimeoutMs": 2000,
        "MaxResponseTimeoutMs": 30000,
        "StartupDelayMs": 2000,
        "MaxStartupDelayMs": 10000,
        "InterruptDelayMs": 100,
        "MaxRetryAttempts": 3,
        "RetryDelayMs": 100,
        "MinimumWindowSize": 16,
        "MaximumWindowSize": 2048,
        "PreferredWindowSize": null,
        "EnableVerboseLogging": false
      }
    },
    "HealthChecks": {
      "Enabled": true,
      "CheckIntervalMs": 30000,
      "FailureThreshold": 3,
      "TimeoutMs": 10000
    }
  }
}
```

## Environment-Specific Configuration

### Development Environment
- Verbose logging enabled
- Protocol logging for debugging
- Shorter timeouts for faster development cycles
- Auto-reconnection enabled

### Production Environment  
- Minimal logging for performance
- Protocol logging disabled for security
- Conservative timeouts for reliability
- Health checks enabled with alerting

### Testing Environment
- Subprocess communication for hardware-independent testing
- Fast timeouts for quick test execution
- Detailed logging for test diagnostics

## Adaptive REPL Protocol Configuration

The adaptive REPL protocol system automatically detects MicroPython device capabilities and adjusts communication parameters for optimal compatibility and performance. These settings control the auto-detection and fallback behavior.

### Core Adaptive Features

| Setting | Default | Description |
|---------|---------|-------------|
| `EnableAdaptiveTiming` | `true` | Automatically adjusts timeouts based on measured device performance |
| `EnableAdaptiveFlowControl` | `true` | Dynamically optimizes flow control parameters for raw-paste mode |
| `EnableRawPasteAutoDetection` | `true` | Tests and enables raw-paste mode if supported by the device |

### Timeout Configuration

| Setting | Default | Description |
|---------|---------|-------------|
| `BaseResponseTimeoutMs` | `2000` | Initial timeout for device responses (auto-adjusted based on performance) |
| `MaxResponseTimeoutMs` | `30000` | Maximum timeout after adaptive increases |
| `StartupDelayMs` | `2000` | Initial delay for device startup (increased if device needs more time) |
| `MaxStartupDelayMs` | `10000` | Maximum startup delay after adaptive increases |
| `InterruptDelayMs` | `100` | Delay after sending interrupt sequences (increased for slow devices) |

### Retry and Recovery Configuration

| Setting | Default | Description |
|---------|---------|-------------|
| `MaxRetryAttempts` | `3` | Number of retry attempts for failed operations |
| `RetryDelayMs` | `100` | Base delay between retry attempts (uses exponential backoff) |

### Flow Control Configuration

| Setting | Default | Description |
|---------|---------|-------------|
| `MinimumWindowSize` | `16` | Smallest acceptable window size during negotiation |
| `MaximumWindowSize` | `2048` | Largest window size to request during negotiation |
| `PreferredWindowSize` | `null` | Fixed window size (null = auto-detect optimal size) |

### Debugging Configuration

| Setting | Default | Description |
|---------|---------|-------------|
| `EnableVerboseLogging` | `false` | Enables detailed protocol logging for troubleshooting |

### Fallback Configuration Example

When auto-detection fails or for problematic devices, use conservative settings:

```csharp
services.AddBelay(config =>
{
    // Disable adaptive features for manual control
    config.Protocol.RawRepl.EnableAdaptiveTiming = false;
    config.Protocol.RawRepl.EnableAdaptiveFlowControl = false;
    config.Protocol.RawRepl.EnableRawPasteAutoDetection = false;
    
    // Use conservative manual settings
    config.Protocol.RawRepl.BaseResponseTimeoutMs = 5000;
    config.Protocol.RawRepl.StartupDelayMs = 5000;
    config.Protocol.RawRepl.InterruptDelayMs = 500;
    config.Protocol.RawRepl.PreferredWindowSize = 32;
    config.Protocol.RawRepl.MaxRetryAttempts = 5;
    config.Protocol.RawRepl.RetryDelayMs = 500;
    
    // Enable verbose logging for troubleshooting
    config.Protocol.RawRepl.EnableVerboseLogging = true;
});
```

### Device-Specific Recommendations

#### ESP32/ESP8266 Devices
```json
{
  "Protocol": {
    "RawRepl": {
      "StartupDelayMs": 3000,
      "InterruptDelayMs": 200,
      "PreferredWindowSize": 64
    }
  }
}
```

#### Raspberry Pi Pico
```json
{
  "Protocol": {
    "RawRepl": {
      "StartupDelayMs": 1500,
      "InterruptDelayMs": 50,
      "PreferredWindowSize": 128
    }
  }
}
```

#### CircuitPython Devices
```json
{
  "Protocol": {
    "RawRepl": {
      "EnableRawPasteAutoDetection": false,
      "StartupDelayMs": 2500,
      "InterruptDelayMs": 300
    }
  }
}
```

## Related Documentation

- [Dependency Injection](/guide/dependency-injection) - DI setup and service registration
- [Health Monitoring](/guide/health-monitoring) - Health check configuration
- [Performance Troubleshooting](/hardware/troubleshooting-performance) - Performance-related settings
- [ASP.NET Core Integration](/examples/aspnet-core) - Web application configuration

**Need help now?** Check our [GitHub Discussions](https://github.com/belay-dotnet/Belay.NET/discussions) or review the [dependency injection guide](/guide/dependency-injection).