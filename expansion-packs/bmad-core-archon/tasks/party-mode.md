# Party Mode: Multi-Agent Collaboration

## Purpose

Coordinate multiple BMAD agents simultaneously for complex decisions, design reviews, brainstorming, or problem-solving that benefits from multiple perspectives.

## Prerequisites

- Archon project initialized (project_id available)
- Decision or topic that requires multiple agent perspectives
- **Optional but Recommended:** BMAD subagents configured (see setup-bmad-subagents.sh)

## Task Steps

### 1. Determine Party Participants

```
Ask user: "What agents do you need for this session?"

Present options:
1. Design Review Panel (PM + Architect + Dev + QA)
2. Planning Session (Analyst + PM + PO)
3. Sprint Planning (PM + PO + Dev + QA + SM)
4. Brainstorming (Analyst + PM + Architect)
5. Debugging (Dev + QA)
6. Custom (user selects)

Store as: party_type, participant_agents
```

### 2. Define the Topic/Goal

```
Ask user: "What is the topic or goal for this party mode session?"

Examples:
- "Review authentication system architecture"
- "Plan MVP features for Q4"
- "Debug intermittent login failure"
- "Brainstorm social login integration"

Store as: session_topic
```

### 3. Load Shared Context from Archon

```
Execute: mcp__archon__find_projects(query="...")
Get current project_id

Execute: mcp__archon__find_documents(project_id=project_id)
List relevant documents for the session

Execute: mcp__archon__find_tasks(project_id=project_id)
List relevant tasks for the session

Display: "Loaded context for party mode:
  - Project: {project_name}
  - Documents: {doc_count}
  - Tasks: {task_count}
  - Participants: {participant_agents}"
```

### 4A: With Configured Subagents (Recommended)

```
If subagents are configured in .claude_code/agents/:

Display: "Launching party mode with subagents..."

For each agent in participant_agents:
  Execute: Task tool to launch subagent

  Example:
  Task(
    subagent_type=agent_id,
    description=f"{agent_name} perspective on {session_topic}",
    prompt=f"""
    You are {agent_name} in a multi-agent party mode session.

    Topic: {session_topic}

    Your role:
    1. Read relevant context from Archon (project {project_id})
    2. Provide your specialized perspective
    3. Flag any concerns or suggestions
    4. Collaborate with other agents

    Return your analysis and recommendations.
    """
  )

Collect responses from all subagents
Synthesize and present to user
```

### 4B: Without Subagents (Manual Simulation)

```
If subagents NOT configured:

Display: "Running party mode in simulation mode..."
Display: "💡 Tip: Configure subagents with setup-bmad-subagents.sh for parallel execution"

For each agent in participant_agents:
  Display: "=== {agent_icon} {agent_name} ({agent_role}) ==="

  Simulate agent by:
  1. Reading agent definition from .bmad-core-archon/agents/{agent_id}.md
  2. Adopting that agent's persona and principles
  3. Analyzing topic from that agent's perspective
  4. Providing response

  Display response

  Move to next agent

After all agents:
  Synthesize perspectives
  Identify consensus and disagreements
  Present action items
```

### 5. Round 1: Initial Perspectives

```
For each agent:
  Agent reads context from Archon
  Agent provides initial perspective on topic

Display format:
"=== ROUND 1: INITIAL PERSPECTIVES ===

{agent_icon} {agent_name} ({agent_role}):
{perspective}
✓ Strengths identified
⚠ Concerns flagged
→ Suggestions offered

[Repeat for each agent]
"
```

### 6. Round 2: Discussion & Debate

```
Identify areas of disagreement or questions:
- Extract concerns from each agent
- Identify conflicting recommendations
- Find questions one agent has for another

Facilitate discussion:
"=== ROUND 2: CROSS-AGENT DISCUSSION ===

Topic 1: {disagreement_topic}
- PM says: {pm_position}
- Architect says: {architect_position}
- Discussion: {simulated_back_and_forth}
- Resolution: {consensus_or_defer}

Topic 2: {question_topic}
- QA asks Dev: {question}
- Dev responds: {answer}
- Follow-up: {further_discussion}

[Continue for all discussion points]
"
```

