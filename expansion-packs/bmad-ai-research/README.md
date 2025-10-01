# BMAD AI Research Expansion Pack 🔬

Transform BMAD-METHOD into a complete AI/ML research laboratory for academic paper development, experiment design, and scientific publication.

## Quick Start

**Local Development Install:**

```bash
# Install in existing project from local BMAD repo
cd your-project
node /path/to/BMAD-METHOD/tools/installer/bin/bmad.js install
# Select "bmad-ai-research" when prompted
```

**When Published (future):**

```bash
cd your-project
npx bmad-method install
# Select "bmad-ai-research"
```

Then activate any research agent:

```bash
@research-lead          # Strategic planning & brainstorming
@research-assistant     # Literature search (uses Archon MCP)
@research-scientist     # Experiment design
@ml-engineer           # Implementation
@data-analyst          # Analysis & visualization
@research-writer       # Paper writing
@reproducibility-engineer  # Code release
```

## Overview

The **AI Research Expansion Pack** adapts BMAD's proven agentic workflow to the unique demands of scientific research. While the core BMAD framework focuses on software product development, this pack specializes in the complete research lifecycle: from literature review through experiment execution to paper publication.

## 🔄 Key Innovation: The Iterative Brainstorm-Literature Loop

**Unlike software development (which is linear), research ideation is cyclical.**

The pack's most powerful feature is the **iterative loop** between brainstorming and literature review:

```
Brainstorm Research Questions (Research Lead)
         ↓
Literature Search (Research Assistant via Archon MCP)
         ↓
Refine Questions Based on Gaps (Research Lead)
         ↓
Deeper Literature Dive (Research Assistant)
         ↓
Further Refinement (Research Lead)
         ↓
Repeat Until Converged (2-4 iterations)
         ↓
Well-Formed Research Questions + Identified Gaps
```

**NEW: Automated Literature Search with Archon MCP!**

- Research Assistant searches your knowledge base using project tags
- No manual literature searching - agent does it for you
- Finds relevant papers, identifies gaps, suggests additions

**Why This Matters:**

- ✅ Ideas grounded in reality (not already fully solved)
- ✅ Questions become specific and testable
- ✅ Clear novelty and gaps identified upfront
- ✅ Saves months of pursuing dead ends
- ✅ Strong positioning for paper from day one

**📖 [See detailed iterative workflow guide](docs/ITERATIVE-RESEARCH-WORKFLOW.md)**

## What Makes Research Different

