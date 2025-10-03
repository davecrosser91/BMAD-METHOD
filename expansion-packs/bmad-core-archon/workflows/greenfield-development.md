<!-- Powered by BMAD™ Core with Archon -->

# greenfield-development (Team Lead Mode)

**Phase**: Development & QA (Option C: Parallel Teams)
**Team**: Dev Team Lead → N × Developers → N × QA Reviewers
**Input**: User-approved planning from [greenfield-planning.md](greenfield-planning.md) + [development-kickoff.md](development-kickoff.md)
**Output**: Tested, production-ready features

---

## Overview

This workflow handles **parallel development with Dev Team Lead orchestration** (Option C from development-kickoff).

**This is the FASTEST execution mode** (3-5x speedup) - use when you have 20+ stories with well-defined dependencies.

The Dev Team Lead spawns multiple developer and QA subagents to work on independent tasks simultaneously.

**Key Innovation**: Tasks are executed in **parallel waves** based on dependency graph, with each dev/QA working in isolated context.

> **Note**: If you want Manual Mode (Option A) or Simple Workflow (Option B), see [development-kickoff.md](development-kickoff.md)

---

## Prerequisites (from Planning Phase)

Before starting development, ensure:

- ✅ Archon project exists with complete context
- ✅ PRD document created (`document_type="spec"`)
- ✅ Architecture document created (`document_type="design"`)
- ✅ User stories created as Archon tasks
- ✅ Dependencies marked in task descriptions (`Depends on: #TASK-ID`)
- ✅ Tasks categorized into waves (`task_order` reflects dependency levels)

**Verify with**:

```python
# Check documents
mcp__archon__find_documents(project_id, document_type="spec")  # Should find PRD
mcp__archon__find_documents(project_id, document_type="design")  # Should find Architecture

# Check tasks
mcp__archon__find_tasks(project_id)  # Should return 20-50 stories with dependencies
```

---

## Workflow Steps

### 1. Activate SM Orchestrator

**Agent**: `@sm-orchestrator` or activate [sm-orchestrator.md](../agents/sm-orchestrator.md)

**Command**: User types: `*analyze-dependencies`

**SM Actions**:

1. Load all tasks from Archon
2. Parse dependency markers from descriptions
3. Build dependency graph (topological sort)
4. Identify execution waves
5. Present plan to user:

```
📊 PARALLEL EXECUTION PLAN

Wave 1 (5 tasks - no dependencies) - READY NOW:
  - #TASK-101: Database schema setup
  - #TASK-102: Shared utility functions
  - #TASK-103: Base UI component library
  - #TASK-104: API error handling middleware
  - #TASK-105: Authentication utilities

Wave 2 (8 tasks - depends on Wave 1):
  - #TASK-201: User signup API (depends on #TASK-101, #TASK-105)
  - #TASK-202: User login API (depends on #TASK-101, #TASK-105)
  - #TASK-203: Password reset API (depends on #TASK-101, #TASK-105)
  - #TASK-204: User profile API (depends on #TASK-101)
  - #TASK-205: Login form component (depends on #TASK-103)
  - #TASK-206: Signup form component (depends on #TASK-103)
  - #TASK-207: Profile edit component (depends on #TASK-103)
  - #TASK-208: Navigation component (depends on #TASK-103)

Wave 3 (6 tasks - depends on Wave 2):
  - #TASK-301: Login page integration (depends on #TASK-202, #TASK-205)
  - #TASK-302: Signup page integration (depends on #TASK-201, #TASK-206)
  - #TASK-303: Profile page integration (depends on #TASK-204, #TASK-207)
  - #TASK-304: Password reset flow (depends on #TASK-203)
  - #TASK-305: Session management (depends on #TASK-202)
  - #TASK-306: Auth guards (depends on #TASK-202)

Wave 4 (3 tasks - depends on Wave 3):
  - #TASK-401: End-to-end auth tests (depends on all above)
  - #TASK-402: Performance tests (depends on all above)
  - #TASK-403: Security audit (depends on all above)

Total: 22 tasks in 4 waves
Sequential time estimate: ~44 hours
Parallel time estimate: ~12 hours (with 5 devs, 3 QA)
Speedup: 3.7x
```

**User Decision Point**:

```
Ready to execute sprint?

Options:
1. *execute-sprint - Full auto (all waves)
2. *start-wave 1 - Manual wave-by-wave
3. *configure-capacity - Set dev/QA limits first
4. *manual-mode - Manual task assignment

Your choice:
```

---

### 2. Configure Capacity (Optional)

**Command**: `*configure-capacity`

**SM Prompts**:

