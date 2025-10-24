# Claude Code Action: Dev Agent Configuration

This document explains how the Claude Code GitHub Action is configured to behave **exactly like the BMAD Dev Agent** (`agents/dev.md`).

## Overview

The `claude-code-dev-agent.yml` workflow transforms Claude Code into James, the Full Stack Developer from BMAD, with identical behavior, permissions, and workflow execution.

## Configuration Breakdown

### 1. Triggers (Same as Your Current Setup)

```yaml
on:
  issue_comment:
    types: [created]
  pull_request_review_comment:
    types: [created]
  issues:
    types: [opened, assigned]
  pull_request_review:
    types: [submitted]
```

**Why**: Allows Claude to respond to `@claude` mentions in:

- Issue comments
- PR review comments
- New issues (with `@claude` in title/body)
- PR reviews

### 2. Enhanced Permissions

```yaml
permissions:
  contents: write # Write code and commit changes
  pull-requests: write # Create/update PRs
  issues: write # Update issue status and comments
  id-token: write # OAuth authentication
  actions: read # Read CI results
```

**Why**: Dev agent needs write access to:

- Implement code changes
- Update story files
- Manage GitHub status via Projects v2
- Read test results

### 3. Full Checkout

```yaml
- uses: actions/checkout@v4
  with:
    fetch-depth: 0 # Full history
```

**Why**: Dev agent needs full git history for proper commits, branches, and status tracking.

### 4. Custom Prompt: Dev Agent Persona

The `prompt` field contains a complete replica of the Dev agent's:

#### Core Identity

```yaml
Role: Expert Senior Software Engineer & Implementation Specialist
Style: Extremely concise, pragmatic, detail-oriented, solution-focused
Focus: Executing story tasks with precision, comprehensive testing
```

#### Critical Principles (from dev.md)

1. **Story-Driven**: Never load PRD/architecture unless directed
2. **Project Structure**: Check folder structure before starting
3. **Limited Permissions**: Only update authorized story sections
4. **Test-Driven**: Always write and run tests
5. **Automatic Status**: Update GitHub Projects v2 automatically

#### Workflow: develop-story Command (Exact Replica)

**STEP 1: GitHub Status Management (AUTOMATIC)**

```bash
1. Extract issue number from story file
2. Read current status: ./scripts/get-project-status.sh {issue}
3. Update to "In Progress" if needed
4. Announce: "📊 GitHub Issue #123: {old} → In Progress"
```

**STEP 2-8: Implementation Loop**

```
For each task:
  → Read task and subtasks
  → Implement following requirements
  → Write comprehensive tests
  → Execute validations
  → Mark checkbox [x] ONLY if ALL pass
  → Update File List
  → Update Change Log
```

**STEP 9: Definition of Done**

```
→ Run story DOD checklist
→ Verify all tasks marked [x]
→ Verify all tests pass
→ Verify File List complete
```

**STEP 10-12: Completion**

```
→ Update story status to "Ready for Review"
→ Update GitHub status to "In Review"
→ Announce completion
→ HALT
```

#### Blocking Conditions (Same as dev.md)

- Unapproved dependencies
- Ambiguous requirements
- 3 consecutive failures
- Missing configuration
- Failing regression

### 5. Tool Permissions (claude_args)

```yaml
claude_args: |
  --allowed-tools Bash(git:*),Bash(npm:*),Bash(yarn:*),Bash(pnpm:*),Bash(node:*),Bash(python:*),Bash(pytest:*),Bash(jest:*),Bash(vitest:*),Bash(./scripts/*),Bash(gh:*),Read,Write,Edit,Glob,Grep,TodoWrite
  --budget-tokens 150000
```

**Breakdown**:

#### `--allowed-tools` (Dev Agent Can Use These)

