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

**MCP Server Setup (Required for Full Features):**

This expansion pack integrates with two MCP servers for enhanced capabilities:

1. **Archon MCP** - Project management, knowledge base, task tracking (see [Archon integration docs](docs/ARCHON-MCP-INTEGRATION.md))
2. **wandb MCP** - Experiment tracking and results analysis

```bash
# Install wandb MCP server
npm install -g @wandb/mcp-server
# or
pip install wandb-mcp

# Configure in your Claude desktop config
# Add to claude_desktop_config.json:
{
  "mcpServers": {
    "wandb": {
      "command": "wandb-mcp",
      "env": {
        "WANDB_API_KEY": "your_api_key_from_wandb.ai/authorize"
      }
    }
  }
}
```

Then activate any research agent:

```bash
# RESEARCH TEAM (11 agents - all from bmad-ai-research, fully autonomous!)
@research-lead              # Prof. Dr. Kunz - Team coordination & strategy
@research-assistant-web     # D. Freuzer - Web/blog/docs research
@research-assistant-arxiv   # H. Zoppel - ArXiv papers (MCP-dependent)
@research-assistant-kb      # A. Pilz - Knowledge base curation (Archon MCP)
@research-scientist         # Dr. Alex Kumar - Experiment design
@experiment-pm              # Dr. Chen Wei - Experiment planning & tasks
@experiment-architect       # Dr. Sofia Martinez - Code architecture design
@ml-engineer                # Jordan Lee - Code implementation (codebase/)
@data-analyst               # Dr. Maya Patel - Analysis (results/)
@research-writer            # Dr. Gatsby Sarihuela - Paper writing (research-paper/)
@reproducibility-engineer   # Sam Rodriguez - Reproducibility validation
```

## Overview

The **AI Research Expansion Pack** adapts BMAD's proven agentic workflow to the unique demands of scientific research. While the core BMAD framework focuses on software product development, this pack specializes in the complete research lifecycle: from literature review through experiment execution to paper publication.

## 🔄 Key Innovation: Three-Specialist Literature System

**NEW: Research Assistants Split into Three Specialists!**

Instead of one generalist, you now have **three specialized research assistants** working in parallel:

```
┌─────────────────────────────────────────────────────────────────┐
│                    Prof. Dr. Kunz (Research Lead)               │
│                    Coordinates all literature searches          │
└────────────────┬────────────────┬──────────────────────────────┘
                 │                │
      ┌──────────┴────┐  ┌────────┴─────┐  ┌──────────────┐
      │ D. Freuzer    │  │ H. Zoppel    │  │ A. Pilz      │
      │ Web Research  │  │ ArXiv Papers │  │ Knowledge Base│
      │ 🌐            │  │ 📄           │  │ 📚           │
      └───────────────┘  └──────────────┘  └──────────────┘
           │                    │                   │
      Blogs, docs          Academic papers    Curated project
      Industry trends      Pre-prints         corpus with tags
      GitHub repos         Peer-reviewed      Organized papers
```

**The Iterative Brainstorm-Literature Loop (Enhanced):**

```
Research Lead (Prof. Dr. Kunz) → Initial Brainstorming (10-20 questions)
                  ↓
┌─────────────────┴──────────────────────────────────────────────┐
│  PARALLEL LITERATURE SEARCH (All 3 Assistants Work Together)   │
├─────────────────────────────────────────────────────────────────┤
│  • D. Freuzer  → Web content, blogs, recent industry posts     │
│  • H. Zoppel   → ArXiv papers (if MCP available)               │
│  • A. Pilz     → Knowledge base tagged papers                  │
└────────────────┬───────────────────────────────────────────────┘
                 ↓
Research Lead → Synthesize findings, refine questions
                 ↓
        DEEPER DIVE (Targeted searches)
                 ↓
Research Lead → Further refinement
                 ↓
        REPEAT 2-4 iterations until converged
                 ↓
   Well-Formed Research Questions + Identified Gaps
```

**Why Three Specialists?**

- ✅ **D. Freuzer (Web)**: Latest industry trends, practical implementations
- ✅ **H. Zoppel (ArXiv)**: Cutting-edge academic research, pre-prints
- ✅ **A. Pilz (KB, Archron)**: Your curated corpus, project-tagged papers
- ✅ **Parallel Search**: All three work simultaneously for comprehensive coverage
- ✅ **Prof. Dr. Kunz**: Synthesizes all findings, maintains objective focus

**Why This Matters:**

- ✅ Comprehensive coverage: Academic + Industry + Curated sources
- ✅ Ideas grounded in reality (not already fully solved)
- ✅ Questions become specific and testable
- ✅ Clear novelty and gaps identified upfront
- ✅ Saves months of pursuing dead ends
- ✅ Strong positioning for paper from day one

**📖 [See detailed iterative workflow guide](docs/ITERATIVE-RESEARCH-WORKFLOW.md)**

