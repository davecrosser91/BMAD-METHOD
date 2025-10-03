## <!-- Powered by BMAD™ Core -->

# Compare Multiple wandb Experiments

**Task**: Statistical comparison and visualization of multiple experiment groups

**When to Use**: Comparing baselines, ablation studies, or different approaches across multiple runs

**Agent**: Data Analyst (Dr. Maya Patel)

**Prerequisites**: Multiple completed experiment runs in wandb

**Output**: Comparative analysis, statistical significance tests, comparative visualizations

---

## Use Cases

1. **Baseline vs Novel Method**: Compare your approach against established baselines
2. **Ablation Studies**: Test impact of individual components
3. **Hyperparameter Comparison**: Compare different hyperparameter choices
4. **Dataset Comparison**: Same method on different datasets
5. **Architecture Variants**: Compare model architecture choices

---

## Process

### Step 1: Define Comparison Groups

Identify runs to compare using tags/groups:

```
Use mcp__wandb__query_wandb_tool:

"Get all runs from project 'phd-research' where:
- Group 'ablation-study-attention'
- Tags include 'completed'
Organize by config.method_variant"
```

Example groups:

- `baseline`: Standard transformer
- `no-positional`: Without positional encoding
- `no-layer-norm`: Without layer normalization
- `full-model`: Complete novel approach

---

### Step 2: Fetch Comparison Data

Get metrics for all runs in each group:

```python
# Using mcp__wandb__execute_sandbox_code_tool

import wandb
api = wandb.Api()

comparison_groups = {
    'baseline': ['run-001', 'run-002', 'run-003'],
    'ablation-1': ['run-004', 'run-005', 'run-006'],
    'ablation-2': ['run-007', 'run-008', 'run-009'],
    'full': ['run-010', 'run-011', 'run-012'],
}

# Collect data
results = {}
for group_name, run_ids in comparison_groups.items():
    group_results = []
    for run_id in run_ids:
        run = api.run(f"username/phd-research/{run_id}")
        group_results.append({
            'run_id': run.id,
            'val_accuracy': run.summary['val/accuracy'],
            'val_loss': run.summary['val/loss'],
            'train_time': run.summary['train_time_hours'],
            'params': run.summary['model_params_millions'],
        })
    results[group_name] = group_results

print(f"Collected data for {len(results)} groups")
```

---

### Step 3: Statistical Analysis

#### 3a. Pairwise Comparisons

```python
import numpy as np
from scipy import stats

def compare_groups(group1_data, group2_data, metric='val_accuracy'):
    """Compare two groups statistically."""

    group1_values = [run[metric] for run in group1_data]
    group2_values = [run[metric] for run in group2_data]

    # Descriptive statistics
    g1_mean = np.mean(group1_values)
    g1_std = np.std(group1_values)
    g2_mean = np.mean(group2_values)
    g2_std = np.std(group2_values)

    # Statistical test
    t_stat, p_value = stats.ttest_ind(group1_values, group2_values)

    # Effect size (Cohen's d)
    pooled_std = np.sqrt((g1_std**2 + g2_std**2) / 2)
    cohens_d = (g2_mean - g1_mean) / pooled_std

    return {
        'group1_mean': g1_mean,
        'group1_std': g1_std,
        'group2_mean': g2_mean,
        'group2_std': g2_std,
        'difference': g2_mean - g1_mean,
        't_statistic': t_stat,
        'p_value': p_value,
        'significant': p_value < 0.05,
        'cohens_d': cohens_d,
        'effect_size': 'large' if abs(cohens_d) > 0.8 else 'medium' if abs(cohens_d) > 0.5 else 'small'
    }

# Compare all groups to baseline
baseline_data = results['baseline']

comparisons = {}
for group_name, group_data in results.items():
    if group_name != 'baseline':
        comp = compare_groups(baseline_data, group_data)
        comparisons[group_name] = comp
        print(f"\n{group_name} vs baseline:")
        print(f"  Δ Accuracy: {comp['difference']:.2f}%")
        print(f"  p-value: {comp['p_value']:.4f} {'***' if comp['p_value'] < 0.001 else '**' if comp['p_value'] < 0.01 else '*' if comp['p_value'] < 0.05 else 'ns'}")
        print(f"  Effect size: {comp['effect_size']} (d={comp['cohens_d']:.2f})")
```

---

#### 3b. ANOVA (Multiple Groups)

```python
from scipy import stats

# Extract all values
all_groups = [
    [run['val_accuracy'] for run in results[group]]
    for group in results.keys()
]

# One-way ANOVA
f_stat, p_value_anova = stats.f_oneway(*all_groups)

print(f"ANOVA Results:")
print(f"  F-statistic: {f_stat:.2f}")
print(f"  p-value: {p_value_anova:.4f}")
print(f"  Significant difference: {p_value_anova < 0.05}")

# Post-hoc: Bonferroni correction for multiple comparisons
n_comparisons = len(results) * (len(results) - 1) // 2
alpha_corrected = 0.05 / n_comparisons
print(f"  Bonferroni-corrected alpha: {alpha_corrected:.4f}")
```

