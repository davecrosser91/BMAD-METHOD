"""
Zotero Collections Server - Direct Web API
Makes direct HTTPS requests to api.zotero.org (NO MCP)

API Docs: https://www.zotero.org/support/dev/web_api/v3/basics

Usage:
    from servers.zotero.get_collections import get_collections
    collections = get_collections()
"""

import os
import requests
from typing import List, Dict, Optional, Any, Union
from dotenv import load_dotenv

# Load environment variables
load_dotenv()


def get_config() -> Dict[str, str]:
    """Get environment configuration"""
    api_key = os.getenv('ZOTERO_API_KEY', '')
    user_id = os.getenv('ZOTERO_USER_ID', '')

    if not api_key or not user_id:
        raise ValueError(
            'Zotero credentials not found. Set ZOTERO_API_KEY and ZOTERO_USER_ID in .env file.'
        )

    return {'apiKey': api_key, 'userId': user_id}


def api_request(endpoint: str, params: Optional[Dict[str, str]] = None) -> Any:
    """Make direct API request to Zotero"""
    config = get_config()

    if params is None:
        params = {}

    # Build URL
    url = f"https://api.zotero.org/users/{config['userId']}{endpoint}"

    print(f"[Zotero API] GET {endpoint}")

    # Make HTTPS request
    headers = {
        'Zotero-API-Key': config['apiKey'],
        'Zotero-API-Version': '3'
    }

    response = requests.get(url, headers=headers, params=params)

    if not response.ok:
        raise Exception(f"Zotero API error: {response.status_code} {response.reason}")

    return response.json()


def get_collections() -> List[Dict[str, Any]]:
    """
    Get all collections in your Zotero library

    Returns:
        Array of collections with hierarchy information

    Example:
        collections = get_collections()
        for c in collections:
            print(f"{c['data']['name']}: {c['meta']['numItems']} items")
    """
    print("[Zotero] Getting all collections")

    collections = api_request('/collections', {'limit': '100'})

    print(f"[Zotero] Found {len(collections)} collections")

    return collections


def get_collection_items(collection_key: str, limit: int = 100) -> List[Dict[str, Any]]:
    """Get items in a specific collection"""
    print(f"[Zotero] Getting items in collection: {collection_key}")

    items = api_request(f'/collections/{collection_key}/items', {'limit': str(limit)})

    print(f"[Zotero] Found {len(items)} items in collection")

    return items


def find_collection_by_name(name: str) -> Optional[Dict[str, Any]]:
    """Find collection by name (case-insensitive)"""
    collections = get_collections()

    for c in collections:
        if name.lower() in c['data']['name'].lower():
            return c

    return None


def get_collection_hierarchy() -> Dict[str, Any]:
    """Get collection hierarchy (parent-child relationships)"""
    collections = get_collections()

    top_level = []
    by_parent: Dict[str, List[Dict[str, Any]]] = {}

    for collection in collections:
        parent = collection['data'].get('parentCollection')
        if parent is False or not parent:
            top_level.append(collection)
        else:
            parent_key = parent if isinstance(parent, str) else ''
            if parent_key not in by_parent:
                by_parent[parent_key] = []
            by_parent[parent_key].append(collection)

    return {
        'topLevel': top_level,
        'byParent': by_parent
    }


def print_collection_hierarchy() -> None:
    """Print collection hierarchy in tree format"""
    hierarchy = get_collection_hierarchy()

    print("\n## Your Zotero Collections\n")

    def print_collection(collection: Dict[str, Any], indent: int = 0):
        prefix = '  ' * indent
        name = collection['data']['name']
        num_items = collection['meta']['numItems']
        print(f"{prefix}📁 {name} ({num_items} items)")

        # Print children
        children = hierarchy['byParent'].get(collection['key'], [])
        for child in children:
            print_collection(child, indent + 1)

    for collection in hierarchy['topLevel']:
        print_collection(collection)


def get_total_item_count() -> Dict[str, Any]:
    """Get total item count across all collections"""
    collections = get_collections()

    by_collection: Dict[str, int] = {}
    total = 0

    for collection in collections:
        name = collection['data']['name']
        num_items = collection['meta']['numItems']
        by_collection[name] = num_items
        total += num_items

    return {
        'total': total,
        'byCollection': by_collection
    }


def find_collections_by_keyword(keyword: str) -> List[Dict[str, Any]]:
    """Find collections by keyword"""
    collections = get_collections()

    return [
        c for c in collections
        if keyword.lower() in c['data']['name'].lower()
    ]


def get_largest_collections(limit: int = 10) -> List[Dict[str, Any]]:
    """Get largest collections"""
    collections = get_collections()

    sorted_collections = sorted(
        collections,
        key=lambda c: c['meta']['numItems'],
        reverse=True
    )

    return sorted_collections[:limit]
