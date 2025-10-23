# Claude Code Integration Guide for BMAD-Core-GitHub

## Overview

This guide explains how to use BMAD-Core-GitHub with **Claude Code's native GitHub integration** (`@github #issue`), enabling you to leverage both BMAD's rich story preparation workflow AND Claude Code's native issue handling.

---

## 🎯 **Two Workflows: Choose Your Approach**

### **Workflow 1: BMAD Dev Agent (Traditional)**

Use BMAD agents for complete story management:

```
SM Agent creates story → Dev Agent implements story → QA Agent reviews
```

**When to use:**

- Full BMAD agent orchestration
- Multiple agents collaborating
- Complex multi-story epics
- Story files as single source of truth

---

### **Workflow 2: BMAD + Claude Code (Hybrid - RECOMMENDED)**

Use BMAD SM agent for story preparation, Claude Code for implementation:

```
SM Agent creates story + GitHub issue → Claude Code implements via @github #issue
```

**When to use:**

- Using Claude Code as primary development interface
- Want native GitHub integration (comments, PRs, Projects v2)
- Prefer `@github #issue` mentions over agent switching
- Want bidirectional linking (story file ↔ GitHub issue)

---

## 📋 **Hybrid Workflow: Step-by-Step**

### **Step 1: Create Story with SM Agent**

```bash
# Activate SM Agent
@sm *draft
```

The SM agent will:

1. ✅ Read PRD and architecture docs
2. ✅ Extract technical context
3. ✅ Create enriched story file with **complete Dev Notes**
4. ✅ Ask: "Would you like to create a GitHub issue for this story?"

**Say YES** to enable Claude Code integration!

---

### **Step 2: GitHub Issue Created Automatically**

The SM agent will run:

```bash
./scripts/create-github-issue-from-story.sh .bmad-stories/1.0.0.story.md --milestone "Epic 1"
```

**What gets created:**

- **GitHub Issue** with:
  - Title: `[1.0.0] Story Title`
  - Body: Complete story content including:
    - 📖 User Story
    - ✅ Acceptance Criteria
    - 📋 Tasks & Subtasks (checkboxes)
    - 🛠️ **Dev Notes** (CRITICAL - all architecture context)
    - 🧪 Testing Requirements
    - 📚 Reference Documents
    - ✨ Definition of Done
  - Labels: `type:story`, `size:m`, `priority:p1`
  - Milestone: Epic name
  - Initial Status: "Backlog" (via Projects v2)

- **Story File Updated** with:
  - `**GitHub Issue:** #123`
  - `**GitHub URL:** https://github.com/.../issues/123`

---

### **Step 3: Implement with Claude Code**

Now you can use Claude Code's native GitHub integration:

```bash
@github #123 please implement this story following all dev notes and acceptance criteria
```

**Claude Code will:**

- ✅ Read the full GitHub issue (including Dev Notes!)
- ✅ See all architecture context (no need to read docs)
- ✅ Understand tasks and acceptance criteria
- ✅ Have testing requirements
- ✅ Know project structure and coding standards
- ✅ Implement the story end-to-end

---

### **Step 4: Update Status (Manual or Automated)**

**Option A: Manual Projects v2 Status Update**

```bash
# Start work
./scripts/update-project-status.sh 123 "In Progress"

# Mark for review
./scripts/update-project-status.sh 123 "In Review"

# Complete
./scripts/update-project-status.sh 123 "Done"
```

**Option B: Use GitHub Projects v2 Kanban Board**

Drag issue cards between columns to update status automatically.

---

### **Step 5: Review (Optional QA Agent)**

If you want formal QA review:

```bash
@qa *review .bmad-stories/1.0.0.story.md
```

The QA agent will:

- Review code against story requirements
- Update issue status based on verdict
- Provide detailed QA gate decision

---

## 🛠️ **Manual Issue Creation (Alternative)**

If you want to create a GitHub issue for an existing story file:

### **Command 1: Via SM Agent**

```bash
@sm *create-github-issue .bmad-stories/1.0.0.story.md
```

### **Command 2: Via Script Directly**

```bash
./scripts/create-github-issue-from-story.sh .bmad-stories/1.0.0.story.md --milestone "Epic 1"
```

### **Command 3: Dry Run (Preview)**

```bash
./scripts/create-github-issue-from-story.sh .bmad-stories/1.0.0.story.md --dry-run
```

---

## 📖 **Manual Issue Creation via GitHub UI**

If you prefer creating issues manually:

### **Step 1: Use Issue Template**

1. Go to **Issues** → **New Issue**
2. Select: **"📖 Detailed Story (Claude Code Compatible)"**
3. Fill in all sections (especially **Dev Notes**!)

### **Step 2: Critical Section: Dev Notes**