## Complete System Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                     PROF. DR. KUNZ (Research Lead)                     │
│                         Team Coordinator                               │
│  • Orchestrates all agents      • Maintains objective focus           │
│  • Synthesizes findings         • Makes final decisions               │
└──────────┬─────────────────┬─────────────────┬─────────────────────────┘
           │                 │                 │
           │                 │                 │
   ┌───────▼──────┐  ┌───────▼──────┐  ┌──────▼──────────┐
   │ LITERATURE   │  │ EXPERIMENT   │  │  PUBLICATION    │
   │ SPECIALISTS  │  │    TEAM      │  │     TEAM        │
   └──────┬───────┘  └───────┬──────┘  └──────┬──────────┘
          │                  │                 │
    ┌─────┴─────────┐        │         ┌──────┴──────────┐
    │ D. Freuzer    │        │         │ Research Writer │
    │ (Web) 🌐      │        │         │ Dr. Gatsby Sarihuela │
    │ WebSearch     │        │         │ research-paper/ │
    ├───────────────┤        │         │ LaTeX + git     │
    │ H. Zoppel     │        │         └─────────────────┘
    │ (ArXiv) 📄    │        │
    │ ArXiv MCP     │        │
    ├───────────────┤        │
    │ A. Pilz       │        │
    │ (KB) 📚       │        │
    │ Archon MCP    │        │
    └───────────────┘        │
                             │
                      ┌──────▼─────────────────┐
                      │ Research Scientist     │
                      │ Dr. Alex Kumar         │
                      │ Experiment Design      │
                      │ Creates specifications │
                      └──────┬─────────────────┘
                             │
                             │ experiment specs
                             ↓
                   ┌───────────────────────┐
                   │  EXPERIMENT PLANNING  │
                   │  (bmad-ai-research)   │
                   ├───────────────────────┤
                   │ 1. Experiment PM      │
                   │    Dr. Chen Wei       │
                   │    Creates dev plan   │
                   │         ↓             │
                   │ 2. Experiment Architect│
                   │    Dr. Sofia Martinez │
                   │    Designs code arch  │
                   └──────┬────────────────┘
                          │
                          │ implementation tasks
                          ↓
                 ┌────────────────────┐
                 │ ML Engineer        │
                 │ Jordan Lee         │
                 │ codebase/          │
                 │ Implementation     │
                 └────────┬───────────┘
                          │
                          │ outputs to
                          ↓
                 ┌────────────────────┐
                 │ Data Analyst       │
                 │ Dr. Maya Patel     │
                 │ results/           │
                 │ Analysis & Viz     │
                 └────────────────────┘

        ┌─────────────────────────────────────────┐
        │ Reproducibility Engineer (Sam Rodriguez)│
        │ Validates: codebase/ → results/ → paper/│
        └─────────────────────────────────────────┘
```

**Implementation Pipeline (BMAD Core Integration):**

```
Research Scientist
    ↓
    Creates experiment specifications
    ↓
PM (Project Manager - BMAD Core)
    ↓
    Creates development plan & tasks
    ↓
Architect (Solution Architect - BMAD Core)
    ↓
    Designs implementation architecture
    ↓
ML Engineer
    ↓
    Implements in codebase/
```

**Folder Flow:**

```
codebase/           results/              research-paper/
   ↓                   ↓                        ↓
ML Engineer    →   Data Analyst    →    Research Writer
implements         analyzes               writes paper
experiments        creates figs           incorporates

                Reproducibility Engineer validates all →
