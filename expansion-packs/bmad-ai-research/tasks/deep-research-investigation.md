# Deep Research Investigation Task

## Purpose

Conduct comprehensive, multi-layered research investigation using coordinated subagents (Web, ArXiv, Knowledge Base specialists) with Archon MCP integration for structured documentation and knowledge accumulation.

## When to Use This Task

- Investigating complex research questions requiring multiple perspectives
- Validating research hypotheses against state-of-the-art
- Discovering gaps and opportunities in a research area
- Preparing foundation for research proposal or experimental design
- Need comprehensive understanding before committing to direction

## Prerequisites

- Archon project initialized (project_id available)
- Research question or area identified (can be refined during process)
- Research Lead agent active
- Access to research assistant subagents (Web, ArXiv, KB)

## Overview: The Deep Research Process

**Deep Research** = Iterative multi-agent investigation with progressive refinement

```
Research Lead (Orchestrator)
    ↓
1. Define Research Focus
    ↓
2. PARALLEL INVESTIGATION (3 Specialists)
   ├─ Web Specialist → Industry/practical perspective
   ├─ ArXiv Specialist → Academic/theoretical perspective
   └─ KB Specialist → Curated/project-specific perspective
    ↓
3. Synthesis & Gap Identification
    ↓
4. DEEP DIVE (Targeted, refined searches)
    ↓
5. Integration & Documentation
    ↓
6. Action Plan
```

## Task Steps

### Phase 1: Research Focus Definition (15-20 min)

#### 1.1 Determine Research Type

Ask user to select research focus (numbered):

1. **Technology Deep Dive**
   - Understand specific technology/method in depth
   - Compare approaches and trade-offs
   - Identify state-of-the-art and limitations

2. **Gap & Opportunity Discovery**
   - Find what's missing in current research
   - Identify underexplored areas
   - Discover novel research directions

3. **Method Validation**
   - Validate that a proposed approach is novel
   - Check if someone already solved the problem
   - Find similar work to build upon or differentiate from

4. **Literature Foundation**
   - Build comprehensive understanding of area
   - Map the landscape of existing work
   - Prepare for research proposal

5. **Competitive Analysis**
   - Understand competing approaches
   - Benchmark against state-of-the-art
   - Identify advantages and gaps

6. **Problem Exploration**
   - Deep dive into a specific problem
   - Understand why it's hard
   - Survey attempted solutions

7. **Cross-Domain Investigation**
   - How other fields solve similar problems
   - Transfer learning opportunities
   - Interdisciplinary connections

8. **Custom Research Focus**
   - User-defined investigation
   - Specific research questions

#### 1.2 Elicit Research Questions

```
Ask user:
1. "What is your primary research question or topic?"
   Store as: primary_question

2. "What sparked this investigation?" (context)
   Store as: motivation

3. "What do you already know about this?" (baseline)
   Store as: current_knowledge

4. "What specific aspects are most important?"
   - Theoretical foundations?
   - Practical implementations?
   - Performance comparisons?
   - Novel methods?
   - Applications?
   Store as: focus_aspects (can select multiple)

5. "What will you do with this research?" (helps prioritize)
   - Write research proposal
   - Design experiments
   - Implement system
   - Write related work section
   - Make strategic decision
   Store as: intended_use

6. "Time available for this investigation?"
   - Quick scan (30-60 min)
   - Moderate depth (2-4 hours)
   - Comprehensive (1-2 days)
   - Exhaustive (ongoing)
   Store as: time_budget
```

#### 1.3 Create Research Investigation Plan

Build investigation plan:

```yaml
investigation:
  primary_question: '{primary_question}'
  research_type: '{selected_type}'
  motivation: '{motivation}'
  baseline_knowledge: '{current_knowledge}'
  focus_aspects: [aspects]
  intended_use: '{intended_use}'
  time_budget: '{time_budget}'

  phases:
    - phase: 'Broad Survey'
      duration: '30% of time'
      goal: 'Understand landscape'

    - phase: 'Deep Dive'
      duration: '40% of time'
      goal: 'Investigate specifics'

    - phase: 'Synthesis'
      duration: '20% of time'
      goal: 'Integrate findings'

    - phase: 'Documentation'
      duration: '10% of time'
      goal: 'Structure and store'
```

