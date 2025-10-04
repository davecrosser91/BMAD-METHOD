# Workflow Status Analysis Task

**Purpose**: Analyze project state, determine current workflow phase, and recommend next steps

**Agent**: bmad-orchestrator

**Elicit**: false

---

## Task Instructions

When user runs `*workflow-status`, perform comprehensive project analysis:

### 1. CHECK ARCHON PROJECT STATUS (if available)

Use Archon MCP tools to gather project data:

```
- mcp__archon__find_projects() → Check for existing project
- mcp__archon__find_documents(project_id) → See what docs exist
- mcp__archon__find_tasks(project_id) → See task breakdown
```

**Note**: Gracefully handle if Archon MCP not available (may not be configured)

### 2. ANALYZE LOCAL FILE STRUCTURE

Use file system tools to check for:

- `src/` or `codebase/` folders (code exists)
- `docs/` folder (documentation)
- `tests/` folder (testing setup)
- `package.json`, `requirements.txt`, etc. (project type)
- `.git/` (version control)

Count files in each relevant folder.

### 3. DETERMINE WORKFLOW PHASE

Based on what exists, determine current phase:

#### Phase 0: Not Started

- **Indicators**: No Archon project, no significant files
- **Recommend**: Start with @analyst for brainstorming

#### Phase 1: Discovery

- **Indicators**: Archon project exists, has Project Brief or Requirements docs, no PRD yet
- **Recommend**: Continue with @pm to create PRD

#### Phase 2: Product Definition

- **Indicators**: Has PRD in Archon, may have some epics/stories, no architecture doc
- **Recommend**: @architect to create architecture, OR @pm to finish stories

#### Phase 3: Architecture

- **Indicators**: Has PRD and Architecture, stories exist, no code yet
- **Recommend**: @sm to validate stories, then @dev to start coding

#### Phase 4: Development

- **Indicators**: Code exists (src/ or codebase/), tasks in "doing" or "review" status
- **Recommend**: @dev to continue, @qa to review completed work

#### Phase 5: QA/Testing

- **Indicators**: Code exists, tasks in "review" status
- **Recommend**: @qa to review, or @po for epic retrospective

### 4. GENERATE STATUS REPORT

Format output as:

```
📊 PROJECT WORKFLOW STATUS

=== Archon Project ===
✓ Project: [name] (ID: [id])
✓ Documents: [count] ([types found])
✓ Tasks: [count] ([status breakdown])

=== Local Files ===
✓ Code: [folder name] ([file count] files)
✓ Tests: [exists/missing]
✓ Documentation: [exists/missing]
✓ Version Control: [exists/missing]

=== Current Phase ===
📍 Phase [N]: [Phase Name]

Completed Steps:
✓ [Step 1 completed]
✓ [Step 2 completed]

Missing/In Progress:
⚠️ [Step 3 missing]
🔄 [Step 4 in progress]

=== 💡 RECOMMENDED NEXT STEPS ===
1. [Primary recommendation with agent]
   Command: @[agent] → *[command]
   Why: [brief explanation]

2. [Alternative action]
   Command: @[agent] → *[command]
   Why: [brief explanation]

3. [Optional action]
   Command: @[agent] → *[command]
   Why: [brief explanation]
```

### 5. HANDLE EDGE CASES

- **No Archon project but code exists** → Brownfield project
- **Archon project but no local code** → Planning phase
- **Mixed state** → Highlight inconsistencies
- **Completely empty** → Fresh start guidance

### 6. BE ACTIONABLE

Always provide:

- Specific commands to run
- Explanation of WHY each step is recommended
- Priority based on workflow dependencies
- Which agent to activate

---

## Output Format

Structured status report (see template in step 4) with:

- Clear visual indicators (✓, ⚠️, 🔄)
- Actionable recommendations with specific commands
- Context-aware suggestions based on current state
