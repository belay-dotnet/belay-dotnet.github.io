# Belay.Core API Reference

Comprehensive API documentation generated from XML documentation comments.

## Table of Contents

### Belay.Core

- [Device](#belaycoredevice)

### Belay.Core.Caching

- [CacheStatistics](#belaycorecachingcachestatistics)
- [ICacheEntry](#belaycorecachingicacheentry)
- [IMethodDeploymentCache](#belaycorecachingimethoddeploymentcache)
- [IPersistentCacheStorage](#belaycorecachingipersistentcachestorage)
- [MethodCacheConfiguration](#belaycorecachingmethodcacheconfiguration)
- [MethodCacheEntry`1](#belaycorecachingmethodcacheentry1)
- [MethodCacheKey](#belaycorecachingmethodcachekey)
- [MethodDeploymentCache](#belaycorecachingmethoddeploymentcache)

### Belay.Core.Caching.MethodDeploymentCache

- [IMethodCacheEntryMetadata](#belaycorecachingmethoddeploymentcacheimethodcacheentrymetadata)

### Belay.Core.Communication

- [DeviceConnectionException](#belaycorecommunicationdeviceconnectionexception)
- [DeviceConnectionState](#belaycorecommunicationdeviceconnectionstate)
- [DeviceExecutionException](#belaycorecommunicationdeviceexecutionexception)
- [DeviceOutputEventArgs](#belaycorecommunicationdeviceoutputeventargs)
- [DeviceStateChangeEventArgs](#belaycorecommunicationdevicestatechangeeventargs)
- [DuplexStream](#belaycorecommunicationduplexstream)
- [IDeviceCommunication](#belaycorecommunicationidevicecommunication)
- [ReconnectionPolicy](#belaycorecommunicationreconnectionpolicy)
- [SerialDeviceCommunication](#belaycorecommunicationserialdevicecommunication)
- [SubprocessDeviceCommunication](#belaycorecommunicationsubprocessdevicecommunication)

### Belay.Core.Discovery

- [DeviceInfo](#belaycorediscoverydeviceinfo)
- [SerialDeviceDiscovery](#belaycorediscoveryserialdevicediscovery)
- [SerialDeviceDiscoveryLogger](#belaycorediscoveryserialdevicediscoverylogger)

### Belay.Core.Exceptions

- [BelayConfigurationException](#belaycoreexceptionsbelayconfigurationexception)
- [BelayException](#belaycoreexceptionsbelayexception)
- [BelayValidationException](#belaycoreexceptionsbelayvalidationexception)
- [DeviceCodeSyntaxException](#belaycoreexceptionsdevicecodesyntaxexception)
- [DeviceCommunicationException](#belaycoreexceptionsdevicecommunicationexception)
- [DeviceConnectionException](#belaycoreexceptionsdeviceconnectionexception)
- [DeviceExecutionException](#belaycoreexceptionsdeviceexecutionexception)
- [DeviceMemoryException](#belaycoreexceptionsdevicememoryexception)
- [DeviceResourceException](#belaycoreexceptionsdeviceresourceexception)
- [DeviceSessionException](#belaycoreexceptionsdevicesessionexception)
- [DeviceTimeoutException](#belaycoreexceptionsdevicetimeoutexception)
- [ErrorMapper](#belaycoreexceptionserrormapper)
- [ExceptionEnricher](#belaycoreexceptionsexceptionenricher)
- [ExceptionHandlingConfiguration](#belaycoreexceptionsexceptionhandlingconfiguration)
- [GlobalExceptionHandler](#belaycoreexceptionsglobalexceptionhandler)
- [IErrorMapper](#belaycoreexceptionsierrormapper)
- [IExceptionEnricher](#belaycoreexceptionsiexceptionenricher)
- [IGlobalExceptionHandler](#belaycoreexceptionsiglobalexceptionhandler)

### Belay.Core.Execution

- [BaseExecutor](#belaycoreexecutionbaseexecutor)
- [DeployedMethod](#belaycoreexecutiondeployedmethod)
- [DeploymentPipelineStage](#belaycoreexecutiondeploymentpipelinestage)
- [DeviceEnhancedExtensions](#belaycoreexecutiondeviceenhancedextensions)
- [DeviceProxyFactory](#belaycoreexecutiondeviceproxyfactory)
- [DeviceProxy`1](#belaycoreexecutiondeviceproxy1)
- [EnhancedDevice](#belaycoreexecutionenhanceddevice)
- [EnhancedExecutionStatistics](#belaycoreexecutionenhancedexecutionstatistics)
- [EnhancedExecutor](#belaycoreexecutionenhancedexecutor)
- [ExecutionContextScope](#belaycoreexecutionexecutioncontextscope)
- [ExecutionContextService](#belaycoreexecutionexecutioncontextservice)
- [ExecutionContext`1](#belaycoreexecutionexecutioncontext1)
- [ExecutionPipeline](#belaycoreexecutionexecutionpipeline)
- [ExecutionPipelineStage](#belaycoreexecutionexecutionpipelinestage)
- [IEnhancedDevice](#belaycoreexecutionienhanceddevice)
- [IEnhancedExecutor](#belaycoreexecutionienhancedexecutor)
- [IExecutionContextService](#belaycoreexecutioniexecutioncontextservice)
- [IExecutor](#belaycoreexecutioniexecutor)
- [IMethodExecutionContext](#belaycoreexecutionimethodexecutioncontext)
- [IPipelineStage](#belaycoreexecutionipipelinestage)
- [MethodExecutionContext](#belaycoreexecutionmethodexecutioncontext)
- [MethodInfoExtensions](#belaycoreexecutionmethodinfoextensions)
- [MethodInterceptionContext](#belaycoreexecutionmethodinterceptioncontext)
- [RunningThread](#belaycoreexecutionrunningthread)
- [SetupExecutor](#belaycoreexecutionsetupexecutor)
- [TaskAttributePipelineStage](#belaycoreexecutiontaskattributepipelinestage)
- [TaskExecutor](#belaycoreexecutiontaskexecutor)
- [TaskMethodExecutionContext](#belaycoreexecutiontaskmethodexecutioncontext)
- [TeardownExecutor](#belaycoreexecutionteardownexecutor)
- [ThreadAttributePipelineStage](#belaycoreexecutionthreadattributepipelinestage)
- [ThreadExecutor](#belaycoreexecutionthreadexecutor)
- [ValidationPipelineStage](#belaycoreexecutionvalidationpipelinestage)

### Belay.Core.Extensions

- [ExceptionHandlingConfigurator](#belaycoreextensionsexceptionhandlingconfigurator)
- [ExceptionHandlingServiceExtensions](#belaycoreextensionsexceptionhandlingserviceextensions)
- [IExceptionHandlingConfigurator](#belaycoreextensionsiexceptionhandlingconfigurator)

### Belay.Core.Protocol

- [AdaptiveRawReplProtocol](#belaycoreprotocoladaptiverawreplprotocol)
- [DeviceReplCapabilities](#belaycoreprotocoldevicereplcapabilities)
- [FlowControlException](#belaycoreprotocolflowcontrolexception)
- [RawReplConfiguration](#belaycoreprotocolrawreplconfiguration)
- [RawReplProtocol](#belaycoreprotocolrawreplprotocol)
- [RawReplProtocolException](#belaycoreprotocolrawreplprotocolexception)
- [RawReplResponse](#belaycoreprotocolrawreplresponse)
- [RawReplState](#belaycoreprotocolrawreplstate)
- [ReplProtocolMetrics](#belaycoreprotocolreplprotocolmetrics)

### Belay.Core.Sessions

- [BackgroundThreadInfo](#belaycoresessionsbackgroundthreadinfo)
- [DeployedMethodInfo](#belaycoresessionsdeployedmethodinfo)
- [DeviceCapabilities](#belaycoresessionsdevicecapabilities)
- [DeviceCapabilitiesChangedEventArgs](#belaycoresessionsdevicecapabilitieschangedeventargs)
- [DeviceContext](#belaycoresessionsdevicecontext)
- [DeviceFeature](#belaycoresessionsdevicefeature)
- [DeviceFeatureSet](#belaycoresessionsdevicefeatureset)
- [DeviceInfo](#belaycoresessionsdeviceinfo)
- [DeviceMemoryInfo](#belaycoresessionsdevicememoryinfo)
- [DevicePerformanceProfile](#belaycoresessionsdeviceperformanceprofile)
- [DevicePerformanceTier](#belaycoresessionsdeviceperformancetier)
- [DeviceSession](#belaycoresessionsdevicesession)
- [DeviceSessionManager](#belaycoresessionsdevicesessionmanager)
- [DeviceSessionState](#belaycoresessionsdevicesessionstate)
- [DeviceSessionStateChangedEventArgs](#belaycoresessionsdevicesessionstatechangedeventargs)
- [ExecutorContext](#belaycoresessionsexecutorcontext)
- [FileMetadata](#belaycoresessionsfilemetadata)
- [FileSystemCapabilities](#belaycoresessionsfilesystemcapabilities)
- [FileSystemContext](#belaycoresessionsfilesystemcontext)
- [IDeviceCapabilities](#belaycoresessionsidevicecapabilities)
- [IDeviceContext](#belaycoresessionsidevicecontext)
- [IDeviceInfo](#belaycoresessionsideviceinfo)
- [IDeviceSession](#belaycoresessionsidevicesession)
- [IDeviceSessionManager](#belaycoresessionsidevicesessionmanager)
- [IExecutorContext](#belaycoresessionsiexecutorcontext)
- [IFileSystemContext](#belaycoresessionsifilesystemcontext)
- [IResourceTracker](#belaycoresessionsiresourcetracker)
- [ISessionResource](#belaycoresessionsisessionresource)
- [ISessionState](#belaycoresessionsisessionstate)
- [ResourceState](#belaycoresessionsresourcestate)
- [ResourceStateChangedEventArgs](#belaycoresessionsresourcestatechangedeventargs)
- [ResourceTracker](#belaycoresessionsresourcetracker)
- [ResourceUsageStats](#belaycoresessionsresourceusagestats)
- [SessionResourceBase](#belaycoresessionssessionresourcebase)
- [SessionState](#belaycoresessionssessionstate)
- [SessionStats](#belaycoresessionssessionstats)

### Belay.Core.Testing

- [MicroPythonUnixPort](#belaycoretestingmicropythonunixport)
- [MicroPythonUnixPortLogger](#belaycoretestingmicropythonunixportlogger)
- [SubprocessTestHelper](#belaycoretestingsubprocesstesthelper)

### Belay.Core.Transactions

- [DeviceTransaction](#belaycoretransactionsdevicetransaction)
- [IDeviceTransaction](#belaycoretransactionsidevicetransaction)
- [ITransactionManager](#belaycoretransactionsitransactionmanager)
- [TransactionManager](#belaycoretransactionstransactionmanager)

### System.Text.RegularExpressions.Generated

- [MyRegex_0](#systemtextregularexpressionsgeneratedmyregex_0)
- [Utilities](#systemtextregularexpressionsgeneratedutilities)

### System.Text.RegularExpressions.Generated.MyRegex_0

- [RunnerFactory](#systemtextregularexpressionsgeneratedmyregex_0runnerfactory)

### System.Text.RegularExpressions.Generated.MyRegex_0.RunnerFactory

- [Runner](#systemtextregularexpressionsgeneratedmyregex_0runnerfactoryrunner)


---

## Belay.Core

### Belay.Core.Device {#belaycoredevice}

Main entry point for MicroPython device communication. Provides a high-level interface for connecting to and interacting with MicroPython devices.

#### Properties

**Communication**

Gets the communication interface for this device. Internal use for executors and session management.

**Sessions**

Gets the session manager for advanced session coordination scenarios.

**Setup**

Gets the setup executor for methods decorated with [Setup] attribute.

**State**

Gets the current connection state of the device.

**Task**

Gets the task executor for methods decorated with [Task] attribute.

**Teardown**

Gets the teardown executor for methods decorated with [Teardown] attribute.

**Thread**

Gets the thread executor for methods decorated with [Thread] attribute.

#### Methods

**IExecutionContextService)**

Initializes a new instance of the

*Parameters*:
- `communication`: The device communication implementation.
- `sessionManager`: The session manager for device coordination.
- `logger`: Logger for device operations.
- `loggerFactory`: Optional logger factory for executor logging.
- `methodCache`: Optional method deployment cache for performance optimization.
- `executionContextService`: Optional execution context service for secure method detection.

**Device})**

Initializes a new instance of the

*Parameters*:
- `communication`: The device communication implementation.
- `logger`: Optional logger for device operations.

**ILoggerFactory)**

Initializes a new instance of the

*Parameters*:
- `communication`: The device communication implementation.
- `logger`: Optional logger for device operations.
- `loggerFactory`: Optional logger factory for executor logging.

**CancellationToken)**

Connect to the MicroPython device.

*Parameters*:
- `cancellationToken`: Cancellation token.

*Returns*: A task representing the asynchronous operation.

**CancellationToken)**

Disconnect from the MicroPython device.

*Parameters*:
- `cancellationToken`: Cancellation token.

*Returns*: A task representing the asynchronous operation.

**CancellationToken)**

Discover available MicroPython devices on the system.

*Parameters*:
- `cancellationToken`: Cancellation token.

*Returns*: Array of discovered device information.

**CancellationToken)**

Create a Device instance for the first discovered MicroPython device.

*Parameters*:
- `loggerFactory`: Optional logger factory.
- `cancellationToken`: Cancellation token.

*Returns*: A Device instance for the first discovered device, or null if none found.

**Dispose**

**CancellationToken)**

Execute Python code on the device and return the result. If called from a method with Belay attributes, applies attribute-specific policies.

*Parameters*:
- `code`: The Python code to execute.
- `cancellationToken`: Cancellation token.

*Returns*: The execution result as a string.

*Exceptions*:
- `System.ObjectDisposedException`: Thrown when the device has been disposed.
- `System.ArgumentException`: Thrown when code is null or empty.
- `Belay.Core.Communication.DeviceConnectionException`: Thrown when the device is not connected.
- `Belay.Core.Communication.DeviceExecutionException`: Thrown when code execution fails on the device.

*Example*:
var device = Device.FromConnectionString("serial:COM3"); await device.ConnectAsync(); string result = await device.ExecuteAsync("print('Hello World')"); // result contains the output from the device
```csharp
var device = Device.FromConnectionString("serial:COM3");
            await device.ConnectAsync();
            string result = await device.ExecuteAsync("print('Hello World')");
            // result contains the output from the device
```


**CancellationToken)**

Execute Python code on the device and return the result as a typed object. If called from a method with Belay attributes, applies attribute-specific policies.

*Parameters*:
- `code`: The Python code to execute.
- `cancellationToken`: Cancellation token.

*Returns*: The execution result cast to the specified type.

*Exceptions*:
- `System.ObjectDisposedException`: Thrown when the device has been disposed.
- `System.ArgumentException`: Thrown when code is null or empty.
- `Belay.Core.Communication.DeviceConnectionException`: Thrown when the device is not connected.
- `Belay.Core.Communication.DeviceExecutionException`: Thrown when code execution fails on the device.
- `System.InvalidOperationException`: Thrown when the result cannot be converted to type T.

*Example*:
var device = Device.FromConnectionString("serial:COM3"); await device.ConnectAsync(); // Execute code that returns a number int result = await device.ExecuteAsync&lt;int&gt;("2 + 3"); // Execute code that returns a complex object var data = await device.ExecuteAsync&lt;Dictionary&lt;string, object&gt;&gt;("{'temperature': 25.5, 'humidity': 60}");
```csharp
var device = Device.FromConnectionString("serial:COM3");
             await device.ConnectAsync();
            
             // Execute code that returns a number
             int result = await device.ExecuteAsync&lt;int&gt;("2 + 3");
            
             // Execute code that returns a complex object
             var data = await device.ExecuteAsync&lt;Dictionary&lt;string, object&gt;&gt;("{'temperature': 25.5, 'humidity': 60}");
```


**CancellationToken)**

Executes a method without returning a value with automatic executor selection based on attributes.

*Parameters*:
- `method`: The method to execute.
- `instance`: The instance to invoke the method on (null for static methods).
- `parameters`: The parameters to pass to the method.
- `cancellationToken`: Cancellation token to cancel the execution.

*Returns*: A task representing the asynchronous operation.

**CancellationToken)**

Executes a method with automatic executor selection based on attributes. This is the main entry point for the attribute-based programming model and uses secure execution context.

*Parameters*:
- `method`: The method to execute.
- `instance`: The instance to invoke the method on (null for static methods).
- `parameters`: The parameters to pass to the method.
- `cancellationToken`: Cancellation token to cancel the execution.

*Returns*: The result of the method execution.

**ILoggerFactory)**

Create a Device instance from a connection string.

*Parameters*:
- `connectionString`: Connection string (e.g., "serial:COM3", "subprocess:micropython").
- `loggerFactory`: Optional logger factory.

*Returns*: A configured Device instance.

*Exceptions*:
- `System.ArgumentException`: Thrown when the connection string is invalid or unsupported.

*Example*:
// Connect to a device via serial port var device = Device.FromConnectionString("serial:COM3"); // Connect to MicroPython subprocess for testing var testDevice = Device.FromConnectionString("subprocess:micropython"); // With logging var loggerFactory = LoggerFactory.Create(builder =&gt; builder.AddConsole()); var deviceWithLogging = Device.FromConnectionString("serial:/dev/ttyACM0", loggerFactory);
```csharp
// Connect to a device via serial port
             var device = Device.FromConnectionString("serial:COM3");
            
             // Connect to MicroPython subprocess for testing
             var testDevice = Device.FromConnectionString("subprocess:micropython");
            
             // With logging
             var loggerFactory = LoggerFactory.Create(builder =&gt; builder.AddConsole());
             var deviceWithLogging = Device.FromConnectionString("serial:/dev/ttyACM0", loggerFactory);
```


**GetDeviceIdentification**

Gets device identification information for cache key generation.

*Returns*: A tuple containing device identifier and firmware version.

**MethodInfo)**

Gets the appropriate executor for a method based on its attributes.

*Parameters*:
- `method`: The method to get an executor for.

*Returns*: The executor that can handle the method, or null if none found.

**CancellationToken)**

Retrieve a file from the device to the local system.

*Parameters*:
- `remotePath`: Path to the file on the device.
- `cancellationToken`: Cancellation token.

*Returns*: The file contents as a byte array.

**CancellationToken)**

Transfer a file from the local system to the device.

*Parameters*:
- `localPath`: Path to the local file.
- `remotePath`: Path where the file should be stored on the device.
- `cancellationToken`: Cancellation token.

*Returns*: A task representing the asynchronous operation.

---

## Belay.Core.Caching

### Belay.Core.Caching.CacheStatistics {#belaycorecachingcachestatistics}

Tracks performance metrics and statistics for method deployment cache.

#### Properties

**CurrentEntryCount**

Gets current number of entries in the cache.

**HitRatio**

Gets calculates the cache hit ratio.

**TotalEvictions**

Gets total number of cache entry evictions.

**TotalHits**

Gets total number of successful cache hits.

**TotalMisses**

Gets total number of cache misses.

#### Methods

**DecrementEntryCount**

Decrements the current entry count.

**IncrementEntryCount**

Increments the current entry count.

**RecordEviction**

Records a cache entry eviction.

**RecordHit**

Records a cache hit.

**RecordMiss**

Records a cache miss.

**Reset**

Resets all statistics to their initial state.

---

### Belay.Core.Caching.ICacheEntry {#belaycorecachingicacheentry}

Base interface for cache entries to enable type-safe storage.

---

### Belay.Core.Caching.IMethodDeploymentCache {#belaycorecachingimethoddeploymentcache}

Defines the contract for a method deployment cache.

#### Methods

**ClearAll**

Clears all entries from the cache.

**GetStatistics**

Retrieves current cache statistics.

*Returns*: Current cache statistics.

**MethodCacheKey)**

Attempts to retrieve a cached result for the specified method cache key.

*Parameters*:
- `key`: The method cache key.

*Returns*: The cached result, or null if not found.

**MethodCacheKey)**

Removes a specific entry from the cache.

*Parameters*:
- `key`: The method cache key to remove.

*Returns*: True if the entry was removed, false if it didn't exist.

**TimeSpan})**

Sets a value in the cache for the specified method cache key.

*Parameters*:
- `key`: The method cache key.
- `value`: The value to cache.
- `expiresAfter`: Optional expiration time.

---

### Belay.Core.Caching.IPersistentCacheStorage {#belaycorecachingipersistentcachestorage}

Defines an interface for persistent cache storage in Belay.NET.

**Remarks**: This is a placeholder interface for future persistent cache storage implementations. Future implementations may include file-system, database, or distributed cache backends.

#### Methods

**CancellationToken)**

Clears all entries from persistent storage.

*Parameters*:
- `cancellationToken`: Cancellation token for the operation.

**CancellationToken)**

Removes a specific entry from persistent storage.

*Parameters*:
- `key`: The cache key to remove.
- `cancellationToken`: Cancellation token for the operation.

**CancellationToken)**

Reads a cached value from persistent storage.

*Parameters*:
- `key`: The cache key.
- `cancellationToken`: Cancellation token for the operation.

*Returns*: The cached value, or default if not found.

**CancellationToken)**

Writes a value to persistent storage.

*Parameters*:
- `key`: The cache key.
- `value`: The value to store.
- `expiration`: Optional expiration time.
- `cancellationToken`: Cancellation token for the operation.

---

### Belay.Core.Caching.MethodCacheConfiguration {#belaycorecachingmethodcacheconfiguration}

Configuration options for method deployment caching behavior.

#### Properties

**AutoEvictOnMaxSize**

Gets or sets a value indicating whether enables automatic cache entry eviction when max size is reached.

**CleanupInterval**

Gets or sets interval for periodic cache cleanup.

**DefaultExpiration**

Gets or sets default time-to-live for cache entries.

**EnablePeriodicCleanup**

Gets or sets a value indicating whether enables periodic cache cleanup to remove expired entries.

**MaxCacheSize**

Gets or sets maximum number of cache entries allowed.

#### Methods

**Validate**

Validates the configuration settings.

---

### Belay.Core.Caching.MethodCacheEntry`1 {#belaycorecachingmethodcacheentry1}

Represents a cached method deployment entry with metadata and expiration tracking.

#### Properties

**CreatedAt**

Gets the timestamp when the cache entry was created.

**ExpiresAfter**

Gets the expiration time for the cache entry.

**IsExpired**

Gets a value indicating whether determines whether the cache entry has expired.

**LastAccessedAt**

Gets the timestamp when the cache entry was last accessed.

**Value**

Gets the cached result value.

#### Methods

**TimeSpan})**

Initializes a new instance of the

*Parameters*:
- `value`: The cached value.
- `expiresAfter`: Optional time-to-live duration.

**GetRemainingLifetime**

Provides the time remaining before the cache entry expires.

**GetValue**

Gets the cached value as an object.

*Returns*: The cached value.

**UpdateLastAccessed**

Updates the last accessed timestamp.

---

### Belay.Core.Caching.MethodCacheKey {#belaycorecachingmethodcachekey}

Represents a unique cache key for method deployment based on device and method characteristics.

#### Properties

**Hash**

Gets the unique hash representing the method cache key.

#### Methods

**String)**

Initializes a new instance of the

*Parameters*:
- `deviceId`: Unique identifier for the device.
- `firmwareVersion`: Firmware version of the device.
- `methodSignature`: Unique method signature or content hash.

**MethodCacheKey)**

Determines whether the current cache key is equal to another.

**Object)**

Determines whether the current cache key is equal to another object.

**String)**

Generates a deterministic SHA-256 hash for the cache key.

**GetHashCode**

Serves as the default hash function.

**ToString**

Provides a string representation of the cache key.

**MethodCacheKey)**

Equality operator for cache keys.

**MethodCacheKey)**

Inequality operator for cache keys.

---

### Belay.Core.Caching.MethodDeploymentCache {#belaycorecachingmethoddeploymentcache}

Provides an in-memory implementation of the method deployment cache.

#### Methods

**MethodDeploymentCache})**

Initializes a new instance of the

*Parameters*:
- `configuration`: Cache configuration options.
- `logger`: Logger for diagnostics.

**ClearAll**

**Dispose**

**GetStatistics**

**MethodCacheKey)**

**MethodCacheKey)**

**TimeSpan})**

