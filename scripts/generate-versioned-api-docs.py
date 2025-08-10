#!/usr/bin/env python3

"""
Generate versioned API documentation from multiple releases
Creates a comprehensive version selector and archives API docs for each release
"""

import xml.etree.ElementTree as ET
import os
import re
import json
import subprocess
from pathlib import Path
from collections import defaultdict
import glob
import requests
from typing import List, Dict, Any

def get_github_releases(repo: str) -> List[Dict[str, Any]]:
    """Fetch releases from GitHub API"""
    try:
        response = requests.get(f"https://api.github.com/repos/{repo}/releases")
        response.raise_for_status()
        releases = response.json()
        
        # Filter out draft releases and sort by publication date
        published_releases = [r for r in releases if not r['draft']]
        published_releases.sort(key=lambda x: x['published_at'], reverse=True)
        
        return published_releases
    except Exception as e:
        print(f"Warning: Could not fetch releases from GitHub: {e}")
        return []

def get_local_version() -> str:
    """Get current version from local repository"""
    try:
        # Try to get version from git describe
        result = subprocess.run(['git', 'describe', '--tags', '--abbrev=0'], 
                              capture_output=True, text=True, cwd='belay-source')
        if result.returncode == 0:
            return result.stdout.strip()
    except:
        pass
    
    # Fallback to main branch
    return "main"

def clean_xml_text(text):
    """Clean up XML text content"""
    if not text:
        return ""
    # Remove extra whitespace and normalize
    text = re.sub(r'\s+', ' ', text.strip())
    # Escape angle brackets to prevent Vue parsing issues
    text = text.replace('<', '&lt;').replace('>', '&gt;')
    # Convert some common XML doc tags to markdown (after escaping)
    text = text.replace('&lt;c&gt;', '`').replace('&lt;/c&gt;', '`')
    text = re.sub(r'&lt;see cref="T:([^"]+)"/&gt;', r'`\1`', text)
    text = re.sub(r'&lt;see cref="M:([^"]+)"/&gt;', r'`\1`', text)  
    text = re.sub(r'&lt;see cref="P:([^"]+)"/&gt;', r'`\1`', text)
    text = re.sub(r'&lt;paramref name="([^"]+)"/&gt;', r'`\1`', text)
    return text

def extract_code_examples(text):
    """Extract code examples from XML documentation"""
    if not text:
        return ""
    
    # Find <code> blocks
    code_blocks = re.findall(r'<code>(.*?)</code>', text, re.DOTALL)
    markdown_code = ""
    
    for code in code_blocks:
        # Clean up the code
        code = re.sub(r'^\s*///', '', code, flags=re.MULTILINE)
        code = code.strip()
        if code:
            # Determine language (simple heuristic)
            lang = "csharp" if any(keyword in code for keyword in ["public", "class", "using", "await", "var"]) else ""
            markdown_code += f"\n```{lang}\n{code}\n```\n"
    
    return markdown_code

def process_member(member, member_type):
    """Process a single member (method, property, etc.)"""
    name = member.get('name', '')
    
    # Remove type prefix (T:, M:, P:, F:)
    clean_name = name[2:] if name.startswith(('T:', 'M:', 'P:', 'F:')) else name
    
    # Get summary
    summary_elem = member.find('summary')
    summary = clean_xml_text(summary_elem.text if summary_elem is not None else "")
    
    # Get remarks
    remarks_elem = member.find('remarks')
    remarks = clean_xml_text(remarks_elem.text if remarks_elem is not None else "")
    
    # Get example
    example_elem = member.find('example')
    example = ""
    if example_elem is not None:
        example_text = ET.tostring(example_elem, encoding='unicode', method='text')
        example = clean_xml_text(example_text)
        # Also check for code blocks
        example += extract_code_examples(ET.tostring(example_elem, encoding='unicode'))
    
    # Get parameters (for methods)
    params = []
    for param in member.findall('param'):
        param_name = param.get('name', '')
        param_text = clean_xml_text(param.text or '')
        if param_name and param_text:
            params.append((param_name, param_text))
    
    # Get return value
    returns_elem = member.find('returns')
    returns = clean_xml_text(returns_elem.text if returns_elem is not None else "")
    
    # Get exceptions
    exceptions = []
    for exception in member.findall('exception'):
        exc_type = exception.get('cref', '')
        exc_text = clean_xml_text(exception.text or '')
        if exc_type and exc_text:
            # Clean up cref format
            exc_type = exc_type.replace('T:', '')
            exceptions.append((exc_type, exc_text))
    
    return {
        'name': clean_name,
        'summary': summary,
        'remarks': remarks,
        'example': example,
        'parameters': params,
        'returns': returns,
        'exceptions': exceptions,
        'member_type': member_type
    }

