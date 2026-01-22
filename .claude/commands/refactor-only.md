---
name: refactor-only
description: Pure refactoring workflow without new features. Creates a single commit. Tests must stay green throughout.
argument-hint: [issue-number]
---

# Refactor-Only Workflow for Issue #$1

Perform pure refactoring as described in issue #$1. No new features or behavior changes.

## 1. Understand Refactoring Scope

- Fetch and read issue #$1 using GitHub MCP
- Identify what code needs refactoring
- Understand the goal (readability, performance, maintainability, etc.)
- Note any constraints or patterns to follow

## 2. Create Refactor Branch

```bash
git checkout -b refactor/issue-$1
```

## 3. Verify Green State

Before any changes, ensure all tests pass:

```bash
npm run all
```

**CRITICAL:** If tests are not green, stop and fix existing issues first.

## 4. Explore Code to Refactor

- Locate the code areas mentioned in the issue
- Review existing tests that cover this code
- Understand current patterns and dependencies
- Plan the refactoring approach

## 5. Apply Incremental Refactoring

Refactor in small, safe steps. After EACH change:

```bash
npm run all
```

**CRITICAL:** Tests must pass after every incremental change. If tests fail, revert the last change and try a different approach.

Refactoring guidelines:

- **No behavior changes** - external behavior must remain identical
- **Small steps** - make one logical change at a time
- **Run tests frequently** - catch regressions immediately
- **Preserve test coverage** - do not remove or weaken tests

Common refactoring patterns:

- Extract function/component
- Rename for clarity
- Simplify conditionals
- Remove duplication
- Improve type definitions
- Reorganize file structure

## 6. Final Verification

```bash
npm run all
```

Ensure all checks pass:

- Formatting
- Linting
- Type checking
- All tests

## 7. Create Single Commit

```bash
git add -A
git commit -m "refactor: [description] for issue #$1

- [List key refactoring changes]
- [Note any patterns applied]"
```

## 8. Report

Return:

- Commit hash
- Files modified
- Description of what was refactored and why
- Note that no behavior changes were made

---

**Workflow Role:** This command ensures pure refactoring with continuous test verification. Use for issues labeled `refactor` or `chore`. Called by `/implement-issue` orchestrator which handles PR creation.
