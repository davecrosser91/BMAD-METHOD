# Deep Research Workflow - Implementation Summary

## What Was Added

The bmad-ai-research expansion pack now includes a complete **five-phase agentic deep research workflow** that implements state-of-the-art autonomous research methodology inspired by systems like Anthropic's multi-agent research system, DeepResearcher, and Perplexity Deep Research.

## Files Created

### 1. Core Workflow Definition

**File:** `workflows/deep-research.yaml`

- Complete five-phase workflow specification
- Planning → Exploration → Analysis → Synthesis → Iteration & Refinement
- Decision points and iteration loops
- Timeline estimates and success criteria
- Integration with three-specialist research assistant system

### 2. Execution Task

**File:** `tasks/run-deep-research.md`

- Step-by-step task guide for Research Lead
- Detailed instructions for each phase
- Examples and best practices
- Integration with existing research team
- Usage patterns and invocation methods

### 3. Methodology Documentation

**File:** `docs/DEEP-RESEARCH-METHODOLOGY.md`

- Comprehensive explanation of the methodology
- Detailed phase descriptions
- Architecture patterns (orchestrator-worker, parallel processing)
- Comparison with traditional search
- Use cases and best practices
- Timeline estimates and deliverables

### 4. Visual Guide

**File:** `docs/DEEP-RESEARCH-VISUAL-GUIDE.md`

- ASCII art diagrams of complete workflow
- Three-specialist parallel search architecture
- Iterative refinement pattern visualization
- Quality assessment framework
- Timeline visualization
- Use case examples with diagrams

### 5. Agent Updates

**File:** `agents/research-lead.md` (updated)

- Added `*run-deep-research` command
- Added dependency on `run-deep-research.md` task
- Added dependency on `deep-research.yaml` workflow
- Enhanced orchestration capabilities

### 6. README Updates

**File:** `README.md` (updated)

- New section: "🔍 NEW: Agentic Deep Research Workflow"
- Prominent placement before standard research workflow
- Quick start instructions
- Key features and outputs
- Use case examples
- Links to all documentation

## Key Features

### Five-Phase Methodology

1. **Planning Phase (30-60 min)**
   - Query analysis & intent extraction
   - Problem decomposition (3-7 sub-questions)
   - Research strategy development

2. **Exploration Phase (1-3 hours)**
   - Query generation & optimization
   - Parallel multi-agent search (Web, ArXiv, KB)
   - Source discovery & validation
   - Iterative refinement of queries

3. **Analysis Phase (1-2 hours)**
   - Content extraction & processing
   - Information ranking & filtering
   - Pattern recognition & gap analysis
   - Cross-source validation

4. **Synthesis Phase (1-2 hours)**
   - Multi-source integration
   - Comprehensive report generation
   - Citation & fact-checking
   - Strategic insights development

5. **Iteration & Refinement Phase (30 min - 2 hours)**
   - Quality assessment (completeness, accuracy, relevance, coherence)
   - Human-in-the-loop feedback
   - Decision on iteration or completion
   - Continuous improvement

### Architecture Patterns

**Orchestrator-Worker Pattern:**

- Research Lead acts as orchestrator
- Three specialists (Web, ArXiv, KB) act as workers
- Coordinated parallel execution
- Centralized synthesis and decision-making

**Parallel Processing:**

- Multiple agents work simultaneously during exploration
- Significant time savings over sequential search
- Comprehensive source coverage

**Iterative Refinement:**

- Quality gates at each phase
- Ability to loop back to any earlier phase
- Human oversight at critical decision points
- Continuous learning and improvement

## Integration with Existing System

### Three-Specialist Research Assistant System

The deep research workflow leverages the existing three-specialist architecture:

- **D. Freuzer** (@research-assistant-web) - Web content, blogs, GitHub
- **H. Zoppel** (@research-assistant-arxiv) - ArXiv papers, academic pre-prints
- **A. Pilz** (@research-assistant-kb) - Knowledge base, curated corpus

All three specialists work in **parallel** during the exploration phase, coordinated by the Research Lead.

### Existing Research Workflows

The deep research workflow complements existing workflows:

- **Phase 1 Planning** - Use deep research BEFORE creating research proposal
- **Literature Review** - Comprehensive coverage for paper related work section
- **Experiment Design** - Thorough background research before experiments
- **Grant Writing** - Evidence-based gap identification

### MCP Integration

Full integration with existing MCP servers:

- **Archon MCP** - Knowledge base search, document management
- **ArXiv MCP** - Academic paper search (optional, graceful fallback)
- **wandb MCP** - Experiment tracking (used in later research phases)

## Usage

### Basic Invocation

```bash
@research-lead
*run-deep-research "your research topic or question"
```

The Research Lead will:

1. Decompose the question into 3-7 sub-questions
2. Generate optimized search queries (2-5 keywords each)
3. Coordinate parallel search across three specialists
4. Analyze and rank information
5. Synthesize comprehensive report
6. Assess quality and iterate if needed

### Example Use Cases

**Technology Investigation:**

```bash
*run-deep-research "efficient attention mechanisms for transformers"
```

**Business Intelligence:**

```bash
*run-deep-research "AI regulation trends in healthcare 2024"
```

**Academic Literature Review:**

```bash
*run-deep-research "self-supervised learning for computer vision"
```

**Competitive Analysis:**

```bash
*run-deep-research "vector database landscape 2024"
```

## Outputs

After completion, the workflow produces:

**Primary Deliverables:**

