# Experiment Implementation Checklist

## Purpose
Ensure experiment implementation is complete, correct, and reproducible before execution.

## Usage
Check off each item before running full experiment. If any item is unchecked, address it first.

---

## Code Implementation

### Core Functionality
- [ ] Experiment specification document exists (docs/experiments/{{experiment_id}}.md)
- [ ] Model architecture implemented according to spec
- [ ] Training loop implemented
- [ ] Evaluation code implemented
- [ ] All metrics from spec implemented
- [ ] Data loading working correctly
- [ ] Preprocessing pipeline matches spec
- [ ] Code runs without errors on small test

### Code Quality
- [ ] Code is modular and well-organized
- [ ] Functions have docstrings
- [ ] Complex sections have inline comments
- [ ] Variable names are descriptive
- [ ] No magic numbers (use named constants)
- [ ] No dead/commented-out code
- [ ] Follows project coding style

### Testing
- [ ] Unit tests for key components (if applicable)
- [ ] Tested on small data sample
- [ ] Tested with small model variant (faster iteration)
- [ ] Edge cases considered and handled
- [ ] Error handling implemented

---

## Reproducibility Setup

### Random Seeds
- [ ] All random seeds set (Python, NumPy, PyTorch/TensorFlow)
- [ ] Seed values documented in experiment spec
- [ ] Seed set before any randomness (data loading, model init, etc.)
- [ ] Deterministic algorithms enabled where possible
- [ ] Worker seeds set (for multi-process data loading)

### Environment
- [ ] All dependencies listed with exact versions
- [ ] Python version documented
- [ ] CUDA/cuDNN versions documented (if using GPU)
- [ ] Operating system documented
- [ ] Hardware specifications documented
- [ ] requirements.txt or environment.yml created
- [ ] Virtual environment or conda environment instructions provided

### Version Control
- [ ] Experiment code committed to Git
- [ ] Config files in version control
- [ ] Experiment spec file committed
- [ ] .gitignore excludes large files (models, data, logs)
- [ ] Current commit hash recorded in experiment spec

---

## Data Preparation

### Dataset Access
- [ ] All required datasets downloaded
- [ ] Dataset versions documented
- [ ] Data paths configurable (not hardcoded)
- [ ] Data storage location documented
- [ ] Data checksums verified (if applicable)

### Data Processing
- [ ] Train/val/test splits created or validated
- [ ] Split procedure reproducible (fixed seeds)
- [ ] Preprocessing pipeline implemented
- [ ] Data augmentation implemented (if applicable)
- [ ] Data statistics computed and documented
- [ ] Any data filtering documented

### Data Loading
- [ ] Data loading tested and working
- [ ] Batch size configured
- [ ] Data shuffling configured correctly
- [ ] Number of workers set appropriately
- [ ] Memory usage acceptable
- [ ] Loading speed acceptable

---

## Configuration

### Hyperparameters
- [ ] All hyperparameters explicitly set (no hidden defaults)
- [ ] Learning rate specified
- [ ] Batch size specified
- [ ] Number of epochs/iterations specified
- [ ] Optimizer and settings specified
- [ ] Learning rate schedule specified (if applicable)
- [ ] Weight decay specified (if applicable)
- [ ] Other regularization parameters specified

### Model Configuration
- [ ] Model architecture fully specified
- [ ] Layer dimensions documented
- [ ] Activation functions specified
- [ ] Normalization layers specified
- [ ] Dropout rates specified (if applicable)
- [ ] Model initialization method specified

### Configuration Management
- [ ] All configs in structured file (YAML, JSON, Python)
- [ ] Config file in version control
- [ ] Config file linked in experiment spec
- [ ] Easy to modify for hyperparameter sweeps

---

## Logging and Monitoring

### Experiment Tracking
- [ ] Experiment tracking tool configured (wandb, tensorboard, mlflow)
- [ ] Experiment name/ID set
- [ ] Project name set correctly
- [ ] Config logged automatically
- [ ] System info logged (GPU, memory, etc.)

### Metrics Logging
- [ ] Training loss logged
- [ ] Validation metrics logged
- [ ] Test metrics logged
- [ ] Logging frequency appropriate (not too sparse/dense)
- [ ] All metrics from experiment spec being logged

### Checkpointing
- [ ] Model checkpointing enabled
- [ ] Checkpoint frequency specified
- [ ] Best model saved (based on validation metric)
- [ ] Checkpoint includes: model, optimizer, epoch, metrics
- [ ] Checkpoint storage location configured
- [ ] Old checkpoints cleanup strategy (if needed)

