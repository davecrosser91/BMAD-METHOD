# Archon Create Architecture Task

## Purpose

Create system architecture documentation in Archon as a project-scoped document.

## Prerequisites

- Archon project initialized (project_id available)
- Architect agent active
- PRD available (optional but recommended)

## Task Steps

### 1. Review PRD

```
Execute: mcp__archon__find_documents(
  project_id=project_id,
  document_type="spec"
)

If PRD found:
  Display PRD summary
  Ask user: "Review full PRD content? (yes/no)"
  If yes: Display full content

If no PRD:
  Display: "No PRD found. Creating architecture without PRD reference."
```

### 2. Research Architecture Patterns

```
Ask user: "System type (e.g., 'web app', 'microservices', 'mobile app'):"
Store as: system_type

Execute: mcp__archon__rag_search_knowledge_base(
  query="{system_type} architecture patterns",
  match_count=5
)
Display patterns found

Execute: mcp__archon__rag_search_code_examples(
  query="{system_type} architecture",
  match_count=3
)
Display examples
```

### 3. Elicit Architecture Details (elicit=true)

```
Ask user:

1. "Architecture Title (e.g., 'E-Commerce Platform Architecture'):"
   Store as: arch_title

2. "System Overview (high-level description):"
   Store as: overview

3. "Architecture Style (e.g., 'Microservices', 'Monolith', 'Serverless'):"
   Store as: arch_style

4. "Key Components (one per line, double-enter when done):"
   Collect lines
   Store as: components[]

5. "Technology Stack:"
   Ask: "  - Frontend:"
   Ask: "  - Backend:"
   Ask: "  - Database:"
   Ask: "  - Infrastructure:"
   Store as: tech_stack{}

6. "Data Flow (describe how data moves through system):"
   Store as: data_flow

7. "Security Considerations:"
   Store as: security

8. "Scalability Strategy:"
   Store as: scalability

9. "Deployment Strategy:"
   Store as: deployment
```

### 4. Build Architecture Content

```
Build content object:
{
  "version": "1.0",
  "created_date": "{current_date}",
  "architecture": {
    "style": "{arch_style}",
    "overview": "{overview}",
    "components": [
      {
        "name": "{component}",
        "description": "",
        "responsibilities": []
      } for component in components
    ],
    "tech_stack": {
      "frontend": "{tech_stack.frontend}",
      "backend": "{tech_stack.backend}",
      "database": "{tech_stack.database}",
      "infrastructure": "{tech_stack.infrastructure}"
    },
    "data_flow": "{data_flow}",
    "security": "{security}",
    "scalability": "{scalability}",
    "deployment": "{deployment}"
  },
  "diagrams": {
    "system_diagram": "(To be added)",
    "component_diagram": "(To be added)",
    "data_flow_diagram": "(To be added)"
  },
  "decisions": []
}
```

### 5. Create Architecture Document

```
Execute: mcp__archon__manage_document(
  action="create",
  project_id=project_id,
  title=arch_title,
  document_type="design",
  content=content_object,
  tags=["architecture", "design"],
  author="Architect"
)

Store: document_id from response
Display: "✓ Created architecture: {arch_title} (ID: {document_id})"
```

### 6. Create Technical Guides (Optional)

```
Ask user: "Create coding standards document? (yes/no)"
If yes:
  Execute: mcp__archon__rag_search_knowledge_base(
    query="coding standards best practices",
    match_count=3
  )

  Ask user: "Enter coding standards (or 'auto' for KB-based):"
  If auto: Use KB findings
  Else: Collect standards

  Execute: mcp__archon__manage_document(
    action="create",
    project_id=project_id,
    title="Coding Standards",
    document_type="guide",
    content={standards},
    tags=["standards", "guidelines"],
    author="Architect"
  )

Ask user: "Create tech stack document? (yes/no)"
If yes:
  Execute: mcp__archon__manage_document(
    action="create",
    project_id=project_id,
    title="Tech Stack Reference",
    document_type="guide",
    content={tech_stack details},
    tags=["tech-stack", "reference"],
    author="Architect"
  )
```

### 7. Create ADR Tasks

```
Ask user: "Create Architecture Decision Records? (yes/no)"
If yes:
  Ask user: "How many key decisions to document?"
  Store as: adr_count

  For i in range(adr_count):
    Ask user: "ADR {i+1} - Decision title:"
    Store as: decision_title

    Ask user: "ADR {i+1} - Context/Problem:"
    Store as: context

    Ask user: "ADR {i+1} - Decision:"
    Store as: decision

    Ask user: "ADR {i+1} - Consequences:"
    Store as: consequences

    Execute: mcp__archon__manage_task(
      action="create",
      project_id=project_id,
      title="ADR: {decision_title}",
      description="""
      CONTEXT:
      {context}

      DECISION:
      {decision}

      CONSEQUENCES:
      {consequences}

      STATUS: Accepted
      DATE: {current_date}
      """,
      feature="architecture",
      status="done",
      task_order=90,
      assignee="Architect"
    )

    Display: "  ✓ Created ADR: {decision_title}"
```

### 8. Create Implementation Tasks

```
Ask user: "Create implementation tasks for dev team? (yes/no)"
If yes:
  For each component in components:
    Ask user: "Create task for '{component}'? (yes/no)"
    If yes:
      Execute: mcp__archon__manage_task(
        action="create",
        project_id=project_id,
        title="Implement {component}",
        description="Build {component} according to architecture spec: {document_id}",
        feature="{component_slug}",
        status="todo",
        task_order=70,
        assignee="James"
      )
      Display: "  ✓ Created task: Implement {component}"
```

### 9. Summary

```
Display: "
═══════════════════════════════════════
ARCHITECTURE CREATED IN ARCHON
═══════════════════════════════════════
Title: {arch_title}
Document ID: {document_id}
Style: {arch_style}
Components: {component_count}
ADRs: {adr_count}
Implementation Tasks: {task_count}
═══════════════════════════════════════
View in Archon UI or use *list-docs to see documents.
Dev team can start implementation with created tasks.
"
```

## Output

- Architecture document created in Archon
- Optional: Coding standards guide
- Optional: Tech stack reference
- Optional: ADR tasks created
- Optional: Implementation tasks for dev

## Notes

- Architecture stored as document_type="design"
- ADRs stored as tasks with feature="architecture"
- Link implementation tasks to architecture doc via description
- Use version history for architecture evolution
