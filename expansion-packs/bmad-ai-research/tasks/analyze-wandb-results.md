## <!-- Powered by BMAD™ Core -->

# Analyze Weights & Biases Results

**Task**: Fetch, analyze, and visualize experiment data from wandb using MCP server

**When to Use**: After ML Engineer completes experiment runs and you need to analyze results

**Agent**: Data Analyst (Dr. Maya Patel)

**Prerequisites**: wandb MCP server configured (see README for setup)

**Output**: Statistical analysis, publication-quality figures, and summary reports in results/

---

## wandb MCP Server Tools Available

The wandb MCP server provides these tools:

1. **`mcp__wandb__query_wandb_tool`**: Query runs, sweeps, metrics
2. **`mcp__wandb__query_weave_traces_tool`**: Access Weave traces (for LLM debugging)
3. **`mcp__wandb__execute_sandbox_code_tool`**: Run Python analysis in sandbox
4. **`mcp__wandb__create_wandb_report_tool`**: Generate shareable reports

---

## Process

### Step 1: Identify Experiment Runs

First, query wandb to find relevant runs:

```
Use mcp__wandb__query_wandb_tool with:

Query: "List all runs from project 'phd-research' with tag 'exp-123'"

Or more specifically:
"Get runs from 'phd-research' project where:
- tags contain 'baseline-transformer'
- state is 'finished'
- created_at > '2025-01-01'
Order by validation accuracy descending
Limit 10"
```

**Example MCP Query**:

```json
{
  "project": "phd-research",
  "filters": {
    "tags": { "$in": ["exp-123", "baseline"] },
    "state": "finished"
  },
  "order": "-summary_metrics.val/accuracy",
  "limit": 10
}
```

The tool returns:

- Run IDs, names, states
- Config (hyperparameters)
- Summary metrics (final values)
- Tags, groups, creation time

---

### Step 2: Fetch Detailed Metrics

For selected runs, get full metrics history:

```
Use mcp__wandb__query_wandb_tool to:

"Get full metrics history for run 'abc123' including:
- train/loss
- train/accuracy
- val/loss
- val/accuracy
- learning_rate
- system/gpu_utilization"
```

**Returns**: Time-series data for all logged metrics

---

### Step 3: Statistical Analysis

#### 3a. Compare Multiple Runs

```python
# Use mcp__wandb__execute_sandbox_code_tool to run:

import pandas as pd
import numpy as np
from scipy import stats

# Fetch data for multiple runs
runs_data = {
    'baseline': get_run_metrics('run-baseline-001'),
    'novel': get_run_metrics('run-novel-001'),
}

# Extract final validation accuracy
baseline_acc = runs_data['baseline']['val/accuracy'].iloc[-1]
novel_acc = runs_data['novel']['val/accuracy'].iloc[-1]

# Statistical test (if multiple runs exist)
baseline_runs = [get_final_metric(run_id, 'val/accuracy')
                 for run_id in baseline_run_ids]
novel_runs = [get_final_metric(run_id, 'val/accuracy')
              for run_id in novel_run_ids]

# t-test
t_stat, p_value = stats.ttest_ind(baseline_runs, novel_runs)

result = {
    'baseline_mean': np.mean(baseline_runs),
    'baseline_std': np.std(baseline_runs),
    'novel_mean': np.mean(novel_runs),
    'novel_std': np.std(novel_runs),
    't_statistic': t_stat,
    'p_value': p_value,
    'significant': p_value < 0.05
}

print(result)
```

---

#### 3b. Analyze Hyperparameter Sweeps

```
Query wandb for sweep results:

"Get all runs from sweep 'sweet-sweep-123' in project 'phd-research'
Include config and final validation accuracy
Order by val/accuracy descending"
```

Then analyze:

```python
# In sandbox
import pandas as pd
import seaborn as sns

# Create dataframe
sweep_results = pd.DataFrame([
    {**run.config, 'val_accuracy': run.summary['val/accuracy']}
    for run in sweep_runs
])

# Find best config
best_idx = sweep_results['val_accuracy'].idxmax()
best_config = sweep_results.iloc[best_idx]

# Analyze parameter importance
correlations = sweep_results.corr()['val_accuracy'].sort_values(ascending=False)

print("Best Configuration:")
print(best_config)
print("\nParameter Correlations with Accuracy:")
print(correlations)
```

---

### Step 4: Create Publication-Quality Figures

#### 4a. Training Curves Comparison

