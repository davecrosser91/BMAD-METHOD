#!/bin/bash
# BMAD-Core-GitHub: Create GitHub Issue from Story File
# This script converts a BMAD story file to a GitHub issue with full context

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 BMAD Story → GitHub Issue Converter${NC}"
echo "=========================================="
echo ""

# Check arguments
if [ $# -lt 1 ]; then
  echo -e "${RED}❌ Error: Story file path required${NC}"
  echo ""
  echo "Usage: $0 <story-file-path> [options]"
  echo ""
  echo "Options:"
  echo "  --dry-run         Show the issue body without creating it"
  echo "  --milestone NAME  Add issue to milestone"
  echo "  --assignee USER   Assign issue to user"
  echo ""
  echo "Example:"
  echo "  $0 .bmad-stories/1.0.0.story.md"
  echo "  $0 .bmad-stories/1.0.0.story.md --milestone \"Epic 1\" --assignee @me"
  exit 1
fi

STORY_FILE="$1"
shift

# Parse options
DRY_RUN=false
MILESTONE=""
ASSIGNEE=""

while [[ $# -gt 0 ]]; do
  case $1 in
    --dry-run)
      DRY_RUN=true
      shift
      ;;
    --milestone)
      MILESTONE="$2"
      shift 2
      ;;
    --assignee)
      ASSIGNEE="$2"
      shift 2
      ;;
    *)
      echo -e "${RED}❌ Unknown option: $1${NC}"
      exit 1
      ;;
  esac
done

# Check if story file exists
if [ ! -f "$STORY_FILE" ]; then
  echo -e "${RED}❌ Error: Story file not found: $STORY_FILE${NC}"
  exit 1
fi

echo -e "${GREEN}📖 Reading story file:${NC} $STORY_FILE"
echo ""

# Extract story metadata from filename
# Expected format: {epic}.{major}.{minor}.story.md
FILENAME=$(basename "$STORY_FILE")
STORY_NUMBER=$(echo "$FILENAME" | sed -E 's/^([0-9]+\.[0-9]+\.[0-9]+)\.story\.md$/\1/')

if [ "$STORY_NUMBER" = "$FILENAME" ]; then
  echo -e "${RED}❌ Error: Invalid story filename format${NC}"
  echo "Expected: {epic}.{major}.{minor}.story.md (e.g., 1.0.0.story.md)"
  exit 1
fi

echo -e "${BLUE}📊 Story Number:${NC} $STORY_NUMBER"

# Extract sections from story file using awk
extract_section() {
  local file="$1"
  local start_marker="$2"
  local end_marker="$3"

  awk "
    /^## ${start_marker}\$/ { found=1; next }
    found && /^## / { found=0 }
    found { print }
  " "$file"
}

# Extract story title (first H1)
STORY_TITLE=$(grep -m 1 "^# " "$STORY_FILE" | sed 's/^# //' | sed "s/Story [0-9.]*: //")

# Extract key sections
STORY_STATEMENT=$(extract_section "$STORY_FILE" "Story" "Acceptance Criteria")
ACCEPTANCE_CRITERIA=$(extract_section "$STORY_FILE" "Acceptance Criteria" "Tasks")
TASKS=$(extract_section "$STORY_FILE" "Tasks / Subtasks" "Dev Notes")
DEV_NOTES=$(extract_section "$STORY_FILE" "Dev Notes" "Testing")
TESTING=$(extract_section "$STORY_FILE" "Testing" "Dev Agent Record")

# Try to extract epic name from story file or use Story Number
EPIC_NAME=$(grep -m 1 "^\*\*Epic:\*\*" "$STORY_FILE" | sed 's/\*\*Epic:\*\* //' || echo "Epic ${STORY_NUMBER%%.*}")

# Extract size and priority if present
SIZE=$(grep -m 1 "^\*\*Size:\*\*" "$STORY_FILE" | sed 's/\*\*Size:\*\* //' || echo "size:m")
PRIORITY=$(grep -m 1 "^\*\*Priority:\*\*" "$STORY_FILE" | sed 's/\*\*Priority:\*\* //' || echo "priority:p2")

echo -e "${BLUE}📝 Story Title:${NC} $STORY_TITLE"
echo -e "${BLUE}📦 Epic:${NC} $EPIC_NAME"
echo -e "${BLUE}📏 Size:${NC} $SIZE"
echo -e "${BLUE}⚡ Priority:${NC} $PRIORITY"
echo ""

