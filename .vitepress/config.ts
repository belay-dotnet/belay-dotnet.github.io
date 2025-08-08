import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Belay.NET',
  description: 'Control MicroPython devices from .NET with zero friction',
  base: '/',
  
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#646cff' }],
    ['meta', { property: 'og:title', content: 'Belay.NET' }],
    ['meta', { property: 'og:description', content: 'Control MicroPython devices from .NET with zero friction' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'Belay.NET' }],
    ['meta', { name: 'twitter:description', content: 'Control MicroPython devices from .NET with zero friction' }]
  ],

  themeConfig: {
    logo: { src: '/logo.svg', width: 24, height: 24 },
    
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Examples', link: '/examples/' },
      { text: 'API Reference', link: '/api/' },
      { text: 'Hardware', link: '/hardware/' },
      {
        text: 'v0.2.0',
        items: [
          { text: 'Changelog', link: '/changelog' },
          { text: 'Contributing', link: '/contributing' }
        ]
      }
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          items: [
            { text: 'What is Belay.NET?', link: '/guide/introduction' },
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Installation', link: '/guide/installation' }
          ]
        },
        {
          text: 'Core Concepts',
          items: [
            { text: 'Device Communication', link: '/guide/device-communication' },
            { text: 'Attribute Programming', link: '/guide/attributes' },
            { text: 'Dependency Injection', link: '/guide/dependency-injection' },
            { text: 'Error Handling', link: '/guide/error-handling' }
          ]
        },
        {
          text: 'Advanced',
          items: [
            { text: 'Session Management', link: '/guide/session-management' },
            { text: 'Health Monitoring', link: '/guide/health-monitoring' },
            { text: 'Configuration', link: '/guide/configuration' },
            { text: 'Testing', link: '/guide/testing' }
          ]
        }
      ],
      
      '/examples/': [
        {
          text: 'Basic Examples',
          items: [
            { text: 'First Connection', link: '/examples/first-connection' },
            { text: 'LED Control', link: '/examples/led-control' },
            { text: 'Sensor Reading', link: '/examples/sensor-reading' },
            { text: 'Error Handling', link: '/examples/error-handling' }
          ]
        },
        {
          text: 'Advanced Examples',
          items: [
            { text: 'ASP.NET Core Integration', link: '/examples/aspnet-core' },
            { text: 'Background Services', link: '/examples/background-services' },
            { text: 'Multiple Devices', link: '/examples/multiple-devices' },
            { text: 'Custom Attributes', link: '/examples/custom-attributes' }
          ]
        }
      ],
      
      '/hardware/': [
        {
          text: 'Supported Hardware',
          items: [
            { text: 'Compatibility Matrix', link: '/hardware/compatibility' },
            { text: 'Connection Types', link: '/hardware/connections' }
          ]
        },
        {
          text: 'Device Guides',
          items: [
            { text: 'Raspberry Pi Pico', link: '/hardware/raspberry-pi-pico' },
            { text: 'ESP32', link: '/hardware/esp32' },
            { text: 'PyBoard', link: '/hardware/pyboard' },
            { text: 'CircuitPython Devices', link: '/hardware/circuitpython' }
          ]
        },
        {
          text: 'Troubleshooting',
          items: [
            { text: 'Connection Issues', link: '/hardware/troubleshooting-connections' },
            { text: 'Performance Issues', link: '/hardware/troubleshooting-performance' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/belay-dotnet/Belay.NET' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025 Belay.NET Contributors'
    },

    editLink: {
      pattern: 'https://github.com/belay-dotnet/belay/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },

    search: {
      provider: 'local'
    },
    
    // Ignore dead links during build
    ignoreDeadLinks: true
  },

  markdown: {
    lineNumbers: true,
    config: (md) => {
      // Add custom markdown-it plugins if needed
    }
  },

  // Ignore dead links during build
  ignoreDeadLinks: true
})