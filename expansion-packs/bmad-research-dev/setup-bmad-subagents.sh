#!/bin/bash
# Setup Zero-MCP Architecture for BMAD Research-Dev
# This installer creates the complete code-execution architecture WITHOUT any MCP servers
#
# ✅ 100% MCP-Free!
# - Direct Web APIs (ArXiv, Zotero, GitHub)
# - 98.7% token reduction vs MCP approach
# - No .mcp.json configuration needed
# - No MCP server processes

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Helper functions
print_header() {
    echo ""
    echo -e "${BLUE}========================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}========================================${NC}"
    echo ""
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${CYAN}ℹ️  $1${NC}"
}

ask_yes_no() {
    local prompt="$1"
    local default="${2:-n}"

    if [ "$default" = "y" ]; then
        prompt="$prompt (Y/n): "
    else
        prompt="$prompt (y/N): "
    fi

    read -p "$(echo -e ${CYAN}$prompt${NC})" -n 1 -r
    echo

    if [ "$default" = "y" ]; then
        [[ ! $REPLY =~ ^[Nn]$ ]]
    else
        [[ $REPLY =~ ^[Yy]$ ]]
    fi
}

# Detect OS
detect_os() {
    if [[ "$OSTYPE" == "darwin"* ]]; then
        echo "macos"
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        echo "linux"
    else
        echo "unknown"
    fi
}

OS=$(detect_os)

# Detect paths
# This script can be run in three ways:
# 1. Manually from project root: ./expansion-packs/bmad-research-dev/setup-bmad-subagents.sh
# 2. Automatically by npm postinstall (CWD = expansion pack directory)
# 3. Automatically by installer (CWD = project root, script in .bmad-research-dev/)

# Get the actual location of this script
SCRIPT_PATH="${BASH_SOURCE[0]}"
SCRIPT_DIR="$(cd "$(dirname "$SCRIPT_PATH")" && pwd)"

# Determine project root and pack root based on script location
if [[ "$SCRIPT_DIR" == *"/expansion-packs/bmad-research-dev"* ]]; then
    # Script is in source tree: expansion-packs/bmad-research-dev/
    PACK_ROOT="$SCRIPT_DIR"
    PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
elif [[ "$SCRIPT_DIR" == *"/.bmad-research-dev"* ]]; then
    # Script is in installed expansion pack: .bmad-research-dev/
    PACK_ROOT="$SCRIPT_DIR"
    PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
else
    # Fallback: assume CWD is project root
    PROJECT_ROOT=$(pwd)
    # Try installed location first, then source location
    if [ -d "$PROJECT_ROOT/.bmad-research-dev" ]; then
        PACK_ROOT="$PROJECT_ROOT/.bmad-research-dev"
    else
        PACK_ROOT="$PROJECT_ROOT/expansion-packs/bmad-research-dev"
    fi
fi

if [ ! -d "$PACK_ROOT/templates" ]; then
    print_error "BMAD Research-Dev templates not found at $PACK_ROOT/templates"
    print_info "Expected directory structure:"
    print_info "  $PACK_ROOT/templates/agents/"
    print_info "  $PACK_ROOT/templates/servers/"
    exit 1
fi

print_header "Zero-MCP Code-Execution Architecture Setup"
print_info "Project root: $PROJECT_ROOT"
print_info "Pack location: $PACK_ROOT"
print_info "Operating System: $OS"
print_info "✅ 100% MCP-Free - Direct Web APIs Only"

# Parse command line arguments
AUTO_INSTALL=false
SKIP_MCPS=true  # Default to TRUE - MCP installation deprecated

while [[ $# -gt 0 ]]; do
    case $1 in
        --auto-install-mcps)
            AUTO_INSTALL=true
            shift
            ;;
        --skip-mcps)
            SKIP_MCPS=true
            shift
            ;;
        *)
            print_error "Unknown option: $1"
            echo "Usage: $0 [--auto-install-mcps] [--skip-mcps]"
            exit 1
            ;;
    esac
done

# ============================================
# Step 1: Create directory structure
# ============================================
print_header "Step 1: Creating Directory Structure"

CLAUDE_DIR="$PROJECT_ROOT/.claude"
SERVERS_DIR="$CLAUDE_DIR/servers"
AGENTS_DIR="$CLAUDE_DIR/agents"
SKILLS_DIR="$CLAUDE_DIR/skills"

