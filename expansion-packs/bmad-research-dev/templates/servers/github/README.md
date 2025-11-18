# GitHub Server Functions (Python)

Wrappers for GitHub CLI (`gh`) for issue and project management.

## Setup

1. Install GitHub CLI:

```bash
# macOS
brew install gh

# Other platforms: https://cli.github.com/
```

2. Authenticate:

```bash
gh auth login
```

No additional Python dependencies required (uses subprocess to call `gh`).

## Available Functions

### search_issues.py

- `search_issues()` - Search issues with filters
- `get_open_issues()` - Get all open issues
- `get_issues_by_label()` - Filter by label
- `get_issues_by_milestone()` - Filter by milestone
- `search_research_issues()` - Search research-specific issues

### create_issue.py

- `create_issue()` - Create new issue
- `create_bug_report()` - Create bug report
- `create_experiment_issue()` - Create experiment issue
- `create_literature_review_issue()` - Create literature review
- `create_epic()` - Create epic with child stories

### update_issue.py

- `update_issue()` - Update issue fields
- `update_status()` - Update BMAD workflow status
- `move_to_doing()` - Move to "in progress"
- `add_comment()` - Add comment to issue
- `add_experiment_results()` - Add experiment results

### projects.py

- `create_project()` - Create new project
- `list_projects()` - List all projects
- `add_issue_to_project()` - Add issue to project
- `create_research_project()` - Create research project template

## Usage Examples

```python
from servers.github.search_issues import search_issues, get_open_issues
from servers.github.create_issue import create_experiment_issue
from servers.github.update_issue import move_to_doing, add_experiment_results

# Search issues
bugs = search_issues("label:bug is:open")
open_issues = get_open_issues(limit=50)

# Create experiment issue
experiment = create_experiment_issue(
    "Test Flash Attention Performance",
    hypothesis="Flash Attention will be 2x faster",
    methodology="Benchmark on GPT-2 model",
    expected_results="50% speedup",
    milestone="Research Phase 2"
)

# Update issue status
move_to_doing(experiment['number'], assignee="@me")

# Add results
add_experiment_results(
    experiment['number'],
    "flash-attention-v1",
    status="success",
    metrics={"speedup": 2.3, "memory": 0.7},
    findings="Exceeded expectations!",
    next_steps="Test on larger models"
)
```

## BMAD Workflow Labels

Status labels:

- `status:backlog` - Not yet started
- `status:todo` - Ready to start
- `status:doing` - In progress
- `status:review` - Under review
- `status:done` - Completed

Research labels:

- `research:experiment` - Experiment tracking
- `research:literature` - Literature review
- `research:analysis` - Data analysis
- `research:paper` - Paper writing

## API Documentation

GitHub CLI docs: https://cli.github.com/manual/
