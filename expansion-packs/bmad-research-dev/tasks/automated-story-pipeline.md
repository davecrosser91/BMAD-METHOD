<!-- Powered by BMAD™ Core -->

# Automated Story Pipeline Task

## Purpose

Automate the complete workflow from PRD + Architecture documents to enriched story files with optional GitHub integration. This task orchestrates the PO + SM workflow to create technically enriched stories optimized for AI development.

## When to Use This Task

**Use this task when:**

- You have a completed PRD and Architecture in your project
- You want to create enriched story files (not just basic GitHub issues)
- You need stories with full technical context for AI development
- You want guidance through the optimal workflow
- You're ready to transition from planning to development

**Don't use this task when:**

- PRD or Architecture are not yet complete
- You want simple GitHub issues without enrichment (use PM agent directly)
- You only have 1-2 stories (just use SM agent manually)

## Prerequisites Validation

Before starting, verify:

- [ ] PRD exists at `docs/prd.md` or specified location
- [ ] Architecture exists at `docs/architecture.md` or specified location
- [ ] `.bmad-core/core-config.yaml` is configured for your project
- [ ] GitHub CLI (`gh`) is authenticated (if using GitHub integration)
- [ ] Git repository is initialized

## Task Workflow

### Phase 1: Discovery and Validation

#### Step 1.1: Load Configuration

1. Read `.bmad-core/core-config.yaml`
2. Extract key settings:
   - `prdVersion`, `prdSharded`, `prdShardedLocation`
   - `architectureVersion`, `architectureSharded`, `architectureShardedLocation`
   - `devStoryLocation`
   - `markdownExploder` setting

#### Step 1.2: Locate Documents

1. Check for PRD:
   - If `prdSharded: true` → Verify sharded location exists
   - If `prdSharded: false` → Verify monolithic PRD exists
   - Prompt user for location if not found

2. Check for Architecture:
   - If `architectureSharded: true` → Verify sharded location exists
   - If `architectureSharded: false` → Verify monolithic Architecture exists
   - Prompt user for location if not found

#### Step 1.3: Count Stories

1. If PRD is sharded, count epic files and stories within each
2. If PRD is monolithic, parse epics and count stories
3. Display summary to user:
   ```
   📊 Project Summary:
   - Total Epics: 4
   - Total Stories: 23
   - Estimated enriched story files to create: 23
   ```

#### Step 1.4: User Confirmation

Present options to user:

```
🎯 Automated Story Pipeline Options:

1. **Full Automation** - Create all enriched story files automatically
2. **Guided Mode** - Pause for approval after each story
3. **Selective Mode** - Choose which epics/stories to process
4. **Dry Run** - Preview what will be created without creating files
5. **Cancel** - Exit and run manually

Which mode would you prefer? (1-5)
```

---

### Phase 2: Document Sharding (if needed)

#### Step 2.1: Check Sharding Status

If documents are NOT already sharded:

```
📂 Documents need to be sharded for optimal story creation.

Sharding will:
✅ Break PRD into epic-specific files
✅ Break Architecture into component-specific files
✅ Optimize for AI agent context windows
✅ Enable faster story creation

Proceed with sharding? (yes/no)
```

#### Step 2.2: Shard PRD

If user confirms, execute shard-doc task:

1. Check `markdownExploder` setting in core-config.yaml
2. If `markdownExploder: true`:
   - Attempt to run: `md-tree explode docs/prd.md docs/prd`
   - If command fails, inform user to install `@kayvan/markdown-tree-parser`
3. If `markdownExploder: false` or command unavailable:
   - Use manual sharding method from shard-doc task
   - Create `docs/prd/` folder
   - Split by level 2 sections
   - Create epic files

**Output:**

```
✅ PRD Sharded Successfully:
- Location: docs/prd/
- Files created: 4 epic files
  - epic-1-foundation-and-core-infrastructure.md
  - epic-2-user-authentication.md
  - epic-3-data-management.md
  - epic-4-reporting-dashboard.md
```

#### Step 2.3: Shard Architecture

Same process for architecture:

1. Execute: `md-tree explode docs/architecture.md docs/architecture`
2. Or use manual sharding if needed
3. Create component-specific files

**Output:**

