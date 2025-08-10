# Belay.Extensions API Reference

Comprehensive API documentation generated from XML documentation comments.

## Table of Contents

### Belay.Extensions

- [BelayHealthCheckOptions](#belayextensionsbelayhealthcheckoptions)
- [DeviceHealthCheckConfiguration](#belayextensionsdevicehealthcheckconfiguration)
- [ServiceCollectionExtensions](#belayextensionsservicecollectionextensions)

### Belay.Extensions.Configuration

- [BelayConfiguration](#belayextensionsconfigurationbelayconfiguration)
- [CommunicationConfiguration](#belayextensionsconfigurationcommunicationconfiguration)
- [DeviceConfiguration](#belayextensionsconfigurationdeviceconfiguration)
- [DeviceDiscoveryConfiguration](#belayextensionsconfigurationdevicediscoveryconfiguration)
- [ExceptionHandlingConfiguration](#belayextensionsconfigurationexceptionhandlingconfiguration)
- [ExecutorConfiguration](#belayextensionsconfigurationexecutorconfiguration)
- [RawReplConfiguration](#belayextensionsconfigurationrawreplconfiguration)
- [RetryConfiguration](#belayextensionsconfigurationretryconfiguration)
- [SerialConfiguration](#belayextensionsconfigurationserialconfiguration)
- [SessionConfiguration](#belayextensionsconfigurationsessionconfiguration)

### Belay.Extensions.Examples

- [ConfigurationExample](#belayextensionsexamplesconfigurationexample)
- [DiUsageExample](#belayextensionsexamplesdiusageexample)

### Belay.Extensions.Examples.DiUsageExample

- [IMyDeviceService](#belayextensionsexamplesdiusageexampleimydeviceservice)
- [MyDeviceService](#belayextensionsexamplesdiusageexamplemydeviceservice)

### Belay.Extensions.Factories

- [CommunicatorFactory](#belayextensionsfactoriescommunicatorfactory)
- [DeviceFactory](#belayextensionsfactoriesdevicefactory)
- [ExecutorFactory](#belayextensionsfactoriesexecutorfactory)
- [ICommunicatorFactory](#belayextensionsfactoriesicommunicatorfactory)
- [IDeviceFactory](#belayextensionsfactoriesidevicefactory)
- [IExecutorFactory](#belayextensionsfactoriesiexecutorfactory)

### Belay.Extensions.HealthChecks

- [BelayHealthCheck](#belayextensionshealthchecksbelayhealthcheck)
- [DeviceConnectivityHealthCheck](#belayextensionshealthchecksdeviceconnectivityhealthcheck)


---

## Belay.Extensions

### Belay.Extensions.BelayHealthCheckOptions {#belayextensionsbelayhealthcheckoptions}

Options for configuring Belay.NET health checks.

#### Properties

**DeviceHealthChecks**

Gets the list of device health checks to register.

**SystemHealthCheckTimeoutSeconds**

Gets or sets the system health check timeout in seconds.

#### Methods

**Int32)**

Adds a device connectivity health check.

*Parameters*:
- `name`: The name of the health check.
- `portOrPath`: The port name or executable path to test.
- `timeoutSeconds`: The timeout in seconds (default 10).

*Returns*: The options instance for chaining.

---

### Belay.Extensions.DeviceHealthCheckConfiguration {#belayextensionsdevicehealthcheckconfiguration}

Configuration for a device health check.

#### Properties

**Name**

Gets or sets the name of the health check.

**PortOrPath**

Gets or sets the port name or executable path to test.

**TimeoutSeconds**

Gets or sets the timeout in seconds.

---

### Belay.Extensions.ServiceCollectionExtensions {#belayextensionsservicecollectionextensions}

Extension methods for registering Belay.NET services with dependency injection.

#### Methods

**IServiceCollection)**

Adds all Belay.NET services to the service collection with default configuration.

*Parameters*:
- `services`: The service collection.

*Returns*: The service collection for chaining.

**String)**

Adds all Belay.NET services to the service collection with IConfiguration binding.

*Parameters*:
- `services`: The service collection.
- `configuration`: The configuration instance.
- `sectionName`: The configuration section name (defaults to "Belay").

*Returns*: The service collection for chaining.

**BelayConfiguration})**

Adds all Belay.NET services to the service collection with configuration.

*Parameters*:
- `services`: The service collection.
- `configure`: Action to configure Belay options.

*Returns*: The service collection for chaining.

**IServiceCollection)**

Adds Belay.NET core services to the service collection.

*Parameters*:
- `services`: The service collection.

*Returns*: The service collection for chaining.

**IServiceCollection)**

Adds Belay.NET executor services as singletons.

*Parameters*:
- `services`: The service collection.

*Returns*: The service collection for chaining.

**IServiceCollection)**

Adds Belay.NET factory services to the service collection.

*Parameters*:
- `services`: The service collection.

*Returns*: The service collection for chaining.

**BelayHealthCheckOptions})**

Adds Belay.NET health checks to the service collection.

*Parameters*:
- `services`: The service collection.
- `configureHealthChecks`: Optional action to configure health check options.

*Returns*: The service collection for chaining.

**IServiceProvider)**

Creates a service scope and resolves a device factory.

*Parameters*:
- `serviceProvider`: The service provider.

*Returns*: A device factory instance.

**IServiceProvider)**

Creates a service scope and resolves an executor factory.

*Parameters*:
- `serviceProvider`: The service provider.

*Returns*: An executor factory instance.

---

## Belay.Extensions.Configuration

### Belay.Extensions.Configuration.BelayConfiguration {#belayextensionsconfigurationbelayconfiguration}

Root configuration model for Belay.NET.

#### Properties

**Communication**

Gets or sets the communication configuration.

**Device**

Gets or sets the device configuration.

**ExceptionHandling**

Gets or sets the exception handling configuration.

**Executor**

Gets or sets the executor configuration.

**Session**

Gets or sets the session configuration.

---

### Belay.Extensions.Configuration.CommunicationConfiguration {#belayextensionsconfigurationcommunicationconfiguration}

Configuration for communication protocols.

#### Properties

**RawRepl**

Gets or sets the raw REPL configuration.

**Serial**

Gets or sets the serial communication configuration.

---

### Belay.Extensions.Configuration.DeviceConfiguration {#belayextensionsconfigurationdeviceconfiguration}

Configuration for device connection and discovery.

#### Properties

**DefaultCommandTimeoutMs**

Gets or sets the default command timeout in milliseconds.

**DefaultConnectionTimeoutMs**

Gets or sets the default connection timeout in milliseconds.

**Discovery**

Gets or sets the device discovery configuration.

**Retry**

Gets or sets the retry configuration.

---

### Belay.Extensions.Configuration.DeviceDiscoveryConfiguration {#belayextensionsconfigurationdevicediscoveryconfiguration}

Configuration for device discovery.

#### Properties

**DiscoveryTimeoutMs**

Gets or sets the discovery timeout in milliseconds.

**EnableAutoDiscovery**

Gets or sets a value indicating whether auto-discovery is enabled.

**SerialPortPatterns**

Gets or sets the list of serial port patterns to scan.

---

### Belay.Extensions.Configuration.ExceptionHandlingConfiguration {#belayextensionsconfigurationexceptionhandlingconfiguration}

Configuration for exception handling behavior.

#### Properties

**ExceptionLogLevel**

Gets or sets the log level for exceptions.

**IncludeStackTraces**

Gets or sets a value indicating whether stack traces should be included in logs.

**LogExceptions**

Gets or sets a value indicating whether exceptions should be logged.

**MaxContextEntries**

Gets or sets the maximum number of context entries to preserve.

**PreserveContext**

Gets or sets a value indicating whether context should be preserved in exceptions.

**RethrowExceptions**

Gets or sets a value indicating whether exceptions should be rethrown after handling.

---

### Belay.Extensions.Configuration.ExecutorConfiguration {#belayextensionsconfigurationexecutorconfiguration}

Configuration for executor behavior.

#### Properties

**CacheExpirationMs**

Gets or sets the cache expiration time in milliseconds.

**DefaultTaskTimeoutMs**

Gets or sets the default task timeout in milliseconds.

**EnableCachingByDefault**

Gets or sets a value indicating whether caching is enabled by default.

**MaxCacheSize**

Gets or sets the maximum cache size for task results.

---

### Belay.Extensions.Configuration.RawReplConfiguration {#belayextensionsconfigurationrawreplconfiguration}

Configuration for Raw REPL protocol.

#### Properties

**InitializationTimeoutMs**

Gets or sets the initialization timeout in milliseconds.

**MaxRetries**

Gets or sets the maximum retries for protocol operations.

**WindowSize**

Gets or sets the window size for flow control.

---

### Belay.Extensions.Configuration.RetryConfiguration {#belayextensionsconfigurationretryconfiguration}

Configuration for retry behavior.

#### Properties

**BackoffMultiplier**

Gets or sets the retry backoff multiplier.

**InitialRetryDelayMs**

Gets or sets the initial retry delay in milliseconds.

**MaxRetries**

Gets or sets the maximum number of retries.

**MaxRetryDelayMs**

Gets or sets the maximum retry delay in milliseconds.

---

### Belay.Extensions.Configuration.SerialConfiguration {#belayextensionsconfigurationserialconfiguration}

Configuration for serial communication.

#### Properties

**DefaultBaudRate**

Gets or sets the default baud rate.

**ReadTimeoutMs**

Gets or sets the read timeout in milliseconds.

**WriteTimeoutMs**

Gets or sets the write timeout in milliseconds.

---

### Belay.Extensions.Configuration.SessionConfiguration {#belayextensionsconfigurationsessionconfiguration}

Configuration for session management.

#### Properties

**DefaultSessionTimeoutMs**

Gets or sets the default session timeout in milliseconds.

**EnableSessionCleanup**

Gets or sets a value indicating whether session cleanup is enabled.

**MaxConcurrentSessions**

Gets or sets the maximum concurrent sessions.

**SessionCleanupIntervalMs**

Gets or sets the session cleanup interval in milliseconds.

---

## Belay.Extensions.Examples

### Belay.Extensions.Examples.ConfigurationExample {#belayextensionsexamplesconfigurationexample}

Example configuration for appsettings.json.

#### Fields

**ExampleAppSettings**

Example JSON configuration that can be used in appsettings.json.

---

### Belay.Extensions.Examples.DiUsageExample {#belayextensionsexamplesdiusageexample}

Example showing how to use Belay.NET with dependency injection.

#### Methods

**IConfiguration)**

Example of setting up Belay.NET with ASP.NET Core. Note: Requires Microsoft.Extensions.Hosting and Microsoft.AspNetCore.App packages.

*Parameters*:
- `services`: The service collection from your ASP.NET Core application.
- `configuration`: The configuration from your ASP.NET Core application.

**RunConsoleExample**

Example of setting up Belay.NET with dependency injection in a console application. Note: In a real application you would add logging and use a proper hosting framework.

*Returns*: A task representing the asynchronous operation.

---

## Belay.Extensions.Examples.DiUsageExample

### Belay.Extensions.Examples.DiUsageExample.IMyDeviceService {#belayextensionsexamplesdiusageexampleimydeviceservice}

Example service that uses Belay.NET factories through dependency injection.

#### Methods

**RunDeviceOperationsAsync**

Run some operations on a device.

*Returns*: A task representing the operation.

---

### Belay.Extensions.Examples.DiUsageExample.MyDeviceService {#belayextensionsexamplesdiusageexamplemydeviceservice}

Implementation of device service using DI.

#### Methods

**MyDeviceService})**

Initializes a new instance of the

*Parameters*:
- `deviceFactory`: Factory for creating devices.
- `executorFactory`: Factory for creating executors.
- `logger`: Logger instance.

**RunDeviceOperationsAsync**

---

## Belay.Extensions.Factories

### Belay.Extensions.Factories.CommunicatorFactory {#belayextensionsfactoriescommunicatorfactory}

Default implementation of communicator factory.

#### Methods

**BelayConfiguration})**

Initializes a new instance of the

*Parameters*:
- `serialLogger`: Logger for serial communicators.
- `subprocessLogger`: Logger for subprocess communicators.
- `configuration`: The configuration options.

**Int32})**

**String[])**

---

### Belay.Extensions.Factories.DeviceFactory {#belayextensionsfactoriesdevicefactory}

Default implementation of device factory.

#### Methods

**Device})**

Initializes a new instance of the

*Parameters*:
- `communicatorFactory`: The communicator factory.
- `sessionManager`: The session manager.
- `logger`: The logger for device instances.

**IDeviceCommunication)**

**Int32})**

