<!-- Powered by BMAD™ Core with Archon -->

# brownfield-development

**Phase**: Safe Development & QA for Existing Codebases
**Team**: SM Orchestrator → N × Developers → N × QA Reviewers
**Input**: Completed planning from [brownfield-planning.md](brownfield-planning.md)
**Output**: Enhanced system with existing functionality preserved

---

## Overview

This workflow handles **parallel development for existing codebases** with emphasis on:

- ✅ **Backward compatibility**: Don't break existing features
- ✅ **Risk management**: High-risk changes get extra validation
- ✅ **Incremental deployment**: Feature flags and phased rollout

**Key Difference from Greenfield**: QA must verify both new functionality AND existing functionality still works.

---

## Prerequisites (from Planning Phase)

Ensure:

- ✅ Codebase analysis completed
- ✅ Enhancement PRD created
- ✅ Integration architecture documented
- ✅ User stories with dependencies AND constraints
- ✅ Risk levels assigned to tasks
- ✅ Existing test suite documented (baseline)

**Verify**:

```python
# Check documents
analysis = mcp__archon__find_documents(project_id, document_type="note")
prd = mcp__archon__find_documents(project_id, document_type="spec")
architecture = mcp__archon__find_documents(project_id, document_type="design")

# Check baseline
existing_tests = run("pytest --collect-only | wc -l")  # Count existing tests
existing_coverage = run("pytest --cov")  # Baseline coverage
```

---

## Workflow Steps

### 1. Establish Baseline

**Before any changes**, capture current state:

```bash
# Commit current state
git add .
git commit -m "Baseline before enhancement project"

# Tag baseline
git tag baseline-pre-enhancement

# Run existing tests (establish passing baseline)
pytest -v > baseline_test_results.txt

# Measure coverage
pytest --cov --cov-report=html > baseline_coverage.txt

# Take performance baseline (if applicable)
ab -n 1000 -c 10 http://localhost:8000/api/endpoint/ > baseline_perf.txt
```

Store baseline in Archon:

```python
mcp__archon__manage_document("create",
    project_id=project_id,
    title="Baseline Metrics",
    document_type="note",
    content={
        "git_commit": "abc123...",
        "git_tag": "baseline-pre-enhancement",
        "existing_tests": {
            "total": 245,
            "passing": 242,
            "failing": 3,
            "skipped": 0
        },
        "test_coverage": "68%",
        "performance": {
            "avg_response_time": "120ms",
            "requests_per_second": 83
        },
        "date": "2025-01-15"
    }
)
```

---

### 2. Activate SM Orchestrator

**Agent**: `@sm-orchestrator` or activate [sm-orchestrator.md](../agents/sm-orchestrator.md)

**Command**: `*analyze-dependencies`

**SM Actions**:

1. Load tasks with dependencies and constraints
2. Build dependency graph
3. Identify risk levels
4. Present execution plan with risk indicators:

```
📊 PARALLEL EXECUTION PLAN (Brownfield Mode)

Wave 1 (4 tasks - no dependencies, LOW RISK 🟢):
  - #TASK-101: Create Notification model (new file, additive migration)
  - #TASK-102: Set up Redis pub/sub (new service, isolated)
  - #TASK-103: Add WebSocket routing (new file, separate port)
  - #TASK-104: Create notification service layer (new Django app)

Wave 2 (6 tasks - depends on Wave 1, MIXED RISK):
  - #TASK-201: WebSocket connection handler 🟢 (new code)
  - #TASK-202: Notification API endpoints 🟢 (new endpoints)
  - #TASK-203: Extend User model with preferences 🟡 (modifies existing model)
  - #TASK-204: Integrate notification service into existing views 🟡 (touches existing code)
  - #TASK-205: Add notification React component 🟢 (new component)
  - #TASK-206: WebSocket client integration 🟢 (new service)

Wave 3 (5 tasks - depends on Wave 2, MEDIUM RISK 🟡):
  - #TASK-301: Update existing UI to show notifications 🟡 (modifies existing components)
  - #TASK-302: Add notification preferences page 🟢 (new page)
  - #TASK-303: Feature flag integration 🟡 (touches app initialization)
  - #TASK-304: Database migration deployment 🟡 (production change)
  - #TASK-305: Update existing user profile view 🟡 (modifies existing)

Wave 4 (3 tasks - depends on Wave 3, VALIDATION):
  - #TASK-401: Integration tests (new + existing must pass)
  - #TASK-402: Regression testing (verify no breakage)
  - #TASK-403: Performance testing (baseline comparison)

Risk Summary:
  🟢 Low risk: 9 tasks (isolated changes)
  🟡 Medium risk: 7 tasks (integrate with existing)
  🔴 High risk: 0 tasks
  🧪 Validation: 3 tasks

Estimated time:
  - Sequential: ~40 hours
  - Parallel (5 devs, 3 QA): ~10 hours
  - Speedup: 4x
```

