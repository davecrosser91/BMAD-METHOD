<!-- Powered by BMAD™ Core with Archon -->

# execute-brownfield-development

**Type**: Orchestration Task
**Phase**: Development for Existing Codebase
**Duration**: Varies by mode
**Output**: Changes implemented, tested, and safely integrated

---

## Overview

Development phase for **brownfield projects** (existing codebases). Emphasizes safety, regression testing, and incremental rollout.

**Use this when**: Implementing changes to an existing, working system

**Alternative**: For new projects, use [execute-greenfield-development.md](execute-greenfield-development.md)

---

## Prerequisites

- ✅ Planning complete ([execute-brownfield-planning.md](execute-brownfield-planning.md))
- ✅ Codebase analysis done
- ✅ Impact assessment complete
- ✅ Stories include regression test requirements

---

## Key Brownfield Principles

### 1. **Don't Break Existing Functionality** 🚨

**Every change must:**

- ✅ Pass all existing tests (regression suite)
- ✅ Include new tests for new code
- ✅ Verify integration with existing components
- ✅ Have rollback plan

### 2. **Incremental Changes** 📈

**Prefer:**

- ✅ Small, frequent merges over big bang releases
- ✅ Feature flags for gradual rollout
- ✅ Backward-compatible changes
- ✅ Database migrations that can be reversed

### 3. **Enhanced Testing** 🧪

**Test more than greenfield:**

- ✅ Unit tests (new code)
- ✅ Integration tests (new + old)
- ✅ Regression tests (existing features)
- ✅ E2E tests (critical user flows)
- ✅ Performance tests (if applicable)

---

## Choose Your Execution Mode

Same three modes as greenfield, but with extra safety measures:

### **Option A: Manual Mode** 👤

**Best for**: High-risk changes, sensitive systems

**Extra steps:**

- Run full regression suite after each change
- Manual smoke testing
- Peer review before merging

---

### **Option B: Simple Workflow** 🤖

**Best for**: Medium complexity, moderate risk

**Workflow**: Sequential @dev → @qa with enhanced QA

**Task**: [step-1-simple-dev-qa-loop.md](step-1-simple-dev-qa-loop.md)

**Enhanced QA Checklist:**

```
For each story, QA must verify:
- [ ] New feature works
- [ ] Existing features still work
- [ ] All tests pass (including regression)
- [ ] No performance degradation
- [ ] Documentation updated
```

**Timeline**: ~2 hours per story (extra testing time)

---

### **Option C: Team Lead Workflow** 🎯

**Best for**: Many stories, clear dependencies, lower risk areas

**Task**: [step-2-parallel-team-execution.md](step-2-parallel-team-execution.md)

**Brownfield Adaptations:**

```
@dev-team-lead: "Execute sprint for brownfield project {project_id}.

IMPORTANT - Brownfield Safety Requirements:
1. Every story must pass regression tests
2. Verify backward compatibility
3. Include rollback instructions
4. Use feature flags where appropriate
5. Report any unexpected behavior immediately
"
```

**Extra safety**: Dev Team Lead will:

- ✅ Run regression suite after each wave
- ✅ Halt if any existing tests break
- ✅ Report integration issues immediately

**Timeline**: ~10 hours for 20 stories (slower than greenfield due to safety checks)

---

## Brownfield Development Checklist

**For EVERY story, ensure:**

### Before Implementation

- [ ] Understand affected areas (read impact analysis)
- [ ] Review existing code in those areas
- [ ] Plan integration approach
- [ ] Identify tests that might break

### During Implementation

- [ ] Follow existing code patterns/conventions
- [ ] Minimize changes to existing code
- [ ] Add tests for new code
- [ ] Run related existing tests frequently

### After Implementation

- [ ] All new tests pass
- [ ] **All existing tests pass** (critical!)
- [ ] Code review by someone familiar with codebase
- [ ] Manual smoke test of affected areas
- [ ] Update documentation

---

## Safety Measures

### Feature Flags

**Wrap new features in flags:**

```python
# Python example
if feature_flags.is_enabled("new_auth_flow"):
    # New code
    return new_authentication()
else:
    # Old code (fallback)
    return legacy_authentication()
```

**Benefits:**

- ✅ Gradual rollout (enable for 10% users, then 50%, then 100%)
- ✅ Instant rollback (just toggle flag)
- ✅ A/B testing capability

### Database Migrations

**All migrations must be reversible:**

