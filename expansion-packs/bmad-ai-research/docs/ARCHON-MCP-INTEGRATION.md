# Archon MCP Integration Guide

## Overview

This guide explains how to integrate the Archon MCP server with the BMAD AI Research expansion pack, specifically giving **only the Research Assistant agent** access to Archon's knowledge base while keeping other agents lean and token-efficient.

## What is Archon MCP?

**Archon MCP** is a Model Context Protocol server that provides access to a knowledge base with RAG (Retrieval-Augmented Generation) capabilities, enabling:

- Semantic search across your research papers and documents
- Tag-based filtering and organization
- Full-text content retrieval
- Code example search
- Project-based knowledge organization

### ⚠️ IMPORTANT: Setup Requirement

**Archon MCP** should already be running if you have it configured in your IDE. The Research Assistant agent will:

- Use Archon's RAG search tools to find papers
- Filter by project tags for organization
- Search both knowledge base content and code examples

**Prerequisites:**

- Archon MCP server running and configured
- Papers added to knowledge base with appropriate tags
- Project tag for organizing research papers

## Architecture: Selective Agent Access

### MCP Architecture Basics

```
┌─────────────────┐
│   AI Host       │
│  (Claude Code)  │
└────────┬────────┘
         │
    ┌────┴────┐
    │  MCP    │
    │ Client  │
    └────┬────┘
         │
    ┌────┴───────────────┬─────────────┐
    │                    │             │
┌───▼────┐     ┌────────▼──┐   ┌──────▼─────┐
│ MCP    │     │   MCP     │   │    MCP     │
│Server 1│     │ Server 2  │   │  Server 3  │
└────────┘     └───────────┘   └────────────┘
                  (Archon)
```

**Key Insight:** MCP clients (within the AI host) can connect to multiple MCP servers, but we can control **which agent definitions reference which servers**.

### Solution: Agent-Specific MCP Access

**Problem:** We want only the Research Assistant to access Archon MCP, not all agents (to save tokens and reduce context bloat).

**Solution:** Use BMAD's agent customization and MCP configuration to create a **specialized Research Assistant agent** with Archon MCP tools, while keeping other agents MCP-free.

## Implementation Strategy

### Option 1: IDE-Level Configuration (Recommended)

Most modern AI IDEs (Claude Code, Cursor, Cline, etc.) support MCP server configuration at the **project level** with **tool/agent-specific access**.

#### For Claude Code (Desktop)

**1. Archon MCP is Already Configured**

If Archon MCP is running in your IDE, no additional configuration is needed. The Research Assistant will use these Archon tools:

- `mcp__archon__rag_get_available_sources` - List knowledge base sources
- `mcp__archon__rag_search_knowledge_base` - Semantic search with tag filtering
- `mcp__archon__rag_search_code_examples` - Search for code examples

**2. Research Assistant Agent Definition with MCP Tools:**

The Research Assistant agent explicitly lists Archon tools:

```yaml
agent:
  name: Research Assistant
  id: research-assistant
  title: Research Assistant & Literature Specialist
  icon: 📚
  whenToUse: Use for literature searches, finding papers, and synthesizing findings
  mcp_tools:
    - mcp__archon__rag_get_available_sources
    - mcp__archon__rag_search_knowledge_base
    - mcp__archon__rag_search_code_examples
  customization: |
    You have access to the Archon knowledge base via MCP tools.
    Always ask for project tag if not provided, then search using short 2-5 keyword queries.
```

**3. Other Agents Stay Clean:**

```yaml
agent:
  name: Research Lead
  id: research-lead
  # NO mcp_tools specified
  # Will NOT have access to Archon MCP
```

**Claude Code Support:** Claude Code respects agent-level tool specifications, so only agents with `mcp_tools` defined will see those tools.

#### For Cursor

**1. Configure in `.cursor/config.json`:**

