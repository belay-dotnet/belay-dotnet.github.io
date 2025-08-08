# Contributing to Belay.NET

Thank you for your interest in contributing to Belay.NET! This guide will help you get started.

## Code of Conduct

This project follows the [.NET Foundation Code of Conduct](https://dotnetfoundation.org/code-of-conduct). 
By participating, you are expected to uphold this code.

## Ways to Contribute

### 🐛 Reporting Bugs
- Search existing [issues](https://github.com/belay-dotnet/Belay.NET/issues) first
- Use the bug report template
- Include device information, logs, and reproduction steps

### 💡 Suggesting Features  
- Check the [roadmap](/changelog#roadmap) and existing issues
- Use the feature request template
- Describe the use case and expected behavior

### 📚 Improving Documentation
- Fix typos, improve clarity, add examples
- All documentation is in the `/docs` folder
- Use the "Edit this page" link at the bottom of any page

### 🔧 Contributing Code
- Bug fixes, performance improvements, and new features
- See the Development Setup section below

## Development Setup

### Prerequisites
- **.NET 8 SDK** (for building)  
- **Git** for version control
- **MicroPython device** or Unix port for testing
- **Visual Studio 2022** or **VS Code** (recommended)

### Getting Started
```bash
# Fork and clone the repository
git clone https://github.com/YOUR_USERNAME/Belay.NET.git
cd Belay.NET

# Restore packages and build
dotnet restore
dotnet build

# Run unit tests
dotnet test

# Run hardware tests (requires device)
dotnet test --filter "Category=Hardware"
```

### Project Structure
```
Belay.NET/
├── src/
│   ├── Belay.Core/           # Core functionality
│   ├── Belay.Attributes/     # Attribute system
│   ├── Belay.Extensions/     # DI extensions
│   └── Belay.Sync/          # File synchronization
├── tests/
│   ├── Belay.Tests.Unit/    # Unit tests
│   └── Belay.Tests.Hardware/ # Hardware tests
├── docs/                    # Documentation (VitePress)
└── samples/                 # Example applications
```

## Development Workflow

### 1. Planning
- All features should have corresponding planning documents in `./plan/`
- Check with maintainers before starting large features
- Create or update issue tickets with clear requirements

### 2. Implementation
- Create a feature branch: `git checkout -b feature/your-feature-name`
- Follow the coding standards (see below)
- Write tests for new functionality
- Update documentation as needed

### 3. Quality Assurance
- Run all tests: `dotnet test`
- Check code coverage: `dotnet test --collect:"XPlat Code Coverage"`
- Run static analysis: `dotnet build --verbosity normal`
- Test with real hardware when applicable

### 4. Submitting Changes
- Push your branch and create a Pull Request
- Fill out the PR template completely
- Ensure CI checks pass
- Address any review feedback

## Coding Standards

### C# Style Guidelines
- Follow [Microsoft C# Coding Conventions](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/inside-a-program/coding-conventions)
- Use `ConfigureAwait(false)` for all library code
- Prefer explicit types over `var` in public APIs
- Use nullable reference types consistently

### Naming Conventions
```csharp
// Good examples
public interface IDeviceCommunication { }
public class SerialDeviceCommunication : IDeviceCommunication { }
public async Task<T> ExecuteAsync<T>(string code) { }

// Async methods always end with "Async"
public async Task ConnectAsync() { }
public async Task<bool> IsConnectedAsync() { }
```

### Error Handling
```csharp
// Use specific exception types
throw new DeviceConnectionException("Connection lost", innerException);

// Include device context in error messages  
throw new DeviceExecutionException($"Execution failed on {deviceName}", deviceTraceback);

// Use structured logging
_logger.LogError(ex, "Device {DeviceName} failed to execute {Code}", deviceName, code);
```

### Testing Guidelines
- Unit tests should not require hardware
- Use the `[Trait("Category", "Hardware")]` attribute for hardware tests
- Mock external dependencies in unit tests
- Test both success and failure scenarios

## Hardware Testing

### Setting Up Test Devices
1. **Raspberry Pi Pico** with MicroPython firmware
2. **ESP32** with MicroPython firmware  
3. **Unix Port** of MicroPython for subprocess testing

### Running Hardware Tests
```bash
# Run all hardware tests (requires connected devices)
dotnet test --filter "Category=Hardware" --logger console

# Run tests for specific device type
dotnet test --filter "Category=Hardware&Category=RaspberryPi"

# Performance benchmarks
dotnet test --filter "Category=Performance" --logger console
```

## Documentation

### Building Documentation Locally
```bash
cd docs
npm install
npm run dev  # Serves at http://localhost:5173
```

### Documentation Standards
- Use clear, concise language
- Include code examples for all public APIs
- Update navigation in `.vitepress/config.ts` when adding pages
- Test all code examples before committing

## Review Process

### What Reviewers Look For
- **Correctness**: Does the code work as intended?
- **Testing**: Are there adequate tests?  
- **Documentation**: Are public APIs documented?
- **Performance**: Any performance implications?
- **Breaking Changes**: Are they necessary and documented?

### Getting Your PR Merged
1. Ensure CI passes (build, tests, linting)
2. Address all reviewer feedback
3. Keep commits clean and atomic
4. Maintain up-to-date PR description

## Release Process

Only maintainers handle releases, but contributors should:
- Update `CHANGELOG.md` for significant changes
- Mark breaking changes clearly in commit messages
- Update version numbers in coordination with maintainers

## Getting Help

- **Questions**: Open a [Discussion](https://github.com/belay-dotnet/Belay.NET/discussions)
- **Bugs**: Create an [Issue](https://github.com/belay-dotnet/Belay.NET/issues)
- **Chat**: Join our community Discord (link TBD)

## Recognition

All contributors are recognized in:
- Repository contributors list
- Release notes for their contributions
- Annual contributor acknowledgments

Thank you for helping make Belay.NET better! 🎉