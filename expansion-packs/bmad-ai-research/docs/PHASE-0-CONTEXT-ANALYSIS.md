# Phase 0: Context Analysis - Codebase & Data Integration

## Critical New Feature

**PHASE 0: If you have existing code or data, the deep research workflow now analyzes that FIRST before doing external research.**

## The Problem It Solves

Previously, the deep research workflow would:

1. Ask you a research question
2. Do external web/academic/KB searches
3. Produce a generic research report

**Problem:** If you already have a codebase or data, the research wasn't grounded in YOUR specific implementation context.

## The Solution

**Phase 0: Context Analysis** (NEW!)

Before doing any external research, the workflow now:

1. Checks if `codebase/`, `data/`, or `results/` directories exist
2. If yes → Analyzes your existing code and data FIRST
3. Formulates research questions grounded in YOUR actual implementation
4. Then proceeds with external research using context-aware questions

## How It Works

### Step 1: Check for Existing Context

```
Research Lead checking for existing context...
├─ Check: Does codebase/ exist?
├─ Check: Does data/ exist?
├─ Check: Does results/ exist?
└─ Decision: Analyze context OR skip to Phase 1
```

**If NO existing code/data:**

- Skip Phase 0 entirely
- Proceed directly to Phase 1 (Planning)
- Traditional research workflow

**If YES existing code/data:**

- Execute Phase 0 analysis
- Ground research in actual implementation
- Context-aware research workflow

### Step 2: Codebase Analysis

**What it analyzes:**

```
Codebase Analysis:
├─ Technologies & frameworks used
│  └─ Example: Python 3.11, PyTorch 2.1, transformers, FastAPI
├─ Architecture patterns
│  └─ Example: Microservices, monolith, modular design
├─ Current capabilities
│  └─ Example: Image classification, data preprocessing, API endpoints
├─ Identified problems
│  └─ Example: Slow inference, memory leaks, poor scalability
├─ Technical constraints
│  └─ Example: Must maintain compatibility with legacy API
└─ Technical debt
   └─ Example: 47 TODOs, 12 FIXMEs, deprecated dependencies
```

**Tools used:**

- **Glob:** Find all source files (`**/*.{py,js,ts,cpp,java}`)
- **Read:** Examine key files (README, setup.py, package.json, main modules)
- **Grep:** Search for issues (`TODO|FIXME|BUG|XXX|HACK`)

**Outputs:**

- `codebase-analysis.md`
- `technology-stack.md`
- `existing-capabilities.md`
- `identified-problems.md`
- `technical-constraints.md`

### Step 3: Data & Results Analysis

**What it analyzes:**

```
Data Analysis:
├─ Data inventory
│  └─ Example: 10GB preprocessed images, 50K labeled samples
├─ Previous experiments
│  └─ Example: 5 training runs documented in results/
├─ What worked
│  └─ Example: ResNet50 achieved 85% accuracy
├─ What didn't work
│  └─ Example: ViT overfitted, data augmentation had no effect
├─ Open questions
│  └─ Example: Why does model fail on edge cases?
└─ Data constraints
   └─ Example: Limited labeled data, class imbalance
```

**Outputs:**

- `data-inventory.md`
- `previous-experiments-summary.md`
- `results-analysis.md`
- `open-questions.md`
- `data-constraints.md`

### Step 4: Context Synthesis

**What it produces:**

```
Context Synthesis:
├─ Unified context summary
│  └─ Combines codebase + data findings
├─ Grounded research questions
│  └─ Example: "How to reduce inference latency for transformer models
│     with our current PyTorch 2.1 constraint?"
├─ Implementation constraints
│  └─ Example: Must maintain backward compatibility with v1 API
└─ Research priorities
   └─ Ranked by impact on existing system
```

**Outputs:**

- `context-summary.md` (comprehensive synthesis)
- `grounded-research-questions.md` (specific to YOUR codebase)
- `implementation-constraints.md` (technical boundaries)
- `research-priorities.md` (ranked by impact)

## Integration with Remaining Phases

After Phase 0 completes, the research proceeds with context:

**Phase 1 (Planning):**

- Uses `context-summary.md` to understand constraints
- Uses `grounded-research-questions.md` as starting point
- Decomposes questions with implementation awareness

**Phase 2 (Exploration):**

- Searches are implementation-aware
- Example: "efficient attention mechanisms for PyTorch 2.1"
- Not generic: "efficient attention mechanisms" (too broad)

**Phase 3 (Analysis):**

- Filters results by applicability to YOUR tech stack
- Prioritizes solutions compatible with YOUR constraints

**Phase 4 (Synthesis):**

- Report includes implementation-specific recommendations
- "Here's how to apply this to YOUR existing PyTorch codebase"
- Not generic: "Here's a general overview"

**Phase 5 (Refinement):**

- Quality assessment considers implementation feasibility
- "Can we actually implement this given our constraints?"

## Example Scenario

**Scenario:** You have an existing ML project with PyTorch code

**Without Phase 0 (Old Approach):**

```bash
@research-lead
*run-deep-research "improve model performance"

Result:
- Generic research on model improvement
- May suggest techniques incompatible with your stack
- Doesn't consider your specific bottlenecks
- You have to manually filter for applicability
```

**With Phase 0 (New Approach):**

