# Archon Implement Experiment

## Purpose

Implement and run an experiment based on specifications in Archon, with research-driven development workflow.

## Prerequisites

- Archon project initialized (project_id available)
- Experiment Specification exists
- Experimental Architecture exists
- Model Architecture document exists (created by Experiment Architect)
- ML Engineer agent active

## Task Steps

### 1. Get Next Experiment Task

```
Execute: mcp__archon__find_tasks(
  project_id=project_id,
  filter_by="assignee",
  filter_value="ML Engineer",
  status="todo"
)

Display available experiment tasks (numbered list)

Ask user: "Select experiment to implement (number or task_id):"
Store as: task_id

Execute: mcp__archon__find_tasks(
  project_id=project_id,
  task_id=task_id
)

Store: experiment_task
Display: "Selected: {experiment_task.title}"
```

### 2. Mark Task as Doing

```
Execute: mcp__archon__manage_task(
  action="update",
  task_id=task_id,
  status="doing"
)

Display: "✓ Marked task as 'doing'"
Display: "Note: Only ONE task should be 'doing' at a time"
```

### 3. Load Experiment Specification

```
Extract experiment_spec_doc_id from task description

Execute: mcp__archon__find_documents(
  project_id=project_id,
  document_id=experiment_spec_doc_id
)

Store: experiment_spec

Display: "Experiment Specification:"
Display: "- Name: {experiment_spec.name}"
Display: "- Method: {experiment_spec.method}"
Display: "- Dataset: {experiment_spec.dataset}"
Display: "- Metrics: {experiment_spec.evaluation_metrics}"
```

### 4. Load Supporting Documents

```
# Load Experimental Architecture
Execute: mcp__archon__find_documents(
  project_id=project_id,
  document_type="design",
  query="Experimental Architecture"
)
Store: exp_architecture

# Load Model Architecture
Execute: mcp__archon__find_documents(
  project_id=project_id,
  document_type="design",
  query="Model Architecture"
)
Store: model_architecture

# Load Technical Stack
Execute: mcp__archon__find_documents(
  project_id=project_id,
  document_type="guide",
  query="Technical Stack"
)
Store: tech_stack

Display: "Loaded supporting documents:"
Display: "✓ Experimental Architecture"
Display: "✓ Model Architecture"
Display: "✓ Technical Stack"
```

### 5. Research Phase - Search Knowledge Base

```
Ask user: "Key technologies or patterns for this experiment (2-5 keywords):"
Store as: search_keywords
Default: Extract from experiment_spec if not provided

Execute: mcp__archon__rag_search_knowledge_base(
  query="{search_keywords}",
  match_count=5
)

Display: "Knowledge Base Findings:"
Summarize relevant patterns, best practices

Execute: mcp__archon__rag_search_code_examples(
  query="{search_keywords} {experiment_spec.method}",
  match_count=3
)

Display: "Code Examples Found:"
Summarize implementation patterns
```

### 6. Check Implementation Prerequisites

```
Ask user: "Is the codebase/ directory set up? (yes/no)"
If no:
  Display: "Setting up codebase structure..."
  Create necessary directories:
  - codebase/src/
  - codebase/experiments/
  - codebase/configs/
  - codebase/tests/
  - codebase/data/

Ask user: "Is wandb configured for this project? (yes/no)"
If no:
  Display: "Set up wandb tracking with:"
  Display: "  @ml-engineer"
  Display: "  *setup-wandb-tracking"
  Offer to continue without wandb (not recommended)
```

### 7. Implementation Planning

