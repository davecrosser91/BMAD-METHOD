# BMAD Research-Dev Hybrid Expansion Pack - Implementation Plan

**Version:** 1.0.0
**Created:** 2025-11-16
**Status:** Planning Phase

---

## 🎯 Executive Summary

This document outlines the plan for creating a **hybrid expansion pack** that combines:

- Software development workflows from `bmad-core-github-research`
- Research capabilities from `bmad-ai-research`
- **Local-first approach** (no Archon MCP, no wandb)
- **GitHub as the backbone** for task management
- **Dual git repository support** within one project

**Key Innovation:** A unified BMAD pack that supports both software product development AND research/experimentation workflows using GitHub and local files.

---

## 📊 Requirements Analysis

### ✅ Keep from bmad-core-github-research

- PM → SM → DEV → QA workflow
- GitHub Issues, Milestones, Labels
- GitHub Actions for automation
- Sprint-based development
- PR workflow and code review
- GitHub CLI integration

### ✅ Add from bmad-ai-research

- Research agent capabilities
- Three-folder structure (codebase/, results/, research-paper/)
- Literature search capabilities
- Experiment design and analysis
- Research writing (papers, documentation)
- Reproducibility validation

### ❌ Remove/Replace Dependencies

- **Remove:** Archon MCP → Replace with local markdown files + git
- **Remove:** wandb MCP → Replace with local results files
- **Remove:** ArXiv MCP → Use WebSearch/WebFetch instead
- **Keep:** GitHub integration (enhanced for dual repos)

### 🆕 New Requirements

1. Enhanced Analyst agent (research + business capabilities)
2. Writing agent (docs + papers)
3. Dual git repo management (implementation + research)
4. Local document storage with frontmatter metadata
5. Cross-repo GitHub issue references
6. Hybrid workflows (software + research)

---

## 👥 Agent Architecture

### Core Development Team (8 agents)

#### 1. Enhanced Analyst (Emma) - **NEW ENHANCED VERSION**

**Role:** Research-Driven Business Analysis

**Capabilities:**

- ✅ Business requirements gathering (original)
- ✅ User research and interviews (original)
- ✅ **Literature search** (3-mode: Web, Academic papers, Local docs)
- ✅ **Competitive analysis** (technical deep-dives)
- ✅ **Gap identification** (market + technical)
- ✅ **Research question formulation**
- ✅ **Technology trend analysis**

**Tools:**

- WebSearch (industry trends, blogs)
- WebFetch (documentation, GitHub repos)
- Grep (local document search in docs/)
- Read (markdown files)

**Commands:**

- `*create-project-brief` - Traditional business brief
- `*literature-search {topic}` - Multi-source research
- `*competitive-analysis {competitors}` - Technical analysis
- `*identify-gaps` - Market + technical gaps
- `*formulate-questions` - Research questions
- `*research-proposal` - Initial research proposal

**Workspace:** docs/research/proposals/, docs/notes/

---

#### 2. PM (John) - Product Manager

**Role:** Epic and story management

**Unchanged from bmad-core-github-research**

- Creates PRD
- Manages GitHub Milestones (epics)
- Creates GitHub Issues (stories)
- Links to research proposals

**New Capability:**

- Can reference research experiments in stories
- Cross-repo issue linking

**Workspace:** docs/prd/, GitHub Issues

---

#### 3. Architect (Sarah) - Solution Architect

**Role:** System architecture design

**Enhanced capabilities:**

- Traditional system architecture
- **Experiment architecture** (data pipelines, model design)
- **Research code organization**

**Workspace:** docs/architecture/, codebase/

---

#### 4. Developer (James) - Software Developer

**Role:** Feature implementation

**Unchanged from bmad-core-github-research**

- Implements features in codebase/src/
- Creates PRs
- Writes tests

**Workspace:** codebase/src/, codebase/tests/

---

#### 5. QA (Maria) - Quality Assurance

**Role:** Code review and testing

**Enhanced capabilities:**

- Code review (traditional)
- **Experiment validation** (reproducibility checks)
- **Results verification**

**Workspace:** All code areas

---

#### 6. Scrum Master (Bob) - Sprint Planning

**Role:** Sprint coordination

**Enhanced capabilities:**

- Sprint planning (traditional)
- **Research milestone planning**
- **Hybrid sprint support** (dev + research tasks)

**Workspace:** GitHub Issues, Projects

---

#### 7. Dev Team Lead (Bob) - Parallel Execution

**Role:** Orchestration and parallel execution

**Unchanged from bmad-core-github-research**

---

#### 8. UX Expert (Rachel) - **OPTIONAL**

**Role:** UI/UX design

**Only included if project has UI components**

---

### Research Team (5 agents)

#### 9. Research Scientist (Dr. Alex Kumar)

**Role:** Experiment design

**Capabilities:**

- Experimental methodology design
- Hypothesis formulation
- Experiment specifications
- Results interpretation
- Iterative refinement

**Modified from bmad-ai-research:**

