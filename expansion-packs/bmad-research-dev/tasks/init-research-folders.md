<!-- Powered by BMAD™ AI Research -->

# Initialize Research Project Folder Structure

Set up the complete folder structure required for AI research projects. This task creates all necessary directories and moves any existing code to the archive.

## Purpose

Create a standardized, organized workspace for AI/ML research projects that supports the complete research lifecycle from implementation through publication.

## When to Use This Task

- **Starting a new research project** - Create clean folder structure
- **Migrating existing research** - Organize and archive old code
- **Onboarding to BMAD AI Research** - Set up workspace properly

## Folder Structure Overview

```
research-project/
├── codebase/              # ML implementation (Python, notebooks, configs)
│   ├── models/            # Model implementations
│   ├── datasets/          # Dataset loaders and preprocessing
│   ├── training/          # Training scripts and loops
│   ├── evaluation/        # Evaluation metrics and scripts
│   ├── utils/             # Utility functions
│   ├── configs/           # Experiment configurations
│   └── notebooks/         # Jupyter notebooks for exploration
│
├── data/                  # Datasets (already exists from expansion pack)
│   ├── raw/               # Raw, unprocessed data
│   ├── processed/         # Preprocessed, ready-to-use data
│   ├── external/          # External datasets (downloaded)
│   └── README.md          # Data documentation
│
├── results/               # Experiment outputs
│   ├── experiments/       # Per-experiment results
│   │   ├── exp001/        # Experiment 001
│   │   │   ├── metrics.json
│   │   │   ├── logs/
│   │   │   └── checkpoints/
│   │   └── exp002/        # Experiment 002
│   ├── figures/           # Plots, graphs, visualizations
│   │   ├── training_curves/
│   │   ├── ablations/
│   │   └── comparisons/
│   ├── tables/            # Result tables (CSV, LaTeX)
│   └── analysis/          # Statistical analysis outputs
│
├── research-paper/        # Paper drafts and submission materials
│   ├── drafts/            # Paper drafts (v1, v2, etc.)
│   ├── figures/           # Paper figures (final, publication-ready)
│   ├── tables/            # Paper tables (final, publication-ready)
│   ├── bibliography/      # BibTeX files
│   ├── reviews/           # Reviewer comments and responses
│   └── submission/        # Final submission package
│
├── old_code/              # Archive for legacy/deprecated code
│   ├── timestamp/         # Archived by date (e.g., 2024-10-03/)
│   └── README.md          # Archive index
│
├── scripts/               # Utility scripts
│   ├── setup/             # Environment setup scripts
│   ├── preprocessing/     # Data preprocessing scripts
│   └── analysis/          # Analysis automation scripts
│
└── docs/                  # (Already exists from expansion pack)
    └── experiments/       # Experiment documentation
```

## Process

### Step 1: Check Current Directory

**Before creating folders, verify you're in the project root:**

```bash
pwd
ls -la
```

Expected: You should see `.bmad-core/` or expansion pack files.

Ask user: "Is this the correct project root directory? (yes/no)"

If no, ask: "What is the correct path to your project root?"

### Step 2: Check for Existing Code

**Scan for existing code that should be archived:**

```bash
# Look for existing codebase-like directories
ls -d src/ 2>/dev/null || echo "No src/ found"
ls -d lib/ 2>/dev/null || echo "No lib/ found"
ls -d models/ 2>/dev/null || echo "No models/ found"
ls -d *.py 2>/dev/null || echo "No Python files found"
ls -d *.ipynb 2>/dev/null || echo "No notebooks found"
```

**If existing code is found:**

Display findings to user:

```
Found existing code:
- src/ directory
- 5 Python files in root
- 3 Jupyter notebooks

Options:
1. Archive to old_code/ (recommended - preserves history)
2. Delete existing code (NOT recommended)
3. Skip archiving (merge with new structure)

What would you like to do? (1/2/3)
```

Wait for user response.

### Step 3: Archive Existing Code (if Option 1 selected)

**Create timestamped archive directory:**

```bash
TIMESTAMP=$(date +%Y-%m-%d_%H-%M-%S)
mkdir -p old_code/$TIMESTAMP
```

**Move existing code to archive:**

```bash
# Move common code directories if they exist
[ -d "src" ] && mv src old_code/$TIMESTAMP/
[ -d "lib" ] && mv lib old_code/$TIMESTAMP/
[ -d "models" ] && mv models old_code/$TIMESTAMP/
[ -d "scripts" ] && mv scripts old_code/$TIMESTAMP/

# Move loose Python files
find . -maxdepth 1 -name "*.py" -exec mv {} old_code/$TIMESTAMP/ \;

# Move Jupyter notebooks
find . -maxdepth 1 -name "*.ipynb" -exec mv {} old_code/$TIMESTAMP/ \;
```