def process_xml_file(xml_path, version):
    """Convert XML documentation to markdown for a specific version"""
    try:
        tree = ET.parse(xml_path)
        root = tree.getroot()
        
        assembly_name = root.find('assembly/name').text
        output_dir = Path(f"api/versions/{version}/{assembly_name}")
        output_dir.mkdir(parents=True, exist_ok=True)
        
        # Group members by namespace and type
        namespaces = defaultdict(lambda: defaultdict(list))
        types = {}
        
        # First pass: collect all types and organize by namespace
        for member in root.findall('.//member'):
            name = member.get('name', '')
            
            if name.startswith('T:'):  # Type
                type_info = process_member(member, 'type')
                full_name = type_info['name']
                
                # Extract namespace
                if '.' in full_name:
                    namespace = '.'.join(full_name.split('.')[:-1])
                    type_name = full_name.split('.')[-1]
                else:
                    namespace = assembly_name
                    type_name = full_name
                
                types[full_name] = type_info
                namespaces[namespace]['types'].append((type_name, full_name, type_info))
        
        # Second pass: collect members for each type
        for member in root.findall('.//member'):
            name = member.get('name', '')
            
            if name.startswith('M:'):  # Method
                member_info = process_member(member, 'method')
                # Find parent type
                method_name = member_info['name']
                if '(' in method_name:
                    method_name = method_name.split('(')[0]  # Remove parameters
                type_name = '.'.join(method_name.split('.')[:-1])
                if type_name in types:
                    if 'methods' not in types[type_name]:
                        types[type_name]['methods'] = []
                    types[type_name]['methods'].append(member_info)
                        
            elif name.startswith('P:'):  # Property
                member_info = process_member(member, 'property')
                # Find parent type
                prop_name = member_info['name']
                type_name = '.'.join(prop_name.split('.')[:-1])
                if type_name in types:
                    if 'properties' not in types[type_name]:
                        types[type_name]['properties'] = []
                    types[type_name]['properties'].append(member_info)
                        
            elif name.startswith('F:'):  # Field
                member_info = process_member(member, 'field')
                # Find parent type
                field_name = member_info['name']
                type_name = '.'.join(field_name.split('.')[:-1])
                if type_name in types:
                    if 'fields' not in types[type_name]:
                        types[type_name]['fields'] = []
                    types[type_name]['fields'].append(member_info)
        
        # Generate main README
        with open(output_dir / "README.md", "w") as f:
            f.write(f"# {assembly_name} API Reference ({version})\n\n")
            f.write("Comprehensive API documentation generated from XML documentation comments.\n\n")
            f.write("::: info Version Information\n")
            f.write(f"This documentation is for **{assembly_name} {version}**.\n")
            f.write("For the latest version, see the [current API documentation](/api/).\n")
            f.write(":::\n\n")
            f.write("## Table of Contents\n\n")
            
            # Create table of contents
            for namespace, namespace_data in sorted(namespaces.items()):
                if namespace_data['types']:
                    f.write(f"### {namespace}\n\n")
                    for type_name, full_name, type_info in sorted(namespace_data['types']):
                        f.write(f"- [{type_name}](#{full_name.lower().replace('.', '').replace('<', '').replace('>', '').replace('`', '')})\n")
                    f.write("\n")
            
            f.write("\n---\n\n")
            
            # Generate detailed documentation
            for namespace, namespace_data in sorted(namespaces.items()):
                if namespace_data['types']:
                    f.write(f"## {namespace}\n\n")
                    
                    for type_name, full_name, type_info in sorted(namespace_data['types']):
                        # Create anchor-friendly ID
                        type_id = full_name.lower().replace('.', '').replace('<', '').replace('>', '').replace('`', '')
                        f.write(f"### {full_name} {{#{type_id}}}\n\n")
                        
                        if type_info['summary']:
                            f.write(f"{type_info['summary']}\n\n")
                        
                        if type_info['remarks']:
                            f.write(f"**Remarks**: {type_info['remarks']}\n\n")
                        
                        if type_info['example']:
                            f.write(f"**Example**:\n{type_info['example']}\n\n")
                        
                        # Add properties
                        if 'properties' in type_info:
                            f.write("#### Properties\n\n")
                            for prop in sorted(type_info['properties'], key=lambda x: x['name']):
                                prop_name = prop['name'].split('.')[-1]
                                f.write(f"**{prop_name}**\n\n")
                                if prop['summary']:
                                    f.write(f"{prop['summary']}\n\n")
                                if prop['remarks']:
                                    f.write(f"*Remarks*: {prop['remarks']}\n\n")
                        
                        # Add methods
                        if 'methods' in type_info:
                            f.write("#### Methods\n\n")
                            for method in sorted(type_info['methods'], key=lambda x: x['name']):
                                method_name = method['name'].split('.')[-1]
                                if '(' in method_name:
                                    method_name = method_name.split('(')[0]
                                f.write(f"**{method_name}**\n\n")
                                if method['summary']:
                                    f.write(f"{method['summary']}\n\n")
                                
                                if method['parameters']:
                                    f.write("*Parameters*:\n")
                                    for param_name, param_desc in method['parameters']:
                                        f.write(f"- `{param_name}`: {param_desc}\n")
                                    f.write("\n")
                                
                                if method['returns']:
                                    f.write(f"*Returns*: {method['returns']}\n\n")
                                
                                if method['exceptions']:
                                    f.write("*Exceptions*:\n")
                                    for exc_type, exc_desc in method['exceptions']:
                                        f.write(f"- `{exc_type}`: {exc_desc}\n")
                                    f.write("\n")
                                
                                if method['remarks']:
                                    f.write(f"*Remarks*: {method['remarks']}\n\n")
                                
                                if method['example']:
                                    f.write(f"*Example*:\n{method['example']}\n\n")
                        
                        # Add fields
                        if 'fields' in type_info:
                            f.write("#### Fields\n\n")
                            for field in sorted(type_info['fields'], key=lambda x: x['name']):
                                field_name = field['name'].split('.')[-1]
                                f.write(f"**{field_name}**\n\n")
                                if field['summary']:
                                    f.write(f"{field['summary']}\n\n")
                        
                        f.write("---\n\n")
        
        print(f"✓ Generated comprehensive documentation for {assembly_name} {version}")
        return True
        
    except Exception as e:
        print(f"✗ Error processing {xml_path}: {e}")
        import traceback
        traceback.print_exc()
        return False

