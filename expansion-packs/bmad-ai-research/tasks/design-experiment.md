# Design Experiment Task

## Purpose

Design a specific experiment with clear hypothesis, methodology, and success criteria.

## When to Use

- After experimental architecture is defined
- When planning new experimental validation
- For ablation studies
- For baseline comparisons

## Prerequisites

- Research proposal document exists
- Experimental architecture document exists
- Clear research question to address

## Instructions

### Step 1: Understand Context

Review relevant documents:

- Read docs/research-proposal.md for research questions and hypotheses
- Read docs/experimental-architecture.md for overall experimental design
- Read docs/experiments/ for any existing experiments

### Step 2: Define Experiment Objective

Ask user:

- What is this experiment trying to test?
- Which research question does it address?
- Is this a baseline comparison, ablation study, or novel method test?
- What specific hypothesis will this experiment test?

### Step 3: Formulate Clear Hypothesis

Help user articulate a testable hypothesis:

**Good hypothesis format:**
"Method X will achieve Y% improvement over baseline Z on metric M because of reason R."

**Examples:**

- "Adding attention mechanism will improve top-1 accuracy by 3-5% over vanilla CNN because attention allows model to focus on discriminative regions."
- "Removing component A will decrease performance by 10-15% on dataset D, validating its contribution."

**Bad hypotheses (avoid):**

- "This will work better" (not specific)
- "We will achieve good results" (not measurable)
- "The model will learn" (too vague)

### Step 4: Specify Methodology

#### Model Configuration

Document exactly:

- Model architecture (with specific dimensions)
- Hyperparameters (learning rate, batch size, epochs, etc.)
- Any variations from base architecture
- Random seeds to use (e.g., 42, 123, 456)

#### Data Configuration

Document:

- Dataset(s) to use
- Train/validation/test splits
- Preprocessing steps
- Data augmentation (if any)
- Expected data sizes

#### Training Configuration

Document:

- Optimizer and settings
- Learning rate schedule
- Number of epochs / iterations
- Early stopping criteria (if any)
- Hardware requirements
- Estimated training time

#### Evaluation Protocol

Document:

- Evaluation metrics
- When to evaluate (every N epochs, end of training, etc.)
- Test set(s) to evaluate on
- Any special evaluation procedures

### Step 5: Define Success Criteria

Establish clear success criteria:

**Quantitative:**

- Minimum acceptable performance
- Target performance
- Stretch goal performance

**Example:**

- Minimum: Match baseline performance (within 0.5%)
- Target: 2-3% improvement over baseline
- Stretch: 5% improvement over baseline

**Qualitative:**

- What should model learn or produce?
- What behaviors indicate success?
- What failure modes should be absent?

### Step 6: Plan Implementation

Outline implementation approach:

- What code needs to be written/modified?
- Where will experiment code live?
- What existing code can be reused?
- What new components are needed?
- Estimated implementation time

### Step 7: Plan Execution

Document execution plan:

- Preparation steps (environment setup, data preparation)
- Exact command to run experiment
- What to monitor during training
- Checkpointing strategy
- Logging configuration

### Step 8: Plan Analysis

Define analysis approach:

- What metrics to compute
- What visualizations to create
- Statistical tests to run (if comparing methods)
- How to interpret different outcomes

### Step 9: Predict Results

Have user make predictions:

- What do you expect the results to be?
- What would indicate success?
- What would indicate failure?
- What could go wrong?

This helps with later interpretation and debugging.

### Step 10: Create Experiment Specification

Use experiment-spec-tmpl.yaml to create formal specification:

- Experiment ID (e.g., EXP-001, baseline-resnet50, ablation-attention)
- All details from above steps
- Save to docs/experiments/{{experiment_id}}.md

### Step 11: Review and Validate

Check that experiment spec has:

- [ ] Clear, testable hypothesis
- [ ] Complete methodology (someone else could run it)
- [ ] Specific success criteria
- [ ] Reproducibility details (seeds, versions)
- [ ] Analysis plan
- [ ] Connection to research questions

## Output

- Complete experiment specification document in docs/experiments/
- Ready for ML engineer to implement
- Clear enough that results can be interpreted objectively

## Best Practices

### Good Experiment Design

- **One variable at a time**: Change one thing, measure effect
- **Fair comparisons**: Same data, same compute budget, same eval protocol
- **Multiple runs**: Use 3-5 seeds for statistical validity
- **Appropriate baselines**: Compare against strong, relevant baselines
- **Negative controls**: Include experiments that should fail to validate setup

### Common Pitfalls to Avoid

- **Data leakage**: Test set contamination, info from future in sequence data
- **Unfair comparisons**: Different hyperparameters, different tuning effort
- **Cherry-picking**: Running many experiments, reporting only best
- **Insufficient runs**: Single run doesn't show variance
- **Weak baselines**: Comparing only against strawman baselines

### Experiment Types

**Baseline Comparison:**

- Purpose: Show your method is better
- Requires: Multiple strong baselines
- Analysis: Statistical significance, multiple metrics

**Ablation Study:**

- Purpose: Validate each component contributes
- Requires: Modular implementation
- Analysis: Performance delta per component

**Hyperparameter Study:**

- Purpose: Find optimal settings
- Requires: Parameter grid, compute resources
- Analysis: Sensitivity curves, optimal region

**Scaling Study:**

- Purpose: Understand scaling behavior
- Requires: Multiple experiments at different scales
- Analysis: Scaling curves, efficiency metrics

**Robustness Study:**

- Purpose: Test under varied conditions
- Requires: Multiple test scenarios
- Analysis: Performance range, failure modes

## Related Templates

- experiment-spec-tmpl.yaml (creates formal specification)
- experimental-architecture-tmpl.yaml (defines overall experimental framework)

## Notes

- Good experiment design is half the battle
- Clear hypotheses make results interpretable
- Over-specify rather than under-specify
- If you can't predict what results mean, redesign experiment
- Document reasoning - helps with paper writing later
