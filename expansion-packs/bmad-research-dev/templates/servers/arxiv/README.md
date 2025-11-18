# ArXiv Server Functions (Python)

Direct API wrappers for searching and retrieving papers from arXiv.

## Setup

1. Install dependencies:

```bash
pip install requests
```

No API key required - arXiv API is public.

## Available Functions

### search.py

- `search()` - Search arXiv papers
- `search_recent()` - Find recent papers (last 1-2 years)
- `search_by_author()` - Search by author name
- `search_by_category()` - Search within specific categories
- `survey_area()` - Comprehensive area survey
- `get_paper_metadata()` - Get paper by arXiv ID

### get_paper.py

- `get_paper()` - Get paper metadata
- `check_methodology()` - Check if paper uses specific method
- `check_reproducibility()` - Check for code/data availability
- `format_citation()` - Generate citation (plain or BibTeX)

## Usage Examples

```python
from servers.arxiv.search import search, search_recent, survey_area
from servers.arxiv.get_paper import get_paper, format_citation

# Search for papers
papers = search("attention mechanisms", max_results=10)

# Recent papers only
recent = search_recent("flash attention", years_back=1)

# Get paper by ID
paper = get_paper("2401.12345")
print(paper.title)
print(paper.pdf_url)

# Generate citation
citation = format_citation("2401.12345", style="bibtex")
print(citation)

# Survey a research area
survey = survey_area("efficient transformers", categories=["cs.LG", "cs.AI"])
print(f"Total papers: {survey['total']}")
print(f"Recent: {len(survey['recent'])}")
```

## ArXiv Categories

Common categories:

- `cs.AI` - Artificial Intelligence
- `cs.LG` - Machine Learning
- `cs.CL` - Computation and Language
- `cs.CV` - Computer Vision
- `stat.ML` - Machine Learning (Statistics)

## API Documentation

Full arXiv API docs: https://info.arxiv.org/help/api/user-manual.html