```
How many parallel developers? (default: 3, max: 10)
> 5

How many parallel QA reviewers? (default: 2, max: 5)
> 3

✅ Capacity configured:
   - Max 5 developers working simultaneously
   - Max 3 QA reviewers working simultaneously
   - Tasks will batch if wave exceeds capacity
```

---

### 3. Execute Sprint (Automated)

**Command**: `*execute-sprint`

**SM Orchestration**:

#### For Each Wave:

##### Step 3.1: Pre-flight Check

```python
# Verify dependencies complete
for task in current_wave:
    dependencies = parse_dependencies(task.description)
    for dep_id in dependencies:
        dep_task = mcp__archon__find_tasks(task_id=dep_id)
        if dep_task.status != "done":
            HALT(f"Dependency {dep_id} not complete for {task.id}")

# Verify codebase clean
git_status = run("git status")
if "nothing to commit" not in git_status:
    WARN("Uncommitted changes exist - proceed anyway? (y/n)")
```

##### Step 3.2: Spawn Developer Subagents (Parallel)

SM uses **Task tool** to launch multiple devs:

```python
# Batch tasks by capacity
tasks_in_wave = [TASK-101, TASK-102, TASK-103, TASK-104, TASK-105]
max_devs = 5
batches = chunk(tasks_in_wave, max_devs)  # [[101,102,103,104,105]]

for batch in batches:
    # Launch all devs in batch simultaneously (single message, multiple Task tools)
    for task in batch:
        Task(
            subagent_type="general-purpose",
            description=f"Develop task {task.id}",
            prompt=f"""You are Developer working on task #{task.id}.

**Project Context**:
- Project: {project.title}
- PRD: {prd_document_link}
- Architecture: {architecture_document_link}

**Your Specific Task** (from Archon):
{task.description}

**Acceptance Criteria**:
{task.acceptance_criteria}

**Related Tasks** (for context only - DO NOT implement these):
{related_tasks}

**Your Mission**:
1. Read PRD and Architecture documents from Archon to understand context
2. Implement ONLY this task (#{task.id})
3. Write unit tests for your implementation
4. Run tests and ensure they pass
5. Update task in Archon with implementation notes
6. Report completion

**Step-by-step**:

Step 1: Load context from Archon
```

prd = mcp**archon**find_documents(project_id="{project.id}", document_type="spec")
arch = mcp**archon**find_documents(project_id="{project.id}", document_type="design")

````

Step 2: Implement the feature
- Follow architecture patterns
- Write clean, testable code
- Add inline comments for complex logic

Step 3: Write tests
- Unit tests for all functions
- Test edge cases
- Aim for >80% coverage

Step 4: Verify
```bash
# Run tests
pytest tests/test_{task.feature}.py -v

# Check code quality
pylint src/{task.feature}.py
````

Step 5: Update Archon

```
mcp__archon__manage_task("update",
    task_id="{task.id}",
    status="review",  # NOT "done" - QA needed
    description="{task.description}

**Implementation Notes** (added by dev):
- Files created: [list files]
- Key decisions: [explain approach]
- Tests: [X passed, Y failed]
- Known issues: [if any]
"
)
```

Step 6: Report back to SM
Provide this summary:

```
✅ Task #{task.id} completed

📁 Files modified:
- src/{task.feature}/api.py
- tests/test_{task.feature}.py

🧪 Tests: 12 passed, 0 failed

✅ Code quality: Passed pylint (9.2/10)

⚠️ Issues encountered: [None or list issues]

📝 Notes: [Any important context for QA or next developers]
```

**CRITICAL**:

- Mark task as status="review" (not "done")
- Include detailed implementation notes
- Report all issues encountered
- DO NOT implement related/dependent tasks
  """
  )

      # WAIT for all devs in batch to complete
      wait_for_completion()

```

**SM receives reports**:
```

📊 WAVE 1 DEVELOPMENT COMPLETE

Developers finished:
✅ dev-1: #TASK-101 Database schema (5 files, 18 tests passed)
✅ dev-2: #TASK-102 Utility functions (3 files, 24 tests passed)
✅ dev-3: #TASK-103 UI components (12 files, 36 tests passed)
✅ dev-4: #TASK-104 Error middleware (2 files, 8 tests passed)
✅ dev-5: #TASK-105 Auth utilities (4 files, 15 tests passed)

Total: 26 files modified, 101 tests passed

Moving to QA phase...

````

##### Step 3.3: Spawn QA Subagents (Parallel)

SM launches QA reviewers using **Task tool**:

```python
tasks_for_review = [TASK-101, TASK-102, TASK-103, TASK-104, TASK-105]
max_qa = 3
batches = chunk(tasks_for_review, max_qa)  # [[101,102,103], [104,105]]

