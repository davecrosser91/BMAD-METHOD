<!-- Powered by BMAD™ Core with Archon -->

# step-2-pm-requirements

**Workflow**: Greenfield Planning - Step 2/4
**Agent**: `@pm`
**Duration**: 2-3 hours
**Previous Step**: [step-1-analyst-project-init.md](step-1-analyst-project-init.md)
**Next Step**: [step-3-architect-design.md](step-3-architect-design.md)

---

## Objective

Create the Product Requirements Document (PRD), define epics, and break them into user stories.

---

## Prerequisites

- ✅ Step 1 complete (Analyst created project and research doc)
- ✅ `project_id` available
- ✅ Research findings documented in Archon

---

## Activities

### 1. Read Analyst's Research

```python
# Get project
project = mcp__archon__find_projects(project_id=project_id)

# Read research findings
research_docs = mcp__archon__find_documents(
    project_id=project_id,
    document_type="note"
)

# Read the content to understand:
# - Problem statement
# - Target users
# - Stakeholder requirements
# - Competitive analysis
# - Technical constraints
# - Success metrics
```

---

### 2. Create Product Requirements Document (PRD)

**PRD Structure:**

```python
prd_content = {
    "vision": """
        One paragraph: What we're building and why.
        Example: "A task management app for remote teams that makes
        async collaboration feel effortless."
    """,

    "target_users": [
        {
            "persona": "Remote Team Lead",
            "needs": ["Track team progress", "Async updates", "Clear visibility"],
            "pain_points": ["Too many meetings", "Scattered info", "Timezone challenges"]
        },
        {
            "persona": "Individual Contributor",
            "needs": ["Clear priorities", "Minimal interruptions", "Easy updates"],
            "pain_points": ["Unclear expectations", "Context switching", "Status meetings"]
        }
    ],

    "features": [
        {
            "name": "User Authentication",
            "priority": "P0",  # Must-have
            "description": "Secure signup, login, password reset",
            "user_stories": [
                "As a user, I can sign up with email/password",
                "As a user, I can log in securely",
                "As a user, I can reset my password if forgotten"
            ]
        },
        {
            "name": "Task Management",
            "priority": "P0",
            "description": "Create, assign, track tasks",
            "user_stories": [
                "As a team lead, I can create tasks with descriptions",
                "As a team lead, I can assign tasks to team members",
                "As a user, I can mark my tasks as complete",
                "As a user, I can filter my tasks by status"
            ]
        },
        {
            "name": "Notifications",
            "priority": "P1",  # Nice-to-have
            "description": "Email/push notifications for updates",
            "user_stories": [
                "As a user, I receive email when assigned a task",
                "As a team lead, I'm notified when tasks are completed"
            ]
        }
    ],

    "success_metrics": [
        "100 active teams in first 3 months",
        "< 2 second page load time",
        "90% user satisfaction score",
        "50% reduction in status meeting time"
    ],

    "constraints": [
        "Must use React (team expertise)",
        "Must support mobile browsers",
        "Must comply with GDPR",
        "Must integrate with Slack (company requirement)"
    ],

    "out_of_scope": [
        "Video conferencing (use existing tools)",
        "File storage (integrate with Google Drive)",
        "Time tracking (future phase)"
    ]
}

# Create PRD in Archon
prd_doc = mcp__archon__manage_document(
    action="create",
    project_id=project_id,
    title="Product Requirements Document",
    document_type="spec",
    author="PM",
    content=prd_content
)
```

---

### 3. Define Epics as High-Level Tasks

**Epics = Major Features** (3-7 typically)

```python
# Epic 1: User Authentication
epic_auth = mcp__archon__manage_task(
    action="create",
    project_id=project_id,
    title="Epic: User Authentication",
    description="""
    Complete user authentication system including:
    - Signup with email/password
    - Secure login
    - Password reset flow
    - Session management
    """,
    feature="authentication",  # Label for grouping
    task_order=95,  # High number = Epic (not regular task)
    status="todo"
)

# Epic 2: Task Management
epic_tasks = mcp__archon__manage_task(
    action="create",
    project_id=project_id,
    title="Epic: Task Management",
    description="""
    Core task management functionality:
    - Create/edit/delete tasks
    - Assign to team members
    - Track status (todo/doing/done)
    - Filter and search
    """,
    feature="task-management",
    task_order=94,
    status="todo"
)

# Continue for all P0 features...
```

---

### 4. Break Epics into User Stories

**User Stories = Detailed Tasks** (3-8 per epic)

