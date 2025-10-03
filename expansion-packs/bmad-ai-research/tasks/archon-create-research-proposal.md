# Archon Create Research Proposal

## Purpose

Create a comprehensive research proposal document in Archon, synthesizing findings from brainstorming and literature review.

## Prerequisites

- Archon project initialized (project_id available)
- Research Project Brief exists
- Brainstorming completed (Research Questions document populated)
- Literature review completed (Literature Review document exists)

## Task Steps

### 1. Check Prerequisites

```
Execute: mcp__archon__find_documents(
  project_id=project_id,
  per_page=20
)

Check for:
- Research Project Brief (type=note)
- Research Questions (type=spec)
- Literature Review (type=note)

If missing:
  Display: "⚠️ Missing prerequisite documents:"
  List missing documents
  Ask user: "
  Options:
  1. Proceed anyway (create proposal without full context)
  2. Create missing documents first
  3. Cancel and create prerequisites

  What would you like to do? (1/2/3)"

  Handle user choice
```

### 2. Load Existing Research Context

```
Execute: mcp__archon__find_documents(
  project_id=project_id,
  document_id=brief_doc_id
)
Store: project_brief_content

Execute: mcp__archon__find_documents(
  project_id=project_id,
  document_id=questions_doc_id
)
Store: research_questions_content

Execute: mcp__archon__find_documents(
  project_id=project_id,
  query="Literature Review"
)
Store: literature_review_content

Display: "Loaded existing research context:"
Display: "✓ Research Project Brief"
Display: "✓ Research Questions ({count} questions)"
Display: "✓ Literature Review ({source_count} sources)"
```

### 3. Search Knowledge Base for Research Proposal Templates

```
Execute: mcp__archon__rag_search_knowledge_base(
  query="research proposal structure template",
  match_count=3
)

Display: "Found {count} research proposal templates in knowledge base"
Display findings to inform proposal structure
```

### 4. Search for Similar Research Projects

```
Extract key terms from research questions
Construct search query from top 3-5 key terms

Execute: mcp__archon__rag_search_knowledge_base(
  query="{key_terms}",
  match_count=5
)

Display: "Found {count} related research projects/papers"
Display: "These will inform our approach and positioning"
```

### 5. Elicit Proposal Details

```
Display: "I'll guide you through creating the research proposal."
Display: "I've loaded your brainstorming results and literature findings."
Display: ""

Ask user (structured elicitation):

1. "Research Title (clear, descriptive):"
   Store as: research_title

2. "Research Vision (1-2 sentences - what's the big picture?):"
   Store as: vision
   Default: Use from project_brief_content if available

3. "Problem Statement (what problem are we solving?):"
   Store as: problem_statement

4. "Research Questions (review and confirm):"
   Display current questions from research_questions_content
   Ask: "Are these questions still accurate? (yes/edit/add):"
   If edit/add: Update research_questions
   Store as: final_research_questions

5. "Hypotheses (specific testable predictions):"
   Ask: "For each research question, what do you hypothesize?"
   Elicit hypotheses for each question
   Store as: hypotheses

6. "Proposed Approach (high-level methodology):"
   Store as: proposed_approach

7. "Expected Contributions (what's novel?):"
   Store as: contributions

8. "Success Metrics (how will we measure success?):"
   Store as: success_metrics

9. "Out of Scope (what are we NOT doing?):"
   Store as: out_of_scope

10. "Resources Needed (compute, data, tools):"
    Store as: resources

11. "Timeline (major milestones):"
    Store as: timeline
```

### 6. Gap Analysis from Literature

```
Display: "Based on the literature review, I'll identify research gaps."

Analyze literature_review_content for:
- What's been done
- What's missing
- Opportunities for contribution

Create: gap_analysis

Display: "
Research Gaps Identified:
{gap_analysis}

Do these align with your research questions? (yes/no):"

If no: Refine research questions
```

### 7. Build Research Proposal Content

```
Build comprehensive proposal structure:

{
  "version": "1.0",
  "created_date": "{current_date}",
  "title": "{research_title}",

  "sections": {
    "abstract": {
      "vision": "{vision}",
      "problem": "{problem_statement}",
      "approach": "{proposed_approach}",
      "contributions": "{contributions}"
    },

    "introduction": {
      "motivation": "From project brief",
      "problem_statement": "{problem_statement}",
      "research_gap": "{gap_analysis}"
    },

    "research_questions": {
      "questions": [
        {question_obj} for question in final_research_questions
      ],
      "hypotheses": [
        {hypothesis_obj} for hypothesis in hypotheses
      ]
    },

    "related_work": {
      "summary": "From literature review",
      "gaps": "{gap_analysis}",
      "positioning": "How our work differs"
    },

    "proposed_approach": {
      "methodology": "{proposed_approach}",
      "experiments": "To be detailed by Research Scientist",
      "evaluation": "{success_metrics}"
    },

    "expected_contributions": {
      "contributions": [
        {contribution} for contribution in contributions
      ],
      "novelty": "What's new",
      "impact": "Expected impact"
    },

    "resources": {
      "compute": "From resources",
      "data": "From resources",
      "tools": "From resources"
    },

    "timeline": {
      "milestones": [
        {milestone} for milestone in timeline
      ]
    },

    "out_of_scope": {
      "exclusions": [
        {item} for item in out_of_scope
      ]
    },

    "references": {
      "literature_review_doc_id": "{lit_review_doc_id}",
      "project_brief_doc_id": "{brief_doc_id}",
      "research_questions_doc_id": "{questions_doc_id}"
    }
  }
}
```