for batch in batches:
    for task in batch:
        Task(
            subagent_type="general-purpose",
            description=f"QA review task {task.id}",
            prompt=f"""You are QA Reviewer for task #{task.id}.

**Original Task**:
{task.description}

**Acceptance Criteria**:
{task.acceptance_criteria}

**Developer Implementation**:
{task.implementation_notes}

**Your Mission**:
1. Review implementation against acceptance criteria
2. Check code quality and test coverage
3. Run tests and verify they pass
4. Test feature manually (if applicable)
5. Provide PASS/FAIL verdict
6. Update task in Archon

**Review Checklist**:

□ Acceptance Criteria:
  - [ ] All criteria met?
  - [ ] Edge cases handled?
  - [ ] Error handling present?

□ Code Quality:
  - [ ] Readable and maintainable?
  - [ ] Follows architecture patterns?
  - [ ] Properly commented?

□ Tests:
  - [ ] Unit tests exist?
  - [ ] Tests pass?
  - [ ] Coverage >80%?

□ Manual Testing (if applicable):
  - [ ] Feature works as expected?
  - [ ] No obvious bugs?

**Steps**:

Step 1: Load and review code
```bash
# Read implementation files
cat src/{task.feature}/*.py

# Review tests
cat tests/test_{task.feature}.py
````

Step 2: Run tests

```bash
pytest tests/test_{task.feature}.py -v --cov=src/{task.feature}
```

Step 3: Check code quality

```bash
pylint src/{task.feature}/*.py
mypy src/{task.feature}/*.py
```

Step 4: Manual testing (if applicable)

```bash
# Start dev server and test feature
npm run dev
# Test the feature in browser/API client
```

Step 5: Determine verdict

- **PASS**: All criteria met, code quality good, tests pass
- **FAIL**: Missing criteria, quality issues, or test failures

Step 6: Update Archon

```python
if verdict == "PASS":
    mcp__archon__manage_task("update",
        task_id="{task.id}",
        status="done",
        description="{task.description}

**QA Review** (added by QA):
✅ PASS - All acceptance criteria met
- Code quality: Excellent
- Test coverage: 85%
- Manual testing: Passed
- Reviewer: QA Subagent
- Date: {datetime.now()}
"
    )
else:  # FAIL
    mcp__archon__manage_task("update",
        task_id="{task.id}",
        status="doing",  # Send back to dev
        description="{task.description}

**QA Review** (added by QA):
❌ FAIL - Issues found

Issues to fix:
1. [Issue 1 description]
2. [Issue 2 description]

Suggestions:
- [Suggestion 1]
- [Suggestion 2]

Reviewer: QA Subagent
Date: {datetime.now()}
"
    )
```

Step 7: Report to SM

```
Verdict: PASS/FAIL

Issues found: [detailed list if FAIL]

Recommendations: [suggestions for improvement]
```

"""
)

    wait_for_completion()

```

**SM receives QA reports**:
```

📊 WAVE 1 QA COMPLETE

Reviews finished:
✅ qa-1: #TASK-101 PASS (DB schema excellent)
✅ qa-1: #TASK-102 PASS (Utilities well-tested)
✅ qa-2: #TASK-103 FAIL (Missing TypeScript types)
✅ qa-2: #TASK-104 PASS (Error handling robust)
✅ qa-3: #TASK-105 PASS (Auth utilities secure)

Results: 4 passed, 1 failed

Failed tasks reassigned to dev for fixes:

- #TASK-103: Add TypeScript types, fix linting errors

````

##### Step 3.4: Handle Failed Tasks

```python
failed_tasks = [TASK-103]

if failed_tasks:
    # Re-run dev for failed tasks
    for task in failed_tasks:
        Task(
            subagent_type="general-purpose",
            description=f"Fix task {task.id} based on QA feedback",
            prompt=f"""You are Developer fixing task #{task.id} based on QA feedback.

**Original Task**: {task.description}

**QA Feedback**: {task.qa_feedback}

**Your Mission**: Address all QA issues and resubmit for review.

[Same dev workflow as before, focusing on fixes]
"""
        )

    wait_for_completion()

    # Re-run QA for fixed tasks
    [Same QA workflow as before]
````

##### Step 3.5: Wave Completion Report

After all tasks in wave PASS QA:

```
📊 WAVE 1 COMPLETE ✅

Summary:
  - Tasks: 5/5 completed
  - Dev cycles: 1.2 avg (1 task needed rework)
  - Time: ~2.5 hours (vs 10 hours sequential)
  - Speedup: 4x

