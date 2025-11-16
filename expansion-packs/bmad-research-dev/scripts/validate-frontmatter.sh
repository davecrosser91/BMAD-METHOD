#!/bin/bash
# validate-frontmatter.sh - Validate frontmatter in markdown documents
# Usage: ./validate-frontmatter.sh <markdown-file> OR ./validate-frontmatter.sh --all

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Required frontmatter fields
REQUIRED_FIELDS=("type" "title" "status" "created")

# Optional frontmatter fields
OPTIONAL_FIELDS=("id" "updated" "github_issue" "tags" "authors" "related_docs" "hypothesis" "methodology")

# Valid status values
VALID_STATUS=("draft" "active" "completed" "archived")

# Valid document types
VALID_TYPES=("research-proposal" "literature-review" "experiment-spec" "analysis-report" "prd" "architecture" "api-docs" "paper")

# Validate a single file
validate_file() {
    local file="$1"
    local errors=0

    echo "Validating: $file"

    # Check if file exists
    if [ ! -f "$file" ]; then
        echo -e "  ${RED}✗ File does not exist${NC}"
        return 1
    fi

    # Extract frontmatter (between --- markers)
    local frontmatter=$(sed -n '/^---$/,/^---$/p' "$file" | sed '1d;$d')

    if [ -z "$frontmatter" ]; then
        echo -e "  ${RED}✗ No frontmatter found${NC}"
        return 1
    fi

    # Check required fields
    for field in "${REQUIRED_FIELDS[@]}"; do
        if ! echo "$frontmatter" | grep -q "^${field}:"; then
            echo -e "  ${RED}✗ Missing required field: ${field}${NC}"
            ((errors++))
        else
            echo -e "  ${GREEN}✓ Found required field: ${field}${NC}"
        fi
    done

    # Validate status value
    local status=$(echo "$frontmatter" | grep "^status:" | sed 's/status: *//' | tr -d ' ')
    if [ -n "$status" ]; then
        local valid=false
        for valid_status in "${VALID_STATUS[@]}"; do
            if [ "$status" = "$valid_status" ]; then
                valid=true
                break
            fi
        done
        if [ "$valid" = false ]; then
            echo -e "  ${YELLOW}⚠ Invalid status value: $status (valid: ${VALID_STATUS[*]})${NC}"
            ((errors++))
        else
            echo -e "  ${GREEN}✓ Valid status: $status${NC}"
        fi
    fi

    # Validate type value
    local type=$(echo "$frontmatter" | grep "^type:" | sed 's/type: *//' | tr -d ' ')
    if [ -n "$type" ]; then
        local valid=false
        for valid_type in "${VALID_TYPES[@]}"; do
            if [ "$type" = "$valid_type" ]; then
                valid=true
                break
            fi
        done
        if [ "$valid" = false ]; then
            echo -e "  ${YELLOW}⚠ Invalid type value: $type (valid: ${VALID_TYPES[*]})${NC}"
            ((errors++))
        else
            echo -e "  ${GREEN}✓ Valid type: $type${NC}"
        fi
    fi

    # Validate date format (YYYY-MM-DD)
    local created=$(echo "$frontmatter" | grep "^created:" | sed 's/created: *//')
    if [ -n "$created" ]; then
        if [[ $created =~ ^[0-9]{4}-[0-9]{2}-[0-9]{2}$ ]]; then
            echo -e "  ${GREEN}✓ Valid date format: $created${NC}"
        else
            echo -e "  ${YELLOW}⚠ Invalid date format: $created (expected: YYYY-MM-DD)${NC}"
            ((errors++))
        fi
    fi

    if [ $errors -eq 0 ]; then
        echo -e "${GREEN}✓ Validation passed${NC}\n"
        return 0
    else
        echo -e "${RED}✗ Validation failed with $errors errors${NC}\n"
        return 1
    fi
}

# Main script
if [ $# -eq 0 ]; then
    echo -e "${RED}Error: Missing argument${NC}"
    echo "Usage: $0 <markdown-file>"
    echo "   Or: $0 --all  (validate all research documents)"
    exit 1
fi

if [ "$1" = "--all" ]; then
    echo "Validating all research documents..."
    echo ""

    total_files=0
    failed_files=0

    # Find all markdown files in docs/research/
    while IFS= read -r file; do
        ((total_files++))
        if ! validate_file "$file"; then
            ((failed_files++))
        fi
    done < <(find docs/research -name "*.md" 2>/dev/null || true)

    echo "================================"
    echo "Total files validated: $total_files"
    if [ $failed_files -eq 0 ]; then
        echo -e "${GREEN}All files passed validation!${NC}"
        exit 0
    else
        echo -e "${RED}Failed files: $failed_files${NC}"
        exit 1
    fi
else
    # Validate single file
    validate_file "$1"
fi
