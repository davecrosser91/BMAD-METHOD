# Archon Create Story Task

## Purpose

Create a user story as an Archon task with full acceptance criteria and requirements.

## Prerequisites

- Archon project initialized (project_id available)
- Optionally: Epic/feature identified

## Task Steps

### 1. Identify Context

```
Ask user: "Is this story part of an existing epic/feature? (yes/no)"

If yes:
  Execute: mcp__archon__find_tasks(
    project_id=project_id,
    query="Epic"
  )
  Display epics found
  Ask user: "Select epic number or enter feature name:"
  Store as: feature_name

If no:
  Ask user: "Enter feature name for grouping (e.g., 'auth', 'user-profile'):"
  Store as: feature_name
```

### 2. Research Similar Stories

```
Execute: mcp__archon__rag_search_knowledge_base(
  query="{feature_name} user stories",
  match_count=3
)

Display: "Found {count} relevant patterns"
Show key insights to user
```

### 3. Elicit Story Details (elicit=true)

```
Ask user (structured format):

1. "Story Title (e.g., 'User can login with email and password'):"
   Store as: story_title

2. "As a [user type]:"
   Store as: user_type

3. "I want to [action]:"
   Store as: action

4. "So that [benefit]:"
   Store as: benefit

5. "Acceptance Criteria (one per line, press enter twice when done):"
   Collect lines until double-enter
   Store as: acceptance_criteria[]

6. "Technical Notes/Considerations (optional):"
   Store as: tech_notes

7. "Dependencies/Blockers (optional):"
   Store as: dependencies

8. "Estimate (hours, optional):"
   Store as: estimate
```

### 4. Build Story Description

```
Build description text:
"""
USER STORY:
As a {user_type}
I want to {action}
So that {benefit}

ACCEPTANCE CRITERIA:
{for criterion in acceptance_criteria:}
- [ ] {criterion}

TECHNICAL NOTES:
{tech_notes}

DEPENDENCIES:
{dependencies}

ESTIMATE: {estimate} hours

IMPLEMENTATION NOTES:
(Dev will update this section during implementation)
"""
```

### 5. Determine Priority

```
Ask user: "Priority level (1-100, higher = more urgent):"
Store as: priority
Default: 50 if not provided

Suggest based on context:
- Critical/Blocker: 90-100
- High: 70-89
- Medium: 40-69
- Low: 1-39
```

### 6. Assign Story

```
Ask user: "Assign to (leave empty for 'User', or enter name):"
Store as: assignee
Default: "User"

Common assignees:
- James (Dev)
- Maria (QA)
- User (unassigned)
```

### 7. Create Story in Archon

```
Execute: mcp__archon__manage_task(
  action="create",
  project_id=project_id,
  title=story_title,
  description=description,
  feature=feature_name,
  status="todo",
  task_order=priority,
  assignee=assignee
)

Store: task_id from response
Display: "✓ Created story: {story_title} (ID: {task_id})"
```

### 8. Link to PRD (Optional)

```
Ask user: "Link to PRD document? (yes/no)"

If yes:
  Execute: mcp__archon__find_documents(
    project_id=project_id,
    document_type="spec"
  )
  Display PRDs found
  Ask user: "Select PRD number:"
  Store: prd_document_id

  Update task description with:
  "LINKED PRD: {prd_document_id}"
```

### 9. Create Subtasks (Optional)

```
Ask user: "Create subtasks/implementation steps? (yes/no)"

If yes:
  Ask user: "Enter subtasks (one per line, press enter twice when done):"
  Collect lines until double-enter
  Store as: subtasks[]

  For each subtask in subtasks:
    Execute: mcp__archon__manage_task(
      action="create",
      project_id=project_id,
      title="{story_title} - {subtask}",
      description="Subtask of: {task_id}\n\n{subtask}",
      feature=feature_name,
      status="todo",
      task_order=priority - 1,
      assignee=assignee
    )
    Display: "  ✓ Created subtask: {subtask}"
```

### 10. Summary

```
Display: "
═══════════════════════════════════════
STORY CREATED IN ARCHON
═══════════════════════════════════════
Title: {story_title}
Task ID: {task_id}
Feature: {feature_name}
Priority: {priority}
Assigned: {assignee}
Status: todo
Subtasks: {subtask_count}
═══════════════════════════════════════
View in Archon UI or use *list-tasks to see all tasks.
Dev can start work with: *develop-task {task_id}
"
```

## Batch Story Creation

```
If user wants to create multiple stories:

Ask user: "Create multiple stories? (yes/no)"

If yes:
  Ask user: "How many stories?"
  Store as: story_count

  For i in range(story_count):
    Display: "\n=== Story {i+1} of {story_count} ==="
    Run steps 3-7
    Add to batch summary

  Display batch summary with all task_ids
```

## Output

- Story created as Archon task
- task_id available for reference
- Linked to feature/epic
- Optionally linked to PRD
- Optionally has subtasks

## Notes

- Stories stored as tasks (not documents)
- Use feature field for grouping
- Acceptance criteria in description
- task_order determines priority
- Description follows standard format for consistency
