#!/bin/bash
# BMAD-Core-GitHub: Initialize GitHub Project v2
# This script creates a GitHub Project and configures it for BMAD workflow

set -e

echo "🚀 BMAD GitHub Projects v2 Setup"
echo "=================================="
echo ""

# Detect project owner from git remote
REPO_URL=$(git config --get remote.origin.url 2>/dev/null || echo "")
if [[ $REPO_URL =~ github\.com[:/]([^/]+)/([^/.]+) ]]; then
  OWNER="${BASH_REMATCH[1]}"
  REPO="${BASH_REMATCH[2]%.git}"
else
  echo "❌ Error: Could not detect GitHub repository"
  echo "   Please ensure you're in a Git repository with a GitHub remote"
  echo "   Run: git remote -v"
  exit 1
fi

echo "📍 Detected repository: $OWNER/$REPO"
echo ""

# Check if gh CLI is authenticated
if ! gh auth status &>/dev/null; then
  echo "❌ Error: GitHub CLI not authenticated"
  echo "   Please run: gh auth login"
  exit 1
fi

# Check for project scope
if ! gh auth status 2>&1 | grep -q "project"; then
  echo "⚠️  Warning: GitHub CLI may not have 'project' scope"
  echo "   Adding project scope..."
  gh auth refresh -s project
fi

# Prompt for project name
read -p "📝 Project name (default: BMAD Project): " PROJECT_NAME
PROJECT_NAME=${PROJECT_NAME:-"BMAD Project"}

# Create the project
echo ""
echo "🏗️  Creating GitHub Project: $PROJECT_NAME"

# For user repos
if [[ $OWNER != *"/"* ]]; then
  PROJECT_DATA=$(gh project create \
    --owner "$OWNER" \
    --title "$PROJECT_NAME" \
    --format json 2>&1)
else
  # For org repos
  PROJECT_DATA=$(gh project create \
    --org "$OWNER" \
    --title "$PROJECT_NAME" \
    --format json 2>&1)
fi

if [ $? -ne 0 ]; then
  echo "❌ Error creating project:"
  echo "$PROJECT_DATA"
  exit 1
fi

PROJECT_NUMBER=$(echo "$PROJECT_DATA" | jq -r '.number')
PROJECT_ID=$(echo "$PROJECT_DATA" | jq -r '.id')
PROJECT_URL=$(echo "$PROJECT_DATA" | jq -r '.url')

echo "✅ Project created successfully!"
echo "   Project #: $PROJECT_NUMBER"
echo "   Project ID: $PROJECT_ID"
echo "   URL: $PROJECT_URL"
echo ""

# Get Status field information
echo "🔍 Retrieving Status field information..."
FIELD_DATA=$(gh project field-list "$PROJECT_NUMBER" --owner "$OWNER" --format json)

STATUS_FIELD_ID=$(echo "$FIELD_DATA" | jq -r '.fields[] | select(.name=="Status") | .id')

if [ -z "$STATUS_FIELD_ID" ] || [ "$STATUS_FIELD_ID" = "null" ]; then
  echo "⚠️  Status field not found, creating..."
  # Note: GitHub Projects v2 should have Status field by default
  # If not, this is where we'd create it
  echo "❌ Error: Could not find or create Status field"
  exit 1
fi

echo "✅ Status field found: $STATUS_FIELD_ID"
echo ""

# Get status option IDs
echo "📋 Retrieving status options..."

# Default GitHub status options
BACKLOG_ID=$(echo "$FIELD_DATA" | jq -r '.fields[] | select(.name=="Status") | .options[] | select(.name=="Backlog") | .id // select(.name=="Todo") | .id // empty')
TODO_ID=$(echo "$FIELD_DATA" | jq -r '.fields[] | select(.name=="Status") | .options[] | select(.name=="Todo") | .id // empty')
INPROGRESS_ID=$(echo "$FIELD_DATA" | jq -r '.fields[] | select(.name=="Status") | .options[] | select(.name=="In Progress") | .id // empty')
INREVIEW_ID=$(echo "$FIELD_DATA" | jq -r '.fields[] | select(.name=="Status") | .options[] | select(.name=="In Review") | .id // select(.name=="In review") | .id // empty')
DONE_ID=$(echo "$FIELD_DATA" | jq -r '.fields[] | select(.name=="Status") | .options[] | select(.name=="Done") | .id // empty')

