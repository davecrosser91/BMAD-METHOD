"""
Web Fetch Server Wrapper
Wraps Claude Code's built-in WebFetch tool

Usage:
    from servers.web.fetch import fetch
    content = fetch("https://example.com", "Extract main points")
"""

from typing import List, Dict, Optional
from datetime import datetime
import re


def fetch(url: str, prompt: str) -> Dict:
    """
    Fetch and extract content from a URL

    Args:
        url: The URL to fetch (must be valid HTTPS)
        prompt: What information to extract from the page

    Returns:
        Extracted content with metadata

    Examples:
        # Extract specific information
        content = fetch(
            "https://pytorch.org/tutorials/beginner/basics/quickstart_tutorial.html",
            "Extract code examples for loading data"
        )

        # Extract blog post content
        article = fetch(
            "https://blog.google/technology/ai/...",
            "Summarize the main technical innovations"
        )
    """
    print(f"[Web Fetch] Fetching: {url}")
    print(f"[Web Fetch] Prompt: {prompt}")

    # Validate URL
    if not url.startswith('http://') and not url.startswith('https://'):
        raise ValueError(f"Invalid URL: {url}. Must start with http:// or https://")

    # This is a placeholder - in actual implementation, this would call
    # the WebFetch MCP tool available in the environment

    # Note: In a real implementation, you would call:
    # result = WebFetch(url=url, prompt=prompt)

    # Since we can't actually call WebFetch from Python without MCP,
    # this raises an informative error
    raise NotImplementedError(
        f"""Web fetch requires the WebFetch MCP tool.

This Python wrapper is designed to be called from TypeScript/Deno contexts
where the WebFetch tool is available. For direct Python usage, consider:

1. Using the requests library to fetch {url}
2. Using BeautifulSoup or similar for HTML parsing
3. Calling this from a Deno/TypeScript context that has WebFetch available
"""
    )


def fetch_multiple(urls: List[str], prompt: str) -> List[Dict]:
    """Fetch multiple URLs in parallel"""
    print(f"[Web Fetch] Fetching {len(urls)} URLs in parallel...")

    results = [fetch(url, prompt) for url in urls]

    print(f"[Web Fetch] Completed fetching {len(results)} URLs")

    return results


def fetch_code_examples(url: str) -> List[str]:
    """Fetch and extract code examples"""
    result = fetch(
        url,
        "Extract all code examples. Return each code block separately."
    )

    # Parse code blocks from markdown
    content = result.get('content', '')
    code_blocks = re.findall(r'```[\s\S]*?```', content)
    return [
        re.sub(r'```\w*\n?', '', block).replace('```', '').strip()
        for block in code_blocks
    ]


def fetch_github_readme(repo_url: str) -> Dict:
    """Fetch GitHub README"""
    readme_url = f"{repo_url}/blob/main/README.md"
    return fetch(
        readme_url,
        "Extract: project description, key features, installation instructions, and usage examples"
    )


def fetch_docs(url: str, topic: str) -> Dict:
    """Fetch documentation page"""
    return fetch(
        url,
        f"Extract documentation about {topic}. Include API signatures, parameters, examples, and best practices."
    )
