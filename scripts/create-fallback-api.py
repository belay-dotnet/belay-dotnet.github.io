#!/usr/bin/env python3
"""
Fallback API documentation generator
Creates basic API documentation when XML generation fails
"""

import os
from pathlib import Path

def create_fallback_api():
    """Create fallback API documentation"""
    
    # Ensure api/generated directory exists
    api_generated = Path("api/generated")
    api_generated.mkdir(parents=True, exist_ok=True)
    
    # Create basic documentation for each expected assembly
    assemblies = {
        "Belay.Core": {
            "description": "Core library providing device communication, method execution, and session management",
            "key_classes": [
                "Device - Main device connection and communication class",
                "TaskExecutor - Handles [Task] attribute method execution", 
                "EnhancedExecutor - Advanced method interception framework",
                "BaseExecutor - Base class for all method executors",
                "SerialDeviceCommunication - USB/Serial device communication",
                "SubprocessDeviceCommunication - Testing with MicroPython subprocess"
            ]
        },
        "Belay.Attributes": {
            "description": "Attribute definitions for marking methods for device execution",
            "key_classes": [
                "TaskAttribute - Execute methods as remote tasks with caching and timeout",
                "ThreadAttribute - Background thread execution on device",
                "SetupAttribute - Device initialization methods", 
                "TeardownAttribute - Device cleanup methods",
                "ThreadPriority - Priority levels for thread execution"
            ]
        },
        "Belay.Sync": {
            "description": "File synchronization and device file system operations",
            "key_classes": [
                "DeviceFileSystem - File operations on MicroPython device",
                "DeviceExtensions - Extension methods for device file operations"
            ]
        }
    }
    
    for assembly_name, info in assemblies.items():
        assembly_dir = api_generated / assembly_name
        assembly_dir.mkdir(exist_ok=True)
        
        with open(assembly_dir / "README.md", "w") as f:
            f.write(f"# {assembly_name} API Reference\n\n")
            f.write("*Fallback documentation - XML generation unavailable*\n\n")
            f.write(f"## Overview\n\n{info['description']}\n\n")
            f.write("## Key Classes\n\n")
            
            for class_info in info['key_classes']:
                f.write(f"- **{class_info}**\n")
            
            f.write(f"\n## Full Documentation\n\n")
            f.write("Complete API documentation with method signatures and detailed descriptions ")
            f.write("will be available when the .NET build pipeline is restored.\n\n")
    
    # Create main API index
    with open("api/index.md", "w") as f:
        f.write("# API Reference\n\n")
        f.write("*Using fallback documentation due to build issues*\n\n")
        f.write("## Generated Documentation\n\n")
        
        for assembly in sorted(assemblies.keys()):
            f.write(f"- **[{assembly}](./generated/{assembly}/README.md)** - {assembly} API documentation\n")
        
        f.write("""

## Quick Reference

### Core Classes
- **Device** - Main device connection and communication
- **TaskExecutor** - Handles [Task] attribute methods
- **EnhancedExecutor** - Advanced method interception framework
- **DeviceProxy** - Dynamic proxy for transparent method routing

### Attributes
- **TaskAttribute** - Execute methods as tasks with caching and timeout
- **ThreadAttribute** - Background thread execution
- **SetupAttribute** - Device initialization methods
- **TeardownAttribute** - Device cleanup methods

## Usage Examples

For practical examples, see the [Examples](/examples/) section.

## Note on Documentation Status

This documentation is currently using fallback content due to .NET build pipeline issues. 
Full XML-generated documentation will be restored once the build issues are resolved.
""")
    
    print("✅ Created fallback API documentation")

if __name__ == "__main__":
    create_fallback_api()