```python
# Good: Reversible migration
def upgrade():
    op.add_column('users', sa.Column('phone', sa.String()))

def downgrade():
    op.drop_column('users', 'phone')
```

**Deploy strategy:**

1. Deploy code that works with OLD and NEW schema
2. Run migration
3. Deploy code that uses NEW schema only
4. If issues, rollback code then rollback migration

### Regression Test Suite

**Run after EVERY change:**

```bash
# Example: Run full test suite
npm run test:unit        # Fast, run frequently
npm run test:integration # Medium, run per story
npm run test:e2e         # Slow, run per wave
npm run test:regression  # Critical flows, run always
```

**If ANY test fails:**

1. 🛑 STOP
2. Investigate immediately
3. Fix or rollback
4. DO NOT proceed with more changes

---

## Monitoring & Rollback

### During Rollout

**Monitor these metrics:**

- ✅ Error rate (should not increase)
- ✅ Response time (should not degrade)
- ✅ User complaints (watch support tickets)
- ✅ Critical user flows (login, checkout, etc.)

### Rollback Plan

**Every story should document:**

```
**Rollback Instructions:**
1. Revert git commit: `git revert <commit-sha>`
2. Disable feature flag: `SET feature_new_auth=false`
3. Rollback database migration: `alembic downgrade -1`
4. Restart services: `docker-compose restart`
5. Verify old functionality restored

**Rollback time**: ~15 minutes
**Data loss risk**: None (migration is reversible)
```

---

## Mode Comparison (Brownfield)

| Aspect                 | Manual           | Simple Workflow    | Team Lead                   |
| ---------------------- | ---------------- | ------------------ | --------------------------- |
| **Speed**              | 1x               | 1.3x               | 3x (slower than greenfield) |
| **Risk**               | Lowest           | Low                | Medium                      |
| **Safety Checks**      | Manual           | Automated + manual | Automated                   |
| **Regression Testing** | Every change     | Every story        | Every wave                  |
| **Best For**           | Critical systems | Medium risk        | Many stories, lower risk    |

---

## Common Pitfalls

### ❌ Skipping Regression Tests

**Bad:**

```
"New feature works, shipping it!"
```

**Good:**

```
"New feature works AND all 247 existing tests pass. Safe to ship."
```

### ❌ Big Bang Releases

**Bad:**

```
"Changed 50 files, let's deploy everything at once!"
```

**Good:**

```
"Changed 5 files for Story #1. Deploy, verify, monitor. Then Story #2."
```

### ❌ Breaking Backward Compatibility

**Bad:**

```python
# Changed API response format
return {"user": {"name": "Alice"}}  # Old clients expect {"username": "Alice"}
```

**Good:**

```python
# Maintain old format, add new format
return {
    "username": "Alice",  # Keep for backward compatibility
    "user": {"name": "Alice"}  # New format
}
```

---

## Development Complete ✅

**What you've accomplished:**

- ✅ All changes implemented
- ✅ New tests passing
- ✅ Regression tests passing
- ✅ Integration verified
- ✅ Documentation updated
- ✅ Rollback plan ready

**Next Steps:**

1. **Staging deployment**: Deploy to staging, test thoroughly
2. **Gradual rollout**: Use feature flags, start with 10% users
3. **Monitor closely**: Watch metrics, be ready to rollback
4. **Full rollout**: Once confident, enable for all users

---

## Troubleshooting

### Regression tests failing

```bash
# Identify what broke
npm run test:regression -- --verbose

# Options:
1. Fix new code to work with existing code
2. Update test if old behavior legitimately changed
3. Rollback change if breaking too much
```

### Integration issues

```
Symptom: New code works alone, fails with old code

Solution:
1. Review integration points
2. Check assumptions about existing code
3. Add integration tests
4. Refactor to minimize coupling
```

### Performance degradation

```
Symptom: New feature slows down system

Solution:
1. Profile to find bottleneck
2. Optimize or cache
3. Use feature flag to disable if critical
4. Consider async/background processing
```

---

## Related

- **Planning phase**: [execute-brownfield-planning.md](execute-brownfield-planning.md)
- **Simple workflow**: [step-1-simple-dev-qa-loop.md](step-1-simple-dev-qa-loop.md)
- **Team Lead mode**: [step-2-parallel-team-execution.md](step-2-parallel-team-execution.md)
- **Risk assessment**: [risk-profile.md](risk-profile.md)
