#!/bin/bash
# BMAD-Core-GitHub: Update GitHub Issue Labels
# Usage: ./update-issue-labels.sh <issue-number> [--add label1,label2] [--remove label3,label4]
# Example: ./update-issue-labels.sh 123 --add "priority:p1" --remove "priority:p2"

set -e

ISSUE_NUM=$1
shift

if [ -z "$ISSUE_NUM" ]; then
  echo "❌ Usage: $0 <issue-number> [--add label1,label2] [--remove label3,label4]"
  echo ""
  echo "Examples:"
  echo "  $0 123 --add \"priority:p1\""
  echo "  $0 123 --remove \"priority:p2\""
  echo "  $0 123 --add \"priority:p1,size:m\" --remove \"priority:p2\""
  exit 1
fi

# Parse options
ADD_LABELS=""
REMOVE_LABELS=""

while [[ $# -gt 0 ]]; do
  case $1 in
    --add)
      ADD_LABELS="$2"
      shift 2
      ;;
    --remove)
      REMOVE_LABELS="$2"
      shift 2
      ;;
    *)
      echo "❌ Unknown option: $1"
      exit 1
      ;;
  esac
done

if [ -z "$ADD_LABELS" ] && [ -z "$REMOVE_LABELS" ]; then
  echo "❌ Error: Must specify either --add or --remove"
  exit 1
fi

# Check if gh CLI is authenticated
if ! gh auth status &>/dev/null; then
  echo "❌ Error: GitHub CLI not authenticated"
  echo "   Please run: gh auth login"
  exit 1
fi

echo "🏷️  Updating labels for issue #$ISSUE_NUM..."

# Build gh issue edit command
GH_CMD="gh issue edit $ISSUE_NUM"

if [ -n "$ADD_LABELS" ]; then
  IFS=',' read -ra LABELS <<< "$ADD_LABELS"
  for label in "${LABELS[@]}"; do
    GH_CMD="$GH_CMD --add-label \"$label\""
    echo "  ➕ Adding: $label"
  done
fi

if [ -n "$REMOVE_LABELS" ]; then
  IFS=',' read -ra LABELS <<< "$REMOVE_LABELS"
  for label in "${LABELS[@]}"; do
    GH_CMD="$GH_CMD --remove-label \"$label\""
    echo "  ➖ Removing: $label"
  done
fi

# Execute command
eval "$GH_CMD"

if [ $? -eq 0 ]; then
  echo "✅ Labels updated successfully for issue #$ISSUE_NUM"
else
  echo "❌ Error: Failed to update labels for issue #$ISSUE_NUM"
  exit 1
fi
