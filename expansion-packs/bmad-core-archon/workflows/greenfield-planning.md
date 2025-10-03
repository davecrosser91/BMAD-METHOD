<!-- Powered by BMAD™ Core with Archon -->

# greenfield-planning

**Phase**: Planning & Requirements Engineering
**Team**: Analyst → PM → Architect
**Output**: Project setup, PRD, Epics, Architecture docs
**Next Phase**: [greenfield-development.md](greenfield-development.md)

---

## Overview

This workflow handles the **planning and requirements** phase of a greenfield project. It produces all the artifacts needed for the development team to start parallel implementation.

**Key Outcome**: A backlog of well-defined, dependency-tracked user stories ready for parallel development.

---

## Workflow Steps

### 1. Project Initialization (Analyst)

**Agent**: `@analyst` or activate [analyst.md](../agents/analyst.md)

**Objective**: Research domain, analyze requirements, create project in Archon

**Activities**:

1. Conduct stakeholder interviews
2. Research domain and existing solutions
3. Use RAG to find relevant documentation: `mcp__archon__rag_search_knowledge_base(query="domain keywords")`
4. **Create Archon project**: `mcp__archon__manage_project("create", title="Project Name", description="...")`
5. Document findings in Archon: `mcp__archon__manage_document("create", project_id, title="Research Findings", document_type="note")`

**Deliverables**:

- ✅ Archon project created
- ✅ Research findings documented
- ✅ Stakeholder requirements captured

**Handoff**: Tell user to switch to PM agent

---

### 2. Requirements Engineering (PM)

**Agent**: `@pm` or activate [pm.md](../agents/pm.md)

**Objective**: Create PRD, define epics, break into user stories

**Activities**:

1. Read analyst's research: `mcp__archon__find_documents(project_id, document_type="note")`
2. **Create PRD**: `mcp__archon__manage_document("create", project_id, title="Product Requirements Document", document_type="spec", content={...})`
3. **Define Epics** as high-level tasks:
   ```python
   mcp__archon__manage_task("create",
       project_id=project_id,
       title="Epic: User Authentication",
       description="Complete user auth system with login, signup, password reset",
       feature="authentication",
       task_order=90
   )
   ```
4. **Break epics into user stories**:
   - Create detailed story tasks
   - Include acceptance criteria
   - Link to epic via `feature` field
   - **DO NOT add dependencies yet** (Architect will do this)

**PRD Structure** (in Archon document):

```json
{
  "vision": "What we're building and why",
  "target_users": ["User persona 1", "User persona 2"],
  "features": [
    {
      "name": "User Authentication",
      "priority": "P0",
      "user_stories": [
        "As a user, I can sign up with email/password",
        "As a user, I can log in securely",
        "As a user, I can reset my password"
      ]
    }
  ],
  "success_metrics": ["Metric 1", "Metric 2"],
  "constraints": ["Technical constraint 1", "Business constraint 2"]
}
```

**Deliverables**:

- ✅ PRD document in Archon
- ✅ Epic tasks created (3-7 high-level features)
- ✅ User story tasks created (20-50 detailed stories)
- ⚠️ No dependencies yet (next phase)

**Handoff**: Tell user to switch to Architect agent

---

### 3. Technical Architecture (Architect)

**Agent**: `@architect` or activate [architect.md](../agents/architect.md)

**Objective**: Design system architecture, define dependencies, prepare for parallel development

**Activities**:

1. Read PRD: `mcp__archon__find_documents(project_id, document_type="spec")`
2. Read user stories: `mcp__archon__find_tasks(project_id)`
3. **Create Architecture Document**:
   ```python
   mcp__archon__manage_document("create",
       project_id=project_id,
       title="System Architecture",
       document_type="design",
       content={
           "tech_stack": {"backend": "FastAPI", "frontend": "React", "db": "PostgreSQL"},
           "system_components": [...],
           "data_models": [...],
           "api_contracts": [...],
           "deployment": {...}
       }
   )
   ```