```

## What Makes Research Different

| Software Development     | AI Research                                                                      |
| ------------------------ | -------------------------------------------------------------------------------- |
| Build working product    | Advance scientific knowledge                                                     |
| PRD → Stories → Code     | Proposal → Experiments → Paper                                                   |
| PM/Architect → Developer | **Research Scientist → PM/Architect → ML Engineer** (Experiment Planning agents) |
| Features must work       | Experiments often fail (and that's okay)                                         |
| Deployed software        | Published paper + open code                                                      |
| QA checks functionality  | Peer review checks rigor                                                         |
| Single codebase          | **Three folders**: codebase/, results/, research-paper/                          |

## The Research Team

### 11 Specialized Research Agents (5 NEW!)

#### Literature Specialists (NEW: Split into 3!)

**🌐 Web Research Specialist (D. Freuzer)** - @research-assistant-web

- Live web content, blogs, documentation
- Industry perspectives and trends
- GitHub repositories and implementations
- Recent posts and tutorials
- **Tools:** WebSearch, WebFetch
- **Commands:** `*search`, `*fetch`, `*search-docs`, `*search-github`, `*track-trends`

**📄 ArXiv Specialist (H. Zoppel)** - @research-assistant-arxiv

- Academic pre-prints from arXiv
- Recent papers before peer review
- Author and category searches
- **MCP-Dependent:** Requires ArXiv MCP (gracefully fails if unavailable)
- **Tools:** ArXiv MCP (mcp**arxiv**search, mcp**arxiv**get_paper)
- **Commands:** `*search`, `*search-author`, `*search-category`, `*get-paper`

**📚 Knowledge Base Curator (A. Pilz)** - @research-assistant-kb

- Curated project knowledge base
- Tagged paper organization
- Full-text paper analysis
- Gap identification
- **Tools:** Archon MCP (rag_search_knowledge_base, rag_search_code_examples)
- **Commands:** `*set-tag`, `*sources`, `*search`, `*search-codes`, `*catalogue-paper`

#### Team Coordination

**🔬 Research Lead (Prof. Dr. Kunz)** - @research-lead

- Team orchestration and coordination
- Literature search routing (directs D. Freuzer, H. Zoppel, A. Pilz)
- Research strategy and objectives
- Proposal development and validation
- Cross-agent synthesis
- Full project visibility (codebase/, results/, research-paper/)
- **Commands:** `*brainstorm`, `*create-proposal`, `*literature-review`, `*formulate-questions`

#### Experiment Team

**🧪 Research Scientist (Dr. Alex Kumar)** - @research-scientist

- Experimental design and methodology
- Works with Research Lead to construct experiments
- Creates specifications for PM/Architect → ML Engineer pipeline
- Interprets results and refines experiments
- **Reads:** codebase/, results/
- **Commands:** `*create-architecture`, `*design-experiment`, `*interpret-results`

**⚙️ ML Engineer (Jordan Lee)** - @ml-engineer

- Code implementation in **codebase/** folder
- Receives tasks from PM/Architect (BMAD core workflows)
- Implements experiments, baselines, novel methods
- **Weights & Biases (wandb) integration:** Tracks all experiments, logs metrics, saves artifacts
- Runs experiments, outputs to results/
- **Primary workspace:** codebase/
- **Commands:** `*implement-experiment`, `*implement-baseline`, `*setup-wandb`, `*track-experiment`, `*export-wandb-results`

**📊 Data Analyst (Dr. Maya Patel)** - @data-analyst

- Dataset preparation in **codebase/data/**
- **wandb MCP integration:** Fetches experiment data directly from wandb for analysis
- Statistical analysis and visualization
- Creates publication-quality figures in **results/**
- Significance testing and error analysis
- **Workspaces:** codebase/data/, results/
- **MCP Tools:** mcp**wandb**query_wandb_tool, mcp**wandb**create_wandb_report_tool
- **Commands:** `*prepare-dataset`, `*analyze-results`, `*fetch-wandb-data`, `*compare-wandb-runs`, `*create-wandb-figures`

#### Publication Team

**✍️ Research Writer (Dr. Gatsby Sarihuela)** - @research-writer

- Paper writing in **research-paper/** folder
- LaTeX editing and formatting
- Git/Overleaf synchronization
- Incorporates results/ into paper
- **Venue-specific reformatting:** NeurIPS, ICML, IEEE, ACM, JMLR templates
- **Submission preparation:** Anonymization, supplementary materials, packaging
- **Primary workspace:** research-paper/
- **Tools:** LaTeX, git
- **Commands:** `*create-paper`, `*draft-abstract`, `*prepare-submission`, `*reformat-template`, `*anonymize`, `*package-submission`

**🔁 Reproducibility Engineer (Sam Rodriguez)** - @reproducibility-engineer

- Cross-folder validation (codebase/ → results/ → research-paper/)
- Ensures experiments are reproducible
- Code release preparation
- Documentation and containerization
- **Validates:** All folders
- **Commands:** `*verify-reproducibility`, `*prepare-release`, `*create-dockerfile`

## Complete Research Workflow - ITERATIVE & MANUAL

**CRITICAL: All phases can be invoked manually and repeated as needed!**

Research is inherently iterative. You may:

- Run Phase 1 multiple times as questions evolve
- Run Phase 2 many times with different experiments
- Return to Phase 1 after Phase 2 results suggest new directions
- Update the paper (Phase 3) continuously throughout the process
- Iterate between phases in any order based on findings

**The workflow below shows the typical flow, but YOU control when to invoke each phase.**

### 🔄 Iterative Research Cycle

```
┌─────────────────────────────────────────────────────────────┐
│                  ITERATIVE RESEARCH LOOP                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Phase 1: Planning ────┐                                    │
│  (Literature + Brainstorming)                                │
│           │            │                                     │
│           ↓            │                                     │
│  Phase 2: Experiments ─┤ ← Results may trigger              │
│  (Implementation + Analysis) new questions                   │
│           │            │                                     │
│           ↓            │                                     │
│  Phase 3: Paper Update ┘ ← Update paper after each cycle    │
│  (Continuous writing)                                        │
│           │                                                  │
│           ↓                                                  │
│  REPEAT until ready for Phase 4                             │
│                                                              │
└─────────────────────────────────────────────────────────────┘

Phase 4: Publication (Run once at the end)
```

**Key Insight:** The paper (Phase 3) should be updated after EVERY experiment iteration, not just at the end!

### 📁 Folder Structure

All research artifacts are organized into three main folders:

```
your-research-project/
├── codebase/              # ML Engineer's primary workspace
│   ├── data/              # Datasets (Data Analyst + ML Engineer)
│   ├── src/               # Experiment code
│   ├── configs/           # Hyperparameters
│   ├── tests/             # Unit tests
│   └── README.md          # Setup & reproduction guide
│
├── results/               # Data Analyst's primary output
│   ├── figures/           # Publication-quality visualizations
│   ├── tables/            # LaTeX-formatted tables
│   ├── analysis/          # Statistical test results
│   └── metrics/           # Experimental metrics
│
└── research-paper/        # Research Writer's workspace (LaTeX + git)
    ├── main.tex           # Main paper file
    ├── sections/          # Paper sections
    ├── figures/           # Figures copied from results/
    ├── references.bib     # Bibliography
    └── .git/              # Git repository (syncs with Overleaf)
```

### Phase 1: Planning - THREE-SPECIALIST LITERATURE SYSTEM

**🔁 REPEATABLE:** Run this phase multiple times as your research questions evolve!

**🤖 Automated Execution:** Let Prof. Dr. Kunz (Research Lead) orchestrate the entire workflow!

```bash
@research-lead
*run-phase-1 "your research topic"
# Prof. Dr. Kunz will:
# 1. Read workflows/phase-1-planning.yaml
# 2. Execute all steps in sequence
# 3. Coordinate three specialists automatically
# 4. Handle iterations (2-4 cycles)
# 5. Create all output documents
```

**📋 Or use the workflow as a guide:** [phase-1-planning.yaml](workflows/phase-1-planning.yaml)

**Manual Invocation (if you prefer step-by-step control):**

```bash
# The Research Lead orchestrates this entire phase:
@research-lead
*brainstorm "your evolving topic"      # Step 1: Generate research questions
*formulate-questions                   # Step 2: Extract search keywords from brainstorming

