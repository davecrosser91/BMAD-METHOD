# Planning & Research Methods in BMAD AI Research

## Overview

The BMAD AI Research expansion pack provides **multiple complementary planning and research methods** for different stages of the research lifecycle. Understanding when and how to use each method is key to effective research planning.

## The Three Core Planning Methods

### 1. Research Brainstorming (`facilitate-research-brainstorming.md`)

**Purpose**: Generate research questions, discover novel directions, and explore scientific possibilities

**When to Use**:

- ✅ Starting a new research project with no clear direction
- ✅ Have a rough idea but need to formulate specific questions
- ✅ After literature review, need to refine questions based on gaps
- ✅ Want to explore creative research possibilities

**Process**:

- Interactive facilitation with Research Lead
- Uses 40+ research-specific brainstorming techniques
- Iterative brainstorm → literature → refine loop (most powerful!)
- Generates question bank organized by maturity
- Documents novelty assessment and feasibility

**Output**:

- Well-formed, testable research questions
- Interesting questions needing refinement
- Wild questions for future exploration
- Literature review plan
- Next steps recommendations

**Key Modes**:

1. **Discovery Phase** - Broad exploration, problem identification
2. **Question Formation** - Gap analysis, hypothesis generation
3. **Iteration Phase** - Refinement after literature review

**Iterative Loop (Recommended)**:

```
Brainstorm (15-30 min)
    ↓
User does quick literature check
    ↓
Refine brainstorm (15-30 min) based on findings
    ↓
User does deeper literature check
    ↓
Final refinement (15-30 min)
    ↓
Specific, testable research questions ready for proposal
```

### 2. Deep Research Prompt (`create-deep-research-prompt.md`)

**Purpose**: Create comprehensive research prompts for deep investigation

**When to Use**:

- ✅ Need to validate product/research hypotheses
- ✅ Want to understand market opportunities deeply
- ✅ Require competitive intelligence
- ✅ Investigating technology trends and options
- ✅ Assessing risks and feasibility

**Process**:

- Select research focus type (8 options)
- Process input from brainstorming, project briefs, or start fresh
- Collaboratively develop comprehensive research prompt
- Define objectives, questions, methodology, outputs

**Output**:

- Structured research prompt template including:
  - Clear research objectives
  - Primary and secondary questions
  - Research methodology and frameworks
  - Expected deliverables and format
  - Success criteria

**Research Focus Options**:

1. Product Validation Research
2. Market Opportunity Research
3. User & Customer Research
4. Competitive Intelligence Research
5. Technology & Innovation Research
6. Industry & Ecosystem Research
7. Strategic Options Research
8. Risk & Feasibility Research
9. Custom Research Focus

**Use Cases**:

- Feed to AI research assistant for execution
- Guide human research efforts
- Hybrid AI + human research
- Create foundation for proposals or analysis

### 3. Deep Research Investigation (`deep-research-investigation.md`)

**Purpose**: Conduct comprehensive multi-agent investigation with Archon integration

**When to Use**:

- ✅ Investigating complex questions requiring multiple perspectives
- ✅ Validating hypotheses against state-of-the-art
- ✅ Discovering gaps and opportunities in research area
- ✅ Preparing foundation for research proposal or experiment design
- ✅ Need comprehensive understanding before committing to direction

**Process**:

- Define research focus (7 types + custom)
- **Parallel investigation** with 3 specialists (Web, ArXiv, KB)
- Synthesis and gap identification
- Targeted deep dives on key topics
- Integration and recommendations
- Comprehensive documentation in Archon

**Output**:

- Investigation document in Archon with all findings
- Comprehensive markdown report
- Gap analysis (theoretical, practical, research, knowledge)
- State-of-the-art summary
- Actionable recommendations and next steps
- Follow-up tasks created

**The Three-Specialist Approach**:

```
Research Lead (Orchestrator)
    ↓
Parallel Investigation:
├─ Web Specialist → Industry/practical perspective
├─ ArXiv Specialist → Academic/theoretical perspective
└─ KB Specialist → Curated/project-specific perspective
    ↓
Synthesis & Cross-Reference
    ↓
Deep Dive on Key Topics
    ↓
Integration & Action Plan
```

**Time Allocation**:

- 30% Broad survey (all specialists)
- 40% Deep dives (focused investigation)
- 20% Synthesis and analysis
- 10% Documentation and reporting

## When to Use Which Method

### Decision Tree

```
START: I have...

├─ Vague idea, need direction
│  → USE: Research Brainstorming (Discovery Mode)
│  → THEN: Deep Research Investigation (validate ideas)
│
├─ Rough direction, need specific questions
│  → USE: Research Brainstorming (Question Formation)
│  → THEN: Deep Research Investigation (gap analysis)
│
├─ Research questions + literature insights
│  → USE: Research Brainstorming (Iteration Mode)
│  → THEN: Deep Research Prompt (formalize investigation plan)
│  → THEN: Deep Research Investigation (comprehensive validation)
│
├─ Clear question, need comprehensive investigation
│  → USE: Deep Research Investigation directly
│
├─ Need structured research plan for others to execute
│  → USE: Deep Research Prompt
│  → THEN: Deep Research Investigation (execute the plan)
│
└─ Need to validate product/market hypothesis
   → USE: Deep Research Prompt (select appropriate focus)
   → THEN: Deep Research Investigation (gather evidence)
```

### Workflow Integration

**Complete Research Planning Flow**:

```
Phase 1: Ideation
├─ Research Brainstorming (Discovery)
│  └─ Output: 10-20 potential research questions
│
Phase 2: Validation (Quick)
├─ User does quick literature check
│  └─ Finds what exists, notes gaps
│
Phase 3: Refinement
├─ Research Brainstorming (Iteration)
│  └─ Output: 3-5 refined research questions
│
Phase 4: Deep Investigation
├─ Deep Research Investigation
│  ├─ 3 specialists search in parallel
│  ├─ Comprehensive gap analysis
│  └─ Output: Full landscape understanding
│
Phase 5: Formalization
├─ Create Research Proposal (Archon task)
│  └─ Synthesizes brainstorming + investigation
│
Phase 6: Experimental Design
└─ Design Experiment (Archon task)
   └─ Based on proposal and investigation findings
```

## Method Comparison Matrix

| Method                          | Time Required         | Archon Integration         | Specialist Agents             | Output Type                  | Best For                                   |
| ------------------------------- | --------------------- | -------------------------- | ----------------------------- | ---------------------------- | ------------------------------------------ |
| **Research Brainstorming**      | 1-3 hours (iterative) | Optional (can save output) | Research Lead only            | Questions, ideas, directions | Generating questions, creative exploration |
| **Deep Research Prompt**        | 30-60 min             | None (creates template)    | Research Lead only            | Research prompt template     | Planning investigation for others          |
| **Deep Research Investigation** | 30 min - 2 days       | Full integration           | Research Lead + 3 specialists | Archon doc + report + tasks  | Comprehensive investigation, validation    |

## Planning Method Features

### Research Brainstorming Features

- ✅ 40+ research-specific brainstorming techniques
- ✅ Phase-aware facilitation (discovery/formation/iteration)
- ✅ Iterative brainstorm-literature loop
- ✅ Question maturity classification
- ✅ Novelty and feasibility assessment
- ✅ Output feeds into proposals and experiments

**Brainstorming Techniques Include**:

- Gap Analysis
- What If Scenarios
- Problem Inversion
- Cross-Domain Transfer
- Assumption Challenge
- Component Recombination
- Failure Analysis
- Hypothesis Formation
- Impact-Oriented Thinking
- Five Whys
- Meta-Analysis Brainstorm
- [See full list in data/research-brainstorming-techniques.md]

