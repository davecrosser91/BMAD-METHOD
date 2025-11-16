# BMAD Core - GitHub Edition (Research)

**Version:** 2.5.1
**Status:** Research/Experimental
**Last Updated:** 2025-11-16

> **Research version of BMAD Method implementation using GitHub Issues, Milestones, and native GitHub workflows. No external dependencies required.**

---

## 🎯 What is BMAD-Core-GitHub-Research?

**BMAD-Core-GitHub-Research** is a research/experimental version of the complete AI-powered software development framework that orchestrates specialized AI agents through the entire Software Development Life Cycle (SDLC) using **GitHub as the backbone**.

### Key Features

✅ **GitHub-Native Task Management**

- Milestones = Epics
- Issues = User Stories
- Labels = Status tracking (backlog, todo, doing, review, done)
- Pull Requests = Implementation + Code Review

✅ **9 Specialized AI Agents**

- Analyst, PM, Architect, Developer, QA, Scrum Master, Product Owner, Dev Team Lead, UX Expert

✅ **Documents in Git**

- All docs as markdown in `docs/` folder
- Full Git version control
- PR-based document reviews

✅ **Automated QA**

- AI-powered code review on every PR
- Automatic status transitions
- Pass/Fail verdicts with detailed feedback

✅ **Parallel Execution**

- Wave-based parallel development
- 3-5x faster than sequential
- Dependency-aware orchestration

✅ **No External Dependencies**

- Just GitHub + Git + GitHub CLI
- Optional: Archon MCP for semantic search (user adds separately)

---

## 🚀 Quick Start

### Prerequisites

1. **GitHub Account** with a repository
2. **GitHub CLI** (`gh`) installed and authenticated
3. **Git** installed

### Installation

```bash
# 1. Clone or navigate to your project
cd your-project

# 2. Install GitHub CLI (if not already installed)
# macOS:
brew install gh

# Linux:
sudo apt install gh

# Windows:
winget install GitHub.cli

# 3. Authenticate GitHub CLI
gh auth login

# 4. Initialize BMAD-GitHub-Research in your project
# Copy the expansion pack to your project root
cp -r /path/to/bmad-method/expansion-packs/bmad-core-github-research .bmad-core-github-research

# 5. Setup GitHub labels
.bmad-core-github-research/scripts/setup-labels.sh

# 6. Copy GitHub Actions workflows
mkdir -p .github/workflows
cp .bmad-core-github-research/workflows/*.yml .github/workflows/

# 7. Copy issue templates
mkdir -p .github/ISSUE_TEMPLATE
cp .bmad-core-github-research/issue-templates/*.yml .github/ISSUE_TEMPLATE/

# 8. Create docs folder structure
mkdir -p docs/{prd,architecture,specs,guides,notes}

# 9. Git commit the setup
git add .
git commit -m "chore: Initialize BMAD-Core-GitHub v1.0"
git push
```

### ✨ Or Use the Setup Assistant (Recommended!)

We've created a dedicated **Setup Assistant agent** that guides you through the entire GitHub-specific setup with explanations:

```bash
# In Claude Code or your IDE
"Please act as the Setup Assistant from .bmad-core-github-research/agents/setup-assistant.md"

Alex: 👋 Hi! I'm Alex, your Setup Assistant.
      I'll guide you through the BMAD-Core-GitHub-Research setup step by step!

# Run the complete setup wizard
"*setup"

# Or check what's already configured
"*check-status"

# Or verify everything is working
"*verify"
```

The Setup Assistant will:

- ✅ Check prerequisites (GitHub CLI, authentication, git repo)
- ✅ Guide you through label creation with explanations
- ✅ Help set up automated QA (optional)
- ✅ Create documentation folders
- ✅ Verify everything is configured correctly
- ✅ Explain why each step matters

**This is the easiest way to get started!**

---

## 📋 Complete Workflow Example

### Phase 1: Requirements & Planning

**Step 1: Activate Analyst**