```bash
@research-lead
*run-deep-research "improve model performance"

Phase 0 Analysis:
├─ Found: codebase/ with PyTorch 2.1, ResNet50 implementation
├─ Found: results/ showing inference latency bottleneck
├─ Found: data/ with 10GB preprocessed dataset
└─ Grounded Question: "How to reduce ResNet50 inference latency
    in PyTorch 2.1 without retraining?"

Phase 1-4: Context-aware research
├─ Searches for PyTorch-specific optimizations
├─ Filters for ResNet50 compatible techniques
├─ Prioritizes no-retrain solutions
└─ Focuses on inference, not training

Result:
✓ Implementation-specific recommendations
✓ Compatible with your tech stack (PyTorch 2.1)
✓ Addresses your actual bottleneck (inference latency)
✓ Respects your constraint (no retraining)
✓ Directly applicable to your codebase
```

## Benefits

### 1. Grounded Research

- Research questions based on actual implementation
- Not generic or theoretical
- Directly addresses YOUR problems

### 2. Efficient Filtering

- Automatic filtering by tech stack compatibility
- Prioritization by implementation feasibility
- Less manual work reviewing inapplicable solutions

### 3. Implementation-Ready Recommendations

- "Here's how to do this in YOUR codebase"
- Specific file/module recommendations
- Considers existing architecture

### 4. Context-Aware Prioritization

- Ranked by impact on YOUR system
- Considers YOUR constraints
- Addresses YOUR pain points first

### 5. Learning from History

- Understands what you've already tried
- Doesn't suggest failed approaches again
- Builds on successful patterns

## When Phase 0 is Most Valuable

**Highly Valuable:**

- ✅ Existing codebase with specific tech stack
- ✅ Previous experiments documented
- ✅ Specific performance issues or bottlenecks
- ✅ Technical constraints or legacy compatibility needs
- ✅ Well-structured project with clear patterns

**Less Valuable (Skip Phase 0):**

- ❌ Starting from scratch
- ❌ Exploratory research (no implementation yet)
- ❌ Generic literature review
- ❌ No code or data to analyze

## Timeline Impact

**Phase 0 adds:** 30 minutes - 2 hours

**But saves time by:**

- More focused external searches (less time exploring dead ends)
- Better filtered results (less time reviewing inapplicable solutions)
- Implementation-ready recommendations (less time adapting generic advice)

**Net impact:** Usually neutral or positive (saves time overall)

## Technical Implementation

### Tools Used

**Glob:**

```python
# Find all Python files
pattern: "**/*.py"

# Find all config files
pattern: "**/*.{json,yaml,yml,toml}"

# Find documentation
pattern: "**/*.md"
```

**Read:**

```python
# Read key files
files = [
    "README.md",
    "setup.py",
    "requirements.txt",
    "package.json",
    "pyproject.toml"
]
```

**Grep:**

```python
# Find issues and technical debt
patterns = [
    "TODO",
    "FIXME",
    "BUG",
    "XXX",
    "HACK",
    "DEPRECATED"
]
```

### Analysis Process

1. **Discovery:** Glob to find all relevant files
2. **Examination:** Read key files for structure/dependencies
3. **Pattern Detection:** Grep for issues, patterns, technologies
4. **Synthesis:** Combine findings into context documents
5. **Question Formation:** Create grounded research questions

## Files Updated

1. ✅ `workflows/deep-research.yaml` - Added Phase 0 steps
2. ✅ `README.md` - Updated to show 6-phase methodology
3. ✅ This document - Comprehensive Phase 0 guide

## Usage

**Phase 0 is automatic:**

- Just run `*run-deep-research` as usual
- Research Lead automatically checks for existing code/data
- If found, Phase 0 executes automatically
- If not found, Phase 0 is skipped automatically

**No new commands needed!**

The workflow is smart enough to detect context and adapt.

## Example Outputs

### Codebase Analysis Example

```markdown
# Codebase Analysis

## Technology Stack

- Python 3.11
- PyTorch 2.1.0
- transformers 4.30.0
- FastAPI 0.100.0
- PostgreSQL 15

## Architecture

- Modular monolith
- REST API (FastAPI)
- Transformer-based ML models
- Database: PostgreSQL with SQLAlchemy ORM

## Current Capabilities

- Text classification (5 classes, 87% accuracy)
- Batch inference API
- Data preprocessing pipeline
- Model versioning system

## Identified Problems

- High inference latency (500ms per request)
- Memory usage spikes during batch processing
- No caching layer
- 23 TODOs in inference pipeline

## Technical Constraints

- Must maintain backward compatibility with v1 API
- Cannot upgrade PyTorch (dependency conflict)
- Limited to 8GB GPU memory
- Must support synchronous inference

## Recommendations for Research

1. Focus on inference optimization (not training)
2. PyTorch 2.1 compatible solutions only
3. Memory-efficient approaches (8GB limit)
4. Caching strategies for API responses
```

### Grounded Research Questions Example

```markdown
# Grounded Research Questions

Based on codebase analysis, research should address:

## Priority 1: Inference Optimization

Q: How to reduce transformer inference latency from 500ms to <100ms
in PyTorch 2.1 with 8GB GPU constraint?

Context: Current ResNet-based fallback achieves 50ms but lower accuracy

## Priority 2: Memory Management

Q: What memory-efficient attention mechanisms work with PyTorch 2.1
for batch sizes >32?

Context: Current implementation OOMs at batch size 48

## Priority 3: API Caching

Q: What are best practices for caching transformer inference results
in FastAPI applications?

Context: Many repeated queries, no caching currently implemented
```

## Summary

**Phase 0 transforms the deep research workflow from:**

- Generic external research
- Manual filtering for applicability
- Generic recommendations

**To:**

- Context-aware, grounded research
- Automatic filtering by compatibility
- Implementation-ready, specific recommendations

**The workflow now starts from YOUR reality, not from generic theory.**

This makes the research dramatically more valuable and actionable! 🚀