---

### Step 4: Visualization

#### 4a. Box Plot Comparison

```python
import matplotlib.pyplot as plt
import seaborn as sns

fig, ax = plt.subplots(figsize=(12, 6))

# Prepare data for boxplot
plot_data = []
plot_labels = []
for group_name, group_runs in results.items():
    accuracies = [run['val_accuracy'] for run in group_runs]
    plot_data.append(accuracies)
    plot_labels.append(group_name)

# Create boxplot
bp = ax.boxplot(plot_data, labels=plot_labels, patch_artist=True)

# Color boxes
colors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd']
for patch, color in zip(bp['boxes'], colors):
    patch.set_facecolor(color)
    patch.set_alpha(0.7)

ax.set_ylabel('Validation Accuracy (%)', fontsize=14)
ax.set_xlabel('Method', fontsize=14)
ax.set_title('Method Comparison - Distribution of Results', fontsize=16)
ax.grid(axis='y', alpha=0.3)

# Add sample size annotations
for i, group_data in enumerate(plot_data):
    ax.text(i+1, min(group_data)-0.5, f'n={len(group_data)}',
            ha='center', fontsize=10)

plt.xticks(rotation=15, ha='right')
plt.tight_layout()
plt.savefig('results/comparison_boxplot.pdf', dpi=300, bbox_inches='tight')
```

---

#### 4b. Bar Chart with Significance Markers

```python
fig, ax = plt.subplots(figsize=(12, 7))

# Calculate means and stds
group_names = list(results.keys())
means = [np.mean([run['val_accuracy'] for run in results[g]]) for g in group_names]
stds = [np.std([run['val_accuracy'] for run in results[g]]) for g in group_names]

# Create bars
x = np.arange(len(group_names))
bars = ax.bar(x, means, yerr=stds, capsize=8, alpha=0.8,
              color=['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728'])

# Add significance markers
# (comparing to baseline)
for i, group in enumerate(group_names[1:], 1):
    if comparisons[group]['p_value'] < 0.001:
        marker = '***'
    elif comparisons[group]['p_value'] < 0.01:
        marker = '**'
    elif comparisons[group]['p_value'] < 0.05:
        marker = '*'
    else:
        marker = 'ns'

    # Draw significance line
    y_max = max(means[0], means[i]) + max(stds[0], stds[i]) + 1
    ax.plot([0, i], [y_max, y_max], 'k-', linewidth=1)
    ax.plot([0, 0], [y_max-0.2, y_max], 'k-', linewidth=1)
    ax.plot([i, i], [y_max-0.2, y_max], 'k-', linewidth=1)
    ax.text((0+i)/2, y_max+0.3, marker, ha='center', fontsize=12)

# Labels
ax.set_ylabel('Validation Accuracy (%)', fontsize=14)
ax.set_xlabel('Method', fontsize=14)
ax.set_title('Ablation Study Results\n(* p<0.05, ** p<0.01, *** p<0.001)', fontsize=16)
ax.set_xticks(x)
ax.set_xticklabels(group_names, rotation=15, ha='right')
ax.grid(axis='y', alpha=0.3)

# Add value labels
for bar, mean, std in zip(bars, means, stds):
    height = bar.get_height()
    ax.text(bar.get_x() + bar.get_width()/2., height + std + 0.5,
            f'{mean:.1f}±{std:.1f}',
            ha='center', va='bottom', fontsize=11)

plt.tight_layout()
plt.savefig('results/comparison_with_significance.pdf', dpi=300, bbox_inches='tight')
```

---

#### 4c. Radar Chart (Multiple Metrics)

```python
import numpy as np
import matplotlib.pyplot as plt

def create_radar_chart(results, metrics):
    """Create radar chart comparing methods across multiple metrics."""

    fig, ax = plt.subplots(figsize=(10, 10), subplot_kw=dict(projection='polar'))

    # Calculate angles
    angles = np.linspace(0, 2 * np.pi, len(metrics), endpoint=False).tolist()
    angles += angles[:1]  # Complete the circle

    # Plot each group
    for group_name, color in zip(results.keys(), ['b', 'r', 'g', 'orange']):
        values = [
            np.mean([run[metric] for run in results[group_name]])
            for metric in metrics
        ]
        values += values[:1]  # Complete the circle

        ax.plot(angles, values, 'o-', linewidth=2, label=group_name, color=color)
        ax.fill(angles, values, alpha=0.15, color=color)

    # Labels
    ax.set_xticks(angles[:-1])
    ax.set_xticklabels(metrics, fontsize=12)
    ax.set_ylim(0, 100)
    ax.set_title('Multi-Metric Comparison', fontsize=16, y=1.08)
    ax.legend(loc='upper right', bbox_to_anchor=(1.3, 1.1))
    ax.grid(True)

    plt.tight_layout()
    plt.savefig('results/radar_comparison.pdf', dpi=300, bbox_inches='tight')

# Example usage
metrics = ['val_accuracy', 'precision', 'recall', 'f1_score']
create_radar_chart(results, metrics)
```

