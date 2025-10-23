# GitHub Projects v2 Status vs Labels: Ultrathink Analysis

## Executive Summary

**RECOMMENDATION**: Use **GitHub Projects v2 Status fields** as the primary workflow mechanism, with **Labels as optional metadata** for filtering and categorization.

**Why**: Projects v2 Status fields are structured, single-select, workflow-enforcing fields that integrate natively with project boards. Labels are unstructured tags best suited for categorization, not workflow state management.

---

## Key Differences

### 1. **Scope and Structure**

| Aspect         | Labels                           | Projects v2 Status                   |
| -------------- | -------------------------------- | ------------------------------------ |
| **Scope**      | Repository-level                 | Project-level                        |
| **Type**       | Unstructured tags (multi-select) | Structured field (single-select)     |
| **Location**   | Stored on issue/PR directly      | Stored in project item               |
| **Visibility** | Prominent in lists               | Hidden (requires click on "+x more") |
| **Cross-repo** | No                               | Yes (projects can span repos)        |

### 2. **Workflow Enforcement**

| Feature                       | Labels                                  | Projects v2 Status                 |
| ----------------------------- | --------------------------------------- | ---------------------------------- |
| **Single-select enforcement** | ❌ No (can have multiple status labels) | ✅ Yes (only one status at a time) |
| **Kanban columns**            | Manual sync required                    | ✅ Native integration              |
| **Workflow automation**       | Via GitHub Actions (label-based)        | ✅ Built-in (status-based)         |
| **State machine**             | ❌ No enforcement                       | ✅ Enforced by field type          |

### 3. **CLI Access**

| Operation      | Labels                                           | Projects v2 Status                                                                       |
| -------------- | ------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| **Add/Update** | `gh issue edit <num> --add-label "status:doing"` | `gh project item-edit --id <item> --field-id <field> --single-select-option-id <option>` |
| **Complexity** | ✅ Simple (1 command)                            | ⚠️ Complex (requires multiple IDs)                                                       |
| **Setup**      | ✅ None                                          | ⚠️ Requires project setup + ID retrieval                                                 |
| **Auth scope** | Default                                          | Requires `project` scope                                                                 |

---

## The Problem With Labels for Status

### Issue 1: No Single-Select Enforcement

```bash
# This is possible with labels (but wrong):
gh issue edit 123 --add-label "status:backlog"
gh issue edit 123 --add-label "status:doing"
gh issue edit 123 --add-label "status:done"
# Result: Issue has 3 status labels! ❌
```

You must manually remove old labels:

```bash
gh issue edit 123 --remove-label "status:doing" --add-label "status:review"
```

### Issue 2: Duplicate Information

If you use both labels AND project status fields:

- Dev updates label: `status:doing`
- PM updates project status: "In Progress"
- **These don't sync!** Now you have two sources of truth.

### Issue 3: Poor Project Board Integration

Labels don't automatically move cards on project boards. You need custom GitHub Actions to sync labels → project columns.

---

## The Benefits of Projects v2 Status

### Benefit 1: True Workflow State Management

```
Status field = single-select enum
- ✅ Only one status at a time (enforced by GitHub)
- ✅ Clear state transitions
- ✅ No duplicate status values
```

### Benefit 2: Native Kanban Integration

```
Project Board Column ← directly bound to → Status Field
- Change status → card moves automatically
- Move card → status updates automatically
- No sync needed!
```

### Benefit 3: Cross-Repository Support

A single project can track issues from multiple repositories, all with consistent status fields.

### Benefit 4: Richer Metadata

Projects v2 supports:

- Text fields
- Number fields
- Date fields
- Iteration fields
- Single-select fields (Status)
- Multi-select fields (Labels still available!)

---

## The Challenge: CLI Complexity

### Labels (Simple)

```bash
# One command:
gh issue edit 123 --add-label "status:doing"
```

### Projects v2 Status (Complex)

```bash
# Step 1: Get Project ID
PROJECT_ID=$(gh project view 1 --owner myorg --format json | jq -r '.id')

# Step 2: Get Status Field ID
FIELD_ID=$(gh project field-list 1 --owner myorg --format json | jq -r '.fields[] | select(.name=="Status") | .id')

# Step 3: Get Status Option ID for "In Progress"
OPTION_ID=$(gh project field-list 1 --owner myorg --format json | jq -r '.fields[] | select(.name=="Status") | .options[] | select(.name=="In Progress") | .id')

# Step 4: Add issue to project and get item ID
ITEM_ID=$(gh project item-add 1 --owner myorg --url https://github.com/myorg/myrepo/issues/123 --format json | jq -r '.id')

# Step 5: Update status
gh project item-edit \
  --id "$ITEM_ID" \
  --project-id "$PROJECT_ID" \
  --field-id "$FIELD_ID" \
  --single-select-option-id "$OPTION_ID"
```

