#!/bin/bash
# BMAD-Core-GitHub: Get Current Projects v2 Status for an Issue
# This script reads the current status of a GitHub issue from Projects v2

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check arguments
if [ $# -lt 1 ]; then
  echo -e "${RED}❌ Error: Issue number required${NC}"
  echo ""
  echo "Usage: $0 <issue-number>"
  echo ""
  echo "Example:"
  echo "  $0 123"
  exit 1
fi

ISSUE_NUM="$1"

# Check if gh CLI is available
if ! command -v gh &> /dev/null; then
  echo -e "${RED}❌ Error: GitHub CLI (gh) is not installed${NC}"
  echo "   Please install it from: https://cli.github.com/"
  exit 1
fi

# Check if authenticated
if ! gh auth status &>/dev/null; then
  echo -e "${RED}❌ Error: GitHub CLI not authenticated${NC}"
  echo "   Please run: gh auth login"
  exit 1
fi

# Get project info from core-config.yaml if it exists
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
CONFIG_FILE="$ROOT_DIR/../../.bmad-core/core-config.yaml"

PROJECT_NUMBER=""
PROJECT_OWNER=""

if [ -f "$CONFIG_FILE" ]; then
  # Extract project info from config
  PROJECT_NUMBER=$(grep -A 5 "github:" "$CONFIG_FILE" | grep "project_number:" | awk '{print $2}' | tr -d '"' || echo "")
  PROJECT_OWNER=$(grep -A 5 "github:" "$CONFIG_FILE" | grep "owner:" | awk '{print $2}' | tr -d "'" | tr -d '"' || echo "")
fi

# If not in config, try to detect from git remote
if [ -z "$PROJECT_OWNER" ]; then
  GIT_REMOTE=$(git remote get-url origin 2>/dev/null || echo "")
  if [[ $GIT_REMOTE =~ github.com[:/]([^/]+)/([^/.]+) ]]; then
    PROJECT_OWNER="${BASH_REMATCH[1]}"
  fi
fi

if [ -z "$PROJECT_OWNER" ]; then
  echo -e "${RED}❌ Error: Could not determine project owner${NC}"
  echo "   Please configure github.owner in .bmad-core/core-config.yaml"
  exit 1
fi

# Get issue details with project items
echo -e "${BLUE}📊 Fetching status for issue #${ISSUE_NUM}...${NC}"
echo ""

ISSUE_DATA=$(gh issue view "$ISSUE_NUM" --json projectItems,title,state 2>/dev/null || echo "")

if [ -z "$ISSUE_DATA" ]; then
  echo -e "${RED}❌ Error: Could not fetch issue #${ISSUE_NUM}${NC}"
  exit 1
fi

ISSUE_TITLE=$(echo "$ISSUE_DATA" | jq -r '.title')
ISSUE_STATE=$(echo "$ISSUE_DATA" | jq -r '.state')

echo -e "${GREEN}📝 Issue:${NC} #${ISSUE_NUM} - ${ISSUE_TITLE}"
echo -e "${BLUE}🔖 State:${NC} ${ISSUE_STATE}"
echo ""

# Extract Projects v2 status
PROJECT_ITEMS=$(echo "$ISSUE_DATA" | jq -r '.projectItems')

if [ "$PROJECT_ITEMS" = "[]" ] || [ "$PROJECT_ITEMS" = "null" ]; then
  echo -e "${YELLOW}⚠️  Issue is not linked to any GitHub Project${NC}"
  echo ""
  echo "To add this issue to a project and set status:"
  echo "  ./scripts/update-project-status.sh $ISSUE_NUM \"Backlog\""
  exit 0
fi

# Parse status from project items
# Projects v2 stores status in fieldValues
STATUS=$(echo "$ISSUE_DATA" | jq -r '
  .projectItems[]
  | select(.fieldValues != null)
  | .fieldValues[]
  | select(.field.name == "Status")
  | .name
' | head -n 1)

if [ -z "$STATUS" ] || [ "$STATUS" = "null" ]; then
  echo -e "${YELLOW}⚠️  Issue is in a project but Status field is not set${NC}"
  echo ""
  echo "To set status:"
  echo "  ./scripts/update-project-status.sh $ISSUE_NUM \"Backlog\""
  exit 0
fi

echo -e "${GREEN}✅ Current Status:${NC} ${STATUS}"
echo ""

# Output machine-readable format for scripting
echo "ISSUE_NUMBER=$ISSUE_NUM"
echo "ISSUE_TITLE=$ISSUE_TITLE"
echo "ISSUE_STATE=$ISSUE_STATE"
echo "PROJECT_STATUS=$STATUS"