Display plan to user, ask for confirmation/adjustments.

#### 1.4 Initialize Archon Investigation Document

```
Execute: mcp__archon__manage_document(
  action="create",
  project_id=project_id,
  title="Deep Research: {primary_question}",
  document_type="note",
  content={
    "investigation_date": "{current_date}",
    "primary_question": "{primary_question}",
    "research_type": "{research_type}",
    "status": "in_progress",
    "findings": [],
    "phase": "initialization"
  },
  tags=["deep-research", "investigation", research_type_slug],
  author="Research Lead"
)

Store: investigation_doc_id
Display: "✓ Created Investigation document (ID: {investigation_doc_id})"
```

### Phase 2: Parallel Investigation - Three Specialists (30-40% of time)

**KEY PRINCIPLE**: All three specialists search in parallel for comprehensive coverage.

#### 2.1 Prepare Search Strategy

Based on primary_question and focus_aspects, generate:

1. **Core search keywords** (2-5 main terms)
2. **Web-focused queries** (practical, implementation, industry)
3. **Academic queries** (theoretical, formal, research)
4. **KB-focused queries** (project-relevant, curated)

Example:

```
Primary Question: "How do current methods handle long-context in transformers?"

Core keywords: "long context transformers"

Web queries:
- "long context transformers 2024 implementations"
- "efficient attention mechanisms production"
- "transformer sequence length scaling"

Academic queries:
- "long context transformers"
- "attention complexity reduction"
- "sparse attention patterns"

KB queries:
- "attention mechanisms" (with project tag)
- "transformer architectures"
- "long sequences"
```

Display search strategy to user for confirmation.

#### 2.2 Launch Web Specialist (Subagent)

**Coordination via Research Lead:**

```
@research-assistant-web

I'm conducting a deep research investigation:
- Primary Question: {primary_question}
- Focus: {focus_aspects}
- Time Budget: {web_time_allocation}

Please search for:
1. {web_query_1}
2. {web_query_2}
3. {web_query_3}

Focus on:
- Recent developments (2023-2024)
- Practical implementations
- Industry perspectives
- GitHub repositories
- Blog posts and documentation

Report back findings in structured format:
- Key sources found
- Main insights
- Practical approaches
- Implementation examples
- Gaps or limitations noted
```

**Web Specialist Actions:**

- Uses WebSearch tool for each query
- Uses WebFetch for detailed content
- Documents findings in structured format
- Returns findings to Research Lead

**Research Lead captures Web findings:**

```
Store: web_findings = {
  "sources": [
    {
      "url": "...",
      "title": "...",
      "type": "blog/docs/github",
      "key_insights": "...",
      "relevance": "high/medium/low"
    }
  ],
  "summary": "...",
  "practical_insights": "...",
  "implementation_approaches": "...",
  "gaps_identified": "..."
}
```

#### 2.3 Launch ArXiv Specialist (Subagent)

**Coordination via Research Lead:**

```
@research-assistant-arxiv

I'm conducting a deep research investigation:
- Primary Question: {primary_question}
- Focus: {focus_aspects}
- Time Budget: {arxiv_time_allocation}

Please search for:
1. {academic_query_1}
2. {academic_query_2}
3. {academic_query_3}

Focus on:
- Recent papers (2023-2024)
- High-citation papers
- Key authors in the field
- Theoretical foundations
- Novel methods and approaches

Report back findings in structured format:
- Key papers found (with arXiv IDs)
- Main contributions
- Theoretical approaches
- State-of-the-art results
- Research gaps identified
```

**ArXiv Specialist Actions:**

- Uses ArXiv MCP tools (if available)
- Searches by query, author, category
- Gets paper abstracts and summaries
- Documents findings
- Returns to Research Lead

**Research Lead captures ArXiv findings:**

```
Store: arxiv_findings = {
  "papers": [
    {
      "arxiv_id": "...",
      "title": "...",
      "authors": "...",
      "year": "...",
      "key_contribution": "...",
      "relevance": "high/medium/low",
      "citations": "..."
    }
  ],
  "summary": "...",
  "theoretical_insights": "...",
  "sota_methods": "...",
  "research_gaps": "..."
}
```