### 7. Round 3: Consensus & Decisions

```
For each major decision point:
  Poll all agents for final position
  Identify consensus (all agree)
  Identify majority opinion (most agree)
  Identify unresolved (no consensus)

Display:
"=== ROUND 3: FINAL DECISIONS ===

CONSENSUS REACHED:
✓ Decision 1: {description}
  - All agents agree: {reasoning}
  - Action item: {what_to_do}

✓ Decision 2: {description}
  - Majority agrees: {reasoning}
  - Dissenting view: {agent_name} suggests {alternative}
  - Action item: {what_to_do}

UNRESOLVED:
⚠ Decision 3: {description}
  - No consensus reached
  - Options: {list_of_options}
  - Next step: {how_to_resolve}
"
```

### 8. Action Items & Handoffs

```
Generate action items from the session:

For each decision or task identified:
  Determine which agent should execute
  Create task in Archon if needed

Display:
"=== ACTION ITEMS ===

1. Create Coding Standards document
   Assigned to: Architect (Sarah)
   Task created: task-123 in Archon

2. Update PRD with new stories
   Assigned to: PM (John)
   Task created: task-124 in Archon

3. Add security testing plan
   Assigned to: QA (Maria)
   Task created: task-125 in Archon

4. Implement rate limiting
   Assigned to: Dev (James)
   Depends on: task-123 (Coding Standards)
"
```

### 9. Session Summary

```
Display: "
═══════════════════════════════════════
PARTY MODE SESSION COMPLETE
═══════════════════════════════════════
Topic: {session_topic}
Participants: {participant_count} agents
Duration: {estimated_time}

OUTCOMES:
✓ {consensus_count} decisions with consensus
✓ {action_item_count} action items created
⚠ {unresolved_count} items requiring follow-up

NEXT STEPS:
{list_of_next_steps}

To continue:
- Switch to {next_agent} for {next_task}
- Review action items: *list-tasks
- View session notes: Saved to doc-party-{timestamp}
═══════════════════════════════════════
"
```

### 10. Save Session Notes

```
Create document with session transcript:

Execute: mcp__archon__manage_document(
  action="create",
  project_id=project_id,
  title="Party Mode Session: {session_topic} ({date})",
  document_type="note",
  content={
    "topic": session_topic,
    "participants": participant_agents,
    "round_1_perspectives": {...},
    "round_2_discussion": {...},
    "round_3_decisions": {...},
    "action_items": [...],
    "unresolved_items": [...]
  },
  tags=["party-mode", "meeting-notes"]
)

Display: "✓ Session notes saved to Archon (doc-{id})"
```

## Output

- Multi-perspective analysis of topic
- Consensus decisions and action items
- Tasks created in Archon for follow-up
- Session notes document in Archon

## Notes

- **With Subagents:** Agents run in parallel, faster and more realistic
- **Without Subagents:** Simulated sequentially, still valuable perspectives
- **All agents share Archon context:** Ensures consistency
- **User coordinates:** You remain in control of the discussion
- **Action items trackable:** All follow-ups recorded in Archon

## Example Sessions

### Design Review

```
Agents: PM, Architect, Dev, QA
Topic: Review authentication architecture
Outcome:
  ✓ Consensus on tech stack
  ⚠ Add Redis for sessions (Architect)
  ⚠ Create security testing plan (QA)
  ✓ Proceed with monolith for MVP
```

### Sprint Planning

```
Agents: PM, PO, Dev, QA, SM
Topic: Plan Sprint 5
Outcome:
  ✓ Committed to 8 stories (32 points)
  ✓ Sprint goal: Complete user authentication
  ✓ Tasks assigned and prioritized
  ⚠ Buffer for risk items
```

### Brainstorming

```
Agents: Analyst, PM, Architect
Topic: Social login integration feature
Outcome:
  ✓ MVP: Google + GitHub only
  ✓ Epic created with 5 stories
  ✓ Research needed: OAuth 2.0 flows
  ✓ Timeline: 2 sprints
```
