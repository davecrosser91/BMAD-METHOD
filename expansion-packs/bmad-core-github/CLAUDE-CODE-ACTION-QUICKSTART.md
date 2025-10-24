# Claude Code Action - Quick Start Guide

Transform Claude into your BMAD Dev Agent directly in GitHub issues and PRs!

## 🚀 Quick Setup (5 minutes)

### 1. Choose Your Workflow File

**Two options available:**

| File                        | Best For       | Details                                   |
| --------------------------- | -------------- | ----------------------------------------- |
| `claude-code-simple.yml`    | Most users     | Streamlined, essential Dev agent behavior |
| `claude-code-dev-agent.yml` | Advanced users | Full Dev agent documentation and workflow |

### 2. Copy to Your Repository

```bash
# Copy your chosen workflow (choose one)
cp expansion-packs/bmad-core-github/.github/workflows/claude-code-simple.yml .github/workflows/
# OR
cp expansion-packs/bmad-core-github/.github/workflows/claude-code-dev-agent.yml .github/workflows/
```

### 3. Add Claude OAuth Token

1. Go to: https://claude.ai/settings/developer
2. Generate OAuth token for Claude Code
3. In your GitHub repo: **Settings** → **Secrets and variables** → **Actions**
4. Click **New repository secret**
5. Name: `CLAUDE_CODE_OAUTH_TOKEN`
6. Value: Paste your token
7. Click **Add secret**

### 4. Test It!

Create a test issue:

```markdown
Title: Test Claude Dev Agent

Body:
Story file: .bmad-stories/test.story.md

@claude please help me implement this story
```

Claude will respond as the Dev agent! 🎉

---

## 📝 How to Use

### In Issues

Comment on any issue:

```
@claude please implement this story
```

### In Pull Requests

Comment on PR review:

```
@claude please add tests for the authentication module
```

### New Issues

Create issue with `@claude` in title or body:

```markdown
Title: @claude Implement user login

Body:
Story: .bmad-stories/1.0.0.story.md
Please implement the user authentication story.
```

---

## 🤖 What Claude Will Do

When you mention `@claude`, it will:

1. ✅ **Read the story file** from your repository
2. ✅ **Update GitHub status** to "In Progress" (automatic)
3. ✅ **Implement all tasks** following the story requirements
4. ✅ **Write comprehensive tests** for all code
5. ✅ **Run validations** (linting, tests, etc.)
6. ✅ **Update File List** with changes made
7. ✅ **Update GitHub status** to "In Review" (automatic)
8. ✅ **Post completion comment** with summary

---

## 🎯 Dev Agent Behavior

Claude will behave **exactly like the local BMAD Dev agent**:

### ✅ What It Does Automatically

- Updates GitHub Projects v2 status (Todo → In Progress → In Review)
- Writes tests for all code
- Runs linting and validation
- Updates story file sections (Dev Agent Record, File List, Change Log)
- Follows project structure standards

### ⛔ What It Won't Do

- Modify Story, Acceptance Criteria, or Testing sections
- Load PRD or Architecture files (unless story directs it)
- Skip tests or validations
- Proceed if tests fail

### 🛑 When It Stops (Blocking Conditions)

Claude will HALT and ask for help if:

- Unapproved dependencies needed
- Requirements are ambiguous
- 3 consecutive failures attempting something
- Missing configuration
- Regression tests failing

---

## 📊 GitHub Status Flow

Claude automatically manages status:

```
Story Created
    ↓
Backlog (PM creates issue)
    ↓
Todo (SM moves to sprint)
    ↓
@claude mention triggers
    ↓
In Progress (Claude auto-updates) ← CLAUDE STARTS HERE
    ↓
Claude implements story
    ↓
In Review (Claude auto-updates) ← CLAUDE COMPLETES HERE
    ↓
QA reviews
    ↓
Done (QA updates)
```

**You never manually update status during development!**

---

## 🔧 Configuration Options

### Adjust Token Budget

Edit `claude_args` in workflow file:

```yaml
claude_args: |
  --budget-tokens 150000  # Increase for complex stories
```

### Restrict Tools

```yaml
claude_args: |
  --allowed-tools Bash(npm:*),Read,Write,Edit  # Only npm and file ops
```

### Customize Prompt

Edit the `prompt:` section to change Claude's behavior, style, or add custom instructions.