---

## Belay.Core.Caching.MethodDeploymentCache

### Belay.Core.Caching.MethodDeploymentCache.IMethodCacheEntryMetadata {#belaycorecachingmethoddeploymentcacheimethodcacheentrymetadata}

Metadata interface for cache entries to support expiration and cleanup.

---

## Belay.Core.Communication

### Belay.Core.Communication.DeviceConnectionException {#belaycorecommunicationdeviceconnectionexception}

Exception thrown when device connection fails.

#### Properties

**PortName**

Gets or sets name of the port that failed to connect.

#### Methods

**String)**

**Exception)**

---

### Belay.Core.Communication.DeviceConnectionState {#belaycorecommunicationdeviceconnectionstate}

Represents the connection state of a device.

#### Fields

**Connected**

Successfully connected and ready.

**Connecting**

Attempting to connect to device.

**Disconnected**

Device is not connected.

**Error**

Connection error state.

**Executing**

Currently executing code on device.

**Reconnecting**

Attempting to reconnect after connection loss.

---

### Belay.Core.Communication.DeviceExecutionException {#belaycorecommunicationdeviceexecutionexception}

Exception thrown when device code execution fails.

#### Properties

**DeviceOutput**

Gets or sets output received from the device.

**DeviceTraceback**

Gets or sets traceback information from the device.

**ExecutedCode**

Gets or sets the code that was being executed when the error occurred.

#### Methods

**String)**

**Exception)**

---

### Belay.Core.Communication.DeviceOutputEventArgs {#belaycorecommunicationdeviceoutputeventargs}

Represents the output received from a device.

#### Properties

**IsError**

**Output**

**Timestamp**

#### Methods

**Boolean)**

Represents the output received from a device.

---

### Belay.Core.Communication.DeviceStateChangeEventArgs {#belaycorecommunicationdevicestatechangeeventargs}

Represents a change in device connection state.

#### Properties

**Exception**

**NewState**

**OldState**

**Reason**

**Timestamp**

#### Methods

**Exception)**

Represents a change in device connection state.

---

### Belay.Core.Communication.DuplexStream {#belaycorecommunicationduplexstream}

Duplex stream implementation for combining stdin and stdout streams.

#### Properties

**CanRead**

**CanSeek**

**CanWrite**

**Length**

**Position**

#### Methods

**Stream)**

Initializes a new instance of the

**Boolean)**

**Flush**

**CancellationToken)**

**Int32)**

**CancellationToken)**

**SeekOrigin)**

**Int64)**

**Int32)**

**CancellationToken)**

---

### Belay.Core.Communication.IDeviceCommunication {#belaycorecommunicationidevicecommunication}

Core interface for device communication implementations.

#### Properties

**State**

Gets current connection state of the device.

#### Methods

**CancellationToken)**

Execute Python code on the device and return the result as a string.

*Parameters*:
- `code`: Python code to execute.
- `cancellationToken`: Cancellation token.

*Returns*: Result of code execution as string.

**CancellationToken)**

Execute Python code on the device and return the result as typed object.

*Parameters*:
- `code`: Python code to execute.
- `cancellationToken`: Cancellation token.

*Returns*: Result of code execution as typed object.

**CancellationToken)**

Retrieve a file from device to local system.

*Parameters*:
- `remotePath`: Remote file path on device.
- `cancellationToken`: Cancellation token.

*Returns*: File contents as byte array.

**CancellationToken)**

Transfer a file from local system to device.

*Parameters*:
- `localPath`: Local file path.
- `remotePath`: Remote file path on device.
- `cancellationToken`: Cancellation token.

*Returns*: A

---

### Belay.Core.Communication.ReconnectionPolicy {#belaycorecommunicationreconnectionpolicy}

Reconnection policy configuration for serial device communication.

#### Properties

**EnableAutoReconnect**

Gets or sets a value indicating whether enable automatic reconnection on connection loss.

**ExponentialBackoff**

Gets or sets a value indicating whether use exponential backoff for reconnection delays.

**MaxReconnectAttempts**

Gets or sets maximum number of reconnection attempts.

**ReconnectDelay**

Gets or sets delay between reconnection attempts.

---

### Belay.Core.Communication.SerialDeviceCommunication {#belaycorecommunicationserialdevicecommunication}

Serial/USB implementation of device communication for MicroPython devices.

#### Properties

**PortName**

