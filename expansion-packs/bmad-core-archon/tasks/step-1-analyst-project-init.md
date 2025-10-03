<!-- Powered by BMAD™ Core with Archon -->

# step-1-analyst-project-init

**Workflow**: Greenfield Planning - Step 1/4
**Agent**: `@analyst`
**Duration**: 1-2 hours
**Next Step**: [step-2-pm-requirements.md](step-2-pm-requirements.md)

---

## Objective

Research the domain, gather requirements, and initialize the project in Archon MCP.

---

## Prerequisites

- ✅ Archon MCP available: `mcp__archon__health_check()`
- ✅ Project concept/idea defined
- ✅ Stakeholders identified

---

## Activities

### 1. Conduct Stakeholder Interviews

**Questions to ask the user:**

```
🎤 Discovery Interview:

1. What problem are you solving?
2. Who are the target users?
3. What are the must-have features (P0)?
4. What are nice-to-have features (P1, P2)?
5. Are there any existing solutions? What do they do well/poorly?
6. What are your success metrics?
7. What are the technical constraints? (tech stack preferences, performance requirements, etc.)
8. What is the timeline/deadline?
```

**Document responses** for PM to use later.

---

### 2. Research Domain & Existing Solutions

**Use RAG to find relevant documentation:**

```python
# Search knowledge base for domain info
results = mcp__archon__rag_search_knowledge_base(
    query="your domain keywords",
    match_count=5
)

# Search for code examples if relevant
code_examples = mcp__archon__rag_search_code_examples(
    query="relevant tech stack",
    match_count=3
)
```

**Research competitor solutions:**

- List 3-5 existing products in this space
- Note their strengths and weaknesses
- Identify gaps/opportunities

---

### 3. Create Archon Project

```python
# Create the project in Archon
project = mcp__archon__manage_project(
    action="create",
    title="YourProjectName",
    description="Brief 1-2 sentence project description",
    github_repo="https://github.com/user/repo"  # Optional
)

# Store project_id for subsequent steps
project_id = project["project"]["id"]
```

**CRITICAL**: Save the `project_id` - all other agents will need it!

---

### 4. Document Findings in Archon

**Create Research Findings Document:**

```python
research_doc = mcp__archon__manage_document(
    action="create",
    project_id=project_id,
    title="Research Findings",
    document_type="note",
    author="Analyst",
    content={
        "problem_statement": "What problem we're solving...",
        "target_users": ["User persona 1", "User persona 2"],
        "stakeholder_requirements": [
            "Must support 1000+ concurrent users",
            "Must be mobile-friendly",
            "Must integrate with existing auth system"
        ],
        "competitive_analysis": {
            "competitor_1": {
                "name": "ProductX",
                "strengths": ["Fast", "Good UX"],
                "weaknesses": ["Expensive", "Limited features"]
            }
        },
        "technical_constraints": [
            "Must use React (team expertise)",
            "Must deploy on AWS (company policy)"
        ],
        "success_metrics": [
            "100 active users in month 1",
            "< 2s page load time",
            "90% positive feedback score"
        ],
        "rag_findings": "Summary of relevant docs found..."
    }
)
```

---

## Deliverables ✅

At the end of this step, you should have:

- ✅ **Archon Project Created**: `project_id` available
- ✅ **Research Findings Document**: Stored in Archon
- ✅ **Stakeholder Requirements**: Captured and documented
- ✅ **Competitive Analysis**: 3-5 competitors analyzed
- ✅ **Technical Constraints**: Documented

---

## Verification

```python
# Verify project exists
projects = mcp__archon__find_projects(query="YourProjectName")
assert len(projects) > 0, "Project not found!"

# Verify research doc exists
docs = mcp__archon__find_documents(
    project_id=project_id,
    document_type="note"
)
assert len(docs) > 0, "Research findings not documented!"

print(f"""
✅ Step 1 Complete!

Project ID: {project_id}
Research Findings: {len(docs)} document(s)

Next: Hand off to PM for requirements engineering
""")
```

---

## Handoff to PM

**Tell the user:**

```
✅ Analysis complete! I've created the Archon project and documented all findings.

📋 Project ID: {project_id}

📄 Documents created:
- Research Findings (stakeholder requirements, competitive analysis)

👉 Next step: Switch to @pm to create the PRD and define user stories.

The PM will use my research to create:
- Product Requirements Document (PRD)
- Epics (3-7 high-level features)
- User stories (20-50 detailed tasks)
```

---

## Troubleshooting

### Archon MCP not available

```bash
# Check health
mcp__archon__health_check()

# If fails, user needs to start Archon server
```

### Can't create project

- Check if project with same name already exists
- Use unique project name
- Verify Archon MCP connection

### Stakeholders unclear about requirements

- Ask more specific questions
- Use brainstorming: `facilitate-brainstorming-session.md`
- Show competitor examples to elicit preferences

---

## Related Tasks

- **Brainstorming**: [facilitate-brainstorming-session.md](facilitate-brainstorming-session.md)
- **Advanced elicitation**: [advanced-elicitation.md](advanced-elicitation.md)
- **Next step**: [step-2-pm-requirements.md](step-2-pm-requirements.md)
- **Full workflow**: [execute-greenfield-planning.md](execute-greenfield-planning.md)
