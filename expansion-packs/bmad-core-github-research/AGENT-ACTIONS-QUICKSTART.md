# BMAD Agent Actions - Quick Start (@dev and @qa)

Transform your GitHub issues into a complete SDLC with AI agents triggered by simple @mentions!

## 🚀 5-Minute Setup

### Step 1: Get Claude Code OAuth Token

1. Visit: https://claude.ai/settings/developer
2. Generate OAuth token for Claude Code
3. Copy the token

### Step 2: Add Token to GitHub

```bash
gh secret set CLAUDE_CODE_OAUTH_TOKEN
# Paste your token when prompted
```

Verify:

```bash
gh secret list
# Should show: CLAUDE_CODE_OAUTH_TOKEN
```

### Step 3: Install Agent Actions

```bash
mkdir -p .github/workflows

# Copy Dev Agent (@dev trigger)
cp expansion-packs/bmad-core-github-research/workflows/dev-agent-action.yml .github/workflows/

# Copy QA Agent (@qa trigger)
cp expansion-packs/bmad-core-github-research/workflows/qa-agent-action.yml .github/workflows/
```

### Step 4: Commit and Push

```bash
git add .github/workflows/dev-agent-action.yml
git add .github/workflows/qa-agent-action.yml
git commit -m "chore: Add BMAD @dev and @qa agent actions"
git push
```

### Step 5: Test It!

```markdown
Create an issue and comment:
@dev hello!

Or:
@qa hello!
```

You should see the agents respond! 🎉

---

## 📝 How to Use

### @dev Agent (James - Development)

**Trigger:** Comment `@dev` on any issue or PR

**What it does:**

1. Reads story file from issue
2. Updates status: Todo → In Progress
3. Implements all tasks with tests
4. Updates status: In Progress → In Review
5. Creates PR (if needed)
6. Posts completion summary

**Examples:**

```markdown
# Implement a story

Comment on issue #123:
@dev please implement this story

Story file: .bmad-stories/1.0.0.story.md
```

```markdown
# Fix a bug

Comment on issue #456:
@dev please fix the authentication bug described in this issue
```

```markdown
# Add tests

Comment on PR #789:
@dev please add integration tests for the login flow
```

---

### @qa Agent (Quinn - Quality Assurance)

**Trigger:** Comment `@qa` on any issue or PR

**What it does:**

1. Reads story file and code changes
2. Performs comprehensive review (requirements, tests, risks, quality)
3. Determines verdict: PASS / CONCERNS / FAIL
4. Updates status based on verdict:
   - **PASS**: In Review → Done
   - **FAIL**: In Review → In Progress
   - **CONCERNS**: Stays at In Review + adds comment
5. Posts detailed review findings

**Examples:**

```markdown
# Review a story

Comment on issue #123:
@qa please review this story

Story file: .bmad-stories/1.0.0.story.md
```

```markdown
# Review a PR

Comment on PR #456:
@qa please perform a comprehensive review of this PR
```

```markdown
# Re-review after fixes

Comment on issue #123:
@qa please re-review after dev fixes
```

---

## 🎯 Complete Workflow Example

### Phase 1: Create Story (Manual or via PM/SM agents)

```bash
# PM creates GitHub issue #123
# Story file: .bmad-stories/1.0.0.story.md
# Status: Backlog

# SM moves to sprint
# Status: Backlog → Todo
```

### Phase 2: Development (@dev)

```markdown
Comment on issue #123:
@dev please implement this story

Dev Agent (James) responds:

1. "📊 GitHub Issue #123: Todo → In Progress"
2. [Implements all tasks with tests]
3. "📊 GitHub Issue #123: In Progress → In Review"
4. "✅ Story 1.0.0 complete! PR #456 created."

Status: Todo → In Progress → In Review
```

### Phase 3: QA Review (@qa)

```markdown
Comment on issue #123 or PR #456:
@qa please review this story

QA Agent (Quinn) responds:

1. [Performs comprehensive review]
2. "📊 Verdict: PASS ✅"
3. "📊 GitHub Issue #123: In Review → Done"
4. [Posts detailed review findings]

Status: In Review → Done
```

### Phase 4: Merge (Manual)

```bash
gh pr merge 456 --squash

GitHub: ✅ PR #456 merged
GitHub: ✅ Issue #123 closed
```

**Zero manual status updates! Everything automated! 🎉**

---

## 🆚 Comparison: Local vs GitHub Actions

| Feature            | Local Agents (@dev in CLI) | Agent Actions (@dev in GitHub)    |
| ------------------ | -------------------------- | --------------------------------- |
| **Trigger**        | `@dev` in Claude Code CLI  | `@dev` in GitHub issue/PR comment |
| **Environment**    | Your local machine         | GitHub Actions (cloud)            |
| **Cost**           | Claude subscription        | Claude subscription (same!)       |
| **Status Updates** | Automatic (local scripts)  | Automatic (GitHub scripts)        |
| **Workflow**       | develop-story (STEP 1-12)  | develop-story (STEP 1-12)         |
| **Functionality**  | Full Dev agent             | Full Dev agent (identical)        |
| **Story Files**    | Must be local              | Must be in repo (.bmad-stories/)  |

**Both are identical in behavior - just different execution environments!**

---

## ✅ Features

### Dev Agent (@dev)

- ✅ Full BMAD Dev agent functionality (same as local)
- ✅ Story-driven development (reads story file from issue)
- ✅ Automatic Projects v2 status updates
- ✅ Test-driven development (writes tests for all code)
- ✅ Follows project structure standards
- ✅ Limited story file permissions (only Dev Agent Record sections)
- ✅ Blocking conditions (halts for ambiguity, failures, missing config)
- ✅ Uses your Claude subscription (no per-use API costs)