### Deep Research Prompt Features

- ✅ 9 research focus types (or custom)
- ✅ Input processing (brainstorming, briefs, market research)
- ✅ Structured prompt template
- ✅ Methodology specification
- ✅ Deliverable requirements
- ✅ Ready for AI or human execution

**Prompt Template Includes**:

- Research objectives and scope
- Primary and secondary questions
- Information sources and priorities
- Analysis frameworks to apply
- Expected deliverables structure
- Success criteria
- Timeline and phasing

### Deep Research Investigation Features

- ✅ 3-specialist parallel search
- ✅ Full Archon MCP integration
- ✅ Comprehensive gap analysis
- ✅ Deep dive on key topics
- ✅ Actionable recommendations
- ✅ Automatic task creation

**Investigation Outputs**:

- Archon investigation document (type=note)
- Comprehensive markdown report
- Gap analysis across 4 dimensions
- State-of-the-art summary
- Deep dive analyses for key topics
- Immediate and follow-up action plans
- Optional follow-up tasks in Archon

## Integration with Archon

### Research Brainstorming + Archon

```bash
@research-lead
*brainstorm "efficient attention mechanisms"

# After session:
# - Brainstorming output can be saved to Archon (optional)
# - Questions feed into Research Proposal
# - Gaps identified inform investigation plan
```

### Deep Research Prompt + Archon

```bash
@research-lead
*create-deep-research-prompt

# Creates prompt template
# Use prompt to guide Deep Research Investigation
# Investigation results stored in Archon
```

### Deep Research Investigation + Archon

```bash
@research-lead
*deep-research-investigation

# Full Archon integration:
# 1. Creates investigation document in Archon
# 2. Updates document through all phases
# 3. Stores all findings structured
# 4. Generates comprehensive report
# 5. Creates follow-up tasks (optional)
# 6. Adds papers to KB (optional)
```

**Archon Document Structure**:

```yaml
Deep Research Investigation Document:
  type: note
  tags: [deep-research, investigation, { research_type }]

  content:
    investigation_date: ...
    primary_question: ...
    research_type: ...
    status: in_progress → complete

    findings:
      web_sources: [{ source_obj }]
      arxiv_papers: [{ paper_obj }]
      kb_results: [{ kb_obj }]

    synthesis:
      convergence: ...
      divergence: ...
      unique_insights: ...

    gaps:
      theoretical_gaps: [...]
      practical_gaps: [...]
      research_gaps: [...]
      knowledge_gaps: [...]

    deep_dive_findings: [{ analysis_obj }]

    summary: ...
    action_plan: ...
    completion_date: ...
```

## Example Workflows

### Example 1: Starting from Scratch

```
User: "I'm interested in transformer efficiency but have no specific direction"

Step 1: Research Brainstorming (Discovery Mode)
@research-lead
*brainstorm
# → Generates 15 potential research questions
# → Identifies 3 interesting directions

Step 2: User Quick Literature Check
# → Searches "efficient transformers 2024"
# → Notes what exists, gaps

Step 3: Research Brainstorming (Iteration Mode)
# → Refines to 5 specific questions
# → Identifies 2 main gaps

Step 4: Deep Research Investigation
*deep-research-investigation
# → 3 specialists comprehensive search
# → Gap analysis confirms 2 opportunities
# → Recommends focusing on "sparse attention patterns"

Step 5: Create Research Proposal
*create-research-proposal
# → Uses brainstorming questions
# → Uses investigation findings
# → Creates formal proposal in Archon
```

### Example 2: Validating Existing Idea

