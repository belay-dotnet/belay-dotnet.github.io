---
layout: home

hero:
  name: "Belay.NET"
  text: "Bridge .NET and MicroPython Seamlessly"
  tagline: The enterprise-ready library that transforms IoT development—write C# code that executes directly on microcontrollers with zero friction.
  image:
    src: /logo.svg
    alt: Belay.NET
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/belay-dotnet/Belay.NET

features:
  - icon: 🚀
    title: Zero Configuration
    details: Connect and control devices in seconds with automatic device detection and protocol negotiation.
  
  - icon: 🎯
    title: Type-Safe Remote Execution
    details: Full IntelliSense and compile-time safety for remote code with strongly-typed return values.
    
  - icon: ⚡
    title: Async First
    details: Modern async/await patterns throughout the API with proper cancellation token support.
    
  - icon: 🏷️
    title: Attribute-Based Programming
    details: Decorate methods to run seamlessly on devices with [Task], [Setup], [Teardown], and [Thread] attributes.
    
  - icon: 📦
    title: Dependency Injection Ready
    details: First-class DI support with Microsoft.Extensions including configuration, health checks, and factory patterns.
    
  - icon: 🔍
    title: Built-in Monitoring
    details: Health checks, performance metrics, and comprehensive error handling with structured logging.
---

## Who Is This For?

<div class="audience-grid">
  <div class="audience-card">
    <div class="audience-icon">👩‍💻</div>
    <h3>.NET Developers</h3>
    <p>Leverage your existing C# skills to control hardware without learning embedded programming languages. Stay in your IDE with full IntelliSense and debugging support.</p>
  </div>
  
  <div class="audience-card">
    <div class="audience-icon">🏭</div>
    <h3>Enterprise Teams</h3>
    <p>Build scalable IoT solutions with enterprise features like dependency injection, health monitoring, and structured logging. Deploy with confidence using familiar .NET deployment patterns.</p>
  </div>
  
  <div class="audience-card">
    <div class="audience-icon">🎓</div>
    <h3>Educators & Students</h3>
    <p>Teach IoT concepts using familiar .NET tools and patterns. Focus on problem-solving instead of wrestling with low-level hardware programming.</p>
  </div>
  
  <div class="audience-card">
    <div class="audience-icon">🔬</div>
    <h3>Researchers</h3>
    <p>Rapidly prototype and iterate on hardware experiments. Write maintainable, testable code for research instruments and data collection systems.</p>
  </div>
</div>

## The Problem We Solve

**Traditional IoT development is fragmented.** You write C# for your backend, Python for your devices, JavaScript for your frontend. Context switching between languages slows development and increases bugs.

**Belay.NET unifies your stack.** Write everything in C#:
- 🎯 **One Language**: Use C# across your entire IoT application
- 🛡️ **Type Safety**: Catch errors at compile-time, not runtime  
- 🚀 **Familiar Tools**: Use Visual Studio, debugging, and NuGet packages
- 📈 **Enterprise Ready**: Built-in monitoring, health checks, and dependency injection

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

::: tip Real-World Impact
"Belay.NET cut our IoT prototype development time by 60%. Our team can now use the same C# patterns for both cloud services and hardware control." - **Enterprise Customer**
:::

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
/* Audience Grid */
.audience-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
}

.audience-card {
  text-align: center;
  padding: 2rem;
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  transition: transform 0.2s, box-shadow 0.2s;
}

.audience-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
}

.audience-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.audience-card h3 {
  margin: 0 0 1rem 0;
  color: var(--vp-c-brand-1);
  font-size: 1.25rem;
}

.audience-card p {
  margin: 0;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

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
  .audience-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .how-it-works {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .audience-card {
    padding: 1.5rem;
  }
}
</style>