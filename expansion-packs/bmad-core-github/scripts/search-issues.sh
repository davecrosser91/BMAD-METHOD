#!/bin/bash
# BMAD-Core-GitHub: Search GitHub Issues
# Usage: ./search-issues.sh [options]
# Example: ./search-issues.sh --label "type:story" --state "open" --milestone "Epic 1"

set -e

# Default values
STATE="open"
LABELS=""
MILESTONE=""
ASSIGNEE=""
LIMIT=""
FORMAT="table"

# Parse options
while [[ $# -gt 0 ]]; do
  case $1 in
    --state)
      STATE="$2"
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
    --limit)
      LIMIT="$2"
      shift 2
      ;;
    --format)
      FORMAT="$2"
      shift 2
      ;;
    --help)
      echo "Usage: $0 [options]"
      echo ""
      echo "Options:"
      echo "  --state STATE        Filter by state (open, closed, all). Default: open"
      echo "  --label LABELS       Filter by labels (comma-separated)"
      echo "  --milestone NAME     Filter by milestone"
      echo "  --assignee USER      Filter by assignee (@me for yourself)"
      echo "  --limit N            Limit number of results"
      echo "  --format FORMAT      Output format (table, json). Default: table"
      echo "  --help               Show this help message"
      echo ""
      echo "Examples:"
      echo "  $0 --label \"type:story\" --state open"
      echo "  $0 --milestone \"Epic 1\" --assignee @me"
      echo "  $0 --label \"priority:p1,status:doing\" --format json"
      exit 0
      ;;
    *)
      echo "❌ Unknown option: $1"
      echo "Use --help for usage information"
      exit 1
      ;;
  esac
done

# Check if gh CLI is authenticated
if ! gh auth status &>/dev/null; then
  echo "❌ Error: GitHub CLI not authenticated"
  echo "   Please run: gh auth login"
  exit 1
fi

echo "🔍 Searching GitHub issues..."
echo ""

# Build gh issue list command
GH_CMD="gh issue list --state \"$STATE\""

if [ -n "$LABELS" ]; then
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

if [ -n "$LIMIT" ]; then
  GH_CMD="$GH_CMD --limit \"$LIMIT\""
fi

# Set format
if [ "$FORMAT" = "json" ]; then
  GH_CMD="$GH_CMD --json number,title,state,labels,milestone,assignees,createdAt,updatedAt"
fi

# Execute search
eval "$GH_CMD"

if [ $? -ne 0 ]; then
  echo ""
  echo "❌ Error: Failed to search issues"
  exit 1
fi