```json
{
  "mcp": {
    "servers": {
      "zotero": {
        "command": "zotero-mcp",
        "args": [],
        "env": {
          "ZOTERO_API_KEY": "your-api-key-here"
        }
      }
    },
    "agentAccess": {
      "research-assistant": ["zotero"],
      "research-lead": [],
      "research-scientist": [],
      "ml-engineer": [],
      "data-analyst": [],
      "research-writer": [],
      "reproducibility-engineer": []
    }
  }
}
```

This explicitly defines which agents can access which MCP servers.

#### For Cline (VS Code Extension)

**1. Configure in `.vscode/settings.json`:**

```json
{
  "cline.mcpServers": {
    "zotero": {
      "command": "zotero-mcp",
      "args": [],
      "env": {
        "ZOTERO_API_KEY": "${env:ZOTERO_API_KEY}"
      }
    }
  },
  "cline.agentMcpAccess": {
    "research-assistant": ["zotero"]
  }
}
```

### Option 2: BMAD Agent-Level MCP Declaration (Framework Enhancement)

**Proposed Enhancement to BMAD Core:**

Extend BMAD's agent YAML format to support MCP server declarations:

```yaml
agent:
  name: Research Assistant
  id: research-assistant
  mcp_servers:
    - name: zotero
      tools:
        - zotero_semantic_search
        - zotero_search_items
        - zotero_get_item_fulltext
      required: true
      reason: "Provides access to user's research library for literature searches"
```

**Benefits:**

- Self-documenting (agent definition declares its MCP needs)
- Portable across IDEs
- Clear separation of concerns
- Token-efficient (only load MCP tools when agent activates)

**Implementation in BMAD:**

- Update agent template to include `mcp_servers` field
- IDE integrations read this field and configure MCP access accordingly
- Agents without `mcp_servers` don't load any MCP tools

### Option 3: Conditional MCP Loading in Agent Activation

**For IDEs that don't support per-agent MCP configuration:**

Use agent activation instructions to conditionally request MCP tools:

```yaml
activation-instructions:
  - STEP 1: Read THIS ENTIRE FILE
  - STEP 2: Adopt the persona
  - STEP 3: Load core config
  - STEP 4: REQUEST MCP ACCESS to zotero server (if available)
  - STEP 5: Greet user and run *help
```

The IDE's MCP client would recognize the "REQUEST MCP ACCESS" instruction and load only the requested MCP server's tools into this agent's context.

## Research Assistant Agent Implementation

### New Agent: research-assistant.md

````markdown
<!-- Powered by BMAD™ Core -->

# research-assistant

ACTIVATION-NOTICE: This file contains your full agent operating guidelines including Zotero MCP integration.