```bash
# In Claude Code
User: "Please act as the Analyst agent from .bmad-core-github-research/agents/analyst.md"

Emma: Hi! I'm Emma, the Business Analyst. 📊
      Available commands: *help, *brainstorm, *create-project-brief

User: "*create-project-brief"

Emma: [Elicits information about the project...]
      ✅ Created: docs/notes/project-brief-myproject.md
      ✅ Issue #1 created for tracking

      Next: Activate PM agent to create PRD
```

**Step 2: Activate PM**

```bash
User: "Please act as the PM agent from .bmad-core-github-research/agents/pm.md"

John: Hi! I'm John, the Product Manager. 📋
      ✅ Found project brief: docs/notes/project-brief-myproject.md

User: "*create-prd"

John: [Creates PRD...]
      ✅ Created: docs/prd/myproject-prd.md

      Create epics? (yes/no)

User: "yes"

John: ✅ Created 4 epics (GitHub Milestones)
      ✅ Created 20 user stories (GitHub Issues)

      Next: Activate Architect to add dependencies
```

**Step 3: Activate Architect**

```bash
User: "Please act as the Architect agent from .bmad-core-github-research/agents/architect.md"

Sarah: Hi! I'm Sarah, the Software Architect. 🏗️
       ✅ PRD found
       ✅ 4 epics, 20 stories found

User: "*create-architecture"

Sarah: [Creates architecture document...]
       ✅ Created: docs/architecture/myproject-architecture.md

       Add dependencies to stories? (yes/no)

User: "yes"

Sarah: Analyzing 20 stories...
       ✅ Found 4 waves
       ✅ Added dependencies to all stories

       Wave 1: 5 tasks (no dependencies)
       Wave 2: 8 tasks (depend on Wave 1)
       Wave 3: 6 tasks (depend on Wave 2)
       Wave 4: 1 task (E2E tests)
```

### Phase 2: Sprint Planning

**Step 4: Activate Scrum Master**

```bash
User: "Please act as the SM agent from .bmad-core-github-research/agents/sm.md"

Bob: Hi! I'm Bob, the Scrum Master. 🏃

     📊 Project Status:
     • 4 epics, 20 stories
     • Progress: 0% (0/20 done)

User: "*sprint-planning"

Bob: Let's plan the sprint!

     Team capacity: 120 hours (3 devs × 40h)

     Recommended stories (sorted by priority):
     1. #101: Create User model (4h, P1)
     2. #102: Setup migrations (2h, P1)
     ...

     Select stories (comma-separated or 'auto'):

User: "auto"

Bob: ✅ Selected 8 stories (40 hours)
     ✅ Moved to 'todo' status

     Sprint planned! Ready for development.
```

### Phase 3: Development

**Step 5: Activate Developer**

```bash
User: "Please act as the Dev agent from .bmad-core-github-research/agents/dev.md"

James: Hi! I'm James, the Developer. 💻

User: "*next-task"

James: 📋 Next task: #101: Create User model
       Dependencies: ✅ All met (Wave 1)
       Ready to start? (yes/no)

User: "yes"

James: ✅ Status: todo → doing
       🌿 Branch: feature/issue-101-user-model

       [Implements feature...]

       ✅ Implementation complete
       🔀 PR #51 created
       🧪 Tests: 8 passed

       Status: doing → review

       Automated QA running...
```

**Step 6: Automated QA Review**

```bash
# GitHub Action runs automatically

QA Agent: Analyzing PR #51...
          ✅ All acceptance criteria met
          ✅ Tests passing (8/8)
          ✅ Code quality: Excellent

          Verdict: PASS ✅

          Approving PR #51...
```

**Step 7: Merge & Repeat**

```bash
User: gh pr merge 51 --squash

GitHub: ✅ Merged PR #51
        ✅ Closed issue #101
        ✅ Updated to status:done

        Epic progress: 1/5 (20%)
```

---

## 👥 Agent Reference

### 📊 Analyst (Emma)

**Role:** Requirements discovery, user research, project briefs

**Key Commands:**

- `*create-project-brief` - Create foundational project brief
- `*brainstorm {topic}` - Facilitate brainstorming session
- `*search-requirements {query}` - Search existing requirements

**Outputs:**

- `docs/notes/project-brief-{name}.md`
- `docs/notes/brainstorming/` sessions

---

