# Archon Design Experiment

## Purpose

Design a specific experiment in Archon, creating experimental architecture and detailed experiment specifications.

## Prerequisites

- Archon project initialized (project_id available)
- Research Proposal exists
- Research Scientist agent active

## Task Steps

### 1. Check Prerequisites

```
Execute: mcp__archon__find_documents(
  project_id=project_id,
  document_type="spec"
)

Search for Research Proposal
If not found:
  Display: "⚠️ Research Proposal not found."
  Display: "Please create research proposal first using:"
  Display: "  @research-lead"
  Display: "  *create-research-proposal"
  HALT

Store: proposal_doc_id
```

### 2. Load Research Proposal

```
Execute: mcp__archon__find_documents(
  project_id=project_id,
  document_id=proposal_doc_id
)

Store: proposal_content

Extract from proposal:
- research_questions
- hypotheses
- proposed_approach
- success_metrics

Display: "Loaded Research Proposal"
Display: "Research Questions: {count}"
Display: "Hypotheses: {count}"
```

### 3. Select Research Question to Address

```
Display: "Which research question should this experiment address?"
Display research questions from proposal (numbered list)

Ask user: "Select question number (or 'all' for comprehensive experiment):"
Store as: target_question

If specific question selected:
  Extract related hypothesis
  Display: "Designing experiment for: {question}"
  Display: "Testing hypothesis: {hypothesis}"
```

### 4. Search Knowledge Base for Experimental Patterns

```
Extract key terms from target_question
Construct search query

Execute: mcp__archon__rag_search_knowledge_base(
  query="{key_terms} experimental design",
  match_count=5
)

Display: "Found {count} relevant experimental designs in knowledge base"
Summarize key patterns found
```

### 5. Search for Baseline Methods

```
Execute: mcp__archon__rag_search_knowledge_base(
  query="{key_terms} baseline methods",
  match_count=3
)

Execute: mcp__archon__rag_search_code_examples(
  query="{key_terms} implementation",
  match_count=3
)

Display: "Baseline methods identified from knowledge base:"
List baseline methods
```

### 6. Elicit Experimental Design

```
Display: "Let's design the experiment to test: {target_question}"
Display: ""

Ask user (structured elicitation):

1. "Experiment name (descriptive, e.g., 'Efficient Attention vs Baseline'):"
   Store as: experiment_name

2. "What exactly will we compare?"
   Options:
   - Our novel method vs existing baselines
   - Different variants of our method (ablation)
   - Our method under different conditions
   Store as: comparison_type

3. "Primary evaluation metric:"
   Store as: primary_metric
   Example: "Accuracy", "F1 Score", "Inference Speed"

4. "Secondary metrics (comma-separated):"
   Store as: secondary_metrics

5. "Datasets to use:"
   Store as: datasets

6. "Baseline methods to compare against:"
   Display baseline methods found in KB
   Ask: "Use these baselines or specify others?"
   Store as: baselines

7. "Experimental conditions/settings:"
   Store as: experimental_conditions
   Example: "Vary sequence length: 512, 1024, 2048, 4096"

8. "Success criteria (what results would validate hypothesis?):"
   Store as: success_criteria
   Example: ">5% improvement over best baseline on primary metric"

9. "Statistical significance requirements:"
   Store as: significance_requirements
   Default: "p < 0.05 over 5 random seeds"
```

### 7. Create Experimental Architecture Document

```
Build experimental architecture content:

{
  "version": "1.0",
  "created_date": "{current_date}",
  "experiment_name": "{experiment_name}",
  "research_question": "{target_question}",
  "hypothesis": "{hypothesis}",

  "experimental_design": {
    "type": "{comparison_type}",
    "approach": "Systematic comparison of methods under controlled conditions",
    "methodology": {
      "datasets": [
        {dataset} for dataset in datasets
      ],
      "baselines": [
        {
          "name": "{baseline_name}",
          "description": "...",
          "source": "From KB search or user specified"
        } for baseline in baselines
      ],
      "our_method": {
        "name": "...",
        "description": "...",
        "novelty": "From research proposal"
      },
      "experimental_conditions": "{experimental_conditions}"
    }
  },

  "evaluation": {
    "primary_metric": "{primary_metric}",
    "secondary_metrics": [
      {metric} for metric in secondary_metrics
    ],
    "success_criteria": "{success_criteria}",
    "statistical_tests": {
      "significance_level": 0.05,
      "num_seeds": 5,
      "test_type": "Paired t-test"
    }
  },

  "implementation_plan": {
    "phase_1": "Implement baselines",
    "phase_2": "Implement our method",
    "phase_3": "Run experiments across all conditions",
    "phase_4": "Statistical analysis and visualization"
  },

  "expected_outcomes": {
    "if_hypothesis_true": "...",
    "if_hypothesis_false": "...",
    "alternative_interpretations": "..."
  },

  "references": {
    "research_proposal_doc_id": "{proposal_doc_id}",
    "kb_sources": [
      {source} for source in kb_search_results
    ]
  }
}

Execute: mcp__archon__manage_document(
  action="create",
  project_id=project_id,
  title="{experiment_name} - Experimental Architecture",
  document_type="design",
  content=architecture_content,
  tags=["experimental-architecture", "experiment-design", experiment_name_slug],
  author="Research Scientist"
)

Store: exp_arch_doc_id
Display: "✓ Created Experimental Architecture (ID: {exp_arch_doc_id})"
```

