# Archon Create Epic Task

## Purpose

Create an epic as an Archon task that groups related user stories.

## Prerequisites

- Archon project initialized (project_id available)

## Task Steps

### 1. Research Epic Patterns

```
Execute: mcp__archon__rag_search_knowledge_base(
  query="epic planning agile",
  match_count=3
)
Display key insights
```

### 2. Check Existing Epics

```
Execute: mcp__archon__find_tasks(
  project_id=project_id,
  query="Epic"
)

Display: "Found {count} existing epics"
List epics with feature names
```

### 3. Elicit Epic Details (elicit=true)

```
Ask user:

1. "Epic Name (e.g., 'User Authentication System'):"
   Store as: epic_name

2. "Epic Description (what is this epic about?):"
   Store as: epic_description

3. "Business Value (why is this important?):"
   Store as: business_value

4. "Target Milestone/Sprint (optional):"
   Store as: milestone

5. "Feature Slug (short name for grouping, e.g., 'auth'):"
   Store as: feature_slug

6. "Success Criteria (how do we know it's done?):"
   Collect lines until double-enter
   Store as: success_criteria[]
```

### 4. Build Epic Description

```
Build description:
"""
EPIC: {epic_name}

DESCRIPTION:
{epic_description}

BUSINESS VALUE:
{business_value}

TARGET MILESTONE:
{milestone}

SUCCESS CRITERIA:
{for criterion in success_criteria:}
- [ ] {criterion}

STORIES:
(Stories will be linked via feature='{feature_slug}')

STATUS TRACKING:
Created: {timestamp}
Stories Created: 0
Stories Completed: 0
"""
```

### 5. Create Epic in Archon

```
Execute: mcp__archon__manage_task(
  action="create",
  project_id=project_id,
  title="Epic: {epic_name}",
  description=description,
  feature=feature_slug,
  status="todo",
  task_order=85,
  assignee="User"
)

Store: epic_task_id from response
Display: "✓ Created epic: {epic_name} (ID: {epic_task_id})"
```

### 6. Create Initial Stories (Optional)

```
Ask user: "Create stories for this epic now? (yes/no)"

If yes:
  Ask user: "How many stories to create?"
  Store as: story_count

  For i in range(story_count):
    Display: "\n=== Story {i+1} of {story_count} for Epic: {epic_name} ==="

    # Run simplified story creation
    Ask user: "Story title:"
    Store as: story_title

    Ask user: "Story description:"
    Store as: story_desc

    Execute: mcp__archon__manage_task(
      action="create",
      project_id=project_id,
      title=story_title,
      description=story_desc + "\n\nEpic: {epic_task_id}",
      feature=feature_slug,
      status="todo",
      task_order=80,
      assignee="User"
    )

    Display: "  ✓ Created story: {story_title}"

  # Update epic with story count
  Execute: mcp__archon__manage_task(
    action="update",
    task_id=epic_task_id,
    description="{original_description}\n\nStories Created: {story_count}"
  )
```

### 7. Summary

```
Display: "
═══════════════════════════════════════
EPIC CREATED IN ARCHON
═══════════════════════════════════════
Epic: {epic_name}
Task ID: {epic_task_id}
Feature Slug: {feature_slug}
Stories Created: {story_count}
═══════════════════════════════════════
Create more stories with: *create-story
View epic stories: *list-tasks feature={feature_slug}
"
```

## Output

- Epic created as Archon task
- epic_task_id available
- Optional stories created and linked

## Notes

- Epics are tasks with "Epic:" prefix
- Stories link via feature field
- Epic task_order typically 85 (higher than stories)
- Track story progress in epic description