Gets the serial port name used for device communication.

**State**

Gets current connection state of the device.

#### Methods

**SerialDeviceCommunication})**

**CancellationToken)**

Connect to the device.

*Returns*: A

**CancellationToken)**

Disconnect from the device.

*Returns*: A

**Dispose**

**Boolean)**

**CancellationToken)**

Execute Python code on the device and return the result as a string.

*Returns*: A

**CancellationToken)**

Execute Python code on the device and return the result as typed object.

*Returns*: A

**CancellationToken)**

Retrieve a file from device to local system.

*Returns*: A

**CancellationToken)**

Transfer a file from local system to device.

*Returns*: A

---

### Belay.Core.Communication.SubprocessDeviceCommunication {#belaycorecommunicationsubprocessdevicecommunication}

Subprocess-based device communication using MicroPython unix port for testing.

#### Properties

**State**

Gets current connection state of the device.

#### Methods

**SubprocessDeviceCommunication})**

**Dispose**

**Boolean)**

**CancellationToken)**

Execute Python code on the device and return the result as a string.

*Returns*: A

**CancellationToken)**

Execute Python code on the device and return the result as typed object.

*Returns*: A

**CancellationToken)**

Retrieve a file from device (simulated for subprocess).

*Returns*: A

**CancellationToken)**

Transfer a file from local system to device (simulated for subprocess).

*Returns*: A

**CancellationToken)**

Start the subprocess and establish communication.

*Returns*: A

**CancellationToken)**

Stop the subprocess.

*Returns*: A

---

## Belay.Core.Discovery

### Belay.Core.Discovery.DeviceInfo {#belaycorediscoverydeviceinfo}

Information about a discovered MicroPython device.

#### Properties

**Capabilities**

Gets device capabilities.

**ConnectionString**

Gets connection string for device factory.

**Description**

Gets device description for display purposes.

**IdentificationConfidence**

Gets confidence score for device identification (0.0 to 1.0).

**Implementation**

Gets microPython implementation name (micropython or circuitpython).

**Platform**

Gets platform/board identifier.

**PortName**

Gets serial port name (e.g., COM3, /dev/ttyUSB0).

**SupportsRawPasteMode**

Gets a value indicating whether whether the device supports raw-paste mode.

**Version**

Gets microPython version information.

---

### Belay.Core.Discovery.SerialDeviceDiscovery {#belaycorediscoveryserialdevicediscovery}

#### Methods

**CancellationToken)**

Discover MicroPython devices matching specific criteria.

*Returns*: A

**CancellationToken)**

Discover all MicroPython devices connected to the system.

*Returns*: A

**CancellationToken)**

Find the best MicroPython device automatically.

*Returns*: A

**CancellationToken)**

Find devices running CircuitPython.

*Returns*: A

**CancellationToken)**

Find devices on a specific platform.

*Returns*: A

**CancellationToken)**

Find devices running MicroPython.

*Returns*: A

**MyRegex**

*Remarks*: Pattern:

**CancellationToken)**

Check if a specific port has a MicroPython device.

*Returns*: A

---

### Belay.Core.Discovery.SerialDeviceDiscoveryLogger {#belaycorediscoveryserialdevicediscoverylogger}

Discovery service for MicroPython devices connected via serial/USB.

---

## Belay.Core.Exceptions

### Belay.Core.Exceptions.BelayConfigurationException {#belaycoreexceptionsbelayconfigurationexception}

Exception thrown when Belay.NET configuration is invalid.

#### Properties

**ConfigurationSection**

Gets the configuration section that caused the error.

#### Methods

**String)**

Initializes a new instance of the

*Parameters*:
- `message`: The error message.
- `innerException`: The inner exception.
- `configurationSection`: The configuration section that caused the error.

**String)**

Initializes a new instance of the

*Parameters*:
- `message`: The error message.
- `configurationSection`: The configuration section that caused the error.

**GetDefaultErrorCode**

---

### Belay.Core.Exceptions.BelayException {#belaycoreexceptionsbelayexception}

Base exception class for all Belay.NET exceptions. Provides context preservation and structured error information.

#### Properties

**ComponentName**

Gets or sets the name of the component where the exception occurred.

**Context**

Gets the context dictionary for additional error information.

**ErrorCode**

Gets or sets the specific error code for this exception.

**OccurredAt**

Gets the timestamp when the exception occurred.

#### Methods

**String)**

Initializes a new instance of the

*Parameters*:
- `message`: The error message.
- `innerException`: The inner exception.
- `errorCode`: The error code, or null to use default.
- `componentName`: The component name, or null to use type name.

**String)**

Initializes a new instance of the

*Parameters*:
- `message`: The error message.
- `errorCode`: The error code, or null to use default.
- `componentName`: The component name, or null to use type name.

**GetDefaultErrorCode**

Gets the default error code for this exception type.

*Returns*: The default error code.

**Object})**

Adds multiple context entries to this exception.

*Parameters*:
- `context`: The context dictionary to merge.

*Returns*: This exception instance for method chaining.

**Object)**

Adds context information to this exception.

*Parameters*:
- `key`: The context key.
- `value`: The context value.

*Returns*: This exception instance for method chaining.

---

### Belay.Core.Exceptions.BelayValidationException {#belaycoreexceptionsbelayvalidationexception}

Exception thrown when validation fails.

#### Properties

**ValidationErrors**

Gets the list of validation errors.

**ValidationTarget**

Gets the validation target that failed.

#### Methods

**String})**

Initializes a new instance of the

*Parameters*:
- `message`: The error message.
- `innerException`: The inner exception.
- `validationTarget`: The validation target that failed.
- `errors`: The validation errors.

**String})**

Initializes a new instance of the

*Parameters*:
- `message`: The error message.
- `validationTarget`: The validation target that failed.
- `errors`: The validation errors.

**GetDefaultErrorCode**

---

### Belay.Core.Exceptions.DeviceCodeSyntaxException {#belaycoreexceptionsdevicecodesyntaxexception}

Exception thrown when device code has syntax errors.

#### Methods

**Int32})**

Initializes a new instance of the

*Parameters*:
- `message`: The error message.
- `code`: The Python code with syntax errors.
- `lineNumber`: The line number where the syntax error occurred, if available.

---

### Belay.Core.Exceptions.DeviceCommunicationException {#belaycoreexceptionsdevicecommunicationexception}

Exception thrown when device communication operations fail.

#### Properties

**ConnectionString**

Gets the connection string used.

**DeviceId**

Gets the device identifier.

#### Methods

**String)**

Initializes a new instance of the

*Parameters*:
- `message`: The error message.
- `innerException`: The inner exception.
- `deviceId`: The device identifier, if known.
- `connectionString`: The connection string, if known.

**String)**

Initializes a new instance of the

*Parameters*:
- `message`: The error message.
- `deviceId`: The device identifier, if known.
- `connectionString`: The connection string, if known.

**GetDefaultErrorCode**

---

### Belay.Core.Exceptions.DeviceConnectionException {#belaycoreexceptionsdeviceconnectionexception}

Exception thrown when device connection operations fail.

#### Methods

**Exception)**

Initializes a new instance of the

*Parameters*:
- `message`: The error message.
- `deviceId`: The device identifier, if known.
- `connectionString`: The connection string, if known.
- `innerException`: The inner exception, if any.

---

### Belay.Core.Exceptions.DeviceExecutionException {#belaycoreexceptionsdeviceexecutionexception}

Exception thrown when device code execution fails.

#### Properties

**Code**

Gets the Python code that was executed.

**DeviceStackTrace**

Gets the device stack trace, if available.

**LineNumber**

Gets the line number where the error occurred, if available.

#### Methods

**Int32})**

Initializes a new instance of the

*Parameters*:
- `message`: The error message.
- `innerException`: The inner exception.
- `code`: The Python code that was executed, if known.
- `deviceStackTrace`: The device stack trace, if available.
- `lineNumber`: The line number where the error occurred, if available.

**Int32})**

Initializes a new instance of the

*Parameters*:
- `message`: The error message.
- `code`: The Python code that was executed, if known.
- `deviceStackTrace`: The device stack trace, if available.
- `lineNumber`: The line number where the error occurred, if available.

**GetDefaultErrorCode**

---

### Belay.Core.Exceptions.DeviceMemoryException {#belaycoreexceptionsdevicememoryexception}

Exception thrown when device runs out of memory.

#### Properties

**AvailableMemory**

Gets the available memory on the device, if known.

**RequestedMemory**

Gets the requested memory amount, if known.

#### Methods

**Int64})**

Initializes a new instance of the

*Parameters*:
- `message`: The error message.
- `availableMemory`: The available memory on the device, if known.
- `requestedMemory`: The requested memory amount, if known.

---

### Belay.Core.Exceptions.DeviceResourceException {#belaycoreexceptionsdeviceresourceexception}

Exception thrown when device resource operations fail.

#### Properties

**ResourceId**

Gets the resource identifier.

**ResourceType**

Gets the resource type.

#### Methods

**String)**

Initializes a new instance of the

*Parameters*:
- `message`: The error message.
- `innerException`: The inner exception.
- `resourceId`: The resource identifier.
- `resourceType`: The resource type.

**String)**

Initializes a new instance of the

*Parameters*:
- `message`: The error message.
- `resourceId`: The resource identifier.
- `resourceType`: The resource type.

**GetDefaultErrorCode**

---

### Belay.Core.Exceptions.DeviceSessionException {#belaycoreexceptionsdevicesessionexception}

Exception thrown when device session operations fail.

#### Properties

**SessionId**

Gets the session identifier.

**SessionState**

Gets the session state when the exception occurred.

#### Methods

**DeviceSessionState)**

Initializes a new instance of the

*Parameters*:
- `message`: The error message.
- `innerException`: The inner exception.
- `sessionId`: The session identifier.
- `sessionState`: The session state when the exception occurred.

**DeviceSessionState)**

Initializes a new instance of the

*Parameters*:
- `message`: The error message.
- `sessionId`: The session identifier.
- `sessionState`: The session state when the exception occurred.

**GetDefaultErrorCode**

---

### Belay.Core.Exceptions.DeviceTimeoutException {#belaycoreexceptionsdevicetimeoutexception}

Exception thrown when device operations timeout.

#### Properties

**Operation**

Gets the operation that timed out.

**Timeout**

Gets the timeout duration.

#### Methods

**String)**

Initializes a new instance of the

*Parameters*:
- `operation`: The operation that timed out.
- `timeout`: The timeout duration.
- `deviceId`: The device identifier, if known.

---

### Belay.Core.Exceptions.ErrorMapper {#belaycoreexceptionserrormapper}

Implementation of error mapping for device and system errors.

#### Methods

**ErrorMapper})**

Initializes a new instance of the

*Parameters*:
- `logger`: The logger instance.

**Object})**

**String)**

**String)**

---

### Belay.Core.Exceptions.ExceptionEnricher {#belaycoreexceptionsexceptionenricher}

Implementation of exception enrichment services.

#### Methods

**ExceptionEnricher})**

Initializes a new instance of the

*Parameters*:
- `logger`: The logger instance.

**String)**

**Object})**

---

### Belay.Core.Exceptions.ExceptionHandlingConfiguration {#belaycoreexceptionsexceptionhandlingconfiguration}

Configuration for exception handling behavior.

#### Properties

**ExceptionLogLevel**

Gets or sets the log level for exceptions. Default is Error.

**IncludeStackTraces**

Gets or sets a value indicating whether stack traces should be included in logs. Default is true.

**LogExceptions**

Gets or sets a value indicating whether exceptions should be logged. Default is true.

**MaxContextEntries**

Gets or sets the maximum number of context entries to preserve. Default is 50.

**PreserveContext**

Gets or sets a value indicating whether context should be preserved in exceptions. Default is true.

**RethrowExceptions**

Gets or sets a value indicating whether exceptions should be re-thrown. Default is true.

---

### Belay.Core.Exceptions.GlobalExceptionHandler {#belaycoreexceptionsglobalexceptionhandler}

Global exception handler for consistent error handling throughout the application.

#### Methods

**GlobalExceptionHandler})**

Initializes a new instance of the

*Parameters*:
- `errorMapper`: The error mapper.
- `enricher`: The exception enricher.
- `logger`: The logger.

**ExceptionHandlingConfiguration})**

**String)**

**String)**

---

### Belay.Core.Exceptions.IErrorMapper {#belaycoreexceptionsierrormapper}

Interface for mapping exceptions and device errors to structured Belay exceptions.

#### Methods

**Object})**

Enriches an existing Belay exception with additional context.

*Parameters*:
- `exception`: The exception to enrich.
- `context`: The context to add.

*Returns*: The enriched exception.

**String)**

Maps device error output to a Belay exception.

*Parameters*:
- `deviceOutput`: The device error output.
- `executedCode`: The code that was executed, if known.

*Returns*: The mapped Belay exception.

**String)**

Maps a general exception to a Belay exception.

*Parameters*:
- `exception`: The exception to map.
- `context`: Additional context information.

*Returns*: The mapped Belay exception.

---

### Belay.Core.Exceptions.IExceptionEnricher {#belaycoreexceptionsiexceptionenricher}

Interface for enriching exceptions with additional context.

#### Methods

**String)**

Enriches an exception with device context information.

*Parameters*:
- `exception`: The exception to enrich.
- `deviceType`: The device type.
- `firmwareVersion`: The firmware version.
- `sessionId`: The session identifier, if known.

*Returns*: The enriched exception.

**Object})**

Enriches an exception with component and context information.

*Parameters*:
- `exception`: The exception to enrich.
- `component`: The component name.
- `additionalContext`: Additional context information.

*Returns*: The enriched exception.

---

### Belay.Core.Exceptions.IGlobalExceptionHandler {#belaycoreexceptionsiglobalexceptionhandler}

Interface for global exception handling across the application.

#### Methods

**ExceptionHandlingConfiguration})**

Configures the exception handling behavior.

*Parameters*:
- `configure`: The configuration action.

**String)**

Executes an operation with error handling.

*Parameters*:
- `operation`: The operation to execute.
- `context`: The context information.

*Returns*: A task representing the operation.

**String)**

Executes an operation with error handling and returns a result.

*Parameters*:
- `operation`: The operation to execute.
- `context`: The context information.

*Returns*: The result of the operation.

---

## Belay.Core.Execution

### Belay.Core.Execution.BaseExecutor {#belaycoreexecutionbaseexecutor}

