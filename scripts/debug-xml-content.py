#!/usr/bin/env python3
"""
Debug XML content to see what's available for API generation
"""

import xml.etree.ElementTree as ET
import os
import sys
import glob
from pathlib import Path

def debug_xml_file(xml_file):
    """Debug XML file content"""
    print(f"\n=== DEBUGGING {xml_file} ===")
    try:
        tree = ET.parse(xml_file)
        root = tree.getroot()
        
        assembly_name = root.find('assembly/name').text
        print(f"Assembly: {assembly_name}")
        
        members = root.findall('.//member')
        print(f"Total members found: {len(members)}")
        
        # Sample a few members to see structure
        for i, member in enumerate(members[:5]):
            name = member.get('name', 'NO_NAME')
            print(f"\nMember {i+1}: {name}")
            
            # Check all child elements
            for child in member:
                print(f"  - {child.tag}: {child.text[:100] if child.text else 'None'}...")
            
            # Check for specific documentation elements
            summary = member.find('summary')
            remarks = member.find('remarks')
            example = member.find('example')
            
            print(f"  Has summary: {summary is not None}")
            print(f"  Has remarks: {remarks is not None}")
            print(f"  Has example: {example is not None}")
            
            if name.startswith('T:Belay.Attributes.TaskAttribute'):
                print(f"  FOUND TaskAttribute!")
                if example is not None:
                    print(f"  Example content: {example.text}")
            
    except Exception as e:
        print(f"Error: {e}")

def main():
    """Main function"""
    xml_pattern = "belay-source/src/*/bin/Release/net8.0/*.xml"
    xml_files = glob.glob(xml_pattern)
    xml_files = [f for f in xml_files if '/ref/' not in f]
    
    print(f"Found {len(xml_files)} XML files:")
    for xml_file in xml_files:
        if os.path.exists(xml_file):
            debug_xml_file(xml_file)
        else:
            print(f"File not found: {xml_file}")

if __name__ == "__main__":
    main()