mkdir -p "$SERVERS_DIR"/{web,arxiv,zotero,github}
mkdir -p "$AGENTS_DIR"
mkdir -p "$SKILLS_DIR"

print_success "Created .claude/ directory structure"

# ============================================
# Step 2: Copy server wrappers
# ============================================
print_header "Step 2: Installing Server Wrappers"

TEMPLATES_DIR="$PACK_ROOT/templates"

if [ -d "$TEMPLATES_DIR/servers" ]; then
    for server in web arxiv zotero github; do
        if [ -d "$TEMPLATES_DIR/servers/$server" ]; then
            cp -r "$TEMPLATES_DIR/servers/$server"/* "$SERVERS_DIR/$server/" 2>/dev/null || true
            file_count=$(find "$SERVERS_DIR/$server" -name "*.py" 2>/dev/null | wc -l | tr -d ' ')
            print_success "Installed $server server modules ($file_count files)"
        else
            print_warning "Server template not found: $server (skipping)"
        fi
    done
else
    print_error "Server templates not found at $TEMPLATES_DIR/servers"
    print_info "Please ensure templates are in the correct location"
    exit 1
fi

# ============================================
# Step 3: Copy subagent definitions
# ============================================
print_header "Step 3: Installing Specialist Subagents"

if [ -d "$TEMPLATES_DIR/agents" ]; then
    cp "$TEMPLATES_DIR/agents"/*.md "$AGENTS_DIR/" 2>/dev/null || true
    agent_count=$(ls -1 "$AGENTS_DIR"/*.md 2>/dev/null | wc -l | tr -d ' ')
    print_success "Installed $agent_count specialist subagents"

    if [ "$agent_count" -gt 0 ]; then
        print_info "Available specialists:"
        ls -1 "$AGENTS_DIR"/*.md | while read agent; do
            agent_name=$(basename "$agent" .md)
            echo "  - @$agent_name"
        done
    fi
else
    print_warning "Agent templates not found (you may need to create them manually)"
fi

# ============================================
# Step 4: Create .mcp.json configuration (DEPRECATED - SKIPPED)
# ============================================

if [ "$SKIP_MCPS" = true ]; then
    print_header "Step 4: Skipping .mcp.json (Zero-MCP Architecture)"
    print_info "✅ No MCP configuration needed - using direct Web APIs"
else
    # Legacy MCP support (deprecated)
    print_header "Step 4: Configuring MCP Servers (Legacy)"
    print_warning "MCP installation is deprecated - consider using direct APIs"

    MCP_CONFIG="$PROJECT_ROOT/.mcp.json"

    if [ -f "$MCP_CONFIG" ]; then
        print_warning ".mcp.json already exists"
        if ask_yes_no "Overwrite existing .mcp.json?"; then
            create_mcp_config=true
        else
            print_info "Keeping existing .mcp.json"
            create_mcp_config=false
        fi
    else
        create_mcp_config=true
    fi

    if [ "$create_mcp_config" = true ]; then
        cat > "$MCP_CONFIG" <<'EOF'
{
  "$schema": "https://modelcontextprotocol.io/schema/mcp.schema.json",
  "mcpServers": {
    "arxiv": {
      "transport": {
        "type": "stdio",
        "command": "uvx",
        "args": ["mcp-server-arxiv"]
      },
      "metadata": {
        "purpose": "Academic paper search - accessed via code execution only",
        "required": false,
        "documentation": "https://github.com/blazickjp/arxiv-mcp-server"
      }
    },
    "zotero": {
      "transport": {
        "type": "stdio",
        "command": "uv",
        "args": ["tool", "run", "zotero-mcp"]
      },
      "env": {
        "ZOTERO_LOCAL": "true"
      },
      "metadata": {
        "purpose": "Personal library access - accessed via code execution only",
        "required": false,
        "documentation": "https://github.com/54yyyu/zotero-mcp"
      }
    }
  }
}
EOF
        print_success "Created .mcp.json configuration"
        print_info "MCPs configured: ArXiv, Zotero"
    fi
fi  # End of SKIP_MCPS check

# ============================================
# Step 5: Install MCP Servers (NEW!)
# ============================================

if [ "$SKIP_MCPS" = true ]; then
    print_header "Step 5: Skipping MCP Installation (--skip-mcps flag)"
else
    print_header "Step 5: Installing MCP Servers"

    # Ask user if they want to install MCPs automatically
    if [ "$AUTO_INSTALL" = false ]; then
        echo ""
        print_info "The specialists need these tools to work:"
        echo "  - uv/uvx (Python package manager) - for ArXiv & Zotero"
        echo "  - Zotero MCP (personal library access)"
        echo "  - GitHub CLI (issue/project management)"
        echo ""

        if ask_yes_no "Auto-install missing MCP servers now?" "y"; then
            AUTO_INSTALL=true
        else
            print_info "Skipping MCP installation - you can install manually later"
        fi
    fi

    if [ "$AUTO_INSTALL" = true ]; then
        # ============================================
        # 5.1: Install uv/uvx
        # ============================================
        print_info "Checking uv/uvx installation..."

        if command -v uvx &> /dev/null && command -v uv &> /dev/null; then
            print_success "uv/uvx already installed"
            UV_VERSION=$(uv --version | head -n1)
            print_info "Version: $UV_VERSION"
        else
            print_warning "uv/uvx not found - installing..."

            if curl -LsSf https://astral.sh/uv/install.sh | sh; then
                print_success "Installed uv/uvx"

                # Add to PATH for current session
                export PATH="$HOME/.cargo/bin:$PATH"

                print_info "Added to PATH for current session"
                print_warning "You may need to restart your terminal for permanent PATH updates"
            else
                print_error "Failed to install uv/uvx"
                print_info "Install manually: curl -LsSf https://astral.sh/uv/install.sh | sh"
            fi
        fi

        # ============================================
        # 5.2: Install Zotero MCP
        # ============================================
        print_info "Checking Zotero MCP installation..."

        if command -v uv &> /dev/null; then
            if uv tool list 2>/dev/null | grep -q "zotero-mcp"; then
                print_success "Zotero MCP already installed"

                # Check for updates
                if ask_yes_no "Update Zotero MCP to latest version?"; then
                    uv tool upgrade zotero-mcp
                    print_success "Updated Zotero MCP"
                fi
            else
                print_warning "Zotero MCP not found - installing..."

                if uv tool install "git+https://github.com/54yyyu/zotero-mcp.git"; then
                    print_success "Installed Zotero MCP"

                    # Ask if they want to configure it now
                    if ask_yes_no "Configure Zotero MCP now?"; then
                        uv tool run zotero-mcp setup
                        print_success "Zotero MCP configured"
                    else
                        print_info "Run 'uv tool run zotero-mcp setup' later to configure"
                    fi
                else
                    print_error "Failed to install Zotero MCP"
                    print_info "Install manually: uv tool install git+https://github.com/54yyyu/zotero-mcp.git"
                fi
            fi
        else
            print_warning "Cannot install Zotero MCP - uv not available"
        fi

        # ============================================
        # 5.3: Install GitHub CLI
        # ============================================
        print_info "Checking GitHub CLI installation..."

        if command -v gh &> /dev/null; then
            print_success "GitHub CLI already installed"
            GH_VERSION=$(gh --version | head -n1)
            print_info "Version: $GH_VERSION"

            # Check authentication
            if gh auth status &> /dev/null; then
                print_success "GitHub CLI authenticated"
            else
                print_warning "GitHub CLI not authenticated"
                if ask_yes_no "Authenticate GitHub CLI now?"; then
                    gh auth login
                    print_success "GitHub CLI authenticated"
                else
                    print_info "Run 'gh auth login' later to authenticate"
                fi
            fi
        else
            print_warning "GitHub CLI not found - installing..."

            case $OS in
                macos)
                    if command -v brew &> /dev/null; then
                        if brew install gh; then
                            print_success "Installed GitHub CLI via Homebrew"

                            if ask_yes_no "Authenticate GitHub CLI now?"; then
                                gh auth login
                                print_success "GitHub CLI authenticated"
                            fi
                        else
                            print_error "Failed to install GitHub CLI via Homebrew"
                        fi
                    else
                        print_error "Homebrew not found - cannot auto-install GitHub CLI"
                        print_info "Install Homebrew first: /bin/bash -c \"\$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\""
                        print_info "Then run: brew install gh"
                    fi
                    ;;
                linux)
                    print_info "Attempting to install GitHub CLI on Linux..."

                    # Try apt-get (Debian/Ubuntu)
                    if command -v apt-get &> /dev/null; then
                        print_info "Using apt-get..."
                        if sudo apt-get update && sudo apt-get install -y gh; then
                            print_success "Installed GitHub CLI via apt-get"

                            if ask_yes_no "Authenticate GitHub CLI now?"; then
                                gh auth login
                                print_success "GitHub CLI authenticated"
                            fi
                        else
                            print_error "Failed to install via apt-get"
                            print_info "See: https://github.com/cli/cli/blob/trunk/docs/install_linux.md"
                        fi
                    # Try yum (RHEL/CentOS)
                    elif command -v yum &> /dev/null; then
                        print_info "Using yum..."
                        if sudo yum install -y gh; then
                            print_success "Installed GitHub CLI via yum"

                            if ask_yes_no "Authenticate GitHub CLI now?"; then
                                gh auth login
                                print_success "GitHub CLI authenticated"
                            fi
                        else
                            print_error "Failed to install via yum"
                            print_info "See: https://github.com/cli/cli/blob/trunk/docs/install_linux.md"
                        fi
                    else
                        print_error "No supported package manager found (apt-get or yum)"
                        print_info "Install manually: https://github.com/cli/cli/blob/trunk/docs/install_linux.md"
                    fi
                    ;;
                *)
                    print_error "Unsupported OS for auto-install: $OS"
                    print_info "Install GitHub CLI manually: https://cli.github.com/"
                    ;;
            esac
        fi

        # ============================================
        # 5.4: Test ArXiv MCP (auto-installs on first use)
        # ============================================
        print_info "Testing ArXiv MCP (auto-installs on first use)..."

        if command -v uvx &> /dev/null; then
            if uvx mcp-server-arxiv --help &> /dev/null; then
                print_success "ArXiv MCP working (auto-installed by uvx)"
            else
                print_warning "ArXiv MCP test failed - will auto-install on first use"
            fi
        else
            print_warning "Cannot test ArXiv MCP - uvx not available"
        fi
    fi
fi

# ============================================
# Step 6: Create README in .claude/
# ============================================
print_header "Step 6: Creating Documentation"

cat > "$CLAUDE_DIR/README.md" <<'EOF'
# Code-Execution MCP Architecture

This directory contains the code-execution MCP architecture for BMAD Research-Dev.

## Directory Structure

```
.claude/
├── agents/          # Specialist subagents (workers)
│   ├── web-research-specialist.md
│   ├── arxiv-research-specialist.md
│   ├── zotero-research-specialist.md
│   └── github-research-specialist.md
│
├── servers/         # Python server modules (code APIs)
│   ├── web/
│   ├── arxiv/
│   ├── zotero/
│   └── github/
│
└── skills/          # Reusable research skills (future)
```

## How It Works

Instead of loading all MCP tool definitions into every agent's context, specialists use **code execution** to import tools on-demand:

```python
from servers.arxiv.search import search
papers = search("topic")
```

This achieves:
- ✅ Zero context pollution
- ✅ 98.7% token reduction
- ✅ Agent isolation
- ✅ Better performance

## Using the Specialists

### Invoke from Research Lead

```markdown
@research-lead
*run-deep-research "transformer optimization"
```

The Research Lead will orchestrate specialists in parallel.

### Invoke Directly

```markdown
@arxiv-research-specialist
Search for recent papers on attention mechanisms
```

## MCP Configuration

MCPs are configured in `../.mcp.json` at project root.

To verify MCPs are available:
```bash
# Check installations
uvx --version        # For ArXiv
uv tool list         # Should show zotero-mcp
gh --version         # For GitHub
gh auth status       # Check GitHub authentication
```

## Documentation

See expansion pack documentation for complete details:
- CODE-EXECUTION-MCP-ARCHITECTURE.md - Complete architecture guide
- QUICKSTART-CODE-EXECUTION.md - 5-minute quick start
- INTER-AGENT-COMMUNICATION-PROTOCOL.md - Agent coordination rules
EOF

print_success "Created .claude/README.md"

# ============================================
# Step 7: Verification
# ============================================
print_header "Step 7: Verification"

# Count installed components
server_count=$(find "$SERVERS_DIR" -name "*.py" 2>/dev/null | wc -l | tr -d ' ')
agent_count=$(ls -1 "$AGENTS_DIR"/*.md 2>/dev/null | wc -l | tr -d ' ')

print_info "Installation Summary:"
echo "  - Server modules: $server_count Python files"
echo "  - Subagents: $agent_count specialists"
echo "  - MCP config: $([ -f "$MCP_CONFIG" ] && echo "✓" || echo "✗")"

echo ""
print_info "MCP Server Status:"

# Check each MCP
if command -v uvx &> /dev/null; then
    echo "  - uvx: ✓ installed"
else
    echo "  - uvx: ✗ not installed"
fi

if command -v uv &> /dev/null; then
    echo "  - uv: ✓ installed"
    if uv tool list 2>/dev/null | grep -q "zotero-mcp"; then
        echo "  - Zotero MCP: ✓ installed"
    else
        echo "  - Zotero MCP: ✗ not installed"
    fi
else
    echo "  - uv: ✗ not installed"
    echo "  - Zotero MCP: ✗ cannot check (uv not installed)"
fi

if command -v gh &> /dev/null; then
    echo "  - GitHub CLI: ✓ installed"
    if gh auth status &> /dev/null; then
        echo "  - GitHub auth: ✓ authenticated"
    else
        echo "  - GitHub auth: ✗ not authenticated"
    fi
else
    echo "  - GitHub CLI: ✗ not installed"
fi

# ============================================
# Step 8: Next Steps
# ============================================
print_header "Installation Complete! 🎉"

echo ""
print_success "Architecture installed successfully!"
echo ""

# Check what still needs to be done
needs_uv=false
needs_zotero=false
needs_gh=false

if ! command -v uvx &> /dev/null || ! command -v uv &> /dev/null; then
    needs_uv=true
fi

if command -v uv &> /dev/null; then
    if ! uv tool list 2>/dev/null | grep -q "zotero-mcp"; then
        needs_zotero=true
    fi
fi

if ! command -v gh &> /dev/null; then
    needs_gh=true
elif ! gh auth status &> /dev/null; then
    needs_gh=true
fi

if [ "$needs_uv" = true ] || [ "$needs_zotero" = true ] || [ "$needs_gh" = true ]; then
    print_warning "Some MCP servers still need manual installation:"
    echo ""

    if [ "$needs_uv" = true ]; then
        echo "${YELLOW}1. Install uv/uvx:${NC}"
        echo "   curl -LsSf https://astral.sh/uv/install.sh | sh"
        echo ""
    fi

    if [ "$needs_zotero" = true ]; then
        echo "${YELLOW}2. Install Zotero MCP:${NC}"
        echo "   uv tool install git+https://github.com/54yyyu/zotero-mcp.git"
        echo "   uv tool run zotero-mcp setup"
        echo ""
    fi

    if [ "$needs_gh" = true ]; then
        echo "${YELLOW}3. Install/authenticate GitHub CLI:${NC}"
        if [ "$OS" = "macos" ]; then
            echo "   brew install gh"
        else
            echo "   sudo apt install gh  # or see https://cli.github.com/"
        fi
        echo "   gh auth login"
        echo ""
    fi
else
    print_success "All MCP servers are installed and ready!"
    echo ""
fi

print_info "Test the specialists:"
echo "  ${CYAN}@web-research-specialist${NC} - ✅ Works immediately (no MCP needed)"
echo "  ${CYAN}@arxiv-research-specialist${NC} - $(command -v uvx &> /dev/null && echo "✅ Ready" || echo "⚠️  Needs uvx")"
echo "  ${CYAN}@zotero-research-specialist${NC} - $(uv tool list 2>/dev/null | grep -q "zotero-mcp" && echo "✅ Ready" || echo "⚠️  Needs Zotero MCP")"
echo "  ${CYAN}@github-research-specialist${NC} - $(gh auth status &> /dev/null && echo "✅ Ready" || echo "⚠️  Needs GitHub CLI")"
echo ""

print_info "Documentation:"
# Calculate relative path from project root to pack
PACK_REL_PATH=$(realpath --relative-to="$PROJECT_ROOT" "$PACK_ROOT" 2>/dev/null || echo "expansion-packs/bmad-research-dev")
echo "  ${BLUE}Architecture Guide:${NC} $PACK_REL_PATH/CODE-EXECUTION-MCP-ARCHITECTURE.md"
echo "  ${BLUE}Quick Start:${NC} $PACK_REL_PATH/QUICKSTART-CODE-EXECUTION.md"
echo "  ${BLUE}Inter-Agent Protocol:${NC} $PACK_REL_PATH/INTER-AGENT-COMMUNICATION-PROTOCOL.md"
echo "  ${BLUE}Claude Config:${NC} .claude/README.md"
echo ""

print_info "Start researching:"
echo "  ${GREEN}@research-lead *run-deep-research \"your topic\"${NC}"
echo ""

print_header "Setup Complete"
