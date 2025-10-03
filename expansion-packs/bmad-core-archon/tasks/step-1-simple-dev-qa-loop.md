<!-- Powered by BMAD™ Core with Archon -->

# step-1-simple-dev-qa-loop

**Workflow**: Greenfield Development - Simple Workflow
**Agents**: `@dev` → `@qa` (sequential loop)
**Duration**: ~1.5 hours per story
**Use When**: 10-20 stories, want automation with control

---

## Overview

Simple sequential workflow where Dev and QA agents work on one story at a time. Good balance between automation and visibility.

**Alternative**: For faster execution with 20+ stories, use [step-2-parallel-team-execution.md](step-2-parallel-team-execution.md)

---

## Prerequisites

- ✅ Planning complete ([execute-greenfield-planning.md](execute-greenfield-planning.md))
- ✅ Backlog refined in Archon
- ✅ `project_id` available

---

## Workflow Loop

### Get Next Story

```python
# Get all todo tasks
todo_tasks = mcp__archon__find_tasks(
    project_id=project_id,
    filter_by="status",
    filter_value="todo"
)

# Sort by task_order (highest first = earliest wave)
todo_tasks.sort(key=lambda t: t.task_order, reverse=True)

next_story = todo_tasks[0]
print(f"Next story: {next_story.title} (ID: {next_story.id})")
```

---

### Step A: Development (`@dev`)

**Activate Dev agent:**

```
@dev: "Please implement task #{next_story.id} from Archon project {project_id}.

The task details are in Archon. Please:
1. Read the PRD and Architecture docs
2. Implement the feature according to acceptance criteria
3. Write unit tests
4. Mark as status='review' when complete
"
```

**Dev agent will:**

1. ✅ Load task from Archon
2. ✅ Read PRD and Architecture for context
3. ✅ Implement feature
4. ✅ Write tests
5. ✅ Update task status to "review"
6. ✅ Add implementation notes to task description

**Wait for dev to finish** before proceeding!

---

### Step B: QA Review (`@qa`)

**Activate QA agent:**

```
@qa: "Please review task #{next_story.id} from Archon project {project_id}.

The developer has marked it as 'review'. Please:
1. Verify acceptance criteria are met
2. Run tests and check they pass
3. Test the feature manually if applicable
4. Either mark as 'done' (pass) or return to 'doing' (fail) with feedback
"
```

**QA agent will:**

1. ✅ Load task from Archon
2. ✅ Read implementation notes from dev
3. ✅ Review code quality
4. ✅ Run tests
5. ✅ Verify acceptance criteria
6. ✅ Update status:
   - **PASS**: status="done"
   - **FAIL**: status="doing" + append feedback

**Wait for QA to finish!**

---

### Step C: Handle Result

**If QA passed (status="done"):**

```python
# Move to next story
print(f"✅ Story #{next_story.id} complete!")
# Go back to "Get Next Story"
```

**If QA failed (status="doing"):**

```python
# Re-activate @dev with QA feedback
@dev: "Task #{next_story.id} failed QA review. Please address the feedback and re-submit."

# Dev will fix → mark as "review" → QA reviews again
```

---

### Step D: Repeat

**Continue until all stories done:**

```python
# Check progress
all_tasks = mcp__archon__find_tasks(project_id=project_id)
stories = [t for t in all_tasks if t.task_order < 90]  # Exclude epics
done = [t for t in stories if t.status == "done"]

print(f"""
📊 Progress: {len(done)}/{len(stories)} stories complete
   {len(stories) - len(done)} remaining
""")

if len(done) == len(stories):
    print("🎉 All stories complete! Development phase done!")
else:
    print("👉 Continue with next story...")
```

---

## Timeline Example

**Project with 20 stories:**

- **Per story**: ~1.5 hours (dev + qa)
- **Total**: ~30 hours
- **Speedup vs manual**: ~1.5x (automated handoffs)

---

## Advantages

✅ **Visibility**: All work happens in chat, you see everything
✅ **Quality**: Every story reviewed by QA
✅ **Control**: Can intervene at any point
✅ **Simple**: Easy to understand and manage

---

## Disadvantages

⚠️ **Sequential**: One story at a time (slow for large backlogs)
⚠️ **Manual coordination**: You manually activate agents for each story
⚠️ **No parallelization**: Can't take advantage of independent tasks

---

## Optimization Tips

### Batch Similar Stories

If multiple stories are similar (e.g., all CRUD endpoints), activate @dev with multiple tasks:

```
@dev: "Please implement tasks #101, #102, #103 from Archon (all CRUD endpoints)"
```

### Skip QA for Trivial Changes

For very small changes (typos, docs), you can manually mark as "done":

```python
mcp__archon__manage_task("update", task_id="story-xyz", status="done")
```

### Switch to Team Lead if Too Slow

If you have 20+ stories and this is taking too long:
👉 [step-2-parallel-team-execution.md](step-2-parallel-team-execution.md)

---

## Monitoring Progress

```python
# Real-time dashboard
def show_progress():
    all_tasks = mcp__archon__find_tasks(project_id=project_id)
    stories = [t for t in all_tasks if t.task_order < 90]

    by_status = {
        "todo": len([t for t in stories if t.status == "todo"]),
        "doing": len([t for t in stories if t.status == "doing"]),
        "review": len([t for t in stories if t.status == "review"]),
        "done": len([t for t in stories if t.status == "done"])
    }

    print(f"""
    📊 Sprint Dashboard:
       TODO: {by_status['todo']}
       DOING: {by_status['doing']} ← Dev working
       REVIEW: {by_status['review']} ← QA reviewing
       ✅ DONE: {by_status['done']}

       Progress: {by_status['done']}/{len(stories)} ({by_status['done']/len(stories)*100:.1f}%)
    """)

# Call periodically to check status
show_progress()
```

---

## Troubleshooting

### Dev agent stuck or not making progress

- Check task description clarity
- May need to provide more technical guidance
- Can manually implement and mark as "review"

### QA agent too strict/lenient

- Review acceptance criteria (may be too vague/specific)
- Can manually override QA decision if needed

### Stories blocking each other

- Check dependencies in task descriptions
- May need to implement prerequisite tasks first
- Consider switching to Team Lead for dependency management

---

## Related Tasks

- **Faster alternative**: [step-2-parallel-team-execution.md](step-2-parallel-team-execution.md)
- **Full workflow**: [execute-greenfield-development.md](execute-greenfield-development.md)
- **Planning phase**: [execute-greenfield-planning.md](execute-greenfield-planning.md)
