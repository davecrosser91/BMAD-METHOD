---
id: run-deep-research
name: Execute Deep Research Workflow
description: Run the comprehensive five-phase agentic deep research workflow
version: '1.0.0'
agents:
  - research-lead
dependencies:
  - type: workflow
    path: workflows/deep-research.yaml
  - type: agent
    path: agents/research-assistant-web.md
  - type: agent
    path: agents/research-assistant-arxiv.md
  - type: agent
    path: agents/research-assistant-kb.md
prerequisites:
  - Research question or topic defined
  - MCP servers configured (optional but recommended)
---

# Execute Deep Research Workflow

## Overview

This task orchestrates the complete five-phase agentic deep research workflow:

1. **Planning** - Query analysis, problem decomposition, strategy development
2. **Exploration** - Parallel multi-agent search across web, academic, and knowledge base sources
3. **Analysis** - Content extraction, ranking, pattern recognition, gap analysis
4. **Synthesis** - Multi-source integration, comprehensive report generation, fact-checking
5. **Iteration & Refinement** - Quality assessment, feedback loops, continuous improvement

This goes beyond traditional search to conduct autonomous, iterative information gathering and analysis.

## Invocation

```bash
@research-lead
*run-deep-research "your research topic or question"
```

## Process

### Step 1: Load Workflow

```yaml
Load: workflows/deep-research.yaml
Present workflow overview to user
```

### Step 2: Phase 1 - Planning

**Query Analysis & Intent Extraction:**

- Analyze the research query deeply
- Identify underlying intent and context
- Determine information type needed (current, historical, comparative, predictive)
- Document research objectives and scope

**Problem Decomposition:**

- Break down complex question into 3-7 focused sub-questions
- Example: "AI safety developments" →
  - Recent research papers on AI safety
  - Regulatory changes and policy developments
  - Industry safety initiatives
  - Expert opinions and debates
  - Technical safety approaches

**Strategy Development:**

- Determine appropriate search depth
- Identify relevant data sources
- Establish quality criteria
- Plan resource allocation

**Outputs:**

- Research intent analysis
- 3-7 focused sub-questions
- Research strategy document

### Step 3: Phase 2 - Exploration

**Query Generation & Optimization:**
For each sub-question, generate 3-5 optimized search queries.

**CRITICAL: Keep queries SHORT (2-5 keywords max)**

Good queries:

- "vector search pgvector"
- "React useState hooks"
- "authentication JWT"

Bad queries:

- "how to implement vector search with pgvector in PostgreSQL for semantic similarity"

**Parallel Multi-Agent Search:**

Coordinate three specialists to work **simultaneously**:

```bash
# Web Research Specialist
@research-assistant-web
*search "{query}"
# → Blogs, docs, GitHub, industry trends

# ArXiv Specialist (if MCP available)
@research-assistant-arxiv
*search "{query}"
# → Academic papers, pre-prints

# Knowledge Base Curator
@research-assistant-kb
*search "{query}"
# → Curated project corpus
```

**Source Validation:**

- Review all sources from three assistants
- Validate credibility and authority
- Filter low-quality sources
- Check for comprehensive coverage

**Decision Point:**

- If coverage comprehensive → Continue to Phase 3
- If need more sources → Iterate exploration with refined queries

**Outputs:**

- Validated source lists from all three specialists
- Query effectiveness notes
- Coverage assessment

### Step 4: Phase 3 - Analysis

**Content Extraction & Processing:**

- Coordinate assistants to extract clean content from all sources
- Handle JavaScript-heavy websites
- Split long documents into coherent passages

**Information Ranking & Filtering:**

- Rank passages by relevance to each sub-question
- Apply quality scoring (credibility, recency, depth)
- Filter redundant information
- Identify high-value insights

**Pattern Recognition & Gap Analysis:**

- Identify recurring themes and patterns
- Detect contradictions and disagreements
- Find consensus views and outliers
- Recognize knowledge gaps
- Map relationships between concepts

**Outputs:**

