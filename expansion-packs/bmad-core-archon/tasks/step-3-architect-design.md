<!-- Powered by BMAD™ Core with Archon -->

# step-3-architect-design

**Workflow**: Greenfield Planning - Step 3/4
**Agent**: `@architect`
**Duration**: 2-3 hours
**Previous Step**: [step-2-pm-requirements.md](step-2-pm-requirements.md)
**Next Step**: [step-4-sm-refinement.md](step-4-sm-refinement.md)

---

## Objective

Design the system architecture, analyze task dependencies, and prepare for parallel development.

---

## Prerequisites

- ✅ Step 2 complete (PM created PRD and user stories)
- ✅ `project_id` available
- ✅ PRD and user stories in Archon

---

## Activities

### 1. Read PRD and User Stories

```python
# Read PRD to understand requirements
prd = mcp__archon__find_documents(
    project_id=project_id,
    document_type="spec"
)

# Read all user stories
all_tasks = mcp__archon__find_tasks(project_id=project_id)
epics = [t for t in all_tasks if t.task_order >= 90]
stories = [t for t in all_tasks if t.task_order < 90]

print(f"Analyzing {len(epics)} epics and {len(stories)} stories...")
```

---

### 2. Design System Architecture

**Create comprehensive architecture document:**

```python
architecture_content = {
    "tech_stack": {
        "backend": "FastAPI + Python 3.11",
        "frontend": "React 18 + TypeScript + Vite",
        "database": "PostgreSQL 15 + pgvector",
        "auth": "JWT tokens (access + refresh)",
        "api_style": "RESTful JSON API",
        "deployment": "Docker containers on AWS ECS",
        "ci_cd": "GitHub Actions"
    },

    "system_components": [
        {
            "name": "API Gateway",
            "responsibility": "Route requests, handle CORS, rate limiting",
            "tech": "FastAPI middleware"
        },
        {
            "name": "Auth Service",
            "responsibility": "User signup, login, token management",
            "tech": "FastAPI + bcrypt + JWT"
        },
        {
            "name": "Task Service",
            "responsibility": "CRUD operations for tasks",
            "tech": "FastAPI + SQLAlchemy"
        },
        {
            "name": "Web Client",
            "responsibility": "User interface",
            "tech": "React + React Query + TanStack Router"
        }
    ],

    "data_models": [
        {
            "name": "User",
            "table": "users",
            "fields": [
                {"name": "id", "type": "uuid", "pk": True},
                {"name": "email", "type": "string", "unique": True},
                {"name": "password_hash", "type": "string"},
                {"name": "created_at", "type": "timestamp"}
            ]
        },
        {
            "name": "Task",
            "table": "tasks",
            "fields": [
                {"name": "id", "type": "uuid", "pk": True},
                {"name": "title", "type": "string"},
                {"name": "description", "type": "text"},
                {"name": "status", "type": "enum", "values": ["todo", "doing", "done"]},
                {"name": "assignee_id", "type": "uuid", "fk": "users.id"},
                {"name": "created_by", "type": "uuid", "fk": "users.id"}
            ]
        }
    ],

    "api_contracts": [
        {
            "endpoint": "POST /auth/signup",
            "request": {
                "email": "string",
                "password": "string"
            },
            "response": {
                "user_id": "uuid",
                "access_token": "string",
                "refresh_token": "string"
            }
        },
        {
            "endpoint": "POST /auth/login",
            "request": {"email": "string", "password": "string"},
            "response": {"user_id": "uuid", "access_token": "string", "refresh_token": "string"}
        },
        {
            "endpoint": "GET /tasks",
            "auth": "Bearer token required",
            "query_params": {"status": "optional enum"},
            "response": {"tasks": ["array of task objects"]}
        }
    ],

    "deployment": {
        "infrastructure": "AWS ECS Fargate",
        "database": "AWS RDS PostgreSQL",
        "container_registry": "AWS ECR",
        "monitoring": "CloudWatch Logs",
        "secrets": "AWS Secrets Manager"
    },

    "development_patterns": [
        "Use SQLAlchemy ORM for database access",
        "Use Pydantic for request/response validation",
        "Use React Query for API data fetching",
        "Use TanStack Router for client-side routing",
        "Write unit tests with pytest (backend) and Vitest (frontend)",
        "Use GitHub Actions for CI/CD"
    ]
}

# Save to Archon
arch_doc = mcp__archon__manage_document(
    action="create",
    project_id=project_id,
    title="System Architecture",
    document_type="design",
    author="Architect",
    content=architecture_content
)
```

---

### 3. Analyze Task Dependencies

**Identify which tasks must be done in order:**

```python
# Example dependency analysis for auth epic
dependencies = {
    "Database schema setup": [],  # No dependencies, Wave 1
    "User model and migrations": ["Database schema setup"],  # Wave 2
    "Auth API endpoints": ["User model and migrations"],  # Wave 3
    "Login UI form": ["Auth API endpoints"],  # Wave 4
    "Signup UI form": ["Auth API endpoints"],  # Wave 4 (parallel with login)
    "Integration tests": ["Login UI form", "Signup UI form"]  # Wave 5
}
```

**Dependency types:**

1. **Technical dependencies**: "B needs A's output"
   - API endpoints need database models
   - UI needs API endpoints
   - Integration tests need features complete

2. **Parallel-safe**: "A and B can happen simultaneously"
   - Login form + Signup form (both use same API)
   - Different UI components
   - Independent API endpoints

---

### 4. Update Tasks with Dependencies

**Add dependency markers to task descriptions:**