The **Dev Notes** section must contain:

````markdown
### Architecture Context

**Project Structure:**

- New files go in: `src/features/auth/`
- Tests go in: `tests/features/auth/`
  [Source: docs/architecture/unified-project-structure.md#features]

**Tech Stack:**

- Framework: React 18 with TypeScript
- State Management: Redux Toolkit
  [Source: docs/architecture/tech-stack.md]

**Coding Standards:**

- Use functional components with hooks
- Follow ESLint config at `.eslintrc.js`
  [Source: docs/architecture/coding-standards.md]

### Data Models

```typescript
// [Source: docs/architecture/data-models.md#user]
interface User {
  id: string;
  email: string;
  // ...
}
```
````

### API Specifications

**Endpoints to implement:**

- `POST /api/users` - Create user
  - Request: `{ email, password }`
  - Response: `{ id, email, token }`
    [Source: docs/architecture/rest-api-spec.md#auth]

### Testing Requirements

- **Test Location:** `tests/features/auth.test.ts`
- **Coverage Required:** ≥ 80%
- **Framework:** Jest + React Testing Library
  [Source: docs/architecture/testing-strategy.md]

```

**Key Principle:** Claude Code should NEVER need to read architecture docs if Dev Notes are complete!

---

## ⚙️ **Issue Template Installation**

The issue template is located at:

```

expansion-packs/bmad-core-github/issue-templates/detailed-story.yml

````

### **To Install in Your Repo:**

```bash
# Create issue templates directory
mkdir -p .github/ISSUE_TEMPLATE

# Copy the template
cp expansion-packs/bmad-core-github/issue-templates/detailed-story.yml \
   .github/ISSUE_TEMPLATE/

# Commit and push
git add .github/ISSUE_TEMPLATE/detailed-story.yml
git commit -m "Add detailed story issue template for Claude Code integration"
git push
````

Now the template will appear in GitHub's "New Issue" dropdown!

---

## 🔄 **Workflow Comparison**

| Aspect                    | BMAD Dev Agent Only               | BMAD SM + Claude Code (Hybrid) |
| ------------------------- | --------------------------------- | ------------------------------ |
| **Story Creation**        | SM Agent                          | SM Agent                       |
| **Story File**            | ✅ Created                        | ✅ Created                     |
| **GitHub Issue**          | ❌ Optional                       | ✅ Auto-created                |
| **Implementation**        | Dev Agent (`@dev *develop-story`) | Claude Code (`@github #issue`) |
| **Context Source**        | Story file                        | GitHub issue (with Dev Notes)  |
| **Architecture Docs**     | Pre-extracted to story            | Pre-extracted to issue         |
| **Status Updates**        | Automatic (agent)                 | Manual or Projects v2          |
| **GitHub Integration**    | Limited                           | Full (native)                  |
| **Comments/PRs**          | Manual                            | Native                         |
| **Bidirectional Linking** | One-way (story → issue)           | Two-way (story ↔ issue)       |

---

## ✨ **Benefits of Hybrid Workflow**

### **For Story Preparation:**

- ✅ BMAD SM agent extracts all architecture context
- ✅ Story file serves as comprehensive spec
- ✅ All technical details cited with sources
- ✅ Tasks broken down with AC mapping

### **For Implementation:**

- ✅ Claude Code gets complete context in issue
- ✅ No need to read external architecture docs
- ✅ Native GitHub integration (comments, PRs)
- ✅ Status updates via Projects v2 Status field

### **For Traceability:**

- ✅ Bidirectional linking (story file ↔ issue)
- ✅ Single source of truth (content in both)
- ✅ Full GitHub workflow (metadata labels, milestones, Projects v2)
- ✅ Issue comments tracked in GitHub

---

## 🔧 **Configuration**

### **Required: core-config.yaml**

Ensure you have `.bmad-core/core-config.yaml`:

```yaml
devStoryLocation: .bmad-stories

prdSharded: true
prdShardedLocation: docs/prd

architectureVersion: v4
architectureSharded: true
architectureShardedLocation: docs/architecture

github:
  projects:
    enabled: true
    project_number: 1
    owner: 'your-org-or-username'
```

### **Optional: Projects v2 Setup**

For automatic status tracking:

```bash
./scripts/init-github-project.sh
```

---

## 📚 **Example: Complete Flow**

### **1. Create Story**

```bash
@sm *draft
```

**Output:**

```
✅ Story created: .bmad-stories/1.0.0.story.md
📝 Status: Draft

Would you like to create a GitHub issue for this story?
This enables Claude Code integration via @github #issue mentions. (y/n)
```

**Answer:** `y`

---

### **2. GitHub Issue Created**

```
✅ GitHub issue created successfully!
📍 URL: https://github.com/owner/repo/issues/123
📊 Issue Number: #123

💡 Next Steps:
1. Set initial status (if using Projects v2):
   ./scripts/update-project-status.sh 123 "Backlog"

2. Use with Claude Code:
   @github #123 please implement this story
```

---

### **3. Implement with Claude Code**

```bash
@github #123 please implement this story following all dev notes and acceptance criteria
```

**Claude Code reads issue and implements:**

- Creates components in correct locations
- Follows coding standards
- Implements data models as specified
- Writes tests with ≥80% coverage
- Creates PR

---

### **4. Update Status**

```bash
# Mark as in progress
./scripts/update-project-status.sh 123 "In Progress"

# After implementation, mark for review
./scripts/update-project-status.sh 123 "In Review"
```

---

### **5. Review and Complete**

```bash
# Optional: Run QA agent
@qa *review .bmad-stories/1.0.0.story.md

# Or: Manual code review and merge PR
# Then mark as done
./scripts/update-project-status.sh 123 "Done"
```

---

## 🎯 **Best Practices**

### **1. Always Include Complete Dev Notes**

**Good Dev Notes:**

````markdown
### Data Models

```typescript
// User model for authentication
// [Source: docs/architecture/data-models.md#user-model]
interface User {
  id: string;
  email: string;
  passwordHash: string;
}
```
````

### API Specifications

- `POST /api/auth/signup`
  - Request: `{ email, password }`
  - Response: `{ id, token }`
    [Source: docs/architecture/rest-api-spec.md#auth]

````

**Bad Dev Notes:**
```markdown
### Data Models

User model is in the architecture docs.

### API Specifications

See REST API spec for details.
````

---

### **2. Cite All Sources**

Always include source references:

```markdown
[Source: docs/architecture/tech-stack.md#frontend]
[Source: docs/architecture/coding-standards.md#react]
```

This allows Claude Code to find more context if needed.

---

### **3. Use Tasks with AC Mapping**

```markdown
- [ ] **Task 1: Create signup form** (AC: #1, #2)
  - [ ] Add email input with validation
  - [ ] Add password input
```

This helps Claude Code prioritize and verify completeness.

---

### **4. Keep Story File and Issue in Sync**

If you update the story file after issue creation, manually update the issue:

```bash
# Option 1: Edit issue in GitHub UI
# Option 2: Recreate issue (will create duplicate - not recommended)
# Option 3: Close old issue, create new one
```

**Recommendation:** Story file is created once, then both file and issue remain static during implementation.

---

## 🚨 **Troubleshooting**

### **Issue: Claude Code can't find architecture context**

**Cause:** Dev Notes section incomplete

**Fix:** Ensure Dev Notes contain:

- Project structure paths
- Tech stack details
- Data models (with TypeScript interfaces)
- API specifications
- Coding standards
- Testing requirements

---

### **Issue: Script fails to create issue**

**Cause:** gh CLI not authenticated or incorrect story file format

**Fix:**

```bash
# Check authentication
gh auth status

# If not authenticated
gh auth login

# Verify story file format
# Expected: {epic}.{major}.{minor}.story.md
```

---

### **Issue: Issue created but story file not updated**

**Cause:** File permissions or incorrect path

**Fix:**

```bash
# Run script again with correct path
./scripts/create-github-issue-from-story.sh .bmad-stories/1.0.0.story.md
```

---

## 📊 **Metrics and Tracking**

### **Story File Metrics**

- Story creation time
- Architecture docs read
- Dev Notes completeness
- Task breakdown detail

### **GitHub Issue Metrics**

- Issue creation to first commit
- Time in each status
- Comments and PR links
- Completion rate

### **Projects v2 Integration**

- Kanban board views
- Burndown charts
- Velocity tracking
- Epic progress

---

## 🎓 **Summary**

**BMAD + Claude Code Hybrid Workflow:**

1. ✅ **SM Agent creates enriched story file** with complete architecture context
2. ✅ **Automatically creates GitHub issue** with full story content
3. ✅ **Claude Code implements via `@github #issue`** without reading docs
4. ✅ **Manual or automatic status updates** via Projects v2
5. ✅ **Optional QA agent review** for formal quality gates

**Key Principle:** The GitHub issue becomes a **complete, self-contained spec** that Claude Code can implement without external dependencies!

---

## 📚 **Related Documentation**

- **Projects v2 Integration:** `PROJECTS-V2-INTEGRATION-SUMMARY.md`
- **GitHub Workflow Guide:** `data/github-workflow.md`
- **Story Creation Task:** `tasks/create-next-story.md`
- **SM Agent:** `agents/sm.md`

---

**Ready to use BMAD with Claude Code?** Start with `@sm *draft` and say YES when asked about creating a GitHub issue!
