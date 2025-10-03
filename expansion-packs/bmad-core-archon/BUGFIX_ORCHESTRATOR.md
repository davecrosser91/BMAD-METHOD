# Orchestrator Bug Fix - File Path References

**Date:** 2025-10-03
**Issue:** @bmad-orchestrator and @bmad-master agents failing due to incorrect file path references

## Problem

The orchestrator agents were trying to load `.bmad-core/core-config.yaml` which doesn't exist in the expansion pack structure. This caused activation failures.

## Root Cause

The agents were copied from the base bmad-core package which uses a `.bmad-core/` directory structure, but bmad-core-archon uses a flat structure with `core-config.yaml` in the expansion pack root.

## Files Fixed

### 1. `agents/bmad-orchestrator.md`

- **Changed:** Activation step 3 from loading `.bmad-core/core-config.yaml` (required) to optionally loading `core-config.yaml` from expansion pack root
- **Removed:** Invalid dependency on `utils/workflow-management.md` (file doesn't exist)

### 2. `agents/bmad-master.md`

- **Changed:** Activation step 3 from loading `.bmad-core/core-config.yaml` (required) to optionally loading `core-config.yaml` from expansion pack root
- **Changed:** Critical instruction from "Exception: Read bmad-core/core-config.yaml" to "Exception: Optionally try to read core-config.yaml"

## Changes Made

### Before:

```yaml
activation-instructions:
  - STEP 3: Load and read `.bmad-core/core-config.yaml` (project configuration) before any greeting
```

### After:

```yaml
activation-instructions:
  - STEP 3: OPTIONAL - Try to load `core-config.yaml` from expansion pack root if available (for Archon config), but do NOT fail if missing
```

### Removed Dependency:

```yaml
# Before
dependencies:
  utils:
    - workflow-management.md # File doesn't exist

# After
# (removed utils section entirely)
```

## Impact

- ✅ @bmad-orchestrator should now activate successfully
- ✅ @bmad-master should now activate successfully
- ✅ Archon configuration will be loaded if available, but won't cause failure if missing
- ✅ No invalid file dependencies

## Testing

To verify the fix works:

```bash
# Activate orchestrator
@bmad-orchestrator

# Should see:
# - Successful activation
# - Greeting from BMad Orchestrator
# - *help command output
# - No file path errors
```

## Related Files

The following agents still correctly reference their dependencies:

- `analyst.md` - No core-config reference
- `pm.md` - No core-config reference
- `architect.md` - No core-config reference
- `dev.md` - No core-config reference
- `qa.md` - No core-config reference
- `po.md` - No core-config reference

## Additional Notes

The `core-config.yaml` file exists at:

```
expansion-packs/bmad-core-archon/core-config.yaml
```

It contains Archon-specific configuration:

- Archon enabled/required flags
- Knowledge base settings
- Task management defaults
- Document type mappings

This configuration is used by Archon-integrated agents (PM, Dev, Architect, etc.) but is not critical for orchestrator activation.