# Research Lead then coordinates three specialists in parallel:
# (Search keywords constructed from brainstorming results)

@research-assistant-web
*search "{keywords from Research Lead}"  # Web + GitHub + Industry trends

@research-assistant-arxiv
*search "{keywords from Research Lead}"  # Academic papers (if MCP available)

@research-assistant-kb
*search "{keywords from Research Lead}"  # Curated knowledge base

# Research Lead synthesizes findings:
@research-lead
*literature-review                     # Synthesize all three sources
*formulate-questions                   # Refine questions based on gaps found

# ITERATE 2-4 times until questions converge
# Then create formal documents:
@research-lead
*create-proposal

@research-scientist
*create-architecture
```

**Workflow:**

```
Prof. Dr. Kunz (Research Lead)
   │
   ├─→ Initial Brainstorming (10-20 questions)
   │
   ├─→ PARALLEL LITERATURE SEARCH ←────────────────────┐
   │   ├─→ D. Freuzer (Web):    Blogs, docs, GitHub   │
   │   ├─→ H. Zoppel (ArXiv):   Academic pre-prints   │  Iteration 1
   │   └─→ A. Pilz (KB):        Tagged knowledge base │
   │                                                    │
   ├─→ Synthesize all findings                         │
   │                                                    │
   ├─→ Refine research questions                       │
   │                                                    │
   └─→ DEEPER DIVE (targeted searches) ────────────────┘
       │
       ├─→ REPEAT 2-4 iterations until converged
       │
       ├─→ Identify Gaps & Novel Contributions
       │
       ├─→ Create Research Proposal
       │
       └─→ Research Scientist: Experimental Architecture
           │
           └─→ Prof. Dr. Kunz: Validation
```

**Outputs:**

- `research-brainstorming-session-results.md` (Research Lead)
- `literature-review.md` (All 3 assistants' findings synthesized)
- `research-proposal.md` (Research Lead)
- `experimental-architecture.md` (Research Scientist)

**Key Innovation:** Three specialists cover all sources (web + academic + curated) in parallel!

**When to Re-run Phase 1:**

- After Phase 2 experiments reveal unexpected results
- When you discover new related work during writing
- If reviewer feedback suggests missing literature
- When pivoting research direction

### Phase 2: Experimentation - EXPERIMENT PLANNING & ITERATION

**🔁 HIGHLY ITERATIVE:** This phase will be run MANY times! Each experiment may suggest new experiments.

**🤖 Automated Execution:** Let Prof. Dr. Kunz orchestrate the experiment iteration!

```bash
@research-lead
*run-phase-2 "test hypothesis X"
# Prof. Dr. Kunz will:
# 1. Coordinate Research Scientist to design experiment
# 2. Coordinate Experiment PM to plan development
# 3. Coordinate Experiment Architect to design code structure
# 4. Coordinate ML Engineer to implement and run experiments
# 5. Coordinate Data Analyst to analyze results
# 6. Present decision point: What next?
```

**📋 Or use the workflow as a guide:** [phase-2-single-experiment.yaml](workflows/phase-2-single-experiment.yaml)

**Manual Invocation (if you prefer step-by-step control):**

```bash
# Design a new experiment
@research-scientist
*design-experiment "test hypothesis X"

# Plan development
@experiment-pm
*plan-experiment

# Design architecture
@experiment-architect
*design-experiment-architecture

# Implement
@ml-engineer
*implement-experiment
*run-ablation

# Analyze results
@data-analyst
*analyze-results
*create-figures

# Interpret and decide next steps
@research-scientist
*interpret-results
# → May trigger: new Phase 2 iteration OR back to Phase 1 OR update Phase 3
```

**Workflow:**

```
Research Scientist (Dr. Alex Kumar)
   │
   ├─→ Design Experiment Specifications
   │   • Methodology details
   │   • Baselines to implement
   │   • Evaluation metrics
   │   • Success criteria
   │
   └─→ EXPERIMENT PLANNING WORKFLOW
       │
       ├─→ Project Manager (@experiment-pm from bmad-ai-research)
       │   │
       │   ├─→ Creates development plan
       │   ├─→ Breaks down experiment into tasks
       │   ├─→ Defines implementation milestones
       │   │
       │   └─→ Solution Architect (@experiment-architect from bmad-ai-research)
       │       │
       │       ├─→ Designs code architecture
       │       ├─→ Plans module structure (codebase/src/)
       │       ├─→ Defines interfaces and APIs
       │       │
       │       └─→ ML Engineer (Jordan Lee - codebase/)
       │           │
       │           ├─→ Implement experiment code
       │           ├─→ Implement baselines
       │           ├─→ Setup experiment tracking
       │           │
       │           └─→ Run experiments → outputs to results/
       │               │
       │               └─→ Data Analyst (Dr. Maya Patel - results/)
       │                   │
       │                   ├─→ Prepare datasets (codebase/data/)
       │                   ├─→ Statistical analysis
       │                   ├─→ Create figures (results/figures/)
       │                   ├─→ Format tables (results/tables/)
       │                   │
       │                   └─→ Research Scientist: Interpret Results
       │                       │
       │                       └─→ If needed: Refine & iterate
