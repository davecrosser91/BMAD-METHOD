# Agentic Deep Research: Methodology & Implementation

## Overview

The **Deep Research Workflow** in bmad-ai-research implements a comprehensive five-phase methodology for autonomous, iterative information gathering and analysis. This goes far beyond traditional literature search or web search to provide true agentic research capability.

## What is Agentic Deep Research?

Agentic deep research represents a sophisticated approach to autonomous information gathering and analysis that employs AI agents capable of:

- **Planning** - Understanding intent, decomposing problems, developing strategies
- **Exploring** - Conducting parallel multi-source searches with optimization
- **Analyzing** - Extracting, ranking, and identifying patterns across sources
- **Synthesizing** - Integrating findings into coherent narratives with insights
- **Iterating** - Continuously improving based on quality assessment and feedback

This methodology is inspired by state-of-the-art systems like:

- Anthropic's multi-agent research system
- DeepResearcher
- WebThinker
- Perplexity's Deep Research
- Google's Deep Research (Gemini)

## The Five Core Phases

### Phase 1: Planning

**Purpose:** Transform a research question into a structured investigation plan

**Steps:**

1. **Query Analysis & Intent Extraction**
   - Understand underlying intent and context
   - Identify information type needed (current, historical, comparative, predictive)
   - Document research objectives and scope
   - Define success criteria

2. **Problem Decomposition**
   - Break down complex question into 3-7 focused sub-questions
   - Ensure sub-questions are specific and answerable
   - Verify collective coverage of main objective
   - Prioritize sub-questions by importance

3. **Research Strategy Development**
   - Determine appropriate search depth
   - Identify relevant data sources
   - Establish quality criteria
   - Plan resource allocation

**Example:**

```
Main Question: "What are the latest developments in AI safety?"

Decomposition:
1. Recent research papers on AI safety (academic)
2. Regulatory changes and policy developments (policy)
3. Industry safety initiatives (industry)
4. Expert opinions and debates (thought leadership)
5. Technical safety approaches (implementation)

Strategy:
- ArXiv search for papers (last 12 months)
- Web search for regulations (government sites prioritized)
- Industry blog search for initiatives
- Twitter/Medium for expert opinions
- GitHub for technical implementations
```

### Phase 2: Exploration

**Purpose:** Conduct comprehensive parallel search across multiple sources

**Steps:**

1. **Query Generation & Optimization**
   - Generate 3-5 optimized search queries per sub-question
   - Vary abstraction levels (broad to specific)
   - Keep queries SHORT (2-5 keywords max)
   - Optimize for different search engines

   **CRITICAL: Query Quality**

   ```
   ✅ Good: "vector search pgvector"
   ✅ Good: "React useState hooks"
   ✅ Good: "authentication JWT"

   ❌ Bad: "how to implement vector search with pgvector in PostgreSQL"
   ❌ Bad: "React hooks useState useEffect useContext useReducer"
   ```

2. **Parallel Multi-Agent Search**
   - **Web Specialist** (D. Freuzer): Blogs, docs, GitHub, industry content
   - **ArXiv Specialist** (H. Zoppel): Academic papers, pre-prints
   - **Knowledge Base Curator** (A. Pilz): Curated project corpus

   All three work **simultaneously** for comprehensive coverage.

3. **Source Discovery & Validation**
   - Validate source credibility and authority
   - Filter low-quality sources
   - Prioritize recent content for time-sensitive queries
   - Check for comprehensive coverage

**Decision Point:**

- Coverage comprehensive → Continue to Phase 3
- Need more sources → Iterate with refined queries

### Phase 3: Analysis

**Purpose:** Extract insights and identify patterns from discovered sources

**Steps:**

1. **Content Extraction & Processing**
   - Download and extract clean content from all sources
   - Handle JavaScript-heavy websites
   - Remove navigation, ads, boilerplate
   - Split long documents into coherent passages