**User Decision**: Proceed with `*execute-sprint` or `*start-wave 1`

---

### 3. Execute Waves (with Brownfield Safety Checks)

#### Wave Execution Pattern (Enhanced for Brownfield)

For each wave, SM Orchestrator follows this enhanced pattern:

##### Step 3.1: Pre-flight Checks (Brownfield-Specific)

```python
# Standard checks
verify_dependencies_complete()
verify_git_clean()

# BROWNFIELD-SPECIFIC CHECKS:

# 1. Verify baseline tests still pass
baseline_result = run("pytest -v")
if "FAILED" in baseline_result:
    HALT("Baseline tests failing - fix before proceeding")

# 2. Check no uncommitted changes
git_status = run("git status --porcelain")
if git_status:
    WARN("Uncommitted changes exist - commit or stash before wave")

# 3. Create feature branch for wave (if not exists)
branch_name = f"feature/wave-{wave_number}"
run(f"git checkout -b {branch_name}")

# 4. Verify existing test coverage maintained
current_coverage = run("pytest --cov --cov-report=term | grep TOTAL")
if coverage_dropped(current_coverage, baseline_coverage):
    WARN("Coverage dropped - ensure new code is tested")
```

##### Step 3.2: Spawn Developers (Enhanced Instructions)

Developer subagent prompts include **brownfield-specific constraints**:

````python
Task(
    subagent_type="general-purpose",
    description=f"Develop brownfield task {task.id}",
    prompt=f"""You are Developer working on BROWNFIELD task #{task.id}.

**CRITICAL: This is BROWNFIELD development**
You are modifying an EXISTING codebase. Follow these rules:

1. **Preserve Existing Functionality**
   - Do NOT modify existing tests (unless explicitly required)
   - Do NOT change existing APIs (unless explicitly required)
   - Do NOT break backward compatibility

2. **Run Existing Tests FIRST**
   ```bash
   pytest tests/  # Must pass BEFORE you start
````

3. **Your Specific Task**:
   {task.description}

**Constraints** (MUST FOLLOW):
{task.constraints}

**Risk Level**: {task.risk_level}

4. **Implementation Guidelines**:

   For 🟢 LOW RISK (new files):
   - Create new files in appropriate directories
   - Follow existing code style and patterns
   - Add comprehensive tests for new code

   For 🟡 MEDIUM RISK (modify existing):
   - Read existing code thoroughly first
   - Make minimal, surgical changes
   - Run existing tests after EVERY change
   - Add tests for new behavior
   - Update tests if behavior intentionally changes

   For 🔴 HIGH RISK (core changes):
   - Consult architecture doc for safety guidelines
   - Make changes behind feature flag if possible
   - Extra comprehensive testing required
   - Consider pair programming or code review before QA

5. **Testing Requirements**:

   ```bash
   # MUST pass all existing tests
   pytest tests/ -v

   # MUST add tests for new functionality
   pytest tests/test_notifications.py -v

   # MUST verify coverage not decreased
   pytest --cov --cov-report=term

   # For UI changes: MUST test manually
   npm run dev  # Test in browser
   ```

6. **Implementation Steps**:

   Step 1: **Verify Baseline**

   ```bash
   git status  # Clean?
   pytest tests/  # All passing?
   ```

   Step 2: **Read Existing Code**
   - Understand patterns before adding new code
   - Match existing style, naming, architecture

   Step 3: **Implement Feature**
   - Follow constraints exactly
   - Make minimal changes to existing files
   - Prefer adding new code over modifying old

   Step 4: **Test Continuously**

   ```bash
   # After EVERY significant change:
   pytest tests/  # Verify existing still pass
   pytest tests/test_[your_new_feature].py  # Verify new works
   ```

   Step 5: **Integration Check**

   ```bash
   # Run full test suite
   pytest tests/ -v

   # Check coverage
   pytest --cov

   # Manual testing (if UI change)
   npm run dev
   ```

   Step 6: **Update Archon**

   ```python
   mcp__archon__manage_task("update",
       task_id="{task.id}",
       status="review",
       description="{task.description}
   ```

**Implementation Notes**:

- Files created: [list NEW files]
- Files modified: [list EXISTING files changed]
- Existing tests: ✅ All passing ({existing_test_count} tests)
- New tests: {new_test_count} tests added
- Coverage: {coverage_percent}% (baseline: {baseline_coverage}%)
- Manual testing: [results if applicable]
- Constraints followed: ✅ All constraints satisfied
- Risk mitigation: [describe how risk was managed]
  "
  )

  ```

  Step 7: **Report to SM**
  ```

  ✅ Task #{task.id} completed (Brownfield mode)

  📁 Files modified:
  NEW: - src/notifications/service.py - tests/test_notifications.py
  EXISTING: - src/users/models.py (added notification_preferences field)

  🧪 Tests: - Existing: 245 passed ✅ (no changes) - New: 18 added - Coverage: 71% (was 68%, +3%)

  ✅ Backward compatibility: Verified - All existing API endpoints unchanged - Existing tests pass without modification - Database migration is additive-only

  ⚠️ Notes: - User model extended (migration required in production) - New dependency added: django-channels - Feature behind flag 'ENABLE_NOTIFICATIONS'

  Risk Level: {task.risk_level}
  Constraints satisfied: ✅

  ```

  ```

**CRITICAL FOR BROWNFIELD**:

- Existing tests must ALWAYS pass
- Coverage should NOT decrease
- Backward compatibility is NON-NEGOTIABLE
- Feature flags for risky changes
  """
  )

