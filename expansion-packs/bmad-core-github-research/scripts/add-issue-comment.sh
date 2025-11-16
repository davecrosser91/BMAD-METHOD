#!/bin/bash
# BMAD-Core-GitHub: Add Comment to GitHub Issue
# Usage: ./add-issue-comment.sh <issue-number> <comment-text>
# Example: ./add-issue-comment.sh 123 "Started development"

set -e

ISSUE_NUM=$1
COMMENT_TEXT=$2

if [ -z "$ISSUE_NUM" ] || [ -z "$COMMENT_TEXT" ]; then
  echo "❌ Usage: $0 <issue-number> <comment-text>"
  echo ""
  echo "Example:"
  echo "  $0 123 \"Started development\""
  exit 1
fi

# Check if gh CLI is authenticated
if ! gh auth status &>/dev/null; then
  echo "❌ Error: GitHub CLI not authenticated"
  echo "   Please run: gh auth login"
  exit 1
fi

echo "💬 Adding comment to issue #$ISSUE_NUM..."

# Add comment to issue
gh issue comment "$ISSUE_NUM" --body "$COMMENT_TEXT"

if [ $? -eq 0 ]; then
  echo "✅ Comment added successfully to issue #$ISSUE_NUM"
else
  echo "❌ Error: Failed to add comment to issue #$ISSUE_NUM"
  exit 1
fi
