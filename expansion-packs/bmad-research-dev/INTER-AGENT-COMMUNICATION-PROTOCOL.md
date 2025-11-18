# Inter-Agent Communication Protocol

## BMAD Research-Dev Pack - Agent Coordination Rules

This document defines how agents coordinate and delegate work to each other, with emphasis on **COMPLETE DATA TRANSFER** to prevent information loss.

---

## Core Principle: Complete Information Transfer

**CRITICAL RULE:** When delegating work to another agent (especially specialists), always provide **COMPLETE** information, never summaries or abbreviated versions.

**Why this matters:**

- Specialists cannot access your context
- Summaries lose critical details
- GitHub issues need full information, not shortened versions
- Research citations and links must be preserved exactly

---

## Agent Roster & Responsibilities

### Research Specialists (Code-Execution Architecture)

#### 1. Web Research Specialist (@web-research-specialist)

- **Name:** D. Freuzer
- **Icon:** 🌐
- **Specialty:** Web content, blogs, documentation, tutorials, industry perspectives
- **Tools:** WebSearch, WebFetch (built-in)
- **When to use:** Need recent tutorials, practical guides, GitHub repos, blog posts
- **Output:** Markdown summaries with links

#### 2. ArXiv Research Specialist (@arxiv-research-specialist)

- **Name:** H. Zoppel
- **Icon:** 📄
- **Specialty:** Academic papers, theoretical foundations, peer-reviewed research
- **Tools:** ArXiv API via code execution (download + read papers)
- **When to use:** Need academic backing, novel methods, baselines, peer-reviewed research
- **Output:** Paper summaries with methodology extraction, reproducibility assessment

#### 3. Zotero Library Specialist (@zotero-research-specialist)

- **Name:** Dr. Z. Reference
- **Icon:** 📚
- **Specialty:** Personal library, annotations, citations, previously curated papers
- **Tools:** Zotero API via code execution (requires API credentials)
- **When to use:** Check existing research, leverage past work, access annotations
- **Output:** Library search results with annotations and notes

#### 4. GitHub Workflow Specialist (@github-research-specialist)

- **Name:** G. Hubman
- **Icon:** 🐙
- **Specialty:** GitHub issue management, project tracking, workflow automation
- **Tools:** GitHub CLI via code execution
- **When to use:** Create issues, track experiments, manage projects, link papers to issues
- **Output:** GitHub operations (creates/updates issues, projects, milestones)

### SDLC Team (Traditional Agents)

- **PM (@pm):** Product management, epics, milestones, research-to-product conversion
- **Dev (@dev):** Implementation (production features + research experiments)
- **QA (@qa):** Code review + experiment validation
- **SM (@sm):** Story creation, sprint planning
- **PO (@po):** Product ownership, backlog prioritization
- **Architect (@architect):** System design, technical architecture

### Research Team

- **Research Lead (@research-lead):** Orchestrates all research activities, coordinates specialists
- **Enhanced Analyst (@enhanced-analyst):** Business analysis + research capabilities
- **Data Analyst (@data-analyst):** Statistical analysis, visualization
- **Paper Writer (@paper-writer):** Academic paper writing
- **Doc Writer (@doc-writer):** Documentation creation

---

## Delegation Patterns

### Pattern 1: Literature Search (Parallel Coordination)

**Who delegates:** Research Lead, Enhanced Analyst

**Correct delegation:**

```markdown
I need comprehensive research on efficient transformer architectures.

@web-research-specialist D. Freuzer, please search for:

- Recent blog posts and tutorials on efficient transformers (last 2 years)
- GitHub repositories with implementations
- Documentation on optimization techniques

@arxiv-research-specialist H. Zoppel, please find:

- Academic papers on efficient attention mechanisms (2023-2025)
- Papers with reproducible code
- Methodology sections for comparison

@zotero-research-specialist Dr. Z. Reference, please check:

- Do we have papers on efficient transformers in our library?
- Any annotations on Flash Attention or Sparse Attention?
- Export citations if relevant papers found
```

**Why this works:**

- Clear, specific instructions to each specialist
- Parallel execution (all three work simultaneously)
- Each specialist knows exactly what to search for

---

### Pattern 2: GitHub Issue Creation (COMPLETE Data Transfer)

