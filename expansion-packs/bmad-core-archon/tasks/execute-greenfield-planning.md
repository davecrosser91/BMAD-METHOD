<!-- Powered by BMAD™ Core with Archon -->

# execute-greenfield-planning

**Type**: Orchestration Task
**Phase**: Planning & Requirements Engineering
**Duration**: 4-8 hours
**Output**: Complete project setup with PRD, Architecture, and refined backlog

---

## Overview

This task orchestrates the **complete planning phase** for a greenfield project. It coordinates multiple agents to produce all artifacts needed before development starts.

**Use this when**: Starting a brand-new project from scratch

**Alternative**: For brownfield projects, use [execute-brownfield-planning.md](execute-brownfield-planning.md)

---

## Prerequisites

- ✅ Archon MCP server running (`mcp__archon__health_check()`)
- ✅ Project idea/concept defined
- ✅ User available for reviews and approvals

---

## Execution Steps

### Step 1: Project Initialization (Analyst)

**Task**: [step-1-analyst-project-init.md](step-1-analyst-project-init.md)

**Agent**: `@analyst`

**Activities**:

1. Conduct stakeholder interviews
2. Research domain and existing solutions
3. Create Archon project
4. Document findings

**Output**:

- Archon project created
- Research findings documented

**Duration**: 1-2 hours

---

### Step 2: Requirements Engineering (PM)

**Task**: [step-2-pm-requirements.md](step-2-pm-requirements.md)

**Agent**: `@pm`

**Activities**:

1. Read analyst's research
2. Create PRD document
3. Define epics (3-7 features)
4. Break into user stories (20-50)

**Output**:

- PRD in Archon
- Epics created as tasks
- User stories created as tasks

**Duration**: 2-3 hours

---

### Step 3: Technical Architecture (Architect)

**Task**: [step-3-architect-design.md](step-3-architect-design.md)

**Agent**: `@architect`

**Activities**:

1. Read PRD and stories
2. Design system architecture
3. Analyze task dependencies
4. Categorize into parallel waves

**Output**:

- Architecture document in Archon
- Dependencies added to all tasks
- Tasks organized into waves

**Duration**: 2-3 hours

---

### Step 4: Story Refinement (Scrum Master)

**Task**: [step-4-sm-refinement.md](step-4-sm-refinement.md)

**Agent**: `@sm`

**Activities**:

1. Review all stories
2. Verify completeness
3. Refine unclear items
4. Create project overview

**Output**:

- All stories refined and ready
- Project overview for user review

**Duration**: 1 hour

---

## 🛑 USER REVIEW CHECKPOINT

**Before proceeding to development, YOU review everything:**

### Review Artifacts

1. **PRD**: Read the product vision, features, success metrics
2. **Architecture**: Verify tech stack, system design makes sense
3. **Epics**: Check high-level features align with goals
4. **User Stories**: Review sample stories for quality
5. **Dependencies**: Verify dependency graph is logical

### View in Archon

```python
# Get project overview
project = mcp__archon__find_projects(query="YourProjectName")
prd = mcp__archon__find_documents(project_id, document_type="spec")
architecture = mcp__archon__find_documents(project_id, document_type="design")
all_tasks = mcp__archon__find_tasks(project_id)
```

### Request Changes (if needed)

If anything needs adjustment:

- **PRD changes**: Switch to `@pm`
- **Architecture changes**: Switch to `@architect`
- **Story refinement**: Switch to `@sm`

### Approve ✅

Once satisfied, proceed to:
**👉 [execute-greenfield-development.md](execute-greenfield-development.md)** or [development-kickoff.md](../workflows/development-kickoff.md)

---

## Planning Phase Complete ✅

**What you have now**:

- ✅ Archon project with complete context
- ✅ PRD documenting WHAT to build
- ✅ Architecture documenting HOW to build
- ✅ 3-7 Epics (high-level features)
- ✅ 20-50 User stories with acceptance criteria
- ✅ Dependency graph for parallel execution
- ✅ All stories refined and ready

**Timeline**: 4-8 hours total

**Next Phase**: Choose execution mode (Manual, Simple Workflow, or Team Lead)

---

## Troubleshooting

### Agent can't find Archon project

```bash
# Check Archon health
mcp__archon__health_check()

# List all projects
mcp__archon__find_projects()
```

### Missing dependencies between agents

Each agent should reference the project_id. Store it early:

```python
project = mcp__archon__manage_project("create", title="ProjectName", description="...")
# Share project.id with all subsequent agents
```

### Stories lack detail

Return to `@pm` or `@sm` for refinement before proceeding to development.

---

## Related

- **Detailed workflow**: [greenfield-planning.md](../workflows/greenfield-planning.md)
- **Development phase**: [execute-greenfield-development.md](execute-greenfield-development.md)
- **Brownfield alternative**: [execute-brownfield-planning.md](execute-brownfield-planning.md)
