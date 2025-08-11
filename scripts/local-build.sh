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

# No longer need markitdown for native DocFX markdown output

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf api/generated
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

# Generate DocFX documentation with native markdown output
echo "📖 Generating DocFX documentation with native markdown..."
docfx metadata docfx.json

echo "📁 Generated markdown files:"
GENERATED_COUNT=$(find api/generated -name "*.md" 2>/dev/null | wc -l)
if [ $GENERATED_COUNT -eq 0 ]; then
    echo "❌ No markdown files generated! DocFX may have failed."
    exit 1
fi
echo "✅ Generated $GENERATED_COUNT API documentation files"
find api/generated -name "*.md" | head -10
echo "... and $(($GENERATED_COUNT - 10)) more files"

# Test VitePress build
echo "🏗️  Testing VitePress build..."
npm run build

echo "✅ Local build completed successfully!"
echo "📁 Output available in .vitepress/dist/"
echo "🌐 To serve locally: npm run dev"