# Agentic Deep Research: Visual Guide

## Complete Workflow Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    AGENTIC DEEP RESEARCH WORKFLOW                       │
│                     (bmad-ai-research package)                          │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│ PHASE 1: PLANNING (30-60 min)                                          │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Research Lead (Prof. Dr. Kunz)                                        │
│     │                                                                   │
│     ├─→ 1. Query Analysis & Intent Extraction                          │
│     │      • Understand underlying intent                              │
│     │      • Identify information type needed                          │
│     │      • Document objectives and scope                             │
│     │                                                                   │
│     ├─→ 2. Problem Decomposition                                       │
│     │      • Break into 3-7 focused sub-questions                      │
│     │      • Ensure specific and answerable                            │
│     │      • Verify collective coverage                                │
│     │                                                                   │
│     └─→ 3. Research Strategy Development                               │
│            • Determine search depth                                     │
│            • Identify relevant sources                                  │
│            • Establish quality criteria                                 │
│                                                                         │
│  Outputs: Intent analysis, 3-7 sub-questions, research strategy        │
└─────────────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────────────┐
│ PHASE 2: EXPLORATION (1-3 hours)                                       │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Research Lead: Query Generation (3-5 queries per sub-question)        │
│     │                                                                   │
│     │  CRITICAL: Keep queries SHORT (2-5 keywords)                     │
│     │  ✅ "vector search pgvector"                                     │
│     │  ❌ "how to implement vector search with pgvector in PostgreSQL" │
│     │                                                                   │
│     └─→ Coordinate Parallel Search ─────────────────────────┐         │
│                                                              │         │
│         ┌─────────────────┬──────────────────┬──────────────┘         │
│         ↓                 ↓                  ↓                         │
│    ┌─────────┐      ┌──────────┐      ┌──────────┐                   │
│    │D.Freuzer│      │H. Zoppel │      │ A. Pilz  │                   │
│    │  Web    │      │  ArXiv   │      │    KB    │                   │
│    │Research │      │  Papers  │      │Knowledge │                   │
│    └────┬────┘      └────┬─────┘      └────┬─────┘                   │
│         │                │                  │                         │
│    • Blogs          • Academic        • Curated                       │
│    • Docs           • Pre-prints      • Project                       │
│    • GitHub         • Peer-review     • Tagged                        │
│    • Industry       • Citations       • Corpus                        │
│         │                │                  │                         │
│         └────────────────┴──────────────────┘                         │
│                          │                                             │
│                          ↓                                             │
│         Research Lead: Source Validation                               │
│            • Validate credibility                                      │
│            • Filter low-quality                                        │
│            • Check coverage                                            │
│                                                                         │
│  Decision: Comprehensive? → YES: Continue | NO: Iterate               │
│                                                                         │
│  Outputs: Validated source lists, coverage assessment                  │
└─────────────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────────────┐
│ PHASE 3: ANALYSIS (1-2 hours)                                          │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Three Specialists: Content Extraction                                 │
│     │                                                                   │
│     ├─→ Download and extract clean content                             │
│     ├─→ Handle JavaScript-heavy sites                                  │
│     ├─→ Remove navigation/ads/boilerplate                              │
│     └─→ Split into coherent passages                                   │
│                          ↓                                              │
│  Research Lead: Information Ranking                                    │
│     │                                                                   │
│     ├─→ Rank passages by relevance                                     │
│     ├─→ Apply quality scoring                                          │
│     ├─→ Filter redundant information                                   │
│     └─→ Identify high-value insights                                   │
│                          ↓                                              │
│  Research Lead: Pattern Recognition & Gap Analysis                     │
│     │                                                                   │
│     ├─→ Identify recurring themes                                      │
│     ├─→ Detect contradictions                                          │
│     ├─→ Find consensus and outliers                                    │
│     ├─→ Recognize knowledge gaps                                       │
│     └─→ Map concept relationships                                      │
│                                                                         │
│  Outputs: Ranked info, patterns, contradictions, gaps, concept map     │
└─────────────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────────────┐
│ PHASE 4: SYNTHESIS (1-2 hours)                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Research Lead: Multi-source Integration                               │
│     │                                                                   │
│     ├─→ Select relevant evidence per sub-question                      │
│     ├─→ Integrate web + academic + KB sources                          │
│     ├─→ Create coherent narrative                                      │
│     └─→ Highlight agreements/disagreements                             │
│                          ↓                                              │
│  Research Lead: Report Generation                                      │
│     │                                                                   │
│     ├─→ Executive Summary (1-2 paragraphs)                             │
│     ├─→ Detailed Findings (by sub-question)                            │
│     ├─→ Pattern Analysis & Key Insights                                │
│     ├─→ Knowledge Gaps & Future Directions                             │
│     ├─→ Strategic Recommendations                                      │
│     └─→ Sources & Bibliography                                         │
│                          ↓                                              │
│  Research Lead: Citation & Fact-checking                               │
│     │                                                                   │
│     ├─→ Verify all claims attributed                                   │
│     ├─→ Check citation accuracy                                        │
│     ├─→ Validate quotes against sources                                │
│     └─→ Create complete bibliography                                   │
│                                                                         │
│  Outputs: Deep research report, executive summary, bibliography        │
└─────────────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────────────┐
│ PHASE 5: ITERATION & REFINEMENT (30 min - 2 hours)                    │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Research Lead: Quality Assessment                                     │
│     │                                                                   │
│     ├─→ ✅ Completeness (all questions answered?)                      │
│     ├─→ ✅ Accuracy (claims supported?)                                │
│     ├─→ ✅ Relevance (addresses original question?)                    │
│     ├─→ ✅ Coherence (logical flow?)                                   │
│     └─→ ✅ Actionability (insights practical?)                         │
│                          ↓                                              │
│  Human-in-the-Loop: Feedback                                           │
│     │                                                                   │
│     ├─→ Present findings to user                                       │
│     ├─→ Elicit feedback                                                │
│     └─→ Identify refinement needs                                      │
│                          ↓                                              │
│  Decision Point:                                                        │
│     │                                                                   │
│     ├─→ Complete → Finalization                                        │
│     ├─→ Deeper exploration → Back to Phase 2                           │
│     ├─→ Reframe question → Back to Phase 1                             │
│     └─→ Expand synthesis → Back to Phase 4                             │
│                          ↓                                              │
│  Research Lead: Continuous Improvement                                 │
│     │                                                                   │
│     ├─→ Document what worked                                           │
│     ├─→ Note inefficiencies                                            │
│     ├─→ Update strategies                                              │
│     └─→ Log lessons learned                                            │
│                                                                         │
│  Outputs: Quality report, improvement notes                            │
└─────────────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────────────┐
│ FINALIZATION                                                            │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Final Deliverables:                                                   │
│     • deep-research-report.md (comprehensive)                          │
│     • executive-summary.md (1-page)                                    │
│     • bibliography.md (complete source list)                           │
│     • methodology.md (process documentation)                           │
│     • pattern-analysis.md (insights)                                   │
│     • knowledge-gaps.md (future directions)                            │
│     • process-log.md (lessons learned)                                 │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

