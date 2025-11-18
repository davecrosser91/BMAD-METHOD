# Code-Execution MCP Quick Start

**Fast track to using code-execution MCPs with BMAD Research-Dev**

---

## 🚀 5-Minute Setup

### 1. Install Prerequisites

```bash
# Install uv (Python package manager for MCPs)
curl -LsSf https://astral.sh/uv/install.sh | sh

# Install GitHub CLI (for GitHub specialist)
brew install gh  # macOS
# OR
sudo apt install gh  # Linux

# Authenticate GitHub
gh auth login
```

### 2. Install Package

The setup runs **automatically** when you install:

```bash
npm install @dkreuzer/bmad-method-ai-research
```

**This automatically creates:**

- `.claude/servers/` - TypeScript server wrappers
- `.claude/agents/` - 4 specialist subagents
- `.mcp.json` - MCP configuration
- Complete architecture documentation

**Manual re-run (if needed):**

```bash
# From project root
bash expansion-packs/bmad-research-dev/setup-bmad-subagents.sh
```

### 3. Install MCP Servers

```bash
# ArXiv (academic papers)
# Installed on-demand by uvx

# Zotero (personal library)
uv tool install git+https://github.com/54yyyu/zotero-mcp.git
uv tool run zotero-mcp setup

# GitHub (already installed via gh CLI)
```

### 4. Test Specialists

```bash
# In Claude Code or your MCP client

@web-research-specialist
Search for transformer optimization tutorials

@arxiv-research-specialist
Find recent papers on attention mechanisms

@zotero-research-specialist
Search my library for papers on transformers

@github-research-specialist
Show all experiment issues
```

---

## 📚 The 4 Specialists

### 1. Web Research Specialist (D. Freuzer)

- **Icon:** 🌐
- **Specialty:** Recent blogs, docs, GitHub repos, industry perspectives
- **Tools:** WebSearch, WebFetch (built-in, no MCP needed)
- **When to use:** Need implementation tutorials, practical guides

### 2. ArXiv Research Specialist (H. Zoppel)

- **Icon:** 📄
- **Specialty:** Academic papers, theoretical foundations, baselines
- **Tools:** mcp**arxiv**\* (via code execution)
- **When to use:** Need peer-reviewed research, novel methods

### 3. Zotero Library Specialist (Dr. Z. Reference)

- **Icon:** 📚
- **Specialty:** Personal library, your notes/annotations, citations
- **Tools:** mcp**zotero**\* (via code execution)
- **When to use:** Check existing research, leverage past work

### 4. GitHub Workflow Specialist (G. Hubman)

- **Icon:** 🐙
- **Specialty:** Issue tracking, project management, workflow automation
- **Tools:** gh CLI (via code execution)
- **When to use:** Track experiments, organize research, coordinate team

---

## 💡 Usage Examples

### Example 1: Comprehensive Research

```markdown
@research-lead
\*run-deep-research "efficient transformer architectures"
```

**What happens:**

1. Research Lead orchestrates all 3 search specialists in parallel
2. Web specialist finds tutorials and implementations
3. ArXiv specialist finds academic papers
4. Zotero specialist checks your existing library
5. GitHub specialist creates issues for promising experiments
6. Research Lead synthesizes all findings

### Example 2: Check Library First

```markdown
@zotero-research-specialist
Do I have any papers on Flash Attention in my library?
If yes, show me your annotations.
If no, suggest @arxiv-research-specialist to search.
```

**Benefits:**

- Leverage existing knowledge first
- Access your past notes/annotations
- Avoid redundant searches

### Example 3: Paper → Experiment Pipeline

```markdown
# Step 1: Find paper

@arxiv-research-specialist
Find the Flash Attention v2 paper and extract the methodology

# Step 2: Create experiment issue

@github-research-specialist
Create an experiment issue to implement Flash Attention v2
based on the paper arXiv:2307.08691

# Step 3: Track progress

@github-research-specialist
Move experiment #42 to "In Progress"
```

### Example 4: Export Citations

```markdown
@zotero-research-specialist
Export BibTeX for all papers tagged "transformers"
from my "Deep Learning" collection
```

---

## 🎯 Key Benefits

### 1. Zero Context Pollution ✅

- Traditional: 100,000+ tokens for tool definitions
- Code-execution: 2,000 tokens (only executeCode tool)
- **Savings: 98.7%**

### 2. Agent Isolation ✅

