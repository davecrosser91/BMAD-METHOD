# BMAD Research-Dev Pack - Quick Start Guide

Get up and running with the research-dev hybrid pack in **under 10 minutes**.

> **📖 Prerequisites:** Make sure you've installed the pack first! See [INSTALLATION.md](INSTALLATION.md) for complete setup instructions, including prerequisites (gh CLI, jq, etc.).

---

## ⚡ 5-Minute Setup

**Assumes you've already installed the pack via [INSTALLATION.md](INSTALLATION.md).**

### 1. Initialize Folder Structure

```bash
# Navigate to your project
cd your-project

# Create folder structure
mkdir -p docs/{prd,architecture,api,guides,research/{proposals,literature-reviews,experiments,analysis}}
mkdir -p src/{app,lib,utils}
mkdir -p experiments/{baselines,novel-methods,configs}
mkdir -p results/{experiments,figures,tables,analysis,reports}
mkdir -p research-paper/{sections,figures}

# Make scripts executable
chmod +x .bmad-research-dev/scripts/*.sh
```

### 2. Create .gitignore for Results

```bash
cat > .gitignore <<'EOF'
# Results (use Git LFS for important files)
results/experiments/*/artifacts/
results/experiments/*/logs.txt
*.pyc
__pycache__/
node_modules/
.DS_Store

# Keep metrics and configs
!results/experiments/*/metrics.json
!results/experiments/*/config.json
EOF
```

### 3. (Optional) Setup Git LFS for Large Files

```bash
# Install Git LFS
# macOS: brew install git-lfs
# Linux: apt-get install git-lfs

# Initialize
git lfs install

# Track large file types
git lfs track "*.h5" "*.pkl" "*.pt" "*.pth" "*.ckpt" "*.safetensors" "*.bin"
git add .gitattributes
```

### 4. (Optional) Setup GitHub Labels

```bash
# Create research-specific labels
gh label create "type:experiment" --color "7057ff" --description "Research experiment"
gh label create "type:analysis" --color "8b5cf6" --description "Data analysis"
gh label create "research:experiment" --color "7057ff" --description "Experiment task"
gh label create "research:analysis" --color "8b5cf6" --description "Analysis task"
gh label create "research:paper" --color "1d76db" --description "Paper writing"

# Or use full script (when available)
# .bmad-research-dev/scripts/setup-github-labels.sh
```

**Done!** You're ready to start.

---

## 🚀 Your First Experiment (10 Minutes)

### Scenario: Test a New Optimization Algorithm

#### Step 1: Literature Search (2 min)

```bash
# Activate Enhanced Analyst
@enhanced-analyst

# Search literature
*literature-search "optimization algorithms for neural networks"

# This creates: docs/research/literature-reviews/review-optimization-algorithms.md
```

#### Step 2: Create Research Proposal (3 min)

```bash
# Still as Enhanced Analyst
*identify-gaps
*create-research-proposal

# This creates: docs/research/proposals/proposal-001.md
# Edit the file to add your specific hypothesis
```

#### Step 3: Create Experiment Spec (1 min)

```bash
# Create experiment specification
.bmad-research-dev/scripts/create-experiment-spec.sh \
  exp-001 \
  "Novel Adam Variant" \
  "Modified Adam optimizer converges 20% faster"

# This creates: docs/research/experiments/experiment-exp-001.md
# Edit the file to add methodology details
```

#### Step 4: Create GitHub Milestone & Issue (1 min)

```bash
# Create milestone
gh milestone create "Experiment: Novel Adam Variant"

# Create experiment issue
gh issue create \
  --title "Experiment: Test Novel Adam Variant" \
  --body "**Spec:** docs/research/experiments/experiment-exp-001.md

**Hypothesis:** Modified Adam converges 20% faster

**Tasks:**
- [ ] Implement baseline (standard Adam)
- [ ] Implement novel variant
- [ ] Run benchmarks
- [ ] Statistical analysis" \
  --label "type:experiment,research:experiment,priority:p1,size:l" \
  --milestone "Experiment: Novel Adam Variant"
```

#### Step 5: Implement Experiment (varies - could be hours to days)

```bash
# Activate Developer
@dev

# Implement experiment
*implement-experiment exp-001

# This creates:
# experiments/exp-001/README.md
# experiments/exp-001/baseline_adam.py
# experiments/exp-001/novel_adam.py
# experiments/exp-001/run.sh
# experiments/exp-001/config.yaml
```

#### Step 6: Run Experiment & Log Metrics (2 min)

```bash
# Run the experiment
cd experiments/exp-001
./run.sh

# Log metrics
.bmad-research-dev/scripts/log-experiment-metrics.sh \
  exp-001 \
  accuracy 0.89 \
  convergence_time 450 \
  final_loss 0.08

# This creates: results/experiments/exp-001/metrics.json
```

#### Step 7: Analyze Results (varies)

```bash
# Activate Data Analyst
@data-analyst

# Analyze experiment
*analyze-experiment exp-001

# Create figures
*create-figures exp-001

# Generate HTML report
*generate-html-report

# Open report
open results/reports/experiment-report.html
```