```python
# Example: Update login form task
login_story = mcp__archon__find_tasks(
    project_id=project_id,
    query="User can log in"
)[0]

updated_description = f"""{login_story.description}

**Dependencies:**
- Depends on: #task-auth-api (Auth API endpoints must be complete)
- Related to: #task-signup-form (uses same API patterns)

**Implementation Order:**
- Wave 3 (after auth API is ready)
"""

mcp__archon__manage_task(
    action="update",
    task_id=login_story.id,
    description=updated_description
)
```

**Repeat for all stories!**

---

### 5. Categorize into Parallel Waves

**Use `task_order` to indicate wave:**

```python
# Wave 1: Foundation (task_order = 100)
# - No dependencies
# - Database schema, base utilities, shared components

wave_1_tasks = [
    "Setup database schema",
    "Create base API structure",
    "Setup React project",
    "Create UI component library"
]

for task in wave_1_tasks:
    stories = mcp__archon__find_tasks(project_id=project_id, query=task)
    if stories:
        mcp__archon__manage_task(
            action="update",
            task_id=stories[0].id,
            task_order=100
        )

# Wave 2: Core Services (task_order = 90)
# - Depends on Wave 1
# - User model, auth logic, API endpoints

wave_2_tasks = [
    "User model and migrations",
    "Auth API endpoints",
    "Task CRUD API"
]

for task in wave_2_tasks:
    stories = mcp__archon__find_tasks(project_id=project_id, query=task)
    if stories:
        mcp__archon__manage_task(
            action="update",
            task_id=stories[0].id,
            task_order=90
        )

# Wave 3: UI Features (task_order = 80)
# - Depends on Wave 2
# - Login form, signup form, task list

# Wave 4: Integration (task_order = 70)
# - Depends on Wave 3
# - End-to-end tests, polish
```

**Wave summary in architecture doc:**

```python
# Update architecture doc with wave plan
arch_content = arch_doc.content
arch_content["dependency_waves"] = {
    "wave_1": {
        "order": 100,
        "tasks": ["DB schema", "Base API", "Component library"],
        "can_start": "Immediately",
        "estimated_time": "4 hours"
    },
    "wave_2": {
        "order": 90,
        "tasks": ["User model", "Auth API", "Task API"],
        "can_start": "After Wave 1 complete",
        "estimated_time": "6 hours"
    },
    "wave_3": {
        "order": 80,
        "tasks": ["Login UI", "Signup UI", "Task list UI"],
        "can_start": "After Wave 2 complete",
        "estimated_time": "8 hours"
    },
    "wave_4": {
        "order": 70,
        "tasks": ["Integration tests", "Polish", "Docs"],
        "can_start": "After Wave 3 complete",
        "estimated_time": "4 hours"
    }
}

mcp__archon__manage_document(
    action="update",
    project_id=project_id,
    document_id=arch_doc.id,
    content=arch_content
)
```

---

## Deliverables ✅

- ✅ **Architecture Document**: Complete system design in Archon
- ✅ **Dependencies Documented**: All task relationships identified
- ✅ **Wave Categorization**: Tasks organized by dependency waves
- ✅ **Technical Feasibility**: All stories verified as implementable

---

## Verification

```python
# Check architecture doc
arch_docs = mcp__archon__find_documents(
    project_id=project_id,
    document_type="design"
)
assert len(arch_docs) > 0, "Architecture not created!"

# Check waves are defined
all_tasks = mcp__archon__find_tasks(project_id=project_id)
stories = [t for t in all_tasks if t.task_order < 90 and t.task_order >= 70]

wave_1 = [t for t in stories if t.task_order == 100]
wave_2 = [t for t in stories if t.task_order == 90]
wave_3 = [t for t in stories if t.task_order == 80]
wave_4 = [t for t in stories if t.task_order == 70]

print(f"""
✅ Step 3 Complete!

Architecture: {len(arch_docs)} document(s)
Dependency waves defined:
  - Wave 1 (Foundation): {len(wave_1)} tasks
  - Wave 2 (Core Services): {len(wave_2)} tasks
  - Wave 3 (UI Features): {len(wave_3)} tasks
  - Wave 4 (Integration): {len(wave_4)} tasks

👉 Next: Hand off to @sm for story refinement
""")
```

---

## Handoff to SM

**Tell the user:**

```
✅ Architecture and dependency analysis complete!

📐 System Design:
- Tech stack defined: FastAPI + React + PostgreSQL
- {len(system_components)} components designed
- API contracts specified
- Deployment plan ready

📊 Dependency Analysis:
- All {len(stories)} stories analyzed for dependencies
- Organized into {len(waves)} parallel waves
- Estimated timeline: {total_hours} hours with parallel execution

👉 Next step: Switch to @sm for final story refinement and quality check.
```

---

## Troubleshooting

### Not sure about tech stack

- Review PRD constraints
- Consider team expertise
- Balance: proven vs. cutting-edge
- Choose tools with good ecosystem support

### Dependencies too complex

- Simplify architecture
- Break large tasks into smaller ones
- Look for opportunities to parallelize

### Can't identify waves

- Start with obvious: database → API → UI → tests
- Look for shared dependencies (e.g., all UI needs API)
- Use `analyze-task-dependencies.md` helper task

---

## Related Tasks

- **Previous**: [step-2-pm-requirements.md](step-2-pm-requirements.md)
- **Next**: [step-4-sm-refinement.md](step-4-sm-refinement.md)
- **Helper**: [analyze-task-dependencies.md](analyze-task-dependencies.md)
- **Full workflow**: [execute-greenfield-planning.md](execute-greenfield-planning.md)
