# Archon Research Project Initialization

## Purpose

Initialize a new research project in Archon with proper structure for AI/ML research workflow.

## Prerequisites

- Archon MCP server running and connected
- Research topic or area identified

## Task Steps

### 1. Health Check

```
Execute: mcp__archon__health_check()
Verify: status="healthy"
If failed: HALT and inform user to start Archon MCP server
```

### 2. Search for Existing Research Project

```
Ask user: "What is your research project name or topic?"
Store response as: project_name

Execute: mcp__archon__find_projects(query=project_name)
```

### 3. Handle Project State

**If project found:**

```
Display: "Found existing research project: {project.title}"
Display: "Project ID: {project_id}"
Display: "Description: {project.description}"

Ask user: "Use this project? (yes/no)"
If yes: Store project_id in session
If no: Go to step 4
```

**If project not found:**

```
Display: "No existing research project found for '{project_name}'"
Ask user: "Create new research project? (yes/no)"
If no: HALT
If yes: Continue to step 4
```

### 4. Create New Research Project

```
Ask user: "Brief research area description (1-2 sentences):"
Store response as: project_description

Ask user: "GitHub repository URL for code (optional, press enter to skip):"
Store response as: github_repo

Execute: mcp__archon__manage_project(
  action="create",
  title=project_name,
  description=project_description,
  github_repo=github_repo if provided else null
)

Store: project_id from response
Display: "✓ Created research project: {project_name} (ID: {project_id})"
```

### 5. Create Initial Research Documents

**5.1 Create Research Project Brief**

```
Execute: mcp__archon__manage_document(
  action="create",
  project_id=project_id,
  title="{project_name} - Research Project Brief",
  document_type="note",
  content={
    "project_name": project_name,
    "description": project_description,
    "created_date": current_date,
    "research_area": "To be determined through brainstorming",
    "status": "draft"
  },
  tags=["project-brief", "initial"],
  author="Research Lead"
)

Store: brief_doc_id
Display: "✓ Created Research Project Brief (ID: {brief_doc_id})"
```

**5.2 Create Research Questions Placeholder**

```
Execute: mcp__archon__manage_document(
  action="create",
  project_id=project_id,
  title="{project_name} - Research Questions",
  document_type="spec",
  content={
    "questions": [],
    "hypotheses": [],
    "status": "to_be_defined",
    "note": "Will be populated during brainstorming phase"
  },
  tags=["research-questions", "draft"],
  author="Research Lead"
)

Store: questions_doc_id
Display: "✓ Created Research Questions document (ID: {questions_doc_id})"
```

### 6. Setup Knowledge Base Tags

```
Ask user: "Project-specific tag for knowledge base (e.g., 'attention-research'):"
Store response as: kb_tag

Display: "Knowledge base tag '{kb_tag}' will be used for this project."
Display: "Research assistants will use this tag to organize papers."
```

### 7. Create Initial Research Epics

**7.1 Literature Review Epic**

```
Execute: mcp__archon__manage_task(
  action="create",
  project_id=project_id,
  title="Epic: Literature Review",
  description="Comprehensive literature review across web, arXiv, and knowledge base",
  feature="literature",
  status="todo",
  task_order=100,
  assignee="Research Assistants"
)

Store: lit_epic_id
```

**7.2 Experimental Design Epic**

```
Execute: mcp__archon__manage_task(
  action="create",
  project_id=project_id,
  title="Epic: Experimental Design",
  description="Design experiments, baselines, and evaluation protocols",
  feature="experimental-design",
  status="todo",
  task_order=90,
  assignee="Research Scientist"
)

Store: exp_epic_id
```

**7.3 Implementation Epic**

```
Execute: mcp__archon__manage_task(
  action="create",
  project_id=project_id,
  title="Epic: Implementation & Experiments",
  description="Implement models, run experiments, analyze results",
  feature="implementation",
  status="todo",
  task_order=80,
  assignee="ML Engineer"
)

Store: impl_epic_id
```

**7.4 Paper Writing Epic**

```
Execute: mcp__archon__manage_task(
  action="create",
  project_id=project_id,
  title="Epic: Paper Writing",
  description="Draft, revise, and submit research paper",
  feature="paper",
  status="todo",
  task_order=70,
  assignee="Research Writer"
)

Store: paper_epic_id
```

### 8. Load Project Context

```
Execute: mcp__archon__find_tasks(project_id=project_id, per_page=10)
Count tasks by status:
- Todo: {count}
- Doing: {count}
- Review: {count}
- Done: {count}

Execute: mcp__archon__find_documents(project_id=project_id, per_page=10)
Display: "Documents: {count}"
```

### 9. Knowledge Base Check

```
Execute: mcp__archon__rag_get_available_sources()
Display: "Available knowledge sources: {count}"
List first 5 sources:
- {source.title} (ID: {source.id})

Display: "
TIP: Add research papers to knowledge base with tag '{kb_tag}'
This helps Research Assistants find relevant papers for your project.
"
```

### 10. Session Summary

```
Display: "
═══════════════════════════════════════════════════════════
RESEARCH PROJECT INITIALIZED IN ARCHON
═══════════════════════════════════════════════════════════
Project: {project_name}
ID: {project_id}
GitHub: {github_repo or 'Not set'}
Knowledge Base Tag: {kb_tag}

Documents Created:
✓ Research Project Brief (ID: {brief_doc_id})
✓ Research Questions (ID: {questions_doc_id})

Epics Created:
✓ Literature Review (ID: {lit_epic_id})
✓ Experimental Design (ID: {exp_epic_id})
✓ Implementation & Experiments (ID: {impl_epic_id})
✓ Paper Writing (ID: {paper_epic_id})

Status:
- Tasks: {total_tasks} ({todo} todo, {doing} doing, {review} review, {done} done)
- Documents: {doc_count}
- Knowledge Sources: {source_count}
═══════════════════════════════════════════════════════════

NEXT STEPS:
1. Run *brainstorm to generate research questions
2. Use research assistants to search literature
3. Create research proposal with *create-research-proposal

Ready to start research! Use *help to see available commands.
"
```

### 11. Guide User to Next Steps

```
Ask user: "Would you like to start brainstorming now? (yes/no)"
If yes:
  Display: "Great! Let's begin the brainstorming process."
  Display: "I'll facilitate the brainstorming session to help you:"
  Display: "  1. Define clear research questions"
  Display: "  2. Identify hypotheses to test"
  Display: "  3. Explore problem space"
  Display: ""
  Display: "Starting brainstorming session..."
  [Proceed to brainstorming task]
If no:
  Display: "No problem! You can start brainstorming later with:"
  Display: "  @research-lead"
  Display: "  *brainstorm"
```

## Output

- Research project created in Archon
- Initial documents created (Project Brief, Research Questions)
- Four research epics created
- Knowledge base tag established
- project_id stored in session
- User ready to begin brainstorming

## Notes

- This task should be the FIRST task run for any new research project
- project_id persists for the session across all research agents
- All subsequent research work references this project_id
- GitHub repo can be added later if not available initially
- Knowledge base tag is critical for organizing research papers
