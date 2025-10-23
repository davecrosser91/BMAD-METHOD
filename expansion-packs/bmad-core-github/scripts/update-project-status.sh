#!/bin/bash
# BMAD-Core-GitHub: Update GitHub Projects v2 Status Field
# Usage: ./update-project-status.sh <issue-number> <status>
# Example: ./update-project-status.sh 123 "In Progress"

set -e

ISSUE_NUM=$1
STATUS=$2

if [ -z "$ISSUE_NUM" ] || [ -z "$STATUS" ]; then
  echo "❌ Usage: $0 <issue-number> <status>"
  echo ""
  echo "Valid statuses: Backlog, Todo, In Progress, In Review, Done"
  exit 1
fi

# Load configuration from core-config.yaml if available
CONFIG_FILE=".bmad-core/core-config.yaml"
if [ -f "$CONFIG_FILE" ]; then
  # Extract project configuration using grep/awk (basic YAML parsing)
  PROJECT_NUMBER=$(grep -A 5 "^github:" "$CONFIG_FILE" | grep "project_number:" | awk '{print $2}' || echo "")
  PROJECT_OWNER=$(grep -A 5 "^github:" "$CONFIG_FILE" | grep "owner:" | awk '{print $2}' | tr -d '"' || echo "")

  # Check for cached IDs
  PROJECT_ID=$(grep -A 10 "cache:" "$CONFIG_FILE" | grep "project_id:" | awk '{print $2}' | tr -d '"' || echo "")
  STATUS_FIELD_ID=$(grep -A 10 "cache:" "$CONFIG_FILE" | grep "status_field_id:" | awk '{print $2}' | tr -d '"' || echo "")
fi

# Fallback: detect from git remote
if [ -z "$PROJECT_OWNER" ]; then
  REPO_URL=$(git config --get remote.origin.url || echo "")
  if [[ $REPO_URL =~ github\.com[:/]([^/]+)/([^/.]+) ]]; then
    PROJECT_OWNER="${BASH_REMATCH[1]}"
  fi
fi

# Fallback: use project number 1
if [ -z "$PROJECT_NUMBER" ]; then
  PROJECT_NUMBER="1"
fi

if [ -z "$PROJECT_OWNER" ]; then
  echo "❌ Error: Could not determine project owner"
  echo "   Please configure 'owner' in .bmad-core/core-config.yaml under github.projects"
  exit 1
fi

echo "🔍 Updating issue #$ISSUE_NUM to status: $STATUS"
echo "   Project: $PROJECT_NUMBER (owner: $PROJECT_OWNER)"

# Get Project ID if not cached
if [ -z "$PROJECT_ID" ]; then
  echo "📡 Fetching project ID..."
  PROJECT_ID=$(gh project view "$PROJECT_NUMBER" --owner "$PROJECT_OWNER" --format json | jq -r '.id')

  if [ -z "$PROJECT_ID" ] || [ "$PROJECT_ID" = "null" ]; then
    echo "❌ Error: Could not find project #$PROJECT_NUMBER for owner $PROJECT_OWNER"
    echo "   Please create the project first or check your configuration"
    exit 1
  fi
  echo "   Project ID: $PROJECT_ID"
fi

# Get Status Field ID if not cached
if [ -z "$STATUS_FIELD_ID" ]; then
  echo "📡 Fetching status field ID..."
  STATUS_FIELD_ID=$(gh project field-list "$PROJECT_NUMBER" --owner "$PROJECT_OWNER" --format json | jq -r '.fields[] | select(.name=="Status") | .id')

  if [ -z "$STATUS_FIELD_ID" ] || [ "$STATUS_FIELD_ID" = "null" ]; then
    echo "❌ Error: Could not find Status field in project"
    echo "   Please ensure your project has a Status field configured"
    exit 1
  fi
  echo "   Status Field ID: $STATUS_FIELD_ID"
fi

# Get Status Option ID for the specified status
echo "📡 Fetching status option ID for: $STATUS"
OPTION_ID=$(gh project field-list "$PROJECT_NUMBER" --owner "$PROJECT_OWNER" --format json | jq -r --arg status "$STATUS" '.fields[] | select(.name=="Status") | .options[] | select(.name==$status) | .id')

if [ -z "$OPTION_ID" ] || [ "$OPTION_ID" = "null" ]; then
  echo "❌ Error: Status '$STATUS' not found in project"
  echo "   Available statuses:"
  gh project field-list "$PROJECT_NUMBER" --owner "$PROJECT_OWNER" --format json | jq -r '.fields[] | select(.name=="Status") | .options[] | "   - " + .name'
  exit 1
fi

# Get repository name
REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner)

# Check if issue is already in the project
echo "🔍 Checking if issue #$ISSUE_NUM is in project..."
ITEM_ID=$(gh project item-list "$PROJECT_NUMBER" --owner "$PROJECT_OWNER" --format json | jq -r --arg issue "$ISSUE_NUM" '.items[] | select(.content.number == ($issue | tonumber)) | .id')

# If not in project, add it
if [ -z "$ITEM_ID" ] || [ "$ITEM_ID" = "null" ]; then
  echo "➕ Adding issue #$ISSUE_NUM to project..."
  ITEM_ID=$(gh project item-add "$PROJECT_NUMBER" --owner "$PROJECT_OWNER" --url "https://github.com/$REPO/issues/$ISSUE_NUM" --format json | jq -r '.id')

  if [ -z "$ITEM_ID" ] || [ "$ITEM_ID" = "null" ]; then
    echo "❌ Error: Could not add issue to project"
    exit 1
  fi
  echo "   Item ID: $ITEM_ID"
else
  echo "   Item already in project (ID: $ITEM_ID)"
fi

# Update the status field
echo "🔄 Updating status..."
gh project item-edit \
  --id "$ITEM_ID" \
  --project-id "$PROJECT_ID" \
  --field-id "$STATUS_FIELD_ID" \
  --single-select-option-id "$OPTION_ID" \
  > /dev/null

echo "✅ Successfully updated issue #$ISSUE_NUM status to: $STATUS"

# Optional: Print helpful cache information
if [ -f "$CONFIG_FILE" ]; then
  if [ -z "$(grep 'cache:' "$CONFIG_FILE")" ]; then
    echo ""
    echo "💡 Tip: Add these IDs to $CONFIG_FILE under github.projects.cache to speed up future updates:"
    echo "   cache:"
    echo "     project_id: \"$PROJECT_ID\""
    echo "     status_field_id: \"$STATUS_FIELD_ID\""
  fi
fi