4. **Analyze Task Dependencies**:
   - Identify prerequisite tasks (e.g., "DB schema must exist before CRUD endpoints")
   - Identify parallel-safe tasks (e.g., "Login UI and Signup UI can be built simultaneously")

5. **Add Dependencies to Tasks**:

   ```python
   # Example: Login form depends on auth API
   mcp__archon__manage_task("update",
       task_id="story-login-form",
       description="Original description...\n\nDepends on: #story-auth-api\nRelated: #story-ui-components"
   )
   ```

6. **Categorize Tasks by Wave**:
   - **Wave 1** (no dependencies): DB schema, shared utilities, base components
   - **Wave 2** (depends on Wave 1): API endpoints, business logic
   - **Wave 3** (depends on Wave 2): UI forms, integration
   - **Wave 4** (depends on Wave 3): End-to-end tests

   Update `task_order` to reflect waves:
   - Wave 1: task_order = 100
   - Wave 2: task_order = 90
   - Wave 3: task_order = 80
   - Wave 4: task_order = 70

**Architecture Document Structure**:

```json
{
  "tech_stack": {
    "backend": "FastAPI + Python 3.11",
    "frontend": "React 18 + TypeScript",
    "database": "PostgreSQL 15 + pgvector",
    "auth": "JWT tokens",
    "deployment": "Docker + K8s"
  },
  "system_components": [
    { "name": "API Gateway", "responsibility": "..." },
    { "name": "Auth Service", "responsibility": "..." }
  ],
  "data_models": [
    {
      "name": "User",
      "fields": [
        { "name": "id", "type": "uuid", "pk": true },
        { "name": "email", "type": "string", "unique": true }
      ]
    }
  ],
  "api_contracts": [
    {
      "endpoint": "POST /auth/signup",
      "request": { "email": "string", "password": "string" },
      "response": { "user_id": "uuid", "token": "string" }
    }
  ],
  "dependency_waves": {
    "wave_1": ["DB schema", "Base utilities", "Component library"],
    "wave_2": ["Auth API", "User CRUD API"],
    "wave_3": ["Login form", "Signup form", "Profile page"],
    "wave_4": ["Integration tests"]
  }
}
```

**Deliverables**:

- ✅ Architecture document in Archon
- ✅ All tasks updated with dependency markers
- ✅ Tasks categorized into parallel waves
- ✅ Clear execution plan for SM orchestrator

**Handoff**: Tell user to switch to SM Orchestrator for development phase

---

## Planning Phase Complete ✅

**What we have now**:

- Archon project with complete context
- PRD documenting WHAT to build
- Architecture documenting HOW to build
- User stories with acceptance criteria
- Dependency graph for parallel execution
- Tasks organized into execution waves

**Ready for**: [greenfield-development.md](greenfield-development.md)

**Estimated Timeline**:

- Analyst: 1-2 hours
- PM: 2-4 hours
- Architect: 2-3 hours
- **Total Planning**: 5-9 hours

**Next Steps**:

```
User activates: @sm-orchestrator

SM analyzes dependencies, creates execution plan, spawns developer teams
```

---

## Tips for Success

1. **Complete Planning Before Development**
   - Don't start coding until PRD + Architecture are done
   - Missing requirements = rework later

2. **Dependency Precision Matters**
   - Be explicit: "Depends on: #TASK-101, #TASK-102"
   - Architect should review ALL dependencies before handoff

3. **Use Archon Features**:
   - `feature` field to group related stories
   - `task_order` to prioritize waves
   - `document_type` to organize docs

4. **Communicate Through Archon**:
   - All agents read/write to same Archon project
   - No context lost between handoffs
   - SM can see entire plan

---

**See Also**:

- [greenfield-development.md](greenfield-development.md) - Development phase
- [brownfield-planning.md](brownfield-planning.md) - Planning for existing projects
- [../agents/sm-orchestrator.md](../agents/sm-orchestrator.md) - Team orchestration
