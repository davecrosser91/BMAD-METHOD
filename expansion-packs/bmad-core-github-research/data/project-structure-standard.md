# BMAD-Core-GitHub Project Structure Standard

## Overview

This document defines the **standard project structure** for all bmad-core-github projects. All agents reference this structure to ensure consistency across the framework.

---

## Core Directory Structure

### Root Level

```
project-root/
├── .bmad-core/                    # BMAD framework configuration (created by installer)
│   ├── core-config.yaml           # Project-specific BMAD configuration
│   └── expansion-packs/           # Optional expansion packs
│
├── .bmad-stories/                 # Story files for AI development (IDE workflow)
│   ├── 1.1.story.md              # Epic 1, Story 1
│   ├── 1.2.story.md              # Epic 1, Story 2
│   └── ...
│
├── docs/                          # All project documentation
│   ├── prd/                       # Product Requirements Documents
│   ├── architecture/              # Architecture designs, ADRs, tech stack
│   ├── specs/                     # Detailed specifications
│   ├── guides/                    # User/developer guides
│   └── notes/                     # Project briefs, meeting notes, brainstorming
│
├── .github/                       # GitHub-specific configuration
│   ├── workflows/                 # GitHub Actions workflows
│   └── ISSUE_TEMPLATE/            # Issue templates
│
├── src/                           # Source code (structure varies by project)
├── tests/                         # Test files
└── [project-specific files]
```

---

## Detailed Directory Reference

### `.bmad-core/` - BMAD Framework Configuration

**Purpose:** Stores BMAD framework configuration and agent files

**Created by:** BMAD installer (`npx bmad-method install`)

**Key files:**

- `core-config.yaml` - Project configuration (REQUIRED)
  - PRD/Architecture locations
  - Sharding settings
  - Dev agent settings
  - Story location settings

**Agent usage:**

- ALL agents load `core-config.yaml` during activation
- Configuration drives agent behavior

---

### `.bmad-stories/` - Enriched Story Files

**Purpose:** Stores detailed story files with technical context for AI development

**Created by:** SM agent via `create-next-story` task or automated-story-pipeline

**File naming:** `{epic}.{major}.{minor}.story.md`

- **Format:** Epic.Major.Minor (semantic versioning-inspired)
- **Example:** `1.0.0.story.md`, `1.0.1.story.md`, `1.1.0.story.md`, `2.0.0.story.md`
- **Epic:** Milestone number (1, 2, 3, ...)
- **Major:** Feature within epic (0, 1, 2, ...)
- **Minor:** Iteration within feature (0, 1, 2, ...)
- **Reference:** See `story-numbering-standard.md` for complete guidelines

**File contents:**

- Story statement (As a... I want... so that...)
- Acceptance criteria
- Tasks/subtasks mapped to ACs
- **Dev Notes** (technical context extracted from architecture)
- Testing requirements
- Dev Agent Record (populated during implementation)
- QA Results (populated during review)

**Agent usage:**

- **SM Agent:** Creates story files
- **Dev Agent:** Reads and implements stories, updates Dev Agent Record
- **QA Agent:** Reviews stories, updates QA Results section

---

### `docs/` - Project Documentation

**Purpose:** All project documentation in version-controlled markdown

#### `docs/prd/` - Product Requirements Documents

**Purpose:** Product requirements, epics, and user stories

**Created by:** PM agent

**File structure (v4 sharded):**

```
docs/prd/
├── index.md                       # PRD overview with links to epics
├── epic-1-foundation.md           # Epic 1 details
├── epic-2-authentication.md       # Epic 2 details
└── ...
```

**File structure (v3 monolithic):**

```
docs/prd/
└── project-prd.md                 # Single PRD with all epics
```

**Agent usage:**

- **PM Agent:** Creates and updates PRD
- **PO Agent:** Shards PRD, validates completeness
- **SM Agent:** Reads epic files to create stories
- **Analyst Agent:** References PRD for alignment

---

#### `docs/architecture/` - Architecture Documentation

**Purpose:** System architecture, technical stack, design decisions

**Created by:** Architect agent

**File structure (v4 sharded):**