#### 2.4 Launch Knowledge Base Specialist (Subagent)

**Coordination via Research Lead:**

```
@research-assistant-kb

I'm conducting a deep research investigation:
- Primary Question: {primary_question}
- Focus: {focus_aspects}
- Project Tag: {project_kb_tag}
- Time Budget: {kb_time_allocation}

Please search knowledge base for:
1. {kb_query_1}
2. {kb_query_2}
3. {kb_query_3}

Focus on:
- Papers tagged with our project
- Previously curated relevant work
- Code examples and patterns
- Project-specific insights

Report back findings in structured format:
- Relevant papers in KB
- Code examples found
- Patterns and best practices
- How this connects to our project
- What's missing from KB
```

**KB Specialist Actions:**

- Uses Archon RAG tools
- Searches knowledge base with project tag
- Searches code examples
- Identifies gaps in KB
- Returns to Research Lead

**Research Lead captures KB findings:**

```
Store: kb_findings = {
  "papers": [
    {
      "title": "...",
      "source_id": "...",
      "key_insights": "...",
      "relevance_to_project": "...",
      "tags": [...]
    }
  ],
  "code_examples": [
    {
      "pattern": "...",
      "description": "...",
      "applicability": "..."
    }
  ],
  "summary": "...",
  "project_connections": "...",
  "kb_gaps": "..."
}
```

#### 2.5 Synchronization Point

Wait for all three specialists to complete initial search.

Display progress:

```
Deep Research Investigation Progress:
✓ Web Specialist: {web_source_count} sources found
✓ ArXiv Specialist: {paper_count} papers found
✓ KB Specialist: {kb_item_count} items found

Total investigation time so far: {elapsed_time}
```

### Phase 3: Synthesis & Gap Identification (20% of time)

#### 3.1 Cross-Reference Findings

**Research Lead synthesizes:**

Compare findings across all three sources:

1. **Convergence Analysis**
   - What do all three sources agree on?
   - Common themes and approaches
   - Consensus on state-of-the-art

2. **Divergence Analysis**
   - What does academia say vs industry?
   - Theory vs practice gaps
   - What's in KB vs what's missing

3. **Unique Insights**
   - What did each specialist find uniquely?
   - Web: Practical implementations
   - ArXiv: Theoretical advances
   - KB: Project-specific patterns

#### 3.2 Gap Identification

Create structured gap analysis:

```yaml
gaps:
  theoretical_gaps:
    - "What's not well understood theoretically?"
    - 'What lacks formal analysis?'
    - 'What needs better explanations?'

  practical_gaps:
    - "What doesn't work well in practice?"
    - "What's missing for production use?"
    - 'What tools/libraries are needed?'

  research_gaps:
    - "What hasn't been tried yet?"
    - 'What combinations are unexplored?'
    - "What settings haven't been tested?"

  knowledge_gaps:
    - "What's missing from our KB?"
    - 'What should we curate for future?'
    - 'What papers should we read deeply?'
```

#### 3.3 Update Investigation Document

```
Execute: mcp__archon__manage_document(
  action="update",
  project_id=project_id,
  document_id=investigation_doc_id,
  content={
    ...existing_content,
    "phase": "synthesis",
    "findings": {
      "web_sources": web_findings,
      "arxiv_papers": arxiv_findings,
      "kb_results": kb_findings
    },
    "synthesis": {
      "convergence": convergence_analysis,
      "divergence": divergence_analysis,
      "unique_insights": unique_insights
    },
    "gaps": gap_analysis,
    "updated_date": current_date
  }
)

Display: "✓ Updated Investigation document with synthesis"
```

### Phase 4: Deep Dive - Targeted Investigation (40% of time)

Based on synthesis, identify top 3-5 areas for deeper investigation.

#### 4.1 Prioritize Deep Dive Topics

```
Present to user:

"Based on initial investigation, I've identified these areas for deeper investigation:

1. {area_1} - {why_important}
   - {gap_it_addresses}
   - {what_we_need_to_know}

2. {area_2} - {why_important}
   - {gap_it_addresses}
   - {what_we_need_to_know}

3. {area_3} - {why_important}
   - {gap_it_addresses}
   - {what_we_need_to_know}

Which areas should we investigate deeply? (select 1-3)"

Store: deep_dive_topics
```

