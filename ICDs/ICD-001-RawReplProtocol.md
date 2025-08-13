# ICD-001: Raw REPL Protocol Specification

**Version**: 1.0  
**Date**: 2025-01-13  
**Status**: Active  

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

### Raw-Paste Mode (for large transfers)
```
1. Send: 0x01 (ENTER_RAW)
2. Wait for: ">"
3. Send: 0x05, 0x01 (RAW_PASTE)
4. Wait for: window_size (2 bytes)
5. Send: data in chunks based on window size
6. Handle flow control bytes (0x01 = ready for more)
7. Send: 0x04 (EXECUTE)
8. Read: execution_result
```

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