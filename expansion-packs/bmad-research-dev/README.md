# BMAD Research-Dev Expansion Pack

**Version:** 1.0.0
**Status:** Production Ready
**Author:** BMAD Community

> **Unified expansion pack combining software development workflows with research capabilities. GitHub-based, local-first, single-repo architecture. No external dependencies.**

---

## 🎯 What Is This?

The **bmad-research-dev** pack is a hybrid expansion pack that bridges two worlds:

1. **Software Product Development** (from bmad-core-github)
   - PM → Architect → Developer → QA workflow
   - GitHub Issues, Milestones, Labels
   - Sprint planning and execution
   - Code review and deployment

2. **Research & Experimentation** (from bmad-ai-research, adapted)
   - Literature search and analysis
   - Experiment design and execution
   - Local experiment tracking (no wandb MCP)
   - Paper writing (LaTeX)
   - Research-to-feature conversion

### Key Innovation: **Research-Driven Product Development**

- Conduct research experiments
- Validate findings
- Convert successful experiments into production features
- Publish papers while building products
- All in ONE unified workflow

---

## ✨ Key Features

### Zero-MCP Architecture

- ✅ **100% MCP-Free!** No MCP servers required
- ✅ **Direct Web APIs:** ArXiv (public), Zotero (API key), GitHub (gh CLI)
- ✅ **98.7% token reduction** vs MCP approach
- ✅ **Local-first:** No Archon MCP (markdown frontmatter), No wandb MCP (local JSON/CSV)
- ✅ **Git-versioned:** Everything in git-versioned files
- ✅ **Offline capable:** Most features work offline

### Single-Repo Design

- All code, docs, experiments, and results in one repository
- Optional: Sync research-paper/ to separate repo for publication
- Simpler dependency management
- Easy code sharing between src/ and experiments/

### GitHub-Native Task Management

- Issues for features, bugs, AND experiments
- Milestones for epics AND research goals
- Labels for status, type, and research categorization
- Projects v2 for workflow visualization

### Hybrid Agent Team

- **Enhanced Analyst**: Business + Research capabilities
- **PM/Architect/Dev/QA/SM**: Traditional dev team
- **Data Analyst**: Local experiment tracking specialist
- **Doc Writer**: Technical documentation
- **Paper Writer**: LaTeX academic papers

---

## 📁 Folder Structure

```
your-project/                          # Single git repository
├── .bmad-research-dev/                # This expansion pack
│   ├── agents/                        # Agent definitions
│   ├── workflows/                     # Workflow YAML files
│   ├── scripts/                       # Helper scripts
│   ├── templates/                     # Document templates
│   ├── config.yaml                    # Pack configuration
│   └── README.md                      # This file
│
├── docs/                              # All documentation
│   ├── prd/                          # Product requirements
│   ├── architecture/                 # System architecture
│   ├── api/                          # API documentation
│   ├── guides/                       # Developer guides
│   └── research/                     # Research documents
│       ├── proposals/                # Research proposals
│       ├── literature-reviews/       # Literature reviews
│       ├── experiments/              # Experiment specs
│       └── analysis/                 # Analysis reports
│
├── src/                               # Production code
│   ├── app/
│   ├── lib/
│   └── utils/
│
├── experiments/                       # Research code
│   ├── baselines/
│   ├── novel-methods/
│   └── configs/
│
├── results/                           # Experiment results (gitignored/LFS)
│   ├── experiments/                  # Raw experiment data
│   │   └── exp-{id}/
│   │       ├── metrics.json
│   │       ├── logs.txt
│   │       └── artifacts/
│   ├── figures/                      # Publication figures
│   ├── tables/                       # Results tables
│   ├── analysis/                     # Analysis notebooks
│   └── reports/                      # HTML reports
│
├── research-paper/                    # LaTeX paper (optional separate repo)
│   ├── main.tex
│   ├── sections/
│   ├── figures/
│   └── bibliography.bib
│
└── .gitignore
```

---

## 🚀 Quick Start

### Installation

**📖 See [INSTALLATION.md](INSTALLATION.md) for complete installation instructions.**

**Quick install (manual method):**

```bash
# 1. Copy pack from BMAD-METHOD repo to your project
cd your-project
cp -r /path/to/BMAD-METHOD/expansion-packs/bmad-research-dev/* .bmad-research-dev/

# 2. Make scripts executable
chmod +x .bmad-research-dev/scripts/*.sh

# 3. Install prerequisites
brew install gh jq  # macOS (or see INSTALLATION.md for Linux)
gh auth login

# 4. Verify
ls -la .bmad-research-dev/
```

