import{_ as t,c as n,o,ag as i}from"./chunks/framework.CUqMdM43.js";const u=JSON.parse('{"title":"Class ServiceCollectionExtensions","description":"","frontmatter":{},"headers":[],"relativePath":"api/generated/Belay.Extensions.ServiceCollectionExtensions.md","filePath":"api/generated/Belay.Extensions.ServiceCollectionExtensions.md"}'),s={name:"api/generated/Belay.Extensions.ServiceCollectionExtensions.md"};function r(a,e,c,l,d,p){return o(),n("div",null,e[0]||(e[0]=[i(`<h1 id="class-servicecollectionextensions" tabindex="-1"><a id="Belay_Extensions_ServiceCollectionExtensions"></a> Class ServiceCollectionExtensions <a class="header-anchor" href="#class-servicecollectionextensions" aria-label="Permalink to &quot;&lt;a id=&quot;Belay_Extensions_ServiceCollectionExtensions&quot;&gt;&lt;/a&gt; Class ServiceCollectionExtensions&quot;">​</a></h1><p>Namespace: <a href="./Belay.Extensions.html">Belay.Extensions</a><br> Assembly: Belay.Extensions.dll</p><p>Extension methods for registering Belay.NET services with dependency injection.</p><div class="language-csharp vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">csharp</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> static</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ServiceCollectionExtensions</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h4 id="inheritance" tabindex="-1">Inheritance <a class="header-anchor" href="#inheritance" aria-label="Permalink to &quot;Inheritance&quot;">​</a></h4><p><a href="https://learn.microsoft.com/dotnet/api/system.object" target="_blank" rel="noreferrer">object</a> ← <a href="./Belay.Extensions.ServiceCollectionExtensions.html">ServiceCollectionExtensions</a></p><h4 id="inherited-members" tabindex="-1">Inherited Members <a class="header-anchor" href="#inherited-members" aria-label="Permalink to &quot;Inherited Members&quot;">​</a></h4><p><a href="https://learn.microsoft.com/dotnet/api/system.object.equals#system-object-equals(system-object)" target="_blank" rel="noreferrer">object.Equals(object?)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.object.equals#system-object-equals(system-object-system-object)" target="_blank" rel="noreferrer">object.Equals(object?, object?)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.object.gethashcode" target="_blank" rel="noreferrer">object.GetHashCode()</a>, <a href="https://learn.microsoft.com/dotnet/api/system.object.gettype" target="_blank" rel="noreferrer">object.GetType()</a>, <a href="https://learn.microsoft.com/dotnet/api/system.object.memberwiseclone" target="_blank" rel="noreferrer">object.MemberwiseClone()</a>, <a href="https://learn.microsoft.com/dotnet/api/system.object.referenceequals" target="_blank" rel="noreferrer">object.ReferenceEquals(object?, object?)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.object.tostring" target="_blank" rel="noreferrer">object.ToString()</a></p><h2 id="examples" tabindex="-1">Examples <a class="header-anchor" href="#examples" aria-label="Permalink to &quot;Examples&quot;">​</a></h2><p><strong>Basic Registration</strong></p><pre><code class="lang-csharp">// Program.cs or Startup.cs
public void ConfigureServices(IServiceCollection services)
{
    // Simple registration with defaults
    services.AddBelay();

    // With custom configuration
    services.AddBelay(options =&gt; {
        options.DefaultTimeoutMs = 10000;
        options.EnableCaching = true;
        options.MaxConcurrentOperations = 4;
    });
}</code></pre><p><strong>Configuration-based Registration</strong></p><pre><code class="lang-csharp">// appsettings.json
{
  &quot;Belay&quot;: {
    &quot;DefaultTimeoutMs&quot;: 15000,
    &quot;EnableCaching&quot;: true,
    &quot;DeviceDefaults&quot;: {
      &quot;SerialBaudRate&quot;: 115200,
      &quot;ConnectionRetries&quot;: 3
    }
  }
}

// Program.cs
public void ConfigureServices(IServiceCollection services)
{
    services.AddBelay(Configuration, &quot;Belay&quot;);
}</code></pre><p><strong>Full Enterprise Setup with Health Checks</strong></p><pre><code class="lang-csharp">public void ConfigureServices(IServiceCollection services)
{
    // Register all Belay services
    services.AddBelay(options =&gt; {
        options.DefaultTimeoutMs = 30000;
        options.EnableCaching = true;
    });

    // Add health checks for device monitoring
    services.AddBelayHealthChecks(healthOptions =&gt; {
        healthOptions.SystemHealthCheckTimeoutSeconds = 10;
        healthOptions.AddDeviceCheck(&quot;primary-sensor&quot;, &quot;COM3&quot;, timeoutSeconds: 5);
        healthOptions.AddDeviceCheck(&quot;backup-sensor&quot;, &quot;COM4&quot;, timeoutSeconds: 5);
        healthOptions.AddDeviceCheck(&quot;test-subprocess&quot;, &quot;micropython&quot;, timeoutSeconds: 15);
    });

    // Add custom executors
    services.AddBelayExecutors();
}

// Usage in controllers/services
public class SensorController : ControllerBase
{
    private readonly IDeviceFactory deviceFactory;

    public SensorController(IDeviceFactory deviceFactory)
    {
        this.deviceFactory = deviceFactory;
    }

    [HttpGet(&quot;temperature&quot;)]
    public async Task&lt;ActionResult&lt;float&gt;&gt; GetTemperature()
    {
        using var device = this.deviceFactory.CreateSerialDevice(&quot;COM3&quot;);
        await device.ConnectAsync();

        float temp = await device.ExecuteAsync&lt;float&gt;(@&quot;
            import machine
            sensor = machine.ADC(machine.Pin(26))
            reading = sensor.read_u16()
            (reading * 3.3 / 65535) * 100
        &quot;);

        return Ok(temp);
    }
}</code></pre><p><strong>Background Service Integration</strong></p><pre><code class="lang-csharp">public class DeviceMonitoringService : BackgroundService
{
    private readonly IServiceScopeFactory scopeFactory;
    private readonly ILogger&lt;DeviceMonitoringService&gt; logger;

    public DeviceMonitoringService(IServiceScopeFactory scopeFactory,
        ILogger&lt;DeviceMonitoringService&gt; logger)
    {
        this.scopeFactory = scopeFactory;
        this.logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            using var scope = this.scopeFactory.CreateScope();
            var deviceFactory = scope.ServiceProvider.GetBelayDeviceFactory();

            try
            {
                using var device = deviceFactory.CreateSerialDevice(&quot;COM3&quot;);
                await device.ConnectAsync(stoppingToken);

                var reading = await device.ExecuteAsync&lt;float&gt;(&quot;read_sensors()&quot;, stoppingToken);
                this.logger.LogInformation(&quot;Sensor reading: {Reading}&quot;, reading);
            }
            catch (Exception ex)
            {
                this.logger.LogError(ex, &quot;Failed to read sensors&quot;);
            }

            await Task.Delay(TimeSpan.FromMinutes(1), stoppingToken);
        }
    }
}

// Register background service
services.AddHostedService&lt;DeviceMonitoringService&gt;();</code></pre><h2 id="remarks" tabindex="-1">Remarks <a class="header-anchor" href="#remarks" aria-label="Permalink to &quot;Remarks&quot;">​</a></h2><p> These extensions provide multiple registration patterns for Belay.NET services, supporting both simple registration and comprehensive enterprise configurations with health checks, custom factories, and configuration binding. </p><h2 id="methods" tabindex="-1">Methods <a class="header-anchor" href="#methods" aria-label="Permalink to &quot;Methods&quot;">​</a></h2><p><a href="./Belay.Extensions.ServiceCollectionExtensions.AddBelay.html#Belay_Extensions_ServiceCollectionExtensions_AddBelay_Microsoft_Extensions_DependencyInjection_IServiceCollection_">AddBelay(IServiceCollection)</a></p><p>Adds all Belay.NET services to the service collection with default configuration.</p><p><a href="./Belay.Extensions.ServiceCollectionExtensions.AddBelay.html#Belay_Extensions_ServiceCollectionExtensions_AddBelay_Microsoft_Extensions_DependencyInjection_IServiceCollection_System_Action_Belay_Extensions_Configuration_BelayConfiguration__">AddBelay(IServiceCollection, Action&lt;BelayConfiguration&gt;)</a></p><p>Adds all Belay.NET services to the service collection with configuration.</p><p><a href="./Belay.Extensions.ServiceCollectionExtensions.AddBelay.html#Belay_Extensions_ServiceCollectionExtensions_AddBelay_Microsoft_Extensions_DependencyInjection_IServiceCollection_Microsoft_Extensions_Configuration_IConfiguration_System_String_">AddBelay(IServiceCollection, IConfiguration, string)</a></p><p>Adds all Belay.NET services to the service collection with IConfiguration binding.</p><p><a href="./Belay.Extensions.ServiceCollectionExtensions.AddBelayCore.html#Belay_Extensions_ServiceCollectionExtensions_AddBelayCore_Microsoft_Extensions_DependencyInjection_IServiceCollection_">AddBelayCore(IServiceCollection)</a></p><p>Adds Belay.NET core services to the service collection.</p><p><a href="./Belay.Extensions.ServiceCollectionExtensions.AddBelayExecutors.html#Belay_Extensions_ServiceCollectionExtensions_AddBelayExecutors_Microsoft_Extensions_DependencyInjection_IServiceCollection_">AddBelayExecutors(IServiceCollection)</a></p><p>Adds Belay.NET executor services as singletons. Note: In the simplified architecture, executors are accessed directly from Device instances rather than being created through dependency injection.</p><p><a href="./Belay.Extensions.ServiceCollectionExtensions.AddBelayFactories.html#Belay_Extensions_ServiceCollectionExtensions_AddBelayFactories_Microsoft_Extensions_DependencyInjection_IServiceCollection_">AddBelayFactories(IServiceCollection)</a></p><p>Adds Belay.NET factory services to the service collection.</p><p><a href="./Belay.Extensions.ServiceCollectionExtensions.AddBelayHealthChecks.html#Belay_Extensions_ServiceCollectionExtensions_AddBelayHealthChecks_Microsoft_Extensions_DependencyInjection_IServiceCollection_System_Action_Belay_Extensions_BelayHealthCheckOptions__">AddBelayHealthChecks(IServiceCollection, Action&lt;BelayHealthCheckOptions&gt;?)</a></p><p>Adds Belay.NET health checks to the service collection.</p><p><a href="./Belay.Extensions.ServiceCollectionExtensions.GetBelayDeviceFactory.html#Belay_Extensions_ServiceCollectionExtensions_GetBelayDeviceFactory_System_IServiceProvider_">GetBelayDeviceFactory(IServiceProvider)</a></p><p>Creates a service scope and resolves a device factory.</p><p><a href="./Belay.Extensions.ServiceCollectionExtensions.GetBelayExecutorFactory.html#Belay_Extensions_ServiceCollectionExtensions_GetBelayExecutorFactory_System_IServiceProvider_">GetBelayExecutorFactory(IServiceProvider)</a></p><p>Creates a service scope and resolves an executor factory.</p>`,38)]))}const v=t(s,[["render",r]]);export{u as __pageData,v as default};
