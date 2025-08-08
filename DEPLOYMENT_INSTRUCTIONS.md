# VitePress Deployment Fix for belay-dotnet.github.io

The issue is that GitHub Pages is serving raw markdown files instead of the built VitePress site. Here's how to fix it:

## Problem
- Site shows content but no VitePress navigation, header, footer, or theming
- GitHub Pages is not building the VitePress site properly

## Solution
You need to manually add these files to the belay-dotnet.github.io repository:

### 1. GitHub Actions Workflow
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy VitePress site to Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0
          
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: npm
          
      - name: Setup Pages
        uses: actions/configure-pages@v4
        
      - name: Install dependencies
        run: npm ci
        
      - name: Build with VitePress
        run: |
          npm run build
          touch .vitepress/dist/.nojekyll
          
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: .vitepress/dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    name: Deploy
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 2. GitHub Pages Configuration
Go to the belay-dotnet.github.io repository settings:

1. Navigate to **Settings** → **Pages**
2. Under **Source**, select **"GitHub Actions"** (not "Deploy from a branch")
3. Save the settings

### 3. Verify Dependencies
Ensure these files exist in the repository:
- `package.json` (already exists)
- `.vitepress/config.ts` (already exists) 
- Node.js dependencies will be installed by the workflow

## What This Fixes
After implementing these changes:
- ✅ VitePress will build the site properly with navigation, header, footer
- ✅ Logo will appear in the navigation bar
- ✅ Theme styling will be applied
- ✅ Social links and footer will be visible
- ✅ Site will have proper VitePress layout instead of raw markdown

## Alternative Quick Fix
If you can't add the workflow immediately, you can also:
1. Run `npm run build` locally in the docs folder
2. Copy the contents of `.vitepress/dist/` to the repository root
3. Add a `.nojekyll` file to the root
4. Commit and push

But the GitHub Actions approach is recommended for automatic deployments.