<!-- Powered by BMAD™ Core with Archon -->

# analyze-task-dependencies

**Used by**: SM Orchestrator
**Purpose**: Parse task dependencies and build execution graph for parallel development
**Output**: Dependency graph with parallel execution waves

---

## Task Workflow

### Step 1: Load All Tasks from Archon

```python
# Get project tasks
tasks = mcp__archon__find_tasks(
    project_id=project_id,
    per_page=100  # Increase if more tasks
)

print(f"Loaded {len(tasks)} tasks from Archon")
```

---

### Step 2: Parse Dependency Markers

**Dependency Syntax** (from task descriptions):

- `Depends on: #TASK-101, #TASK-102` - Hard dependencies
- `Blocks: #TASK-201` - This task blocks others
- `Related: #TASK-999` - Informational only (not blocking)

```python
import re

def parse_dependencies(task_description):
    """Extract dependency task IDs from description."""
    dependencies = []

    # Look for "Depends on: #TASK-ID, #TASK-ID"
    depends_pattern = r'Depends on:\s*([#\w\-,\s]+)'
    match = re.search(depends_pattern, task_description, re.IGNORECASE)

    if match:
        # Extract task IDs
        dep_string = match.group(1)
        # Find all #TASK-XXX patterns
        task_ids = re.findall(r'#(TASK-\d+|\w+-\d+)', dep_string)
        dependencies.extend(task_ids)

    return dependencies

# Parse dependencies for all tasks
task_graph = {}
for task in tasks:
    deps = parse_dependencies(task.description)
    task_graph[task.id] = {
        'task': task,
        'dependencies': deps,
        'dependents': []  # Will populate in next step
    }

print(f"Parsed dependencies for {len(task_graph)} tasks")
```

---

### Step 3: Build Reverse Dependencies (Who Blocks Who)

```python
# For each task, find which tasks depend on it
for task_id, data in task_graph.items():
    for dep_id in data['dependencies']:
        if dep_id in task_graph:
            task_graph[dep_id]['dependents'].append(task_id)

# Example output
for task_id, data in task_graph.items():
    if data['dependents']:
        print(f"{task_id} blocks: {', '.join(data['dependents'])}")
```

---

### Step 4: Topological Sort (Determine Execution Order)

```python
def topological_sort(task_graph):
    """
    Sort tasks into waves based on dependencies.
    Wave 0: No dependencies
    Wave N: Depends only on waves 0..N-1
    """
    waves = []
    remaining = set(task_graph.keys())
    completed = set()

    while remaining:
        # Find tasks with all dependencies completed
        ready = []
        for task_id in remaining:
            deps = task_graph[task_id]['dependencies']
            if all(dep in completed for dep in deps):
                ready.append(task_id)

        if not ready:
            # Circular dependency detected!
            raise ValueError(f"Circular dependency detected. Remaining tasks: {remaining}")

        waves.append(ready)
        completed.update(ready)
        remaining -= set(ready)

    return waves

execution_waves = topological_sort(task_graph)

print(f"Tasks organized into {len(execution_waves)} waves")
for i, wave in enumerate(execution_waves):
    print(f"Wave {i+1}: {len(wave)} tasks")
```

---

### Step 5: Analyze Risk Levels

```python
def get_risk_level(task):
    """Extract risk level from task description or task_order."""
    description = task.description.lower()

    # Check for explicit risk markers
    if '🔴' in description or 'high risk' in description:
        return '🔴 HIGH'
    elif '🟡' in description or 'medium risk' in description:
        return '🟡 MEDIUM'
    elif '🟢' in description or 'low risk' in description:
        return '🟢 LOW'

    # Infer from task_order (if following convention)
    if task.task_order >= 95:
        return '🟢 LOW'
    elif task.task_order >= 85:
        return '🟡 MEDIUM'
    else:
        return '🔴 HIGH'

# Add risk to graph
for task_id, data in task_graph.items():
    data['risk'] = get_risk_level(data['task'])
```

---

### Step 6: Present Execution Plan to User

