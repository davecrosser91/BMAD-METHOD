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

1. **Archon MCP** - **[NEW!]** Complete research project management, document storage, task tracking, knowledge base
   - 📖 **[See comprehensive Archon Research Integration Guide](docs/ARCHON-RESEARCH-INTEGRATION.md)**
   - 📋 Manages all research documents (proposals, specs, results)
   - 🗂️ Tracks experiments as tasks with full workflow
   - 🧠 Searchable knowledge base for papers and methods
   - 🔗 Links research questions → experiments → results → paper

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

## 🗂️ Archon MCP Integration - Research Project Management

**NEW: Complete Archon integration for research workflows!**

The AI Research pack now uses **Archon MCP** for comprehensive research project management, enabling true collaborative research with full traceability from research question to published paper.

**What Archon Provides:**

- 📋 **17 Critical Research Documents** - All planning, specs, results stored in Archon
- 🗂️ **Task & Experiment Tracking** - Each experiment is a tracked task with full workflow
- 🧠 **Knowledge Base Integration** - Searchable corpus of papers, methods, patterns
- 🔗 **Complete Traceability** - Research questions → Experiments → Results → Paper
- 👥 **Multi-Agent Collaboration** - All agents read/write to shared Archon project

**The 17 Research Documents in Archon:**

1. **Project Understanding** (Phase 1):
   - Research Project Brief
   - Literature Review
   - Research Proposal

2. **Research Questions** (Phase 1):
   - Research Questions Document
   - Gap Analysis

3. **Experimental Design** (Phase 2):
   - Experimental Architecture
   - Experiment Specifications (multiple)
   - Ablation Study Plan

4. **Model Architecture** (Phase 2):
   - Model Architecture Document
   - Baseline Specifications

5. **Technical Setup** (Phase 3):
   - Technical Stack Document
   - Data Pipeline Design
   - Experiment Tracking Setup

6. **State of the Art** (Phase 2):
   - Benchmark Specifications
   - Baseline Comparison Matrix

7. **Novelties** (Continuous):
   - Novel Contributions
   - Innovation Log

**Research Workflow with Archon:**

```
Phase 1: Planning
@research-lead → *init-research-project → Creates Archon project
              → *brainstorm → Updates Research Questions
              → *create-research-proposal → Creates Research Proposal (type=spec)

Phase 2: Experimental Design
@research-scientist → *design-experiment → Creates Experimental Architecture (type=design)
                                         → Creates Experiment Specs (type=spec)
                                         → Creates experiment tasks in Archon

Phase 3: Implementation
@ml-engineer → *implement-experiment → Reads specs from Archon
                                     → Implements in codebase/
                                     → Logs results to Archon task

Phase 4: Analysis
@data-analyst → *analyze-results → Reads from Archon + wandb
                                  → Creates Statistical Analysis (type=note)
                                  → Creates figures in results/
                                  → Updates Baseline Comparison Matrix

Phase 5: Writing
@research-writer → Reads ALL documents from Archon
                 → Writes paper referencing Archon docs
                 → Updates continuously
```

**📖 [Complete Archon Research Integration Guide](docs/ARCHON-RESEARCH-INTEGRATION.md)**

**Key Benefits:**

- ✅ All team members see the same source of truth
- ✅ Research questions → Experiments → Results flow is tracked
- ✅ Knowledge accumulates across projects
- ✅ Nothing gets lost or forgotten
- ✅ Full traceability for reproducibility

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

## 🔬 Two Research Methodologies

The bmad-ai-research pack provides **TWO complementary research methodologies**:

### 1️⃣ Deep Research Workflow (NEW!) - Literature & Information Gathering

**When to use:** Comprehensive literature review, competitive analysis, technology investigation, or any deep information gathering task.

**What it does:** Autonomous multi-agent research system that explores, analyzes, and synthesizes information from multiple sources.

**Architecture:** **Orchestrator-Worker with Parallel Subagents**

```
Research Lead (Orchestrator)
    │
    ├─→ Spawns 3 parallel subagent workers:
    │   ├─ D. Freuzer (Web Specialist) ──────┐
    │   ├─ H. Zoppel (ArXiv Specialist) ─────┤ Work simultaneously
    │   └─ A. Pilz (KB Curator) ─────────────┘
    │
    └─→ Synthesizes results from all workers
```