### QA Agent (@qa)

- ✅ Full BMAD QA agent functionality (same as local)
- ✅ Comprehensive reviews (requirements, tests, risks, quality)
- ✅ Automatic Projects v2 status updates based on verdict
- ✅ Risk-based testing analysis
- ✅ Requirements traceability
- ✅ Verdict-driven workflow (PASS/CONCERNS/FAIL)
- ✅ Limited story file permissions (only QA Results section)
- ✅ Uses your Claude subscription (no per-use API costs)

---

## 📋 Prerequisites

### 1. Story Files Must Be in Repository

**IMPORTANT:** `.bmad-stories/` folder must be committed to your repository for GitHub Actions to access it.

**Why:** GitHub Actions runs in a cloud environment and needs story files to be in the repo.

**Setup:**

Check your `.gitignore`:

```bash
cat .gitignore
```

Make sure `.bmad-stories/` is **NOT** in `.gitignore`.

If you need to remove it:

```bash
# Remove .bmad* exclusion from .gitignore
# Then commit story files:
git add .bmad-stories/
git commit -m "chore: Add story files for GitHub Actions"
git push
```

### 2. GitHub Projects v2 Status Field

Agent actions work best with GitHub Projects v2 for status management.

**Setup:**

```bash
# Run setup script
./expansion-packs/bmad-core-github-research/scripts/init-github-project.sh
```

**Alternative:** Agents will fall back to using labels if Projects v2 is not configured.

### 3. GitHub Permissions

Ensure your repository settings allow GitHub Actions to:

- Create/update issues and PRs
- Update Projects v2 status
- Commit code changes

**Check:** Settings → Actions → General → Workflow permissions

- Select: "Read and write permissions"
- Check: "Allow GitHub Actions to create and approve pull requests"

---

## 🐛 Troubleshooting

### Agents Don't Respond

**Check:**

1. Workflow files exist in `.github/workflows/`
2. `CLAUDE_CODE_OAUTH_TOKEN` secret is set
3. You mentioned `@dev` or `@qa` in comment
4. GitHub Actions are enabled for repo

**Fix:**

- Go to **Actions** tab in GitHub
- Check for failed workflow runs
- Review error messages

### "Story file not found" Error

**Problem:** Story files not in repository

**Fix:**

```bash
# Add story files to repo
git add .bmad-stories/
git commit -m "chore: Add story files"
git push
```

### Status Not Updating

**Check:**

1. Scripts exist: `./scripts/get-project-status.sh` and `./scripts/update-project-status.sh`
2. Scripts are executable: `chmod +x ./scripts/*.sh`
3. Issue is linked to GitHub Project with Status field
4. Workflow has `issues: write` permission

**Fix:**

```bash
# Make scripts executable
chmod +x ./expansion-packs/bmad-core-github-research/scripts/*.sh

# Copy to repo if needed
cp expansion-packs/bmad-core-github-research/scripts/*.sh ./scripts/

git add ./scripts/*.sh
git commit -m "chore: Add status management scripts"
git push
```

### Permission Errors

**Check workflow permissions in repo settings:**

Settings → Actions → General → Workflow permissions

- ✅ Read and write permissions
- ✅ Allow GitHub Actions to create and approve pull requests

---

## 💡 Tips & Best Practices

### 1. Reference Story Files in Issues

Always include story file path in issue body:

```markdown
Story file: .bmad-stories/1.0.0.story.md

@dev please implement this story
```

### 2. Use Specific Commands

Be clear about what you want:

```markdown
# Good

@dev please implement all tasks in story 1.0.0 with comprehensive tests

# Also good

@qa please review this story focusing on security and performance
```

### 3. Check Status Before Triggering

```bash
# Check current status
gh issue view 123

# Only trigger @dev if status is "Todo"
# Only trigger @qa if status is "In Review"
```

### 4. Review Agent Output

Agents post detailed comments. Read them to understand:

- What was implemented
- What tests were added
- What issues were found
- What status changes occurred

### 5. Combine with Local Agents

Use both approaches:

- **GitHub @dev/@qa**: For team collaboration and transparency
- **Local @dev/@qa**: For private development and iteration

---

## 📚 Additional Resources

- **Full Documentation**: `CLAUDE-CODE-ACTION-DEV-AGENT.md`
- **Workflows Guide**: `.github/workflows/README.md`
- **Dev Agent Reference**: `agents/dev.md`
- **QA Agent Reference**: `agents/qa.md`
- **Integration Status**: `AGENT-GITHUB-INTEGRATION-STATUS.md`
- **Setup Assistant**: `agents/setup-assistant.md` (run `@setup-assistant` → `*setup-actions`)

---

## 🎉 You're Ready!

Your BMAD Agent Actions are now configured! Just mention `@dev` or `@qa` in any GitHub issue or PR, and watch the agents work their magic.

**Happy coding! 🚀**

---

## 📊 Cost Comparison

| Approach                   | Cost                                | Best For              |
| -------------------------- | ----------------------------------- | --------------------- |
| **@dev/@qa Agent Actions** | Claude subscription ($20-200/month) | Most teams            |
| **Automated QA (API)**     | ~$0.01-0.05 per PR                  | Teams with API budget |
| **Local Agents (CLI)**     | Claude subscription ($20-200/month) | Individual developers |

**Recommended:** Use @dev/@qa Agent Actions - no per-use costs, full functionality, team collaboration!
