# Configuration


Belay.NET provides a comprehensive configuration system for customizing device communication, protocol settings, session management, and performance tuning. Configuration can be provided through code, JSON files, environment variables, or dependency injection.

## Configuration Overview

The configuration system is organized into several key areas:

- **Device Configuration**: Connection timeouts, discovery settings, and retry policies
- **Communication Configuration**: Serial port settings and Raw REPL protocol parameters
- **Session Configuration**: Session management, timeouts, and cleanup behavior
- **Executor Configuration**: Task execution, caching, and performance settings
- **Exception Handling**: Error handling behavior and logging configuration

## Basic Configuration

### Using Dependency Injection

```csharp
using Microsoft.Extensions.DependencyInjection;
using Belay.Extensions.Configuration;

public void ConfigureServices(IServiceCollection services)
{
    services.AddBelay(config =>
    {
        // Device connection settings
        config.Device.DefaultConnectionTimeoutMs = 10000;
        config.Device.DefaultCommandTimeoutMs = 30000;
        
        // Communication settings
        config.Communication.Serial.DefaultBaudRate = 115200;
        config.Communication.Serial.ReadTimeoutMs = 1000;
        config.Communication.Serial.WriteTimeoutMs = 1000;
        
        // Session management
        config.Session.MaxConcurrentSessions = 10;
        config.Session.DefaultSessionTimeoutMs = 300000; // 5 minutes
        config.Session.EnableSessionCleanup = true;
        
        // Task executor settings
        config.Executor.DefaultTaskTimeoutMs = 30000;
        config.Executor.MaxCacheSize = 1000;
        config.Executor.EnableCachingByDefault = false;
        config.Executor.CacheExpirationMs = 600000; // 10 minutes
        
        // Raw REPL protocol (adaptive settings)
        config.Communication.RawRepl.EnableAdaptiveTiming = true;
        config.Communication.RawRepl.EnableAdaptiveFlowControl = true;
        config.Communication.RawRepl.EnableRawPasteAutoDetection = true;
        config.Communication.RawRepl.BaseResponseTimeout = TimeSpan.FromSeconds(2);
        config.Communication.RawRepl.MaxResponseTimeout = TimeSpan.FromSeconds(30);
        config.Communication.RawRepl.PreferredWindowSize = null; // Auto-detect
        
        // Exception handling
        config.ExceptionHandling.LogExceptions = true;
        config.ExceptionHandling.IncludeStackTraces = true;
        config.ExceptionHandling.PreserveContext = true;
    });
}
```

### Direct Configuration

```csharp
using Belay.Core;
using Belay.Extensions.Configuration;

// Create device with custom configuration
var config = new BelayConfiguration
{
    Device = new DeviceConfiguration
    {
        DefaultConnectionTimeoutMs = 5000,
        DefaultCommandTimeoutMs = 15000
    },
    Communication = new CommunicationConfiguration
    {
        Serial = new SerialConfiguration
        {
            DefaultBaudRate = 115200,
            ReadTimeoutMs = 2000,
            WriteTimeoutMs = 2000
        }
    }
};

// Use with device creation (when configuration support is added)
// var device = Device.FromConnectionString("serial:COM3", config);
```

## Configuration Sources

### JSON Configuration

Belay.NET integrates with .NET's configuration system and can be configured via `appsettings.json`:

```csharp
public void ConfigureServices(IServiceCollection services, IConfiguration configuration)
{
    services.AddBelay(config =>
    {
        // Bind from appsettings.json
        configuration.GetSection("Belay").Bind(config);
        
        // Override specific settings programmatically
        config.Communication.RawRepl.EnableVerboseLogging = 
            configuration.GetValue<bool>("Belay:Debug:EnableProtocolLogging");
    });
}
```

### Environment Variables

```csharp
services.AddBelay(config =>
{
    // Override with environment variables
    config.Device.DefaultConnectionTimeoutMs = 
        int.Parse(Environment.GetEnvironmentVariable("BELAY_CONNECTION_TIMEOUT") ?? "5000");
        
    config.Communication.Serial.DefaultBaudRate = 
        int.Parse(Environment.GetEnvironmentVariable("BELAY_BAUD_RATE") ?? "115200");
        
    // Debug mode from environment
    if (Environment.GetEnvironmentVariable("BELAY_DEBUG") == "true")
    {
        config.Communication.RawRepl.EnableVerboseLogging = true;
        config.ExceptionHandling.IncludeStackTraces = true;
    }
});
```

### Command Line Arguments

