# Story Numbering Format Update - Version 3.0

## 🎯 **Summary**

BMAD-Core-GitHub story numbering has been updated to **Epic.Major.Minor** format (v3.0), inspired by semantic versioning.

---

## 📊 **Format Change**

### Old Format (v2.0)

```
Pattern: Epic.Story
Examples:
  - Story 1.1
  - Story 1.2
  - Story 2.1
  - Story 2.2

File naming: {epic}.{story}.story.md
  - 1.1.story.md
  - 1.2.story.md
  - 2.1.story.md
```

### New Format (v3.0)

```
Pattern: Epic.Major.Minor
Examples:
  - Story 1.0.0
  - Story 1.0.1
  - Story 1.1.0
  - Story 2.0.0

File naming: {epic}.{major}.{minor}.story.md
  - 1.0.0.story.md
  - 1.0.1.story.md
  - 1.1.0.story.md
  - 2.0.0.story.md
```

---

## 🔢 **Numbering Components**

### Epic Number (First Digit)

- **Meaning:** The epic/milestone this story belongs to
- **Examples:** 1, 2, 3, 4
- **When to increment:** Moving to a new epic
- **Starts at:** 1 for first epic

### Major Number (Second Digit)

- **Meaning:** Major feature or component within the epic
- **Examples:** 0, 1, 2, 3
- **When to increment:** Starting a new major feature within same epic
- **Starts at:** 0 for each new epic
- **Use Minor instead when:** Refining existing feature, bug fixes, small enhancements

### Minor Number (Third Digit)

- **Meaning:** Iteration, refinement, or continuation within same feature
- **Examples:** 0, 1, 2, 3
- **When to increment:** Each sequential story within same feature
- **Starts at:** 0 for each new major feature
- **Use for:** Refinements, continuations, incremental additions

---

## 📝 **Example Epic Structure**

### Epic 1: Foundation & Core Infrastructure

```
Story 1.0.0: Initialize Node.js project
Story 1.0.1: Configure TypeScript with strict mode
Story 1.0.2: Setup Jest testing framework
Story 1.0.3: Initialize Git repository

Story 1.1.0: Setup PostgreSQL database
Story 1.1.1: Configure database connection pool
Story 1.1.2: Create initial migration scripts

Story 1.2.0: Implement JWT authentication foundation
Story 1.2.1: Create User model and schema
Story 1.2.2: Implement password hashing

Story 1.3.0: Setup Express API structure
Story 1.3.1: Configure API routes
Story 1.3.2: Implement error handling
```

**Structure:**

- Feature 0 (1.0.x): Project setup - 4 stories
- Feature 1 (1.1.x): Database - 3 stories
- Feature 2 (1.2.x): Authentication - 3 stories
- Feature 3 (1.3.x): API - 3 stories

### Epic 2: User Authentication

```
Story 2.0.0: Implement user signup endpoint
Story 2.0.1: Add email validation
Story 2.0.2: Implement duplicate prevention

Story 2.1.0: Implement user login endpoint
Story 2.1.1: Add login rate limiting
Story 2.1.2: Implement remember-me functionality

Story 2.2.0: Implement password reset flow
Story 2.2.1: Create password reset email template
```

---

## ✅ **Benefits**

### 1. **Clear Feature Boundaries**

Old:

```
Story 1.1: Setup project
Story 1.2: Add dependencies
Story 1.3: Create User model
Story 1.4: Configure build
```

→ Hard to see feature groupings

New:

```
Story 1.0.0: Setup project (Project Setup feature)
Story 1.0.1: Add dependencies (Project Setup feature)
Story 1.0.2: Configure build (Project Setup feature)

Story 1.1.0: Create User model (User Management feature)
Story 1.1.1: Add User validation (User Management feature)
```

→ Clear feature separation

---

### 2. **Better Organization**

```
Epic 1
  ├─ Feature 0 (1.0.x): Project Setup
  │   ├─ 1.0.0: Initialize
  │   ├─ 1.0.1: Configure
  │   └─ 1.0.2: Structure
  ├─ Feature 1 (1.1.x): Database
  │   ├─ 1.1.0: Setup
  │   └─ 1.1.1: Migrations
  └─ Feature 2 (1.2.x): Authentication
      ├─ 1.2.0: User model
      └─ 1.2.1: JWT tokens
```

---

### 3. **Parallel Work Identification**

Stories with different major numbers can often be worked in parallel:

```
1.1.0 - Database setup    ┐
                          ├─ Can work in parallel
1.2.0 - Auth foundation   ┘

1.0.0 - Project init      ┐
                          ├─ Must be sequential
1.0.1 - Project config    ┘
```

---

### 4. **Semantic Clarity**

- **Minor bump** (1.0.0 → 1.0.1): Small change, refinement
- **Major bump** (1.0.x → 1.1.0): New feature
- **Epic bump** (1.x.x → 2.0.0): New milestone

Similar to semantic versioning developers already know!

---

## 📦 **Files Updated**

### Templates

1. ✅ `templates/story-tmpl.yaml` - Updated to v3.0 with Epic.Major.Minor

### Data/Reference Documents

2. ✅ `data/story-numbering-standard.md` - **NEW!** Complete numbering guidelines
3. ✅ `data/project-structure-standard.md` - Updated all examples
4. ✅ `data/github-label-workflow.md` - Updated examples

### Tasks

5. ✅ `tasks/create-next-story.md` - Updated numbering logic
6. ✅ `tasks/automated-story-pipeline.md` - Updated for new format

