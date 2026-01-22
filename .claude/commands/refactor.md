---
name: refactor
description: Clean up implementation while keeping tests green. Third phase of TDD cycle.
argument-hint: <issue-number>
---

# Refactor Phase: Clean Up

Refactor the implementation for issue #$1 while keeping all tests green.

## Instructions

### 1. Verify Green State First

Run `npm run all` (format, lint, typecheck, test)

**If any check fails:** Stop. Fix issues before refactoring. Do not proceed with broken tests.

### 2. Gather Context

- Read @CLAUDE.md for architecture patterns and conventions
- Identify code that could be improved:
  - Duplication
  - Unclear naming
  - Missing abstractions (only if clearly needed)
  - Style inconsistencies

### 3. Refactor Incrementally

Apply improvements while keeping tests green:

1. **Small changes** - One refactoring at a time
2. **Run `npm run all` after each change** - Catch regressions immediately
3. **If any check fails** - Revert and try smaller step

### Refactoring Principles

- **Preserve behavior** - If tests fail, you changed behavior
- **One concept at a time** - Extract, then rename, then move. Not all at once.
- **Don't add features** - Structure changes only
- **Don't fix unrelated issues** - Stay focused

### 4. Final Verification

Run `npm run all` - ALL checks must pass:

- Format
- Lint
- Typecheck
- Test

### 5. Commit

```bash
git add -A
git commit -m "refactor: clean up issue #$1 implementation

Co-Authored-By: Claude <noreply@anthropic.com>"
```

### 6. Report

Return:

- Commit hash
- Files modified
- What was refactored
- Final `npm run all` output

---

**Success Criteria:** Code is cleaner, all checks pass, behavior unchanged.
