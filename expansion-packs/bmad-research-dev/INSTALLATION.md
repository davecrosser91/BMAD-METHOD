# BMAD Research-Dev Pack - Installation Guide

## Overview

This guide explains how to install and use the **bmad-research-dev** expansion pack in your project.

**🎉 UNIFIED EXPANSION PACK:** This pack now contains:

- ✅ **Complete bmad-core-github foundation** (SDLC, GitHub Projects v2, Story Workflow)
- ✅ **Research extensions** (Experiments, Papers, Analysis)
- ✅ **16 specialized agents** working together
- ✅ **Automated GitHub workflow** status management

**Important:** This pack is stored in the repository as `expansion-packs/bmad-research-dev/` but installs to your project as `.bmad-research-dev/` (with dot prefix).

---

## 📋 Prerequisites

Before installing, ensure you have:

- **Git** installed
- **GitHub CLI (`gh`)** installed and authenticated
- **jq** installed (for JSON processing in scripts)
- **(Optional) LaTeX** installed (for paper writing)

### Install Prerequisites

#### macOS

```bash
# GitHub CLI
brew install gh

# jq
brew install jq

# LaTeX (optional, for paper writing)
brew install mactex
```

#### Linux (Ubuntu/Debian)

```bash
# GitHub CLI
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
sudo apt update
sudo apt install gh

# jq
sudo apt-get install jq

# LaTeX (optional)
sudo apt-get install texlive-full
```

### Authenticate GitHub CLI

```bash
gh auth login
# Follow prompts to authenticate
```

---

## 🚀 Installation Methods

### Method 1: Manual Installation from BMAD-METHOD Repository (Current)

**This is the current working method since the pack isn't published to npm yet.**

#### Step 1: Clone or Navigate to BMAD-METHOD Repository

```bash
# If you don't have it, clone the BMAD-METHOD repo
git clone https://github.com/YOUR-ORG/BMAD-METHOD.git /tmp/bmad-method

# Or if you already have it
cd /path/to/BMAD-METHOD
```

#### Step 2: Copy Pack to Your Project

```bash
# Navigate to your project
cd /path/to/your-project

# Create expansion pack directory in your project
mkdir -p .bmad-research-dev

# Copy the pack
cp -r /path/to/BMAD-METHOD/expansion-packs/bmad-research-dev/* .bmad-research-dev/

# Make scripts executable
chmod +x .bmad-research-dev/scripts/*.sh
```

#### Step 3: Verify Installation

```bash
# Check that the pack is installed
ls -la .bmad-research-dev/

# You should see:
# agents/
# workflows/
# scripts/
# templates/
# config.yaml
# README.md
# etc.
```

---

### Method 2: NPX Install (Future - Not Yet Available)

**This will be available once the pack is published to npm.**

```bash
# Future command (not yet working)
npx @dkreuzer/bmad-method-ai-research install -e bmad-research-dev
```

---

### Method 3: Symlink for Development

**If you're developing the pack and want live updates:**

```bash
cd your-project

# Create symlink instead of copying
ln -s /path/to/BMAD-METHOD/expansion-packs/bmad-research-dev .bmad-research-dev

# Make scripts executable
chmod +x .bmad-research-dev/scripts/*.sh
```

**Note:** With symlinks, changes in the BMAD-METHOD repo immediately reflect in your project.

---

## 📁 Post-Installation Setup

### 1. Create Project Folder Structure

```bash
# Navigate to your project
cd your-project

# Create all necessary folders
mkdir -p docs/{prd,architecture,api,guides,research/{proposals,literature-reviews,experiments,analysis}}
mkdir -p src/{app,lib,utils}
mkdir -p experiments/{baselines,novel-methods,configs}
mkdir -p results/{experiments,figures,tables,analysis,reports}
mkdir -p research-paper/{sections,figures}
```

### 2. Create .gitignore

```bash
cat > .gitignore <<'EOF'
# Results (use Git LFS for important files)
results/experiments/*/artifacts/
results/experiments/*/logs.txt

# Keep metrics and configs
!results/experiments/*/metrics.json
!results/experiments/*/config.json

# Python
*.pyc
__pycache__/
.env

# Node
node_modules/

# System
.DS_Store
EOF
```

