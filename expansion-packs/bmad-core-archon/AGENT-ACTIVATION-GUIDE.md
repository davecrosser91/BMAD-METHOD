# Agent Activation & Handoff Guide for Claude Code

**Last Updated:** 2025-10-03
**Version:** 3.0.3

---

## Table of Contents

1. [How to Activate Agents in Claude Code](#1-how-to-activate-agents-in-claude-code)
2. [How Agents Call Each Other](#2-how-agents-call-each-other)
3. [Multi-Agent Workflows](#3-multi-agent-workflows)
4. [Best Practices](#4-best-practices)
5. [Examples](#5-examples)

---

## 1. How to Activate Agents in Claude Code

### Important: The `@` Symbol in Claude Code

**Claude Code does NOT support custom `@agent` activation syntax.** The `@` symbol in Claude Code is reserved for:

- `@filename` - Mention a file
- `@ClassName` - Mention a code symbol
- `@web` - Search the web

### Method A: Direct Agent Activation (Recommended)

**Simple Version:**

```
Please act as the PM agent from .bmad-core-archon/agents/pm.md
```

**Complete Version:**

```
Please:
1. Read the complete agent definition from .bmad-core-archon/agents/pm.md
2. Follow the activation-instructions exactly as specified in the YAML block
3. Adopt the persona defined in the agent section
4. Check Archon MCP availability via mcp__archon__health_check()
5. Load core-config.yaml if available
6. Greet me and show available commands (*help)
7. Stay in character until I ask you to exit

Now activate as the PM agent.
```

### Method B: Specific Task Request

```
Acting as the PM agent (.bmad-core-archon/agents/pm.md),
please execute the *create-prd command.
```

### Method C: Agent + Context

```
I need to create a PRD for an authentication system.

Please:
1. Activate as the PM agent from .bmad-core-archon/agents/pm.md
2. Check for prerequisite documents (Project Brief, Requirements Analysis)
3. Execute the *create-prd workflow

Project context: E-commerce user authentication with JWT tokens
```

### Method D: Via Orchestrator (Multi-Agent Workflows)

```
Please act as the BMad Orchestrator from .bmad-core-archon/agents/bmad-orchestrator.md
and guide me through the greenfield-fullstack workflow.
```

---

## 2. How Agents Call Each Other

### The Agent Handoff Pattern

BMAD agents are designed to work together through **explicit handoffs**. When an agent completes its work, it tells the **user** to switch to another agent.

### Pattern 1: Dependency Checking → User Handoff

**Example from PM Agent:**

When the PM agent checks for prerequisites and finds them missing:

```yaml
# PM agent checks dependencies
DOCUMENT DEPENDENCY CHECK:
  If expected documents are MISSING:
    STOP and inform user:

    "⚠️ Missing Prerequisite Documents

    I'm about to create a PRD, but I couldn't find:
    - [ ] Project Brief (typically created by @analyst)
    - [ ] Requirements Analysis (typically created by @analyst)

    Options:
    1. Proceed anyway
    2. Create missing docs first - Switch to @analyst
    3. Skip and continue

    What would you like to do?"
```

**User Response:**

```
Option 2 - create missing docs
```

**User Action:**

```
Please act as the Analyst agent from .bmad-core-archon/agents/analyst.md
and create the project brief.
```

### Pattern 2: Workflow Handoff Prompts

Workflows define explicit handoff prompts:

```yaml
handoff_prompts:
  analyst_to_pm: 'Project brief is complete. Save it as docs/project-brief.md,
    then create the PRD.'
  pm_to_ux: 'PRD is ready. Save it as docs/prd.md,
    then create the UI/UX specification.'
  ux_to_architect: 'UI/UX spec complete. Save it as docs/front-end-spec.md,
    then create the fullstack architecture.'
```

**When an agent completes its work:**

```
Agent (Analyst): "✓ Project Brief created!

Project brief is complete. Save it as docs/project-brief.md in your project,
then create the PRD.

To continue, please switch to the PM agent."
```

**User Action:**

```
Please act as the PM agent from .bmad-core-archon/agents/pm.md
and create the PRD using the project brief we just created.
```

### Pattern 3: Task Assignment → User Coordinates

**PM creates tasks and assigns them:**

```python
# PM agent creates story
mcp__archon__manage_task(
    action="create",
    project_id="proj-123",
    title="User can login with email and password",
    assignee="James",  # Dev agent
    status="todo"
)
```

**PM tells user:**

```
PM: "✓ Created user story: 'User can login with email and password'
     Assigned to: James (Dev agent)
     Status: todo

To implement this story, please switch to the Dev agent."
```

**User Action:**

```
Please act as the Dev agent from .bmad-core-archon/agents/dev.md
and implement the task we just created.
```

### Pattern 4: Review Queue → User Coordinates

**Dev completes work:**

```python
# Dev marks task as review
mcp__archon__manage_task(
    action="update",
    task_id="task-789",
    status="review"
)
```

**Dev tells user:**

```
Dev: "✓ Implementation complete!
      Task status: doing → review

Task is now in the review queue for QA.
To review this work, please switch to the QA agent."
```

**User Action:**

```
Please act as the QA agent from .bmad-core-archon/agents/qa.md
and review the task in the review queue.
```

---

## 3. Multi-Agent Workflows

### The User is the Orchestrator

In Claude Code, **YOU (the user)** orchestrate agent handoffs. Agents cannot directly call each other - they communicate through:

1. **Archon MCP** (shared state: tasks, documents, progress)
2. **User** (agent switching)

### Complete Workflow Example

**Scenario:** Build user authentication system

#### Step 1: Start with Analyst

```
Please act as the Analyst agent from .bmad-core-archon/agents/analyst.md
and help me analyze requirements for a user authentication system.
```

**Analyst Response:**

```
Hi! I'm Emma, your Business Analyst. 📊

I'll help you analyze requirements for the authentication system.

Let me check Archon...
✓ Archon MCP connected
✓ Project: "User Auth System" (creating...)
✓ Project ID: proj-auth-123

Available commands:
*brainstorm - Facilitate brainstorming session
*create-project-brief - Create project brief
*search-kb - Search knowledge base

What would you like to do first?
```

**User:**

```
*create-project-brief
```

**Analyst creates brief, then:**

```
Analyst: "✓ Project Brief created in Archon!
          Document ID: doc-brief-456

Project brief is complete. To continue, please switch to the PM agent
to create the PRD."
```

#### Step 2: Switch to PM

```
Please act as the PM agent from .bmad-core-archon/agents/pm.md
and create a PRD for the user authentication system.
```

**PM Response:**

```
Hi! I'm John, your Product Manager. 📋

Let me check prerequisites...
✓ Found: Project Brief (doc-brief-456)
✓ Loaded project context

Available commands:
*create-prd - Create Product Requirements Document
*create-epic - Create epic
*create-story - Create user story

Ready to create PRD!
```

**User:**

```
*create-prd
```

**PM creates PRD and epics, then:**

```
PM: "✓ PRD created! (doc-prd-789)
     ✓ Created 4 epics (Login, Signup, Password Reset, JWT)

PRD is ready. To continue with architecture, please switch to the Architect agent."
```

#### Step 3: Switch to Architect

```
Please act as the Architect agent from .bmad-core-archon/agents/architect.md
and create the architecture for this authentication system.
```

**Architect Response:**

```
Hi! I'm Sarah, your Architect. 🏗️

Let me check prerequisites...
✓ Found: PRD (doc-prd-789)
✓ Read PRD: User Authentication System

Available commands:
*create-architecture - Create architecture document
*create-adr - Create architecture decision record

Ready to design the architecture!
```

**User:**

```
*create-architecture
```

**Architect creates architecture, then:**

```
Architect: "✓ Architecture created! (doc-arch-999)
            ✓ Tech Stack: Node.js, Express, PostgreSQL, JWT, bcrypt

Architecture is complete. Please switch to PM to create stories based on this architecture."
```

#### Step 4: Back to PM for Stories

```
Please act as the PM agent from .bmad-core-archon/agents/pm.md
and create user stories for the Login epic.
```

**PM:**

```
PM: "✓ Found Login epic

Creating stories...
```

**User:**

```
*create-story
```

**PM creates stories, then:**

```
PM: "✓ Created 5 stories for Login epic
     All stories assigned to: James (Dev agent)
     All stories status: todo

Stories are ready for development. Please switch to the Dev agent to implement."
```

#### Step 5: Switch to Dev

```
Please act as the Dev agent from .bmad-core-archon/agents/dev.md
and implement the next task.
```

**Dev Response:**

```
Hi! I'm James, your Developer. 💻

Let me check my tasks...
✓ Found 5 tasks assigned to me
✓ Next task: "User can login with email and password"

Available commands:
*my-tasks - Show my assigned tasks
*next-task - Get next todo task
*develop-task - Implement specific task

Ready to start development!
```

**User:**

```
*next-task
```

**Dev implements, then:**

```
Dev: "✓ Implementation complete!
      ✓ Task status: todo → doing → review
      ✓ All acceptance criteria met
      ✓ Tests passed

Task is now in review queue. Please switch to QA agent for review."
```

#### Step 6: Switch to QA

```
Please act as the QA agent from .bmad-core-archon/agents/qa.md
and review the task in the review queue.
```

**QA Response:**

```
Hi! I'm Maria, your QA Engineer. 🧪

Let me check the review queue...
✓ Found 1 task: "User can login with email and password"

Available commands:
*review-queue - Show tasks to review
*review-task - Review specific task

Ready to review!
```

**User:**

```
*review-task task-login-123
```

**QA reviews and approves:**

```
QA: "✓ All acceptance criteria validated
     ✓ Code review passed
     ✓ Tests verified
     ✓ Task status: review → done

Task complete! Please switch back to Dev agent for the next task."
```

#### Repeat Steps 5-6 for remaining tasks

---

## 4. Best Practices

### ✅ DO:

1. **Start with Analyst** for new projects
   - Creates foundation documents others depend on
   - Ensures alignment before implementation

2. **Check Dependencies** before major work
   - Agents will alert you to missing prerequisites
   - Follow the suggested handoffs

3. **Use Archon for Shared State**
   - Tasks, documents, progress stored in Archon
   - All agents can access shared context

4. **One Agent at a Time**
   - Complete work with one agent before switching
   - Clear handoff points

5. **Follow Workflow Sequences**
   - Analyst → PM → Architect → Dev → QA
   - Each agent builds on previous work

6. **Use Explicit Agent Activation**
   - Always specify the full agent path
   - Include activation instructions

### ❌ DON'T:

1. **Don't expect `@agent` syntax to work**
   - Claude Code doesn't support custom `@` agents
   - Use explicit activation instead

2. **Don't skip prerequisites**
   - PM needs Project Brief from Analyst
   - Architect needs PRD from PM
   - Dev needs Stories from PM

3. **Don't mix agent contexts**
   - Don't ask PM to write code
   - Don't ask Dev to create PRDs
   - Each agent has specialized expertise

4. **Don't expect agents to auto-handoff**
   - Agents tell YOU to switch
   - YOU activate the next agent

---

## 5. Examples

### Example 1: PM Requesting Dev Implementation

**PM Agent (after creating stories):**

```
PM: "I've created 5 user stories for the Login epic. All stories are now in
     the 'todo' status and assigned to James (Dev agent).

     To start implementation, please switch to the Dev agent:

     'Please act as the Dev agent from .bmad-core-archon/agents/dev.md
      and implement the next task.'"
```

**What the PM CANNOT do:**

```python
# ❌ This doesn't work - agents can't call each other directly
activate_agent("dev")  # No such function

# ❌ This doesn't work - no direct agent communication
send_message_to_dev("implement task-123")  # No such function
```

**What the PM CAN do:**

```python
# ✅ Create task in Archon
mcp__archon__manage_task(
    action="create",
    task_id="task-123",
    assignee="James",
    status="todo"
)

# ✅ Tell USER to switch agents
print("Please switch to the Dev agent to implement task-123")
```

---

### Example 2: Dev Requesting QA Review

**Dev Agent (after implementation):**

```
Dev: "Implementation complete! I've:
      - Implemented all acceptance criteria
      - Written and run tests (all passing)
      - Logged progress to Archon
      - Marked task as 'review'

      Task is now ready for QA review. Please switch to the QA agent:

      'Please act as the QA agent from .bmad-core-archon/agents/qa.md
       and review task task-login-123 from the review queue.'"
```

**What happens in Archon:**

```python
# Dev updates task status
mcp__archon__manage_task(
    action="update",
    task_id="task-login-123",
    status="review"  # QA will filter by this
)

# QA later queries review queue
tasks = mcp__archon__find_tasks(
    project_id="proj-123",
    filter_by="status",
    filter_value="review"
)
# Returns: task-login-123
```

---

### Example 3: Architect Suggesting Changes to PM

**Architect Agent (after creating architecture):**

```
Architect: "Architecture complete! However, I noticed the PRD doesn't include
            a story for 'Rate Limiting' which is critical for security.

            I recommend adding this story to the Login epic.

            Please switch to the PM agent to update the PRD:

            'Please act as the PM agent from .bmad-core-archon/agents/pm.md
             and add a story for rate limiting to the Login epic.'"
```

---

### Example 4: Multi-Agent Workflow with User Coordination

**Complete Session:**

```
User: Please act as the Analyst agent and analyze requirements for user auth
Analyst: [analyzes, creates brief]
Analyst: "✓ Done. Switch to PM for PRD."

User: Please act as the PM agent and create PRD
PM: [creates PRD, epics, stories]
PM: "✓ Done. Switch to Architect for architecture."

User: Please act as the Architect agent and create architecture
Architect: [creates architecture, tech stack, ADRs]
Architect: "✓ Done. Switch to Dev for implementation."

User: Please act as the Dev agent and implement next task
Dev: [implements, tests, logs progress]
Dev: "✓ Done. Switch to QA for review."

User: Please act as the QA agent and review the task
QA: [reviews, validates, approves]
QA: "✓ Done. Switch to Dev for next task."

User: Please act as the Dev agent and implement next task
[Repeat Dev → QA cycle for all tasks]
```

---

## Summary

### Key Points:

1. **Agent Activation**: Use explicit prompts, not `@agent` syntax
2. **Agent Handoffs**: Agents tell YOU to switch, YOU activate the next agent
3. **Shared State**: Archon MCP stores tasks/docs for all agents
4. **User Orchestration**: YOU coordinate the workflow
5. **Explicit Communication**: Agents communicate through Archon + handoff messages to user

### The BMAD Pattern:

```
┌──────────┐         ┌──────────┐         ┌──────────┐
│ Agent A  │──msg──→ │   USER   │──msg──→ │ Agent B  │
│(Analyst) │         │(You!)    │         │  (PM)    │
└────┬─────┘         └──────────┘         └────┬─────┘
     │                                          │
     └────────────→ Archon MCP ←───────────────┘
                   (Shared State)
```

**Communication Flow:**

1. Agent A completes work
2. Agent A updates Archon (tasks/docs)
3. Agent A tells USER to switch to Agent B
4. USER activates Agent B
5. Agent B reads from Archon
6. Agent B continues work
7. Repeat

This pattern ensures:

- ✅ Clear handoffs
- ✅ No agent confusion
- ✅ User maintains control
- ✅ Shared context via Archon
- ✅ Works in Claude Code (and all other environments)

---

**For more information:**

- [README.md](README.md) - User-facing documentation
- [README_DETAILED.md](README_DETAILED.md) - Technical deep dive
- [Archon MCP Integration](https://github.com/coleam00/Archon)