**Who delegates:** PM, Dev, QA, SM, Research Lead, Enhanced Analyst

**❌ WRONG - Abbreviated Version:**

```markdown
@github-research-specialist create an issue for the Flash Attention experiment.
Title: Experiment with Flash Attention
Body: Test the Flash Attention v2 method and compare with baseline.
```

**✅ CORRECT - Complete Version:**

```markdown
@github-research-specialist G. Hubman, please create an experiment issue with the following COMPLETE information:

**Title:**
Experiment: Test Flash Attention v2 Performance on Long Sequences

**Body:**

## Hypothesis

Flash Attention v2 will provide 2-4x throughput improvement over standard attention with <50% memory usage on sequences of 100K+ tokens, with minimal quality degradation (<3% perplexity increase).

## Background

Flash Attention v2 (arXiv:2307.08691) claims significant performance improvements over v1. We have baseline attention implementation in src/models/attention.py. Need to validate claims before production integration.

## Methodology

1. Implement Flash Attention v2 in experiments/flash-attention-v2/
2. Use GPT-2 model as test bed (125M parameters)
3. Test on WikiText-103 dataset with sequences: 10K, 50K, 100K, 200K tokens
4. Measure:
   - Throughput (tokens/sec)
   - Memory usage (GB)
   - Quality (perplexity)
5. Compare against:
   - Baseline standard attention
   - Flash Attention v1 (if available)

## Expected Results

- Throughput: 2-4x improvement over baseline
- Memory: <50% of baseline usage
- Quality: <3% perplexity degradation

## Success Criteria

- ✅ Reproduces paper's claimed 2-4x speedup
- ✅ Memory reduction >40%
- ✅ Perplexity increase <5%
- ✅ Code is reproducible with clear README
- ✅ Results logged to results/experiments/flash-attn-v2/

## Resources

- Paper: https://arxiv.org/abs/2307.08691
- Reference implementation: https://github.com/Dao-AILab/flash-attention
- Baseline: src/models/attention.py

**Labels:**

- type:experiment
- research:experiment
- priority:p1
- status:backlog

**Milestone:**
Research Phase 2: Efficient Architectures

**Assignee:**
@dev

Ensure ALL details above are preserved in the GitHub issue. Do not abbreviate or summarize.
```

**Why complete version is critical:**

- GitHub issue becomes the source of truth
- Dev can implement without asking clarifying questions
- QA can validate against clear success criteria
- Future reference has all context
- No information loss

---

### Pattern 3: Experiment Results Documentation

**Who delegates:** Dev, QA, Research Lead

**✅ CORRECT - Complete Results:**

```markdown
@github-research-specialist G. Hubman, please add the following COMPLETE comment to issue #42:

## Experiment Results: Flash Attention v2 (exp-flash-attn-001)

### Status: ✅ SUCCESS

### Execution Details

- **Date:** 2025-01-18
- **Commit:** abc123def
- **Duration:** 4.5 hours
- **Hardware:** NVIDIA A100 40GB

### Results

#### Throughput (tokens/sec)

| Sequence Length | Baseline | Flash Attn v2 | Improvement |
| --------------- | -------- | ------------- | ----------- |
| 10K             | 2,400    | 7,200         | 3.0x        |
| 50K             | 480      | 1,680         | 3.5x        |
| 100K            | 120      | 420           | 3.5x        |
| 200K            | 30       | 105           | 3.5x        |

#### Memory Usage (GB)

| Sequence Length | Baseline | Flash Attn v2 | Reduction |
| --------------- | -------- | ------------- | --------- |
| 10K             | 8.2      | 3.4           | 58%       |
| 50K             | 28.5     | 12.1          | 58%       |
| 100K            | OOM      | 24.3          | N/A       |
| 200K            | OOM      | 48.7          | N/A       |

#### Quality (Perplexity on WikiText-103)

| Sequence Length | Baseline | Flash Attn v2 | Degradation |
| --------------- | -------- | ------------- | ----------- |
| 10K             | 18.2     | 18.4          | +1.1%       |
| 50K             | 17.8     | 18.1          | +1.7%       |
| 100K            | N/A      | 18.3          | N/A         |
| 200K            | N/A      | 18.5          | N/A         |

### Analysis

1. **Throughput:** Achieved 3.0-3.5x improvement, exceeding the 2-4x target ✅
2. **Memory:** 58% reduction, exceeding >40% target ✅
3. **Quality:** <2% perplexity increase, well within <5% target ✅
4. **Reproducibility:** All runs completed successfully, results consistent ✅

### Key Findings

- Flash Attention v2 enables 100K-200K token sequences (impossible with baseline)
- Memory reduction more significant than throughput gains
- Quality degradation minimal and acceptable
- Implementation stable across multiple runs

### Recommendations

1. ✅ **Ready for production integration**
2. Integrate into src/models/attention.py with feature flag
3. Add configuration option for sequence length threshold (>50K tokens)
4. Document memory savings in user-facing docs

### Artifacts

- Code: experiments/flash-attention-v2/
- Results: results/experiments/flash-attn-v2/
- Logs: results/experiments/flash-attn-v2/logs/
- Figures: results/experiments/flash-attn-v2/figures/

### Next Steps

1. Create production integration story
2. Update model documentation
3. Add to paper results section
4. Create follow-up experiment for sparse attention patterns

Post this COMPLETE comment to issue #42. Do not abbreviate any sections.
```

