# Archon MCP Integration for AI Research

## Overview

This document describes how the BMAD AI Research expansion pack integrates with Archon MCP server for comprehensive research project management, enabling collaborative research with structured documentation, task tracking, and knowledge management.

**Key Integration Points:**

- ✅ **Research Project Management** - Each research project is an Archon project
- ✅ **Research Documents** - All planning docs, proposals, specs in Archon
- ✅ **Task & Experiment Tracking** - Experiments, analysis, writing as Archon tasks
- ✅ **Knowledge Base** - Papers and research findings in Archon KB
- ✅ **Multi-Agent Collaboration** - All research agents use Archon for coordination

## Research Document Structure

### The 17 Critical Research Documents

For a research team to effectively collaborate, these documents must be created and maintained in Archon:

#### 🎯 Project Understanding (Created First - Phase 1)

**1. Research Project Brief** (`type=note`)

- Created by: Research Lead
- Read by: All agents
- Purpose: High-level project context, motivation, expected impact
- When: Very first document, created during project initialization

**2. Literature Review** (`type=note`)

- Created by: Research Assistants (Web, ArXiv, KB specialists)
- Read by: Research Lead, Research Scientist
- Purpose: Comprehensive survey of related work
- When: Phase 1, after brainstorming

**3. Research Proposal** (`type=spec`)

- Created by: Research Lead (synthesizes all Phase 1 findings)
- Read by: Everyone
- Purpose: Complete formal research proposal with hypotheses, methods, timeline
- When: End of Phase 1, consolidates all findings

#### 🔬 Research Questions (Created First - Phase 1)

**4. Research Questions Document** (`type=spec`)

- Created by: Research Lead
- Read by: Research Scientist, Experiment PM
- Purpose: Formalized hypotheses, testable questions, success metrics
- When: Phase 1, extracted from brainstorming

**5. Gap Analysis** (`type=note`)

- Created by: Research Assistants (especially KB Curator)
- Read by: Research Lead, Research Scientist
- Purpose: What's missing in current research, opportunities for contribution
- When: Phase 1, during literature review

#### 🧪 Experimental Design (Created Second - Phase 2)

**6. Experimental Architecture** (`type=design`)

- Created by: Research Scientist
- Read by: Experiment PM, Experiment Architect, ML Engineer
- Purpose: Overall experimental design, methodology, validation approach
- When: Phase 2, after proposal approved

**7. Experiment Specifications** (`type=spec`, multiple docs)

- Created by: Research Scientist
- Read by: ML Engineer, Data Analyst
- Purpose: Detailed specification for each experiment (one doc per experiment)
- When: Phase 2, created for each planned experiment

**8. Ablation Study Plan** (`type=spec`)

- Created by: Research Scientist
- Read by: ML Engineer
- Purpose: Systematic variations to test hypotheses
- When: Phase 2, alongside experiment specs

#### 🏗️ Model Architecture (Created Second - Phase 2)

**9. Model Architecture Document** (`type=design`)

- Created by: Experiment Architect
- Read by: ML Engineer, Research Scientist
- Purpose: Neural network architecture details, layer specifications, training procedures
- When: Phase 2, after experimental architecture

**10. Baseline Specifications** (`type=spec`)

- Created by: Research Scientist
- Read by: ML Engineer
- Purpose: Reference implementations to compare against
- When: Phase 2, critical for fair comparison

#### ⚙️ Technical Setup (Created Third - Phase 3)

**11. Technical Stack Document** (`type=guide`)

- Created by: Experiment Architect
- Read by: ML Engineer, Data Analyst
- Purpose: Frameworks (PyTorch/TF), hardware requirements, dependencies
- When: Phase 3, before implementation

**12. Data Pipeline Design** (`type=design`)

- Created by: Experiment Architect
- Read by: ML Engineer, Data Analyst
- Purpose: Data preprocessing, augmentation, batching strategies
- When: Phase 3, before implementation

**13. Experiment Tracking Setup** (`type=guide`)

- Created by: ML Engineer
- Read by: Data Analyst, Research Scientist
- Purpose: wandb configuration, metrics to track, artifact storage
- When: Phase 3, at implementation start

#### 📊 State of the Art (Created Second - Phase 2)

**14. Benchmark Specifications** (`type=spec`)

- Created by: Research Scientist
- Read by: ML Engineer, Data Analyst
- Purpose: Standard benchmarks, evaluation protocols, metrics
- When: Phase 2, alongside experimental architecture