```
docs/architecture/
├── index.md                            # Architecture overview
├── tech-stack.md                       # Languages, frameworks, versions
├── unified-project-structure.md        # Project folder structure, file naming
├── coding-standards.md                 # Code style, patterns, conventions
├── testing-strategy.md                 # Testing approach, frameworks, coverage
├── data-models.md                      # Data structures, validation, relationships
├── database-schema.md                  # DB schema, migrations, indexes
├── backend-architecture.md             # Backend design, layers, patterns
├── rest-api-spec.md                    # API endpoints, request/response formats
├── external-apis.md                    # Third-party integrations
├── frontend-architecture.md            # Frontend design, state management
├── components.md                       # UI components, props, usage
├── core-workflows.md                   # Key user flows, navigation
├── security.md                         # Auth, authorization, data protection
├── performance.md                      # Performance requirements, optimization
└── deployment.md                       # Deployment strategy, environments
```

**File structure (v3 monolithic):**

```
docs/architecture/
└── project-architecture.md             # Single architecture doc
```

**Agent usage:**

- **Architect Agent:** Creates and maintains architecture docs
- **SM Agent:** Reads architecture to populate story Dev Notes
- **Dev Agent:** May reference specific sections (but story should have all needed context)
- **QA Agent:** Uses architecture for test strategy and NFR validation

---

#### `docs/specs/` - Detailed Specifications

**Purpose:** Detailed specifications beyond PRD/Architecture

**Created by:** Various agents (PM, Architect, UX Expert)

**Typical contents:**

- `front-end-spec.md` - UI/UX detailed specification
- `api-specification.md` - Detailed API documentation
- `database-design.md` - Detailed database design
- `integration-specs.md` - Third-party integration details

**Agent usage:**

- **UX Expert:** Creates front-end-spec.md
- **Architect:** Creates technical specifications
- **Dev Agent:** References during implementation if needed

---

#### `docs/guides/` - User and Developer Guides

**Purpose:** How-to guides, tutorials, onboarding

**Created by:** Various agents or manually

**Typical contents:**

- `developer-onboarding.md` - New developer setup guide
- `deployment-guide.md` - How to deploy the application
- `api-usage-guide.md` - How to use the API
- `user-manual.md` - End-user documentation

**Agent usage:**

- **Dev Agent:** May create developer guides
- **Analyst Agent:** May create user guides
- Generally manual creation or later phase

---

#### `docs/notes/` - Project Briefs and Notes

**Purpose:** Project planning, brainstorming, meeting notes

**Created by:** Analyst agent, PM agent, manually

**Typical contents:**

- `project-brief-{name}.md` - Initial project brief
- `brainstorming-{topic}.md` - Brainstorming session outputs
- `meeting-notes/` - Meeting records
- `research/` - Market research, competitor analysis

**Agent usage:**

- **Analyst Agent:** Creates project briefs, brainstorming outputs
- **PM Agent:** References project brief when creating PRD

---

### `.github/` - GitHub Configuration

**Purpose:** GitHub-specific configuration and automation

#### `.github/workflows/` - GitHub Actions

**Required workflows:**

- `claude-code-integration.yml` - Claude Code GitHub integration (optional)
- `automated-qa-review.yml` - Automated QA on PRs (optional but recommended)

**Agent usage:**

- Workflows trigger automatically on GitHub events
- QA workflow reviews PRs and updates issue labels

#### `.github/ISSUE_TEMPLATE/` - Issue Templates

**Templates provided:**

- `epic.yml` - Epic issue template
- `story.yml` - User story template
- `bug.yml` - Bug report template

**Agent usage:**

- Used when manually creating issues in GitHub
- PM agent can create issues programmatically

---

## Project-Specific Directories

### `src/` - Source Code

**Purpose:** Application source code

**Structure:** Varies by project type, defined in `docs/architecture/unified-project-structure.md`

**Common patterns:**

**Backend (Node.js/Express):**

```
src/
├── models/         # Data models
├── controllers/    # Request handlers
├── routes/         # Route definitions
├── services/       # Business logic
├── middleware/     # Express middleware
├── utils/          # Helper functions
└── config/         # Configuration
```

**Frontend (React/Vue):**

```
src/
├── components/     # UI components
├── pages/          # Page components
├── hooks/          # Custom hooks
├── services/       # API clients
├── store/          # State management
├── utils/          # Helper functions
└── assets/         # Static assets
```

**Agent usage:**

- **Architect Agent:** Defines src/ structure in architecture
- **Dev Agent:** Creates and modifies files following structure