### 8. Create Research Proposal Document in Archon

```
Execute: mcp__archon__manage_document(
  action="create",
  project_id=project_id,
  title="{research_title} - Research Proposal v1.0",
  document_type="spec",
  content=proposal_content,
  tags=["research-proposal", "specification", "v1.0"],
  author="Research Lead"
)

Store: proposal_doc_id
Display: "✓ Created Research Proposal: {research_title} (ID: {proposal_doc_id})"
```

### 9. Create Research Planning Tasks from Proposal

```
Ask user: "Create initial research tasks based on proposal? (yes/no)"

If yes:

  # Task 1: Experimental Design
  Execute: mcp__archon__manage_task(
    action="create",
    project_id=project_id,
    title="Design Experimental Architecture",
    description="Create detailed experimental design based on research proposal.

    Reference: Research Proposal (doc_id: {proposal_doc_id})

    Deliverables:
    - Experimental Architecture document
    - Baseline specifications
    - Evaluation protocols",
    feature="experimental-design",
    status="todo",
    task_order=95,
    assignee="Research Scientist"
  )
  Display: "✓ Created task: Design Experimental Architecture"

  # Task 2: Technical Architecture
  Execute: mcp__archon__manage_task(
    action="create",
    project_id=project_id,
    title="Design Technical Architecture",
    description="Design model architectures, data pipelines, technical stack.

    Reference: Research Proposal (doc_id: {proposal_doc_id})

    Deliverables:
    - Model Architecture document
    - Technical Stack document
    - Data Pipeline Design",
    feature="experimental-design",
    status="todo",
    task_order=90,
    assignee="Experiment Architect"
  )
  Display: "✓ Created task: Design Technical Architecture"

  # Task 3: Baseline Implementation
  Execute: mcp__archon__manage_task(
    action="create",
    project_id=project_id,
    title="Implement Baseline Methods",
    description="Implement baseline methods for comparison.

    Reference: Research Proposal (doc_id: {proposal_doc_id})

    Note: Wait for Experimental Architecture before starting",
    feature="baseline",
    status="todo",
    task_order=85,
    assignee="ML Engineer"
  )
  Display: "✓ Created task: Implement Baseline Methods"
```

### 10. Update Research Project Brief

```
Execute: mcp__archon__manage_document(
  action="update",
  project_id=project_id,
  document_id=brief_doc_id,
  content={
    ...existing_brief_content,
    "research_proposal_doc_id": proposal_doc_id,
    "status": "proposal_complete",
    "updated_date": current_date
  }
)

Display: "✓ Updated Research Project Brief with proposal reference"
```

### 11. Summary

```
Display: "
═══════════════════════════════════════════════════════════
RESEARCH PROPOSAL CREATED IN ARCHON
═══════════════════════════════════════════════════════════
Title: {research_title}
Proposal Document ID: {proposal_doc_id}
Type: spec
Version: 1.0

Content Summary:
✓ Research Questions: {question_count}
✓ Hypotheses: {hypothesis_count}
✓ Expected Contributions: {contribution_count}
✓ Timeline Milestones: {milestone_count}

Linked Documents:
→ Research Project Brief (ID: {brief_doc_id})
→ Research Questions (ID: {questions_doc_id})
→ Literature Review (ID: {lit_review_doc_id})

Tasks Created: {task_count}

═══════════════════════════════════════════════════════════
View proposal in Archon UI: http://localhost:3737

NEXT STEPS:
1. Switch to @research-scientist to design experiments
2. Use *design-experiment to create experimental architecture
3. Or use @experiment-pm to plan the development workflow

Ready for experimental design phase!
"
```

### 12. Offer Next Action

```
Ask user: "What would you like to do next?
1. Switch to Research Scientist to design experiments
2. Review proposal in Archon UI first
3. Refine proposal before moving forward
4. Exit for now

Choice (1/2/3/4):"

Handle user choice accordingly
```

## Output

- Comprehensive research proposal created in Archon (type=spec)
- Research Project Brief updated with proposal reference
- Initial research tasks created
- proposal_doc_id available for reference
- Ready for experimental design phase

## Notes

- Proposal is version 1.0 - can be updated as research evolves
- All referenced documents are linked via IDs in content
- Proposal serves as single source of truth for research direction
- Research Scientist will reference this when designing experiments
- Tags enable easy filtering: ["research-proposal", "specification", "v1.0"]
