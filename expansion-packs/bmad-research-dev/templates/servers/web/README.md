# Web Server Functions (Python)

Wrappers for Claude Code's built-in WebSearch and WebFetch tools.

## Important Note

These Python wrappers are designed to be called from TypeScript/Deno contexts where the WebSearch and WebFetch MCP tools are available. They cannot be used directly from Python without MCP integration.

## Setup

No dependencies required - these wrappers call MCP tools that must be available in the runtime environment.

## Available Functions

### search.py

- `search()` - Search the web
- `search_docs()` - Search official documentation
- `search_github()` - Search GitHub repositories
- `search_blogs()` - Search technical blogs

### fetch.py

- `fetch()` - Fetch and extract content from URL
- `fetch_multiple()` - Fetch multiple URLs in parallel
- `fetch_code_examples()` - Extract code examples
- `fetch_github_readme()` - Fetch GitHub README

## Usage Examples

**Note**: These examples work in TypeScript/Deno contexts with MCP tools:

```python
from servers.web.search import search, search_docs
from servers.web.fetch import fetch, fetch_code_examples

# Search the web
results = search("transformer optimization 2024")

# Search documentation
pytorch_docs = search_docs("pytorch", "DataLoader batching")

# Fetch content
content = fetch(
    "https://pytorch.org/tutorials/beginner/basics/quickstart_tutorial.html",
    "Extract code examples for loading data"
)

# Extract code examples
code = fetch_code_examples("https://example.com/tutorial")
```

## Alternative for Direct Python Usage

If you need web search/fetch in pure Python:

```python
import requests
from bs4 import BeautifulSoup

# Direct HTTP fetch
response = requests.get("https://example.com")
soup = BeautifulSoup(response.content, 'html.parser')

# Use search APIs directly
# - Google Custom Search API
# - Bing Search API
# - DuckDuckGo API
```

## API Documentation

These wrappers interface with:

- Claude Code WebSearch tool
- Claude Code WebFetch tool

See Claude Code documentation for available features.