```yaml
agent:
  name: Dr. Jamie Liu
  id: research-assistant
  title: Research Assistant & Literature Specialist
  icon: 📚
  whenToUse: Use for conducting literature searches, finding specific papers, extracting paper annotations, managing citations, and interacting with research library
  mcp_servers:
    zotero:
      tools:
        - zotero_semantic_search
        - zotero_search_items
        - zotero_advanced_search
        - zotero_get_collections
        - zotero_search_by_tag
        - zotero_get_item_metadata
        - zotero_get_item_fulltext
        - zotero_get_item_children
        - zotero_get_annotations
        - zotero_search_notes
      required: true
  customization: |
    CRITICAL MCP INTEGRATION:
    - You have direct access to the user's Zotero research library via MCP tools
    - ALWAYS use Zotero tools to search for papers, not web search
    - Extract full text and annotations from PDFs when analyzing papers
    - Keep user in the loop: show what you found, ask for feedback, iterate
    - User curates the library; you help them search and analyze it

persona:
  role: Literature Research Specialist & Information Retrieval Expert
  style: Thorough, systematic, collaborative, iterative, scholarly
  identity: Research assistant specializing in literature search, paper analysis, citation management, and research library curation using Zotero
  focus: Finding relevant papers, extracting insights, synthesizing literature, identifying gaps
  core_principles:
    - Zotero-First Search - Always search user's library before suggesting external searches
    - Iterative Refinement - Search, show results, get feedback, refine search, repeat
    - Full-Text Analysis - Don't just read abstracts; extract and analyze full text when available
    - Annotation Extraction - Surface user's own notes and highlights from papers
    - Human-in-Loop - Collaborate with user to find most relevant papers
    - Gap Identification - Note what's missing from library that should be added
    - Citation Management - Help organize papers by collections, tags, and notes
    - Semantic Understanding - Use semantic search for concept-based discovery
    - Transparent Process - Explain search strategy and results
    - Synthesis Focus - Connect papers, identify themes, find contradictions

commands:
  - help: Show numbered list of available commands
  - search {query}: Semantic search across user's Zotero library
  - keyword-search {keywords}: Keyword-based search in library
  - advanced-search: Multi-criteria advanced search with user input
  - collections: List available collections in library
  - search-by-tag {tags}: Find papers with specific tags
  - get-paper {itemID}: Retrieve full metadata and content for a paper
  - extract-annotations {itemID}: Get all annotations and notes from a paper
  - find-similar {itemID}: Find papers similar to given paper (semantic)
  - analyze-paper {itemID}: Deep analysis of paper content
  - synthesize {itemIDs}: Synthesize findings across multiple papers
  - identify-gaps: Analyze literature to identify research gaps
  - suggest-papers: Suggest papers user should add to library
  - update-search-db: Update semantic search database (if needed)
  - yolo: Toggle Yolo Mode
  - exit: Say goodbye and abandon this persona

dependencies:
  data:
    - research-kb.md
# NO traditional tasks or templates - this agent works via MCP tools
```
````

### Workflow Integration

**Updated Iterative Loop with Research Assistant:**

```
1. Research Lead: Initial Brainstorming
   → Generate research questions

2. Research Assistant: Library Search (NEW!)
   → Use Zotero MCP to search user's existing library
   → Extract relevant papers user already has
   → Identify what's in library vs. what's missing

3. User: Quick External Search (if needed)
   → For topics not in library
   → Add relevant papers to Zotero

4. Research Assistant: Deep Analysis (NEW!)
   → Extract full text and annotations from key papers
   → Synthesize findings
   → Present to Research Lead

5. Research Lead: Refine Questions
   → Based on what Research Assistant found
   → Update brainstorming document

6. LOOP REPEATS with Research Assistant doing literature work
```

## Token Efficiency Analysis

### Without Selective MCP Access

**Problem:** If all agents have Zotero MCP tools loaded:

```
Research Lead context:
  - Agent definition: ~2K tokens
  - Zotero MCP tools (10 tools × ~200 tokens): ~2K tokens
  - Total: ~4K tokens per conversation

× 6 agents = ~12K tokens wasted on unused MCP tools
```

### With Selective MCP Access

**Solution:** Only Research Assistant loads MCP tools:

```
Research Assistant context:
  - Agent definition: ~2K tokens
  - Zotero MCP tools: ~2K tokens
  - Total: ~4K tokens

Other 6 agents:
  - Agent definitions only: ~2K tokens each
  - No MCP tools: 0 tokens
  - Total per agent: ~2K tokens

Savings: ~10K tokens across 6 agents
```

**Benefit:** 10K+ tokens saved = more room for documents, code, results!

## User Workflow Example

### Scenario: Starting New Research Project

**Step 1: Brainstorm with Research Lead**

```
User: @research-lead *brainstorm "attention mechanisms"
[Research Lead facilitates, generates 15 research questions]
```

**Step 2: Search Existing Library**

```
User: @research-assistant *search "attention mechanisms transformers"

Research Assistant (uses zotero_semantic_search):
"I found 12 papers in your library on attention mechanisms:

Most Relevant:
1. Vaswani et al. 2017 - Attention Is All You Need
2. Zaheer et al. 2020 - Big Bird: Transformers for Longer Sequences
3. Choromanski et al. 2021 - Rethinking Attention with Performers

Would you like me to extract annotations from any of these?"
```