```

**Experiment Planning Integration:**

- **Research Scientist** creates high-level experiment specs
- **PM** (from bmad-ai-research) plans development workflow
- **Architect** (from bmad-ai-research) designs implementation structure
- **ML Engineer** executes implementation

**Folder Flow:**

- Code lives in: `codebase/`
- Data lives in: `codebase/data/`
- Results output to: `results/`

**Outputs:**

- Development plan (PM)
- Architecture design (Architect)
- Experiment code (`codebase/`)
- Trained models (not version controlled)
- Analysis artifacts (`results/`)

**After Phase 2 Iteration:**

1. **ALWAYS update the paper** (go to Phase 3)
2. **Decide next step:**
   - Run another Phase 2 iteration (new experiment)
   - Return to Phase 1 (if results suggest new research direction)
   - Move toward Phase 4 (if results are sufficient)

### Phase 3: Writing - CONTINUOUS PAPER UPDATES

**🔁 CONTINUOUS:** Update paper after EVERY Phase 2 iteration, not just at the end!

**🤖 Automated Execution:** Let Prof. Dr. Kunz orchestrate paper updates!

```bash
# First time (create paper structure)
@research-lead
*run-phase-3 initial_setup

# After each experiment (most common)
@research-lead
*run-phase-3 incremental_update

# Every 4-6 weeks (major revision)
@research-lead
*run-phase-3 full_revision

# Before submission (final polish)
@research-lead
*run-phase-3 pre_submission_polish
```

**📋 Or use the workflow as a guide:** [phase-3-paper-update.yaml](workflows/phase-3-paper-update.yaml)

**Workflow Variants:**

- **initial_setup**: Run once to create paper structure
- **incremental_update**: Run after EVERY experiment (30 min - 2 hours)
- **full_revision**: Run every 4-6 weeks for major revision (1-2 days)
- **pre_submission_polish**: Run once before submission (2-5 days)

**Why Update Continuously:**

- Keeps paper aligned with latest results
- Prevents massive rewrites at submission time
- Helps you see gaps in experiments early
- Makes story clearer as research progresses

**Manual Invocation (or follow workflow):**

```bash
# Initial paper setup (run once)
@research-writer
*create-paper

# After EACH Phase 2 iteration, update relevant sections:
@research-writer
*draft-experiments    # Add new results
*draft-methodology    # Refine based on what you actually did
*draft-related-work   # Add newly discovered papers

# Sync with git/Overleaf
# git pull → edit → git commit → git push

# Periodic full reviews
@research-lead
# Review entire paper, suggest improvements

@research-writer
*revise-paper
*prepare-submission  # When ready for submission
```

**Workflow:**

```
Research Writer (research-paper/)
   │
   ├─→ git pull (sync from Overleaf)
   │
   ├─→ Create Paper Outline (main.tex, sections/)
   │
   ├─→ Copy figures from results/ → research-paper/figures/
   │
   ├─→ Draft All Sections
   │   ├─→ Abstract
   │   ├─→ Introduction
   │   ├─→ Related Work (coordinate with A. Pilz for citations)
   │   ├─→ Methodology (coordinate with Research Scientist)
   │   ├─→ Experiments (incorporate from results/)
   │   └─→ Conclusion
   │
   ├─→ git commit -m "Draft complete"
   ├─→ git push (sync to Overleaf)
   │
   ├─→ Prof. Dr. Kunz: Review Draft
   │
   ├─→ Research Writer: Revise & Polish
   │
   ├─→ Format for Target Venue (NeurIPS/ICML/ICLR/etc.)
   │
   └─→ git push (final version synced)
```

**Folder Flow:**

- Paper lives in: `research-paper/`
- Reads figures from: `results/`
- Git syncs with: Overleaf

### Phase 4: Publication & Submission

**🔁 REPEATABLE:** Run for each venue you submit to (NeurIPS, ICML, IEEE, etc.)

**🤖 Automated Execution:** Let Research Writer handle venue-specific reformatting!

```bash
@research-writer
*prepare-submission "NeurIPS 2025"
# Research Writer will:
# 1. Read workflows/paper-submission-prep.yaml
# 2. Analyze venue requirements
# 3. Reformat LaTeX template
# 4. Adjust content for page limits
# 5. Prepare supplementary materials
# 6. Create submission package
```

**📋 Or use the workflow as a guide:** [paper-submission-prep.yaml](workflows/paper-submission-prep.yaml)

**What This Phase Handles:**

- **Venue-specific formatting:** Switch LaTeX templates (NeurIPS, ICML, IEEE, ACM, JMLR)
- **Page limit adjustment:** Move content to appendix, condense sections
- **Citation style conversion:** natbib, IEEE numeric, ACM format
- **Anonymization:** Remove author info for double-blind review
- **Supplementary materials:** Package code, data, extra results
- **Submission packaging:** Create final PDFs, source files, supplementary ZIP
- **Verification:** Compilation checks, submission checklists

**Manual Invocation:**

```bash
# Step 1: Analyze target venue
@research-writer
*analyze-venue "NeurIPS 2025"
# Creates: docs/submission/venue-requirements.md

# Step 2: Create submission branch
git checkout -b submission/neurips-2025

# Step 3: Reformat for venue
@research-writer
*reformat-template "neurips_2025"
*trim-to-limit "8 pages"
*convert-citations "natbib"
*anonymize  # If required

# Step 4: Prepare supplementary materials
@reproducibility-engineer
*prepare-release  # Clean and package code

@research-writer
*prepare-supplementary