# Display status options
echo "Status options available:"
echo "$FIELD_DATA" | jq -r '.fields[] | select(.name=="Status") | .options[] | "  - \(.name) (ID: \(.id))"'
echo ""

# Update core-config.yaml if it exists
CONFIG_FILE=".bmad-core/core-config.yaml"

if [ -f "$CONFIG_FILE" ]; then
  echo "📝 Updating $CONFIG_FILE with project configuration..."

  # Check if github.projects section exists
  if grep -q "^github:" "$CONFIG_FILE"; then
    if ! grep -q "project_number:" "$CONFIG_FILE"; then
      # Add projects section under github
      cat >> "$CONFIG_FILE" <<EOF

  # GitHub Projects v2 Configuration
  projects:
    enabled: true
    project_number: $PROJECT_NUMBER
    owner: "$OWNER"

    # Status field configuration
    status_field:
      name: "Status"

    # Cache IDs to speed up status updates
    cache:
      project_id: "$PROJECT_ID"
      status_field_id: "$STATUS_FIELD_ID"
EOF

      if [ -n "$BACKLOG_ID" ]; then
        echo "      backlog_option_id: \"$BACKLOG_ID\"" >> "$CONFIG_FILE"
      fi
      if [ -n "$TODO_ID" ]; then
        echo "      todo_option_id: \"$TODO_ID\"" >> "$CONFIG_FILE"
      fi
      if [ -n "$INPROGRESS_ID" ]; then
        echo "      inprogress_option_id: \"$INPROGRESS_ID\"" >> "$CONFIG_FILE"
      fi
      if [ -n "$INREVIEW_ID" ]; then
        echo "      inreview_option_id: \"$INREVIEW_ID\"" >> "$CONFIG_FILE"
      fi
      if [ -n "$DONE_ID" ]; then
        echo "      done_option_id: \"$DONE_ID\"" >> "$CONFIG_FILE"
      fi

      echo "✅ Updated $CONFIG_FILE"
    else
      echo "⚠️  Projects configuration already exists in $CONFIG_FILE"
      echo "   Please update manually if needed"
    fi
  else
    echo "⚠️  No github: section found in $CONFIG_FILE"
    echo "   Please add github.projects configuration manually"
  fi
else
  echo "⚠️  $CONFIG_FILE not found"
  echo ""
  echo "💡 Create $CONFIG_FILE with this configuration:"
  echo ""
  cat <<EOF
github:
  projects:
    enabled: true
    project_number: $PROJECT_NUMBER
    owner: "$OWNER"

    status_field:
      name: "Status"

    cache:
      project_id: "$PROJECT_ID"
      status_field_id: "$STATUS_FIELD_ID"
EOF
  if [ -n "$TODO_ID" ]; then
    echo "      todo_option_id: \"$TODO_ID\""
  fi
  if [ -n "$INPROGRESS_ID" ]; then
    echo "      inprogress_option_id: \"$INPROGRESS_ID\""
  fi
  if [ -n "$INREVIEW_ID" ]; then
    echo "      inreview_option_id: \"$INREVIEW_ID\""
  fi
  if [ -n "$DONE_ID" ]; then
    echo "      done_option_id: \"$DONE_ID\""
  fi
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ GitHub Project Setup Complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📊 Project Details:"
echo "   Name: $PROJECT_NAME"
echo "   Number: $PROJECT_NUMBER"
echo "   Owner: $OWNER"
echo "   URL: $PROJECT_URL"
echo ""
echo "🎯 Next Steps:"
echo "   1. Visit your project: $PROJECT_URL"
echo "   2. Customize views and columns if needed"
echo "   3. Start using BMAD agents - they'll automatically:"
echo "      - Add issues to the project"
echo "      - Update status fields as work progresses"
echo "      - Move cards through your workflow"
echo ""
echo "📚 Documentation:"
echo "   - Projects vs Labels: {root}/expansion-packs/bmad-core-github/PROJECTS-VS-LABELS-ANALYSIS.md"
echo "   - Update script: {root}/expansion-packs/bmad-core-github/scripts/update-project-status.sh"
echo ""
