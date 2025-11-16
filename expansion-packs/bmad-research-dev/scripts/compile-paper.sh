#!/bin/bash
# compile-paper.sh - Compile LaTeX paper in research-paper/ directory
# Usage: ./compile-paper.sh [clean|watch]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Paper directory
PAPER_DIR="research-paper"
MAIN_FILE="main.tex"

# Check if paper directory exists
if [ ! -d "$PAPER_DIR" ]; then
    echo -e "${RED}Error: Paper directory not found: $PAPER_DIR${NC}"
    echo "Initialize paper first with: @paper-writer *init-paper <venue>"
    exit 1
fi

# Check if main.tex exists
if [ ! -f "$PAPER_DIR/$MAIN_FILE" ]; then
    echo -e "${RED}Error: Main LaTeX file not found: $PAPER_DIR/$MAIN_FILE${NC}"
    exit 1
fi

cd "$PAPER_DIR"

# Function to compile paper
compile() {
    echo -e "${GREEN}Compiling paper...${NC}"

    # Run pdflatex first time
    echo "Pass 1: pdflatex..."
    pdflatex -interaction=nonstopmode "$MAIN_FILE" > /dev/null || {
        echo -e "${RED}Error: pdflatex failed. Check the log file.${NC}"
        tail -n 50 main.log
        exit 1
    }

    # Run bibtex if .bib file exists
    if [ -f "bibliography.bib" ] || [ -f "references.bib" ]; then
        echo "Running bibtex..."
        bibtex main > /dev/null || {
            echo -e "${YELLOW}Warning: bibtex had issues (this is often OK)${NC}"
        }
    fi

    # Run pdflatex second time (for references)
    echo "Pass 2: pdflatex..."
    pdflatex -interaction=nonstopmode "$MAIN_FILE" > /dev/null || {
        echo -e "${RED}Error: pdflatex failed. Check the log file.${NC}"
        tail -n 50 main.log
        exit 1
    }

    # Run pdflatex third time (for citations)
    echo "Pass 3: pdflatex..."
    pdflatex -interaction=nonstopmode "$MAIN_FILE" > /dev/null || {
        echo -e "${RED}Error: pdflatex failed. Check the log file.${NC}"
        tail -n 50 main.log
        exit 1
    }

    echo -e "${GREEN}✓ Paper compiled successfully!${NC}"
    echo ""
    echo "Output: $PAPER_DIR/main.pdf"
    echo ""

    # Check for warnings
    if grep -q "LaTeX Warning" main.log; then
        echo -e "${YELLOW}⚠ Warnings found in log file:${NC}"
        grep "LaTeX Warning" main.log | head -n 10
        echo ""
    fi

    # Check for undefined references
    if grep -q "undefined" main.log; then
        echo -e "${YELLOW}⚠ Undefined references found:${NC}"
        grep "undefined" main.log | grep -v "LaTeX Warning"
        echo ""
    fi
}

# Function to clean auxiliary files
clean() {
    echo -e "${GREEN}Cleaning auxiliary files...${NC}"
    rm -f *.aux *.log *.out *.bbl *.blg *.toc *.lof *.lot *.fls *.fdb_latexmk *.synctex.gz
    echo -e "${GREEN}✓ Cleaned${NC}"
}

# Main script logic
case "${1:-compile}" in
    clean)
        clean
        ;;
    watch)
        echo "Watch mode: compiling on file changes..."
        echo "Press Ctrl+C to stop"
        echo ""

        # Initial compile
        compile

        # Watch for changes (requires fswatch or inotifywait)
        if command -v fswatch >/dev/null 2>&1; then
            fswatch -o . | while read; do
                echo ""
                echo "Detected change, recompiling..."
                compile
            done
        else
            echo -e "${YELLOW}Warning: fswatch not installed. Install with:${NC}"
            echo "  macOS: brew install fswatch"
            echo "  Linux: apt-get install inotify-tools"
            exit 1
        fi
        ;;
    *)
        compile
        ;;
esac

cd - > /dev/null
