# BMAD Core + Archon Extension Pack

**Version:** 3.0.1
**Status:** Production Ready

> A BMAD Method extension pack that integrates Archon MCP server for task management, document management, and knowledge base capabilities.

---

## 📖 Table of Contents

1. [Overview](#-overview)
2. [Design Philosophy](#-design-philosophy--why-this-exists)
3. [Document Workflow](#-document-workflow)
4. [Quick Start](#-quick-start-5-minutes)
5. [Architecture](#-architecture)
6. [Package Contents](#-package-contents)
7. [Setup Guide](#-setup-guide)
8. [How to Use](#-how-to-use)
9. [Configuration](#-configuration)
10. [Agent Workflows](#-agent-workflows)
11. [Best Practices](#-best-practices)
12. [Troubleshooting](#-troubleshooting)
13. [What's Different from bmad-core](#-whats-different-from-bmad-core)

---

## 🎯 Overview

**bmad-core-archon** extends BMAD Method with [Archon MCP server](https://github.com/coleam00/Archon) integration. It replaces file-based task/doc workflows with Archon's powerful MCP capabilities while keeping agent definitions and source code in Git.

### Key Features

- ✅ **Archon-First Task Management** - Tasks, epics, and stories managed via Archon MCP
- ✅ **Project-Scoped Documents** - PRDs, architecture, specs stored in Archon per project
- ✅ **Shared Knowledge Base** - RAG-powered semantic search across your documentation
- ✅ **Agent Integration** - All agents use Archon for coordination
- ✅ **Git for Code** - Source code and tests stay in Git
- ✅ **Same Workflows** - All BMAD workflows work identically, just with Archon backend

### The Problem This Solves

Traditional BMAD Method (bmad-core) uses **file-based workflows**:

- Tasks/stories → Markdown files in `docs/stories/`
- Documentation → Markdown files in `docs/`
- Progress tracking → TodoWrite tool
- Knowledge → Static files in `data/`

**Limitations:**

- 📁 File-based task management is rigid
- 🔍 No semantic search across documentation
- 📊 Hard to track progress across multiple projects
- 🤝 Limited collaboration features
- 📈 Manual knowledge base updates

### The Solution: Archon Integration

**Archon MCP server** provides:

- 📋 **Dynamic task management** - Create, assign, track tasks via MCP
- 🧠 **RAG-powered knowledge base** - Semantic search across all docs
- 📦 **Project-scoped workspaces** - Multi-project support
- 📖 **Document management** - Structured docs with versioning
- 🔗 **Real-time collaboration** - Shared context across agents

---

## 💡 Design Philosophy & Why This Exists

### The Brainstorming Process

This package emerged from a brainstorming session about integrating Archon MCP server with BMAD Method. Here's how we approached it:

#### **Initial Question**

> "I want to make a new extension package which is very similar to the core package. I want to integrate Archon as docs and knowledge store and to manage tasks."

#### **Discovery Phase**

We researched Archon's capabilities:

- ✅ Archon is a **Model Context Protocol (MCP) server** for AI coding assistants
- ✅ Provides **task management** (projects, tasks, epics, stories)
- ✅ Provides **document management** (PRDs, architecture, specs)
- ✅ Provides **knowledge base** with RAG-powered semantic search
- ✅ Provides **version history** for documents

#### **Key Decisions Made**

We clarified these critical design questions:

**Q1: Hybrid approach or Archon-only?**

- ✅ **Decision:** Hybrid - Code in Git, Tasks/Docs in Archon
- **Rationale:** Best tool for each job

**Q2: Migration tools for existing projects?**

- ✅ **Decision:** Defer migration tools, focus on new package first
- **Rationale:** Keep scope manageable, add migration later

**Q3: What goes in Git vs. Archon?**

- ✅ **Decision:**
  - Git: Agent definitions, source code, tests
  - Archon: Tasks, PRDs, architecture docs, progress tracking
- **Rationale:** Clear separation of concerns

**Q4: Multi-project support?**

- ✅ **Decision:** One Archon project per BMAD project
- ✅ **Decision:** Shared knowledge base (user-managed)
- ✅ **Decision:** Project-scoped documents (agent-managed)
- **Rationale:** Flexibility for multiple projects, shared learning

**Q5: Template versioning?**

- ✅ **Decision:** Simple overwrite approach, no complex versioning
- **Rationale:** Keep it simple as requested

**Q6: Are workflows the same?**

- ✅ **Decision:** Yes, exactly the same, only files managed differently
- **Rationale:** Minimal learning curve

#### **Implementation Approach**

Based on brainstorming, we decided to:

1. **Copy everything from bmad-core** that works well
   - Workflows, templates, checklists, agent teams, data files

2. **Add Archon integration to agents**
   - ARCHON-FIRST RULE in every agent
   - Health checks on activation
   - Project context initialization
   - Knowledge base search before implementation

3. **Create Archon-specific tasks**
   - `archon-init-project.md` - Setup
   - `archon-create-prd.md` - PRD creation with KB research
   - `archon-create-story.md` - Story creation as Archon task
   - `archon-develop-task.md` - Research-driven development
   - And more...

4. **Keep workflows identical**
   - Users familiar with bmad-core can immediately use bmad-core-archon
   - Only backend changed (files → Archon)

#### **Result**

A complete package with:

- ✅ 10 Archon-integrated agents
- ✅ 29 tasks (8 new Archon + 21 from core)
- ✅ All workflows, templates, checklists from bmad-core
- ✅ Comprehensive documentation
- ✅ Same user experience, enhanced with Archon

### Design Decisions

#### **1. Hybrid Approach** ✅

- **Code in Git** - Source code, tests, agent definitions stay in version control
- **Tasks in Archon** - Dynamic task management via MCP
- **Docs in Archon** - PRDs, architecture, specs in structured documents
- **Knowledge Base in Archon** - Shared, searchable documentation

**Why?** Best tool for each job - Git for code versioning, Archon for task/doc management.

#### **2. Archon-First Rule** ✅

All agents have a **CRITICAL ARCHON-FIRST RULE** that:

- Checks Archon MCP availability on activation
- Uses Archon for task management (overrides TodoWrite)
- Initializes project context from Archon
- Searches knowledge base before implementing

**Why?** Ensures consistent workflow, prevents mixing file-based and Archon approaches.

#### **3. Same Workflows, Different Backend** ✅

- All BMAD workflows work identically
- All templates unchanged
- All checklists unchanged
- All agent teams unchanged

**Only difference:** Tasks/docs use Archon instead of files.

**Why?** Minimal learning curve - users familiar with bmad-core can immediately use bmad-core-archon.

#### **4. Project-Scoped Documents** ✅

- Each BMAD project → One Archon project
- Documents are project-specific (PRDs, architecture, specs)
- Knowledge base is shared across projects (you manage)

**Why?** Clear separation of concerns, multi-project support, shared knowledge.

#### **5. Research-Driven Development** ✅

Every agent workflow includes:

1. Search knowledge base for patterns/examples
2. Review existing project docs
3. Implement with context
4. Document findings

**Why?** Leverage collective knowledge, reduce reinventing wheels, better decisions.

---

## 📄 Document Workflow

Understanding when documents are created and who reads them is crucial for effective collaboration in bmad-core-archon.

### Why Start with the Analyst?

The **Analyst agent** is the foundation of the BMAD Method workflow. Starting with analysis ensures:

- ✅ **Clear project context** - Everyone understands the "why" before the "what"
- ✅ **Stakeholder alignment** - Requirements are gathered from actual users
- ✅ **Informed decisions** - PM creates PRD based on real analysis, not assumptions
- ✅ **Reduced rework** - Catch misunderstandings early, before implementation
- ✅ **Better architecture** - Architect understands constraints and success criteria

**The Golden Rule:** Always start with `@analyst` for new projects or major features.

### Document Lifecycle

```
Phase 1: Discovery & Analysis
├─ Analyst creates: Project Brief (type=note)
├─ Analyst creates: Requirements Analysis (type=spec)
└─ Analyst creates: Stakeholder Interview Notes (type=note)

Phase 2: Product Definition
├─ PM reads: Project Brief, Requirements Analysis
├─ PM searches: KB for PRD templates, similar projects
├─ PM creates: PRD (type=spec)
└─ PM creates: Epics (tasks with feature field)

Phase 3: Architecture & Design
├─ Architect reads: PRD
├─ Architect searches: KB for architecture patterns
├─ Architect creates: Architecture Document (type=design)
├─ Architect creates: ADRs (Architecture Decision Records) (type=design)
├─ Architect creates: Tech Stack Document (type=guide)
└─ Architect creates: Coding Standards (type=guide)

Phase 4: Story Breakdown
├─ PM reads: PRD, Epics
├─ PM creates: User Stories (tasks linked to epics)
└─ PO reads: All tasks, prioritizes and assigns

Phase 5: Development
├─ Dev reads: User Story (task)
├─ Dev reads: PRD (for context)
├─ Dev reads: Architecture Document
├─ Dev reads: Coding Standards
├─ Dev searches: KB for implementation patterns
├─ Dev creates: Code (in Git)
└─ Dev updates: Task with progress notes

Phase 6: QA & Validation
├─ QA reads: User Story acceptance criteria
├─ QA reads: PRD (for expected behavior)
├─ QA creates: Bug Reports (tasks)
├─ QA creates: Test Documentation (type=note)
└─ QA updates: Task status (review → done)

Phase 7: Documentation (Ongoing)
├─ Any agent creates: Meeting Notes (type=note)
├─ Any agent creates: Technical Documentation (type=guide)
└─ Any agent searches: KB for reference materials
```

### Document Types & Purposes

| Document Type                   | Created By    | Read By           | Purpose                               | Archon Type |
| ------------------------------- | ------------- | ----------------- | ------------------------------------- | ----------- |
| **Project Brief**               | Analyst       | PM, PO, Architect | Initial project context and goals     | `note`      |
| **Requirements Analysis**       | Analyst       | PM, Architect     | Detailed requirements and constraints | `spec`      |
| **Stakeholder Interview Notes** | Analyst       | PM, PO            | User needs and expectations           | `note`      |
| **PRD (Product Requirements)**  | PM            | Everyone          | Complete product vision and features  | `spec`      |
| **Epics**                       | PM            | PM, PO, Dev       | High-level feature groups             | `task`      |
| **User Stories**                | PM            | Dev, QA           | Specific implementation tasks         | `task`      |
| **Architecture Document**       | Architect     | Dev, QA, PM       | System design and structure           | `design`    |
| **ADR (Architecture Decision)** | Architect     | Dev, Architect    | Key technical decisions and rationale | `design`    |
| **Tech Stack Document**         | Architect     | Dev               | Technologies and tools to use         | `guide`     |
| **Coding Standards**            | Architect     | Dev               | Code style and best practices         | `guide`     |
| **Bug Reports**                 | QA            | Dev, PM           | Issues found during testing           | `task`      |
| **Test Documentation**          | QA            | Dev, QA           | Test plans and results                | `note`      |
| **Meeting Notes**               | Any           | Team              | Decisions and action items            | `note`      |
| **Technical Guides**            | Dev/Architect | Dev               | How-to guides and patterns            | `guide`     |

### Document Dependencies

Understanding what each agent needs to read before creating their documents:

#### **Analyst Agent** 📊

**Reads:**

- Knowledge Base (similar projects, analysis techniques)

**Creates:**

- Project Brief → Used by PM, PO, Architect
- Requirements Analysis → Used by PM, Architect
- Stakeholder Interview Notes → Used by PM, PO

#### **PM Agent** 📋

**Reads:**

- Project Brief (from Analyst)
- Requirements Analysis (from Analyst)
- Knowledge Base (PRD templates, similar products)

**Creates:**

- PRD → Used by Architect, Dev, QA, PO
- Epics → Used by PM, PO, Dev
- User Stories → Used by Dev, QA

#### **Architect Agent** 🏗️

**Reads:**

- PRD (from PM)
- Requirements Analysis (from Analyst)
- Knowledge Base (architecture patterns, tech stacks)

**Creates:**

- Architecture Document → Used by Dev, QA
- ADRs → Used by Dev, Architect
- Tech Stack Document → Used by Dev
- Coding Standards → Used by Dev

#### **Dev Agent** 💻

**Reads:**

- User Story/Task (from PM)
- PRD (from PM) - for context
- Architecture Document (from Architect)
- Tech Stack Document (from Architect)
- Coding Standards (from Architect)
- Knowledge Base (implementation patterns, code examples)

**Creates:**

- Code (in Git)
- Task progress updates
- Technical Guides (optional)

#### **QA Agent** 🧪

**Reads:**

- User Story acceptance criteria (from PM)
- PRD (from PM) - for expected behavior
- Architecture Document (from Architect) - for system understanding

**Creates:**

- Bug Reports (tasks)
- Test Documentation
- Task status updates

#### **PO Agent** 🎯

**Reads:**

- Project Brief (from Analyst)
- PRD (from PM)
- All tasks (epics, stories, bugs)

**Creates:**

- Task priority updates
- Sprint plans

### Example Document Flow for "User Authentication System"

```
1. Analyst Phase
   📊 Analyst creates: "User Auth System - Project Brief" (note)
   📊 Analyst creates: "User Auth Requirements Analysis" (spec)

2. Product Phase
   📋 PM reads: Project Brief, Requirements Analysis
   📋 PM searches KB: "authentication PRD templates"
   📋 PM creates: "User Authentication System PRD v1" (spec)
   📋 PM creates: Epic tasks (Login, Signup, Password Reset, JWT)

3. Architecture Phase
   🏗️ Architect reads: PRD
   🏗️ Architect searches KB: "JWT authentication patterns"
   🏗️ Architect creates: "User Auth System Architecture" (design)
   🏗️ Architect creates: "ADR: JWT Token Strategy" (design)
   🏗️ Architect creates: "Tech Stack: Node.js + JWT" (guide)

4. Story Breakdown Phase
   📋 PM reads: PRD, Epics
   📋 PM creates: "User can login with email/password" (task)
   📋 PM creates: "User can signup with email/password" (task)
   ... (more stories)

5. Development Phase
   💻 Dev reads: Story "User can login..."
   💻 Dev reads: PRD (for context)
   💻 Dev reads: Architecture Document
   💻 Dev reads: Tech Stack guide
   💻 Dev searches KB: "Express JWT middleware"
   💻 Dev implements: /api/auth/login (Git)
   💻 Dev updates: Task with progress

6. QA Phase
   🧪 QA reads: Story acceptance criteria
   🧪 QA reads: PRD (expected behavior)
   🧪 QA tests: Login endpoint
   🧪 QA updates: Task status → done
```

### How to Access Documents

```bash
# List all project documents
@pm
*list-docs

# Get specific document
@architect
*get-doc {document_id}

# Search documents
@dev
*search-docs "authentication"

# Create document
@analyst
*create-doc type=note title="Project Brief"
```

### Smart Dependency Checking

**All agents automatically check for prerequisite documents before starting major work.**

When an agent (PM, Architect, Dev, QA) is about to create a document or start implementation, it will:

1. **Check for expected prerequisites** - Search Archon for documents it typically needs
2. **Alert you if documents are missing** - Display a formatted message showing what's missing
3. **Give you options:**
   - **Proceed anyway** - Continue without the prerequisite documents
   - **Create missing docs first** - Switch to the appropriate agent (e.g., `@analyst`, `@pm`, `@architect`)
   - **Skip and continue** - Handle prerequisites separately

**Example:**

```
@pm
*create-prd

# PM agent checks for prerequisites
⚠️ **Missing Prerequisite Documents**

I'm about to create a PRD, but I couldn't find:
- [ ] Project Brief (typically created by @analyst)
- [ ] Requirements Analysis (typically created by @analyst)

**Options:**
1. **Proceed anyway** - I'll create the PRD based on what we discuss now
2. **Create missing docs first** - Switch to @analyst to create prerequisite documents
3. **Skip and continue** - You'll handle prerequisites separately

What would you like to do?

# You choose:
> 2

# Agent responds:
Perfect! Please switch to @analyst to create the prerequisite documents,
then come back to me with *create-prd when ready.
```

This ensures proper workflow sequence while giving you full flexibility.

---

## 🚀 Quick Start (5 Minutes)

### Prerequisites

1. **Install Archon MCP Server**

   ```bash
   # Follow Archon installation guide
   # https://github.com/coleam00/Archon
   ```

2. **Configure Claude Code MCP**
   Add to your Claude Code MCP configuration:

   ```json
   {
     "mcpServers": {
       "archon": {
         "command": "python",
         "args": ["-m", "archon.mcp_server"],
         "env": {
           "ARCHON_API_URL": "http://localhost:8000"
         }
       }
     }
   }
   ```

3. **Start Archon Server**

   ```bash
   # Start Archon MCP server
   archon serve
   ```

4. **Add Knowledge Sources to Archon**
   - Open Archon UI: http://localhost:3737
   - Click "Add Source"
   - Add your project documentation URLs
   - Wait for indexing to complete

### First Workflow (15 minutes)

#### Step 1: Activate Analyst Agent (2 min)

```
@analyst
```

Agent will:

- Check Archon MCP ✓
- Ask for project name
- Create project in Archon
- Conduct initial analysis

```
*analyze-project
```

Answer prompts:

- Business context: "E-commerce needs user auth"
- Target users: "Online shoppers"
- Key stakeholders: "CTO, Product Lead"
- Success criteria: "Secure, fast authentication"

✓ Project Brief created
✓ Requirements Analysis created

#### Step 2: Switch to PM Agent (1 min)

```
@pm
```

Agent loads analyst's documents automatically.

#### Step 3: Create PRD (3 min)

```
*create-prd
```

Answer prompts:

- Title: "User Authentication System PRD v1"
- Vision: "Secure user authentication for web app"
- Users: "Web app users"
- Problem: "Need secure login system"
- Features: "Login, Signup, Password Reset"
- Metrics: "99.9% uptime, < 2s auth time"
- Out of scope: "OAuth, SSO"

✓ PRD created in Archon
✓ Epics created for each feature

#### Step 4: Create Story (2 min)

```
*create-story
```

Answer prompts:

- Epic: "Login" (select from list)
- Title: "User can login with email and password"
- As a: "registered user"
- I want to: "login with email and password"
- So that: "I can access my account"
- Acceptance Criteria:
  - "Email validation works"
  - "Password is securely checked"
  - "Success redirects to dashboard"
  - "Failure shows error message"
- Assign to: "James"

✓ Story created as Archon task
✓ Linked to Login epic
✓ Assigned to Dev

#### Step 5: Implement Task (5 min)

```
@dev
*next-task
*develop-task {task_id}
```

Agent will:

1. Research KB for authentication patterns
2. Find code examples
3. Implement code (you guide it)
4. Run tests
5. Mark as "review"

✓ Task implemented
✓ Status: doing → review
✓ Progress logged in Archon

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    BMAD Core + Archon                    │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │   Agents     │  │    Tasks     │  │  Templates   │ │
│  │  (Git .md)   │  │  (Git .md)   │  │  (Git .yaml) │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
│                                                          │
├─────────────────────────────────────────────────────────┤
│                    Archon MCP Server                     │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────────────┐  ┌──────────────────┐           │
│  │  Task Management │  │   Knowledge Base │           │
│  │  - Epics/Stories │  │   - RAG Search   │           │
│  │  - Status Flow   │  │   - Code Examples│           │
│  │  - Assignments   │  │   - Docs (Shared)│           │
│  └──────────────────┘  └──────────────────┘           │
│                                                          │
│  ┌──────────────────┐  ┌──────────────────┐           │
│  │  Project Docs    │  │  Version History │           │
│  │  - PRDs          │  │   - Doc Versions │           │
│  │  - Architecture  │  │   - Restore      │           │
│  │  - Specs (Scoped)│  │   - Tracking     │           │
│  └──────────────────┘  └──────────────────┘           │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### Hybrid Architecture Breakdown

**Git (Version Control):**

- Agent definitions (.md files)
- Source code
- Tests
- Task workflows
- Templates
- Checklists

**Archon (Dynamic Management):**

- Tasks/epics/stories (dynamic, searchable)
- PRDs/architecture docs (project-scoped, versioned)
- Knowledge base (shared, RAG-powered)
- Progress tracking (real-time status)

---

## 📦 Package Contents

### Agents (10 total - Archon-Integrated)

- **PM (Product Manager)** - John 📋 - PRD creation, epic/story management in Archon
- **Dev (Developer)** - James 💻 - Task-driven development with Archon
- **Architect** - Sarah 🏗️ - Architecture docs and ADRs in Archon
- **PO (Product Owner)** - Alex 🎯 - Backlog management in Archon
- **QA Engineer** - Maria 🧪 - Review queue and bug tracking in Archon
- **Analyst** - Emma 📊 - Requirements analysis with Archon KB
- **Scrum Master** - Bob 🏃 - Story creation and sprint planning in Archon
- **UX Expert** - Sally 🎨 - UI/UX with Archon design docs
- **BMad Master** - Meta-agent for method guidance
- **BMad Orchestrator** - Workflow coordinator

### Tasks (29 total)

**Archon-Specific (8):**

- `archon-init-project.md` - Initialize or connect to Archon project
- `archon-create-prd.md` - Create PRD in Archon with KB research
- `archon-create-epic.md` - Create epic as Archon task
- `archon-create-story.md` - Create user story in Archon
- `archon-develop-task.md` - Implement task with research-driven workflow
- `archon-create-architecture.md` - Create architecture docs in Archon
- `execute-checklist.md` - Execute checklists
- `create-doc.md` - Create documents

**From bmad-core (21):**

- All core tasks copied (advanced-elicitation, apply-qa-fixes, brownfield-\*, etc.)

### Supporting Files

- **6 Checklists** - All copied from bmad-core
- **13 Templates** - All copied from bmad-core (PRD, architecture, story, etc.)
- **4 Agent Teams** - All copied from bmad-core (fullstack, minimal, etc.)
- **6 Data Files** - All copied from bmad-core (brainstorming, test frameworks, etc.)
- **6 Workflows** - All copied from bmad-core (greenfield/brownfield patterns)

### Configuration

- `core-config.yaml` - Archon-specific configuration
- `config.yaml` - Extension pack metadata

---

## 🔧 Setup Guide

### 1. Prerequisites

#### Install Archon MCP Server

```bash
# Clone Archon repository
git clone https://github.com/coleam00/Archon.git
cd Archon

# Follow Archon installation instructions
# Install dependencies
# Start Archon server
archon serve
```

Verify: Open http://localhost:3737 in browser

#### Configure Claude Code MCP

Add to Claude Code settings → MCP Servers:

```json
{
  "mcpServers": {
    "archon": {
      "command": "python",
      "args": ["-m", "archon.mcp_server"],
      "env": {
        "ARCHON_API_URL": "http://localhost:8000",
        "ARCHON_DB_PATH": "/path/to/archon/data"
      }
    }
  }
}
```

Restart Claude Code.

#### Verify MCP Connection

In Claude Code:

```
mcp__archon__health_check()
```

Expected: `{"status": "healthy", ...}`

### 2. Archon Knowledge Base Setup

1. Open Archon UI: http://localhost:3737
2. Click "Add Source"
3. Add documentation sources:
   - Project-specific documentation URLs
   - Technology stack documentation
   - Best practices guides
   - Code example repositories
4. Upload PDFs/documents if needed
5. Tag sources appropriately
6. Wait for indexing to complete

Test search:

```
mcp__archon__rag_search_knowledge_base(query="test")
```

### 3. First Project Setup

Activate PM agent:

```
@pm
```

Agent will:

- Check Archon MCP availability
- Prompt for project name
- Create new project or select existing
- Initialize project context

Verify project in Archon UI.

### 4. Agent Verification Tests

#### PM Agent

```
@pm
*archon-status      # Shows project info, task counts
*search-kb "test"   # Returns KB results
```

#### Dev Agent

```
@dev
*archon-status      # Shows assigned tasks
*my-tasks           # Lists tasks assigned to James
```

#### Architect Agent

```
@architect
*archon-status      # Shows architecture docs
*list-docs          # Lists project documents
```

#### QA Agent

```
@qa
*review-queue       # Lists tasks in review status
```

#### PO Agent

```
@po
*view-backlog       # Lists all project tasks
```

### 5. Workflow Test

Complete this end-to-end test to verify everything works:

1. **Create PRD** (`@pm` → `*create-prd`)
2. **Create Story** (`@pm` → `*create-story`)
3. **Implement Task** (`@dev` → `*develop-task {id}`)
4. **QA Review** (`@qa` → `*review-task {id}`)

Verify entire flow in Archon UI.

---

## 📖 How to Use

### Complete Workflow Example

This example shows the complete flow from idea to implementation using bmad-core-archon.

#### **Scenario:** Building a User Authentication System

##### **Step 1: Project Initialization & Analysis**

```
# In Claude Code - Start with Analyst for discovery
@analyst

# Analyst agent activates and prompts:
# "What is your project name/identifier?"
> User Auth System

# Agent creates project in Archon
# Shows: "✓ Created project: User Auth System (ID: proj-abc123)"

# Analyst conducts discovery
*analyze-project

# Agent prompts for:
# - Business context: "E-commerce platform needs user management"
# - Target users: "Online shoppers, ages 18-65"
# - Key stakeholders: "CTO, Product Lead, Customer Support"
# - Success criteria: "Secure, fast, user-friendly authentication"
# - Constraints: "Must comply with GDPR, integrate with existing DB"

# Agent searches KB for:
# - Similar authentication projects
# - Requirements gathering techniques
# - Security best practices

# Agent creates documents in Archon:
# ✓ "User Auth System - Project Brief" (type=note)
# ✓ "User Auth Requirements Analysis" (type=spec)
```

##### **Step 2: Create PRD (Using Analysis)**

```
# Switch to PM agent
@pm

*create-prd

# Agent first reads analyst's documents:
# - Project Brief
# - Requirements Analysis

# Agent prompts for:
# - PRD Title: "User Authentication System PRD v1"
# - Vision: "Secure, scalable authentication for web app"
# - Target Users: "Web application users"
# - Problem: "Need secure login/signup system"
# - Features: "Login, Signup, Password Reset, JWT Tokens"
# - Success Metrics: "99.9% uptime, <2s auth time"
# - Out of Scope: "OAuth, SSO, MFA (future phases)"

# Agent searches KB for authentication patterns
# Creates PRD document in Archon (type=spec)
# Creates 4 epics in Archon:
#   - Epic: Login
#   - Epic: Signup
#   - Epic: Password Reset
#   - Epic: JWT Tokens
```

##### **Step 3: Break Down into Stories**

```
*create-story

# Select epic: "Login" (from list)
# Story title: "User can login with email and password"
# As a: "registered user"
# I want to: "login with my email and password"
# So that: "I can access my account securely"
# Acceptance criteria:
#   - Email validation works
#   - Password is securely hashed and checked
#   - Success returns JWT token and redirects to dashboard
#   - Failure shows clear error message
#   - Rate limiting prevents brute force
# Assign to: "James" (Dev agent)
# Priority: 90 (high)

# Repeat for more stories...
```

##### **Step 4: Review Backlog**

```
*list-tasks

# Shows all tasks:
# 1. Epic: Login (feature=login, status=todo, priority=85)
# 2. User can login with email and password (feature=login, status=todo, priority=90, assignee=James)
# 3. Epic: Signup (feature=signup, status=todo, priority=85)
# ... etc
```

##### **Step 5: Switch to Dev Agent**

```
@dev

# Dev agent activates
# Loads project context
# Shows assigned tasks
```

##### **Step 6: Start Development**

```
*next-task

# Agent retrieves: "User can login with email and password"
# Shows task details and acceptance criteria
# Prompts: "Proceed with implementation? (yes/no)"
> yes

*develop-task task-abc123

# === RESEARCH PHASE ===
# Agent prompts: "Key technologies? (2-5 keywords)"
> JWT authentication Express

# Agent searches Archon KB:
#   - JWT best practices
#   - Express middleware patterns
#   - Password hashing (bcrypt)
# Shows findings

# === IMPLEMENTATION ===
# Agent asks: "Ready to implement? (yes)"
> yes

# Agent implements:
# - Creates /api/auth/login endpoint
# - Implements password verification
# - Generates JWT token
# - Adds error handling
# - Logs progress to Archon task

# === TESTING ===
# Agent runs tests
# Updates task with test results

# === COMPLETION ===
# Agent marks task status: todo → doing → review
# Shows: "✓ Task ready for review"
```

##### **Step 7: QA Review**

```
@qa

# QA agent activates

*review-queue

# Shows tasks in review:
# 1. User can login with email and password (task-abc123)

*review-task task-abc123

# Agent shows acceptance criteria
# Tests each criterion:
#   ✓ Email validation works
#   ✓ Password securely checked
#   ✓ JWT token returned
#   ✓ Error messages clear
#   ✓ Rate limiting active

# All pass → marks as done
# Shows: "✓ Task status: review → done"
```

##### **Step 8: Continue Workflow**

```
# Back to Dev
@dev
*next-task

# Gets next story: "User can signup with email and password"
# Repeat development cycle...
```

##### **Step 9: Track Progress**

```
# At any time, check status:
@pm
*archon-status

# Shows:
# Project: User Auth System
# Tasks: 12 total (3 todo, 1 doing, 1 review, 7 done)
# Epics: 4 (Login 75% complete, Signup 50% complete, ...)
# Documents: 1 PRD

# Or view in Archon UI:
# http://localhost:3737
```

### Common Use Cases

#### **Use Case 1: Greenfield Project**

```
@analyst → *analyze-project (create project brief and requirements)
@pm → *create-prd → *create-epic → *create-story (multiple)
@architect → *create-architecture
@dev → *next-task (implement each story)
@qa → *review-queue (test each story)
```

#### **Use Case 2: Brownfield Enhancement**

```
@pm → *create-epic "Add Feature X"
@pm → *create-story (for feature)
@architect → *create-architecture (update existing)
@dev → *develop-task (implement)
```

#### **Use Case 3: Bug Fixing**

```
@qa → *create-bug "Login fails on mobile"
@dev → *develop-task bug-123 (fix)
@qa → *review-task bug-123 (verify)
```

#### **Use Case 4: Sprint Planning**

```
@po → *view-backlog
@po → *sprint-plan
# Prioritizes tasks (updates task_order)
# Assigns tasks to team members
# Sets sprint goals
```

### Agent Command Reference

#### **PM Agent Commands**

```
*archon-status          # Show project status
*search-kb "query"      # Search knowledge base
*create-prd             # Create PRD in Archon
*create-epic            # Create epic
*create-story           # Create story
*list-tasks             # View all tasks
*list-docs              # View all documents
```

#### **Dev Agent Commands**

```
*archon-status          # Show my task status
*my-tasks               # My assigned tasks
*next-task              # Get next todo task
*develop-task {id}      # Implement task
*search-kb "query"      # Research patterns
*run-tests              # Run tests
```

#### **Architect Agent Commands**

```
*archon-status          # Architecture docs status
*search-kb "query"      # Research patterns
*create-architecture    # Create architecture doc
*create-adr             # Create ADR
*list-docs              # View architecture docs
```

#### **QA Agent Commands**

```
*archon-status          # Review queue status
*review-queue           # View tasks to review
*review-task {id}       # Review specific task
*create-bug             # Create bug task
*list-bugs              # View all bugs
```

#### **Analyst Agent Commands**

```
*archon-status          # Analysis status
*analyze-project        # Conduct project analysis
*stakeholder-interview  # Document stakeholder interviews
*search-kb "query"      # Research similar projects
*create-brief           # Create project brief
*list-docs              # View analysis documents
```

#### **PO Agent Commands**

```
*archon-status          # Backlog status
*view-backlog           # View all tasks
*prioritize             # Update priorities
*sprint-plan            # Plan sprint
```

#### **Scrum Master Commands**

```
*archon-status          # Sprint status
*draft                  # Create story
*view-sprint            # Current sprint
*sprint-plan            # Plan sprint
*retrospective          # Run retro
```

### Tips & Tricks

#### **Searching Knowledge Base**

```
# ✅ Good queries (2-5 keywords):
*search-kb "React hooks useState"
*search-kb "JWT authentication Express"
*search-kb "database migration patterns"

# ❌ Bad queries (too long):
*search-kb "how do I implement user authentication with JWT tokens in Express"
```

#### **Task Organization**

```
# Use feature field for grouping:
# - All login stories: feature="login"
# - All signup stories: feature="signup"
# - All bugs: feature="bugs"

# Use task_order for priority:
# - Critical: 90-100
# - High: 70-89
# - Medium: 40-69
# - Low: 1-39
```

#### **Document Types**

```
# PRDs and requirements: document_type="spec"
# Architecture and design: document_type="design"
# Notes and research: document_type="note"
# Guides and standards: document_type="guide"
```

#### **Status Flow**

```
# Always follow this flow:
todo → doing → review → done

# Never skip statuses
# Only ONE task "doing" per person
# Use "review" for QA handoff
```

---

## 🔧 Configuration

### core-config.yaml

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

### config.yaml

```yaml
name: bmad-core-archon
version: 1.0.0
short-title: Core + Archon Pack
description: Core BMAD Method extension pack with Archon MCP integration
author: BMAD Community
slashPrefix: bmadarchon
```

---

## 📚 Agent Workflows

### Analyst Workflow

1. Check Archon status
2. Initialize project (if new)
3. Search KB for similar projects and analysis techniques
4. Conduct stakeholder interviews/research
5. Create Project Brief document in Archon
6. Create Requirements Analysis document in Archon
7. Document constraints and success criteria

### PM Workflow

1. Check Archon status
2. Read analyst's Project Brief and Requirements Analysis
3. Search KB for PRD templates
4. Create PRD document in Archon (informed by analyst's work)
5. Create epics as Archon tasks
6. Create stories linked to epics

### Dev Workflow

1. Get assigned tasks from Archon
2. Mark task as "doing"
3. Research KB for patterns/examples
4. Implement (code in Git)
5. Log progress in Archon task
6. Run tests (code in Git)
7. Mark task as "review"

### Architect Workflow

1. Review PRD from Archon
2. Research architecture patterns in KB
3. Create architecture document in Archon
4. Create ADR tasks
5. Create implementation tasks for dev

### QA Workflow

1. Get tasks from review queue
2. Review requirements from Archon
3. Test implementation (code in Git)
4. Document results in Archon task
5. Mark as "done" or send back to "doing"

---

## 🔍 Best Practices

### Workflow Sequence

- ✅ **Always start with @analyst** for new projects or major features
- ✅ **Let agents check dependencies** - They'll alert you if prerequisites are missing
- ✅ **Follow the document flow** - Analyst → PM → Architect → Dev → QA
- ✅ **Don't skip steps** - Missing docs lead to misaligned implementation
- ✅ **Use the options** - When agents ask about missing docs, choose what works best

### Knowledge Base Queries

- ✅ Keep queries SHORT (2-5 keywords)
- ✅ Good: "React useState", "JWT authentication", "microservices pattern"
- ❌ Bad: "how to implement user authentication with JWT tokens in React"

### Task Management

- ✅ Use feature field to group related tasks
- ✅ Higher task_order = higher priority (0-100)
- ✅ Keep ONE task in "doing" status at a time
- ✅ Log progress in task description

### Document Management

- ✅ Use project-scoped documents for specs/architecture
- ✅ Use appropriate document_type (spec/design/note/guide)
- ✅ Tag documents for organization
- ✅ Link tasks to documents via description
- ✅ **Let agents load prerequisites automatically** - They know what they need

---

## 🐛 Troubleshooting

### Archon MCP Not Available

```
Error: Archon MCP server not available

Solution:
1. Check if Archon server is running: `archon status`
2. Verify MCP configuration in Claude Code settings
3. Restart Claude Code if needed
```

### Project Not Found

```
Error: No project found

Solution:
1. Run agent activation - will prompt to create project
2. Or manually: *archon-status and follow prompts
```

### Task Status Not Updating

```
Issue: Task status changes not reflected

Solution:
1. Check project_id is set correctly
2. Verify task_id is correct
3. Refresh Archon UI if using it
```

### Knowledge Base Empty

```
Issue: Search returns no results

Solution:
1. Add sources in Archon UI (http://localhost:3737)
2. Wait for indexing to complete
3. Test search again
```

---

## 🎯 What's Different from bmad-core

### Changed (Archon-Enhanced)

| Aspect                | bmad-core            | bmad-core-archon                    | Impact                                   |
| --------------------- | -------------------- | ----------------------------------- | ---------------------------------------- |
| **Task Management**   | File-based stories   | Archon tasks                        | ✨ Dynamic, searchable, multi-project    |
| **Documentation**     | Markdown files       | Archon documents                    | ✨ Structured, versioned, project-scoped |
| **Knowledge Base**    | Static files         | Archon RAG                          | ✨ Semantic search, code examples        |
| **Progress Tracking** | TodoWrite tool       | Archon task status                  | ✨ Real-time, shareable                  |
| **Search**            | Manual grep/find     | RAG semantic search                 | ✨ Intelligent, contextual, fast         |
| **Multi-Project**     | One project per repo | Multiple Archon projects            | ✨ Flexibility, shared KB                |
| **Version Control**   | Git for everything   | Git for code, Archon for tasks/docs | ✨ Best tool for each job                |

### Unchanged (Same as bmad-core)

| Feature         | bmad-core | bmad-core-archon |
| --------------- | --------- | ---------------- |
| **Workflows**   | Same ✅   | Same ✅          |
| **Templates**   | Same ✅   | Same ✅          |
| **Checklists**  | Same ✅   | Same ✅          |
| **Agent Teams** | Same ✅   | Same ✅          |
| **Source Code** | Git ✅    | Git ✅           |

### MCP Tools Reference

#### Task Management

- `mcp__archon__find_tasks(project_id, query, filter_by, filter_value)`
- `mcp__archon__manage_task(action, task_id, project_id, title, description, status, assignee)`

#### Project Management

- `mcp__archon__find_projects(query, project_id)`
- `mcp__archon__manage_project(action, project_id, title, description)`

#### Document Management

- `mcp__archon__find_documents(project_id, document_id, document_type)`
- `mcp__archon__manage_document(action, project_id, document_id, title, document_type, content)`

#### Knowledge Base

- `mcp__archon__rag_get_available_sources()`
- `mcp__archon__rag_search_knowledge_base(query, source_id, match_count)`
- `mcp__archon__rag_search_code_examples(query, source_id, match_count)`

#### Version History

- `mcp__archon__find_versions(project_id, field_name, version_number)`
- `mcp__archon__manage_version(action, project_id, field_name, content, change_summary)`

---

## 📄 License

Same as BMAD Method core - see main repository.

## 🤝 Contributing

Contributions welcome! This extension pack follows BMAD Method contribution guidelines.

## 🔗 Links

- [BMAD Method](https://github.com/bmad-code-org/BMAD-METHOD)
- [Archon MCP Server](https://github.com/coleam00/Archon)
- [Claude Code](https://docs.claude.com/en/docs/claude-code/overview)

## 📝 Version History

### v3.0.1 (2025-10-01)

- **Bug Fix**: Installer now copies `core-config.yaml` from expansion pack
- Orchestrator can now properly discover workflows after installation

### v3.0.0 (2025-10-01)

- **Smart Dependency Checking**: All 8 agents check prerequisites automatically
- **Complete Document Workflow**: Comprehensive documentation of document lifecycle
- **Consolidated Documentation**: Single README with all information
- **Analyst-First Examples**: All workflows now start with analyst
- 10 agents with Archon support and dependency checking
- 29 tasks (8 Archon-specific + 21 from core)
- All workflows, templates, checklists from bmad-core

### v1.0.0 (2025-10-01)

- Initial release
- Archon MCP integration
- 10 agents with Archon support
- 29 tasks (8 Archon-specific + 21 from core)
- Complete documentation
- All workflows, templates, checklists from bmad-core

---

**Ready to get started?** Follow the [Quick Start](#-quick-start-5-minutes) guide above! 🚀
