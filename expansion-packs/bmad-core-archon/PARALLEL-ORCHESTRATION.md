# Parallel Team Orchestration - Quick Start

**Version:** 3.1.0
**Feature:** Parallel development with dependency-aware task orchestration
**Speedup:** 3-5x faster than sequential development

---

## What's New?

The bmad-core-archon expansion pack now supports **parallel team orchestration** - allowing multiple AI developers and QA reviewers to work simultaneously on independent tasks while the Scrum Master Orchestrator maintains oversight and coordination.

### Key Innovation

```
Traditional BMAD:              Parallel BMAD:
Dev → Task 1 (2hr)            Dev Team Lead analyzes dependencies
Dev → Task 2 (2hr)            Wave 1: 5 devs work in parallel (2hr)
Dev → Task 3 (2hr)            Wave 1: 3 QA review in parallel (1hr)
...                           Wave 2: 8 devs work in parallel (2hr)
20 tasks = 40 hours           Wave 2: 3 QA review in parallel (1hr)
                              20 tasks = 8 hours total

                              ⚡ 5x FASTER
```

---

## Quick Start: 3-Phase Workflow

### Phase 1: Planning (Sequential - Analyst → PM → Architect)

**Workflow:** [workflows/greenfield-planning.md](workflows/greenfield-planning.md)

1. **Analyst** analyzes requirements, creates project in Archon
2. **PM** creates PRD, breaks into epics and user stories
3. **Architect** designs system, **adds dependencies to tasks**

**Key Output:** Tasks with dependency markers like:

```
Task #101: Database schema setup
Description: Create User, Post, Comment models
Depends on: None

Task #201: User signup API
Description: POST /auth/signup endpoint
Depends on: #101
```

---

### Phase 2: Development (Parallel - Dev Team Lead)

**Workflow:** [workflows/greenfield-development.md](workflows/greenfield-development.md)

**Activate Dev Team Lead:**

```
User: "Please act as the Dev Team Lead from .bmad-core-archon/agents/dev-team-lead.md"
```

**Commands:**

```bash
# 1. Analyze dependencies and build execution plan
*analyze-dependencies

# Output:
📊 PARALLEL EXECUTION PLAN
Wave 1 (5 tasks - no dependencies):
  - #TASK-101: Database schema
  - #TASK-102: Shared utilities
  - #TASK-103: UI components
  - #TASK-104: Error middleware
  - #TASK-105: Auth utilities

Wave 2 (8 tasks - depends on Wave 1):
  - #TASK-201: Signup API (depends on #101, #105)
  - #TASK-202: Login API (depends on #101, #105)
  ...

Total: 20 tasks in 4 waves
Speedup: 5x

# 2. Configure team capacity (optional)
*configure-capacity
> Max devs: 5
> Max QA: 3

# 3. Execute full sprint (automated)
*execute-sprint

# SM spawns dev subagents for Wave 1 (parallel)
# SM waits for completion, aggregates results
# SM spawns QA subagents for Wave 1 (parallel)
# SM handles failures, moves to Wave 2
# ... continues through all waves

# Output:
🎉 SPRINT COMPLETE
- 20 tasks completed in 8 hours (vs 40 sequential)
- 3 tasks needed rework (now fixed)
- Speedup: 5x
```

**What Happens Behind the Scenes:**

1. **SM analyzes graph**: Identifies which tasks can run in parallel
2. **SM spawns dev subagents**: Each dev gets ONE task with full context
3. **Devs work independently**: Separate contexts, update Archon when done
4. **SM aggregates**: Collects all reports in main context
5. **SM spawns QA subagents**: Each QA reviews ONE task
6. **QA reports back**: PASS → done, FAIL → back to dev
7. **SM proceeds**: When wave passes QA, starts next wave

---

### Phase 3: Deployment (Sequential or Parallel)

**Brownfield projects** use phased rollout:

1. Deploy with feature flag OFF
2. Enable for internal users (canary)
3. Gradual rollout: 10% → 50% → 100%

---

## How Dependency Tracking Works

### Architect Marks Dependencies

In task description (Archon):

```markdown
**Task:** User Login Page Integration

**Description:**
Integrate login form component with authentication API.

**Depends on:** #TASK-201 (Login API), #TASK-205 (Login form component)

**Acceptance Criteria:**

- User can log in with email/password
- Successful login redirects to dashboard
- Errors display clearly
```

### Dev Team Lead Parses Dependencies