```
✅ Architecture Sharded Successfully:
- Location: docs/architecture/
- Files created: 12 component files
  - index.md
  - tech-stack.md
  - unified-project-structure.md
  - data-models.md
  - rest-api-spec.md
  - [etc...]
```

#### Step 2.4: Update Configuration

Update `core-config.yaml` to reflect sharding:

```yaml
prdSharded: true
prdShardedLocation: docs/prd
architectureSharded: true
architectureShardedLocation: docs/architecture
```

---

### Phase 3: Story Creation Loop

#### Step 3.1: Initialize Story Tracking

Create tracking structure:

```
📋 Story Creation Progress:

Epic 1: Foundation & Core Infrastructure (6 stories)
  [ ] 1.1 - Project setup and initialization
  [ ] 1.2 - Database configuration
  [ ] 1.3 - Authentication foundation
  [ ] 1.4 - API structure setup
  [ ] 1.5 - Testing framework
  [ ] 1.6 - CI/CD pipeline

Epic 2: User Authentication (5 stories)
  [ ] 2.1 - User signup endpoint
  [ ] 2.2 - User login with JWT
  [... etc ...]

Total: 0/23 stories created
```

#### Step 3.2: Story Creation Loop

For each epic, for each story:

**3.2.1: Invoke SM Story Creation**

Execute the `create-next-story` task with these steps:

1. **Load Core Configuration** - Already loaded in Phase 1

2. **Identify Next Story** - Based on tracking, determine next sequential story

3. **Gather Story Requirements** - Extract from epic file

4. **Gather Architecture Context:**
   - Read architecture index.md
   - Determine story type (Backend/Frontend/Full-Stack)
   - Read relevant architecture files:
     - **For ALL Stories:** tech-stack.md, unified-project-structure.md, coding-standards.md, testing-strategy.md
     - **For Backend:** data-models.md, database-schema.md, backend-architecture.md, rest-api-spec.md
     - **For Frontend:** frontend-architecture.md, components.md, core-workflows.md
     - **For Full-Stack:** Both Backend and Frontend sections

5. **Extract Story-Specific Technical Details:**
   - Data models for this story
   - API endpoints to implement/consume
   - Component specifications
   - File paths and naming conventions
   - Testing requirements
   - Security/performance considerations
   - ALWAYS include source references: `[Source: architecture/{filename}.md#{section}]`

6. **Populate Story Template:**
   - Create file: `{devStoryLocation}/{epicNum}.{storyNum}.story.md`
   - Fill basic info: Title, Status (Draft), Story statement, AC from epic
   - **Populate Dev Notes section:**
     - Previous Story Insights
     - Data Models [with sources]
     - API Specifications [with sources]
     - Component Specifications [with sources]
     - File Locations
     - Testing Requirements
     - Technical Constraints
   - **Generate Tasks/Subtasks** based on epic requirements + architecture
   - Link tasks to ACs

7. **Run Story Draft Checklist:**
   - Execute `story-draft-checklist.md`
   - Verify completeness

**3.2.2: Display Story Summary**

```
✅ Story 1.1 Created: Project setup and initialization

Status: Draft
File: .bmad-stories/1.1.story.md

Dev Notes Includes:
  ✓ Tech Stack: Node.js 18, Express 4.18, PostgreSQL 15
  ✓ Project Structure: Monorepo with Turborepo
  ✓ Testing: Jest + Supertest
  ✓ 8 source references to architecture docs

Tasks Generated: 6 tasks, 15 subtasks
All tasks mapped to acceptance criteria
```

**3.2.3: Mode-Specific Behavior**

- **Full Automation:** Continue to next story immediately
- **Guided Mode:** Ask user to review and confirm before continuing:

  ```
  Review story at .bmad-stories/1.1.story.md

  Continue to next story? (yes/skip epic/cancel)
  ```

- **Selective Mode:** Only process stories user selected

**3.2.4: Update Progress Tracker**

```
📋 Story Creation Progress:

Epic 1: Foundation & Core Infrastructure (6 stories)
  [✓] 1.1 - Project setup and initialization
  [⏳] 1.2 - Database configuration (in progress...)
  [ ] 1.3 - Authentication foundation
  [... etc ...]

Total: 1/23 stories created (4%)
```

#### Step 3.3: Handle Errors

If story creation fails:

```
❌ Error creating story 2.3: User password reset

Error: Missing architecture section: authentication/password-reset.md

Options:
1. Skip this story and continue
2. Pause and let me fix architecture
3. Cancel entire pipeline

What would you like to do? (1-3)
```

---

### Phase 4: GitHub Integration (Optional)

#### Step 4.1: Offer GitHub Creation

After all stories are created:

```
✅ All 23 enriched story files created!

📂 Location: .bmad-stories/

Would you like to also create GitHub Issues and Milestones? (yes/no)

Note: Story files are optimized for AI development.
GitHub Issues provide project tracking visibility.
You can create both!
```

#### Step 4.2: Create GitHub Milestones (Epics)

If user confirms, for each epic:

```bash
gh api repos/{owner}/{repo}/milestones \
  -f title="Epic 1: Foundation & Core Infrastructure" \
  -f description="Establish project setup, authentication, and basic infrastructure" \
  -f due_on="2025-12-31T23:59:59Z"
```

#### Step 4.3: Create GitHub Issues (Stories)

For each story:

```bash
gh issue create \
  --title "Story 1.1: Project setup and initialization" \
  --body "As a developer, I want the project initialized with all dependencies...

## Acceptance Criteria
- [ ] Node.js project initialized with package.json
- [ ] TypeScript configured
[... etc ...]

## Link to Enriched Story File
Full technical context: .bmad-stories/1.1.story.md

🤖 Created by BMAD Automated Story Pipeline" \
  --label "type:story,status:backlog,priority:p1,size:m" \
  --milestone "Epic 1: Foundation & Core Infrastructure"
```

#### Step 4.4: Link Story Files to Issues

Update each story file with GitHub issue number:

```markdown
# Story 1.1: Project setup and initialization

**GitHub Issue:** #101
**GitHub Milestone:** Epic 1: Foundation & Core Infrastructure

Status: Draft
```

---

### Phase 5: Final Summary and Next Steps

#### Step 5.1: Generate Complete Report

```
🎉 Automated Story Pipeline Complete!

📊 Summary:
═══════════════════════════════════════════════════

📝 Story Files Created:
  ✅ 23 enriched story files in .bmad-stories/
  ✅ All stories include full Dev Notes with architecture context
  ✅ Average of 6.2 source references per story
  ✅ All tasks mapped to acceptance criteria

📂 Documents Sharded:
  ✅ PRD sharded into 4 epic files (docs/prd/)
  ✅ Architecture sharded into 12 components (docs/architecture/)

🐙 GitHub Integration:
  ✅ 4 Milestones created (Epics)
  ✅ 23 Issues created (Stories)
  ✅ All issues linked to story files

⚙️  Configuration Updated:
  ✅ core-config.yaml updated with sharding locations

═══════════════════════════════════════════════════

📋 Story Breakdown by Epic:

Epic 1: Foundation & Core Infrastructure - 6 stories
  Story 1.1: Project setup and initialization [GitHub #101]
  Story 1.2: Database configuration [GitHub #102]
  Story 1.3: Authentication foundation [GitHub #103]
  Story 1.4: API structure setup [GitHub #104]
  Story 1.5: Testing framework [GitHub #105]
  Story 1.6: CI/CD pipeline [GitHub #106]

Epic 2: User Authentication - 5 stories
  Story 2.1: User signup endpoint [GitHub #107]
  Story 2.2: User login with JWT [GitHub #108]
  Story 2.3: Password reset flow [GitHub #109]
  Story 2.4: Email verification [GitHub #110]
  Story 2.5: Session management [GitHub #111]

[... etc for all epics ...]

═══════════════════════════════════════════════════
```

#### Step 5.2: Development Guidance