- ArXiv specialist only sees ArXiv tools
- Zotero specialist only sees Zotero tools
- Web specialist only sees web tools
- GitHub specialist only sees GitHub tools

### 3. Better Performance ✅

- Parallel specialist execution (up to 10 concurrent)
- Fewer model invocations (processing in code sandbox)
- Lower latency (one model call instead of 6+)

### 4. Clean Code ✅

- Type-safe TypeScript wrappers
- Reusable functions
- Clear abstractions
- Easy to extend

---

## 🔧 How It Works

### Traditional MCP Architecture (❌ Problems)

```
System Prompt:
├── mcp__arxiv__search definition (500 tokens)
├── mcp__arxiv__get_paper definition (500 tokens)
├── mcp__zotero__search definition (500 tokens)
├── mcp__zotero__get_item definition (500 tokens)
├── ... 196 more MCP tools ...
└── Total: 100,000 tokens BEFORE conversation starts!

Every agent sees ALL tools = context pollution
```

### Code-Execution Architecture (✅ Solution)

```
System Prompt:
└── mcp__ide__executeCode (500 tokens)

Agent discovers tools on-demand:
import { search } from './servers/arxiv/search.ts'
const papers = await search("topic")
// Processing happens in code sandbox
console.log(`Found ${papers.length} papers`)

Only final output goes to model context!
```

---

## 📖 Understanding the Architecture

### Server Wrappers (`./servers/`)

TypeScript files that wrap MCP tools:

```typescript
// ./servers/arxiv/search.ts
export async function search(query: string): Promise<Paper[]> {
  // Call actual MCP tool
  const results = await globalThis.mcp__arxiv__search({ query });
  return results;
}
```

**Benefits:**

- Type safety
- Developer ergonomics
- Reusable across agents
- Easy to test

### Specialist Subagents (`./agents/`)

Markdown files with instructions + code examples:

````markdown
---
name: arxiv-research-specialist
tools: Read, Write, Bash, Grep, mcp__ide__executeCode
---

You use code execution to access ArXiv tools:

```typescript
import { search } from './servers/arxiv/search.ts';
```
````

````

**Benefits:**
- Clear role definition
- Usage examples included
- Tool access restricted
- Context stays clean

### MCP Configuration (`.mcp.json`)

Project-level MCP installation:

```json
{
  "mcpServers": {
    "arxiv": {
      "transport": { "type": "stdio", "command": "uvx", "args": ["mcp-server-arxiv"] }
    },
    "zotero": {
      "transport": { "type": "stdio", "command": "uv", "args": ["tool", "run", "zotero-mcp"] },
      "env": { "ZOTERO_LOCAL": "true" }
    }
  }
}
````

**Benefits:**

- Version-controlled
- Team-shared
- Project-specific
- Easy to replicate

---

## 🐛 Troubleshooting

### "MCP server not found"

```bash
# ArXiv
uvx mcp-server-arxiv --help  # Should work

# Zotero
uv tool list  # Should show zotero-mcp
uv tool run zotero-mcp --help  # Should work
```

### "Import error in code execution"

Check that server wrappers exist:

```bash
ls .claude/servers/arxiv/
# Should show: search.ts, get-paper.ts
```

### "Specialist not responding"

Check that subagent exists:

```bash
ls .claude/agents/
# Should show: arxiv-research-specialist.md, etc.
```

### "GitHub CLI not authenticated"

```bash
gh auth status  # Check status
gh auth login   # Authenticate
```

---

## 📚 Next Steps

1. **Read full architecture:** `CODE-EXECUTION-MCP-ARCHITECTURE.md`
2. **Try each specialist individually** to understand their capabilities
3. **Use Research Lead** to orchestrate parallel searches
4. **Create your first experiment issue** with GitHub specialist
5. **Export your first bibliography** with Zotero specialist

---

## 🎓 Learn More

**Anthropic's Article:**

- [Code Execution with MCP](https://www.anthropic.com/engineering/code-execution-with-mcp)
- Explains the 98.7% token reduction approach

**MCP Documentation:**

- [Model Context Protocol](https://modelcontextprotocol.io/)
- Official MCP specification

**Server Documentation:**

- [ArXiv MCP](https://github.com/blazickjp/arxiv-mcp-server)
- [Zotero MCP](https://github.com/54yyyu/zotero-mcp)

---

**Questions?** Check the main architecture document:
`.bmad-research-dev/CODE-EXECUTION-MCP-ARCHITECTURE.md`

**Happy Researching! 🎉**
