# BMAD GitHub Workflows

This directory contains GitHub Actions workflows for the BMAD framework.

## Available Workflows

### 1. Dev Agent Action (`dev-agent-action.yml`) ⭐ **RECOMMENDED**

**BMAD Dev Agent (James) triggered by @dev mentions.**

**Use this if:** You want the BMAD Dev agent to implement stories directly from GitHub issues/PRs using your Claude subscription (no API costs).

**Features:**

- ✅ Full Dev agent functionality (same as local @dev agent)
- ✅ Implements stories from GitHub issues
- ✅ Automatic Projects v2 status updates (Todo → In Progress → In Review)
- ✅ Test-driven development
- ✅ Follows BMAD project structure
- ✅ Updates story files correctly (only authorized sections)
- ✅ Uses your Claude subscription (no per-use costs)

**Trigger:** Mention `@dev` in issues, PR comments, or reviews

**Setup:**

```bash
cp dev-agent-action.yml ../../.github/workflows/
# Add CLAUDE_CODE_OAUTH_TOKEN secret in GitHub repo settings
```

**Example:**

```markdown
Comment on issue #123:
@dev please implement this story
```

**How it works:**

1. @dev mention triggers workflow
2. Reads story file from issue
3. Updates status to "In Progress"
4. Implements all tasks with tests
5. Updates status to "In Review"
6. Posts completion summary

---

### 2. QA Agent Action (`qa-agent-action.yml`) ⭐ **RECOMMENDED**

**BMAD QA Agent (Quinn) triggered by @qa mentions.**

**Use this if:** You want the BMAD QA agent to review stories from GitHub issues/PRs using your Claude subscription (no API costs).

**Features:**

- ✅ Full QA agent functionality (same as local @qa agent)
- ✅ Comprehensive story/PR reviews
- ✅ Automatic Projects v2 status updates based on verdict
- ✅ Risk-based testing analysis
- ✅ Requirements traceability
- ✅ Posts detailed review findings
- ✅ Uses your Claude subscription (no per-use costs)

**Trigger:** Mention `@qa` in issues, PR comments, or reviews

**Setup:**

```bash
cp qa-agent-action.yml ../../.github/workflows/
# Add CLAUDE_CODE_OAUTH_TOKEN secret in GitHub repo settings
```

**Example:**

```markdown
Comment on issue #123:
@qa please review this story
```

**How it works:**

1. @qa mention triggers workflow
2. Reads story file and code changes
3. Performs comprehensive review
4. Determines verdict (PASS/CONCERNS/FAIL)
5. Updates status based on verdict:
   - PASS: In Review → Done
   - FAIL: In Review → In Progress
   - CONCERNS: Stays at In Review + comment
6. Posts detailed review results

---

### 3. Claude Code Simple (`claude-code-simple.yml`)

**Streamlined Dev agent for @claude mentions (alternative to @dev).**

**Use this if:** You prefer `@claude` mentions instead of `@dev`.

**Features:**

- Same as dev-agent-action.yml
- Triggered by `@claude` instead of `@dev`

**Setup:** Same as dev-agent-action.yml

---

### 4. Claude Code Dev Agent - Full (`claude-code-dev-agent.yml`)

**Complete Dev agent with comprehensive documentation embedded in prompt.**

**Use this if:** You want verbose instructions in the prompt for debugging/learning.

**Features:**

- Everything in `claude-code-simple.yml`
- Complete STEP 1-12 develop-story workflow documentation
- Detailed blocking conditions
- Ready-for-review criteria
- Command reference (`*develop-story`, `*run-tests`, etc.)

**Setup:** Same as claude-code-simple.yml

---

### 5. Automated QA Review (`automated-qa-review.yml`)

**Automated code review using Anthropic API (pay-per-use).**

**Use this if:** You want automatic QA reviews on EVERY PR without manual triggers, and you have budget for API costs.

**Features:**

- ✅ Automatic reviews on PR creation/update
- ✅ Updates GitHub Projects v2 status based on verdict
- ✅ Posts review comments with findings
- ✅ Risk-aware analysis (PASS/FAIL_MINOR/FAIL_MAJOR)

**Cost:** ~$0.01-0.05 per PR review (Anthropic API)

**Trigger:** Automatically on PR open/update

**Setup:**

```bash
cp automated-qa-review.yml ../../.github/workflows/
# Add ANTHROPIC_API_KEY secret in GitHub repo settings
```

---

## Quick Comparison

| Workflow                    | Trigger           | What It Does            | Cost                 | Status Updates                        |
| --------------------------- | ----------------- | ----------------------- | -------------------- | ------------------------------------- |
| `dev-agent-action.yml` ⭐   | `@dev` mention    | Full Dev agent (James)  | Claude subscription  | Todo → In Progress → In Review        |
| `qa-agent-action.yml` ⭐    | `@qa` mention     | Full QA agent (Quinn)   | Claude subscription  | Based on verdict (PASS/FAIL/CONCERNS) |
| `claude-code-simple.yml`    | `@claude` mention | Dev agent (alternative) | Claude subscription  | Todo → In Progress → In Review        |
| `claude-code-dev-agent.yml` | `@claude` mention | Dev agent + docs        | Claude subscription  | Todo → In Progress → In Review        |
| `automated-qa-review.yml`   | PR open/update    | Auto QA review          | API (~$0.01-0.05/PR) | In Review → Done/In Progress          |

### Recommended Setup

**Most users should use:** `dev-agent-action.yml` + `qa-agent-action.yml`

**Why:**

- ✅ Uses your Claude subscription (no per-use API costs)
- ✅ Full agent functionality matching local agents
- ✅ Trigger on-demand via `@dev` and `@qa` mentions
- ✅ Complete control over when agents run
- ✅ Automatic Projects v2 status management

