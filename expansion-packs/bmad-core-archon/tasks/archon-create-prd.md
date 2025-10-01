# Archon Create PRD Task

## Purpose

Create a Product Requirements Document (PRD) in Archon as a project-scoped document.

## Prerequisites

- Archon project initialized (project_id available)
- PM agent active

## Task Steps

### 1. Research PRD Templates

```
Execute: mcp__archon__rag_search_knowledge_base(
  query="PRD template structure",
  match_count=3
)

Display findings to inform PRD structure
```

### 2. Check Existing PRDs

```
Execute: mcp__archon__find_documents(
  project_id=project_id,
  document_type="spec"
)

If PRDs exist:
  Display: "Found {count} existing PRD(s):"
  List each with: title, created_at
  Ask user: "Create new PRD or update existing? (new/update)"
  If update: Get document_id and go to step 6
```

### 3. Gather PRD Information (elicit=true)

```
Ask user (structured elicitation):

1. "PRD Title (e.g., 'User Authentication System PRD v1'):"
   Store as: prd_title

2. "Product Vision (1-2 sentences):"
   Store as: vision

3. "Target Users (who is this for?):"
   Store as: target_users

4. "Problem Statement (what problem are we solving?):"
   Store as: problem

5. "Key Features (comma-separated list):"
   Store as: features_raw
   Parse into: features_list

6. "Success Metrics (how do we measure success?):"
   Store as: success_metrics

7. "Out of Scope (what are we NOT doing?):"
   Store as: out_of_scope

8. "Timeline/Milestones (optional):"
   Store as: timeline
```

### 4. Search for Related Patterns

```
For each feature in features_list:
  Execute: mcp__archon__rag_search_knowledge_base(
    query="{feature} best practices",
    match_count=2
  )
  Store relevant findings

Display: "Found {count} relevant patterns in knowledge base"
```

### 5. Build PRD Content Structure

```
Build content object:
{
  "version": "1.0",
  "created_date": "{current_date}",
  "sections": {
    "vision": "{vision}",
    "target_users": "{target_users}",
    "problem_statement": "{problem}",
    "key_features": [
      {feature} for feature in features_list
    ],
    "success_metrics": "{success_metrics}",
    "out_of_scope": "{out_of_scope}",
    "timeline": "{timeline}",
    "research_notes": [
      {findings from knowledge base}
    ]
  }
}
```

### 6. Create PRD Document in Archon

```
Execute: mcp__archon__manage_document(
  action="create",
  project_id=project_id,
  title=prd_title,
  document_type="spec",
  content=content_object,
  tags=["prd", "requirements"],
  author="PM"
)

Store: document_id from response
Display: "✓ Created PRD: {prd_title} (ID: {document_id})"
```

### 7. Create Epics from Features

```
Ask user: "Create epics for each key feature? (yes/no)"
If yes:
  For each feature in features_list:
    Execute: mcp__archon__manage_task(
      action="create",
      project_id=project_id,
      title="Epic: {feature}",
      description="Implement {feature} as specified in PRD {prd_title}",
      feature="{feature_slug}",
      status="todo",
      task_order=80,
      assignee="User"
    )
    Display: "✓ Created epic: {feature}"
```

### 8. Summary

```
Display: "
═══════════════════════════════════════
PRD CREATED IN ARCHON
═══════════════════════════════════════
Title: {prd_title}
Document ID: {document_id}
Type: spec
Features: {count}
Epics Created: {epic_count}
═══════════════════════════════════════
View in Archon UI or use *list-docs to see all documents.
Next: Create stories for each epic using *create-story
"
```

## Update Existing PRD (Step 6 Alternative)

```
If updating:
  Execute: mcp__archon__find_documents(
    project_id=project_id,
    document_id=document_id
  )

  Display current content

  Ask user: "What sections to update? (vision/features/metrics/all):"
  Store as: update_sections

  For each section to update:
    Elicit new content
    Merge with existing content

  Execute: mcp__archon__manage_document(
    action="update",
    project_id=project_id,
    document_id=document_id,
    content=updated_content
  )

  Display: "✓ Updated PRD: {prd_title}"
```

## Output

- PRD document created/updated in Archon
- Epics created as tasks (optional)
- document_id available for reference

## Notes

- PRD stored as document_type="spec"
- Content is structured JSON for easy parsing
- Linked to project via project_id
- Use tags for organization
