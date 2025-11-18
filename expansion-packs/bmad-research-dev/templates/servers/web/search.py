"""
Web Search Server Wrapper
Wraps Claude Code's built-in WebSearch tool

Usage:
    from servers.web.search import search
    results = search("transformer optimization 2024")
"""

from typing import List, Dict, Optional


def search(
    query: str,
    allowed_domains: Optional[List[str]] = None,
    blocked_domains: Optional[List[str]] = None,
    max_results: int = 10
) -> List[Dict]:
    """
    Search the web using WebSearch tool

    Args:
        query: Search query (2-5 focused keywords recommended)
        allowed_domains: Optional domain whitelist
        blocked_domains: Optional domain blacklist
        max_results: Maximum number of results (default: 10)

    Returns:
        Array of search results

    Examples:
        # Basic search
        results = search("attention mechanisms 2024")

        # Domain-restricted search
        results = search("pytorch tutorial", allowed_domains=["pytorch.org", "github.com"])

        # Block domains
        results = search("ML frameworks", blocked_domains=["medium.com"])
    """
    print(f"[Web Search] Searching for: \"{query}\"")

    # This is a placeholder - in actual implementation, this would call
    # the WebSearch MCP tool available in the environment
    # For now, this demonstrates the expected interface

    # Note: In a real implementation, you would call:
    # results = WebSearch(query=query, allowed_domains=allowed_domains, blocked_domains=blocked_domains)

    # Since we can't actually call WebSearch from Python without MCP,
    # this raises an informative error
    raise NotImplementedError(
        """Web search requires the WebSearch MCP tool.

This Python wrapper is designed to be called from TypeScript/Deno contexts
where the WebSearch tool is available. For direct Python usage, consider:

1. Using the requests library with a search API
2. Using a search engine API (Google, Bing, etc.)
3. Calling this from a Deno/TypeScript context that has WebSearch available
"""
    )


def search_docs(framework: str, query: str) -> List[Dict]:
    """Search official documentation sites"""
    doc_sites = {
        'pytorch': ["pytorch.org"],
        'tensorflow': ["tensorflow.org"],
        'react': ["react.dev", "reactjs.org"],
        'nextjs': ["nextjs.org"],
        'anthropic': ["docs.anthropic.com"]
    }

    domains = doc_sites.get(framework.lower(), [])

    return search(f"{framework} {query}", allowed_domains=domains)


def search_github(query: str) -> List[Dict]:
    """Search GitHub repositories"""
    return search(f"site:github.com {query}")


def search_blogs(topic: str) -> List[Dict]:
    """Search technical blogs"""
    blog_domains = [
        "dev.to",
        "medium.com",
        "towardsdatascience.com",
        "blog.google",
        "engineering.fb.com"
    ]

    return search(topic, allowed_domains=blog_domains)
