## <!-- Powered by BMAD™ Core -->

# Setup Weights & Biases Tracking

**Task**: Configure comprehensive wandb experiment tracking for ML research projects

**When to Use**: At the start of any new experiment or when setting up wandb for the first time

**Agent**: ML Engineer (Jordan Lee)

**Output**: Fully configured wandb tracking integrated into experimental codebase

---

## Prerequisites

- wandb Python package installed: `pip install wandb`
- wandb account created at https://wandb.ai
- wandb API key obtained from https://wandb.ai/authorize

---

## Process

### Step 1: wandb Account Setup

1. **Create wandb Account** (if not already done):
   - Visit https://wandb.ai
   - Sign up with academic email for education benefits
   - Create team/organization for your PhD research

2. **Get API Key**:

   ```bash
   # Visit https://wandb.ai/authorize
   # Copy your API key
   ```

3. **Configure Local Authentication**:

   ```bash
   # Option A: Interactive login
   wandb login

   # Option B: Set environment variable
   export WANDB_API_KEY=your_api_key_here

   # Option C: Add to .env file
   echo "WANDB_API_KEY=your_api_key_here" >> .env
   ```

---

### Step 2: Project Configuration

1. **Create wandb Configuration File**:
   Create `codebase/config/wandb_config.py`:

   ```python
   """
   Weights & Biases configuration for PhD research experiments.
   """
   import os

   # Project settings
   WANDB_PROJECT = "phd-research"  # Your main project name
   WANDB_ENTITY = "your-username-or-team"  # Your wandb username/team

   # Default configuration
   DEFAULT_CONFIG = {
       "learning_rate": 0.001,
       "batch_size": 32,
       "epochs": 100,
       "optimizer": "adam",
       "seed": 42,
   }

   # Experiment groups
   EXPERIMENT_GROUPS = {
       "baseline": "Baseline experiments",
       "ablation": "Ablation studies",
       "novel": "Novel method experiments",
       "sweep": "Hyperparameter sweeps",
   }

   # Artifact types
   ARTIFACT_TYPES = {
       "model": "model",
       "dataset": "dataset",
       "results": "results",
   }
   ```

2. **Create Experiment Template**:
   Use the wandb-experiment-config-tmpl.yaml template (see templates/ folder)

---

### Step 3: Code Integration

1. **Basic Training Script Integration**:

   ```python
   import wandb
   from config.wandb_config import WANDB_PROJECT, WANDB_ENTITY, DEFAULT_CONFIG

   def train_model(config):
       # Initialize wandb run
       run = wandb.init(
           project=WANDB_PROJECT,
           entity=WANDB_ENTITY,
           config=config,
           name=f"exp-{config['experiment_id']}",
           tags=config.get('tags', []),
           group=config.get('group', 'default'),
           notes=config.get('description', ''),
       )

       # Log hyperparameters
       wandb.config.update(config)

       # Training loop
       for epoch in range(config['epochs']):
           # ... training code ...
           train_loss = model.train_step()
           val_loss = model.validate()

           # Log metrics
           wandb.log({
               "epoch": epoch,
               "train/loss": train_loss,
               "train/accuracy": train_acc,
               "val/loss": val_loss,
               "val/accuracy": val_acc,
               "learning_rate": optimizer.param_groups[0]['lr'],
           })

           # Log system metrics
           wandb.log({
               "system/gpu_utilization": get_gpu_utilization(),
               "system/memory_used_gb": get_memory_usage(),
           })

       # Save final model as artifact
       artifact = wandb.Artifact(
           name=f"model-{run.id}",
           type="model",
           description=f"Trained model for {config['experiment_id']}",
       )
       artifact.add_file("model.pth")
       run.log_artifact(artifact)

       # Close run
       wandb.finish()

       return model
   ```

2. **Visualization Logging**:

   ```python
   import matplotlib.pyplot as plt
   import wandb

   def log_visualizations(model, data):
       # Create plots
       fig, axes = plt.subplots(2, 2, figsize=(12, 10))

       # Plot 1: Loss curves
       axes[0, 0].plot(train_losses, label='Train')
       axes[0, 0].plot(val_losses, label='Validation')
       axes[0, 0].set_title('Loss Curves')
       axes[0, 0].legend()

       # Plot 2: Confusion matrix
       # ... create confusion matrix ...

       # Log to wandb
       wandb.log({
           "visualizations/loss_curves": wandb.Image(fig),
           "visualizations/confusion_matrix": wandb.plot.confusion_matrix(
               y_true=labels,
               preds=predictions,
               class_names=class_names
           ),
       })

       plt.close(fig)
   ```

3. **Experiment Metadata**:

   ```python
   def setup_experiment_tracking(experiment_spec):
       """Initialize wandb from experiment specification."""

       # Extract from experiment spec
       config = {
           "experiment_id": experiment_spec['id'],
           "hypothesis": experiment_spec['hypothesis'],
           "baseline": experiment_spec['baseline'],
           "dataset": experiment_spec['dataset'],
           # ... add all hyperparameters ...
       }

       # Initialize with metadata
       run = wandb.init(
           project=WANDB_PROJECT,
           name=experiment_spec['name'],
           tags=[
               experiment_spec['id'],
               experiment_spec['type'],  # 'baseline', 'novel', 'ablation'
               f"dataset-{experiment_spec['dataset']}",
           ],
           notes=experiment_spec['description'],
           config=config,
       )

       # Log experiment spec as artifact
       spec_artifact = wandb.Artifact(
           name=f"spec-{experiment_spec['id']}",
           type="experiment-spec",
       )
       spec_artifact.add_file(experiment_spec['spec_file'])
       run.log_artifact(spec_artifact)

       return run
   ```

