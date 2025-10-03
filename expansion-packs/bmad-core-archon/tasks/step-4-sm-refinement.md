<!-- Powered by BMAD™ Core with Archon -->

# step-4-sm-refinement

**Workflow**: Greenfield Planning - Step 4/4 (Final)
**Agent**: `@sm`
**Duration**: 1 hour
**Previous Step**: [step-3-architect-design.md](step-3-architect-design.md)
**Next Phase**: [execute-greenfield-development.md](execute-greenfield-development.md)

---

## Objective

Final review and refinement of all user stories to ensure development-readiness.

---

## Prerequisites

- ✅ Steps 1-3 complete (Analyst, PM, Architect all done)
- ✅ PRD, Architecture, and Stories in Archon
- ✅ Dependencies and waves defined

---

## Activities

### 1. Load and Review All Stories

```python
# Get all tasks
all_tasks = mcp__archon__find_tasks(project_id=project_id)
epics = [t for t in all_tasks if t.task_order >= 90]
stories = [t for t in all_tasks if t.task_order < 90]

print(f"""
📋 Sprint Backlog Review:
   Epics: {len(epics)}
   Stories: {len(stories)}
""")
```

---

### 2. Quality Check Each Story

**Verify EVERY story has:**

- ✅ **Clear title**: User-centric, action-oriented
- ✅ **Detailed description**: User story format + context
- ✅ **Acceptance criteria**: Testable conditions (checkboxes)
- ✅ **Epic link**: `feature` field links to epic
- ✅ **Dependencies**: Marked in description (if any)
- ✅ **Appropriate size**: 2-4 hours of work

```python
# Check each story
issues = []

for story in stories:
    # Check title
    if not story.title or len(story.title) < 10:
        issues.append(f"Story #{story.id}: Title too short")

    # Check description
    if not story.description or len(story.description) < 50:
        issues.append(f"Story #{story.id}: Description missing or too brief")

    # Check acceptance criteria
    if "Acceptance Criteria:" not in story.description:
        issues.append(f"Story #{story.id}: Missing acceptance criteria")

    # Check epic link
    if not story.feature:
        issues.append(f"Story #{story.id}: Not linked to an epic (feature field empty)")

if issues:
    print("⚠️  Issues found:")
    for issue in issues:
        print(f"  - {issue}")
else:
    print("✅ All stories pass quality check!")
```

---

### 3. Refine Unclear Stories

**For any story with issues, update it:**

```python
# Example: Add missing acceptance criteria
story = mcp__archon__find_tasks(project_id=project_id, task_id="story-xyz")[0]

refined_description = f"""{story.description}

**Acceptance Criteria:**
- [ ] User can see X feature
- [ ] User can perform Y action
- [ ] System validates Z input
- [ ] Error handling for edge case A
- [ ] Unit tests pass for B functionality

**Technical Notes:**
- Use pattern ABC from architecture doc
- Follow convention XYZ
- Estimated effort: 3 hours
"""

mcp__archon__manage_task(
    action="update",
    task_id=story.id,
    description=refined_description
)
```

---

### 4. Create Project Overview

**Summarize for user review:**

