# Multi-Agent Workflows with Claude Code Subagents

**Last Updated:** 2025-10-03
**Version:** 3.0.3

---

## Table of Contents

1. [What are Claude Code Subagents?](#1-what-are-claude-code-subagents)
2. [BMAD Agents as Subagents](#2-bmad-agents-as-subagents)
3. [Party Mode: Group Chat Implementation](#3-party-mode-group-chat-implementation)
4. [Creating BMAD Subagent Configurations](#4-creating-bmad-subagent-configurations)
5. [Use Cases & Examples](#5-use-cases--examples)

---

## 1. What are Claude Code Subagents?

### Overview

**Claude Code Subagents** are specialized AI assistants that:

- ✅ **Operate in separate context windows**
- ✅ **Have custom prompts and tool access**
- ✅ **Can be invoked automatically or explicitly**
- ✅ **Preserve main conversation context**
- ✅ **Enable parallelization**

### Key Benefits for BMAD Method

| Feature                  | Benefit for BMAD                                             |
| ------------------------ | ------------------------------------------------------------ |
| **Separate Contexts**    | Each agent (PM, Dev, QA) maintains its own specialized focus |
| **Custom Tool Access**   | PM gets task management tools, Dev gets code tools, etc.     |
| **Automatic Delegation** | Claude Code can auto-select the right BMAD agent             |
| **Parallelization**      | Multiple agents can work simultaneously                      |
| **Reusability**          | Define agents once, use across projects                      |

### Creating Subagents

Use the `/agents` command in Claude Code:

```
/agents
```

This opens the subagent configuration UI where you can:

1. Create new subagents
2. Define their purpose and description
3. Specify allowed tools
4. Choose model (sonnet, opus, haiku)
5. Write custom system prompts

---

## 2. BMAD Agents as Subagents

### Strategy: Convert BMAD Agents to Claude Code Subagents

Instead of manually activating agents with prompts, you can configure them as **persistent subagents** in Claude Code.

### Configuration Levels

1. **Project-Level** (`.claude_code/agents/`)
   - Specific to this BMAD project
   - Highest priority

2. **User-Level** (`~/.claude_code/agents/`)
   - Available across all projects
   - Shared BMAD agents

### How to Configure

#### Step 1: Create Subagent Configuration Files

Create `.claude_code/agents/` directory in your project:

```bash
mkdir -p .claude_code/agents
```

#### Step 2: Define BMAD PM Subagent

Create `.claude_code/agents/pm.json`:

```json
{
  "name": "pm",
  "description": "Product Manager agent - Creates PRDs, epics, and user stories using Archon MCP",
  "prompt": "You are John, the Product Manager from the BMAD Method.\n\nIMPORTANT: Read and adopt the complete persona from .bmad-core-archon/agents/pm.md\n\nFollow these activation steps:\n1. Check Archon MCP availability\n2. Load project context from Archon\n3. Check for prerequisite documents (Project Brief, Requirements Analysis)\n4. Show available commands (*create-prd, *create-epic, *create-story)\n5. Stay in character as PM until asked to exit\n\nYou specialize in:\n- Creating Product Requirements Documents\n- Breaking down features into epics and stories\n- Managing Archon tasks and documents\n- Coordinating with other agents\n\nCore principles:\n- Archon-First (never use TodoWrite)\n- Research-driven (search KB before creating)\n- Dependency checking (alert if prerequisites missing)\n- Clear communication (tell user when to switch agents)",
  "tools": [
    "mcp__archon__health_check",
    "mcp__archon__find_projects",
    "mcp__archon__manage_project",
    "mcp__archon__find_tasks",
    "mcp__archon__manage_task",
    "mcp__archon__find_documents",
    "mcp__archon__manage_document",
    "mcp__archon__rag_search_knowledge_base",
    "mcp__archon__rag_search_code_examples",
    "Read",
    "Write",
    "Edit",
    "Bash"
  ]
}
```

#### Step 3: Define BMAD Dev Subagent

Create `.claude_code/agents/dev.json`:

```json
{
  "name": "dev",
  "description": "Developer agent - Implements tasks with research-driven development using Archon MCP",
  "prompt": "You are James, the Developer from the BMAD Method.\n\nIMPORTANT: Read and adopt the complete persona from .bmad-core-archon/agents/dev.md\n\nFollow these activation steps:\n1. Check Archon MCP availability\n2. Load project context and assigned tasks\n3. Show available commands (*my-tasks, *next-task, *develop-task)\n4. Stay in character as Dev until asked to exit\n\nYou specialize in:\n- Research-driven implementation (search KB first)\n- Task-based development (Archon tasks)\n- Testing and validation\n- Code quality and best practices\n\nCore principles:\n- Archon-First (never use TodoWrite)\n- Research before implementing\n- Test-driven development\n- Clear progress logging\n- One task in 'doing' status at a time",
  "tools": [
    "mcp__archon__health_check",
    "mcp__archon__find_projects",
    "mcp__archon__find_tasks",
    "mcp__archon__manage_task",
    "mcp__archon__find_documents",
    "mcp__archon__rag_search_knowledge_base",
    "mcp__archon__rag_search_code_examples",
    "Read",
    "Write",
    "Edit",
    "Bash",
    "Grep",
    "Glob"
  ]
}
```

#### Step 4: Define BMAD QA Subagent

Create `.claude_code/agents/qa.json`:

```json
{
  "name": "qa",
  "description": "QA Engineer agent - Reviews implementations and validates acceptance criteria",
  "prompt": "You are Maria, the QA Engineer from the BMAD Method.\n\nIMPORTANT: Read and adopt the complete persona from .bmad-core-archon/agents/qa.md\n\nFollow these activation steps:\n1. Check Archon MCP availability\n2. Load project context and review queue\n3. Show available commands (*review-queue, *review-task, *create-bug)\n4. Stay in character as QA until asked to exit\n\nYou specialize in:\n- Code review and testing\n- Acceptance criteria validation\n- Bug tracking in Archon\n- Quality gates\n\nCore principles:\n- Archon-First (never use TodoWrite)\n- Thorough validation\n- Clear feedback\n- Status flow: review → done or review → doing",
  "tools": [
    "mcp__archon__health_check",
    "mcp__archon__find_projects",
    "mcp__archon__find_tasks",
    "mcp__archon__manage_task",
    "mcp__archon__find_documents",
    "Read",
    "Bash",
    "Grep"
  ]
}
```

#### Step 5: Define BMAD Analyst Subagent

Create `.claude_code/agents/analyst.json`:

```json
{
  "name": "analyst",
  "description": "Business Analyst agent - Requirements discovery, user research, stakeholder analysis",
  "prompt": "You are Emma, the Business Analyst from the BMAD Method.\n\nIMPORTANT: Read and adopt the complete persona from .bmad-core-archon/agents/analyst.md\n\nFollow these activation steps:\n1. Check Archon MCP availability\n2. Load or create project\n3. Show available commands (*brainstorm, *create-project-brief, *search-kb)\n4. Stay in character as Analyst until asked to exit\n\nYou specialize in:\n- Requirements analysis\n- User research\n- Stakeholder interviews\n- Brainstorming sessions\n- Creating foundation documents\n\nCore principles:\n- Archon-First (never use TodoWrite)\n- Research-driven analysis\n- Clear documentation\n- No prerequisites (you create the foundation)",
  "tools": [
    "mcp__archon__health_check",
    "mcp__archon__find_projects",
    "mcp__archon__manage_project",
    "mcp__archon__find_documents",
    "mcp__archon__manage_document",
    "mcp__archon__rag_search_knowledge_base",
    "Read",
    "Write",
    "Edit"
  ]
}
```

#### Step 6: Define BMAD Architect Subagent

Create `.claude_code/agents/architect.json`:

```json
{
  "name": "architect",
  "description": "Software Architect agent - System design, architecture documentation, tech stack decisions",
  "prompt": "You are Sarah, the Software Architect from the BMAD Method.\n\nIMPORTANT: Read and adopt the complete persona from .bmad-core-archon/agents/architect.md\n\nFollow these activation steps:\n1. Check Archon MCP availability\n2. Load project context and check for PRD\n3. Show available commands (*create-architecture, *create-adr, *list-docs)\n4. Stay in character as Architect until asked to exit\n\nYou specialize in:\n- System architecture and design\n- Technology stack selection\n- Architecture Decision Records (ADRs)\n- Technical documentation\n- Design patterns and best practices\n\nCore principles:\n- Archon-First (never use TodoWrite)\n- Research-driven design (search KB for patterns)\n- Dependency checking (requires PRD)\n- Clear technical communication",
  "tools": [
    "mcp__archon__health_check",
    "mcp__archon__find_projects",
    "mcp__archon__find_documents",
    "mcp__archon__manage_document",
    "mcp__archon__rag_search_knowledge_base",
    "mcp__archon__rag_search_code_examples",
    "Read",
    "Write",
    "Edit"
  ]
}
```

### Using Configured Subagents

Once configured, you can invoke them in two ways:

#### Automatic Delegation

Just describe what you need:

```
I need to create a PRD for user authentication
```

Claude Code will automatically delegate to the `pm` subagent if configured.

#### Explicit Invocation

Use the Task tool to launch specific subagents:

```
Please launch the pm subagent to create a PRD
```

Or in your conversation:

```
/agent pm
```

---

## 3. Party Mode: Group Chat Implementation

### What is Party Mode?

**Party Mode** is a special multi-agent mode where:

- Multiple BMAD agents participate simultaneously
- Each agent provides their specialized perspective
- Agents can discuss and debate approaches
- User coordinates the conversation
- All agents share context via Archon MCP

### When to Use Party Mode

✅ **Use for:**

- Complex decisions requiring multiple perspectives
- Design reviews (PM + Architect + Dev)
- Problem-solving sessions (all agents)
- Brainstorming (Analyst + PM + Architect)
- Sprint planning (PM + PO + Dev + QA)

❌ **Don't use for:**

- Simple, single-agent tasks
- Sequential workflows
- Routine implementation

### How Party Mode Works

#### Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     USER (You)                           │
│                   Orchestrator                           │
└────────────┬────────────────────────────────────────────┘
             │
             ├──→ Analyst Subagent ──→ Archon MCP ←──┐
             │                                         │
             ├──→ PM Subagent ───────→ Archon MCP ←──┤
             │                                         │
             ├──→ Architect Subagent ─→ Archon MCP ←─┤
             │                                         │
             ├──→ Dev Subagent ───────→ Archon MCP ←─┤
             │                                         │
             └──→ QA Subagent ────────→ Archon MCP ←─┘
```

Each agent:

1. Has separate context window
2. Reads from shared Archon state
3. Responds with their expertise
4. Updates Archon when needed

### Implementation: Using Task Tool for Party Mode

Since Claude Code's Task tool can launch subagents, we can use it to coordinate multiple agents:

#### Example: Design Review Party

```
I need a design review for the authentication system architecture.

Please launch these subagents in parallel to provide feedback:
1. PM subagent - Review alignment with PRD
2. Architect subagent - Review technical design
3. Dev subagent - Review implementability
4. QA subagent - Review testability

Each agent should:
- Read the architecture document from Archon
- Provide their specialized perspective
- Flag any concerns or suggestions
- Return their feedback

Coordinate their responses and summarize.
```

### Manual Party Mode (Without Subagents)

If subagents aren't configured, you can simulate party mode:

#### Step 1: Set Up Context

```
I want to run a "party mode" session with multiple BMAD agents to discuss
the authentication system architecture.

Agents needed:
- PM (John) - Product perspective
- Architect (Sarah) - Technical perspective
- Dev (James) - Implementation perspective
- QA (Maria) - Testing perspective

All agents share context via Archon project "User Auth System".

Please help coordinate this multi-agent discussion.
```

#### Step 2: Round-Robin Discussion

```
Round 1: Initial Perspectives

Please simulate each agent reading the architecture document and providing
their initial reaction:

PM (John): [perspective on alignment with PRD, user value]
Architect (Sarah): [perspective on technical design, patterns]
Dev (James): [perspective on implementability, complexity]
QA (Maria): [perspective on testability, quality gates]
```

#### Step 3: Discussion & Debate

```
Round 2: Cross-Agent Discussion

Based on the perspectives, have the agents discuss:
- PM raised concern about timeline - Dev, is this realistic?
- Architect suggested microservices - PM, does this align with MVP scope?
- QA wants integration tests - Architect, what infrastructure is needed?

Simulate the conversation between agents.
```

#### Step 4: Consensus & Decisions

```
Round 3: Final Decisions

Have the agents reach consensus on:
1. Architecture approach (monolith vs microservices)
2. Technology stack
3. Testing strategy
4. Timeline and phases

Each agent states their final position and rationale.
```

---

## 4. Creating BMAD Subagent Configurations

### Quick Setup Script

Create a script to generate all BMAD subagent configs:

```bash
#!/bin/bash
# setup-bmad-subagents.sh

AGENTS_DIR=".claude_code/agents"
mkdir -p "$AGENTS_DIR"

# Array of BMAD agents
declare -a agents=("analyst" "pm" "architect" "dev" "qa" "po")

for agent in "${agents[@]}"
do
  cat > "$AGENTS_DIR/${agent}.json" <<EOF
{
  "name": "${agent}",
  "description": "BMAD ${agent} agent from bmad-core-archon",
  "prompt": "Read and adopt the complete persona from .bmad-core-archon/agents/${agent}.md and follow all activation instructions.",
  "tools": [
    "mcp__archon__health_check",
    "mcp__archon__find_projects",
    "mcp__archon__find_tasks",
    "mcp__archon__find_documents",
    "mcp__archon__manage_task",
    "mcp__archon__manage_document",
    "mcp__archon__rag_search_knowledge_base",
    "Read",
    "Write",
    "Edit",
    "Bash"
  ]

}
EOF
  echo "✓ Created ${agent} subagent config"
done

echo ""
echo "BMAD subagents configured in $AGENTS_DIR"
echo "Restart Claude Code to load the new subagents"
```

Run it:

```bash
chmod +x setup-bmad-subagents.sh
./setup-bmad-subagents.sh
```

### Verifying Subagents

After configuration, verify in Claude Code:

```
/agents
```

You should see:

- analyst
- pm
- architect
- dev
- qa
- po

Each with their description from the BMAD Method.

---

## 5. Use Cases & Examples

### Use Case 1: Parallel Implementation

**Scenario:** Multiple independent features to implement

```
I have 3 independent stories to implement:
1. Login endpoint
2. Signup endpoint
3. Password reset endpoint

Please launch 3 dev subagents in parallel, each implementing one story.
Coordinate their progress and report when all are complete.
```

**Benefits:**

- ✅ 3x faster (parallel execution)
- ✅ Independent contexts (no interference)
- ✅ All share Archon state (tasks updated)

### Use Case 2: Design Review Panel

**Scenario:** Architecture needs multi-perspective review

```
Launch party mode with PM, Architect, Dev, and QA to review the
authentication system architecture.

Each agent should:
1. Read doc-arch-999 from Archon
2. Provide feedback from their domain
3. Flag any concerns
4. Suggest improvements

Synthesize their feedback into actionable items.
```

**Expected Output:**

```
=== PARTY MODE: Architecture Review ===

PM (John) 📋:
✓ Aligns with PRD requirements
⚠ Concerned about scope creep (microservices for MVP?)
✓ Timeline realistic with monolith approach

Architect (Sarah) 🏗️:
✓ Tech stack solid (Node.js, Express, PostgreSQL)
✓ JWT implementation follows best practices
⚠ Suggest adding Redis for session management
✓ ADR for monolith vs microservices needed

Dev (James) 💻:
✓ Implementable within sprint timeline
⚠ Need clear coding standards document
✓ Test infrastructure well-defined
⚠ Rate limiting implementation needs clarification

QA (Maria) 🧪:
✓ Testability looks good
⚠ Need integration test environment setup
✓ Acceptance criteria clear
⚠ Security testing plan missing

=== CONSENSUS ===
✓ Proceed with monolith approach (MVP scope)
✓ Add Redis for session management
⚠ Create: Coding Standards document (Architect)
⚠ Create: Security testing plan (QA)
⚠ Create: ADR for architectural decisions (Architect)

Next Steps:
1. Architect creates missing docs
2. PM updates stories based on feedback
3. Dev begins implementation after docs ready
```

### Use Case 3: Sprint Planning Session

**Scenario:** Plan next sprint with team input

```
Launch party mode with PM, PO, Dev, and QA for sprint planning.

Context:
- Sprint duration: 2 weeks
- Team capacity: 80 hours (Dev) + 20 hours (QA)
- Current backlog: 15 stories in Archon

Tasks:
1. PM presents high-priority stories
2. Dev estimates effort for each
3. QA estimates testing time
4. PO prioritizes based on value vs effort
5. Team commits to sprint goal

Output sprint plan with assigned tasks and timeline.
```

### Use Case 4: Brainstorming New Feature

**Scenario:** Generate ideas for a new feature

```
Launch party mode with Analyst and PM to brainstorm a new feature:
"Social login integration (Google, Facebook, GitHub)"

Analyst should:
- Research similar implementations
- Identify user needs and pain points
- Suggest success metrics

PM should:
- Define MVP scope
- Break into potential epics
- Estimate complexity

Collaborate to create a preliminary feature brief.
```

### Use Case 5: Debugging Complex Issue

**Scenario:** Bug requires multiple perspectives

```
Launch party mode with Dev and QA to debug:
"Login fails intermittently with 500 error"

Dev should:
- Review code and logs
- Identify potential root causes
- Suggest fixes

QA should:
- Review test coverage
- Identify reproduction steps
- Suggest additional tests

Work together to diagnose and fix the issue.
```

---

## Summary

### Key Takeaways

1. **Claude Code Subagents = BMAD Agents**
   - Configure BMAD agents as subagents in `.claude_code/agents/`
   - Each agent gets specialized tools and context
   - Invoked automatically or explicitly

2. **Party Mode = Multi-Agent Collaboration**
   - Launch multiple subagents simultaneously
   - Each provides specialized perspective
   - Coordinated via Archon MCP shared state
   - User orchestrates the discussion

3. **Benefits**
   - ✅ Parallel execution (faster)
   - ✅ Specialized expertise (better quality)
   - ✅ Separate contexts (no interference)
   - ✅ Shared state via Archon (coordination)

4. **Implementation Options**
   - **With Subagents:** Use Task tool to launch in parallel
   - **Without Subagents:** Simulate round-robin discussion
   - **Hybrid:** Mix configured subagents with manual coordination

### Next Steps

1. **Configure Subagents**

   ```bash
   ./setup-bmad-subagents.sh
   ```

2. **Verify in Claude Code**

   ```
   /agents
   ```

3. **Try Party Mode**

   ```
   Launch party mode with pm, architect, and dev for design review
   ```

4. **Experiment**
   - Try parallel implementation
   - Run design review panels
   - Coordinate sprint planning
   - Debug complex issues together

---

**For more information:**

- [Claude Code Subagents Docs](https://docs.claude.com/en/docs/claude-code/sub-agents.md)
- [AGENT-ACTIVATION-GUIDE.md](AGENT-ACTIVATION-GUIDE.md) - Single-agent workflows
- [README_DETAILED.md](README_DETAILED.md) - Technical deep dive
- [README.md](README.md) - User-facing documentation
