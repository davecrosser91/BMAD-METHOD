# GitHub Projects v2 Integration Summary

## Overview

This document summarizes the complete integration of GitHub Projects v2 into bmad-core-github, making it the **optimal** workflow tracking mechanism with labels as fallback.

---

## ✅ What Was Done

### 1. **Research & Analysis**

**File**: `PROJECTS-VS-LABELS-ANALYSIS.md`

- Complete comparison of GitHub Labels vs Projects v2 Status fields
- Detailed pros/cons analysis
- Implementation strategy
- Migration guide
- Configuration recommendations

**Key Finding**: Projects v2 Status fields are superior for workflow tracking because they:

- ✅ Enforce single-select (only one status at a time)
- ✅ Integrate natively with kanban boards
- ✅ Provide structured workflow state machines
- ✅ Support cross-repository projects

Labels should be used only for metadata (type, priority, size).

---

### 2. **Helper Scripts Created**

#### **update-project-status.sh**

**File**: `scripts/update-project-status.sh`

**Purpose**: Simplify the complex 5-step process of updating Projects v2 status fields to a single command.

**Usage**:

```bash
./update-project-status.sh 123 "In Progress"
```

**Features**:

- Auto-detects project owner from git remote
- Reads configuration from `.bmad-core/core-config.yaml`
- Caches IDs for performance
- Adds issue to project if not present
- Clear error messages and validation
- Provides helpful tips for caching IDs

**Why This Matters**: Without this script, updating a status requires 5 separate `gh` CLI commands. This script handles all complexity automatically.

---

#### **init-github-project.sh**

**File**: `scripts/init-github-project.sh`

**Purpose**: One-command setup for GitHub Projects v2 integration.

**Usage**:

```bash
./init-github-project.sh
```

**What It Does**:

1. Detects repository owner and name from git remote
2. Verifies GitHub CLI authentication and adds `project` scope if needed
3. Creates a new GitHub Project
4. Retrieves project ID, status field ID, and all status option IDs
5. Updates `.bmad-core/core-config.yaml` with complete configuration
6. Caches all IDs for fast future updates
7. Provides project URL and next steps

**Why This Matters**: Manual setup requires understanding GitHub Projects v2 API, multiple GraphQL calls, and manual YAML editing. This script does everything automatically.

---

### 3. **Setup Assistant Updates**

**File**: `agents/setup-assistant.md` (updated to v2.0.0)

**Changes**:

#### **New Commands Added**:

- `*setup-projects` - Guide through GitHub Projects v2 setup
- `*setup-config` - Guide through core-config.yaml setup

#### **New Setup Steps**:

**Step 3: Setup GitHub Projects v2 (Recommended)**

- Explains benefits of Projects v2 over labels
- Guides user through `init-github-project.sh` execution
- Explains what gets configured
- Links to detailed analysis document

**Step 4: Setup Core Configuration**

- Checks if `core-config.yaml` exists in `.bmad-core/`
- Explains how to copy it if missing
- Shows key configuration sections
- Emphasizes this is the "single source of truth" for agents

**Step Renumbering**: All subsequent steps renumbered (was Step 3-7, now Step 5-10)

**Why This Matters**: Users now get complete guidance on both Projects v2 AND core-config.yaml during initial setup. Previously, core-config.yaml was assumed to exist but never explained.

---

### 4. **Installer Fix** (Already Completed in v3.6.5)

**File**: `tools/installer/lib/installer.js`

**Fix Applied**: Installer now copies expansion pack's `core-config.yaml` to BOTH:

1. `.bmad-core-github/core-config.yaml` (expansion pack copy)
2. `.bmad-core/core-config.yaml` (main config for agents)

**Why This Matters**: Agents expect config at `.bmad-core/core-config.yaml`. Previously, installer only copied to expansion folder, causing "config not found" errors.

---

## 📋 Files Modified/Created

### **New Files** (3)

