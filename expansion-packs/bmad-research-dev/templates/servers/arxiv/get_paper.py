"""
ArXiv Get Paper Server - Direct Web API
Makes direct HTTP requests to export.arxiv.org (NO MCP)

NOTE: PDF text extraction requires external libraries not available in zero-MCP.
This module provides metadata and download URLs. For full text, download PDFs manually.

API Docs: https://info.arxiv.org/help/api/user-manual.html

Usage:
    from servers.arxiv.get_paper import get_paper
    paper = get_paper("2401.12345")
"""

import re
from typing import List, Dict, Optional, Any, Literal
from .search import get_paper_metadata, Paper


def get_paper(arxiv_id: str) -> Optional[Paper]:
    """
    Get paper metadata and download information

    Args:
        arxiv_id: ArXiv ID (e.g., "2401.12345")

    Returns:
        Paper metadata with download URLs

    Example:
        paper = get_paper("2401.12345")
        print(paper.title)
        print(paper.pdf_url)
    """
    print(f"[ArXiv] Getting paper: {arxiv_id}")

    paper = get_paper_metadata(arxiv_id)

    if paper:
        print(f"[ArXiv] Retrieved: {paper.title}")
    else:
        print(f"[ArXiv] Paper {arxiv_id} not found")

    return paper


def get_papers(arxiv_ids: List[str]) -> List[Optional[Paper]]:
    """Get multiple papers in parallel"""
    print(f"[ArXiv] Getting {len(arxiv_ids)} papers in parallel...")

    papers = [get_paper(arxiv_id) for arxiv_id in arxiv_ids]

    valid_papers = [p for p in papers if p is not None]

    print(f"[ArXiv] Retrieved {len(valid_papers)} papers")

    return valid_papers


def check_methodology(arxiv_id: str, methodology: str) -> bool:
    """
    Check if paper mentions specific methodology/technique

    Args:
        arxiv_id: ArXiv ID
        methodology: Methodology to search for (e.g., "attention", "transformer")

    Returns:
        True if methodology is mentioned in title or abstract
    """
    paper = get_paper(arxiv_id)

    if not paper:
        return False

    search_text = f"{paper.title} {paper.summary}".lower()
    return methodology.lower() in search_text


def extract_methodology(arxiv_id: str) -> str:
    """Extract methodology-related keywords from abstract"""
    paper = get_paper(arxiv_id)

    if not paper:
        raise ValueError(f"Paper {arxiv_id} not found")

    # Extract sentences mentioning common methodology keywords
    methodology_keywords = [
        'method',
        'approach',
        'algorithm',
        'model',
        'architecture',
        'framework',
        'technique',
        'propose',
        'introduce'
    ]

    sentences = re.split(r'\. +', paper.summary)
    relevant_sentences = [
        sentence for sentence in sentences
        if any(keyword in sentence.lower() for keyword in methodology_keywords)
    ]

    return '. '.join(relevant_sentences)


def check_reproducibility(arxiv_id: str) -> Dict[str, Any]:
    """Check reproducibility indicators"""
    paper = get_paper(arxiv_id)

    if not paper:
        raise ValueError(f"Paper {arxiv_id} not found")

    full_text = f"{paper.title} {paper.summary}".lower()

    # Check for code availability
    code_patterns = [
        r'github\.com/[\w-]+/[\w-]+',
        r'code.*available',
        r'implementation.*available',
        r'open.*source'
    ]

    has_code = any(re.search(pattern, full_text, re.IGNORECASE) for pattern in code_patterns)

    # Extract GitHub URL if present
    github_match = re.search(r'github\.com/[\w-]+/[\w-]+', full_text, re.IGNORECASE)
    code_url = f"https://{github_match.group(0)}" if github_match else None

    # Check for dataset availability
    has_data = bool(
        re.search(r'dataset.*available', full_text, re.IGNORECASE) or
        re.search(r'data.*provided', full_text, re.IGNORECASE) or
        re.search(r'benchmark', full_text, re.IGNORECASE)
    )

    # Extract keywords
    keywords = paper.categories

    return {
        'hasCode': has_code,
        'hasData': has_data,
        'codeUrl': code_url,
        'keywords': keywords
    }


def compare_papers(arxiv_ids: List[str]) -> List[Dict[str, Any]]:
    """Compare multiple papers"""
    papers = get_papers(arxiv_ids)

    return [
        {
            'id': paper.id,
            'title': paper.title,
            'authors': [a['name'] for a in paper.authors],
            'published': paper.published,
            'approach': extract_methodology(paper.id)[:200],
            'categories': paper.categories
        }
        for paper in papers if paper is not None
    ]


def get_download_info(paper_id: str) -> Dict[str, str]:
    """Get download information for a paper"""
    return {
        'pdfUrl': f"http://arxiv.org/pdf/{paper_id}.pdf",
        'abstractUrl': f"https://arxiv.org/abs/{paper_id}"
    }


def format_citation(arxiv_id: str, style: Literal['plain', 'bibtex'] = 'plain') -> str:
    """
    Format paper citation (simple format)

    Args:
        arxiv_id: ArXiv ID
        style: Citation style ('plain' or 'bibtex')

    Returns:
        Formatted citation string
    """
    from datetime import datetime

    paper = get_paper(arxiv_id)

    if not paper:
        raise ValueError(f"Paper {arxiv_id} not found")

    if style == 'bibtex':
        authors = ' and '.join(a['name'] for a in paper.authors)
        year = datetime.fromisoformat(paper.published.replace('Z', '+00:00')).year

        return f"""@article{{{paper.id.replace('.', '_')},
  title={{{paper.title}}},
  author={{{authors}}},
  journal={{arXiv preprint arXiv:{paper.id}}},
  year={{{year}}}
}}"""
    else:
        # Plain citation
        authors = ', '.join(a['name'] for a in paper.authors[:3])
        more_authors = ', et al.' if len(paper.authors) > 3 else ''
        year = datetime.fromisoformat(paper.published.replace('Z', '+00:00')).year

        return f"{authors}{more_authors} ({year}). {paper.title}. arXiv preprint arXiv:{paper.id}."


def read_paper_fulltext(arxiv_id: str) -> str:
    """
    NOTE: PDF text extraction not available in zero-MCP architecture

    To read full paper text, you have two options:
    1. Download the PDF using the pdf_url and use external tools
    2. Use a PDF extraction MCP server (not zero-MCP)

    This function is a placeholder to document the limitation.
    """
    paper = get_paper(arxiv_id)

    if not paper:
        raise ValueError(f"Paper {arxiv_id} not found")

    raise NotImplementedError(
        f"""PDF text extraction not available in zero-MCP architecture.

Download PDF: {paper.pdf_url}
Abstract page: https://arxiv.org/abs/{arxiv_id}

For full text extraction, download the PDF and use external tools."""
    )


def list_downloaded_papers() -> List[Dict[str, str]]:
    """List downloaded papers (placeholder - no local storage in zero-MCP)"""
    raise NotImplementedError(
        'Local paper storage not available in zero-MCP architecture. Papers are not cached locally.'
    )


def is_paper_downloaded(arxiv_id: str) -> bool:
    """Check if paper is downloaded (placeholder)"""
    # In zero-MCP, we don't have local paper storage
    return False