- No Archon dependency → Uses markdown files in docs/research/experiments/
- Creates GitHub Issues for experiments
- References experiment specs in issues

**Commands:**

- `*design-experiment {hypothesis}`
- `*create-experiment-spec`
- `*interpret-results {experiment-id}`
- `*refine-experiment`

**Workspace:** docs/research/experiments/, codebase/experiments/

---

#### 10. ML Engineer (Jordan Lee)

**Role:** Experiment implementation

**Capabilities:**

- Implements experiments in codebase/experiments/
- Data processing pipelines
- Model training scripts
- Experiment execution
- **Local experiment tracking** (JSON/CSV files instead of wandb)

**Modified from bmad-ai-research:**

- No wandb → Uses local results files (results/experiments/)
- Logs metrics to JSON files
- Saves artifacts locally

**Commands:**

- `*implement-experiment {spec-id}`
- `*run-experiment {experiment-id}`
- `*log-metrics {experiment-id} {metrics.json}`
- `*export-results {experiment-id}`

**Workspace:** codebase/experiments/, results/experiments/

---

#### 11. Data Analyst (Dr. Maya Patel)

**Role:** Results analysis and visualization

**Capabilities:**

- Statistical analysis
- Data visualization
- Figure creation for papers/docs
- Comparative analysis
- **Local results processing** (no wandb MCP)

**Modified from bmad-ai-research:**

- Reads from local results/ files
- Creates matplotlib/seaborn visualizations
- Outputs to results/figures/, results/tables/

**Commands:**

- `*analyze-results {experiment-id}`
- `*create-figures {experiment-id}`
- `*statistical-analysis {data-path}`
- `*compare-experiments {exp1} {exp2}`
- `*generate-tables`

**Workspace:** results/analysis/, results/figures/, results/tables/

---

#### 12. Research Writer (Dr. Gatsby Sarihuela) - **NEW HYBRID VERSION**

**Role:** Multi-purpose technical writer

**Capabilities:**

1. **Technical Documentation:**
   - API documentation
   - Architecture documentation
   - Developer guides
   - README files

2. **Research Papers:**
   - LaTeX paper writing
   - Conference/journal formatting
   - Literature reviews
   - Experiment writeups

3. **Business Documents:**
   - Specifications
   - Reports
   - Blog posts

**Tools:**

- Write, Edit, Read (markdown)
- LaTeX editing
- Git operations

**Commands:**

- `*create-api-docs {module}`
- `*create-architecture-doc`
- `*draft-paper {topic}`
- `*write-section {section-name}`
- `*prepare-submission {venue}` (NeurIPS, ICML, etc.)
- `*write-blog-post {topic}`
- `*reformat-template {template}`

**Workspace:** docs/api/, docs/specs/, research-paper/

---

#### 13. Reproducibility Engineer (Sam Rodriguez)

**Role:** Cross-folder validation

**Capabilities:**

- Verifies codebase/ → results/ → research-paper/ consistency
- Ensures experiments are reproducible
- Validates documentation accuracy
- Code release preparation

**Commands:**

- `*verify-reproducibility {experiment-id}`
- `*validate-results {experiment-id}`
- `*prepare-release`
- `*create-dockerfile`
- `*generate-requirements`

**Workspace:** All folders

---

## 📁 Folder Structure Design