```csharp
public void ConfigureServices(IServiceCollection services, string[] args)
{
    services.AddBelay(config =>
    {
        // Override with command line arguments
        if (args.Contains("--debug"))
        {
            config.Communication.RawRepl.EnableVerboseLogging = true;
            config.ExceptionHandling.IncludeStackTraces = true;
        }
        
        if (args.Contains("--conservative"))
        {
            config.Communication.RawRepl.EnableAdaptiveTiming = false;
            config.Communication.RawRepl.EnableAdaptiveFlowControl = false;
            config.Communication.RawRepl.EnableRawPasteAutoDetection = false;
        }
    });
}
```

## Configuration File Format

### appsettings.json Structure

```json
{
  "Belay": {
    "Device": {
      "DefaultConnectionTimeoutMs": 5000,
      "DefaultCommandTimeoutMs": 30000,
      "Discovery": {
        "EnableAutoDiscovery": true,
        "DiscoveryTimeoutMs": 10000,
        "SerialPortPatterns": ["COM*", "/dev/ttyUSB*", "/dev/ttyACM*"]
      },
      "Retry": {
        "MaxRetries": 3,
        "InitialRetryDelayMs": 1000,
        "BackoffMultiplier": 2.0,
        "MaxRetryDelayMs": 30000
      }
    },
    "Communication": {
      "Serial": {
        "DefaultBaudRate": 115200,
        "ReadTimeoutMs": 1000,
        "WriteTimeoutMs": 1000
      },
      "RawRepl": {
        "InitializationTimeout": "00:00:05",
        "BaseResponseTimeout": "00:00:02",
        "MaxResponseTimeout": "00:00:30",
        "PreferredWindowSize": null,
        "MinimumWindowSize": 16,
        "MaximumWindowSize": 2048,
        "MaxRetryAttempts": 3,
        "RetryDelay": "00:00:00.100",
        "StartupDelay": "00:00:02",
        "MaxStartupDelay": "00:00:10",
        "InterruptDelay": "00:00:00.100",
        "EnableRawPasteAutoDetection": true,
        "EnableAdaptiveTiming": true,
        "EnableAdaptiveFlowControl": true,
        "EnableVerboseLogging": false
      }
    },
    "Session": {
      "DefaultSessionTimeoutMs": 300000,
      "MaxConcurrentSessions": 10,
      "EnableSessionCleanup": true,
      "SessionCleanupIntervalMs": 60000
    },
    "Executor": {
      "DefaultTaskTimeoutMs": 30000,
      "MaxCacheSize": 1000,
      "EnableCachingByDefault": false,
      "CacheExpirationMs": 600000
    },
    "ExceptionHandling": {
      "RethrowExceptions": true,
      "LogExceptions": true,
      "IncludeStackTraces": true,
      "ExceptionLogLevel": "Error",
      "PreserveContext": true,
      "MaxContextEntries": 50
    }
  }
}
```

### Environment-Specific Configuration

**appsettings.Development.json**:
```json
{
  "Belay": {
    "Communication": {
      "RawRepl": {
        "EnableVerboseLogging": true
      }
    },
    "ExceptionHandling": {
      "IncludeStackTraces": true,
      "ExceptionLogLevel": "Debug"
    }
  }
}
```

**appsettings.Production.json**:
```json
{
  "Belay": {
    "Communication": {
      "RawRepl": {
        "EnableVerboseLogging": false
      }
    },
    "ExceptionHandling": {
      "IncludeStackTraces": false,
      "ExceptionLogLevel": "Error"
    }
  }
}
```

## Configuration Reference

### Device Configuration

| Setting | Default | Description |
|---------|---------|-------------|
| `DefaultConnectionTimeoutMs` | `5000` | Timeout for establishing device connections |
| `DefaultCommandTimeoutMs` | `30000` | Default timeout for executing commands |
| `Discovery.EnableAutoDiscovery` | `true` | Enable automatic device discovery |
| `Discovery.DiscoveryTimeoutMs` | `10000` | Timeout for device discovery operations |
| `Discovery.SerialPortPatterns` | `["COM*", "/dev/ttyUSB*", "/dev/ttyACM*"]` | Patterns for serial port scanning |
| `Retry.MaxRetries` | `3` | Maximum number of operation retries |
| `Retry.InitialRetryDelayMs` | `1000` | Initial delay between retries |
| `Retry.BackoffMultiplier` | `2.0` | Exponential backoff multiplier |
| `Retry.MaxRetryDelayMs` | `30000` | Maximum delay between retries |

