# 🚨 URGENT: Fix Missing VitePress Navigation & Theming

## Problem
https://belay-dotnet.github.io/ shows only raw markdown content - no navigation, header, footer, or VitePress theming.

## Required Fix
**You must manually create this GitHub Actions workflow file:**

### 1. Create `.github/workflows/deploy.yml`:
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

### 2. Configure GitHub Pages
- Go to Repository Settings → Pages  
- Set Source to **"GitHub Actions"** (not "Deploy from a branch")

## This Will Restore
- ✅ Navigation header with Belay.NET logo
- ✅ Footer with copyright and links
- ✅ GitHub social links
- ✅ Search functionality
- ✅ Professional VitePress styling
- ✅ Mobile responsive design

**OAuth scope limitation prevents automated deployment of this fix.**