```
project-root/                          # Git Repo 1: Implementation
├── .bmad-research-dev/                # Hybrid expansion pack
│   ├── agents/
│   │   ├── enhanced-analyst.md
│   │   ├── pm.md
│   │   ├── architect.md
│   │   ├── dev.md
│   │   ├── qa.md
│   │   ├── sm.md
│   │   ├── dev-team-lead.md
│   │   ├── research-scientist.md
│   │   ├── ml-engineer.md
│   │   ├── data-analyst.md
│   │   ├── research-writer.md
│   │   └── reproducibility-engineer.md
│   │
│   ├── workflows/
│   │   ├── feature-development.yaml
│   │   ├── experiment-cycle.yaml
│   │   ├── research-to-feature.yaml
│   │   ├── paper-writing.yaml
│   │   └── hybrid-sprint.yaml
│   │
│   ├── scripts/
│   │   ├── setup-github-labels.sh
│   │   ├── setup-dual-repos.sh
│   │   ├── sync-research-docs.sh
│   │   └── create-experiment-issue.sh
│   │
│   ├── templates/
│   │   ├── experiment-spec.md
│   │   ├── research-proposal.md
│   │   ├── analysis-report.md
│   │   └── paper-outline.md
│   │
│   └── config.yaml
│
├── .github/                           # GitHub integration
│   ├── workflows/
│   │   ├── automated-qa-review.yml
│   │   ├── sync-research-repo.yml     # NEW: Sync with repo 2
│   │   └── experiment-tracker.yml     # NEW: Track experiment runs
│   │
│   └── ISSUE_TEMPLATE/
│       ├── feature.yml
│       ├── bug.yml
│       ├── experiment.yml             # NEW
│       └── analysis.yml               # NEW
│
├── docs/                              # Documentation (Repo 1)
│   ├── prd/                          # Product Requirements
│   │   └── *.md
│   │
│   ├── architecture/                 # System Architecture
│   │   ├── system-design.md
│   │   ├── data-architecture.md
│   │   └── adrs/
│   │
│   ├── specs/                        # Technical Specifications
│   │   └── *.md
│   │
│   ├── api/                          # API Documentation
│   │   └── *.md
│   │
│   └── research/                     # Research Documents (local, not Archon)
│       ├── proposals/                # Research proposals
│       │   └── proposal-{id}.md
│       │
│       ├── literature-reviews/       # Literature summaries
│       │   └── review-{topic}.md
│       │
│       ├── experiments/              # Experiment specifications
│       │   └── experiment-{id}.md
│       │
│       └── analysis/                 # Analysis writeups
│           └── analysis-{exp-id}.md
│
├── codebase/                         # All code (Repo 1)
│   ├── src/                          # Application source code
│   │   ├── app/
│   │   ├── lib/
│   │   └── utils/
│   │
│   ├── experiments/                  # ML experiments
│   │   ├── baselines/
│   │   ├── novel-methods/
│   │   └── ablations/
│   │
│   ├── data/                         # Data processing
│   │   ├── loaders/
│   │   ├── processors/
│   │   └── datasets/
│   │
│   └── tests/                        # All tests
│       ├── unit/
│       ├── integration/
│       └── experiments/
│
└── .gitignore

../project-research/                   # Git Repo 2: Research Outputs
├── results/                           # Experiment results
│   ├── experiments/                   # Raw experiment outputs
│   │   ├── exp-001/
│   │   │   ├── metrics.json
│   │   │   ├── logs.txt
│   │   │   └── artifacts/
│   │   └── exp-002/
│   │
│   ├── figures/                       # Publication figures
│   │   ├── fig1-accuracy.png
│   │   ├── fig2-comparison.png
│   │   └── supplementary/
│   │
│   ├── tables/                        # Publication tables
│   │   └── table1-results.csv
│   │
│   └── analysis/                      # Analysis notebooks/scripts
│       ├── statistical-tests.ipynb
│       └── comparative-analysis.ipynb
│
├── research-paper/                    # Paper writing (LaTeX)
│   ├── main.tex
│   ├── sections/
│   │   ├── introduction.tex
│   │   ├── related-work.tex
│   │   ├── methodology.tex
│   │   ├── results.tex
│   │   └── conclusion.tex
│   ├── figures/                       # Symlink to ../results/figures/
│   ├── bibliography.bib
│   └── neurips_2024.sty              # Venue templates
│
└── README.md                          # Research repo README
```

---

## 🔗 Dual Git Repository Setup

### Repository 1: Implementation Repo

**Name:** `project` (e.g., github.com/user/ml-optimizer)
**Contains:**

- .bmad-research-dev/
- .github/
- docs/
- codebase/

**Purpose:**

- Software development
- Source code
- Documentation
- Experiment implementations

**GitHub Issues Track:**

- Features (type:feature)
- Bugs (type:bug)
- Experiments (type:experiment)
- Architecture (type:architecture)

---

### Repository 2: Research Repo

**Name:** `project-research` (e.g., github.com/user/ml-optimizer-research)
**Contains:**

- results/
- research-paper/
- README.md

**Purpose:**

- Experiment results
- Figures and tables
- Paper writing (LaTeX)
- Reproducibility artifacts

**GitHub Issues Track:**

- Analysis tasks (type:analysis)
- Paper sections (type:documentation)
- Figure creation (type:visualization)

---

### Cross-Repo Linking

**In Implementation Repo Issues:**

```markdown
## Experiment Task: Test Novel Algorithm

**Implementation:** This issue tracks implementation
**Results:** See user/ml-optimizer-research#15 for analysis
**Paper:** See user/ml-optimizer-research#20 for writeup
```

**In Research Repo Issues:**

```markdown
## Analysis Task: Compare Baselines

**Code:** See user/ml-optimizer#42 for implementation
**Data:** results/experiments/exp-003/
**Figures:** results/figures/fig3-comparison.png
```

---

### Synchronization Strategy

**Option 1: Manual Sync** (Recommended for start)

- Agents work in appropriate repo
- User manually commits/pushes
- Cross-reference via issue numbers

**Option 2: Automated Sync** (Future enhancement)

```yaml
# .github/workflows/sync-research-repo.yml
name: Sync Research Outputs
on:
  push:
    paths:
      - 'docs/research/**'
jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - name: Copy research docs to research repo
        # ... sync logic
```

---

## 🏷️ GitHub Integration Design

### Label System (Combined from both packs)

**Status Labels:**

- `status:backlog` - Not yet started
- `status:todo` - Ready to start
- `status:doing` - In progress
- `status:review` - In review
- `status:done` - Completed

**Type Labels:**