- `Bash(git:*)` - All git commands (status, commit, push, etc.)
- `Bash(npm:*),Bash(yarn:*),Bash(pnpm:*)` - Package managers
- `Bash(node:*),Bash(python:*)` - Runtime commands
- `Bash(pytest:*),Bash(jest:*),Bash(vitest:*)` - Test runners
- `Bash(./scripts/*)` - **CRITICAL**: Access to GitHub status scripts
- `Bash(gh:*)` - GitHub CLI for issue/PR management
- `Read,Write,Edit,Glob,Grep` - File operations
- `TodoWrite` - Task tracking

**Note**: Claude Code Action doesn't support `--auto-approve-tools`. Instead, it uses interactive approval prompts in the GitHub Action UI. For fully automated execution, users will need to approve tool usage when the action runs, or use the GitHub Actions environment which auto-approves in CI/CD context.

#### `--budget-tokens 150000`

Large token budget for complex story implementations with full context.

### 6. Auto-Update Status on Success

```yaml
- name: Auto-update GitHub Status on Success
  if: success() && steps.claude.outputs.completed == 'true'
  run: |
    # Extract issue number and update to "In Review"
    ./scripts/update-project-status.sh "$ISSUE_NUMBER" "In Review"
```

**Why**: Ensures GitHub Projects v2 status is updated even if Claude's workflow completes successfully.

## How It Matches Dev Agent Behavior

| Dev Agent Feature          | Claude Code Action Configuration                                                              |
| -------------------------- | --------------------------------------------------------------------------------------------- |
| **Persona**                | Exact same identity, style, focus in `prompt`                                                 |
| **Story-Driven**           | Prompt instructs: "Story file contains ALL info. NEVER load PRD/architecture unless directed" |
| **Limited Permissions**    | Prompt lists exact sections Claude can edit in story files                                    |
| **Automatic Status**       | `--auto-approve-tools` includes status scripts + fallback step                                |
| **Test-Driven**            | Workflow STEP 2-8 requires tests before marking tasks complete                                |
| **Blocking Conditions**    | Prompt lists exact same halt conditions                                                       |
| **develop-story Workflow** | Prompt contains complete STEP 1-12 workflow                                                   |
| **Commands**               | Prompt documents `*develop-story`, `*run-tests`, `*review-qa`, etc.                           |
| **GitHub Status Values**   | Prompt lists all 5 status values (Backlog → Done)                                             |
| **File Resolution**        | Prompt explains `{root}/{type}/{name}` pattern                                                |

## Usage Examples

### Example 1: Implement a Story from Issue

**User creates issue with:**

```
Title: Implement user authentication
Body:
Story file: .bmad-stories/1.0.0.story.md
@claude please implement this story
```

**Claude will:**

