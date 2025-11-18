# BMAD Research-Dev: Installation Guide

## ✅ Zero MCP Installation!

**Good news:** All research specialists work WITHOUT any MCP servers. Installation is simple and fast!

---

## Installation Methods

### Method 1: Automatic (npm install) - Recommended

When you install the package, subagents are automatically configured:

```bash
npm install @dkreuzer/bmad-method-ai-research
# ✅ Subagents installed automatically via postinstall hook
```

### Method 2: Manual (npx command)

If using `npx` or if automatic installation didn't run:

```bash
npx @dkreuzer/bmad-method-ai-research install-agents
```

---

## What Happens Automatically

The postinstall script (`tools/setup-subagents.js`) runs `setup-bmad-subagents.sh` which:

1. ✅ Creates `.claude/` directory structure
2. ✅ Copies 4 specialist subagents to `.claude/agents/`:
   - `web-research-specialist.md` (D. Freuzer) 🌐
   - `arxiv-research-specialist.md` (H. Zoppel) 📄
   - `zotero-research-specialist.md` (Dr. Z. Reference) 📚
   - `github-research-specialist.md` (G. Hubman) 🐙
3. ✅ Copies Python server modules to `.claude/servers/`:
   - ArXiv modules (direct API)
   - Zotero modules (direct API)
   - GitHub modules (gh CLI)
4. ✅ Copies helper scripts to `.claude/scripts/`:
   - Zotero login script
   - GitHub helper scripts
5. ✅ Creates documentation in `.claude/README.md`

**❌ NO MCP servers installed**
**❌ NO `.mcp.json` configuration created**

---

## One-Time Setup (Optional)

### Zotero (Only if you have a Zotero library)

If you want to use the Zotero research specialist with your personal library:

```bash
node .claude/scripts/zotero-login.js
```

This will:

1. Prompt for your Zotero API key
2. Prompt for your library type (user/group)
3. Prompt for your library ID
4. Save credentials in `.env` (automatically added to `.gitignore`)

**Get your credentials:**

- API Key: https://www.zotero.org/settings/keys/new
- Library ID: Shown when you create the API key

### GitHub (Only if you want GitHub workflow management)

If you want to use the GitHub research specialist:

```bash
gh auth login
```

Follow the prompts to authenticate GitHub CLI.

### ArXiv & Web

**No setup needed!** Both work immediately:

- ArXiv API is public (no authentication)
- Web tools are built into Claude Code

---

## Using the Specialists

After installation, restart Claude Code and use the specialists:

```markdown
@web-research-specialist
Search for transformer optimization tutorials

@arxiv-research-specialist
Find recent papers on attention mechanisms

@zotero-research-specialist
Search my library for papers on transformers

@github-research-specialist
Create an experiment issue for Flash Attention v2
```

---

## Verification

### Check Installed Subagents

```bash
# List installed subagents
ls -la .claude/agents/

# Expected output:
# - arxiv-research-specialist.md
# - github-research-specialist.md
# - web-research-specialist.md
# - zotero-research-specialist.md
```

### Check Python Modules

```bash
# List server modules
ls -la .claude/servers/

# Expected directories:
# - arxiv/    (api_client.py, search.py, get_paper.py)
# - zotero/   (env_loader.py, get_collections.py, search.py, get_item.py)
# - github/   (search_issues.py, create_issue.py, update_issue.py, projects.py)
```

### Verify No MCP Configuration

```bash
# This should NOT exist:
ls .mcp.json
# Expected: No such file or directory

# This should NOT exist:
ls .claude/.mcp.json
# Expected: No such file or directory
```

---

## Manual Re-run

If you need to re-run the setup:

```bash
# From project root
bash expansion-packs/bmad-research-dev/setup-bmad-subagents.sh
```

---

## Troubleshooting

### Subagents not showing up in Claude Code

1. Restart Claude Code completely
2. Check `.claude/agents/` directory exists and has the 4 agent files
3. Re-run setup script if needed

### Zotero specialist not working

```bash
# Check if .env exists
ls .env

# If not, run login script
node .claude/scripts/zotero-login.js
```

### GitHub specialist not working

```bash
# Check gh CLI is installed
gh --version

# Check authentication
gh auth status

# If not authenticated
gh auth login
```

### ArXiv specialist not working

ArXiv should work immediately - no setup needed. If issues:

- ArXiv API might be temporarily down (retry)
- Check internet connection

---

## Documentation

- **Zero MCP Architecture:** [ZERO-MCP-ARCHITECTURE.md](./ZERO-MCP-ARCHITECTURE.md) - Complete architecture guide
- **Quick Start:** [QUICKSTART-CODE-EXECUTION.md](./QUICKSTART-CODE-EXECUTION.md) - Get started quickly
- **Main README:** [README.md](./README.md) - Expansion pack overview

---

## What You DON'T Need

### ❌ No MCP Servers

You do NOT need to install:

```bash
# DON'T RUN THESE:
npx -y @anthropic/zotero-mcp@latest
npx -y @anthropic/arxiv-mcp@latest
```

### ❌ No `.mcp.json` Configuration

You do NOT need to create or manage `.mcp.json` files.

### ❌ No Server Processes

No background processes to manage. Everything runs via:

- Direct API calls (ArXiv, Zotero)
- CLI commands (GitHub)
- Built-in tools (Web)

---

## Architecture Benefits

### Direct Web APIs

- **ArXiv:** `export.arxiv.org` (public, no auth)
- **Zotero:** `api.zotero.org` (API key in `.env`)
- **GitHub:** `gh` CLI commands (authenticated)
- **Web:** Built-in WebSearch/WebFetch

### Code-Execution Pattern

```
Research Specialist Agent
  │
  ├─ executeCode (ONLY tool in context)
  │
  └─ Python modules (imported on-demand)
       │
       ├─ Direct Web API calls
       ├─ Direct CLI calls
       └─ Data processing in code sandbox

Result: Zero MCP, 98.7% token savings
```

### Benefits

- ✅ **98.7% fewer tokens** in agent context
- ✅ **No MCP servers** to install or manage
- ✅ **No `.mcp.json`** configuration
- ✅ **Faster responses** (less context to process)
- ✅ **Simpler debugging** (standard Python)
- ✅ **Better security** (credentials in project `.env`)

---

## Next Steps

1. ✅ Install package: `npm install @dkreuzer/bmad-method-ai-research`
2. ✅ (Optional) Setup Zotero: `node .claude/scripts/zotero-login.js`
3. ✅ (Optional) Setup GitHub: `gh auth login`
4. ✅ Restart Claude Code
5. ✅ Start using: `@arxiv-research-specialist find papers on transformers`

**Ready to research!** 🚀
