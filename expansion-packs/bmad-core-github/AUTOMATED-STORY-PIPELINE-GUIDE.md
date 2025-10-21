# 🚀 Automated Story Pipeline - Quick Start Guide

## What Is It?

The **Automated Story Pipeline** is a workflow automation that transforms your PRD + Architecture into **enriched story files** optimized for AI development. Instead of manually creating each story with the SM agent, this pipeline automates the entire process.

## What It Does

✅ **Validates** your PRD and Architecture documents
✅ **Shards** documents into epic/component-specific files
✅ **Creates** enriched story files with full technical context
✅ **Extracts** architecture details for each story (data models, APIs, file paths, testing)
✅ **Generates** tasks/subtasks mapped to acceptance criteria
✅ **Optionally** creates GitHub Milestones and Issues
✅ **Links** everything together for seamless development

## When to Use It

### ✅ Use the Pipeline When:

- You have a **completed PRD** in `docs/prd.md`
- You have a **completed Architecture** in `docs/architecture.md`
- You want to create **10+ stories** (saves significant time)
- You're ready to **start development** and need AI-optimized stories
- You want **consistency** across all story files

### ❌ Don't Use It When:

- PRD or Architecture are incomplete (finish those first)
- You only have 1-2 stories (just use `@sm` manually)
- You want simple GitHub issues without enrichment (use `@pm` instead)
- You prefer manual control over every story (use `@sm` for each)

---

## How to Use It

### Method 1: Using PO Agent (Recommended)

```bash
# In Claude Code or your IDE

@po

Sarah: Hi! I'm Sarah, the Product Owner. 📝
       [displays commands]

*automated-story-pipeline

Sarah: 🚀 Starting Automated Story Pipeline...
       [follows guided workflow]
```

### Method 2: Using Orchestrator

```bash
@bmad-orchestrator

*task automated-story-pipeline

[Orchestrator guides you through the workflow]
```

### Method 3: Direct Task Execution

```bash
# In Claude Code, drag and drop:
# - expansion-packs/bmad-core-github/tasks/automated-story-pipeline.md
# Then say:

"Execute this automated story pipeline task for my project"
```

---

## Execution Modes

The pipeline offers 4 modes:

### 1. Full Automation ⚡ (Fastest)

```
Creates all stories without pausing
Best for: Established projects, experienced users
Time: ~30 seconds per story
```

### 2. Guided Mode 🎯 (Recommended for First Use)

```
Pauses after each story for your review
Best for: First time using pipeline, complex projects
Time: ~1 minute per story (including review)
```

### 3. Selective Mode 🎨 (Custom)

```
You choose which epics/stories to process
Best for: Partial automation, specific epic focus
Time: Varies based on selection
```

### 4. Dry Run 👀 (Preview)

```
Shows what will be created without creating anything
Best for: Understanding impact, validation
Time: ~5 seconds per story
```

---

## What Gets Created

### 📁 Story Files

```
.bmad-stories/
├── 1.1.story.md  (Epic 1, Story 1)
├── 1.2.story.md
├── 1.3.story.md
├── 2.1.story.md  (Epic 2, Story 1)
├── 2.2.story.md
└── ...
```

**Each story file contains:**

- Status tracking (Draft/Approved/InProgress/Review/Done)
- User story statement
- Acceptance criteria from PRD
- **Dev Notes** with extracted architecture context:
  - Data models with source references
  - API specifications
  - Component details
  - File paths and naming conventions
  - Testing requirements
  - Technical constraints
- Tasks/subtasks mapped to ACs
- Change log
- Dev Agent Record section (for implementation tracking)

### 📂 Sharded Documents

```
docs/
├── prd/
│   ├── index.md
│   ├── epic-1-foundation.md
│   ├── epic-2-authentication.md
│   ├── epic-3-data-management.md
│   └── epic-4-reporting.md
└── architecture/
    ├── index.md
    ├── tech-stack.md
    ├── unified-project-structure.md
    ├── data-models.md
    ├── rest-api-spec.md
    ├── frontend-architecture.md
    └── ...
```

### 🐙 GitHub Integration (Optional)

```
GitHub Milestones (Epics):
├── Epic 1: Foundation & Core Infrastructure
├── Epic 2: User Authentication
└── ...

GitHub Issues (Stories):
├── #101: Story 1.1 - Project setup [Epic 1]
├── #102: Story 1.2 - Database config [Epic 1]
├── #103: Story 2.1 - User signup [Epic 2]
└── ...
```

---

## Step-by-Step Workflow

### Phase 1: Prerequisites Check ✅

```
Pipeline validates:
✓ PRD exists and is readable
✓ Architecture exists and is readable
✓ core-config.yaml is configured
✓ GitHub CLI authenticated (if using GitHub)
✓ Git repo initialized
```

### Phase 2: Document Sharding 📄

