# Create Document Task

## Purpose

Generic document creation task using templates. For Archon-specific documents, use archon-create-\* tasks instead.

## Prerequisites

- Template file path provided
- Agent active
- For Archon docs: Use archon-create-prd.md, archon-create-architecture.md, etc.

## Task Steps

### 1. Load Template

```
Read template file from: {root}/templates/{template_name}.yaml
Parse template structure
```

### 2. Elicit Content

```
For each section in template:
  Ask user: "{section.prompt}"
  Store response in: content.{section.name}
```

### 3. Create Document

```
If archon.enabled in core-config:
  Display: "Creating in Archon..."
  Execute: mcp__archon__manage_document(
    action="create",
    project_id=project_id,
    title=title,
    document_type=document_type,
    content=content
  )
Else:
  Write to file: {destination_path}
```

### 4. Confirmation

```
Display: "✓ Document created: {title}"
```

## Output

- Document created (Archon or file)
- Document ID (if Archon)

## Notes

- Prefer Archon-specific tasks for Archon workflows
- This task is for legacy/fallback scenarios