### 3. (Optional) Setup Git LFS

```bash
# Install Git LFS
brew install git-lfs  # macOS
# or
sudo apt-get install git-lfs  # Linux

# Initialize in your repo
git lfs install

# Track large file types
git lfs track "*.h5" "*.pkl" "*.pt" "*.pth" "*.ckpt" "*.safetensors" "*.bin"

# Commit .gitattributes
git add .gitattributes
git commit -m "chore: setup Git LFS for large files"
```

### 4. Setup GitHub Labels

**Option A: Use Automated Script (RECOMMENDED)**

```bash
# This creates ALL labels (SDLC + Research)
.bmad-research-dev/scripts/setup-labels.sh
```

**Option B: Manual Creation**

```bash
# Research-specific labels
gh label create "type:experiment" --color "7057ff" --description "Research experiment"
gh label create "type:analysis" --color "8b5cf6" --description "Data analysis"
gh label create "research:literature" --color "c5def5" --description "Literature review"
gh label create "research:experiment" --color "7057ff" --description "Experiment task"
gh label create "research:analysis" --color "8b5cf6" --description "Analysis task"
gh label create "research:paper" --color "1d76db" --description "Paper writing"

# Standard SDLC labels
gh label create "type:epic" --color "3e4b9e" --description "Epic"
gh label create "type:story" --color "0075ca" --description "User story"
gh label create "type:task" --color "d4c5f9" --description "Task"
gh label create "type:bug" --color "d73a4a" --description "Bug fix"

gh label create "priority:p0" --color "b60205" --description "Critical"
gh label create "priority:p1" --color "d93f0b" --description "High"
gh label create "priority:p2" --color "fbca04" --description "Medium"
gh label create "priority:p3" --color "0e8a16" --description "Low"

gh label create "size:xs" --color "c2e0c6" --description "< 1 hour"
gh label create "size:s" --color "bfdadc" --description "1-4 hours"
gh label create "size:m" --color "fef2c0" --description "4-8 hours"
gh label create "size:l" --color "f9d0c4" --description "8-16 hours"
gh label create "size:xl" --color "ee9898" --description "> 16 hours"

gh label create "status:backlog" --color "ededed" --description "Backlog"
gh label create "status:todo" --color "fbca04" --description "Ready to start"
gh label create "status:doing" --color "0e8a16" --description "In progress"
gh label create "status:review" --color "d93f0b" --description "In review"
gh label create "status:done" --color "0e8a16" --description "Done"
```

### 5. (Optional) Setup GitHub Projects v2

**This enables automated status tracking (Backlog → Todo → In Progress → In Review → Done)**

```bash
# Initialize GitHub Projects v2
.bmad-research-dev/scripts/init-github-project.sh

# This will:
# 1. Create a new GitHub Project
# 2. Configure status field
# 3. Cache project IDs for fast access
# 4. Update .bmad-core/core-config.yaml
```

**Benefits:**

- Automatic status updates when agents work (Dev, QA)
- Visual kanban board in GitHub
- Better sprint planning

**Skip this if:**

- You prefer manual GitHub management
- You don't need automated workflow tracking

### 6. Verify Script Permissions

```bash
# Ensure all scripts are executable
chmod +x .bmad-research-dev/scripts/*.sh

# Test a script
.bmad-research-dev/scripts/validate-frontmatter.sh --help
```

---

## ✅ Verify Installation

Run through this checklist:

```bash
# 1. Check pack is installed
ls -la .bmad-research-dev/
# Should show: agents/, workflows/, scripts/, templates/, config.yaml

# 2. Check scripts are executable
ls -l .bmad-research-dev/scripts/
# Should show: -rwxr-xr-x (executable)

# 3. Check folders created
ls -la docs/research/
# Should show: proposals/, literature-reviews/, experiments/, analysis/

# 4. Check GitHub CLI works
gh --version
gh auth status

# 5. Check jq works
jq --version

# 6. (Optional) Check LaTeX works
pdflatex --version
```

