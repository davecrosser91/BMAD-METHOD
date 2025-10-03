<!-- Powered by BMAD™ Core with Archon -->

# development-kickoff

**Phase**: User Review & Development Mode Selection
**Prerequisites**: Planning phase complete (Analyst → PM → Architect → SM)
**Your Role**: Review planning artifacts and choose execution mode

---

## Overview

After the planning phase, YOU (the user) review all artifacts and decide how to execute development. This workflow guides you through the review process and helps you choose the right execution mode for your project.

**You are in control** - nothing happens without your approval.

---

## Step 1: Review Planning Artifacts

### Load Project Overview

Activate the Scrum Master to see what was created:

```
User: "Please act as the Scrum Master from .bmad-core-archon/agents/sm.md"

SM: *archon-status
```

**You should see:**

```
📋 PROJECT STATUS

📄 Documents:
  - PRD: "E-Commerce Platform Requirements" (spec)
  - Architecture: "System Architecture Document" (design)

📊 Backlog:
  - Epics: 4
    • Epic: User Authentication (12 stories)
    • Epic: Product Catalog (8 stories)
    • Epic: Shopping Cart (6 stories)
    • Epic: Payment Processing (10 stories)

  - User Stories: 36 total
    • Todo: 36
    • Refined: Yes (all have acceptance criteria)
    • Dependencies: Marked by Architect
```

### Review Documents

Ask SM to show you the details:

```
User: "Show me the PRD summary"
User: "Show me the Architecture summary"
User: "Show me the first 5 user stories"
```

### Review Dependencies

Check if dependencies are properly marked:

```
User: "Show me stories with dependencies"
```

You should see task descriptions with:

```
Depends on: #TASK-101, #TASK-102
```

---

## Step 2: Request Changes (if needed)

If anything is unclear or incomplete:

### Option A: Refine with SM

```
User: "Please refine story #TASK-105 - add more detail about error handling"
User: "Add acceptance criteria to story #TASK-201"
```

### Option B: Go back to Architect

```
User: (switch to Architect)
"Please review dependencies for the Shopping Cart epic - Task 305 seems to have circular dependencies"
```

### Option C: Go back to PM

```
User: (switch to PM)
"The Payment Processing epic is too large - can you break it into smaller epics?"
```

**Iterate until you're satisfied!**

---

## Step 3: Choose Execution Mode

Once planning is complete and approved, you have **3 execution modes**:

---

### **Option A: Manual Mode** 👤 (Full Control)

**Use when:**

- Small project (5-10 stories)
- Want to learn the BMAD process
- Need to understand each step
- Have complex edge cases

**How it works:**

```
You coordinate everything:

1. User: "Activate Dev agent"
   Dev: Implements Task 1
   Dev: Updates Archon, reports completion

2. User: "Activate QA agent"
   QA: Tests Task 1
   QA: Reports PASS/FAIL

3. If FAIL:
   User: "Activate Dev agent to fix bugs"
   (repeat)

4. If PASS:
   User: "Activate Dev agent for Task 2"
   (repeat)

You control every handoff
```

**Pros:**

- ✅ Full visibility
- ✅ Learn the process
- ✅ Control over every step

**Cons:**

- ❌ Slowest (sequential)
- ❌ Manual coordination
- ❌ Time-consuming for large projects

**Time estimate:**

- 10 stories × 2hr/story = 20 hours

---

### **Option B: Simple Workflow** 🤖 (Moderate Automation)

**Use when:**

- Medium project (10-20 stories)
- Stories are independent (few dependencies)
- Want some automation but not full parallelization
- Comfortable with sequential execution

**How it works:**

```
Activate a simple dev workflow:

User: "Please run the simple dev workflow for all todo stories"

Agent does:
1. Get next story from backlog (status="todo")
2. Switch to dev mode
3. Implement story
4. Update Archon (status="review")
5. Switch to QA mode
6. Test implementation
7. Update Archon (status="done" or "doing" if failed)
8. If failed, retry dev
9. Move to next story
10. Report progress to user

User sees progress updates throughout
```

**Pros:**

- ✅ Automated handoffs
- ✅ Less manual work
- ✅ Progress visibility

**Cons:**

- ❌ Still sequential (one story at a time)
- ❌ Doesn't leverage dependencies for parallelization
- ❌ Moderate speed

**Time estimate:**

- 20 stories × 1.5hr/story = 30 hours

---

### **Option C: Team Lead Workflow** 🎯 (Parallel Teams - Fastest)

**Use when:**

- Large project (20+ stories)
- Dependencies are properly marked
- Want maximum speed (3-5x faster)
- Ready for full automation

**How it works:**