Base class for all method executors that provides common functionality for applying policies around Device.ExecuteAsync calls.

#### Properties

**CurrentSession**

Gets the current device session if available.

**Device**

Gets the device instance to execute Python code on.

**ErrorMapper**

Gets the error mapper for mapping exceptions.

**ExecutionContextService**

Gets the execution context service for secure method context access.

**Logger**

Gets logger for diagnostic information.

**SessionManager**

Gets the session manager for coordinating device sessions.

#### Methods

**IExecutionContextService)**

Initializes a new instance of the

*Parameters*:
- `device`: The device to execute Python code on.
- `sessionManager`: The session manager for device coordination.
- `logger`: The logger for diagnostic information.
- `errorMapper`: Optional error mapper for exception handling.
- `executionContextService`: Optional execution context service (creates default if null).

**String)**

Applies executor-specific policies around Python code execution without returning a value.

*Parameters*:
- `pythonCode`: The Python code to execute on the device.
- `cancellationToken`: Cancellation token to cancel the operation.
- `callingMethod`: The method that initiated this execution (optional).

**String)**

Applies executor-specific policies around Python code execution.

*Parameters*:
- `pythonCode`: The Python code to execute on the device.
- `cancellationToken`: Cancellation token to cancel the operation.
- `callingMethod`: The method that initiated this execution (optional).

*Returns*: The result of the Python code execution with policies applied.

**MethodInfo)**

Validates that a method can be handled by this executor.

*Parameters*:
- `method`: The method to validate.

*Returns*: True if the method can be handled, false otherwise.

**CancellationTokenSource@)**

Combines a cancellation token with an optional timeout cancellation token source.

*Parameters*:
- `cancellationToken`: The original cancellation token.
- `timeoutCts`: Optional timeout cancellation token source.
- `linkedCts`: Output parameter for the linked token source that needs disposal.

*Returns*: A combined cancellation token.

**Byte[])**

Converts a byte array to Python bytes literal.

**Object)**

Converts complex objects to Python representation. Uses JSON serialization as fallback for complex types.

**IDictionary)**

Converts a dictionary to Python dict literal.

**Enum)**

Converts an enum to Python representation.

**IList)**

Converts a list/array to Python list literal.

**Object)**

Converts a result object to the expected type.

*Parameters*:
- `result`: The result to convert.

*Returns*: The converted result.

**String)**

Converts a string to Python string literal with proper escaping.

**Object)**

Converts a .NET value to its Python string representation. Handles complex types including arrays, dictionaries, and custom objects.

*Parameters*:
- `value`: The value to convert.

*Returns*: Python representation of the value.

**Object})**

Converts a .NET value to its Python string representation with circular reference protection.

*Parameters*:
- `value`: The value to convert.
- `visitedObjects`: Set of objects already being converted to detect circular references.

*Returns*: Python representation of the value.

**Int32})**

Creates a timeout cancellation token source if a timeout is specified.

*Parameters*:
- `timeoutMs`: The timeout in milliseconds, or null for no timeout.

*Returns*: A cancellation token source, or null if no timeout specified.

**CancellationToken)**

Executes a method without returning a value.

*Parameters*:
- `method`: The method to execute.
- `instance`: The instance to invoke the method on (null for static methods).
- `parameters`: The parameters to pass to the method.
- `cancellationToken`: Cancellation token to cancel the execution.

*Returns*: A task representing the asynchronous operation.

**CancellationToken)**

Executes a method with attribute-specific policies applied.

*Parameters*:
- `method`: The method to execute.
- `instance`: The instance to invoke the method on (null for static methods).
- `parameters`: The parameters to pass to the method.
- `cancellationToken`: Cancellation token to cancel the execution.

*Returns*: The result of the method execution.

**CancellationToken)**

Executes an operation within a session context without returning a value.

*Parameters*:
- `operation`: The operation to execute within the session.
- `cancellationToken`: Cancellation token to cancel the operation.

**CancellationToken)**

Executes an operation within a session context, providing access to session state and resources.

*Parameters*:
- `operation`: The operation to execute within the session.
- `cancellationToken`: Cancellation token to cancel the operation.

*Returns*: The result of the operation.

**CancellationToken)**

Executes Python code directly on the device without returning a value.

*Parameters*:
- `pythonCode`: The Python code to execute.
- `cancellationToken`: Cancellation token to cancel the operation.

**CancellationToken)**

Executes Python code directly on the device without additional policies. This is used as the final execution step after policies have been applied.

*Parameters*:
- `pythonCode`: The Python code to execute.
- `cancellationToken`: Cancellation token to cancel the operation.

*Returns*: The result of the Python code execution.

**CancellationToken)**

Executes Python code with session-based optimizations.

*Parameters*:
- `session`: The current device session.
- `pythonCode`: The Python code to execute.
- `cancellationToken`: Cancellation token to cancel the operation.

*Returns*: The result of the Python code execution.

**Object[])**

Generates a cache key for the given Python code and parameters.

*Parameters*:
- `pythonCode`: The Python code.
- `parameters`: Optional parameters that affect the cache key.

*Returns*: A cache key string.

**Object[])**

Generates a device method call assuming the method is already deployed. This supports the pattern where methods represent deployed Python functions. NOTE: This strategy is disabled until method deployment infrastructure is implemented.

*Parameters*:
- `method`: The method to generate a call for.
- `parameters`: Method parameters.

*Returns*: Python code string or null if method deployment not supported.

**Object[])**

Generates a Python parameter list from the method parameters.

*Parameters*:
- `parameters`: The parameters to convert.

*Returns*: A string representing the Python parameter list.

**Object[])**

Generates Python code to invoke the specified method with parameters. This method handles three patterns: 1. Methods that return Python code strings (most common) 2. Methods with PythonCodeAttribute containing embedded code 3. Simple expression methods that can be transpiled.

*Parameters*:
- `method`: The method to generate code for.
- `instance`: The instance to invoke on.
- `parameters`: The method parameters.

*Returns*: Python code that represents the method execution.

**Int32)**

Gets the calling method information from the execution context. SECURITY NOTE: This is a secure replacement for stack frame reflection.

*Parameters*:
- `skipFrames`: Deprecated parameter - kept for compatibility but ignored.

*Returns*: The calling method information, or null if not available.

**GetCurrentMethodContext**

Gets the current method execution context (secure replacement for stack frame inspection).

*Returns*: The current method execution context, or null if not available.

**Object[])**

Attempts to get embedded Python code from method attributes.

*Parameters*:
- `method`: The method to check.
- `parameters`: Method parameters for code templating.

*Returns*: Python code string or null if not found.

**MethodInfo)**

Checks if a method appears to be deployable to the device. This is a heuristic for determining if a method represents device-side code.

*Parameters*:
- `method`: The method to check.

*Returns*: True if the method might be deployable.

**Type)**

Checks if a type is simple enough to be marshaled to Python.

*Parameters*:
- `type`: The type to check.

*Returns*: True if the type can be marshaled.

**CancellationToken)**

Registers a session resource for automatic cleanup.

*Parameters*:
- `resource`: The resource to register.
- `cancellationToken`: Cancellation token to cancel the operation.

*Returns*: A task representing the asynchronous operation.

**Object[])**

Attempts to invoke the method to get Python code string. This supports the pattern where C# methods return Python code to execute.

*Parameters*:
- `method`: The method to invoke.
- `instance`: The instance to invoke on.
- `parameters`: Method parameters.

*Returns*: Python code string or null if method doesn't return string.

---

### Belay.Core.Execution.DeployedMethod {#belaycoreexecutiondeployedmethod}

Represents a method that has been deployed to a device.

#### Properties

**DeviceMethodName**

Gets the name of the method on the device.

**SignatureHash**

Gets a hash representing the method's signature.

---

### Belay.Core.Execution.DeploymentPipelineStage {#belaycoreexecutiondeploymentpipelinestage}

Deployment pipeline stage that handles method deployment to the device.

#### Methods

**IMethodDeploymentCache)**

Initializes a new instance of the

*Parameters*:
- `deploymentCache`: The deployment cache for tracking deployed methods.

**ExecutionContext{``0})**

Processes method deployment logic.

*Parameters*:
- `context`: The execution context to process.

*Returns*: The processed execution context.

---

### Belay.Core.Execution.DeviceEnhancedExtensions {#belaycoreexecutiondeviceenhancedextensions}

Extensions to the Device class for enhanced executor support.

#### Methods

**Type)**

Checks if a type can be proxied for this device.

*Parameters*:
- `device`: The device to check proxy compatibility for.
- `type`: The type to validate for proxying.

*Returns*: True if the type can be proxied, false otherwise.

**Device)**

Clears the enhanced execution cache for this device.

*Parameters*:
- `device`: The device to clear the cache for.

**ClearEnhancedExecutorCache**

Clears all cached enhanced executors and proxies for performance or testing purposes. Note: With ConditionalWeakTable, this method has limited effect as entries are automatically cleaned up when devices are garbage collected.

**ILogger)**

Creates a device proxy with a custom enhanced executor.

*Parameters*:
- `device`: The device to create the proxy for.
- `executor`: The enhanced executor to use for method execution.
- `logger`: Optional logger for proxy operations.

*Returns*: A proxy instance that routes method calls through the executor.

**ILogger)**

Creates a device proxy that automatically routes method calls through the enhanced executor. This enables seamless attribute-based programming where C# methods are executed on MicroPython devices.

*Parameters*:
- `device`: The device to create the proxy for.
- `logger`: Optional logger for proxy operations.

*Returns*: A proxy instance that routes method calls to the device.

**Device)**

Gets enhanced execution statistics for this device.

*Parameters*:
- `device`: The device to get statistics for.

*Returns*: Enhanced execution statistics, or null if no enhanced executor exists.

**ILogger)**

Gets or creates an enhanced executor for this device. The enhanced executor provides advanced method interception and pipeline processing.

*Parameters*:
- `device`: The device to get the enhanced executor for.
- `logger`: Optional logger for the enhanced executor.

*Returns*: An enhanced executor instance for this device.

---

### Belay.Core.Execution.DeviceProxyFactory {#belaycoreexecutiondeviceproxyfactory}

Factory for creating device proxies with proper configuration.

#### Methods

**Type)**

Validates that a type can be proxied.

*Parameters*:
- `type`: The type to validate.

*Returns*: True if the type can be proxied, false otherwise.

**ILogger)**

Creates a device proxy with a custom enhanced executor.

*Parameters*:
- `executor`: The enhanced executor to use for method execution.
- `logger`: Optional logger for diagnostic information.

*Returns*: A proxy instance that routes method calls through the executor.

**ILogger)**

Creates a device proxy for the specified interface type.

*Parameters*:
- `device`: The device to execute methods on.
- `logger`: Optional logger for diagnostic information.

*Returns*: A proxy instance that routes method calls to the device.

---

### Belay.Core.Execution.DeviceProxy`1 {#belaycoreexecutiondeviceproxy1}

Dynamic proxy that intercepts method calls and routes them through the enhanced executor. This enables seamless attribute-based programming where C# methods are automatically executed on MicroPython devices with proper attribute handling.

#### Methods

**ILogger)**

Creates a device proxy instance that intercepts method calls.

*Parameters*:
- `executor`: The enhanced executor to handle method calls.
- `logger`: Logger for diagnostic information.

*Returns*: A proxy instance of type T.

**Object[])**

Intercepts method calls and routes them through the enhanced executor.

*Parameters*:
- `targetMethod`: The method being called.
- `args`: The method arguments.

*Returns*: The result of the method execution.

---

### Belay.Core.Execution.EnhancedDevice {#belaycoreexecutionenhanceddevice}

Enhanced device wrapper that provides access to advanced execution capabilities. This wrapper can be used when you need the enhanced features as first-class citizens.

#### Properties

**EnhancedExecutor**

**State**

Gets the current connection state of the device.

**UnderlyingDevice**

Gets the underlying device.

#### Methods

**ILogger)**

Initializes a new instance of the

*Parameters*:
- `device`: The underlying device to wrap.
- `logger`: Optional logger for enhanced operations.

**CancellationToken)**

Connects to the MicroPython device.

*Parameters*:
- `cancellationToken`: Cancellation token.

*Returns*: A task representing the asynchronous operation.

**CreateProxy``1**

**CancellationToken)**

Disconnects from the MicroPython device.

*Parameters*:
- `cancellationToken`: Cancellation token.

*Returns*: A task representing the asynchronous operation.

**Dispose**

**GetExecutionStatistics**

---

### Belay.Core.Execution.EnhancedExecutionStatistics {#belaycoreexecutionenhancedexecutionstatistics}

Statistics for enhanced execution.

#### Properties

**DeploymentCacheStatistics**

Gets or sets the deployment cache statistics.

**InterceptedMethodCount**

Gets or sets the number of methods that have been intercepted.

**PipelineStageCount**

Gets or sets the number of pipeline stages.

**SpecializedExecutorCount**

Gets or sets the number of registered specialized executors.

---

### Belay.Core.Execution.EnhancedExecutor {#belaycoreexecutionenhancedexecutor}

Enhanced executor that provides advanced method interception, pipeline processing, and enhanced attribute-based execution with pre/post-processing hooks.

#### Methods

**IExecutor})**

Initializes a new instance of the

*Parameters*:
- `device`: The device to execute Python code on.
- `sessionManager`: The session manager for device coordination.
- `logger`: The logger for diagnostic information.
- `errorMapper`: Optional error mapper for exception handling.
- `cache`: Optional method deployment cache for performance optimization.
- `executionContextService`: Optional execution context service.
- `transactionManager`: Optional transaction manager for ensuring consistency.
- `specializedExecutors`: Optional dictionary of specialized executors for specific attribute types.

**String)**

Applies enhanced policies and executes Python code through the interception pipeline.

*Parameters*:
- `pythonCode`: The Python code to execute on the device.
- `cancellationToken`: Cancellation token to cancel the operation.
- `callingMethod`: The method that initiated this execution.

*Returns*: The result of the Python code execution with enhanced policies applied.

**MethodInfo)**

Checks if this executor can handle the given method with enhanced capabilities.

*Parameters*:
- `method`: The method to validate.

*Returns*: True if the method can be handled by enhanced execution.

**ClearExecutionCache**

Clears all execution caches and resets pipeline state.

**Dispose**

**CancellationToken)**

Enhanced method execution with full interception pipeline.