---

### Step 5: Create Comparison Table

```python
import pandas as pd

# Build comparison dataframe
comparison_df = pd.DataFrame({
    'Method': [],
    'Accuracy (%)': [],
    'Loss': [],
    'Train Time (h)': [],
    'Params (M)': [],
    'vs Baseline': [],
    'p-value': [],
})

for group_name in results.keys():
    group_data = results[group_name]

    row = {
        'Method': group_name.replace('-', ' ').title(),
        'Accuracy (%)': f"{np.mean([r['val_accuracy'] for r in group_data]):.1f} ± {np.std([r['val_accuracy'] for r in group_data]):.1f}",
        'Loss': f"{np.mean([r['val_loss'] for r in group_data]):.3f}",
        'Train Time (h)': f"{np.mean([r['train_time'] for r in group_data]):.1f}",
        'Params (M)': f"{np.mean([r['params'] for r in group_data]):.1f}",
    }

    if group_name != 'baseline':
        comp = comparisons[group_name]
        row['vs Baseline'] = f"{comp['difference']:+.1f}%"
        row['p-value'] = f"{comp['p_value']:.4f}" if comp['p_value'] >= 0.001 else "<0.001"
    else:
        row['vs Baseline'] = '—'
        row['p_value'] = '—'

    comparison_df = pd.concat([comparison_df, pd.DataFrame([row])], ignore_index=True)

# Export to LaTeX
latex_table = comparison_df.to_latex(
    index=False,
    escape=False,
    caption='Comprehensive comparison of methods. Best results in bold.',
    label='tab:comparison',
)

# Bold the best results
# ... add formatting ...

with open('results/comparison_table.tex', 'w') as f:
    f.write(latex_table)

print(comparison_df)
```

---

### Step 6: Generate Summary Report

```markdown
# Multi-Experiment Comparison Summary

## Experiments Compared

- **Baseline**: Standard transformer architecture
- **Ablation 1**: Without positional encoding
- **Ablation 2**: Without layer normalization
- **Full Model**: Novel approach with all components

## Statistical Results

### Overall ANOVA

- F-statistic: 12.45
- p-value: <0.001
- **Significant differences exist between groups**

### Pairwise Comparisons (vs Baseline)

1. **Ablation 1 (No Positional Encoding)**
   - Δ Accuracy: -3.2%
   - p-value: 0.002 \*\*
   - Effect size: Medium (d=0.68)
   - **Conclusion**: Positional encoding is important

2. **Ablation 2 (No Layer Norm)**
   - Δ Accuracy: -5.1%
   - p-value: <0.001 \*\*\*
   - Effect size: Large (d=1.12)
   - **Conclusion**: Layer normalization critical for performance

3. **Full Model**
   - Δ Accuracy: +6.3%
   - p-value: <0.001 \*\*\*
   - Effect size: Large (d=1.35)
   - **Conclusion**: Novel components significantly improve accuracy

## Key Findings

1. All novel components contribute positively
2. Layer normalization has largest individual impact
3. Combined approach (full model) shows synergistic effects
4. Results are statistically robust (n=3 per group, p<0.001)

## Figures Generated

- comparison_boxplot.pdf
- comparison_with_significance.pdf
- radar_comparison.pdf
- comparison_table.tex

## Conclusions

Ablation study validates design choices. Full model ready for main experiments.
```

Save to: `results/multi-experiment-comparison.md`

---

## Checklist

- [ ] All comparison groups identified
- [ ] Statistical tests performed (t-tests or ANOVA)
- [ ] Multiple comparison correction applied (if needed)
- [ ] Effect sizes calculated
- [ ] Box plots created
- [ ] Significance markers added to visualizations
- [ ] Comparison table generated (LaTeX)
- [ ] Summary report written
- [ ] Results exported to results/ folder

---

## Tips

1. **Minimum Sample Size**: Need n≥3 runs per group for reliable statistics
2. **Multiple Comparisons**: Use Bonferroni correction for many comparisons
3. **Report Effect Sizes**: p-values alone don't show practical significance
4. **Check Assumptions**: Verify normality and equal variance for t-tests
5. **Visualize Distributions**: Box plots show outliers and variance

---

## Related

- [analyze-wandb-results.md](analyze-wandb-results.md) - Single experiment analysis
- [setup-wandb-tracking.md](setup-wandb-tracking.md) - wandb setup
