## <!-- Powered by BMAD™ Core -->

# Track Experiment with wandb

**Task**: Initialize wandb tracking for a specific experiment run

**When to Use**: At the start of each experiment training run

**Agent**: ML Engineer (Jordan Lee)

**Prerequisites**:

- wandb setup complete (see setup-wandb-tracking.md)
- Experiment specification exists
- wandb config template filled

**Output**: Active wandb run tracking all experiment metrics

---

## Quick Start

```python
import wandb
from config.wandb_config import WANDB_PROJECT, WANDB_ENTITY

# Initialize run
run = wandb.init(
    project=WANDB_PROJECT,
    name="exp-001-baseline",
    tags=["baseline", "exp-001"],
    config={
        "learning_rate": 0.0003,
        "batch_size": 128,
        # ... all hyperparameters
    }
)

# Train model with logging
for epoch in range(epochs):
    loss = train_epoch()
    wandb.log({"train/loss": loss, "epoch": epoch})

# Finish
wandb.finish()
```

---

## Detailed Process

### Step 1: Load Experiment Configuration

```python
import yaml
from pathlib import Path

# Load wandb config for this experiment
config_file = Path("docs/experiments/exp-001-wandb-config.yaml")

with open(config_file) as f:
    exp_config = yaml.safe_load(f)

print(f"Loaded config for: {exp_config['experiment']['name']}")
```

---

### Step 2: Initialize wandb Run

```python
import wandb

# Extract wandb settings
wandb_settings = exp_config['experiment']['wandb']
hyperparams = exp_config['hyperparameters']

# Initialize
run = wandb.init(
    project=wandb_settings['project'],
    entity=wandb_settings['entity'],
    name=exp_config['experiment']['name'],
    group=wandb_settings['group'],
    job_type=wandb_settings['job_type'],
    tags=wandb_settings['tags'],
    notes=wandb_settings['notes'],
    config=hyperparams,  # All hyperparameters
)

print(f"✅ wandb run initialized: {run.name}")
print(f"   URL: {run.url}")
```

---

### Step 3: Log Training Metrics

```python
# During training loop
for epoch in range(num_epochs):
    # Training
    train_metrics = train_one_epoch(model, train_loader)

    # Log training metrics
    wandb.log({
        "epoch": epoch,
        "train/loss": train_metrics['loss'],
        "train/accuracy": train_metrics['accuracy'],
        "train/learning_rate": optimizer.param_groups[0]['lr'],
    }, step=epoch)

    # Validation
    if epoch % eval_interval == 0:
        val_metrics = validate(model, val_loader)

        wandb.log({
            "val/loss": val_metrics['loss'],
            "val/accuracy": val_metrics['accuracy'],
            "val/top5_accuracy": val_metrics['top5_acc'],
        }, step=epoch)

    # Log system metrics
    if track_system:
        wandb.log({
            "system/gpu_utilization": get_gpu_utilization(),
            "system/gpu_memory_gb": get_gpu_memory_gb(),
            "system/cpu_percent": psutil.cpu_percent(),
        }, step=epoch)
```

---

### Step 4: Log Step-Level Metrics

For metrics within epochs:

```python
# In training step loop
for batch_idx, (data, target) in enumerate(train_loader):
    loss = training_step(data, target)

    # Log every N steps
    if batch_idx % log_interval == 0:
        global_step = epoch * len(train_loader) + batch_idx

        wandb.log({
            "train/batch_loss": loss,
            "train/batch_idx": batch_idx,
        }, step=global_step)
```

---

### Step 5: Log Visualizations

```python
import matplotlib.pyplot as plt

# Create training curve
fig, ax = plt.subplots(figsize=(10, 6))
ax.plot(train_losses, label='Train Loss')
ax.plot(val_losses, label='Val Loss')
ax.legend()
ax.set_xlabel('Epoch')
ax.set_ylabel('Loss')
ax.set_title('Training Progress')

# Log to wandb
wandb.log({"training_curves": wandb.Image(fig)})
plt.close(fig)

# Log confusion matrix
wandb.log({
    "confusion_matrix": wandb.plot.confusion_matrix(
        probs=None,
        y_true=y_true,
        preds=y_pred,
        class_names=class_names
    )
})
```

---

### Step 6: Save Model Artifacts

```python
# Save best model
if val_accuracy > best_accuracy:
    best_accuracy = val_accuracy

    # Save locally
    torch.save({
        'epoch': epoch,
        'model_state_dict': model.state_dict(),
        'optimizer_state_dict': optimizer.state_dict(),
        'accuracy': best_accuracy,
    }, 'best_model.pth')

    # Log as wandb artifact
    artifact = wandb.Artifact(
        name=f"model-{run.id}",
        type="model",
        description=f"Best model at epoch {epoch} with accuracy {best_accuracy:.2f}%",
        metadata={
            "epoch": epoch,
            "accuracy": best_accuracy,
            "experiment_id": exp_config['experiment']['id'],
        }
    )

    artifact.add_file('best_model.pth')
    run.log_artifact(artifact)

    print(f"✅ Model artifact logged: {artifact.name}")
```