*Parameters*:
- `method`: The method to execute.
- `instance`: The instance to invoke the method on (null for static methods).
- `parameters`: The parameters to pass to the method.
- `cancellationToken`: Cancellation token to cancel the execution.

*Returns*: The result of the method execution.

**GetExecutionStatistics**

Gets execution statistics from the enhanced executor.

*Returns*: Comprehensive execution statistics.

**IExecutor)**

Registers a specialized executor for specific attribute types.

*Parameters*:
- `attributeType`: The attribute type to handle.
- `executor`: The specialized executor for this attribute type.

---

### Belay.Core.Execution.ExecutionContextScope {#belaycoreexecutionexecutioncontextscope}

Disposable scope for execution context management.

---

### Belay.Core.Execution.ExecutionContextService {#belaycoreexecutionexecutioncontextservice}

Thread-safe implementation of execution context service using AsyncLocal.

#### Properties

**Current**

#### Methods

**ClearContext**

**IMethodExecutionContext)**

Internal method to restore previous context.

*Parameters*:
- `previousContext`: The previous context to restore.

**IMethodExecutionContext)**

---

### Belay.Core.Execution.ExecutionContext`1 {#belaycoreexecutionexecutioncontext1}

Execution context for enhanced method execution.

#### Properties

**CancellationToken**

Gets or sets the cancellation token for the execution.

**ContextData**

Gets or sets additional context data for pipeline stages.

**Device**

Gets or sets the device for execution.

**Instance**

Gets or sets the instance to invoke the method on (null for static methods).

**InterceptionContext**

Gets or sets the interception context for pipeline processing.

**IsCompleted**

Gets or sets whether the execution is completed.

**Logger**

Gets or sets the logger for diagnostic information.

**Method**

Gets or sets the method being executed.

**Parameters**

Gets or sets the parameters to pass to the method.

**Result**

Gets or sets the result of the execution.

**SessionManager**

Gets or sets the session manager for device coordination.

---

### Belay.Core.Execution.ExecutionPipeline {#belaycoreexecutionexecutionpipeline}

Manages the execution pipeline and provides pipeline utilities.

#### Properties

**StageCount**

Gets the number of stages in the pipeline.

#### Methods

**ILogger)**

Initializes a new instance of the

*Parameters*:
- `logger`: The logger for pipeline operations.

**ClearState**

Clears any pipeline state.

**Dispose**

---

### Belay.Core.Execution.ExecutionPipelineStage {#belaycoreexecutionexecutionpipelinestage}

Execution pipeline stage that performs the actual method execution.

#### Methods

**ExecutionContext{``0})**

Performs the actual method execution.

*Parameters*:
- `context`: The execution context to execute.

*Returns*: The executed context with result.

---

### Belay.Core.Execution.IEnhancedDevice {#belaycoreexecutionienhanceddevice}

Enhanced device interface that provides access to advanced execution capabilities. Use this interface when you need the enhanced executor features directly.

#### Properties

**EnhancedExecutor**

Gets the enhanced executor for this device.

#### Methods

**CreateProxy``1**

Creates a proxy for the specified interface type.

*Returns*: A proxy instance that routes method calls to the device.

**GetExecutionStatistics**

Gets enhanced execution statistics.

*Returns*: Enhanced execution statistics.

---

### Belay.Core.Execution.IEnhancedExecutor {#belaycoreexecutionienhancedexecutor}

Interface for enhanced executors that can be used with device proxies.

#### Methods

**ClearExecutionCache**

Clears all execution caches and resets state.

**GetExecutionStatistics**

Gets execution statistics from the enhanced executor.

*Returns*: Enhanced execution statistics.

---

### Belay.Core.Execution.IExecutionContextService {#belaycoreexecutioniexecutioncontextservice}

Service for managing method execution context without stack trace inspection. This provides a secure alternative to stack frame reflection.

#### Properties

**Current**

Gets the current method execution context.

#### Methods

**ClearContext**

Clears the current execution context.

**IMethodExecutionContext)**

Sets the current execution context for the current async context.

*Parameters*:
- `context`: The execution context to set.

*Returns*: A disposable that restores the previous context when disposed.

---

### Belay.Core.Execution.IExecutor {#belaycoreexecutioniexecutor}

Interface for method executors that handle attribute-based method execution. Executors intercept method calls and apply attribute-specific policies.

#### Methods

**MethodInfo)**

Validates that a method can be handled by this executor.

*Parameters*:
- `method`: The method to validate.

*Returns*: True if the method can be handled, false otherwise.

**CancellationToken)**

Executes a method without returning a value.

*Parameters*:
- `method`: The method to execute.
- `instance`: The instance to invoke the method on (null for static methods).
- `parameters`: The parameters to pass to the method.
- `cancellationToken`: Cancellation token to cancel the execution.

**CancellationToken)**

Executes a method with attribute-specific policies applied.

*Parameters*:
- `method`: The method to execute.
- `instance`: The instance to invoke the method on (null for static methods).
- `parameters`: The parameters to pass to the method.
- `cancellationToken`: Cancellation token to cancel the execution.

*Returns*: The result of the method execution.

---

### Belay.Core.Execution.IMethodExecutionContext {#belaycoreexecutionimethodexecutioncontext}

Provides method execution context without relying on stack trace inspection. This replaces the security-vulnerable stack frame reflection pattern.

#### Properties

**Instance**

Gets the instance the method is being called on (null for static methods).

**Method**

Gets the method being executed.

**MethodName**

Gets the method name being executed.

**Parameters**

Gets the parameters passed to the method.

**SetupAttribute**

Gets the Setup attribute if present.

**TaskAttribute**

Gets the Task attribute if present.

**TeardownAttribute**

Gets the Teardown attribute if present.

**ThreadAttribute**

Gets the Thread attribute if present.

---

### Belay.Core.Execution.IPipelineStage {#belaycoreexecutionipipelinestage}

Interface for execution pipeline stages.

#### Methods

**ExecutionContext{``0})**

Processes an execution context through this pipeline stage.

*Parameters*:
- `context`: The execution context to process.

*Returns*: The processed execution context.

---

### Belay.Core.Execution.MethodExecutionContext {#belaycoreexecutionmethodexecutioncontext}

Implementation of method execution context.

#### Properties

**Instance**

**Method**

**MethodName**

**Parameters**

**SetupAttribute**

**TaskAttribute**

**TeardownAttribute**

**ThreadAttribute**

#### Methods

**String)**

Initializes a new instance of the

*Parameters*:
- `method`: The method being executed.
- `instance`: The instance the method is called on.
- `parameters`: The parameters passed to the method.
- `methodName`: Override for the method name if needed.

**Object[])**

Creates a context for a method call without reflection data.

*Parameters*:
- `methodName`: The name of the method being called.
- `parameters`: The parameters passed to the method.

*Returns*: A method execution context.

**Object[])**

Creates a context with explicit attribute information.

*Parameters*:
- `methodName`: The name of the method.
- `taskAttribute`: Task attribute if present.
- `parameters`: Method parameters.

*Returns*: A method execution context.

---

### Belay.Core.Execution.MethodInfoExtensions {#belaycoreexecutionmethodinfoextensions}

Extension methods for MethodInfo to support the executor framework.

#### Methods

**MethodInfo)**

Gets a specific attribute from a method.

*Parameters*:
- `method`: The method to get the attribute from.

*Returns*: The attribute instance, or null if not found.

**MethodInfo)**

Gets the device method name for a method, using custom name if specified in attributes.

*Parameters*:
- `method`: The method to get the device name for.

*Returns*: The name to use on the device.

**MethodInfo)**

Generates a simple hash of the method signature for caching.

*Parameters*:
- `method`: The method to hash.

*Returns*: A hash string representing the method signature.

**MethodInfo)**

Checks if a method has a specific attribute.

*Parameters*:
- `method`: The method to check.

*Returns*: True if the method has the attribute, false otherwise.

**String)**

Converts a C# method name to Python snake_case convention.

*Parameters*:
- `name`: The method name to convert.

*Returns*: The name in snake_case format.

---

### Belay.Core.Execution.MethodInterceptionContext {#belaycoreexecutionmethodinterceptioncontext}

Method interception context for caching pipeline configuration.

#### Properties

**InstanceType**

Gets or sets the instance type (null for static methods).

**Metadata**

Gets or sets cached metadata for the method.

**Method**

Gets or sets the method being intercepted.

**Pipeline**

Gets or sets the execution pipeline stages.

---

### Belay.Core.Execution.RunningThread {#belaycoreexecutionrunningthread}

Represents information about a running background thread on the device.

#### Properties

**AutoRestart**

Gets a value indicating whether the thread should auto-restart on failure.

**IsRunning**

Gets a value indicating whether the thread is currently running.

**MaxRuntimeMs**

Gets the maximum runtime for the thread in milliseconds.

**MethodName**

Gets the name of the thread method.

**Priority**

Gets the priority level for the thread.

**StartedAt**

Gets the timestamp when the thread was started.

**ThreadId**

Gets the unique identifier for this thread on the device.

---

### Belay.Core.Execution.SetupExecutor {#belaycoreexecutionsetupexecutor}

Executor for methods decorated with the [Setup] attribute. Applies setup-specific policies such as one-time execution and ordered initialization.

#### Methods

**IExecutionContextService)**

Initializes a new instance of the

*Parameters*:
- `device`: The device to execute code on.
- `sessionManager`: The session manager for device coordination.
- `logger`: The logger for diagnostic information.
- `executionContextService`: Optional execution context service for secure method detection.

**String)**

Applies setup policies and executes the Python code. Setup methods are executed only once per device session with proper ordering.

*Parameters*:
- `pythonCode`: The Python code to execute.
- `cancellationToken`: Cancellation token to cancel the execution.
- `callingMethod`: The name of the calling method for identification.

*Returns*: The result of the Python code execution.

**MethodInfo)**

Validates that a method can be handled by this executor.

*Parameters*:
- `method`: The method to validate.

*Returns*: True if the method has a [Setup] attribute, false otherwise.

**Dispose**

Disposes of the executor resources.

**CancellationToken)**

Executes setup code with setup-specific policies applied.

**GetExecutedSetupMethods**

Gets the list of setup methods that have been executed.

*Returns*: A collection of executed setup method names.

**ResetSetupState**

Resets the setup execution state, allowing setup methods to run again. This is typically called when reconnecting to a device.

---

### Belay.Core.Execution.TaskAttributePipelineStage {#belaycoreexecutiontaskattributepipelinestage}

Task attribute pipeline stage that handles Task attribute-specific processing.

#### Methods

**ITransactionManager)**

Initializes a new instance of the

*Parameters*:
- `transactionManager`: The transaction manager for consistency.

**ExecutionContext{``0})**

Processes Task attribute-specific logic.

*Parameters*:
- `context`: The execution context to process.

*Returns*: The processed execution context.

---

### Belay.Core.Execution.TaskExecutor {#belaycoreexecutiontaskexecutor}

Executor that applies [Task] attribute policies around Python code execution. Handles timeout, caching, and exclusive execution policies.

#### Methods

**ITransactionManager)**

Initializes a new instance of the

*Parameters*:
- `device`: The device to execute Python code on.
- `sessionManager`: The session manager for device coordination.
- `logger`: The logger for diagnostic information.
- `errorMapper`: Optional error mapper for exception handling.
- `cache`: Optional method deployment cache for performance optimization.
- `executionContextService`: Optional execution context service.
- `transactionManager`: Optional transaction manager for ensuring consistency.

**String)**

Applies [Task] attribute policies around Python code execution.

*Parameters*:
- `pythonCode`: The Python code to execute on the device.
- `cancellationToken`: Cancellation token to cancel the operation.
- `callingMethod`: The method that initiated this execution.

*Returns*: The result of the Python code execution with policies applied.

**MethodInfo)**

Validates that a method can be handled by this executor.

*Parameters*:
- `method`: The method to validate.

*Returns*: True if the method has a [Task] attribute, false otherwise.

**ClearCache**

Clears the result cache.

**Dispose**

**String)**

Executes Python code with exclusive access, preventing all other methods (both exclusive and non-exclusive) from running concurrently. Uses writer lock to ensure complete isolation.

**String)**

Executes Python code with non-exclusive access, allowing concurrent execution with other non-exclusive methods. Uses reader lock to allow concurrency while preventing exclusive methods from interfering.

**String)**

Generates a cache key for the given Python code and method name.

*Parameters*:
- `pythonCode`: The Python code to execute.
- `methodName`: The method name that initiated this execution.

*Returns*: A cache key for the method execution.

**GetCacheStatistics**

Gets statistics about the cache.

*Returns*: Cache statistics.

**GetExclusiveExecutionStats**

Gets statistics about the exclusive execution usage.

*Returns*: Statistics about current lock state and usage.

**GetExecutedMethodsAsync**

Gets the methods that have been executed.

*Returns*: A collection of executed method names.

---

### Belay.Core.Execution.TaskMethodExecutionContext {#belaycoreexecutiontaskmethodexecutioncontext}

Specialized context for Task attribute methods.

---

### Belay.Core.Execution.TeardownExecutor {#belaycoreexecutionteardownexecutor}

Executor for methods decorated with the [Teardown] attribute. Applies teardown-specific policies such as ordered cleanup and error handling.

#### Methods

**IExecutionContextService)**

Initializes a new instance of the

*Parameters*:
- `device`: The device to execute code on.
- `sessionManager`: The session manager for device coordination.
- `logger`: The logger for diagnostic information.
- `executionContextService`: Optional execution context service for secure method detection.

**String)**

Applies teardown policies and executes the Python code. Teardown methods are executed during disconnection with proper error handling and ordering.

*Parameters*:
- `pythonCode`: The Python code to execute.
- `cancellationToken`: Cancellation token to cancel the execution.
- `callingMethod`: The name of the calling method for identification.

*Returns*: The result of the Python code execution.

**MethodInfo)**

Validates that a method can be handled by this executor.

*Parameters*:
- `method`: The method to validate.

*Returns*: True if the method has a [Teardown] attribute, false otherwise.

**Dispose**

Disposes of the executor resources.

**CancellationToken)**

Executes all teardown methods with proper error handling and ordering. This is typically called during device disconnection.

*Parameters*:
- `cancellationToken`: Cancellation token to cancel the operation.

**CancellationToken)**

Executes teardown code with teardown-specific policies applied.

**GetExecutedTeardownMethods**

Gets the list of teardown methods that have been executed.

*Returns*: A collection of executed teardown method names.

**Int32)**