# Step 5: Final compilation and packaging
@research-writer
*compile-submission
*create-checklist "NeurIPS 2025"
*package-submission
```

**Workflow:**

```
Research Writer
   │
   ├─→ Analyze Venue Requirements
   │   └─→ Create docs/submission/venue-requirements.md
   │
   ├─→ Create Submission Branch (git)
   │
   ├─→ Switch LaTeX Template
   │   ├─→ NeurIPS: neurips_2025.sty
   │   ├─→ ICML: icml2025.sty
   │   ├─→ IEEE: IEEEtran.cls
   │   └─→ ACM: acmart.cls
   │
   ├─→ Adjust Content for Page Limit
   │   ├─→ Move methods to appendix
   │   ├─→ Move extra results to appendix
   │   └─→ Condense verbose sections
   │
   ├─→ Reformat Figures & Tables
   │   └─→ Data Analyst: Adjust sizes for venue
   │
   ├─→ Convert Citation Style
   │
   ├─→ Anonymize (if required)
   │   ├─→ Remove author names
   │   ├─→ Remove affiliations
   │   └─→ Anonymize self-citations
   │
   ├─→ Prepare Supplementary Materials
   │   ├─→ Code package (Reproducibility Engineer)
   │   ├─→ Appendix PDF
   │   ├─→ Extra results
   │   └─→ Dataset information
   │
   ├─→ Final Compilation & Verification
   │   ├─→ Clean LaTeX build
   │   ├─→ Check page count
   │   ├─→ Verify all figures
   │   └─→ Check PDF metadata
   │
   ├─→ Generate Submission Checklist
   │   └─→ docs/submission/neurips-2025-checklist.md
   │
   └─→ Create Submission Package
       ├─→ Paper1234.pdf (main paper)
       ├─→ Paper1234-source.zip (LaTeX source)
       └─→ Paper1234-supp.zip (supplementary)
```

**Supported Venues:**

- **ML Conferences:** NeurIPS, ICML, ICLR, AAAI, CVPR
- **Journals:** JMLR, TMLR, IEEE TPAMI
- **IEEE Conferences:** Template-based formatting
- **ACM Conferences:** sigconf template

**Outputs:**

- `submissions/{venue}-{date}/` - Complete submission package
- `docs/submission/venue-requirements.md` - Venue analysis
- `docs/submission/{venue}-checklist.md` - Pre-submission verification

**Revision & Rebuttal Workflow** (after reviews):

```bash
@research-writer
*process-reviews  # Parse reviewer comments
*apply-revisions  # Update paper based on feedback
*write-rebuttal   # Draft response to reviewers
```

**Outputs:**

- Complete LaTeX paper (`research-paper/`)
- Continuously updated sections
- Submission-ready PDF (when ready)

**Paper Evolution:**

- **Early:** Draft outline, intro, related work
- **Mid-research:** Growing experiments section, refined methodology
- **Late-research:** Complete draft with all results
- **Pre-submission:** Polished, formatted for venue

### Phase 4: Publication - FINAL VALIDATION & SUBMISSION

**🎯 RUN ONCE:** Only when paper is complete and ready to submit!

**Manual Invocation:**

```bash
# Validate everything works
@reproducibility-engineer
*verify-reproducibility  # Can codebase/ reproduce results/?
*prepare-release        # Clean code for public release
*create-dockerfile      # Containerization

# Final checks
@research-lead
# Review entire pipeline: codebase/ → results/ → research-paper/
# Ensure story is coherent and claims are supported

@data-analyst
*test-significance  # Final statistical checks

@research-writer
*prepare-submission  # Format for target venue
*draft-abstract     # Final abstract polish

# Submit!
# → Upload paper to conference/journal
# → Release code on GitHub
```

**Workflow:**

```
Reproducibility Engineer
   │
   ├─→ Validate codebase/
   │   ├─→ Check seeds, dependencies, README
   │   └─→ Verify experiments can be re-run
   │
   ├─→ Validate results/
   │   └─→ Confirm figures/metrics match paper claims
   │
   ├─→ Validate research-paper/
   │   └─→ Ensure all claims backed by results/
   │
   ├─→ Create Documentation
   │   ├─→ codebase/README.md
   │   ├─→ codebase/REPRODUCE.md
   │   └─→ Dockerfile/environment.yml
   │
   ├─→ Prepare Code Release
   │   ├─→ Clean codebase/ for public
   │   ├─→ Add LICENSE
   │   └─→ Remove sensitive data
   │
   └─→ Prof. Dr. Kunz: Final Validation
       │
       └─→ SUBMIT to Conference/Journal
```

**Cross-Folder Validation:**

- `codebase/` → Can reproduce → `results/`
- `results/` → Matches claims in → `research-paper/`

**Outputs:**

- Submitted paper
- Public code repository (GitHub)
- Reproducibility artifacts

---

## 📊 Summary: Manual Phase Control

**The key insight of this workflow: YOU control the iteration!**

| Phase                        | Frequency          | When to Invoke                                                                                   |
| ---------------------------- | ------------------ | ------------------------------------------------------------------------------------------------ |
| **Phase 1: Planning**        | Multiple times     | Initial setup, after surprising results, when pivoting direction, during writing when gaps found |
| **Phase 2: Experimentation** | Many times (5-20+) | For each hypothesis, baseline, ablation, analysis. Most time spent here!                         |
| **Phase 3: Writing**         | Continuously       | After EVERY Phase 2 iteration. Keep paper in sync with research!                                 |
| **Phase 4: Publication**     | Once               | When paper is complete, experiments done, story clear, ready to submit                           |

**Typical Research Timeline:**

```
Week 1-2:   Phase 1 (initial)
Week 3-4:   Phase 2 iteration 1 → Phase 3 update
Week 5:     Phase 2 iteration 2 → Phase 3 update
Week 6:     Phase 1 (refine) + Phase 2 iteration 3 → Phase 3 update
Week 7-10:  Phase 2 iterations 4-8 → Phase 3 updates
Week 11:    Phase 1 (final literature check)
Week 12-14: Phase 2 final experiments → Phase 3 major revision
Week 15:    Phase 4 (validation + submission)
```

**Remember:** The phases are guidelines, not prison! Jump between them as your research demands.

---

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

### Starting a New Research Project (Three-Specialist System)

```bash
# Step 1: Brainstorm initial questions
@research-lead
*brainstorm "efficient attention mechanisms for transformers"
# → Prof. Dr. Kunz generates 10-20 research questions

