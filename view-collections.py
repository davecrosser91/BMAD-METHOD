#!/usr/bin/env python3
"""
Zotero Collections Viewer
Fetches and displays your Zotero library collections
"""

import os
import json
import urllib.request
import urllib.parse
from typing import List, Dict

# Load credentials from .env file
def load_env():
    env_vars = {}
    env_path = os.path.join(os.path.dirname(__file__), '.env')

    with open(env_path, 'r') as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith('#') and '=' in line:
                key, value = line.split('=', 1)
                env_vars[key] = value

    return env_vars

# Get collections from Zotero API
def get_collections(api_key: str, user_id: str) -> List[Dict]:
    url = f"https://api.zotero.org/users/{user_id}/collections?limit=100"

    print(f"[Zotero API] GET /users/{user_id}/collections")

    req = urllib.request.Request(url)
    req.add_header('Zotero-API-Key', api_key)
    req.add_header('Zotero-API-Version', '3')

    with urllib.request.urlopen(req) as response:
        data = response.read()
        collections = json.loads(data.decode('utf-8'))

    print(f"[Zotero] Found {len(collections)} collections\n")

    return collections

# Build collection hierarchy
def build_hierarchy(collections: List[Dict]) -> tuple:
    top_level = []
    by_parent = {}

    for collection in collections:
        parent = collection['data'].get('parentCollection')

        if not parent or parent == False:
            top_level.append(collection)
        else:
            if parent not in by_parent:
                by_parent[parent] = []
            by_parent[parent].append(collection)

    return top_level, by_parent

# Print collection tree
def print_collection(collection: Dict, by_parent: Dict, indent: int = 0):
    prefix = '  ' * indent
    name = collection['data']['name']
    num_items = collection['meta']['numItems']

    print(f"{prefix}📁 {name} ({num_items} items)")

    # Print children
    children = by_parent.get(collection['key'], [])
    for child in children:
        print_collection(child, by_parent, indent + 1)

# Main function
def main():
    # Load environment variables
    env = load_env()
    api_key = env.get('ZOTERO_API_KEY')
    user_id = env.get('ZOTERO_USER_ID')

    if not api_key or not user_id:
        print("Error: ZOTERO_API_KEY and ZOTERO_USER_ID must be set in .env file")
        return

    print("=== Zotero Collections Hierarchy ===\n")

    # Fetch collections
    collections = get_collections(api_key, user_id)

    # Build and print hierarchy
    top_level, by_parent = build_hierarchy(collections)

    print("## Your Zotero Collections\n")
    for collection in top_level:
        print_collection(collection, by_parent)

    # Print raw data
    print("\n=== Raw Collections Data ===\n")
    print(json.dumps(collections, indent=2))

if __name__ == "__main__":
    main()