```
🚀 Ready to Start Development!

Next Steps:

1️⃣  Review Story Files
   📂 Open .bmad-stories/ folder
   👀 Review first 2-3 stories to understand structure
   ✏️  Make any adjustments to story priorities

2️⃣  Start First Story
   💬 New Claude Code chat
   📝 Type: @sm
   🎯 SM will load story 1.1 (next in sequence)
   ✅ Review and approve the story

3️⃣  Implement First Story
   💬 New Claude Code chat
   💻 Type: @dev
   🔨 Dev will implement story 1.1
   🧪 Tests will be written automatically
   ✅ Story marked as "Review" when complete

4️⃣  QA Review (Optional)
   💬 New Claude Code chat
   🔍 Type: @qa
   🎯 QA will review implementation
   🔧 Either approves or leaves feedback

5️⃣  Repeat the Cycle
   🔄 SM → Dev → QA for each story
   📈 Track progress in GitHub Issues
   🎯 Complete Epic 1, then move to Epic 2

═══════════════════════════════════════════════════

📚 Reference Documentation:

- Story Files: .bmad-stories/*.story.md
- Epic Details: docs/prd/*.md
- Architecture: docs/architecture/*.md
- GitHub Issues: https://github.com/{owner}/{repo}/issues
- GitHub Milestones: https://github.com/{owner}/{repo}/milestones

═══════════════════════════════════════════════════

💡 Pro Tips:

✨ Story files contain ALL context Dev needs - no architecture lookups required
✨ Always use new chat sessions for SM/Dev/QA to keep context clean
✨ Update story status in files as you progress (Draft → Approved → InProgress → Review → Done)
✨ GitHub issues auto-sync with story files (manual sync for now, automation coming)
✨ If Dev gets stuck, story includes debug references and previous learnings

═══════════════════════════════════════════════════

Happy Coding! 🎉
```

---

## Configuration Options

The task supports these user preferences:

### Execution Modes

1. **Full Automation** - Create all stories without pausing
2. **Guided Mode** - Pause after each story for review
3. **Selective Mode** - User picks specific epics/stories
4. **Dry Run** - Preview without creating files

### GitHub Integration

- **None** - Only create story files
- **Issues Only** - Create GitHub issues, no milestones
- **Full Integration** - Create milestones and issues, link everything

### Document Handling

- **Auto-shard** - Shard documents automatically if needed
- **Skip sharding** - Work with monolithic documents (slower)
- **Shard only PRD** - Keep architecture monolithic
- **Shard only Architecture** - Keep PRD monolithic

---

## Error Handling

### Common Issues

**Issue:** PRD not found

```
Solution: Specify PRD location or create PRD first with PM agent
```

**Issue:** Architecture incomplete

```
Solution: Pause pipeline, complete architecture, resume
```

**Issue:** core-config.yaml missing

```
Solution: Copy from bmad-core-github/core-config.yaml and configure
```

**Issue:** GitHub CLI not authenticated

```
Solution: Run `gh auth login` before GitHub integration
```

**Issue:** Markdown exploder command not found

```
Solution: Install with `npm install -g @kayvan/markdown-tree-parser`
or set markdownExploder: false in core-config.yaml
```

---

## Success Criteria

The pipeline is successful when:

1. ✅ All PRD epics have corresponding sharded files
2. ✅ All architecture components are sharded
3. ✅ Every story has an enriched .story.md file
4. ✅ All story files include comprehensive Dev Notes with source references
5. ✅ All tasks are mapped to acceptance criteria
6. ✅ Story draft checklist passes for all stories
7. ✅ (Optional) GitHub milestones and issues created
8. ✅ (Optional) Story files linked to GitHub issues
9. ✅ Configuration updated to reflect new structure

---

## Manual Override Options

At any point, user can:

- **Pause:** "Pause the pipeline"
- **Skip:** "Skip current story/epic"
- **Adjust:** "Let me edit the story file before continuing"
- **Cancel:** "Cancel and I'll do it manually"
- **Resume:** "Resume from story X.Y"

---

## Performance Metrics

The task tracks and reports:

- Stories per minute
- Average Dev Notes length
- Source references per story
- Task coverage (% of ACs with tasks)
- Estimated time saved vs manual creation

Example:

```
⚡ Performance Report:

Stories Created: 23
Time Elapsed: 12 minutes
Average: 1.9 stories/minute

vs Manual SM Creation:
  Estimated manual time: 115 minutes (5 min/story)
  Time saved: 103 minutes (89% faster)

Quality Metrics:
  Avg Dev Notes: 450 words/story
  Avg Source References: 6.2/story
  Task Coverage: 100% (all ACs have tasks)
```

---

## Important Notes

- This task is a **workflow orchestrator** - it calls other tasks but adds automation
- Story quality depends on PRD and Architecture quality - garbage in, garbage out
- The task can be paused/resumed at any point
- All created files are editable - automation is a starting point
- GitHub integration is optional - story files are the primary value
- Use **Guided Mode** for first project, then **Full Automation** once comfortable