```python
# Load all artifacts
prd = mcp__archon__find_documents(project_id=project_id, document_type="spec")[0]
architecture = mcp__archon__find_documents(project_id=project_id, document_type="design")[0]

# Categorize stories
wave_1 = [t for t in stories if t.task_order == 100]
wave_2 = [t for t in stories if t.task_order == 90]
wave_3 = [t for t in stories if t.task_order == 80]
wave_4 = [t for t in stories if t.task_order == 70]

overview = f"""
# 📋 Project Ready for Development!

## Project: {project.title}

### 📄 Planning Artifacts
- ✅ PRD: Product vision, features, success metrics
- ✅ Architecture: Tech stack, system design, API contracts
- ✅ Backlog: {len(stories)} refined user stories

### 🎯 Epics ({len(epics)} features)
"""

for epic in epics:
    epic_stories = [s for s in stories if s.feature == epic.feature]
    overview += f"- **{epic.title}**: {len(epic_stories)} stories\n"

overview += f"""
### 📊 Dependency Waves
- **Wave 1** (Foundation): {len(wave_1)} tasks - No dependencies, start immediately
- **Wave 2** (Core Services): {len(wave_2)} tasks - Depends on Wave 1
- **Wave 3** (UI Features): {len(wave_3)} tasks - Depends on Wave 2
- **Wave 4** (Integration): {len(wave_4)} tasks - Depends on Wave 3

### ⏱️ Estimated Timeline
- **Manual mode**: ~{len(stories) * 2} hours ({len(stories)} stories × 2h each)
- **Simple workflow**: ~{len(stories) * 1.5} hours (automated handoffs)
- **Team Lead workflow**: ~{max(len(wave_1), len(wave_2), len(wave_3), len(wave_4)) * 2} hours (parallel execution)

### 🛠️ Tech Stack
{architecture.content['tech_stack']}

---

## 🛑 USER REVIEW REQUIRED

Please review the planning artifacts before starting development:

1. Read PRD: `mcp__archon__find_documents(project_id="{project_id}", document_type="spec")`
2. Read Architecture: `mcp__archon__find_documents(project_id="{project_id}", document_type="design")`
3. Sample stories: `mcp__archon__find_tasks(project_id="{project_id}")`

**If satisfied, proceed to development phase:**
👉 [execute-greenfield-development.md](execute-greenfield-development.md)

**If changes needed:**
- PRD changes → Switch to @pm
- Architecture changes → Switch to @architect
- Story refinement → Stay with @sm
"""

print(overview)
```

---

## Deliverables ✅

- ✅ **All stories quality-checked**: Every story is development-ready
- ✅ **Issues resolved**: Any unclear stories refined
- ✅ **Project overview**: Complete summary for user review

---

## Planning Phase Complete! 🎉

**What you've accomplished:**

- ✅ Domain researched (Analyst)
- ✅ Requirements documented (PM → PRD)
- ✅ System designed (Architect → Architecture)
- ✅ Stories created and refined (PM + SM → Backlog)
- ✅ Dependencies analyzed (Architect → Waves)
- ✅ Quality verified (SM → Ready for dev)

**Timeline**: 4-8 hours total for planning

---

## Handoff to User

**Tell the user:**

```
✅ Planning phase complete! The backlog is refined and ready for development.

📊 Summary:
- {len(epics)} Epics (features)
- {len(stories)} User Stories (tasks)
- All stories have acceptance criteria
- Dependency waves defined for parallel execution

🛑 PLEASE REVIEW before proceeding:

1. View PRD: Check product vision aligns with your goals
2. View Architecture: Verify tech stack is appropriate
3. Sample Stories: Ensure quality/detail level is good

**Once approved, choose development mode:**

👉 [execute-greenfield-development.md](execute-greenfield-development.md)

Options:
- **Manual**: Do it yourself (full control, slowest)
- **Simple Workflow**: @dev + @qa sequential (moderate speed)
- **Team Lead**: Parallel execution (fastest, 5x speedup!)

Ready to start building? 🚀
```

---

## Troubleshooting

### Stories still unclear after refinement

- Use [story-draft-checklist.md](../checklists/story-draft-checklist.md)
- Add more detailed acceptance criteria
- Include technical implementation hints
- Break large stories into smaller ones

### User requests significant changes

- **PRD changes**: Hand off to `@pm`
- **Architecture changes**: Hand off to `@architect`
- **Minor refinements**: Handle as `@sm`

### Not sure about story quality

Use this checklist per story:

- [ ] Title is clear and user-centric?
- [ ] Description explains WHAT and WHY?
- [ ] Acceptance criteria are testable?
- [ ] Linked to epic via feature field?
- [ ] Sized appropriately (2-4 hours)?
- [ ] Dependencies documented (if any)?

---

## Related Tasks

- **Previous**: [step-3-architect-design.md](step-3-architect-design.md)
- **Next phase**: [execute-greenfield-development.md](execute-greenfield-development.md)
- **Story checklist**: [story-draft-checklist.md](../checklists/story-draft-checklist.md)
- **Full workflow**: [execute-greenfield-planning.md](execute-greenfield-planning.md)
