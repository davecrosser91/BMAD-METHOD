# BMAD-Core-GitHub Helper Scripts

This directory contains helper scripts that abstract common GitHub operations, eliminating the need for agents to make repetitive `gh` CLI or GraphQL calls.

## Why Use These Scripts?

**Benefits:**

- ✅ **Consistent API**: Standardized interface for all GitHub operations
- ✅ **Error Handling**: Built-in error checking and user-friendly messages
- ✅ **Automatic Fallbacks**: Projects v2 with label fallback support
- ✅ **Reduced Complexity**: No need to construct complex GraphQL queries
- ✅ **Easy Maintenance**: Update GitHub integration in one place
- ✅ **Configuration Support**: Reads from `.bmad-core/core-config.yaml`

## Available Scripts

### Projects v2 Status Management

#### `update-project-status.sh`

Update GitHub Projects v2 status field for an issue.

```bash
./scripts/update-project-status.sh <issue-number> <status>

# Examples
./scripts/update-project-status.sh 123 "In Progress"
./scripts/update-project-status.sh 456 "Done"

# Valid statuses: Backlog, Todo, In Progress, In Review, Done
```

**Features:**

- Automatically adds issue to project if not already present
- Caches project and field IDs for performance
- Falls back to labels if Projects v2 unavailable

#### `get-project-status.sh`

Get current Projects v2 status for an issue.

```bash
./scripts/get-project-status.sh <issue-number>

# Example
./scripts/get-project-status.sh 123

# Output (machine-readable)
ISSUE_NUMBER=123
ISSUE_TITLE=Add authentication
ISSUE_STATE=OPEN
PROJECT_STATUS=In Progress
```

### Issue Management

#### `create-issue.sh`

Create a GitHub issue with custom title, body, labels, and metadata.

```bash
./scripts/create-issue.sh [options]

# Examples
./scripts/create-issue.sh --title "Fix authentication bug" --body "Users cannot login" --label "type:bug,priority:p1"
./scripts/create-issue.sh --title "Add new feature" --label "type:story,size:m" --milestone "Epic 1" --assignee @me
./scripts/create-issue.sh --title "Update documentation" --body "Add API examples" --label "type:task" --project 1

# Options
--title TITLE       Issue title (required)
--body BODY         Issue body/description
--label LABELS      Labels (comma-separated)
--milestone NAME    Milestone to add issue to
--assignee USER     Assignee (@me for yourself)
--project NUMBER    Project number to add issue to
```

**Features:**

- Create issues with full control over all fields
- Automatically add to GitHub Projects v2
- Returns issue number and URL for further automation
- Supports multiline body text

#### `create-github-issue-from-story.sh`

Create a GitHub issue from a BMAD story file.

```bash
./scripts/create-github-issue-from-story.sh <story-file> [options]

# Examples
./scripts/create-github-issue-from-story.sh .bmad-stories/1.0.0.story.md
./scripts/create-github-issue-from-story.sh .bmad-stories/1.0.0.story.md --milestone "Epic 1" --assignee @me
./scripts/create-github-issue-from-story.sh .bmad-stories/1.0.0.story.md --dry-run

# Options
--dry-run         Show the issue body without creating it
--milestone NAME  Add issue to milestone
--assignee USER   Assign issue to user
```

**Features:**

- Extracts all story metadata (title, epic, size, priority)
- Creates rich issue body with acceptance criteria and tasks
- Automatically updates story file with GitHub issue link
- Suggests next steps for Projects v2 setup

#### `add-issue-comment.sh`

Add a comment to a GitHub issue.

```bash
./scripts/add-issue-comment.sh <issue-number> <comment-text>

# Examples
./scripts/add-issue-comment.sh 123 "Started development"
./scripts/add-issue-comment.sh 456 "QA Review: All tests passing"
```

#### `update-issue-labels.sh`

Add or remove labels from an issue.

```bash
./scripts/update-issue-labels.sh <issue-number> [--add labels] [--remove labels]

# Examples
./scripts/update-issue-labels.sh 123 --add "priority:p1"
./scripts/update-issue-labels.sh 123 --remove "priority:p2"
./scripts/update-issue-labels.sh 123 --add "priority:p1,size:m" --remove "priority:p2"
```

