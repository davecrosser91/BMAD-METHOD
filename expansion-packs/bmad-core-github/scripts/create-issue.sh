#!/bin/bash
# BMAD-Core-GitHub: Create GitHub Issue
# Usage: ./create-issue.sh [options]
# Example: ./create-issue.sh --title "Fix bug" --body "Description" --label "type:bug,priority:p1"

set -e

# Default values
TITLE=""
BODY=""
LABELS=""
MILESTONE=""
ASSIGNEE=""
PROJECT=""

# Parse options
while [[ $# -gt 0 ]]; do
  case $1 in
    --title)
      TITLE="$2"
      shift 2
      ;;
    --body)
      BODY="$2"
      shift 2
      ;;
    --label|--labels)
      LABELS="$2"
      shift 2
      ;;
    --milestone)
      MILESTONE="$2"
      shift 2
      ;;
    --assignee)
      ASSIGNEE="$2"
      shift 2
      ;;
    --project)
      PROJECT="$2"
      shift 2
      ;;
    --help)
      echo "Usage: $0 [options]"
      echo ""
      echo "Options:"
      echo "  --title TITLE       Issue title (required)"
      echo "  --body BODY         Issue body/description"
      echo "  --label LABELS      Labels (comma-separated)"
      echo "  --milestone NAME    Milestone to add issue to"
      echo "  --assignee USER     Assignee (@me for yourself)"
      echo "  --project NUMBER    Project number to add issue to"
      echo "  --help              Show this help message"
      echo ""
      echo "Examples:"
      echo "  $0 --title \"Fix authentication bug\" --body \"Users cannot login\" --label \"type:bug,priority:p1\""
      echo "  $0 --title \"Add new feature\" --label \"type:story,size:m\" --milestone \"Epic 1\" --assignee @me"
      echo "  $0 --title \"Update documentation\" --body \"Add API examples\" --label \"type:task\""
      exit 0
      ;;
    *)
      echo "❌ Unknown option: $1"
      echo "Use --help for usage information"
      exit 1
      ;;
  esac
done

# Validate required parameters
if [ -z "$TITLE" ]; then
  echo "❌ Error: --title is required"
  echo "Use --help for usage information"
  exit 1
fi

# Check if gh CLI is authenticated
if ! gh auth status &>/dev/null; then
  echo "❌ Error: GitHub CLI not authenticated"
  echo "   Please run: gh auth login"
  exit 1
fi

echo "📝 Creating GitHub issue..."
echo ""
echo "Title: $TITLE"
if [ -n "$LABELS" ]; then
  echo "Labels: $LABELS"
fi
if [ -n "$MILESTONE" ]; then
  echo "Milestone: $MILESTONE"
fi
if [ -n "$ASSIGNEE" ]; then
  echo "Assignee: $ASSIGNEE"
fi
echo ""

# Build gh issue create command
GH_CMD="gh issue create --title \"$TITLE\""

if [ -n "$BODY" ]; then
  # Use heredoc for body to handle multiline properly
  TEMP_BODY_FILE=$(mktemp)
  echo "$BODY" > "$TEMP_BODY_FILE"
  GH_CMD="$GH_CMD --body-file \"$TEMP_BODY_FILE\""
fi

if [ -n "$LABELS" ]; then
  # Convert comma-separated labels to individual --label flags
  IFS=',' read -ra LABEL_ARRAY <<< "$LABELS"
  for label in "${LABEL_ARRAY[@]}"; do
    GH_CMD="$GH_CMD --label \"$label\""
  done
fi

if [ -n "$MILESTONE" ]; then
  GH_CMD="$GH_CMD --milestone \"$MILESTONE\""
fi

if [ -n "$ASSIGNEE" ]; then
  GH_CMD="$GH_CMD --assignee \"$ASSIGNEE\""
fi

# Create the issue
ISSUE_URL=$(eval "$GH_CMD")
EXIT_CODE=$?

# Clean up temp file if created
if [ -n "$TEMP_BODY_FILE" ]; then
  rm -f "$TEMP_BODY_FILE"
fi

if [ $EXIT_CODE -eq 0 ]; then
  echo ""
  echo "✅ Issue created successfully!"
  echo "📍 URL: $ISSUE_URL"

  # Extract issue number from URL
  ISSUE_NUMBER=$(echo "$ISSUE_URL" | grep -oE '[0-9]+$')
  echo "🔢 Issue Number: #$ISSUE_NUMBER"

  # Add to project if specified
  if [ -n "$PROJECT" ]; then
    echo ""
    echo "📊 Adding to project #$PROJECT..."

    # Load configuration from core-config.yaml if available
    CONFIG_FILE=".bmad-core/core-config.yaml"
    PROJECT_OWNER=""

    if [ -f "$CONFIG_FILE" ]; then
      PROJECT_OWNER=$(grep -A 5 "^github:" "$CONFIG_FILE" | grep "owner:" | awk '{print $2}' | tr -d '"' || echo "")
    fi

    # Fallback: detect from git remote
    if [ -z "$PROJECT_OWNER" ]; then
      REPO_URL=$(git config --get remote.origin.url || echo "")
      if [[ $REPO_URL =~ github\.com[:/]([^/]+)/([^/.]+) ]]; then
        PROJECT_OWNER="${BASH_REMATCH[1]}"
      fi
    fi

    if [ -z "$PROJECT_OWNER" ]; then
      echo "⚠️  Warning: Could not determine project owner. Skipping project add."
      echo "   Configure 'owner' in .bmad-core/core-config.yaml under github.projects"
    else
      # Get repository name
      REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner)

      # Add issue to project
      gh project item-add "$PROJECT" --owner "$PROJECT_OWNER" --url "$ISSUE_URL" > /dev/null 2>&1

      if [ $? -eq 0 ]; then
        echo "✅ Issue added to project #$PROJECT"
      else
        echo "⚠️  Warning: Could not add issue to project #$PROJECT"
        echo "   You can manually add it or use: ./scripts/update-project-status.sh $ISSUE_NUMBER \"Backlog\""
      fi
    fi
  fi

  # Output machine-readable format
  echo ""
  echo "ISSUE_NUMBER=$ISSUE_NUMBER"
  echo "ISSUE_URL=$ISSUE_URL"

else
  echo "❌ Error: Failed to create issue"
  exit 1
fi