```
Display: "Planning implementation based on specs..."

Create implementation plan:
{
  "steps": [
    {
      "step": 1,
      "action": "Implement data loading pipeline",
      "files": ["codebase/src/data_loader.py"],
      "reference": "Data Pipeline Design doc"
    },
    {
      "step": 2,
      "action": "Implement model architecture",
      "files": ["codebase/src/models/{model_name}.py"],
      "reference": "Model Architecture doc"
    },
    {
      "step": 3,
      "action": "Implement training loop",
      "files": ["codebase/src/train.py"],
      "reference": "Technical Stack doc"
    },
    {
      "step": 4,
      "action": "Implement evaluation script",
      "files": ["codebase/src/evaluate.py"],
      "reference": "Experiment Specification"
    },
    {
      "step": 5,
      "action": "Configure experiment",
      "files": ["codebase/configs/{experiment_name}.yaml"],
      "reference": "Experiment Specification"
    }
  ]
}

Display implementation plan to user
Ask: "Proceed with this plan? (yes/modify):"
If modify: Adjust plan based on user input
```

### 8. Implement Experiment Code

```
For each step in implementation_plan:

  Display: "Step {step_num}: {step.action}"

  # Load relevant code examples from KB
  If step requires pattern:
    Search KB for pattern
    Display example

  # Implement (guide user or AI implements)
  Display: "Implementing in: {step.files}"

  # Option 1: User implements
  Ask user: "
  Options:
  1. I'll implement this step myself (pause here)
  2. AI implement this step (provide guidance)
  3. Skip this step for now

  Choice (1/2/3):"

  Handle choice:
  - If 1: Pause, wait for user to complete
  - If 2: Implement code with AI assistance
  - If 3: Note in task, continue

  # After each step:
  Ask: "Step {step_num} complete? (yes/no):"
  If yes: Continue to next step
  If no: Debug or revise
```

### 9. Setup Experiment Tracking

```
Display: "Setting up experiment tracking..."

# Create wandb tracking script
Create: codebase/experiments/{experiment_name}_tracking.py

Content:
"""
import wandb
from datetime import datetime

# Experiment metadata
EXPERIMENT_NAME = "{experiment_name}"
EXPERIMENT_ID = "{task_id}"
ARCHON_PROJECT_ID = "{project_id}"
ARCHON_SPEC_DOC_ID = "{experiment_spec_doc_id}"

# Initialize wandb
wandb.init(
    project="{archon_project_name}",
    name=f"{EXPERIMENT_NAME}_{datetime.now().strftime('%Y%m%d_%H%M%S')}",
    config={
        "experiment_id": EXPERIMENT_ID,
        "archon_spec": ARCHON_SPEC_DOC_ID,
        **{hyperparameters}
    },
    tags=["{experiment_name_slug}", "research"]
)

# Log experiment metadata
wandb.config.update({
    "dataset": "{experiment_spec.dataset}",
    "method": "{experiment_spec.method}",
    "primary_metric": "{experiment_spec.primary_metric}"
})
"""

Display: "✓ Created wandb tracking script"
```

### 10. Run Experiment

```
Display: "Ready to run experiment: {experiment_name}"

Ask user: "Run experiment now? (yes/later):"
If later:
  Display: "Experiment code ready. Run manually with:"
  Display: "  cd codebase/"
  Display: "  python experiments/{experiment_name}_tracking.py"
  Go to step 12

If yes:
  Display: "Running experiment..."

  # Execute experiment
  Execute: cd codebase && python experiments/{experiment_name}_tracking.py

  # Monitor progress
  Display: "Experiment running... Monitor at:"
  Display: "  wandb: {wandb_run_url}"

  # Wait for completion or user interrupt
  Poll for completion

  # Capture results
  Store: experiment_results
```

### 11. Log Results to Archon

