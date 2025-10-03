<!-- Powered by BMAD™ Core with Archon -->

# execute-parallel-sprint

**Used by**: SM Orchestrator
**Purpose**: Execute complete sprint with parallel dev and QA subagents
**Prerequisites**: `analyze-task-dependencies` must be run first
**Output**: All tasks completed, tested, and ready for deployment

---

## Task Workflow

### Prerequisites Check

```python
if not hasattr(session, 'execution_plan'):
    print("❌ No execution plan found")
    print("Please run *analyze-dependencies first")
    exit()

execution_plan = session.execution_plan
waves = execution_plan['waves']
task_graph = execution_plan['task_graph']

print(f"🚀 Starting sprint execution")
print(f"   {execution_plan['total_tasks']} tasks in {len(waves)} waves")
print()
```

---

### Configuration

```python
# Get or use default capacity
if hasattr(session, 'capacity'):
    max_devs = session.capacity['max_devs']
    max_qa = session.capacity['max_qa']
else:
    max_devs = 3  # Default
    max_qa = 2    # Default

print(f"Configuration:")
print(f"  - Max parallel developers: {max_devs}")
print(f"  - Max parallel QA reviewers: {max_qa}")
print()

# Initialize tracking
sprint_stats = {
    'start_time': datetime.now(),
    'tasks_completed': 0,
    'tasks_failed_qa': 0,
    'waves_completed': 0,
    'dev_cycles': {},  # task_id -> number of dev attempts
    'qa_cycles': {},   # task_id -> number of QA attempts
}
```

---

### Main Execution Loop

```python
for wave_num, wave_task_ids in enumerate(waves, 1):
    print("=" * 60)
    print(f"🌊 WAVE {wave_num}/{len(waves)}")
    print("=" * 60)
    print(f"Tasks: {len(wave_task_ids)}")
    print()

    # Execute development phase
    dev_results = execute_development_wave(
        wave_task_ids,
        task_graph,
        max_devs,
        sprint_stats
    )

    # Execute QA phase
    qa_results = execute_qa_wave(
        wave_task_ids,
        task_graph,
        max_qa,
        sprint_stats
    )

    # Handle failed QA
    failed_tasks = [t for t in qa_results if qa_results[t] == 'FAIL']
    while failed_tasks:
        print(f"⚠️ {len(failed_tasks)} tasks need rework")

        # Re-run development for failed tasks
        dev_results = execute_development_wave(
            failed_tasks,
            task_graph,
            max_devs,
            sprint_stats,
            is_rework=True
        )

        # Re-run QA for fixed tasks
        qa_results = execute_qa_wave(
            failed_tasks,
            task_graph,
            max_qa,
            sprint_stats,
            is_rework=True
        )

        # Check if still failing
        failed_tasks = [t for t in qa_results if qa_results[t] == 'FAIL']

        # Safety: max 3 rework cycles
        if sprint_stats.get('rework_cycles', 0) > 3:
            print("❌ Too many rework cycles - stopping")
            print(f"   Failed tasks: {failed_tasks}")
            return

    sprint_stats['waves_completed'] += 1

    print(f"✅ Wave {wave_num} complete")
    print()
```

---

### Development Wave Execution

```python
def execute_development_wave(task_ids, task_graph, max_devs, sprint_stats, is_rework=False):
    """
    Spawn developer subagents for tasks in wave.
    Respects max_devs capacity by batching.
    """
    mode = "REWORK" if is_rework else "DEVELOPMENT"
    print(f"🛠️ {mode} PHASE")
    print(f"   Tasks: {len(task_ids)}")
    print()

    # Batch tasks by capacity
    batches = [task_ids[i:i+max_devs] for i in range(0, len(task_ids), max_devs)]

    dev_results = {}

    for batch_num, batch in enumerate(batches, 1):
        print(f"📦 Batch {batch_num}/{len(batches)}: {len(batch)} developers")

        # Launch all devs in batch (parallel - single message, multiple Task tools)
        # NOTE: Actual implementation would use Task tool invocations here
        # For this workflow doc, showing the structure:

        for task_id in batch:
            task = task_graph[task_id]['task']

            print(f"   Launching dev for #{task_id}: {task.title[:40]}...")

            # Track dev cycles
            sprint_stats['dev_cycles'][task_id] = sprint_stats['dev_cycles'].get(task_id, 0) + 1

            # Would invoke Task tool here with full dev prompt
            # (See greenfield-development.md for complete prompt)

        # Wait for batch completion
        print(f"   ⏳ Waiting for {len(batch)} developers to complete...")

        # Simulate completion (in real execution, wait for subagent returns)
        for task_id in batch:
            # Update task status in Archon
            mcp__archon__manage_task("update",
                task_id=task_id,
                status="review"  # Ready for QA
            )
            dev_results[task_id] = 'COMPLETE'

        print(f"   ✅ Batch {batch_num} complete")
        print()

    print(f"✅ {mode} PHASE COMPLETE: {len(task_ids)} tasks ready for QA")
    print()

    return dev_results
```

---

### QA Wave Execution