### Communication Configuration

| Setting | Default | Description |
|---------|---------|-------------|
| `Serial.DefaultBaudRate` | `115200` | Default serial communication baud rate |
| `Serial.ReadTimeoutMs` | `1000` | Serial read operation timeout |
| `Serial.WriteTimeoutMs` | `1000` | Serial write operation timeout |

### Session Configuration

| Setting | Default | Description |
|---------|---------|-------------|
| `DefaultSessionTimeoutMs` | `300000` | Default session timeout (5 minutes) |
| `MaxConcurrentSessions` | `10` | Maximum concurrent device sessions |
| `EnableSessionCleanup` | `true` | Enable automatic session cleanup |
| `SessionCleanupIntervalMs` | `60000` | Session cleanup interval (1 minute) |

### Executor Configuration

| Setting | Default | Description |
|---------|---------|-------------|
| `DefaultTaskTimeoutMs` | `30000` | Default timeout for task execution |
| `MaxCacheSize` | `1000` | Maximum number of cached task results |
| `EnableCachingByDefault` | `false` | Enable caching for all tasks by default |
| `CacheExpirationMs` | `600000` | Cache expiration time (10 minutes) |

### Exception Handling Configuration

| Setting | Default | Description |
|---------|---------|-------------|
| `RethrowExceptions` | `true` | Re-throw exceptions after handling |
| `LogExceptions` | `true` | Log exceptions when they occur |
| `IncludeStackTraces` | `true` | Include stack traces in exception logs |
| `ExceptionLogLevel` | `Error` | Log level for exception messages |
| `PreserveContext` | `true` | Preserve execution context in exceptions |
| `MaxContextEntries` | `50` | Maximum context entries to preserve |

## Raw REPL Protocol Configuration

The Raw REPL protocol supports adaptive configuration that automatically detects device capabilities and adjusts communication parameters for optimal performance.

### Core Protocol Settings

| Setting | Default | Type | Description |
|---------|---------|------|-------------|
| `InitializationTimeout` | `00:00:05` | TimeSpan | Timeout for protocol initialization |
| `BaseResponseTimeout` | `00:00:02` | TimeSpan | Base timeout for device responses |
| `MaxResponseTimeout` | `00:00:30` | TimeSpan | Maximum response timeout after adaptive increases |
| `StartupDelay` | `00:00:02` | TimeSpan | Initial device startup delay |
| `MaxStartupDelay` | `00:00:10` | TimeSpan | Maximum startup delay after adjustments |
| `InterruptDelay` | `00:00:00.100` | TimeSpan | Delay after interrupt sequences |
| `RetryDelay` | `00:00:00.100` | TimeSpan | Base delay between retry attempts |
| `MaxRetryAttempts` | `3` | int | Maximum retry attempts for operations |

### Flow Control Settings

| Setting | Default | Type | Description |
|---------|---------|------|-------------|
| `PreferredWindowSize` | `null` | int? | Fixed window size (null = auto-detect) |
| `MinimumWindowSize` | `16` | int | Minimum acceptable window size |
| `MaximumWindowSize` | `2048` | int | Maximum window size to request |

### Adaptive Features

| Setting | Default | Type | Description |
|---------|---------|------|-------------|
| `EnableRawPasteAutoDetection` | `true` | bool | Auto-detect raw-paste mode support |
| `EnableAdaptiveTiming` | `true` | bool | Automatically adjust timeouts |
| `EnableAdaptiveFlowControl` | `true` | bool | Optimize flow control parameters |
| `EnableVerboseLogging` | `false` | bool | Enable detailed protocol logging |

### Conservative Configuration

For problematic devices or when auto-detection fails:

```csharp
services.AddBelay(config =>
{
    var conservative = config.Communication.RawRepl.CreateFallbackConfiguration();
    config.Communication.RawRepl = conservative;
    
    // Or manually configure
    config.Communication.RawRepl.EnableAdaptiveTiming = false;
    config.Communication.RawRepl.EnableAdaptiveFlowControl = false;
    config.Communication.RawRepl.EnableRawPasteAutoDetection = false;
    config.Communication.RawRepl.BaseResponseTimeout = TimeSpan.FromSeconds(5);
    config.Communication.RawRepl.StartupDelay = TimeSpan.FromSeconds(5);
    config.Communication.RawRepl.InterruptDelay = TimeSpan.FromMilliseconds(500);
    config.Communication.RawRepl.PreferredWindowSize = 32;
});
```