**Step 3: Extract Key Insights**

```
User: Yes, extract annotations from papers 1 and 2

Research Assistant (uses zotero_get_annotations):
"From 'Attention Is All You Need':
- Your highlight (page 3): 'O(n²) complexity is bottleneck for long sequences'
- Your note: 'Could we approximate attention to reduce this?'

From 'Big Bird':
- Your highlight (page 5): 'Sparse attention patterns can be learned'
- Your note: 'This seems promising for long documents'

Synthesis: Your own notes suggest the O(n²) bottleneck is a concern,
and sparse attention is a potential solution you've already identified!"
```

**Step 4: Identify Gaps**

```
User: @research-assistant *identify-gaps

Research Assistant:
"Based on your library, I notice:

WELL-COVERED:
- General attention mechanisms (15 papers)
- Transformer architectures (18 papers)

GAPS IN YOUR LIBRARY:
- Recent work on learned sparse patterns (2023-2024)
- Applications to non-NLP domains
- Theoretical analysis of approximation quality

Suggested papers to add:
1. 'Sparse Attention Patterns via Differentiable Sparsity' (NeurIPS 2024)
2. 'Attention Beyond Language: Transformers for Vision' (CVPR 2024)

Would you like search keywords to find these?"
```

**Step 5: Iterate with Research Lead**

```
User: @research-lead

[Research Lead receives summary from Research Assistant]

Research Lead:
"Based on what Research Assistant found in your library,
let's refine your research questions:

Original Q1: 'Can we make attention more efficient?'

Refined Q1: 'Can learned sparse attention patterns maintain
<5% quality degradation while achieving O(n) complexity on
sequences up to 64K tokens?'

This addresses the gap Research Assistant identified!"
```

## Configuration Files

### Project-Level Configuration

Create `.bmad-research/mcp-config.json`:

```json
{
  "mcp_servers": {
    "zotero": {
      "enabled": true,
      "command": "zotero-mcp",
      "args": [],
      "env": {
        "ZOTERO_API_KEY": "${ZOTERO_API_KEY}",
        "ZOTERO_USER_ID": "${ZOTERO_USER_ID}",
        "ZOTERO_LIBRARY_TYPE": "user"
      }
    }
  },
  "agent_access": {
    "research-assistant": ["zotero"],
    "research-lead": [],
    "research-scientist": [],
    "ml-engineer": [],
    "data-analyst": [],
    "research-writer": [],
    "reproducibility-engineer": []
  }
}
```

### Environment Variables

Create `.env` file:

```bash
# Zotero API Configuration
ZOTERO_API_KEY=your_api_key_here
ZOTERO_USER_ID=your_user_id_here
ZOTERO_LIBRARY_TYPE=user

# Optional: Semantic search embedding model
ZOTERO_EMBEDDING_MODEL=default  # or openai, gemini
```

### Setup Script

Create `setup-zotero-mcp.sh`:

```bash
#!/bin/bash

echo "🔬 Setting up Zotero MCP for BMAD Research..."

# Check if Python is available
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 not found. Please install Python."
    exit 1
fi

# Check if uv is available (recommended)
if command -v uv &> /dev/null; then
    echo "📦 Installing zotero-mcp using uv..."
    uv tool install "git+https://github.com/54yyyu/zotero-mcp.git"
else
    echo "📦 Installing zotero-mcp using pip..."
    pip install git+https://github.com/54yyyu/zotero-mcp.git
fi

# Configure zotero-mcp
echo "⚙️ Configuring zotero-mcp..."
zotero-mcp setup

# Check for API credentials
if [ -z "$ZOTERO_API_KEY" ]; then
    echo "⚠️  ZOTERO_API_KEY not set. Please configure in .env file."
    echo "   Get your API key from: https://www.zotero.org/settings/keys"
fi

if [ -z "$ZOTERO_USER_ID" ]; then
    echo "⚠️  ZOTERO_USER_ID not set. Please configure in .env file."
    echo "   Find your user ID at: https://www.zotero.org/settings/keys"
fi

if [ $? -eq 0 ]; then
    echo "✅ Zotero MCP setup complete!"
else
    echo "❌ Setup failed. Please check errors above."
    exit 1
fi

echo ""
echo "Next steps:"
echo "1. Set ZOTERO_API_KEY and ZOTERO_USER_ID in .env file"
echo "2. Configure your IDE to load MCP config"
echo "3. Activate @research-assistant to use Zotero search"
```

