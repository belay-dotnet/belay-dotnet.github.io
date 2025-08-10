#!/usr/bin/env python3
"""
Simple and reliable API documentation generator
"""

import xml.etree.ElementTree as ET
import os
import sys
import glob
from pathlib import Path

def clean_text(text):
    """Clean up XML text"""
    if not text:
        return "No description available"
    return ' '.join(text.strip().split())

def create_assembly_docs(xml_file):
    """Create documentation for one assembly"""
    try:
        tree = ET.parse(xml_file)
        root = tree.getroot()
        
        assembly_name = root.find('assembly/name').text
        output_dir = Path(f"api/generated/{assembly_name}")
        output_dir.mkdir(parents=True, exist_ok=True)
        
        with open(output_dir / "README.md", "w") as f:
            f.write(f"# {assembly_name} API Reference\n\n")
            f.write("Auto-generated from XML documentation.\n\n")
            
            # Get all types
            types = []
            for member in root.findall('.//member'):
                name = member.get('name', '')
                if name.startswith('T:'):
                    type_name = name[2:]  # Remove T: prefix
                    summary_elem = member.find('summary')
                    summary = clean_text(summary_elem.text if summary_elem is not None else "")
                    types.append((type_name, summary))
            
            f.write(f"## Overview\n\n{len(types)} types documented in this assembly.\n\n")
            
            # List types with summaries (limit to prevent huge docs)
            for type_name, summary in types[:25]:
                f.write(f"### {type_name}\n\n{summary}\n\n---\n\n")
        
        print(f"✅ Generated docs for {assembly_name}")
        return True
        
    except Exception as e:
        print(f"❌ Error processing {xml_file}: {e}")
        return False

def main():
    """Main function"""
    xml_pattern = sys.argv[1] if len(sys.argv) > 1 else "belay-source/src/*/bin/Release/net8.0/*.xml"
    xml_files = glob.glob(xml_pattern)
    xml_files = [f for f in xml_files if '/ref/' not in f][:10]  # Limit files
    
    print(f"Processing {len(xml_files)} XML files...")
    
    if not xml_files:
        print("❌ No XML files found, creating fallback documentation...")
        os.system("python3 scripts/create-fallback-api.py")
        return
    
    success_count = 0
    for xml_file in xml_files:
        if os.path.exists(xml_file) and create_assembly_docs(xml_file):
            success_count += 1
    
    if success_count == 0:
        print("❌ No XML files processed successfully, creating fallback documentation...")
        os.system("python3 scripts/create-fallback-api.py")
        return
        
    print(f"Successfully processed {success_count}/{len(xml_files)} XML files")
    
    # Create main API index
    with open("api/index.md", "w") as f:
        f.write("# API Reference\n\n")
        f.write("Comprehensive API documentation automatically generated from XML comments.\n\n")
        
        # Check for generated docs
        generated_dirs = []
        api_generated = Path("api/generated")
        if api_generated.exists():
            generated_dirs = [d.name for d in api_generated.iterdir() if d.is_dir()]
        
        if generated_dirs:
            f.write("## Generated Documentation\n\n")
            for assembly in sorted(generated_dirs):
                f.write(f"- **[{assembly}](./generated/{assembly}/README.md)** - {assembly} API documentation\n")
        else:
            f.write("## API Documentation\n\nAPI documentation will be available when XML files are processed.\n")
        
        f.write("""

## Quick Reference

### Core Classes
- **Device** - Main device connection and communication
- **TaskExecutor** - Handles [Task] attribute methods
- **EnhancedExecutor** - Advanced method interception framework
- **DeviceProxy** - Dynamic proxy for transparent method routing

### Attributes
- **TaskAttribute** - Execute methods as tasks with caching and timeout
- **ThreadAttribute** - Background thread execution
- **SetupAttribute** - Device initialization methods
- **TeardownAttribute** - Device cleanup methods

## Usage Examples

For practical examples, see the [Examples](/examples/) section.
""")
    
    print("✅ Created main API index")

if __name__ == "__main__":
    main()