| Software Development    | AI Research                              |
| ----------------------- | ---------------------------------------- |
| Build working product   | Advance scientific knowledge             |
| PRD → Stories → Code    | Proposal → Experiments → Paper           |
| Features must work      | Experiments often fail (and that's okay) |
| Deployed software       | Published paper + open code              |
| QA checks functionality | Peer review checks rigor                 |

## The Research Team

### 7 Specialized Research Agents

**📚 Research Assistant (Dr. Jamie Liu)** - NEW!

- Literature search via Archon MCP knowledge base
- Paper discovery using project tags
- Gap identification and synthesis
- Code example search
- **Commands:** `*set-tag`, `*sources`, `*search`, `*search-codes`

**🔬 Research Lead (Dr. Sarah Chen)**

- Research brainstorming and strategy
- Proposal development
- Validation and oversight
- Iterative question refinement
- **Commands:** `*brainstorm`, `*create-proposal`, `*validate-research`

**🧪 Research Scientist (Dr. Alex Kumar)**

- Experimental design and methodology
- Hypothesis formulation
- Novel algorithm design
- Result interpretation
- **Commands:** `*create-architecture`, `*design-experiment`, `*interpret-results`

**⚙️ ML Engineer (Jordan Lee)**

- Experiment implementation
- Baseline coding
- Training pipeline optimization
- Debugging and iteration
- **Commands:** `*implement-experiment`, `*execute-experiment`, `*debug-experiment`

**📊 Data Analyst (Dr. Maya Patel)**

- Dataset preparation
- Statistical analysis
- Publication-quality visualization
- Significance testing
- **Commands:** `*analyze-results`, `*create-figures`, `*significance-test`

**✍️ Research Writer (Dr. Emma Wright)**

- Paper drafting and revision
- Scientific storytelling
- Submission formatting
- Review response
- **Commands:** `*create-paper`, `*draft-abstract`, `*prepare-submission`

**🔁 Reproducibility Engineer (Sam Rodriguez)**

- Environment setup
- Seed control and versioning
- Code release preparation
- Reproducibility validation
- **Commands:** `*validate-reproducibility`, `*prepare-release`

## Research Workflow

### Phase 1: Planning - WITH ITERATIVE LOOP + AUTOMATED LITERATURE SEARCH

```
Research Lead → Initial Brainstorming (10-20 questions)
            ↓
Research Assistant → Search Knowledge Base (Archon MCP)
            ↓
Research Lead → Refine Questions Based on Gaps
            ↓
Research Assistant → Deeper Literature Search
            ↓
Research Lead → Further Refinement
            ↓
LOOP REPEATS 2-4 times until converged
            ↓
Research Assistant → Identify Gaps & Suggest Additions
            ↓
Research Lead → Research Proposal
            ↓
Research Scientist → Experimental Architecture
            ↓
Research Lead → Validation
```

**Outputs:** research-brainstorming-session-results.md, literature-review.md, research-proposal.md, experimental-architecture.md

**Key Improvement:** Research Assistant automates literature search using your tagged papers in Archon MCP!

### Phase 2: Experimentation (IDE Required)

```
Research Scientist → Design Experiments
            ↓
Data Analyst → Prepare Datasets
            ↓
ML Engineer → Implement & Run Experiments
            ↓
Data Analyst → Analyze Results
            ↓
Research Scientist → Interpret Findings
```

**Outputs:** Experiment specs, code, results, trained models

### Phase 3: Writing (Web UI or IDE)

```
Research Writer → Create Paper Outline
            ↓
Research Writer → Draft All Sections
            ↓
Research Lead → Review Draft
            ↓
Research Writer → Revise & Polish
            ↓
Research Writer → Format for Submission
```

**Outputs:** Complete research paper

### Phase 4: Publication

```
Reproducibility Engineer → Prepare Code Release
            ↓
Research Lead → Final Validation
            ↓
Submit to Conference/Journal
```

**Outputs:** Submitted paper, public code repository

## Key Documents

### Research-Specific Templates

**Research Proposal** (`research-proposal-tmpl.yaml`)

- Problem statement and motivation
- Research questions and hypotheses
- Proposed approach
- Expected contributions
- Timeline and resources

**Experimental Architecture** (`experimental-architecture-tmpl.yaml`)

- Model architecture specifications
- Training procedures
- Baseline implementations
- Evaluation protocols
- Reproducibility specifications

**Paper Outline** (`paper-outline-tmpl.yaml`)

- Complete paper structure
- Section-by-section planning
- Figure and table planning
- Page budget allocation

**Experiment Specification** (`experiment-spec-tmpl.yaml`)

- Hypothesis to test
- Methodology details
- Implementation plan
- Success criteria
- Analysis approach

**Literature Review** (`literature-review-tmpl.yaml`)

- Thematic organization
- Key papers analysis
- Research gaps identification
- Positioning statement

**Reproducibility Checklist** (`reproducibility-checklist-tmpl.yaml`)

- Code reproducibility checks
- Environment setup validation
- Data pipeline verification
- Results validation

## Installation & Setup

### Step 1: Install Expansion Pack

**Option A: From Published Package (when available):**

```bash
cd your-project
npx bmad-method install
# Select "bmad-ai-research" when prompted
```

**Option B: Local Development (current):**

Since this expansion pack is in development and not yet published:

```bash
# 1. Clone or navigate to BMAD-METHOD repo
cd /path/to/BMAD-METHOD

# 2. Install in your project from local source
cd /path/to/your-project
node /path/to/BMAD-METHOD/tools/installer/bin/bmad.js install
# Select "bmad-ai-research" when prompted

# OR copy directly to your project
cp -r /path/to/BMAD-METHOD/expansion-packs/bmad-ai-research \
      /path/to/your-project/.bmad-ai-research
```

**Fresh research project:**

```bash
mkdir my-research-project && cd my-research-project
# Use one of the methods above
```

### Step 2: (Optional) Configure Archon MCP for Literature Search

If you want automated literature search via the Research Assistant:

1. **Ensure Archon MCP is running** in your IDE (should already be configured)
2. **Add research papers to knowledge base** with project-specific tags
3. **Use Research Assistant** with your project tag:

```bash
@research-assistant
*set-tag "ml-research"     # Your project tag
*sources                   # List available sources
*search "attention mechanisms"  # Search papers
```

**No Archon MCP?** The Research Assistant will guide you to manual literature searches instead.

### Step 3: Start Your First Research Project

```bash
# 1. Brainstorm research questions
@research-lead
*brainstorm "your research topic"

# 2. Search literature (if Archon MCP available)
@research-assistant
*search "relevant keywords"

# 3. Iterate until converged (2-4 cycles)

# 4. Create proposal
@research-lead
*create-proposal
```

**📖 Full setup guide:** [SETUP-CHECKLIST.md](SETUP-CHECKLIST.md)

## Usage Examples

### Starting a New Research Project (With Archon MCP)

```bash
# Step 1: Brainstorm initial questions
@research-lead
*brainstorm "efficient attention mechanisms for transformers"
# → Generates 10-20 research questions

# Step 2: Search your knowledge base
@research-assistant
*set-tag "transformer-research"  # Your project tag
*search "attention mechanisms"
# → Finds relevant papers, identifies gaps

# Step 3: Refine based on findings
@research-lead
*brainstorm "efficient attention"
# → Refines questions based on gaps

# Repeat steps 2-3 for 2-4 iterations

# Step 4: Create formal proposal
@research-lead
*create-proposal
# → Creates research-proposal.yaml

# Step 5: Design experiments
@research-scientist
*create-architecture
*design-experiment
```

### Running Experiments

```bash
# Step 1: Prepare data
@data-analyst
*prepare-dataset
# → Processes and validates data

# Step 2: Implement experiment
@ml-engineer
*implement-experiment
# → Codes from experiment spec

*setup-baseline
# → Implements baseline methods

# Step 3: Execute experiments
@ml-engineer
*execute-experiment
# → Runs with proper seeds and logging

# Step 4: Analyze results
@data-analyst
*analyze-results
# → Statistical analysis (mean ± std)

*create-figures
# → Publication-quality plots

# Step 5: Interpret findings
@research-scientist
*interpret-results
*suggest-next-experiments
```

### Writing Paper

```bash
# Step 1: Create outline
@research-writer
*create-paper
# → Drafts complete paper structure

# Step 2: Draft sections
@research-writer
*draft-abstract
*draft-introduction
*draft-methodology
*draft-experiments
*draft-conclusion

# Step 3: Review
@research-lead
# Provide feedback on draft

# Step 4: Revise and submit
@research-writer
*revise-paper
*prepare-submission
# → Formats for NeurIPS/ICML/CVPR/etc.
```

### Preparing Code Release

```bash
@reproducibility-engineer
*validate-reproducibility
# → Checks experiments are reproducible

*prepare-release
# → Prepares public code repository

*create-readme
# → Generates comprehensive documentation
```

## Best Practices

### Reproducibility First

- Set all random seeds from day one
- Version control everything (code, configs, not models)
- Document as you go, not retrospectively
- Use experiment tracking (wandb, tensorboard)

### Embrace Failure

- Most experiments fail - that's research
- Failed experiments teach what doesn't work
- Document failures to avoid repeating them
- Pivot based on what you learn

### Statistical Rigor

- Always run multiple seeds (3-5 minimum)
- Report mean ± standard deviation
- Perform significance testing
- Compare fairly against strong baselines

### Honest Science

- Report what you find, not what you hoped
- Acknowledge limitations explicitly
- Give proper credit to related work
- Don't cherry-pick favorable results

## Typical Timeline

- **Planning Phase:** 1-2 weeks
- **Implementation:** 2-4 weeks
- **Experimentation:** 2-6+ weeks (variable!)
- **Analysis:** 1-2 weeks
- **Writing:** 2-4 weeks
- **Revision (if needed):** 1-4 weeks

**Total:** 3-6 months for conference paper

## Target Venues

This pack helps you prepare papers for:

**Top ML Conferences:**

- NeurIPS, ICML, ICLR

**Top Vision Conferences:**

- CVPR, ICCV, ECCV

**Top NLP Conferences:**

- ACL, EMNLP, NAACL

**And many others** (specialized venues for robotics, data mining, etc.)

## What's Included

### 📁 Directory Structure

```
bmad-ai-research/
├── agents/                 # 7 specialized research agents (NEW: Research Assistant)
├── agent-teams/           # Pre-configured research team
├── templates/             # 6 research document templates
├── workflows/             # 2 complete research workflows
├── tasks/                 # 3 research-specific tasks
├── checklists/            # Implementation & reproducibility checklists
├── data/                  # Research knowledge base
├── docs/                  # Setup and integration guides
│   ├── ARCHON-MCP-INTEGRATION.md
│   └── ITERATIVE-RESEARCH-WORKFLOW.md
└── config.yaml            # Pack configuration
```

### 🎯 Key Features

- **🆕 Automated Literature Search**: Research Assistant uses Archon MCP to search your knowledge base
- **🆕 Tag-Based Organization**: Filter papers by project tags for focused research
- **Iterative Brainstorming**: Proven 2-4 cycle loop between ideation and literature
- **Hypothesis-Focused**: Every experiment tests specific hypotheses
- **Reproducibility-First**: Comprehensive reproducibility infrastructure
- **Publication-Ready**: Templates match conference/journal requirements
- **Statistically Rigorous**: Built-in statistical testing guidance
- **Peer Review Aware**: Anticipates reviewer concerns

## Documentation

- **📚 Setup Guide**: [SETUP-CHECKLIST.md](SETUP-CHECKLIST.md) - Complete installation and setup
- **🔗 Archon MCP Integration**: [docs/ARCHON-MCP-INTEGRATION.md](docs/ARCHON-MCP-INTEGRATION.md) - Literature search setup
- **🔄 Iterative Workflow**: [docs/ITERATIVE-RESEARCH-WORKFLOW.md](docs/ITERATIVE-RESEARCH-WORKFLOW.md) - Brainstorm-literature loop
- **📖 Research Knowledge Base**: [data/research-kb.md](data/research-kb.md) - Best practices guide
- **⚙️ Full Workflow**: [workflows/research-paper-full.yaml](workflows/research-paper-full.yaml) - End-to-end process
- **🔬 Experiment Iteration**: [workflows/experiment-iteration.yaml](workflows/experiment-iteration.yaml) - Focused experiment cycle

## Differences from Core BMAD

| Core BMAD               | AI Research Pack                                |
| ----------------------- | ----------------------------------------------- |
| PRD                     | Research Proposal                               |
| Architecture            | Experimental Architecture                       |
| User Stories            | Experiment Specifications                       |
| Dev implements features | ML Engineer implements experiments              |
| QA checks functionality | Reproducibility Engineer checks reproducibility |
| Product release         | Paper publication + code release                |

## Common Research Pitfalls Avoided

✅ **Fair baseline comparisons** - Templates enforce equal tuning effort
✅ **Statistical significance** - Built-in significance testing
✅ **Reproducibility** - Comprehensive checklists from day one
✅ **Clear contributions** - Structured proposal and paper templates
✅ **Honest limitations** - Templates prompt for limitation discussion
✅ **Proper attribution** - Literature review integrated throughout

## Success Stories

Research conducted with structured workflows like this:

- Higher acceptance rates (fewer desk rejects)
- Faster iteration (clear experiment specifications)
- Better reproducibility (checklist-driven development)
- Easier collaboration (standardized documents)
- Reduced reviewer concerns (comprehensive methodology)

## Contributing

Found a bug? Have suggestions? Want to add features?

- Open an issue in the main BMAD repository
- Contribute research-specific improvements
- Share your published papers using this pack!

## License

MIT License - Same as core BMAD-METHOD

## Acknowledgments

Built on the BMAD-METHOD™ framework by BMad Code, LLC.

Designed for researchers who want to:

- Conduct rigorous, reproducible research
- Navigate the publication process systematically
- Collaborate effectively on research projects
- Advance their field with solid contributions

---

## Quick Links

- 📖 [Setup Checklist](SETUP-CHECKLIST.md) - Get started in minutes
- 🔗 [Archon MCP Setup](docs/ARCHON-MCP-INTEGRATION.md) - Enable automated literature search
- 🔄 [Iterative Workflow](docs/ITERATIVE-RESEARCH-WORKFLOW.md) - Master the brainstorm-literature loop
- ⚡ [Quick Reference](QUICK-FIX.md) - Common commands and patterns

---

**Ready to start your research journey?**

```bash
# Install the pack (local development)
cd /path/to/your-project
node /path/to/BMAD-METHOD/tools/installer/bin/bmad.js install
# Select: bmad-ai-research

# OR when published:
# npx bmad-method install
# Select: bmad-ai-research

# Start researching!
@research-lead
*brainstorm "your research topic"

@research-assistant  # If Archon MCP available
*search "relevant keywords"
```

**Questions?**

- 📚 Check the [research knowledge base](data/research-kb.md)
- 💬 Join the [BMAD Discord](https://discord.gg/gk8jAdXWmj)
- 🐛 Report issues on [GitHub](https://github.com/bmadcode/bmad-method/issues)

---

🔬 **Good luck with your research!** 📊📝

_Built with ❤️ for researchers who want rigorous, reproducible, and publishable AI research._