- `type:feature` - Software feature
- `type:bug` - Bug fix
- `type:experiment` - Research experiment
- `type:analysis` - Data analysis
- `type:documentation` - Documentation/paper writing
- `type:architecture` - System design

**Research Labels (NEW):**

- `research:literature` - Literature review task
- `research:experiment` - Experiment task
- `research:analysis` - Analysis task
- `research:paper` - Paper writing task

**Priority Labels:**

- `priority:p0` - Critical
- `priority:p1` - High
- `priority:p2` - Medium
- `priority:p3` - Low

**Size Labels:**

- `size:xs` - < 1 hour
- `size:s` - 1-4 hours
- `size:m` - 4-8 hours
- `size:l` - 8-16 hours
- `size:xl` - > 16 hours

---

### Milestone System

**Development Milestones:**

- "Feature: User Authentication"
- "Feature: API v2"
- "Refactor: Database Layer"

**Research Milestones:**

- "Experiment: Novel Optimizer"
- "Paper: NeurIPS 2024 Submission"
- "Analysis: Baseline Comparison"

---

### Issue Templates

#### Feature Issue Template

```yaml
name: Feature Story
description: Software feature development
labels: [type:feature, status:backlog]
body:
  - type: input
    id: title
    attributes:
      label: Feature Title
  - type: textarea
    id: description
    attributes:
      label: Description
  # ... standard feature template
```

#### Experiment Issue Template (NEW)

```yaml
name: Research Experiment
description: Research experiment task
labels: [type:experiment, research:experiment, status:backlog]
body:
  - type: input
    id: hypothesis
    attributes:
      label: Hypothesis
      description: What are we testing?

  - type: textarea
    id: methodology
    attributes:
      label: Methodology
      description: How will we test it?

  - type: input
    id: spec_doc
    attributes:
      label: Experiment Spec Document
      description: Path to experiment specification
      placeholder: docs/research/experiments/experiment-001.md

  - type: textarea
    id: expected_outcomes
    attributes:
      label: Expected Outcomes

  - type: textarea
    id: acceptance_criteria
    attributes:
      label: Acceptance Criteria
      description: How do we know it's complete?
```

---

## 📄 Local Document Storage (No Archon)

### Document Structure

Instead of Archon MCP, use **markdown files with frontmatter**:

```markdown
---
type: experiment-spec
id: exp-001
title: Novel Optimization Algorithm
status: active
created: 2025-11-16
updated: 2025-11-20
github_issue: 42
hypothesis: 'New algorithm will converge 2x faster'
tags: [optimization, deep-learning, convergence]
related_docs:
  - docs/research/proposals/proposal-001.md
  - docs/architecture/optimizer-design.md
---

# Experiment: Novel Optimization Algorithm

## Research Question

Can we achieve 2x faster convergence by...

## Methodology

...

## Expected Results

...

## Implementation Plan

- [ ] Task 1: Implement base optimizer
- [ ] Task 2: Add adaptive learning rate
- [ ] Task 3: Run benchmarks
```

### Document Types & Locations

| Document Type     | Location                          | Frontmatter `type`  | Created By         |
| ----------------- | --------------------------------- | ------------------- | ------------------ |
| Research Proposal | docs/research/proposals/          | `research-proposal` | Enhanced Analyst   |
| Literature Review | docs/research/literature-reviews/ | `literature-review` | Enhanced Analyst   |
| Experiment Spec   | docs/research/experiments/        | `experiment-spec`   | Research Scientist |
| Analysis Report   | docs/research/analysis/           | `analysis-report`   | Data Analyst       |
| PRD               | docs/prd/                         | `prd`               | PM                 |
| Architecture Doc  | docs/architecture/                | `architecture`      | Architect          |
| API Docs          | docs/api/                         | `api-docs`          | Research Writer    |
| Paper Draft       | research-paper/                   | `paper` (LaTeX)     | Research Writer    |

---

### Metadata & Search

**Frontmatter Standard:**

```yaml
---
type: <document-type>
id: <unique-id>
title: <title>
status: [draft|active|completed|archived]
created: <YYYY-MM-DD>
updated: <YYYY-MM-DD>
github_issue: <issue-number>
tags: [tag1, tag2, ...]
authors: [agent-name]
related_docs: [path1, path2]
---
```

**Search Strategy:**

- Use `grep` / `ripgrep` for text search
- Use `yq` / `jq` for frontmatter queries
- Use `git log` for version history
- Agents can use `Grep` tool to search docs/

---

## 🔄 Workflow Design

### Workflow 1: Feature Development (Traditional)

**From bmad-core-github-research, unchanged**

```
1. Enhanced Analyst → Project Brief + Competitive Analysis
2. PM → Create PRD + Feature Epics
3. Architect → System Design
4. SM → Sprint Planning
5. DEV → Implementation (feature branch)
6. QA → Code Review
7. Merge to main
```

---

### Workflow 2: Research Experiment Cycle (NEW)