#### 4.2 Focused Specialist Deployment

For each selected deep dive topic:

**Refined Search Strategy:**

- More specific queries
- Target specific papers/sources
- Follow citation trails
- Examine implementations closely

**Launch specialists with focused mission:**

```
# Example: Deep dive on "Sparse Attention Patterns"

@research-assistant-web
*search-github "sparse attention implementation pytorch"
*fetch {top_3_repos} and analyze implementation details

@research-assistant-arxiv
*search-author "Dao" # Key author in efficient attention
*get-paper {specific_arxiv_id} and extract methodology

@research-assistant-kb
*search "sparse attention" with project tag
*search-codes "attention sparsity patterns"
```

#### 4.3 Detailed Analysis

For each deep dive topic, create detailed analysis:

```yaml
deep_dive_analysis:
  topic: '{topic_name}'

  state_of_art:
    current_best: '...'
    performance: '...'
    limitations: '...'

  approaches:
    - approach: '...'
      how_it_works: '...'
      pros: [...]
      cons: [...]
      when_to_use: '...'

  implementations:
    - name: '...'
      source: '...'
      quality: '...'
      adaptability: '...'

  research_opportunities:
    - opportunity: '...'
      why_promising: '...'
      feasibility: '...'
      potential_impact: '...'
```

#### 4.4 Update Investigation Document

Add deep dive findings to Archon document.

### Phase 5: Integration & Recommendations (10% of time)

#### 5.1 Create Comprehensive Summary

```yaml
investigation_summary:
  primary_question: '{question}'

  key_findings:
    - finding: '...'
      source: 'web/arxiv/kb'
      confidence: 'high/medium/low'

  state_of_art:
    current_best: '...'
    performance_benchmarks: '...'
    main_approaches: [...]

  gaps_opportunities:
    immediate:
      - gap: '...'
        opportunity: '...'
        difficulty: 'easy/medium/hard'

    medium_term:
      - gap: '...'
        opportunity: '...'

    long_term:
      - gap: '...'
        opportunity: '...'

  recommendations:
    based_on_use_case: '{intended_use}'

    if_research_proposal:
      - 'Focus on: {specific_gap}'
      - 'Differentiate by: {unique_angle}'
      - 'Build on: {foundation_papers}'

    if_experimental_design:
      - 'Implement baseline: {baseline_method}'
      - 'Evaluate on: {benchmarks}'
      - 'Compare against: {sota_methods}'

    if_implementation:
      - 'Start with: {implementation}'
      - 'Adapt from: {source}'
      - 'Key considerations: {concerns}'
```

#### 5.2 Create Action Plan

```yaml
next_steps:
  immediate_actions:
    - action: 'Read papers: {paper_list}'
      priority: 'high'
      time_estimate: '4-6 hours'

    - action: 'Examine implementation: {repo_url}'
      priority: 'high'
      time_estimate: '2-3 hours'

  short_term_actions:
    - action: 'Add to KB: {papers_to_curate}'
      priority: 'medium'
      time_estimate: '1-2 hours'

    - action: 'Design preliminary experiment'
      priority: 'high'
      time_estimate: '3-4 hours'

  follow_up_research:
    - topic: '{topic}'
      when: 'After reading key papers'
      specialists_needed: 'ArXiv + KB'
```

#### 5.3 Finalize Investigation Document

```
Execute: mcp__archon__manage_document(
  action="update",
  project_id=project_id,
  document_id=investigation_doc_id,
  content={
    ...existing_content,
    "phase": "complete",
    "deep_dive_findings": deep_dive_analyses,
    "summary": investigation_summary,
    "action_plan": next_steps,
    "completion_date": current_date,
    "total_sources": {
      "web": web_source_count,
      "arxiv": paper_count,
      "kb": kb_item_count,
      "total": total_sources
    }
  }
)

Display: "✓ Finalized Investigation document"
```

#### 5.4 Update Knowledge Base (Optional)

```
Ask user: "Add discovered papers to knowledge base? (yes/no)"

If yes:
  For each significant paper not in KB:
    - Tag with project tag
    - Add to Archon knowledge base
    - Note relevance to investigation

  Display: "✓ Added {count} papers to knowledge base"
```