**Why complete results matter:**

- Permanent record of experiment outcomes
- Future experiments can reference exact metrics
- Paper writing has all data needed
- Reproducibility is ensured

---

## Communication Rules by Agent Type

### Research Lead → Specialists

**Rule:** Always coordinate specialists in parallel for comprehensive research

**Template:**

```markdown
Coordinating parallel research on [topic]:

@web-research-specialist: [specific search instructions]
@arxiv-research-specialist: [specific search instructions]
@zotero-research-specialist: [specific search instructions]

After all three complete, I will synthesize findings.
```

### Enhanced Analyst → Specialists

**Rule:** Delegate searches, don't do them manually

**Template:**

```markdown
For this competitive analysis, I need:

@web-research-specialist: Search for [specific competitors/products]
@arxiv-research-specialist: Find academic papers on [specific techniques]

Once results arrive, I'll synthesize business + research perspectives.
```

### PM/Dev/QA/SM → GitHub Specialist

**Rule:** Provide COMPLETE issue content, never summaries

**Key requirements:**

- Full title (not abbreviated)
- Complete body with ALL sections
- All labels, milestones, assignees
- All links and references
- Success criteria (for experiments)
- Expected results (for experiments)

**Template:**

```markdown
@github-research-specialist please [create/update] [issue/milestone]:

[COMPLETE content with ALL sections - no abbreviation]

Labels: [all labels]
Milestone: [milestone name]
Assignee: [username]

Ensure NO information is lost or abbreviated.
```

---

## Anti-Patterns (What NOT to Do)

### ❌ Anti-Pattern 1: Summarizing for GitHub Specialist

**Wrong:**

```markdown
@github-research-specialist create issue for transformer experiment
```

**Why it's wrong:** GitHub specialist has no context, will create incomplete issue

**Right:**

```markdown
@github-research-specialist create issue with following COMPLETE content:
[full title, full body with all sections, all metadata]
```

### ❌ Anti-Pattern 2: Manual Searches Instead of Delegation

**Wrong (Enhanced Analyst doing manual search):**

```markdown
I'll use WebSearch to find papers on transformers...
_calls WebSearch directly_
```

**Why it's wrong:** Misses specialist expertise, ArXiv full-text analysis, Zotero annotations

**Right:**

```markdown
@arxiv-research-specialist find academic papers on transformers
@zotero-research-specialist check our library for transformer papers
Then I'll synthesize findings.
```

### ❌ Anti-Pattern 3: Serial Instead of Parallel Searches

**Wrong:**

```markdown
@web-research-specialist search web content first.
[waits for results]
Then @arxiv-research-specialist search papers.
```

**Why it's wrong:** Wastes time, specialists can work in parallel

**Right:**

```markdown
@web-research-specialist [instructions]
@arxiv-research-specialist [instructions]
@zotero-research-specialist [instructions]
All three execute in parallel.
```

### ❌ Anti-Pattern 4: Incomplete Experiment Results

**Wrong:**

```markdown
@github-research-specialist update issue #42:
Experiment passed. Throughput improved 3x. Ready for production.
```

**Why it's wrong:** Lost metrics, no reproducibility data, incomplete record

