# Zotero Server Functions (Python)

Direct API wrappers for Zotero reference management.

## Setup

1. Install dependencies:

```bash
pip install requests python-dotenv
```

2. Set environment variables in `.env`:

```bash
ZOTERO_API_KEY=your_api_key_here
ZOTERO_USER_ID=your_user_id_here
```

## Getting Your Credentials

1. **API Key**: Go to https://www.zotero.org/settings/keys and create a new key
2. **User ID**: Found in your Zotero profile URL: `https://www.zotero.org/users/[YOUR_USER_ID]`

## Available Functions

### search.py

- `search()` - Search your Zotero library
- `search_by_author()` - Find papers by author name
- `search_by_tag()` - Search by tag
- `search_recent()` - Find recently added items
- `search_by_year()` - Filter by publication year
- `get_stats()` - Get library statistics

### get_collections.py

- `get_collections()` - List all collections
- `get_collection_items()` - Get items in a collection
- `find_collection_by_name()` - Find collection by name
- `get_collection_hierarchy()` - Get parent-child relationships

### get_item.py

- `get_item()` - Get item metadata
- `get_item_fulltext()` - Get full text content
- `get_annotations()` - Get PDF annotations
- `get_notes()` - Get notes
- `export_bibtex()` - Export as BibTeX

## Usage Examples

```python
from servers.zotero.search import search, search_by_author
from servers.zotero.get_item import get_item, export_bibtex

# Search for papers
papers = search("transformer architecture")

# Find papers by author
vaswani_papers = search_by_author("Vaswani")

# Get item details
item = get_item("ABC123XYZ")
print(item['data']['title'])

# Export BibTeX
bibtex = export_bibtex(["ABC123", "XYZ789"])
```

## API Documentation

Full Zotero API docs: https://www.zotero.org/support/dev/web_api/v3/basics