### Phase 6: Deliverable & Handoff (10% of time)

#### 6.1 Generate Comprehensive Report

Create structured markdown report:

```markdown
# Deep Research Investigation Report

## {primary_question}

**Date**: {date}
**Investigator**: Research Lead + 3 Specialists
**Time Invested**: {total_time}
**Sources Consulted**: {total_sources}

---

## Executive Summary

{3-5 sentence overview of findings}

**Key Insight**: {most important finding}
**Main Opportunity**: {best research direction identified}
**Recommended Next Step**: {specific action}

---

## Investigation Details

### Primary Question

{primary_question}

### Motivation

{why this investigation was conducted}

### Scope

- Time Budget: {time_budget}
- Focus Areas: {focus_aspects}
- Intended Use: {intended_use}

---

## Findings by Source

### Web Research (Industry & Practical)

**Sources Consulted**: {web_source_count}

**Key Findings**:
{web_key_findings}

**Practical Approaches Identified**:
{practical_approaches}

**Notable Implementations**:
{notable_implementations}

### Academic Research (ArXiv)

**Papers Consulted**: {paper_count}

**Key Theoretical Insights**:
{theoretical_insights}

**State-of-the-Art Methods**:
{sota_methods}

**Recent Advances** (2023-2024):
{recent_advances}

### Knowledge Base (Project Corpus)

**Items Found**: {kb_item_count}

**Relevant Prior Work**:
{relevant_prior_work}

**Code Examples & Patterns**:
{code_patterns}

**Connections to Current Project**:
{project_connections}

---

## Synthesis

### Convergent Findings

{what_all_sources_agree_on}

### Divergent Perspectives

{theory_vs_practice_gaps}

### Unique Insights by Source

- **Web**: {web_unique}
- **ArXiv**: {arxiv_unique}
- **KB**: {kb_unique}

---

## Gap Analysis

### Theoretical Gaps

{theoretical_gaps_list}

### Practical Gaps

{practical_gaps_list}

### Research Opportunities

{research_opportunities_ranked}

### Knowledge Base Gaps

{what_to_add_to_kb}

---

## Deep Dive Analyses

{for each deep_dive_topic:}

### {topic_name}

**Why This Topic**: {motivation}

**State-of-the-Art**:
{current_best_approaches}

**Detailed Approaches**:
{approach_comparisons}

**Implementations Available**:
{implementation_analysis}

**Research Opportunities**:
{specific_opportunities}

{end for}

---

## Recommendations

### For Your Use Case: {intended_use}

**Primary Recommendation**:
{top_recommendation}

**Supporting Actions**:

1. {action_1}
2. {action_2}
3. {action_3}

**Rationale**:
{why_these_recommendations}

---

## Action Plan

### Immediate (This Week)

- [ ] {immediate_action_1}
- [ ] {immediate_action_2}
- [ ] {immediate_action_3}

### Short-Term (Next 2-4 Weeks)

- [ ] {short_term_action_1}
- [ ] {short_term_action_2}

### Follow-Up Research Needed

- {follow_up_topic_1} - when: {when}
- {follow_up_topic_2} - when: {when}

---

## Sources Cited

### Web Sources ({web_source_count})

{formatted_web_sources}

### Academic Papers ({paper_count})

{formatted_arxiv_papers}

### Knowledge Base ({kb_item_count})

{formatted_kb_sources}

---

## Appendix

### Search Queries Used

**Web**: {web_queries}
**ArXiv**: {arxiv_queries}
**KB**: {kb_queries}

### Investigation Metadata

- Start Time: {start_time}
- End Time: {end_time}
- Total Duration: {duration}
- Archon Document ID: {investigation_doc_id}

---

_Generated by BMAD AI Research Deep Investigation_
_Research Lead + Web Specialist + ArXiv Specialist + KB Specialist_
```

Save report to:

```
docs/investigations/deep-research-{topic_slug}-{date}.md
```

#### 6.2 Create Follow-Up Tasks (Optional)

