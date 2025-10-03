<!-- Powered by BMAD™ Core with Archon -->

# brownfield-planning

**Phase**: Analysis, Planning & Requirements for Existing Codebases
**Team**: Analyst → PM → Architect
**Output**: Analyzed codebase, refactoring plan, enhancement backlog
**Next Phase**: [brownfield-development.md](brownfield-development.md)

---

## Overview

This workflow handles planning for **existing codebases** - whether adding features, refactoring, or modernizing legacy systems.

**Key Difference from Greenfield**: Must analyze existing architecture, identify constraints, and plan incremental changes without breaking existing functionality.

---

## Workflow Steps

### 1. Codebase Analysis (Analyst)

**Agent**: `@analyst` or activate [analyst.md](../agents/analyst.md)

**Objective**: Understand existing system, identify pain points, assess technical debt

**Activities**:

1. **Create Archon Project**:

   ```python
   mcp__archon__manage_project("create",
       title="[Project Name] - Enhancement/Refactor",
       description="Add [feature] to existing [system]",
       github_repo="https://github.com/org/repo"
   )
   ```

2. **Codebase Reconnaissance**:

   ```bash
   # Project structure
   tree -L 3 -I 'node_modules|__pycache__'

   # Tech stack detection
   cat package.json  # or requirements.txt, pom.xml, etc.
   cat README.md

   # Git history analysis
   git log --oneline --graph --all -20
   git shortlog -sn --no-merges  # Top contributors

   # Code statistics
   cloc . --exclude-dir=node_modules,dist,build
   ```

3. **Search for Existing Documentation**:

   ```python
   # Use RAG to find similar projects or patterns
   mcp__archon__rag_search_knowledge_base(
       query="[technology stack] architecture patterns",
       match_count=5
   )

   mcp__archon__rag_search_code_examples(
       query="[technology] refactoring examples",
       match_count=3
   )
   ```

4. **Identify Key Areas**:
   - **Entry points**: Where does execution start?
   - **Core modules**: What are the main business logic components?
   - **Dependencies**: External libraries, APIs, databases
   - **Tests**: What test coverage exists?
   - **Pain points**: Known bugs, performance issues, tech debt

5. **Document Findings** in Archon:
   ```python
   mcp__archon__manage_document("create",
       project_id=project_id,
       title="Codebase Analysis",
       document_type="note",
       content={
           "tech_stack": {
               "languages": ["Python 3.8", "JavaScript ES6"],
               "frameworks": ["Django 3.2", "React 17"],
               "database": "PostgreSQL 12",
               "deployment": "Heroku"
           },
           "architecture_pattern": "Monolithic MVC",
           "code_metrics": {
               "total_lines": 45000,
               "files": 320,
               "test_coverage": "42%"
           },
           "key_components": [
               {"name": "User Management", "path": "src/users", "health": "good"},
               {"name": "Payment Processing", "path": "src/payments", "health": "needs_refactor"},
               {"name": "Reporting", "path": "src/reports", "health": "legacy"}
           ],
           "pain_points": [
               "No type hints in Python code",
               "Frontend state management is ad-hoc",
               "Test coverage below 50%",
               "Database queries are not optimized",
               "No CI/CD pipeline"
           ],
           "opportunities": [
               "Add TypeScript to frontend",
               "Implement proper state management (Redux/Zustand)",
               "Increase test coverage to 80%",
               "Add database indexes",
               "Set up GitHub Actions"
           ]
       }
   )
   ```

**Deliverables**:

- ✅ Archon project created
- ✅ Codebase analysis document
- ✅ Tech stack inventory
- ✅ Pain points and opportunities identified

**Handoff**: Tell user to switch to PM agent

---

### 2. Enhancement Planning (PM)

**Agent**: `@pm` or activate [pm.md](../agents/pm.md)

**Objective**: Define what to change, why, and in what order

**Activities**:

1. **Read Analysis**:

   ```python
   analysis = mcp__archon__find_documents(
       project_id=project_id,
       document_type="note",
       query="Codebase Analysis"
   )
   ```

2. **Create Enhancement PRD**:

   ```python
   mcp__archon__manage_document("create",
       project_id=project_id,
       title="Enhancement PRD",
       document_type="spec",
       content={
           "objective": "Add real-time notifications feature",
           "background": "Users currently must refresh to see updates",
           "target_users": ["End users", "Admin users"],
           "features": [
               {
                   "name": "Real-time Notifications",
                   "priority": "P0",
                   "user_stories": [
                       "As a user, I receive instant notifications for important events",
                       "As a user, I can configure notification preferences",
                       "As an admin, I can send broadcast notifications"
                   ],
                   "constraints": [
                       "Must work with existing Django backend",
                       "Cannot break current UI",
                       "Must support 10k concurrent users"
                   ]
               }
           ],
           "out_of_scope": [
               "Email notifications (separate project)",
               "Mobile push notifications (future)",
               "Redesigning entire UI"
           ],
           "success_metrics": [
               "95% notification delivery within 1 second",
               "Zero downtime during rollout",
               "User satisfaction score >4/5"
           ]
       }
   )
   ```

