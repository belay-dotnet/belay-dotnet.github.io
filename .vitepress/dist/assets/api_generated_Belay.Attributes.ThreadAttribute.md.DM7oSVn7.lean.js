import{_ as m,C as l,c as u,o as b,ag as o,j as e,t as a,a as r,G as n}from"./chunks/framework.CUqMdM43.js";const k=JSON.parse('{"title":"Class ThreadAttribute","description":"","frontmatter":{},"headers":[],"relativePath":"api/generated/Belay.Attributes.ThreadAttribute.md","filePath":"api/generated/Belay.Attributes.ThreadAttribute.md"}'),c={name:"api/generated/Belay.Attributes.ThreadAttribute.md"},h={class:"lang-csharp"},p={class:"lang-csharp"};function d(s,t,y,f,g,A){const i=l("xref");return b(),u("div",null,[t[6]||(t[6]=o("",10)),e("pre",null,[e("code",h,`public class EnvironmentMonitor : Device
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
}`,1)]),t[10]||(t[10]=e("h2",{id:"remarks",tabindex:"-1"},[r("Remarks "),e("a",{class:"header-anchor",href:"#remarks","aria-label":'Permalink to "Remarks"'},"​")],-1)),e("p",null,[t[0]||(t[0]=r(" The ",-1)),n(i,{href:"Belay.Attributes.ThreadAttribute","data-throw-if-not-resolved":"false"}),t[1]||(t[1]=r(" enables long-running or continuous operations to execute on MicroPython devices using the _thread module. This is essential for background monitoring, data collection, or reactive behavior that should run independently of host application calls. ",-1))]),t[11]||(t[11]=o("",4)),e("p",null,[t[2]||(t[2]=r("Initializes a new instance of the ",-1)),n(i,{href:"Belay.Attributes.ThreadAttribute","data-throw-if-not-resolved":"false"}),t[3]||(t[3]=r(" class.",-1))]),t[12]||(t[12]=o("",11)),e("p",null,[t[4]||(t[4]=r("Returns a string that represents the current ",-1)),n(i,{href:"Belay.Attributes.ThreadAttribute","data-throw-if-not-resolved":"false"}),t[5]||(t[5]=r(".",-1))])])}const T=m(c,[["render",d]]);export{k as __pageData,T as default};
