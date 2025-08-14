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

# Set up belay-source symlink for local development
if [ ! -d "belay-source" ]; then
    echo "🔗 Creating belay-source symlink for local development..."
    ln -sf ../ belay-source
fi

# Verify belay-source structure exists
if [ ! -d "belay-source/src" ]; then
    echo "❌ belay-source/src directory not found."
    echo "Expected structure: belay-source/src/Belay.Core/, etc."
    exit 1
fi

# Build .NET projects for XML documentation only (disable StyleCop)
echo "🔨 Building .NET projects for XML documentation..."
cd belay-source/src
for project in Belay.Attributes Belay.Core Belay.Extensions Belay.Sync; do
    echo "  Building $project..."
    cd $project
    dotnet restore --verbosity quiet
    # Build with StyleCop disabled for documentation generation
    dotnet build --configuration Release --verbosity quiet \
        -p:RunStyleCopAnalyzers=false \
        -p:TreatWarningsAsErrors=false \
        -p:RunAnalyzersDuringBuild=false \
        -p:EnableNETAnalyzers=false
    if [ $? -ne 0 ]; then
        echo "❌ $project build failed"
        exit 1
    fi
    echo "✅ $project built successfully"
    cd ..
done
cd ../../

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

# Check for essential namespace documentation files (flat structure)
REQUIRED_NAMESPACES=("Belay.Core" "Belay.Attributes" "Belay.Extensions" "Belay.Sync")
for namespace in "${REQUIRED_NAMESPACES[@]}"; do
    NAMESPACE_FILES=$(find api/generated -name "${namespace}.*.md" | wc -l)
    if [ $NAMESPACE_FILES -eq 0 ]; then
        echo "❌ No files found for namespace: $namespace"
        exit 1
    fi
    echo "✅ Found $NAMESPACE_FILES files for namespace $namespace"
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

# Check for main namespace files
if [ ! -f "api/generated/Belay.Core.md" ] || [ ! -f "api/generated/Belay.Attributes.md" ]; then
    echo "❌ Missing main namespace documentation files"
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