**String[])**

---

### Belay.Extensions.Factories.ExecutorFactory {#belayextensionsfactoriesexecutorfactory}

Default implementation of executor factory.

#### Methods

**IErrorMapper)**

Initializes a new instance of the

*Parameters*:
- `sessionManager`: The session manager.
- `taskLogger`: Logger for task executors.
- `setupLogger`: Logger for setup executors.
- `teardownLogger`: Logger for teardown executors.
- `threadLogger`: Logger for thread executors.
- `errorMapper`: Optional error mapper.

**Device)**

**Device)**

**Device)**

**Device)**

---

### Belay.Extensions.Factories.ICommunicatorFactory {#belayextensionsfactoriesicommunicatorfactory}

Factory for creating communication instances.

#### Methods

**Int32})**

Creates a serial communicator.

*Parameters*:
- `portName`: The serial port name.
- `baudRate`: Optional baud rate (uses configuration default if not specified).

*Returns*: A configured serial communicator.

**String[])**

Creates a subprocess communicator.

*Parameters*:
- `executablePath`: Path to the MicroPython executable.
- `arguments`: Optional command-line arguments.

*Returns*: A configured subprocess communicator.

---

### Belay.Extensions.Factories.IDeviceFactory {#belayextensionsfactoriesidevicefactory}