```
User: "I think sparse attention with learned patterns could be better. Is this novel?"

Step 1: Deep Research Investigation (Direct)
*deep-research-investigation
# Select: "Method Validation"
# → Web specialist: finds existing sparse attention work
# → ArXiv specialist: finds papers on learned sparsity patterns
# → KB specialist: checks project knowledge base
# → Synthesis: "Sparse attention exists, learned patterns exist,
#              but combination in your specific way has gap"
# → Recommendation: "Novel in this combination, proceed with caution"

Step 2: Research Brainstorming (Refinement)
*brainstorm
# → Sharpen hypothesis based on investigation
# → Identify exact novelty claim
# → Plan differentiation from existing work

Step 3: Create Research Proposal
*create-research-proposal
# → Incorporates investigation findings
# → Clear positioning against related work
# → Specific novelty claims
```

### Example 3: Comprehensive Investigation

```
User: "We need complete understanding of long-context transformers before committing to this direction"

Step 1: Deep Research Prompt
*create-deep-research-prompt
# Select: "Technology Deep Dive"
# → Creates comprehensive research prompt
# → Defines objectives, questions, methodology

Step 2: Deep Research Investigation (Comprehensive, 1-2 days)
*deep-research-investigation
# Time Budget: "Comprehensive"
# → Phase 1: Broad survey (all 3 specialists)
# → Phase 2: Synthesis and gap identification
# → Phase 3: Deep dive on 5 key topics:
#    - Efficient attention mechanisms
#    - Position encoding at length
#    - Memory requirements
#    - Inference optimization
#    - Benchmark results
# → Phase 4: Integration and recommendations
# → Comprehensive report generated
# → 12 follow-up tasks created in Archon

Step 3: Create Research Proposal (if direction identified)
# OR
Step 3: Strategic Decision (if not viable)
```

## Best Practices

### For Research Brainstorming

1. **Use Iterative Mode** - Brainstorm → Lit Check → Refine (repeat 2-4x)
2. **Capture Wild Ideas** - Today's moonshot = tomorrow's breakthrough
3. **Focus on Questions** - Research is about asking the right questions
4. **Assess Novelty Early** - Don't pursue well-solved problems
5. **Document Journey** - Track how ideas evolved

### For Deep Research Prompt

1. **Be Specific** - Vague prompts → vague research
2. **Define Success Criteria** - How will you know it's done well?
3. **Choose Right Focus** - 9 types for different needs
4. **Plan Output Format** - Structure guides execution
5. **Iterate the Prompt** - Refine based on feedback

### For Deep Research Investigation

1. **Launch Specialists in Parallel** - Maximize efficiency
2. **Cross-Reference Findings** - Convergence = confidence
3. **Prioritize Deep Dives** - Can't investigate everything deeply
4. **Document in Archon** - Build organizational knowledge
5. **Create Actionable Plan** - Investigation → Action

## Common Patterns

### Pattern 1: Iterative Brainstorm-Investigation Loop

```
Brainstorm → Quick Investigation → Refine Brainstorm → Deep Investigation → Proposal
```

Best for: New research projects with evolving direction

### Pattern 2: Validation-First

```
Deep Investigation → Brainstorm (if gaps found) → Proposal
```

Best for: Testing if an idea is novel before investing time

### Pattern 3: Comprehensive Planning

```
Deep Research Prompt → Deep Investigation → Brainstorm Refinement → Proposal
```

Best for: High-stakes decisions requiring thorough analysis

### Pattern 4: Rapid Exploration

```
Brainstorm → Deep Investigation (Quick) → Decision
```

Best for: Exploratory research, finding interesting directions fast

## Conclusion

The BMAD AI Research expansion pack provides **three complementary planning methods**:

1. **Research Brainstorming** - Generate questions creatively
2. **Deep Research Prompt** - Structure investigation plans
3. **Deep Research Investigation** - Execute comprehensive research with 3-specialist approach

Use them together for maximum effect:

- Brainstorming generates ideas
- Prompts structure investigation
- Investigation validates and deepens understanding
- Everything feeds into proposals and experiments
- Archon captures organizational knowledge

Choose the right method(s) based on your current phase, time available, and information needs.
