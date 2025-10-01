# run-workflow

## Purpose

Execute a complete multi-agent research workflow by reading the workflow YAML file and coordinating all agents according to the sequence defined in the workflow.

## Task Type

Workflow Orchestration

## When to Use

- User invokes `*run-workflow {workflow-name} {topic}`
- User invokes shortcut commands: `*run-phase-1`, `*run-phase-2`, `*run-phase-3`
- User wants automated execution of a complete research phase

## Instructions

### STEP 1: Identify Workflow

**Input from user command:**

- `*run-workflow phase-1-planning {topic}` → Load workflows/phase-1-planning.yaml
- `*run-phase-1 {topic}` → Load workflows/phase-1-planning.yaml
- `*run-phase-2 {hypothesis}` → Load workflows/phase-2-single-experiment.yaml
- `*run-phase-3 {variant}` → Load workflows/phase-3-paper-update.yaml

**Action:** Read the specified workflow YAML file to understand the sequence.

### STEP 2: Explain Workflow to User

Before executing, provide a brief overview:

```
I will execute the [Workflow Name] which involves:
1. [Brief description of steps]
2. [Number of agents involved]
3. [Expected outputs]
4. [Estimated duration]

This workflow is [repeatable/run-once] and typically takes [duration].

Shall I proceed? (yes/no)
```

Wait for user confirmation before proceeding.

### STEP 3: Execute Workflow Sequence

Read the workflow YAML `sequence` section and execute each step:

**For each step in workflow:**

1. **Identify the agent** (e.g., `agent: research-lead`, `agent: research-assistant-web`)

2. **Determine the action/command** (e.g., `action: brainstorm_research_questions`, `command: "*brainstorm"`)

3. **Check requirements** (e.g., `requires: research-proposal.md`)
   - If required file doesn't exist, inform user and ask how to proceed

4. **Execute the step:**
   - If agent is YOU (research-lead): Execute the action directly
   - If agent is ANOTHER agent: Provide clear delegation instructions

   **Example delegation:**

   ```
   === STEP 2: Extract Search Keywords ===

   Now I need to analyze the brainstorming results and extract search keywords.

   [Perform keyword extraction from brainstorming document]

   Keywords extracted:
   - Web search: "attention mechanisms", "transformer optimization", "efficient transformers"
   - ArXiv search: "attention complexity", "linear attention"
   - Knowledge base tags: "transformers", "attention"
   ```

   **Example delegation to specialist:**

   ```
   === STEP 3: Parallel Literature Search ===

   I will now coordinate three specialists to search in parallel:

   @research-assistant-web (D. Freuzer), please:
   *search "attention mechanisms transformer optimization"
   *search-github "efficient attention implementation"

   @research-assistant-arxiv (H. Zoppel), please:
   *check-mcp
   *search "attention complexity linear attention"

   @research-assistant-kb (A. Pilz), please:
   *set-tag "transformer-research"
   *search "attention mechanisms"

   [Wait for all three specialists to complete their searches]
   ```

5. **Track progress:**
   - Mark completed steps with ✅
   - Show current step with ⏳
   - Show pending steps with ⬜

6. **Handle parallel execution:**
   - When workflow specifies `parallel_execution`, coordinate multiple agents simultaneously
   - Wait for all parallel tasks to complete before proceeding

### STEP 4: Handle Decision Points

When workflow includes a `decision_point`:

1. **Present options to user:**

   ```
   === DECISION POINT: Iteration Check ===

   Based on the literature findings, I need to assess convergence:

   Criteria:
   ✅ Research questions are specific and testable
   ⬜ Gaps in literature clearly identified
   ⬜ Novelty is defensible

   Options:
   1. Continue iteration (return to deeper literature search)
   2. Questions have converged (proceed to create formal documents)

   Which option would you like? (1 or 2)
   ```

2. **Execute chosen path** based on user decision

### STEP 5: Create Outputs

Ensure all workflow outputs are created:

1. **Check `outputs` section** in workflow YAML
2. **Verify all primary outputs exist**
3. **List outputs for user:**

