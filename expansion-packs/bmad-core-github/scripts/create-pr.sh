#!/bin/bash
# BMAD-Core-GitHub: Create Pull Request
# Usage: ./create-pr.sh [options]
# Example: ./create-pr.sh --title "Fix bug" --body "Fixes #123" --base main

set -e

# Default values
TITLE=""
BODY=""
BASE="main"
HEAD=""
DRAFT="false"
AUTO_FILL="false"

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
    --base)
      BASE="$2"
      shift 2
      ;;
    --head)
      HEAD="$2"
      shift 2
      ;;
    --draft)
      DRAFT="true"
      shift
      ;;
    --auto-fill)
      AUTO_FILL="true"
      shift
      ;;
    --help)
      echo "Usage: $0 [options]"
      echo ""
      echo "Options:"
      echo "  --title TITLE       PR title (required unless --auto-fill)"
      echo "  --body BODY         PR body/description"
      echo "  --base BRANCH       Base branch (default: main)"
      echo "  --head BRANCH       Head branch (default: current branch)"
      echo "  --draft             Create as draft PR"
      echo "  --auto-fill         Auto-fill title and body from commits"
      echo "  --help              Show this help message"
      echo ""
      echo "Examples:"
      echo "  $0 --title \"Fix authentication bug\" --body \"Fixes #123\""
      echo "  $0 --auto-fill --draft"
      echo "  $0 --title \"Add feature\" --base develop --head feature/new"
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
if [ "$AUTO_FILL" = "false" ] && [ -z "$TITLE" ]; then
  echo "❌ Error: --title is required (or use --auto-fill)"
  echo "Use --help for usage information"
  exit 1
fi

# Check if gh CLI is authenticated
if ! gh auth status &>/dev/null; then
  echo "❌ Error: GitHub CLI not authenticated"
  echo "   Please run: gh auth login"
  exit 1
fi

echo "🚀 Creating pull request..."
echo ""

# Build gh pr create command
GH_CMD="gh pr create"

if [ "$AUTO_FILL" = "true" ]; then
  GH_CMD="$GH_CMD --fill"
else
  GH_CMD="$GH_CMD --title \"$TITLE\""

  if [ -n "$BODY" ]; then
    GH_CMD="$GH_CMD --body \"$BODY\""
  fi
fi

if [ -n "$BASE" ]; then
  GH_CMD="$GH_CMD --base \"$BASE\""
fi

if [ -n "$HEAD" ]; then
  GH_CMD="$GH_CMD --head \"$HEAD\""
fi

if [ "$DRAFT" = "true" ]; then
  GH_CMD="$GH_CMD --draft"
fi

# Execute command
PR_URL=$(eval "$GH_CMD")

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ Pull request created successfully!"
  echo "📍 URL: $PR_URL"

  # Extract PR number from URL
  PR_NUMBER=$(echo "$PR_URL" | grep -oE '[0-9]+$')
  echo "🔢 PR Number: #$PR_NUMBER"
else
  echo "❌ Error: Failed to create pull request"
  exit 1
fi
