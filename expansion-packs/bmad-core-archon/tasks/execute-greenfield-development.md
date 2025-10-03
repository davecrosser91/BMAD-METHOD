<!-- Powered by BMAD™ Core with Archon -->

# execute-greenfield-development

**Type**: Orchestration Task
**Phase**: Development & Implementation
**Duration**: Varies (8-40 hours depending on mode)
**Output**: Fully implemented and tested features

---

## Overview

This task orchestrates the **development phase** after planning is complete. You choose the execution mode based on project size and desired level of automation.

**Use this when**: Planning phase complete, backlog refined, ready to build

**Prerequisites**: [execute-greenfield-planning.md](execute-greenfield-planning.md) must be complete

---

## Prerequisites

- ✅ Archon project with PRD, Architecture, and refined backlog
- ✅ All user stories have acceptance criteria
- ✅ Dependencies analyzed (if using Team Lead mode)
- ✅ User approved the plan

---

## Choose Your Execution Mode

### **Option A: Manual Mode** 👤

**Best for**: Small projects (5-10 stories), learning BMAD

**How it works**: You implement each story yourself

**Steps**:

```python
# 1. Get tasks from Archon
tasks = mcp__archon__find_tasks(project_id, filter_by="status", filter_value="todo")

# 2. Pick a task
task = tasks[0]

# 3. Implement it
# [Your development work]

# 4. Mark complete
mcp__archon__manage_task("update", task_id=task.id, status="done")

# 5. Repeat for next task
```

**Timeline**: ~2 hours per story × 10 stories = **20 hours**

---

### **Option B: Simple Workflow** 🤖

**Best for**: Medium projects (10-20 stories), want AI help but keep control

**How it works**: Sequential agent workflow (Dev → QA → repeat)

**Task**: [step-1-simple-dev-qa-loop.md](step-1-simple-dev-qa-loop.md)

**Steps**:

```python
# For each story:

# 1. Activate @dev
@dev: "Please implement task #TASK-101 from Archon project {project_id}"
# Dev works, marks as status="review"

# 2. Activate @qa
@qa: "Please review task #TASK-101 from Archon project {project_id}"
# QA tests, marks as status="done" or returns to dev

# 3. Repeat for next story
```

**Timeline**: ~1.5 hours per story × 20 stories = **30 hours**

**Advantages**:

- ✅ Automated dev/QA handoffs
- ✅ Consistent quality checks
- ✅ Full visibility (happens in chat)

---

### **Option C: Team Lead Workflow** 🎯

**Best for**: Large projects (20+ stories), clear dependencies, want coordination

**How it works**: Coordinated development with dependency-aware waves (in-context by default, parallel subagents optional)

**Task**: [step-2-parallel-team-execution.md](step-2-parallel-team-execution.md)

**Agent**: `@dev-team-lead`

**Steps**:

```python
# Activate Dev Team Lead
@dev-team-lead: "Please execute sprint for project {project_id}"

# Team Lead will (IN-CONTEXT by default):
# 1. Analyze dependency graph
# 2. Identify Wave 1 (no dependencies) → work through tasks in this chat
# 3. Execute QA reviews in this chat
# 4. Process results → start Wave 2
# 5. Repeat until all waves complete

# For parallel execution with subagents (when explicitly requested):
@dev-team-lead: "Please execute sprint with parallel subagents for project {project_id}"
# or use *execute-sprint-parallel command
```

**Timeline**:

- In-context: ~30 hours for 20 stories (sequential, full visibility)
- Parallel subagents: ~8 hours for 20 stories (5x faster, less visibility)

**Advantages**:

- ✅ Dependency-aware execution
- ✅ Automated coordination
- ✅ In-context by default (full visibility)
- ✅ Parallel mode optional (3-5x faster when explicitly requested)

**Requirements**:

- Dependencies must be clearly marked
- Tasks must be well-scoped (2-4 hours each)
- User trusts the process

---

## Mode Comparison

