---
layout: home

hero:
  name: "Belay.NET"
  text: "Connect C# Applications to Hardware Instantly"  
  tagline: A .NET library that lets your desktop applications communicate with MicroPython devices as easily as calling a method. No embedded programming knowledge required.
  image:
    src: /logo-dark.svg
    alt: Belay.NET
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/belay-dotnet/Belay.NET

---

## What Is Belay.NET?

**Belay.NET is a .NET library that bridges the gap between your C# desktop applications and MicroPython hardware.** Think of it as a communication layer that lets you treat microcontrollers like remote objects in your application.

Instead of learning embedded programming, writing firmware, or dealing with serial communication protocols, you simply:
- Install the NuGet package  
- Connect your MicroPython device via USB
- Write C# methods that execute Python code on the device
- Get strongly-typed results back in your application

It's designed for **C# developers who need to connect to hardware quickly** without becoming embedded systems experts.

## Key Features

- 🚀 **Zero Configuration**: Connect and control devices in seconds with automatic device detection and protocol negotiation.
- 🎯 **Type-Safe Remote Execution**: Full IntelliSense and compile-time safety for remote code with strongly-typed return values.
- ⚡ **Async First**: Modern async/await patterns throughout the API with proper cancellation token support.
- 🏷️ **Attribute-Based Programming**: Decorate methods to run seamlessly on devices with [Task], [Setup], [Teardown], and [Thread] attributes.
- 📦 **Dependency Injection Ready**: First-class DI support with Microsoft.Extensions including configuration, health checks, and factory patterns.
- 🔍 **Built-in Monitoring**: Health checks, performance metrics, and comprehensive error handling with structured logging.

## The Problem We Solve

**Connecting C# desktop applications to hardware is unnecessarily complex.** Traditional approaches require:

❌ Learning embedded programming languages  
❌ Writing and deploying firmware  
❌ Managing serial communication protocols  
❌ Handling device state and error conditions  
❌ Converting between data formats manually  

**Belay.NET eliminates this complexity:**

✅ **No firmware needed** - Works with standard MicroPython  
✅ **No serial protocols** - Handled automatically  
✅ **No embedded knowledge** - Write familiar C# code  
✅ **Type safety** - Get compile-time checking and IntelliSense  
✅ **Error handling** - Comprehensive exception management

## How It Works

<div class="how-it-works">
  <div class="step">
    <div class="step-number">1</div>
    <h4>Connect Your Device</h4>
    <p>Simply plug in your MicroPython device via USB. Belay.NET handles the communication protocol automatically.</p>
  </div>
  
  <div class="step">
    <div class="step-number">2</div>
    <h4>Write C# Code</h4>
    <p>Create C# classes that represent your hardware. Use attributes to mark methods that should run on the device.</p>
  </div>
  
  <div class="step">
    <div class="step-number">3</div>
    <h4>Execute Remotely</h4>
    <p>Call your C# methods normally. Belay.NET translates and executes them on the microcontroller, returning typed results.</p>
  </div>
</div>

## See It In Action

Transform complex hardware control into simple C# method calls:

```csharp
// Install: dotnet add package Belay.NET

public class SmartSensor : Device
{
    [Setup]
    public async Task InitializeAsync() =>
        await ExecuteAsync("from machine import Pin, ADC; sensor = ADC(Pin(26))");
        
    [Task(Cache = true, TimeoutMs = 5000)]
    public async Task<float> ReadTemperatureAsync() =>
        await ExecuteAsync<float>("sensor.read_u16() * 3.3 / 65536 * 100");
        
    [Task]
    public async Task<bool> SetLedAsync(bool state) =>
        await ExecuteAsync<bool>($"led.{'on' if state else 'off'}(); True");
}

// Use like any other .NET class—no hardware knowledge required
var sensor = new SmartSensor();
await sensor.ConnectAsync("COM3");
await sensor.InitializeAsync();

var temperature = await sensor.ReadTemperatureAsync();
Console.WriteLine($"Current temperature: {temperature}°C");
```

## Production-Ready Features

### For Individual Developers
- **Zero Configuration**: Works out of the box with popular development boards
- **Rich IDE Support**: Full IntelliSense, debugging, and error checking  
- **Type Safety**: Strongly-typed remote execution with compile-time validation
- **Async/Await**: Modern async patterns for responsive applications