### 📋 PM (John)

**Role:** Product management, PRDs, epics, user stories

**Key Commands:**

- `*create-prd` - Create Product Requirements Document
- `*create-epic {name}` - Create epic (GitHub Milestone)
- `*create-stories-for-epic {name}` - Create user stories (GitHub Issues)
- `*list-epics` - Show all epics with progress

**Outputs:**

- `docs/prd/{name}-prd.md`
- GitHub Milestones (Epics)
- GitHub Issues (User Stories)

---

### 🏗️ Architect (Sarah)

**Role:** System architecture, tech stack, dependencies

**Key Commands:**

- `*create-architecture` - Create system architecture document
- `*add-dependencies` - Add dependencies to user stories
- `*analyze-dependencies` - Visualize dependency graph
- `*create-adr {decision}` - Create Architecture Decision Record

**Outputs:**

- `docs/architecture/{name}-architecture.md`
- `docs/architecture/adrs/` folder
- Dependencies in issue descriptions

---

### 💻 Developer (James)

**Role:** Story implementation, code, tests, PRs

**Key Commands:**

- `*next-task` - Get next recommended task
- `*develop-task {issue-number}` - Implement specific story
- `*my-tasks` - Show my assigned tasks
- `*search-code {query}` - Search codebase for patterns

**Workflow:**

1. Updates issue status: `todo` → `doing`
2. Creates feature branch
3. Implements + writes tests
4. Creates PR (auto-updates status to `review`)

---

### 🧪 QA (Maria)

**Role:** Code review, testing, quality gates

**Key Commands:**

- `*review-queue` - Show all PRs/issues in review
- `*review-pr {pr-number}` - Manually review PR
- `*automated-reviews` - View recent automated QA reviews

**Verdicts:**

- ✅ **PASS** - Approve PR, ready to merge
- 🟡 **FAIL_MINOR** - Small issues, back to `doing`
- 🔴 **FAIL_MAJOR** - Wrong approach, back to `todo`

**Note:** Most reviews are automated via GitHub Actions

---

### 🏃 Scrum Master (Bob)

**Role:** Sprint planning, backlog management, metrics

**Key Commands:**

- `*project-status` - Complete project overview
- `*sprint-planning` - Plan next sprint
- `*refine-story {issue-number}` - Refine user story
- `*backlog-grooming` - Review and organize backlog
- `*burndown` - Show sprint burndown chart
- `*velocity` - Calculate team velocity
- `*blockers` - Show blocked stories
- `*retrospective` - Conduct sprint retrospective

---

### 👥 Product Owner (Lisa)

**Role:** Backlog prioritization, stakeholder management, ROI

**Key Commands:**

- `*prioritize-backlog` - Prioritize by business value
- `*stakeholder-review` - Prepare stakeholder review
- `*value-vs-effort` - Plot stories on value/effort matrix
- `*release-planning` - Plan release roadmap
- `*trade-off-analysis` - Analyze feature trade-offs

---

### 🎯 Dev Team Lead (Bob)

**Role:** Parallel execution orchestration, wave coordination

**Key Commands:**

- `*analyze-dependencies` - Create parallel execution plan
- `*execute-sprint` - Execute in-context (full visibility)
- `*execute-sprint-parallel` - Execute with parallel subagents (5x faster)
- `*show-progress` - Show current sprint progress
- `*configure-capacity` - Set team capacity

**Modes:**

- **In-Context** (default) - Work visible in chat
- **Parallel Subagents** (opt-in) - 5x faster, background execution

---

### 🎨 UX Expert (Rachel)

**Role:** User experience design, UI specifications

**Key Commands:**

- `*create-ui-spec` - Create UI specification document
- `*create-wireframes` - Create ASCII wireframes
- `*usability-test` - Create usability testing plan
- `*design-review` - Review UI implementation

**Outputs:**

- `docs/specs/ui-specification.md`
- `docs/specs/wireframes.md`

---

## 🎯 GitHub Integration Details

### Issue Labels (Auto-created)

**Status Labels** (mutually exclusive):

- `status:backlog` - Not yet scheduled
- `status:todo` - Ready to start
- `status:doing` - In development
- `status:review` - In PR review
- `status:done` - Completed