**Key Innovation:** Research Lead can spawn and coordinate multiple specialist subagents in parallel during the exploration phase, dramatically reducing research time while ensuring comprehensive coverage.

**Duration:** 4-8 hours per iteration (1-3 iterations typical)

### 2️⃣ Academic Paper Development Workflow - Complete Research Lifecycle

**When to use:** Publishing an academic paper with novel experiments, from proposal to submission.

**What it does:** Full research lifecycle from brainstorming → experiments → analysis → paper writing → submission.

**Architecture:** Sequential team coordination with iterative phases

```
Research Lead → Research Assistants (3 specialists) → Research Scientist
→ Experiment Team → Data Analyst → Research Writer → Publication
```

**Duration:** 3-6 months for conference paper

---

## 🔍 METHOD 1: Agentic Deep Research Workflow

**The bmad-ai-research pack now includes a comprehensive SIX-phase agentic deep research workflow that goes beyond traditional literature search!**

This workflow implements state-of-the-art autonomous research methodology used by systems like Anthropic's multi-agent research system, DeepResearcher, and other advanced agentic frameworks.

**🆕 NEW in v2.0:** Phase 0 analyzes existing codebase/data FIRST to ground research in YOUR actual implementation context!

### Six-Phase Methodology

```
Context Analysis → Planning → Exploration → Analysis → Synthesis → Iteration & Refinement
```

**Phase 0: Context Analysis** 🆕 **(Optional but Recommended)**