**Hybrid of bmad-ai-research + GitHub**

```
Phase 1: Question Formulation (1-3 days)
├─ Enhanced Analyst
│  ├─ *literature-search {topic}
│  │  ├─ WebSearch (industry blogs, tutorials)
│  │  ├─ WebFetch (documentation, papers)
│  │  └─ Grep (local docs/research/)
│  ├─ *identify-gaps
│  └─ *research-proposal
│       → Creates: docs/research/proposals/proposal-{id}.md
│
└─ PM
   └─ Creates GitHub Milestone: "Experiment: {topic}"

Phase 2: Experiment Design (2-5 days)
├─ Research Scientist
│  ├─ *design-experiment {hypothesis}
│  └─ *create-experiment-spec
│      → Creates: docs/research/experiments/experiment-{id}.md
│      → Creates GitHub Issue (type:experiment)
│
└─ Architect
   └─ *create-architecture (for experiment code)
       → Creates: docs/architecture/experiment-{id}-arch.md

Phase 3: Implementation (1-2 weeks)
├─ ML Engineer
│  ├─ *implement-experiment {spec-id}
│  │  → Implements in codebase/experiments/
│  │  → Updates GitHub Issue status: todo → doing
│  ├─ *run-experiment {experiment-id}
│  │  → Logs to results/experiments/exp-{id}/metrics.json
│  │  → Updates GitHub Issue with results link
│  └─ *export-results
│      → Updates GitHub Issue status: doing → review
│
└─ QA
   └─ *review-code (experiment code quality)

Phase 4: Analysis (3-7 days)
├─ Data Analyst
│  ├─ *analyze-results {experiment-id}
│  │  → Reads results/experiments/exp-{id}/
│  │  → Creates results/analysis/analysis-{id}.md
│  ├─ *create-figures {experiment-id}
│  │  → Creates results/figures/fig-{id}-*.png
│  │  → Creates GitHub Issue for figures
│  └─ *generate-tables
│      → Creates results/tables/table-{id}.csv
│
└─ Reproducibility Engineer
   └─ *verify-reproducibility {experiment-id}
       → Validates codebase/ → results/ consistency
       → Updates GitHub Issue status: review → done

Phase 5: Documentation (Continuous)
└─ Research Writer
   ├─ *draft-paper {topic} (if publishing)
   │  → Creates/updates research-paper/
   └─ *create-api-docs (if productionizing)
      → Creates docs/api/
```

---

### Workflow 3: Research-to-Feature (NEW HYBRID)

**Converting research experiments into production features**

```
1. Experiment Completed (Phase 1-4 above)
   └─ results/experiments/exp-{id}/ shows success

2. Enhanced Analyst
   └─ *create-project-brief (productionization brief)
       → docs/notes/productionize-exp-{id}.md

3. PM
   ├─ Create PRD for feature based on experiment
   └─ Create GitHub Milestone: "Feature: {exp-based-feature}"

4. Architect
   └─ Design production architecture (from experiment code)
       → docs/architecture/production-{feature}.md

5. Developer (NOT ML Engineer)
   ├─ Refactor experiment code → production code
   │  → Move from codebase/experiments/ → codebase/src/
   ├─ Add error handling, logging, monitoring
   └─ Create PR

6. QA
   ├─ Code review (production standards)
   └─ Integration tests

7. Merge & Deploy
```

---

### Workflow 4: Paper Writing (NEW)

**Publishing research as a paper**

```
Phase 1: Outline & Preparation
├─ Research Writer
│  ├─ *draft-paper {topic}
│  │  → Creates research-paper/main.tex
│  │  → Creates research-paper/sections/*.tex
│  └─ Reads ALL related docs:
│      ├─ docs/research/proposals/
│      ├─ docs/research/experiments/
│      └─ docs/research/analysis/
│
└─ Data Analyst
   └─ Ensures all figures in results/figures/ are publication-ready

Phase 2: Section Writing
└─ Research Writer (iterative)
   ├─ *write-section introduction
   ├─ *write-section related-work
   │  → References docs/research/literature-reviews/
   ├─ *write-section methodology
   │  → References docs/research/experiments/
   ├─ *write-section results
   │  → Incorporates results/figures/, results/tables/
   └─ *write-section conclusion

Phase 3: Submission Preparation
└─ Research Writer
   ├─ *reformat-template {neurips|icml|iclr|...}
   ├─ *prepare-submission {venue}
   │  ├─ Anonymization
   │  ├─ Supplementary materials
   │  └─ Creates submission package
   └─ Creates GitHub Issue for submission tracking

Phase 4: Reproducibility
└─ Reproducibility Engineer
   ├─ *verify-reproducibility (all experiments in paper)
   ├─ *prepare-release (code release)
   └─ *create-dockerfile (containerization)
```

---

## 🛠️ Configuration Design

### config.yaml

