# Archon Analyze Results

## Purpose

Analyze experiment results from Archon and wandb, perform statistical tests, create visualizations.

## Prerequisites

- Archon project initialized (project_id available)
- Experiment task in 'review' status
- Experiment Results document exists
- Data Analyst agent active
- wandb data available

## Task Steps

### 1. Get Review Queue

```
Execute: mcp__archon__find_tasks(
  project_id=project_id,
  filter_by="status",
  filter_value="review"
)

Display experiment tasks in review (numbered list)

Ask user: "Select experiment to analyze (number or task_id):"
Store as: task_id

Execute: mcp__archon__find_tasks(
  project_id=project_id,
  task_id=task_id
)

Store: experiment_task
Display: "Selected: {experiment_task.title}"
```

### 2. Load Experiment Results from Archon

```
Extract results_doc_id from task description

Execute: mcp__archon__find_documents(
  project_id=project_id,
  document_id=results_doc_id
)

Store: experiment_results

Display: "Experiment Results Summary:"
Display: "- Primary Metric: {experiment_results.primary_metric.value} ± {std}"
Display: "- wandb Run: {experiment_results.artifacts.wandb_run_id}"
Display: "- Seeds: {experiment_results.seeds}"
```

### 3. Load Experiment Specification

```
Extract experiment_spec_doc_id from experiment_results

Execute: mcp__archon__find_documents(
  project_id=project_id,
  document_id=experiment_spec_doc_id
)

Store: experiment_spec

Display: "Experiment Specification:"
Display: "- Method: {experiment_spec.method}"
Display: "- Dataset: {experiment_spec.dataset}"
Display: "- Success Criteria: {experiment_spec.success_criteria}"
```

### 4. Fetch Detailed Results from wandb

```
Ask user: "Fetch detailed wandb data for analysis? (yes/no):"
If yes:
  Display: "Fetching wandb data..."

  # Option 1: Use wandb MCP if available
  If wandb_mcp_available:
    Execute: mcp__wandb__query_wandb_tool(
      run_id=experiment_results.artifacts.wandb_run_id
    )
    Store: wandb_data
    Display: "✓ Fetched wandb data via MCP"

  # Option 2: Load from results/ directory
  Else:
    Ask user: "Export wandb data to results/? (yes/skip):"
    If yes:
      @ml-engineer *export-wandb-results {wandb_run_id}
      Load from results/{experiment_name}/
      Store: wandb_data

Store: full_results_data
```

### 5. Load Baseline Comparison Matrix

```
Execute: mcp__archon__find_documents(
  project_id=project_id,
  query="Baseline Comparison Matrix"
)

If exists:
  Store: baseline_matrix
  Display: "Loaded Baseline Comparison Matrix"
  Display current state-of-the-art performance
Else:
  Display: "⚠️ No Baseline Comparison Matrix found"
  Ask: "Create one now? (yes/no)"
  If yes: Create baseline matrix document
```

### 6. Statistical Analysis

```
Display: "Performing statistical analysis..."

# Compute statistics
Analyze full_results_data:

1. Descriptive Statistics:
   - Mean, median, std dev for each metric
   - Min, max, quartiles
   - Confidence intervals (95%)

2. Hypothesis Testing:
   - Paired t-test vs each baseline
   - Effect size (Cohen's d)
   - Statistical significance (p-value)

3. Multiple Comparison Correction:
   - Bonferroni correction if multiple baselines
   - Adjusted p-values

4. Convergence Analysis:
   - Training curves
   - Learning stability across seeds

Store: statistical_analysis

Display results:
"
Statistical Analysis:
═══════════════════════════════════════

Primary Metric: {primary_metric}
- Mean: {mean} ± {std}
- 95% CI: [{ci_lower}, {ci_upper}]

Comparison vs Baselines:
{for baseline in baselines:}
- vs {baseline.name}:
  - Δ: {delta} ({percent_change}%)
  - p-value: {p_value}
  - Effect size: {cohen_d}
  - Significant: {p_value < 0.05 ? 'YES ✓' : 'NO ✗'}

{end for}

Success Criteria Met: {criteria_met ? 'YES ✓' : 'NO ✗'}
"
```

### 7. Create Visualizations