- Ranked information by sub-question
- Pattern analysis report
- Contradictions and tensions identified
- Knowledge gap inventory
- Concept relationship map

### Step 5: Phase 4 - Synthesis

**Multi-source Integration:**

- Integrate findings from web, academic, and KB sources
- Create coherent narrative for each sub-question
- Establish logical flow between concepts
- Highlight agreements and disagreements

**Report Generation:**

Create comprehensive research report with structure:

```markdown
# Deep Research Report: [Topic]

## Executive Summary

[1-2 paragraph high-level summary]

## Research Objective & Methodology

[What we investigated and how]

## Detailed Findings

### Sub-question 1: [Question]

[Integrated findings from multiple sources]

### Sub-question 2: [Question]

[Integrated findings from multiple sources]

[... for each sub-question]

## Pattern Analysis & Key Insights

[Cross-cutting themes, patterns, and insights]

## Knowledge Gaps & Future Directions

[What's missing, what needs further research]

## Strategic Recommendations

[Actionable insights and recommendations]

## Sources & Bibliography

[Complete source list with ratings]

## Methodology & Limitations

[How research was conducted, caveats]
```

**Citation & Fact-checking:**

- Verify all claims have source attribution
- Check citation accuracy
- Validate quoted text against sources
- Ensure no unsupported generalizations
- Create complete bibliography

**Outputs:**

- Deep research report (markdown)
- Executive summary (1-page)
- Complete bibliography
- Citation verification log

### Step 6: Phase 5 - Iteration & Refinement

**Quality Assessment:**

Evaluate report using criteria:

- ✅ Completeness (all sub-questions answered?)
- ✅ Accuracy (claims supported by sources?)
- ✅ Relevance (findings address original question?)
- ✅ Coherence (narrative flows logically?)
- ✅ Actionability (insights are practical?)

**Feedback Loop (Human-in-the-Loop):**

Present findings to user and elicit feedback:

```
Research Complete - Quality Assessment

Report addresses [N] sub-questions with [M] sources
Quality scores:
- Completeness: [score/10]
- Accuracy: [score/10]
- Relevance: [score/10]
- Coherence: [score/10]

What refinement is needed?

1. Complete - Research meets needs (finalize and deliver)
2. Deeper exploration - Need more information on specific areas
3. Reframe question - Need to refine research question or sub-questions
4. Expand synthesis - Findings need better integration or framing
5. Other - Specify custom refinement

Your choice: _____
```

**Decision Point:**

- Complete → Finalize and deliver
- Deeper exploration → Return to Phase 2 with refined queries
- Reframe question → Return to Phase 1 with new decomposition
- Expand synthesis → Return to Phase 4 for better integration

**Continuous Improvement:**

- Document what worked well
- Note inefficiencies or bottlenecks
- Update search strategies
- Log lessons learned

### Step 7: Finalization

**Final Report Package:**

- Finalize main research report (markdown + PDF export ready)
- Create executive summary (1-page)
- Generate complete bibliography
- Add source quality ratings
- Include methodology documentation

**Deliverables:**

- `deep-research-report-[topic].md` - Full report
- `executive-summary-[topic].md` - 1-page summary
- `bibliography-[topic].md` - Complete source list
- `methodology-[topic].md` - Research process documentation

## Usage Examples

### Example 1: Technology Investigation

```bash
@research-lead
*run-deep-research "efficient attention mechanisms for transformers"

# System decomposes into sub-questions:
# 1. Recent academic papers on efficient attention
# 2. Industry implementations and benchmarks
# 3. Theoretical foundations and trade-offs
# 4. Practical considerations and limitations
# 5. Future directions and open problems

# Parallel exploration across:
# - Web: FlashAttention blog posts, PyTorch tutorials, HuggingFace guides
# - ArXiv: FlashAttention papers, Linformer, Performer, etc.
# - KB: Previously catalogued attention mechanism papers

# Synthesis produces comprehensive report with:
# - Overview of efficient attention landscape
# - Comparison of approaches (memory, speed, quality)
# - Implementation guidance
# - Gaps in current research
```

