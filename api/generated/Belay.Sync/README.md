# Belay.Sync API Reference

Comprehensive API documentation generated from XML documentation comments.

## Table of Contents

### Belay.Sync

- [DeviceExtensions](#belaysyncdeviceextensions)
- [DeviceFileInfo](#belaysyncdevicefileinfo)
- [DeviceFileSystem](#belaysyncdevicefilesystem)
- [DevicePathUtil](#belaysyncdevicepathutil)
- [IDeviceFileSystem](#belaysyncidevicefilesystem)


---

## Belay.Sync

### Belay.Sync.DeviceExtensions {#belaysyncdeviceextensions}

Extension methods to add file system support to Device instances. This approach avoids circular dependencies between Belay.Core and Belay.Sync.

#### Methods

**Device)**

Gets a DeviceFileSystem instance for the specified device with lazy initialization. This is the recommended approach for performance-sensitive scenarios.

*Parameters*:
- `device`: The device to get file system support for.

*Returns*: A DeviceFileSystem instance for the device.

**DeviceFileSystem})**

Gets or creates a DeviceFileSystem instance for the specified device.

*Parameters*:
- `device`: The device to get file system support for.
- `logger`: Optional logger for file system operations.

*Returns*: A DeviceFileSystem instance for the device.

---

### Belay.Sync.DeviceFileInfo {#belaysyncdevicefileinfo}

Represents information about a file or directory on the device.

#### Properties

**Checksum**

Gets the checksum of the file content. May be null if not computed.

**IsDirectory**

Gets a value indicating whether this entry is a directory.

**LastModified**

Gets the last modified timestamp. May be null if not supported by the device.

**Path**

Gets the full path of the file or directory.

**Size**

Gets the size of the file in bytes. Null for directories.

---

### Belay.Sync.DeviceFileSystem {#belaysyncdevicefilesystem}

Implements file system operations for MicroPython/CircuitPython devices.

#### Methods

**DeviceFileSystem})**

Initializes a new instance of the

*Parameters*:
- `device`: The device to perform file system operations on.
- `logger`: Optional logger for diagnostic information.

**CancellationToken)**

**CancellationToken)**

**CancellationToken)**

**CancellationToken)**

**CancellationToken)**

**CancellationToken)**

**CancellationToken)**

**CancellationToken)**

**CancellationToken)**

**CancellationToken)**

**CancellationToken)**

---

### Belay.Sync.DevicePathUtil {#belaysyncdevicepathutil}

Provides utilities for handling device file paths in a cross-platform manner. MicroPython/CircuitPython devices use Unix-style paths regardless of the host OS.

#### Methods

**String[])**

Combines multiple path segments into a single device path.

*Parameters*:
- `paths`: The path segments to combine.

*Returns*: The combined device path.

*Exceptions*:
- `System.ArgumentException`: Thrown when any path segment is invalid.

**String)**

Converts a host file system path to a device path format.

*Parameters*:
- `hostPath`: The host file system path.
- `baseHostPath`: The base host directory to make the path relative to.

*Returns*: The equivalent device path.

**String)**

Gets the directory name of the specified path.

*Parameters*:
- `path`: The path to get the directory name for.

*Returns*: The directory name, or "/" for the root directory.

**String)**

Gets the extension of the specified path.

*Parameters*:
- `path`: The path to get the extension from.

*Returns*: The file extension including the dot, or empty string if no extension.

**String)**

Gets the file name from the specified path.

*Parameters*:
- `path`: The path to get the file name from.

*Returns*: The file name, or empty string for the root directory.

**String)**

Gets the file name without its extension.

*Parameters*:
- `path`: The path to get the file name from.

*Returns*: The file name without extension.

**String)**

Determines if the specified path is under the given parent directory.

*Parameters*:
- `path`: The path to check.
- `parentDirectory`: The parent directory path.

*Returns*: True if the path is under the parent directory, false otherwise.

**String)**

Determines whether the specified path is a valid device path.

*Parameters*:
- `path`: The path to validate.

*Returns*: True if the path is valid, false otherwise.

**String)**

Normalizes a device path by ensuring it uses forward slashes and removing redundant separators.

*Parameters*:
- `path`: The path to normalize.

*Returns*: The normalized device path.

*Exceptions*:
- `System.ArgumentException`: Thrown when the path is invalid.

**String)**

Converts a device path to a host file system path format.

*Parameters*:
- `devicePath`: The device path.
- `baseHostPath`: The base host directory to combine with the device path.

*Returns*: The equivalent host file system path.

**String)**

Validates that the specified path contains only valid characters for device file systems.

*Parameters*:
- `path`: The path to validate.