**Right:**

```markdown
@github-research-specialist update issue #42 with COMPLETE results:
[full metrics table, analysis, artifacts, next steps - see Pattern 3 above]
```

---

## Verification Checklist

Before delegating to GitHub specialist, verify:

- [ ] Full issue title (not abbreviated)
- [ ] Complete body with ALL sections
- [ ] All labels specified
- [ ] Milestone specified (if applicable)
- [ ] Assignee specified (if applicable)
- [ ] All links and references included
- [ ] Success criteria included (for experiments)
- [ ] Expected results included (for experiments)
- [ ] Methodology included (for experiments)
- [ ] No summaries or abbreviations

Before delegating to research specialists, verify:

- [ ] Clear, specific search instructions
- [ ] Topic/keywords specified
- [ ] Time range specified (if relevant)
- [ ] Deliverable format specified
- [ ] Parallel vs serial execution clarified

---

## Examples of Excellent Delegation

### Example 1: Research Lead Coordinating Literature Review

```markdown
Comprehensive literature review on efficient transformer architectures:

@web-research-specialist D. Freuzer:
Search for recent (2023-2025) blog posts, tutorials, and GitHub repos on:

- Flash Attention implementations
- Sparse attention patterns
- Linear attention mechanisms
- Memory-efficient transformer architectures
  Focus on practical guides and code implementations.

@arxiv-research-specialist H. Zoppel:
Find academic papers published 2023-2025 on:

- Efficient attention mechanisms (keywords: "efficient attention", "linear attention", "sparse attention")
- Flash Attention v1 and v2 papers
- Memory-efficient transformers
  Download papers and extract:
- Methodology sections
- Reproducibility information (code availability)
- Baseline comparisons

@zotero-research-specialist Dr. Z. Reference:
Check our personal library for:

- Papers tagged "transformers" or "attention"
- Any annotations on efficient attention mechanisms
- Papers with your notes on implementation challenges
  Export BibTeX for relevant papers.

All three specialists work in parallel. Once complete, I'll synthesize findings into comprehensive literature review document.
```

### Example 2: PM Creating Research Milestone

```markdown
@github-research-specialist G. Hubman, create research milestone with COMPLETE information:

**Title:**
Research Phase 2: Efficient Transformer Architectures

**Description:**

## Objective

Identify, implement, and validate efficient transformer architectures that achieve 2x+ inference speedup with <5% quality degradation on long sequences (100K+ tokens).

## Timeline

- Start: 2025-01-20
- End: 2025-03-15 (8 weeks)

## Deliverables

1. Literature review document (docs/research/literature-reviews/efficient-transformers.md)
2. Baseline implementations (experiments/baselines/)
3. 3-5 novel method implementations (experiments/efficient-methods/)
4. Comprehensive comparison results (results/experiments/comparison/)
5. Production-ready integration plan
6. Paper draft (research-paper/sections/03-efficient-architectures.tex)

## Success Criteria

- ✅ At least 2 methods achieve 2x+ speedup
- ✅ Quality degradation <5%
- ✅ Reproducible implementations with clear README
- ✅ Results validated by QA
- ✅ Production integration path identified

## Budget

- Compute: 200 GPU hours (A100)
- Timeline: 8 weeks
- Team: Dev, QA, Data Analyst, Research Lead

## Related Issues

- #123: Literature Review on Efficient Attention
- #124: Experiment: Flash Attention v2
- #125: Experiment: Sparse Attention Patterns
- #126: Experiment: Linear Attention Mechanisms
- #127: Comparative Analysis of All Methods

## References

- Research proposal: docs/research/proposals/efficient-transformers.md
- Related papers: See Zotero collection "Efficient Transformers"

**Due Date:** 2025-03-15

**Labels:**

- research:epic
- status:backlog

Create this milestone with ALL information above. Do not abbreviate.
```

---

## Summary

**Golden Rules:**

1. **Always delegate to specialists** when their expertise applies
2. **Always provide COMPLETE information** when delegating
3. **Execute specialists in parallel** when possible
4. **Never summarize or abbreviate** for GitHub operations
5. **Verify completeness** before delegating

**Result:**

- No information loss
- Better specialist outputs
- Complete GitHub records
- Reproducible research
- Efficient parallel execution
