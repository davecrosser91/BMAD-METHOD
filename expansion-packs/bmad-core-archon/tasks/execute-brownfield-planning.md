<!-- Powered by BMAD™ Core with Archon -->

# execute-brownfield-planning

**Type**: Orchestration Task
**Phase**: Planning for Existing Codebase
**Duration**: 3-6 hours
**Output**: Change plan with refined stories ready for implementation

---

## Overview

Planning phase for **brownfield projects** (adding features to existing codebases). Focuses on understanding current system, planning changes, and minimizing disruption.

**Use this when**: Adding features to an existing, working codebase

**Alternative**: For new projects from scratch, use [execute-greenfield-planning.md](execute-greenfield-planning.md)

---

## Prerequisites

- ✅ Archon MCP available
- ✅ Existing codebase accessible
- ✅ Feature/change request defined

---

## Key Differences from Greenfield

| Aspect             | Greenfield             | Brownfield                  |
| ------------------ | ---------------------- | --------------------------- |
| **Starting point** | Blank slate            | Existing code               |
| **Analysis**       | Research domain        | Understand codebase         |
| **Risk**           | Low (nothing to break) | High (don't break existing) |
| **Architecture**   | Design from scratch    | Fit into existing patterns  |
| **Testing**        | New tests only         | New + regression tests      |

---

## Execution Steps

### Step 1: Codebase Analysis (Analyst)

**Agent**: `@analyst`

**Activities**:

1. Explore existing codebase structure
2. Identify relevant files/modules
3. Document current architecture
4. Create Archon project
5. Document findings

**Output**:

- Archon project created
- Codebase analysis document
- Current architecture documented

**Duration**: 1-2 hours

**Related**: Similar to [step-1-analyst-project-init.md](step-1-analyst-project-init.md) but focuses on existing code

---

### Step 2: Change Requirements (PM)

**Agent**: `@pm`

**Activities**:

1. Read analyst's codebase analysis
2. Define what needs to change/be added
3. Create change-focused PRD
4. Identify affected areas
5. Create epics and stories

**Output**:

- Change-focused PRD
- Epics for new features
- User stories for changes

**Duration**: 1-2 hours

**Key difference**: PRD focuses on **changes** not full product vision

---

### Step 3: Impact Analysis (Architect)

**Agent**: `@architect`

**Activities**:

1. Analyze impact of changes
2. Identify affected components
3. Plan integration with existing code
4. Document migration strategy
5. Add dependencies to stories

**Output**:

- Impact analysis document
- Integration plan
- Dependencies marked
- Risk assessment

**Duration**: 1-2 hours

**Critical**: Must ensure changes don't break existing functionality!

---

### Step 4: Story Refinement (Scrum Master)

**Agent**: `@sm`

**Activities**:

1. Review all change stories
2. Verify completeness
3. Add regression test requirements
4. Refine acceptance criteria
5. Create change overview

**Output**:

- All stories refined
- Regression test plan
- Change overview for user

**Duration**: 1 hour

---

## Brownfield-Specific Considerations

### Risk Management

**Every story should include:**

- ✅ **Backward compatibility** check
- ✅ **Regression tests** for existing features
- ✅ **Rollback plan** if something breaks
- ✅ **Feature flags** for gradual rollout

**Example story acceptance criteria:**

```
**Acceptance Criteria:**
- [ ] New feature works as expected
- [ ] Existing features still work (regression tests pass)
- [ ] Database migrations are reversible
- [ ] Feature flag controls rollout
- [ ] Documentation updated
```

---

### Testing Strategy

**Brownfield requires MORE testing:**

1. **New feature tests**: Test the new code
2. **Integration tests**: Test new + old code together
3. **Regression tests**: Verify nothing broke
4. **E2E tests**: Full system still works

**Add to every story:**

```
**Testing Requirements:**
- [ ] Unit tests for new code
- [ ] Integration tests with existing modules
- [ ] Regression test suite passes
- [ ] E2E tests verify critical flows unchanged
```

---

## 🛑 USER REVIEW CHECKPOINT

**Before development, review:**

1. **Codebase Analysis**: Do we understand current system?
2. **Change Plan**: Are changes scoped correctly?
3. **Impact Analysis**: Have we identified all affected areas?
4. **Risk Assessment**: Are we prepared for issues?

**If satisfied:**
👉 [execute-brownfield-development.md](execute-brownfield-development.md)

---

## Planning Complete ✅

**What you have:**

- ✅ Existing codebase analyzed
- ✅ Change requirements documented
- ✅ Impact analysis complete
- ✅ Refined stories with regression test plans
- ✅ Risk mitigation strategies

**Timeline**: 3-6 hours

**Next**: Choose development mode

---

## Troubleshooting

### Codebase too complex to understand

- Use [index-docs.md](index-docs.md) to analyze codebase
- Break analysis into smaller chunks
- Focus only on areas affected by changes

### Not sure what will break

- Conservative approach: Add regression tests for everything nearby
- Use [risk-profile.md](risk-profile.md) task
- Consider feature flags for gradual rollout

### Change scope keeps growing

- Set clear boundaries
- Move nice-to-haves to P1/P2
- Phase the rollout (v1, v2, etc.)

---

## Related

- **Detailed workflow**: [brownfield-planning.md](../workflows/brownfield-planning.md)
- **Development phase**: [execute-brownfield-development.md](execute-brownfield-development.md)
- **Greenfield alternative**: [execute-greenfield-planning.md](execute-greenfield-planning.md)
- **Risk assessment**: [risk-profile.md](risk-profile.md)
