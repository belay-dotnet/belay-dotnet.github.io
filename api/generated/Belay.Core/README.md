# Belay.Core API Reference

Auto-generated from XML documentation.

## Overview

132 types documented in this assembly.

### Belay.Core.Caching.CacheStatistics

Tracks performance metrics and statistics for method deployment cache.

---

### Belay.Core.Caching.IMethodDeploymentCache

Defines the contract for a method deployment cache.

---

### Belay.Core.Caching.IPersistentCacheStorage

Defines an interface for persistent cache storage in Belay.NET.

---

### Belay.Core.Caching.MethodCacheConfiguration

Configuration options for method deployment caching behavior.

---

### Belay.Core.Caching.ICacheEntry

Base interface for cache entries to enable type-safe storage.

---

### Belay.Core.Caching.MethodCacheEntry`1

Represents a cached method deployment entry with metadata and expiration tracking.

---

### Belay.Core.Caching.MethodCacheKey

Represents a unique cache key for method deployment based on device and method characteristics.

---

### Belay.Core.Caching.MethodDeploymentCache

Provides an in-memory implementation of the method deployment cache.

---

### Belay.Core.Caching.MethodDeploymentCache.IMethodCacheEntryMetadata

Metadata interface for cache entries to support expiration and cleanup.

---

### Belay.Core.Communication.DeviceOutputEventArgs

Represents the output received from a device.

---

### Belay.Core.Communication.DeviceStateChangeEventArgs

Represents a change in device connection state.

---

### Belay.Core.Communication.DeviceConnectionState

Represents the connection state of a device.

---

### Belay.Core.Communication.IDeviceCommunication

Core interface for device communication implementations.

---

### Belay.Core.Communication.SerialDeviceCommunication

Serial/USB implementation of device communication for MicroPython devices.

---

### Belay.Core.Communication.ReconnectionPolicy

Reconnection policy configuration for serial device communication.

---

### Belay.Core.Communication.DeviceConnectionException

Exception thrown when device connection fails.

---

### Belay.Core.Communication.DeviceExecutionException

Exception thrown when device code execution fails.

---

### Belay.Core.Communication.SubprocessDeviceCommunication

Subprocess-based device communication using MicroPython unix port for testing.

---

### Belay.Core.Communication.DuplexStream

Duplex stream implementation for combining stdin and stdout streams.

---

### Belay.Core.Device

Main entry point for MicroPython device communication. Provides a high-level interface for connecting to and interacting with MicroPython devices.

---

### Belay.Core.Discovery.DeviceInfo

Information about a discovered MicroPython device.

---

### Belay.Core.Discovery.SerialDeviceDiscoveryLogger

Discovery service for MicroPython devices connected via serial/USB.

---

### Belay.Core.Discovery.SerialDeviceDiscovery

No description available

---

### Belay.Core.Exceptions.BelayConfigurationException

Exception thrown when Belay.NET configuration is invalid.

---

### Belay.Core.Exceptions.BelayValidationException

Exception thrown when validation fails.

---