## Three-Specialist Parallel Search Architecture

```
┌───────────────────────────────────────────────────────────────────────┐
│                      EXPLORATION PHASE DETAIL                         │
└───────────────────────────────────────────────────────────────────────┘

                    Research Lead (Orchestrator)
                              │
                    Query Generation & Optimization
                    (3-5 queries per sub-question)
                              │
              ┌───────────────┴────────────────┐
              │   PARALLEL DISPATCH            │
              │   (All specialists work        │
              │    simultaneously)             │
              └────┬────────────┬──────────────┘
                   │            │            │
         ┌─────────┴──┐   ┌─────┴────┐   ┌──┴──────┐
         │            │   │          │   │         │
    ┌────▼─────┐ ┌───▼────┐ ┌────▼────┐ ┌─▼────────┐
    │D. Freuzer│ │H.Zoppel│ │ A. Pilz │ │          │
    │   Web    │ │ ArXiv  │ │   KB    │ │Validation│
    │Specialist│ │Specialist│ │Specialist│ │   Lead   │
    └────┬─────┘ └───┬────┘ └────┬────┘ └─▲────────┘
         │           │           │         │
         │           │           │         │
    Searches:   Searches:   Searches:     │
    • WebSearch • ArXiv MCP • Archon MCP  │
    • WebFetch  • Papers    • rag_search  │
    • GitHub    • Pre-prints• Tags        │
         │           │           │         │
         │           │           │         │
    Returns:    Returns:    Returns:      │
    • Blogs     • Papers    • Curated     │
    • Docs      • Citations • Papers      │
    • Code      • Authors   • Patterns    │
    • Industry  • Categories• Gaps        │
         │           │           │         │
         └───────────┴───────────┴─────────┘
                     │
                     ↓
            Research Lead Synthesis
            • Validate all sources
            • Filter low-quality
            • Check coverage
            • Identify gaps
```

