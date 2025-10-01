# Literature Search Task

## Purpose
Conduct systematic literature search and identify relevant papers for research project.

## When to Use
- Starting new research project
- Identifying research gaps
- Finding related work for paper
- Updating knowledge on specific topic

## Prerequisites
- Research topic or question defined
- Access to academic databases or search tools

## Instructions

### Step 1: Define Search Scope
Ask the user:
- What is the specific research topic or question?
- What is the time frame for papers (e.g., last 5 years, all time)?
- Any specific venues or conferences to focus on?
- Key concepts or keywords?

### Step 2: Identify Search Keywords
Generate comprehensive list of search keywords:
- Core technical terms
- Related concepts and synonyms
- Established terminology from the field
- Alternative phrasings

Example for "attention mechanisms in computer vision":
- attention mechanism
- self-attention
- visual attention
- attention module
- attention-based
- non-local neural networks
- transformer vision

### Step 3: Suggest Search Strategy
Provide user with search strategy:

**Primary Sources:**
- Google Scholar
- arXiv.org
- Semantic Scholar
- Papers With Code
- Venue-specific (NeurIPS, ICML, ICLR, CVPR, ACL, etc.)

**Search Queries:**
Provide 3-5 specific search queries combining keywords, e.g.:
- "attention mechanism" AND "computer vision" (2019-2024)
- "self-attention" AND "image classification"
- "visual transformer" OR "vision transformer"

**Filtering Criteria:**
- Minimum citation count (suggest threshold based on recency)
- Publication venues (top-tier conferences/journals)
- Relevance to specific research question

### Step 4: Paper Collection
Instruct user to:
1. Run searches and collect papers
2. For each relevant paper, note:
   - Full citation
   - Year
   - Venue
   - Key contribution (1 sentence)
   - Relevance to your research (1 sentence)
3. Aim for 20-50 papers for comprehensive review
4. Include both seminal older papers and recent work

### Step 5: Organize Findings
Suggest organizing papers by themes:
- Methodological approaches
- Application domains
- Chronological evolution
- Problem formulations

### Step 6: Create Literature Review Document
Offer to:
- Create literature review document using literature-review-tmpl.yaml
- Structure papers by themes
- Synthesize findings
- Identify research gaps

### Step 7: Key Papers Deep Dive
For 5-10 most relevant papers:
- Read thoroughly
- Document methodology
- Note strengths and limitations
- Understand relation to your research
- Extract specific techniques or insights

## Output
- List of relevant papers with citations and summaries
- Organized by themes
- Identification of research gaps
- Optional: Complete literature review document

## Notes
- Literature review is iterative - expect to refine and expand
- Follow citation trails - papers cite other important papers
- Look for survey papers - they provide comprehensive overviews
- Check Papers With Code for implementation availability
- Note which papers have released code - easier to compare against

## Related Templates
- literature-review-tmpl.yaml (for comprehensive review document)
- research-proposal-tmpl.yaml (uses literature review findings)