```yaml
name: bmad-research-dev
version: 1.0.0
short-title: Research + Development Pack
description: >-
  Hybrid expansion pack combining software development workflows with
  research capabilities. GitHub-based, local-first, no MCP dependencies.
author: BMAD Community
slashPrefix: BMadRD

# Dual Git Repository Configuration
repositories:
  implementation:
    name: project
    path: ./
    description: Implementation repository (code, docs, experiments)
    github_url: https://github.com/user/project
    tracks:
      - features
      - bugs
      - experiments
      - architecture

  research:
    name: project-research
    path: ../project-research/
    description: Research repository (results, papers)
    github_url: https://github.com/user/project-research
    tracks:
      - analysis
      - papers
      - figures

# GitHub Integration
github:
  # Use GitHub for task management (not Archon)
  tasks:
    use_milestones_for_epics: true
    use_issues_for_tasks: true

    labels:
      # Status labels
      status:
        - backlog
        - todo
        - doing
        - review
        - done

      # Type labels
      types:
        - feature
        - bug
        - experiment
        - analysis
        - documentation
        - architecture

      # Research-specific labels
      research:
        - literature
        - experiment
        - analysis
        - paper

      # Priority labels
      priority:
        - p0 # Critical
        - p1 # High
        - p2 # Medium
        - p3 # Low

      # Size labels
      size:
        - xs # < 1 hour
        - s # 1-4 hours
        - m # 4-8 hours
        - l # 8-16 hours
        - xl # > 16 hours

    # Automation
    auto_link_pr_to_issue: true
    auto_close_on_merge: true
    validate_dependencies: true

  # Pull requests
  pull_requests:
    branch_prefix: 'feature/'
    require_issue_reference: true
    auto_update_issue_status: true

# Document Storage (Local Files, No Archon)
documents:
  use_files: true
  use_frontmatter: true
  use_archon: false # Explicitly disabled

  # Document locations
  structure:
    # Software development docs (Repo 1)
    prd: docs/prd/
    architecture: docs/architecture/
    specs: docs/specs/
    api: docs/api/
    guides: docs/guides/
    notes: docs/notes/

    # Research docs (Repo 1)
    research:
      proposals: docs/research/proposals/
      literature: docs/research/literature-reviews/
      experiments: docs/research/experiments/
      analysis: docs/research/analysis/

    # Research outputs (Repo 2)
    research_outputs:
      results: ../project-research/results/
      experiments: ../project-research/results/experiments/
      figures: ../project-research/results/figures/
      tables: ../project-research/results/tables/
      analysis_code: ../project-research/results/analysis/
      paper: ../project-research/research-paper/

  # Frontmatter standard
  frontmatter_schema:
    required_fields:
      - type
      - title
      - status
      - created
    optional_fields:
      - id
      - updated
      - github_issue
      - tags
      - authors
      - related_docs

# Agents Configuration
agents:
  # Development team
  development:
    enhanced-analyst:
      enabled: true
      capabilities: [requirements, research, literature, gaps]
    pm:
      enabled: true
    architect:
      enabled: true
    dev:
      enabled: true
    qa:
      enabled: true
    sm:
      enabled: true
    dev-team-lead:
      enabled: true
    ux-expert:
      enabled: false # Optional

  # Research team
  research:
    research-scientist:
      enabled: true
    ml-engineer:
      enabled: true
    data-analyst:
      enabled: true
      wandb_integration: false # Disabled, use local files
    research-writer:
      enabled: true
      capabilities: [api-docs, papers, blogs]
    reproducibility-engineer:
      enabled: true

# Experiment Tracking (Local, No wandb)
experiments:
  use_wandb: false
  use_local_tracking: true

  local_tracking:
    metrics_format: json
    logs_format: txt
    results_path: ../project-research/results/experiments/

    # What to track
    track:
      - metrics # Performance metrics
      - hyperparameters # Experiment config
      - logs # Training logs
      - artifacts # Model checkpoints, etc.

# Workflows
workflows:
  # Software development workflows
  software:
    - feature-development
    - bug-fixing
    - refactoring
    - code-review

  # Research workflows
  research:
    - literature-review
    - experiment-design
    - experiment-execution
    - results-analysis
    - paper-writing

  # Hybrid workflows
  hybrid:
    - research-to-feature
    - experiment-driven-development
    - paper-and-product

# QA Configuration
qa:
  automated_review:
    enabled: true
    trigger_on:
      - pr_opened
      - pr_updated
    auto_merge_on_pass: false

    # Different QA for different types
    review_types:
      feature:
        model: claude-sonnet-4-20250514
        checks: [functionality, tests, documentation]

      experiment:
        model: claude-sonnet-4-20250514
        checks: [reproducibility, methodology, results_validity]

# Dev Team Lead Configuration
dev_team_lead:
  default_mode: in-context
  parallel:
    max_developers: 5
    max_qa_reviewers: 3
    wave_batch_size: 10
```

---

## 📋 Implementation Roadmap

### Phase 1: Foundation (Week 1-2)

**Goal:** Create basic hybrid pack structure

#### Tasks:

1. **Setup Base Structure**
   - [ ] Create `bmad-research-dev/` directory
   - [ ] Copy base files from `bmad-core-github-research/`
   - [ ] Create folder structure (docs/research/, codebase/experiments/, etc.)
   - [ ] Create `config.yaml` with dual-repo support

2. **Enhanced Analyst Agent**
   - [ ] Create `agents/enhanced-analyst.md`
   - [ ] Add literature search capabilities (WebSearch, WebFetch, Grep)
   - [ ] Add commands: `*literature-search`, `*identify-gaps`, `*research-proposal`
   - [ ] Test on sample research topic

3. **Research Writer Agent**
   - [ ] Create `agents/research-writer.md`
   - [ ] Add API documentation commands
   - [ ] Add paper writing commands (LaTeX support)
   - [ ] Add blog post commands
   - [ ] Test on sample documentation task

4. **GitHub Setup Scripts**
   - [ ] Create `scripts/setup-github-labels.sh` (combined labels)
   - [ ] Create `scripts/setup-dual-repos.sh`
   - [ ] Create issue templates (feature, experiment, analysis)
   - [ ] Test label creation

---

### Phase 2: Research Agents (Week 3-4)

**Goal:** Port and adapt research agents from bmad-ai-research

#### Tasks:

1. **Research Scientist Agent**
   - [ ] Copy from bmad-ai-research
   - [ ] Remove Archon dependencies
   - [ ] Update to use docs/research/experiments/ markdown files
   - [ ] Update to create GitHub Issues
   - [ ] Test experiment design workflow

2. **ML Engineer Agent**
   - [ ] Copy from bmad-ai-research
   - [ ] Remove wandb dependencies
   - [ ] Add local experiment tracking (JSON files)
   - [ ] Update to work in codebase/experiments/
   - [ ] Test experiment implementation

3. **Data Analyst Agent**
   - [ ] Copy from bmad-ai-research
   - [ ] Remove wandb MCP dependencies
   - [ ] Add local results file reading
   - [ ] Update to output to results/
   - [ ] Test analysis workflow

4. **Reproducibility Engineer Agent**
   - [ ] Copy from bmad-ai-research
   - [ ] Update for dual-repo structure
   - [ ] Add cross-folder validation
   - [ ] Test reproducibility checks

---

### Phase 3: Workflows (Week 5-6)

**Goal:** Create hybrid workflows

#### Tasks:

1. **Experiment Cycle Workflow**
   - [ ] Create `workflows/experiment-cycle.yaml`
   - [ ] Test full cycle: design → implement → analyze
   - [ ] Document workflow

2. **Research-to-Feature Workflow**
   - [ ] Create `workflows/research-to-feature.yaml`
   - [ ] Test converting experiment to feature
   - [ ] Document workflow

3. **Paper Writing Workflow**
   - [ ] Create `workflows/paper-writing.yaml`
   - [ ] Test full paper writing cycle
   - [ ] Document workflow

4. **Hybrid Sprint Workflow**
   - [ ] Create `workflows/hybrid-sprint.yaml`
   - [ ] Support mixed tasks (features + experiments)
   - [ ] Test sprint planning with SM
   - [ ] Document workflow

---

### Phase 4: Integration & Testing (Week 7-8)

**Goal:** End-to-end testing and documentation

#### Tasks:

1. **Dual Repo Testing**
   - [ ] Setup sample dual repos
   - [ ] Test cross-repo issue references
   - [ ] Test synchronization
   - [ ] Document dual-repo setup

2. **Full Workflow Testing**
   - [ ] Test feature development (traditional)
   - [ ] Test experiment cycle (research)
   - [ ] Test research-to-feature (hybrid)
   - [ ] Test paper writing
   - [ ] Document all workflows

3. **Documentation**
   - [ ] Write comprehensive README
   - [ ] Write QUICKSTART guide
   - [ ] Write agent reference docs
   - [ ] Write workflow guides
   - [ ] Create example project

4. **Templates & Examples**
   - [ ] Create document templates (experiment-spec, research-proposal, etc.)
   - [ ] Create sample experiment
   - [ ] Create sample paper
   - [ ] Create sample API docs

---

### Phase 5: Polish & Release (Week 9-10)

**Goal:** Production-ready release

#### Tasks:

1. **Configuration Validation**
   - [ ] Validate config.yaml schema
   - [ ] Test all config options
   - [ ] Add validation scripts

2. **Error Handling**
   - [ ] Add graceful degradation (if repos missing, etc.)
   - [ ] Add helpful error messages
   - [ ] Test edge cases

3. **Installation**
   - [ ] Create installer script
   - [ ] Test installation process
   - [ ] Write installation guide

4. **Release**
   - [ ] Version 1.0.0
   - [ ] Create release notes
   - [ ] Tag release in git

---

## 🎯 Success Criteria

### Functional Requirements