## Iterative Refinement Pattern

```
┌───────────────────────────────────────────────────────────────────────┐
│                     ITERATIVE WORKFLOW PATTERN                        │
└───────────────────────────────────────────────────────────────────────┘

    Phase 1: Planning
         │
         ↓
    Phase 2: Exploration ←──────────────────────┐
         │                                       │
         ↓                                       │
    Phase 3: Analysis                            │
         │                                       │
         ↓                              Need deeper exploration
    Phase 4: Synthesis ←─────────────┐          │
         │                            │          │
         ↓                   Need better         │
    Phase 5: Quality         integration        │
    Assessment               │                   │
         │                   │                   │
         ↓                   │                   │
    Decision Point           │                   │
         │                   │                   │
    ┌────┴────┬──────────────┴───────────────────┴────┐
    │         │              │              │          │
    ↓         ↓              ↓              ↓          ↓
Complete  Reframe      Expand         Deeper      Custom
          Question     Synthesis      Explore     Refinement
    │         │              │              │          │
    │    Return to      Return to      Return to      │
    │    Phase 1        Phase 4        Phase 2        │
    │         │              │              │          │
    └─────────┴──────────────┴──────────────┴──────────┘
              │
              ↓
        Finalization
```

## Quality Assessment Framework

```
┌───────────────────────────────────────────────────────────────────────┐
│                    QUALITY ASSESSMENT CRITERIA                        │
└───────────────────────────────────────────────────────────────────────┘

    ┌─────────────────────────────────────────────────────────┐
    │ COMPLETENESS                                            │
    ├─────────────────────────────────────────────────────────┤
    │ ✓ All sub-questions answered?                          │
    │ ✓ Sufficient sources per question (3-5+)?              │
    │ ✓ Major perspectives covered?                          │
    └─────────────────────────────────────────────────────────┘
                          ↓
    ┌─────────────────────────────────────────────────────────┐
    │ ACCURACY                                                │
    ├─────────────────────────────────────────────────────────┤
    │ ✓ All claims have source attribution?                  │
    │ ✓ Citations accurate and complete?                     │
    │ ✓ No unsupported generalizations?                      │
    └─────────────────────────────────────────────────────────┘
                          ↓
    ┌─────────────────────────────────────────────────────────┐
    │ RELEVANCE                                               │
    ├─────────────────────────────────────────────────────────┤
    │ ✓ Findings address original question?                  │
    │ ✓ High-value insights identified?                      │
    │ ✓ No tangential information?                           │
    └─────────────────────────────────────────────────────────┘
                          ↓
    ┌─────────────────────────────────────────────────────────┐
    │ COHERENCE                                               │
    ├─────────────────────────────────────────────────────────┤
    │ ✓ Narrative flows logically?                           │
    │ ✓ Connections between concepts clear?                  │
    │ ✓ Contradictions explained?                            │
    └─────────────────────────────────────────────────────────┘
                          ↓
    ┌─────────────────────────────────────────────────────────┐
    │ ACTIONABILITY                                           │
    ├─────────────────────────────────────────────────────────┤
    │ ✓ Insights are practical?                              │
    │ ✓ Recommendations are clear?                           │
    │ ✓ Strategic implications identified?                   │
    └─────────────────────────────────────────────────────────┘
                          ↓
                 Quality Score → Decision
```

## Orchestrator-Worker Architecture

```
┌───────────────────────────────────────────────────────────────────────┐
│              ORCHESTRATOR-WORKER ARCHITECTURE                         │
└───────────────────────────────────────────────────────────────────────┘

                ┌─────────────────────────────────┐
                │   Research Lead                 │
                │   (Prof. Dr. Kunz)             │
                │                                 │
                │   ORCHESTRATOR                  │
                │   • Overall coordination        │
                │   • Strategy development        │
                │   • Decision making             │
                │   • Quality assessment          │
                │   • Context preservation        │
                └────────────┬────────────────────┘
                             │
                ┌────────────┴────────────┐
                │   Delegates to:         │
                └────────────┬────────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
        ↓                    ↓                    ↓
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│  D. Freuzer   │    │  H. Zoppel    │    │   A. Pilz     │
│  Web Research │    │  ArXiv Papers │    │   KB Curator  │
│               │    │               │    │               │
│  WORKER       │    │  WORKER       │    │  WORKER       │
│  • Web search │    │  • ArXiv MCP  │    │  • Archon MCP │
│  • GitHub     │    │  • Papers     │    │  • KB search  │
│  • Blogs      │    │  • Citations  │    │  • Tagging    │
└───────────────┘    └───────────────┘    └───────────────┘
        │                    │                    │
        └────────────────────┴────────────────────┘
                             │
                             ↓
                    Results synthesized by
                    Research Lead (Orchestrator)
```