def generate_version_index(versions: List[str], current_version: str):
    """Generate the main versioned API index"""
    with open("api/versions.md", "w") as f:
        f.write("# API Documentation Versions\n\n")
        f.write("Browse API documentation for different versions of Belay.NET.\n\n")
        f.write("## Available Versions\n\n")
        
        for version in versions:
            if version == current_version:
                f.write(f"- **[{version}](/api/)** - Current version\n")
            else:
                f.write(f"- [{version}](/api/versions/{version}/) - Released version\n")
        
        f.write("\n## Version History\n\n")
        f.write("### v0.3.0-alpha (2025-08-10)\n")
        f.write("- First public alpha release\n")
        f.write("- Core device communication\n")
        f.write("- Attribute-based programming model\n")
        f.write("- Enhanced executor framework\n\n")
        f.write("### Future Releases\n")
        f.write("- **v0.3.1-beta**: Enhanced stability and bug fixes\n")
        f.write("- **v0.4.0**: Additional hardware support and features\n\n")
        f.write("For release notes and changelog, see the [GitHub releases page](https://github.com/belay-dotnet/Belay.NET/releases).\n")

def main():
    """Main function to generate versioned API documentation"""
    print("🔄 Generating versioned API documentation...")
    
    # Get available releases from GitHub
    releases = get_github_releases("belay-dotnet/Belay.NET")
    current_version = get_local_version()
    
    versions = []
    if releases:
        versions = [r['tag_name'] for r in releases]
    
    # Always include current version
    if current_version not in versions:
        versions.insert(0, current_version)
    
    print(f"📋 Processing versions: {', '.join(versions)}")
    
    # Process XML files for current version (from belay-source)
    xml_files = glob.glob("belay-source/src/*/bin/Release/net8.0/*.xml")
    xml_files = [f for f in xml_files if "ref" not in f]  # Skip reference assemblies
    
    # If no XML files found in belay-source, fall back to existing approach
    if not xml_files:
        print("⚠️ No XML files found in belay-source, falling back to direct generation...")
        # Use the original simple approach from the main script
        import sys
        sys.path.append('.')
        
        # Generate using existing XML files if available
        existing_xml_files = glob.glob("../src/*/bin/Release/net8.0/*.xml")
        if existing_xml_files:
            xml_files = existing_xml_files
        else:
            print("⚠️ No XML documentation files available, skipping API generation")
            xml_files = []
    
    success_count = 0
    for xml_file in xml_files:
        if process_xml_file(xml_file, current_version):
            success_count += 1
    
    print(f"✓ Successfully processed {success_count} XML documentation files for {current_version}")
    
    # For now, we only generate for current version
    # TODO: Add logic to checkout and build historical versions
    
    # Generate version index
    generate_version_index(versions, current_version)
    print("✓ Generated version index")
    
    # Update main API index with version selector
    if os.path.exists("api/generated"):
        print("✓ Updating main API index with version selector...")
        with open("api/index.md", "w") as f:
            f.write("# API Reference\n\n")
            f.write("Comprehensive API documentation automatically generated from XML comments in the source code.\n\n")
            
            # Add version selector
            f.write("## Version Selector\n\n")
            f.write("::: tip Current Version\n")
            f.write(f"You are viewing documentation for **{current_version}**.\n")
            if len(versions) > 1:
                f.write(f"[View other versions →](/api/versions)\n")
            f.write(":::\n\n")
            
            f.write("## Generated Documentation\n\n")
            
            # Add links to generated docs
            generated_dirs = [d for d in os.listdir("api/generated") if os.path.isdir(f"api/generated/{d}")]
            for assembly in sorted(generated_dirs):
                f.write(f"- **[{assembly}](./generated/{assembly}/README.md)** - {assembly} namespace documentation\n")
            
            f.write("\n## Quick Reference\n\n")
            f.write("### Core Classes\n")
            f.write("- **Device** - Main device connection and communication\n")
            f.write("- **TaskExecutor** - Handles [Task] attribute methods\n")
            f.write("- **EnhancedExecutor** - Advanced method interception framework\n")
            f.write("- **DeviceProxy** - Dynamic proxy for transparent method routing\n\n")
            f.write("### Attributes\n")
            f.write("- **TaskAttribute** - Execute methods as tasks with caching and timeout\n")
            f.write("- **ThreadAttribute** - Background thread execution\n")
            f.write("- **SetupAttribute** - Device initialization methods\n")
            f.write("- **TeardownAttribute** - Device cleanup methods\n\n")
            f.write("For detailed documentation, see the generated API reference above.\n\n")
            f.write("## Usage Examples\n\n")
            f.write("For practical examples of using these APIs, see the [Examples](/examples/) section.\n")
        
        print("✓ Main API index updated with version selector")
    
    print("🎉 Versioned API documentation generation completed!")

if __name__ == "__main__":
    main()