---

## 🆚 Differences: Local vs GitHub Action

| Feature         | Local Dev Agent      | Claude Code Action             |
| --------------- | -------------------- | ------------------------------ |
| **Trigger**     | `@dev` in CLI        | `@claude` in issue/PR          |
| **Environment** | Your machine         | GitHub Actions                 |
| **Setup**       | Claude Code CLI      | GitHub workflow file           |
| **Approval**    | Manual confirmations | Auto in GitHub Actions context |
| **Persistence** | Session-based        | One-shot per comment           |
| **Workflow**    | Same (STEP 1-12)     | Same (STEP 1-12)               |

---

## ❓ Troubleshooting

### Claude Doesn't Respond

**Check:**

1. Workflow file exists in `.github/workflows/`
2. `CLAUDE_CODE_OAUTH_TOKEN` secret is set
3. You mentioned `@claude` in comment/issue
4. GitHub Actions are enabled for repo

**Fix:**

- Go to **Actions** tab in GitHub
- Check for failed workflow runs
- Review error messages

### Status Not Updating

**Check:**

1. Scripts exist: `./scripts/get-project-status.sh` and `./scripts/update-project-status.sh`
2. Scripts are executable: `chmod +x ./scripts/*.sh`
3. Issue is linked to GitHub Project with Status field
4. Workflow has `issues: write` permission

**Fix:**

```bash
# Make scripts executable
chmod +x ./scripts/*.sh
git add ./scripts/*.sh
git commit -m "Make scripts executable"
git push
```

### Action Fails with Permission Error

**Check:**
Workflow has all required permissions:

```yaml
permissions:
  contents: write
  pull-requests: write
  issues: write
  id-token: write
  actions: read
```

### Claude Loads Wrong Files

**Solution:**
The prompt instructs Claude to be story-driven. If it loads PRD/architecture unnecessarily, add this to story Dev Notes:

```markdown
## Dev Notes

- Story contains ALL requirements
- Do NOT load PRD or architecture files
```

---

## 📚 Advanced Usage

### Multiple Stories in One Issue

```markdown
@claude please implement stories 1.0.0, 1.1.0, and 1.2.0 in sequence
```

Claude will process them one by one.

### Specific Task from Story

```markdown
@claude please implement only Task 2 from story 1.0.0
```

Claude will focus on that specific task.

### Fix After QA Failure

```markdown
@claude the QA review failed with these issues:

- Tests missing for edge case X
- Validation not working for Y

Please apply these fixes.
```

---

## 🎓 Example Scenarios

### Scenario 1: Start New Story

```markdown
Issue #123: Implement User Authentication

Body:
Story: .bmad-stories/1.0.0.story.md

@claude please implement this story
```

**Claude will:**

1. Read `.bmad-stories/1.0.0.story.md`
2. Update status to "In Progress"
3. Implement all tasks with tests
4. Update status to "In Review"
5. Post: "✅ Story 1.0.0 complete! PR #456 created."

### Scenario 2: Add Tests to PR

```markdown
PR #456 Review Comment:

@claude please add integration tests for the login flow
```

**Claude will:**

1. Checkout PR branch
2. Add integration tests
3. Run all tests
4. Commit to PR
5. Post: "✅ Integration tests added and passing."

### Scenario 3: Fix QA Issues

```markdown
Issue #123 Comment (after QA review):

@claude QA found these issues:

- Edge case: empty email not validated
- Missing error message for invalid password

Please fix and re-test.
```

**Claude will:**

1. Read QA feedback
2. Fix validation issues
3. Add tests for edge cases
4. Run all tests
5. Update status to "In Review"
6. Post: "✅ QA issues resolved. All tests passing."

---

## 📖 Additional Resources

- **Full Documentation**: `CLAUDE-CODE-ACTION-DEV-AGENT.md`
- **Dev Agent Reference**: `agents/dev.md`
- **GitHub Integration Status**: `AGENT-GITHUB-INTEGRATION-STATUS.md`
- **Setup Scripts**: `scripts/setup-labels.sh`, `scripts/update-project-status.sh`

---

## 🎉 You're Ready!

Your Claude Code Action is now configured to work exactly like the BMAD Dev agent. Just mention `@claude` in any issue or PR, and watch it implement stories with precision and expertise!

**Happy coding! 🚀**