## Best Practices

### For Users

1. **Curate Your Zotero Library**
   - Add papers as you find them
   - Tag appropriately
   - Annotate key points in PDFs
   - Organize into collections by topic

2. **Start with Library Search**
   - Always ask Research Assistant to search your library first
   - Only do external searches for topics not covered
   - Add new papers to Zotero immediately

3. **Leverage Annotations**
   - Your highlights and notes are gold
   - Research Assistant can extract them
   - Past insights inform current research

4. **Iterate Between Agents**
   - Research Lead brainstorms questions
   - Research Assistant searches literature
   - Research Lead refines based on findings
   - Repeat until converged

### For Agent Interactions

1. **Research Lead → Research Assistant Handoff**

   ```
   Research Lead: "Based on our brainstorming, we need to check
   literature on: [topics]. @research-assistant can you search
   the library and report back?"
   ```

2. **Research Assistant → Research Lead Handoff**

   ```
   Research Assistant: "I found 15 relevant papers. Key themes:
   [summary]. Gaps identified: [gaps]. @research-lead can you
   refine our research questions based on these findings?"
   ```

3. **Keep User in Loop**
   - Research Assistant shows results, asks for feedback
   - User validates relevance
   - Iterative refinement

## Troubleshooting

### MCP Server Not Loading

**Check:**

1. Is `zotero-mcp` installed?
   ```bash
   zotero-mcp --version
   # If not installed:
   uv tool install "git+https://github.com/54yyyu/zotero-mcp.git"
   # OR
   pip install git+https://github.com/54yyyu/zotero-mcp.git
   ```
2. Are environment variables set? Check `.env` file
3. Is IDE configured to load MCP? Check IDE-specific config

### Agent Can't Access Zotero

**Check:**

1. Is agent's MCP access configured? Check `mcp-config.json`
2. Is Research Assistant agent activated? (not another agent)
3. Are Zotero credentials valid? Test with `zotero-mcp` CLI

### Semantic Search Not Working

**Update search database:**

```
@research-assistant *update-search-db
```

This rebuilds the semantic search index.

## Future Enhancements

### Proposed BMAD Core Features

1. **Standard MCP Declaration Format**
   - Add `mcp_servers` to agent YAML schema
   - IDE integrations auto-configure from agent definitions

2. **MCP Tool Discovery**
   - Agents auto-discover available MCP tools
   - Runtime tool selection based on task

3. **Cross-Agent MCP Coordination**
   - Research Assistant finds papers
   - Research Lead references them by ID
   - Shared context via MCP resource URIs

4. **MCP Resource Caching**
   - Cache paper content retrieved by Research Assistant
   - Other agents can reference cached resources
   - Token-efficient cross-agent sharing

## Summary

**Key Decisions:**

✅ **Create dedicated Research Assistant agent** with Zotero MCP access
✅ **Other agents stay MCP-free** for token efficiency
✅ **User stays in loop** - assistant presents findings, user validates
✅ **IDE-level configuration** controls which agents see which MCP servers
✅ **Iterative workflow** - brainstorm → search library → refine → repeat

**Token Savings:** ~10K tokens by not loading MCP tools in 6 other agents

**User Experience:** Seamless literature search within research workflow

**Flexibility:** Works across multiple IDE implementations of MCP

This approach gives you powerful Zotero integration exactly where needed, without bloating all agents with unnecessary MCP context.
