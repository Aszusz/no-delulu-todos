---
name: green
description: Implement minimal code to make all tests pass. Second phase of TDD cycle.
argument-hint: <issue-number> <scenario-1>, <scenario-2>, ...
---

# Green Phase: Make Tests Pass

Implement MINIMAL code to make all tests pass for issue #$1.

**Scenarios:** $2

## Instructions

### 1. Gather Context

- Read @CLAUDE.md for architecture patterns and conventions
- Read @TESTING.md for how to wire test selectors to implementation
- Read the step definition files to understand what behaviors tests expect
- Check what test IDs/selectors are exported and need to be used

### 2. Implement Each Scenario

For EACH scenario, write the MINIMAL implementation to make its tests pass:

1. Import selectors from test files - never hardcode test IDs
2. Wire selectors to UI elements as specified in TESTING.md
3. Implement only what tests require - no extra features

### Guidelines

- **Minimal implementation** - Only what tests require
- **No over-engineering** - No premature abstractions
- **Follow existing patterns** - Match codebase style and conventions
- **Import test selectors** - Never hardcode test IDs

### Implementation Loop

Repeat until all tests pass:

1. Run `npm test`
2. Analyze failures - identify specific assertion failing
3. Implement fix - make minimal change to address failure
4. Verify - run tests again

### 3. Verify Green State

1. Run `npm test` - ALL tests should pass
2. Run `npm run lint` and `npm run typecheck` - should pass

### 4. Commit

```bash
git add src/
git commit -m "feat: implement issue #$1

Scenarios:
- <list each scenario>

Co-Authored-By: Claude <noreply@anthropic.com>"
```

### 5. Report

Return:

- Commit hash
- Files created/modified
- What was implemented for each scenario
- Test output showing all passing

---

**Success Criteria:** All tests pass with minimal implementation.
