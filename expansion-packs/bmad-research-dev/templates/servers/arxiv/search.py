"""
ArXiv Search Server - Direct Web API
Makes direct HTTP requests to export.arxiv.org (NO MCP)

API Docs: https://info.arxiv.org/help/api/user-manual.html

Usage:
    from servers.arxiv.search import search
    papers = search("attention mechanisms")
"""

import re
import requests
from typing import List, Dict, Optional, Any
from dataclasses import dataclass
from datetime import datetime, timedelta


@dataclass
class Paper:
    id: str  # ArXiv ID (e.g., "2401.12345")
    title: str
    authors: List[Dict[str, str]]
    summary: str  # Abstract
    published: str  # ISO date string
    updated: Optional[str] = None  # ISO date string
    primary_category: str = ""
    categories: List[str] = None
    pdf_url: str = ""
    entry_id: str = ""  # Full arXiv URL
    links: List[Dict[str, str]] = None

    def __post_init__(self):
        if self.categories is None:
            self.categories = []
        if self.links is None:
            self.links = []


def extract_xml_content(xml: str, tag_name: str) -> Optional[str]:
    """Extract content from XML tag"""
    pattern = f'<{tag_name}[^>]*>([\\s\\S]*?)</{tag_name}>'
    match = re.search(pattern, xml, re.IGNORECASE)
    return match.group(1).strip() if match else None


def parse_arxiv_xml(xml_text: str) -> List[Paper]:
    """Parse ArXiv Atom XML response"""
    papers = []

    # Find all entry elements
    entry_pattern = r'<entry>([\s\S]*?)</entry>'
    entries = re.findall(entry_pattern, xml_text)

    for entry_xml in entries:
        # Extract fields
        entry_id = extract_xml_content(entry_xml, 'id') or ''
        arxiv_id_match = re.search(r'(\d{4}\.\d{4,5})', entry_id)
        arxiv_id = arxiv_id_match.group(1) if arxiv_id_match else entry_id

        title = extract_xml_content(entry_xml, 'title') or ''
        title = re.sub(r'\s+', ' ', title).strip()

        summary = extract_xml_content(entry_xml, 'summary') or ''
        summary = re.sub(r'\s+', ' ', summary).strip()

        published = extract_xml_content(entry_xml, 'published') or ''
        updated = extract_xml_content(entry_xml, 'updated') or ''

        # Extract authors
        authors = []
        author_pattern = r'<author>\s*<name>(.*?)</name>\s*</author>'
        for author_match in re.finditer(author_pattern, entry_xml):
            authors.append({'name': author_match.group(1).strip()})

        # Extract categories
        categories = []
        primary_category = ''

        # Primary category
        primary_pattern = r'<arxiv:primary_category[^>]*term="([^"]+)"'
        primary_match = re.search(primary_pattern, entry_xml)
        if primary_match:
            primary_category = primary_match.group(1)
            categories.append(primary_category)

        # All categories
        category_pattern = r'<category[^>]*term="([^"]+)"'
        for cat_match in re.finditer(category_pattern, entry_xml):
            cat = cat_match.group(1)
            if cat not in categories:
                categories.append(cat)

        # Extract links
        links = []
        link_pattern = r'<link[^>]*href="([^"]*)"[^>]*(?:rel="([^"]*)")?[^>]*(?:type="([^"]*)")?[^>]*/?>'
        for link_match in re.finditer(link_pattern, entry_xml):
            links.append({
                'href': link_match.group(1),
                'rel': link_match.group(2) or 'alternate',
                'type': link_match.group(3) or ''
            })

        # PDF URL
        pdf_link = next((l for l in links if l.get('type') == 'application/pdf'), None)
        pdf_url = pdf_link['href'] if pdf_link else f"http://arxiv.org/pdf/{arxiv_id}.pdf"

        papers.append(Paper(
            id=arxiv_id,
            title=title,
            authors=authors,
            summary=summary,
            published=published,
            updated=updated,
            primary_category=primary_category,
            categories=categories,
            pdf_url=pdf_url,
            entry_id=entry_id,
            links=links
        ))

    return papers