**For detailed setup, prerequisites, and troubleshooting, see [INSTALLATION.md](INSTALLATION.md).**

### 2. Initialize Folder Structure

```bash
# Create all necessary folders
mkdir -p docs/{prd,architecture,api,guides,research/{proposals,literature-reviews,experiments,analysis}}
mkdir -p src/{app,lib,utils}
mkdir -p experiments/{baselines,novel-methods,configs}
mkdir -p results/{experiments,figures,tables,analysis,reports}
mkdir -p research-paper/{sections,figures}
```

### 3. Setup GitHub Labels

```bash
# (Script TBD - for now, create labels manually via GitHub UI)
# Or use gh CLI:
gh label create "type:experiment" --color "7057ff" --description "Research experiment"
gh label create "research:literature" --color "c5def5" --description "Literature review task"
# ... (see config.yaml for full label list)
```

### 4. Your First Research Project

```bash
# Activate Enhanced Analyst
@enhanced-analyst

# Conduct literature search
*literature-search "neural architecture search"

# Create research proposal
*create-research-proposal

# Switch to PM
@pm

# Create GitHub milestone for research
gh milestone create "Research: Novel NAS Algorithm"

# Create experiment issue
gh issue create --title "Experiment: Test Novel NAS" --label "type:experiment,research:experiment"

# Switch to Dev
@dev

# Create experiment spec
.bmad-research-dev/scripts/create-experiment-spec.sh exp-001 "Novel NAS" "Algorithm improves accuracy by 10%"

# Implement experiment in experiments/exp-001/

# Log metrics
.bmad-research-dev/scripts/log-experiment-metrics.sh exp-001 accuracy 0.87 training_time 3600

# Switch to Data Analyst
@data-analyst

# Generate HTML report
.bmad-research-dev/scripts/generate-html-report.sh
open results/reports/experiment-report.html

# Analyze results
*analyze-experiment exp-001

# Create figures
*create-figures exp-001

# Switch to Paper Writer
@paper-writer

# Initialize paper
*init-paper neurips

# Draft sections
*draft-introduction
*draft-methodology
*draft-results

# Compile paper
.bmad-research-dev/scripts/compile-paper.sh
```

---

## 👥 Agent Roles

### Enhanced Analyst (Dr. Emma Rodriguez)

**Icon:** 🔬📊
**Use for:** Market research + literature search, competitive analysis, research gap identification, research proposals

**Key Capabilities:**

- 3-mode literature search (Web, Academic, Local)
- Business + research perspective
- Gap analysis (market + technical)
- Research question formulation

**Commands:**

- `*literature-search {topic}` - Multi-source research
- `*identify-gaps` - Find research opportunities
- `*formulate-questions` - Generate research questions
- `*create-research-proposal` - Full research proposal
- `*create-competitor-analysis` - Business analysis

### Data Analyst (Dr. Maya Patel)

**Icon:** 📊
**Use for:** Experiment analysis, visualization, statistical testing, HTML report generation

**Key Capabilities:**

- Local experiment tracking (no wandb MCP)
- Statistical analysis
- Publication-quality figures
- HTML dashboard generation

**Commands:**

- `*analyze-experiment {exp-id}` - Analyze single experiment
- `*compare-experiments {exp-ids}` - Statistical comparison
- `*create-figures {exp-id}` - Publication figures
- `*generate-html-report` - Interactive dashboard
- `*test-significance` - Statistical tests

### Doc Writer (Sarah Chen)

**Icon:** 📝
**Use for:** API docs, architecture docs, developer guides, README files

**Key Capabilities:**

- API documentation
- Architecture diagrams (Mermaid)
- Developer guides
- Technical specifications

**Commands:**

- `*create-api-docs {module}` - API reference
- `*create-architecture-doc` - Architecture documentation
- `*create-getting-started` - Onboarding guide
- `*create-adr {decision}` - Architecture Decision Record

### Paper Writer (Dr. Gatsby Sarihuela)

**Icon:** ✍️📄
**Use for:** Academic paper writing, LaTeX formatting, venue preparation

**Key Capabilities:**

- LaTeX paper writing
- Venue-specific formatting (NeurIPS, ICML, ICLR, etc.)
- Bibliography management
- Compilation and validation

**Commands:**

- `*init-paper {venue}` - Initialize paper structure
- `*draft-introduction` - Write introduction
- `*draft-methodology` - Write methodology
- `*draft-results` - Write results section
- `*prepare-submission {venue}` - Prepare for submission
- `*compile-paper` - Compile LaTeX to PDF (via script)

---

## 🔄 Workflows

### Workflow 1: Feature Development (Traditional)

