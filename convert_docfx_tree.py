#!/usr/bin/env python3
import os
import sys
import subprocess
import re
from pathlib import Path

def clean_markdown_content(content):
    """Clean up markitdown output for VitePress compatibility"""
    # Remove .html extensions from links
    content = re.sub(r'\.html\)', ')', content)
    
    # Fix malformed HTML elements by removing unclosed tags
    content = re.sub(r'<[^>]*$', '', content, flags=re.MULTILINE)  # Remove incomplete tags at end of lines
    content = re.sub(r'<(?!/)[^>]*>', '', content)  # Remove opening tags (keep closing tags)
    content = re.sub(r'</[^>]*>', '', content)  # Remove all closing tags
    
    # Clean up HTML entities and special characters  
    content = re.sub(r'&[a-zA-Z]+;', '', content)  # Remove HTML entities
    content = re.sub(r'\\\\', '', content)  # Remove escape characters
    
    # Remove JavaScript/TypeScript import statements that cause VitePress errors
    content = re.sub(r'^\s*import\s+.*from.*["\'].*["\'];?\s*$', '', content, flags=re.MULTILINE)
    content = re.sub(r'^\s*export\s+.*$', '', content, flags=re.MULTILINE)
    
    # Remove all problematic markdown links that cause VitePress import errors
    content = re.sub(r'\[([^\]]*)\]\([^)]*\)', r'\1', content)  # Convert all links to plain text
    
    # Clean up multiple consecutive empty lines
    content = re.sub(r'\n\s*\n\s*\n', '\n\n', content)
    
    return content

def convert_html_file(html_path, output_dir):
    """Convert a single HTML file to markdown"""
    try:
        # Use markitdown to convert
        result = subprocess.run(['python3', '-m', 'markitdown', html_path], 
                              capture_output=True, text=True)
        if result.returncode != 0:
            print(f"⚠️ Failed to convert {html_path}: {result.stderr}")
            return False
        
        # Clean the content
        content = clean_markdown_content(result.stdout)
        
        # Extract filename and create output path
        html_name = Path(html_path).stem
        if html_name.endswith('.html'):
            html_name = html_name[:-5]
        
        # Create directory structure
        output_path = output_dir / f"{html_name}.md"
        output_path.parent.mkdir(parents=True, exist_ok=True)
        
        # Write the markdown
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(content)
        
        return True
    except Exception as e:
        print(f"⚠️ Error converting {html_path}: {e}")
        return False

def main():
    metadata_dir = Path("api/generated/api/metadata")
    output_dir = Path("api/generated")
    
    if not metadata_dir.exists():
        print("❌ DocFX metadata directory not found")
        return 1
    
    # Process all HTML files
    html_files = list(metadata_dir.glob("*.html"))
    converted = 0
    
    for html_file in html_files:
        if html_file.name not in ['toc.html']:  # Skip table of contents
            if convert_html_file(html_file, output_dir):
                converted += 1
    
    print(f"✅ Converted {converted}/{len(html_files)} API documentation files")
    return 0

if __name__ == "__main__":
    sys.exit(main())