```
Ask user: "Create follow-up tasks based on recommendations? (yes/no)"

If yes:
  For each recommended action:
    Execute: mcp__archon__manage_task(
      action="create",
      project_id=project_id,
      title="{action_title}",
      description="{action_details}

      From investigation: {investigation_doc_id}

      Context: {relevant_context}",
      feature="follow-up-research",
      status="todo",
      task_order=70,
      assignee="User"
    )

  Display: "✓ Created {count} follow-up tasks"
```

#### 6.3 Summary Display

```
Display: "
═══════════════════════════════════════════════════════════
DEEP RESEARCH INVESTIGATION COMPLETE
═══════════════════════════════════════════════════════════
Primary Question: {primary_question}
Investigation Date: {date}
Total Time: {duration}

Sources Consulted:
✓ Web: {web_source_count} sources
✓ ArXiv: {paper_count} papers
✓ KB: {kb_item_count} items
✓ Total: {total_sources}

Key Findings:
{top_3_findings}

Main Opportunity Identified:
{main_opportunity}

Recommended Next Step:
{next_step}

═══════════════════════════════════════════════════════════
Outputs Created:
✓ Investigation Document (Archon ID: {investigation_doc_id})
✓ Comprehensive Report: docs/investigations/...
✓ Follow-up Tasks: {task_count} created

View in Archon: http://localhost:3737

NEXT STEPS:
{next_steps_summary}
"
```

## Best Practices for Deep Research

### Specialist Coordination

1. **Launch in Parallel** - All three specialists search simultaneously
2. **Targeted Queries** - Give each specialist specific, focused queries
3. **Structured Returns** - Request findings in consistent format
4. **Cross-Reference** - Compare findings across specialists
5. **Iterate** - Use initial findings to refine deep dive focus

### Time Management

- **30%** Broad survey (all specialists)
- **40%** Deep dives (focused investigation)
- **20%** Synthesis and analysis
- **10%** Documentation and reporting

### Quality Control

- **Source Credibility** - Prioritize peer-reviewed and reputable sources
- **Recency** - Prefer 2023-2024 for fast-moving fields
- **Convergence** - Multiple sources agreeing increases confidence
- **Gap Validation** - Don't assume gap exists; verify thoroughly

### Archon Integration

- **Single Investigation Document** - All findings in one Archon doc
- **Progressive Updates** - Update after each phase
- **Tag Appropriately** - Enables finding related investigations
- **Link to Outputs** - Connect investigation to proposals/experiments

## Advanced Techniques

### Citation Trail Following

When ArXiv specialist finds key paper:

- Get papers it cites (backward)
- Get papers that cite it (forward)
- Identify citation clusters (related work)

### Implementation Deep Dive

When Web specialist finds good implementation:

- Analyze code structure
- Extract design patterns
- Identify practical considerations
- Note adaptability for your use

### Cross-Domain Transfer

When investigating problem:

- Ask: "How do biologists/physicists/economists solve this?"
- Search Web specialist for interdisciplinary approaches
- Look for analogous problems in other fields

### Meta-Analysis

When many papers found:

- Identify common themes across papers
- Track evolution of ideas over time
- Find meta-patterns and trends
- Synthesize higher-level insights

## Output Integration

**Investigation feeds into:**

1. **Research Proposal**
   - Gap analysis → Problem statement
   - Opportunities → Research questions
   - State-of-art → Related work section

2. **Experimental Design**
   - SOTA methods → Baselines to implement
   - Implementations found → Starting points
   - Benchmarks → Evaluation protocols

3. **Literature Review**
   - Papers found → Citations
   - Synthesis → Structured review
   - Gaps → Positioning

4. **Knowledge Base**
   - Curated papers → Tagged for project
   - Code patterns → Reusable examples
   - Insights → Organizational knowledge

## Conclusion

Deep Research Investigation is **structured discovery** using coordinated specialists, progressive refinement, and comprehensive documentation. It transforms vague questions into actionable insights and clear research directions.

The three-specialist approach ensures:

- ✅ Comprehensive coverage (industry + academia + curated)
- ✅ Multiple perspectives (practical + theoretical + project-specific)
- ✅ Efficient parallelization (faster than sequential)
- ✅ Quality synthesis (cross-referencing validates findings)

Everything is captured in Archon for future reference and builds toward your research goals.
