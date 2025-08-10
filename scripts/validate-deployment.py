#!/usr/bin/env python3
"""
Deployment health validation script
Performs comprehensive checks on the built site before deployment
"""

import os
import sys
import json
from pathlib import Path
import re
from urllib.parse import urlparse, urljoin
from collections import defaultdict

class DeploymentValidator:
    def __init__(self, dist_path=".vitepress/dist"):
        self.dist_path = Path(dist_path)
        self.errors = []
        self.warnings = []
        self.stats = defaultdict(int)
        
    def log_error(self, message):
        """Log a validation error"""
        self.errors.append(message)
        print(f"❌ ERROR: {message}")
        
    def log_warning(self, message):
        """Log a validation warning"""
        self.warnings.append(message)
        print(f"⚠️  WARNING: {message}")
        
    def log_info(self, message):
        """Log informational message"""
        print(f"ℹ️  {message}")
        
    def validate_critical_files(self):
        """Check that essential files exist"""
        self.log_info("Validating critical files...")
        
        critical_files = [
            "index.html",
            "guide/getting-started.html",  # Guide doesn't have index, starts with getting-started
            "examples/index.html",
            "api/index.html",
            "hardware/index.html"
        ]
        
        for file_path in critical_files:
            full_path = self.dist_path / file_path
            if not full_path.exists():
                self.log_error(f"Critical file missing: {file_path}")
            else:
                self.stats["critical_files"] += 1
                
    def validate_api_documentation(self):
        """Check API documentation was generated properly"""
        self.log_info("Validating API documentation...")
        
        api_generated = self.dist_path / "api" / "generated"
        if not api_generated.exists():
            self.log_error("API documentation directory not found")
            return
            
        # Check for expected assemblies (HTML files in built site)
        expected_assemblies = ["Belay.Core", "Belay.Attributes", "Belay.Sync"]
        found_assemblies = []
        fallback_count = 0
        
        for assembly in expected_assemblies:
            assembly_path = api_generated / assembly / "README.html"  # Built site has HTML files
            if assembly_path.exists():
                found_assemblies.append(assembly)
                self.stats["api_assemblies"] += 1
                
                # Check if it's fallback documentation
                try:
                    with open(assembly_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                        if "Fallback documentation" in content:
                            fallback_count += 1
                except Exception:
                    pass
            else:
                self.log_warning(f"API documentation missing for {assembly}")
        
        if fallback_count > 0:
            self.log_warning(f"Using fallback documentation for {fallback_count} assemblies due to build issues")
                
        self.log_info(f"Found API documentation for {len(found_assemblies)}/{len(expected_assemblies)} assemblies")
        
    def validate_navigation_integrity(self):
        """Check that navigation links work"""
        self.log_info("Validating navigation integrity...")
        
        # Read the main index.html to check navigation structure
        index_path = self.dist_path / "index.html"
        if not index_path.exists():
            self.log_error("Cannot validate navigation: index.html missing")
            return
            
        try:
            with open(index_path, 'r', encoding='utf-8') as f:
                content = f.read()
                
            # Look for navigation patterns that might be broken
            nav_patterns = [
                r'href="[^"]*guide[^"]*"',
                r'href="[^"]*examples[^"]*"', 
                r'href="[^"]*api[^"]*"',
                r'href="[^"]*hardware[^"]*"'
            ]
            
            for pattern in nav_patterns:
                matches = re.findall(pattern, content)
                if matches:
                    self.stats["nav_links"] += len(matches)
                    
            # Check for obvious broken link indicators
            if '404' in content and ('nav' in content.lower() or 'menu' in content.lower()):
                self.log_warning("Potential navigation 404 detected in index.html")
                
        except Exception as e:
            self.log_warning(f"Could not validate navigation: {e}")
            
    def validate_assets_and_resources(self):
        """Check that assets and resources are present"""
        self.log_info("Validating assets and resources...")
        
        # Check for common asset directories
        asset_dirs = ["assets", "_app", "images", "logo.svg"]
        
        for asset in asset_dirs:
            asset_path = self.dist_path / asset
            if asset_path.exists():
                if asset_path.is_file():
                    self.stats["assets"] += 1
                else:
                    # Count files in directory
                    try:
                        files = list(asset_path.rglob("*"))
                        file_count = len([f for f in files if f.is_file()])
                        self.stats["assets"] += file_count
                    except Exception:
                        pass
                        
        self.log_info(f"Found {self.stats['assets']} asset files")
        
    def validate_content_quality(self):
        """Perform basic content quality checks"""
        self.log_info("Validating content quality...")
        
        # Check that main pages have substantial content
        important_pages = [
            "guide/getting-started.html",
            "examples/first-connection.html", 
            "api/index.html"
        ]
        
        for page in important_pages:
            page_path = self.dist_path / page
            if page_path.exists():
                try:
                    with open(page_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                        
                    # Basic checks for placeholder content
                    if len(content) < 500:  # Very minimal content
                        self.log_warning(f"Page {page} has very little content ({len(content)} chars)")
                    elif "Documentation in Progress" in content:
                        self.log_warning(f"Page {page} still contains placeholder content")
                    else:
                        self.stats["quality_pages"] += 1
                        
                except Exception as e:
                    self.log_warning(f"Could not check content quality for {page}: {e}")
                    
    def generate_report(self):
        """Generate a deployment validation report"""
        self.log_info("Generating validation report...")
        
        total_issues = len(self.errors) + len(self.warnings)
        
        print("\n" + "="*60)
        print("DEPLOYMENT VALIDATION REPORT")
        print("="*60)
        
        print(f"\n📊 STATISTICS:")
        for key, value in self.stats.items():
            print(f"  {key.replace('_', ' ').title()}: {value}")
            
        if self.errors:
            print(f"\n❌ ERRORS ({len(self.errors)}):")
            for error in self.errors:
                print(f"  • {error}")
                
        if self.warnings:
            print(f"\n⚠️  WARNINGS ({len(self.warnings)}):")
            for warning in self.warnings:
                print(f"  • {warning}")
                
        print(f"\n🏁 SUMMARY:")
        if len(self.errors) == 0:
            print("  ✅ No critical errors found - deployment ready")
            if len(self.warnings) == 0:
                print("  🎉 Perfect validation - no issues detected")
                return 0
            else:
                print(f"  ⚠️  {len(self.warnings)} warnings found (deployment will proceed)")
                return 0
        else:
            print(f"  ❌ {len(self.errors)} errors found - deployment blocked")
            return 1
    
    def run_validation(self):
        """Run complete validation suite"""
        self.log_info("Starting deployment validation...")
        
        if not self.dist_path.exists():
            self.log_error(f"Build output directory not found: {self.dist_path}")
            return self.generate_report()
            
        # Run all validation checks
        self.validate_critical_files()
        self.validate_api_documentation()
        self.validate_navigation_integrity()
        self.validate_assets_and_resources()
        self.validate_content_quality()
        
        return self.generate_report()

def main():
    """Main function"""
    dist_path = sys.argv[1] if len(sys.argv) > 1 else ".vitepress/dist"
    
    validator = DeploymentValidator(dist_path)
    exit_code = validator.run_validation()
    
    sys.exit(exit_code)

if __name__ == "__main__":
    main()