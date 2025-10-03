# BMAD Core + Archon: Technical Deep Dive

**Version:** 3.1.0
**Expansion Pack:** bmad-core-archon
**Last Updated:** 2025-10-03

> A comprehensive technical guide to understanding the architecture, components, and workflows of the BMAD Core + Archon expansion pack.

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Folder Structure](#2-folder-structure)
3. [Agents: The Intelligent Personas](#3-agents-the-intelligent-personas)
4. [Tasks: Executable Workflows](#4-tasks-executable-workflows)
5. [Templates: Document Structure Definitions](#5-templates-document-structure-definitions)
6. [Workflows: Orchestration Sequences](#6-workflows-orchestration-sequences)
7. [Agent Teams: Pre-configured Bundles](#7-agent-teams-pre-configured-bundles)
8. [Core Config: System Configuration](#8-core-config-system-configuration)
9. [Data Files: Knowledge & Reference](#9-data-files-knowledge--reference)
10. [How Everything Works Together](#10-how-everything-works-together)
11. [Integration with Archon MCP](#11-integration-with-archon-mcp)
12. [The Complete Flow: Greenfield Example](#12-the-complete-flow-greenfield-example)
13. [Advanced Concepts](#13-advanced-concepts)

---

## 1. Architecture Overview

### 1.1 The Hybrid Architecture

The bmad-core-archon expansion pack implements a **hybrid architecture** that combines the best of both worlds:

```
┌─────────────────────────────────────────────────────────────┐
│                  BMAD Framework Layer                        │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐            │
│  │  Agents    │  │   Tasks    │  │ Templates  │            │
│  │  (.md)     │  │   (.md)    │  │  (.yaml)   │            │
│  │            │  │            │  │            │            │
│  │ Git-Based  │  │ Git-Based  │  │ Git-Based  │            │
│  └────────────┘  └────────────┘  └────────────┘            │
└─────────────────────────────────────────────────────────────┘
                           ↕
┌─────────────────────────────────────────────────────────────┐
│                   Archon MCP Server                          │
│  ┌─────────────────┐  ┌─────────────────┐                  │
│  │ Task Management │  │ Knowledge Base  │                  │
│  │ • Projects      │  │ • RAG Search    │                  │
│  │ • Epics/Stories │  │ • Code Examples │                  │
│  │ • Status Flow   │  │ • Semantic      │                  │
│  └─────────────────┘  └─────────────────┘                  │
│                                                              │
│  ┌─────────────────┐  ┌─────────────────┐                  │
│  │ Doc Management  │  │ Version History │                  │
│  │ • PRDs          │  │ • Snapshots     │                  │
│  │ • Architecture  │  │ • Restore       │                  │
│  │ • Specs         │  │ • Tracking      │                  │
│  └─────────────────┘  └─────────────────┘                  │
└─────────────────────────────────────────────────────────────┘
```

**Why Hybrid?**

- **Git** - Perfect for versioning agent definitions, tasks, templates, and source code
- **Archon** - Excellent for dynamic task management, document versioning, and RAG-powered knowledge search
- **Best of Both Worlds** - Version-controlled framework + dynamic runtime management

### 1.2 Key Design Principles

1. **Archon-First Rule** - All agents prioritize Archon MCP for task/document management
2. **Research-Driven Development** - Every agent searches knowledge base before implementing
3. **Project-Scoped Documents** - Each BMAD project maps to one Archon project
4. **Shared Knowledge Base** - All projects benefit from accumulated knowledge
5. **Smart Dependency Checking** - Agents verify prerequisites before major work
6. **Workflow Consistency** - Same workflows as bmad-core, different backend
7. **Parallel Execution** - NEW: Orchestrated teams of subagents for maximum throughput

### 1.3 Parallel Development Architecture (NEW)

The bmad-core-archon expansion pack now supports **parallel team orchestration** using Claude Code subagents:

```
┌─────────────────────────────────────────────────────────────┐
│                  Dev Team Lead Context                     │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Dependency Graph Analysis                            │  │
│  │ • Parse task dependencies                            │  │
│  │ • Build execution waves                              │  │
│  │ • Track progress                                     │  │
│  └──────────────────────────────────────────────────────┘  │
│                           ↓                                  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Wave 1: Parallel Execution (5 devs simultaneously)   │  │
│  │ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐    │  │
│  │ │ Dev #1  │ │ Dev #2  │ │ Dev #3  │ │ Dev #4  │... │  │
│  │ │ TASK-101│ │ TASK-102│ │ TASK-103│ │ TASK-104│    │  │
│  │ └─────────┘ └─────────┘ └─────────┘ └─────────┘    │  │
│  │      ↓           ↓           ↓           ↓          │  │
│  │ [All update Archon, report to SM]                   │  │
│  └──────────────────────────────────────────────────────┘  │
│                           ↓                                  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ QA Phase: Parallel Review (3 QA simultaneously)      │  │
│  │ ┌────────┐ ┌────────┐ ┌────────┐                    │  │
│  │ │ QA #1  │ │ QA #2  │ │ QA #3  │                    │  │
│  │ │TASK-101│ │TASK-102│ │TASK-103│                    │  │
│  │ └────────┘ └────────┘ └────────┘                    │  │
│  │      ↓          ↓          ↓                         │  │
│  │ [PASS/FAIL verdicts → Archon]                       │  │
│  └──────────────────────────────────────────────────────┘  │
│                           ↓                                  │
│  [Aggregate results, proceed to Wave 2]                     │
└─────────────────────────────────────────────────────────────┘
                           ↕
              ┌──────────────────────┐
              │    Archon MCP        │
              │  (Shared State)      │
              │ • Task status        │
              │ • Docs & PRDs        │
              │ • Progress tracking  │
              └──────────────────────┘
```

**Key Benefits:**

- **3-5x Speedup**: Multiple developers work simultaneously on independent tasks
- **Context Isolation**: Each dev/QA has clean, focused context for their task
- **SM Oversight**: All results flow back to SM for aggregation and tracking
- **Dependency Management**: Only unblocked tasks are executed, ensuring correctness
- **Quality Gates**: All code reviewed by QA before marking done

**Example Speedup:**

- Traditional: 20 tasks × 2 hours = 40 hours sequential
- Parallel: 4 waves × 2 hours = 8 hours (with 5 devs per wave)
- **Result: 5x faster delivery**

---

## 2. Folder Structure

### 2.1 Complete Directory Tree

```
expansion-packs/bmad-core-archon/
├── agents/                    # Agent persona definitions
│   ├── analyst.md
│   ├── architect.md
│   ├── bmad-master.md
│   ├── bmad-orchestrator.md
│   ├── dev.md
│   ├── pm.md
│   ├── po.md
│   ├── qa.md
│   └── dev-team-lead.md     # NEW: Parallel team orchestration
│
├── tasks/                     # Executable workflow tasks
│   ├── archon-init-project.md
│   ├── archon-create-prd.md
│   ├── archon-create-epic.md
│   ├── archon-create-story.md
│   ├── archon-develop-task.md
│   ├── archon-create-architecture.md
│   ├── analyze-task-dependencies.md    # NEW: Build dependency graph
│   ├── execute-parallel-sprint.md      # NEW: Parallel execution
│   ├── create-doc.md
│   ├── execute-checklist.md
│   ├── advanced-elicitation.md
│   ├── apply-qa-fixes.md
│   ├── brownfield-*.md        # (multiple brownfield tasks)
│   ├── create-*.md            # (various creation tasks)
│   └── ... (21 total from core + 10 Archon-specific)
│
├── templates/                 # Document structure templates
│   ├── prd-tmpl.yaml
│   ├── architecture-tmpl.yaml
│   ├── story-tmpl.yaml
│   ├── fullstack-architecture-tmpl.yaml
│   ├── front-end-spec-tmpl.yaml
│   ├── project-brief-tmpl.yaml
│   ├── brainstorming-output-tmpl.yaml
│   └── ... (13 templates total)
│
├── workflows/                 # Orchestration sequences
│   ├── greenfield-planning.md          # NEW: Planning phase
│   ├── greenfield-development.md       # NEW: Parallel dev phase
│   ├── brownfield-planning.md          # NEW: Brownfield planning
│   ├── brownfield-development.md       # NEW: Brownfield parallel dev
│   ├── greenfield-fullstack.yaml       # Legacy YAML workflows
│   ├── greenfield-service.yaml
│   ├── greenfield-ui.yaml
│   ├── brownfield-fullstack.yaml
│   ├── brownfield-service.yaml
│   └── brownfield-ui.yaml
│
├── agent-teams/               # Pre-configured agent bundles
│   ├── team-fullstack.yaml
│   ├── team-no-ui.yaml
│   ├── team-ide-minimal.yaml
│   └── team-all.yaml
│
├── checklists/                # Quality gates and validation
│   ├── pm-checklist.md
│   ├── po-master-checklist.md
│   ├── architect-checklist.md
│   ├── story-dod-checklist.md
│   ├── story-draft-checklist.md
│   └── change-checklist.md
│
├── data/                      # Knowledge and reference files
│   ├── bmad-kb.md
│   ├── brainstorming-techniques.md
│   ├── elicitation-methods.md
│   ├── technical-preferences.md
│   ├── test-levels-framework.md
│   └── test-priorities-matrix.md
│
├── config.yaml                # Extension pack metadata
├── core-config.yaml           # Archon-specific configuration
└── README.md                  # User-facing documentation
```

### 2.2 Folder Purposes

| Folder         | Purpose                                                         | File Format            | When Used                                     |
| -------------- | --------------------------------------------------------------- | ---------------------- | --------------------------------------------- |
| `agents/`      | Define AI personas with behaviors, commands, and customizations | Markdown (YAML blocks) | Agent activation via `@agent-name`            |
| `tasks/`       | Executable workflows with step-by-step instructions             | Markdown (structured)  | Agent command execution (e.g., `*create-prd`) |
| `templates/`   | Document structure definitions and prompts                      | YAML                   | Referenced by tasks during document creation  |
| `workflows/`   | Multi-agent orchestration sequences                             | YAML                   | Orchestrator guides user through phases       |
| `agent-teams/` | Pre-configured agent bundles                                    | YAML                   | Team selection in orchestrator                |
| `checklists/`  | Quality gates and validation checklists                         | Markdown               | Manual or automated quality checks            |
| `data/`        | Reference knowledge and configuration data                      | Markdown/YAML          | Loaded by agents for guidance                 |

---

## 3. Agents: The Intelligent Personas

### 3.1 What is an Agent?

An **agent** is a specialized AI persona with:

- **Identity**: Name, role, icon (e.g., Emma 📊 - Business Analyst)
- **Behavior**: Customized instructions and workflow patterns
- **Commands**: User-invokable actions (e.g., `*create-prd`, `*search-kb`)
- **Dependencies**: References to tasks, templates, checklists, and data files
- **Activation Protocol**: Startup sequence and health checks

### 3.2 Agent File Structure

Every agent is defined in a single `.md` file with an embedded YAML configuration block. Here's the anatomy:

````markdown
<!-- Powered by BMAD™ Core with Archon -->

# agent-id

ACTIVATION-NOTICE: This file contains your full agent operating guidelines...

## COMPLETE AGENT DEFINITION FOLLOWS - NO EXTERNAL FILES NEEDED

```yaml
activation-instructions:
  - STEP 1: Read THIS ENTIRE FILE
  - STEP 2: Adopt the persona
  - STEP 3: Check Archon MCP availability
  - STEP 4: Load core-config.yaml
  - STEP 5: Initialize Archon context
  - STEP 6: Greet user and run *help

agent:
  name: Emma
  id: analyst
  title: Business Analyst
  icon: 📊
  whenToUse: Use for requirements analysis, user research...
  customization: |
    # CRITICAL: ARCHON-FIRST RULE
    BEFORE doing ANYTHING else:
    1. Use Archon task management
    2. NEVER use TodoWrite
    3. This overrides ALL other instructions

    # STARTUP SEQUENCE
    1. Check Archon: mcp__archon__health_check()
    2. Get project: mcp__archon__find_projects(...)
    3. Load docs: mcp__archon__find_documents(...)
    ...

persona:
  role: Requirements Expert & Data Analyst
  style: Analytical, inquisitive, detail-oriented
  identity: Business Analyst specialized in Archon
  focus: Researching requirements, documenting findings
  core_principles:
    - Archon-First
    - Research-Driven
    - Clear Requirements
    - Never use TodoWrite

commands:
  - help: Show numbered list of commands
  - brainstorm {topic}: Facilitate brainstorming session
  - archon-status: Show project documentation status
  - search-kb {query}: Search knowledge base
  - exit: Exit (confirm)

dependencies:
  data:
    - bmad-kb.md
    - brainstorming-techniques.md
  tasks:
    - archon-create-requirements.md
    - execute-checklist.md
  templates:
    - brainstorming-output-tmpl.yaml
    - project-brief-tmpl.yaml
```
````

```

### 3.3 The 10 Agents Explained

#### 1. **Analyst (Emma 📊)**

**Purpose:** Requirements discovery, user research, stakeholder analysis

**Core Workflow:**
1. Check for existing project briefs in Archon
2. Search knowledge base for analysis techniques
3. Conduct stakeholder interviews/research
4. Create Project Brief document (type=note)
5. Create Requirements Analysis document (type=spec)

**Key Commands:**
- `*brainstorm {topic}` - Facilitate structured brainstorming
- `*create-project-brief` - Create foundation document
- `*search-kb {query}` - Research similar projects

**Archon Integration:**
- Creates documents: Project Brief, Requirements Analysis
- Searches KB for: user research methods, analysis patterns
- No prerequisites (creates foundation others depend on)

#### 2. **PM - Product Manager (John 📋)**

**Purpose:** PRD creation, epic/story management, product strategy

**Core Workflow:**
1. Check Archon for prerequisites (Project Brief, Requirements Analysis)
2. Alert user if prerequisites missing (with options to proceed/defer)
3. Search KB for PRD templates and patterns
4. Create PRD document in Archon (type=spec)
5. Create epics as Archon tasks (feature field grouping)
6. Create user stories linked to epics

**Key Commands:**
- `*create-prd` - Create Product Requirements Document
- `*create-epic` - Create epic task
- `*create-story` - Create user story task
- `*list-tasks` - View all project tasks
- `*archon-status` - Show project status

**Archon Integration:**
- Reads: Project Brief, Requirements Analysis
- Creates: PRD (document_type="spec"), Epics, Stories (tasks)
- Searches KB for: PRD structure, product patterns

**Dependency Checking:**
```

Before creating PRD:
✓ Search for "project brief" documents
✓ Search for "requirements analysis" documents
✗ If missing → Alert user with 3 options: 1. Proceed anyway 2. Switch to @analyst to create prerequisites 3. Skip and handle separately

````

#### 3. **Architect (Sarah 🏗️)**

**Purpose:** System design, architecture documentation, ADRs, tech stack selection

**Core Workflow:**
1. Check Archon for prerequisites (PRD)
2. Read PRD and requirements documents
3. Search KB for architecture patterns and tech stacks
4. Create Architecture Document (type=design)
5. Create ADR (Architecture Decision Record) documents
6. Create Tech Stack and Coding Standards guides

**Key Commands:**
- `*create-architecture` - Create architecture document
- `*create-adr` - Create architecture decision record
- `*list-docs` - View architecture documents
- `*search-kb {query}` - Research patterns

**Archon Integration:**
- Reads: PRD, Requirements Analysis
- Creates: Architecture (type=design), ADRs, Tech Stack (type=guide)
- Searches KB for: architecture patterns, tech stacks

#### 4. **Dev - Developer (James 💻)**

**Purpose:** Task implementation, code development, research-driven coding

**Core Workflow:**
1. Get assigned tasks from Archon (`filter_by="assignee"`)
2. Retrieve next `todo` task
3. Mark task as `doing`
4. **Research Phase:**
   - Search KB for implementation patterns
   - Search code examples
   - Read PRD, architecture, coding standards
5. **Implementation:** Write code (stays in Git)
6. **Testing:** Run tests, log results to task
7. Mark task as `review`

**Key Commands:**
- `*my-tasks` - List assigned tasks
- `*next-task` - Get next todo task
- `*develop-task {id}` - Implement specific task
- `*run-tests` - Execute test suite

**Archon Integration:**
- Reads: User Story task, PRD, Architecture, Coding Standards
- Updates: Task progress, test results
- Searches KB for: code patterns, implementation examples
- Code/tests stay in **Git** (not Archon)

#### 5. **QA Engineer (Maria 🧪)**

**Purpose:** Code review, testing, bug tracking, quality gates

**Core Workflow:**
1. Get review queue (`filter_by="status", filter_value="review"`)
2. Read task acceptance criteria
3. Read PRD for expected behavior
4. Review implementation (code in Git)
5. Run tests
6. Mark as `done` or send back to `doing`

**Key Commands:**
- `*review-queue` - List tasks in review
- `*review-task {id}` - Review specific task
- `*create-bug` - Create bug task
- `*list-bugs` - View all bugs

**Archon Integration:**
- Reads: Task acceptance criteria, PRD
- Updates: Task status (review → done or review → doing)
- Creates: Bug reports (tasks with feature="bugs")

#### 6. **PO - Product Owner (Alex 🎯)**

**Purpose:** Backlog management, prioritization, sprint planning

**Core Workflow:**
1. View all project tasks (`find_tasks(project_id)`)
2. Prioritize using `task_order` field (0-100)
3. Assign tasks to team members
4. Plan sprints
5. Validate document consistency

**Key Commands:**
- `*view-backlog` - View all tasks
- `*prioritize` - Update task priorities
- `*sprint-plan` - Plan sprint

**Archon Integration:**
- Reads: All tasks, PRD, epics
- Updates: Task priorities (task_order), assignments
- Views: Project status, progress

#### 7. **Scrum Master (Bob 🏃)**

**Purpose:** Story creation, sprint coordination, retrospectives

**Key Commands:**
- `*draft` - Create story
- `*sprint-plan` - Plan sprint
- `*retrospective` - Run retrospective

#### 8. **UX Expert (Sally 🎨)**

**Purpose:** UI/UX design, frontend specs, design systems

**Key Commands:**
- `*create-ui-spec` - Create UI specification
- `*generate-ai-prompt` - Generate prompt for v0/Lovable

#### 9. **BMad Master**

**Purpose:** Meta-agent for method guidance and best practices

#### 10. **BMad Orchestrator**

**Purpose:** Workflow coordination, agent handoffs, progress tracking

#### 11. **Dev Team Lead - Team Orchestrator (Bob 🎯)** ⭐ NEW

**Purpose:** Parallel team orchestration, dependency management, coordinating multiple dev/QA subagents

**Core Workflow:**
1. Analyze task dependencies and build execution graph
2. Organize tasks into parallel execution waves
3. Spawn N developer subagents for each wave
4. Spawn N QA subagents for review phase
5. Aggregate results in SM context
6. Proceed to next wave when current wave completes

**Key Commands:**
- `*analyze-dependencies` - Parse dependencies and create execution plan
- `*execute-sprint` - Run full automated sprint (all waves)
- `*start-wave N` - Execute specific wave manually
- `*configure-capacity` - Set max parallel devs/QA (default: 3 devs, 2 QA)
- `*manual-mode` - Manual task assignment mode
- `*show-progress` - Display sprint progress summary

**Parallel Execution Features:**
- **Dependency Graph**: Automatically parse `Depends on: #TASK-ID` markers
- **Wave Execution**: Groups tasks into waves based on dependencies
- **Capacity Management**: Respects configurable dev/QA limits
- **Context Isolation**: Each dev/QA works in separate context
- **SM Aggregation**: All results flow back to SM's main context
- **Quality Gates**: No task marked "done" without QA approval

**Example Execution:**
```
*analyze-dependencies
→ Builds graph, shows execution plan with 4 waves

*configure-capacity
→ Set 5 devs, 3 QA reviewers

*execute-sprint
→ Wave 1: 5 devs work in parallel on independent tasks
→ Wave 1 QA: 3 QA reviewers test in parallel
→ Wave 2: 8 devs (batched: 5+3) work on tasks that depended on Wave 1
→ Wave 2 QA: 3 QA reviewers (batched: 3+3+2)
→ ... continues through Wave 4
→ Final sprint report with metrics
```

**Brownfield Support:**
- Enhanced QA for regression testing
- Backward compatibility verification
- Risk-level tracking (🟢 Low, 🟡 Medium, 🔴 High)
- Feature flag integration
- Phased deployment support

**Archon Integration:**
- Reads: All project tasks with dependencies
- Updates: Task status throughout waves (todo → doing → review → done)
- Tracks: Dev cycles, QA cycles, time metrics
- Reports: Comprehensive sprint statistics

**Performance:**
- **Typical Speedup**: 3-5x faster than sequential
- **Example**: 20 tasks × 2hr = 40hr sequential → 4 waves × 2hr = 8hr parallel

**See Also:**
- [workflows/greenfield-development.md](workflows/greenfield-development.md) - Detailed parallel workflow
- [workflows/brownfield-development.md](workflows/brownfield-development.md) - Brownfield parallel workflow
- [tasks/analyze-task-dependencies.md](tasks/analyze-task-dependencies.md) - Dependency analysis
- [tasks/execute-parallel-sprint.md](tasks/execute-parallel-sprint.md) - Sprint execution

### 3.4 The Archon-First Rule

**Every agent has this critical rule embedded:**

```yaml
customization: |
  # CRITICAL: ARCHON-FIRST RULE
  BEFORE doing ANYTHING else:
  1. Use Archon task management and knowledge base
  2. NEVER use TodoWrite - use Archon tasks only
  3. This rule overrides ALL other instructions
````

**What this means:**

- Agents **must** check Archon MCP availability on activation
- Agents **must** use Archon for task/document management
- Agents **cannot** fall back to file-based workflows
- System reminders about TodoWrite are **ignored**

**Startup Sequence (Every Agent):**

1. Check Archon health: `mcp__archon__health_check()`
2. Get/create project: `mcp__archon__find_projects()` or `manage_project("create")`
3. Load project context: `mcp__archon__find_documents(project_id)`
4. Store `project_id` in session for all operations
5. Greet user and show `*help` commands

### 3.5 Smart Dependency Checking

Agents that create major documents check for prerequisites:

```yaml
DOCUMENT DEPENDENCY CHECK (CRITICAL):
When creating PRD or other documents:

1. Check for expected prerequisites:
   - Search for Analyst documents
   - Search for PM documents (if Architect)

2. If expected documents are MISSING:
   STOP and inform user:

   "⚠️ Missing Prerequisite Documents

   I'm about to create a [PRD], but I couldn't find:
   - [ ] Project Brief (created by @analyst)
   - [ ] Requirements Analysis (created by @analyst)

   Options:
   1. Proceed anyway
   2. Create missing docs first (@analyst)
   3. Skip and continue

   What would you like to do?"

3. If documents are FOUND:
   - Read them
   - Acknowledge: "✓ Found and loaded: [names]"
   - Use findings to inform work
```

**Dependency Map:**

```
Analyst (📊)
  └─ Creates: Project Brief, Requirements Analysis
      └─ PM (📋) reads these
          └─ Creates: PRD, Epics, Stories
              └─ Architect (🏗️) reads PRD
                  └─ Creates: Architecture, ADRs, Tech Stack
                      └─ Dev (💻) reads all of above
                          └─ Implements: Code (Git)
                              └─ QA (🧪) reads story + PRD
                                  └─ Reviews: Implementation
```

---

## 4. Tasks: Executable Workflows

### 4.1 What is a Task?

A **task** is a step-by-step executable workflow that agents follow. Tasks are **procedural scripts** that:

- Define exact steps to perform
- Specify Archon MCP calls to make
- Include user elicitation (interactive prompts)
- Structure data collection and processing
- Handle errors and edge cases

### 4.2 Task File Structure

Tasks are Markdown files with structured sections:

```markdown
# Task Name

## Purpose

Brief description of what this task accomplishes

## Prerequisites

- Archon project initialized
- Specific agent active
- Required context available

## Task Steps

### 1. Step Name
```

Execute: mcp**archon**some_function(
param1=value1,
param2=value2
)

If condition:
Action 1
Else:
Action 2

Display: "Message to user"

```

### 2. Gather Information (elicit=true)

```

Ask user (structured elicitation):

1. "Question 1:"
   Store as: variable_name

2. "Question 2:"
   Store as: another_variable

```

## Output
- What gets created/updated
- What gets returned

## Notes
- Important considerations
- Edge cases
```

### 4.3 The 8 Archon-Specific Tasks

#### 1. **archon-init-project.md**

**Purpose:** Initialize or connect to Archon project

**Steps:**

1. Check Archon MCP availability
2. Ask user for project name
3. Search for existing project
4. If not found, create new project
5. Store `project_id` in session
6. Display project info

**Output:** `project_id` for all subsequent operations

---

#### 2. **archon-create-prd.md**

**Purpose:** Create Product Requirements Document in Archon

**Steps:**

**Step 1: Research PRD Templates**

```
Execute: mcp__archon__rag_search_knowledge_base(
  query="PRD template structure",
  match_count=3
)
Display findings
```

**Step 2: Check Existing PRDs**

```
Execute: mcp__archon__find_documents(
  project_id=project_id,
  document_type="spec"
)
If PRDs exist:
  Ask: "Create new or update existing?"
```

**Step 3: Gather PRD Information (elicit=true)**

```
Ask user:
1. "PRD Title:"
2. "Product Vision:"
3. "Target Users:"
4. "Problem Statement:"
5. "Key Features (comma-separated):"
6. "Success Metrics:"
7. "Out of Scope:"
8. "Timeline/Milestones:"
```

**Step 4: Search for Related Patterns**

```
For each feature:
  Execute: mcp__archon__rag_search_knowledge_base(
    query="{feature} best practices",
    match_count=2
  )
```

**Step 5: Build PRD Content Structure**

```json
{
  "version": "1.0",
  "sections": {
    "vision": "...",
    "target_users": "...",
    "problem_statement": "...",
    "key_features": [...],
    "success_metrics": "...",
    "out_of_scope": "...",
    "timeline": "...",
    "research_notes": [...]
  }
}
```

**Step 6: Create PRD Document**

```
Execute: mcp__archon__manage_document(
  action="create",
  project_id=project_id,
  title=prd_title,
  document_type="spec",
  content=content_object,
  tags=["prd", "requirements"],
  author="PM"
)
```

**Step 7: Create Epics from Features**

```
For each feature:
  Execute: mcp__archon__manage_task(
    action="create",
    project_id=project_id,
    title="Epic: {feature}",
    feature="{feature_slug}",
    status="todo",
    task_order=80
  )
```

**Output:** PRD document (type=spec), Epics (tasks)

---

#### 3. **archon-create-epic.md**

**Purpose:** Create epic as Archon task

**Steps:**

1. Elicit epic details (title, goal, features)
2. Create task with `feature` field
3. Set high `task_order` (epics typically 80-100)

---

#### 4. **archon-create-story.md**

**Purpose:** Create user story as Archon task

**Steps:**

1. List available epics
2. Let user select epic (or create new)
3. Elicit story details:
   - As a [user]
   - I want [action]
   - So that [benefit]
   - Acceptance criteria (numbered list)
4. Create task linked to epic via `feature` field
5. Set assignee and priority

**Output:** User story task with acceptance criteria

---

#### 5. **archon-develop-task.md**

**Purpose:** Implement task with research-driven workflow

**Steps:**

**Step 1: Retrieve Task**

```
Execute: mcp__archon__find_tasks(task_id=task_id)
Display task details
```

**Step 2: Mark as Doing**

```
Execute: mcp__archon__manage_task(
  action="update",
  task_id=task_id,
  status="doing"
)
```

**Step 3: Research Phase**

```
Ask: "Key technologies (2-5 keywords):"

Execute: mcp__archon__rag_search_knowledge_base(
  query=tech_keywords,
  match_count=5
)

Execute: mcp__archon__rag_search_code_examples(
  query=tech_keywords,
  match_count=3
)

Execute: mcp__archon__find_documents(
  project_id=project_id,
  document_type="spec"  # PRD
)

Execute: mcp__archon__find_documents(
  project_id=project_id,
  document_type="design"  # Architecture
)
```

**Step 4: Implementation**

```
For each acceptance criterion:
  Implement using Read/Write/Edit tools (code → Git)
  Update task with progress:
    mcp__archon__manage_task(
      action="update",
      task_id=task_id,
      description="...PROGRESS LOG...\n[timestamp] Implemented: {step}"
    )
```

**Step 5: Testing**

```
Run tests (code in Git)
Update task with test results
```

**Step 6: Validate Acceptance Criteria**

```
For each criterion:
  Ask user: "Criterion met?"
```

**Step 7: Mark for Review**

```
Execute: mcp__archon__manage_task(
  action="update",
  task_id=task_id,
  status="review"
)
```

**Output:** Implemented code (Git), task status=review, progress logged

---

#### 6. **archon-create-architecture.md**

**Purpose:** Create architecture document in Archon

**Similar to create-prd but for architecture:**

1. Research architecture patterns
2. Read PRD
3. Elicit architecture details (tech stack, services, data flow)
4. Search KB for patterns
5. Create document (type=design)

---

#### 7. **create-doc.md**

**Purpose:** Generic document creation task

**Steps:**

1. Ask for document type, title, template
2. Load template if provided
3. Elicit content based on template
4. Create in Archon with appropriate type

---

#### 8. **execute-checklist.md**

**Purpose:** Run validation checklists

**Steps:**

1. Load checklist file
2. Present each item to user
3. Collect yes/no responses
4. Generate report
5. Return unchecked items

---

### 4.4 Core Tasks (21 from bmad-core)

These tasks work identically to bmad-core but integrate with Archon:

- `advanced-elicitation.md` - Interactive information gathering
- `apply-qa-fixes.md` - Apply fixes from QA review
- `brownfield-create-epic.md` - Create epic for existing codebase
- `brownfield-create-story.md` - Create story for enhancement
- `create-next-story.md` - Create next story in sequence
- `correct-course.md` - Course correction workflow
- `document-project.md` - Generate project documentation
- `facilitate-brainstorming-session.md` - Structured brainstorming
- `generate-ai-frontend-prompt.md` - Create prompts for v0/Lovable
- `index-docs.md` - Index documentation
- `kb-mode-interaction.md` - Knowledge base interaction
- `nfr-assess.md` - Non-functional requirements assessment
- `qa-gate.md` - Quality gate validation
- `review-story.md` - Story review workflow
- `risk-profile.md` - Risk assessment
- `shard-doc.md` - Break documents into shards
- `test-design.md` - Test design workflow
- `trace-requirements.md` - Requirement tracing
- `validate-next-story.md` - Story validation

### 4.5 Task Invocation

Tasks are invoked via agent commands:

```
User types:      @pm
Agent activates: (PM agent)

User types:      *create-prd
Agent executes:  tasks/archon-create-prd.md

Task runs:       Step-by-step workflow
                 Elicits information
                 Calls Archon MCP functions
                 Creates documents/tasks
                 Returns results
```

---

## 5. Templates: Document Structure Definitions

### 5.1 What is a Template?

A **template** defines the structure and content of documents. Templates are **YAML files** that specify:

- Sections and subsections
- Content types (paragraphs, lists, tables)
- Elicitation prompts (interactive questions)
- Output format (markdown, JSON)
- Validation rules

### 5.2 Template Structure

```yaml
template:
  id: prd-template-v2
  name: Product Requirements Document
  version: 2.0
  output:
    format: markdown
    filename: docs/prd.md
    title: '{{project_name}} PRD'

workflow:
  mode: interactive
  elicitation: advanced-elicitation

sections:
  - id: goals-context
    title: Goals and Background Context
    instruction: |
      Ask if Project Brief exists.
      If NO: Recommend creating one first.
      If YES: Use it to populate this section.
    sections:
      - id: goals
        title: Goals
        type: bullet-list
        instruction: List desired outcomes

      - id: background
        title: Background Context
        type: paragraphs
        instruction: 1-2 paragraphs on context

      - id: changelog
        title: Change Log
        type: table
        columns: [Date, Version, Description, Author]

  - id: requirements
    title: Requirements
    elicit: true
    sections:
      - id: functional
        title: Functional
        type: numbered-list
        prefix: FR
        instruction: Each requirement starts with FR
        examples:
          - 'FR6: The system detects duplicates using AI'

      - id: non-functional
        title: Non Functional
        type: numbered-list
        prefix: NFR
        examples:
          - 'NFR1: Stay within AWS free tier'

  - id: epic-list
    title: Epic List
    instruction: |
      Present high-level epics for approval.
      CRITICAL: Epics must be sequential.
      Epic 1 establishes foundation.
    elicit: true
    examples:
      - 'Epic 1: Foundation & Core Infrastructure'
      - 'Epic 2: Core Business Entities'

  - id: epic-details
    title: Epic {{epic_number}} {{epic_title}}
    repeatable: true
    instruction: |
      For each epic, create stories.
      Stories must be sequential.
      Each story is a vertical slice.
    sections:
      - id: story
        title: Story {{epic_number}}.{{story_number}}
        repeatable: true
        template: |
          As a {{user_type}},
          I want {{action}},
          so that {{benefit}}.
        sections:
          - id: acceptance-criteria
            title: Acceptance Criteria
            type: numbered-list
            repeatable: true
```

### 5.3 The 13 Templates

#### 1. **prd-tmpl.yaml**

- Product Requirements Document
- Sections: Goals, Requirements (FR/NFR), UI Goals, Technical Assumptions, Epics, Stories
- Interactive elicitation for each section
- Supports repeatable epics and stories

#### 2. **architecture-tmpl.yaml**

- Generic architecture document
- Sections: Overview, Components, Data Flow, Tech Stack

#### 3. **fullstack-architecture-tmpl.yaml**

- Full-stack specific architecture
- Sections: Frontend, Backend, Database, Infrastructure, APIs

#### 4. **front-end-spec-tmpl.yaml**

- UI/UX specification
- Sections: UX Vision, Components, Screens, Accessibility, Branding

#### 5. **front-end-architecture-tmpl.yaml**

- Frontend-specific architecture
- Sections: Framework, State Management, Routing, Components

#### 6. **brownfield-architecture-tmpl.yaml**

- Architecture for existing codebases
- Sections: Current State, Proposed Changes, Migration Plan

#### 7. **brownfield-prd-tmpl.yaml**

- PRD for enhancements to existing products
- Sections: Current State, Enhancement Goals, Stories

#### 8. **project-brief-tmpl.yaml**

- Initial project brief
- Sections: Problem, Users, Goals, Constraints, MVP Scope

#### 9. **story-tmpl.yaml**

- User story template
- Sections: Story, Acceptance Criteria, Technical Notes

#### 10. **brainstorming-output-tmpl.yaml**

- Brainstorming session output
- Sections: Ideas, Decisions, Next Steps

#### 11. **market-research-tmpl.yaml**

- Market research document
- Sections: Market Size, Competitors, Opportunities

#### 12. **competitor-analysis-tmpl.yaml**

- Competitor analysis
- Sections: Competitors, Features, Strengths/Weaknesses

#### 13. **qa-gate-tmpl.yaml**

- Quality gate checklist
- Sections: Criteria, Results, Issues

### 5.4 Template Usage in Tasks

Tasks reference templates to structure documents:

```markdown
# In archon-create-prd.md task

### Step 3: Gather PRD Information

Load template: templates/prd-tmpl.yaml

For each section in template:
If section.elicit == true:
Present section to user
Elicit information
Populate section
Else:
Auto-populate from context

Build content object from populated sections
```

---

## 6. Workflows: Orchestration Sequences

### 6.1 What is a Workflow?

A **workflow** is a multi-agent orchestration sequence that guides users through project phases. Workflows:

- Define agent handoff sequences
- Specify what each agent creates
- List prerequisites for each step
- Include decision points and conditions
- Provide progress tracking

### 6.2 Workflow Structure

````yaml
workflow:
  id: greenfield-fullstack
  name: Greenfield Full-Stack Application Development
  description: Agent workflow for building full-stack apps
  type: greenfield
  project_types:
    - web-app
    - saas
    - mvp

  sequence:
    - agent: analyst
      creates: project-brief.md
      optional_steps:
        - brainstorming_session
        - market_research
      notes: 'Can do brainstorming first...'

    - agent: pm
      creates: prd.md
      requires: project-brief.md
      notes: 'Creates PRD from project brief'

    - agent: ux-expert
      creates: front-end-spec.md
      requires: prd.md
      optional_steps:
        - user_research_prompt

    - agent: architect
      creates: fullstack-architecture.md
      requires:
        - prd.md
        - front-end-spec.md

    - agent: po
      validates: all_artifacts
      uses: po-master-checklist

    - agent: po
      action: shard_documents
      creates: sharded_docs
      requires: all_artifacts_in_project

    - agent: sm
      action: create_story
      creates: story.md
      repeats: for_each_epic

    - agent: dev
      action: implement_story
      creates: implementation_files
      requires: story.md

    - agent: qa
      action: review_implementation
      optional: true

  flow_diagram: |
    ```mermaid
    graph TD
      A[analyst: project-brief] --> B[pm: prd]
      B --> C[ux-expert: ui-spec]
      C --> D[architect: architecture]
      D --> E[po: validate]
      E --> F[po: shard docs]
      F --> G[sm: create story]
      G --> H[dev: implement]
      H --> I[qa: review]
      I --> G
    ```

  decision_guidance:
    when_to_use:
      - Building production-ready applications
      - Complex feature requirements
      - Long-term maintenance expected

  handoff_prompts:
    analyst_to_pm: 'Project brief complete. Create PRD.'
    pm_to_ux: 'PRD ready. Create UI/UX spec.'
    ux_to_architect: 'UI spec complete. Create architecture.'
````

### 6.3 The 6 Workflows

#### 1. **greenfield-fullstack.yaml**

**Purpose:** Build full-stack applications from scratch

**Sequence:**

1. Analyst → Project Brief
2. PM → PRD
3. UX Expert → UI/UX Spec
4. (Optional) UX Expert → v0 Prompt for AI UI generation
5. Architect → Architecture
6. PM → Update PRD (if architect suggests changes)
7. PO → Validate all artifacts
8. PO → Shard documents
9. SM → Create story (repeat for each epic)
10. Dev → Implement story
11. QA → Review implementation (optional)
12. Repeat 9-11 for all stories

**Decision Points:**

- Generate AI UI with v0/Lovable? (Yes/No)
- Review draft stories before dev? (Yes/No)
- QA review each story? (Yes/No)

---

#### 2. **greenfield-service.yaml**

**Purpose:** Build backend services/APIs (no UI)

**Sequence:**

1. Analyst → Project Brief
2. PM → PRD (backend-focused)
3. Architect → Service Architecture
4. PO → Validate
5. PO → Shard
6. SM → Create stories
7. Dev → Implement
8. QA → Review

**Difference from fullstack:** No UX Expert step

---

#### 3. **greenfield-ui.yaml**

**Purpose:** Build frontend-only applications

**Sequence:**

1. Analyst → Project Brief
2. PM → PRD (UI-focused)
3. UX Expert → UI/UX Spec
4. UX Expert → v0 Prompt (optional)
5. Architect → Frontend Architecture
6. PO → Validate
7. SM → Create stories
8. Dev → Implement
9. QA → Review

**Difference:** No backend architecture

---

#### 4. **brownfield-fullstack.yaml**

**Purpose:** Enhance existing full-stack applications

**Sequence:**

1. Analyst → Enhancement Analysis
2. PM → Enhancement PRD
3. Architect → Update Architecture
4. PO → Validate
5. SM → Create stories
6. Dev → Implement
7. QA → Review

**Difference:** Starts with existing codebase analysis

---

#### 5. **brownfield-service.yaml**

**Purpose:** Enhance existing backend services

---

#### 6. **brownfield-ui.yaml**

**Purpose:** Enhance existing frontend applications

---

### 6.4 Workflow Execution

The **BMad Orchestrator** agent guides users through workflows:

1. User activates orchestrator: `@bmad-orchestrator`
2. Orchestrator asks: "Greenfield or Brownfield?"
3. Orchestrator asks: "Fullstack, Service, or UI?"
4. Orchestrator loads appropriate workflow
5. Orchestrator displays workflow sequence
6. For each step in workflow:
   - Show current step
   - Show what agent will create
   - Show prerequisites
   - Prompt user to activate agent
   - Wait for completion
   - Move to next step
7. Track progress throughout

---

## 7. Agent Teams: Pre-configured Bundles

### 7.1 What is an Agent Team?

An **agent team** is a pre-configured bundle of agents that work together on specific project types. Teams:

- Group related agents
- Define applicable workflows
- Simplify agent selection
- Ensure consistent coverage

### 7.2 Team Structure

```yaml
bundle:
  name: Team Fullstack
  icon: 🚀
  description: Team for full-stack development
agents:
  - bmad-orchestrator
  - analyst
  - pm
  - ux-expert
  - architect
  - po
workflows:
  - brownfield-fullstack.yaml
  - brownfield-service.yaml
  - brownfield-ui.yaml
  - greenfield-fullstack.yaml
  - greenfield-service.yaml
  - greenfield-ui.yaml
```

### 7.3 The 4 Teams

#### 1. **team-fullstack.yaml**

**Agents:** Orchestrator, Analyst, PM, UX Expert, Architect, PO

**Workflows:** All 6 workflows (greenfield + brownfield × fullstack/service/ui)

**Use Case:** Complete full-stack development with planning and implementation

---

#### 2. **team-no-ui.yaml**

**Agents:** Orchestrator, Analyst, PM, Architect, PO

**Workflows:** Service workflows only

**Use Case:** Backend-only, API, microservices projects

---

#### 3. **team-ide-minimal.yaml**

**Agents:** SM (Scrum Master), Dev, QA

**Workflows:** None (assumes planning already done)

**Use Case:** IDE-based development after planning phase complete

---

#### 4. **team-all.yaml**

**Agents:** All 10 agents

**Workflows:** All 6 workflows

**Use Case:** Maximum flexibility, all project types

---

### 7.4 Team Selection

Teams are selected via orchestrator:

```
@bmad-orchestrator

"Which team do you want?
1. Team Fullstack (🚀) - Full-stack development
2. Team No UI - Backend/API only
3. Team IDE Minimal - Implementation only
4. Team All - Maximum flexibility"

User selects: 1

Orchestrator activates: Team Fullstack agents
Displays: Available workflows
```

---

## 8. Core Config: System Configuration

### 8.1 core-config.yaml

The `core-config.yaml` file configures Archon integration:

```yaml
archon:
  enabled: true
  requireMCP: true
  defaultProject: null # Set during agent activation

  knowledgeBase:
    shared: true # Shared KB across projects
    searchOnly: true # Agents can only search, not write

  taskManagement:
    defaultAssignee: 'User'
    taskGranularity: 'implementation'
    statusFlow: ['todo', 'doing', 'review', 'done']
    autoCreateProject: true

  documentTypes:
    prd: 'spec'
    architecture: 'design'
    userStory: 'note'
    epic: 'note'
    technicalDoc: 'guide'
```

### 8.2 Configuration Sections

#### archon.enabled

- **Type:** Boolean
- **Purpose:** Enable/disable Archon integration
- **Default:** true

#### archon.requireMCP

- **Type:** Boolean
- **Purpose:** Require Archon MCP to be available (HALT if not)
- **Default:** true

#### archon.knowledgeBase.shared

- **Type:** Boolean
- **Purpose:** Share knowledge base across all projects
- **Default:** true
- **Rationale:** Collective learning, pattern reuse

#### archon.knowledgeBase.searchOnly

- **Type:** Boolean
- **Purpose:** Agents can only search KB, not write to it
- **Default:** true
- **Rationale:** User manages KB sources manually via Archon UI

#### archon.taskManagement.defaultAssignee

- **Type:** String
- **Purpose:** Default assignee for new tasks
- **Default:** "User"

#### archon.taskManagement.taskGranularity

- **Type:** String
- **Options:** 'implementation', 'feature'
- **Purpose:** How granular tasks should be
- **Default:** 'implementation'

#### archon.taskManagement.statusFlow

- **Type:** Array
- **Purpose:** Define task status progression
- **Default:** `['todo', 'doing', 'review', 'done']`

#### archon.documentTypes

- **Type:** Object
- **Purpose:** Map document purposes to Archon types
- **Mapping:**
  - PRD → `spec`
  - Architecture → `design`
  - User Story → `note`
  - Epic → `note`
  - Technical Doc → `guide`

---

## 9. Data Files: Knowledge & Reference

### 9.1 The 6 Data Files

#### 1. **bmad-kb.md**

**Purpose:** BMAD Method knowledge base and reference guide

**Contains:**

- BMAD Method principles
- Workflow patterns
- Best practices
- Common pitfalls
- IDE development guidance

**Used by:** All agents for method guidance

---

#### 2. **brainstorming-techniques.md**

**Purpose:** Structured brainstorming methodologies

**Contains:**

- Brainstorming techniques (e.g., 6-3-5, SCAMPER, Mind Mapping)
- Facilitation tips
- Output structures

**Used by:** Analyst agent (`*brainstorm` command)

---

#### 3. **elicitation-methods.md**

**Purpose:** Advanced information elicitation techniques

**Contains:**

- Question types (open-ended, closed, probing)
- Elicitation patterns
- User research methods

**Used by:** Analyst, PM agents (interactive workflows)

---

#### 4. **technical-preferences.md**

**Purpose:** Default technical stack preferences

**Contains:**

- Language preferences (TypeScript, Python, etc.)
- Framework preferences (React, FastAPI, etc.)
- Deployment targets (AWS, Vercel, etc.)
- Testing frameworks (Jest, pytest, etc.)

**Used by:** PM agent (PRD creation), Architect agent

**Format:**

```yaml
languages:
  backend: Python
  frontend: TypeScript

frameworks:
  backend: FastAPI
  frontend: React

database:
  primary: PostgreSQL
  cache: Redis
```

---

#### 5. **test-levels-framework.md**

**Purpose:** Testing pyramid and test level definitions

**Contains:**

- Unit testing guidance
- Integration testing patterns
- E2E testing strategies
- Manual testing considerations

**Used by:** Architect (test design), QA agent

---

#### 6. **test-priorities-matrix.md**

**Purpose:** Test prioritization framework

**Contains:**

- Risk-based testing matrix
- Critical path identification
- Coverage targets

**Used by:** QA agent, Architect

---

## 10. How Everything Works Together

### 10.1 The Complete Integration

Here's how all components interact in a typical workflow:

```
┌─────────────────────────────────────────────────────────────┐
│                    USER INTERACTION                          │
│  "I want to build a user authentication system"             │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              AGENT ACTIVATION (@analyst)                     │
│  1. Reads: agents/analyst.md                                │
│  2. Executes: activation-instructions                       │
│  3. Checks: Archon MCP health                               │
│  4. Loads: core-config.yaml                                 │
│  5. Initializes: Archon project context                     │
│  6. Greets user & shows *help                               │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│            USER COMMAND (*brainstorm)                        │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              TASK EXECUTION                                  │
│  1. Agent resolves command: *brainstorm                     │
│  2. Loads: tasks/facilitate-brainstorming-session.md        │
│  3. Loads: templates/brainstorming-output-tmpl.yaml         │
│  4. Loads: data/brainstorming-techniques.md                 │
│  5. Executes task steps:                                    │
│     - Elicit topic                                          │
│     - Present techniques                                    │
│     - Facilitate session                                    │
│     - Capture ideas                                         │
│  6. Creates document in Archon:                             │
│     mcp__archon__manage_document(                           │
│       action="create",                                      │
│       title="Brainstorming: Auth System",                  │
│       document_type="note",                                 │
│       content={ideas: [...], decisions: [...]}             │
│     )                                                       │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│           ARCHON MCP SERVER                                  │
│  1. Receives: create document request                       │
│  2. Stores: Document in project                             │
│  3. Indexes: Content for RAG search                         │
│  4. Returns: document_id                                    │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              AGENT CONTINUES                                 │
│  "Created brainstorming document! Next, create project      │
│   brief with *create-project-brief"                         │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│         USER SWITCHES AGENTS (@pm)                           │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              PM AGENT ACTIVATION                             │
│  1. Checks Archon MCP                                       │
│  2. Loads project context                                   │
│  3. Checks for prerequisites:                               │
│     mcp__archon__find_documents(                            │
│       project_id=project_id,                                │
│       query="project brief"                                 │
│     )                                                       │
│  4. Finds analyst's documents ✓                             │
│  5. Reads them for context                                  │
│  6. Shows *help                                             │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│         USER COMMAND (*create-prd)                           │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              TASK EXECUTION (PRD Creation)                   │
│  1. Loads: tasks/archon-create-prd.md                       │
│  2. Loads: templates/prd-tmpl.yaml                          │
│  3. Searches KB:                                            │
│     mcp__archon__rag_search_knowledge_base(                 │
│       query="PRD template structure"                        │
│     )                                                       │
│  4. Elicits PRD information (interactive)                   │
│  5. For each feature, searches:                             │
│     mcp__archon__rag_search_knowledge_base(                 │
│       query="{feature} best practices"                      │
│     )                                                       │
│  6. Creates PRD document                                    │
│  7. Creates epic tasks                                      │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│           ARCHON STORAGE                                     │
│  Documents:                                                  │
│    - Brainstorming Session (note)                           │
│    - Project Brief (note)                                   │
│    - Requirements Analysis (spec)                           │
│    - PRD (spec)                                             │
│  Tasks:                                                     │
│    - Epic: Login (feature=login, status=todo)              │
│    - Epic: Signup (feature=signup, status=todo)            │
│    - Epic: Password Reset (feature=password, status=todo)  │
└─────────────────────────────────────────────────────────────┘
```

### 10.2 Data Flow Diagram

```
┌──────────────┐
│     USER     │
└──────┬───────┘
       │ activates
       ▼
┌──────────────┐        ┌────────────────┐
│    AGENT     │─reads─→│  agents/*.md   │
└──────┬───────┘        └────────────────┘
       │
       │ executes command
       ▼
┌──────────────┐        ┌────────────────┐
│     TASK     │─loads─→│   tasks/*.md   │
└──────┬───────┘        └────────────────┘
       │                        │
       │                        └─loads─→┌────────────────┐
       │                                  │ templates/*.yaml│
       │                                  └────────────────┘
       │                                  │ data/*.md      │
       │                                  └────────────────┘
       │
       ▼
┌──────────────────────────────────────┐
│         ARCHON MCP SERVER            │
│  ┌─────────────┐  ┌─────────────┐  │
│  │   Tasks     │  │  Documents  │  │
│  │   Projects  │  │  Knowledge  │  │
│  └─────────────┘  └─────────────┘  │
└──────────────────────────────────────┘
       │
       │ stores/retrieves
       ▼
┌──────────────────────────────────────┐
│      ARCHON DATABASE                 │
│  • Projects                          │
│  • Tasks (epics/stories/bugs)        │
│  • Documents (PRD/arch/specs)        │
│  • Knowledge Base (indexed)          │
│  • Version History                   │
└──────────────────────────────────────┘
       │
       │ searches (RAG)
       ▼
┌──────────────────────────────────────┐
│   KNOWLEDGE BASE RESULTS             │
│  • Relevant documents                │
│  • Code examples                     │
│  • Best practices                    │
└──────────────────────────────────────┘
```

### 10.3 Component Relationships

```
WORKFLOWS orchestrate → AGENTS
AGENTS execute → TASKS
TASKS use → TEMPLATES
TASKS load → DATA FILES
TASKS call → ARCHON MCP
AGENTS check → CORE CONFIG
AGENT TEAMS bundle → AGENTS + WORKFLOWS
CHECKLISTS validate → DOCUMENTS
```

---

## 11. Integration with Archon MCP

### 11.1 MCP Functions Used

#### Project Management

```python
# Get or create project
mcp__archon__find_projects(query="ProjectName")
mcp__archon__manage_project("create", title="...", description="...")
```

#### Task Management

```python
# Create task
mcp__archon__manage_task(
    action="create",
    project_id="proj-123",
    title="User can login",
    description="As a user, I want to login...",
    feature="login",
    status="todo",
    task_order=90,
    assignee="James"
)

# Update task
mcp__archon__manage_task(
    action="update",
    task_id="task-456",
    status="doing"
)

# Find tasks
mcp__archon__find_tasks(
    project_id="proj-123",
    filter_by="status",
    filter_value="review"
)
```

#### Document Management

```python
# Create document
mcp__archon__manage_document(
    action="create",
    project_id="proj-123",
    title="User Auth PRD v1",
    document_type="spec",
    content={
        "version": "1.0",
        "sections": {...}
    },
    tags=["prd", "auth"],
    author="PM"
)

# Find documents
mcp__archon__find_documents(
    project_id="proj-123",
    document_type="spec"
)

# Get specific document
mcp__archon__find_documents(
    project_id="proj-123",
    document_id="doc-789"
)
```

#### Knowledge Base

```python
# Get available sources
mcp__archon__rag_get_available_sources()

# Search knowledge base
mcp__archon__rag_search_knowledge_base(
    query="JWT authentication",
    match_count=5
)

# Search with source filter
mcp__archon__rag_search_knowledge_base(
    query="vector search",
    source_id="src_abc123",
    match_count=3
)

# Search code examples
mcp__archon__rag_search_code_examples(
    query="Express middleware",
    match_count=3
)
```

### 11.2 Document Type Mapping

| BMAD Document         | Archon Type | Purpose               |
| --------------------- | ----------- | --------------------- |
| Project Brief         | `note`      | Initial analysis      |
| Requirements Analysis | `spec`      | Detailed requirements |
| PRD                   | `spec`      | Product requirements  |
| Epic                  | `task`      | High-level feature    |
| User Story            | `task`      | Implementation task   |
| Architecture          | `design`    | System design         |
| ADR                   | `design`    | Design decisions      |
| Tech Stack            | `guide`     | Technology guide      |
| Coding Standards      | `guide`     | Code standards        |
| Meeting Notes         | `note`      | Notes and discussions |

### 11.3 Task Status Flow

```
┌──────┐    mark as doing    ┌───────┐
│ todo │──────────────────────→│ doing │
└──────┘                       └───┬───┘
                                   │
                        implement  │  mark as review
                                   │
                                   ▼
                              ┌────────┐
                              │ review │
                              └───┬────┘
                                  │
                   ┌──────────────┼──────────────┐
                   │              │              │
            QA approves    QA finds issues   QA rejects
                   │              │              │
                   ▼              ▼              ▼
              ┌──────┐      ┌────────┐     ┌───────┐
              │ done │      │ doing  │     │ todo  │
              └──────┘      └────────┘     └───────┘
```

**Rules:**

- ONLY ONE task in `doing` status per person
- NEVER skip statuses
- Use `review` for QA handoff
- Mark `done` only after validation

---

## 12. The Complete Flow: Greenfield Example

Let's trace a complete greenfield full-stack project from start to finish.

### 12.1 Project: E-Commerce User Authentication

**Goal:** Build user authentication system for e-commerce platform

### 12.2 Phase 1: Analysis (Analyst Agent)

```
User: @analyst
```

**Agent Activation:**

1. Reads `agents/analyst.md`
2. Checks Archon MCP: `mcp__archon__health_check()` ✓
3. Asks: "Project name?"
   User: "E-Commerce Auth System"
4. Creates project: `mcp__archon__manage_project("create", title="E-Commerce Auth System")`
5. Stores `project_id = "proj-ecom-123"`
6. Greets: "Hi! I'm Emma, your Business Analyst. Type \*help for commands."

```
User: *brainstorm authentication requirements
```

**Task Execution:**

1. Loads `tasks/facilitate-brainstorming-session.md`
2. Loads `templates/brainstorming-output-tmpl.yaml`
3. Loads `data/brainstorming-techniques.md`
4. Facilitates session (techniques: 6-3-5, SCAMPER)
5. Captures ideas:
   - Login with email/password
   - Signup with email verification
   - Password reset via email
   - JWT token-based sessions
   - Rate limiting for security
6. Creates document:
   ```python
   mcp__archon__manage_document(
       action="create",
       project_id="proj-ecom-123",
       title="Auth System Brainstorming",
       document_type="note",
       content={
           "ideas": [...],
           "decisions": [...],
           "next_steps": [...]
       }
   )
   ```

```
User: *create-project-brief
```

**Task Execution:**

1. Loads `tasks/create-doc.md`
2. Loads `templates/project-brief-tmpl.yaml`
3. Elicits:
   - Problem: "E-commerce needs secure user management"
   - Target Users: "Online shoppers, ages 18-65"
   - Key Stakeholders: "CTO, Product Lead, Customers"
   - Success Criteria: "Secure, fast (<2s), GDPR-compliant"
   - Constraints: "Integrate with existing PostgreSQL DB"
   - MVP Scope: "Login, Signup, Password Reset"
4. Creates document:
   ```python
   mcp__archon__manage_document(
       action="create",
       title="E-Commerce Auth - Project Brief",
       document_type="note",
       content={...}
   )
   ```

**Analyst Output:**

- ✓ Brainstorming document
- ✓ Project Brief
- ✓ Requirements Analysis

---

### 12.3 Phase 2: Product Definition (PM Agent)

```
User: @pm
```

**Agent Activation:**

1. Checks Archon MCP ✓
2. Loads project: `mcp__archon__find_projects(query="E-Commerce Auth")`
3. **Checks prerequisites:**

   ```python
   mcp__archon__find_documents(
       project_id="proj-ecom-123",
       query="project brief"
   )
   # Returns: "E-Commerce Auth - Project Brief" ✓

   mcp__archon__find_documents(
       project_id="proj-ecom-123",
       query="requirements"
   )
   # Returns: "Requirements Analysis" ✓
   ```

4. Reads documents
5. Acknowledges: "✓ Found and loaded: Project Brief, Requirements Analysis"
6. Shows \*help

```
User: *create-prd
```

**Task Execution (archon-create-prd.md):**

**Step 1: Research**

```python
mcp__archon__rag_search_knowledge_base(
    query="PRD template structure",
    match_count=3
)
# Returns: Best practices, examples, templates
```

**Step 2: Check Existing PRDs**

```python
mcp__archon__find_documents(
    project_id="proj-ecom-123",
    document_type="spec"
)
# Returns: None (first PRD)
```

**Step 3: Elicit PRD Information**

```
1. "PRD Title:" → "User Authentication System PRD v1"
2. "Product Vision:" → "Secure, scalable auth for e-commerce"
3. "Target Users:" → "Online shoppers"
4. "Problem Statement:" → "Need secure login/signup system"
5. "Key Features:" → "Login, Signup, Password Reset, JWT Tokens"
6. "Success Metrics:" → "99.9% uptime, <2s auth time"
7. "Out of Scope:" → "OAuth, SSO, MFA (future)"
```

**Step 4: Search Patterns**

```python
For feature in ["Login", "Signup", "Password Reset", "JWT"]:
    mcp__archon__rag_search_knowledge_base(
        query=f"{feature} best practices",
        match_count=2
    )
# Returns: Security patterns, code examples, anti-patterns
```

**Step 5: Build Content**

```json
{
  "version": "1.0",
  "sections": {
    "vision": "Secure, scalable auth...",
    "target_users": "Online shoppers",
    "problem_statement": "Need secure login...",
    "key_features": [
      "Login with email/password",
      "Signup with email verification",
      "Password reset via email",
      "JWT token sessions"
    ],
    "success_metrics": "99.9% uptime, <2s auth",
    "out_of_scope": "OAuth, SSO, MFA",
    "research_notes": [...]
  }
}
```

**Step 6: Create PRD**

```python
mcp__archon__manage_document(
    action="create",
    project_id="proj-ecom-123",
    title="User Authentication System PRD v1",
    document_type="spec",
    content=content_object,
    tags=["prd", "auth"],
    author="PM"
)
# Returns: document_id = "doc-prd-456"
```

**Step 7: Create Epics**

```python
for feature in features:
    mcp__archon__manage_task(
        action="create",
        project_id="proj-ecom-123",
        title=f"Epic: {feature}",
        description=f"Implement {feature} as per PRD",
        feature=feature.lower(),
        status="todo",
        task_order=80
    )

# Creates:
# - Epic: Login (feature=login, task_order=80)
# - Epic: Signup (feature=signup, task_order=80)
# - Epic: Password Reset (feature=password, task_order=80)
# - Epic: JWT Tokens (feature=jwt, task_order=80)
```

**PM Output:**

- ✓ PRD (document)
- ✓ 4 Epics (tasks)

---

### 12.4 Phase 3: Architecture (Architect Agent)

```
User: @architect
```

**Agent Activation:**

1. Checks prerequisites
2. Finds PRD ✓
3. Reads PRD
4. Shows \*help

```
User: *create-architecture
```

**Task Execution:**

1. Searches KB:
   ```python
   mcp__archon__rag_search_knowledge_base(
       query="JWT authentication architecture",
       match_count=5
   )
   mcp__archon__rag_search_code_examples(
       query="Express JWT middleware",
       match_count=3
   )
   ```
2. Elicits architecture details:
   - Backend: Node.js + Express
   - Database: PostgreSQL
   - Authentication: JWT + bcrypt
   - Session Management: Redis
   - API Design: REST
3. Creates architecture document:
   ```python
   mcp__archon__manage_document(
       action="create",
       title="User Auth Architecture",
       document_type="design",
       content={
           "tech_stack": {...},
           "components": {...},
           "data_flow": {...},
           "security": {...}
       }
   )
   ```
4. Creates ADRs, Tech Stack, Coding Standards docs

**Architect Output:**

- ✓ Architecture Document
- ✓ ADRs
- ✓ Tech Stack Guide
- ✓ Coding Standards

---

### 12.5 Phase 4: Story Creation (PM Agent)

```
User: @pm
User: *create-story
```

**Task Execution:**

1. Lists epics:
   ```python
   mcp__archon__find_tasks(
       project_id="proj-ecom-123",
       filter_by="feature",
       filter_value="login"
   )
   # Shows: Epic: Login
   ```
2. User selects: "Login"
3. Elicits story:
   ```
   Title: "User can login with email and password"
   As a: "registered user"
   I want: "login with email/password"
   So that: "I can access my account"
   Acceptance Criteria:
   - Email validation works
   - Password securely checked with bcrypt
   - Success returns JWT and redirects to dashboard
   - Failure shows clear error
   - Rate limiting prevents brute force
   ```
4. Creates story task:

   ```python
   mcp__archon__manage_task(
       action="create",
       project_id="proj-ecom-123",
       title="User can login with email and password",
       description="""
       As a registered user,
       I want to login with email/password,
       So that I can access my account.

       Acceptance Criteria:
       1. Email validation works
       2. Password securely checked
       3. Success returns JWT
       4. Failure shows error
       5. Rate limiting active
       """,
       feature="login",
       status="todo",
       task_order=90,
       assignee="James"
   )
   ```

**PM Output:**

- ✓ User story tasks (multiple, one per feature)

---

### 12.6 Phase 5: Development (Dev Agent)

```
User: @dev
```

**Agent Activation:**

1. Checks Archon
2. Loads project
3. Shows assigned tasks:
   ```python
   mcp__archon__find_tasks(
       project_id="proj-ecom-123",
       filter_by="assignee",
       filter_value="James"
   )
   # Returns: 12 stories assigned to James
   ```

```
User: *next-task
```

**Agent:**
Retrieves first `todo` task: "User can login with email and password"
Shows task details
Asks: "Proceed? (yes)"

```
User: yes
User: *develop-task task-login-789
```

**Task Execution (archon-develop-task.md):**

**Step 1: Retrieve & Display**

```python
task = mcp__archon__find_tasks(task_id="task-login-789")
# Display task details, acceptance criteria
```

**Step 2: Mark as Doing**

```python
mcp__archon__manage_task(
    action="update",
    task_id="task-login-789",
    status="doing"
)
# ✓ Task status: todo → doing
```

**Step 3: Research Phase**

```
Agent asks: "Key technologies (2-5 keywords):"
User: "Express JWT bcrypt"

mcp__archon__rag_search_knowledge_base(
    query="Express JWT bcrypt",
    match_count=5
)
# Returns: JWT best practices, bcrypt usage, Express middleware patterns

mcp__archon__rag_search_code_examples(
    query="Express JWT middleware",
    match_count=3
)
# Returns: Code examples for JWT auth middleware

mcp__archon__find_documents(
    project_id="proj-ecom-123",
    document_type="spec"
)
# Reads: PRD for context

mcp__archon__find_documents(
    project_id="proj-ecom-123",
    document_type="design"
)
# Reads: Architecture doc, coding standards
```

**Step 4: Implementation**

```
Agent implements (code stays in Git):
1. Creates /api/auth/login endpoint
2. Implements email validation
3. Implements bcrypt password check
4. Generates JWT token on success
5. Returns error on failure
6. Adds rate limiting middleware

After each step, updates task:
mcp__archon__manage_task(
    action="update",
    task_id="task-login-789",
    description="""
    [Original description]

    --- PROGRESS LOG ---
    [2025-10-03 10:30] Implemented: Login endpoint
    Files: src/routes/auth.ts, src/middleware/auth.ts

    [2025-10-03 10:45] Implemented: Password verification
    Files: src/utils/password.ts

    [2025-10-03 11:00] Implemented: JWT generation
    Files: src/utils/jwt.ts
    """
)
```

**Step 5: Testing**

```bash
# Agent runs tests
npm test src/routes/auth.test.ts

# Updates task with results
mcp__archon__manage_task(
    action="update",
    task_id="task-login-789",
    description="""
    [Previous log]

    --- TEST RESULTS ---
    Test Suite: auth.test.ts
    ✓ Email validation (12ms)
    ✓ Password check (45ms)
    ✓ JWT generation (8ms)
    ✓ Error handling (6ms)
    ✓ Rate limiting (15ms)

    Status: ALL TESTS PASSED
    """
)
```

**Step 6: Validate Acceptance Criteria**

```
Agent asks user for each criterion:
1. "Email validation works?" → yes ✓
2. "Password securely checked?" → yes ✓
3. "Success returns JWT?" → yes ✓
4. "Failure shows error?" → yes ✓
5. "Rate limiting active?" → yes ✓
```

**Step 7: Mark for Review**

```python
mcp__archon__manage_task(
    action="update",
    task_id="task-login-789",
    status="review",
    description="""
    [Previous log]

    --- READY FOR REVIEW ---
    [2025-10-03 11:30] Dev complete, all acceptance criteria met
    Implemented by: James
    Test status: ALL PASSED (5/5)
    """
)
# ✓ Task status: doing → review
```

**Dev Output:**

- ✓ Code in Git (src/routes/auth.ts, tests, etc.)
- ✓ Task status updated to `review`
- ✓ Progress logged in Archon

---

### 12.7 Phase 6: QA (QA Agent)

```
User: @qa
User: *review-queue
```

**Agent:**

```python
tasks = mcp__archon__find_tasks(
    project_id="proj-ecom-123",
    filter_by="status",
    filter_value="review"
)
# Returns: 1 task - "User can login with email and password"
```

```
User: *review-task task-login-789
```

**Task Execution:**

1. Reads task acceptance criteria
2. Reads PRD for expected behavior
3. Reviews code (Git)
4. Runs tests
5. Validates each criterion:
   - ✓ Email validation works
   - ✓ Password securely checked
   - ✓ JWT returned on success
   - ✓ Error shown on failure
   - ✓ Rate limiting prevents brute force
6. All pass → Mark as done:
   ```python
   mcp__archon__manage_task(
       action="update",
       task_id="task-login-789",
       status="done"
   )
   # ✓ Task status: review → done
   ```

**QA Output:**

- ✓ Task validated and marked `done`

---

### 12.8 Repeat Cycle

The Dev and QA cycle repeats for all remaining stories:

- User can signup with email and password
- User can reset password via email
- System generates and validates JWT tokens
- ... (all other stories in all epics)

---

### 12.9 Final State in Archon

```
Project: E-Commerce Auth System (proj-ecom-123)

Documents (5):
├─ Brainstorming Session (note)
├─ Project Brief (note)
├─ Requirements Analysis (spec)
├─ User Authentication System PRD v1 (spec)
└─ User Auth Architecture (design)

Tasks (20):
├─ Epic: Login (feature=login, status=done)
├─ User can login with email/password (feature=login, status=done)
├─ User can logout (feature=login, status=done)
├─ Epic: Signup (feature=signup, status=done)
├─ User can signup (feature=signup, status=done)
├─ User verifies email (feature=signup, status=done)
├─ Epic: Password Reset (feature=password, status=doing)
├─ User requests password reset (feature=password, status=review)
├─ User resets password (feature=password, status=todo)
└─ ... (all epics and stories)

Knowledge Base:
└─ All documents indexed for RAG search
```

---

## 13. Advanced Concepts

### 13.1 Multi-Project Workflows

**Scenario:** Managing multiple projects with shared knowledge

```
Archon Projects:
├─ E-Commerce Auth System
│   ├─ Documents: PRD, Architecture
│   └─ Tasks: Epics, Stories
│
├─ Mobile App Backend
│   ├─ Documents: PRD, Architecture
│   └─ Tasks: Epics, Stories
│
└─ Admin Dashboard
    ├─ Documents: PRD, Architecture
    └─ Tasks: Epics, Stories

Knowledge Base (Shared):
├─ Authentication patterns (from E-Commerce project)
├─ API design best practices (from Mobile Backend)
└─ UI/UX patterns (from Admin Dashboard)
```

**Benefits:**

- Each project has isolated tasks/docs
- All projects benefit from shared knowledge
- Patterns discovered in one project help others

---

### 13.2 Version History

Archon tracks document versions:

```python
# Create version snapshot
mcp__archon__manage_version(
    action="create",
    project_id="proj-123",
    field_name="docs",
    content=[...],
    change_summary="Updated PRD with new epic"
)

# List versions
mcp__archon__find_versions(
    project_id="proj-123",
    field_name="docs"
)
# Returns: v1, v2, v3 with timestamps

# Restore previous version
mcp__archon__manage_version(
    action="restore",
    project_id="proj-123",
    field_name="docs",
    version_number=2
)
```

---

### 13.3 Custom Agents

You can create custom agents by:

1. Copying existing agent (e.g., `pm.md`)
2. Modifying persona, commands, dependencies
3. Adding to `agents/` folder
4. Activating via `@your-custom-agent`

**Example:** DevOps Engineer Agent

```yaml
agent:
  name: Jake
  id: devops
  title: DevOps Engineer
  icon: 🔧
  customization: |
    # Archon-First Rule
    # ... (same pattern)

    # DevOps-specific workflows
    - Deploy applications
    - Manage infrastructure
    - Monitor systems

commands:
  - deploy {environment}: Deploy to environment
  - setup-ci: Setup CI/CD pipeline
  - monitor: View monitoring dashboards
```

---

### 13.4 Knowledge Base Management

**Adding Sources (Archon UI):**

1. Open http://localhost:3737
2. Click "Add Source"
3. Options:
   - URL (documentation sites)
   - File upload (PDFs, docs)
   - GitHub repo
4. Tag sources
5. Wait for indexing

**Best Practices:**

- Tag by technology (e.g., "React", "FastAPI")
- Tag by domain (e.g., "Authentication", "Payments")
- Tag by project (e.g., "E-Commerce", "Mobile App")

**Searching with Tags:**

```python
mcp__archon__rag_search_knowledge_base(
    query="authentication",
    tags=["React", "JWT"],
    match_count=5
)
# Returns: Only React + JWT authentication docs
```

---

### 13.5 Task Granularity Guidance

From PM agent documentation:

**For Feature-Specific Projects** (project = single feature):

- Create granular implementation tasks
- Example: "Setup", "Implement", "Test", "Document"

**For Codebase-Wide Projects** (project = entire app):

- Create feature-level tasks
- Example: "User Authentication Feature", "Payment System"

**Default:** More granular tasks
**Target:** 30 minutes to 4 hours of work per task

---

### 13.6 Checklist Automation

Checklists can be automated via `execute-checklist.md` task:

```markdown
# In pm-checklist.md

- [ ] All epics have stories
- [ ] All stories have acceptance criteria
- [ ] PRD reviewed by stakeholders
- [ ] Technical assumptions documented
- [ ] Out of scope clearly defined
```

**Execution:**

```python
# Agent loads checklist
checklist = load_file("checklists/pm-checklist.md")

# Present each item
for item in checklist:
    response = ask_user(f"✓ {item}?")
    results[item] = response

# Generate report
report = generate_report(results)
unchecked = [item for item, checked in results.items() if not checked]

# Update PRD with checklist results
mcp__archon__manage_document(
    action="update",
    document_id="doc-prd-456",
    content={
        ...,
        "checklist_results": report,
        "unchecked_items": unchecked
    }
)
```

---

## Conclusion

The **bmad-core-archon** expansion pack is a sophisticated, hybrid system that combines:

- **Git-based framework** (agents, tasks, templates, workflows)
- **Archon MCP server** (dynamic task/doc management, knowledge base)
- **Research-driven workflows** (KB search before implementation)
- **Smart dependency checking** (prerequisites validated automatically)
- **Consistent workflows** (same as bmad-core, enhanced backend)

**Key Takeaways:**

1. **Agents** are intelligent personas with embedded YAML configurations
2. **Tasks** are executable workflows with step-by-step instructions
3. **Templates** define document structure and elicitation prompts
4. **Workflows** orchestrate multi-agent sequences
5. **Agent Teams** bundle agents for specific project types
6. **Archon Integration** provides dynamic task/doc management + RAG-powered KB
7. **Everything works together** via clear component relationships

This expansion pack enables **enterprise-grade software development workflows** powered by AI agents, backed by a robust task management and knowledge system.

---

**For more information:**

- [Main README](README.md) - User-facing documentation
- [BMAD Method](https://github.com/bmad-code-org/BMAD-METHOD)
- [Archon MCP Server](https://github.com/coleam00/Archon)
- [Claude Code](https://docs.claude.com/en/docs/claude-code/overview)
