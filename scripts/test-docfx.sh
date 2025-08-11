#!/bin/bash
# Test DocFX generation locally

set -e

echo "🔧 Testing DocFX API documentation generation..."

# Check if DocFX is available
if ! command -v docfx &> /dev/null; then
    echo "❌ DocFX not found. Install with:"
    echo "   dotnet tool install -g docfx"
    exit 1
fi

# Check if belay-source exists
if [ ! -d "belay-source" ]; then
    echo "📂 Cloning Belay.NET source..."
    git clone https://github.com/belay-dotnet/Belay.NET.git belay-source
fi

# Build the .NET projects to generate XML
echo "🔨 Building .NET projects to generate XML documentation..."
cd belay-source
dotnet build -c Release
cd ..

# Generate metadata
echo "📊 Generating metadata with DocFX..."
docfx metadata docfx.json

# Build documentation
echo "📄 Building documentation with DocFX..."
docfx build docfx.json

# Check output
if [ -d "api/generated" ]; then
    echo "✅ DocFX generation successful!"
    echo "📁 Generated files in api/generated/:"
    ls -la api/generated/
else
    echo "❌ DocFX generation failed - no output directory found"
    exit 1
fi

echo "🎉 Test completed successfully!"