2. **Information Ranking & Filtering**
   - Rank passages by relevance to each sub-question
   - Apply quality scoring (credibility, recency, depth)
   - Filter redundant or contradictory information
   - Identify high-value insights

3. **Pattern Recognition & Gap Analysis**
   - Identify recurring themes and patterns
   - Detect contradictions and disagreements
   - Find consensus views and outlier opinions
   - Recognize knowledge gaps
   - Map relationships between concepts

**Outputs:**

- Ranked information by sub-question
- Pattern analysis report
- Contradictions and tensions
- Knowledge gap inventory
- Concept relationship map

### Phase 4: Synthesis

**Purpose:** Transform raw information into actionable intelligence

**Steps:**

1. **Multi-source Integration**
   - Select relevant evidence for each sub-question
   - Integrate findings from web, academic, and KB sources
   - Create coherent narrative structure
   - Establish logical flow between concepts
   - Highlight agreements and disagreements

2. **Report Generation**
   - Executive summary (1-2 paragraphs)
   - Detailed findings (organized by sub-questions)
   - Strategic insights (implications, trends, predictions)
   - Actionable recommendations
   - Methodology appendix
   - Limitations and caveats

3. **Citation & Fact-checking**
   - Verify all claims have source attribution
   - Check citation accuracy and completeness
   - Validate quoted text against original sources
   - Ensure no unsupported generalizations
   - Create complete bibliography

**Report Structure:**

```markdown
# Deep Research Report: [Topic]

## Executive Summary

[1-2 paragraph high-level summary]

## Research Objective & Methodology

[What we investigated and how]

## Detailed Findings

### Sub-question 1: [Question]

[Integrated findings from multiple sources]
[Key insights and patterns]

### Sub-question 2: [Question]

[...]

## Pattern Analysis & Key Insights

[Cross-cutting themes and insights]

## Knowledge Gaps & Future Directions

[What's missing, what needs further research]

## Strategic Recommendations

[Actionable insights and recommendations]

## Sources & Bibliography

[Complete source list with ratings]

## Methodology & Limitations

[How research was conducted, caveats]
```

### Phase 5: Iteration & Refinement

**Purpose:** Ensure quality and incorporate feedback for continuous improvement

**Steps:**

1. **Quality Assessment**
   - Completeness: All sub-questions answered?
   - Accuracy: Claims supported by sources?
   - Relevance: Findings address original question?
   - Coherence: Narrative flows logically?
   - Actionability: Insights are practical?

2. **Feedback Loop (Human-in-the-Loop)**
   - Present findings to user/stakeholder
   - Elicit feedback on completeness and relevance
   - Identify areas needing deeper investigation
   - Incorporate feedback into next iteration
   - Redirect research focus if needed

3. **Continuous Improvement**
   - Document what worked well
   - Note inefficiencies or bottlenecks
   - Update search strategies
   - Refine quality criteria
   - Log lessons learned

**Decision Point:**

- Complete → Finalize and deliver
- Deeper exploration → Return to Phase 2
- Reframe question → Return to Phase 1
- Expand synthesis → Return to Phase 4

## Key Capabilities

### Dynamic Adaptation

Unlike static retrieval systems, the workflow adapts search strategies based on intermediate findings and evolving objectives.

### Parallel Processing

Multiple agents work simultaneously on different aspects of the research question, significantly reducing time to completion.

### Context Preservation

Advanced context management ensures important information and strategic plans are maintained even when processing large volumes that exceed context windows.

### Tool Integration

Seamless integration with:

- Search APIs (WebSearch, ArXiv MCP)
- Content extractors (WebFetch, Crawl4AI concepts)
- Knowledge bases (Archon MCP)
- Analysis tools (ranking, pattern recognition)

### Iterative Reasoning

The ability to revisit and refine earlier conclusions based on new information discovered during the research process.

## Architecture Patterns

### Orchestrator-Worker Pattern

