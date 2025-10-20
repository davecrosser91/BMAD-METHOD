# BMAD-Core-GitHub Installation Guide

## Overview

This guide explains how to install and use the **bmad-core-github** expansion pack, which provides a complete GitHub-native implementation of the BMAD Method using GitHub Issues, Milestones, Labels, and Pull Requests for task management.

---

## Installation Methods

### Method 1: NPX Install (Recommended - Easiest)

Install directly into your project using the BMAD installer:

```bash
# Navigate to your project directory
cd your-project

# Install with bmad-core-github expansion pack
npx @dkreuzer/bmad-method-ai-research install -e bmad-core-github
```

The installer will:

- ✅ Install the bmad-core framework (if not already installed)
- ✅ Install the bmad-core-github expansion pack
- ✅ Set up the folder structure (`.bmad-core/`, `docs/`, etc.)
- ✅ Configure for your IDE (Claude Code, Cursor, etc.)

### Method 2: Manual Installation from Git

If you've cloned the BMAD-METHOD repository:

```bash
# From the BMAD-METHOD root
npm run install:bmad

# When prompted, select:
# - Install type: "Full installation"
# - Expansion packs: "bmad-core-github"
# - Target directory: (your project path)
```

### Method 3: Direct Git Clone (For Development)

Clone the expansion pack directly:

```bash
cd your-project
git clone https://github.com/davecrosser91/BMAD-METHOD.git /tmp/bmad
cp -r /tmp/bmad/expansion-packs/bmad-core-github .bmad-core/expansion-packs/
```

---

## Post-Installation Setup

### 1. Install GitHub CLI

The GitHub CLI (`gh`) is required for GitHub integration:

#### macOS

```bash
brew install gh
```

#### Linux (Ubuntu/Debian)

```bash
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
sudo apt update
sudo apt install gh
```

#### Windows

```powershell
winget install GitHub.cli
```

#### Verify Installation

```bash
gh --version
# Should output: gh version 2.x.x
```

### 2. Authenticate with GitHub

```bash
gh auth login
```

Follow the prompts:

1. Choose "GitHub.com"
2. Choose "HTTPS"
3. Authenticate via browser
4. Done!

Test authentication:

```bash
gh auth status
# Should show: ✓ Logged in to github.com
```

### 3. Setup GitHub Labels

Create the required labels in your repository:

```bash
# Make the setup script executable (if not already)
chmod +x .bmad-core/expansion-packs/bmad-core-github/scripts/setup-labels.sh

# Run the setup script
.bmad-core/expansion-packs/bmad-core-github/scripts/setup-labels.sh
```

This creates all necessary labels:

- **Status**: status:backlog, status:todo, status:doing, status:review, status:done
- **Types**: type:epic, type:story, type:task, type:bug
- **Priority**: priority:p0, priority:p1, priority:p2, priority:p3
- **Size**: size:xs, size:s, size:m, size:l, size:xl

### 4. Setup Automated QA (Optional but Recommended)

#### Get Anthropic API Key

1. Go to https://console.anthropic.com/
2. Create account or log in
3. Go to "API Keys"
4. Create new key
5. Copy the key (starts with `sk-ant-...`)

#### Add to GitHub Secrets

```bash
# Set the secret
gh secret set ANTHROPIC_API_KEY
# Paste your API key when prompted
```

#### Verify Secret

```bash
gh secret list
# Should show: ANTHROPIC_API_KEY
```

### 5. Setup GitHub Actions (Optional)

Copy the GitHub Actions workflows to your repository:

```bash
# Create workflows directory if it doesn't exist
mkdir -p .github/workflows

# Copy the automated QA workflow
cp .bmad-core/expansion-packs/bmad-core-github/workflows/automated-qa-review.yml .github/workflows/

# Commit the workflow
git add .github/workflows/automated-qa-review.yml
git commit -m "chore: Add BMAD automated QA workflow"
git push
```

---

## Verification

Verify your installation is complete:

```bash
# Check that agents are installed
ls .bmad-core/expansion-packs/bmad-core-github/agents/
# Should show: analyst.md, pm.md, architect.md, dev.md, qa.md, sm.md, po.md, ux-expert.md

# Check that GitHub CLI is authenticated
gh auth status
# Should show: ✓ Logged in to github.com

# Check that labels are created
gh label list
# Should show all BMAD labels (status:*, type:*, priority:*, size:*)
```

---

## Usage

### Starting Your First Project

1. **Activate the Analyst Agent**

   In Claude Code or your IDE:

   ```
   Please act as the Analyst agent from .bmad-core/expansion-packs/bmad-core-github/agents/analyst.md
   ```

2. **Create Project Brief**

   ```
   *create-project-brief
   ```

   Follow the prompts to create your initial project brief.

3. **Switch to PM Agent**

   ```
   Please switch to the PM agent from .bmad-core/expansion-packs/bmad-core-github/agents/pm.md
   ```

4. **Create PRD**

   ```
   *create-prd
   ```

5. **Create Epics and Stories**

   ```
   Create epics and stories from the PRD using GitHub Milestones and Issues
   ```

   The PM will:
   - Create GitHub Milestones for each epic
   - Create GitHub Issues for each user story
   - Add appropriate labels (type:story, status:backlog, priority:\*, size:\*)
   - Link stories to their epic milestones

6. **Plan Your Sprint**

   ```
   Please switch to the Scrum Master agent from .bmad-core/expansion-packs/bmad-core-github/agents/sm.md
   ```

   Then:

   ```
   *sprint-planning
   ```

7. **Start Development**

   ```
   Please switch to the Developer agent from .bmad-core/expansion-packs/bmad-core-github/agents/dev.md
   ```

   Then:

   ```
   *next-task
   ```

---

## Configuration

### Customize Config

Edit `.bmad-core/expansion-packs/bmad-core-github/config.yaml` to customize:

```yaml
# Task management
github:
  tasks:
    status_flow:
      - backlog
      - todo
      - doing
      - review
      - done

# QA settings
qa:
  automated_review:
    enabled: true
    auto_merge_on_pass: false
    model: 'claude-sonnet-4-20250514'

# Dev Team Lead
dev_team_lead:
  default_mode: 'in-context' # or "parallel"
  parallel:
    max_developers: 5
    max_qa_reviewers: 3
```

---

## Troubleshooting

### "gh: command not found"

→ GitHub CLI not installed. Go back to Step 1: Install GitHub CLI.

### "gh auth status" shows not logged in

→ Run `gh auth login` again.

### Labels not created

→ Run `.bmad-core/expansion-packs/bmad-core-github/scripts/setup-labels.sh` manually.

### Automated QA not working

→ Check `ANTHROPIC_API_KEY` secret is set: `gh secret list`

### Permission denied on scripts

→ Make scripts executable: `chmod +x .bmad-core/expansion-packs/bmad-core-github/scripts/*.sh`

---

## Next Steps

- **[Read the Quick Start Guide](QUICKSTART.md)** - 10-minute walkthrough
- **[Read the Full Documentation](README.md)** - Complete feature reference
- **[Explore Agent Files](agents/)** - Learn what each agent can do
- **[Check the Changelog](CHANGELOG.md)** - See what's new in v1.0.0

---

## Support

- **Issues**: https://github.com/davecrosser91/BMAD-METHOD/issues
- **Discussions**: https://github.com/davecrosser91/BMAD-METHOD/discussions
- **Discord**: https://discord.gg/gk8jAdXWmj

---

**Ready to build?** Start with the Analyst agent! 🚀