```python
# Use execute_sandbox_code_tool

import matplotlib.pyplot as plt
import matplotlib
matplotlib.use('Agg')  # For headless environments

fig, axes = plt.subplots(1, 2, figsize=(14, 5))

# Plot 1: Loss curves
for method_name, run_id in methods.items():
    history = get_run_history(run_id)
    axes[0].plot(history['epoch'], history['train/loss'],
                 label=f'{method_name} (train)', linestyle='--')
    axes[0].plot(history['epoch'], history['val/loss'],
                 label=f'{method_name} (val)')

axes[0].set_xlabel('Epoch', fontsize=12)
axes[0].set_ylabel('Loss', fontsize=12)
axes[0].set_title('Training and Validation Loss', fontsize=14)
axes[0].legend()
axes[0].grid(alpha=0.3)

# Plot 2: Accuracy curves
for method_name, run_id in methods.items():
    history = get_run_history(run_id)
    axes[1].plot(history['epoch'], history['val/accuracy'],
                 label=method_name, linewidth=2)

axes[1].set_xlabel('Epoch', fontsize=12)
axes[1].set_ylabel('Validation Accuracy (%)', fontsize=12)
axes[1].set_title('Validation Accuracy', fontsize=14)
axes[1].legend()
axes[1].grid(alpha=0.3)

plt.tight_layout()
plt.savefig('results/training_curves.pdf', dpi=300, bbox_inches='tight')
plt.savefig('results/training_curves.png', dpi=300, bbox_inches='tight')
```

---

#### 4b. Results Comparison Bar Chart

```python
import matplotlib.pyplot as plt
import numpy as np

methods = ['Baseline', 'Method A', 'Method B', 'Ours']
accuracies = [85.2, 87.1, 88.5, 91.3]
std_devs = [0.8, 0.6, 0.9, 0.7]

fig, ax = plt.subplots(figsize=(10, 6))

x = np.arange(len(methods))
bars = ax.bar(x, accuracies, yerr=std_devs,
              capsize=10, alpha=0.8,
              color=['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728'])

ax.set_xlabel('Method', fontsize=14)
ax.set_ylabel('Accuracy (%)', fontsize=14)
ax.set_title('Method Comparison on Test Set', fontsize=16)
ax.set_xticks(x)
ax.set_xticklabels(methods, fontsize=12)
ax.set_ylim([80, 95])
ax.grid(axis='y', alpha=0.3)

# Add value labels on bars
for bar, acc, std in zip(bars, accuracies, std_devs):
    height = bar.get_height()
    ax.text(bar.get_x() + bar.get_width()/2., height + 0.5,
            f'{acc:.1f}±{std:.1f}',
            ha='center', va='bottom', fontsize=11)

plt.tight_layout()
plt.savefig('results/method_comparison.pdf', dpi=300, bbox_inches='tight')
```

---

#### 4c. Hyperparameter Sweep Heatmap

```python
import seaborn as sns

# Pivot sweep results
pivot_data = sweep_results.pivot_table(
    values='val_accuracy',
    index='learning_rate',
    columns='batch_size',
    aggfunc='mean'
)

fig, ax = plt.subplots(figsize=(10, 8))
sns.heatmap(pivot_data, annot=True, fmt='.2f', cmap='RdYlGn',
            cbar_kws={'label': 'Validation Accuracy (%)'})

ax.set_title('Hyperparameter Sweep: LR vs Batch Size', fontsize=14)
ax.set_xlabel('Batch Size', fontsize=12)
ax.set_ylabel('Learning Rate', fontsize=12)

plt.tight_layout()
plt.savefig('results/sweep_heatmap.pdf', dpi=300, bbox_inches='tight')
```

---

### Step 5: Create Summary Tables

#### 5a. Results Table (LaTeX Format)

```python
# Create results dataframe
results_df = pd.DataFrame({
    'Method': ['Baseline', 'Method A', 'Method B', 'Ours'],
    'Accuracy': [85.2, 87.1, 88.5, 91.3],
    'Std': [0.8, 0.6, 0.9, 0.7],
    'Precision': [84.5, 86.8, 88.1, 90.9],
    'Recall': [83.8, 86.2, 87.9, 91.1],
    'F1': [84.1, 86.5, 88.0, 91.0],
    'Params (M)': [12.3, 15.1, 14.8, 13.2],
})

# Export to LaTeX
latex_table = results_df.to_latex(
    index=False,
    float_format='%.1f',
    caption='Performance comparison on test set. Best results in bold.',
    label='tab:results',
    escape=False,
)

with open('results/results_table.tex', 'w') as f:
    f.write(latex_table)

print("LaTeX table saved to results/results_table.tex")
```

---

#### 5b. Hyperparameter Configuration Table

```python
# Best configurations from sweep
best_configs = sweep_results.nlargest(5, 'val_accuracy')[
    ['learning_rate', 'batch_size', 'optimizer', 'dropout', 'val_accuracy']
]

latex_config = best_configs.to_latex(
    index=False,
    float_format='%.4f',
    caption='Top 5 hyperparameter configurations from sweep.',
    label='tab:hyperparams',
)

with open('results/hyperparams_table.tex', 'w') as f:
    f.write(latex_config)
```