Indents code by the specified number of spaces.

**ResetTeardownState**

Resets the teardown execution state, allowing teardown methods to run again. This is typically called when reconnecting to a device.

**TeardownAttribute)**

Wraps teardown code with additional error handling and cleanup logic.

---

### Belay.Core.Execution.ThreadAttributePipelineStage {#belaycoreexecutionthreadattributepipelinestage}

Thread attribute pipeline stage that handles Thread attribute-specific processing.

#### Methods

**ExecutionContext{``0})**

Processes Thread attribute-specific logic.

*Parameters*:
- `context`: The execution context to process.

*Returns*: The processed execution context.

---

### Belay.Core.Execution.ThreadExecutor {#belaycoreexecutionthreadexecutor}

Executor for methods decorated with the [Thread] attribute. Applies thread-specific policies such as background execution and lifecycle management.

#### Methods

**IExecutionContextService)**

Initializes a new instance of the

*Parameters*:
- `device`: The device to execute code on.
- `sessionManager`: The session manager for device coordination.
- `logger`: The logger for diagnostic information.
- `executionContextService`: Optional execution context service for secure method detection.

**String)**

Applies thread policies and executes the Python code in a background thread. Thread methods run asynchronously on the device without blocking the host.

*Parameters*:
- `pythonCode`: The Python code to execute.
- `cancellationToken`: Cancellation token to cancel the execution.
- `callingMethod`: The name of the calling method for identification.

*Returns*: The result of starting the thread (typically void or thread info).

**MethodInfo)**

Validates that a method can be handled by this executor.

*Parameters*:
- `method`: The method to validate.

*Returns*: True if the method has a [Thread] attribute, false otherwise.

**CancellationToken)**

Checks the health of all running threads and updates their status.

*Parameters*:
- `cancellationToken`: Cancellation token to cancel the operation.

*Returns*: A task representing the asynchronous operation.

**ClearCacheAsync**

Clears the cache of deployed methods.

*Returns*: A task representing the asynchronous operation.

**Dispose**

Disposes of the executor resources.

**String)**

Generates Python code that wraps the user's thread code with lifecycle management.

**GetDeployedMethodsAsync**

Gets all deployed methods in the thread executor.

*Returns*: A collection of deployed methods.

**GetRunningThreads**

Gets information about all currently running threads.

*Returns*: A collection of running thread information.

**Int32)**

Indents code by the specified number of spaces.

**CancellationToken)**

Starts a thread with thread-specific policies applied.

**CancellationToken)**

Stops all running threads.

*Parameters*:
- `cancellationToken`: Cancellation token to cancel the operation.

*Returns*: A task representing the asynchronous operation.

**CancellationToken)**

Stops a specific thread by name.

*Parameters*:
- `threadName`: The name of the thread to stop.
- `cancellationToken`: Cancellation token to cancel the operation.

*Returns*: True if the thread was stopped, false if it wasn't running.

---

### Belay.Core.Execution.ValidationPipelineStage {#belaycoreexecutionvalidationpipelinestage}

Validation pipeline stage that validates method parameters and context.

#### Methods

**ExecutionContext{``0})**

Validates the execution context and parameters.

*Parameters*:
- `context`: The execution context to validate.

*Returns*: The validated execution context.

---

## Belay.Core.Extensions

### Belay.Core.Extensions.ExceptionHandlingConfigurator {#belaycoreextensionsexceptionhandlingconfigurator}

Exception handling configurator implementation.

#### Methods

**ExceptionHandlingConfiguration})**

Initializes a new instance of the

*Parameters*:
- `handler`: The global exception handler.
- `configure`: The configuration action.

**Configure**

---

### Belay.Core.Extensions.ExceptionHandlingServiceExtensions {#belaycoreextensionsexceptionhandlingserviceextensions}

Extension methods for registering exception handling services.

#### Methods

**ExceptionHandlingConfiguration)**

Adds Belay exception handling services with specific configuration.

*Parameters*:
- `services`: The service collection.
- `configuration`: The exception handling configuration.

*Returns*: The service collection for chaining.

**ExceptionHandlingConfiguration})**

Adds Belay exception handling services to the service collection.

*Parameters*:
- `services`: The service collection.
- `configure`: Optional configuration action.

*Returns*: The service collection for chaining.

**IServiceProvider)**

Gets the error mapper from the service provider.

*Parameters*:
- `provider`: The service provider.

*Returns*: The error mapper.

**IServiceProvider)**

Gets the global exception handler from the service provider.

*Parameters*:
- `provider`: The service provider.

*Returns*: The global exception handler.

---

### Belay.Core.Extensions.IExceptionHandlingConfigurator {#belaycoreextensionsiexceptionhandlingconfigurator}

Interface for exception handling configurator.

#### Methods

**Configure**

Configures the exception handling.

---

## Belay.Core.Protocol

### Belay.Core.Protocol.AdaptiveRawReplProtocol {#belaycoreprotocoladaptiverawreplprotocol}

Adaptive implementation of MicroPython Raw REPL protocol that auto-detects device capabilities and adjusts protocol parameters for optimal compatibility and performance.

#### Properties

**Configuration**

Gets the current configuration being used.

**CurrentState**

Gets the current state of the protocol.

**DetectedCapabilities**

Gets the detected device capabilities, if available.

**Metrics**

Gets the current protocol metrics.

#### Methods

**RawReplConfiguration)**

Initializes a new instance of the

*Parameters*:
- `stream`: The communication stream to the device.
- `logger`: The logger for diagnostic information.
- `configuration`: Protocol configuration options.

**Dispose**

**CancellationToken)**

Execute code using the adaptive Raw REPL protocol with automatic optimization.

*Parameters*:
- `code`: The Python code to execute.
- `cancellationToken`: Cancellation token to cancel the operation.

*Returns*: The result of code execution.

**CancellationToken)**

Initialize the adaptive Raw REPL protocol with capability detection.

*Parameters*:
- `cancellationToken`: Cancellation token to cancel the operation.

*Returns*: A

---

### Belay.Core.Protocol.DeviceReplCapabilities {#belaycoreprotocoldevicereplcapabilities}

Detected capabilities and characteristics of a MicroPython device's REPL implementation.

#### Properties

**AverageResponseTime**

Gets or sets the measured response time characteristics.

**DetectedAt**

Gets or sets the timestamp when capabilities were detected.

**DetectedPlatform**

Gets or sets the device platform/type if detectable.

**HasReliableFlowControl**

Gets or sets whether flow control bytes are processed correctly.

**MaxWindowSize**

Gets or sets the device's maximum supported window size.

**MicroPythonVersion**

Gets or sets the MicroPython version if detectable.

**PreferredWindowSize**

Gets or sets the device's preferred window size for raw-paste mode.

**RequiresExtendedInterruptDelay**

Gets or sets whether the device needs extended interrupt processing time.

**RequiresExtendedStartup**

Gets or sets whether the device needs extended startup delays.

**SupportsLargeCodeTransfers**

Gets or sets whether the device properly handles large code transfers.

**SupportsRawPasteMode**

Gets or sets whether the device supports raw-paste mode.

---

### Belay.Core.Protocol.FlowControlException {#belaycoreprotocolflowcontrolexception}

Exception thrown when flow control encounters an error.

#### Properties

**ReceivedByte**

**WindowSize**

#### Methods

**RawReplState)**

Exception thrown when flow control encounters an error.

---

### Belay.Core.Protocol.RawReplConfiguration {#belaycoreprotocolrawreplconfiguration}

Configuration options for Raw REPL protocol behavior with auto-detection capabilities.

#### Properties

**BaseResponseTimeout**

Gets or sets the base timeout for reading responses. Auto-detection will adjust based on device performance.

**EnableAdaptiveFlowControl**

Gets or sets whether to enable adaptive flow control.

**EnableAdaptiveTiming**

Gets or sets whether to enable adaptive timing adjustments.

**EnableRawPasteAutoDetection**

Gets or sets whether to enable raw-paste mode auto-detection. If false, will fall back to regular raw mode.

**EnableVerboseLogging**

Gets or sets whether to enable verbose protocol logging. Useful for debugging protocol issues.

**InitializationTimeout**

Gets or sets the timeout for initial protocol initialization. Auto-detection will increase this if needed.

**InterruptDelay**

Gets or sets the interrupt sequence delay. Some devices need more time to process interrupts.

**MaxResponseTimeout**

Gets or sets the maximum response timeout after adaptive increases.

**MaxRetryAttempts**

Gets or sets the maximum number of retry attempts for failed operations.

**MaxStartupDelay**

Gets or sets the maximum startup delay after adaptive increases.

**MaximumWindowSize**

Gets or sets the maximum window size to request during negotiation.

**MinimumWindowSize**

Gets or sets the minimum window size to accept during negotiation.

**PreferredWindowSize**

Gets or sets the preferred window size for raw-paste mode. If null, will be auto-detected from device capabilities.

**RetryDelay**

Gets or sets the base delay between retry attempts. Each retry will use exponential backoff based on this value.

**StartupDelay**

Gets or sets the startup delay for device initialization. Auto-detection will adjust based on device response time.

#### Methods

**CreateFallbackConfiguration**

Creates a copy of this configuration with conservative fallback settings. Used when auto-detection fails.

*Returns*: A new configuration with conservative settings.

---

### Belay.Core.Protocol.RawReplProtocol {#belaycoreprotocolrawreplprotocol}

Implementation of MicroPython Raw REPL protocol with support for both raw mode and raw-paste mode.

#### Properties

**CurrentState**

Gets current state of the Raw REPL protocol.

#### Methods

**RawReplProtocol})**

Initializes a new instance of the

**Dispose**

**CancellationToken)**

Enter raw REPL mode.

*Returns*: A

**CancellationToken)**

Execute code using the Raw REPL protocol.

*Returns*: A

**CancellationToken)**

Exit raw REPL mode back to normal mode.

*Returns*: A

**CancellationToken)**

Initialize the Raw REPL protocol.

*Returns*: A

---

### Belay.Core.Protocol.RawReplProtocolException {#belaycoreprotocolrawreplprotocolexception}

Exception thrown when Raw REPL protocol encounters an error.

#### Properties

**ActualState**

**ExpectedState**

#### Methods

**RawReplState)**

Exception thrown when Raw REPL protocol encounters an error.

---

### Belay.Core.Protocol.RawReplResponse {#belaycoreprotocolrawreplresponse}

Represents the response from a Raw REPL command execution.

#### Properties

**ErrorOutput**

**Exception**

**IsSuccess**

**Output**

**Result**

---

### Belay.Core.Protocol.RawReplState {#belaycoreprotocolrawreplstate}

Represents the current state of the Raw REPL protocol.

#### Fields

**Normal**

Normal interactive REPL mode.

**Raw**

Raw mode for programmatic code execution.

**RawPaste**

Raw-paste mode with flow control.

---

### Belay.Core.Protocol.ReplProtocolMetrics {#belaycoreprotocolreplprotocolmetrics}

Protocol metrics and performance tracking.

#### Properties

**AdaptiveAdjustments**

Gets or sets the total number of adaptive adjustments made.

**AverageOperationTime**

Gets or sets the average operation duration.

**FailedOperations**

Gets or sets the number of failed operations.

**LastOperationTime**

Gets or sets the timestamp of the last operation.

**RetryAttempts**

Gets or sets the number of retry attempts made.

**SuccessRate**

Calculates the success rate as a percentage.

**SuccessfulOperations**

Gets or sets the number of successful operations.

---

## Belay.Core.Sessions

### Belay.Core.Sessions.BackgroundThreadInfo {#belaycoresessionsbackgroundthreadinfo}

Information about a background thread running on the device.

#### Properties

**MethodName**

Gets the name of the method that created the thread.

**RegisteredAt**

Gets the timestamp when the thread was registered.

**SessionId**

Gets the session that owns this thread.

**ThreadId**

Gets the unique identifier of the thread.

---

### Belay.Core.Sessions.DeployedMethodInfo {#belaycoresessionsdeployedmethodinfo}

Information about a deployed method on the device.

#### Properties

**CodeHash**

Gets the hash of the deployed code.

**DeployedAt**

Gets the timestamp when the method was deployed.

**SessionId**

Gets the session that deployed this method.

**Signature**

Gets the method signature.

---

### Belay.Core.Sessions.DeviceCapabilities {#belaycoresessionsdevicecapabilities}

Detects and tracks device capabilities and features.

#### Properties

**DeviceType**

**FirmwareVersion**

**IsDetectionComplete**

**PerformanceProfile**

**SupportedFeatures**

**UniqueDeviceId**

#### Methods

**DeviceCapabilities})**

Initializes a new instance of the

*Parameters*:
- `communication`: The device communication instance.
- `logger`: The logger for diagnostic information.

**CancellationToken)**

**CancellationToken)**

**DeviceFeature)**

---

### Belay.Core.Sessions.DeviceCapabilitiesChangedEventArgs {#belaycoresessionsdevicecapabilitieschangedeventargs}

Event arguments for device capabilities changes.

#### Properties

**NewCapabilities**

Gets the new capabilities.

**OldCapabilities**

Gets the previous capabilities.

#### Methods

**IDeviceCapabilities)**

Initializes a new instance of the

*Parameters*:
- `oldCapabilities`: The previous capabilities.
- `newCapabilities`: The new capabilities.

---

### Belay.Core.Sessions.DeviceContext {#belaycoresessionsdevicecontext}

Provides device-specific context information within a session.

#### Properties

**AvailableMetrics**

**Communication**

**ConnectionState**

**DeviceInfo**

**SessionId**

#### Methods

**IDeviceInfo)**

Initializes a new instance of the

*Parameters*:
- `sessionId`: The identifier of the session this context belongs to.
- `communication`: The device communication instance.
- `logger`: The logger for diagnostic information.
- `deviceInfo`: Optional device information.

**String,``0)**

**String)**

**Double)**

**String,``0)**

---

### Belay.Core.Sessions.DeviceFeature {#belaycoresessionsdevicefeature}

Individual device features that can be tested.

#### Fields

**ADC**

Analog-to-Digital Converter.

**Audio**

Audio processing.

**Bluetooth**

Bluetooth connectivity.

**CryptoAccel**

Hardware crypto acceleration.

**Display**

Display controller.

**FileSystem**

File system access.

**GPIO**

GPIO pin control.

**I2C**

I2C communication.

**PWM**

Pulse Width Modulation.

**RTC**

Real-time clock.