---

### `tests/` or `test/` - Test Files

**Purpose:** Test files (unit, integration, e2e)

**Structure:** Defined in `docs/architecture/testing-strategy.md`

**Common patterns:**

- Mirror src/ structure
- `*.test.ts` or `*.spec.ts` naming
- Separate folders for unit/integration/e2e

**Agent usage:**

- **Dev Agent:** Creates tests alongside implementation
- **QA Agent:** Validates test coverage and quality

---

## Configuration Files

### Required: `core-config.yaml`

**Location:** `.bmad-core/core-config.yaml`

**Purpose:** Central configuration for BMAD agents

**Key settings:**

```yaml
# PRD Configuration
prdVersion: v4
prdSharded: true
prdShardedLocation: docs/prd
epicFilePattern: 'epic-{n}*.md'

# Architecture Configuration
architectureVersion: v4
architectureSharded: true
architectureShardedLocation: docs/architecture

# Dev Agent Configuration
devStoryLocation: .bmad-stories
devLoadAlwaysFiles:
  - docs/architecture/tech-stack.md
  - docs/architecture/coding-standards.md
devDebugLog: .bmad-core/dev-debug.log

# QA Configuration
qaLocation: .bmad-qa
qaGateLocation: .bmad-qa/gates

# Settings
markdownExploder: true
```

**Agent usage:**

- ALL agents load this during activation
- Drives file location behavior
- Enables flexibility for different project structures

---

## GitHub Integration

### Labels

**Status Labels:**

- `status:backlog` - Not yet scheduled
- `status:todo` - Ready to start
- `status:doing` - In progress
- `status:review` - In code review
- `status:done` - Completed

**Type Labels:**

- `type:epic` - Large feature milestone
- `type:story` - User story
- `type:task` - Development task
- `type:bug` - Bug fix

**Priority Labels:**

- `priority:p0` - Critical
- `priority:p1` - High
- `priority:p2` - Medium
- `priority:p3` - Low

**Size Labels:**

- `size:xs` - Extra small (< 1 hour)
- `size:s` - Small (1-4 hours)
- `size:m` - Medium (1 day)
- `size:l` - Large (2-3 days)
- `size:xl` - Extra large (> 3 days)

**Agent usage:**

- **PM Agent:** Creates issues with initial labels
- **Dev Agent:** Updates status labels during development
- **QA Agent:** May update labels based on review
- **GitHub Actions:** Automated label updates

---

### Milestones = Epics

GitHub Milestones represent BMAD epics

**Naming convention:** `Epic {n}: {Epic Title}`

- Example: `Epic 1: Foundation & Core Infrastructure`

**Agent usage:**

- **PM Agent:** Creates milestones from PRD epics
- All story issues linked to milestone

---

### Issues = Stories/Tasks

GitHub Issues represent user stories or tasks

**Naming convention:** `Story {epic}.{major}.{minor}: {Story Title}`

- Example: `Story 1.0.0: Project setup and initialization`
- Example: `Story 1.0.1: Configure TypeScript with strict mode`
- Example: `Story 1.1.0: Setup PostgreSQL database`

**Issue body includes:**

- Story statement
- Acceptance criteria
- Link to enriched story file (`.bmad-stories/{epic}.{major}.{minor}.story.md`)

**Agent usage:**

- **PM Agent:** Creates issues from PRD
- **Dev Agent:** Updates issue when starting/completing work
- **QA Agent:** Updates issue after review

---

## File Naming Conventions

### Story Files

**Pattern:** `{epic}.{major}.{minor}.story.md`

- **Epic number:** 1, 2, 3, etc. (milestone)
- **Major number:** 0, 1, 2, etc. (feature within epic)
- **Minor number:** 0, 1, 2, etc. (iteration within feature)
- **Extension:** `.story.md`

**Examples:**

- `1.0.0.story.md` - Epic 1, Feature 0, First iteration
- `1.0.1.story.md` - Epic 1, Feature 0, Second iteration
- `1.1.0.story.md` - Epic 1, Feature 1, First iteration
- `2.0.0.story.md` - Epic 2, Feature 0, First iteration

**Naming Guidelines:**

- Start each epic at `x.0.0`
- Increment minor for story continuations within same feature
- Increment major for new features within same epic
- See `story-numbering-standard.md` for complete rules

### Epic Files (Sharded PRD)

