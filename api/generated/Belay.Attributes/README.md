# Belay.Attributes API Reference

Auto-generated from XML documentation.

## Overview

5 types documented in this assembly.

### Belay.Attributes.SetupAttribute

Marks a method to be executed once during device initialization. Methods decorated with this attribute are automatically called when the device connects and establishes communication, providing a hook for device-specific setup.

---

### Belay.Attributes.TaskAttribute

Marks a method as a remote task to be executed on a MicroPython device. Methods decorated with this attribute will have their code deployed to the connected device and executed remotely when called from the host application.

---

### Belay.Attributes.TeardownAttribute

Marks a method to be executed during device disconnection or disposal. Methods decorated with this attribute are automatically called when the device connection is terminated, providing cleanup and resource management capabilities.

---

### Belay.Attributes.ThreadAttribute

Marks a method to be executed as a background thread on the MicroPython device. Methods decorated with this attribute run asynchronously on the device without blocking the host application or other device operations.

---

### Belay.Attributes.ThreadPriority

Defines the priority levels for thread execution.

---

