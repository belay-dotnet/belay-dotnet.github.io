# CLAUDE.md - Documentation Website Development Guide

This file provides specific guidance for working on the belay-dotnet.github.io documentation website.

## Local Build Testing

**MANDATORY PRE-COMMIT REQUIREMENT**: The local build script MUST be run and MUST pass before every single commit. This is non-negotiable to prevent CI failures and website breaks.

### REQUIRED Pre-Commit Workflow

```bash
cd docs

# MANDATORY: Test locally before every commit
./scripts/local-build.sh

# ONLY commit if local build succeeds completely
git add .
git commit -m "Your changes"
git push
```

**⚠️ WARNING**: Commits without successful local build testing will likely break CI and the deployed website. The script validates the complete documentation pipeline including DocFX generation and VitePress building.

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

1. **MANDATORY**: Run `./scripts/local-build.sh` - NO EXCEPTIONS
2. **Validate generation**: Ensure 985+ API files are created
3. **Verify VitePress build**: Script will fail if website build breaks
4. **Check output**: Review script output for any warnings or issues

### MANDATORY Development Workflow

**⚠️ CRITICAL REQUIREMENT**: Local build testing is MANDATORY for every commit.

```bash
# 1. Make any changes to documentation
vim docfx.json  # or any other files

# 2. MANDATORY: Test locally BEFORE committing - NO EXCEPTIONS
./scripts/local-build.sh

# 3. ONLY proceed if local build passes completely
if [ $? -eq 0 ]; then
    git add .
    git commit -m "Update documentation"
    git push
else
    echo "❌ FIX LOCAL BUILD ISSUES BEFORE COMMITTING"
    exit 1
fi

# 4. Monitor CI (should succeed if local build passed)
gh run list --limit 1
```

**ENFORCEMENT**: Any commit that breaks CI due to skipped local testing is considered a process violation. The local build script catches 99% of issues before they reach CI.

This approach prevents broken deployments and ensures the website remains functional.