```
Display: "Creating visualizations in results/figures/..."

# Ensure directory exists
Create directory: results/figures/{experiment_name}/

# Figure 1: Performance Comparison
Create: results/figures/{experiment_name}/performance_comparison.pdf
- Bar plot comparing our method vs baselines
- Error bars showing ±1 std dev
- Significance markers (* for p<0.05, ** for p<0.01)

# Figure 2: Training Curves
Create: results/figures/{experiment_name}/training_curves.pdf
- Line plot of training/validation metrics over time
- Shaded region for ±1 std dev across seeds
- Compare our method vs best baseline

# Figure 3: Statistical Distribution
Create: results/figures/{experiment_name}/distribution.pdf
- Box plots or violin plots for each method
- Shows distribution across random seeds

# Figure 4: Ablation Analysis (if applicable)
If ablation_study:
  Create: results/figures/{experiment_name}/ablation_analysis.pdf
  - Impact of each component
  - Performance vs complexity trade-off

Display: "✓ Created {figure_count} figures in results/figures/{experiment_name}/"
```

### 8. Create LaTeX Tables

```
Display: "Creating LaTeX tables for paper..."

# Ensure directory exists
Create directory: results/tables/

# Table 1: Main Results
Create: results/tables/{experiment_name}_main_results.tex

LaTeX content:
"""
\begin{table}[t]
\centering
\caption{Results on {experiment_spec.dataset}}
\label{tab:{experiment_name}_results}
\begin{tabular}{lcc}
\toprule
Method & {primary_metric} & {secondary_metric} \\
\midrule
{for baseline in baselines:}
{baseline.name} & {baseline.result} $\pm$ {baseline.std} & {baseline.secondary} \\
{end for}
\midrule
\textbf{Ours} & \textbf{{our_result} $\pm$ {our_std}} & \textbf{{our_secondary}} \\
\bottomrule
\end{tabular}
\end{table}
"""

# Table 2: Statistical Significance
Create: results/tables/{experiment_name}_significance.tex

Display: "✓ Created LaTeX tables in results/tables/"
```

### 9. Update Baseline Comparison Matrix

```
Execute: mcp__archon__find_documents(
  project_id=project_id,
  document_id=baseline_matrix_doc_id
)

Load existing_matrix

Update with new results:
{
  ...existing_matrix,
  "experiments": [
    ...existing_experiments,
    {
      "experiment_name": "{experiment_name}",
      "dataset": "{dataset}",
      "our_method": {
        "metric": "{primary_metric}",
        "value": "{result}",
        "std": "{std}",
        "date": "{current_date}"
      },
      "baselines": [
        {baseline_results} for baseline in baselines
      ],
      "beats_sota": {beats_sota},
      "improvement_over_best_baseline": "{percent_improvement}%"
    }
  ]
}

Execute: mcp__archon__manage_document(
  action="update",
  project_id=project_id,
  document_id=baseline_matrix_doc_id,
  content=updated_matrix
)

Display: "✓ Updated Baseline Comparison Matrix"
```

### 10. Create Statistical Analysis Document

```
Build analysis_content:
{
  "experiment_name": "{experiment_name}",
  "experiment_results_doc_id": "{results_doc_id}",
  "analysis_date": "{current_date}",

  "descriptive_statistics": {
    "primary_metric": {
      "mean": "{mean}",
      "std": "{std}",
      "ci_95": ["{ci_lower}", "{ci_upper}"],
      "min": "{min}",
      "max": "{max}"
    },
    "secondary_metrics": [{...}]
  },

  "hypothesis_testing": {
    "null_hypothesis": "No difference from baselines",
    "alternative_hypothesis": "Our method is better",
    "results": [
      {
        "baseline": "{baseline.name}",
        "t_statistic": "{t_stat}",
        "p_value": "{p_value}",
        "effect_size": "{cohen_d}",
        "conclusion": "{significant ? 'Reject H0' : 'Fail to reject H0'}"
      } for baseline in baselines
    ],
    "bonferroni_correction": "{adjusted_alpha}"
  },

  "success_criteria": {
    "criteria": "{experiment_spec.success_criteria}",
    "met": {criteria_met},
    "details": "..."
  },

  "visualizations": {
    "figures": [
      "{figure_path}" for figure in created_figures
    ],
    "tables": [
      "{table_path}" for table in created_tables
    ]
  },

  "interpretation": {
    "key_findings": "...",
    "implications": "...",
    "limitations": "...",
    "future_work": "..."
  }
}

Execute: mcp__archon__manage_document(
  action="create",
  project_id=project_id,
  title="Analysis: {experiment_name}",
  document_type="note",
  content=analysis_content,
  tags=["statistical-analysis", experiment_name_slug],
  author="Data Analyst"
)

Store: analysis_doc_id
Display: "✓ Created Statistical Analysis document (ID: {analysis_doc_id})"
```

