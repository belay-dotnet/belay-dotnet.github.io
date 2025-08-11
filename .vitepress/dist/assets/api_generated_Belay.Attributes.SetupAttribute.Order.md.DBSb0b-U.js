import{_ as t,c as a,o as r,ag as s}from"./chunks/framework.CUqMdM43.js";const h=JSON.parse('{"title":"Property Order","description":"","frontmatter":{},"headers":[],"relativePath":"api/generated/Belay.Attributes.SetupAttribute.Order.md","filePath":"api/generated/Belay.Attributes.SetupAttribute.Order.md"}'),i={name:"api/generated/Belay.Attributes.SetupAttribute.Order.md"};function n(o,e,l,d,p,u){return r(),a("div",null,e[0]||(e[0]=[s(`<h1 id="property-order" tabindex="-1"><a id="Belay_Attributes_SetupAttribute_Order"></a> Property Order <a class="header-anchor" href="#property-order" aria-label="Permalink to &quot;&lt;a id=&quot;Belay_Attributes_SetupAttribute_Order&quot;&gt;&lt;/a&gt; Property Order&quot;">​</a></h1><p>Namespace: <a href="./Belay.Attributes.html">Belay.Attributes</a><br> Assembly: Belay.Attributes.dll</p><h2 id="order" tabindex="-1"><a id="Belay_Attributes_SetupAttribute_Order"></a> Order <a class="header-anchor" href="#order" aria-label="Permalink to &quot;&lt;a id=&quot;Belay_Attributes_SetupAttribute_Order&quot;&gt;&lt;/a&gt; Order&quot;">​</a></h2><p>Gets or sets the order in which this setup method should be executed relative to other setup methods in the same class.</p><div class="language-csharp vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">csharp</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Order { get; set; }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="property-value" tabindex="-1">Property Value <a class="header-anchor" href="#property-value" aria-label="Permalink to &quot;Property Value&quot;">​</a></h3><p><a href="https://learn.microsoft.com/dotnet/api/system.int32" target="_blank" rel="noreferrer">int</a></p><h3 id="examples" tabindex="-1">Examples <a class="header-anchor" href="#examples" aria-label="Permalink to &quot;Examples&quot;">​</a></h3><pre><code class="lang-csharp">public class SensorArray : Device
{
    [Setup(Order = 1)]
    private async Task InitializeHardwareAsync()
    {
        // Initialize hardware first
        await ExecuteAsync(&quot;setup_i2c_bus()&quot;);
    }

    [Setup(Order = 2)]
    private async Task ConfigureSensorsAsync()
    {
        // Configure sensors after hardware is ready
        await ExecuteAsync(&quot;configure_all_sensors()&quot;);
    }

    [Setup(Order = 3)]
    private async Task StartDataCollectionAsync()
    {
        // Start collection after everything is configured
        await ExecuteAsync(&quot;start_background_collection()&quot;);
    }
}</code></pre><h3 id="remarks" tabindex="-1">Remarks <a class="header-anchor" href="#remarks" aria-label="Permalink to &quot;Remarks&quot;">​</a></h3><p> Use the Order property when you have multiple setup methods that must execute in a specific sequence. For example, hardware initialization should occur before loading configuration that depends on that hardware. </p>`,11)]))}const b=t(i,[["render",n]]);export{h as __pageData,b as default};
