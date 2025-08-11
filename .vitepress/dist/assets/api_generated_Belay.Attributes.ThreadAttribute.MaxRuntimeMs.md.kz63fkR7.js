import{_ as t,c as a,o as r,ag as i}from"./chunks/framework.CUqMdM43.js";const d=JSON.parse('{"title":"Property MaxRuntimeMs","description":"","frontmatter":{},"headers":[],"relativePath":"api/generated/Belay.Attributes.ThreadAttribute.MaxRuntimeMs.md","filePath":"api/generated/Belay.Attributes.ThreadAttribute.MaxRuntimeMs.md"}'),s={name:"api/generated/Belay.Attributes.ThreadAttribute.MaxRuntimeMs.md"};function n(o,e,l,m,p,u){return r(),a("div",null,e[0]||(e[0]=[i(`<h1 id="property-maxruntimems" tabindex="-1"><a id="Belay_Attributes_ThreadAttribute_MaxRuntimeMs"></a> Property MaxRuntimeMs <a class="header-anchor" href="#property-maxruntimems" aria-label="Permalink to &quot;&lt;a id=&quot;Belay_Attributes_ThreadAttribute_MaxRuntimeMs&quot;&gt;&lt;/a&gt; Property MaxRuntimeMs&quot;">​</a></h1><p>Namespace: <a href="./Belay.Attributes.html">Belay.Attributes</a><br> Assembly: Belay.Attributes.dll</p><h2 id="maxruntimems" tabindex="-1"><a id="Belay_Attributes_ThreadAttribute_MaxRuntimeMs"></a> MaxRuntimeMs <a class="header-anchor" href="#maxruntimems" aria-label="Permalink to &quot;&lt;a id=&quot;Belay_Attributes_ThreadAttribute_MaxRuntimeMs&quot;&gt;&lt;/a&gt; MaxRuntimeMs&quot;">​</a></h2><p>Gets or sets the maximum runtime for the thread in milliseconds. If specified, the thread will be automatically terminated after this duration.</p><div class="language-csharp vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">csharp</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> int?</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> MaxRuntimeMs { get; set; }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="property-value" tabindex="-1">Property Value <a class="header-anchor" href="#property-value" aria-label="Permalink to &quot;Property Value&quot;">​</a></h3><p><a href="https://learn.microsoft.com/dotnet/api/system.int32" target="_blank" rel="noreferrer">int</a>?</p><h3 id="examples" tabindex="-1">Examples <a class="header-anchor" href="#examples" aria-label="Permalink to &quot;Examples&quot;">​</a></h3><pre><code class="lang-csharp">[Thread(MaxRuntimeMs = 300000)] // Run for 5 minutes
public async Task StartBenchmarkAsync()
{
    await ExecuteAsync(@&quot;
        import _thread
        import time

        def benchmark():
            start_time = time.ticks_ms()
            iterations = 0

            # Run until stop flag is set (by runtime limit)
            while not globals().get(&#39;benchmark_stop&#39;, False):
                perform_benchmark_iteration()
                iterations += 1

                # Check stop condition periodically
                if iterations % 100 == 0:
                    if globals().get(&#39;benchmark_stop&#39;, False):
                        break

            elapsed = time.ticks_diff(time.ticks_ms(), start_time)
            print(f&#39;Benchmark completed: {iterations} iterations in {elapsed}ms&#39;)

        _thread.start_new_thread(benchmark, ())
    &quot;);
}</code></pre><h3 id="remarks" tabindex="-1">Remarks <a class="header-anchor" href="#remarks" aria-label="Permalink to &quot;Remarks&quot;">​</a></h3><p> Use MaxRuntimeMs to prevent runaway threads or to implement time-bounded operations. This is particularly useful for data collection windows or temporary monitoring periods. </p><p> When the runtime limit is reached, the thread is gracefully terminated by setting a stop flag that the thread should check periodically. </p><h3 id="exceptions" tabindex="-1">Exceptions <a class="header-anchor" href="#exceptions" aria-label="Permalink to &quot;Exceptions&quot;">​</a></h3><p><a href="https://learn.microsoft.com/dotnet/api/system.argumentoutofrangeexception" target="_blank" rel="noreferrer">ArgumentOutOfRangeException</a></p><p>Thrown when setting a runtime value that is less than or equal to zero.</p>`,15)]))}const c=t(s,[["render",n]]);export{d as __pageData,c as default};
