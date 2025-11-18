# BMAD Research-Dev: Automatic Subagent Installation

## 🎉 Subagents Install Automatically!

When you install the package, Claude Code subagents are automatically configured:

```bash
npm install @dkreuzer/bmad-method-ai-research
```

## What Happens Automatically

The postinstall script (`tools/setup-subagents.js`) runs `setup-bmad-subagents.sh` which:

1. ✅ Creates `.claude/` directory structure
2. ✅ Copies 4 specialist subagents to `.claude/agents/`:
   - `web-research-specialist.md` (D. Freuzer) 🌐
   - `arxiv-research-specialist.md` (H. Zoppel) 📄
   - `zotero-research-specialist.md` (Dr. Z. Reference) 📚
   - `github-research-specialist.md` (G. Hubman) 🐙
3. ✅ Copies 11 TypeScript server wrappers to `.claude/servers/`
4. ✅ Creates `.mcp.json` configuration for ArXiv & Zotero MCPs
5. ✅ Optionally installs MCP servers (prompted)
6. ✅ Creates documentation in `.claude/README.md`

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

## Manual Re-run

If you need to re-run the setup:

```bash
# From project root
bash expansion-packs/bmad-research-dev/setup-bmad-subagents.sh
```

**Options:**

```bash
# Auto-install MCPs without prompting
bash expansion-packs/bmad-research-dev/setup-bmad-subagents.sh --auto-install-mcps

# Skip MCP installation (architecture only)
bash expansion-packs/bmad-research-dev/setup-bmad-subagents.sh --skip-mcps
```

## Documentation

- **Quick Start:** [QUICKSTART-CODE-EXECUTION.md](./QUICKSTART-CODE-EXECUTION.md)
- **Architecture Guide:** [CODE-EXECUTION-MCP-ARCHITECTURE.md](./CODE-EXECUTION-MCP-ARCHITECTURE.md)
- **Inter-Agent Communication:** [INTER-AGENT-COMMUNICATION-PROTOCOL.md](./INTER-AGENT-COMMUNICATION-PROTOCOL.md)

## Verification

Check that subagents are installed:

```bash
# List installed subagents
ls -la .claude/agents/

# Expected output:
# - arxiv-research-specialist.md
# - github-research-specialist.md
# - web-research-specialist.md
# - zotero-research-specialist.md
```

## Troubleshooting

**Subagents not appearing in Claude Code?**

1. Restart Claude Code after installation
2. Run `/agents` command to list available agents
3. Check `.claude/agents/` directory exists and has 4 files

**Need to reinstall?**

```bash
# Remove existing installation
rm -rf .claude/

# Re-run setup
bash expansion-packs/bmad-research-dev/setup-bmad-subagents.sh
```

## How It Works

The automatic installation uses npm's postinstall hook:

1. **package.json** defines `"postinstall": "node tools/setup-subagents.js"`
2. **tools/setup-subagents.js** finds all expansion packs with `setup-bmad-subagents.sh`
3. Each setup script runs automatically from its directory
4. Subagents are copied to `.claude/agents/` where Claude Code discovers them

This pattern follows Claude Code's plugin architecture for automatic agent discovery.
