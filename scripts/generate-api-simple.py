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
    """Create comprehensive documentation for one assembly"""
    try:
        tree = ET.parse(xml_file)
        root = tree.getroot()
        
        assembly_name = root.find('assembly/name').text
        output_dir = Path(f"api/generated/{assembly_name}")
        output_dir.mkdir(parents=True, exist_ok=True)
        
        # Organize members by type
        types = {}
        methods = {}
        properties = {}
        
        for member in root.findall('.//member'):
            name = member.get('name', '')
            summary_elem = member.find('summary')
            summary = clean_text(summary_elem.text if summary_elem is not None else "")
            
            if name.startswith('T:'):
                # Type documentation
                type_name = name[2:]
                types[type_name] = {
                    'summary': summary,
                    'remarks': clean_text(member.find('remarks').text if member.find('remarks') is not None else ""),
                    'examples': []
                }
                
                # Extract examples
                for example in member.findall('.//example'):
                    if example.text:
                        types[type_name]['examples'].append(clean_text(example.text))
                        
            elif name.startswith('M:'):
                # Method documentation
                method_name = name[2:]
                type_prefix = method_name.split('#')[0] if '#' in method_name else method_name.rsplit('.', 1)[0]
                
                if type_prefix not in methods:
                    methods[type_prefix] = []
                
                # Extract parameters
                params = []
                for param in member.findall('.//param'):
                    param_name = param.get('name', '')
                    param_desc = clean_text(param.text if param.text else "")
                    params.append((param_name, param_desc))
                
                # Extract return value
                returns_elem = member.find('returns')
                returns = clean_text(returns_elem.text if returns_elem is not None else "")
                
                methods[type_prefix].append({
                    'name': method_name,
                    'summary': summary,
                    'parameters': params,
                    'returns': returns
                })
                
            elif name.startswith('P:'):
                # Property documentation
                prop_name = name[2:]
                type_prefix = prop_name.rsplit('.', 1)[0]
                
                if type_prefix not in properties:
                    properties[type_prefix] = []
                
                properties[type_prefix].append({
                    'name': prop_name,
                    'summary': summary
                })
        
        # Generate comprehensive documentation
        with open(output_dir / "README.md", "w") as f:
            f.write(f"# {assembly_name} API Reference\n\n")
            f.write("Comprehensive API documentation generated from XML comments.\n\n")
            f.write(f"## Overview\n\n{len(types)} types documented in this assembly.\n\n")
            
            # Generate detailed type documentation
            for type_name, type_info in list(types.items())[:15]:  # Limit for size
                f.write(f"## {type_name}\n\n")
                f.write(f"{type_info['summary']}\n\n")
                
                if type_info['remarks']:
                    f.write(f"### Remarks\n\n{type_info['remarks']}\n\n")
                
                # Add methods for this type
                if type_name in methods:
                    f.write("### Methods\n\n")
                    for method in methods[type_name][:5]:  # Limit methods per type
                        method_short = method['name'].split('.')[-1].split('(')[0]
                        f.write(f"#### {method_short}\n\n")
                        f.write(f"{method['summary']}\n\n")
                        
                        if method['parameters']:
                            f.write("**Parameters:**\n\n")
                            for param_name, param_desc in method['parameters']:
                                f.write(f"- `{param_name}`: {param_desc}\n")
                            f.write("\n")
                        
                        if method['returns']:
                            f.write(f"**Returns:** {method['returns']}\n\n")
                
                # Add properties for this type
                if type_name in properties:
                    f.write("### Properties\n\n")
                    for prop in properties[type_name][:5]:  # Limit properties per type
                        prop_short = prop['name'].split('.')[-1]
                        f.write(f"#### {prop_short}\n\n")
                        f.write(f"{prop['summary']}\n\n")
                
                # Add examples
                if type_info['examples']:
                    f.write("### Examples\n\n")
                    for example in type_info['examples'][:2]:  # Limit examples
                        f.write(f"```csharp\n{example}\n```\n\n")
                
                f.write("---\n\n")
        
        print(f"✅ Generated comprehensive docs for {assembly_name}")
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
        print("❌ No XML files found, creating enhanced fallback documentation...")
        os.system("python3 scripts/create-fallback-api.py")
        return
    
    success_count = 0
    low_quality_count = 0
    
    for xml_file in xml_files:
        if os.path.exists(xml_file):
            # Check if XML has substantial content
            try:
                tree = ET.parse(xml_file)
                root = tree.getroot()
                members = root.findall('.//member')
                
                # Count members with actual documentation
                documented_count = 0
                for member in members:
                    summary = member.find('summary')
                    if summary is not None and summary.text and len(summary.text.strip()) > 20:
                        documented_count += 1
                
                # If less than 30% have substantial documentation, consider it low quality
                if len(members) > 0 and documented_count / len(members) < 0.3:
                    print(f"⚠️  {xml_file} has minimal documentation ({documented_count}/{len(members)} documented)")
                    low_quality_count += 1
                
            except Exception:
                pass
            
            if create_assembly_docs(xml_file):
                success_count += 1
    
    # If most files have low quality documentation, supplement with fallback
    if low_quality_count > success_count / 2:
        print(f"📝 XML documentation appears minimal, creating enhanced fallback documentation...")
        os.system("python3 scripts/create-fallback-api.py")
        return
    
    if success_count == 0:
        print("❌ No XML files processed successfully, creating enhanced fallback documentation...")
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