**Type Labels:**

- `type:story` - User story
- `type:task` - Technical task
- `type:bug` - Bug fix

**Priority Labels:**

- `priority:p0` - Critical
- `priority:p1` - High
- `priority:p2` - Medium
- `priority:p3` - Low

**Size Labels:**

- `size:xs` - < 1 hour
- `size:s` - 1-4 hours
- `size:m` - 4-8 hours
- `size:l` - 8-16 hours
- `size:xl` - > 16 hours

### Milestones (Epics)

GitHub Milestones represent Epics:

- Automatically track progress (X/Y done)
- Show completion percentage
- Can set due dates
- Filter issues by milestone

### Dependencies

Dependencies are marked in issue descriptions:

```markdown
## Dependencies

Depends on: #101, #102
Blocks: #105
```

Automated validation via GitHub Actions checks dependencies on issue create/edit.

---

## 🤖 Automated QA Setup

### 1. Install GitHub Action

File: `.github/workflows/automated-qa-review.yml`

```yaml
name: Automated BMAD QA Review

on:
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  automated-qa:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: write
      issues: write

    steps:
      - uses: actions/checkout@v4

      - name: Setup Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'

      - name: Install dependencies
        run: pip install anthropic pyyaml requests

      - name: Run QA Agent
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
          GH_TOKEN: ${{ github.token }}
        run: |
          python .bmad-core-github-research/scripts/automated-qa-agent.py \
            --pr-number "${{ github.event.pull_request.number }}" \
            --repo "${{ github.repository }}"
```

### 2. Add Anthropic API Key

```bash
# Add to GitHub repository secrets
gh secret set ANTHROPIC_API_KEY
# Paste your API key when prompted
```

### 3. Copy QA Script

```bash
cp .bmad-core-github-research/scripts/automated-qa-agent.py .bmad-core-github-research/scripts/
```

Now every PR gets automatic AI-powered QA review!

---

## 📊 Folder Structure

```
your-project/
├── .github/
│   ├── workflows/
│   │   ├── automated-qa-review.yml
│   │   ├── status-automation.yml
│   │   ├── pr-to-issue-sync.yml
│   │   └── qa-commands.yml
│   └── ISSUE_TEMPLATE/
│       ├── epic.yml
│       ├── user-story.yml
│       └── bug.yml
│
├── .bmad-core-github-research/
│   ├── agents/
│   │   ├── analyst.md
│   │   ├── pm.md
│   │   ├── architect.md
│   │   ├── dev.md
│   │   ├── qa.md
│   │   ├── sm.md
│   │   ├── po.md
│   │   ├── dev-team-lead.md
│   │   └── ux-expert.md
│   │
│   ├── scripts/
│   │   ├── gh_adapter.py
│   │   ├── automated-qa-agent.py
│   │   ├── setup-labels.sh
│   │   └── init-project.sh
│   │
│   ├── workflows/           # GitHub Actions templates
│   ├── issue-templates/     # Issue template files
│   └── config.yaml          # BMAD configuration
│
├── docs/
│   ├── prd/                 # Product Requirements
│   ├── architecture/        # Architecture docs
│   ├── specs/              # Specifications
│   ├── guides/             # Guides & standards
│   └── notes/              # Briefs & brainstorming
│
└── src/                    # Your actual code
```

---

## 🎓 Best Practices

### 1. Always Start with Planning

```
Analyst → PM → Architect → Dev
```

Don't skip ahead! Each phase builds on the previous one.

### 2. Mark Dependencies Clearly

```markdown
## Dependencies

Depends on: #101, #102
```

This enables parallel execution and prevents blocked work.

### 3. Use Size Estimates

Label stories with size (xs/s/m/l/xl) for better sprint planning.

### 4. One Story in "doing" at a Time

Focus on completing stories, not starting many.

### 5. Trust Automated QA, But Verify

Automated QA catches most issues, but manual review is available for edge cases.

### 6. Commit Documents Frequently

All docs in Git = full version history.

---

## 🔧 Configuration

### File: `.bmad-core-github-research/config.yaml`