**SPI**

SPI communication.

**Threading**

Threading support.

**Timer**

Hardware timers.

**TouchSensor**

Touch sensor support.

**WiFi**

WiFi connectivity.

---

### Belay.Core.Sessions.DeviceFeatureSet {#belaycoresessionsdevicefeatureset}

Represents a set of device features.

#### Fields

**ADC**

Analog-to-Digital Converter.

**Audio**

Audio processing capabilities.

**Bluetooth**

Bluetooth connectivity.

**CryptoAccel**

Hardware cryptographic acceleration.

**Display**

Display controller.

**FileSystem**

File system access.

**GPIO**

Basic GPIO pin control.

**I2C**

I2C communication protocol.

**None**

No features detected.

**PWM**

Pulse Width Modulation.

**RTC**

Real-time clock.

**SPI**

SPI communication protocol.

**Threading**

Threading support.

**Timer**

Hardware timers.

**TouchSensor**

Touch sensor support.

**WiFi**

WiFi connectivity.

---

### Belay.Core.Sessions.DeviceInfo {#belaycoresessionsdeviceinfo}

Basic device information implementation.

#### Properties

**AvailableMemory**

**Hardware**

**Platform**

**SupportsFileSystem**

**SupportsThreading**

**UniqueId**

**Version**

---

### Belay.Core.Sessions.DeviceMemoryInfo {#belaycoresessionsdevicememoryinfo}

Device memory information.

#### Properties

**AllocatedBytes**

Gets the allocated memory.

**FreeBytes**

Gets the currently free memory.

**Timestamp**

Gets the timestamp when this information was collected.

**TotalBytes**

Gets the total memory available.

**UtilizationPercent**

Gets the memory utilization percentage.

---

### Belay.Core.Sessions.DevicePerformanceProfile {#belaycoresessionsdeviceperformanceprofile}

Performance characteristics of a device.

#### Properties

**AvailableRamBytes**

Gets the available RAM in bytes.

**BenchmarkResults**

Gets benchmark results if available.

**EstimatedCpuSpeedMhz**

Gets the estimated CPU speed in MHz.

**FlashStorageBytes**

Gets the flash storage size in bytes.

**HasFloatingPointUnit**

Gets a value indicating whether the device has floating-point unit.

**PerformanceTier**

Gets the estimated performance tier.

---

### Belay.Core.Sessions.DevicePerformanceTier {#belaycoresessionsdeviceperformancetier}

Device performance tiers for optimization decisions.

#### Fields

**High**

High-end device with ample resources.

**Low**

Low-end device with limited resources.

**Medium**

Mid-range device with moderate resources.

**Unknown**

Unknown performance characteristics.

---

### Belay.Core.Sessions.DeviceSession {#belaycoresessionsdevicesession}

Represents a single session context for device operations.

#### Properties

**CreatedAt**

**DeviceContext**

**ExecutorContext**

**FileSystemContext**

Gets the file system context for session-aware file operations.

**IsActive**

**Resources**

**SessionId**

**State**

#### Methods

**IDeviceCapabilities)**

Initializes a new instance of the

*Parameters*:
- `sessionId`: The unique identifier for this session.
- `communication`: The device communication instance.
- `loggerFactory`: The logger factory for creating loggers.
- `deviceInfo`: Optional device information.
- `capabilities`: Optional device capabilities.

**DisposeAsync**

---

### Belay.Core.Sessions.DeviceSessionManager {#belaycoresessionsdevicesessionmanager}

Manages device sessions and provides session coordination.

#### Properties

**Capabilities**

**CurrentSessionId**

**State**

#### Methods

**ILoggerFactory)**

Initializes a new instance of the

*Parameters*:
- `loggerFactory`: The logger factory for creating loggers.

**CancellationToken)**

**DisposeAsync**

**CancellationToken)**

**CancellationToken)**

**CancellationToken)**

**CancellationToken)**

**CancellationToken)**

---

### Belay.Core.Sessions.DeviceSessionState {#belaycoresessionsdevicesessionstate}

Represents the possible states of a device session manager.

#### Fields

**Active**

Session manager is active and ready to create sessions.

**Disposed**

Session manager has been disposed.

**Inactive**

Session manager is inactive.

**Shutdown**

Session manager is shutting down.

---

### Belay.Core.Sessions.DeviceSessionStateChangedEventArgs {#belaycoresessionsdevicesessionstatechangedeventargs}

Event arguments for device session state changes.

#### Properties

**NewState**

Gets the new state.

**OldState**

Gets the previous state.

#### Methods

**DeviceSessionState)**

Initializes a new instance of the

*Parameters*:
- `oldState`: The previous state.
- `newState`: The new state.

---

### Belay.Core.Sessions.ExecutorContext {#belaycoresessionsexecutorcontext}

Provides session context for executor coordination and state sharing.

#### Properties

**RegisteredExecutorTypes**

**SessionId**

#### Methods

**ExecutorContext})**

Initializes a new instance of the

*Parameters*:
- `sessionId`: The identifier of the session this context belongs to.
- `logger`: The logger for diagnostic information.

**GetExecutor``1**

**String,``0)**

**Type)**

**Object)**

**String,``0)**

**Type)**

---

### Belay.Core.Sessions.FileMetadata {#belaycoresessionsfilemetadata}

File metadata information.

#### Properties

**Attributes**

Gets additional file attributes if supported by the device.

**CachedAt**

Gets the timestamp when this metadata was cached.

**IsDirectory**

Gets a value indicating whether this is a directory.

**LastModified**

Gets the last modified timestamp if available.

**Name**

Gets the name of the file (without directory path).

**Path**

Gets the full path of the file.

**Size**

Gets the size of the file in bytes. Null for directories or if unknown.

---

### Belay.Core.Sessions.FileSystemCapabilities {#belaycoresessionsfilesystemcapabilities}

File system capabilities of the device.

#### Fields

**BasicFileOperations**

Basic file operations (read, write, delete).

**DirectoryOperations**

Directory operations (create, delete, list).

**ExtendedAttributes**

Extended attributes support.

**FileMetadata**

File metadata access (size, timestamps).

**FileWatching**

File watching/monitoring support.

**None**

No file system capabilities detected.

**Permissions**

File permissions support.

**SymbolicLinks**

Symbolic links support.

---

### Belay.Core.Sessions.FileSystemContext {#belaycoresessionsfilesystemcontext}

Implementation of file system context for session management.

#### Properties

**CachedFileInfo**

**Capabilities**

**CurrentDirectory**

**IsFileSystemSupported**

**SessionId**

Gets the session identifier.

#### Methods

**FileSystemCapabilities)**

Initializes a new instance of the

*Parameters*:
- `sessionId`: The session identifier.
- `capabilities`: The file system capabilities.

**FileMetadata)**

Adds file metadata to the cache.

*Parameters*:
- `metadata`: The file metadata to cache.

**ClearCache**

**CancellationToken)**

**CancellationToken)**

**CancellationToken)**

**CancellationToken)**

---

### Belay.Core.Sessions.IDeviceCapabilities {#belaycoresessionsidevicecapabilities}

Represents device capabilities and features that can be detected and tracked.

#### Properties

**DeviceType**

Gets the device type (platform name).

**FirmwareVersion**

Gets the MicroPython firmware version.

**IsDetectionComplete**

Gets a value indicating whether capability detection has completed.

**PerformanceProfile**

Gets the performance profile of the device.

**SupportedFeatures**

Gets the set of features supported by the device.

**UniqueDeviceId**

Gets the unique device identifier, if available.

#### Methods

**CancellationToken)**

Gets memory information from the device.

*Parameters*:
- `cancellationToken`: Cancellation token to cancel the operation.

*Returns*: Device memory information.

**CancellationToken)**

Refreshes device capabilities by querying the device.

*Parameters*:
- `cancellationToken`: Cancellation token to cancel the operation.

*Returns*: A task representing the asynchronous operation.

**DeviceFeature)**

Determines if the device supports a specific feature.

*Parameters*:
- `feature`: The feature to check.

*Returns*: True if the feature is supported, false otherwise.

---

### Belay.Core.Sessions.IDeviceContext {#belaycoresessionsidevicecontext}

Provides device-specific context information within a session.

#### Properties

**AvailableMetrics**

Gets all available performance metric names for this session.

**Communication**

Gets the current device communication instance.

**ConnectionState**

Gets the device communication state at the time of session creation.

**DeviceInfo**

Gets device capabilities and information, if available.

**SessionId**

Gets the session identifier associated with this context.

#### Methods

**String,``0)**

Gets device-specific configuration for this session.

*Parameters*:
- `key`: The configuration key.
- `defaultValue`: The default value to return if not found.

*Returns*: The configuration value, or the default value if not found.

**String)**

Gets performance metrics for device operations in this session.

*Parameters*:
- `metricName`: The name of the metric to retrieve.

*Returns*: The metric value, or null if the metric is not available.

**Double)**

Records a performance metric for device operations in this session.

*Parameters*:
- `metricName`: The name of the metric to record.
- `value`: The metric value to record.

**String,``0)**

Sets device-specific configuration for this session.

*Parameters*:
- `key`: The configuration key.
- `value`: The configuration value to store.

---

### Belay.Core.Sessions.IDeviceInfo {#belaycoresessionsideviceinfo}

Provides basic device information and capabilities.

#### Properties

**AvailableMemory**

Gets the available memory on the device, if known.

**Hardware**

Gets the device hardware identifier.

**Platform**

Gets the device platform (e.g., "micropython", "circuitpython").

**SupportsFileSystem**

Gets a value indicating whether the device supports file operations.

**SupportsThreading**

Gets a value indicating whether the device supports threading.

**UniqueId**

Gets the device's unique identifier, if available.

**Version**

Gets the device platform version.

---

### Belay.Core.Sessions.IDeviceSession {#belaycoresessionsidevicesession}

Represents a single session context for device operations. Sessions provide isolation and resource tracking for operations.

#### Properties

**CreatedAt**

Gets the timestamp when this session was created.

**DeviceContext**

Gets the device context for device-specific session information.

**ExecutorContext**

Gets the executor context for session-aware executor coordination.

**FileSystemContext**

Gets the file system context for session-aware file operations.

**IsActive**

Gets a value indicating whether this session is still active.

**Resources**

Gets the resource tracker for managing session resources.

**SessionId**

Gets the unique identifier for this session.

**State**

Gets the session state for storing operation-specific data.

---

### Belay.Core.Sessions.IDeviceSessionManager {#belaycoresessionsidevicesessionmanager}

Manages device sessions and provides session coordination.

#### Properties

**Capabilities**

Gets the device capabilities if they have been detected.

**CurrentSessionId**

Gets the current session identifier, if any.

**State**

Gets the current state of the session manager.

#### Methods

**CancellationToken)**

Creates a new session for device operations.

*Parameters*:
- `communication`: The device communication instance for this session.
- `cancellationToken`: Cancellation token to cancel the operation.

*Returns*: A new device session.

**CancellationToken)**

Ends the specified session and cleans up its resources.

*Parameters*:
- `sessionId`: The identifier of the session to end.
- `cancellationToken`: Cancellation token to cancel the operation.

*Returns*: A

**CancellationToken)**

Executes an operation within a session context, creating one if necessary.

*Parameters*:
- `communication`: The device communication instance for this session.
- `operation`: The operation to execute within the session.
- `cancellationToken`: Cancellation token to cancel the operation.

*Returns*: A

**CancellationToken)**

Executes an operation within a session context, creating one if necessary.

*Parameters*:
- `communication`: The device communication instance for this session.
- `operation`: The operation to execute within the session.
- `cancellationToken`: Cancellation token to cancel the operation.

*Returns*: The result of the operation.

**CancellationToken)**

Gets the current session or creates a new one if none exists.

*Parameters*:
- `communication`: The device communication instance for this session.
- `cancellationToken`: Cancellation token to cancel the operation.

*Returns*: The current or a new device session.

**CancellationToken)**

Gets statistics about the session manager.

*Parameters*:
- `cancellationToken`: Cancellation token to cancel the operation.

*Returns*: Session statistics.

---

### Belay.Core.Sessions.IExecutorContext {#belaycoresessionsiexecutorcontext}

Provides session context for executor coordination and state sharing.

#### Properties

**RegisteredExecutorTypes**

Gets all registered executor types.

**SessionId**

Gets the session identifier associated with this context.

#### Methods

**GetExecutor``1**

Gets a registered executor of the specified type.

*Returns*: The registered executor instance, or null if not found.

**String,``0)**

Gets shared data between executors within this session.

*Parameters*:
- `key`: The key of the shared data.
- `defaultValue`: The default value to return if not found.

*Returns*: The shared data value, or the default value if not found.

**Type)**

Checks whether an executor of the specified type is registered.

*Parameters*:
- `executorType`: The type of executor to check for.

*Returns*: True if an executor of the specified type is registered; otherwise, false.

**Object)**

Registers an executor with the session for coordination.

*Parameters*:
- `executorType`: The type of executor being registered.
- `executorInstance`: The executor instance being registered.

*Returns*: A

**String,``0)**

Sets shared data between executors within this session.

*Parameters*:
- `key`: The key to associate with the shared data.
- `value`: The shared data value to store.

**Type)**

Unregisters an executor from the session.

*Parameters*:
- `executorType`: The type of executor being unregistered.

*Returns*: A

---

### Belay.Core.Sessions.IFileSystemContext {#belaycoresessionsifilesystemcontext}

Provides file system context and state management for a device session.

#### Properties

**CachedFileInfo**

Gets cached file metadata for improved performance.

**Capabilities**

Gets the file system capabilities of the device.

**CurrentDirectory**

Gets or sets the current working directory on the device.

**IsFileSystemSupported**

Gets a value indicating whether file system operations are supported.

#### Methods

**ClearCache**

Clears all cached file system information.

**CancellationToken)**

Gets file metadata from cache or queries the device if not cached.

*Parameters*:
- `path`: The file path to get metadata for.
- `cancellationToken`: Cancellation token to cancel the operation.

*Returns*: File metadata if available, null otherwise.

**CancellationToken)**

Invalidates cached file information for the specified path.

*Parameters*:
- `path`: The path to invalidate from cache.
- `cancellationToken`: Cancellation token to cancel the operation.

*Returns*: A task representing the asynchronous operation.

**CancellationToken)**

Lists the contents of a directory with caching support.