---

## Complete Workflow Example

### Phase 1: Story Created

```bash
PM creates GitHub issue #123 with story file reference
Status: Backlog
```

### Phase 2: Move to Sprint

```bash
SM or manual: Update status to Todo
Status: Backlog → Todo
```

### Phase 3: Development (Automatic!)

```markdown
Comment on issue #123:
@dev please implement this story

Dev Agent Action triggers:

1. Reads story file
2. Updates status: Todo → In Progress
3. Implements all tasks with tests
4. Updates status: In Progress → In Review
5. Creates PR and comments completion

Status: Todo → In Progress → In Review
```

### Phase 4: QA Review (On-Demand!)

```markdown
Comment on issue #123 or PR #456:
@qa please review this story

QA Agent Action triggers:

1. Reads story file and code changes
2. Performs comprehensive review
3. Determines verdict (PASS/CONCERNS/FAIL)
4. Updates status based on verdict:
   - PASS: In Review → Done
   - FAIL: In Review → In Progress
   - CONCERNS: Stays at In Review + adds comment
5. Posts detailed review findings

Status: In Review → Done (or back to In Progress if fails)
```

### Alternative: Automated QA Review

```bash
PR #456 created (linked to issue #123)

Automated QA Review triggers automatically:
1. Reviews code changes
2. Checks acceptance criteria
3. Assesses risks
4. Posts review comment
5. Updates status based on verdict

Status: In Review → Done (or back to In Progress if fails)

Note: Uses Anthropic API (~$0.01-0.05 per PR)
```

### Phase 5: Merge

```bash
Manual: Merge PR #456
GitHub: Closes issue #123 automatically
Status: Done (final)
```

**Zero manual status updates needed!** 🎉

---

## Setup Instructions

### For @dev and @qa Agent Actions (Recommended)

1. **Get OAuth Token**
   - Visit: https://claude.ai/settings/developer
   - Generate token for Claude Code

2. **Add to GitHub**
   - Go to repo **Settings** → **Secrets and variables** → **Actions**
   - Click **New repository secret**
   - Name: `CLAUDE_CODE_OAUTH_TOKEN`
   - Paste token

3. **Copy Workflows**

   ```bash
   # Copy both agent actions
   cp dev-agent-action.yml ../../.github/workflows/
   cp qa-agent-action.yml ../../.github/workflows/
   ```

4. **Commit and Push**

   ```bash
   git add .github/workflows/dev-agent-action.yml
   git add .github/workflows/qa-agent-action.yml
   git commit -m "chore: Add BMAD @dev and @qa agent actions"
   git push
   ```

5. **Test**

   ```markdown
   # Test Dev agent

   Create issue and comment: @dev please help

   # Test QA agent

   Create issue and comment: @qa please review
   ```

### For Claude Code Workflows (@claude trigger)

1. **Same OAuth setup as above**

2. **Copy Workflow**

   ```bash
   cp claude-code-simple.yml ../../.github/workflows/
   ```

3. **Test**
   ```markdown
   Create issue and comment: @claude hello
   ```

### For Automated QA Workflow

1. **Get API Key**
   - Visit: https://console.anthropic.com/
   - Generate API key

2. **Add to GitHub**
   - Go to repo **Settings** → **Secrets and variables** → **Actions**
   - Click **New repository secret**
   - Name: `ANTHROPIC_API_KEY`
   - Paste key

3. **Copy Workflow**

   ```bash
   cp automated-qa-review.yml ../../.github/workflows/
   ```

4. **Test**
   ```bash
   Create any PR - QA review will trigger automatically
   ```

---

## Configuration

### Adjust Token Budget

Edit `claude_args` in workflow:

```yaml
claude_args: |
  --budget-tokens 150000  # Increase for complex stories
```

### Restrict Tools

```yaml
claude_args: |
  --allowed-tools Bash(npm:*),Read,Write,Edit
```

### Customize Dev Agent Behavior

Edit the `prompt:` section in `claude-code-simple.yml` or `claude-code-dev-agent.yml`.

---

## Troubleshooting

### Workflow Doesn't Trigger

**Check:**

- Workflow file is in `.github/workflows/` (not in expansion pack)
- Secrets are configured correctly
- You mentioned `@claude` in comment/issue
- GitHub Actions enabled for repo

**Fix:**

- Check **Actions** tab for errors
- Review workflow logs

### Status Not Updating

**Check:**

- Scripts exist: `./scripts/get-project-status.sh`, `./scripts/update-project-status.sh`
- Scripts are executable: `ls -la ./scripts/*.sh`
- Issue linked to GitHub Project with Status field

**Fix:**

```bash
chmod +x ./scripts/*.sh
git add ./scripts/*.sh
git commit -m "Make scripts executable"
git push
```

### Permission Errors

**Check workflow permissions:**

```yaml
permissions:
  contents: write
  pull-requests: write
  issues: write
  id-token: write
  actions: read
```

All should be `write` or `read` as shown.

---

## Additional Resources

- **Quick Start Guide**: `../CLAUDE-CODE-ACTION-QUICKSTART.md`
- **Full Documentation**: `../CLAUDE-CODE-ACTION-DEV-AGENT.md`
- **Dev Agent Reference**: `../agents/dev.md`
- **Integration Status**: `../AGENT-GITHUB-INTEGRATION-STATUS.md`

---

## Support

For issues or questions:

1. Review troubleshooting section above
2. Check workflow logs in GitHub Actions tab
3. See `CLAUDE-CODE-ACTION-QUICKSTART.md` for detailed examples
4. File issue at: https://github.com/anthropics/claude-code/issues
