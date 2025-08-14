# ICD-001: Raw REPL Protocol Specification

**Version**: 2.0  
**Date**: 2025-01-13  
**Status**: Active  
**Updated**: 2025-08-14 - Added sophisticated protocol features  

## Overview

This document specifies the Raw REPL (Read-Eval-Print Loop) protocol for MicroPython device communication. This protocol replaces the complex abstraction layers with a simple, well-documented interface.

## Protocol States

### NORMAL Mode
- Default interactive REPL state
- Commands terminated by newline
- Exit with Ctrl-D (0x04)

### RAW Mode  
- Programmatic execution mode
- Entered via Ctrl-A (0x01)
- Commands terminated by Ctrl-D (0x04)
- Exits to NORMAL on Ctrl-B (0x02)

### RAW-PASTE Mode
- Enhanced RAW mode with flow control
- Handles large code transfers efficiently
- Uses window-based flow control

## Control Characters

| Byte | Name | Function |
|------|------|----------|
| 0x01 | ENTER_RAW | Enter raw mode |
| 0x02 | EXIT_RAW | Exit raw mode to normal |
| 0x03 | INTERRUPT | Interrupt execution (Ctrl-C) |
| 0x04 | EXECUTE | Execute code / soft reset |
| 0x05 | RAW_PASTE | Enter raw-paste mode |

## Protocol Sequences

### Basic Code Execution
```
1. Send: 0x01 (ENTER_RAW)
2. Wait for: "raw REPL; CTRL-B to exit\r\n>"
3. Send: python_code
4. Send: 0x04 (EXECUTE)
5. Read: execution_result
6. Send: 0x02 (EXIT_RAW)
```

### Sophisticated Raw-Paste Mode (AdaptiveRawReplProtocol)

For large code transfers and enhanced performance, Belay.NET implements Raw-Paste mode:

```
1. Send: 0x05, 'A', 0x01 (RAW_PASTE initialization)
2. Wait for: Window size response
3. Send: Code in chunks based on window size  
4. Handle: Flow control bytes (0x01 for continue)
5. Send: 0x04 (End of data)
6. Read: Execution results with flow control
7. Send: 0x02 (EXIT_RAW)
```

#### Flow Control Protocol

- **Window Size Negotiation**: Device advertises maximum buffer size
- **Acknowledgment Protocol**: Device sends 0x01 when ready for more data
- **Dynamic Chunking**: Code automatically split based on device capabilities
- **Adaptive Fallback**: Automatic switch to basic Raw REPL if paste mode fails

#### Device Capability Detection

The adaptive protocol automatically detects:
- Raw-Paste mode support
- Optimal window sizes (typically 32-512 bytes)
- Device-specific timing requirements
- Flow control reliability

## Response Patterns

### Success Response
```
OK\x04\x04>
[output_data]
\x04>
```

### Error Response  
```
OK\x04\x04>
Traceback (most recent call last):
  File "<stdin>", line X, in <module>
[error_details]
\x04>
```

## Flow Control

- Device sends 0x01 when ready for more data
- Client must wait for flow control before sending next chunk
- Window size determines maximum unacknowledged bytes

## Implementation Notes

- All operations are sequential (MicroPython is single-threaded)
- No concurrent execution support
- Device state resets on disconnect/error
- Timeout handling is client responsibility

## Error Conditions

| Condition | Behavior | Recovery |
|-----------|----------|----------|
| Parse Error | Returns traceback | Continue |
| Runtime Error | Returns traceback | Continue |  
| Memory Error | Soft reset | Reconnect |
| Hardware Error | Device reset | Reconnect |

## Simple C# Implementation

```csharp
public static class RawReplProtocol 
{
    public const byte ENTER_RAW = 0x01;
    public const byte EXIT_RAW = 0x02;
    public const byte INTERRUPT = 0x03;
    public const byte EXECUTE = 0x04;
    public const byte RAW_PASTE = 0x05;
    
    public static async Task<string> ExecuteCode(Stream connection, string pythonCode)
    {
        // Enter raw mode
        await connection.WriteAsync([ENTER_RAW]);
        await WaitForPrompt(connection, ">");
        
        // Send code
        await connection.WriteAsync(Encoding.UTF8.GetBytes(pythonCode));
        
        // Execute
        await connection.WriteAsync([EXECUTE]);
        
        // Read result
        var result = await ReadUntilPrompt(connection);
        
        // Exit raw mode
        await connection.WriteAsync([EXIT_RAW]);
        
        return result;
    }
}
```

This protocol specification replaces all executor abstractions, proxy patterns, and communication interfaces with a simple, documented approach that directly reflects MicroPython's actual behavior.