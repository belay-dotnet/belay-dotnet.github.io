import{_ as e,c as a,o as r,ag as s}from"./chunks/framework.CUqMdM43.js";const c=JSON.parse('{"title":"Property AutoRestart","description":"","frontmatter":{},"headers":[],"relativePath":"api/generated/Belay.Attributes.ThreadAttribute.AutoRestart.md","filePath":"api/generated/Belay.Attributes.ThreadAttribute.AutoRestart.md"}'),i={name:"api/generated/Belay.Attributes.ThreadAttribute.AutoRestart.md"};function o(l,t,n,u,d,p){return r(),a("div",null,t[0]||(t[0]=[s(`<h1 id="property-autorestart" tabindex="-1"><a id="Belay_Attributes_ThreadAttribute_AutoRestart"></a> Property AutoRestart <a class="header-anchor" href="#property-autorestart" aria-label="Permalink to &quot;&lt;a id=&quot;Belay_Attributes_ThreadAttribute_AutoRestart&quot;&gt;&lt;/a&gt; Property AutoRestart&quot;">​</a></h1><p>Namespace: <a href="./Belay.Attributes.html">Belay.Attributes</a><br> Assembly: Belay.Attributes.dll</p><h2 id="autorestart" tabindex="-1"><a id="Belay_Attributes_ThreadAttribute_AutoRestart"></a> AutoRestart <a class="header-anchor" href="#autorestart" aria-label="Permalink to &quot;&lt;a id=&quot;Belay_Attributes_ThreadAttribute_AutoRestart&quot;&gt;&lt;/a&gt; AutoRestart&quot;">​</a></h2><p>Gets or sets a value indicating whether gets or sets whether the thread should automatically restart if it terminates unexpectedly. When true, the thread will be monitored and restarted if it exits due to an error.</p><div class="language-csharp vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">csharp</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> bool</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> AutoRestart { get; set; }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="property-value" tabindex="-1">Property Value <a class="header-anchor" href="#property-value" aria-label="Permalink to &quot;Property Value&quot;">​</a></h3><p><a href="https://learn.microsoft.com/dotnet/api/system.boolean" target="_blank" rel="noreferrer">bool</a></p><h3 id="examples" tabindex="-1">Examples <a class="header-anchor" href="#examples" aria-label="Permalink to &quot;Examples&quot;">​</a></h3><pre><code class="lang-csharp">[Thread(AutoRestart = true)]
public async Task StartDataLoggerAsync()
{
    await ExecuteAsync(@&quot;
        import _thread

        def data_logger():
            while True:
                try:
                    # Log data with error recovery
                    log_sensor_data()
                    time.sleep(60)
                except Exception as e:
                    print(f&#39;Logger error: {e}&#39;)
                    time.sleep(10)  # Brief recovery delay

        _thread.start_new_thread(data_logger, ())
    &quot;);
}</code></pre><h3 id="remarks" tabindex="-1">Remarks <a class="header-anchor" href="#remarks" aria-label="Permalink to &quot;Remarks&quot;">​</a></h3><p> Auto-restart is useful for critical background operations that should continue running despite occasional errors. However, use with caution as rapidly failing threads can consume device resources. </p><p> Auto-restart includes backoff logic to prevent rapid restart loops: <ul><li>Initial restart delay of 1 second</li><li>Exponential backoff up to maximum of 60 seconds</li><li>Reset backoff after successful run of 5 minutes</li></ul></p>`,12)]))}const b=e(i,[["render",o]]);export{c as __pageData,b as default};