| Aspect           | Manual        | Simple Workflow | Team Lead (In-Context) | Team Lead (Parallel) |
| ---------------- | ------------- | --------------- | ---------------------- | -------------------- |
| **Speed**        | 1x (baseline) | 1.5x            | 1.5x                   | 5x                   |
| **Control**      | 🔥🔥🔥 Full   | 🔥🔥 High       | 🔥🔥 High              | 🔥 Medium            |
| **Visibility**   | 100%          | 100%            | 100%                   | ~30%                 |
| **Setup Effort** | None          | Low             | Medium                 | Medium               |
| **Best For**     | 5-10 stories  | 10-20 stories   | 20+ stories            | 50+ stories          |
| **Timeline**     | 20h for 10    | 30h for 20      | 30h for 20             | 8h for 20            |

---

## Execution

### If Manual Mode

Task: [step-1-simple-dev-qa-loop.md](step-1-simple-dev-qa-loop.md) (do it yourself, no agents)

---

### If Simple Workflow

Task: [step-1-simple-dev-qa-loop.md](step-1-simple-dev-qa-loop.md)

**Loop through all stories:**

1. `@dev` implements story
2. `@qa` reviews story
3. Repeat

---

### If Team Lead Mode

Task: [step-2-parallel-team-execution.md](step-2-parallel-team-execution.md)

**Activate once:**

```
@dev-team-lead: "Execute parallel sprint for project {project_id}"
```

**Monitor progress** via Archon:

```python
# Check status
tasks = mcp__archon__find_tasks(project_id)
done = [t for t in tasks if t.status == "done"]
print(f"Progress: {len(done)}/{len(tasks)} tasks complete")
```

---

## Development Phase Complete ✅

**What you have now**:

- ✅ All user stories implemented
- ✅ All features tested by QA
- ✅ All tasks marked "done" in Archon
- ✅ Working software ready for deployment

**Next Steps**:

1. **Integration testing**: Test full system end-to-end
2. **Deployment**: Deploy to staging/production
3. **Retrospective**: Review what went well, what to improve

---

## Monitoring Progress

### Check Archon Task Status

```python
# Get all tasks
all_tasks = mcp__archon__find_tasks(project_id)

# Count by status
todo = len([t for t in all_tasks if t.status == "todo"])
doing = len([t for t in all_tasks if t.status == "doing"])
review = len([t for t in all_tasks if t.status == "review"])
done = len([t for t in all_tasks if t.status == "done"])

print(f"""
📊 Sprint Progress:
   TODO: {todo}
   DOING: {doing}
   REVIEW: {review}
   ✅ DONE: {done}
   Total: {len(all_tasks)}
""")
```

### Check Epic Completion

```python
# Get tasks by epic
epics = mcp__archon__find_tasks(project_id, filter_by="status", filter_value="todo")
epics = [t for t in epics if t.task_order >= 90]  # Epics have high task_order

for epic in epics:
    stories = mcp__archon__find_tasks(project_id, query=epic.feature)
    done = len([s for s in stories if s.status == "done"])
    print(f"{epic.title}: {done}/{len(stories)} stories complete")
```

---

## Troubleshooting

### Tasks stuck in "review"

- Check if QA agent reviewed them
- May need manual intervention
- Switch to `@qa` and ask to review specific tasks

### Dependencies blocking progress (Team Lead mode)

- Verify dependency graph is correct
- May need to manually unblock by updating task status
- Check with `@architect` if dependencies need adjustment

### Dev subagent failed to implement correctly

- Return task to "todo" status
- Reassign or implement manually
- Review acceptance criteria clarity

---

## Related

- **Planning phase**: [execute-greenfield-planning.md](execute-greenfield-planning.md)
- **Team Lead details**: [step-2-parallel-team-execution.md](step-2-parallel-team-execution.md)
- **Simple workflow**: [step-1-simple-dev-qa-loop.md](step-1-simple-dev-qa-loop.md)
- **Full workflow docs**: [greenfield-development.md](../workflows/greenfield-development.md)
