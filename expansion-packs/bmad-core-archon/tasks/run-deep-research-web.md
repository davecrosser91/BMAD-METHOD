<!-- Powered by BMAD™ Core + Archon -->

# Run Deep Research (Web-Only) Task

Execute the simplified deep research workflow using only WebSearch tool. Perfect for comprehensive research within bmad-core-archon without requiring external MCP servers.

## Purpose

Conduct systematic, comprehensive research on any topic using a structured four-phase methodology that produces well-cited, actionable insights integrated with your Archon project.

## When to Use This Task

- **Product Discovery**: Research market trends, user needs, or competitive landscape
- **Technical Investigation**: Investigate technologies, frameworks, or implementation approaches
- **Requirements Analysis**: Deep dive into problem domains before PRD creation
- **Architecture Planning**: Research architectural patterns and best practices
- **Decision Support**: Gather evidence for strategic or technical decisions

## Prerequisites

- Clear research topic or question
- WebSearch tool available
- (Optional) Active Archon project for document storage

## Process

### Step 1: Define Research Topic

**Clarify the research question:**

```
What do you want to research?

Examples:
- "Modern authentication best practices for web applications"
- "Vector database landscape and comparison 2024"
- "Real-time collaboration architectures (like Google Docs)"
- "Microservices vs monolith for mid-sized SaaS"
```

**Establish context:**

- Why is this research needed?
- What decisions will it inform?
- What is the scope (broad overview vs deep dive)?
- What are the constraints (technical, business, timeline)?

### Step 2: Phase 1 - Planning

**Decompose the research question into 3-7 focused sub-questions.**

Example for "Modern authentication best practices":

1. Current authentication standards (OAuth2, OIDC, SAML)
2. JWT token security and implementation
3. Multi-factor authentication (MFA) approaches
4. Password policies and passwordless alternatives
5. Session management techniques
6. Common vulnerabilities and mitigations

**For each sub-question, generate 2-4 SHORT search queries (2-5 keywords):**

Sub-question 1: Current standards

- "OAuth2 OIDC comparison"
- "SAML vs OAuth2 2024"
- "authentication standards guide"

Sub-question 2: JWT security

- "JWT token security"
- "JWT vulnerabilities best practices"
- "JWT implementation guide"

**CRITICAL: Keep queries concise!**

- ✅ Good: "passwordless authentication 2024"
- ❌ Bad: "how to implement passwordless authentication for web applications"

### Step 3: Phase 2 - Exploration

**Execute systematic web searches:**

For each sub-question:

1. Run WebSearch for each optimized query
2. Collect URLs and summaries from results
3. Note source credibility (official docs, expert blogs, authoritative sites)

**Track your progress:**

```
Sub-question 1: Current Standards
├─ Query 1: "OAuth2 OIDC comparison" - 8 results ✓
├─ Query 2: "SAML vs OAuth2 2024" - 6 results ✓
└─ Query 3: "authentication standards guide" - 7 results ✓

Sub-question 2: JWT Security
├─ Query 1: "JWT token security" - 9 results ✓
├─ Query 2: "JWT vulnerabilities" - 5 results ✓
└─ Query 3: "JWT implementation guide" - 6 results ✓
```

**Validate sources:**

- Prioritize official documentation (oauth.net, auth0.com, etc.)
- Check publication dates (prefer recent content for trends)
- Verify author expertise and credentials
- Remove duplicates and low-quality sources

**Decision point:**

- Coverage sufficient? → Proceed to Analysis
- Need more depth? → Generate additional queries and search

### Step 4: Phase 3 - Analysis

**Extract key points from each source:**

For each validated source:

1. Read/scan the content
2. Extract key insights and findings
3. Note source attribution (URL + title + date)
4. Organize findings by sub-question

Example:

```
Sub-question 1: Current Standards

Finding 1: OAuth 2.1 consolidates best practices
Source: oauth.net/2.1/ (2024)
- Deprecates implicit flow
- Mandates PKCE for all clients
- Removes resource owner password credentials

Finding 2: OIDC adds identity layer to OAuth2
Source: openid.net/connect/ (official spec)
- ID token with user claims
- UserInfo endpoint for profile data
- Standardized authentication flow
```

**Identify patterns and contradictions:**

- What themes recur across multiple sources?
- Where do sources agree or disagree?
- What are consensus best practices?
- What are debated or evolving areas?
- What gaps exist in available information?

**Synthesize insights per sub-question:**

Combine findings into coherent narrative for each sub-question, noting:

- Key takeaways
- Best practices
- Common pitfalls
- Trade-offs and considerations
- Areas of uncertainty or debate

### Step 5: Phase 4 - Synthesis & Reporting

**Generate comprehensive research report:**

Use this structure:

```markdown
# Deep Research Report: [Topic]

## Executive Summary

[1-2 paragraph overview of key findings and recommendations]

## Research Objective

[What question was investigated and why]

## Methodology

- Research conducted: [Date]
- Approach: Systematic web search across [N] sub-questions
- Tool: WebSearch
- Sources reviewed: [N] high-quality sources
- Sub-questions: [List]

## Detailed Findings

### [Sub-question 1]

[Synthesized findings with inline citations]

Key takeaways:

- [Insight 1]
- [Insight 2]

Sources:

- [Source 1 with URL]
- [Source 2 with URL]

### [Sub-question 2]

[Synthesized findings with inline citations]

...continue for all sub-questions...

## Pattern Analysis & Key Insights

### Recurring Themes

[What patterns emerged across sources?]

### Consensus Views

[What do most sources agree on?]

### Areas of Debate

[What is uncertain or controversial?]

### Knowledge Gaps

[What information was not found or insufficient?]

## Strategic Recommendations

Based on research findings:

1. [Actionable recommendation 1]
2. [Actionable recommendation 2]
3. [Actionable recommendation 3]

## Future Directions

[Areas for deeper investigation or ongoing monitoring]

## Complete Bibliography

1. [Source title] - [URL] (Accessed: [Date])
   Quality: High | Relevance: High

2. [Source title] - [URL] (Accessed: [Date])
   Quality: Medium | Relevance: High

... [All sources with quality ratings]

## Limitations

- Web-only research (no academic papers or proprietary sources)
- Time-bound findings (current as of [Date])
- [Other limitations specific to this research]
```

**Archon Integration (Optional but Recommended):**

If working within an Archon project, save the research report:

```
1. Use Archon MCP to create document:
   - project_id: [Current project]
   - document_type: "note"
   - title: "Deep Research: [Topic]"
   - content: [Full report]
   - tags: ["research", "[topic keywords]", "[date]"]

2. Link to related Archon artifacts:
   - PRD (if this research informs product requirements)
   - Architecture doc (if this research informs design)
   - Tasks (if this research addresses specific questions)
```

### Step 6: Quality Review & Refinement

**Review the research output:**

Checklist:

- [ ] All sub-questions answered with evidence?
- [ ] 3-5 high-quality sources per sub-question minimum?
- [ ] All claims properly cited with URLs?
- [ ] Patterns and insights clearly identified?
- [ ] Knowledge gaps explicitly noted?
- [ ] Actionable recommendations provided?
- [ ] Report flows logically and coherently?
- [ ] Executive summary captures key points?

**Decision point:**

- Complete? → Finalize deliverables
- Need more depth? → Return to Phase 2 with refined queries
- Need better synthesis? → Return to Phase 4 to improve integration

### Step 7: Finalization

**Deliver final research package:**

1. **Main report** (Markdown format)
2. **Executive summary** (1-page standalone)
3. **Bibliography** (all sources with URLs and ratings)
4. **Archon document** (if applicable)

**Next steps guidance:**

- Share with stakeholders for review
- Use findings to inform PRD, architecture, or technical decisions
- Create follow-up tasks based on recommendations
- Schedule future research to monitor evolving areas

## Example: Complete Research Flow

**Topic:** "Vector database landscape 2024"

**Phase 1: Planning**

Sub-questions:

1. Leading vector database solutions
2. Performance and scalability comparisons
3. Query capabilities and filtering
4. Integration with LLM workflows
5. Pricing and hosting options

**Phase 2: Exploration**

32 searches executed across 5 sub-questions
48 sources discovered → 22 high-quality sources validated

**Phase 3: Analysis**

Key patterns identified:

- Pinecone, Weaviate, Qdrant, Milvus as leaders
- Performance varies by use case (ANN algorithm choice)
- Hybrid search (vector + keyword) increasingly important
- Multi-tenancy critical for SaaS applications

**Phase 4: Synthesis**

14-page comprehensive report created
Executive summary: 2 paragraphs
Bibliography: 22 sources with quality ratings
Saved to Archon project as research document

**Phase 5: Quality Review**

All sub-questions answered ✓
Actionable recommendations provided ✓
Research complete → Finalized

**Total time:** 3.5 hours

## Tips for Success

### Query Construction

- Start broad, then narrow down
- Use technical terms for specific results
- Include year (2024, 2025) for recent trends
- Combine technology names for comparisons

### Source Evaluation

- Official documentation > Expert blogs > General articles
- Check author credentials (recognized experts?)
- Verify site authority (established platforms?)
- Prefer recent content for evolving topics

### Synthesis Quality

- Don't just summarize - synthesize insights
- Connect findings across sources
- Acknowledge contradictions and uncertainties
- Provide context for recommendations

### Archon Integration

- Tag research docs consistently for easy retrieval
- Link research to decisions made (traceability)
- Build organizational knowledge base over time
- Reference past research in future PRDs/architecture

## Common Use Cases

**Product Discovery**

- Market opportunity research
- Competitive landscape analysis
- User behavior and needs investigation

**Technical Decision Making**

- Technology/framework comparison
- Architecture pattern research
- Security best practices investigation

**Requirements Engineering**

- Problem domain deep dive
- Industry standards research
- Regulatory compliance investigation

**Architecture & Design**

- Design pattern research
- Scalability approaches
- Integration strategies

## Integration with BMAD Workflow

**Before PRD Creation:**
@analyst → *run-deep-research-web → @pm → *create-prd

**Before Architecture:**
@architect → *run-deep-research-web → @architect → *create-architecture

**Before Sprint Planning:**
@pm → *run-deep-research-web → @pm → *create-epic

**Ad-hoc Research:**
Any agent → \*run-deep-research-web → Save to Archon

## Important Notes

- This workflow uses **only WebSearch** - no external MCP servers needed
- Research quality depends on query optimization and source validation
- Always cite sources with URLs for traceability
- Save research to Archon for organizational knowledge building
- Iterate if initial research reveals gaps or new directions
- Time-box research (2-4 hours typical) to maintain momentum

## Workflow Reference

See: `workflows/deep-research-web.yaml` for complete workflow specification
