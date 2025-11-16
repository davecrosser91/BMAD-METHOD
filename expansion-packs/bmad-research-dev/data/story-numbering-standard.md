# BMAD Story Numbering Standard

## Version 3.0 - Epic.Major.Minor Format

---

## Overview

BMAD-Core-GitHub uses a **semantic versioning-inspired** numbering system for stories:

```
Epic.Major.Minor
```

**Format:** `{epic}.{major}.{minor}`

**Examples:**

- `1.0.0` - Epic 1, Feature 0, Iteration 0 (first story)
- `1.0.1` - Epic 1, Feature 0, Iteration 1 (refinement/continuation)
- `1.1.0` - Epic 1, Feature 1, Iteration 0 (new feature within epic)
- `2.0.0` - Epic 2, Feature 0, Iteration 0 (first story of Epic 2)

---

## Numbering Components

### Epic Number (First Digit)

**Format:** `1`, `2`, `3`, ...

**Meaning:** The epic this story belongs to

**When to increment:**

- Moving to a new epic milestone
- New major product phase
- Different GitHub Milestone

**Examples:**

- Epic 1: Foundation & Core Infrastructure
- Epic 2: User Authentication
- Epic 3: Data Management
- Epic 4: Reporting Dashboard

---

### Major Number (Second Digit)

**Format:** `0`, `1`, `2`, ...

**Meaning:** Major feature or component within the epic

**When to increment:**

- Starting a new major feature within the same epic
- Introducing a new architectural component
- New user-facing functionality area

**When to keep same (use Minor instead):**

- Refinements to existing feature
- Bug fixes
- Small enhancements
- Continuation of same feature work

**Examples within Epic 1:**

- `1.0.x` - Project setup and initialization stories
- `1.1.x` - Database configuration stories
- `1.2.x` - Authentication foundation stories
- `1.3.x` - API structure setup stories

---

### Minor Number (Third Digit)

**Format:** `0`, `1`, `2`, ...

**Meaning:** Iteration, refinement, or continuation within the same major feature

**When to increment:**

- Each sequential story within the same feature
- Refinements to the same component
- Bug fixes for the feature
- Small enhancements

**Always starts at 0** for each new major feature

**Examples within Epic 1, Feature 0 (Project Setup):**

- `1.0.0` - Initialize Node.js project
- `1.0.1` - Configure TypeScript
- `1.0.2` - Setup testing framework
- `1.0.3` - Initialize Git repository
- `1.0.4` - Create project structure

---

## Practical Examples

### Epic 1: Foundation & Core Infrastructure

```
Story 1.0.0: Initialize Node.js project
Story 1.0.1: Configure TypeScript with strict mode
Story 1.0.2: Setup Jest testing framework
Story 1.0.3: Initialize Git repository and .gitignore
Story 1.0.4: Create project folder structure

Story 1.1.0: Setup PostgreSQL database
Story 1.1.1: Configure database connection pool
Story 1.1.2: Create initial migration scripts
Story 1.1.3: Setup database seeding

Story 1.2.0: Implement JWT authentication foundation
Story 1.2.1: Create User model and schema
Story 1.2.2: Implement password hashing with bcrypt
Story 1.2.3: Create authentication middleware

Story 1.3.0: Setup Express API structure
Story 1.3.1: Configure API routes
Story 1.3.2: Implement error handling middleware
Story 1.3.3: Setup request validation
```

### Epic 2: User Authentication

```
Story 2.0.0: Implement user signup endpoint
Story 2.0.1: Add email validation for signup
Story 2.0.2: Implement duplicate email prevention

Story 2.1.0: Implement user login endpoint
Story 2.1.1: Add login rate limiting
Story 2.1.2: Implement remember-me functionality

Story 2.2.0: Implement password reset flow
Story 2.2.1: Create password reset email template
Story 2.2.2: Add password reset token expiration

Story 2.3.0: Implement email verification
Story 2.3.1: Create verification email template
Story 2.3.2: Add resend verification option
```

---

## File Naming Convention

### Story Files

**Pattern:** `{epic}.{major}.{minor}.story.md`

**Location:** `.bmad-stories/`

**Examples:**

- `.bmad-stories/1.0.0.story.md`
- `.bmad-stories/1.0.1.story.md`
- `.bmad-stories/1.1.0.story.md`
- `.bmad-stories/2.0.0.story.md`

### Optional: Include Story Slug

**Pattern:** `{epic}.{major}.{minor}-{slug}.story.md`

**Examples:**

- `.bmad-stories/1.0.0-project-setup.story.md`
- `.bmad-stories/1.1.0-database-setup.story.md`
- `.bmad-stories/2.0.0-user-signup.story.md`

