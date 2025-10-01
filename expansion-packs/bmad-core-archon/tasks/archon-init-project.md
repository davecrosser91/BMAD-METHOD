# Archon Initialize Project Task

## Purpose

Initialize or connect to an Archon project for BMAD workflow management.

## Prerequisites

- Archon MCP server must be running and connected
- User has project name/identifier ready

## Task Steps

### 1. Health Check

```
Execute: mcp__archon__health_check()
Verify: status="healthy"
If failed: HALT and inform user to start Archon MCP server
```

### 2. Search for Existing Project

```
Ask user: "What is your project name/identifier?"
Store response as: project_name

Execute: mcp__archon__find_projects(query=project_name)
```

### 3. Handle Project State

**If project found:**

```
Display: "Found existing project: {project.title}"
Display: "Project ID: {project_id}"
Display: "Description: {project.description}"

Ask user: "Use this project? (yes/no)"
If yes: Store project_id in session
If no: Go to step 4
```

**If project not found:**

```
Display: "No existing project found for '{project_name}'"
Ask user: "Create new project? (yes/no)"
If no: HALT
If yes: Continue to step 4
```

### 4. Create New Project

```
Ask user: "Enter project description:"
Store response as: project_description

Ask user: "GitHub repository URL (optional, press enter to skip):"
Store response as: github_repo

Execute: mcp__archon__manage_project(
  action="create",
  title=project_name,
  description=project_description,
  github_repo=github_repo if provided else null
)

Store: project_id from response
Display: "✓ Created project: {project_name} (ID: {project_id})"
```

### 5. Load Project Context

```
Execute: mcp__archon__find_tasks(project_id=project_id, per_page=5)
Display task counts by status:
- Todo: {count}
- Doing: {count}
- Review: {count}
- Done: {count}

Execute: mcp__archon__find_documents(project_id=project_id, per_page=5)
Display: "Documents: {count}"
```

### 6. Knowledge Base Check

```
Execute: mcp__archon__rag_get_available_sources()
Display: "Available knowledge sources: {count}"
List first 5 sources:
- {source.title}
```

### 7. Session Summary

```
Display: "
═══════════════════════════════════════
ARCHON PROJECT INITIALIZED
═══════════════════════════════════════
Project: {project_name}
ID: {project_id}
Tasks: {total_tasks} ({todo} todo, {doing} doing, {review} review, {done} done)
Documents: {doc_count}
Knowledge Sources: {source_count}
═══════════════════════════════════════
Ready to work! Use *help to see available commands.
"
```

## Output

- project_id stored in agent session
- Project context loaded
- User informed of project status

## Notes

- This task should be run during agent activation if no project_id exists
- project_id persists for the session
- User can switch projects by running this task again