- `PROJECTS-VS-LABELS-ANALYSIS.md` - Complete comparison and strategy
- `scripts/update-project-status.sh` - Status update helper
- `scripts/init-github-project.sh` - Project initialization helper

### **Modified Files** (1)

- `agents/setup-assistant.md` - Added Steps 3-4, renumbered subsequent steps, added new commands

### **Previously Modified** (v3.6.5)

- `tools/installer/lib/installer.js` - Fixed core-config.yaml copy

---

## 🎯 Recommended Workflow

### **For New Projects**

1. Install bmad-core-github expansion pack
2. Run setup-assistant: `@setup-assistant *setup`
3. Follow guided setup including:
   - GitHub CLI authentication
   - Label creation (18 labels)
   - **GitHub Projects v2 creation** (Step 3) ← NEW
   - **core-config.yaml verification** (Step 4) ← NEW
   - Documentation folders
   - Optional: GitHub Actions, issue templates
4. Start using BMAD agents!

### **For Existing Projects**

**Option 1: Add Projects v2 (Recommended)**

```bash
# Run project initialization
./expansion-packs/bmad-core-github/scripts/init-github-project.sh

# Verify core-config.yaml exists
ls .bmad-core/core-config.yaml

# If missing, copy it
cp expansion-packs/bmad-core-github/core-config.yaml .bmad-core/
```

**Option 2: Continue Using Labels**

- No changes needed
- Agents will continue using labels for status
- Can migrate to Projects v2 anytime

---

## 🔧 Configuration Structure

### **core-config.yaml** (with Projects v2)

```yaml
github:
  # GitHub Projects v2 Configuration
  projects:
    enabled: true
    project_number: 1
    owner: 'your-org-or-username'

    # Status field configuration
    status_field:
      name: 'Status'

    # Cache IDs to speed up status updates
    cache:
      project_id: 'PVT_kwDOABCDEF'
      status_field_id: 'PVTF_lADOABCDEF'
      todo_option_id: 'TODO_OPTION_ID'
      inprogress_option_id: 'INPROGRESS_OPTION_ID'
      inreview_option_id: 'INREVIEW_OPTION_ID'
      done_option_id: 'DONE_OPTION_ID'

  # Labels still used for metadata
  labels:
    enabled: true
    categories:
      - type # type:story, type:bug
      - priority # priority:p0, priority:p1
      - size # size:s, size:m, size:l
```

---

## 🚀 Next Steps (For Full Integration)

These updates are **ready for review but not yet implemented** in agents:

### **1. Update Dev Agent** (`agents/dev.md`)

Add GitHub Projects integration:

```yaml
github-integration:
  on-story-start:
    - primary: {root}/scripts/update-project-status.sh {issue} "In Progress"
    - fallback: gh issue edit {issue} --remove-label "status:todo" --add-label "status:doing"

  on-story-complete:
    - primary: {root}/scripts/update-project-status.sh {issue} "In Review"
    - fallback: gh issue edit {issue} --remove-label "status:doing" --add-label "status:review"
```

### **2. Update QA Agent** (`agents/qa.md`)

Add GitHub Projects integration:

```yaml
github-integration:
  on-qa-pass:
    - primary: {root}/scripts/update-project-status.sh {issue} "Done"
    - fallback: gh issue edit {issue} --remove-label "status:review" --add-label "status:done"

  on-qa-fail-major:
    - primary: {root}/scripts/update-project-status.sh {issue} "In Progress"
    - fallback: gh issue edit {issue} --remove-label "status:review" --add-label "status:doing"
```

### **3. Update SM Agent** (`agents/sm.md`)

Add sprint planning integration:

```yaml
github-integration:
  on-sprint-planning:
    - Move selected issues: Backlog → Todo
    - Command: {root}/scripts/update-project-status.sh {issue} "Todo"
```

### **4. Update PM Agent** (`agents/pm.md`)

Add issue creation integration:

```yaml
github-integration:
  on-issue-create:
    - Set initial status: "Backlog"
    - Command: {root}/scripts/update-project-status.sh {issue} "Backlog"
```

### **5. Update Automated QA Workflow** (`.github/workflows/automated-qa-review.yml`)

Add Projects v2 status updates based on QA verdict.

### **6. Update Documentation**

- `github-label-workflow.md` → Rename to `github-workflow.md` with Projects v2 primary
- `AUTOMATED-STORY-PIPELINE-GUIDE.md` → Add Projects v2 setup step
- `QUICKSTART.md` → Add Projects v2 creation step
- `README.md` → Update workflow diagrams with Projects v2

---

## 📊 Benefits Summary

### **For Users**

✅ **Better Workflow Visualization**

- Kanban board with automatic card movement
- Clear workflow progression
- No duplicate status values

✅ **Easier Setup**

- One-command project initialization
- Automatic ID caching
- Clear guided setup in setup-assistant

✅ **Backward Compatible**

- Labels still work as fallback
- Can migrate gradually
- No breaking changes

### **For Agents**

✅ **Single Source of Truth**

- Status in one place (project field)
- No sync issues between labels and project
- Structured data for better decision making

✅ **Automatic Updates**

- Helper script handles complexity
- Simple command: `update-project-status.sh {issue} "{status}"`
- Automatic fallback to labels if project unavailable

### **For Framework**

✅ **Future-Proof**

- GitHub's direction is Projects v2
- Supports cross-repository projects
- Richer features (iterations, custom fields)

✅ **Professional**

- Industry-standard workflow tracking
- Better project management
- Clearer status reporting

---

## 🎓 User Education

### **Key Message**

> "GitHub Projects v2 Status fields are the optimal way to track workflow in bmad-core-github. They enforce single-select status, integrate natively with kanban boards, and work seamlessly across repositories. Labels are still used for categorization (type, priority, size) but not for workflow status."

### **When to Use What**

**Use Projects v2 Status For:**

- Workflow state (Backlog → Todo → In Progress → In Review → Done)
- Tracking where an issue is in the development lifecycle
- Kanban board visualization

**Use Labels For:**

- Issue type (`type:story`, `type:bug`, `type:epic`)
- Priority (`priority:p0`, `priority:p1`, `priority:p2`)
- Size estimation (`size:s`, `size:m`, `size:l`)
- Filtering and categorization

---

## 📝 Version History

**v2.0.0** (This Release)

- Added GitHub Projects v2 support
- Created `update-project-status.sh` helper script
- Created `init-github-project.sh` setup script
- Updated setup-assistant with Projects v2 and core-config.yaml guidance
- Created comprehensive analysis document
- Made labels optional for status (used only for metadata)

**v1.3.0** (Previous)

- Labels-based workflow
- No Projects v2 integration
- core-config.yaml installer bug

**v3.6.5** (Bug Fix)

- Fixed installer to copy core-config.yaml to `.bmad-core/`

---

## 🤝 Next Release

**Proposed: v2.1.0**

**Scope**: Complete Projects v2 integration across all agents

**Changes**:

- Update dev.md, qa.md, sm.md, pm.md with Projects v2 automation
- Update automated-qa-review.yml workflow
- Update all documentation
- Add migration guide for existing label-based projects

**Breaking Changes**: None (backward compatible with labels)

---

## 📚 Documentation References

- **Analysis**: `PROJECTS-VS-LABELS-ANALYSIS.md`
- **Setup Assistant**: `agents/setup-assistant.md` (v2.0.0)
- **Update Script**: `scripts/update-project-status.sh`
- **Init Script**: `scripts/init-github-project.sh`
- **GitHub Docs**: [Understanding Fields in Projects](https://docs.github.com/en/issues/planning-and-tracking-with-projects/understanding-fields)
- **gh CLI**: [gh project commands](https://cli.github.com/manual/gh_project)

---

**Status**: ✅ Ready for review and agent integration