**Note:** For status updates, use `update-project-status.sh` instead, which updates both Projects v2 and labels.

#### `get-issue-details.sh`

Get detailed information about an issue.

```bash
./scripts/get-issue-details.sh <issue-number> [--format json|yaml|text]

# Examples
./scripts/get-issue-details.sh 123
./scripts/get-issue-details.sh 123 --format json
./scripts/get-issue-details.sh 123 --format yaml
```

**Output includes:**

- Issue number, title, body
- State, labels, milestone
- Assignees, Projects v2 items
- Comments, timestamps, URL

#### `search-issues.sh`

Search and filter GitHub issues.

```bash
./scripts/search-issues.sh [options]

# Examples
./scripts/search-issues.sh --label "type:story" --state open
./scripts/search-issues.sh --milestone "Epic 1" --assignee @me
./scripts/search-issues.sh --label "priority:p1,status:doing" --format json
./scripts/search-issues.sh --state all --limit 50

# Options
--state STATE        Filter by state (open, closed, all). Default: open
--label LABELS       Filter by labels (comma-separated)
--milestone NAME     Filter by milestone
--assignee USER      Filter by assignee (@me for yourself)
--limit N            Limit number of results
--format FORMAT      Output format (table, json). Default: table
```

#### `link-issue-to-milestone.sh`

Link an issue to a milestone/epic.

```bash
./scripts/link-issue-to-milestone.sh <issue-number> <milestone-name>

# Examples
./scripts/link-issue-to-milestone.sh 123 "Epic 1: Foundation"
./scripts/link-issue-to-milestone.sh 456 "Sprint 2"
```

### Pull Request Management

#### `create-pr.sh`

Create a pull request.

```bash
./scripts/create-pr.sh [options]

# Examples
./scripts/create-pr.sh --title "Fix authentication bug" --body "Fixes #123"
./scripts/create-pr.sh --auto-fill --draft
./scripts/create-pr.sh --title "Add feature" --base develop --head feature/new

# Options
--title TITLE       PR title (required unless --auto-fill)
--body BODY         PR body/description
--base BRANCH       Base branch (default: main)
--head BRANCH       Head branch (default: current branch)
--draft             Create as draft PR
--auto-fill         Auto-fill title and body from commits
```

**Features:**

- Creates PR with custom or auto-filled title/body
- Supports draft PRs
- Configurable base and head branches
- Returns PR URL and number

### Project Setup

#### `init-github-project.sh`

Initialize GitHub Projects v2 for the repository.

```bash
./scripts/init-github-project.sh

# This script:
# 1. Creates a new GitHub Project
# 2. Retrieves all necessary IDs
# 3. Updates .bmad-core/core-config.yaml
# 4. Caches IDs for fast status updates
```

#### `setup-labels.sh`

Create all BMAD standard labels.

```bash
./scripts/setup-labels.sh

# Creates labels for:
# - Type (epic, story, task, bug)
# - Priority (p0-p3)
# - Size (xs-xl)
# - Status (backlog, todo, doing, review, done)
```

## Usage in Agent Workflows

### Dev Agent Example

```yaml
# In agents/dev.md

commands:
  - develop-story:
      github-status-workflow:
        on-start:
          - Extract issue number from story file
          - Run: {root}/scripts/get-project-status.sh {issue-number}
          - If not "In Progress": {root}/scripts/update-project-status.sh {issue-number} "In Progress"

        on-completion:
          - Run: {root}/scripts/update-project-status.sh {issue-number} "In Review"
          - Run: {root}/scripts/add-issue-comment.sh {issue-number} "✅ Implementation complete. Ready for QA review."
```

### QA Agent Example

```bash
# After QA review
if [ "$VERDICT" = "PASS" ]; then
  ./scripts/update-project-status.sh $ISSUE "Done"
  ./scripts/add-issue-comment.sh $ISSUE "✅ QA Review PASSED. All tests successful."
elif [ "$VERDICT" = "FAIL_MAJOR" ]; then
  ./scripts/update-project-status.sh $ISSUE "In Progress"
  ./scripts/add-issue-comment.sh $ISSUE "❌ QA Review FAILED. Major issues found. See QA Results in story file."
fi
```