```yaml
github:
  tasks:
    use_milestones_for_epics: true
    use_labels_for_status: true

    status_flow:
      - backlog
      - todo
      - doing
      - review
      - done

    auto_link_pr_to_issue: true
    auto_close_on_merge: true

  projects:
    use_projects_v2: true
    default_view: 'board'

documents:
  docs_path: 'docs/'
  structure:
    prd: 'docs/prd/'
    architecture: 'docs/architecture/'
    specs: 'docs/specs/'
    guides: 'docs/guides/'
    notes: 'docs/notes/'

qa:
  automated_review:
    enabled: true
    auto_merge_on_pass: false
    require_human_on_major_fail: true
```

---

## 📈 Performance Metrics

### Typical Speedup by Project Size

| Project Size | Tasks | Sequential | Parallel | Speedup |
| ------------ | ----- | ---------- | -------- | ------- |
| Small        | 5-10  | 10-20hr    | 4-6hr    | 2.5x    |
| Medium       | 10-30 | 20-60hr    | 8-15hr   | 3.5x    |
| Large        | 30+   | 60-120hr   | 15-30hr  | 4.5x    |

### Wave-Based Parallel Execution

```
Traditional (Sequential):     Parallel (Wave-Based):
Dev → Task 1 (2hr)           Wave 1: 5 devs × 2hr = 2hr
Dev → Task 2 (2hr)           Wave 2: 5 devs × 2hr = 2hr
Dev → Task 3 (2hr)           Wave 3: 5 devs × 2hr = 2hr
...
20 tasks = 40 hours          20 tasks = 6 hours

                             Speedup: 6.7x
```

---

## 🆘 Troubleshooting

### Issue: GitHub CLI not authenticated

```bash
gh auth status
# If not authenticated:
gh auth login
```

### Issue: Labels not created

```bash
# Run setup script manually
.bmad-core-github-research/scripts/setup-labels.sh
```

### Issue: Automated QA not running

Check:

1. `ANTHROPIC_API_KEY` secret is set
2. Workflow file is in `.github/workflows/`
3. Workflow has correct permissions

### Issue: Circular dependencies

```
❌ ERROR: Circular dependency detected
Remaining tasks: #201, #202
```

**Fix:** Review with Architect, remove circular references.

### Issue: PR not auto-updating issue status

Check that PR body contains `Fixes #123` or `Closes #123`.

---

## 🔄 Workflow Comparison

### vs. Archon Version

| Feature         | BMAD-Core-Archon | BMAD-Core-GitHub                  |
| --------------- | ---------------- | --------------------------------- |
| Task Management | Archon MCP       | GitHub Issues                     |
| Semantic Search | ✅ RAG           | ❌ Keyword only                   |
| Version Control | Snapshots        | Git (more powerful)               |
| Pull Requests   | ❌ No            | ✅ Full PR workflow               |
| CI/CD           | ❌ No            | ✅ GitHub Actions                 |
| Learning Curve  | New tool         | Familiar to devs                  |
| Cost            | Open source      | Free (public) / $4/user (private) |

**Choose GitHub when:**

- Team already uses GitHub
- Want familiar tools
- Need PR workflows
- Want CI/CD integration

**Choose Archon when:**

- Need semantic search
- Self-hosting preferred
- No rate limits needed

---

## 📚 Additional Resources

- **GitHub CLI Docs:** https://cli.github.com/
- **GitHub Actions Docs:** https://docs.github.com/actions
- **GitHub Issues Guide:** https://docs.github.com/issues
- **GitHub Projects v2:** https://docs.github.com/issues/planning-and-tracking-with-projects

---

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

---

## 📄 License

MIT License - See LICENSE file for details

---

## 🎉 Version History

### v1.0.0 (2025-10-20)

- ✅ Initial release
- ✅ Complete agent suite (9 agents)
- ✅ GitHub-native task management
- ✅ Automated QA via GitHub Actions
- ✅ Wave-based parallel execution
- ✅ Full documentation

---

**Ready to start? Follow the [Quick Start](#-quick-start) guide above!**

For questions or issues, please open a GitHub issue in the BMAD-METHOD repository.
