# Research Workflow Status Analysis Task

**Purpose**: Analyze research project state, check folders/documents, and recommend next research phase

**Agent**: research-lead

**Elicit**: false

---

## Task Instructions

When user runs `*workflow-status`, perform comprehensive research project analysis:

### 1. CHECK ARCHON PROJECT STATUS (if available)

Use Archon MCP tools to gather research project data:

```
- mcp__archon__find_projects() → Check for research project
- mcp__archon__find_documents(project_id) → See research docs (17 critical types)
- mcp__archon__find_tasks(project_id) → See experiment tasks
```

**Note**: Gracefully handle if Archon MCP not available

### 2. ANALYZE RESEARCH FOLDER STRUCTURE

Check for standard research folders:

- `codebase/` → Experimental code (ML Engineer's workspace)
- `data/` → Datasets (raw, processed, external)
- `results/` → Analysis outputs (Data Analyst's workspace)
- `research-paper/` → Paper drafts (Research Writer's workspace)
- `old_code/` → Archived code

Count files in each folder to gauge progress.

### 3. DETERMINE RESEARCH PHASE

Based on what exists, determine current phase:

#### Phase 0: Not Started

- **Indicators**: No folders initialized, no Archon project
- **Recommend**: `*init-folders` then `*brainstorm`

#### Phase 1a: Brainstorming

- **Indicators**: Folders exist but empty, no Archon research docs
- **Recommend**: `*brainstorm` or `*run-deep-research` for literature

#### Phase 1b: Literature Review

- **Indicators**: Has brainstorming session results, no Research Proposal in Archon
- **Recommend**: Coordinate 3 specialists (web/arxiv/kb) or `*run-phase-1`

#### Phase 1c: Proposal Writing

- **Indicators**: Has literature review, no Research Proposal doc
- **Recommend**: `*create-proposal`

#### Phase 2: Experimental Design

- **Indicators**: Has Research Proposal, no Experimental Architecture, codebase/ empty
- **Recommend**: @research-scientist to design experiments

#### Phase 3: Implementation

- **Indicators**: Has Experimental Architecture, codebase/ has code, results/ empty/sparse
- **Recommend**: @ml-engineer to implement, run experiments

#### Phase 4: Analysis

- **Indicators**: codebase/ has code, results/ has outputs, no paper draft
- **Recommend**: @data-analyst to analyze, create figures

#### Phase 5: Paper Writing

- **Indicators**: results/ has analysis, research-paper/ exists but incomplete
- **Recommend**: @research-writer to draft/update paper

#### Phase 6: Submission Prep

- **Indicators**: research-paper/ has complete draft, need validation
- **Recommend**: @reproducibility-engineer, then submission prep

### 4. GENERATE RESEARCH STATUS REPORT

Format output as:

```
🔬 RESEARCH PROJECT STATUS

=== Archon Research Project ===
✓ Project: [name] (ID: [id])
✓ Documents: [count]
  - Research Proposal: [exists/missing]
  - Literature Review: [exists/missing]
  - Experimental Architecture: [exists/missing]
  - Experiment Specs: [count]
✓ Tasks/Experiments: [count] ([status breakdown])

=== Research Folders ===
✓ codebase/: [file count] files
✓ data/: [file count] files
✓ results/: [file count] files
✓ research-paper/: [file count] files
✓ old_code/: [exists/archived count]

=== Current Phase ===
📍 Phase [N]: [Phase Name]

Completed:
✓ [What's done - be specific]
✓ [What experiments completed]

In Progress:
🔄 [Current experiments running]
🔄 [Current writing tasks]

Missing:
⚠️ [Critical gaps]
⚠️ [Blocked items]

=== 💡 RECOMMENDED NEXT STEPS ===
1. [Primary recommendation]
   Agent: @[agent]
   Command: *[command]
   Why: [Research rationale]
   Time: [Estimated duration]

2. [Alternative path]
   Agent: @[agent]
   Command: *[command]
   Why: [When to choose this]

3. [Parallel work possible]
   Agent: @[agent]
   Command: *[command]
   Why: [Can do while waiting]
```

### 5. HANDLE RESEARCH-SPECIFIC SCENARIOS

- **Deep Research completed** → Suggest Phase 1 or standalone use
- **Multiple experiment iterations** → Track which experiments done
- **Paper updates needed** → Remind to update after each experiment
- **Brownfield (existing code)** → Suggest Phase 0 context analysis
- **Results but no paper** → URGENT: start writing now

### 6. CHECK THREE-SPECIALIST LITERATURE STATUS

Assess literature coverage:

- Has web research been done? (D. Freuzer @research-assistant-web)
- Has arXiv search been done? (H. Zoppel @research-assistant-arxiv)
- Has KB been searched? (A. Pilz @research-assistant-kb)

Recommend missing literature sources.

### 7. BE RESEARCH-AWARE

Include research-specific guidance:

- Emphasize iterative nature (Phase 2 runs MANY times)
- Remind to update paper continuously (Phase 3 after each experiment)
- Note reproducibility checkpoints
- Suggest statistical rigor checks
- Recommend experiment tracking setup (wandb MCP if available)

---

## Output Format

Structured research status report (see template in step 4) with:

- Research-specific visual indicators
- Experiment tracking status
- Literature coverage assessment
- Time-aware recommendations (research takes months)
- Reproducibility reminders