---

### Step 6: Generate wandb Report

Use MCP tool to create shareable report:

```
Use mcp__wandb__create_wandb_report_tool:

"Create wandb report for project 'phd-research' titled 'Experiment 123 Results'
Include runs: ['run-baseline-001', 'run-novel-001', 'run-novel-002']
Sections:
1. Overview - Summary of experiment hypothesis and methods
2. Training Curves - Loss and accuracy over epochs
3. Final Results - Bar chart comparison
4. Hyperparameters - Configuration table
5. Conclusions - Key findings

Save as: 'Experiment-123-Analysis'"
```

The tool generates a shareable wandb report URL.

---

### Step 7: Export to results/ Folder

Organize all outputs:

```bash
results/
├── exp-123/
│   ├── analysis_summary.md          # Written summary
│   ├── training_curves.pdf          # Figure 1
│   ├── training_curves.png          # Figure 1 (PNG)
│   ├── method_comparison.pdf        # Figure 2
│   ├── method_comparison.png        # Figure 2 (PNG)
│   ├── results_table.tex            # LaTeX table
│   ├── hyperparams_table.tex        # LaTeX table
│   ├── statistical_tests.json       # Test results
│   ├── run_summaries.csv            # All run data
│   └── wandb_report_url.txt         # Link to wandb report
```

---

### Step 8: Create Analysis Summary

Write summary document for Research Writer:

```markdown
# Experiment 123: Analysis Summary

## Objective

Test hypothesis: Novel attention mechanism improves accuracy by 5%

## Methods Compared

- Baseline Transformer (standard self-attention)
- Method A (multi-head with 16 heads)
- Method B (sparse attention)
- Ours (novel adaptive attention)

## Key Findings

### Quantitative Results

- **Our method achieves 91.3% accuracy** (±0.7%)
- **+6.1% improvement** over baseline (85.2%)
- **Statistical significance**: t=8.42, p<0.001
- **Fewer parameters**: 13.2M vs 15.1M (Method A)

### Training Behavior

- Converges faster: 50 epochs vs 80 for baseline
- More stable: Lower variance across runs
- Better generalization: 2.1% train-val gap vs 4.3%

### Hyperparameter Sensitivity

- **Optimal learning rate**: 0.0003 (sweep analysis)
- **Best batch size**: 64 (memory vs performance trade-off)
- Relatively robust to dropout (0.2-0.4 range)

## Figures for Paper

- training_curves.pdf - Shows convergence comparison
- method_comparison.pdf - Final results bar chart
- results_table.tex - LaTeX formatted table

## Conclusions

Novel method successfully validated. Ready for paper Section 4 (Experiments).

## wandb Report

https://wandb.ai/username/phd-research/reports/Experiment-123-Analysis--VmlldzoxMjM0NTY=
```

Save to: `results/exp-123/analysis_summary.md`

---

## Checklist

After completing analysis:

- [ ] Fetched all relevant run data from wandb
- [ ] Statistical tests performed (t-tests, ANOVA if applicable)
- [ ] Publication-quality figures created (PDF + PNG, 300 DPI)
- [ ] LaTeX tables generated
- [ ] Sweep analysis completed (if applicable)
- [ ] wandb report generated and URL saved
- [ ] All outputs organized in results/exp-{id}/
- [ ] Analysis summary written for Research Writer
- [ ] Findings verified and reproducible

---

## Tips

1. **Use Sandbox for Complex Analysis**: The `execute_sandbox_code_tool` lets you run full Python scripts
2. **Batch Queries**: Fetch multiple runs at once to reduce API calls
3. **Save Intermediate Data**: Export raw data to CSV for offline analysis
4. **Version Figures**: Date-stamp figures if iterating on analysis
5. **Document Assumptions**: Note any data filtering or exclusions

---

## Next Steps

1. Share `results/exp-{id}/` folder with Research Writer
2. Research Writer incorporates figures into paper
3. If revisions needed, re-run specific analysis sections
4. For paper submission, ensure 300 DPI, proper fonts, color schemes

---

## Troubleshooting

**Issue**: MCP query returns no runs

- Verify project name matches exactly
- Check tag/filter syntax
- Ensure runs completed successfully

**Issue**: Figures look different than wandb UI

- Wandb UI may use different smoothing
- Verify metric names match exactly
- Check for missing data points

**Issue**: Statistical tests fail

- Need multiple runs per method (n≥3)
- Check for outliers
- Verify assumptions (normality, equal variance)

---

## Related

- [setup-wandb-tracking.md](setup-wandb-tracking.md) - ML Engineer wandb setup
- [compare-wandb-experiments.md](compare-wandb-experiments.md) - Multi-experiment comparison
- Research Writer uses results/ for paper writing
