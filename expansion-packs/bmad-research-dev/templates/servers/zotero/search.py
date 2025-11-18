"""
Zotero Search Server - Direct Web API
Makes direct HTTPS requests to api.zotero.org (NO MCP)

API Docs: https://www.zotero.org/support/dev/web_api/v3/basics

Usage:
    from servers.zotero.search import search
    items = search("attention mechanisms")
"""

import os
import requests
from typing import List, Dict, Optional, Any, Literal
from dataclasses import dataclass
from dotenv import load_dotenv

# Load environment variables
load_dotenv()


@dataclass
class Creator:
    creatorType: str
    firstName: Optional[str] = None
    lastName: str = ""
    name: Optional[str] = None


@dataclass
class Tag:
    tag: str
    type: Optional[int] = None


@dataclass
class Library:
    type: str
    id: int
    name: str


@dataclass
class ItemData:
    key: str
    version: int
    itemType: str
    title: str
    creators: List[Dict[str, Any]]
    abstractNote: Optional[str] = None
    publicationTitle: Optional[str] = None
    date: Optional[str] = None
    url: Optional[str] = None
    tags: List[Dict[str, Any]] = None
    collections: List[str] = None
    relations: Dict[str, Any] = None
    dateAdded: str = ""
    dateModified: str = ""

    def __post_init__(self):
        if self.tags is None:
            self.tags = []
        if self.collections is None:
            self.collections = []
        if self.relations is None:
            self.relations = {}


@dataclass
class ZoteroItem:
    key: str
    version: int
    library: Dict[str, Any]
    data: Dict[str, Any]


ItemType = Literal['book', 'journalArticle', 'conferencePaper', 'thesis', 'webpage']


def get_config() -> Dict[str, str]:
    """Get environment configuration"""
    api_key = os.getenv('ZOTERO_API_KEY', '')
    user_id = os.getenv('ZOTERO_USER_ID', '')

    if not api_key or not user_id:
        raise ValueError(
            'Zotero credentials not found. Set ZOTERO_API_KEY and ZOTERO_USER_ID in .env file.'
        )

    return {'apiKey': api_key, 'userId': user_id}


def api_request(endpoint: str, params: Optional[Dict[str, str]] = None) -> List[Dict[str, Any]]:
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

    items = response.json()
    print(f"[Zotero API] Received {len(items)} items")

    return items


def search(
    query: Optional[str] = None,
    collection_id: Optional[str] = None,
    tag: Optional[str] = None,
    item_type: Optional[ItemType] = None,
    limit: int = 100
) -> List[Dict[str, Any]]:
    """
    Search Zotero library

    Args:
        query: Keywords to search (title, author, abstract)
        collection_id: Search within specific collection
        tag: Filter by tag
        item_type: Filter by item type
        limit: Maximum number of results (default: 100)

    Returns:
        Array of Zotero items matching the search

    Examples:
        # Basic keyword search
        items = search("transformer architecture")

        # Search within specific collection
        items = search("attention", collection_id="ABC123")

        # Search by tag
        items = search(tag="deep-learning")

        # Search for specific item type
        articles = search("neural networks", item_type='journalArticle')
    """
    print(f"[Zotero] Searching library for: \"{query or 'all items'}\"")

    # Build API parameters
    params: Dict[str, str] = {}

    if query:
        params['q'] = query

    if tag:
        params['tag'] = tag

    if item_type:
        params['itemType'] = item_type

    params['limit'] = str(limit)

    # Determine endpoint
    endpoint = '/items'
    if collection_id:
        endpoint = f'/collections/{collection_id}/items'

    # Make API request
    results = api_request(endpoint, params)

    print(f"[Zotero] Found {len(results)} items in library")

    return results


def search_by_author(author_name: str, additional_keywords: Optional[str] = None) -> List[Dict[str, Any]]:
    """Search by author name"""
    search_query = f"{author_name} {additional_keywords}" if additional_keywords else author_name

    items = search(search_query)

    # Filter by author (client-side for precision)
    filtered_items = []
    for item in items:
        creators = item.get('data', {}).get('creators', [])
        for creator in creators:
            full_name = creator.get('name') or f"{creator.get('firstName', '')} {creator.get('lastName', '')}".strip()
            if author_name.lower() in full_name.lower():
                filtered_items.append(item)
                break

    return filtered_items


def search_by_tag(tag: str) -> List[Dict[str, Any]]:
    """Search by tag"""
    return search(tag=tag)


