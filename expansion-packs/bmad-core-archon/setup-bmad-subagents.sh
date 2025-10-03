#!/bin/bash
# setup-bmad-subagents.sh
# Creates Claude Code subagent configurations for all BMAD agents

set -e

AGENTS_DIR=".claude_code/agents"
BMAD_ROOT=".bmad-core-archon"

echo "🎭 BMAD Subagent Configuration Setup"
echo "===================================="
echo ""

# Create agents directory
mkdir -p "$AGENTS_DIR"
echo "✓ Created $AGENTS_DIR directory"
echo ""

# Function to create subagent config
create_subagent() {
  local agent_id=$1
  local agent_name=$2
  local description=$3
  local icon=$4

  cat > "$AGENTS_DIR/${agent_id}.json" <<EOF
{
  "name": "${agent_id}",
  "description": "${icon} ${agent_name} - ${description}",
  "prompt": "You are ${agent_name}, ${description}.\\n\\nIMPORTANT: Read and adopt the complete persona from ${BMAD_ROOT}/agents/${agent_id}.md\\n\\nFollow the activation-instructions exactly as specified in the YAML block:\\n1. Check Archon MCP availability via mcp__archon__health_check()\\n2. Load project context from Archon\\n3. Check for prerequisite documents if needed\\n4. Show available commands\\n5. Stay in character until asked to exit\\n\\nCore Principles:\\n- Archon-First (use Archon for all task/doc management, never TodoWrite)\\n- Research-Driven (search knowledge base before implementing)\\n- Dependency Checking (alert if prerequisites missing)\\n- Clear Communication (tell user when to switch agents)",
  "tools": [
    "mcp__archon__health_check",
    "mcp__archon__find_projects",
    "mcp__archon__manage_project",
    "mcp__archon__find_tasks",
    "mcp__archon__manage_task",
    "mcp__archon__find_documents",
    "mcp__archon__manage_document",
    "mcp__archon__rag_search_knowledge_base",
    "mcp__archon__rag_search_code_examples",
    "Read",
    "Write",
    "Edit",
    "Bash",
    "Grep",
    "Glob"
  ]
}
EOF
  echo "✓ Created ${agent_id} subagent"
}

# Create all BMAD agents
echo "Creating BMAD subagent configurations..."
echo ""

create_subagent "analyst" "Emma" "Business Analyst for requirements analysis, user research, and stakeholder interviews" "📊"
create_subagent "pm" "John" "Product Manager for PRDs, epics, and user stories" "📋"
create_subagent "architect" "Sarah" "Software Architect for system design and technical documentation" "🏗️"
create_subagent "dev" "James" "Developer for task implementation with research-driven development" "💻"
create_subagent "qa" "Maria" "QA Engineer for code review and testing" "🧪"
create_subagent "po" "Alex" "Product Owner for backlog management and prioritization" "🎯"
create_subagent "sm" "Bob" "Scrum Master for sprint planning and story creation" "🏃"
create_subagent "sm-orchestrator" "Bob (Team Orchestrator)" "Scrum Master for parallel team orchestration with dependency management" "🎯"
create_subagent "ux-expert" "Sally" "UX Expert for UI/UX design and frontend specs" "🎨"

echo ""
echo "===================================="
echo "✅ BMAD subagents configured!"
echo ""
echo "📁 Location: $AGENTS_DIR"
echo "🔧 Agents created: 9"
echo ""
echo "Next steps:"
echo "1. Restart Claude Code to load the new subagents"
echo "2. Verify with: /agents command"
echo "3. Use with: Launch the pm subagent"
echo "4. Or invoke automatically by describing your task"
echo ""
echo "📖 Documentation:"
echo "- MULTI-AGENT-WORKFLOWS.md - How to use subagents and party mode"
echo "- AGENT-ACTIVATION-GUIDE.md - Single-agent workflows"
echo ""
