# Archon Develop Task

## Purpose

Implement a task from Archon using research-driven development workflow.

## Prerequisites

- Archon project initialized (project_id available)
- Dev agent active
- task_id provided or retrieved

## Task Steps

### 1. Retrieve Task

```
If task_id provided:
  Execute: mcp__archon__find_tasks(task_id=task_id)
Else:
  Execute: mcp__archon__find_tasks(
    project_id=project_id,
    filter_by="status",
    filter_value="todo",
    per_page=1
  )
  Ask user: "Work on this task? (yes/no)"
  If no: Ask for task_id

Store task details:
- task_id
- title
- description
- feature
- acceptance_criteria (parse from description)
```

### 2. Display Task Details

```
Display: "
═══════════════════════════════════════
TASK DETAILS
═══════════════════════════════════════
ID: {task_id}
Title: {title}
Feature: {feature}
Status: {status}
Assigned: {assignee}

DESCRIPTION:
{description}

ACCEPTANCE CRITERIA:
{parse and display criteria checkboxes}
═══════════════════════════════════════
"

Ask user: "Proceed with implementation? (yes/no)"
If no: HALT
```

### 3. Mark Task as Doing

```
Execute: mcp__archon__manage_task(
  action="update",
  task_id=task_id,
  status="doing",
  assignee="James"
)

Display: "✓ Task status: todo → doing"
```

### 4. Research Phase

```
Display: "=== RESEARCH PHASE ==="

# Search knowledge base for relevant patterns
Ask user: "Key technologies for this task (2-5 keywords):"
Store as: tech_keywords

Execute: mcp__archon__rag_search_knowledge_base(
  query=tech_keywords,
  match_count=5
)
Display findings

# Search for code examples
Execute: mcp__archon__rag_search_code_examples(
  query=tech_keywords,
  match_count=3
)
Display code examples

# Check project documentation
Execute: mcp__archon__find_documents(
  project_id=project_id,
  document_type="spec"
)
Display relevant specs

Execute: mcp__archon__find_documents(
  project_id=project_id,
  document_type="design"
)
Display architecture docs

Ask user: "Research complete? Ready to implement? (yes/no)"
If no: Allow more research queries
```

### 5. Implementation Planning

```
Based on acceptance criteria, plan implementation:

Display: "=== IMPLEMENTATION PLAN ==="
For each criterion in acceptance_criteria:
  Display: "- {criterion}"

Ask user: "Break down into steps? (yes/no)"
If yes:
  Ask user: "Enter implementation steps (one per line, double-enter when done):"
  Collect steps
  Display numbered steps
```

### 6. Implementation

```
Display: "=== IMPLEMENTATION PHASE ==="

For each implementation step or criterion:
  Display: "Working on: {step}"

  # Agent implements using Read/Write/Edit tools
  # Code stays in Git

  After implementing each step:
    Update task description with progress:
    Execute: mcp__archon__manage_task(
      action="update",
      task_id=task_id,
      description="{original_description}\n\n--- PROGRESS LOG ---\n[{timestamp}] Implemented: {step}\nFiles modified: {files}\nNotes: {notes}"
    )

    Display: "✓ {step} - logged to Archon"

Ask user: "Implementation complete? (yes/no)"
If no: Continue implementation
```

### 7. Testing Phase

```
Display: "=== TESTING PHASE ==="

Ask user: "Run tests? (yes/no)"
If yes:
  # Run tests using Bash tool
  Execute tests
  Store results

  Update task with test results:
  Execute: mcp__archon__manage_task(
    action="update",
    task_id=task_id,
    description="{current_description}\n\n--- TEST RESULTS ---\n{test_output}\nStatus: {pass/fail}"
  )

If tests fail:
  Display: "Tests failed. Fix issues?"
  If yes: Go back to step 6
  If no: Mark task status as "doing" and HALT
```

### 8. Validate Acceptance Criteria

```
Display: "=== VALIDATION PHASE ==="

For each criterion in acceptance_criteria:
  Display: "- {criterion}"
  Ask user: "Criterion met? (yes/no)"
  Store responses

If all criteria met:
  Continue to step 9
Else:
  Display: "Not all criteria met. Continue working?"
  If yes: Go back to step 6
  If no: HALT
```

### 9. Mark for Review

```
Execute: mcp__archon__manage_task(
  action="update",
  task_id=task_id,
  status="review",
  description="{current_description}\n\n--- READY FOR REVIEW ---\n[{timestamp}] Dev complete, all acceptance criteria met\nImplemented by: James\nTest status: {test_status}"
)

Display: "✓ Task status: doing → review"
```

### 10. Summary

```
Display: "
═══════════════════════════════════════
TASK DEVELOPMENT COMPLETE
═══════════════════════════════════════
Task: {title}
ID: {task_id}
Status: review
Files Modified: {file_count}
Tests: {test_status}
═══════════════════════════════════════
Task is now in review queue for QA.
Use *next-task to get another task.
"
```

## Error Handling

```
If implementation blocked:
  Update task status back to "todo"
  Add blocker note to description:
  Execute: mcp__archon__manage_task(
    action="update",
    task_id=task_id,
    status="todo",
    description="{current_description}\n\n--- BLOCKED ---\n[{timestamp}] Blocker: {reason}\nRequires: {what_needed}"
  )

  Display: "Task marked as blocked. Blocker logged to Archon."
  HALT
```

## Output

- Task implemented
- Code in Git
- Task status updated to "review"
- Progress logged in Archon task description
- Tests run and results logged

## Notes

- ONLY update task status and description in Archon
- Code and tests stay in Git
- Research before implementing
- Log all progress to task description
- ONLY ONE task in "doing" status at a time