**Create archive README:**

```bash
cat > old_code/$TIMESTAMP/README.md << 'EOF'
# Archived Code - $TIMESTAMP

## What was archived

[List files/directories that were moved]

## Why archived

Code archived during BMAD AI Research folder structure initialization.

## How to restore

If needed, copy files back from this directory to project root or codebase/.

EOF
```

Confirm to user:

```
✓ Existing code archived to old_code/$TIMESTAMP/
✓ Archive README created
```

### Step 4: Create Core Folder Structure

**Create main research directories:**

```bash
# Core research folders
mkdir -p codebase/{models,datasets,training,evaluation,utils,configs,notebooks}
mkdir -p data/{raw,processed,external}
mkdir -p results/{experiments,figures,tables,analysis}
mkdir -p results/figures/{training_curves,ablations,comparisons}
mkdir -p research-paper/{drafts,figures,tables,bibliography,reviews,submission}
mkdir -p scripts/{setup,preprocessing,analysis}
mkdir -p docs/experiments
mkdir -p old_code
```

**Verify creation:**

```bash
echo "✓ Created folder structure:"
tree -L 2 -d codebase/ data/ results/ research-paper/ scripts/ old_code/ 2>/dev/null || \
ls -R codebase/ data/ results/ research-paper/ scripts/ old_code/
```

### Step 5: Create Folder Documentation

**Create README files for each major folder:**

**codebase/README.md:**

```markdown
# Codebase - ML Implementation

This directory contains all ML/AI implementation code.

## Structure

- `models/` - Model architectures and implementations
- `datasets/` - Dataset loaders, preprocessing, augmentation
- `training/` - Training loops, optimizers, schedulers
- `evaluation/` - Metrics, evaluation scripts, benchmarking
- `utils/` - Helper functions, utilities, common code
- `configs/` - Experiment configurations (YAML, JSON)
- `notebooks/` - Jupyter notebooks for exploration and visualization

## Guidelines

- Keep code modular and reusable
- Use type hints and docstrings
- Follow PEP 8 style guide
- Add unit tests for critical functions
- Document experiment configs clearly

## Integration with Archon

- Experiment specs stored in Archon (type=spec)
- Implementation tracked as tasks in Archon
- Link code to experiments via task IDs
```

**data/README.md:**

```markdown
# Data - Datasets and Preprocessing

This directory contains all research data.

## Structure

- `raw/` - Original, unmodified datasets
- `processed/` - Preprocessed, ready-to-use data
- `external/` - Downloaded external datasets

## Guidelines

- **Never modify raw data** - Keep original files intact
- Document preprocessing steps clearly
- Include data statistics and metadata
- Cite dataset sources in bibliography
- Use version control for small datasets
- Use DVC or similar for large datasets

## Data Management

- Raw data is immutable (read-only after download)
- Processed data includes documentation of transformations
- External datasets include LICENSE and CITATION files
```

**results/README.md:**

```markdown
# Results - Experiment Outputs

This directory contains all experiment results, figures, and analysis.

## Structure

- `experiments/` - Per-experiment outputs (metrics, logs, checkpoints)
- `figures/` - Visualizations organized by type
- `tables/` - Result tables (CSV, LaTeX)
- `analysis/` - Statistical analysis and comparisons

## Guidelines

- One subdirectory per experiment (exp001, exp002, etc.)
- Include metadata.json with experiment config
- Save metrics in machine-readable format (JSON, CSV)
- Generate publication-ready figures
- Document statistical tests and significance

## Integration with Archon & wandb

- Experiment metadata stored in Archon tasks
- Metrics tracked in wandb (if configured)
- Results linked to paper sections via Archon
```

**research-paper/README.md:**

```markdown
# Research Paper - Publication Materials

This directory contains paper drafts and submission materials.

## Structure

- `drafts/` - Paper versions (v1, v2, etc.)
- `figures/` - Publication-ready figures
- `tables/` - Publication-ready tables
- `bibliography/` - BibTeX files
- `reviews/` - Reviewer comments and response letters
- `submission/` - Final submission package

## Guidelines

- Use version numbers for drafts (v1.0, v2.0, etc.)
- Keep figures in both source and PDF formats
- Maintain single bibliography.bib file
- Document all revisions and changes
- Follow target venue formatting requirements

## Integration with Archon

- Paper outline stored in Archon (type=note)
- Section assignments tracked as tasks
- All cited papers searchable via Archon KB
```

**old_code/README.md:**