All tasks merged and ready for next wave.

Wave 2 ready to start (8 tasks - dependencies satisfied)

Continue to Wave 2? (y/n)
```

##### Step 3.6: Proceed to Next Wave

Repeat steps 3.1-3.5 for each subsequent wave until all waves complete.

---

### 4. Final Sprint Report

After all waves complete:

```
🎉 SPRINT EXECUTION COMPLETE

📊 Final Statistics:
  - Total tasks: 22
  - Total waves: 4
  - Tasks completed: 22 ✅
  - Tasks failed QA initially: 5 (all fixed)
  - Average dev cycles per task: 1.23

⏱️ Time Comparison:
  - Sequential estimate: 44 hours
  - Parallel actual: 11.5 hours
  - Speedup: 3.8x

👥 Team Performance:
  Developer Activity:
    - dev-1: 5 tasks (22 files, 89 tests)
    - dev-2: 4 tasks (18 files, 67 tests)
    - dev-3: 5 tasks (24 files, 93 tests)
    - dev-4: 4 tasks (16 files, 52 tests)
    - dev-5: 4 tasks (20 files, 71 tests)

  QA Activity:
    - qa-1: 8 reviews (7 pass, 1 fail)
    - qa-2: 7 reviews (5 pass, 2 fail)
    - qa-3: 7 reviews (5 pass, 2 fail)

📁 Codebase Changes:
  - Files modified: 100
  - Tests added: 372
  - Test coverage: 87%
  - Lines of code: +3,245

🚀 Next Steps:
  1. Run full integration test suite
  2. Deploy to staging environment
  3. Conduct user acceptance testing
  4. Plan next sprint

All work tracked in Archon project: {project.id}
```

---

## Manual Mode (Alternative)

If full automation isn't desired, use **manual mode**:

**Command**: `*manual-mode`

SM shows available tasks and lets user select:

```
📋 AVAILABLE TASKS (Wave 1 - No dependencies)

1. #TASK-101: Database schema setup
2. #TASK-102: Shared utility functions
3. #TASK-103: Base UI component library
4. #TASK-104: API error handling middleware
5. #TASK-105: Authentication utilities

Select tasks to assign (comma-separated numbers, or 'all'):
> 1,2,5

Spawning developers for tasks 1, 2, 5...
✅ 3 developers launched

(Wait for completion, then show next available tasks)
```

---

## Best Practices

### 1. Dependency Discipline

- **Always mark dependencies** in task descriptions
- Use exact syntax: `Depends on: #TASK-101, #TASK-102`
- Architect reviews all dependencies before handoff

### 2. Context Isolation

- Each dev/QA subagent works independently
- SM aggregates results in main context
- All state persists in Archon (not in subagent contexts)

### 3. Quality Gates

- **Never** mark task "done" without QA approval
- Failed QA tasks go back to "doing" status
- Multiple QA cycles are normal and expected

### 4. Capacity Planning

- Start conservative (3 devs, 2 QA)
- Scale up as you learn team velocity
- Monitor for resource constraints

### 5. Communication Flow

```
Developer Context → Archon (task update) ← SM Context
QA Context → Archon (task update) ← SM Context
User ← SM Context (aggregated reports)
```

---

## Troubleshooting

### Issue: Subagent fails to update Archon

**Symptom**: Task status not changing after dev completes
**Fix**: Check Archon MCP connection in subagent. May need to include MCP tools explicitly in Task tool invocation.

### Issue: Circular dependencies detected

**Symptom**: SM cannot build dependency graph
**Fix**: Review task dependencies with Architect. Circular deps indicate design flaw.

### Issue: Wave takes too long

**Symptom**: One task in wave blocks all others
**Fix**: Investigate blocker task. May need to split into smaller tasks or reassign.

### Issue: QA failures pile up

**Symptom**: Many tasks fail QA repeatedly
**Fix**: Review acceptance criteria clarity. May need better dev instructions or more detailed PRD.

---

## Development Phase Complete ✅

**What we have now**:

- All user stories implemented and tested
- Code merged to main branch
- Test coverage >80%
- Production-ready features
- Complete sprint metrics in SM context

**Ready for**:

- Deployment to staging
- User acceptance testing
- Performance testing
- Security audit

---

**See Also**:

- [greenfield-planning.md](greenfield-planning.md) - Planning phase
- [brownfield-development.md](brownfield-development.md) - Development for existing codebases
- [../agents/sm-orchestrator.md](../agents/sm-orchestrator.md) - SM Orchestrator agent