```
If documents not already sharded:

Option 1: Automatic (md-tree exploder)
  - Fastest, cleanest sharding
  - Requires: npm install -g @kayvan/markdown-tree-parser

Option 2: Manual parsing
  - Built-in fallback
  - No external dependencies
```

### Phase 3: Story Creation Loop 🔄

```
For each epic:
  For each story:
    1. Extract story requirements from epic file
    2. Determine story type (Backend/Frontend/Full-Stack)
    3. Read relevant architecture files
    4. Extract technical context specific to story
    5. Generate Dev Notes with source references
    6. Create tasks/subtasks
    7. Run quality checklist
    8. Save enriched story file
    9. Update progress tracker
```

### Phase 4: GitHub Integration 🐙 (Optional)

```
If enabled:
  1. Create GitHub Milestones for each epic
  2. Create GitHub Issues for each story
  3. Link issues to milestones
  4. Update story files with GitHub references
```

### Phase 5: Summary Report 📊

```
Complete summary with:
  - Stories created count
  - Performance metrics
  - Time saved vs manual
  - Quality metrics
  - Next steps guidance
```

---

## Example Output

### Story File Example

```markdown
# Story 1.1: Project setup and initialization

**GitHub Issue:** #101
**GitHub Milestone:** Epic 1: Foundation & Core Infrastructure

## Status

Draft

## Story

**As a** developer,
**I want** the project initialized with all core dependencies and structure,
**so that** I can start implementing features on solid foundation

## Acceptance Criteria

1. Node.js project initialized with package.json
2. TypeScript configured with strict mode
3. Testing framework (Jest) installed
4. Git repository initialized with .gitignore
5. Basic folder structure created

## Tasks / Subtasks

- [ ] Initialize Node.js project (AC: 1)
  - [ ] Run npm init
  - [ ] Configure package.json scripts
- [ ] Setup TypeScript (AC: 2)
  - [ ] Install TypeScript and types
  - [ ] Create tsconfig.json with strict mode
  - [ ] Configure build output to dist/
- [ ] Install testing framework (AC: 3)
  - [ ] Install Jest and ts-jest
  - [ ] Create jest.config.js
  - [ ] Add test scripts to package.json
- [ ] Initialize Git (AC: 4)
  - [ ] Run git init
  - [ ] Create .gitignore for Node.js
  - [ ] Initial commit
- [ ] Create project structure (AC: 5)
  - [ ] Create src/ directory
  - [ ] Create test/ directory
  - [ ] Create docs/ directory

## Dev Notes

### Previous Story Insights

This is the first story - no previous story context.

### Tech Stack

[Source: architecture/tech-stack.md#runtime-and-language]

- **Runtime:** Node.js v18.x LTS
- **Language:** TypeScript 5.x with strict mode
- **Package Manager:** npm 9.x
- **Testing:** Jest 29.x with ts-jest

### Project Structure

[Source: architecture/unified-project-structure.md#backend-structure]
```

project-root/
├── src/
│ ├── models/
│ ├── controllers/
│ ├── routes/
│ ├── services/
│ └── utils/
├── test/
├── dist/
└── docs/

```

### File Locations
- TypeScript config: `tsconfig.json` (project root)
- Jest config: `jest.config.js` (project root)
- Package file: `package.json` (project root)
- Git ignore: `.gitignore` (project root)

### Testing Requirements
[Source: architecture/testing-strategy.md#unit-testing]
- **Framework:** Jest with ts-jest preset
- **Coverage Target:** 80% for unit tests
- **Test Location:** Mirror src/ structure in test/
- **Naming:** *.test.ts for test files

### Technical Constraints
[Source: architecture/tech-stack.md#version-requirements]
- Node.js: Must use v18.x LTS (not v19 or v20)
- TypeScript: Enable strict mode, noImplicitAny, strictNullChecks
- Jest: Use ts-jest preset for TypeScript support

## Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2025-10-21 | 1.0 | Story created by automated pipeline | SM Agent |

## Dev Agent Record

_This section will be populated by the Dev agent during implementation_

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
```

### Pipeline Summary Example

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

═══════════════════════════════════════════════════

🚀 Ready to Start Development!

Next Steps:

1️⃣  Review Story Files
   📂 Open .bmad-stories/ folder
   👀 Review first 2-3 stories

2️⃣  Start First Story with SM
   💬 New Claude Code chat
   📝 Type: @sm

3️⃣  Implement with Dev Agent
   💬 New Claude Code chat
   💻 Type: @dev

4️⃣  Repeat SM → Dev → QA cycle
```

---

## Comparison: Manual vs Pipeline

### Manual Story Creation (SM Agent)

```bash
Time per story: ~5 minutes
Process:
  1. New chat: @sm
  2. Run: *draft
  3. SM reads PRD epic
  4. SM reads architecture docs
  5. SM creates story file
  6. You review
  7. Repeat for next story