# Build issue body
ISSUE_BODY=$(cat <<EOF
# Story: [$STORY_NUMBER] $STORY_TITLE

**Epic:** $EPIC_NAME
**Story Number:** $STORY_NUMBER
**Estimate:** $SIZE
**Priority:** $PRIORITY

---

## 📖 User Story

$STORY_STATEMENT

---

## ✅ Acceptance Criteria

$ACCEPTANCE_CRITERIA

---

## 📋 Tasks & Subtasks

$TASKS

---

## 🛠️ Dev Notes (CRITICAL - Complete Technical Context)

> **CRITICAL:** This section contains ALL technical context needed for implementation.
> Claude Code should NEVER need to read architecture docs if this section is complete.

$DEV_NOTES

### Testing Requirements

$TESTING

---

## 📚 Reference Documents

**Full context available at:**
- Architecture: \`docs/architecture/\`
- PRD: \`docs/prd/\`
- Story File: \`$STORY_FILE\`

**Key files to reference if needed:**
- \`docs/architecture/coding-standards.md\` - Full coding conventions
- \`docs/architecture/tech-stack.md\` - Technology decisions
- \`docs/architecture/unified-project-structure.md\` - Project structure

---

## 📝 Implementation Notes

_This section will be filled in by Claude Code during implementation_

---

## ✨ Definition of Done

- [ ] All tasks completed
- [ ] All acceptance criteria met
- [ ] Tests written and passing (≥80% coverage)
- [ ] Code follows coding standards
- [ ] PR created and linked to this issue
- [ ] Code review completed
- [ ] Merged to main

---

## 💡 How to Use with Claude Code

\`\`\`
@github #[issue-number] please implement this story following all dev notes and acceptance criteria
\`\`\`

## 🔗 Links

- **Story File:** \`$STORY_FILE\`
- **Epic:** $EPIC_NAME
EOF
)

# Show issue body if dry-run
if [ "$DRY_RUN" = true ]; then
  echo -e "${YELLOW}🔍 DRY RUN - Issue body preview:${NC}"
  echo "=========================================="
  echo "$ISSUE_BODY"
  echo "=========================================="
  echo ""
  echo -e "${YELLOW}ℹ️  Dry run complete. No issue created.${NC}"
  exit 0
fi

# Check if gh CLI is authenticated
if ! gh auth status &>/dev/null; then
  echo -e "${RED}❌ Error: GitHub CLI not authenticated${NC}"
  echo "   Please run: gh auth login"
  exit 1
fi

# Create issue title
ISSUE_TITLE="[$STORY_NUMBER] $STORY_TITLE"

echo -e "${GREEN}📝 Creating GitHub issue...${NC}"
echo ""

# Build gh issue create command
GH_CMD="gh issue create --title \"$ISSUE_TITLE\" --body \"\$ISSUE_BODY\""

# Add labels (status is managed via Projects v2, not labels)
GH_CMD="$GH_CMD --label \"type:story,$SIZE,$PRIORITY\""

# Add milestone if specified
if [ -n "$MILESTONE" ]; then
  GH_CMD="$GH_CMD --milestone \"$MILESTONE\""
  echo -e "${BLUE}🎯 Milestone:${NC} $MILESTONE"
fi

# Add assignee if specified
if [ -n "$ASSIGNEE" ]; then
  GH_CMD="$GH_CMD --assignee \"$ASSIGNEE\""
  echo -e "${BLUE}👤 Assignee:${NC} $ASSIGNEE"
fi

# Create the issue
ISSUE_URL=$(eval "$GH_CMD")

if [ $? -eq 0 ]; then
  echo ""
  echo -e "${GREEN}✅ GitHub issue created successfully!${NC}"
  echo -e "${GREEN}📍 URL:${NC} $ISSUE_URL"
  echo ""

  # Extract issue number from URL
  ISSUE_NUMBER=$(echo "$ISSUE_URL" | grep -oE '[0-9]+$')

  echo -e "${BLUE}📊 Issue Number:${NC} #$ISSUE_NUMBER"
  echo ""

  # Update story file with GitHub issue reference if not already present
  if ! grep -q "^\*\*GitHub Issue:\*\*" "$STORY_FILE"; then
    echo -e "${YELLOW}📝 Updating story file with GitHub issue reference...${NC}"

    # Find the line with "Status" and add GitHub Issue reference after the title
    # This uses a platform-compatible approach
    TMP_FILE=$(mktemp)
    awk -v issue="$ISSUE_NUMBER" -v url="$ISSUE_URL" '
      /^# Story/ {
        print $0
        print ""
        print "**GitHub Issue:** #" issue
        print "**GitHub URL:** " url
        next
      }
      { print }
    ' "$STORY_FILE" > "$TMP_FILE"
    mv "$TMP_FILE" "$STORY_FILE"

    echo -e "${GREEN}✅ Story file updated with GitHub issue link${NC}"
  fi

  echo ""
  echo -e "${BLUE}💡 Next Steps:${NC}"
  echo "1. Set initial Projects v2 status:"
  echo "   ./scripts/update-project-status.sh $ISSUE_NUMBER \"Backlog\""
  echo ""
  echo "2. Use with Claude Code:"
  echo "   @github #$ISSUE_NUMBER please implement this story"
  echo ""

else
  echo -e "${RED}❌ Error: Failed to create GitHub issue${NC}"
  exit 1
fi
