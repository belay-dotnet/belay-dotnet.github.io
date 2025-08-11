import{_ as t,c as a,o as i,ag as r}from"./chunks/framework.CUqMdM43.js";const d=JSON.parse('{"title":"Property TimeoutMs","description":"","frontmatter":{},"headers":[],"relativePath":"api/generated/Belay.Attributes.SetupAttribute.TimeoutMs.md","filePath":"api/generated/Belay.Attributes.SetupAttribute.TimeoutMs.md"}'),o={name:"api/generated/Belay.Attributes.SetupAttribute.TimeoutMs.md"};function s(n,e,u,l,p,m){return i(),a("div",null,e[0]||(e[0]=[r(`<h1 id="property-timeoutms" tabindex="-1"><a id="Belay_Attributes_SetupAttribute_TimeoutMs"></a> Property TimeoutMs <a class="header-anchor" href="#property-timeoutms" aria-label="Permalink to &quot;&lt;a id=&quot;Belay_Attributes_SetupAttribute_TimeoutMs&quot;&gt;&lt;/a&gt; Property TimeoutMs&quot;">​</a></h1><p>Namespace: <a href="./Belay.Attributes.html">Belay.Attributes</a><br> Assembly: Belay.Attributes.dll</p><h2 id="timeoutms" tabindex="-1"><a id="Belay_Attributes_SetupAttribute_TimeoutMs"></a> TimeoutMs <a class="header-anchor" href="#timeoutms" aria-label="Permalink to &quot;&lt;a id=&quot;Belay_Attributes_SetupAttribute_TimeoutMs&quot;&gt;&lt;/a&gt; TimeoutMs&quot;">​</a></h2><p>Gets or sets the timeout for setup method execution in milliseconds. Setup methods may need longer timeouts for hardware initialization.</p><div class="language-csharp vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">csharp</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> int?</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> TimeoutMs { get; set; }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="property-value" tabindex="-1">Property Value <a class="header-anchor" href="#property-value" aria-label="Permalink to &quot;Property Value&quot;">​</a></h3><p><a href="https://learn.microsoft.com/dotnet/api/system.int32" target="_blank" rel="noreferrer">int</a>?</p><h3 id="examples" tabindex="-1">Examples <a class="header-anchor" href="#examples" aria-label="Permalink to &quot;Examples&quot;">​</a></h3><pre><code class="lang-csharp">[Setup(TimeoutMs = 30000)] // 30 second timeout for WiFi connection
private async Task ConnectToWiFiAsync()
{
    await ExecuteAsync(@&quot;
        import network
        import time

        wifi = network.WLAN(network.STA_IF)
        wifi.active(True)
        wifi.connect(&#39;MyNetwork&#39;, &#39;password&#39;)

        # Wait for connection
        timeout = 25  # Leave some buffer
        while not wifi.isconnected() and timeout &gt; 0:
            time.sleep(1)
            timeout -= 1

        if not wifi.isconnected():
            raise Exception(&#39;WiFi connection failed&#39;)
    &quot;);
}</code></pre><h3 id="remarks" tabindex="-1">Remarks <a class="header-anchor" href="#remarks" aria-label="Permalink to &quot;Remarks&quot;">​</a></h3><p> Hardware initialization often takes longer than normal operations, so setup methods may require extended timeouts. Consider the time needed for sensor stabilization, network connections, or file system operations. </p><h3 id="exceptions" tabindex="-1">Exceptions <a class="header-anchor" href="#exceptions" aria-label="Permalink to &quot;Exceptions&quot;">​</a></h3><p><a href="https://learn.microsoft.com/dotnet/api/system.argumentoutofrangeexception" target="_blank" rel="noreferrer">ArgumentOutOfRangeException</a></p><p>Thrown when setting a timeout value that is less than or equal to zero.</p>`,14)]))}const h=t(o,[["render",s]]);export{d as __pageData,h as default};