3. **Create Epics** (High-level work packages):

   ```python
   # Epic 1: Backend infrastructure
   mcp__archon__manage_task("create",
       project_id=project_id,
       title="Epic: Real-time Infrastructure",
       description="""Set up WebSocket infrastructure for real-time communication.

       Scope:
       - Add WebSocket support to Django
       - Set up Redis for pub/sub
       - Create notification service layer
       - Add database models for notifications
       """,
       feature="backend-infrastructure",
       task_order=95
   )

   # Epic 2: Frontend integration
   mcp__archon__manage_task("create",
       project_id=project_id,
       title="Epic: Frontend Notifications",
       description="""Add notification UI and WebSocket client.

       Scope:
       - Create notification component
       - Integrate WebSocket client
       - Add notification preferences UI
       - Update existing UI to show notifications
       """,
       feature="frontend-notifications",
       task_order=90
   )

   # Epic 3: Testing & deployment
   mcp__archon__manage_task("create",
       project_id=project_id,
       title="Epic: Testing & Deployment",
       description="""Ensure quality and safe deployment.

       Scope:
       - Write integration tests
       - Load testing (10k concurrent users)
       - Rollout plan (feature flag)
       - Monitoring and alerting
       """,
       feature="testing-deployment",
       task_order=85
   )
   ```

4. **Break into User Stories**:
   Create detailed tasks for each epic (see greenfield-planning.md for format)

**PRD Key Sections for Brownfield**:

- **Background**: Why we're changing existing system
- **Constraints**: What we cannot change (APIs, databases, deployment)
- **Migration Strategy**: How to transition from old to new
- **Rollback Plan**: How to undo changes if needed

**Deliverables**:

