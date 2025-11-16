# 🚀 BMAD-Core-GitHub-Research Quick Start Guide

**Get up and running in 10 minutes!**

## 💡 Easiest Method: Use the Setup Assistant

After installation, activate the **Setup Assistant** for guided setup with explanations:

```bash
# In Claude Code or your IDE
"Please act as the Setup Assistant from .bmad-core-github-research/agents/setup-assistant.md"

# Run the complete setup wizard
"*setup"
```

The Setup Assistant will walk you through everything step-by-step with explanations of why each step matters!

**Or follow the manual steps below:**

---

## Prerequisites Checklist

- [ ] GitHub account
- [ ] Git installed
- [ ] GitHub CLI (`gh`) installed
- [ ] Anthropic API key (for automated QA)

---

## Step 1: Install GitHub CLI (2 minutes)

### macOS

```bash
brew install gh
```

### Linux (Ubuntu/Debian)

```bash
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
sudo apt update
sudo apt install gh
```

### Windows

```powershell
winget install GitHub.cli
```

### Verify Installation

```bash
gh --version
# Should output: gh version 2.x.x
```

---

## Step 2: Authenticate GitHub CLI (1 minute)

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

---

## Step 3: Setup Your Project (5 minutes)

### Option A: New Project

```bash
# Create new repo
gh repo create my-project --public --clone
cd my-project

# Initialize BMAD
mkdir -p .bmad-core-github-research/agents .bmad-core-github-research/scripts
mkdir -p docs/{prd,architecture,specs,guides,notes}
mkdir -p .github/{workflows,ISSUE_TEMPLATE}

# Download BMAD files (choose one method):

# Method 1: Git clone
git clone https://github.com/your-org/bmad-method.git /tmp/bmad
cp -r /tmp/bmad/expansion-packs/bmad-core-github-research/* .bmad-core-github-research/
cp -r /tmp/bmad/expansion-packs/bmad-core-github-research/workflows/* .github/workflows/
cp -r /tmp/bmad/expansion-packs/bmad-core-github-research/issue-templates/* .github/ISSUE_TEMPLATE/

# Method 2: Manual download (download from GitHub releases)
# Then extract to your project
```

### Option B: Existing Project

```bash
cd your-existing-project

# Add BMAD structure
mkdir -p .bmad-core-github-research/agents .bmad-core-github-research/scripts
mkdir -p docs/{prd,architecture,specs,guides,notes}
mkdir -p .github/{workflows,ISSUE_TEMPLATE}

# Copy BMAD files (same as above)
```

---

## Step 4: Setup GitHub Labels (1 minute)

```bash
# Make setup script executable
chmod +x .bmad-core-github-research/scripts/setup-labels.sh

# Run it
.bmad-core-github-research/scripts/setup-labels.sh
```

This creates all necessary labels:

- status:backlog, status:todo, status:doing, status:review, status:done
- type:story, type:task, type:bug
- priority:p0, priority:p1, priority:p2, priority:p3
- size:xs, size:s, size:m, size:l, size:xl

---

## Step 5: Setup Automated QA (2 minutes)

### Get Anthropic API Key

1. Go to https://console.anthropic.com/
2. Create account or log in
3. Go to "API Keys"
4. Create new key
5. Copy the key (starts with `sk-ant-...`)

### Add to GitHub Secrets

```bash
# Set the secret
gh secret set ANTHROPIC_API_KEY
# Paste your API key when prompted
```

### Verify Secret

```bash
gh secret list
# Should show: ANTHROPIC_API_KEY
```

---

## Step 6: Commit Initial Setup

```bash
git add .
git commit -m "chore: Initialize BMAD-Core-GitHub-Research v2.5.1"
git push
```

---

## Step 7: Create Your First Epic (2 minutes)

### Using GitHub CLI

```bash
gh api repos/{owner}/{repo}/milestones \
  -f title="Epic: User Authentication" \
  -f description="Complete user authentication system" \
  -f due_on="2025-12-31T23:59:59Z"
```

### Or Using GitHub Web UI

1. Go to your repo on GitHub
2. Click "Issues" → "Milestones"
3. Click "New milestone"
4. Title: "Epic: User Authentication"
5. Description: "Complete user authentication system"
6. Click "Create milestone"

---

## Step 8: Create Your First Story (1 minute)

```bash
gh issue create \
  --title "Story: User can signup with email" \
  --body "As a new user, I want to signup with email/password, so that I can create an account.

## Acceptance Criteria
- [ ] POST /auth/signup endpoint created
- [ ] Email validation works
- [ ] Password hashing implemented
- [ ] User record created in database

## Implementation Tasks
- [ ] Create User model
- [ ] Create signup endpoint
- [ ] Add validation
- [ ] Write tests" \
  --label "type:story,status:backlog,priority:p1,size:m" \
  --milestone "Epic: User Authentication"
```

---

## Step 9: Test with Claude Code

### Start Development

```bash
# In Claude Code or your terminal
claude
```

### Activate Analyst Agent

```
User: "Please act as the Analyst agent from .bmad-core-github-research/agents/analyst.md"

Emma: Hi! I'm Emma, the Business Analyst. 📊
      Available commands: *help, *create-project-brief, *brainstorm

User: "*create-project-brief"
```

Follow the prompts!

---

## ✅ You're All Set!

Your project now has:

✅ GitHub-native task management
✅ 9 specialized AI agents ready to use
✅ Automated QA on every PR
✅ Complete SDLC workflow

---

## 🎯 Next Steps

### 1. Complete Planning Phase

```
Analyst → PM → Architect
```

- **Analyst:** Create project brief
- **PM:** Create PRD and user stories
- **Architect:** Design architecture and add dependencies

### 2. Plan Your First Sprint

```
Activate Scrum Master → *sprint-planning
```

### 3. Start Development

```
Activate Developer → *next-task → implement!
```

### 4. Review & Merge

Automated QA will review every PR automatically!

---

## 🆘 Quick Troubleshooting

### "gh: command not found"

→ GitHub CLI not installed. Go back to Step 1.

### "gh auth status" shows not logged in

→ Run `gh auth login` again.

### Labels not created

→ Run `.bmad-core-github-research/scripts/setup-labels.sh` manually.

### Automated QA not working

→ Check `ANTHROPIC_API_KEY` secret is set: `gh secret list`

---

## 📚 Learn More

- **Full Documentation:** See `README.md`
- **Agent Reference:** See individual agent files in `.bmad-core-github-research/agents/`
- **Workflow Examples:** See `docs/examples/` (coming soon)

---

## 🎉 Example First Session

```bash
# 1. Activate Analyst
claude activate .bmad-core-github-research/agents/analyst.md

Emma: Hi! I'm Emma, the Business Analyst. 📊

# 2. Create project brief
User: "*create-project-brief"

Emma: [Asks questions about your project]
      ✅ Created: docs/notes/project-brief-myproject.md

# 3. Activate PM
User: "Please switch to PM agent from .bmad-core-github-research/agents/pm.md"

John: Hi! I'm John, the Product Manager. 📋
      ✅ Found project brief

# 4. Create PRD
User: "*create-prd"

John: [Creates PRD with your input]
      ✅ Created: docs/prd/myproject-prd.md

# 5. Create epics and stories
User: "Create epics and stories from PRD"

John: ✅ Created 4 epics (GitHub Milestones)
      ✅ Created 20 user stories (GitHub Issues)

# 6. Check on GitHub
# Open your repo on GitHub.com
# See: Issues tab has 20 stories, Milestones has 4 epics!
```

---

**Ready to build? Start with Step 1!** 🚀