```
# Create Experiment Results document
Build results_content:
{
  "experiment_name": "{experiment_name}",
  "experiment_id": "{task_id}",
  "completed_date": "{current_date}",
  "experiment_spec_doc_id": "{experiment_spec_doc_id}",

  "results": {
    "primary_metric": {
      "name": "{primary_metric}",
      "value": "{result_value}",
      "std": "{std_value}"
    },
    "secondary_metrics": [
      {
        "name": "{metric}",
        "value": "{value}",
        "std": "{std}"
      } for metric in secondary_metrics
    ],
    "seeds": "{num_seeds}",
    "statistical_tests": {
      "t_test_p_value": "{p_value}",
      "confidence_interval": "{ci}"
    }
  },

  "runtime": {
    "total_time": "{runtime}",
    "gpu_hours": "{gpu_hours}"
  },

  "artifacts": {
    "wandb_run_id": "{wandb_run_id}",
    "wandb_url": "{wandb_url}",
    "model_path": "{model_checkpoint_path}",
    "logs_path": "{logs_path}"
  },

  "observations": {
    "unexpected_findings": "...",
    "issues_encountered": "...",
    "notes": "..."
  }
}

Execute: mcp__archon__manage_document(
  action="create",
  project_id=project_id,
  title="Results: {experiment_name}",
  document_type="note",
  content=results_content,
  tags=["experiment-results", experiment_name_slug],
  author="ML Engineer"
)

Store: results_doc_id
Display: "✓ Created Experiment Results document (ID: {results_doc_id})"
```

### 12. Update Task with Progress

```
# Update task description with results
Execute: mcp__archon__manage_task(
  action="update",
  task_id=task_id,
  description="{original_description}

  ═══ IMPLEMENTATION COMPLETE ═══
  Code: codebase/experiments/{experiment_name}_tracking.py
  Results Doc: {results_doc_id}
  wandb Run: {wandb_run_id}

  Results Summary:
  - {primary_metric}: {value} ± {std}
  - Runtime: {runtime}

  Status: Ready for Data Analyst review",
  status="review"
)

Display: "✓ Updated task with results and marked as 'review'"
```

### 13. Update Innovation Log

```
Ask user: "Any unexpected findings or insights to log? (yes/no):"
If yes:
  Elicit: innovation_notes

  # Find or create Innovation Log
  Execute: mcp__archon__find_documents(
    project_id=project_id,
    query="Innovation Log"
  )

  If exists:
    Update existing log
  Else:
    Create new Innovation Log

  Append:
  {
    "date": "{current_date}",
    "experiment": "{experiment_name}",
    "finding": "{innovation_notes}",
    "implications": "...",
    "next_steps": "..."
  }

  Display: "✓ Updated Innovation Log"
```

### 14. Summary

```
Display: "
═══════════════════════════════════════════════════════════
EXPERIMENT IMPLEMENTED AND RUN
═══════════════════════════════════════════════════════════
Experiment: {experiment_name}
Task ID: {task_id}
Status: review (ready for Data Analyst)

Implementation:
✓ Code: codebase/experiments/{experiment_name}_tracking.py
✓ wandb tracking: {wandb_run_id}
✓ Results logged to Archon (doc_id: {results_doc_id})

Results Summary:
- {primary_metric}: {value} ± {std}
- Statistical significance: {p_value < 0.05 ? 'YES' : 'NO'}
- Runtime: {runtime}
- GPU hours: {gpu_hours}

═══════════════════════════════════════════════════════════
View results:
- Archon: http://localhost:3737
- wandb: {wandb_url}

NEXT STEPS:
1. Switch to @data-analyst for detailed analysis
2. Use *analyze-results to create figures and statistical tests
3. Continue with next experiment

Experiment complete! Ready for analysis.
"
```

### 15. Offer Next Action

```
Ask user: "What would you like to do next?
1. Implement next experiment
2. Switch to @data-analyst for analysis
3. Review results in wandb/Archon
4. Exit for now

Choice (1/2/3/4):"

Handle user choice accordingly
```

## Output

- Experiment code implemented in codebase/
- Experiment run and tracked in wandb
- Experiment Results document created in Archon (type=note)
- Task updated with results and marked as 'review'
- Innovation Log updated if applicable
- Ready for Data Analyst to analyze results

## Notes

- Task status flow: todo → doing → review → done
- Only ONE task should be 'doing' at a time
- Results are logged to both wandb (raw data) and Archon (metadata)
- Code stays in Git, metadata in Archon
- Data Analyst will mark as 'done' after analysis complete
- wandb integration is critical for experiment tracking
- Innovation Log captures unexpected findings