### 11. Mark Task as Complete

```
# Update task with analysis results
Execute: mcp__archon__manage_task(
  action="update",
  task_id=task_id,
  description="{original_description}

  ═══ ANALYSIS COMPLETE ═══
  Analysis Doc: {analysis_doc_id}
  Figures: results/figures/{experiment_name}/
  Tables: results/tables/{experiment_name}_*.tex

  Key Findings:
  - Success criteria met: {criteria_met ? 'YES' : 'NO'}
  - Beats best baseline by: {improvement}%
  - Statistical significance: {all_significant ? 'YES' : 'PARTIAL'}

  Status: Complete, ready for paper writing",
  status="done"
)

Display: "✓ Marked task as 'done'"
```

### 12. Create Paper Writing Task (if results are significant)

```
If results_significant OR criteria_met:
  Ask user: "Results look good! Create paper writing task? (yes/no):"
  If yes:
    Execute: mcp__archon__manage_task(
      action="create",
      project_id=project_id,
      title="Write Paper Section: {experiment_name} Results",
      description="Incorporate {experiment_name} results into paper.

      References:
      - Analysis: {analysis_doc_id}
      - Results: {results_doc_id}
      - Figures: results/figures/{experiment_name}/
      - Tables: results/tables/{experiment_name}_*.tex

      Key points to include:
      - {improvement}% improvement over baselines
      - Statistical significance (p < {min_p_value})
      - {key_finding_1}
      - {key_finding_2}",
      feature="paper",
      status="todo",
      task_order=70,
      assignee="Research Writer"
    )
    Display: "✓ Created paper writing task for Research Writer"
```

### 13. Summary

```
Display: "
═══════════════════════════════════════════════════════════
EXPERIMENT ANALYSIS COMPLETE
═══════════════════════════════════════════════════════════
Experiment: {experiment_name}
Analysis Date: {current_date}
Task Status: done

Results:
✓ Primary Metric: {mean} ± {std}
✓ Improvement: {improvement}% over best baseline
✓ Statistical Significance: {p_value}
✓ Success Criteria: {criteria_met ? 'MET ✓' : 'NOT MET ✗'}

Outputs Created:
✓ Statistical Analysis (doc_id: {analysis_doc_id})
✓ Figures: {figure_count} in results/figures/{experiment_name}/
✓ Tables: {table_count} in results/tables/
✓ Baseline Comparison Matrix updated

═══════════════════════════════════════════════════════════
View analysis:
- Archon: http://localhost:3737
- Figures: results/figures/{experiment_name}/

NEXT STEPS:
1. Switch to @research-writer to write paper section
2. Or analyze next experiment with *analyze-results
3. Or review all results and plan next experiments

Analysis complete! Ready for paper writing.
"
```

### 14. Offer Next Action

```
Ask user: "What would you like to do next?
1. Write paper section for these results (@research-writer)
2. Analyze next experiment in review queue
3. Review all results in Archon
4. Plan follow-up experiments based on findings
5. Exit for now

Choice (1/2/3/4/5):"

Handle user choice accordingly
```

## Output

- Statistical Analysis document created in Archon (type=note)
- Figures created in results/figures/
- LaTeX tables created in results/tables/
- Baseline Comparison Matrix updated
- Task marked as 'done'
- Paper writing task created (if results significant)
- Ready for research writing phase

## Notes

- Analysis always includes statistical significance testing
- Visualizations are publication-quality (300 DPI, LaTeX fonts)
- Tables are camera-ready LaTeX format
- All findings documented in Archon for traceability
- Task marked 'done' only after analysis complete
- Research Writer will reference analysis_doc_id when writing
- Baseline Comparison Matrix tracks progress toward state-of-the-art