## Timeline Visualization

```
┌───────────────────────────────────────────────────────────────────────┐
│                      TYPICAL TIMELINE                                 │
└───────────────────────────────────────────────────────────────────────┘

Hour 0    Phase 1: Planning
          ├─ Query analysis (15 min)
          ├─ Decomposition (15 min)
          └─ Strategy (30 min)

Hour 1    Phase 2: Exploration (Start)
          ├─ Query generation (30 min)
          └─ Parallel search begins
                   │
Hour 2             ├─ Web search
                   ├─ ArXiv search
Hour 3             └─ KB search
          └─ Source validation (30 min)

Hour 4    Phase 3: Analysis (Start)
          ├─ Content extraction (30 min)
          ├─ Information ranking (30 min)
Hour 5    └─ Pattern recognition (60 min)

Hour 6    Phase 4: Synthesis (Start)
          ├─ Multi-source integration (45 min)
          ├─ Report generation (60 min)
Hour 7    └─ Citation checking (30 min)

Hour 8    Phase 5: Refinement
          ├─ Quality assessment (30 min)
          ├─ Feedback (30 min)
          └─ Decision on iteration

Total: 4-8 hours for single iteration
Typical project: 1-3 iterations
```

## Use Case Examples

### Example 1: Technology Investigation

```
Topic: "Efficient attention mechanisms for transformers"

Phase 1: Planning
  Sub-questions:
  1. Recent academic papers on efficient attention
  2. Industry implementations and benchmarks
  3. Theoretical foundations and trade-offs
  4. Practical considerations and limitations
  5. Future directions and open problems

Phase 2: Exploration
  Web → FlashAttention blogs, PyTorch tutorials, HuggingFace
  ArXiv → FlashAttention papers, Linformer, Performer
  KB → Previously catalogued attention papers

Phase 3: Analysis
  Patterns: Memory-computation trade-offs
  Gaps: Production deployment guidance lacking

Phase 4: Synthesis
  Report sections:
  • Overview of efficient attention landscape
  • Comparison of approaches (memory, speed, quality)
  • Implementation guidance
  • Production considerations

Timeline: 6 hours, 1 iteration
```

### Example 2: Business Intelligence

```
Topic: "AI regulation trends in healthcare 2024"

Phase 1: Planning
  Sub-questions:
  1. New regulations passed in 2024
  2. Pending legislation and proposals
  3. Industry compliance challenges
  4. International regulatory comparison
  5. Expert predictions for 2025

Phase 2: Exploration
  Web → Government sites, policy documents, industry news
  ArXiv → AI ethics and policy papers
  KB → Previous healthcare AI regulations

Phase 3: Analysis
  Patterns: Increasing focus on transparency
  Gaps: Implementation guidance sparse

Phase 4: Synthesis
  Report sections:
  • Regulatory landscape overview
  • Compliance requirements by region
  • Strategic recommendations
  • Timeline for implementation

Timeline: 8 hours, 2 iterations (policy updates)
```

## Key Success Factors

```
┌───────────────────────────────────────────────────────────────────────┐
│                      SUCCESS FACTORS                                  │
└───────────────────────────────────────────────────────────────────────┘

    ┌─────────────────────────────┐
    │ SHORT FOCUSED QUERIES       │  ← CRITICAL!
    │ 2-5 keywords max            │
    └─────────────┬───────────────┘
                  │
    ┌─────────────▼───────────────┐
    │ PARALLEL PROCESSING         │
    │ Three specialists work      │
    │ simultaneously              │
    └─────────────┬───────────────┘
                  │
    ┌─────────────▼───────────────┐
    │ QUALITY ASSESSMENT          │
    │ Rigorous evaluation         │
    │ before finalization         │
    └─────────────┬───────────────┘
                  │
    ┌─────────────▼───────────────┐
    │ ITERATIVE REFINEMENT        │
    │ Don't hesitate to           │
    │ loop back                   │
    └─────────────┬───────────────┘
                  │
    ┌─────────────▼───────────────┐
    │ DEEP SYNTHESIS              │
    │ Go beyond aggregation       │
    │ to create insights          │
    └─────────────────────────────┘
```

---

## Quick Start

```bash
@research-lead
*run-deep-research "your research topic or question"
```

The workflow will guide you through all five phases automatically!
