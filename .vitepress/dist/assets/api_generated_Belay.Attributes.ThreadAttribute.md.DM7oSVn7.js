import{_ as m,C as l,c as u,o as b,ag as o,j as e,t as a,a as r,G as n}from"./chunks/framework.CUqMdM43.js";const k=JSON.parse('{"title":"Class ThreadAttribute","description":"","frontmatter":{},"headers":[],"relativePath":"api/generated/Belay.Attributes.ThreadAttribute.md","filePath":"api/generated/Belay.Attributes.ThreadAttribute.md"}'),c={name:"api/generated/Belay.Attributes.ThreadAttribute.md"},h={class:"lang-csharp"},p={class:"lang-csharp"};function d(s,t,y,f,g,A){const i=l("xref");return b(),u("div",null,[t[6]||(t[6]=o(`<h1 id="class-threadattribute" tabindex="-1"><a id="Belay_Attributes_ThreadAttribute"></a> Class ThreadAttribute <a class="header-anchor" href="#class-threadattribute" aria-label="Permalink to &quot;&lt;a id=&quot;Belay_Attributes_ThreadAttribute&quot;&gt;&lt;/a&gt; Class ThreadAttribute&quot;">​</a></h1><p>Namespace: <a href="./Belay.Attributes.html">Belay.Attributes</a><br> Assembly: Belay.Attributes.dll</p><p>Marks a method to be executed as a background thread on the MicroPython device. Methods decorated with this attribute run asynchronously on the device without blocking the host application or other device operations.</p><div class="language-csharp vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">csharp</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">AttributeUsage</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(AttributeTargets.Method)]</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> sealed</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ThreadAttribute</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> : </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Attribute</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h4 id="inheritance" tabindex="-1">Inheritance <a class="header-anchor" href="#inheritance" aria-label="Permalink to &quot;Inheritance&quot;">​</a></h4><p><a href="https://learn.microsoft.com/dotnet/api/system.object" target="_blank" rel="noreferrer">object</a> ← <a href="https://learn.microsoft.com/dotnet/api/system.attribute" target="_blank" rel="noreferrer">Attribute</a> ← <a href="./Belay.Attributes.ThreadAttribute.html">ThreadAttribute</a></p><h4 id="inherited-members" tabindex="-1">Inherited Members <a class="header-anchor" href="#inherited-members" aria-label="Permalink to &quot;Inherited Members&quot;">​</a></h4><p><a href="https://learn.microsoft.com/dotnet/api/system.attribute.equals" target="_blank" rel="noreferrer">Attribute.Equals(object?)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.attribute.getcustomattribute#system-attribute-getcustomattribute(system-reflection-assembly-system-type)" target="_blank" rel="noreferrer">Attribute.GetCustomAttribute(Assembly, Type)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.attribute.getcustomattribute#system-attribute-getcustomattribute(system-reflection-assembly-system-type-system-boolean)" target="_blank" rel="noreferrer">Attribute.GetCustomAttribute(Assembly, Type, bool)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.attribute.getcustomattribute#system-attribute-getcustomattribute(system-reflection-memberinfo-system-type)" target="_blank" rel="noreferrer">Attribute.GetCustomAttribute(MemberInfo, Type)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.attribute.getcustomattribute#system-attribute-getcustomattribute(system-reflection-memberinfo-system-type-system-boolean)" target="_blank" rel="noreferrer">Attribute.GetCustomAttribute(MemberInfo, Type, bool)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.attribute.getcustomattribute#system-attribute-getcustomattribute(system-reflection-module-system-type)" target="_blank" rel="noreferrer">Attribute.GetCustomAttribute(Module, Type)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.attribute.getcustomattribute#system-attribute-getcustomattribute(system-reflection-module-system-type-system-boolean)" target="_blank" rel="noreferrer">Attribute.GetCustomAttribute(Module, Type, bool)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.attribute.getcustomattribute#system-attribute-getcustomattribute(system-reflection-parameterinfo-system-type)" target="_blank" rel="noreferrer">Attribute.GetCustomAttribute(ParameterInfo, Type)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.attribute.getcustomattribute#system-attribute-getcustomattribute(system-reflection-parameterinfo-system-type-system-boolean)" target="_blank" rel="noreferrer">Attribute.GetCustomAttribute(ParameterInfo, Type, bool)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.attribute.getcustomattributes#system-attribute-getcustomattributes(system-reflection-assembly)" target="_blank" rel="noreferrer">Attribute.GetCustomAttributes(Assembly)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.attribute.getcustomattributes#system-attribute-getcustomattributes(system-reflection-assembly-system-boolean)" target="_blank" rel="noreferrer">Attribute.GetCustomAttributes(Assembly, bool)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.attribute.getcustomattributes#system-attribute-getcustomattributes(system-reflection-assembly-system-type)" target="_blank" rel="noreferrer">Attribute.GetCustomAttributes(Assembly, Type)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.attribute.getcustomattributes#system-attribute-getcustomattributes(system-reflection-assembly-system-type-system-boolean)" target="_blank" rel="noreferrer">Attribute.GetCustomAttributes(Assembly, Type, bool)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.attribute.getcustomattributes#system-attribute-getcustomattributes(system-reflection-memberinfo)" target="_blank" rel="noreferrer">Attribute.GetCustomAttributes(MemberInfo)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.attribute.getcustomattributes#system-attribute-getcustomattributes(system-reflection-memberinfo-system-boolean)" target="_blank" rel="noreferrer">Attribute.GetCustomAttributes(MemberInfo, bool)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.attribute.getcustomattributes#system-attribute-getcustomattributes(system-reflection-memberinfo-system-type)" target="_blank" rel="noreferrer">Attribute.GetCustomAttributes(MemberInfo, Type)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.attribute.getcustomattributes#system-attribute-getcustomattributes(system-reflection-memberinfo-system-type-system-boolean)" target="_blank" rel="noreferrer">Attribute.GetCustomAttributes(MemberInfo, Type, bool)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.attribute.getcustomattributes#system-attribute-getcustomattributes(system-reflection-module)" target="_blank" rel="noreferrer">Attribute.GetCustomAttributes(Module)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.attribute.getcustomattributes#system-attribute-getcustomattributes(system-reflection-module-system-boolean)" target="_blank" rel="noreferrer">Attribute.GetCustomAttributes(Module, bool)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.attribute.getcustomattributes#system-attribute-getcustomattributes(system-reflection-module-system-type)" target="_blank" rel="noreferrer">Attribute.GetCustomAttributes(Module, Type)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.attribute.getcustomattributes#system-attribute-getcustomattributes(system-reflection-module-system-type-system-boolean)" target="_blank" rel="noreferrer">Attribute.GetCustomAttributes(Module, Type, bool)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.attribute.getcustomattributes#system-attribute-getcustomattributes(system-reflection-parameterinfo)" target="_blank" rel="noreferrer">Attribute.GetCustomAttributes(ParameterInfo)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.attribute.getcustomattributes#system-attribute-getcustomattributes(system-reflection-parameterinfo-system-boolean)" target="_blank" rel="noreferrer">Attribute.GetCustomAttributes(ParameterInfo, bool)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.attribute.getcustomattributes#system-attribute-getcustomattributes(system-reflection-parameterinfo-system-type)" target="_blank" rel="noreferrer">Attribute.GetCustomAttributes(ParameterInfo, Type)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.attribute.getcustomattributes#system-attribute-getcustomattributes(system-reflection-parameterinfo-system-type-system-boolean)" target="_blank" rel="noreferrer">Attribute.GetCustomAttributes(ParameterInfo, Type, bool)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.attribute.gethashcode" target="_blank" rel="noreferrer">Attribute.GetHashCode()</a>, <a href="https://learn.microsoft.com/dotnet/api/system.attribute.isdefaultattribute" target="_blank" rel="noreferrer">Attribute.IsDefaultAttribute()</a>, <a href="https://learn.microsoft.com/dotnet/api/system.attribute.isdefined#system-attribute-isdefined(system-reflection-assembly-system-type)" target="_blank" rel="noreferrer">Attribute.IsDefined(Assembly, Type)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.attribute.isdefined#system-attribute-isdefined(system-reflection-assembly-system-type-system-boolean)" target="_blank" rel="noreferrer">Attribute.IsDefined(Assembly, Type, bool)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.attribute.isdefined#system-attribute-isdefined(system-reflection-memberinfo-system-type)" target="_blank" rel="noreferrer">Attribute.IsDefined(MemberInfo, Type)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.attribute.isdefined#system-attribute-isdefined(system-reflection-memberinfo-system-type-system-boolean)" target="_blank" rel="noreferrer">Attribute.IsDefined(MemberInfo, Type, bool)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.attribute.isdefined#system-attribute-isdefined(system-reflection-module-system-type)" target="_blank" rel="noreferrer">Attribute.IsDefined(Module, Type)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.attribute.isdefined#system-attribute-isdefined(system-reflection-module-system-type-system-boolean)" target="_blank" rel="noreferrer">Attribute.IsDefined(Module, Type, bool)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.attribute.isdefined#system-attribute-isdefined(system-reflection-parameterinfo-system-type)" target="_blank" rel="noreferrer">Attribute.IsDefined(ParameterInfo, Type)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.attribute.isdefined#system-attribute-isdefined(system-reflection-parameterinfo-system-type-system-boolean)" target="_blank" rel="noreferrer">Attribute.IsDefined(ParameterInfo, Type, bool)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.attribute.match" target="_blank" rel="noreferrer">Attribute.Match(object?)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.attribute.typeid" target="_blank" rel="noreferrer">Attribute.TypeId</a>, <a href="https://learn.microsoft.com/dotnet/api/system.object.equals#system-object-equals(system-object)" target="_blank" rel="noreferrer">object.Equals(object?)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.object.equals#system-object-equals(system-object-system-object)" target="_blank" rel="noreferrer">object.Equals(object?, object?)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.object.gethashcode" target="_blank" rel="noreferrer">object.GetHashCode()</a>, <a href="https://learn.microsoft.com/dotnet/api/system.object.gettype" target="_blank" rel="noreferrer">object.GetType()</a>, <a href="https://learn.microsoft.com/dotnet/api/system.object.referenceequals" target="_blank" rel="noreferrer">object.ReferenceEquals(object?, object?)</a>, <a href="https://learn.microsoft.com/dotnet/api/system.object.tostring" target="_blank" rel="noreferrer">object.ToString()</a></p><h2 id="examples" tabindex="-1">Examples <a class="header-anchor" href="#examples" aria-label="Permalink to &quot;Examples&quot;">​</a></h2><p><strong>Continuous Sensor Monitoring</strong></p>`,10)),e("pre",null,[e("code",h,`public class EnvironmentMonitor : Device
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
                        print(f'Temp: `+a(s.temp)+"C, Humidity: "+a(s.humidity)+`%')

                        time.sleep_ms({intervalMs})
                    except Exception as e:
                        print(f'Monitoring error: `+a(s.e)+`')
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
}`,1)]),t[7]||(t[7]=e("p",null,[e("strong",null,"Event-Driven Responses")],-1)),t[8]||(t[8]=e("pre",null,[e("code",{class:"lang-csharp"},`public class ButtonHandler : Device
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
}`)],-1)),t[9]||(t[9]=e("p",null,[e("strong",null,"Watchdog and Health Monitoring")],-1)),e("pre",null,[e("code",p,`public class SystemMonitor : Device
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
                        if free_mem < 1000:  # Low memory warning
                            print(f'WARNING: Low memory: `+a(s.free_mem)+` bytes')
                            gc.collect()

                        # Check for system heartbeat
                        if time.ticks_diff(current_time, last_heartbeat) > 30000:
                            print('WARNING: No heartbeat for 30 seconds')

                        # Update heartbeat if main loop is responsive
                        if globals().get('system_heartbeat', 0) > last_heartbeat:
                            last_heartbeat = globals()['system_heartbeat']

                        time.sleep_ms(5000)  # Check every 5 seconds

                    except Exception as e:
                        print(f'Watchdog error: {e}')
                        time.sleep_ms(10000)  # Back off on error

            _thread.start_new_thread(system_watchdog, ())
        ");
    }
}`,1)]),t[10]||(t[10]=e("h2",{id:"remarks",tabindex:"-1"},[r("Remarks "),e("a",{class:"header-anchor",href:"#remarks","aria-label":'Permalink to "Remarks"'},"​")],-1)),e("p",null,[t[0]||(t[0]=r(" The ",-1)),n(i,{href:"Belay.Attributes.ThreadAttribute","data-throw-if-not-resolved":"false"}),t[1]||(t[1]=r(" enables long-running or continuous operations to execute on MicroPython devices using the _thread module. This is essential for background monitoring, data collection, or reactive behavior that should run independently of host application calls. ",-1))]),t[11]||(t[11]=o('<p> Thread methods are non-blocking from the host perspective - they start the background operation and return immediately. The background code continues to run on the device until explicitly stopped or the device disconnects. </p><p> Thread management includes: <ul><li>Automatic thread lifecycle tracking</li><li>Graceful shutdown on device disconnection</li><li>Thread monitoring and health checks</li><li>Inter-thread communication support</li></ul></p><h2 id="constructors" tabindex="-1">Constructors <a class="header-anchor" href="#constructors" aria-label="Permalink to &quot;Constructors&quot;">​</a></h2><p><a href="./Belay.Attributes.ThreadAttribute.-ctor.html#Belay_Attributes_ThreadAttribute__ctor">ThreadAttribute()</a></p>',4)),e("p",null,[t[2]||(t[2]=r("Initializes a new instance of the ",-1)),n(i,{href:"Belay.Attributes.ThreadAttribute","data-throw-if-not-resolved":"false"}),t[3]||(t[3]=r(" class.",-1))]),t[12]||(t[12]=o('<h2 id="properties" tabindex="-1">Properties <a class="header-anchor" href="#properties" aria-label="Permalink to &quot;Properties&quot;">​</a></h2><p><a href="./Belay.Attributes.ThreadAttribute.AutoRestart.html#Belay_Attributes_ThreadAttribute_AutoRestart">AutoRestart</a></p><p>Gets or sets a value indicating whether gets or sets whether the thread should automatically restart if it terminates unexpectedly. When true, the thread will be monitored and restarted if it exits due to an error.</p><p><a href="./Belay.Attributes.ThreadAttribute.MaxRuntimeMs.html#Belay_Attributes_ThreadAttribute_MaxRuntimeMs">MaxRuntimeMs</a></p><p>Gets or sets the maximum runtime for the thread in milliseconds. If specified, the thread will be automatically terminated after this duration.</p><p><a href="./Belay.Attributes.ThreadAttribute.Name.html#Belay_Attributes_ThreadAttribute_Name">Name</a></p><p>Gets or sets the name of the thread for identification and management. If not specified, a name is automatically generated based on the method name.</p><p><a href="./Belay.Attributes.ThreadAttribute.Priority.html#Belay_Attributes_ThreadAttribute_Priority">Priority</a></p><p>Gets or sets the priority level for thread execution. Higher priority threads may receive more CPU time on capable platforms.</p><h2 id="methods" tabindex="-1">Methods <a class="header-anchor" href="#methods" aria-label="Permalink to &quot;Methods&quot;">​</a></h2><p><a href="./Belay.Attributes.ThreadAttribute.ToString.html#Belay_Attributes_ThreadAttribute_ToString">ToString()</a></p>',11)),e("p",null,[t[4]||(t[4]=r("Returns a string that represents the current ",-1)),n(i,{href:"Belay.Attributes.ThreadAttribute","data-throw-if-not-resolved":"false"}),t[5]||(t[5]=r(".",-1))])])}const T=m(c,[["render",d]]);export{k as __pageData,T as default};