def search_by_tags(tags: List[str]) -> List[Dict[str, Any]]:
    """Search by multiple tags (AND logic)"""
    # Get all items (Zotero API doesn't support multiple tag AND)
    all_items = search()

    # Client-side filtering for multiple tags
    filtered_items = []
    for item in all_items:
        item_tags = [t['tag'].lower() for t in item.get('data', {}).get('tags', [])]
        if all(any(tag.lower() in item_tag for item_tag in item_tags) for tag in tags):
            filtered_items.append(item)

    return filtered_items


def search_recent(days_back: int = 30, keywords: Optional[str] = None) -> List[Dict[str, Any]]:
    """Search recent additions to library"""
    from datetime import datetime, timedelta

    items = search(keywords)

    cutoff_date = datetime.now() - timedelta(days=days_back)

    filtered_items = []
    for item in items:
        date_added = item.get('data', {}).get('dateAdded', '')
        if date_added:
            item_date = datetime.fromisoformat(date_added.replace('Z', '+00:00'))
            if item_date >= cutoff_date:
                filtered_items.append(item)

    # Sort by date added (newest first)
    filtered_items.sort(
        key=lambda x: datetime.fromisoformat(x.get('data', {}).get('dateAdded', '').replace('Z', '+00:00')),
        reverse=True
    )

    return filtered_items


def search_by_year(year: int, keywords: Optional[str] = None) -> List[Dict[str, Any]]:
    """Search by publication year"""
    import re

    items = search(keywords)

    filtered_items = []
    for item in items:
        date = item.get('data', {}).get('date', '')
        if date:
            year_match = re.search(r'\d{4}', date)
            if year_match and int(year_match.group(0)) == year:
                filtered_items.append(item)

    return filtered_items


def search_by_year_range(start_year: int, end_year: int, keywords: Optional[str] = None) -> List[Dict[str, Any]]:
    """Search by year range"""
    import re

    items = search(keywords)

    filtered_items = []
    for item in items:
        date = item.get('data', {}).get('date', '')
        if date:
            year_match = re.search(r'\d{4}', date)
            if year_match:
                item_year = int(year_match.group(0))
                if start_year <= item_year <= end_year:
                    filtered_items.append(item)

    return filtered_items


def find_by_topic(topic: str) -> Dict[str, List[Dict[str, Any]]]:
    """Find papers by topic using tag-based organization"""
    exact_matches = search_by_tag(topic)

    # Search for related items (title/abstract contains topic)
    all_matches = search(topic)
    exact_keys = {item['key'] for item in exact_matches}
    related_matches = [item for item in all_matches if item['key'] not in exact_keys]

    return {
        'exactMatches': exact_matches,
        'relatedMatches': related_matches
    }


def identify_gaps(research_area: str, expected_topics: List[str]) -> Dict[str, Any]:
    """Identify gaps in library coverage"""
    library_items = search(research_area)

    covered = []
    missing = []

    for topic in expected_topics:
        has_content = False
        for item in library_items:
            data = item.get('data', {})
            search_text = ' '.join([
                data.get('title', ''),
                data.get('abstractNote', ''),
                ' '.join(t['tag'] for t in data.get('tags', []))
            ]).lower()

            if topic.lower() in search_text:
                has_content = True
                break

        if has_content:
            covered.append(topic)
        else:
            missing.append(topic)

    return {
        'covered': covered,
        'missing': missing,
        'coverage': len(covered) / len(expected_topics) if expected_topics else 0
    }


def get_stats() -> Dict[str, Any]:
    """Get library statistics"""
    import re

    all_items = search(limit=10000)

    # Count by type
    by_type: Dict[str, int] = {}
    for item in all_items:
        item_type = item.get('data', {}).get('itemType', 'unknown')
        by_type[item_type] = by_type.get(item_type, 0) + 1

    # Count by year
    by_year: Dict[str, int] = {}
    for item in all_items:
        date = item.get('data', {}).get('date', '')
        if date:
            year_match = re.search(r'\d{4}', date)
            year = year_match.group(0) if year_match else 'unknown'
        else:
            year = 'unknown'
        by_year[year] = by_year.get(year, 0) + 1

    # Top tags
    tag_counts: Dict[str, int] = {}
    for item in all_items:
        for tag in item.get('data', {}).get('tags', []):
            tag_name = tag['tag']
            tag_counts[tag_name] = tag_counts.get(tag_name, 0) + 1

    top_tags = [
        {'tag': tag, 'count': count}
        for tag, count in sorted(tag_counts.items(), key=lambda x: x[1], reverse=True)[:20]
    ]

    # Recent additions (last 30 days)
    recent = search_recent(30)

    return {
        'totalItems': len(all_items),
        'byType': by_type,
        'byYear': by_year,
        'topTags': top_tags,
        'recentAdditions': len(recent)
    }
