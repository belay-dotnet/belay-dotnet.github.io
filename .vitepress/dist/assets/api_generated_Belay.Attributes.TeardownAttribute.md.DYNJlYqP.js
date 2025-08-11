import{_ as i,C as n,c as l,o as m,ag as s,j as a,a as e,G as o}from"./chunks/framework.CUqMdM43.js";const g=JSON.parse('{"title":"Class TeardownAttribute","description":"","frontmatter":{},"headers":[],"relativePath":"api/generated/Belay.Attributes.TeardownAttribute.md","filePath":"api/generated/Belay.Attributes.TeardownAttribute.md"}'),u={name:"api/generated/Belay.Attributes.TeardownAttribute.md"};function b(c,t,d,p,f,y){const r=n("xref");return m(),l("div",null,[t[6]||(t[6]=s(`<h1 id="class-teardownattribute" tabindex="-1"><a id="Belay_Attributes_TeardownAttribute"></a> Class TeardownAttribute <a class="header-anchor" href="#class-teardownattribute" aria-label="Permalink to &quot;&lt;a id=&quot;Belay_Attributes_TeardownAttribute&quot;&gt;&lt;/a&gt; Class TeardownAttribute&quot;">​</a></h1><p>Namespace: <a href="./Belay.Attributes.html">Belay.Attributes</a><br> Assembly: Belay.Attributes.dll</p><p>Marks a method to be executed during device disconnection or disposal. Methods decorated with this attribute are automatically called when the device connection is terminated, providing cleanup and resource management capabilities.</p><div class="language-csharp vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">csharp</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">AttributeUsage</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(AttributeTargets.Method)]</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> sealed</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> TeardownAttribute</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> : </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Attribute</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h4 id="inheritance" tabindex="-1">Inheritance <a class="header-anchor" href="#inheritance" aria-label="Permalink to &quot;Inheritance&quot;">​</a></h4><p><a href="https://learn.microsoft.com/dotnet/api/system.object" target="_blank" rel="noreferrer">object</a> ← <a href="https://learn.microsoft.com/dotnet/api/system.attribute" target="_blank" rel="noreferrer">Attribute</a> ← <a href="./Belay.Attributes.TeardownAttribute.html">TeardownAttribute</a></p><h4 id="inherited-members" tabindex="-1">Inherited Members <a class="header-anchor" href="#inherited-members" aria-label="Permalink to &quot;Inherited Members&quot;">​</a></h4><p><a href="https://learn.microsoft.com/dotnet/api/system.attribute.equals" target="_blank" rel="noreferrer">Attribute.Equals(object?)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.attribute.getcustomattribute#system-attribute-getcustomattribute(system-reflection-assembly-system-type)" target="_blank" rel="noreferrer">Attribute.GetCustomAttribute(Assembly, Type)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.attribute.getcustomattribute#system-attribute-getcustomattribute(system-reflection-assembly-system-type-system-boolean)" target="_blank" rel="noreferrer">Attribute.GetCustomAttribute(Assembly, Type, bool)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.attribute.getcustomattribute#system-attribute-getcustomattribute(system-reflection-memberinfo-system-type)" target="_blank" rel="noreferrer">Attribute.GetCustomAttribute(MemberInfo, Type)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.attribute.getcustomattribute#system-attribute-getcustomattribute(system-reflection-memberinfo-system-type-system-boolean)" target="_blank" rel="noreferrer">Attribute.GetCustomAttribute(MemberInfo, Type, bool)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.attribute.getcustomattribute#system-attribute-getcustomattribute(system-reflection-module-system-type)" target="_blank" rel="noreferrer">Attribute.GetCustomAttribute(Module, Type)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.attribute.getcustomattribute#system-attribute-getcustomattribute(system-reflection-module-system-type-system-boolean)" target="_blank" rel="noreferrer">Attribute.GetCustomAttribute(Module, Type, bool)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.attribute.getcustomattribute#system-attribute-getcustomattribute(system-reflection-parameterinfo-system-type)" target="_blank" rel="noreferrer">Attribute.GetCustomAttribute(ParameterInfo, Type)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.attribute.getcustomattribute#system-attribute-getcustomattribute(system-reflection-parameterinfo-system-type-system-boolean)" target="_blank" rel="noreferrer">Attribute.GetCustomAttribute(ParameterInfo, Type, bool)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.attribute.getcustomattributes#system-attribute-getcustomattributes(system-reflection-assembly)" target="_blank" rel="noreferrer">Attribute.GetCustomAttributes(Assembly)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.attribute.getcustomattributes#system-attribute-getcustomattributes(system-reflection-assembly-system-boolean)" target="_blank" rel="noreferrer">Attribute.GetCustomAttributes(Assembly, bool)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.attribute.getcustomattributes#system-attribute-getcustomattributes(system-reflection-assembly-system-type)" target="_blank" rel="noreferrer">Attribute.GetCustomAttributes(Assembly, Type)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.attribute.getcustomattributes#system-attribute-getcustomattributes(system-reflection-assembly-system-type-system-boolean)" target="_blank" rel="noreferrer">Attribute.GetCustomAttributes(Assembly, Type, bool)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.attribute.getcustomattributes#system-attribute-getcustomattributes(system-reflection-memberinfo)" target="_blank" rel="noreferrer">Attribute.GetCustomAttributes(MemberInfo)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.attribute.getcustomattributes#system-attribute-getcustomattributes(system-reflection-memberinfo-system-boolean)" target="_blank" rel="noreferrer">Attribute.GetCustomAttributes(MemberInfo, bool)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.attribute.getcustomattributes#system-attribute-getcustomattributes(system-reflection-memberinfo-system-type)" target="_blank" rel="noreferrer">Attribute.GetCustomAttributes(MemberInfo, Type)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.attribute.getcustomattributes#system-attribute-getcustomattributes(system-reflection-memberinfo-system-type-system-boolean)" target="_blank" rel="noreferrer">Attribute.GetCustomAttributes(MemberInfo, Type, bool)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.attribute.getcustomattributes#system-attribute-getcustomattributes(system-reflection-module)" target="_blank" rel="noreferrer">Attribute.GetCustomAttributes(Module)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.attribute.getcustomattributes#system-attribute-getcustomattributes(system-reflection-module-system-boolean)" target="_blank" rel="noreferrer">Attribute.GetCustomAttributes(Module, bool)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.attribute.getcustomattributes#system-attribute-getcustomattributes(system-reflection-module-system-type)" target="_blank" rel="noreferrer">Attribute.GetCustomAttributes(Module, Type)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.attribute.getcustomattributes#system-attribute-getcustomattributes(system-reflection-module-system-type-system-boolean)" target="_blank" rel="noreferrer">Attribute.GetCustomAttributes(Module, Type, bool)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.attribute.getcustomattributes#system-attribute-getcustomattributes(system-reflection-parameterinfo)" target="_blank" rel="noreferrer">Attribute.GetCustomAttributes(ParameterInfo)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.attribute.getcustomattributes#system-attribute-getcustomattributes(system-reflection-parameterinfo-system-boolean)" target="_blank" rel="noreferrer">Attribute.GetCustomAttributes(ParameterInfo, bool)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.attribute.getcustomattributes#system-attribute-getcustomattributes(system-reflection-parameterinfo-system-type)" target="_blank" rel="noreferrer">Attribute.GetCustomAttributes(ParameterInfo, Type)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.attribute.getcustomattributes#system-attribute-getcustomattributes(system-reflection-parameterinfo-system-type-system-boolean)" target="_blank" rel="noreferrer">Attribute.GetCustomAttributes(ParameterInfo, Type, bool)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.attribute.gethashcode" target="_blank" rel="noreferrer">Attribute.GetHashCode()</a>, <a href="https://learn.microsoft.com/dotnet/api/system.attribute.isdefaultattribute" target="_blank" rel="noreferrer">Attribute.IsDefaultAttribute()</a>, <a href="https://learn.microsoft.com/dotnet/api/system.attribute.isdefined#system-attribute-isdefined(system-reflection-assembly-system-type)" target="_blank" rel="noreferrer">Attribute.IsDefined(Assembly, Type)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.attribute.isdefined#system-attribute-isdefined(system-reflection-assembly-system-type-system-boolean)" target="_blank" rel="noreferrer">Attribute.IsDefined(Assembly, Type, bool)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.attribute.isdefined#system-attribute-isdefined(system-reflection-memberinfo-system-type)" target="_blank" rel="noreferrer">Attribute.IsDefined(MemberInfo, Type)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.attribute.isdefined#system-attribute-isdefined(system-reflection-memberinfo-system-type-system-boolean)" target="_blank" rel="noreferrer">Attribute.IsDefined(MemberInfo, Type, bool)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.attribute.isdefined#system-attribute-isdefined(system-reflection-module-system-type)" target="_blank" rel="noreferrer">Attribute.IsDefined(Module, Type)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.attribute.isdefined#system-attribute-isdefined(system-reflection-module-system-type-system-boolean)" target="_blank" rel="noreferrer">Attribute.IsDefined(Module, Type, bool)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.attribute.isdefined#system-attribute-isdefined(system-reflection-parameterinfo-system-type)" target="_blank" rel="noreferrer">Attribute.IsDefined(ParameterInfo, Type)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.attribute.isdefined#system-attribute-isdefined(system-reflection-parameterinfo-system-type-system-boolean)" target="_blank" rel="noreferrer">Attribute.IsDefined(ParameterInfo, Type, bool)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.attribute.match" target="_blank" rel="noreferrer">Attribute.Match(object?)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.attribute.typeid" target="_blank" rel="noreferrer">Attribute.TypeId</a>, <a href="https://learn.microsoft.com/dotnet/api/system.object.equals#system-object-equals(system-object)" target="_blank" rel="noreferrer">object.Equals(object?)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.object.equals#system-object-equals(system-object-system-object)" target="_blank" rel="noreferrer">object.Equals(object?, object?)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.object.gethashcode" target="_blank" rel="noreferrer">object.GetHashCode()</a>, <a href="https://learn.microsoft.com/dotnet/api/system.object.gettype" target="_blank" rel="noreferrer">object.GetType()</a>, <a href="https://learn.microsoft.com/dotnet/api/system.object.referenceequals" target="_blank" rel="noreferrer">object.ReferenceEquals(object?, object?)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.object.tostring" target="_blank" rel="noreferrer">object.ToString()</a></p><h2 id="examples" tabindex="-1">Examples <a class="header-anchor" href="#examples" aria-label="Permalink to &quot;Examples&quot;">​</a></h2><p><strong>Hardware Resource Cleanup</strong></p><pre><code class="lang-csharp">public class MotorController : Device
{
    [Setup]
    private async Task InitializeMotorsAsync()
    {
        await ExecuteAsync(@&quot;
            import machine
            motor_left = machine.PWM(machine.Pin(12))
            motor_right = machine.PWM(machine.Pin(13))
            motor_left.freq(1000)
            motor_right.freq(1000)
        &quot;);
    }

    [Teardown]
    private async Task StopMotorsAsync()
    {
        await ExecuteAsync(@&quot;
            # Safely stop motors before disconnect
            try:
                if &#39;motor_left&#39; in globals():
                    motor_left.duty_u16(0)
                    motor_left.deinit()
                if &#39;motor_right&#39; in globals():
                    motor_right.duty_u16(0)
                    motor_right.deinit()
                print(&#39;Motors stopped safely&#39;)
            except Exception as e:
                print(f&#39;Motor cleanup error: {e}&#39;)
        &quot;);
    }
}</code></pre><p><strong>State Persistence</strong></p><pre><code class="lang-csharp">public class DataLogger : Device
{
    [Teardown]
    private async Task SaveDataAsync()
    {
        await ExecuteAsync(@&quot;
            import json

            try:
                # Save any pending data before disconnect
                if &#39;pending_data&#39; in globals() and pending_data:
                    with open(&#39;data_backup.json&#39;, &#39;w&#39;) as f:
                        json.dump(pending_data, f)
                    print(f&#39;Saved {len(pending_data)} pending records&#39;)

                # Update status file
                status = {
                    &#39;last_disconnect&#39;: time.time(),
                    &#39;clean_shutdown&#39;: True
                }
                with open(&#39;status.json&#39;, &#39;w&#39;) as f:
                    json.dump(status, f)

            except Exception as e:
                print(f&#39;Data save error: {e}&#39;)
        &quot;);
    }
}</code></pre><p><strong>Multi-Stage Teardown</strong></p><pre><code class="lang-csharp">public class ComplexDevice : Device
{
    [Teardown(Order = 1)] // Execute first
    private async Task StopBackgroundTasksAsync()
    {
        await ExecuteAsync(@&quot;
            # Stop background threads
            monitoring_active = False
            data_collection_active = False

            # Wait briefly for threads to notice
            import time
            time.sleep_ms(100)
        &quot;);
    }

    [Teardown(Order = 2)] // Execute second
    private async Task SaveStateAsync()
    {
        await ExecuteAsync(@&quot;
            # Save current state
            save_device_state()
            flush_data_buffers()
        &quot;);
    }

    [Teardown(Order = 3)] // Execute last
    private async Task CleanupHardwareAsync()
    {
        await ExecuteAsync(@&quot;
            # Final hardware cleanup
            disable_all_outputs()
            release_hardware_resources()
        &quot;);
    }
}</code></pre><p><strong>Error-Resilient Teardown</strong></p><pre><code class="lang-csharp">public class RobustDevice : Device
{
    [Teardown(IgnoreErrors = true)]
    private async Task BestEffortCleanupAsync()
    {
        await ExecuteAsync(@&quot;
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
                    print(f&#39;Cleanup task failed: {e}&#39;)

            print(&#39;Best-effort cleanup completed&#39;)
        &quot;);
    }
}</code></pre><h2 id="remarks" tabindex="-1">Remarks <a class="header-anchor" href="#remarks" aria-label="Permalink to &quot;Remarks&quot;">​</a></h2>`,18)),a("p",null,[t[0]||(t[0]=e(" The ",-1)),o(r,{href:"Belay.Attributes.TeardownAttribute","data-throw-if-not-resolved":"false"}),t[1]||(t[1]=e(" ensures proper cleanup when device connections end, whether due to explicit disconnection, network issues, or application shutdown. This is essential for releasing hardware resources, saving state, and graceful shutdown of background operations. ",-1))]),t[7]||(t[7]=s('<p> Teardown methods are executed in reverse declaration order within a class, with derived class teardown methods running before base class teardown methods. This ensures proper cleanup hierarchy and dependency management. </p><p> Teardown execution characteristics: <ul><li>Always executes, even if setup or other operations failed</li><li>Has limited time to complete before forcible disconnection</li><li>Should be robust against partial initialization states</li><li>Failures are logged but do not prevent disconnection</li></ul></p><h2 id="constructors" tabindex="-1">Constructors <a class="header-anchor" href="#constructors" aria-label="Permalink to &quot;Constructors&quot;">​</a></h2><p><a href="./Belay.Attributes.TeardownAttribute.-ctor.html#Belay_Attributes_TeardownAttribute__ctor">TeardownAttribute()</a></p>',4)),a("p",null,[t[2]||(t[2]=e("Initializes a new instance of the ",-1)),o(r,{href:"Belay.Attributes.TeardownAttribute","data-throw-if-not-resolved":"false"}),t[3]||(t[3]=e(" class.",-1))]),t[8]||(t[8]=s('<h2 id="properties" tabindex="-1">Properties <a class="header-anchor" href="#properties" aria-label="Permalink to &quot;Properties&quot;">​</a></h2><p><a href="./Belay.Attributes.TeardownAttribute.Critical.html#Belay_Attributes_TeardownAttribute_Critical">Critical</a></p><p>Gets or sets a value indicating whether gets or sets whether this teardown method is critical and must execute even in emergency disconnection scenarios.</p><p><a href="./Belay.Attributes.TeardownAttribute.IgnoreErrors.html#Belay_Attributes_TeardownAttribute_IgnoreErrors">IgnoreErrors</a></p><p>Gets or sets a value indicating whether gets or sets whether errors in this teardown method should be ignored. When true, exceptions from this method will be logged but will not prevent other teardown methods from executing or the disconnection from proceeding.</p><p><a href="./Belay.Attributes.TeardownAttribute.Order.html#Belay_Attributes_TeardownAttribute_Order">Order</a></p><p>Gets or sets the order in which this teardown method should be executed relative to other teardown methods in the same class.</p><p><a href="./Belay.Attributes.TeardownAttribute.TimeoutMs.html#Belay_Attributes_TeardownAttribute_TimeoutMs">TimeoutMs</a></p><p>Gets or sets the timeout for teardown method execution in milliseconds. Teardown operations have limited time to complete before forcible disconnection.</p><h2 id="methods" tabindex="-1">Methods <a class="header-anchor" href="#methods" aria-label="Permalink to &quot;Methods&quot;">​</a></h2><p><a href="./Belay.Attributes.TeardownAttribute.ToString.html#Belay_Attributes_TeardownAttribute_ToString">ToString()</a></p>',11)),a("p",null,[t[4]||(t[4]=e("Returns a string that represents the current ",-1)),o(r,{href:"Belay.Attributes.TeardownAttribute","data-throw-if-not-resolved":"false"}),t[5]||(t[5]=e(".",-1))])])}const A=i(u,[["render",b]]);export{g as __pageData,A as default};
