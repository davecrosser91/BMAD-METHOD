"""
Zotero Get Item Server - Direct Web API
Makes direct HTTPS requests to api.zotero.org (NO MCP)

API Docs: https://www.zotero.org/support/dev/web_api/v3/basics

Usage:
    from servers.zotero.get_item import get_item
    item = get_item("ABC123XYZ")
"""

import os
import requests
from typing import List, Dict, Optional, Any, Literal, Union
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


def api_request(
    endpoint: str,
    params: Optional[Dict[str, str]] = None,
    format: Literal['json', 'bibtex'] = 'json'
) -> Union[Dict[str, Any], List[Dict[str, Any]], str]:
    """Make direct API request to Zotero"""
    config = get_config()

    if params is None:
        params = {}

    # Build URL
    url = f"https://api.zotero.org/users/{config['userId']}{endpoint}"

    # Add format parameter if specified
    if format != 'json':
        params['format'] = format

    print(f"[Zotero API] GET {endpoint}")

    # Make HTTPS request
    headers = {
        'Zotero-API-Key': config['apiKey'],
        'Zotero-API-Version': '3'
    }

    response = requests.get(url, headers=headers, params=params)

    if not response.ok:
        raise Exception(f"Zotero API error: {response.status_code} {response.reason}")

    # Return as text for bibtex, JSON for others
    if format == 'bibtex':
        return response.text
    else:
        return response.json()


def get_item(
    item_key: str,
    format: Literal['json', 'bibtex'] = 'json'
) -> Union[Dict[str, Any], str]:
    """
    Get full metadata for a Zotero item by key

    Args:
        item_key: Zotero item key
        format: Output format (json, bibtex)

    Returns:
        Item metadata

    Examples:
        # Get item metadata
        item = get_item("ABC123XYZ")
        print(item['data']['title'])

        # Get BibTeX citation
        bibtex = get_item("ABC123XYZ", "bibtex")
        print(bibtex)
    """
    print(f"[Zotero] Getting item: {item_key} (format: {format})")

    result = api_request(f'/items/{item_key}', format=format)

    if isinstance(result, str):
        print("[Zotero] Retrieved BibTeX citation")
    else:
        print(f"[Zotero] Retrieved item: {result.get('data', {}).get('title', '')}")

    return result


def get_items(
    item_keys: List[str],
    format: Literal['json', 'bibtex'] = 'json'
) -> List[Union[Dict[str, Any], str]]:
    """Get multiple items in parallel"""
    print(f"[Zotero] Getting {len(item_keys)} items in parallel...")

    items = [get_item(key, format) for key in item_keys]

    print(f"[Zotero] Retrieved {len(items)} items")

    return items


def get_item_fulltext(item_key: str) -> str:
    """Get item's full text content"""
    print(f"[Zotero] Getting full text for item: {item_key}")

    try:
        result = api_request(f'/items/{item_key}/fulltext')

        if isinstance(result, dict):
            content = result.get('content', '')
            print(f"[Zotero] Retrieved full text ({len(content)} characters)")
            return content
        else:
            print(f"[Zotero] No fulltext available for {item_key}")
            raise Exception(f"No fulltext available for {item_key}")
    except Exception as error:
        # Fulltext may not be available
        print(f"[Zotero] No fulltext available for {item_key}")
        raise error


def get_item_children(item_key: str) -> Dict[str, List[Dict[str, Any]]]:
    """Get item's child items (attachments, notes, annotations)"""
    print(f"[Zotero] Getting children for item: {item_key}")

    children = api_request(f'/items/{item_key}/children')

    # Categorize children by type
    attachments = []
    notes = []
    annotations = []

    if isinstance(children, list):
        for child in children:
            item_type = child.get('data', {}).get('itemType')
            if item_type == 'attachment':
                attachments.append(child)
            elif item_type == 'note':
                notes.append(child)
            elif item_type == 'annotation':
                annotations.append(child)

    print(f"[Zotero] Found {len(attachments)} attachments, {len(notes)} notes, {len(annotations)} annotations")

    return {
        'attachments': attachments,
        'notes': notes,
        'annotations': annotations
    }


def get_annotations(item_key: str) -> List[Dict[str, Any]]:
    """Get annotations for an item"""
    print(f"[Zotero] Getting annotations for item: {item_key}")

    children = get_item_children(item_key)
    annotations = children['annotations']

    print(f"[Zotero] Found {len(annotations)} annotations")

    return annotations


def get_notes(item_key: str) -> List[Dict[str, Any]]:
    """Get notes for an item"""
    print(f"[Zotero] Getting notes for item: {item_key}")

    children = get_item_children(item_key)
    notes = children['notes']

    print(f"[Zotero] Found {len(notes)} notes")

    return notes


def get_item_complete(item_key: str) -> Dict[str, Any]:
    """Get comprehensive item details (metadata + children + fulltext)"""
    print(f"[Zotero] Getting complete details for item: {item_key}")

    # Fetch metadata
    metadata = get_item(item_key)

    # Fetch children
    children = get_item_children(item_key)

    # Fetch fulltext (may not be available)
    try:
        fulltext = get_item_fulltext(item_key)
    except:
        fulltext = None

    print("[Zotero] Retrieved complete item details")

    return {
        'metadata': metadata,
        'fulltext': fulltext,
        **children
    }


def export_bibtex(item_keys: List[str]) -> str:
    """Export items as BibTeX"""
    print(f"[Zotero] Exporting {len(item_keys)} items as BibTeX")

    bibtex_entries = [get_item(key, 'bibtex') for key in item_keys]

    bibtex = '\n\n'.join(str(entry) for entry in bibtex_entries)

    print(f"[Zotero] Exported {len(item_keys)} BibTeX entries")

    return bibtex


def analyze_item_research_value(item_key: str) -> Dict[str, Any]:
    """Analyze item's research value"""
    import re

    # Get fulltext
    try:
        fulltext = get_item_fulltext(item_key)
        has_fulltext = True
    except:
        fulltext = None
        has_fulltext = False

    # Get children
    children = get_item_children(item_key)

    has_annotations = len(children['annotations']) > 0
    has_notes = len(children['notes']) > 0

    # Check for code/data availability
    fulltext_lower = (fulltext or '').lower()
    has_code = bool(re.search(r'github|code.*available|repository', fulltext_lower))
    has_data = bool(re.search(r'dataset.*available|data.*provided', fulltext_lower))

    # Determine readiness for research use
    if has_fulltext and (has_annotations or has_notes):
        readiness = 'ready'
    elif has_fulltext:
        readiness = 'partial'
    else:
        readiness = 'metadata-only'

    return {
        'hasFulltext': has_fulltext,
        'hasAnnotations': has_annotations,
        'hasNotes': has_notes,
        'annotationCount': len(children['annotations']),
        'noteCount': len(children['notes']),
        'hasCode': has_code,
        'hasData': has_data,
        'readiness': readiness
    }