### Agents

7. ✅ `agents/sm.md` - Added `story-numbering-standard.md` dependency
8. ✅ `agents/po.md` - Added `story-numbering-standard.md` dependency

### Documentation

9. ✅ `AGENT-GITHUB-INTEGRATION-STATUS.md` - Updated all examples
10. ✅ `AUTOMATED-STORY-PIPELINE-GUIDE.md` - Updated examples

---

## 🔄 **Migration from v2.0 to v3.0**

### For New Projects

Simply use the new format from the start:

- First story: `1.0.0.story.md`
- Epic 1, Feature 0, Iteration 0

### For Existing Projects

**Option 1: Continue with old format**

- Old story files work fine
- Start using new format for new stories
- Mix of formats is OK

**Option 2: Migrate existing stories**

- Rename story files to new format
- Update references in documentation
- Update GitHub issue titles

**Conversion guide:**

Old v2.0 → New v3.0

```
1.1 → 1.0.0 (Epic 1, first story)
1.2 → 1.0.1 (if continuation) OR 1.1.0 (if new feature)
1.3 → 1.0.2 (if continuation) OR 1.1.0/1.2.0 (if new feature)
2.1 → 2.0.0 (Epic 2, first story)
2.2 → 2.0.1 (if continuation) OR 2.1.0 (if new feature)
```

**Decision rule:**

- Group related stories under same major number
- Use minor for sequential iterations
- Increment major for distinct features

---

## 💡 **Best Practices**

### DO:

✅ **Start each epic at x.0.0**

```
Epic 1: 1.0.0, 1.0.1, 1.1.0, ...
Epic 2: 2.0.0, 2.0.1, 2.1.0, ...
```

✅ **Group related stories under same major**

```
1.0.0 - Setup project
1.0.1 - Add dependencies
1.0.2 - Configure build
```

✅ **Use major for distinct features**

```
1.0.x - Project setup
1.1.x - Database
1.2.x - Authentication
```

✅ **Increment sequentially**

```
1.0.0 → 1.0.1 → 1.0.2 → 1.1.0 → 1.1.1
```

---

### DON'T:

❌ **Skip numbers**

```
1.0.0 → 1.0.2 (missing 1.0.1)
```

❌ **Mix unrelated stories in same major**

```
1.0.0 - Setup project
1.0.1 - Create user model  ← Should be 1.1.0
```

❌ **Increment major for minor changes**

```
1.0.0 - Create User model
1.1.0 - Fix typo  ← Should be 1.0.1
```

---

## 🤖 **SM Agent Behavior**

### Automatic Numbering

When you run `@sm → *draft`, the SM agent will:

1. **Scan existing stories** in `.bmad-stories/`
2. **Find last story number** (e.g., `1.0.2.story.md`)
3. **Determine next number:**
   - If continuing same feature: `1.0.3`
   - If starting new feature: `1.1.0`
4. **Prompt if ambiguous:**

   ```
   Next story number options:
   1. 1.0.3 - Continue current feature (Project Setup)
   2. 1.1.0 - Start new feature within Epic 1

   Which numbering? (1/2)
   ```

5. **Create story file** with chosen number

---

## 📋 **GitHub Integration**

### Issue Titles

**Old format:**

```
Story 1.1: Project setup
Story 1.2: Configure TypeScript
```

**New format:**

```
Story 1.0.0: Project setup
Story 1.0.1: Configure TypeScript
Story 1.1.0: Setup database
```

### Issue-Story Linking

Story file header:

```markdown
# Story 1.0.0: Initialize Node.js project

**GitHub Issue:** #101
**GitHub Milestone:** Epic 1: Foundation & Core Infrastructure
```

GitHub issue body:

```markdown
Story 1.0.0: Initialize Node.js project

## Link to Enriched Story File

`.bmad-stories/1.0.0.story.md`
```

---

## 🎓 **Quick Reference**

| Component  | Old v2.0     | New v3.0         | Example        |
| ---------- | ------------ | ---------------- | -------------- |
| **Format** | Epic.Story   | Epic.Major.Minor | 1.0.0          |
| **Epic**   | 1-99         | 1-99             | 1, 2, 3        |
| **Major**  | N/A          | 0-99             | 0, 1, 2        |
| **Minor**  | Story #      | 0-99             | 0, 1, 2        |
| **File**   | 1.1.story.md | 1.0.0.story.md   | 1.0.0.story.md |

### Decision Tree

```
New story?
├─ Same feature? → Increment Minor (1.0.0 → 1.0.1)
├─ New feature in epic? → Increment Major (1.0.x → 1.1.0)
└─ New epic? → New Epic (1.x.x → 2.0.0)
```

---

## 📚 **Complete Documentation**

**Full numbering guidelines:**

- See `data/story-numbering-standard.md` for:
  - Complete rules and examples
  - Decision trees
  - Common patterns
  - Migration guide
  - Best practices

**Project structure:**

- See `data/project-structure-standard.md` for:
  - File naming conventions
  - Folder structure
  - GitHub integration

---

## ✅ **Status: Complete & Ready to Use**

All files have been updated to support Epic.Major.Minor numbering format (v3.0).

**Next time you create a story:**

```bash
@sm
*draft

SM: Identified next story for preparation: 1.0.0 - Initialize Node.js project
SM: Creates .bmad-stories/1.0.0.story.md
```

**The numbering is now enforced throughout the framework!** 🎯