For 23 stories: ~115 minutes (2 hours)
```

### Automated Pipeline

```bash
Time for all stories: ~12 minutes (Full Automation)
Process:
  1. Run: @po → *automated-story-pipeline
  2. Choose mode (Full/Guided/Selective)
  3. Pipeline processes all stories
  4. Review final output

For 23 stories: ~12 minutes
Time saved: 103 minutes (89% faster)
```

---

## FAQ

### Q: Does the pipeline replace the SM agent?

**A:** No! The pipeline **automates** what the SM would do manually for each story. The SM agent is still available for:

- Creating individual stories manually
- Reviewing pipeline-generated stories
- Making adjustments after pipeline runs

### Q: Can I edit stories after the pipeline creates them?

**A:** Absolutely! Pipeline-generated stories are starting points. You can:

- Edit any story file directly
- Have SM review and modify stories
- Adjust Dev Notes, tasks, or ACs as needed

### Q: What if the pipeline fails mid-way?

**A:** The pipeline can resume from where it left off:

```bash
@po
*automated-story-pipeline

Sarah: Detected incomplete pipeline run
       Last completed: Story 2.3
       Resume from Story 2.4? (yes/restart/cancel)
```

### Q: Do I need GitHub integration?

**A:** No! GitHub integration is optional. The real value is the **enriched story files**. GitHub issues are just for visibility/tracking.

### Q: Can I run this for just one epic?

**A:** Yes! Use **Selective Mode**:

```bash
@po
*automated-story-pipeline

[Choose: 3. Selective Mode]
[Select: Epic 2 only]
```

### Q: What if my Architecture is incomplete?

**A:** The pipeline will warn you:

```
⚠️  Warning: Missing architecture sections:
   - authentication/password-reset.md
   - frontend/user-dashboard-component.md

Options:
1. Continue anyway (stories will have incomplete Dev Notes)
2. Pause and let me complete architecture
3. Cancel pipeline

Recommendation: Complete architecture first for best results
```

---

## Tips for Best Results

### 🎯 Before Running Pipeline

1. **Complete PRD** - All epics and stories finalized
2. **Complete Architecture** - All components documented
3. **Configure core-config.yaml** - Set up for your project
4. **Install md-tree** (optional but recommended):
   ```bash
   npm install -g @kayvan/markdown-tree-parser
   ```

### ⚡ During Pipeline Execution

1. **Use Guided Mode first time** - Learn what it creates
2. **Review samples** - Check first 2-3 stories for quality
3. **Pause if needed** - You can always pause and resume
4. **Take notes** - Pipeline shows what architecture sections it uses

### 🚀 After Pipeline Completes

1. **Review story files** - Spot-check for accuracy
2. **Update priorities** - Adjust story order if needed
3. **Start development** - Begin SM → Dev cycle
4. **Provide feedback** - Note what worked well or needs improvement

---

## Troubleshooting

### Issue: "PRD not found"

**Solution:**

```bash
# Check PRD location
ls docs/prd.md

# If elsewhere, specify location when prompted
# Or update core-config.yaml
```

### Issue: "Architecture incomplete"

**Solution:**

```bash
# Complete architecture first
@architect
*create-architecture

# Then run pipeline
```

### Issue: "md-tree command not found"

**Solution:**

```bash
# Option 1: Install md-tree
npm install -g @kayvan/markdown-tree-parser

# Option 2: Use manual sharding
# Set in core-config.yaml:
markdownExploder: false
```

### Issue: "GitHub CLI not authenticated"

**Solution:**

```bash
gh auth login
# Follow prompts, then re-run pipeline
```

### Issue: "Some stories have incomplete Dev Notes"

**Solution:**
This usually means architecture is missing details. Check:

```bash
# Which architecture files were read?
# Pipeline shows this during execution

# Add missing sections to architecture
# Re-run pipeline (it will update existing stories)
```

---

## Advanced Usage

### Re-running the Pipeline

The pipeline is **idempotent** - you can run it multiple times:

```bash
# Updates existing story files with new architecture context
# Preserves Dev Agent Record sections
# Updates Dev Notes if architecture changed
```

### Custom Configuration

Create project-specific settings in `core-config.yaml`:

```yaml
# Custom story location
devStoryLocation: .custom-stories/

# Partial sharding
prdSharded: true
architectureSharded: false # Keep architecture monolithic

# GitHub settings
githubIntegration: true
githubAutoLink: true
```

### Integration with CI/CD

```bash
# Run pipeline in CI
npx bmad-cli story-pipeline --mode=full-automation --no-github

# Check for story file changes
git diff --exit-code .bmad-stories/
```

---

## Support

- **Documentation:** See `automated-story-pipeline.md` for full task details
- **Workflow Reference:** See `greenfield-fullstack.yaml` for context
- **Agent Help:** `@po` → `*help` for available commands
- **Issues:** Report at GitHub issues

---

**Ready to automate your story creation? Start with:**

```bash
@po
*automated-story-pipeline
```

Happy automating! 🚀