# Step 2: Parallel literature search (all three specialists)
# The Research Lead coordinates this, but you can also invoke directly:

@research-assistant-web      # D. Freuzer
*search "efficient attention mechanisms 2024"
# → Searches blogs, documentation, GitHub
# → Finds: HuggingFace blog posts, PyTorch tutorials, recent implementations

@research-assistant-arxiv    # H. Zoppel (if MCP available)
*search "efficient attention transformers"
# → Searches arXiv pre-prints
# → Finds: FlashAttention-3, recent academic papers

@research-assistant-kb       # A. Pilz
*set-tag "transformer-research"
*search "attention mechanisms"
# → Searches your curated knowledge base
# → Finds: Tagged papers in your project corpus

# Step 3: Prof. Dr. Kunz synthesizes all findings
@research-lead
*formulate-questions
# → Refines questions based on gaps from ALL THREE sources

# Step 4: Deeper targeted dive (iteration 2)
@research-assistant-web
*search-github "flash attention implementation"

@research-assistant-arxiv
*search-author "Dao"  # FlashAttention author

@research-assistant-kb
*identify-gaps
# → What's missing from KB that should be added?

# Repeat iterations 2-4 times until converged

# Step 5: Create formal proposal
@research-lead
*create-proposal
# → Creates research-proposal.yaml

# Step 6: Design experiments
@research-scientist
*create-architecture
*design-experiment
# → Creates detailed experiment specifications
```

### Running Experiments (with BMAD Core PM/Architect)

```bash
# Step 1: Prepare data
@data-analyst
*prepare-dataset
# → Processes data in codebase/data/
# → Validates and documents datasets

# Step 2: Development Planning (BMAD Core Workflow)
@experiment-pm  # From bmad-core package
# Takes Research Scientist's experiment specs
# → Creates development plan
# → Breaks down into implementation tasks
# → Defines milestones

@experiment-architect  # From bmad-core package
# Takes PM's development plan
# → Designs code architecture
# → Plans codebase/src/ module structure
# → Defines interfaces and data flow

# Step 3: Implementation (codebase/)
@ml-engineer
*implement-experiment
# → Follows Architect's design
# → Writes code in codebase/src/
# → Implements experiment logic

*implement-baseline
# → Codes baseline methods

*setup-tracking
# → wandb/tensorboard integration

# Step 4: Execute experiments
@ml-engineer
*run-ablation
# → Runs experiments with proper seeds
# → Outputs metrics/logs to results/

# Step 4: Analyze results (results/)
@data-analyst
*analyze-results
# → Reads from results/, performs statistical tests
# → Creates figures in results/figures/
# → Formats tables in results/tables/

*create-figures
# → Publication-quality plots (300 DPI, LaTeX fonts)

# Step 5: Interpret findings
@research-scientist
*interpret-results
# → Analyzes results/ against hypotheses
# → Suggests refinements if needed
```

### Writing Paper (research-paper/ with LaTeX + git)

```bash
# Step 1: Setup paper folder
@research-writer
# → git pull (sync from Overleaf if already exists)
*create-paper
# → Creates main.tex, sections/, references.bib in research-paper/

# Step 2: Copy figures from results/
# → Manually or via Research Writer:
# cp results/figures/* research-paper/figures/

# Step 3: Draft sections (all in research-paper/)
@research-writer
*draft-abstract
# → Writes abstract in sections/abstract.tex

*draft-introduction
# → Includes motivation, contributions

*draft-related-work
# → Coordinates with @research-assistant-kb (A. Pilz) for citations

*draft-methodology
# → Coordinates with @research-scientist for technical details

*draft-experiments
# → Incorporates results/ (figures, tables, metrics)

*draft-conclusion
# → Summary, impact, future work

# Step 4: Git sync
# → Research Writer commits and pushes
# git add . && git commit -m "Complete draft" && git push
# → Syncs to Overleaf automatically

# Step 5: Review
@research-lead
# → Prof. Dr. Kunz reviews on Overleaf
# → Provides feedback

# Step 6: Revise and submit
@research-writer
# → git pull (get latest from Overleaf)
*revise-paper
*prepare-submission
# → Formats for NeurIPS/ICML/ICLR/etc.
# git push (final version)
```

### Preparing Code Release (Cross-folder validation)

```bash
@reproducibility-engineer

# Step 1: Validate codebase/
*verify-reproducibility
# → Check seeds set correctly
# → Verify requirements.txt/environment.yml complete
# → Test that codebase/ experiments can be re-run
# → Ensure codebase/README.md is comprehensive

# Step 2: Validate results/
# → Confirm figures match paper claims
# → Check metrics in results/ match research-paper/
# → Verify all paper figures came from results/