### Platform-Specific Settings

**ESP32 (recommended)**:
```json
{
  "Communication": {
    "RawRepl": {
      "StartupDelay": "00:00:03",
      "InterruptDelay": "00:00:00.200",
      "PreferredWindowSize": 64
    }
  }
}
```

**Raspberry Pi Pico (recommended)**:
```json
{
  "Communication": {
    "RawRepl": {
      "StartupDelay": "00:00:01.500",
      "InterruptDelay": "00:00:00.050",
      "PreferredWindowSize": 128
    }
  }
}
```

**CircuitPython (recommended)**:
```json
{
  "Communication": {
    "RawRepl": {
      "EnableRawPasteAutoDetection": false,
      "StartupDelay": "00:00:02.500",
      "InterruptDelay": "00:00:00.300"
    }
  }
}
```

## Environment-Specific Examples

### Development Environment

```csharp
#if DEBUG
services.AddBelay(config =>
{
    // Verbose logging for debugging
    config.Communication.RawRepl.EnableVerboseLogging = true;
    config.ExceptionHandling.IncludeStackTraces = true;
    
    // Shorter timeouts for faster development
    config.Device.DefaultConnectionTimeoutMs = 3000;
    config.Device.DefaultCommandTimeoutMs = 15000;
    
    // Enable auto-discovery
    config.Device.Discovery.EnableAutoDiscovery = true;
});
#endif
```

### Production Environment

```csharp
#if RELEASE
services.AddBelay(config =>
{
    // Minimal logging for performance
    config.Communication.RawRepl.EnableVerboseLogging = false;
    config.ExceptionHandling.IncludeStackTraces = false;
    
    // Conservative timeouts for reliability
    config.Device.DefaultConnectionTimeoutMs = 10000;
    config.Device.DefaultCommandTimeoutMs = 60000;
    
    // Enable caching for performance
    config.Executor.EnableCachingByDefault = true;
    config.Executor.CacheExpirationMs = 1800000; // 30 minutes
});
#endif
```

### Testing Environment

```csharp
services.AddBelay(config =>
{
    // Fast timeouts for quick tests
    config.Device.DefaultConnectionTimeoutMs = 2000;
    config.Device.DefaultCommandTimeoutMs = 10000;
    
    // Detailed logging for diagnostics
    config.ExceptionHandling.LogExceptions = true;
    config.ExceptionHandling.IncludeStackTraces = true;
    
    // Disable adaptive features for consistent behavior
    config.Communication.RawRepl.EnableAdaptiveTiming = false;
    config.Communication.RawRepl.EnableAdaptiveFlowControl = false;
});
```

## Configuration Validation

Belay.NET validates configuration at startup and provides helpful error messages:

```csharp
services.AddBelay(config =>
{
    // Invalid configuration will throw BelayConfigurationException
    config.Device.DefaultConnectionTimeoutMs = -1; // Invalid: negative timeout
    config.Communication.Serial.DefaultBaudRate = 0; // Invalid: zero baud rate
    config.Session.MaxConcurrentSessions = -5; // Invalid: negative sessions
});
```

## Best Practices

1. **Environment-Specific Settings**: Use different configurations for development, testing, and production
2. **Conservative Production Settings**: Disable verbose logging and use longer timeouts in production
3. **Adaptive Features**: Enable adaptive protocol features for better device compatibility
4. **Caching Strategy**: Configure caching based on your application's usage patterns
5. **Timeout Management**: Set timeouts appropriate for your device types and network conditions
6. **Error Handling**: Configure exception handling based on your logging and monitoring strategy

## Related Documentation

- [Getting Started](/guide/getting-started) - Basic Belay.NET setup
- [Testing](/guide/testing) - Test-specific configuration
- [ESP32 Setup](/hardware/esp32) - ESP32-specific settings
- [Raspberry Pi Pico](/hardware/raspberry-pi-pico) - Pico-specific settings
- [ASP.NET Core Integration](/examples/aspnet-core) - Web application configuration

## External Resources

- [.NET Configuration Documentation](https://docs.microsoft.com/en-us/dotnet/core/extensions/configuration)
- [Dependency Injection in .NET](https://docs.microsoft.com/en-us/dotnet/core/extensions/dependency-injection)
- [MicroPython REPL Documentation](https://docs.micropython.org/en/latest/reference/repl.html)

**Need help?** Check our [GitHub Discussions](https://github.com/belay-dotnet/Belay.NET/discussions) for configuration examples and troubleshooting.