```markdown
# Old Code - Archived Code

This directory contains archived code from previous versions or experiments.

## Structure

- Organized by timestamp (YYYY-MM-DD_HH-MM-SS/)
- Each archive includes README explaining what was archived

## Guidelines

- Never delete old code - archive it
- Include context in archive README
- Reference archived code in experiment docs if relevant
- Periodically review and clean up very old archives

## When to Archive

- Before major refactoring
- When deprecating old approaches
- Before starting fresh implementation
- During project cleanup
```

**Create all README files:**

```bash
# Create all README files with proper content
cat > codebase/README.md << 'EOF'
[content above]
EOF

cat > data/README.md << 'EOF'
[content above]
EOF

cat > results/README.md << 'EOF'
[content above]
EOF

cat > research-paper/README.md << 'EOF'
[content above]
EOF

cat > old_code/README.md << 'EOF'
[content above]
EOF
```

### Step 6: Create .gitignore for Research Project

**Create comprehensive .gitignore:**

```bash
cat > .gitignore << 'EOF'
# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
env/
venv/
.venv/
pip-log.txt
pip-delete-this-directory.txt
.pytest_cache/

# Jupyter Notebook
.ipynb_checkpoints
*.ipynb_checkpoints/

# Data (exclude large datasets)
data/raw/**
data/processed/**
data/external/**
!data/raw/README.md
!data/processed/README.md
!data/external/README.md

# Results (exclude large experiment files)
results/experiments/**/checkpoints/
results/experiments/**/logs/
*.ckpt
*.pth
*.pt
*.h5

# Wandb
wandb/
.wandb/

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Temporary files
*.tmp
*.temp
*.log
EOF
```

### Step 7: Create Initial Experiment Template

**Create template for experiment 001:**

```bash
mkdir -p results/experiments/exp001

cat > results/experiments/exp001/metadata.json << 'EOF'
{
  "experiment_id": "exp001",
  "name": "Baseline Experiment",
  "description": "Initial baseline implementation",
  "date_created": "YYYY-MM-DD",
  "status": "planned",
  "config": {
    "model": "baseline",
    "dataset": "dataset_name",
    "hyperparameters": {}
  },
  "metrics": {},
  "notes": "",
  "archon_task_id": null,
  "wandb_run_id": null
}
EOF

cat > results/experiments/exp001/README.md << 'EOF'
# Experiment 001 - Baseline

## Objective

[Describe what this experiment aims to test/validate]

## Configuration

[Link to config file or describe key hyperparameters]

## Results

[To be filled after experiment completion]

## Analysis

[Statistical analysis, comparisons, insights]

## Next Steps

[Based on results, what should be done next?]
EOF
```

### Step 8: Verify and Summary

**Final verification:**

```bash
echo "=== Research Folder Structure Created ==="
echo ""
echo "Directory tree:"
tree -L 2 codebase/ data/ results/ research-paper/ scripts/ old_code/ 2>/dev/null || \
find codebase data results research-paper scripts old_code -type d | sort

echo ""
echo "✓ Folder structure initialized"
echo "✓ Documentation created"
echo "✓ .gitignore configured"
echo "✓ Experiment template ready"
echo ""
echo "Next steps:"
echo "1. Set up Python environment (requirements.txt)"
echo "2. Initialize git repository (if not already)"
echo "3. Configure wandb tracking (optional)"
echo "4. Create first experiment in codebase/"
echo "5. Run: @ml-engineer for implementation guidance"
```

**Display summary to user:**

```
✅ Research Project Folder Structure Initialized

Created:
- codebase/        (ML implementation)
- data/            (datasets: raw, processed, external)
- results/         (experiments, figures, tables, analysis)
- research-paper/  (drafts, submission materials)
- scripts/         (utility scripts)
- old_code/        (archived code)

Documentation:
- README.md in each major folder
- .gitignore configured for research projects
- Experiment template (exp001) ready

Archived:
- [List archived items if any]

Ready to start research! 🔬
```

## Important Notes

- **Don't skip archiving** - Old code contains valuable history
- **Follow the structure** - Agents expect this exact layout
- **Document everything** - Future you will thank you
- **Version control** - Git commit after structure initialization
- **Data management** - Use DVC for large datasets
- **Experiment tracking** - Configure wandb for best experience

## Integration with Research Workflow

After folder initialization:

```
@research-lead
*init-research-project  # Creates Archon project

@experiment-pm
*create-experiment-task  # Creates experiment 001 task

@ml-engineer
*implement-experiment  # Implements in codebase/

@data-analyst
*analyze-results  # Analyzes from results/

@research-writer
*write-paper  # Writes using research-paper/
```

## Folder Structure Reference

See README.md "Folder Structure" section for complete documentation of how folders integrate with the research workflow.
