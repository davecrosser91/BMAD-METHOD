# BMAD Research-Dev Helper Scripts

**UNIFIED EXPANSION PACK**: This pack now contains the complete bmad-core-github foundation PLUS research extensions.

This directory contains helper scripts for:

- **GitHub Workflow Automation** (from bmad-core-github)
- **Research-Specific Operations** (research extensions)

## Why Use These Scripts?

**Benefits:**

- ✅ **Consistent Frontmatter**: Standardized metadata format
- ✅ **Automated Setup**: Quick experiment and document creation
- ✅ **Local Tracking**: No external dependencies (no wandb MCP)
- ✅ **Validation**: Catch errors before they become problems
- ✅ **Reporting**: HTML dashboards for experiment browsing
- ✅ **LaTeX Compilation**: Automated paper building

## Available Scripts

### GitHub Workflow Automation (from bmad-core-github)

#### Projects v2 Status Management

**`update-project-status.sh`**
Update GitHub Projects v2 status field for an issue.

```bash
./scripts/update-project-status.sh <issue-number> <status>

# Examples
./scripts/update-project-status.sh 123 "In Progress"
./scripts/update-project-status.sh 456 "Done"

# Valid statuses: Backlog, Todo, In Progress, In Review, Done
```

**`get-project-status.sh`**
Get current Projects v2 status for an issue.

```bash
./scripts/get-project-status.sh <issue-number>

# Output (machine-readable)
ISSUE_NUMBER=123
ISSUE_TITLE=Add authentication
ISSUE_STATE=OPEN
PROJECT_STATUS=In Progress
```

#### Issue Management

**`create-issue.sh`**
Create a GitHub issue with custom title, body, labels, and metadata.

```bash
./scripts/create-issue.sh --title "TITLE" --body "BODY" [options]

# Options
--label LABELS      Labels (comma-separated)
--milestone NAME    Milestone to add issue to
--assignee USER     Assignee (@me for yourself)
--project NUMBER    Project number to add issue to
```

**`create-github-issue-from-story.sh`**
Create a GitHub issue from a BMAD story file.

```bash
./scripts/create-github-issue-from-story.sh <story-file> [options]
```

**`add-issue-comment.sh`**
Add a comment to a GitHub issue.

```bash
./scripts/add-issue-comment.sh <issue-number> <comment-text>
```

**`update-issue-labels.sh`**
Add or remove labels from an issue.

```bash
./scripts/update-issue-labels.sh <issue-number> [--add labels] [--remove labels]
```

**`get-issue-details.sh`**
Get detailed information about an issue.

```bash
./scripts/get-issue-details.sh <issue-number> [--format json|yaml|text]
```

**`search-issues.sh`**
Search and filter GitHub issues.

```bash
./scripts/search-issues.sh [options]
```

**`link-issue-to-milestone.sh`**
Link an issue to a milestone/epic.

```bash
./scripts/link-issue-to-milestone.sh <issue-number> <milestone-name>
```

#### Pull Request Management

**`create-pr.sh`**
Create a pull request.

```bash
./scripts/create-pr.sh [options]

# Options
--title TITLE       PR title
--body BODY         PR body/description
--base BRANCH       Base branch (default: main)
--head BRANCH       Head branch (default: current branch)
--draft             Create as draft PR
--auto-fill         Auto-fill title and body from commits
```

#### Project Setup

**`init-github-project.sh`**
Initialize GitHub Projects v2 for the repository.

**`setup-labels.sh`**
Create all BMAD standard labels.

---

### Experiment Management (Research Extensions)

#### `create-experiment-spec.sh`

Create experiment specification with proper frontmatter metadata.

```bash
./scripts/create-experiment-spec.sh <exp-id> <title> <hypothesis>

# Example
./scripts/create-experiment-spec.sh exp-001 "Novel Optimizer" "New algorithm converges 2x faster"
```

**Creates:**

- docs/research/experiments/experiment-{exp-id}.md
- Properly formatted frontmatter
- Experiment specification template

**Next steps after creation:**

1. Edit the spec file to fill in methodology details
2. Create GitHub issue with `type:experiment` label
3. Link GitHub issue number in frontmatter
4. Implement experiment in experiments/{exp-id}/

---

#### `log-experiment-metrics.sh`

Log experiment metrics to JSON file for tracking.

```bash
./scripts/log-experiment-metrics.sh <exp-id> <metric> <value> [<metric> <value> ...]

# Example
./scripts/log-experiment-metrics.sh exp-001 accuracy 0.95 loss 0.05 f1_score 0.93
```

**Creates/Updates:**

- results/experiments/{exp-id}/metrics.json

**JSON Format:**

```json
{
  "experiment_id": "exp-001",
  "timestamp": "2025-11-16T10:30:00Z",
  "metrics": {
    "accuracy": 0.95,
    "loss": 0.05,
    "f1_score": 0.93
  },
  "status": "completed"
}
```

---

### Validation

#### `validate-frontmatter.sh`

Validate frontmatter in markdown documents.

```bash
# Validate single file
./scripts/validate-frontmatter.sh docs/research/experiments/experiment-001.md

# Validate all research documents
./scripts/validate-frontmatter.sh --all
```

**Checks:**

- Required fields present (type, title, status, created)
- Valid status values (draft, active, completed, archived)
- Valid document types
- Date format (YYYY-MM-DD)
- Optional field formats

---

### Reporting

#### `generate-html-report.sh`

Generate interactive HTML dashboard of all experiments.

```bash
./scripts/generate-html-report.sh
```