---

### Step 4: Export Results to results/ Folder

Create utility to export wandb data for Data Analyst:

```python
# codebase/utils/export_wandb_results.py

import wandb
import json
import pandas as pd
from pathlib import Path

def export_run_to_results(run_id, output_dir="results/"):
    """
    Export wandb run data to results/ folder for Data Analyst analysis.

    Args:
        run_id: wandb run ID
        output_dir: Output directory (default: results/)
    """
    api = wandb.Api()
    run = api.run(f"{WANDB_ENTITY}/{WANDB_PROJECT}/{run_id}")

    output_path = Path(output_dir) / run_id
    output_path.mkdir(parents=True, exist_ok=True)

    # 1. Export run summary
    summary = {
        "run_id": run.id,
        "name": run.name,
        "state": run.state,
        "tags": run.tags,
        "config": dict(run.config),
        "summary": dict(run.summary),
    }

    with open(output_path / "run_summary.json", "w") as f:
        json.dump(summary, f, indent=2)

    # 2. Export metrics history
    history = run.history()
    history.to_csv(output_path / "metrics_history.csv", index=False)

    # 3. Download artifacts
    for artifact in run.logged_artifacts():
        artifact_dir = output_path / "artifacts" / artifact.name
        artifact_dir.mkdir(parents=True, exist_ok=True)
        artifact.download(root=str(artifact_dir))

    # 4. Export system metrics
    system_metrics = history[[col for col in history.columns if col.startswith('system/')]]
    system_metrics.to_csv(output_path / "system_metrics.csv", index=False)

    print(f"✅ Exported wandb run {run_id} to {output_path}")
    return output_path


def export_experiment_group(group_name, output_dir="results/"):
    """Export all runs from an experiment group."""
    api = wandb.Api()
    runs = api.runs(
        f"{WANDB_ENTITY}/{WANDB_PROJECT}",
        filters={"group": group_name}
    )

    for run in runs:
        export_run_to_results(run.id, output_dir)
```

---

### Step 5: Hyperparameter Sweeps

Set up wandb sweeps for hyperparameter optimization:

```python
# codebase/sweeps/sweep_config.py

sweep_config = {
    'method': 'bayes',  # or 'grid', 'random'
    'metric': {
        'name': 'val/accuracy',
        'goal': 'maximize'
    },
    'parameters': {
        'learning_rate': {
            'distribution': 'log_uniform_values',
            'min': 1e-5,
            'max': 1e-2
        },
        'batch_size': {
            'values': [16, 32, 64, 128]
        },
        'optimizer': {
            'values': ['adam', 'sgd', 'adamw']
        },
        'dropout': {
            'distribution': 'uniform',
            'min': 0.1,
            'max': 0.5
        }
    }
}

# Initialize sweep
sweep_id = wandb.sweep(sweep_config, project=WANDB_PROJECT)

# Run sweep
wandb.agent(sweep_id, function=train_model, count=50)
```

---

### Step 6: Verification Checklist

After setup, verify:

- [ ] wandb login successful
- [ ] Test run logs successfully: `wandb.init()` works
- [ ] Metrics appear in wandb dashboard
- [ ] Visualizations display correctly
- [ ] Artifacts saved and downloadable
- [ ] Export to results/ folder works
- [ ] System metrics tracked (GPU, memory)
- [ ] Git commit captured automatically
- [ ] Tags and groups organized properly
- [ ] Sweeps can be initiated

---

## Best Practices

1. **Consistent Naming**: Use experiment IDs from specs as run names
2. **Rich Tagging**: Tag by experiment type, dataset, baseline, etc.
3. **Group Related Runs**: Use groups for ablations and comparisons
4. **Log Everything**: Hyperparameters, metrics, system stats, visualizations
5. **Save Artifacts**: Models, predictions, important outputs
6. **Document Runs**: Use notes field for hypotheses and findings
7. **Export for Papers**: Regularly export to results/ for Data Analyst

---

## Troubleshooting

**Issue**: wandb not logging

- Check API key is set correctly
- Verify internet connection
- Check wandb.init() returns valid run object

**Issue**: Slow logging

- Use `wandb.log()` less frequently (every N steps)
- Reduce image/artifact size
- Use asynchronous logging

**Issue**: Runs not grouping

- Ensure `group` parameter matches exactly
- Check for typos in group names

---

## Next Steps

After setup:

1. Test with small experiment: `*track-experiment`
2. Integrate into baseline implementation
3. Set up sweeps for hyperparameter tuning
4. Train Data Analyst on wandb MCP server tools

---

## Related

- [track-wandb-experiment.md](track-wandb-experiment.md) - Initialize specific experiment tracking
- [wandb-experiment-config-tmpl.yaml](../templates/wandb-experiment-config-tmpl.yaml) - Configuration template
- [analyze-wandb-results.md](analyze-wandb-results.md) - Data Analyst workflow