*Parameters*:
- `path`: The directory path to list.
- `useCache`: Whether to use cached results if available.
- `cancellationToken`: Cancellation token to cancel the operation.

*Returns*: A list of file metadata for directory contents.

**CancellationToken)**

Refreshes the directory cache for the specified path.

*Parameters*:
- `path`: The directory path to refresh.
- `cancellationToken`: Cancellation token to cancel the operation.

*Returns*: A task representing the asynchronous operation.

---

### Belay.Core.Sessions.IResourceTracker {#belaycoresessionsiresourcetracker}

Tracks resources associated with a device session.

#### Methods

**CancellationToken)**

Cleans up all resources tracked by this session.

*Parameters*:
- `cancellationToken`: Cancellation token to cancel the operation.

*Returns*: A

**CancellationToken)**

Gets all active session resources.

*Parameters*:
- `cancellationToken`: Cancellation token to cancel the operation.

*Returns*: A collection of active session resources.

**GetActiveThreads**

Gets information about all active background threads in this session.

*Returns*: A collection of active background thread information.

**GetDeployedMethods**

Gets information about all deployed methods in this session.

*Returns*: A collection of deployed method information.

**GetResourceStats**

Gets resource usage statistics for this session.

*Returns*: Resource usage statistics.

**Byte[])**

Checks whether a method with the specified signature and code hash is already deployed.

*Parameters*:
- `signature`: The method signature.
- `codeHash`: The hash of the code to check.

*Returns*: True if the method is already deployed; otherwise, false.

**CancellationToken)**

Registers a background thread with the session.

*Parameters*:
- `threadId`: The unique identifier of the thread.
- `methodName`: The name of the method that created the thread.
- `cancellationToken`: Cancellation token to cancel the operation.

*Returns*: A

**CancellationToken)**

Registers a deployed method with the session.

*Parameters*:
- `signature`: The method signature.
- `codeHash`: The hash of the deployed code.
- `cancellationToken`: Cancellation token to cancel the operation.

*Returns*: A

**CancellationToken)**

Registers a session resource for tracking and automatic cleanup.

*Parameters*:
- `resource`: The session resource to register.
- `cancellationToken`: Cancellation token to cancel the operation.

*Returns*: A task representing the asynchronous operation.

**CancellationToken)**

Unregisters a background thread from the session.

*Parameters*:
- `threadId`: The unique identifier of the thread to unregister.
- `cancellationToken`: Cancellation token to cancel the operation.

*Returns*: A

---

### Belay.Core.Sessions.ISessionResource {#belaycoresessionsisessionresource}

Represents a resource that is managed by a device session. Session resources are automatically tracked and cleaned up when the session ends.

#### Properties

**CreatedAt**

Gets the timestamp when this resource was created.

**Metadata**

Gets metadata about the resource for tracking and debugging.

**ResourceCost**

Gets the size or cost of this resource in arbitrary units. Used for resource limit enforcement.

**ResourceId**

Gets the unique identifier for this resource.

**ResourceType**

Gets the type of resource (e.g., "DeployedMethod", "BackgroundThread", "FileHandle").

**State**

Gets the current state of the resource.

#### Methods

**CancellationToken)**

Performs cleanup of the resource before disposal.

*Parameters*:
- `cancellationToken`: Cancellation token to cancel the operation.

*Returns*: A task representing the asynchronous cleanup.

**CancellationToken)**

Initializes the resource and performs any necessary setup.

*Parameters*:
- `cancellationToken`: Cancellation token to cancel the operation.

*Returns*: A task representing the asynchronous initialization.

---

### Belay.Core.Sessions.ISessionState {#belaycoresessionsisessionstate}

Provides session-scoped state management for device operations.

#### Properties

**Keys**

Gets all keys in the session state.

#### Methods

**Clear**

Clears all values from the session state.

**String)**

Checks whether the session state contains the specified key.

*Parameters*:
- `key`: The key to check for.

*Returns*: True if the key exists; otherwise, false.

**String,``0)**

Gets a value from the session state.

*Parameters*:
- `key`: The key of the value to retrieve.
- `defaultValue`: The default value to return if the key is not found.

*Returns*: The value associated with the key, or the default value if not found.

**String)**

Removes a value from the session state.

*Parameters*:
- `key`: The key of the value to remove.

*Returns*: True if the key was found and removed; otherwise, false.

**String,``0)**

Sets a value in the session state.

*Parameters*:
- `key`: The key to associate with the value.
- `value`: The value to store.

**String,``0@)**

Attempts to get a value from the session state.

*Parameters*:
- `key`: The key of the value to retrieve.
- `value`: When this method returns, contains the value associated with the key, if found.

*Returns*: True if the key was found; otherwise, false.

---

### Belay.Core.Sessions.ResourceState {#belaycoresessionsresourcestate}

Represents the possible states of a session resource.

#### Fields

**Active**

Resource is active and ready for use.

**Disposed**

Resource has been disposed and is no longer usable.

**Disposing**

Resource is being cleaned up.

**Error**

Resource is in an error state.

**Initializing**

Resource is being created but not yet ready.

**Suspended**

Resource is temporarily suspended.

---

### Belay.Core.Sessions.ResourceStateChangedEventArgs {#belaycoresessionsresourcestatechangedeventargs}

Event arguments for resource state changes.

#### Properties

**Error**

Gets the error that caused the state change, if any.

**NewState**

Gets the new state.

**OldState**

Gets the previous state.

**ResourceId**

Gets the ID of the resource that changed state.

#### Methods

**Exception)**

Initializes a new instance of the

*Parameters*:
- `resourceId`: The ID of the resource that changed state.
- `oldState`: The previous state.
- `newState`: The new state.
- `error`: Optional error that caused the state change.

---

### Belay.Core.Sessions.ResourceTracker {#belaycoresessionsresourcetracker}

Tracks and manages resources associated with a device session.

#### Methods

**ResourceTracker})**

Initializes a new instance of the

*Parameters*:
- `sessionId`: The identifier of the session this tracker belongs to.
- `logger`: The logger for diagnostic information.

**CancellationToken)**

**DisposeAsync**

**CancellationToken)**

**GetActiveThreads**

**GetDeployedMethods**

**GetResourceStats**

**GetTotalResourceCostThreadSafe**

Gets the total resource cost in a thread-safe manner.

*Returns*: The total resource cost.

**Byte[])**

**CancellationToken)**

**CancellationToken)**

**CancellationToken)**

**ThrowIfDisposed**

Throws an exception if this resource tracker has been disposed.

**CancellationToken)**

---

### Belay.Core.Sessions.ResourceUsageStats {#belaycoresessionsresourceusagestats}

Resource usage statistics for a session.

#### Properties

**BackgroundThreads**

Gets the number of background threads.

**DeployedMethods**

Gets the number of deployed methods.

**ResourcesByType**

Gets the number of resources by type.

**TotalResourceCost**

Gets the total resource cost.

**TotalResources**

Gets the total number of resources.

---

### Belay.Core.Sessions.SessionResourceBase {#belaycoresessionssessionresourcebase}

Base implementation of a session resource with common functionality.

#### Properties

**CreatedAt**

**Metadata**

**ResourceCost**

**ResourceId**

**ResourceType**

**State**

#### Methods

**Int32)**

Initializes a new instance of the

*Parameters*:
- `resourceId`: The unique identifier for this resource.
- `resourceType`: The type of resource.
- `resourceCost`: The cost of this resource.

**CancellationToken)**

**CancellationToken)**

Performs the actual resource cleanup. Override in derived classes.

*Parameters*:
- `cancellationToken`: Cancellation token to cancel the operation.

*Returns*: A task representing the asynchronous cleanup.

**DisposeAsync**

**CancellationToken)**

**CancellationToken)**

Performs the actual resource initialization. Override in derived classes.

*Parameters*:
- `cancellationToken`: Cancellation token to cancel the operation.

*Returns*: A task representing the asynchronous initialization.

**Object)**

Sets metadata for this resource.

*Parameters*:
- `key`: The metadata key.
- `value`: The metadata value.

**ThrowIfDisposed**

Throws an exception if the resource has been disposed.

**Exception)**

Transitions the resource to a new state and raises the StateChanged event.

*Parameters*:
- `newState`: The new state.
- `error`: Optional error that caused the transition.

---

### Belay.Core.Sessions.SessionState {#belaycoresessionssessionstate}

Thread-safe implementation of session state management.

#### Properties

**Keys**

#### Methods

**Clear**

**String)**

**String,``0)**

**String)**

**String,``0)**

**String,``0@)**

---

### Belay.Core.Sessions.SessionStats {#belaycoresessionssessionstats}

Statistics about the session manager.

#### Properties

**ActiveSessionCount**

Gets the number of active sessions.

**MaxSessionCount**

Gets the maximum number of concurrent sessions.

**TotalSessionCount**

Gets the total number of sessions created.

---

## Belay.Core.Testing

### Belay.Core.Testing.MicroPythonUnixPort {#belaycoretestingmicropythonunixport}

#### Methods

**BuildUnixPort**

Build the MicroPython unix port (synchronous wrapper).

**CancellationToken)**

Build the MicroPython unix port if source is available.

*Returns*: A

**FindExecutableAsync**

Find the MicroPython unix port executable.

*Returns*: A

**FindMicroPythonExecutable**

Find the MicroPython unix port executable (synchronous wrapper).

**FindMicroPythonRepoPath**

Find the MicroPython repository path by searching up the directory tree.

**String)**

Get the expected path to the built unix port executable.

**String)**

Check if a path points to a valid MicroPython executable.

*Returns*: A

---

### Belay.Core.Testing.MicroPythonUnixPortLogger {#belaycoretestingmicropythonunixportlogger}

Helper for working with MicroPython unix port for testing.

---

### Belay.Core.Testing.SubprocessTestHelper {#belaycoretestingsubprocesstesthelper}

Test helper for subprocess communication.

#### Methods

**CreateTestDeviceAsync**

Create a SubprocessDeviceCommunication instance for testing.

*Returns*: A

**GetMicroPythonExecutableAsync**

Get the MicroPython executable path from environment or default.

*Returns*: A

**IsMicroPythonAvailableAsync**

Check if MicroPython unix port is available for testing.

*Returns*: A

---

## Belay.Core.Transactions

### Belay.Core.Transactions.DeviceTransaction {#belaycoretransactionsdevicetransaction}

Implementation of device transaction using compensating actions pattern. Since we can't have true ACID transactions with external devices, we use compensating actions.

#### Properties

**IsActive**

**TransactionId**

#### Methods

**#ctor**

Initializes a new instance of the

**CancellationToken)**

**Dispose**

**String)**

**CancellationToken)**

---

### Belay.Core.Transactions.IDeviceTransaction {#belaycoretransactionsidevicetransaction}

Represents a transaction boundary for device operations that ensures consistency across multiple operations.

#### Properties

**IsActive**

Gets a value indicating whether the transaction is still active.

**TransactionId**

Gets the unique transaction identifier.

#### Methods

**CancellationToken)**

Commits all operations in this transaction.

*Parameters*:
- `cancellationToken`: Cancellation token.

*Returns*: A task representing the commit operation.

**String)**

Registers a compensating action to be executed if the transaction is rolled back.

*Parameters*:
- `compensatingAction`: The action to execute on rollback.
- `description`: Description of what this compensation does.

**CancellationToken)**

Rolls back all operations in this transaction by executing compensating actions.

*Parameters*:
- `cancellationToken`: Cancellation token.

*Returns*: A task representing the rollback operation.

---

### Belay.Core.Transactions.ITransactionManager {#belaycoretransactionsitransactionmanager}

Service for managing device operation transactions.

#### Methods

**CancellationToken)**

Executes an action within a transaction boundary with automatic rollback on failure.

*Parameters*:
- `operation`: The operation to execute within the transaction.
- `cancellationToken`: Cancellation token.

*Returns*: A task representing the operation.

**CancellationToken)**

Executes a function within a transaction boundary with automatic rollback on failure.

*Parameters*:
- `operation`: The operation to execute within the transaction.
- `cancellationToken`: Cancellation token.

*Returns*: The result of the operation.

---

### Belay.Core.Transactions.TransactionManager {#belaycoretransactionstransactionmanager}

Transaction manager implementation for device operations.

#### Methods

**TransactionManager})**

Initializes a new instance of the

*Parameters*:
- `logger`: Logger for transaction operations.

**CancellationToken)**

**CancellationToken)**

---

## System.Text.RegularExpressions.Generated

### System.Text.RegularExpressions.Generated.MyRegex_0 {#systemtextregularexpressionsgeneratedmyregex_0}

Custom

#### Methods

**#ctor**

Initializes the instance.

#### Fields

**Instance**

Cached, thread-safe singleton instance.

---

### System.Text.RegularExpressions.Generated.Utilities {#systemtextregularexpressionsgeneratedutilities}

Helper methods used by generated

#### Methods

**Char})**

Finds the next index of any character that matches a Unicode digit.

**Int32)**

Pushes 2 values onto the backtracking stack.

#### Fields

**s_asciiExceptDigits**

Supports searching for characters in or not in "\0\u0001\u0002\u0003\u0004\u0005\u0006\a\b\t\n\v\f\r\u000e\u000f\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f !\"#$%&'()*+,-./:;&lt;=&gt;?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~\u007f".

**s_defaultTimeout**

Default timeout value set in

**s_hasTimeout**

Whether

---

## System.Text.RegularExpressions.Generated.MyRegex_0

### System.Text.RegularExpressions.Generated.MyRegex_0.RunnerFactory {#systemtextregularexpressionsgeneratedmyregex_0runnerfactory}

Provides a factory for creating

#### Methods

**CreateInstance**

Creates an instance of a

---

## System.Text.RegularExpressions.Generated.MyRegex_0.RunnerFactory

### System.Text.RegularExpressions.Generated.MyRegex_0.RunnerFactory.Runner {#systemtextregularexpressionsgeneratedmyregex_0runnerfactoryrunner}

Provides the runner that contains the custom logic implementing the specified regular expression.

#### Methods

**Char})**

Scan the

*Parameters*:
- `inputSpan`: The text being scanned by the regular expression.

**Char})**

Search

*Parameters*:
- `inputSpan`: The text being scanned by the regular expression.

*Returns*: true if a possible match was found; false if no more matches are possible.

**Char})**

Determine whether

*Parameters*:
- `inputSpan`: The text being scanned by the regular expression.

*Returns*: true if the regular expression matches at the current position; otherwise, false.

---