**15. Baseline Comparison Matrix** (`type=note`)

- Created by: Research Scientist
- Read by: Data Analyst, Research Writer
- Purpose: Target performance numbers, what to beat
- When: Phase 2, updated during Phase 5 (results)

#### 💡 Novelties (Created Throughout)

**16. Novel Contributions** (`type=spec`)

- Created by: Research Scientist
- Read by: Research Lead, Research Writer
- Purpose: What's new in our approach, why it's better, key insights
- When: Phase 2, refined throughout project

**17. Innovation Log** (`type=note`)

- Created by: Any agent (collaborative)
- Read by: Research Lead, Research Scientist
- Purpose: Ongoing ideas, experiments that didn't work, lessons learned
- When: Continuous, updated throughout project

### Document Flow by Phase

```
Phase 1: Planning & Literature (Research Lead + Assistants)
├─ Create: Research Project Brief
├─ Create: Literature Review (3 specialists in parallel)
├─ Create: Research Questions Document
├─ Create: Gap Analysis
└─ Create: Research Proposal (consolidates all above)

Phase 2: Experimental Design (Research Scientist)
├─ Read: Research Proposal, Questions, Gap Analysis
├─ Create: Experimental Architecture
├─ Create: Novel Contributions
├─ Create: Benchmark Specifications
├─ Create: Baseline Specifications
├─ Create: Baseline Comparison Matrix
├─ Create: Experiment Specifications (multiple)
└─ Create: Ablation Study Plan

Phase 3: Technical Planning (Experiment PM + Architect)
├─ Read: Experimental Architecture, Experiment Specs
├─ Create: Development Plan (as tasks in Archon)
├─ Create: Model Architecture Document
├─ Create: Technical Stack Document
├─ Create: Data Pipeline Design
└─ Create: Implementation Standards

Phase 4: Implementation (ML Engineer)
├─ Read: All design docs, experiment specs
├─ Create: Experiment Tracking Setup
├─ Create: Code (in Git, not Archon)
├─ Update: Innovation Log (if discoveries)
└─ Update: Experiment Specifications (if modifications)

Phase 5: Results & Analysis (Data Analyst)
├─ Read: Experiment Specs, Benchmarks
├─ Create: Experiment Results (type=note, one per experiment)
├─ Create: Statistical Analysis
├─ Update: Baseline Comparison Matrix
└─ Create: Figures/Tables (in results/, not Archon)

Phase 6: Paper Writing (Research Writer)
├─ Read: ALL documents
├─ Create: Paper Outline
├─ Create: Paper Draft Sections
└─ Create: Submission Checklist

Phase 7: Validation (Reproducibility Engineer)
├─ Read: ALL documents + code
├─ Create: Reproducibility Report
└─ Create: Release Checklist
```

## Archon Task Management for Research

### Task Types in Research Projects

**1. Experiment Tasks** (`feature="experiment-{name}"`)

- One task per experiment specification
- Status flow: `todo` → `doing` → `review` → `done`
- Assigned to: ML Engineer
- Links to: Experiment Specification document

**2. Analysis Tasks** (`feature="analysis"`)

- Statistical tests, significance testing, figure creation
- Assigned to: Data Analyst
- Links to: Experiment Results documents

**3. Paper Writing Tasks** (`feature="paper"`)

- Section drafting, revision, formatting
- Assigned to: Research Writer
- Links to: Paper Outline, relevant results

**4. Literature Tasks** (`feature="literature"`)

- Paper searches, annotation extraction, synthesis
- Assigned to: Research Assistants (Web/ArXiv/KB)
- Links to: Literature Review document

**5. Validation Tasks** (`feature="reproducibility"`)

- Code validation, reproducibility checks
- Assigned to: Reproducibility Engineer
- Links to: Reproducibility Report

### Task Granularity Guidelines

**For Research Projects:**

- Create **experiment-level tasks**, not implementation-level tasks
- Each experiment = one task (which may take days/weeks)
- Each analysis = one task
- Each paper section = one task

**Example Task Breakdown:**

```
Epic: "Validate Hypothesis 1: Our attention mechanism improves efficiency"
├─ Task: "Implement baseline transformer" (ML Engineer)
├─ Task: "Implement our efficient attention variant" (ML Engineer)
├─ Task: "Run experiments on GLUE benchmark" (ML Engineer)
├─ Task: "Analyze results and statistical significance" (Data Analyst)
├─ Task: "Create comparison figures" (Data Analyst)
└─ Task: "Write results subsection for paper" (Research Writer)
```