**Pattern:** `epic-{n}-{slug}.md`

- Epic number: 1, 2, 3, etc.
- Slug: URL-friendly epic title

**Examples:**

- `epic-1-foundation-and-core-infrastructure.md`
- `epic-2-user-authentication.md`
- `epic-3-data-management.md`

### Architecture Files (Sharded)

**Standard files:**

- `index.md` - Overview
- `tech-stack.md`
- `unified-project-structure.md`
- `coding-standards.md`
- `testing-strategy.md`
- `data-models.md`
- `database-schema.md`
- `backend-architecture.md`
- `rest-api-spec.md`
- `frontend-architecture.md`
- `components.md`

**Naming:** Use kebab-case for multi-word files

---

## Agent File Loading Rules

### On Activation

**ALL Agents:**

1. Read `.bmad-core/core-config.yaml` (REQUIRED)
2. Extract relevant configuration
3. Load any `devLoadAlwaysFiles` if Dev agent

**DO NOT Load:**

- Other agent files
- PRD/Architecture documents (load only when needed)
- Task/template files (load only when executing)

### During Execution

**SM Agent:**

- Load epic files from `prdShardedLocation`
- Load architecture files relevant to story type
- Create story files in `devStoryLocation`

**Dev Agent:**

- Load assigned story file
- Load files from `devLoadAlwaysFiles`
- DO NOT load PRD or architecture (story has all needed context)

**QA Agent:**

- Load story file for review
- Load architecture for NFR validation if needed
- Create gate files in `qaGateLocation`

**PM Agent:**

- Load project brief from `docs/notes/`
- Create PRD in `docs/prd/`
- Optionally create GitHub issues/milestones

**Architect Agent:**

- Load PRD from `docs/prd/`
- Create architecture in `docs/architecture/`

---

## Best Practices

### For Users

1. **Create folder structure early** - Run setup before starting project
2. **Use sharded docs for large projects** - Easier for AI agents to process
3. **Keep story files updated** - Dev agent should update as work progresses
4. **Link GitHub issues to story files** - Best of both worlds

### For Agents

1. **Always load core-config.yaml** - Drives all file locations
2. **Use configured paths** - Don't assume default locations
3. **Update correct sections only** - Respect file ownership
4. **Reference source architecture** - Include `[Source: ...]` in story Dev Notes

---

## Migration Guide

### From V3 to V4

**V3 Structure:**

```
docs/
├── project-prd.md                    # Monolithic PRD
└── project-architecture.md           # Monolithic architecture
```

**V4 Structure:**

```
docs/
├── prd/
│   ├── index.md
│   ├── epic-1-foundation.md
│   └── ...
└── architecture/
    ├── index.md
    ├── tech-stack.md
    └── ...
```

**Migration steps:**

1. Update `core-config.yaml`:
   ```yaml
   prdSharded: true
   architectureSharded: true
   ```
2. Run PO agent: `*shard-doc docs/project-prd.md docs/prd`
3. Run PO agent: `*shard-doc docs/project-architecture.md docs/architecture`

### From No Structure

**Initial setup:**

1. Run: `mkdir -p docs/{prd,architecture,specs,guides,notes}`
2. Run: `mkdir -p .bmad-stories`
3. Copy `core-config.yaml` from bmad-core-github
4. Configure paths in `core-config.yaml`

---

## Quick Reference

| Item              | Location                      | Created By | Used By       |
| ----------------- | ----------------------------- | ---------- | ------------- |
| Core Config       | `.bmad-core/core-config.yaml` | Installer  | All agents    |
| Story Files       | `.bmad-stories/`              | SM Agent   | SM, Dev, QA   |
| PRD               | `docs/prd/`                   | PM Agent   | PM, PO, SM    |
| Architecture      | `docs/architecture/`          | Architect  | Architect, SM |
| Project Brief     | `docs/notes/`                 | Analyst    | Analyst, PM   |
| Source Code       | `src/`                        | Dev Agent  | Dev, QA       |
| Tests             | `tests/`                      | Dev Agent  | Dev, QA       |
| GitHub Issues     | GitHub repo                   | PM Agent   | PM, Dev, QA   |
| GitHub Milestones | GitHub repo                   | PM Agent   | PM            |

---

**This document is the single source of truth for BMAD-Core-GitHub project structure. All agents reference this standard.**
