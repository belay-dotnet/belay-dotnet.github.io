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

# Validate content quality of generated files
echo "🔍 Validating generated content quality..."

# Check for essential README files
REQUIRED_READMES=("api/generated/Belay.Core/README.md" "api/generated/Belay.Attributes/README.md")
for readme in "${REQUIRED_READMES[@]}"; do
    if [ ! -f "$readme" ]; then
        echo "❌ Missing critical README: $readme"
        exit 1
    fi
    
    # Check README has actual content (not just header)
    if [ $(wc -l < "$readme") -lt 5 ]; then
        echo "❌ README appears empty or minimal: $readme"
        exit 1
    fi
done

# Validate sample files have proper markdown structure
SAMPLE_FILES=($(find api/generated -name "*.md" | head -5))
for file in "${SAMPLE_FILES[@]}"; do
    # Check for basic markdown structure
    if ! grep -q "^#" "$file" 2>/dev/null; then
        echo "❌ File lacks markdown headers: $file"
        exit 1
    fi
    
    # Check file is not empty
    if [ ! -s "$file" ]; then
        echo "❌ Empty file detected: $file"
        exit 1
    fi
done

# Check for expected namespace structure
if [ ! -d "api/generated/Belay.Core" ] || [ ! -d "api/generated/Belay.Attributes" ]; then
    echo "❌ Missing expected namespace directories"
    exit 1
fi

echo "✅ Content validation passed"
find api/generated -name "*.md" | head -10
echo "... and $(($GENERATED_COUNT - 10)) more files"

# Test VitePress build
echo "🏗️  Testing VitePress build..."
npm run build

# Validate VitePress output
echo "🔍 Validating VitePress build output..."
if [ ! -f ".vitepress/dist/index.html" ]; then
    echo "❌ VitePress build failed - no index.html"
    exit 1
fi

# Check critical pages exist
CRITICAL_PAGES=(".vitepress/dist/api/index.html" ".vitepress/dist/guide/getting-started.html")
for page in "${CRITICAL_PAGES[@]}"; do
    if [ ! -f "$page" ]; then
        echo "❌ Critical page missing: $page"
        exit 1
    fi
done

# Quick check for API content in built site
if ! find .vitepress/dist/api/generated -name "*.html" | head -1 | grep -q "html"; then
    echo "❌ API documentation not properly built into website"
    exit 1
fi

echo "✅ VitePress output validation passed"

echo "✅ Local build completed successfully!"
echo "📁 Output available in .vitepress/dist/"
echo "🌐 To serve locally: npm run dev"