**This is 5 steps vs 1 step for labels!**

---

## Recommended Hybrid Approach

### Use Projects v2 Status for Workflow State

**Primary mechanism** for tracking where an issue is in the workflow:

- Backlog
- Todo
- In Progress
- In Review
- Done

**Updated by**: Dev agent, QA agent, PM during sprint planning

### Use Labels for Metadata and Categorization

**Secondary mechanism** for filtering and categorization:

- Type: `type:story`, `type:bug`, `type:epic`
- Priority: `priority:p0`, `priority:p1`, `priority:p2`
- Size: `size:s`, `size:m`, `size:l`
- Component: `component:frontend`, `component:backend`
- Feature Area: `area:auth`, `area:payments`

**Updated by**: PM during issue creation, manually as needed

---

## Implementation Strategy

### Phase 1: Setup GitHub Project (One-time)

```bash
# 1. Create project
gh project create --owner myorg --title "BMAD Project"

# 2. Add Status field (if not exists)
# Status field is created by default in new projects

# 3. Configure status options
# Default options: "Backlog", "Todo", "In Progress", "Done"
# Customize via web UI if needed: "In Progress" → "Doing", add "Review"
```

### Phase 2: Create Helper Script

Create `.bmad-core-github/scripts/update-project-status.sh`:

```bash
#!/bin/bash
# Usage: ./update-project-status.sh <issue-number> <status>
# Example: ./update-project-status.sh 123 "In Progress"

ISSUE_NUM=$1
STATUS=$2

# Cache these values (can be stored in config)
PROJECT_NUMBER="1" # Or get from config
OWNER="myorg"     # Or get from git remote

# Get/cache IDs
PROJECT_ID=$(gh project view $PROJECT_NUMBER --owner $OWNER --format json | jq -r '.id')
FIELD_ID=$(gh project field-list $PROJECT_NUMBER --owner $OWNER --format json | jq -r '.fields[] | select(.name=="Status") | .id')
OPTION_ID=$(gh project field-list $PROJECT_NUMBER --owner $OWNER --format json | jq -r '.fields[] | select(.name=="Status") | .options[] | select(.name=="'"$STATUS"'") | .id')

# Get item ID (or add to project if not present)
ITEM_ID=$(gh project item-list $PROJECT_NUMBER --owner $OWNER --format json | jq -r --arg issue "$ISSUE_NUM" '.items[] | select(.content.number == ($issue | tonumber)) | .id')

if [ -z "$ITEM_ID" ]; then
  # Add issue to project
  REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner)
  ITEM_ID=$(gh project item-add $PROJECT_NUMBER --owner $OWNER --url "https://github.com/$REPO/issues/$ISSUE_NUM" --format json | jq -r '.id')
fi

# Update status
gh project item-edit \
  --id "$ITEM_ID" \
  --project-id "$PROJECT_ID" \
  --field-id "$FIELD_ID" \
  --single-select-option-id "$OPTION_ID"

echo "✅ Updated issue #$ISSUE_NUM status to: $STATUS"
```

### Phase 3: Update Agent Automation

**Dev Agent** (`agents/dev.md`):

```yaml
github-integration:
  on-story-start:
    - command: .bmad-core-github/scripts/update-project-status.sh {issue-number} "In Progress"
    - fallback: gh issue edit {issue-number} --add-label "status:doing"
  on-story-complete:
    - command: .bmad-core-github/scripts/update-project-status.sh {issue-number} "In Review"
    - fallback: gh issue edit {issue-number} --remove-label "status:doing" --add-label "status:review"
```

**QA Agent** (`agents/qa.md`):

```yaml
github-integration:
  on-qa-pass:
    - command: .bmad-core-github/scripts/update-project-status.sh {issue-number} "Done"
    - fallback: gh issue edit {issue-number} --remove-label "status:review" --add-label "status:done"
  on-qa-fail:
    - command: .bmad-core-github/scripts/update-project-status.sh {issue-number} "In Progress"
    - fallback: gh issue edit {issue-number} --remove-label "status:review" --add-label "status:doing"
```

