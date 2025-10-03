# 🔧 QUICK REFERENCE: Archon MCP Integration

## Overview

The Research Assistant now uses **Archon MCP** instead of Zotero for accessing research papers through a knowledge base.

## What Changed

- ❌ **Old:** Zotero MCP with library management
- ✅ **New:** Archon MCP with RAG-powered knowledge base

## Setup Requirements

### Step 1: Verify Archon MCP is Running

Archon MCP should already be configured in your IDE. No additional installation needed!

### Step 2: Prepare Knowledge Base

1. Add research papers to Archon knowledge base
2. Tag papers with project-specific tags (e.g., "ml-research", "transformer-project")
3. The Research Assistant will ask for the tag when searching

### Step 3: Test It

```bash
@research-assistant
*sources
```

This lists available sources in your knowledge base.

### Step 4: Search Papers

```bash
@research-assistant
*search "attention mechanisms"
```

The assistant will:

1. Ask for project tag (if not provided)
2. Search knowledge base using short keyword query
3. Present results

## Key Commands

**Set project tag (required for filtering):**

```bash
*set-tag "your-project-tag"
```

**List available sources:**

```bash
*sources
```

**Search knowledge base:**

```bash
*search "your query"
```

**Search code examples:**

```bash
*search-codes "react hooks"
```

## Important Notes

1. **Always use short queries** (2-5 keywords) for best RAG results
   - ✅ Good: "attention transformers"
   - ❌ Bad: "how to implement attention mechanisms in transformers"

2. **Project tags are required** - The assistant will ask if you don't provide one

3. **No installation needed** - Archon MCP is already configured

---

## Troubleshooting

**Can't find papers?**

- Check that papers are in knowledge base with tags
- Verify Archon MCP is running
- Try using `*sources` to see available sources

**MCP not responding?**

- Restart your IDE
- Check MCP server status in IDE settings

---

**For full documentation, see:** [docs/ARCHON-MCP-INTEGRATION.md](docs/ARCHON-MCP-INTEGRATION.md)
