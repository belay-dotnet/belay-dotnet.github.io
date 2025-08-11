# CLAUDE.md - Documentation Website Development Guide

This file provides specific guidance for working on the belay-dotnet.github.io documentation website.

## Local Build Testing

**CRITICAL**: Always test changes locally before pushing to CI to avoid breaking the deployed website.

### Quick Local Build Test

```bash
cd docs
./scripts/local-build.sh
```

This script:
1. Checks for required tools (DocFX, Node.js)
2. Clones/updates the Belay.NET source repository if needed
3. Builds .NET projects for XML documentation
4. Generates DocFX API documentation with native markdown output
5. Validates that API files were generated (985+ files expected)
6. Tests the complete VitePress build
7. Reports success/failure with detailed output

### Prerequisites

The local build script will install most dependencies, but you may need:

- **Node.js 18+**: For VitePress
- **.NET 8 SDK**: For building source projects
- **DocFX**: Downloaded automatically by the script

### Manual Setup (if needed)

```bash
# Install DocFX
wget https://github.com/dotnet/docfx/releases/download/v2.78.3/docfx-linux-x64-v2.78.3.zip
unzip -q docfx-linux-x64-v2.78.3.zip -d /tmp/docfx
chmod +x /tmp/docfx/docfx
export PATH=/tmp/docfx:$PATH


# Install Node.js dependencies
npm ci
```

## API Documentation Pipeline

The documentation website includes auto-generated API documentation through this pipeline:

1. **Source Build**: Build Belay.NET projects to generate XML documentation
2. **DocFX Native Markdown**: Generate markdown directly from XML comments using DocFX `--outputFormat markdown`
3. **VitePress Build**: Generate the final static website

### Key Files

- `docfx.json`: DocFX configuration for API documentation generation
- `.github/workflows/deploy.yml`: CI/CD pipeline that builds and deploys the website

### Common Issues

#### Missing API Documentation
**Symptom**: API pages show minimal content
**Cause**: DocFX configuration issues with native markdown output
**Fix**: Ensure `outputFormat: "markdown"`, `memberLayout: "separatePages"` in `docfx.json`

#### Build Artifacts in Git
**Symptom**: Large commits with generated files
**Fix**: The `.vitepress/dist/` directory should not be committed - it contains build artifacts

### Testing Changes

1. **Always run local build first**: `./scripts/local-build.sh`
2. **Check the generated markdown**: Look for HTML parsing issues in `api/generated/`
3. **Verify VitePress can parse files**: Local build will fail if markdown is malformed
4. **Test navigation**: Ensure API documentation is accessible through the website

### Development Workflow

```bash
# 1. Make changes to DocFX configuration
vim docfx.json

# 2. Test locally BEFORE committing
./scripts/local-build.sh

# 3. If build succeeds, commit and push
git add .
git commit -m "Update API documentation generation"
git push

# 4. Monitor CI for successful deployment
gh run list --limit 1
```

This approach prevents broken deployments and ensures the website remains functional.