def api_request(search_query: str, max_results: int = 10) -> List[Paper]:
    """Make direct API request to ArXiv"""
    # Build URL with query parameters
    url = 'http://export.arxiv.org/api/query'
    params = {
        'search_query': search_query,
        'start': '0',
        'max_results': str(max_results)
    }

    print(f"[ArXiv API] GET {url}?search_query={search_query}")

    # Make HTTP request
    response = requests.get(url, params=params)

    if not response.ok:
        raise Exception(f"ArXiv API error: {response.status_code} {response.reason}")

    xml_text = response.text

    # Parse XML response
    papers = parse_arxiv_xml(xml_text)

    print(f"[ArXiv API] Received {len(papers)} papers")

    return papers


def search(
    query: str,
    categories: Optional[List[str]] = None,
    date_from: Optional[str] = None,
    max_results: int = 10
) -> List[Paper]:
    """
    Search arXiv papers

    Args:
        query: Search query (keywords, author:Name, cat:cs.LG, etc.)
        categories: Optional category filters (e.g., ["cs.LG", "cs.AI"])
        date_from: Optional date filter (YYYY-MM-DD format)
        max_results: Maximum number of results (default: 10)

    Returns:
        Array of papers matching the query

    Examples:
        # Basic keyword search
        papers = search("transformer architecture")

        # Search with author (arXiv query syntax)
        papers = search("au:Vaswani attention")

        # Search within category
        papers = search("few-shot learning", categories=["cs.LG", "cs.AI"])

        # Recent papers only
        papers = search("efficient attention", date_from="2023-01-01", max_results=20)
    """
    print(f"[ArXiv] Searching for: \"{query}\"")

    # Build search query
    search_query = query

    # Add category filters
    if categories and len(categories) > 0:
        cat_query = '+OR+'.join(f"cat:{cat}" for cat in categories)
        search_query = f"({search_query})+AND+({cat_query})"

    # Add date filter if specified
    if date_from:
        date_formatted = date_from.replace('-', '')
        search_query = f"({search_query})+AND+submittedDate:[{date_formatted}0000+TO+20991231235]"

    results = api_request(search_query, max_results)

    print(f"[ArXiv] Found {len(results)} papers")

    return results


def search_recent(topic: str, years_back: int = 2) -> List[Paper]:
    """
    Search recent papers (last 1-2 years)

    Example:
        recent = search_recent("flash attention", 1)
    """
    start_date = datetime.now() - timedelta(days=years_back * 365)
    date_str = start_date.strftime('%Y-%m-%d')

    return search(topic, date_from=date_str, max_results=30)


def search_by_author(author_name: str, additional_keywords: Optional[str] = None) -> List[Paper]:
    """
    Search papers by specific author

    Example:
        papers = search_by_author("Vaswani", "attention")
    """
    query = f"au:{author_name}+AND+{additional_keywords}" if additional_keywords else f"au:{author_name}"

    return search(query, max_results=20)


def search_by_category(categories: List[str], keywords: str, max_results: int = 20) -> List[Paper]:
    """
    Search within specific arXiv category

    Example:
        papers = search_by_category(["cs.LG", "cs.AI"], "reinforcement learning")
    """
    return search(keywords, categories=categories, max_results=max_results)


def search_date_range(topic: str, date_from: str, date_to: Optional[str] = None) -> List[Paper]:
    """
    Find papers from a specific time period

    Example:
        papers = search_date_range("transformers", "2017-01-01", "2019-12-31")
    """
    papers = search(topic, date_from=date_from, max_results=50)

    # Client-side filtering for end date
    if date_to:
        end_date = datetime.fromisoformat(date_to)
        papers = [
            p for p in papers
            if datetime.fromisoformat(p.published.replace('Z', '+00:00')) <= end_date
        ]

    return papers


def compare_across_time(topic: str) -> Dict[str, List[Paper]]:
    """
    Compare papers across time periods

    Example:
        result = compare_across_time("efficient transformers")
    """
    current_year = datetime.now().year

    early = search_date_range(
        topic,
        f"{current_year - 5}-01-01",
        f"{current_year - 3}-12-31"
    )

    recent = search_date_range(topic, f"{current_year - 1}-01-01")

    return {
        'early': early,
        'recent': recent
    }