---

## GitHub Integration

### Issue Titles

**Format:** `Story {epic}.{major}.{minor}: {Title}`

**Examples:**

- `Story 1.0.0: Initialize Node.js project`
- `Story 1.0.1: Configure TypeScript with strict mode`
- `Story 2.0.0: Implement user signup endpoint`

### Milestone Naming

**Format:** `Epic {epic}: {Epic Title}`

**Examples:**

- `Epic 1: Foundation & Core Infrastructure`
- `Epic 2: User Authentication`
- `Epic 3: Data Management`

### Issue-Story Linking

In story file header:

```markdown
# Story 1.0.0: Initialize Node.js project

**GitHub Issue:** #101
**GitHub Milestone:** Epic 1: Foundation & Core Infrastructure
```

In GitHub issue body:

```markdown
Story 1.0.0: Initialize Node.js project

## Link to Enriched Story File

`.bmad-stories/1.0.0.story.md`
```

---

## Numbering Decision Tree

### "Should I increment Epic number?"

```
Is this story part of a new Epic (GitHub Milestone)?
├─ YES → New Epic number (e.g., 1.x.x → 2.0.0)
└─ NO → Keep Epic number, evaluate Major
```

### "Should I increment Major number?"

```
Is this story introducing a NEW major feature/component?
├─ YES → Increment Major, reset Minor to 0 (e.g., 1.0.x → 1.1.0)
└─ NO → Keep Major, increment Minor
```

### "Should I increment Minor number?"

```
Is this story a continuation/refinement of current feature?
├─ YES → Increment Minor (e.g., 1.0.0 → 1.0.1)
└─ NO → This should probably be a new Major
```

---

## Common Patterns

### Pattern 1: Linear Story Sequence (Simple)

**Use when:** Stories are tightly related, building on each other

```
1.0.0 - Setup project
1.0.1 - Add dependencies
1.0.2 - Configure build
1.0.3 - Add tests
1.0.4 - Setup CI/CD
```

**Advantage:** Clear progression, easy to follow
**When to use:** Project setup, configuration, sequential features

---

### Pattern 2: Feature Grouping (Organized)

**Use when:** Epic has distinct major features

```
1.0.0 - Project: Initialize
1.0.1 - Project: Configure tools
1.0.2 - Project: Setup structure

1.1.0 - Database: Setup PostgreSQL
1.1.1 - Database: Create migrations
1.1.2 - Database: Setup seeding

1.2.0 - Auth: User model
1.2.1 - Auth: Password hashing
1.2.2 - Auth: JWT tokens

1.3.0 - API: Express setup
1.3.1 - API: Route configuration
1.3.2 - API: Error handling
```

**Advantage:** Clear feature boundaries, parallel work possible
**When to use:** Complex epics with multiple independent features

---

### Pattern 3: Iterative Development (Agile)

**Use when:** Building feature incrementally with feedback

```
1.0.0 - User signup: Basic implementation
1.0.1 - User signup: Add validation
1.0.2 - User signup: Add duplicate prevention
1.0.3 - User signup: Add email verification
1.0.4 - User signup: Add welcome email
```

**Advantage:** Continuous delivery, early feedback
**When to use:** User-facing features, MVP development

---

## Migration from Old Format

### Old Format (v2): `{epic}.{story}`

```
Story 1.1: Project setup
Story 1.2: Configure TypeScript
Story 1.3: Setup testing
Story 2.1: User signup
Story 2.2: User login
```

### New Format (v3): `{epic}.{major}.{minor}`

```
Story 1.0.0: Project setup
Story 1.0.1: Configure TypeScript
Story 1.0.2: Setup testing
Story 2.0.0: User signup
Story 2.1.0: User login
```

### Conversion Rules

1. **Epic number stays the same**
   - Old: `1.x` → New: `1.x.x`
   - Old: `2.x` → New: `2.x.x`

2. **Group related stories into major features**
   - Stories 1.1, 1.2, 1.3 → 1.0.0, 1.0.1, 1.0.2 (if related)
   - OR → 1.0.0, 1.1.0, 1.2.0 (if distinct features)

3. **Start each feature at .0**
   - New major feature always starts at minor 0
   - Example: 1.1.0, 1.2.0, 1.3.0

### Migration Script Concept

```bash
# Rename story files from old to new format
# Old: 1.1.story.md → New: 1.0.0.story.md
# Old: 1.2.story.md → New: 1.0.1.story.md
# etc.
```

---

## Benefits of This Format

### 1. **Semantic Clarity**

- **Epic** = High-level milestone
- **Major** = Feature within milestone
- **Minor** = Iteration within feature