```python
# SM extracts: task depends on #TASK-201, #TASK-205
# SM builds graph:
#   Wave 1: TASK-201, TASK-205 (no dependencies)
#   Wave 2: This task (depends on Wave 1)
```

### Execution Respects Graph

- **Wave 1 tasks**: No dependencies, all run in parallel
- **Wave 2 tasks**: Start only after ALL Wave 1 tasks pass QA
- **Wave 3 tasks**: Start only after ALL Wave 2 tasks pass QA

---

## Workflows

### Greenfield Projects (New Codebase)

1. **Planning**: [greenfield-planning.md](workflows/greenfield-planning.md)
   - Analyst → PM → Architect
   - Output: Archon project with dependency-tracked tasks

2. **Development**: [greenfield-development.md](workflows/greenfield-development.md)
   - Dev Team Lead coordinates parallel teams
   - Output: Tested, production-ready features

### Brownfield Projects (Existing Codebase)

1. **Planning**: [brownfield-planning.md](workflows/brownfield-planning.md)
   - Analyst analyzes existing code
   - PM creates enhancement PRD
   - Architect designs safe integration
   - Output: Tasks with dependencies AND constraints

2. **Development**: [brownfield-development.md](workflows/brownfield-development.md)
   - Dev Team Lead with enhanced safety checks
   - QA includes regression testing
   - Feature flags for safe rollout
   - Output: Enhanced system, backward compatible

---

## Agent Comparison

### Regular SM (Bob 🏃)

**Use for:**

- Creating individual stories manually
- Sprint planning
- Retrospectives

**Workflow:**

- User activates SM
- SM creates stories one by one
- User coordinates handoffs to dev/QA

### Dev Team Lead (Bob 🎯)

**Use for:**

- Executing sprints with 10+ tasks
- Parallel development teams
- Dependency management
- Automated coordination

**Workflow:**

- User activates Dev Team Lead
- SM analyzes dependencies, creates plan
- SM spawns N developers (parallel)
- SM spawns N QA reviewers (parallel)
- SM aggregates results, reports progress
- Fully automated wave execution

---

## Real-World Example

**Project:** E-commerce platform authentication feature

**Planning Phase (6 hours):**

- Analyst: Research authentication patterns (2hr)
- PM: Create PRD, 20 user stories (2hr)
- Architect: Design system, mark dependencies (2hr)

**Development Phase (Traditional: 40hr → Parallel: 8hr):**

```
Traditional Sequential:
- Dev implements Task 1: DB schema (2hr)
- Dev implements Task 2: Auth service (2hr)
- Dev implements Task 3: Signup API (2hr)
- Dev implements Task 4: Login API (2hr)
- Dev implements Task 5: Password reset (2hr)
  ... (15 more tasks)
- QA reviews all 20 tasks (10hr)
Total: 40 + 10 = 50 hours

Parallel Orchestration:
- SM analyzes dependencies (5min)
- Wave 1: 5 devs work in parallel (2hr)
  * TASK-1: DB schema
  * TASK-2: Auth utilities
  * TASK-3: Error handling
  * TASK-4: Base components
  * TASK-5: Email service
- Wave 1 QA: 3 QA review in parallel (1hr)
- Wave 2: 5 devs work in parallel (2hr)
  * TASK-6: Signup API
  * TASK-7: Login API
  * TASK-8: Password reset API
  * TASK-9: Login form
  * TASK-10: Signup form
- Wave 2 QA: 3 QA review in parallel (1hr)
- Wave 3: 5 devs work in parallel (2hr)
  * TASK-11-15: Integration tasks
- Wave 3 QA: 3 QA review (1hr)
- Wave 4: 5 devs work in parallel (2hr)
  * TASK-16-20: E2E tests, docs
- Wave 4 QA: 3 QA review (1hr)

Total: 8 hours development + 4 hours QA = 12 hours
Speedup: 50 / 12 = 4.2x
```

**Total Project Time:**

- Planning: 6 hours (same)
- Development: 50 hours → 12 hours (4.2x faster)
- **Total: 56 hours → 18 hours (3.1x faster overall)**

---

## Configuration

### Subagent Setup

```bash
# Run setup script (from project root)
cd .bmad-core-archon
./setup-bmad-subagents.sh

# Creates .claude_code/agents/ with 9 subagents:
# - analyst, pm, architect, dev, qa, po, sm, dev-team-lead, ux-expert
```

### Capacity Configuration

