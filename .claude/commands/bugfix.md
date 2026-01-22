---
name: bugfix
description: Fix bugs with a regression test. Creates a single commit containing both the test and fix.
argument-hint: [issue-number]
---

# Bug Fix Workflow for Issue #$1

Fix the bug reported in issue #$1 by first writing a regression test, then implementing the minimal fix.

## 1. Understand the Bug

- Fetch and read issue #$1 using GitHub MCP
- Identify reproduction steps
- Note expected behavior vs actual behavior
- Understand the root cause if documented

## 2. Create Fix Branch

```bash
git checkout -b fix/issue-$1
```

## 3. Reproduce the Bug

- Follow the reproduction steps from the issue
- Verify the bug exists in the current codebase
- Understand the conditions that trigger the bug
- Document any additional context discovered

## 4. Explore Related Code

- Search for the code area where the bug occurs
- Review related tests for context
- Identify the minimal change needed to fix the bug
- Check for similar issues that might be affected

## 5. Write Failing Regression Test

Write a test that:

- Captures the exact bug behavior
- Fails with the current implementation
- Will pass once the bug is fixed
- Prevents future regressions

```bash
npm test
```

**Verify:** The new test FAILS (proves the bug exists).

## 6. Implement Minimal Fix

Apply the smallest change needed to fix the bug:

- Focus on the root cause, not symptoms
- Avoid unrelated refactoring
- Keep the change scope minimal

```bash
npm test
```

**Verify:** All tests PASS (including the new regression test).

## 7. Run Full Quality Checks

```bash
npm run all
```

Ensure no regressions in formatting, linting, types, or other tests.

## 8. Create Single Commit

```bash
git add -A
git commit -m "fix: resolve issue #$1

- Add regression test for [bug description]
- Fix [root cause description]"
```

**Note:** Both the regression test and the fix are included in a single commit.

## 9. Report

Return:

- Commit hash
- Files created/modified
- Description of the bug and root cause
- Summary of the fix approach

---

**Workflow Role:** This command ensures bugs are fixed with proper regression tests. Use for issues labeled `bug`, `fix`, or `hotfix`. Called by `/implement-issue` orchestrator which handles PR creation.