- **IF existing codebase/data:** Analyze FIRST before external research
- Codebase analysis (technologies, architecture, capabilities, problems)
- Data & results analysis (previous experiments, what worked/didn't)
- Context synthesis (grounded research questions, implementation constraints)
- **Tools used:** Glob, Read, Grep to analyze existing code/data
- **Skipped if:** Starting from scratch with no existing code

**Phase 1: Planning**

- Query analysis & intent extraction
- Problem decomposition (3-7 sub-questions)
- Research strategy development
- **Incorporates Phase 0 context** if available (implementation-aware questions)

**Phase 2: Exploration** ⭐ **Parallel Subagent Workers**

- Query generation & optimization
- **Research Lead spawns 3 parallel subagent workers:**
  - **D. Freuzer** (@research-assistant-web) - Web, GitHub, blogs
  - **H. Zoppel** (@research-assistant-arxiv) - Academic papers
  - **A. Pilz** (@research-assistant-kb) - Knowledge base
- All three specialists execute searches **simultaneously**
- Source discovery & validation

**Phase 3: Analysis**

- Content extraction & processing
- Information ranking & filtering
- Pattern recognition & gap analysis

**Phase 4: Synthesis**

- Multi-source integration
- Comprehensive report generation
- Citation & fact-checking

**Phase 5: Iteration & Refinement**

- Quality assessment
- Human-in-the-loop feedback
- Continuous improvement

### Parallel Subagent Architecture

**Critical Feature:** The Research Lead acts as an **orchestrator** that can spawn and manage multiple **worker subagents** in parallel:

```
┌─────────────────────────────────────────────────────┐
│         Research Lead (Orchestrator)                │
│         Prof. Dr. Kunz                              │
│                                                     │
│  Capabilities:                                      │
│  • Spawn multiple subagent workers                  │
│  • Coordinate parallel execution                    │
│  • Synthesize results from all workers              │
│  • Make decisions at workflow gates                 │
└──────────────┬──────────────────────────────────────┘
               │
               │ Spawns 3 parallel workers in Phase 2:
               │
    ┌──────────┴───────────┬───────────────┐
    │                      │               │
    ▼                      ▼               ▼
┌─────────┐          ┌──────────┐    ┌──────────┐
│D.Freuzer│          │H. Zoppel │    │ A. Pilz  │
│Web      │          │ArXiv     │    │KB        │
│Worker   │          │Worker    │    │Worker    │
└─────────┘          └──────────┘    └──────────┘
     │                    │               │
     │   Execute searches simultaneously  │
     │                    │               │
     └────────────────────┴───────────────┘
                         │
                         ▼
              Orchestrator synthesizes
```

**Benefits of Parallel Subagents:**

- ⚡ **3x faster** than sequential search
- 📚 **Comprehensive coverage** across web, academic, and curated sources
- 🎯 **Specialized expertise** - each worker optimized for their domain
- 🔄 **Scalable** - can spawn more workers if needed

### Quick Start

```bash
@research-lead
*run-deep-research "your research topic or question"
```

The Research Lead will orchestrate the entire five-phase workflow:

1. Decompose your question into focused sub-questions
2. **Spawn and coordinate 3 parallel specialist workers**
3. Analyze and rank information by relevance
4. Synthesize findings into comprehensive report
5. Iterate based on quality assessment

### How to Use the Workflow

**Step 1: Activate Research Lead**

```bash
@research-lead
```

**Step 2: Start Deep Research**

```bash
*run-deep-research "your research topic or question"
```

**What Happens Next:**

**Phase 0: Context Analysis (If existing code/data present)**

```
Research Lead checking for existing context...
├─ Found: codebase/ directory ✓
├─ Found: data/ directory ✓
└─ Analyzing existing implementation...

Codebase Analysis:
├─ Technologies: Python 3.11, PyTorch 2.1, transformers
├─ Architecture: [Current design patterns identified]
├─ Capabilities: [What's already implemented]
├─ Problems: [Identified pain points and TODOs]
└─ Constraints: [Technical limitations]

Data Analysis:
├─ Data available: 10GB preprocessed dataset
├─ Previous experiments: 5 runs documented
├─ What worked: [Successful approaches]
├─ What didn't: [Failed experiments]
└─ Open questions: [Unanswered from existing work]

Context Synthesis:
├─ Grounded research questions formulated
├─ Implementation constraints documented
└─ Research priorities ranked by impact

Phase 0 complete. Proceeding with context-aware planning...
```

**If NO existing code/data:**

```
Research Lead checking for existing context...
└─ No codebase/ or data/ found. Skipping Phase 0.
    Proceeding directly to Phase 1 planning...
```

**Phase 1: Planning (You'll see this happening)**

```
Research Lead analyzing your question...
├─ Intent: [Technology investigation / Business intelligence / etc.]
├─ Scope: [Boundaries defined]
├─ Context: [From Phase 0 if available]
└─ Sub-questions generated:
    1. [Specific sub-question]
    2. [Specific sub-question]
    3. [Specific sub-question]
    ...
```

**Phase 2: Exploration (Parallel workers in action)**

```
Research Lead spawning parallel workers...

D. Freuzer (Web) searching:
├─ Query 1: [optimized keywords]
├─ Query 2: [optimized keywords]
└─ Found: 15 web sources

H. Zoppel (ArXiv) searching:
├─ Query 1: [academic terms]
├─ Query 2: [academic terms]
└─ Found: 8 academic papers

A. Pilz (KB) searching:
├─ Query 1: [corpus search]
└─ Found: 5 relevant papers from knowledge base

Sources validated: 28 high-quality sources identified
```

**Phase 3: Analysis (You'll see progress)**

```
Analyzing sources...
├─ Content extracted from 28 sources
├─ Ranked by relevance
├─ Patterns identified: [key themes]
└─ Gaps recognized: [missing areas]
```

**Phase 4: Synthesis (Report generation)**

```
Synthesizing findings...
├─ Sub-question 1: [integrated findings]
├─ Sub-question 2: [integrated findings]
├─ Sub-question 3: [integrated findings]
└─ Report drafted with citations
```

**Phase 5: Refinement (Human-in-the-loop)**

**⚠️ YOUR INPUT NEEDED:**

Research Lead will present quality assessment and ask:

```
Research Complete - Quality Assessment

Report addresses 5 sub-questions with 28 sources

Quality scores:
- Completeness: 8/10
- Accuracy: 9/10
- Relevance: 9/10
- Coherence: 8/10

What refinement is needed?

1. Complete - Research meets needs (finalize and deliver)
2. Deeper exploration - Need more information on specific areas
3. Reframe question - Need to refine research question
4. Expand synthesis - Findings need better integration
5. Other - Specify custom refinement

Your choice: _____
```

**Choose based on your needs:**

- **Option 1 (Complete)**: Finalize and receive all deliverables
- **Option 2 (Deeper exploration)**: Research Lead will iterate Phase 2 with refined queries
- **Option 3 (Reframe)**: Research Lead will iterate Phase 1 with new sub-questions
- **Option 4 (Expand synthesis)**: Research Lead will improve Phase 4 integration

**Step 3: Receive Final Deliverables**

Once you choose "Complete", you'll receive:

```
deep-research-[topic]-[date]/
├── deep-research-report.md          # Full comprehensive report
├── executive-summary.md             # 1-page summary
├── bibliography.md                  # Complete source list with ratings
├── methodology.md                   # Research process documentation
├── pattern-analysis.md              # Cross-cutting themes
└── knowledge-gaps.md                # Identified gaps and future directions
```

### Key Features

✅ **Autonomous & Iterative** - Not one-shot retrieval, but adaptive exploration
✅ **Parallel Subagent Workers** - Three specialists execute searches simultaneously
✅ **Deep Synthesis** - Goes beyond aggregation to create meaningful insights
✅ **Quality-Driven** - Feedback loops ensure thoroughness
✅ **Context-Preserving** - Maintains context across all phases
✅ **Orchestrator-Worker Pattern** - Research Lead coordinates all subagents

### Output

After completion, you'll receive:

- **Deep Research Report** - Comprehensive findings organized by sub-questions
- **Executive Summary** - 1-page high-level overview
- **Bibliography** - Complete source list with quality ratings
- **Gap Analysis** - Identified knowledge gaps and future directions
- **Strategic Insights** - Actionable recommendations

### Timeline

- **Phase 0 (Context Analysis):** 30 minutes - 2 hours (if existing codebase/data)
- **Single iteration:** 4-8 hours (without Phase 0) or 5-10 hours (with Phase 0)
- **Phase 2 (Exploration with parallel workers):** 1-3 hours
- **Typical projects:** 1-3 iterations for comprehensive results

**Timeline Breakdown:**

```
With Existing Codebase:
├─ Phase 0: Context Analysis (30 min - 2 hrs)
├─ Phase 1: Planning (30-60 min)
├─ Phase 2: Exploration (1-3 hrs)
├─ Phase 3: Analysis (1-2 hrs)
├─ Phase 4: Synthesis (1-2 hrs)
└─ Phase 5: Refinement (30 min - 2 hrs)
Total: 5-10 hours per iteration

Without Existing Codebase:
├─ Phase 1: Planning (30-60 min)
├─ Phase 2: Exploration (1-3 hrs)
├─ Phase 3: Analysis (1-2 hrs)
├─ Phase 4: Synthesis (1-2 hrs)
└─ Phase 5: Refinement (30 min - 2 hrs)
Total: 4-8 hours per iteration
```

### Complete Worked Example

**Scenario:** You want to understand the current landscape of vector databases.

**Step 1: Start the workflow**

```bash
@research-lead
*run-deep-research "vector database landscape 2024"
```

**Step 2: Phase 1 - Planning (autonomous)**

Research Lead decomposes your question:

```
Sub-questions generated:
1. What are the leading vector database solutions in 2024?
2. How do vector databases compare on performance benchmarks?
3. What are the key technical differentiators?
4. What are pricing and licensing models?
5. What are emerging trends and future directions?
```

**Step 3: Phase 2 - Exploration (parallel workers)**

Three workers execute simultaneously:

```
D. Freuzer (Web) → Finding: Pinecone blogs, Weaviate docs, Qdrant tutorials
H. Zoppel (ArXiv) → Finding: Vector search papers, benchmark studies
A. Pilz (KB) → Finding: Previous vector DB analysis from your corpus

Total: 32 high-quality sources validated
```

**Step 4: Phase 3 & 4 - Analysis & Synthesis (autonomous)**

Research Lead produces comprehensive report organized by your 5 sub-questions.

**Step 5: Phase 5 - Your decision point**

```
Research Complete - Quality Assessment

Report addresses 5 sub-questions with 32 sources
Quality scores: 8-9/10 across all dimensions

What refinement is needed?

Your choice: 1 (Complete - looks comprehensive!)
```

**Step 6: Receive deliverables**

```
deep-research-vector-db-2024/
├── deep-research-report.md
    - Comprehensive 15-page report
    - All 5 sub-questions answered
    - 32 sources cited
    - Performance comparison tables
    - Pricing analysis
    - Trend predictions

├── executive-summary.md
    - 1-page overview
    - Key findings
    - Top recommendations

├── bibliography.md
    - All 32 sources with quality ratings
    - Categorized by type (web/academic/KB)

└── knowledge-gaps.md
    - Identified: Need more info on enterprise deployments
    - Suggested: Interview with practitioners
```

**Total time:** 6 hours (single iteration)

---

### What If You Want to Iterate?

**Scenario:** After reviewing the report, you realize you need deeper information on a specific area.

**Option 1: Deeper Exploration (Most Common)**

At the decision point, choose option 2:

```
Your choice: 2 (Deeper exploration)

Research Lead: What specific areas need deeper investigation?
You: "Need more details on enterprise deployment patterns and case studies"

Research Lead: Spawning workers for targeted deep-dive...
D. Freuzer → Searching: enterprise case studies, deployment guides
H. Zoppel → Searching: production implementation papers
A. Pilz → Searching: enterprise patterns in KB

Additional 12 sources found
Updated report with new section: "Enterprise Deployment Patterns"
```

**Option 2: Reframe Question**

If you realize the question needs adjustment:

```
Your choice: 3 (Reframe question)

Research Lead: How should we refine the research question?
You: "Focus specifically on open-source vector databases"

Research Lead: Generating new sub-questions for open-source focus...
1. What are the leading open-source vector database solutions?
2. How do open-source options compare to commercial alternatives?
3. What are community adoption trends?
...

[Entire workflow restarts with refined focus]
```

**Option 3: Expand Synthesis**

If findings are there but need better integration:

```
Your choice: 4 (Expand synthesis)

Research Lead: What aspects need better integration?
You: "Connect technical features to use cases more clearly"

Research Lead: Re-synthesizing with use-case mapping...
├─ Feature-to-use-case matrix created
├─ Decision framework added
└─ Updated recommendations section
```

**Typical Iteration Pattern:**

- **First iteration (4-8 hours):** Broad landscape analysis
- **Second iteration (2-4 hours):** Deeper dive on specific areas
- **Third iteration (1-2 hours):** Final refinements and gap filling

### More Use Cases

**Technology Investigation:**

```bash
*run-deep-research "efficient attention mechanisms for transformers"
```

**Business Intelligence:**

```bash
*run-deep-research "AI regulation trends in healthcare 2024"
```

**Academic Literature Review:**

```bash
*run-deep-research "self-supervised learning for computer vision"
```

**Competitive Analysis:**

```bash
*run-deep-research "vector database landscape 2024"
```

### Integration with Academic Paper Workflow (Phase 1)

**CRITICAL:** Deep research workflow is designed to integrate with Phase 1 of the academic paper development workflow!

**Three Integration Options:**

**Option 1: Deep Research First** (Recommended for New Projects)

```bash
# Step 1: Run deep research to understand landscape (4-8 hours)
@research-lead
*run-deep-research "your research area"
# → Comprehensive landscape analysis with gap identification
# → Output: deep-research-report.md, bibliography.md, gaps.md

# Step 2: Then run Phase 1 brainstorming with insights (1 week)
@research-lead
*run-phase-1 "focused topic based on gaps identified"
# → Brainstorm specific research questions
# → Targeted literature searches (not comprehensive)
# → Create research proposal and architecture

# Benefits: Best of both worlds - comprehensive landscape + focused planning
# Timeline: 5-10 hours (deep research) + 1 week (phase 1)
```

**Option 2: Deep Research Integrated** (Recommended for Literature-Heavy Projects)

```bash
# Step 1: Initial brainstorming (1-2 days)
@research-lead
*brainstorm "your evolving topic"
# → Generate initial research questions

# Step 2: Deep research on those questions (4-8 hours)
@research-lead
*run-deep-research "questions from brainstorming"
# → Uses 5-phase methodology with parallel subagent workers
# → Produces comprehensive literature synthesis

# Step 3: Create proposal using deep research findings (2-3 days)
@research-lead
*create-proposal
# → Proposal grounded in comprehensive literature

# Benefits: Most thorough literature coverage, highest quality
# Timeline: 1-2 days + 4-8 hours + 2-3 days = ~1 week total
```

**Option 3: Manual Iterative Approach**

```bash
# Use Phase 1 workflow without deep research
@research-lead
*run-phase-1 "your topic"
# → Manual 2-4 iteration cycles with three specialists
# → More control, step-by-step, pedagogical

# Benefits: Step-by-step control, tight integration with brainstorming
# Timeline: 1-2 weeks
```

**Recommendation:**

- **New project, unfamiliar area?** → Option 1 (Deep research first)
- **Literature-heavy, comprehensive survey needed?** → Option 2 (Deep research integrated)
- **Need tight control, teaching/learning?** → Option 3 (Manual iterative)

**📖 Full documentation:**

- [Workflow Definition](workflows/deep-research.yaml) - Complete YAML specification
- [Task Guide](tasks/run-deep-research.md) - Step-by-step execution guide
- [Methodology Documentation](docs/DEEP-RESEARCH-METHODOLOGY.md) - Detailed methodology explanation
- [Visual Guide](docs/DEEP-RESEARCH-VISUAL-GUIDE.md) - Visual diagrams and examples

---

## 🔬 METHOD 2: Academic Paper Development Workflow

**Complete research lifecycle from brainstorming to publication with novel experiments.**

This workflow is designed for researchers aiming to publish at top-tier conferences (NeurIPS, ICML, ICLR, CVPR, etc.) with original experimental contributions.

### When to Use Which Method?

| Scenario              | Use Method 1 (Deep Research)                                           | Use Method 2 (Paper Development)                        |
| --------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------- |
| **Goal**              | Understand landscape, gather info                                      | Publish paper with experiments                          |
| **Experiments**       | None needed                                                            | Novel experiments required                              |
| **Timeline**          | 4-8 hours (1-3 iterations)                                             | 3-6 months                                              |
| **Output**            | Research report + bibliography                                         | Published paper + code release                          |
| **Architecture**      | **Orchestrator spawns parallel subagent workers**                      | Sequential team coordination with iterations            |
| **Three Specialists** | Work as **parallel workers** (simultaneously)                          | Work through **iterative cycles** (2-4 rounds)          |
| **Phase 2**           | Parallel subagent search (exploration)                                 | Experiment implementation                               |
| **Best for**          | Standalone literature review, competitive analysis, tech investigation | Academic publication, PhD research, novel contributions |
| **Relationship**      | **Can be used AS Phase 1 literature component**                        | Full research lifecycle (Phase 1-4)                     |

**IMPORTANT:** Methods 1 and 2 are **complementary, not mutually exclusive**!

**Three Ways to Use Deep Research with Paper Development:**

1. **Deep Research BEFORE Phase 1** - Understand landscape, then start paper development
2. **Deep Research AS Phase 1 Literature** - Replace Phase 1's manual literature system with deep research workflow
3. **Deep Research STANDALONE** - Use independently for competitive analysis or technology investigation

**Key Architectural Difference:**

- **Method 1 (Deep Research):** Research Lead spawns three specialist subagents as **parallel workers** that execute searches simultaneously during exploration phase (3x faster, highly autonomous).
- **Method 2 Phase 1 (Manual Literature):** Research Lead coordinates three specialists through **iterative brainstorming-literature cycles** to progressively refine research questions (more control, pedagogical).
- **Method 2 Phase 1 (With Deep Research):** Use deep research workflow for literature component, then proceed to experiments (best of both worlds).

---

### 🔄 Iterative Research Cycle (Method 2)

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

### Phase 1: Planning - THREE-SPECIALIST ITERATIVE LITERATURE SYSTEM

**🔁 REPEATABLE:** Run this phase multiple times as your research questions evolve!

**💡 Key Difference from Method 1:** In Method 2, the three specialists work through **iterative brainstorming-literature cycles** (2-4 iterations) to refine research questions. In Method 1, they work as **parallel subagent workers** for comprehensive information gathering.

**🤖 Automated Execution:** Let Prof. Dr. Kunz (Research Lead) orchestrate the entire workflow!

```bash
@research-lead
*run-phase-1 "your research topic"
# Prof. Dr. Kunz will:
# 1. Read workflows/phase-1-planning.yaml
# 2. Execute all steps in sequence
# 3. Coordinate three specialists through iterations
# 4. Handle 2-4 brainstorming-literature cycles
# 5. Create all output documents
```

**📋 Or use the workflow as a guide:** [phase-1-planning.yaml](workflows/phase-1-planning.yaml)

**Manual Invocation (if you prefer step-by-step control):**

```bash
# The Research Lead orchestrates this entire phase:
@research-lead
*brainstorm "your evolving topic"      # Step 1: Generate research questions
*formulate-questions                   # Step 2: Extract search keywords from brainstorming

# Research Lead then coordinates three specialists:
# (Can work simultaneously or sequentially based on availability)

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
   ├─→ LITERATURE SEARCH (Three Specialists) ←─────────┐
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

---

## 📁 Research Project Folder Structure

The AI Research pack expects a specific folder structure for research projects. Initialize it automatically:

```bash
@research-lead
*init-folders
```

This creates the complete folder structure and archives any existing code to `old_code/`.

### Standard Folder Layout

```
research-project/
├── codebase/              # ML implementation (Python, notebooks, configs)
│   ├── models/            # Model implementations
│   ├── datasets/          # Dataset loaders and preprocessing
│   ├── training/          # Training scripts and loops
│   ├── evaluation/        # Evaluation metrics and scripts
│   ├── utils/             # Utility functions
│   ├── configs/           # Experiment configurations
│   └── notebooks/         # Jupyter notebooks for exploration
│
├── data/                  # Datasets
│   ├── raw/               # Raw, unprocessed data (immutable)
│   ├── processed/         # Preprocessed, ready-to-use data
│   └── external/          # External datasets (downloaded)
│
├── results/               # Experiment outputs
│   ├── experiments/       # Per-experiment results (exp001/, exp002/, etc.)
│   ├── figures/           # Plots, graphs, visualizations
│   ├── tables/            # Result tables (CSV, LaTeX)
│   └── analysis/          # Statistical analysis outputs
│
├── research-paper/        # Paper drafts and submission materials
│   ├── drafts/            # Paper versions (v1, v2, etc.)
│   ├── figures/           # Publication-ready figures
│   ├── tables/            # Publication-ready tables
│   ├── bibliography/      # BibTeX files
│   ├── reviews/           # Reviewer comments and responses
│   └── submission/        # Final submission package
│
├── old_code/              # Archive for legacy/deprecated code
│   └── YYYY-MM-DD_HH-MM-SS/  # Timestamped archives
│
└── scripts/               # Utility scripts
    ├── setup/             # Environment setup
    ├── preprocessing/     # Data preprocessing
    └── analysis/          # Analysis automation
```

### Folder Access Matrix

| Folder              | Primary Agent    | Write Access         | Read Access |
| ------------------- | ---------------- | -------------------- | ----------- |
| **codebase/**       | @ml-engineer     | ML Engineer          | All agents  |
| **data/**           | @ml-engineer     | ML Engineer          | All agents  |
| **results/**        | @data-analyst    | Data Analyst, ML Eng | All agents  |
| **research-paper/** | @research-writer | Research Writer      | All agents  |
| **old_code/**       | (archive)        | None (read-only)     | All agents  |
| **scripts/**        | Various          | As needed            | All agents  |

### When to Initialize

- **Starting a new research project** - Create clean folder structure
- **Migrating existing research** - Organize and archive old code
- **Onboarding to BMAD AI Research** - Set up workspace properly

### What Gets Created

- ✅ Complete folder hierarchy with subdirectories
- ✅ README.md in each major folder with guidelines
- ✅ .gitignore configured for research projects
- ✅ Experiment template (exp001) ready to use
- ✅ Old code archived with timestamp (if existing code found)

### Example Usage

```bash
# Initialize folder structure
@research-lead
*init-folders

# Check if in correct directory: "Is this the correct project root?" → yes
# Archive existing code: "What would you like to do?" → 1 (archive)

# ✓ Folder structure initialized
# ✓ Existing code archived to old_code/2024-10-03_14-30-00/
# ✓ Ready to start research!
```

**📖 Complete guide:** [tasks/init-research-folders.md](tasks/init-research-folders.md)

---

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
- **🔍 Deep Research Workflow**: [workflows/deep-research.yaml](workflows/deep-research.yaml) - Five-phase agentic deep research
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
- 🔍 [Deep Research Workflow](workflows/deep-research.yaml) - Five-phase agentic deep research
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