---

## 🎯 Quick Start After Installation

**See [QUICKSTART.md](QUICKSTART.md)** for your first experiment tutorial.

Quick test:

```bash
# Create a test experiment spec
.bmad-research-dev/scripts/create-experiment-spec.sh \
  test-001 \
  "Test Experiment" \
  "This is a test hypothesis"

# Check it was created
cat docs/research/experiments/experiment-test-001.md

# Success! You're ready to go.
```

---

## 🔧 Troubleshooting

### Issue: "Script not found"

**Problem:** Running `.bmad-research-dev/scripts/...` gives "command not found"

**Solution:**

```bash
# Make sure you're in project root
pwd

# Should show /path/to/your-project
# NOT /path/to/BMAD-METHOD

# If in wrong directory, navigate to project
cd /path/to/your-project

# Then run script
./.bmad-research-dev/scripts/create-experiment-spec.sh
```

### Issue: "Permission denied"

**Problem:** Scripts won't run

**Solution:**

```bash
chmod +x .bmad-research-dev/scripts/*.sh
```

### Issue: "jq: command not found"

**Problem:** Scripts that use JSON fail

**Solution:**

```bash
# macOS
brew install jq

# Linux
sudo apt-get install jq
```

### Issue: "gh: command not found"

**Problem:** GitHub commands fail

**Solution:**

```bash
# macOS
brew install gh

# Linux (see full instructions above)
sudo apt-get install gh

# Then authenticate
gh auth login
```

### Issue: Pack files not found in Claude Code

**Problem:** Agents can't load files from pack

**Cause:** The pack is not in the expected location

**Solution:**

```bash
# Pack should be at: .bmad-research-dev/ (with dot)
# NOT: bmad-research-dev/ (without dot)

# Move if needed
mv bmad-research-dev .bmad-research-dev
```

### Issue: Scripts reference wrong paths

**Problem:** Scripts fail with "file not found"

**Cause:** Scripts expect to run from project root

**Solution:**

```bash
# ALWAYS run scripts from project root
cd /path/to/your-project
./.bmad-research-dev/scripts/create-experiment-spec.sh ...

# NOT from inside the pack directory
cd .bmad-research-dev  # ❌ Don't do this
./scripts/create-experiment-spec.sh  # ❌ Won't work
```

---

## 📖 Next Steps

After installation:

1. **Read QUICKSTART.md** - Get started in 10 minutes
2. **Read README.md** - Complete guide
3. **Try your first experiment** - Follow QUICKSTART tutorial
4. **Review workflows/** - Understand the processes

---

## 🆘 Getting Help

If you encounter issues:

1. Check this troubleshooting section
2. Read [README.md](README.md)
3. Check [QUICKSTART.md](QUICKSTART.md)
4. Create an issue in the BMAD-METHOD repository

---

## 📝 Important Notes

### Path References

In the pack documentation, you'll see references to:

- `.bmad-research-dev/` - This is where the pack is installed in YOUR project
- `{root}` in agent files - This resolves to `.bmad-research-dev/`
- Scripts should be run from your project root directory

### File Locations

| What          | Development (BMAD-METHOD repo)               | Usage (Your project)          |
| ------------- | -------------------------------------------- | ----------------------------- |
| Pack location | `expansion-packs/bmad-research-dev/`         | `.bmad-research-dev/`         |
| Scripts       | `expansion-packs/bmad-research-dev/scripts/` | `.bmad-research-dev/scripts/` |
| Agents        | `expansion-packs/bmad-research-dev/agents/`  | `.bmad-research-dev/agents/`  |

### Why the Dot Prefix?

The dot prefix (`.bmad-research-dev/`) follows Unix convention for application/config directories:

- Hidden by default (`ls` won't show it, but `ls -la` will)
- Keeps project root clean
- Standard pattern (like `.git/`, `.vscode/`, etc.)

---

**Installation complete!** 🎉 Continue to [QUICKSTART.md](QUICKSTART.md)