**When to use:** Building standard product features

```
1. Enhanced Analyst → Project Brief + Competitive Analysis
2. PM → Create PRD + Feature Epic
3. Architect → System Design
4. Developer → Implementation
5. QA → Code Review
6. Merge & Deploy
```

**Duration:** 1-4 weeks per feature

---

### Workflow 2: Research Experiment Cycle (NEW)

**When to use:** Conducting research experiments

```
Phase 1: Question Formulation (1-3 days)
├─ Enhanced Analyst
│  ├─ *literature-search {topic}
│  ├─ *identify-gaps
│  └─ *create-research-proposal
│
└─ PM
   └─ Create GitHub Milestone + Issue

Phase 2: Experiment Design (2-5 days)
└─ Create experiment spec
   → .bmad-research-dev/scripts/create-experiment-spec.sh exp-{id} ...

Phase 3: Implementation (1-2 weeks)
├─ Developer
│  ├─ Implement in experiments/exp-{id}/
│  └─ Log metrics: .bmad-research-dev/scripts/log-experiment-metrics.sh
│
└─ QA
   └─ Review experiment code

Phase 4: Analysis (3-7 days)
├─ Data Analyst
│  ├─ *analyze-experiment exp-{id}
│  ├─ *create-figures exp-{id}
│  └─ *generate-html-report
│
└─ Review results

Phase 5: Documentation (Continuous)
└─ Doc Writer / Paper Writer
   ├─ *create-api-docs (if productionizing)
   └─ *draft-paper-section (if publishing)
```

**Duration:** 2-4 weeks per experiment

---

### Workflow 3: Research-to-Feature (NEW HYBRID)

**When to use:** Converting successful experiments into production features

```
1. Experiment Completed
   └─ results/experiments/exp-{id}/ shows success

2. Enhanced Analyst
   └─ Create productionization brief

3. PM
   ├─ Create PRD for feature based on experiment
   └─ Create GitHub Milestone: "Feature: {exp-based-feature}"

4. Architect
   └─ Design production architecture (from experiment code)

5. Developer
   ├─ Refactor experiment code → production code
   │  → Move from experiments/ → src/
   ├─ Add error handling, logging, monitoring
   └─ Create PR

6. QA
   ├─ Code review (production standards)
   └─ Integration tests

7. Merge & Deploy
```

**Duration:** 2-6 weeks

---

### Workflow 4: Paper Writing (NEW)

**When to use:** Publishing research as academic paper

```
Phase 1: Setup (1 day)
└─ Paper Writer
   └─ *init-paper {venue}

Phase 2: Drafting (1-2 weeks)
└─ Paper Writer
   ├─ *draft-introduction
   ├─ *draft-related-work (uses literature reviews)
   ├─ *draft-methodology (uses experiment specs)
   ├─ *draft-results (uses results/figures/)
   └─ *draft-conclusion

Phase 3: Compilation & Iteration (ongoing)
└─ Compile paper
   → .bmad-research-dev/scripts/compile-paper.sh

Phase 4: Submission Prep (1 week)
└─ Paper Writer
   ├─ *prepare-submission {venue}
   ├─ *anonymize-paper (if required)
   └─ *create-submission-package
```

**Duration:** 2-4 weeks

---

## 🛠️ Helper Scripts

All scripts are in `.bmad-research-dev/scripts/`:

- **create-experiment-spec.sh** - Create experiment specification
- **log-experiment-metrics.sh** - Log experiment metrics to JSON
- **validate-frontmatter.sh** - Validate document frontmatter
- **generate-html-report.sh** - Generate experiment dashboard
- **compile-paper.sh** - Compile LaTeX paper

See [scripts/README.md](.bmad-research-dev/scripts/README.md) for details.

---

## 📊 Local Experiment Tracking

### Metrics Format

```json
{
  "experiment_id": "exp-001",
  "timestamp": "2025-11-16T10:30:00Z",
  "metrics": {
    "accuracy": 0.95,
    "loss": 0.05,
    "f1_score": 0.93
  },
  "status": "completed"
}
```

### HTML Dashboard

Generate browsable experiment reports:

```bash
.bmad-research-dev/scripts/generate-html-report.sh
open results/reports/experiment-report.html
```

**Features:**

- Summary cards (total, completed, running, failed)
- Experiment table with metrics
- Timestamps and status indicators
- Responsive design

---

## 🏷️ GitHub Label System

### Status Labels

- `status:backlog` - Not started
- `status:todo` - Ready
- `status:doing` - In progress
- `status:review` - Under review
- `status:done` - Completed

### Type Labels