## Research-Specific Archon Workflows

### Workflow 1: Initialize Research Project

**Agent:** Research Lead
**Task:** `archon-research-init.md`

```yaml
Steps:
1. Check Archon MCP health
2. Prompt for research project name
3. Create Archon project
4. Create initial Research Project Brief document
5. Initialize knowledge base tags for this project
6. Display project status
```

### Workflow 2: Create Research Proposal

**Agent:** Research Lead
**Task:** `archon-create-research-proposal.md`

```yaml
Prerequisites:
- Literature Review document exists
- Research Questions document exists
- Gap Analysis document exists

Steps:
1. Search KB for research proposal templates
2. Read existing brainstorming and literature documents
3. Elicit proposal details from user
4. Create comprehensive Research Proposal (type=spec)
5. Extract experiment ideas as epics/tasks
```

### Workflow 3: Design Experiment

**Agent:** Research Scientist
**Task:** `archon-design-experiment.md`

```yaml
Prerequisites:
- Research Proposal exists
- Research Questions exist

Steps:
1. Read Research Proposal and Questions
2. Search KB for experimental design patterns
3. Elicit experiment details (hypothesis, methodology, metrics)
4. Create Experimental Architecture document (type=design)
5. Create individual Experiment Specification documents
6. Create experiment tasks in Archon
```

### Workflow 4: Implement Experiment

**Agent:** ML Engineer
**Task:** `archon-implement-experiment.md`

```yaml
Prerequisites:
- Experiment Specification exists
- Model Architecture exists
- Technical Stack document exists

Steps:
1. Read experiment specification from Archon
2. Search KB for implementation patterns
3. Implement code in codebase/
4. Setup wandb tracking
5. Run experiment
6. Log results metadata to Archon task
7. Mark task as 'review' for Data Analyst
```

### Workflow 5: Analyze Results

**Agent:** Data Analyst
**Task:** `archon-analyze-results.md`

```yaml
Prerequisites:
- Experiment task in 'review' status
- Experiment Results in wandb or results/

Steps:
1. Read experiment specification
2. Fetch wandb results or load from results/
3. Perform statistical analysis
4. Create Experiment Results document in Archon
5. Update Baseline Comparison Matrix
6. Create figures in results/
7. Mark task as 'done'
```

### Workflow 6: Write Paper Section

**Agent:** Research Writer
**Task:** `archon-write-paper-section.md`

```yaml
Prerequisites:
- All relevant Experiment Results documents exist
- Paper Outline exists

Steps:
1. Read all related documents from Archon
2. Read figures from results/
3. Draft section in research-paper/
4. Reference Archon document IDs in LaTeX comments
5. Update Paper Outline with section status
6. Sync to Git/Overleaf
```

## Agent Integration Patterns

### All Research Agents Must:

1. **Check Archon Availability on Activation**

```yaml
activation-instructions:
  - CRITICAL ARCHON-FIRST RULE:
      - On activation, FIRST check: mcp__archon__health_check()
      - If unavailable: HALT and inform user to start Archon
      - If available: Load project context
```

2. **Initialize Project Context**

```yaml
- Execute: mcp__archon__find_projects(query="{current_project}")
- If not found: Prompt user to create or select project
- Store: project_id for session
```

3. **Search Knowledge Base Before Implementing**

```yaml
- Before any implementation/creation:
    - Search KB for patterns: mcp__archon__rag_search_knowledge_base()
    - Search for code examples: mcp__archon__rag_search_code_examples()
    - Apply findings to current task
```

4. **Check for Prerequisite Documents**

```yaml
- Before creating documents:
    - Check for expected prerequisites
    - Alert user if missing (with options to proceed/create/skip)
    - Load existing docs to inform current work
```

5. **Log Progress to Archon**

```yaml
- During long tasks:
    - Update task description with progress notes
    - Create intermediate documents if useful
    - Link related documents via description
```

## Integration with Existing Research Workflow

### Phase 1: Planning - WITH ARCHON

**NEW Workflow:**

