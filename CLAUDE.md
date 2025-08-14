# CLAUDE.md - Documentation Website Development Guide

This file provides specific guidance for working on the belay-dotnet.github.io documentation website.

## Local Build Testing

**MANDATORY PRE-COMMIT REQUIREMENT**: The local build script MUST be run and MUST pass before every single commit. This is non-negotiable to prevent CI failures and website breaks.

### REQUIRED Pre-Commit Workflow

```bash
cd docs

# Optional: Set up local development environment (first time)
./scripts/setup-local-dev.sh

# MANDATORY: Test locally before every commit - NO EXCEPTIONS
./scripts/local-build.sh

# ONLY commit if local build succeeds completely
git add .
git commit -m "Your changes"
git push
```

**⚠️ CRITICAL WARNING**: Commits without successful local build testing will break CI and the deployed website. The script validates the complete documentation pipeline including DocFX generation and VitePress building.

### How local-build.sh Works

The script automatically handles local development vs CI differences:

#### Local Development Mode:
1. **Creates belay-source symlink**: `ln -sf ../ belay-source` to link to live source files
2. **Builds .NET projects**: Compiles all projects for XML documentation generation
3. **Generates DocFX API docs**: Creates 442+ markdown files from XML comments
4. **Tests VitePress build**: Validates complete website generation
5. **Cleans up**: Removes build artifacts (keeps symlink for next run)

#### CI Compatibility:
- **docfx.json** uses `belay-source/src/` paths (not `../src/`)
- **GitHub Actions** clones main repository to `./belay-source/`
- **Same paths work** for both local symlink and CI clone

### Expected Output

Successful run should show:
```
🔧 Local VitePress build test script
🔗 Creating belay-source symlink for local development...
🔨 Building .NET projects for XML documentation...
✅ Generated 442 API documentation files
✅ VitePress output validation passed
✅ Local build completed successfully!
```

### Prerequisites and Setup

#### Required Tools:
- **Node.js 18+**: For VitePress (`node --version`)
- **.NET 8 SDK**: For building source projects (`dotnet --version`)
- **DocFX 2.78.3**: Auto-downloaded by script to `/tmp/docfx/`

#### First-Time Setup:
```bash
cd docs

# Install Node.js dependencies
npm ci

# Set up local development environment
./scripts/setup-local-dev.sh

# Test the build pipeline
export PATH=/tmp/docfx:$PATH  # May be needed for DocFX
./scripts/local-build.sh
```

#### DocFX Installation (Manual):
If the script fails to find DocFX, install manually:
```bash
# Download and install DocFX
wget https://github.com/dotnet/docfx/releases/download/v2.78.3/docfx-linux-x64-v2.78.3.zip
unzip -q docfx-linux-x64-v2.78.3.zip -d /tmp/docfx
chmod +x /tmp/docfx/docfx
export PATH=/tmp/docfx:$PATH

# Verify installation
docfx --version
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

1. **MANDATORY**: Run `./scripts/local-build.sh` - NO EXCEPTIONS
2. **Validate generation**: Ensure 442+ API files are created
3. **Verify VitePress build**: Script will fail if website build breaks
4. **Check output**: Review script output for any warnings or issues

### Troubleshooting

#### Common Issues:

**DocFX not found:**
```bash
export PATH=/tmp/docfx:$PATH
./scripts/local-build.sh
```

**belay-source missing:**
```bash
./scripts/setup-local-dev.sh  # Creates symlink
```

**Node modules missing:**
```bash
npm ci  # Install dependencies
```

**VitePress build fails:**
- Check for malformed markdown in generated files
- Verify all internal links are valid
- Review console output for specific errors

### MANDATORY Development Workflow

**⚠️ ZERO-TOLERANCE POLICY**: Local build testing is MANDATORY for every commit. Any commit that breaks CI due to skipped local testing is a process violation.

```bash
# 1. Make any changes to documentation
vim docfx.json  # or any other files

# 2. MANDATORY: Test locally BEFORE committing - NO EXCEPTIONS
export PATH=/tmp/docfx:$PATH  # Ensure DocFX is available
./scripts/local-build.sh

# 3. ONLY proceed if local build passes completely
if [ $? -eq 0 ]; then
    echo "✅ Local build passed - safe to commit"
    git add .
    git commit -m "Update documentation"
    git push
else
    echo "❌ FIX LOCAL BUILD ISSUES BEFORE COMMITTING"
    echo "❌ DO NOT COMMIT until ./scripts/local-build.sh succeeds"
    exit 1
fi

# 4. Monitor CI (should succeed if local build passed)
gh run list --limit 1
```

#### Critical Success Criteria:
- ✅ **442+ API files generated** (DocFX working)
- ✅ **VitePress build completes** (No syntax errors)
- ✅ **No build script errors** (All validations pass)

#### Enforcement:
The local build script catches 99% of issues before they reach CI. This prevents:
- ❌ Broken documentation website deployments
- ❌ CI failures that waste time and resources  
- ❌ Broken links or malformed documentation pages

**REMEMBER**: Better to spend time on proper validation than fix broken deployments.