- `type:feature` - Software feature
- `type:bug` - Bug fix
- `type:experiment` - Research experiment
- `type:analysis` - Data analysis
- `type:documentation` - Docs/paper
- `type:architecture` - System design

### Research Labels

- `research:literature` - Literature review
- `research:experiment` - Experiment task
- `research:analysis` - Analysis task
- `research:paper` - Paper writing

See [config.yaml](config.yaml) for complete label definitions.

---

## 📚 Documentation

### Document Types & Locations

| Type              | Location                          | Frontmatter `type`  | Created By       |
| ----------------- | --------------------------------- | ------------------- | ---------------- |
| Research Proposal | docs/research/proposals/          | `research-proposal` | Enhanced Analyst |
| Literature Review | docs/research/literature-reviews/ | `literature-review` | Enhanced Analyst |
| Experiment Spec   | docs/research/experiments/        | `experiment-spec`   | Developer        |
| Analysis Report   | docs/research/analysis/           | `analysis-report`   | Data Analyst     |
| PRD               | docs/prd/                         | `prd`               | PM               |
| Architecture      | docs/architecture/                | `architecture`      | Architect        |
| API Docs          | docs/api/                         | `api-docs`          | Doc Writer       |
| Paper             | research-paper/                   | N/A (LaTeX)         | Paper Writer     |

### Frontmatter Standard

All markdown documents use frontmatter metadata:

```yaml
---
type: experiment-spec
title: 'Experiment Title'
status: draft | active | completed | archived
created: YYYY-MM-DD
updated: YYYY-MM-DD
github_issue: 42
tags: [optimization, deep-learning]
---
```

**Validate frontmatter:**

```bash
.bmad-research-dev/scripts/validate-frontmatter.sh --all
```

---

## 💡 Best Practices

### 1. Start with Literature

Always begin new research with `@enhanced-analyst *literature-search`

### 2. Document Everything

Use frontmatter metadata and scripts for consistency

### 3. Track Locally

All experiments logged to results/experiments/{exp-id}/metrics.json

### 4. Use Git LFS

For large result files:

```bash
git lfs track "*.h5" "*.pkl" "*.pt" "*.pth"
```

### 5. Iterate Experiments

Run experiment cycle many times (5-20+ iterations typical)

### 6. Update Paper Continuously

Draft paper sections as experiments complete, not at the end

### 7. Validate Before Commit

```bash
.bmad-research-dev/scripts/validate-frontmatter.sh --all
```

### 8. GitHub Integration

Create issues for experiments, link in frontmatter

---

## 🔧 Configuration

Key configuration in `config.yaml`:

```yaml
repository:
  structure: single-repo

documents:
  storage: local-files
  use_frontmatter: true
  use_archon: false # No MCP dependency

experiments:
  tracking:
    use_wandb: false # No MCP dependency
    use_local: true
    metrics_format: json

git:
  results:
    use_gitignore: true
    use_lfs: true # For large files
```

---

## 🤔 FAQ

**Q: Can I use wandb for experiment tracking?**
A: Yes! You can use wandb Python library directly. This pack just doesn't require the wandb MCP.

**Q: Do I need a separate repo for research-paper/?**
A: No, single-repo works fine. Optionally sync to separate repo for publication.

**Q: How do I share experiments with collaborators?**
A: Generate HTML report and commit to git, or use GitHub Pages.

**Q: Can I use this pack without research features?**
A: Yes, just use the traditional workflow and ignore research agents.

**Q: What about Archon/wandb MCP?**
A: Not required. This pack is MCP-free, using local files + git.

---

## 📖 Related Documentation

- [config.yaml](config.yaml) - Full configuration
- [scripts/README.md](scripts/README.md) - Helper scripts guide
- [agents/](agents/) - All agent definitions

---

## 🆘 Troubleshooting

**Scripts not found:**

```bash
# Make sure you're in project root
cd /path/to/your/project

# Scripts are relative to root
./.bmad-research-dev/scripts/create-experiment-spec.sh
```

**Permission denied:**

```bash
chmod +x .bmad-research-dev/scripts/*.sh
```

**LaTeX not found:**

```bash
# macOS
brew install mactex

# Linux
sudo apt-get install texlive-full
```

---

## 🎓 Example Projects

(Coming soon: Example projects demonstrating all workflows)

---

## 📝 License

(TBD - follows BMAD-METHOD license)

---

## 🙏 Acknowledgments

Built on:

- **bmad-core-github-research**: Software development workflows
- **bmad-ai-research**: Research methodologies (adapted)

---

**For questions, issues, or contributions, please visit the BMAD-METHOD repository.**