```
Research Lead (Orchestrator)
    │
    ├─→ Web Specialist (Worker)
    ├─→ ArXiv Specialist (Worker)
    └─→ Knowledge Base Curator (Worker)
```

The Research Lead acts as orchestrator managing the overall process while delegating specific tasks to specialized workers.

### Parallel Processing Pattern

```
Phase 2: Exploration
    │
    ├─→ Web Search ────┐
    ├─→ ArXiv Search ──┤ → All execute simultaneously
    └─→ KB Search ─────┘
```

Multiple agents work in parallel during exploration phase for maximum efficiency.

### Iterative Refinement Pattern

```
Phase 1 → Phase 2 → Phase 3 → Phase 4 → Phase 5
    ↑         ↑         ↑         ↑         │
    │         │         │         │         │
    └─────────┴─────────┴─────────┴─────────┘
         Feedback loops allow returning to any phase
```

Quality assessment and feedback can trigger return to any earlier phase.

## Comparison with Traditional Search

| Traditional Search   | Deep Research Workflow                 |
| -------------------- | -------------------------------------- |
| One-shot retrieval   | Iterative and adaptive                 |
| Single search engine | Multi-agent parallel processing        |
| List of links        | Deep synthesis with insights           |
| Manual evaluation    | Automated ranking and filtering        |
| No follow-up         | Quality-driven feedback loops          |
| Lost context         | Context preservation across iterations |
| Simple aggregation   | Meaningful pattern recognition         |

## Use Cases

### 1. Technology Investigation

**Example:** "Efficient attention mechanisms for transformers"

Research covers:

- Academic papers (ArXiv)
- Industry implementations (blogs, GitHub)
- Theoretical foundations
- Practical considerations
- Future directions

**Output:** Comprehensive landscape analysis with implementation guidance

### 2. Business Intelligence

**Example:** "AI regulation trends in healthcare 2024"

Research covers:

- New regulations and policies
- Pending legislation
- Industry compliance challenges
- International comparisons
- Expert predictions

**Output:** Strategic intelligence report with compliance guidance

### 3. Academic Literature Review

**Example:** "Self-supervised learning for computer vision"

Research covers:

- Foundational papers
- Recent advances
- Application domains
- Theoretical understanding
- Open challenges

**Output:** Comprehensive academic survey ready for paper integration

### 4. Competitive Analysis

**Example:** "Vector database landscape 2024"

Research covers:

- Market players and capabilities
- Technical architectures
- Performance benchmarks
- Pricing and licensing
- Trends and predictions

**Output:** Competitive intelligence with strategic recommendations

## Best Practices

### Query Construction

- Keep queries SHORT (2-5 keywords max)
- Focus on technical terms and specific concepts
- Avoid filler words ("how to", "implement", "example")
- For multi-concept searches, do multiple focused queries
- Extract key terms from user's question

### Source Evaluation

- Prioritize credible, authoritative sources
- Check publication dates for currency
- Verify author expertise and credentials
- Cross-reference claims across multiple sources
- Be skeptical of outlier claims without support

### Synthesis

- Go beyond simple aggregation
- Create meaningful connections between findings
- Acknowledge contradictions and uncertainties
- Provide actionable insights and recommendations
- Explain implications and strategic considerations

### Iteration

- Don't hesitate to loop back for deeper investigation
- Quality assessment is critical before finalization
- User feedback guides refinement direction
- Document lessons learned for future research
- Track what worked well and what didn't

## Timeline Estimates

| Phase                        | Duration             |
| ---------------------------- | -------------------- |
| Planning                     | 30-60 minutes        |
| Exploration                  | 1-3 hours            |
| Analysis                     | 1-2 hours            |
| Synthesis                    | 1-2 hours            |
| Refinement                   | 30 minutes - 2 hours |
| **Total (single iteration)** | **4-8 hours**        |

Most comprehensive research projects require **1-3 iterations** for optimal results.

