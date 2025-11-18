# Test Plan: Verify Agents Use Pre-Installed Functions (v3.11.1)

## Issue Being Fixed

Agents were writing NEW implementations of search/get functions instead of importing and using the pre-installed TypeScript functions from `.claude/servers/`.

## What Changed in v3.11.1

Agent definitions completely rewritten with:

- ⚠️ CRITICAL INSTRUCTION warning at top
- Clear DO/DON'T lists
- Simple import/use examples only
- All complex implementation examples removed

## Test Procedure

### 1. Install/Update to v3.11.1

```bash
npm install -g @dkreuzer/bmad-method-ai-research@3.11.1
npx bmad-method install-agents
```

### 2. Verify Installation

Check that agent definitions have the new format:

```bash
head -30 .claude/agents/arxiv-research-specialist.md
```

You should see:

```markdown
## ⚠️ CRITICAL INSTRUCTION ⚠️

**THE FUNCTIONS YOU NEED ARE ALREADY INSTALLED. DO NOT WRITE NEW IMPLEMENTATIONS.**
```

### 3. Test ArXiv Specialist

In Claude Code, invoke the ArXiv specialist:

```
@arxiv-research-specialist Search for recent papers on "flash attention" from the last year
```

**Expected Behavior:**

```typescript
// Should see the agent execute code like this:
import { searchRecent } from './servers/arxiv/search.ts';
const papers = await searchRecent('flash attention', 1);
console.log(`Found ${papers.length} papers`);
```

**WRONG Behavior (what we're fixing):**

```typescript
// Should NOT see the agent write new implementations like:
async function searchRecent(topic, yearsBack) {
  const url = new URL('http://export.arxiv.org/api/query');
  const response = await fetch(url);
  // ... hundreds of lines of new code ...
}
```

### 4. Test Zotero Specialist

In Claude Code:

```
@zotero-research-specialist Search my library for papers on "transformers"
```

**Expected Behavior:**

```typescript
import { search } from './servers/zotero/search.ts';
const items = await search('transformers');
```

**WRONG Behavior:**

```typescript
// Should NOT write new fetch() implementations
```

### 5. Verification Checklist

- [ ] Agent imports functions from `./servers/arxiv/` or `./servers/zotero/`
- [ ] Agent calls the imported functions directly
- [ ] Agent does NOT write new `async function search()` definitions
- [ ] Agent does NOT write new `fetch()` calls
- [ ] Agent does NOT create XML parsing code
- [ ] Results are returned successfully

## Success Criteria

✅ Agents import and use pre-installed functions
✅ No new implementations written
✅ Search results returned successfully

## If Test Fails

If agents are STILL writing new code:

1. Check agent definition file has the warning:

   ```bash
   grep -A 5 "CRITICAL INSTRUCTION" .claude/agents/arxiv-research-specialist.md
   ```

2. Check server files exist:

   ```bash
   ls -l .claude/servers/arxiv/
   ls -l .claude/servers/zotero/
   ```

3. Verify correct version installed:

   ```bash
   npm list -g @dkreuzer/bmad-method-ai-research
   ```

4. Try reinstalling:
   ```bash
   rm -rf .claude/
   npx bmad-method install-agents
   ```

## Technical Details

**Files Modified in v3.11.1:**

- `expansion-packs/bmad-research-dev/templates/agents/arxiv-research-specialist.md`
- `expansion-packs/bmad-research-dev/templates/agents/zotero-research-specialist.md`

**Key Changes:**

- Removed ~650 lines of implementation examples from Zotero agent
- Removed ~850 lines of implementation examples from ArXiv agent
- Added explicit instructions that functions are ALREADY INSTALLED
- Emphasized import/use pattern over implementation details

**Agent Definition Structure:**

1. Critical warning (new)
2. What to DO (new)
3. What NOT to do (new)
4. List of available functions (enhanced)
5. Simple usage examples (simplified from previous version)
6. Data structures (kept)

## Expected Conversation Flow

**Good Example:**

```
User: @arxiv-research-specialist Find papers on efficient transformers
Agent: I'll search for papers using the pre-installed search function.
Agent: [executes] import { search } from './servers/arxiv/search.ts'
Agent: Found 10 papers on efficient transformers: ...
```

**Bad Example (what we're fixing):**

```
User: @arxiv-research-specialist Find papers on efficient transformers
Agent: I'll implement a function to search arXiv...
Agent: [writes 200+ lines of new code]
Agent: Here's my implementation... (never actually searches)
```
