# BMAD AI Research - Setup Checklist

## What You Need to Do to Make It Work

### ✅ Already Done (by me)

- [x] Created all 7 research agents
- [x] Created Research Assistant with Archon MCP integration
- [x] Created templates, tasks, workflows
- [x] Created documentation
- [x] Updated iterative brainstorm-literature workflow

### 🔧 What YOU Need to Do

#### Step 1: Install the Expansion Pack

**Option A: If you have BMAD installed in a project:**

```bash
cd your-project
npx bmad-method install
# When prompted, select: bmad-ai-research
```

**Option B: Copy manually:**

```bash
# Copy the entire bmad-ai-research folder to your project
cp -r /path/to/BMAD-METHOD/expansion-packs/bmad-ai-research \
      your-project/.bmad-core/expansion-packs/
```

#### Step 2: Verify Archon MCP is Running (Optional but Recommended)

**2.1: Check Archon MCP Status**

The Research Assistant uses Archon MCP's knowledge base for paper searches. If Archon MCP is already running in your IDE, you're good to go!

**2.2: Prepare Your Knowledge Base**

1. Add research papers to Archon knowledge base
2. Tag papers with project-specific tags (e.g., "ml-research", "nlp-project")
3. The Research Assistant will ask for the project tag when searching

**No additional installation needed** - Archon MCP is already configured in your IDE.

#### Step 3: Verify Archon MCP Access

**Archon MCP should already be configured** in your IDE. The Research Assistant will automatically use Archon's RAG tools if available:

- `mcp__archon__rag_get_available_sources`
- `mcp__archon__rag_search_knowledge_base`
- `mcp__archon__rag_search_code_examples`

**No IDE-specific configuration needed** - if Archon MCP is running, the Research Assistant will use it automatically.

---

#### Step 4: Test the Setup

**4.1: Test Basic Agents (No MCP needed)**

```bash
# In your IDE, activate Research Lead
@research-lead
*help
```

You should see the agent greet you and show available commands.

**4.2: Test Research Assistant (with Archon MCP)**

```bash
@research-assistant
*help
```

Research Assistant should:

- Greet you
- Show MCP-specific commands (*search, *sources, \*set-tag, etc.)
- If MCP is configured correctly, you can test:

```bash
*sources
```

This lists available sources in your Archon knowledge base.

**4.3: Test Knowledge Base Search**

```bash
@research-assistant
*search "machine learning"
```

The assistant will ask for your project tag (if not provided), then search the knowledge base.

---

#### Step 5: Start Your Research Workflow

**5.1: Begin with Brainstorming**

```bash
@research-lead
*brainstorm "your research topic"
```

**5.2: Search Your Library**

```bash
@research-assistant
*search "relevant keywords"
```

**5.3: Iterate**

- Research Lead refines questions
- Research Assistant searches literature
- Repeat until converged

**5.4: Create Research Proposal**

```bash
@research-lead
*create-proposal
```

**5.5: Continue Through Workflow**

- Design experiments
- Implement
- Write paper

---

## Troubleshooting

### MCP Not Working

**Check 1: Is Archon MCP running?**

- Verify Archon MCP server is running in your IDE
- Check IDE's MCP server status/logs

**Check 2: Are papers in knowledge base?**

- Ensure papers have been added to Archon knowledge base
- Check that papers are tagged appropriately

**Check 3: Is IDE recognizing Archon MCP?**

- Restart IDE if needed
- Check MCP server connection status

### Research Assistant Can't Find Papers

**Possible causes:**

1. **Empty knowledge base** - Add papers with tags first!
2. **No project tag provided** - The assistant will ask for one
3. **Wrong tag used** - Verify tag matches papers in knowledge base
4. **MCP not connected** - Check Archon MCP status

### Agent Commands Not Working

**Check:**

1. Agent activated correctly? Use `@agent-name`
2. Commands have `*` prefix? Use `*help` not `help`
3. BMAD core config loaded? Should happen on activation

---

## Quick Start Summary

**Minimal setup (without Archon MCP):**

```bash
# 1. Install expansion pack
npx bmad-method install
# Select: bmad-ai-research

# 2. Start using
@research-lead
*brainstorm "your topic"
```

**Full setup (with Archon MCP):**

```bash
# 1. Install expansion pack
npx bmad-method install

# 2. Ensure Archon MCP is running (already configured)

# 3. Add papers to knowledge base with tags

# 4. Test
@research-assistant
*sources
```

---

## What Works Without MCP

Even without Archon MCP, you can use:

- ✅ Research Lead (brainstorming, proposals)
- ✅ Research Scientist (experiment design)
- ✅ ML Engineer (implementation)
- ✅ Data Analyst (analysis)
- ✅ Research Writer (paper writing)
- ✅ Reproducibility Engineer (validation)
- ⚠️ Research Assistant (limited - manual literature guidance only)

**Archon MCP is optional but recommended for full experience!**

---

## Documentation References

- **Full Archon Integration Guide:** [docs/ARCHON-MCP-INTEGRATION.md](docs/ARCHON-MCP-INTEGRATION.md)
- **Iterative Workflow Guide:** [docs/ITERATIVE-RESEARCH-WORKFLOW.md](docs/ITERATIVE-RESEARCH-WORKFLOW.md)
- **Research Knowledge Base:** [data/research-kb.md](data/research-kb.md)
- **Main README:** [README.md](README.md)

---

## Support

**Issues with BMAD:**

- GitHub: https://github.com/bmadcode/bmad-method/issues
- Discord: https://discord.gg/gk8jAdXWmj

---

**That's it! You're ready to do AI research with BMAD! 🔬📚**