- `deep-research-report.md` - Comprehensive findings by sub-question
- `executive-summary.md` - 1-page high-level overview
- `bibliography.md` - Complete source list with quality ratings

**Supporting Artifacts:**

- `pattern-analysis.md` - Cross-cutting themes and insights
- `knowledge-gaps.md` - Identified gaps and future directions
- `methodology.md` - Research process documentation
- `process-log.md` - Lessons learned and improvements

## Timeline

**Single Iteration:** 4-8 hours

- Planning: 30-60 min
- Exploration: 1-3 hours
- Analysis: 1-2 hours
- Synthesis: 1-2 hours
- Refinement: 30 min - 2 hours

**Typical Project:** 1-3 iterations for comprehensive results

## Success Criteria

A successful deep research engagement achieves:

- ✅ All sub-questions answered comprehensively
- ✅ Multiple high-quality sources per sub-question (3-5+)
- ✅ Clear patterns and insights identified
- ✅ Knowledge gaps explicitly documented
- ✅ Actionable recommendations provided
- ✅ All claims properly cited and verified
- ✅ Report is coherent and well-structured
- ✅ User/stakeholder satisfied with depth and relevance

## Key Differentiators

### vs. Traditional Search

| Traditional Search   | Deep Research Workflow                 |
| -------------------- | -------------------------------------- |
| One-shot retrieval   | Iterative and adaptive                 |
| Single search engine | Multi-agent parallel processing        |
| List of links        | Deep synthesis with insights           |
| Manual evaluation    | Automated ranking and filtering        |
| No follow-up         | Quality-driven feedback loops          |
| Lost context         | Context preservation across iterations |

### vs. Simple Literature Review

| Simple Literature Review | Deep Research                           |
| ------------------------ | --------------------------------------- |
| Single source type       | Multi-source (web, academic, KB)        |
| Sequential search        | Parallel agent coordination             |
| Basic summarization      | Deep pattern recognition                |
| No iteration             | Iterative refinement with quality gates |
| Fixed scope              | Adaptive exploration                    |

## Best Practices

### Query Construction

- Keep queries **SHORT** (2-5 keywords max) - CRITICAL!
- Focus on technical terms and specific concepts
- Avoid filler words ("how to", "implement", "example")
- For multi-concept searches, do multiple focused queries

### Source Evaluation

- Prioritize credible, authoritative sources
- Check publication dates for currency
- Verify author expertise and credentials
- Cross-reference claims across multiple sources

### Synthesis

- Go beyond simple aggregation
- Create meaningful connections between findings
- Acknowledge contradictions and uncertainties
- Provide actionable insights and recommendations

### Iteration

- Don't hesitate to loop back for deeper investigation
- Quality assessment is critical before finalization
- User feedback guides refinement direction
- Document lessons learned for future research

## Technical Implementation Notes

### Workflow YAML Structure

- Uses decision points for iteration control
- Supports human-in-the-loop feedback
- Modular phase design for independent execution
- Clear inputs/outputs for each step

### Agent Coordination

- Research Lead acts as orchestrator
- Explicit delegation to specialists
- Parallel execution where possible
- Context preservation across phases

### Quality Assurance

- Multiple quality gates throughout workflow
- Explicit success criteria at each phase
- Human oversight at critical decision points
- Continuous improvement tracking

## Future Enhancements

Potential areas for expansion:

1. **Custom Quality Criteria** - Adjust assessment based on research type
2. **Specialized Search Strategies** - Domain-specific optimization
3. **Source Diversity Optimization** - Ensure balanced perspective coverage
4. **Automated Citation Management** - Integration with reference managers
5. **Multi-language Support** - Extend beyond English sources
6. **Interactive Visualization** - Visual exploration of findings and patterns

## Documentation Structure

Complete documentation available in multiple formats:

1. **Quick Start** - README.md section for immediate usage
2. **Workflow Definition** - workflows/deep-research.yaml for complete spec
3. **Task Guide** - tasks/run-deep-research.md for execution details
4. **Methodology** - docs/DEEP-RESEARCH-METHODOLOGY.md for theory
5. **Visual Guide** - docs/DEEP-RESEARCH-VISUAL-GUIDE.md for diagrams
6. **Implementation** - This file for technical overview

## Conclusion

The deep research workflow represents a significant enhancement to the bmad-ai-research expansion pack, bringing state-of-the-art agentic research methodology to the BMAD framework.

By combining:

- Multi-agent parallel processing (three specialists)
- Iterative exploration and refinement
- Deep synthesis beyond aggregation
- Quality-driven progression with feedback loops
- Context preservation across phases

...it provides researchers with a powerful tool for autonomous, comprehensive information gathering and analysis that goes far beyond traditional search or literature review approaches.

---

## Quick Links

- **Workflow Definition**: [workflows/deep-research.yaml](workflows/deep-research.yaml)
- **Task Guide**: [tasks/run-deep-research.md](tasks/run-deep-research.md)
- **Methodology**: [docs/DEEP-RESEARCH-METHODOLOGY.md](docs/DEEP-RESEARCH-METHODOLOGY.md)
- **Visual Guide**: [docs/DEEP-RESEARCH-VISUAL-GUIDE.md](docs/DEEP-RESEARCH-VISUAL-GUIDE.md)
- **Main README**: [README.md](README.md)

## Getting Started

```bash
@research-lead
*run-deep-research "your research topic or question"
```

The Research Lead will orchestrate the entire five-phase workflow automatically!