- ✅ Enhancement PRD
- ✅ Epics created (3-7 high-level work packages)
- ✅ User stories created (20-50 tasks)
- ⚠️ No dependencies yet (Architect's job)

**Handoff**: Tell user to switch to Architect agent

---

### 3. Refactoring Architecture (Architect)

**Agent**: `@architect` or activate [architect.md](../agents/architect.md)

**Objective**: Design changes that integrate safely with existing system

**Activities**:

1. **Read Existing Context**:

   ```python
   analysis = mcp__archon__find_documents(project_id, document_type="note")
   prd = mcp__archon__find_documents(project_id, document_type="spec")
   stories = mcp__archon__find_tasks(project_id)
   ```

2. **Analyze Current Architecture**:

   ```bash
   # Identify existing patterns
   grep -r "class.*Model" src/  # Database models
   grep -r "def.*view" src/  # API endpoints
   grep -r "import.*Component" frontend/  # React components

   # Check existing dependencies
   pip list  # or npm list
   ```

3. **Create Integration Architecture**:

   ```python
   mcp__archon__manage_document("create",
       project_id=project_id,
       title="Integration Architecture",
       document_type="design",
       content={
           "architecture_type": "Incremental Enhancement",
           "integration_strategy": "Strangler Fig Pattern",

           "existing_components": [
               {
                   "name": "Django REST API",
                   "status": "keep",
                   "changes": "Add WebSocket endpoints alongside REST"
               },
               {
                   "name": "PostgreSQL Database",
                   "status": "extend",
                   "changes": "Add notifications table, keep existing schema"
               },
               {
                   "name": "React Frontend",
                   "status": "enhance",
                   "changes": "Add notification component, no breaking changes to existing UI"
               }
           ],

           "new_components": [
               {
                   "name": "WebSocket Server (Django Channels)",
                   "purpose": "Real-time notification delivery",
                   "integration_point": "Runs alongside Django WSGI server"
               },
               {
                   "name": "Redis Pub/Sub",
                   "purpose": "Message broker for notifications",
                   "integration_point": "New dependency, no changes to existing Redis usage"
               },
               {
                   "name": "Notification Service",
                   "purpose": "Business logic for creating/sending notifications",
                   "integration_point": "New Django app, imported by existing views"
               }
           ],

           "data_model_changes": [
               {
                   "action": "create",
                   "model": "Notification",
                   "fields": [
                       {"name": "id", "type": "uuid"},
                       {"name": "user", "type": "ForeignKey(User)"},
                       {"name": "message", "type": "text"},
                       {"name": "created_at", "type": "timestamp"}
                   ]
               },
               {
                   "action": "extend",
                   "model": "User",
                   "fields": [
                       {"name": "notification_preferences", "type": "JSONField", "default": "{}"}
                   ]
               }
           ],

           "api_changes": [
               {
                   "action": "add",
                   "endpoint": "ws://api.example.com/ws/notifications/",
                   "method": "WebSocket",
                   "description": "Real-time notification stream"
               },
               {
                   "action": "add",
                   "endpoint": "/api/notifications/preferences/",
                   "method": "GET/PUT",
                   "description": "Manage notification settings"
               },
               {
                   "action": "no_change",
                   "note": "All existing REST endpoints remain unchanged"
               }
           ],

           "deployment_strategy": {
               "phase_1": "Deploy backend (WebSocket server, DB migrations) with feature flag OFF",
               "phase_2": "Deploy frontend (notification UI) with feature flag OFF",
               "phase_3": "Enable feature flag for 10% of users (canary deployment)",
               "phase_4": "Gradual rollout to 50%, 100% based on metrics",
               "rollback": "Disable feature flag, no database rollback needed (additive only)"
           },

           "risk_mitigation": [
               "Feature flag controls new functionality",
               "Database migrations are additive (no breaking changes)",
               "WebSocket server runs independently (can fail without breaking REST API)",
               "Existing tests continue to pass (no modifications needed)"
           ]
       }
   )
   ```

4. **Add Dependencies to Tasks**:

   **Critical for Brownfield**: Dependencies must respect existing system boundaries

   ```python
   # Example dependency chain for brownfield

   # Wave 1: Foundation (can run in parallel, don't touch existing code)
   mcp__archon__manage_task("update",
       task_id="story-db-migration",
       description="Original description...\n\nDepends on: None\nConstraint: Must be additive-only (no ALTER existing tables)"
   )

   mcp__archon__manage_task("update",
       task_id="story-redis-setup",
       description="Original description...\n\nDepends on: None\nConstraint: Must not interfere with existing Redis usage"
   )

   # Wave 2: Backend services (depends on Wave 1)
   mcp__archon__manage_task("update",
       task_id="story-websocket-server",
       description="Original description...\n\nDepends on: #story-db-migration, #story-redis-setup\nConstraint: Must run on different port than existing Django server"
   )

   mcp__archon__manage_task("update",
       task_id="story-notification-service",
       description="Original description...\n\nDepends on: #story-db-migration\nConstraint: Must integrate via existing Django app structure"
   )

   # Wave 3: Frontend (depends on Wave 2 being deployed)
   mcp__archon__manage_task("update",
       task_id="story-notification-component",
       description="Original description...\n\nDepends on: #story-websocket-server\nConstraint: Must not break existing React components"
   )
   ```

5. **Categorize by Risk Level**:

   Use `task_order` to reflect both dependency AND risk:
   - **100**: Safe, isolated changes (new files, additive DB migrations)
   - **90**: Low risk integrations (new API endpoints, new components)
   - **80**: Medium risk (modifying existing components)
   - **70**: High risk (refactoring core logic, schema changes)

   ```python
   # Example
   mcp__archon__manage_task("update",
       task_id="story-new-notification-model",
       task_order=100  # Safe: new model, no changes to existing
   )

   mcp__archon__manage_task("update",
       task_id="story-modify-user-model",
       task_order=80  # Medium risk: extending existing model
   )
   ```

**Architecture Document Key Sections for Brownfield**:

- **Existing Components**: What to keep, modify, or replace
- **Integration Points**: How new code interfaces with old code
- **Data Model Changes**: Migrations strategy (additive vs breaking)
- **Deployment Strategy**: Phased rollout, feature flags, rollback
- **Risk Mitigation**: What could go wrong and how to prevent it

**Deliverables**:

- ✅ Integration architecture document
- ✅ All tasks updated with dependencies AND constraints
- ✅ Tasks categorized by risk level
- ✅ Deployment strategy defined

**Handoff**: Tell user to switch to SM Orchestrator

---

## Planning Phase Complete ✅

**What we have now**:

- Analyzed existing codebase
- PRD for enhancements/refactoring
- Architecture for safe integration
- User stories with dependencies AND constraints
- Risk-aware execution plan

**Ready for**: [brownfield-development.md](brownfield-development.md)

---

## Brownfield-Specific Best Practices

### 1. Incremental Changes

- **Strangler Fig Pattern**: Build new alongside old, gradually migrate
- **Feature Flags**: Deploy code disabled, enable gradually
- **Additive Migrations**: Add new, don't modify old (until ready)

### 2. Constraint Documentation

Every task should specify:

- What existing code it touches
- What existing tests must still pass
- What existing APIs must remain compatible

### 3. Risk Assessment

Mark tasks with risk level:

- 🟢 Low: New files, isolated changes
- 🟡 Medium: Extending existing components
- 🔴 High: Modifying core logic, schema changes

High-risk tasks get extra scrutiny in QA.

### 4. Rollback Strategy

Before any change:

- Can we rollback database migrations?
- Can we disable features without code rollback?
- Do existing tests verify backward compatibility?

---

**See Also**:

- [brownfield-development.md](brownfield-development.md) - Development phase
- [greenfield-planning.md](greenfield-planning.md) - Planning for new projects
- [../agents/sm-orchestrator.md](../agents/sm-orchestrator.md) - Team orchestration
