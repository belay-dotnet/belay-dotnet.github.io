import{_ as t,c as a,o as n,ag as i}from"./chunks/framework.CUqMdM43.js";const d=JSON.parse('{"title":"Interface IDeviceCommunication","description":"","frontmatter":{},"headers":[],"relativePath":"api/generated/Belay.Core.Communication.IDeviceCommunication.md","filePath":"api/generated/Belay.Core.Communication.IDeviceCommunication.md"}'),o={name:"api/generated/Belay.Core.Communication.IDeviceCommunication.md"};function r(c,e,s,m,l,u){return n(),a("div",null,e[0]||(e[0]=[i(`<h1 id="interface-idevicecommunication" tabindex="-1"><a id="Belay_Core_Communication_IDeviceCommunication"></a> Interface IDeviceCommunication <a class="header-anchor" href="#interface-idevicecommunication" aria-label="Permalink to &quot;&lt;a id=&quot;Belay_Core_Communication_IDeviceCommunication&quot;&gt;&lt;/a&gt; Interface IDeviceCommunication&quot;">​</a></h1><p>Namespace: <a href="./Belay.Core.Communication.html">Belay.Core.Communication</a><br> Assembly: Belay.Core.dll</p><p>Core interface for device communication implementations.</p><div class="language-csharp vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">csharp</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> interface</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> IDeviceCommunication</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> : </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">IDisposable</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h4 id="implements" tabindex="-1">Implements <a class="header-anchor" href="#implements" aria-label="Permalink to &quot;Implements&quot;">​</a></h4><p><a href="https://learn.microsoft.com/dotnet/api/system.idisposable" target="_blank" rel="noreferrer">IDisposable</a></p><h2 id="examples" tabindex="-1">Examples <a class="header-anchor" href="#examples" aria-label="Permalink to &quot;Examples&quot;">​</a></h2><p><strong>Basic Usage</strong></p><pre><code class="lang-csharp">using IDeviceCommunication device = new SerialDeviceCommunication(&quot;COM3&quot;);

// Execute simple code
string result = await device.ExecuteAsync(&quot;print(&#39;Hello from device!&#39;)&quot;);
Console.WriteLine($&quot;Device output: {result}&quot;);

// Execute with typed return
float temperature = await device.ExecuteAsync&lt;float&gt;(@&quot;
    import machine
    adc = machine.ADC(machine.Pin(26))
    reading = adc.read_u16()
    temperature = 27 - (reading * 3.3 / 65535 - 0.706) / 0.001721
    temperature
&quot;);

// File operations
await device.PutFileAsync(&quot;config.json&quot;, &quot;/config.json&quot;);
byte[] data = await device.GetFileAsync(&quot;/sensor_data.csv&quot;);</code></pre><p><strong>Event Handling</strong></p><pre><code class="lang-csharp">device.OutputReceived += (sender, args) =&gt; {
    if (args.IsError) {
        Console.WriteLine($&quot;Error: {args.Output}&quot;);
    } else {
        Console.WriteLine($&quot;Output: {args.Output}&quot;);
    }
};

device.StateChanged += (sender, args) =&gt; {
    Console.WriteLine($&quot;State: {args.OldState} → {args.NewState}&quot;);
    if (args.Exception != null) {
        Console.WriteLine($&quot;Error: {args.Exception.Message}&quot;);
    }
};</code></pre><h2 id="remarks" tabindex="-1">Remarks <a class="header-anchor" href="#remarks" aria-label="Permalink to &quot;Remarks&quot;">​</a></h2><p> This interface defines the standard contract for communicating with MicroPython devices through various transport mechanisms (serial, subprocess, network, etc.). All implementations handle the Raw REPL protocol for reliable code execution and file transfer operations. </p><h2 id="properties" tabindex="-1">Properties <a class="header-anchor" href="#properties" aria-label="Permalink to &quot;Properties&quot;">​</a></h2><p><a href="./Belay.Core.Communication.IDeviceCommunication.State.html#Belay_Core_Communication_IDeviceCommunication_State">State</a></p><p>Gets current connection state of the device.</p><h2 id="methods" tabindex="-1">Methods <a class="header-anchor" href="#methods" aria-label="Permalink to &quot;Methods&quot;">​</a></h2><p><a href="./Belay.Core.Communication.IDeviceCommunication.ExecuteAsync.html#Belay_Core_Communication_IDeviceCommunication_ExecuteAsync_System_String_System_Threading_CancellationToken_">ExecuteAsync(string, CancellationToken)</a></p><p>Execute Python code on the device and return the result as a string.</p><p><a href="./Belay.Core.Communication.IDeviceCommunication.ExecuteAsync.html#Belay_Core_Communication_IDeviceCommunication_ExecuteAsync__1_System_String_System_Threading_CancellationToken_">ExecuteAsync&lt;T&gt;(string, CancellationToken)</a></p><p>Execute Python code on the device and return the result as typed object.</p><p><a href="./Belay.Core.Communication.IDeviceCommunication.GetFileAsync.html#Belay_Core_Communication_IDeviceCommunication_GetFileAsync_System_String_System_Threading_CancellationToken_">GetFileAsync(string, CancellationToken)</a></p><p>Retrieve a file from device to local system.</p><p><a href="./Belay.Core.Communication.IDeviceCommunication.PutFileAsync.html#Belay_Core_Communication_IDeviceCommunication_PutFileAsync_System_String_System_String_System_Threading_CancellationToken_">PutFileAsync(string, string, CancellationToken)</a></p><p>Transfer a file from local system to device.</p><p><a href="./Belay.Core.Communication.IDeviceCommunication.OutputReceived.html#Belay_Core_Communication_IDeviceCommunication_OutputReceived">OutputReceived</a></p><p>Event raised when output is received from the device</p><p><a href="./Belay.Core.Communication.IDeviceCommunication.StateChanged.html#Belay_Core_Communication_IDeviceCommunication_StateChanged">StateChanged</a></p><p>Event raised when device connection state changes</p>`,29)]))}const h=t(o,[["render",r]]);export{d as __pageData,h as default};