# Step 3: Validate research-paper/
# → Ensure all claims backed by results/
# → Check figure numbers match
# → Verify no orphaned claims

# Step 4: Create documentation
*create-readme
# → Generates codebase/README.md
# → Creates codebase/REPRODUCE.md (step-by-step guide)

*create-dockerfile
# → Docker/Singularity for reproducibility

# Step 5: Prepare for public release
*prepare-release
# → Clean codebase/ (remove secrets, internal paths)
# → Add LICENSE file
# → Prepare GitHub repository
# → Final validation: can a stranger reproduce results/?

# Step 6: Final sign-off
# → Prof. Dr. Kunz reviews all three folders
# → Submits paper + code
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
├── agents/                 # 9 specialized research agents (3 NEW!)
│   ├── research-lead.md                    # Prof. Dr. Kunz (team coordinator)
│   ├── research-assistant-web.md           # NEW! D. Freuzer (web research)
│   ├── research-assistant-arxiv.md         # NEW! H. Zoppel (arXiv papers)
│   ├── research-assistant-kb.md            # NEW! A. Pilz (knowledge base)
│   ├── research-scientist.md               # Dr. Alex Kumar (experiment design)
│   ├── ml-engineer.md                      # Jordan Lee (codebase/ implementation)
│   ├── data-analyst.md                     # Dr. Maya Patel (results/ analysis)
│   ├── research-writer.md                  # Dr. Gatsby Sarihuela (research-paper/ writing)
│   └── reproducibility-engineer.md         # Sam Rodriguez (validation)
├── agent-teams/           # Pre-configured research team
│   └── research-team.yaml                  # UPDATED: 3 literature specialists
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

**🆕 NEW IN THIS VERSION:**

- **Three-Specialist Literature System**: Web (D. Freuzer) + ArXiv (H. Zoppel) + KB (A. Pilz) working in parallel
- **Comprehensive Source Coverage**: Industry trends + Academic papers + Curated corpus
- **Folder-Based Workflow**: Organized structure (codebase/, results/, research-paper/)
- **BMAD Core Integration**: Full workflow with Project Manager + Solution Architect
  - Research Scientist designs experiments
  - PM (bmad-core) plans development
  - Architect (bmad-core) designs implementation
  - ML Engineer executes in codebase/
- **LaTeX + Git + Overleaf**: Professional paper writing with version control
- **Cross-Folder Validation**: Reproducibility Engineer ensures pipeline integrity

**CORE FEATURES:**

- **Iterative Brainstorming**: Proven 2-4 cycle loop between ideation and literature
- **Hypothesis-Focused**: Every experiment tests specific hypotheses
- **Reproducibility-First**: Comprehensive reproducibility infrastructure
- **Publication-Ready**: Templates match conference/journal requirements
- **Statistically Rigorous**: Built-in statistical testing guidance
- **Peer Review Aware**: Anticipates reviewer concerns
- **Team Coordination**: Prof. Dr. Kunz orchestrates entire research team

## Documentation

- **📚 Setup Guide**: [SETUP-CHECKLIST.md](SETUP-CHECKLIST.md) - Complete installation and setup
- **🔗 Archon MCP Integration**: [docs/ARCHON-MCP-INTEGRATION.md](docs/ARCHON-MCP-INTEGRATION.md) - Literature search setup
- **🔄 Iterative Workflow**: [docs/ITERATIVE-RESEARCH-WORKFLOW.md](docs/ITERATIVE-RESEARCH-WORKFLOW.md) - Brainstorm-literature loop
- **📖 Research Knowledge Base**: [data/research-kb.md](data/research-kb.md) - Best practices guide
- **⚙️ Full Workflow**: [workflows/research-paper-full.yaml](workflows/research-paper-full.yaml) - End-to-end process
- **🔬 Experiment Iteration**: [workflows/experiment-iteration.yaml](workflows/experiment-iteration.yaml) - Focused experiment cycle

## Differences from Core BMAD

| Core BMAD                       | AI Research Pack                                                        |
| ------------------------------- | ----------------------------------------------------------------------- |
| PRD                             | Research Proposal                                                       |
| Architecture                    | Experimental Architecture                                               |
| User Stories                    | Experiment Specifications                                               |
| **PM/Architect plan features**  | **Research Scientist → PM/Architect → ML Engineer** (fully autonomous!) |
| Dev implements features         | ML Engineer implements experiments                                      |
| QA checks functionality         | Reproducibility Engineer checks reproducibility                         |
| Product release                 | Paper publication + code release                                        |
| Single codebase                 | Three folders: codebase/, results/, research-paper/                     |
| 1 generalist research assistant | 3 specialist research assistants (Web, ArXiv, KB)                       |

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

# Parallel literature search (three specialists)
@research-assistant-web      # D. Freuzer: Web/blogs
*search "your topic 2024"

@research-assistant-arxiv    # H. Zoppel: ArXiv (if MCP available)
*search "your topic"

@research-assistant-kb       # A. Pilz: Knowledge base
*set-tag "your-project"
*search "your topic"
```

**Questions?**

- 📚 Check the [research knowledge base](data/research-kb.md)
- 💬 Join the [BMAD Discord](https://discord.gg/gk8jAdXWmj)
- 🐛 Report issues on [GitHub](https://github.com/bmadcode/bmad-method/issues)

---

🔬 **Good luck with your research!** 📊📝

_Built with ❤️ for researchers who want rigorous, reproducible, and publishable AI research._