---

## Configuration in `core-config.yaml`

```yaml
github:
  # Primary workflow tracking mechanism
  projects:
    enabled: true
    project_number: 1
    owner: 'myorg' # Or read from git remote

    # Status field configuration
    status_field:
      name: 'Status'
      options:
        backlog: 'Backlog'
        todo: 'Todo'
        doing: 'In Progress'
        review: 'In Review'
        done: 'Done'

    # Cache IDs to avoid repeated lookups
    cache:
      project_id: 'PVT_kwDOABCDEF'
      status_field_id: 'PVTF_lADOABCDEF'
      option_ids:
        backlog: 'TODO_OPTION_ID_1'
        todo: 'TODO_OPTION_ID_2'
        doing: 'TODO_OPTION_ID_3'
        review: 'TODO_OPTION_ID_4'
        done: 'TODO_OPTION_ID_5'

  # Secondary metadata mechanism (optional)
  labels:
    enabled: true
    sync_with_status: false # Don't duplicate status in labels

    # Only use labels for categorization
    categories:
      - type # type:story, type:bug, type:epic
      - priority # priority:p0, priority:p1, priority:p2
      - size # size:s, size:m, size:l
```

---

## Migration Path

### For Existing Projects Using Labels

**Option 1: Gradual Migration** (Recommended)

1. Keep existing status labels
2. Add GitHub Project with Status field
3. Use helper script that updates BOTH:
   ```bash
   # Update both status field AND labels
   ./update-project-status.sh 123 "In Progress"
   gh issue edit 123 --remove-label "status:todo" --add-label "status:doing"
   ```
4. After validation period, remove label updates

**Option 2: Clean Break**

1. Create GitHub Project
2. Bulk import all issues to project
3. Set status fields based on current labels:
   ```bash
   # For each issue with status:doing label
   gh issue list --label "status:doing" --json number -q '.[].number' | while read issue; do
     ./update-project-status.sh $issue "In Progress"
   done
   ```
4. Remove all status labels:
   ```bash
   gh issue list --label "status:doing" --json number -q '.[].number' | while read issue; do
     gh issue edit $issue --remove-label "status:doing"
   done
   ```

---

## Pros and Cons Summary

### Projects v2 Status Fields

**Pros:**
✅ Single-select enforcement (only one status)
✅ Native kanban board integration
✅ Workflow state machine
✅ Cross-repository support
✅ Structured data (better for reporting)
✅ Future-proof (GitHub's direction)

**Cons:**
❌ More complex CLI commands (5 steps vs 1)
❌ Requires project setup
❌ Requires `project` auth scope
❌ Less visible on issue lists (hidden by default)
❌ Steeper learning curve

### Labels

**Pros:**
✅ Simple CLI commands (1 step)
✅ Prominent visibility on issue lists
✅ No setup required
✅ Default auth scope
✅ Familiar to all GitHub users

**Cons:**
❌ No single-select enforcement (can have multiple status labels)
❌ Manual kanban sync required
❌ No workflow enforcement
❌ Repository-scoped only
❌ Unstructured data (harder to query/report)

---

## Final Recommendation

### For bmad-core-github v2.1.0

**Primary Workflow**: GitHub Projects v2 Status Fields
**Secondary Metadata**: Labels for type/priority/size

**Implementation Plan:**

1. ✅ Create helper script: `scripts/update-project-status.sh`
2. ✅ Update agents to use helper script
3. ✅ Add fallback to labels if project unavailable
4. ✅ Update documentation with setup guide
5. ✅ Add project configuration to core-config.yaml
6. ✅ Update automated-qa-review.yml to use projects

**User Experience:**

- **Setup once**: Create GitHub Project, run init script to cache IDs
- **Use seamlessly**: Agents update project status automatically
- **Fallback gracefully**: If project unavailable, use labels
- **Best of both worlds**: Status in project, metadata in labels

---

## References

- [GitHub Projects v2 Documentation](https://docs.github.com/en/issues/planning-and-tracking-with-projects)
- [GitHub CLI project commands](https://cli.github.com/manual/gh_project)
- [Understanding Fields in Projects v2](https://docs.github.com/en/issues/planning-and-tracking-with-projects/understanding-fields)
- [Using the API to manage Projects](https://docs.github.com/en/issues/planning-and-tracking-with-projects/automating-your-project/using-the-api-to-manage-projects)