1. Read `.bmad-stories/1.0.0.story.md`
2. Extract GitHub issue number (#123)
3. Run `./scripts/get-project-status.sh 123` (current status: "Todo")
4. Run `./scripts/update-project-status.sh 123 "In Progress"`
5. Announce: "📊 GitHub Issue #123: Todo → In Progress"
6. For each task in story:
   - Implement code
   - Write tests
   - Run validations
   - Mark checkbox [x] only if pass
   - Update File List
7. Run DOD checklist
8. Update story status to "Ready for Review"
9. Run `./scripts/update-project-status.sh 123 "In Review"`
10. Announce: "📊 GitHub Issue #123: In Progress → In Review (Ready for QA)"
11. HALT

### Example 2: Comment on Existing Issue

**User comments on issue #456:**

```
@claude please start working on this story
```

**Claude will:**

- Follow same workflow as Example 1
- Extract issue #456 from context
- Execute full develop-story workflow

### Example 3: PR Review Comment

**User comments on PR #789:**

```
@claude please add tests for the authentication module
```

**Claude will:**

- Checkout PR branch
- Add comprehensive tests
- Run validations
- Update status if linked to issue
- Commit changes to PR

## Setup Instructions

### 1. Install Workflow File

Copy `claude-code-dev-agent.yml` to your repository:

```bash
mkdir -p .github/workflows
cp expansion-packs/bmad-core-github/.github/workflows/claude-code-dev-agent.yml .github/workflows/
```

### 2. Configure Claude Code OAuth Token

1. Go to repository Settings → Secrets and variables → Actions
2. Add secret: `CLAUDE_CODE_OAUTH_TOKEN`
3. Value: Your Claude Code OAuth token (get from https://claude.ai/settings/developer)

### 3. Ensure Scripts Exist

Make sure these scripts are in your repo:

```bash
./scripts/get-project-status.sh    # Read GitHub Projects v2 status
./scripts/update-project-status.sh # Update GitHub Projects v2 status
```

These scripts are included in `bmad-core-github` expansion pack.

### 4. Test the Integration

Create a test issue:

```
Title: Test Claude Dev Agent
Body:
Story file: .bmad-stories/test.story.md

@claude please implement this story
```

Claude should respond and follow the full Dev agent workflow.

## Differences from Local Dev Agent

| Feature            | Local Dev Agent               | GitHub Action                            |
| ------------------ | ----------------------------- | ---------------------------------------- |
| **Activation**     | Manual: `@dev` mention        | Automatic: `@claude` mention in issue/PR |
| **Environment**    | Your local machine            | GitHub Actions runner (Ubuntu)           |
| **Authentication** | Your local git/gh credentials | GitHub Actions token + Claude OAuth      |
| **Story Access**   | Direct file system access     | Must be committed to repo                |
| **Status Updates** | Manual script execution       | Automatic via workflow steps             |
| **Persistence**    | Continuous session            | One-shot execution per comment           |

## Customization Options

### Adjust Token Budget

```yaml
--budget-tokens 200000 # Increase for very large stories
```

### Restrict Tools

```yaml
--allowed-tools Bash(npm:*),Read,Write,Edit # Only npm and file ops
```

### Note on Auto-Approval

Claude Code Action doesn't support `--auto-approve-tools` flag. Tool usage is either:

- **Approved interactively** via GitHub Action UI
- **Auto-approved in GitHub Actions context** (running in CI/CD automatically approves most safe operations)

## Troubleshooting

### Claude Doesn't Update Status

**Check**:

1. Scripts exist: `ls -la ./scripts/get-project-status.sh`
2. Scripts are executable: `chmod +x ./scripts/*.sh`
3. Issue is linked to GitHub Project
4. Workflow has `issues: write` permission

### Claude Asks for Confirmation Too Often

**Note**: Claude Code Action doesn't support `--auto-approve-tools`. Tool approvals happen through GitHub Actions context automatically for most operations. If you need fully manual control, consider using the local Dev agent via Claude Code CLI instead.

### Claude Loads PRD/Architecture When Not Needed

**Solution**: The prompt already instructs against this. If it happens, file an issue with the specific case.

## Complete Feature Parity Checklist

- ✅ Persona (James, Expert Senior Software Engineer)
- ✅ Story-driven development (no PRD/architecture loading)
- ✅ Project structure awareness
- ✅ Limited story file permissions
- ✅ Test-driven development
- ✅ Automatic GitHub Projects v2 status management
- ✅ develop-story workflow (STEP 1-12)
- ✅ Blocking conditions
- ✅ Ready for review criteria
- ✅ Commands (*develop-story, *run-tests, \*review-qa, etc.)
- ✅ File resolution pattern
- ✅ Status values (Backlog → Done)
- ✅ Tool permissions matching Dev agent capabilities
- ✅ Auto-approval for safe operations

## Version Information

- **BMAD-Core-GitHub**: v2.4.0+
- **Claude Code Action**: v1+
- **Requires**: GitHub Projects v2 with Status field configured

## Support

For issues or questions:

1. Check BMAD documentation: `expansion-packs/bmad-core-github/README.md`
2. Review Dev agent definition: `expansion-packs/bmad-core-github/agents/dev.md`
3. File issue at: https://github.com/anthropics/claude-code/issues