---

### Step 7: Log Dataset Information

```python
# Log dataset as artifact (do once)
dataset_artifact = wandb.Artifact(
    name=f"imagenet-train-{exp_config['hyperparameters']['data']['dataset']}",
    type="dataset",
    description="ImageNet training split",
)

# Add dataset files or metadata
dataset_artifact.add_file('data/imagenet/train_manifest.csv')
dataset_artifact.metadata = {
    "num_samples": len(train_dataset),
    "num_classes": len(class_names),
    "image_size": 224,
}

run.log_artifact(dataset_artifact)
```

---

### Step 8: Export Results to results/

At the end of training:

```python
from utils.export_wandb_results import export_run_to_results

# Export wandb data to results/ folder
export_path = export_run_to_results(
    run_id=run.id,
    output_dir=f"results/{exp_config['experiment']['id']}"
)

print(f"✅ Results exported to: {export_path}")
```

---

### Step 9: Finish Run Properly

```python
# Log final summary
wandb.summary.update({
    "best_val_accuracy": best_accuracy,
    "final_epoch": epoch,
    "total_train_time": total_time,
    "model_params_millions": count_parameters(model) / 1e6,
})

# Mark run as finished
wandb.finish()

print("✅ wandb run completed successfully")
```

---

## Complete Example Script

```python
#!/usr/bin/env python3
"""
Training script with wandb tracking.
"""

import torch
import wandb
import yaml
from pathlib import Path

def train_with_wandb(exp_config_file):
    """Train model with full wandb tracking."""

    # Load config
    with open(exp_config_file) as f:
        config = yaml.safe_load(f)

    # Initialize wandb
    run = wandb.init(
        project=config['experiment']['wandb']['project'],
        name=config['experiment']['name'],
        tags=config['experiment']['wandb']['tags'],
        config=config['hyperparameters'],
    )

    # Setup model, optimizer, etc.
    model = create_model(wandb.config)
    optimizer = create_optimizer(model, wandb.config)

    # Training loop
    best_acc = 0.0
    for epoch in range(wandb.config['training']['epochs']):

        # Train
        train_loss = train_epoch(model, train_loader, optimizer)

        # Validate
        val_loss, val_acc = validate(model, val_loader)

        # Log metrics
        wandb.log({
            "epoch": epoch,
            "train/loss": train_loss,
            "val/loss": val_loss,
            "val/accuracy": val_acc,
        })

        # Save best model
        if val_acc > best_acc:
            best_acc = val_acc
            save_model_artifact(model, run, epoch, val_acc)

    # Export results
    export_run_to_results(run.id, f"results/{config['experiment']['id']}")

    # Finish
    wandb.summary['best_accuracy'] = best_acc
    wandb.finish()

    return best_acc


if __name__ == "__main__":
    train_with_wandb("docs/experiments/exp-001-wandb-config.yaml")
```

---

## Checklist

- [ ] wandb config loaded from template
- [ ] Run initialized with correct project/name/tags
- [ ] All hyperparameters logged to wandb.config
- [ ] Training metrics logged per epoch
- [ ] Validation metrics logged per epoch
- [ ] System metrics tracked (GPU, memory)
- [ ] Visualizations logged
- [ ] Model artifacts saved for best checkpoint
- [ ] Dataset logged as artifact (if applicable)
- [ ] Results exported to results/ folder
- [ ] Run finished properly with wandb.finish()
- [ ] Run URL saved for reference

---

## Best Practices

1. **Tag Consistently**: Use experiment ID as primary tag
2. **Group Related Runs**: Use groups for ablations, sweeps
3. **Log Generously**: Metrics, visuals, system stats - log everything
4. **Save Key Artifacts**: Best model, final model, predictions
5. **Export for Analysis**: Always export to results/ for Data Analyst
6. **Document in Notes**: Add context, hypotheses, observations
7. **Handle Failures**: Use try/except to ensure wandb.finish() always runs

---

## Troubleshooting

**Issue**: Run not appearing in dashboard

- Check project name matches exactly
- Verify API key is set
- Check internet connection

**Issue**: Metrics not updating

- Ensure wandb.log() called regularly
- Check step parameter is incrementing
- Verify metric names don't have typos

**Issue**: Artifacts too large

- Compress model checkpoints
- Log only best/final models
- Use wandb.config for hyperparameters instead of artifacts

---

## Related

- [setup-wandb-tracking.md](setup-wandb-tracking.md) - Initial wandb setup
- [analyze-wandb-results.md](analyze-wandb-results.md) - Post-training analysis
- [wandb-experiment-config-tmpl.yaml](../templates/wandb-experiment-config-tmpl.yaml) - Config template