**Creates:**

- results/reports/experiment-report.html

**Features:**

- Summary cards (total, completed, running, failed)
- Experiment table with metrics
- Status indicators
- Timestamps
- Responsive design

**To view:**

```bash
# macOS
open results/reports/experiment-report.html

# Linux
xdg-open results/reports/experiment-report.html
```

---

### Paper Writing

#### `compile-paper.sh`

Compile LaTeX paper in research-paper/ directory.

```bash
# Compile once
./scripts/compile-paper.sh

# Clean auxiliary files
./scripts/compile-paper.sh clean

# Watch mode (recompile on changes)
./scripts/compile-paper.sh watch
```

**Requirements:**

- pdflatex installed
- bibtex installed (optional, for citations)
- fswatch (for watch mode, optional)

**Installation:**

```bash
# macOS
brew install mactex
brew install fswatch

# Linux (Ubuntu/Debian)
sudo apt-get install texlive-full
sudo apt-get install inotify-tools
```

**What it does:**

1. Runs pdflatex (first pass)
2. Runs bibtex (if .bib file exists)
3. Runs pdflatex (second pass, for references)
4. Runs pdflatex (third pass, for citations)
5. Checks for warnings and undefined references

**Output:**

- research-paper/main.pdf

---

## Usage in Agent Workflows

### Enhanced Analyst Example

When creating research proposal:

```bash
# Analyst creates proposal document with proper frontmatter
# Then validates it
./scripts/validate-frontmatter.sh docs/research/proposals/proposal-001.md
```

### Developer Example

When implementing experiment:

```bash
# Create experiment spec
./scripts/create-experiment-spec.sh exp-042 "Test New Architecture" "Architecture improves accuracy by 10%"

# After running experiment, log metrics
./scripts/log-experiment-metrics.sh exp-042 accuracy 0.87 training_time 3600 memory_gb 8.5
```

### Data Analyst Example

After analyzing results:

```bash
# Generate HTML report to browse all experiments
./scripts/generate-html-report.sh

# Open report
open results/reports/experiment-report.html
```

### Paper Writer Example

When writing paper:

```bash
# Compile paper to check formatting
./scripts/compile-paper.sh

# Run in watch mode during editing
./scripts/compile-paper.sh watch

# Clean before submission
./scripts/compile-paper.sh clean
./scripts/compile-paper.sh  # Final compile
```

---

## Configuration

Scripts read from the expansion pack config:

- `config.yaml` in expansion pack root

Key config sections:

```yaml
documents:
  storage: local-files
  use_frontmatter: true
  frontmatter_schema:
    required_fields: [type, title, status, created]
    status_values: [draft, active, completed, archived]

experiments:
  tracking:
    use_local: true
    metrics_format: json
    results_path: results/experiments/
```

---

## Error Handling

All scripts include:

- **Prerequisite checks**: Required files/directories exist
- **Clear error messages**: User-friendly reporting
- **Exit codes**: Non-zero on failure for automation
- **Color-coded output**: Red (error), Yellow (warning), Green (success)

---

## Extending Scripts

To add new scripts:

1. Follow naming convention: `{verb}-{noun}.sh`
2. Include usage documentation in script header
3. Add error handling and validation
4. Use color-coded output
5. Document in this README
6. Make executable: `chmod +x scripts/{script-name}.sh`

---

## Common Workflows

### Complete Experiment Workflow

```bash
# 1. Create experiment spec
./scripts/create-experiment-spec.sh exp-003 "Novel Method" "Method X improves metric Y"

# 2. Edit spec file
code docs/research/experiments/experiment-exp-003.md

# 3. Create GitHub issue
gh issue create --title "Experiment: Novel Method" --label "type:experiment,research:experiment"

# 4. Implement experiment
# (Dev writes code in experiments/exp-003/)

# 5. Run experiment and log metrics
./scripts/log-experiment-metrics.sh exp-003 accuracy 0.92 precision 0.89 recall 0.91

# 6. Generate HTML report
./scripts/generate-html-report.sh
open results/reports/experiment-report.html

# 7. Analyze results
# (Data Analyst creates figures, tables)

# 8. Write paper section
# (Paper Writer incorporates results)
./scripts/compile-paper.sh
```

### Validate All Documents

```bash
# Check all research documents have proper frontmatter
./scripts/validate-frontmatter.sh --all

# Fix any errors found
# Then commit
git add docs/research/
git commit -m "docs: update research documents with validated frontmatter"
```

---

## Troubleshooting

### Script not found

```bash
# Make sure you're in the project root
cd /path/to/your/project

# Scripts are relative to root
./expansion-packs/bmad-research-dev/scripts/create-experiment-spec.sh
```

### Permission denied

```bash
# Make scripts executable
chmod +x expansion-packs/bmad-research-dev/scripts/*.sh
```

### jq not found

```bash
# Install jq for JSON processing
# macOS
brew install jq

# Linux
sudo apt-get install jq
```

### pdflatex not found

```bash
# Install LaTeX distribution
# macOS
brew install mactex

# Linux
sudo apt-get install texlive-full
```

---

## Related Documentation

- [config.yaml](../config.yaml) - Expansion pack configuration
- [Enhanced Analyst Agent](../agents/enhanced-analyst.md) - Research proposal creation
- [Data Analyst Agent](../agents/data-analyst.md) - Local experiment tracking
- [Paper Writer Agent](../agents/paper-writer.md) - LaTeX paper writing

---

**For questions or issues, please refer to the BMAD Research-Dev documentation or create an issue in the repository.**