During sprint execution:

```
*configure-capacity

How many parallel developers? (default: 3, max: 10)
> 5

How many parallel QA reviewers? (default: 2, max: 5)
> 3

✅ Capacity configured
```

**Recommendations:**

- **Small projects** (5-10 tasks): 2 devs, 1 QA
- **Medium projects** (10-30 tasks): 3-5 devs, 2-3 QA
- **Large projects** (30+ tasks): 5-10 devs, 3-5 QA

---

## Best Practices

### 1. Dependency Precision

**Good:**

```
Depends on: #TASK-101, #TASK-102
```

**Bad:**

```
Depends on the authentication stuff being done
```

Dev Team Lead parses exact task IDs only.

### 2. Task Granularity

**Good:** Tasks are 30min - 4hr each

- "Create User model with validation"
- "Write unit tests for User model"
- "Implement POST /auth/signup endpoint"

**Bad:** Tasks are too large or too small

- "Build entire authentication system" (too large)
- "Add one line of code" (too small)

### 3. Wave Organization

**Architect should organize by wave:**

- **Wave 1**: Foundation (DB, utilities, base components)
- **Wave 2**: Core logic (APIs, services)
- **Wave 3**: Integration (UI forms, workflows)
- **Wave 4**: Testing (E2E tests, documentation)

Use `task_order` field:

- Wave 1: task_order = 100
- Wave 2: task_order = 90
- Wave 3: task_order = 80
- Wave 4: task_order = 70

### 4. Context Isolation Benefits

Each dev/QA subagent:

- ✅ Clean, focused context (only their task)
- ✅ No distraction from other tasks
- ✅ Better code quality
- ✅ Easier debugging

Dev Team Lead:

- ✅ Sees all progress in one place
- ✅ Aggregates all results
- ✅ Maintains project overview

---

## Troubleshooting

### Issue: Circular dependencies detected

**Symptom:**

```
❌ ERROR: Circular dependency detected
Remaining tasks: #TASK-201, #TASK-202
```

**Fix:** Review with Architect, remove circular references

### Issue: Tasks take longer than expected

**Symptom:** Wave 1 estimated 2hr, actual 4hr

**Fix:**

- Increase time estimates
- Break large tasks into smaller ones
- Reduce parallel capacity (fewer devs = more context per dev)

### Issue: Many QA failures

**Symptom:** 50% of tasks fail QA on first pass

**Fix:**

- Review acceptance criteria clarity
- Improve PRD detail
- Add more specific constraints to tasks
- Consider pair programming for high-risk tasks

---

## Performance Metrics

**Typical Speedup by Project Size:**

| Project Size | Tasks | Sequential | Parallel (5 devs) | Speedup |
| ------------ | ----- | ---------- | ----------------- | ------- |
| Small        | 5-10  | 10-20hr    | 4-6hr             | 2.5x    |
| Medium       | 10-30 | 20-60hr    | 8-15hr            | 3.5x    |
| Large        | 30+   | 60-120hr   | 15-30hr           | 4.5x    |

**Factors affecting speedup:**

- Number of parallel developers (more = faster)
- Dependency depth (fewer waves = faster)
- Task independence (more parallel work = faster)
- QA failure rate (fewer failures = faster)

---

## Next Steps

1. **Read Planning Workflow:**
   - [greenfield-planning.md](workflows/greenfield-planning.md) for new projects
   - [brownfield-planning.md](workflows/brownfield-planning.md) for existing code

2. **Read Development Workflow:**
   - [greenfield-development.md](workflows/greenfield-development.md) for new projects
   - [brownfield-development.md](workflows/brownfield-development.md) for existing code

3. **Setup Subagents:**

   ```bash
   ./setup-bmad-subagents.sh
   ```

4. **Try It Out:**
   - Start a small project (5-10 tasks)
   - Use Architect to mark dependencies
   - Activate Dev Team Lead
   - Run `*execute-sprint`
   - Observe the speedup!

---

## Additional Resources

- **README_DETAILED.md** - Complete technical deep dive
- **MULTI-AGENT-WORKFLOWS.md** - Subagent patterns and party mode
- **agents/dev-team-lead.md** - Full Dev Team Lead definition
- **tasks/analyze-task-dependencies.md** - Dependency analysis details
- **tasks/execute-parallel-sprint.md** - Sprint execution details

---

**Questions or Issues?**
File an issue at: https://github.com/anthropics/bmad-method/issues