```python
def execute_qa_wave(task_ids, task_graph, max_qa, sprint_stats, is_rework=False):
    """
    Spawn QA subagents for tasks in wave.
    Respects max_qa capacity by batching.
    """
    mode = "RE-REVIEW" if is_rework else "QA REVIEW"
    print(f"🧪 {mode} PHASE")
    print(f"   Tasks: {len(task_ids)}")
    print()

    # Batch tasks by capacity
    batches = [task_ids[i:i+max_qa] for i in range(0, len(task_ids), max_qa)]

    qa_results = {}

    for batch_num, batch in enumerate(batches, 1):
        print(f"📦 Batch {batch_num}/{len(batches)}: {len(batch)} QA reviewers")

        # Launch all QA in batch (parallel)
        for task_id in batch:
            task = task_graph[task_id]['task']

            print(f"   Launching QA for #{task_id}: {task.title[:40]}...")

            # Track QA cycles
            sprint_stats['qa_cycles'][task_id] = sprint_stats['qa_cycles'].get(task_id, 0) + 1

            # Would invoke Task tool here with full QA prompt
            # (See greenfield-development.md for complete prompt)

        # Wait for batch completion
        print(f"   ⏳ Waiting for {len(batch)} QA reviewers...")

        # Simulate QA results (in real execution, parse subagent returns)
        for task_id in batch:
            # Get QA verdict from subagent response
            verdict = 'PASS'  # or 'FAIL' based on subagent report

            if verdict == 'PASS':
                mcp__archon__manage_task("update",
                    task_id=task_id,
                    status="done"
                )
                qa_results[task_id] = 'PASS'
                sprint_stats['tasks_completed'] += 1
            else:
                mcp__archon__manage_task("update",
                    task_id=task_id,
                    status="doing"  # Back to dev
                )
                qa_results[task_id] = 'FAIL'
                sprint_stats['tasks_failed_qa'] += 1

        print(f"   ✅ Batch {batch_num} reviews complete")
        print()

    # Summary
    passed = sum(1 for r in qa_results.values() if r == 'PASS')
    failed = sum(1 for r in qa_results.values() if r == 'FAIL')

    print(f"✅ {mode} PHASE COMPLETE:")
    print(f"   - Passed: {passed}")
    print(f"   - Failed: {failed}")
    print()

    return qa_results
```

---

### Sprint Completion Report

```python
def print_sprint_report(execution_plan, sprint_stats):
    """Generate comprehensive sprint report."""
    end_time = datetime.now()
    duration = (end_time - sprint_stats['start_time']).total_seconds() / 3600

    print("=" * 60)
    print("🎉 SPRINT EXECUTION COMPLETE")
    print("=" * 60)
    print()

    print("📊 Statistics:")
    print(f"   - Total tasks: {execution_plan['total_tasks']}")
    print(f"   - Tasks completed: {sprint_stats['tasks_completed']} ✅")
    print(f"   - Total waves: {len(execution_plan['waves'])}")
    print(f"   - Waves completed: {sprint_stats['waves_completed']}")
    print()

    print("🔄 QA Metrics:")
    print(f"   - First-pass QA failures: {sprint_stats['tasks_failed_qa']}")
    total_dev_cycles = sum(sprint_stats['dev_cycles'].values())
    total_qa_cycles = sum(sprint_stats['qa_cycles'].values())
    avg_dev_cycles = total_dev_cycles / len(sprint_stats['dev_cycles']) if sprint_stats['dev_cycles'] else 0
    avg_qa_cycles = total_qa_cycles / len(sprint_stats['qa_cycles']) if sprint_stats['qa_cycles'] else 0
    print(f"   - Avg dev cycles per task: {avg_dev_cycles:.2f}")
    print(f"   - Avg QA cycles per task: {avg_qa_cycles:.2f}")
    print()

    print("⏱️ Time Comparison:")
    sequential = execution_plan['time_estimate']['sequential']
    parallel_est = execution_plan['time_estimate']['parallel']
    speedup = execution_plan['time_estimate']['speedup']
    print(f"   - Sequential estimate: ~{sequential} hours")
    print(f"   - Parallel estimate: ~{parallel_est} hours")
    print(f"   - Actual time: {duration:.1f} hours")
    print(f"   - Speedup: {speedup:.1f}x")
    print()

    print("👥 Risk Distribution:")
    for risk_level, count in execution_plan['risk_summary'].items():
        print(f"   {risk_level}: {count} tasks")
    print()

    print("🚀 Next Steps:")
    print("   1. Review all completed tasks in Archon")
    print("   2. Run integration tests")
    print("   3. Deploy to staging")
    print("   4. Conduct user acceptance testing")
    print()

    print(f"All work tracked in Archon project: {project_id}")
    print("=" * 60)

# Call at end
print_sprint_report(execution_plan, sprint_stats)
```

---

## Error Handling

### Subagent Failure

```python
try:
    # Launch subagent
    result = Task(...)
except Exception as e:
    print(f"❌ Subagent failed: {e}")
    print(f"   Task {task_id} will be retried")

    # Mark task for retry
    retry_queue.append(task_id)
```

### Archon Update Failure

```python
try:
    mcp__archon__manage_task("update", task_id=task_id, status="done")
except Exception as e:
    print(f"⚠️ Failed to update Archon for task {task_id}")
    print(f"   Error: {e}")
    print(f"   Task completed but Archon not updated - manual fix needed")
```

### Wave Timeout

```python
# Set reasonable timeout per wave
WAVE_TIMEOUT_HOURS = 4

if time_since_wave_start > WAVE_TIMEOUT_HOURS:
    print(f"⏰ Wave {wave_num} exceeded timeout ({WAVE_TIMEOUT_HOURS}h)")
    print(f"   Incomplete tasks: {incomplete_tasks}")
    print(f"   Options:")
    print(f"     1. Continue waiting")
    print(f"     2. Skip incomplete tasks")
    print(f"     3. Abort sprint")

    # Wait for user decision
```

---

## Output

This task produces:

- All tasks in sprint moved to "done" status in Archon
- Comprehensive sprint statistics
- Detailed report of dev/QA cycles
- Time metrics and speedup calculation
- Ready for deployment

---

**See Also**:

- [analyze-task-dependencies.md](analyze-task-dependencies.md) - Build execution plan
- [spawn-dev-subagents.md](spawn-dev-subagents.md) - Dev subagent details
- [spawn-qa-subagents.md](spawn-qa-subagents.md) - QA subagent details