````

##### Step 3.3: Spawn QA Reviewers (Enhanced for Brownfield)

QA subagent prompts include **regression testing requirements**:

```python
Task(
    subagent_type="general-purpose",
    description=f"QA review brownfield task {task.id}",
    prompt=f"""You are QA Reviewer for BROWNFIELD task #{task.id}.

**CRITICAL: Brownfield QA Requirements**

You must verify:
1. ✅ New functionality works (standard QA)
2. ✅ Existing functionality STILL works (regression testing)
3. ✅ No backward compatibility breakage

**Original Task**:
{task.description}

**Acceptance Criteria**:
{task.acceptance_criteria}

**Constraints**:
{task.constraints}

**Risk Level**: {task.risk_level}

**Developer Implementation**:
{implementation_notes}

**Your Mission**:

### Part 1: Standard QA (New Functionality)

1. **Review Implementation**:
   - Read new code
   - Check against acceptance criteria
   - Verify code quality

2. **Run New Tests**:
   ```bash
   pytest tests/test_notifications.py -v
````

3. **Manual Testing** (if applicable):
   - Test new feature in browser/API
   - Verify edge cases
   - Check error handling

### Part 2: REGRESSION TESTING (Critical for Brownfield)

4. **Run ALL Existing Tests**:

   ```bash
   # MUST pass ALL existing tests
   pytest tests/ -v

   # Verify count matches baseline
   # Baseline: {baseline_test_count} tests
   # Current: [count current tests]
   # ANY failures are AUTOMATIC fail for this task
   ```

5. **Verify Backward Compatibility**:

   For API changes:

   ```bash
   # Test existing API endpoints still work
   curl http://localhost:8000/api/users/  # Should work as before
   curl http://localhost:8000/api/profile/  # Should work as before
   ```

   For Database changes:

   ```bash
   # Verify migration is safe
   python manage.py sqlmigrate notifications 0001
   # Check: No DROP, ALTER breaking, or DELETE statements
   ```

   For UI changes:

   ```bash
   # Test existing pages still work
   npm run dev
   # Navigate to existing pages, verify no breakage
   ```

6. **Check Coverage**:

   ```bash
   pytest --cov --cov-report=term
   # Coverage should be >= baseline
   # Baseline: {baseline_coverage}%
   # Current: [measure]
   ```

7. **Performance Check** (for medium/high risk):
   ```bash
   # Verify no performance regression
   ab -n 100 -c 10 http://localhost:8000/api/endpoint/
   # Response time should be <= baseline + 10%
   ```

### Part 3: Constraint Verification

8. **Verify ALL Constraints Satisfied**:
   {task.constraints}

   For each constraint:
   - [ ] Explicitly verify compliance
   - [ ] Document how verified