```python
# Stories for Epic: User Authentication

# Story 1
story_signup = mcp__archon__manage_task(
    action="create",
    project_id=project_id,
    title="User can sign up with email/password",
    description="""
    As a new user, I want to create an account with my email and password,
    so that I can start using the app.

    **Acceptance Criteria:**
    - [ ] Signup form with email + password fields
    - [ ] Email validation (format check)
    - [ ] Password strength requirements (min 8 chars, 1 number, 1 special char)
    - [ ] Password confirmation field
    - [ ] "Sign Up" button creates account
    - [ ] Success: redirect to dashboard
    - [ ] Error handling: show clear error messages
    - [ ] Email uniqueness check (no duplicate accounts)

    **Technical Notes:**
    - Use bcrypt for password hashing
    - Store user in PostgreSQL users table
    - Return JWT token on successful signup
    """,
    feature="authentication",  # Links to epic
    task_order=80,  # Regular story
    assignee="User",  # Unassigned initially
    status="todo"
)

# Story 2
story_login = mcp__archon__manage_task(
    action="create",
    project_id=project_id,
    title="User can log in with credentials",
    description="""
    As a returning user, I want to log in with my email and password,
    so that I can access my account.

    **Acceptance Criteria:**
    - [ ] Login form with email + password fields
    - [ ] "Log In" button authenticates user
    - [ ] Success: redirect to dashboard
    - [ ] Error: show "Invalid credentials" message
    - [ ] Remember me checkbox (optional)
    - [ ] Rate limiting: max 5 attempts per 15 minutes

    **Technical Notes:**
    - Verify password with bcrypt
    - Return JWT token on success
    - Set token expiry (24 hours)
    """,
    feature="authentication",
    task_order=80,
    assignee="User",
    status="todo"
)

# Repeat for ALL user stories across ALL epics
# Aim for 20-50 total stories
```

---

## Story Quality Checklist

Each story should have:

- ✅ **User-centric title**: "User can [action]"
- ✅ **User story format**: "As a [persona], I want [action], so that [benefit]"
- ✅ **Acceptance criteria**: Bullet list with testable conditions
- ✅ **Technical notes**: Implementation hints for developers
- ✅ **Feature link**: `feature` field links to epic
- ✅ **Appropriate size**: 2-4 hours of work (not too big, not too small)

**DO NOT add dependencies yet** - Architect will do this in Step 3!

---

## Deliverables ✅

- ✅ **PRD Document**: Complete product requirements in Archon
- ✅ **Epics**: 3-7 high-level features as tasks (task_order ≥ 90)
- ✅ **User Stories**: 20-50 detailed tasks with acceptance criteria
- ✅ **All linked**: Stories use `feature` field to link to epics

---

## Verification

```python
# Check PRD exists
prd_docs = mcp__archon__find_documents(
    project_id=project_id,
    document_type="spec"
)
assert len(prd_docs) > 0, "PRD not created!"

# Check epics
all_tasks = mcp__archon__find_tasks(project_id=project_id)
epics = [t for t in all_tasks if t.task_order >= 90]
stories = [t for t in all_tasks if t.task_order < 90]

print(f"""
✅ Step 2 Complete!

PRD: {len(prd_docs)} document(s)
Epics: {len(epics)} features
Stories: {len(stories)} tasks

Epic breakdown:
""")

for epic in epics:
    epic_stories = [s for s in stories if s.feature == epic.feature]
    print(f"  - {epic.title}: {len(epic_stories)} stories")

print(f"""
👉 Next: Hand off to @architect for technical design and dependency analysis
""")
```

---

## Handoff to Architect

**Tell the user:**

```
✅ Requirements engineering complete!

📋 Deliverables:
- PRD with vision, features, success metrics
- {len(epics)} Epics (high-level features)
- {len(stories)} User Stories (detailed tasks with acceptance criteria)

👉 Next step: Switch to @architect to:
- Design the system architecture
- Analyze task dependencies
- Prepare for parallel development

The Architect will ensure all stories are technically feasible and properly ordered.
```

---

## Troubleshooting

### Not sure how to break down a feature

- Each story should be implementable in 2-4 hours
- If bigger: break into smaller stories
- If smaller: combine related work

### Stories lack acceptance criteria

Use this template:

```
**Acceptance Criteria:**
- [ ] User can see X
- [ ] User can do Y
- [ ] System handles Z error case
- [ ] Tests pass for A, B, C
```

### Too many/few stories

- **Too few** (<15): Break epics into more granular tasks
- **Too many** (>60): Combine related stories or move some to P1/P2

---

## Related Tasks

- **Previous**: [step-1-analyst-project-init.md](step-1-analyst-project-init.md)
- **Next**: [step-3-architect-design.md](step-3-architect-design.md)
- **Full workflow**: [execute-greenfield-planning.md](execute-greenfield-planning.md)
- **Create docs helper**: [create-doc.md](create-doc.md)