### For Enterprise Teams  
- **Dependency Injection**: Full Microsoft.Extensions.DependencyInjection integration
- **Health Monitoring**: Built-in health checks and performance metrics
- **Configuration Management**: Structured configuration with validation
- **Error Handling**: Comprehensive exception hierarchy with device error mapping
- **Session Management**: Advanced connection pooling and lifecycle management
- **Structured Logging**: Integration with Microsoft.Extensions.Logging

## Use Cases We Enable

<div class="use-cases">
  <div class="use-case">
    <h4>🏭 Industrial Automation</h4>
    <p>Control PLCs, sensors, and actuators from .NET applications. Build SCADA systems with familiar tools and deployment patterns.</p>
  </div>
  
  <div class="use-case">
    <h4>🏠 Smart Home Systems</h4>
    <p>Create intelligent home automation with ASP.NET Core backends that directly control IoT devices. Build dashboards with Blazor or React.</p>
  </div>
  
  <div class="use-case">
    <h4>📊 Data Collection</h4>
    <p>Build research instruments and monitoring systems. Store data directly to SQL Server, Entity Framework, or cloud databases.</p>
  </div>
  
  <div class="use-case">
    <h4>🎓 Educational Projects</h4>
    <p>Teach IoT concepts without the complexity of embedded programming. Students learn hardware control using familiar C# syntax.</p>
  </div>
</div>

### Supported Hardware

<div class="hardware-grid">
  <div class="hardware-card">
    <h4>🔌 Raspberry Pi Pico</h4>
    <p>Full MicroPython and CircuitPython support</p>
    <span class="status supported">Fully Supported</span>
  </div>
  
  <div class="hardware-card">
    <h4>📡 ESP32</h4>
    <p>WiFi-enabled microcontroller with rich peripherals</p>
    <span class="status supported">Fully Supported</span>
  </div>
  
  <div class="hardware-card">
    <h4>⚡ PyBoard</h4>
    <p>Original MicroPython development board</p>
    <span class="status supported">Fully Supported</span>
  </div>
  
  <div class="hardware-card">
    <h4>🐍 CircuitPython</h4>
    <p>Adafruit's education-focused Python variant</p>
    <span class="status beta">Beta Support</span>
  </div>
</div>

[View full compatibility matrix →](/hardware/compatibility)

## What's New in v0.2.0

- ✨ **Dependency Injection**: First-class Microsoft.Extensions.DependencyInjection support
- 🏥 **Health Checks**: Built-in system and device health monitoring
- ⚙️ **Configuration**: Comprehensive configuration management with validation
- 🏭 **Factory Patterns**: Clean abstractions for device and communicator creation
- 🔧 **Session Management**: Advanced session lifecycle and resource management
- ❌ **Exception Handling**: Unified exception hierarchy with device error mapping

[Read the full changelog →](/changelog)

<style>
/* How It Works Steps */
.how-it-works {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
}

.step {
  text-align: center;
  padding: 2rem 1rem;
}

.step-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  background: var(--vp-c-brand-1);
  color: white;
  border-radius: 50%;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.step h4 {
  margin: 0 0 1rem 0;
  color: var(--vp-c-text-1);
  font-size: 1.125rem;
}

.step p {
  margin: 0;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

/* Use Cases */
.use-cases {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.use-case {
  padding: 1.5rem;
  border-left: 4px solid var(--vp-c-brand-1);
  background: var(--vp-c-bg-soft);
  border-radius: 0 8px 8px 0;
}

.use-case h4 {
  margin: 0 0 0.75rem 0;
  color: var(--vp-c-text-1);
}

.use-case p {
  margin: 0;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

/* Hardware Grid */
.hardware-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
}

.hardware-card {
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  padding: 1.5rem;
  background: var(--vp-c-bg-soft);
}

.hardware-card h4 {
  margin: 0 0 0.5rem 0;
  color: var(--vp-c-text-1);
}

.hardware-card p {
  margin: 0 0 1rem 0;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.status {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}

.status.supported {
  background: var(--vp-c-green-soft);
  color: var(--vp-c-green-darker);
}

.status.beta {
  background: var(--vp-c-yellow-soft);
  color: var(--vp-c-yellow-darker);
}

/* Problem/Solution Section */
.vp-doc h2:has(+ p strong) {
  margin-bottom: 1rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .how-it-works {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>