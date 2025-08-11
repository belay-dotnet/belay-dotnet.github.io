import{_ as t,c as a,o as n,ag as o}from"./chunks/framework.CUqMdM43.js";const h=JSON.parse('{"title":"Interface IExecutor","description":"","frontmatter":{},"headers":[],"relativePath":"api/generated/Belay.Core.Execution.IExecutor.md","filePath":"api/generated/Belay.Core.Execution.IExecutor.md"}'),c={name:"api/generated/Belay.Core.Execution.IExecutor.md"};function i(r,e,s,l,u,d){return n(),a("div",null,e[0]||(e[0]=[o(`<h1 id="interface-iexecutor" tabindex="-1"><a id="Belay_Core_Execution_IExecutor"></a> Interface IExecutor <a class="header-anchor" href="#interface-iexecutor" aria-label="Permalink to &quot;&lt;a id=&quot;Belay_Core_Execution_IExecutor&quot;&gt;&lt;/a&gt; Interface IExecutor&quot;">​</a></h1><p>Namespace: <a href="./Belay.Core.Execution.html">Belay.Core.Execution</a><br> Assembly: Belay.Core.dll</p><p>Interface for method executors that handle attribute-based method execution. Executors intercept method calls and apply attribute-specific policies.</p><div class="language-csharp vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">csharp</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> interface</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> IExecutor</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="examples" tabindex="-1">Examples <a class="header-anchor" href="#examples" aria-label="Permalink to &quot;Examples&quot;">​</a></h2><p><strong>Basic Executor Implementation</strong></p><pre><code class="lang-csharp">public class CustomTaskExecutor : IExecutor
{
    public bool CanHandle(MethodInfo method)
    {
        return method.HasAttribute&lt;TaskAttribute&gt;();
    }

    public async Task&lt;T&gt; ExecuteAsync&lt;T&gt;(MethodInfo method, object? instance,
        object?[]? parameters = null, CancellationToken cancellationToken = default)
    {
        var taskAttr = method.GetAttribute&lt;TaskAttribute&gt;();

        // Apply task-specific policies
        if (taskAttr?.Exclusive == true)
        {
            // Acquire exclusive device lock
            await AcquireExclusiveLock(cancellationToken);
        }

        try
        {
            // Execute the method with timeout
            using var timeoutCts = CancellationTokenSource.CreateLinkedTokenSource(
                cancellationToken);
            if (taskAttr?.TimeoutMs.HasValue == true)
            {
                timeoutCts.CancelAfter(taskAttr.TimeoutMs.Value);
            }

            return await ExecuteMethodAsync&lt;T&gt;(method, instance, parameters,
                timeoutCts.Token);
        }
        finally
        {
            if (taskAttr?.Exclusive == true)
            {
                ReleaseLock();
            }
        }
    }

    public async Task ExecuteAsync(MethodInfo method, object? instance,
        object?[]? parameters = null, CancellationToken cancellationToken = default)
    {
        await ExecuteAsync&lt;object&gt;(method, instance, parameters, cancellationToken);
    }
}</code></pre><p><strong>Using Executor with Device Methods</strong></p><pre><code class="lang-csharp">public class SensorDevice : Device
{
    [Task(Exclusive = true, TimeoutMs = 5000)]
    public async Task&lt;float&gt; ReadTemperatureAsync()
    {
        return await ExecuteAsync&lt;float&gt;(@&quot;
            import machine
            sensor = machine.ADC(machine.Pin(26))
            reading = sensor.read_u16()
            temperature = (reading * 3.3 / 65535) * 100
            temperature
        &quot;);
    }
}

// Executor automatically applies TaskAttribute policies
var device = new SensorDevice();
float temp = await device.ReadTemperatureAsync(); // Executed exclusively with 5s timeout</code></pre><h2 id="remarks" tabindex="-1">Remarks <a class="header-anchor" href="#remarks" aria-label="Permalink to &quot;Remarks&quot;">​</a></h2><p> The executor framework provides attribute-driven method execution with automatic policy enforcement. Each attribute type (Task, Setup, Teardown, Thread) has a corresponding executor that handles the specific execution semantics. </p><h2 id="methods" tabindex="-1">Methods <a class="header-anchor" href="#methods" aria-label="Permalink to &quot;Methods&quot;">​</a></h2><p><a href="./Belay.Core.Execution.IExecutor.CanHandle.html#Belay_Core_Execution_IExecutor_CanHandle_System_Reflection_MethodInfo_">CanHandle(MethodInfo)</a></p><p>Validates that a method can be handled by this executor.</p><p><a href="./Belay.Core.Execution.IExecutor.ExecuteAsync.html#Belay_Core_Execution_IExecutor_ExecuteAsync__1_System_Reflection_MethodInfo_System_Object_System_Object___System_Threading_CancellationToken_">ExecuteAsync&lt;T&gt;(MethodInfo, object?, object?[]?, CancellationToken)</a></p><p>Executes a method with attribute-specific policies applied.</p><p><a href="./Belay.Core.Execution.IExecutor.ExecuteAsync.html#Belay_Core_Execution_IExecutor_ExecuteAsync_System_Reflection_MethodInfo_System_Object_System_Object___System_Threading_CancellationToken_">ExecuteAsync(MethodInfo, object?, object?[]?, CancellationToken)</a></p><p>Executes a method without returning a value.</p>`,18)]))}const m=t(c,[["render",i]]);export{h as __pageData,m as default};
