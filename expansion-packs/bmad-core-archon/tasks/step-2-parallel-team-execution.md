<!-- Powered by BMAD™ Core with Archon -->

# step-2-parallel-team-execution

**Workflow**: Greenfield Development - Team Lead Mode
**Agent**: `@dev-team-lead`
**Duration**: ~8 hours for 20 stories (5x speedup!)
**Use When**: 20+ stories, dependencies clear, need speed

---

## Overview

Parallel development workflow using Dev Team Lead to coordinate multiple dev and QA subagents simultaneously. Analyzes dependencies and executes in waves.

**Alternative**: For simpler projects, use [step-1-simple-dev-qa-loop.md](step-1-simple-dev-qa-loop.md)

---

## Prerequisites

- ✅ Planning complete ([execute-greenfield-planning.md](execute-greenfield-planning.md))
- ✅ **Dependencies clearly marked** (Architect did this in Step 3)
- ✅ **Tasks organized into waves** (task_order indicates wave)
- ✅ Stories are well-scoped (2-4 hours each)

---

## How It Works

```
                          Dev Team Lead
                                |
                    ┌───────────┼───────────┐
                    ▼           ▼           ▼
              Wave 1 (Parallel - No Dependencies)
                Dev #1        Dev #2        Dev #3
                  ↓             ↓             ↓
                QA #1         QA #2         QA #3
                    |           |             |
                    └───────────┼─────────────┘
                                ▼
              Wave 2 (Parallel - Depends on Wave 1)
                Dev #1        Dev #2
                  ↓             ↓
                QA #1         QA #2
                    |           |
                    └───────────┼───
                                ▼
                            Wave 3...
```

**Key concept**: Tasks with no dependencies run in parallel!

---

## Execution

### Activate Dev Team Lead

**Single command:**

```
@dev-team-lead: "Please execute the sprint using parallel team workflow for project {project_id}.

Analyze dependencies, organize into waves, and coordinate dev/qa subagents for all stories.
Report progress after each wave completes."
```

**That's it!** Dev Team Lead will:

1. ✅ Load backlog from Archon
2. ✅ Read PRD and Architecture
3. ✅ Analyze task dependencies
4. ✅ Identify Wave 1 (no dependencies)
5. ✅ Spawn 3-5 dev subagents for Wave 1 tasks
6. ✅ Wait for all devs to complete
7. ✅ Spawn 3-5 QA subagents to review
8. ✅ Process QA results (pass/fail)
9. ✅ Start Wave 2 (depends on Wave 1)
10. ✅ Repeat until all waves complete
11. ✅ Report final results

---

## What Dev Team Lead Does

### Phase 1: Analysis

```python
# Team Lead analyzes backlog
all_tasks = mcp__archon__find_tasks(project_id=project_id)
stories = [t for t in all_tasks if t.status == "todo" and t.task_order < 90]

# Identify waves by task_order
wave_1 = [t for t in stories if t.task_order == 100]  # Foundation
wave_2 = [t for t in stories if t.task_order == 90]   # Core services
wave_3 = [t for t in stories if t.task_order == 80]   # UI features
wave_4 = [t for t in stories if t.task_order == 70]   # Integration

# Team Lead reports plan to user
print(f"""
📊 Sprint Execution Plan:
   Wave 1: {len(wave_1)} tasks (start immediately)
   Wave 2: {len(wave_2)} tasks (after Wave 1)
   Wave 3: {len(wave_3)} tasks (after Wave 2)
   Wave 4: {len(wave_4)} tasks (after Wave 3)

🚀 Starting Wave 1...
""")
```

---

### Phase 2: Wave Execution

**For each wave:**

```python
# 1. Spawn dev subagents (max 5 parallel)
for task in wave_1_tasks[:5]:  # Limit to 5 simultaneous
    # Team Lead uses Task tool to spawn dev subagent
    spawn_dev_subagent(task_id=task.id, project_id=project_id)

# 2. Wait for all devs to complete
# (Team Lead monitors task status in Archon)

# 3. Spawn QA subagents for completed tasks
review_tasks = [t for t in wave_1_tasks if t.status == "review"]
for task in review_tasks:
    spawn_qa_subagent(task_id=task.id, project_id=project_id)

# 4. Process QA results
# PASS → status="done"
# FAIL → status="doing", re-assign to dev

# 5. Report wave completion
print(f"""
✅ Wave 1 Complete!
   Passed: {passed_count}/{len(wave_1)}
   Failed: {failed_count} (reassigned to devs)

🚀 Starting Wave 2...
""")
```

---

## Timeline Example

**Project with 20 stories in 4 waves:**