## Success Criteria

A successful deep research engagement should achieve:

- ✅ All sub-questions answered comprehensively
- ✅ Multiple high-quality sources per sub-question (3-5+)
- ✅ Clear patterns and insights identified
- ✅ Knowledge gaps explicitly documented
- ✅ Actionable recommendations provided
- ✅ All claims properly cited and verified
- ✅ Report is coherent and well-structured
- ✅ User/stakeholder satisfied with depth and relevance

## Deliverables

After completion, expect the following outputs:

**Primary:**

- Deep research report (comprehensive markdown)
- Executive summary (1-page)
- Strategic insights document

**Supporting:**

- Complete bibliography with source ratings
- Gap analysis and future directions
- Methodology documentation
- Pattern analysis and concept maps
- Knowledge base additions (catalogued papers)
- Process improvement notes

## Integration with BMAD Research Workflows

The deep research workflow integrates naturally with other bmad-ai-research workflows:

**Phase 1 Planning (research-paper-full.yaml):**

```bash
# Use deep research BEFORE creating research proposal
@research-lead
*run-deep-research "your research area"
# → Comprehensive landscape analysis

# Then create proposal with informed positioning
@research-lead
*create-proposal
```

**Literature Review:**

```bash
# Use deep research for thorough literature coverage
@research-lead
*run-deep-research "self-supervised learning computer vision"
# → Academic + industry + KB coverage

# Extract findings for paper
@research-writer
*draft-related-work
```

**Experiment Design:**

```bash
# Use deep research before experiment design
@research-lead
*run-deep-research "transformer optimization techniques"
# → Understand state-of-the-art

@research-scientist
*design-experiment
# → Design informed by comprehensive research
```

## Advanced Features

### Custom Quality Criteria

Adjust quality assessment criteria based on research needs:

- Academic rigor vs. practical applicability
- Recency vs. foundational importance
- Breadth vs. depth of coverage

### Specialized Search Strategies

Different strategies for different needs:

- **Exhaustive**: Maximum coverage, longer duration
- **Focused**: Specific technical deep-dive
- **Rapid**: Quick overview with key insights
- **Comparative**: Side-by-side analysis

### Source Diversity Optimization

Ensure diverse perspective coverage:

- Academic vs. industry viewpoints
- Geographic diversity (US, Europe, Asia)
- Theoretical vs. practical perspectives
- Established vs. emerging voices

## Limitations and Considerations

**Language:** Primarily English-language sources (can be extended)

**Recency:** Most effective for topics with recent activity (last 2-3 years)

**Depth vs. Breadth:** Tradeoff between comprehensive coverage and deep analysis

**Source Availability:** Quality depends on publicly accessible information

**MCP Dependencies:** Full capability requires Archon and ArXiv MCPs (graceful fallbacks available)

**Human Judgment:** While highly autonomous, benefits from human oversight at decision points

## Conclusion

The agentic deep research workflow in bmad-ai-research provides a comprehensive, autonomous approach to information gathering and analysis that goes far beyond traditional search. By orchestrating multiple specialized agents through a structured five-phase process with iterative refinement, it delivers high-quality research intelligence that can inform strategic decisions, academic work, and technical investigations.

The workflow embodies best practices from state-of-the-art research systems while maintaining flexibility and human oversight at critical decision points.

---

## Quick Start

Ready to try deep research?

```bash
@research-lead
*run-deep-research "your research topic or question"
```

The Research Lead will guide you through the entire process!

## Further Reading

- **Workflow Definition**: [workflows/deep-research.yaml](../workflows/deep-research.yaml)
- **Task Documentation**: [tasks/run-deep-research.md](../tasks/run-deep-research.md)
- **Architecture Patterns**: [Anthropic's Blog on Multi-Agent Research](https://www.anthropic.com/engineering/built-multi-agent-research-system)
- **Research Best Practices**: [data/research-kb.md](../data/research-kb.md)