Clear hierarchy and grouping.

---

### 2. **Better Organization**

```
Epic 1: Foundation
  ├─ Feature 0: Project Setup
  │   ├─ 1.0.0: Initialize
  │   ├─ 1.0.1: Configure
  │   └─ 1.0.2: Structure
  ├─ Feature 1: Database
  │   ├─ 1.1.0: Setup
  │   └─ 1.1.1: Migrations
  └─ Feature 2: Auth
      ├─ 1.2.0: User model
      └─ 1.2.1: JWT tokens
```

Easy to see feature boundaries and story relationships.

---

### 3. **Parallel Work Identification**

Stories with different major numbers can often be worked on in parallel:

```
1.1.0 - Database setup    ┐
                          ├─ Can work in parallel
1.2.0 - Auth foundation   ┘

1.0.0 - Project init      ┐
                          ├─ Must be sequential (dependency)
1.0.1 - Project config    ┘
```

---

### 4. **Change Impact Assessment**

- **Minor increment** (1.0.0 → 1.0.1): Low impact, refinement
- **Major increment** (1.0.x → 1.1.0): Medium impact, new feature
- **Epic increment** (1.x.x → 2.0.0): High impact, new milestone

---

### 5. **Familiar to Developers**

Similar to semantic versioning (SemVer):

- `MAJOR.MINOR.PATCH` → `EPIC.MAJOR.MINOR`
- Developers understand the concept
- Clear upgrade path thinking

---

## Best Practices

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
1.0.x → 1.2.x (missing 1.1.x)
```

❌ **Mix unrelated stories in same major**

```
1.0.0 - Setup project
1.0.1 - Create user model  ← Should be 1.1.0
1.0.2 - Configure build    ← Related to 1.0.0, but out of order
```

❌ **Increment major for minor changes**

```
1.0.0 - Create User model
1.1.0 - Fix typo in User model  ← Should be 1.0.1
```

❌ **Start major at anything other than 0**

```
1.1.0 - First feature  ← Should be 1.0.0
```

---

## SM Agent Story Numbering

### Automatic Numbering

The SM agent automatically determines story numbers when using `*draft`:

1. **Reads core-config.yaml** for sharded PRD location
2. **Scans existing story files** in `.bmad-stories/`
3. **Determines next number** based on:
   - Current epic from PRD
   - Last story number created
   - Feature grouping from epic file

4. **Prompts user if ambiguous:**

   ```
   Next story number options:
   1. 1.0.1 - Continue current feature (Project Setup)
   2. 1.1.0 - Start new feature within Epic 1

   Which numbering? (1/2)
   ```

---

## QA and Testing Implications

### Test File Naming

**Pattern:** Match story number

```
.bmad-stories/1.0.0.story.md
tests/stories/1.0.0.test.ts
```

### Test Organization

```
tests/
├── epic-1/
│   ├── feature-0/
│   │   ├── 1.0.0.test.ts
│   │   ├── 1.0.1.test.ts
│   │   └── 1.0.2.test.ts
│   └── feature-1/
│       ├── 1.1.0.test.ts
│       └── 1.1.1.test.ts
└── epic-2/
    └── feature-0/
        ├── 2.0.0.test.ts
        └── 2.0.1.test.ts
```

---

## Tools and Automation

### Story Number Validation

SM agent validates:

- ✅ Epic exists in PRD
- ✅ Sequential numbering (no gaps)
- ✅ Major starts at 0 for each epic
- ✅ Minor starts at 0 for each major

### GitHub Issue Number Mapping

```
Story 1.0.0 → GitHub Issue #101
Story 1.0.1 → GitHub Issue #102
Story 1.1.0 → GitHub Issue #103
Story 2.0.0 → GitHub Issue #104
```

GitHub issue number is independent of story number.

---

## Summary

### Format

```
Epic.Major.Minor
```

### Quick Reference

| Component | Meaning              | Example |
| --------- | -------------------- | ------- |
| **Epic**  | Milestone/Phase      | 1, 2, 3 |
| **Major** | Feature/Component    | 0, 1, 2 |
| **Minor** | Iteration/Refinement | 0, 1, 2 |

### Example Story List

```
Epic 1: Foundation
  1.0.0 - Initialize project
  1.0.1 - Configure TypeScript
  1.1.0 - Setup database
  1.1.1 - Create migrations
  1.2.0 - Implement authentication

Epic 2: User Features
  2.0.0 - User signup
  2.0.1 - Email validation
  2.1.0 - User login
  2.2.0 - Password reset
```

---

**This numbering standard ensures clear organization, better tracking, and easier understanding of story relationships throughout the development lifecycle.**