```python
print("=" * 60)
print("📊 PARALLEL EXECUTION PLAN")
print("=" * 60)
print()

total_tasks = len(task_graph)
risk_counts = {'🟢 LOW': 0, '🟡 MEDIUM': 0, '🔴 HIGH': 0}

for wave_num, wave in enumerate(execution_waves, 1):
    # Count dependencies
    if wave_num == 1:
        dep_text = "no dependencies"
    else:
        dep_text = f"depends on Wave {wave_num - 1}"

    print(f"Wave {wave_num} ({len(wave)} tasks - {dep_text}):")
    print()

    for task_id in wave:
        task_data = task_graph[task_id]
        task = task_data['task']
        risk = task_data['risk']
        risk_counts[risk] += 1

        # Truncate title if too long
        title = task.title[:60] + "..." if len(task.title) > 60 else task.title

        print(f"  {risk} #{task_id}: {title}")

        # Show dependencies if any
        if task_data['dependencies']:
            dep_list = ', '.join(f"#{d}" for d in task_data['dependencies'])
            print(f"      Depends on: {dep_list}")

    print()

print("=" * 60)
print("Risk Summary:")
for risk_level, count in risk_counts.items():
    print(f"  {risk_level}: {count} tasks")
print()
print(f"Total: {total_tasks} tasks in {len(execution_waves)} waves")
print()

# Calculate time estimates
sequential_hours = total_tasks * 2  # Assume 2 hours per task
parallel_hours = len(execution_waves) * 2  # Assume 2 hours per wave (with parallel devs)
speedup = sequential_hours / parallel_hours if parallel_hours > 0 else 1

print(f"Estimated time:")
print(f"  - Sequential: ~{sequential_hours} hours")
print(f"  - Parallel: ~{parallel_hours} hours (with 5 devs)")
print(f"  - Speedup: {speedup:.1f}x")
print()
print("=" * 60)
```

---

### Step 7: Store Execution Plan in Session

```python
# Store for use by execute-sprint or start-wave commands
session.execution_plan = {
    'waves': execution_waves,
    'task_graph': task_graph,
    'total_tasks': total_tasks,
    'risk_summary': risk_counts,
    'time_estimate': {
        'sequential': sequential_hours,
        'parallel': parallel_hours,
        'speedup': speedup
    }
}

print("✅ Execution plan ready")
print()
print("Next steps:")
print("  1. *execute-sprint - Run all waves automatically")
print("  2. *start-wave 1 - Run first wave manually")
print("  3. *configure-capacity - Set dev/QA limits")
```

---

## Edge Cases

### Circular Dependencies

If topological sort detects circular dependencies:

```python
except ValueError as e:
    print("❌ ERROR: Circular dependency detected!")
    print()
    print("Remaining tasks that cannot be scheduled:")
    for task_id in remaining:
        task_data = task_graph[task_id]
        deps = task_data['dependencies']
        print(f"  #{task_id}: depends on {deps}")
    print()
    print("Action required:")
    print("  1. Review dependencies with @architect")
    print("  2. Remove circular references")
    print("  3. Update task descriptions in Archon")
    print("  4. Re-run *analyze-dependencies")
```

### Missing Dependencies

If task references a dependency that doesn't exist:

```python
# Check for missing deps
missing_deps = set()
for task_id, data in task_graph.items():
    for dep_id in data['dependencies']:
        if dep_id not in task_graph:
            missing_deps.add(dep_id)

if missing_deps:
    print("⚠️ WARNING: Some dependencies not found:")
    for dep_id in missing_deps:
        print(f"  #{dep_id} - referenced but doesn't exist")
    print()
    print("These dependencies will be ignored.")
    print()
```

### No Dependencies

If all tasks have no dependencies (single wave):

```python
if len(execution_waves) == 1:
    print("ℹ️ Note: All tasks have no dependencies")
    print("   All tasks can run in parallel (single wave)")
    print()
```

---

## Output Format

This task produces:

- `session.execution_plan` object with waves and graph
- Console output showing execution plan
- Ready for `*execute-sprint` or `*start-wave` commands

---

**See Also**:

- [execute-parallel-sprint.md](execute-parallel-sprint.md) - Execute full sprint
- [spawn-dev-subagents.md](spawn-dev-subagents.md) - Launch developer team