**Done!** You've completed your first experiment.

---

## 🎯 Common Workflows

### Workflow 1: Quick Experiment

**Use when:** Testing a quick hypothesis

```bash
# 1. Create spec
.bmad-research-dev/scripts/create-experiment-spec.sh exp-002 "Title" "Hypothesis"

# 2. Implement (manually write code in experiments/exp-002/)

# 3. Run and log
# ... run your code ...
.bmad-research-dev/scripts/log-experiment-metrics.sh exp-002 metric1 value1 metric2 value2

# 4. Generate report
.bmad-research-dev/scripts/generate-html-report.sh
open results/reports/experiment-report.html
```

### Workflow 2: Experiment → Production Feature

**Use when:** Successful experiment needs to become a feature

```bash
# 1. Review experiment results
@data-analyst
*analyze-experiment exp-001
# Results look good!

# 2. Create productionization plan
@enhanced-analyst
# Create productionization brief

# 3. Create PRD
@pm
*create-prd
*create-productionization-epic

# 4. Refactor code
@dev
*productionize-experiment exp-001
# Refactors experiments/exp-001/ → src/lib/

# 5. QA review
@qa
*review-code

# 6. Deploy
@dev
*create-pr
# Merge and deploy
```

### Workflow 3: Write Paper from Experiments

**Use when:** Publishing research

```bash
# 1. Collect all experiment results
@data-analyst
*generate-html-report  # Review all experiments

# 2. Initialize paper
@paper-writer
*init-paper neurips

# 3. Draft sections
*draft-introduction  # References proposals and literature reviews
*draft-methodology   # References experiment specs
*draft-results       # Uses results/figures/ and results/tables/

# 4. Compile
.bmad-research-dev/scripts/compile-paper.sh
open research-paper/main.pdf
```

---

## 📋 Cheat Sheet

### Agents & When to Use Them

| Agent               | Icon | Use For                                    |
| ------------------- | ---- | ------------------------------------------ |
| `@enhanced-analyst` | 🔬📊 | Literature search, gap analysis, proposals |
| `@pm`               | 📋   | Create epics, milestones, issues, PRDs     |
| `@dev`              | 💻   | Implement features and experiments         |
| `@qa`               | ✅   | Code review, experiment validation         |
| `@data-analyst`     | 📊   | Analyze results, create figures, reports   |
| `@doc-writer`       | 📝   | API docs, architecture docs, guides        |
| `@paper-writer`     | ✍️   | LaTeX papers, academic writing             |

### Helper Scripts

| Script                      | Use                             |
| --------------------------- | ------------------------------- |
| `create-experiment-spec.sh` | Create experiment specification |
| `log-experiment-metrics.sh` | Log metrics to JSON             |
| `validate-frontmatter.sh`   | Validate document metadata      |
| `generate-html-report.sh`   | Create experiment dashboard     |
| `compile-paper.sh`          | Compile LaTeX paper             |

### File Locations

| Type            | Location          |
| --------------- | ----------------- |
| Production code | `src/`            |
| Experiments     | `experiments/`    |
| Results         | `results/`        |
| Research docs   | `docs/research/`  |
| Papers          | `research-paper/` |

---

## 🔧 Troubleshooting

### "Script not found"

```bash
# Make sure you're in project root
pwd  # Should show your project root

# Scripts are relative to root
./expansion-packs/bmad-research-dev/scripts/create-experiment-spec.sh
# or if installed directly:
./.bmad-research-dev/scripts/create-experiment-spec.sh
```

### "Permission denied"

```bash
chmod +x .bmad-research-dev/scripts/*.sh
```

### "jq: command not found"

```bash
# macOS
brew install jq

# Linux
sudo apt-get install jq
```

### "pdflatex: command not found"

```bash
# macOS
brew install mactex

# Linux
sudo apt-get install texlive-full
```

---

## 📖 Next Steps

- **Full Documentation:** See [README.md](README.md)
- **Workflows:** See [workflows/](workflows/) directory
- **Scripts:** See [scripts/README.md](scripts/README.md)
- **Example Project:** (Coming soon)

---

## 💡 Pro Tips

1. **Validate frontmatter regularly**

   ```bash
   .bmad-research-dev/scripts/validate-frontmatter.sh --all
   ```

2. **Generate HTML reports often**

   ```bash
   .bmad-research-dev/scripts/generate-html-report.sh
   ```

   Keep track of all your experiments in one place.

3. **Use GitHub issues for everything**
   - Features: `type:feature`
   - Experiments: `type:experiment`
   - Analysis: `type:analysis`
   - Papers: `type:documentation, research:paper`

4. **Keep experiment code**
   - Never delete experiments/ folder
   - Reference in production code
   - Valuable for reproducibility

5. **Iterate experiments**
   - Create exp-001-v2, exp-001-v3
   - Keep all versions
   - Compare across iterations

---

**Questions?** Check the [README.md](README.md) or create an issue!
