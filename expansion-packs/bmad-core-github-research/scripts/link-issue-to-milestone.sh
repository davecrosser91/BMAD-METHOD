#!/bin/bash
# BMAD-Core-GitHub: Link Issue to Milestone
# Usage: ./link-issue-to-milestone.sh <issue-number> <milestone-name>
# Example: ./link-issue-to-milestone.sh 123 "Epic 1: Foundation"

set -e

ISSUE_NUM=$1
MILESTONE_NAME=$2

if [ -z "$ISSUE_NUM" ] || [ -z "$MILESTONE_NAME" ]; then
  echo "❌ Usage: $0 <issue-number> <milestone-name>"
  echo ""
  echo "Examples:"
  echo "  $0 123 \"Epic 1: Foundation\""
  echo "  $0 456 \"Sprint 2\""
  exit 1
fi

# Check if gh CLI is authenticated
if ! gh auth status &>/dev/null; then
  echo "❌ Error: GitHub CLI not authenticated"
  echo "   Please run: gh auth login"
  exit 1
fi

echo "🎯 Linking issue #$ISSUE_NUM to milestone: $MILESTONE_NAME..."

# Link issue to milestone
gh issue edit "$ISSUE_NUM" --milestone "$MILESTONE_NAME"

if [ $? -eq 0 ]; then
  echo "✅ Issue #$ISSUE_NUM linked to milestone: $MILESTONE_NAME"
else
  echo "❌ Error: Failed to link issue to milestone"
  echo "   Make sure the milestone exists. Create it with:"
  echo "   gh api repos/:owner/:repo/milestones -f title=\"$MILESTONE_NAME\""
  exit 1
fi
