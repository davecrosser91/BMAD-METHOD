#!/bin/bash

# BMAD-Core-GitHub Label Setup Script
# Creates all necessary GitHub labels for the BMAD workflow

set -e

echo "🏷️  BMAD-Core-GitHub Label Setup"
echo "================================"
echo ""

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    echo "❌ Error: GitHub CLI (gh) is not installed."
    echo ""
    echo "Install it first:"
    echo "  macOS:   brew install gh"
    echo "  Linux:   See https://github.com/cli/cli/blob/trunk/docs/install_linux.md"
    echo "  Windows: winget install GitHub.cli"
    exit 1
fi

# Check if authenticated
if ! gh auth status &> /dev/null; then
    echo "❌ Error: Not authenticated with GitHub CLI."
    echo ""
    echo "Run: gh auth login"
    exit 1
fi

echo "✅ GitHub CLI is installed and authenticated"
echo ""

# Function to create or update label
create_label() {
    local name=$1
    local color=$2
    local description=$3

    # Try to create label, ignore if it already exists
    if gh label create "$name" --color "$color" --description "$description" 2>/dev/null; then
        echo "   ✅ Created: $name"
    else
        # Label exists, try to update it
        if gh label edit "$name" --color "$color" --description "$description" 2>/dev/null; then
            echo "   ↻  Updated: $name"
        else
            echo "   ⚠️  Exists:  $name (could not update)"
        fi
    fi
}

echo "Creating Status Labels..."
echo "-------------------------"
create_label "status:backlog" "d4c5f9" "Not yet scheduled for work"
create_label "status:todo" "0075ca" "Ready to start, in sprint"
create_label "status:doing" "fbca04" "Work in progress"
create_label "status:review" "ff9800" "In code review (PR open)"
create_label "status:done" "28a745" "Completed and merged"
echo ""

echo "Creating Type Labels..."
echo "-----------------------"
create_label "type:epic" "7057ff" "Large feature milestone"
create_label "type:story" "0e8a16" "User story"
create_label "type:task" "1d76db" "Development task"
create_label "type:bug" "d73a4a" "Bug fix"
echo ""

echo "Creating Priority Labels..."
echo "---------------------------"
create_label "priority:p0" "b60205" "Critical - Drop everything"
create_label "priority:p1" "ff9800" "High - Do this sprint"
create_label "priority:p2" "fbca04" "Medium - Do soon"
create_label "priority:p3" "cccccc" "Low - Do eventually"
echo ""

echo "Creating Size Labels..."
echo "-----------------------"
create_label "size:xs" "c5def5" "Extra small (< 1 hour)"
create_label "size:s" "bfe5bf" "Small (1-4 hours)"
create_label "size:m" "fef2c0" "Medium (1 day)"
create_label "size:l" "fbca04" "Large (2-3 days)"
create_label "size:xl" "d93f0b" "Extra large (> 3 days)"
echo ""

echo "================================"
echo "✅ Label setup complete!"
echo ""
echo "Labels created/updated:"
echo "  • 5 status labels (workflow progression)"
echo "  • 4 type labels (issue classification)"
echo "  • 4 priority labels (importance)"
echo "  • 5 size labels (estimation)"
echo ""
echo "Total: 18 labels"
echo ""
echo "View all labels: gh label list"
echo "================================"