*Exceptions*:
- `System.ArgumentException`: Thrown when the path contains invalid characters.

#### Fields

**DeviceRoot**

The root directory path on devices.

**DeviceSeparator**

The path separator used on MicroPython/CircuitPython devices (always forward slash).

---

### Belay.Sync.IDeviceFileSystem {#belaysyncidevicefilesystem}

Provides an abstraction for file system operations on MicroPython/CircuitPython devices.

#### Methods

**CancellationToken)**

Calculates a checksum for the specified file.

*Parameters*:
- `path`: The file path to calculate checksum for.
- `algorithm`: The checksum algorithm to use (e.g., "md5", "sha256").
- `cancellationToken`: Cancellation token to cancel the operation.

*Returns*: The hexadecimal checksum string.

*Exceptions*:
- `System.IO.FileNotFoundException`: Thrown when the file does not exist.
- `System.NotSupportedException`: Thrown when the algorithm is not supported.

**CancellationToken)**

Creates a directory on the device.

*Parameters*:
- `path`: The directory path to create.
- `recursive`: Whether to create parent directories if they don't exist.
- `cancellationToken`: Cancellation token to cancel the operation.

*Exceptions*:
- `System.UnauthorizedAccessException`: Thrown when access is denied.
- `System.IO.IOException`: Thrown when an I/O error occurs.

**CancellationToken)**

Deletes a directory from the device.

*Parameters*:
- `path`: The directory path to delete.
- `recursive`: Whether to delete the directory and all its contents.
- `cancellationToken`: Cancellation token to cancel the operation.

*Exceptions*:
- `System.IO.DirectoryNotFoundException`: Thrown when the directory does not exist.
- `System.UnauthorizedAccessException`: Thrown when access is denied.
- `System.IO.IOException`: Thrown when the directory is not empty and recursive is false.

**CancellationToken)**

Deletes a file from the device.

*Parameters*:
- `path`: The file path to delete.
- `cancellationToken`: Cancellation token to cancel the operation.

*Exceptions*:
- `System.IO.FileNotFoundException`: Thrown when the file does not exist.
- `System.UnauthorizedAccessException`: Thrown when access is denied.

**CancellationToken)**

Checks whether a file or directory exists on the device.

*Parameters*:
- `path`: The path to check.
- `cancellationToken`: Cancellation token to cancel the operation.

*Returns*: True if the path exists, false otherwise.

**CancellationToken)**

Gets information about a specific file or directory on the device.

*Parameters*:
- `path`: The path to examine.
- `cancellationToken`: Cancellation token to cancel the operation.

*Returns*: File information, or null if the path does not exist.

**CancellationToken)**

Lists the contents of a directory on the device.

*Parameters*:
- `path`: The directory path to list. Use "/" for root directory.
- `recursive`: Whether to list contents recursively.
- `cancellationToken`: Cancellation token to cancel the operation.

*Returns*: A collection of file and directory information.

*Exceptions*:
- `System.IO.DirectoryNotFoundException`: Thrown when the directory does not exist.
- `System.UnauthorizedAccessException`: Thrown when access is denied.

**CancellationToken)**

Reads the entire contents of a file from the device.

*Parameters*:
- `path`: The file path to read.
- `cancellationToken`: Cancellation token to cancel the operation.

*Returns*: The file contents as a byte array.

*Exceptions*:
- `System.IO.FileNotFoundException`: Thrown when the file does not exist.
- `System.UnauthorizedAccessException`: Thrown when access is denied.

**CancellationToken)**

Reads the entire contents of a text file from the device.

*Parameters*:
- `path`: The file path to read.
- `cancellationToken`: Cancellation token to cancel the operation.

*Returns*: The file contents as a string.

*Exceptions*:
- `System.IO.FileNotFoundException`: Thrown when the file does not exist.
- `System.UnauthorizedAccessException`: Thrown when access is denied.

**CancellationToken)**

Writes data to a file on the device, creating it if necessary.

*Parameters*:
- `path`: The file path to write to.
- `content`: The content to write.
- `cancellationToken`: Cancellation token to cancel the operation.

*Exceptions*:
- `System.UnauthorizedAccessException`: Thrown when access is denied.
- `System.IO.IOException`: Thrown when an I/O error occurs.

**CancellationToken)**

Writes text to a file on the device, creating it if necessary.

*Parameters*:
- `path`: The file path to write to.
- `content`: The text content to write.
- `cancellationToken`: Cancellation token to cancel the operation.

*Exceptions*:
- `System.UnauthorizedAccessException`: Thrown when access is denied.
- `System.IO.IOException`: Thrown when an I/O error occurs.

---