9. **Risk Assessment**:
   Based on risk level ({task.risk_level}):

   🟢 Low Risk:
   - Standard testing sufficient
   - Verify isolation (new code doesn't touch old)

   🟡 Medium Risk:
   - Extra regression testing required
   - Manually test integration points
   - Verify rollback possible

   🔴 High Risk:
   - Extensive regression testing
   - Consider staging deployment first
   - Request additional human review

### Part 4: Verdict

10. **Determine Pass/Fail**:

    **PASS** requires ALL of:
    - ✅ New functionality meets acceptance criteria
    - ✅ ALL existing tests pass (no failures, no changes)
    - ✅ Coverage >= baseline
    - ✅ Backward compatibility verified
    - ✅ ALL constraints satisfied
    - ✅ No performance regression (if applicable)

    **FAIL** if ANY of:
    - ❌ Existing tests fail
    - ❌ Coverage decreased
    - ❌ Backward compatibility broken
    - ❌ Constraints violated
    - ❌ Performance regression >10%
    - ❌ New functionality doesn't work

11. **Update Archon**:
    ```python
    if verdict == "PASS":
        mcp__archon__manage_task("update",
            task_id="{task.id}",
            status="done",
            description="{task.description}
    ```

**QA Review** (Brownfield):
✅ PASS - New functionality + Backward compatibility verified

New Functionality:

- Acceptance criteria: ✅ All met
- Manual testing: ✅ Passed
- New tests: ✅ 18 tests, all passing

Regression Testing:

- Existing tests: ✅ 245 passed, 0 failed
- Backward compatibility: ✅ Verified
- Coverage: 71% (baseline: 68%, +3%)
- Performance: ✅ No regression

Constraints:

- Database migration additive: ✅
- No breaking API changes: ✅
- Feature flag implemented: ✅

Risk Level: {task.risk_level}
Reviewer: QA Subagent
Date: {datetime.now()}
"
)
else: # FAIL
mcp**archon**manage_task("update",
task_id="{task.id}",
status="doing",
description="{task.description}

**QA Review** (Brownfield):
❌ FAIL - Issues found

Issues:

1. [Detailed issue 1]
2. [Detailed issue 2]

Regression Test Results:

- Existing tests: {passed}/{total} passed ({failed} FAILED)
- Failed tests: [list failed test names]
- Coverage: {current}% (baseline: {baseline}%, {delta})

Backward Compatibility Issues:

- [List any breaking changes]

Constraint Violations:

- [List any constraints not satisfied]

Required Fixes:

1. [Fix 1]
2. [Fix 2]

Reviewer: QA Subagent
Date: {datetime.now()}
"
)
```

12. **Report to SM**:

    ```
    Verdict: PASS/FAIL

    New Functionality: PASS/FAIL
    Regression Testing: PASS/FAIL
    Backward Compatibility: PASS/FAIL
    Constraints: PASS/FAIL

    Issues: [detailed list if FAIL]
    ```

**CRITICAL**:

- Existing tests MUST pass (zero failures)
- Coverage MUST NOT decrease
- Backward compatibility is MANDATORY
- ALL constraints must be satisfied for PASS
  """
  )

```

##### Step 3.4: Wave Completion (with Brownfield Metrics)

```

📊 WAVE 1 COMPLETE (Brownfield Mode)

✅ Completed (4/4):

- #TASK-101: Notification model ✅
- #TASK-102: Redis pub/sub ✅
- #TASK-103: WebSocket routing ✅
- #TASK-104: Notification service ✅

⚠️ Regression Testing:

- Existing tests: 245/245 passed ✅
- Coverage: 71% (baseline 68%, +3%) ✅
- No backward compatibility issues ✅

📁 Changes:

- New files: 12
- Modified files: 2 (User model, settings.py)
- New tests: 47
- Database migrations: 1 (additive only)

🎯 Next Wave:

- Wave 2: 6 tasks ready
- Risk: 4 low 🟢, 2 medium 🟡
- Continue? (y/n)

````

---

### 4. Deployment Strategy (After All Waves)

**Brownfield requires phased deployment**:

#### Phase 1: Deploy with Feature Flag OFF

```bash
# Deploy all code, but feature disabled
git tag release-v1.5.0-notifications-disabled
git push --tags

# Deploy to production
./deploy.sh

# Verify existing functionality unchanged
curl https://api.production.com/health  # Should be healthy
run_smoke_tests.sh  # Should pass
````

#### Phase 2: Enable for Internal Users (Canary)

```python
# In admin panel or feature flag service
enable_feature_flag(
    feature="ENABLE_NOTIFICATIONS",
    users=["internal_user_1", "internal_user_2"],
    percentage=0  # Only whitelisted users
)
```