Factory for creating device instances with dependency injection.

#### Methods

**IDeviceCommunication)**

Creates a device instance with the specified communicator.

*Parameters*:
- `communicator`: The device communicator.

*Returns*: A configured device instance.

**Int32})**

Creates a device instance with serial communication.

*Parameters*:
- `portName`: The serial port name.
- `baudRate`: Optional baud rate (uses configuration default if not specified).

*Returns*: A configured device instance.

**String[])**

Creates a device instance with subprocess communication for testing.

*Parameters*:
- `executablePath`: Path to the MicroPython executable.
- `arguments`: Optional command-line arguments.

*Returns*: A configured device instance.

---

### Belay.Extensions.Factories.IExecutorFactory {#belayextensionsfactoriesiexecutorfactory}

Factory for creating executor instances.

#### Methods

**Device)**

Creates a setup executor instance.

*Parameters*:
- `device`: The device instance.

*Returns*: A configured setup executor.

**Device)**

Creates a task executor instance.

*Parameters*:
- `device`: The device instance.

*Returns*: A configured task executor.

**Device)**

Creates a teardown executor instance.

*Parameters*:
- `device`: The device instance.

*Returns*: A configured teardown executor.

**Device)**

Creates a thread executor instance.

*Parameters*:
- `device`: The device instance.

*Returns*: A configured thread executor.

---

## Belay.Extensions.HealthChecks

### Belay.Extensions.HealthChecks.BelayHealthCheck {#belayextensionshealthchecksbelayhealthcheck}

Health check for Belay.NET system components.

#### Methods

**BelayHealthCheck})**

Initializes a new instance of the

*Parameters*:
- `sessionManager`: The session manager.
- `deviceFactory`: The device factory.
- `logger`: The logger.

**CancellationToken)**

---

### Belay.Extensions.HealthChecks.DeviceConnectivityHealthCheck {#belayextensionshealthchecksdeviceconnectivityhealthcheck}

Health check for device connectivity.

#### Methods

**String)**

Initializes a new instance of the

*Parameters*:
- `deviceFactory`: The device factory.
- `logger`: The logger.
- `testPortOrPath`: The test port name or executable path for connectivity test.

**CancellationToken)**

---