def survey_area(topic: str, categories: Optional[List[str]] = None) -> Dict[str, Any]:
    """
    Survey a research area comprehensively

    Example:
        survey = survey_area("flash attention", ["cs.LG", "cs.AI"])
        print(f"Total papers: {survey['total']}")
        print(f"Recent: {len(survey['recent'])}")
    """
    # Get comprehensive results
    all_papers = search(topic, categories=categories, max_results=100)

    # Separate recent vs older
    current_year = datetime.now().year
    recent = [
        p for p in all_papers
        if datetime.fromisoformat(p.published.replace('Z', '+00:00')).year >= current_year - 2
    ]

    older = [
        p for p in all_papers
        if datetime.fromisoformat(p.published.replace('Z', '+00:00')).year < current_year - 2
    ]

    # Count by year
    by_year: Dict[int, int] = {}
    for p in all_papers:
        year = datetime.fromisoformat(p.published.replace('Z', '+00:00')).year
        by_year[year] = by_year.get(year, 0) + 1

    # Count by category
    by_category: Dict[str, int] = {}
    for p in all_papers:
        for cat in p.categories:
            by_category[cat] = by_category.get(cat, 0) + 1

    return {
        'total': len(all_papers),
        'recent': recent,
        'older': older,
        'byYear': by_year,
        'byCategory': by_category
    }


def find_most_relevant(topic: str, count: int = 10) -> List[Paper]:
    """
    Find highly relevant papers (using arXiv's relevance ranking)

    Example:
        top_papers = find_most_relevant("neural architecture search", 5)
    """
    # ArXiv returns results sorted by relevance by default
    papers = search(topic, max_results=count)

    return papers[:count]


def get_paper_metadata(arxiv_id: str) -> Optional[Paper]:
    """
    Get paper metadata by arXiv ID

    Example:
        paper = get_paper_metadata("2401.12345")
    """
    # Normalize ID (remove arXiv: prefix if present)
    normalized_id = arxiv_id.replace('arXiv:', '', 1).replace('arxiv:', '', 1)

    # Search by ID using id_list parameter
    url = 'http://export.arxiv.org/api/query'
    params = {'id_list': normalized_id}

    print(f"[ArXiv API] GET {url}?id_list={normalized_id}")

    response = requests.get(url, params=params)

    if not response.ok:
        raise Exception(f"ArXiv API error: {response.status_code} {response.reason}")

    xml_text = response.text
    results = parse_arxiv_xml(xml_text)

    return results[0] if len(results) > 0 else None


def batch_search(topics: List[str], max_results: int = 10) -> Dict[str, List[Paper]]:
    """
    Batch search for multiple topics in parallel

    Example:
        results = batch_search([
            "flash attention",
            "sparse transformers",
            "efficient attention"
        ])
    """
    print(f"[ArXiv] Batch searching {len(topics)} topics...")

    results_by_topic = {}
    for topic in topics:
        results = search(topic, max_results=max_results)
        results_by_topic[topic] = results

    print("[ArXiv] Batch search complete")

    return results_by_topic


def extract_arxiv_id(paper_or_url: Any) -> str:
    """
    Extract arXiv ID from paper object or URL

    Example:
        id = extract_arxiv_id(paper)  # "2401.12345"
        id2 = extract_arxiv_id("https://arxiv.org/abs/2401.12345")  # "2401.12345"
    """
    if isinstance(paper_or_url, str):
        # Extract from URL
        match = re.search(r'(\d{4}\.\d{4,5})', paper_or_url)
        return match.group(1) if match else paper_or_url
    elif isinstance(paper_or_url, Paper):
        # Extract from paper object
        return paper_or_url.id
    elif isinstance(paper_or_url, dict):
        # Extract from dict representation
        return paper_or_url.get('id', '')
    else:
        return str(paper_or_url)


def format_paper(paper: Paper) -> str:
    """Format paper for display"""
    authors = ', '.join(a['name'] for a in paper.authors[:3])
    more_authors = ' et al.' if len(paper.authors) > 3 else ''

    published_date = datetime.fromisoformat(paper.published.replace('Z', '+00:00')).strftime('%Y-%m-%d')

    return f"""
**{paper.title}**
- **Authors:** {authors}{more_authors}
- **Published:** {published_date}
- **Categories:** {', '.join(paper.categories)}
- **ArXiv ID:** {paper.id}
- **PDF:** {paper.pdf_url}

**Abstract:**
{paper.summary}
    """.strip()