| Wave   | Tasks   | Duration | Parallelization                 |
| ------ | ------- | -------- | ------------------------------- |
| Wave 1 | 5 tasks | 2h       | 5 devs parallel → 2h (not 10h!) |
| Wave 2 | 6 tasks | 2.5h     | 5 devs parallel → 2.5h          |
| Wave 3 | 7 tasks | 3h       | 5 devs parallel → 3h            |
| Wave 4 | 2 tasks | 0.5h     | 2 devs parallel → 0.5h          |

**Total**: ~8 hours (vs 30h sequential, vs 40h manual)

**Speedup**: **5x faster!**

---

## Monitoring Progress

**Team Lead reports after each wave:**

```
📊 WAVE 1 COMPLETE

✅ Completed (4/5):
  - #TASK-101: User signup API
  - #TASK-102: Database schema
  - #TASK-103: Auth middleware
  - #TASK-104: Base React components

⚠️ Needs Rework (1/5):
  - #TASK-105: Login API
    Issues: Tests failing, missing error handling

🎯 Next Actions:
  1. Fix #TASK-105 (reassigned to dev subagent)
  2. Once fixed, proceed to Wave 2 (6 tasks ready)
```

**You can also check Archon directly:**

```python
# Check current status
all_tasks = mcp__archon__find_tasks(project_id=project_id)
stories = [t for t in all_tasks if t.task_order < 90]

by_status = {
    "todo": len([t for t in stories if t.status == "todo"]),
    "doing": len([t for t in stories if t.status == "doing"]),
    "review": len([t for t in stories if t.status == "review"]),
    "done": len([t for t in stories if t.status == "done"])
}

print(f"Progress: {by_status['done']}/{len(stories)} complete")
```

---

## Advantages

✅ **Speed**: 5x faster through parallelization
✅ **Dependency-aware**: Respects task dependencies automatically
✅ **Scalable**: Handles 20, 50, 100+ stories efficiently
✅ **Automated**: Minimal manual intervention needed

---

## Disadvantages

⚠️ **Less visibility**: Subagents work in background (you don't see every action)
⚠️ **Requires setup**: Dependencies must be clearly marked
⚠️ **Trust needed**: Less control over individual implementations
⚠️ **Debugging harder**: If something goes wrong, harder to trace

---

## When to Use

**Use Team Lead when:**

- ✅ 20+ user stories
- ✅ Dependencies clearly documented (Architect did this)
- ✅ Stories well-scoped (2-4 hours each)
- ✅ You trust the process and want speed

**Use Simple Workflow when:**

- ⚠️ < 20 stories (not worth the overhead)
- ⚠️ Dependencies unclear or complex
- ⚠️ Stories vary widely in size
- ⚠️ You want full visibility

---

## Troubleshooting

### Wave stuck (tasks not completing)

```python
# Check what's blocking
doing_tasks = mcp__archon__find_tasks(
    project_id=project_id,
    filter_by="status",
    filter_value="doing"
)

print(f"Tasks in progress: {len(doing_tasks)}")
for task in doing_tasks:
    print(f"  - {task.title} (assigned to: {task.assignee})")
```

**Solutions:**

- Manually complete stuck tasks
- Check if subagent failed (review task notes)
- May need to re-implement manually

---

### QA failing too many tasks

**Check acceptance criteria clarity:**

```python
# Review failed tasks
failed = [t for t in all_tasks if "FAIL" in t.description]
for task in failed:
    print(f"Failed: {task.title}")
    print(f"QA feedback: {task.description.split('QA feedback:')[-1]}")
```

**Solutions:**

- Refine acceptance criteria (make more specific)
- Manually review QA feedback and override if too strict
- Re-run with clearer requirements

---

### Dependencies incorrect (blocking wrong tasks)

**Update dependency markers:**

```python
# Fix incorrect dependency
task = mcp__archon__find_tasks(project_id=project_id, task_id="story-xyz")[0]

# Remove or update dependency info in description
updated_desc = task.description.replace("Depends on: #task-abc", "")

mcp__archon__manage_task("update", task_id=task.id, description=updated_desc)
```

**Or switch waves:**

```python
# Move task to earlier wave
mcp__archon__manage_task("update", task_id=task.id, task_order=100)  # Move to Wave 1
```

---

## After Completion

**Team Lead will report:**

```
🎉 Sprint Complete!

📊 Final Results:
   Total stories: 20
   ✅ Completed: 18
   ⚠️ Needs manual review: 2

Completion time: ~8 hours (5x speedup vs sequential)

Next steps:
1. Review the 2 tasks flagged for manual attention
2. Run integration tests
3. Deploy to staging
```

---

## Related Tasks

- **Simpler alternative**: [step-1-simple-dev-qa-loop.md](step-1-simple-dev-qa-loop.md)
- **Full workflow**: [execute-greenfield-development.md](execute-greenfield-development.md)
- **Planning phase**: [execute-greenfield-planning.md](execute-greenfield-planning.md)
- **Dependency analysis**: [analyze-task-dependencies.md](analyze-task-dependencies.md)