```
Activate the Dev Team Lead:

User: "Please act as the Dev Team Lead from .bmad-core-archon/agents/dev-team-lead.md"

Team Lead: *project-overview
(Shows PRD, Architecture, Epics, Backlog)

Team Lead: *analyze-dependencies
(Shows execution plan with waves)

Output:
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
  - ...

4 waves total, 20 tasks
Time estimate: 8 hours (vs 40 sequential)
Speedup: 5x

User: "Looks good, proceed"

Team Lead: *configure-capacity
> Max devs: 5
> Max QA: 3

Team Lead: *execute-sprint

[Spawns 5 dev subagents for Wave 1]
[Each dev works independently]
[All report back to Team Lead]

[Spawns 3 QA subagents for Wave 1]
[Each QA tests independently]
[All report verdicts]

[Proceeds to Wave 2...]

Team Lead: Reports final sprint summary
```

**Pros:**

- ✅ **3-5x faster** than sequential
- ✅ Parallel execution where possible
- ✅ Dependency-aware (correct order)
- ✅ Full automation
- ✅ Team Lead maintains oversight

**Cons:**

- ❌ Requires well-defined dependencies
- ❌ Less visibility into individual dev work
- ❌ More complex (but faster)

**Time estimate:**

- 20 tasks in 4 waves × 2hr/wave = 8 hours (5x speedup!)

---

## Step 4: Execute Your Chosen Mode

### For Manual Mode:

```
User: "Please act as the Dev agent from .bmad-core-archon/agents/dev.md"
User: "Implement task #TASK-101"
```

### For Simple Workflow:

```
User: "Please run the simple development workflow"
(Agent implements all stories sequentially with automated dev/QA handoffs)
```

### For Team Lead Workflow:

```
User: "Please act as the Dev Team Lead from .bmad-core-archon/agents/dev-team-lead.md"
Team Lead: *analyze-dependencies
User: "Proceed with execution"
Team Lead: *execute-sprint
```

---

## Decision Matrix

| Factor           | Manual                   | Simple              | Team Lead               |
| ---------------- | ------------------------ | ------------------- | ----------------------- |
| **Story Count**  | 5-10                     | 10-20               | 20+                     |
| **Dependencies** | Any                      | Few                 | Well-defined            |
| **Speed**        | Slow                     | Moderate            | Fast (3-5x)             |
| **Control**      | Full                     | Moderate            | Automated               |
| **Learning**     | Best                     | Good                | Advanced                |
| **Setup Time**   | None                     | Low                 | Medium                  |
| **Best For**     | Learning, small projects | Independent stories | Large, complex projects |

---

## Recommended Approach

### First Time Using BMAD?

→ **Start with Manual Mode** (Option A)

- Learn the process
- Understand agent handoffs
- See how Archon tracks everything

### Familiar with BMAD?

→ **Use Simple Workflow** (Option B) for medium projects

- Faster than manual
- Still manageable
- Good for 10-20 stories

### Need Maximum Speed?

→ **Use Team Lead Workflow** (Option C)

- Requires good planning (Architect must mark dependencies)
- 3-5x faster
- Best for 20+ stories

---

## Hybrid Approach

You can mix modes:

```
1. Start with Team Lead for main features (Wave 1-3)
2. Switch to Manual for complex edge cases (Wave 4)
3. Use Simple Workflow for bug fixes
```

The choice is yours at any time!

---

## What Happens After Execution?

Regardless of mode chosen:

**All tasks will be:**

- ✅ Implemented by Dev agent(s)
- ✅ Tested by QA agent(s)
- ✅ Tracked in Archon
- ✅ Marked as "done" when passing QA

**You will have:**

- Complete sprint report
- All code in repository
- All tests passing
- Production-ready features

---

## Next Steps

After choosing and executing your mode:

1. **Review Results**: Check Archon for completed tasks
2. **Integration Tests**: Run full test suite
3. **Deployment**: Deploy to staging/production
4. **Retrospective**: Activate SM for sprint retro

---

## Common Questions

**Q: Can I switch modes mid-sprint?**
A: Yes! You can start with Team Lead, then switch to Manual for specific tasks.

**Q: What if dependencies are wrong?**
A: Team Lead will detect circular dependencies. Fix with Architect, then re-run analysis.

**Q: Can I pause execution?**
A: Yes! With Team Lead, you can run wave-by-wave. With Simple Workflow, interrupt anytime.

**Q: What if I want to review code before QA?**
A: Use Manual Mode, or use Team Lead with `*manual-mode` for task-by-task control.

---

**See Also:**

- [greenfield-development.md](greenfield-development.md) - Detailed Team Lead workflow
- [brownfield-development.md](brownfield-development.md) - Team Lead for existing code
- [agents/dev-team-lead.md](../agents/dev-team-lead.md) - Dev Team Lead agent
- [agents/sm.md](../agents/sm.md) - Scrum Master agent
