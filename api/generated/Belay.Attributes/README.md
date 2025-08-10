# Belay.Attributes API Reference

Comprehensive API documentation generated from XML documentation comments.

## Table of Contents

### Belay.Attributes

- [SetupAttribute](#belayattributessetupattribute)
- [TaskAttribute](#belayattributestaskattribute)
- [TeardownAttribute](#belayattributesteardownattribute)
- [ThreadAttribute](#belayattributesthreadattribute)
- [ThreadPriority](#belayattributesthreadpriority)


---

## Belay.Attributes

### Belay.Attributes.SetupAttribute {#belayattributessetupattribute}

Marks a method to be executed once during device initialization. Methods decorated with this attribute are automatically called when the device connects and establishes communication, providing a hook for device-specific setup.

**Example**:
Basic Device Setup public class TemperatureSensor : Device { [Setup] private async Task InitializeSensorAsync() { // Runs automatically when device connects await ExecuteAsync(@" import machine import time # Configure temperature sensor sensor_pin = machine.Pin(26) temp_adc = machine.ADC(sensor_pin) # Set reference voltage machine.ADC.ATTN_11DB = 3 # 3.3V range temp_adc.atten(machine.ADC.ATTN_11DB) print('Temperature sensor initialized') "); } } Multi-Step Setup public class RobotController : Device { [Setup] private async Task InitializeHardwareAsync() { await ExecuteAsync(@" import machine # Initialize motor pins motor_left = machine.PWM(machine.Pin(12)) motor_right = machine.PWM(machine.Pin(13)) motor_left.freq(1000) motor_right.freq(1000) "); } [Setup] private async Task LoadCalibrationAsync() { await ExecuteAsync(@" # Load calibration data from file try: with open('calibration.json', 'r') as f: calibration = json.loads(f.read()) except: # Use defaults if no calibration file calibration = {'motor_offset': 0, 'turn_rate': 1.0} "); } } Setup with Error Handling public class DisplayController : Device { [Setup] private async Task InitializeDisplayAsync() { await ExecuteAsync(@" import machine import ssd1306 try: i2c = machine.I2C(0, scl=machine.Pin(22), sda=machine.Pin(21)) display = ssd1306.SSD1306_I2C(128, 64, i2c) display.fill(0) display.text('Ready', 0, 0, 1) display.show() print('Display initialized successfully') except Exception as e: print(f'Display initialization failed: {e}') raise # Re-raise to fail the setup "); } }
```csharp
public class TemperatureSensor : Device
             {
                 [Setup]
                 private async Task InitializeSensorAsync()
                 {
                     // Runs automatically when device connects
                     await ExecuteAsync(@"
                         import machine
                         import time
            
                         # Configure temperature sensor
                         sensor_pin = machine.Pin(26)
                         temp_adc = machine.ADC(sensor_pin)
            
                         # Set reference voltage
                         machine.ADC.ATTN_11DB = 3  # 3.3V range
                         temp_adc.atten(machine.ADC.ATTN_11DB)
            
                         print('Temperature sensor initialized')
                     ");
                 }
             }
```

```csharp
public class RobotController : Device
             {
                 [Setup]
                 private async Task InitializeHardwareAsync()
                 {
                     await ExecuteAsync(@"
                         import machine
            
                         # Initialize motor pins
                         motor_left = machine.PWM(machine.Pin(12))
                         motor_right = machine.PWM(machine.Pin(13))
                         motor_left.freq(1000)
                         motor_right.freq(1000)
                     ");
                 }
            
                 [Setup]
                 private async Task LoadCalibrationAsync()
                 {
                     await ExecuteAsync(@"
                         # Load calibration data from file
                         try:
                             with open('calibration.json', 'r') as f:
                                 calibration = json.loads(f.read())
                         except:
                             # Use defaults if no calibration file
                             calibration = {'motor_offset': 0, 'turn_rate': 1.0}
                     ");
                 }
             }
```

```csharp
public class DisplayController : Device
             {
                 [Setup]
                 private async Task InitializeDisplayAsync()
                 {
                     await ExecuteAsync(@"
                         import machine
                         import ssd1306
            
                         try:
                             i2c = machine.I2C(0, scl=machine.Pin(22), sda=machine.Pin(21))
                             display = ssd1306.SSD1306_I2C(128, 64, i2c)
                             display.fill(0)
                             display.text('Ready', 0, 0, 1)
                             display.show()
                             print('Display initialized successfully')
                         except Exception as e:
                             print(f'Display initialization failed: {e}')
                             raise  # Re-raise to fail the setup
                     ");
                 }
             }
```


#### Properties

**Critical**

Gets or sets a value indicating whether gets or sets whether setup failure should be treated as a critical error. When true, setup failure will cause device connection to fail completely. When false, setup failure will be logged but connection will proceed.

**Order**

Gets or sets the order in which this setup method should be executed relative to other setup methods in the same class.

**TimeoutMs**

Gets or sets the timeout for setup method execution in milliseconds. Setup methods may need longer timeouts for hardware initialization.

#### Methods

**#ctor**

Initializes a new instance of the

**ToString**

Returns a string that represents the current

*Returns*: A string that represents the current attribute configuration.

---

### Belay.Attributes.TaskAttribute {#belayattributestaskattribute}

Marks a method as a remote task to be executed on a MicroPython device. Methods decorated with this attribute will have their code deployed to the connected device and executed remotely when called from the host application.

**Example**:
Basic Task Method public class TemperatureSensor : Device { [Task] public async Task&lt;float&gt; ReadTemperatureAsync() { // This code executes on the MicroPython device return await ExecuteAsync&lt;float&gt;(@" import machine import time # Read from analog temperature sensor adc = machine.ADC(machine.Pin(26)) reading = adc.read_u16() voltage = reading * 3.3 / 65535 temperature = 27 - (voltage - 0.706) / 0.001721 temperature "); } } Task with Parameters public class LEDController : Device { [Task] public async Task SetBrightnessAsync(int pin, float brightness) { // Parameters are automatically marshaled to the device await ExecuteAsync($@" import machine led = machine.PWM(machine.Pin({pin})) led.freq(1000) led.duty_u16(int({brightness} * 65535)) "); } } Complex Return Types public class EnvironmentSensor : Device { [Task] public async Task&lt;SensorReading&gt; GetReadingsAsync() { return await ExecuteAsync&lt;SensorReading&gt;(@" import json # Read multiple sensors temp = read_temperature() humidity = read_humidity() pressure = read_pressure() # Return as JSON for automatic deserialization json.dumps({ 'temperature': temp, 'humidity': humidity, 'pressure': pressure, 'timestamp': time.ticks_ms() }) "); } } public class SensorReading { public float Temperature { get; set; } public float Humidity { get; set; } public float Pressure { get; set; } public long Timestamp { get; set; } }
```csharp
public class TemperatureSensor : Device
             {
                 [Task]
                 public async Task&lt;float&gt; ReadTemperatureAsync()
                 {
                     // This code executes on the MicroPython device
                     return await ExecuteAsync&lt;float&gt;(@"
                         import machine
                         import time
            
                         # Read from analog temperature sensor
                         adc = machine.ADC(machine.Pin(26))
                         reading = adc.read_u16()
                         voltage = reading * 3.3 / 65535
                         temperature = 27 - (voltage - 0.706) / 0.001721
                         temperature
                     ");
                 }
             }
```

```csharp
public class LEDController : Device
             {
                 [Task]
                 public async Task SetBrightnessAsync(int pin, float brightness)
                 {
                     // Parameters are automatically marshaled to the device
                     await ExecuteAsync($@"
                         import machine
                         led = machine.PWM(machine.Pin({pin}))
                         led.freq(1000)
                         led.duty_u16(int({brightness} * 65535))
                     ");
                 }
             }
```

```csharp
public class EnvironmentSensor : Device
             {
                 [Task]
                 public async Task&lt;SensorReading&gt; GetReadingsAsync()
                 {
                     return await ExecuteAsync&lt;SensorReading&gt;(@"
                         import json
                         # Read multiple sensors
                         temp = read_temperature()
                         humidity = read_humidity()
                         pressure = read_pressure()
            
                         # Return as JSON for automatic deserialization
                         json.dumps({
                             'temperature': temp,
                             'humidity': humidity,
                             'pressure': pressure,
                             'timestamp': time.ticks_ms()
                         })
                     ");
                 }
             }
            
             public class SensorReading
             {
                 public float Temperature { get; set; }
                 public float Humidity { get; set; }
                 public float Pressure { get; set; }
                 public long Timestamp { get; set; }
             }
```


#### Properties

**Cache**

Gets or sets a value indicating whether gets or sets whether the method should be cached on the device. When true, the method code is deployed once and reused for subsequent calls. When false, the code is sent for each invocation.

**Exclusive**

Gets or sets a value indicating whether gets or sets whether this task method requires exclusive access to the device. When true, ensures no other methods execute concurrently on the device.

**Name**

Gets or sets the name of the method on the device. If not specified, the C# method name will be used.

**TimeoutMs**

Gets or sets the timeout for method execution in milliseconds. If not specified, uses the default timeout configured for the device.

#### Methods

**#ctor**

Initializes a new instance of the

**ToString**

Returns a string that represents the current

*Returns*: A string that represents the current attribute configuration.

---

### Belay.Attributes.TeardownAttribute {#belayattributesteardownattribute}

Marks a method to be executed during device disconnection or disposal. Methods decorated with this attribute are automatically called when the device connection is terminated, providing cleanup and resource management capabilities.

**Example**:
Hardware Resource Cleanup public class MotorController : Device { [Setup] private async Task InitializeMotorsAsync() { await ExecuteAsync(@" import machine motor_left = machine.PWM(machine.Pin(12)) motor_right = machine.PWM(machine.Pin(13)) motor_left.freq(1000) motor_right.freq(1000) "); } [Teardown] private async Task StopMotorsAsync() { await ExecuteAsync(@" # Safely stop motors before disconnect try: if 'motor_left' in globals(): motor_left.duty_u16(0) motor_left.deinit() if 'motor_right' in globals(): motor_right.duty_u16(0) motor_right.deinit() print('Motors stopped safely') except Exception as e: print(f'Motor cleanup error: {e}') "); } } State Persistence public class DataLogger : Device { [Teardown] private async Task SaveDataAsync() { await ExecuteAsync(@" import json try: # Save any pending data before disconnect if 'pending_data' in globals() and pending_data: with open('data_backup.json', 'w') as f: json.dump(pending_data, f) print(f'Saved {len(pending_data)} pending records') # Update status file status = { 'last_disconnect': time.time(), 'clean_shutdown': True } with open('status.json', 'w') as f: json.dump(status, f) except Exception as e: print(f'Data save error: {e}') "); } } Multi-Stage Teardown public class ComplexDevice : Device { [Teardown(Order = 1)] // Execute first private async Task StopBackgroundTasksAsync() { await ExecuteAsync(@" # Stop background threads monitoring_active = False data_collection_active = False # Wait briefly for threads to notice import time time.sleep_ms(100) "); } [Teardown(Order = 2)] // Execute second private async Task SaveStateAsync() { await ExecuteAsync(@" # Save current state save_device_state() flush_data_buffers() "); } [Teardown(Order = 3)] // Execute last private async Task CleanupHardwareAsync() { await ExecuteAsync(@" # Final hardware cleanup disable_all_outputs() release_hardware_resources() "); } } Error-Resilient Teardown public class RobustDevice : Device { [Teardown(IgnoreErrors = true)] private async Task BestEffortCleanupAsync() { await ExecuteAsync(@" # Clean up everything we can, ignore individual failures cleanup_tasks = [ lambda: cleanup_sensors(), lambda: stop_background_threads(), lambda: save_critical_data(), lambda: disable_hardware() ] for task in cleanup_tasks: try: task() except Exception as e: print(f'Cleanup task failed: {e}') print('Best-effort cleanup completed') "); } }
```csharp
public class MotorController : Device
             {
                 [Setup]
                 private async Task InitializeMotorsAsync()
                 {
                     await ExecuteAsync(@"
                         import machine
                         motor_left = machine.PWM(machine.Pin(12))
                         motor_right = machine.PWM(machine.Pin(13))
                         motor_left.freq(1000)
                         motor_right.freq(1000)
                     ");
                 }
            
                 [Teardown]
                 private async Task StopMotorsAsync()
                 {
                     await ExecuteAsync(@"
                         # Safely stop motors before disconnect
                         try:
                             if 'motor_left' in globals():
                                 motor_left.duty_u16(0)
                                 motor_left.deinit()
                             if 'motor_right' in globals():
                                 motor_right.duty_u16(0)
                                 motor_right.deinit()
                             print('Motors stopped safely')
                         except Exception as e:
                             print(f'Motor cleanup error: {e}')
                     ");
                 }
             }
```

```csharp
public class DataLogger : Device
             {
                 [Teardown]
                 private async Task SaveDataAsync()
                 {
                     await ExecuteAsync(@"
                         import json
            
                         try:
                             # Save any pending data before disconnect
                             if 'pending_data' in globals() and pending_data:
                                 with open('data_backup.json', 'w') as f:
                                     json.dump(pending_data, f)
                                 print(f'Saved {len(pending_data)} pending records')
            
                             # Update status file
                             status = {
                                 'last_disconnect': time.time(),
                                 'clean_shutdown': True
                             }
                             with open('status.json', 'w') as f:
                                 json.dump(status, f)
            
                         except Exception as e:
                             print(f'Data save error: {e}')
                     ");
                 }
             }
```

```csharp
public class ComplexDevice : Device
             {
                 [Teardown(Order = 1)] // Execute first
                 private async Task StopBackgroundTasksAsync()
                 {
                     await ExecuteAsync(@"
                         # Stop background threads
                         monitoring_active = False
                         data_collection_active = False
            
                         # Wait briefly for threads to notice
                         import time
                         time.sleep_ms(100)
                     ");
                 }
            
                 [Teardown(Order = 2)] // Execute second
                 private async Task SaveStateAsync()
                 {
                     await ExecuteAsync(@"
                         # Save current state
                         save_device_state()
                         flush_data_buffers()
                     ");
                 }
            
                 [Teardown(Order = 3)] // Execute last
                 private async Task CleanupHardwareAsync()
                 {
                     await ExecuteAsync(@"
                         # Final hardware cleanup
                         disable_all_outputs()
                         release_hardware_resources()
                     ");
                 }
             }
```

```csharp
public class RobustDevice : Device
             {
                 [Teardown(IgnoreErrors = true)]
                 private async Task BestEffortCleanupAsync()
                 {
                     await ExecuteAsync(@"
                         # Clean up everything we can, ignore individual failures
                         cleanup_tasks = [
                             lambda: cleanup_sensors(),
                             lambda: stop_background_threads(),
                             lambda: save_critical_data(),
                             lambda: disable_hardware()
                         ]
            
                         for task in cleanup_tasks:
                             try:
                                 task()
                             except Exception as e:
                                 print(f'Cleanup task failed: {e}')
            
                         print('Best-effort cleanup completed')
                     ");
                 }
             }
```


#### Properties

**Critical**

Gets or sets a value indicating whether gets or sets whether this teardown method is critical and must execute even in emergency disconnection scenarios.

**IgnoreErrors**

Gets or sets a value indicating whether gets or sets whether errors in this teardown method should be ignored. When true, exceptions from this method will be logged but will not prevent other teardown methods from executing or the disconnection from proceeding.

**Order**

Gets or sets the order in which this teardown method should be executed relative to other teardown methods in the same class.

**TimeoutMs**

Gets or sets the timeout for teardown method execution in milliseconds. Teardown operations have limited time to complete before forcible disconnection.

#### Methods

**#ctor**

Initializes a new instance of the

**ToString**

Returns a string that represents the current

*Returns*: A string that represents the current attribute configuration.

---

### Belay.Attributes.ThreadAttribute {#belayattributesthreadattribute}

Marks a method to be executed as a background thread on the MicroPython device. Methods decorated with this attribute run asynchronously on the device without blocking the host application or other device operations.

**Example**:
Continuous Sensor Monitoring public class EnvironmentMonitor : Device { [Thread] public async Task StartContinuousMonitoringAsync(int intervalMs = 1000) { await ExecuteAsync($@" import _thread import time import machine def monitor_environment(): adc = machine.ADC(machine.Pin(26)) while globals().get('monitoring_active', True): try: # Read sensor values temp = read_temperature(adc) humidity = read_humidity() # Log or transmit data print(f'Temp: {{temp}}C, Humidity: {{humidity}}%') time.sleep_ms({intervalMs}) except Exception as e: print(f'Monitoring error: {{e}}') time.sleep_ms(5000) # Back off on error # Start monitoring thread _thread.start_new_thread(monitor_environment, ()) "); } [Task] public async Task StopMonitoringAsync() { await ExecuteAsync("monitoring_active = False"); } } Event-Driven Responses public class ButtonHandler : Device { [Thread] public async Task StartButtonWatcherAsync() { await ExecuteAsync(@" import _thread import machine import time def watch_buttons(): button1 = machine.Pin(2, machine.Pin.IN, machine.Pin.PULL_UP) button2 = machine.Pin(3, machine.Pin.IN, machine.Pin.PULL_UP) last_state = [True, True] # Pulled up initially while globals().get('button_watching', True): current_state = [button1.value(), button2.value()] # Check for button presses (high to low transition) for i, (last, current) in enumerate(zip(last_state, current_state)): if last and not current: # Button pressed print(f'Button {i+1} pressed!') handle_button_press(i+1) last_state = current_state time.sleep_ms(50) # 50ms polling _thread.start_new_thread(watch_buttons, ()) "); } } Watchdog and Health Monitoring public class SystemMonitor : Device { [Thread(Name = "system_watchdog")] public async Task StartSystemWatchdogAsync() { await ExecuteAsync(@" import _thread import machine import gc import time def system_watchdog(): last_heartbeat = time.ticks_ms() while globals().get('watchdog_active', True): try: current_time = time.ticks_ms() # Check system health free_mem = gc.mem_free() if free_mem &lt; 1000: # Low memory warning print(f'WARNING: Low memory: {{free_mem}} bytes') gc.collect() # Check for system heartbeat if time.ticks_diff(current_time, last_heartbeat) &gt; 30000: print('WARNING: No heartbeat for 30 seconds') # Update heartbeat if main loop is responsive if globals().get('system_heartbeat', 0) &gt; last_heartbeat: last_heartbeat = globals()['system_heartbeat'] time.sleep_ms(5000) # Check every 5 seconds except Exception as e: print(f'Watchdog error: {e}') time.sleep_ms(10000) # Back off on error _thread.start_new_thread(system_watchdog, ()) "); } }
```csharp
public class EnvironmentMonitor : Device
             {
                 [Thread]
                 public async Task StartContinuousMonitoringAsync(int intervalMs = 1000)
                 {
                     await ExecuteAsync($@"
                         import _thread
                         import time
                         import machine
            
                         def monitor_environment():
                             adc = machine.ADC(machine.Pin(26))
                             while globals().get('monitoring_active', True):
                                 try:
                                     # Read sensor values
                                     temp = read_temperature(adc)
                                     humidity = read_humidity()
            
                                     # Log or transmit data
                                     print(f'Temp: {{temp}}C, Humidity: {{humidity}}%')
            
                                     time.sleep_ms({intervalMs})
                                 except Exception as e:
                                     print(f'Monitoring error: {{e}}')
                                     time.sleep_ms(5000)  # Back off on error
            
                         # Start monitoring thread
                         _thread.start_new_thread(monitor_environment, ())
                     ");
                 }
            
                 [Task]
                 public async Task StopMonitoringAsync()
                 {
                     await ExecuteAsync("monitoring_active = False");
                 }
             }
```

```csharp
public class ButtonHandler : Device
             {
                 [Thread]
                 public async Task StartButtonWatcherAsync()
                 {
                     await ExecuteAsync(@"
                         import _thread
                         import machine
                         import time
            
                         def watch_buttons():
                             button1 = machine.Pin(2, machine.Pin.IN, machine.Pin.PULL_UP)
                             button2 = machine.Pin(3, machine.Pin.IN, machine.Pin.PULL_UP)
            
                             last_state = [True, True]  # Pulled up initially
            
                             while globals().get('button_watching', True):
                                 current_state = [button1.value(), button2.value()]
            
                                 # Check for button presses (high to low transition)
                                 for i, (last, current) in enumerate(zip(last_state, current_state)):
                                     if last and not current:  # Button pressed
                                         print(f'Button {i+1} pressed!')
                                         handle_button_press(i+1)
            
                                 last_state = current_state
                                 time.sleep_ms(50)  # 50ms polling
            
                         _thread.start_new_thread(watch_buttons, ())
                     ");
                 }
             }
```

```csharp
public class SystemMonitor : Device
             {
                 [Thread(Name = "system_watchdog")]
                 public async Task StartSystemWatchdogAsync()
                 {
                     await ExecuteAsync(@"
                         import _thread
                         import machine
                         import gc
                         import time
            
                         def system_watchdog():
                             last_heartbeat = time.ticks_ms()
            
                             while globals().get('watchdog_active', True):
                                 try:
                                     current_time = time.ticks_ms()
            
                                     # Check system health
                                     free_mem = gc.mem_free()
                                     if free_mem &lt; 1000:  # Low memory warning
                                         print(f'WARNING: Low memory: {{free_mem}} bytes')
                                         gc.collect()
            
                                     # Check for system heartbeat
                                     if time.ticks_diff(current_time, last_heartbeat) &gt; 30000:
                                         print('WARNING: No heartbeat for 30 seconds')
            
                                     # Update heartbeat if main loop is responsive
                                     if globals().get('system_heartbeat', 0) &gt; last_heartbeat:
                                         last_heartbeat = globals()['system_heartbeat']
            
                                     time.sleep_ms(5000)  # Check every 5 seconds
            
                                 except Exception as e:
                                     print(f'Watchdog error: {e}')
                                     time.sleep_ms(10000)  # Back off on error
            
                         _thread.start_new_thread(system_watchdog, ())
                     ");
                 }
             }
```


#### Properties

**AutoRestart**

Gets or sets a value indicating whether gets or sets whether the thread should automatically restart if it terminates unexpectedly. When true, the thread will be monitored and restarted if it exits due to an error.

**MaxRuntimeMs**

Gets or sets the maximum runtime for the thread in milliseconds. If specified, the thread will be automatically terminated after this duration.

**Name**

Gets or sets the name of the thread for identification and management. If not specified, a name is automatically generated based on the method name.

**Priority**

Gets or sets the priority level for thread execution. Higher priority threads may receive more CPU time on capable platforms.

#### Methods

**#ctor**

Initializes a new instance of the

**ToString**

Returns a string that represents the current

*Returns*: A string that represents the current attribute configuration.

---

### Belay.Attributes.ThreadPriority {#belayattributesthreadpriority}

Defines the priority levels for thread execution.

**Remarks**: Thread priority is a hint to the scheduler and may not be supported on all MicroPython platforms. Actual scheduling behavior depends on the underlying platform and available threading implementation.

#### Fields

**High**

High priority thread for time-critical operations.

**Low**

Low priority thread for background tasks.

**Normal**

Normal priority thread for standard operations.

---