```bash
# Step 1: Initialize Research Project in Archon
@research-lead
*init-research-project "Novel Attention Mechanisms"
# → Creates Archon project
# → Creates Research Project Brief document

# Step 2: Brainstorm with Archon context
*brainstorm "attention mechanisms efficiency"
# → Updates Research Project Brief
# → Creates Research Questions document

# Step 3: Literature Search (3 specialists)
@research-assistant-web
*search "efficient attention 2024"
# → Creates/updates Literature Review (Web sources section)

@research-assistant-arxiv
*search "attention mechanisms"
# → Creates/updates Literature Review (ArXiv section)

@research-assistant-kb
*set-tag "attention-research"
*search "attention patterns"
# → Creates/updates Literature Review (KB section)
# → Creates Gap Analysis

# Step 4: Research Lead synthesizes
@research-lead
*create-research-proposal
# → Reads all Phase 1 documents
# → Creates comprehensive Research Proposal
```

### Phase 2: Experimentation - WITH ARCHON

**NEW Workflow:**

```bash
# Step 1: Research Scientist designs experiments
@research-scientist
*design-experiment "test efficient attention hypothesis"
# → Reads Research Proposal
# → Searches KB for patterns
# → Creates Experimental Architecture
# → Creates Experiment Specifications (multiple)
# → Creates experiment tasks in Archon

# Step 2: Experiment PM plans development
@experiment-pm
*plan-experiment
# → Reads Experimental Architecture
# → Breaks down into implementation tasks
# → Creates development plan in Archon

# Step 3: Experiment Architect designs code structure
@experiment-architect
*design-experiment-architecture
# → Reads experiment specs
# → Creates Model Architecture document
# → Creates Technical Stack document
# → Creates Data Pipeline Design

# Step 4: ML Engineer implements
@ml-engineer
*next-task
*implement-experiment
# → Reads all design docs from Archon
# → Implements in codebase/
# → Runs experiment
# → Logs results to Archon task
# → Marks for review

# Step 5: Data Analyst analyzes
@data-analyst
*analyze-results
# → Reads Experiment Specification from Archon
# → Analyzes results
# → Creates Experiment Results document
# → Creates figures in results/
# → Marks task as done
```

### Phase 3: Writing - WITH ARCHON

**NEW Workflow:**

```bash
# Step 1: Research Writer creates paper outline
@research-writer
*create-paper-outline
# → Reads Research Proposal
# → Reads all Experiment Results
# → Creates Paper Outline document in Archon

# Step 2: Write each section
*write-paper-section "experiments"
# → Reads relevant Experiment Results from Archon
# → Reads figures from results/
# → Writes in research-paper/
# → Updates Paper Outline status
# → Syncs to Git

# Step 3: Continuous updates
# After EACH experiment:
*update-paper-section "experiments"
# → Incorporates latest results from Archon
```

## Archon Document Types for Research

| Document                   | Archon Type | Created By           | Read By                           |
| -------------------------- | ----------- | -------------------- | --------------------------------- |
| Research Project Brief     | `note`      | Research Lead        | All                               |
| Literature Review          | `note`      | Research Assistants  | Research Lead, Scientist          |
| Research Questions         | `spec`      | Research Lead        | Scientist, PM, Architect          |
| Gap Analysis               | `note`      | Research Assistants  | Research Lead, Scientist          |
| Research Proposal          | `spec`      | Research Lead        | All                               |
| Experimental Architecture  | `design`    | Research Scientist   | PM, Architect, ML Engineer        |
| Experiment Specification   | `spec`      | Research Scientist   | ML Engineer, Data Analyst         |
| Ablation Study Plan        | `spec`      | Research Scientist   | ML Engineer                       |
| Model Architecture         | `design`    | Experiment Architect | ML Engineer, Research Scientist   |
| Baseline Specifications    | `spec`      | Research Scientist   | ML Engineer                       |
| Technical Stack            | `guide`     | Experiment Architect | ML Engineer, Data Analyst         |
| Data Pipeline Design       | `design`    | Experiment Architect | ML Engineer, Data Analyst         |
| Experiment Tracking Setup  | `guide`     | ML Engineer          | Data Analyst                      |
| Benchmark Specifications   | `spec`      | Research Scientist   | ML Engineer, Data Analyst         |
| Baseline Comparison Matrix | `note`      | Research Scientist   | Data Analyst, Research Writer     |
| Novel Contributions        | `spec`      | Research Scientist   | Research Lead, Research Writer    |
| Innovation Log             | `note`      | Any (collaborative)  | Research Lead, Research Scientist |
| Experiment Results         | `note`      | Data Analyst         | Research Writer, Research Lead    |
| Statistical Analysis       | `note`      | Data Analyst         | Research Writer                   |
| Paper Outline              | `note`      | Research Writer      | Research Writer                   |
| Paper Draft Sections       | `note`      | Research Writer      | Research Lead (review)            |
| Submission Checklist       | `note`      | Research Writer      | All                               |
| Reproducibility Report     | `note`      | Reproducibility Eng  | All                               |
| Release Checklist          | `note`      | Reproducibility Eng  | ML Engineer, Research Lead        |