### Example 2: Business Intelligence

```bash
@research-lead
*run-deep-research "AI regulation trends in healthcare 2024"

# Sub-questions might include:
# 1. New regulations passed in 2024
# 2. Pending legislation and proposals
# 3. Industry compliance challenges
# 4. International regulatory comparison
# 5. Expert predictions for 2025

# Sources include:
# - Government websites and policy documents
# - Industry news and analysis
# - Academic policy papers
# - Expert interviews and opinions
```

### Example 3: Academic Literature Review

```bash
@research-lead
*run-deep-research "self-supervised learning for computer vision"

# Comprehensive academic survey:
# - Foundational papers (SimCLR, MoCo, BYOL, etc.)
# - Recent advances (MAE, DINO v2, etc.)
# - Application domains
# - Theoretical understanding
# - Open challenges

# Heavy use of arXiv assistant for academic coverage
```

## Best Practices

### Query Construction

- Keep queries SHORT (2-5 keywords)
- Focus on technical terms and concepts
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

## Timeline Estimates

| Phase                        | Duration             |
| ---------------------------- | -------------------- |
| Planning                     | 30-60 minutes        |
| Exploration                  | 1-3 hours            |
| Analysis                     | 1-2 hours            |
| Synthesis                    | 1-2 hours            |
| Refinement                   | 30 minutes - 2 hours |
| **Total (single iteration)** | **4-8 hours**        |

Typical projects require 1-3 iterations for comprehensive results.

## Success Criteria

- ✅ All sub-questions answered comprehensively
- ✅ Multiple high-quality sources per sub-question
- ✅ Clear patterns and insights identified
- ✅ Knowledge gaps explicitly documented
- ✅ Actionable recommendations provided
- ✅ All claims properly cited
- ✅ Report is coherent and well-structured
- ✅ User/stakeholder satisfied with depth and relevance

## Key Differentiators from Traditional Search

| Traditional Search   | Deep Research Workflow                 |
| -------------------- | -------------------------------------- |
| One-shot retrieval   | Iterative and adaptive                 |
| Single search engine | Multi-agent parallel processing        |
| List of links        | Deep synthesis and integration         |
| Manual evaluation    | Automated ranking and filtering        |
| No follow-up         | Quality-driven feedback loops          |
| Lost context         | Context preservation across iterations |

## Workflow Patterns

**Orchestrator-Worker Pattern:**

- Research Lead orchestrates overall process
- Specialized workers (web, arxiv, KB) execute searches
- Central coordination maintains context

**Parallel Processing:**

- Multiple agents work simultaneously in Phase 2
- Significant time savings over sequential search

**Iterative Refinement:**

- System can revisit earlier phases based on findings
- Quality gates ensure thoroughness before progression

## Output Files

After completion, the following files will be created:

```
deep-research-[topic]-[date]/
├── deep-research-report.md          # Full comprehensive report
├── executive-summary.md             # 1-page summary
├── bibliography.md                  # Complete source list with ratings
├── methodology.md                   # Research process documentation
├── pattern-analysis.md              # Cross-cutting themes and insights
├── knowledge-gaps.md                # Identified gaps and future directions
└── process-log.md                   # Lessons learned and improvement notes
```

## Integration with Other Workflows

This deep research workflow integrates naturally with:

- **Phase 1 Planning** - Use deep research before creating research proposal
- **Literature Review** - Comprehensive literature coverage for papers
- **Experiment Design** - Thorough background research before experiments
- **Grant Writing** - Evidence-based gap identification and positioning

## Notes

This workflow implements the five-phase agentic deep research methodology
based on systems like DeepResearcher, Anthropic's multi-agent research system,
and other state-of-the-art autonomous research approaches.

The key innovation is the combination of:

1. Multi-agent parallel processing (three specialists)
2. Iterative exploration and refinement
3. Deep synthesis beyond simple aggregation
4. Quality-driven progression with feedback loops
5. Context preservation across phases

This goes far beyond traditional literature search to provide true
autonomous research capability.
