#!/bin/bash
set -e

echo "🔧 Local VitePress build test script"
echo "====================================="

# Check prerequisites
if ! command -v docfx &> /dev/null; then
    echo "❌ DocFX not found. Please install:"
    echo "   wget https://github.com/dotnet/docfx/releases/download/v2.78.3/docfx-linux-x64-v2.78.3.zip"
    echo "   unzip -q docfx-linux-x64-v2.78.3.zip -d /tmp/docfx"
    echo "   chmod +x /tmp/docfx/docfx"
    echo "   export PATH=/tmp/docfx:\$PATH"
    exit 1
fi

if ! command -v python3 -m markitdown &> /dev/null; then
    echo "❌ markitdown not found. Installing..."
    pip install markitdown
fi

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf api/generated/api
rm -rf .vitepress/dist
rm -rf .vitepress/cache

# Check if belay-source exists
if [ ! -d "../belay-source" ]; then
    echo "🔄 Cloning Belay.NET source repository..."
    cd ..
    git clone --depth 1 https://github.com/belay-dotnet/Belay.NET.git belay-source
    cd docs
fi

# Build .NET projects
echo "🔨 Building .NET projects for XML documentation..."
cd ../belay-source/src
for project in Belay.Attributes Belay.Core Belay.Extensions Belay.Sync; do
    echo "  Building $project..."
    cd $project
    dotnet restore --verbosity quiet
    dotnet build --configuration Release --verbosity quiet
    if [ $? -ne 0 ]; then
        echo "❌ $project build failed"
        exit 1
    fi
    echo "✅ $project built successfully"
    cd ..
done
cd ../../docs

# Generate DocFX documentation
echo "📖 Generating DocFX documentation..."
docfx metadata docfx.json
docfx build docfx.json

# Run our conversion script
echo "🔄 Converting DocFX to VitePress markdown..."
python3 convert_docfx_tree.py

# Test VitePress build
echo "🏗️  Testing VitePress build..."
npm run build

echo "✅ Local build completed successfully!"
echo "📁 Output available in .vitepress/dist/"
echo "🌐 To serve locally: npm run dev"