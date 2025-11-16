#!/bin/bash
# create-experiment-spec.sh - Create experiment specification with proper frontmatter
# Usage: ./create-experiment-spec.sh <experiment-id> <title> <hypothesis>

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check arguments
if [ $# -lt 3 ]; then
    echo -e "${RED}Error: Missing required arguments${NC}"
    echo "Usage: $0 <experiment-id> <title> <hypothesis>"
    echo ""
    echo "Example:"
    echo "  $0 exp-001 \"Novel Optimizer\" \"New algorithm converges 2x faster\""
    exit 1
fi

EXPERIMENT_ID="$1"
TITLE="$2"
HYPOTHESIS="$3"

# Determine paths
DOCS_RESEARCH_DIR="docs/research/experiments"
EXPERIMENT_FILE="${DOCS_RESEARCH_DIR}/experiment-${EXPERIMENT_ID}.md"

# Create directories if they don't exist
mkdir -p "${DOCS_RESEARCH_DIR}"

# Check if experiment spec already exists
if [ -f "${EXPERIMENT_FILE}" ]; then
    echo -e "${YELLOW}Warning: Experiment spec already exists: ${EXPERIMENT_FILE}${NC}"
    read -p "Overwrite? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Cancelled."
        exit 0
    fi
fi

# Get current date
CURRENT_DATE=$(date +"%Y-%m-%d")

# Create experiment specification with frontmatter
cat > "${EXPERIMENT_FILE}" <<EOF
---
type: experiment-spec
id: ${EXPERIMENT_ID}
title: "${TITLE}"
status: draft
created: ${CURRENT_DATE}
updated: ${CURRENT_DATE}
hypothesis: "${HYPOTHESIS}"
tags: []
github_issue:
related_docs: []
---

# Experiment: ${TITLE}

## Research Question

What are we trying to answer or test?

## Hypothesis

${HYPOTHESIS}

## Methodology

### Approach

Describe the experimental approach:
- What method/algorithm will be tested?
- What are the key components?

### Baselines

What baselines will be compared against?
1. Baseline 1:
2. Baseline 2:

### Datasets

What datasets will be used?
1. Dataset 1:
2. Dataset 2:

### Metrics

What metrics will be evaluated?
- Metric 1:
- Metric 2:

### Hyperparameters

Key hyperparameters to tune:
- Learning rate:
- Batch size:
- Epochs:

## Expected Results

What results do we expect to see?

If successful:
- Expected improvement:
- Expected behavior:

If unsuccessful:
- Alternative explanations:
- Fallback plans:

## Implementation Plan

- [ ] Step 1: Setup baseline implementation
- [ ] Step 2: Implement novel method
- [ ] Step 3: Run baseline experiments
- [ ] Step 4: Run novel method experiments
- [ ] Step 5: Analyze results
- [ ] Step 6: Create figures and tables

## Resources Required

- Compute: (e.g., 4 GPUs for 2 days)
- Storage: (e.g., 100GB for results)
- Time estimate: (e.g., 2 weeks)

## Notes

Additional notes, references, or considerations.
EOF

echo -e "${GREEN}✓ Created experiment specification: ${EXPERIMENT_FILE}${NC}"
echo ""
echo "Next steps:"
echo "  1. Edit the experiment spec file to fill in details"
echo "  2. Create GitHub issue: gh issue create --title \"${TITLE}\" --label \"type:experiment,research:experiment\""
echo "  3. Link GitHub issue number in frontmatter 'github_issue' field"
echo "  4. Implement experiment in experiments/${EXPERIMENT_ID}/"
echo ""
echo "To view the file:"
echo "  cat ${EXPERIMENT_FILE}"