### 8. Create Baseline Specifications

```
For each baseline in baselines:

  Build baseline spec:
  {
    "baseline_name": "{baseline.name}",
    "description": "{baseline.description}",
    "implementation_details": {
      "architecture": "...",
      "hyperparameters": "...",
      "training_procedure": "..."
    },
    "source": "{baseline.source}",
    "expected_performance": "From literature or KB"
  }

  Execute: mcp__archon__manage_document(
    action="create",
    project_id=project_id,
    title="Baseline: {baseline.name}",
    document_type="spec",
    content=baseline_spec,
    tags=["baseline", "specification", experiment_name_slug],
    author="Research Scientist"
  )

  Display: "✓ Created Baseline Specification: {baseline.name}"
```

### 9. Create Individual Experiment Specifications

```
Determine experiments needed:
- One per baseline vs our method
- One per experimental condition (if multiple)
- Ablation studies (if applicable)

For each experiment:

  Build experiment spec:
  {
    "experiment_id": "exp-{counter}",
    "name": "...",
    "description": "...",
    "method": "baseline or ours",
    "condition": "...",
    "dataset": "...",
    "hyperparameters": {...},
    "evaluation_metrics": [...],
    "expected_runtime": "...",
    "resource_requirements": "..."
  }

  Execute: mcp__archon__manage_document(
    action="create",
    project_id=project_id,
    title="Experiment: {experiment.name}",
    document_type="spec",
    content=experiment_spec,
    tags=["experiment-spec", experiment_name_slug],
    author="Research Scientist"
  )

  # Also create as Archon task
  Execute: mcp__archon__manage_task(
    action="create",
    project_id=project_id,
    title="Run Experiment: {experiment.name}",
    description="Implement and run: {experiment.description}

    Specification: doc_id {exp_spec_doc_id}
    Architecture: doc_id {exp_arch_doc_id}

    Deliverables:
    - Trained model
    - Experiment results
    - Logs and metrics (wandb)",
    feature=experiment_name_slug,
    status="todo",
    task_order=80,
    assignee="ML Engineer"
  )

  Display: "✓ Created Experiment: {experiment.name} (doc + task)"
```

### 10. Create Benchmark Specifications

```
Build benchmark content:
{
  "benchmarks": [
    {
      "dataset": "{dataset}",
      "metric": "{metric}",
      "sota_performance": "...",
      "baseline_performance": "...",
      "target_performance": "..."
    } for dataset, metric in evaluation_plan
  ]
}

Execute: mcp__archon__manage_document(
  action="create",
  project_id=project_id,
  title="{experiment_name} - Benchmark Specifications",
  document_type="spec",
  content=benchmark_content,
  tags=["benchmarks", experiment_name_slug],
  author="Research Scientist"
)

Display: "✓ Created Benchmark Specifications"
```

### 11. Update Research Proposal

```
Execute: mcp__archon__find_documents(
  project_id=project_id,
  document_id=proposal_doc_id
)

Load existing proposal_content

Update with:
{
  ...existing_content,
  "experimental_designs": [
    ...existing_experiments,
    {
      "experiment_name": "{experiment_name}",
      "architecture_doc_id": "{exp_arch_doc_id}",
      "addresses_question": "{target_question}",
      "status": "designed"
    }
  ],
  "updated_date": current_date
}

Execute: mcp__archon__manage_document(
  action="update",
  project_id=project_id,
  document_id=proposal_doc_id,
  content=updated_proposal
)

Display: "✓ Updated Research Proposal with experiment design"
```

### 12. Summary

```
Count created documents and tasks

Display: "
═══════════════════════════════════════════════════════════
EXPERIMENT DESIGNED IN ARCHON
═══════════════════════════════════════════════════════════
Experiment: {experiment_name}
Research Question: {target_question}
Hypothesis: {hypothesis}

Documents Created:
✓ Experimental Architecture (ID: {exp_arch_doc_id})
✓ Baseline Specifications: {baseline_count}
✓ Experiment Specifications: {experiment_spec_count}
✓ Benchmark Specifications

Tasks Created: {task_count}
- All assigned to ML Engineer
- Feature: {experiment_name_slug}

Evaluation:
- Primary Metric: {primary_metric}
- Datasets: {dataset_count}
- Baselines: {baseline_count}
- Success Criteria: {success_criteria}

═══════════════════════════════════════════════════════════
View in Archon UI: http://localhost:3737

NEXT STEPS:
1. Switch to @experiment-pm to plan implementation
2. Or switch to @experiment-architect for technical design
3. Or continue designing more experiments with *design-experiment

Experimental design complete! Ready for implementation planning.
"
```

### 13. Offer Next Action

```
Ask user: "What would you like to do next?
1. Plan implementation with @experiment-pm
2. Design another experiment
3. Review designs in Archon UI
4. Exit for now

Choice (1/2/3/4):"

Handle user choice accordingly
```

## Output

- Experimental Architecture document created (type=design)
- Baseline Specifications created for each baseline (type=spec)
- Individual Experiment Specifications created (type=spec)
- Benchmark Specifications created (type=spec)
- Experiment tasks created in Archon
- Research Proposal updated with experiment references
- Ready for implementation planning

## Notes

- Each experiment gets both a document (spec) and a task
- All documents tagged with experiment_name_slug for easy filtering
- Baselines are fully specified for reproducibility
- Statistical requirements defined upfront
- Links all back to research proposal for traceability
- ML Engineer will reference these specs during implementation