```
=== WORKFLOW COMPLETE ===

Outputs created:
✅ research-brainstorming-session-results.md
✅ literature-synthesis.md
✅ research-proposal.md
✅ experimental-architecture.md

Next recommended action:
[Suggest next step based on workflow]
```

### STEP 6: Suggest Next Steps

Based on workflow completion:

- **Phase 1 complete** → Suggest running Phase 2 to start experiments
- **Phase 2 complete** → Suggest running Phase 3 to update paper
- **Phase 3 complete** → Suggest next experiment iteration or submission

## Special Handling: Workflow Variants

### Phase 3 Paper Update has 4 variants:

When user invokes `*run-phase-3 {variant}`:

1. **initial_setup** - Run once to create paper structure
2. **incremental_update** - Run after each Phase 2 experiment (most common)
3. **full_revision** - Run every 4-6 weeks for major revision
4. **pre_submission_polish** - Run once before submission

Execute the specific variant's sequence from the workflow YAML.

## Error Handling

**If workflow step fails:**

1. **Inform user of failure:**

   ```
   ⚠️ WORKFLOW STEP FAILED

   Step: [step name]
   Agent: [agent name]
   Error: [error description]

   Options:
   1. Retry this step
   2. Skip this step and continue
   3. Abort workflow

   What would you like to do?
   ```

2. **Execute user's choice**

**If required file missing:**

1. **Inform user:**

   ```
   ⚠️ REQUIRED FILE MISSING

   Step requires: [file name]
   Not found in: [expected location]

   Options:
   1. Create the file now
   2. Specify different file location
   3. Skip this requirement
   4. Abort workflow

   What would you like to do?
   ```

**If MCP unavailable (H. Zoppel / A. Pilz):**

1. **Inform user immediately:**

   ```
   ⚠️ MCP UNAVAILABLE

   Agent H. Zoppel requires ArXiv MCP which is not available.

   Fallback options:
   1. Continue without ArXiv search (only web + KB)
   2. Manual ArXiv search (I'll provide search terms)
   3. Abort workflow

   What would you like to do?
   ```

## Workflow Execution Summary

At the end of workflow execution, provide summary:

```
=== WORKFLOW EXECUTION SUMMARY ===

Workflow: [name]
Topic: [topic/hypothesis]
Duration: [time taken]

Steps Completed: [X/Y]
✅ Step 1: [description]
✅ Step 2: [description]
⚠️ Step 3: [description] (skipped - MCP unavailable)
✅ Step 4: [description]

Outputs Created:
- [output 1]
- [output 2]
- [output 3]

Next Recommended Action:
[Specific suggestion based on workflow]

Would you like to:
1. Review the outputs
2. Start next workflow phase
3. Customize/refine something
4. Exit
```

## Notes

- **Maintain research context** throughout workflow execution
- **Act as both orchestrator and research expert** - provide research insights at appropriate steps
- **Be flexible** - users can deviate from workflow if needed
- **Track progress visually** - use ✅ ⏳ ⬜ symbols
- **Coordinate agents explicitly** - make clear delegation requests
- **Handle iterations** - workflows may loop 2-4 times before convergence
- **Parallel execution** - coordinate multiple agents when workflow specifies it
- **Decision points** - always involve user in key decisions

## Example Usage

### User invokes:

```
@research-lead
*run-phase-1 "efficient attention mechanisms for transformers"
```

### You execute:

1. Load workflows/phase-1-planning.yaml
2. Explain workflow overview
3. Execute Step 1: Brainstorm (you perform this)
4. Execute Step 2: Extract keywords (you perform this)
5. Execute Step 3: Coordinate three specialists in parallel
6. Execute Step 4: Synthesize findings (you perform this)
7. Execute Step 5: Refine questions (you perform this)
8. Decision point: Check convergence
9. If not converged: Loop back to Step 3 with refined keywords
10. If converged: Create formal documents
11. Provide workflow summary

This task enables the Research Lead to act as a **workflow orchestrator** while maintaining **research expertise** throughout the process.