### Additional Logging
- [ ] Training time logged
- [ ] Memory usage logged
- [ ] Hyperparameters logged
- [ ] Git commit hash logged
- [ ] Command-line arguments logged

---

## Execution Preparation

### Dry Run Completed
- [ ] Dry run with small data completed successfully
- [ ] Dry run with few iterations completed successfully
- [ ] Memory usage acceptable in dry run
- [ ] Training speed estimated from dry run
- [ ] No errors in dry run

### Resource Verification
- [ ] Hardware requirements available (GPU, memory)
- [ ] Estimated training time reasonable
- [ ] Disk space sufficient for checkpoints and logs
- [ ] Network access if needed (for logging)

### Execution Plan
- [ ] Execution command documented in experiment spec
- [ ] Script or command tested
- [ ] Running in appropriate environment (tmux, screen, slurm)
- [ ] Output redirection set up (stdout, stderr)
- [ ] Monitoring plan in place

---

## Baseline/Comparison Setup

### If Implementing Baseline
- [ ] Baseline paper identified and reviewed
- [ ] Official implementation reviewed (if available)
- [ ] Hyperparameters from original paper
- [ ] Same evaluation protocol as original paper
- [ ] Verified implementation accuracy (sanity checks)

### Fair Comparison
- [ ] All methods use same data splits
- [ ] All methods evaluated with same metrics
- [ ] Same compute budget across methods (approximately)
- [ ] Hyperparameter tuning effort comparable
- [ ] Evaluation protocol identical

---

## Documentation

### Experiment Spec Updated
- [ ] Implementation details section filled
- [ ] Code location documented
- [ ] Dependencies documented
- [ ] Hardware requirements documented
- [ ] Random seeds documented
- [ ] Expected runtime documented

### README / Documentation
- [ ] README exists with setup instructions
- [ ] Command to run experiment documented
- [ ] Expected output described
- [ ] Troubleshooting section (if common issues known)

---

## Pre-Execution Validation

### Sanity Checks
- [ ] Model can overfit small sample (proves model can learn)
- [ ] Training loss decreases initially (proves training works)
- [ ] Validation metrics reasonable (not random performance)
- [ ] Predictions look reasonable (spot check outputs)
- [ ] Gradients flowing (no vanishing/exploding gradients)

### Comparisons
- [ ] If reproducing baseline: results close to reported values
- [ ] If similar to prior experiment: results make sense relative to it
- [ ] Order of magnitude checks on metrics

---

## Final Checks Before Full Run

### Checklist Review
- [ ] All above items checked and confirmed
- [ ] Any N/A items documented with reason
- [ ] No known issues or concerns

### Team Communication
- [ ] Collaborators aware experiment is starting
- [ ] Experiment logged in team tracker (if applicable)
- [ ] Expected completion time communicated

### Contingency Planning
- [ ] Backup plan if experiment fails
- [ ] Know how to debug common issues
- [ ] Checkpoints allow resume if interrupted

---

## Post-Execution (to be completed after run)

### Results Verification
- [ ] Training completed without errors
- [ ] All expected checkpoints saved
- [ ] All metrics logged correctly
- [ ] Results within expected range (or reason documented if not)

### Results Documentation
- [ ] Results added to experiment spec
- [ ] Observations and notes documented
- [ ] Any issues encountered documented
- [ ] Comparison to expected results documented

### Artifact Management
- [ ] Best checkpoint identified and saved
- [ ] Logs accessible and backed up
- [ ] Unnecessary checkpoints deleted (if space constrained)
- [ ] Results committed to version control (numbers, not models)

---

## Notes

**Before running experiment:**
- This checklist should be nearly 100% complete
- Any unchecked critical items should block execution
- Document reasons for any N/A items

**Common reasons experiments fail:**
- Random seeds not set → non-reproducible
- Config not saved → can't remember settings
- Insufficient logging → can't diagnose issues
- No checkpointing → lose everything if crashes
- Untested code → runtime errors waste compute

**Time investment:**
- Spending 1-2 hours on this checklist saves days of wasted compute
- Reproducibility from day one easier than retrofitting
- Good habits compound across many experiments

**When in doubt:**
- Over-document rather than under-document
- Over-log rather than under-log
- Test more rather than less
- Ask collaborators to review before launching expensive runs