### PM Agent Example

```bash
# Create a bug report
./scripts/create-issue.sh \
  --title "Fix login timeout issue" \
  --body "Users report timeout after 30 seconds" \
  --label "type:bug,priority:p1,size:s" \
  --milestone "Sprint 2" \
  --assignee @developer \
  --project 1

# Or create issue from story file
./scripts/create-github-issue-from-story.sh .bmad-stories/1.2.3.story.md --milestone "Epic 1" --assignee @developer

# Link to milestone
./scripts/link-issue-to-milestone.sh 123 "Epic 1: Foundation"

# Set initial status
./scripts/update-project-status.sh 123 "Backlog"
```

## Configuration

Scripts read configuration from `.bmad-core/core-config.yaml`:

```yaml
github:
  projects:
    enabled: true
    project_number: 1
    owner: 'your-org-or-username'

    cache:
      project_id: 'PVT_kwDOABCDEF...'
      status_field_id: 'PVTF_lADOABCDEF...'
```

## Error Handling

All scripts include:

- **Prerequisite checks**: gh CLI authentication, required parameters
- **Clear error messages**: User-friendly error reporting
- **Exit codes**: Non-zero on failure for automation
- **Fallback behavior**: Projects v2 → Labels → Silent fail (non-blocking)

## Best Practices

1. **Always use scripts instead of direct `gh` commands** in agent workflows
2. **Status updates**: Use `update-project-status.sh` (not `gh issue edit` for labels)
3. **Issue creation**: Use `create-github-issue-from-story.sh` for stories
4. **Search operations**: Use `search-issues.sh` instead of manual `gh issue list`
5. **Check script exit codes** in automated workflows
6. **Use `--format json`** for programmatic parsing of results

## Extending Scripts

To add new scripts:

1. Follow naming convention: `{verb}-{noun}.sh` (e.g., `create-milestone.sh`)
2. Include usage documentation in script header
3. Add error handling and validation
4. Support configuration from `core-config.yaml`
5. Document in this README
6. Make executable: `chmod +x scripts/{script-name}.sh`

## Common Patterns

### Get issue number from story file

```bash
ISSUE_NUM=$(grep -oP "GitHub Issue.*#\K\d+" .bmad-stories/1.0.0.story.md)
```

### Check if issue is in project

```bash
STATUS_OUTPUT=$(./scripts/get-project-status.sh $ISSUE_NUM)
if echo "$STATUS_OUTPUT" | grep -q "PROJECT_STATUS="; then
  echo "Issue is in project"
else
  echo "Issue not in project"
fi
```

### Update status based on condition

```bash
if [ "$ALL_TESTS_PASS" = "true" ]; then
  ./scripts/update-project-status.sh $ISSUE_NUM "Done"
else
  ./scripts/update-project-status.sh $ISSUE_NUM "In Progress"
fi
```

## Troubleshooting

### Script not found

```bash
# Make sure you're in the project root
cd /path/to/your/project

# Scripts are relative to root
./expansion-packs/bmad-core-github-research/scripts/update-project-status.sh
```

### Permission denied

```bash
# Make scripts executable
chmod +x expansion-packs/bmad-core-github-research/scripts/*.sh
```

### gh CLI not authenticated

```bash
# Authenticate with GitHub
gh auth login

# For Projects v2, ensure project scope
gh auth refresh -s project
```

### Projects v2 status not updating

```bash
# Check configuration
cat .bmad-core/core-config.yaml | grep -A 10 "projects:"

# Run init script to set up
./expansion-packs/bmad-core-github-research/scripts/init-github-project.sh
```

## Related Documentation

- [GitHub Workflow Guide](../data/github-workflow.md) - Complete workflow with Projects v2 and labels
- [Projects v2 Integration](../PROJECTS-V2-INTEGRATION-SUMMARY.md) - Technical implementation details
- [Agent GitHub Integration Status](../AGENT-GITHUB-INTEGRATION-STATUS.md) - Agent automation status

---

**For questions or issues, please refer to the BMAD-Core-GitHub documentation or create an issue in the repository.**
