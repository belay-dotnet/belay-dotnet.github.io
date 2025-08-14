#!/bin/bash
set -e

echo "🔧 Setting up local documentation development environment"
echo "======================================================="

# Navigate to docs directory
cd "$(dirname "$0")/.."

# Create belay-source symlink if it doesn't exist
if [ ! -L "belay-source" ] && [ ! -d "belay-source" ]; then
    echo "🔗 Creating belay-source symlink..."
    ln -sf ../ belay-source
    echo "✅ Created symlink: belay-source -> ../"
elif [ -L "belay-source" ]; then
    echo "✅ belay-source symlink already exists"
elif [ -d "belay-source" ]; then
    echo "⚠️  belay-source directory exists (not a symlink)"
    echo "   This is fine for CI, but for local development you may want to use the symlink."
fi

# Verify structure
if [ -d "belay-source/src" ]; then
    echo "✅ belay-source/src structure verified"
else
    echo "❌ belay-source/src not found. Check your directory structure."
    exit 1
fi

echo ""
echo "🚀 Local development setup complete!"
echo ""
echo "Available commands:"
echo "  ./scripts/local-build.sh    - Full build test (DocFX + VitePress)"
echo "  npm run dev                 - Start development server"
echo "  npm run build               - Build for production"
echo ""
echo "Note: The belay-source symlink allows local development to use"
echo "      live source files while maintaining CI compatibility."