Monitor for 24-48 hours:

- Error rates
- Performance metrics
- User feedback

#### Phase 3: Gradual Rollout

```python
# Enable for 10% of users
enable_feature_flag(
    feature="ENABLE_NOTIFICATIONS",
    percentage=10
)
# Monitor 24 hours

# Enable for 50%
update_feature_flag(
    feature="ENABLE_NOTIFICATIONS",
    percentage=50
)
# Monitor 24 hours

# Enable for 100%
update_feature_flag(
    feature="ENABLE_NOTIFICATIONS",
    percentage=100
)
```

#### Phase 4: Remove Feature Flag (Cleanup)

After 2-4 weeks of stable 100% rollout:

```python
# Remove feature flag checks from code
# Feature is now permanent
```

---

### 5. Final Sprint Report (Brownfield-Enhanced)

```
🎉 SPRINT COMPLETE (Brownfield Enhancement)

📊 Development Statistics:
  - Total tasks: 18
  - Total waves: 4
  - Tasks completed: 18 ✅
  - QA failures (first pass): 3 (all fixed)

⏱️ Time Comparison:
  - Sequential estimate: 40 hours
  - Parallel actual: 9.5 hours
  - Speedup: 4.2x

✅ Backward Compatibility:
  - Existing tests: 245/245 passing ✅
  - Coverage: 71% (baseline 68%, +3%) ✅
  - API compatibility: 100% ✅
  - Performance: +2% improvement ✅

📁 Codebase Changes:
  - New files: 38
  - Modified files: 7
  - Deleted files: 0
  - New tests: 89
  - Lines added: +2,145
  - Lines removed: -34

🚀 Deployment Status:
  - Phase 1: ✅ Deployed to production (feature flag OFF)
  - Phase 2: ⏳ Canary rollout (internal users)
  - Phase 3: 🔜 Pending (gradual rollout)
  - Phase 4: 🔜 Pending (flag removal)

📈 Impact:
  - Users affected: 0 (feature flag OFF)
  - Breaking changes: 0
  - Database migrations: 3 (all additive)
  - New dependencies: 2 (django-channels, channels-redis)

🎯 Next Steps:
  1. Monitor canary deployment (internal users)
  2. Gather feedback for 48 hours
  3. Proceed to 10% rollout if stable
  4. Full production rollout in 1 week

All work tracked in Archon project: {project.id}
```

---

## Brownfield-Specific Best Practices

### 1. Feature Flags Are Mandatory

```python
# In code
if feature_flag_enabled('ENABLE_NOTIFICATIONS', user):
    send_notification(user, message)
else:
    # Old behavior (or no-op)
    pass
```

### 2. Database Migrations Must Be Reversible

```python
# Good: Additive migration (reversible)
class Migration(migrations.Migration):
    operations = [
        migrations.AddField(
            model_name='user',
            name='notification_preferences',
            field=models.JSONField(default=dict, blank=True),
        ),
    ]

# Bad: Breaking migration (not reversible)
class Migration(migrations.Migration):
    operations = [
        migrations.RemoveField(
            model_name='user',
            name='old_field',  # Data loss!
        ),
    ]
```

### 3. Parallel Deployment Strategy

- **Code first, feature later**: Deploy disabled, enable gradually
- **Monitor everything**: Errors, performance, user feedback
- **Quick rollback**: Feature flag off, no code rollback needed

### 4. Risk-Based Testing

- 🟢 **Low risk**: Standard QA
- 🟡 **Medium risk**: Extended regression testing
- 🔴 **High risk**: Staging deployment + human review + gradual rollout

---

## Troubleshooting (Brownfield-Specific)

### Issue: Existing tests fail after changes

**Fix**:

1. Revert changes: `git checkout {file}`
2. Understand test expectations
3. Make surgical changes, re-run after each
4. If test needs updating, verify with architect first

### Issue: Coverage dropped

**Fix**: Add tests for new code paths, ensure all branches covered

### Issue: Feature flag not working

**Fix**: Verify feature flag service deployed before code that uses it

### Issue: Migration fails in production

**Fix**:

1. Should not happen if properly tested
2. Rollback: `python manage.py migrate {app} {previous_migration}`
3. Fix migration, re-deploy

---

**See Also**:

- [brownfield-planning.md](brownfield-planning.md) - Planning phase
- [greenfield-development.md](greenfield-development.md) - Development for new projects
- [../agents/sm-orchestrator.md](../agents/sm-orchestrator.md) - SM Orchestrator agent
