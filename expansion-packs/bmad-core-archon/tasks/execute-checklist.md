# Execute Checklist Task

## Purpose

Execute a checklist interactively, tracking completion status.

## Prerequisites

- Checklist file path provided
- Agent active

## Task Steps

### 1. Load Checklist

```
Read checklist file from: {root}/checklists/{checklist_name}.md
Parse checklist items
```

### 2. Display Checklist

```
Display: "
═══════════════════════════════════════
CHECKLIST: {checklist_name}
═══════════════════════════════════════
"

For each item in checklist:
  Display: "[ ] {item}"
```

### 3. Execute Checklist

```
For each item:
  Display: "\nChecking: {item}"

  Ask user: "Is this complete? (yes/no/skip)"

  If yes:
    Mark: [x] {item}
  If no:
    Display: "What needs to be done?"
    Store blocker
  If skip:
    Mark: [-] {item} (skipped)

  Display progress: "{completed}/{total} complete"
```

### 4. Summary

```
Display: "
═══════════════════════════════════════
CHECKLIST COMPLETE
═══════════════════════════════════════
Completed: {completed_count}
Skipped: {skipped_count}
Blocked: {blocked_count}
═══════════════════════════════════════
"

If any blocked:
  Display: "BLOCKERS:"
  For each blocked item:
    Display: "- {item}: {blocker_reason}"
```

## Output

- Checklist execution results
- Blocker list if any
- Completion status

## Notes

- Checklists are in {root}/checklists/ folder
- Use for quality gates, DoD verification, etc.