## Best Practices

### 1. Document Early, Update Often

- Create all Phase 1 documents BEFORE starting experiments
- Update documents as research progresses
- Don't wait until paper writing to document findings

### 2. Link Everything

- Reference Archon document IDs in task descriptions
- Link experiment tasks to their specifications
- Cross-reference related documents

### 3. Use Tags Effectively

```yaml
# Project-specific tags
tags: ["attention-research", "efficiency", "transformers"]

# Document lifecycle tags
tags: ["draft", "reviewed", "final"]

# Experiment tags
tags: ["baseline", "ablation", "main-result"]
```

### 4. Maintain Baseline Comparison Matrix

- Update after EVERY experiment
- Keep running comparison with state-of-the-art
- Document when/why we beat baselines

### 5. Keep Innovation Log Active

- Document failed experiments (valuable for paper)
- Track evolving hypotheses
- Note unexpected findings immediately

### 6. Search Before Creating

- Always search KB before implementing
- Reuse patterns from previous research
- Don't reinvent wheels

## Migration from File-Based to Archon

For existing research projects, migrate in phases:

### Phase 1: Start Using Archon for New Work

- Create Archon project
- Add existing docs to knowledge base
- Create new documents in Archon

### Phase 2: Migrate Critical Documents

- Research Proposal → Archon (type=spec)
- Experiment Specs → Archon (type=spec)
- Results → Archon (type=note)

### Phase 3: Full Migration

- All planning docs → Archon
- All tasks → Archon
- Keep code in Git

## Example: Complete Research Project in Archon

```yaml
Project: "Efficient Attention Mechanisms for Long Sequences"
ID: proj-abc123

Documents (17):
├─ Research Project Brief (note)
├─ Literature Review (note)
├─ Research Questions (spec)
├─ Gap Analysis (note)
├─ Research Proposal (spec)
├─ Experimental Architecture (design)
├─ Novel Contributions (spec)
├─ Benchmark Specifications (spec)
├─ Baseline Specifications (spec)
├─ Baseline Comparison Matrix (note)
├─ Experiment Spec: Baseline Transformer (spec)
├─ Experiment Spec: Our Efficient Attention (spec)
├─ Ablation Study Plan (spec)
├─ Model Architecture (design)
├─ Technical Stack (guide)
├─ Data Pipeline Design (design)
└─ Experiment Tracking Setup (guide)

Tasks (25):
├─ Epic: Literature Review (feature=literature)
│   ├─ Search web for efficient attention (done)
│   ├─ Search arXiv papers (done)
│   └─ Search KB with tags (done)
├─ Epic: Baseline Implementation (feature=baseline)
│   ├─ Implement baseline transformer (done)
│   ├─ Run baseline experiments (done)
│   └─ Analyze baseline results (done)
├─ Epic: Novel Attention Mechanism (feature=novel-attention)
│   ├─ Implement efficient attention (doing)
│   ├─ Run attention experiments (todo)
│   └─ Analyze attention results (todo)
├─ Epic: Ablation Studies (feature=ablation)
│   ├─ Vary attention heads (todo)
│   ├─ Vary sequence lengths (todo)
│   └─ Vary model sizes (todo)
└─ Epic: Paper Writing (feature=paper)
    ├─ Write introduction (todo)
    ├─ Write methodology (todo)
    ├─ Write experiments (todo)
    └─ Write conclusion (todo)

Knowledge Base Tags:
- attention-research
- efficiency
- transformers
- long-sequences
```

## Summary

**Archon transforms AI research workflow from:**
❌ Scattered markdown files, manual tracking, static knowledge
✅ Centralized documents, dynamic tasks, searchable KB

**Key Benefits:**

1. **All team members see the same source of truth**
2. **Research questions → Experiments → Results flow is tracked**
3. **Knowledge accumulates across projects**
4. **Collaboration is seamless**
5. **Nothing gets lost or forgotten**

**Integration Checklist:**

- ✅ All agents check Archon on activation
- ✅ All major documents in Archon
- ✅ All experiments as Archon tasks
- ✅ All papers in knowledge base
- ✅ Continuous updates throughout research

This enables true collaborative AI research with full traceability from research question to published paper.
