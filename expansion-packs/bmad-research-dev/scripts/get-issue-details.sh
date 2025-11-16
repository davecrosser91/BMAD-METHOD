#!/bin/bash
# BMAD-Core-GitHub: Get GitHub Issue Details
# Usage: ./get-issue-details.sh <issue-number> [--format json|yaml|text]
# Example: ./get-issue-details.sh 123 --format json

set -e

ISSUE_NUM=$1
FORMAT="${2:-text}"

if [ -z "$ISSUE_NUM" ]; then
  echo "❌ Usage: $0 <issue-number> [--format json|yaml|text]"
  echo ""
  echo "Examples:"
  echo "  $0 123"
  echo "  $0 123 --format json"
  exit 1
fi

# Parse format option
if [ "$2" = "--format" ]; then
  FORMAT="$3"
fi

# Check if gh CLI is authenticated
if ! gh auth status &>/dev/null; then
  echo "❌ Error: GitHub CLI not authenticated"
  echo "   Please run: gh auth login"
  exit 1
fi

# Fetch issue details based on format
if [ "$FORMAT" = "json" ]; then
  gh issue view "$ISSUE_NUM" --json number,title,body,state,labels,milestone,assignees,projectItems,comments,createdAt,updatedAt,url
elif [ "$FORMAT" = "yaml" ]; then
  gh issue view "$ISSUE_NUM" --json number,title,body,state,labels,milestone,assignees,projectItems,comments,createdAt,updatedAt,url | yq -P
else
  # Default text format with nice formatting
  gh issue view "$ISSUE_NUM"
fi

if [ $? -ne 0 ]; then
  echo "❌ Error: Failed to fetch issue #$ISSUE_NUM"
  exit 1
fi