- ✅ Can execute traditional feature development workflow
- ✅ Can execute research experiment workflow
- ✅ Can convert experiments to features
- ✅ Can write papers with LaTeX support
- ✅ Dual repos work seamlessly
- ✅ No Archon or wandb dependencies
- ✅ All documents stored locally in git
- ✅ GitHub integration works (issues, labels, milestones)

### Quality Requirements

- ✅ All agents have clear documentation
- ✅ All workflows have example runs
- ✅ Installation is straightforward (< 10 minutes)
- ✅ README is comprehensive
- ✅ Example project demonstrates all features

### Performance Requirements

- ✅ Literature search completes in < 5 minutes
- ✅ Experiment design takes < 1 hour
- ✅ Full experiment cycle takes < 1 week
- ✅ Paper draft takes < 1 day

---

## 🚀 Quick Start (Future Usage)

### Installation

```bash
# 1. Setup dual repositories
cd ~/projects
mkdir my-project
cd my-project
git init
gh repo create my-project --public

mkdir ../my-project-research
cd ../my-project-research
git init
gh repo create my-project-research --public

# 2. Install expansion pack
cd ~/projects/my-project
npx @dkreuzer/bmad-method-ai-research install -e bmad-research-dev

# 3. Setup GitHub labels
.bmad-research-dev/scripts/setup-github-labels.sh

# 4. Setup dual repos
.bmad-research-dev/scripts/setup-dual-repos.sh
```

### First Research Experiment

```bash
# Activate Enhanced Analyst
@enhanced-analyst

# Literature search
*literature-search "neural architecture search optimization"

# Create research proposal
*research-proposal

# Switch to Research Scientist
@research-scientist

# Design experiment
*design-experiment "Novel NAS algorithm"

# Switch to ML Engineer
@ml-engineer

# Implement experiment
*implement-experiment exp-001

# Run experiment
*run-experiment exp-001

# Switch to Data Analyst
@data-analyst

# Analyze results
*analyze-results exp-001

# Create figures
*create-figures exp-001
```

---

## 📊 Comparison: Before vs After

### Before (Using Separate Packs)

**For Software + Research Project:**

- Use `bmad-core-github-research` for software
- Use `bmad-ai-research` for research
- **Problem:** No integration, context switching, duplicate workflows
- **Problem:** Archon/wandb required for research
- **Problem:** Can't convert research to features easily

### After (Using Hybrid Pack)

**For Software + Research Project:**

- Use `bmad-research-dev` for everything
- ✅ Single expansion pack
- ✅ Unified workflows
- ✅ Smooth research → feature conversion
- ✅ No MCP dependencies
- ✅ Local-first with git
- ✅ Dual repos managed seamlessly

---

## 🎓 Key Innovations

1. **Enhanced Analyst Agent**
   - Combines business + research capabilities
   - Multi-source literature search (web, papers, local)
   - Gap analysis and question formulation

2. **Research Writer Agent**
   - Multi-purpose: API docs, papers, blogs
   - LaTeX support for academic papers
   - Venue-specific formatting

3. **Dual Repository Support**
   - Single pack manages two repos
   - Cross-repo issue linking
   - Seamless synchronization

4. **Local-First Research**
   - No Archon MCP needed
   - No wandb MCP needed
   - All in git + markdown + JSON

5. **Hybrid Workflows**
   - Traditional feature development
   - Research experiment cycles
   - Research-to-feature conversion
   - Paper writing

6. **GitHub-Native Everything**
   - Issues for tasks/experiments
   - Milestones for epics/research goals
   - Labels for status/type
   - Actions for automation

---

## 🤔 Open Questions & Design Decisions

### Q1: Repo Synchronization Strategy?

**Options:**

- A) Manual (user commits/pushes both repos)
- B) GitHub Action auto-sync
- C) Git submodules

**Recommendation:** Start with A (manual), add B later

---

### Q2: Where to store experiment configs?

**Options:**

- A) YAML files in codebase/experiments/configs/
- B) Frontmatter in docs/research/experiments/
- C) Both (DRY violation risk)

**Recommendation:** B (single source of truth)

---

### Q3: How to handle large result files?

**Options:**

- A) Git LFS
- B) .gitignore, document externally
- C) Compress and commit

**Recommendation:** A (Git LFS) for binary artifacts

---

### Q4: LaTeX vs Markdown for papers?

**Options:**

- A) LaTeX only (academic standard)
- B) Markdown with pandoc conversion
- C) Support both

**Recommendation:** A (LaTeX) for academic, C for flexibility

---

## 📚 Next Steps

1. **Review this plan** with stakeholders
2. **Validate requirements** match user needs
3. **Prototype Phase 1** (Enhanced Analyst + Research Writer)
4. **Test with real use case** (sample research project)
5. **Iterate based on feedback**
6. **Continue with Phase 2-5**

---

## 📝 Document History

| Version | Date       | Author | Changes                    |
| ------- | ---------- | ------ | -------------------------- |
| 1.0.0   | 2025-11-16 | Claude | Initial comprehensive plan |

---

**End of Implementation Plan**
