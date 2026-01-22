---
name: red
description: Write failing tests for all scenarios. First phase of TDD cycle.
argument-hint: <issue-number> <scenario-1>, <scenario-2>, ...
---

# Red Phase: Write Failing Tests

Write failing tests for ALL scenarios listed below, linked to issue #$1.

**Scenarios:** $2

## Instructions

### 1. Gather Context

- Read @TESTING.md for test patterns and conventions
- Read existing step definitions to understand patterns
- Identify which feature files and step files to create/modify

### 2. Write Tests for Each Scenario

For EACH scenario:

1. Create test IDs in `test/steps/*.testIds.ts` if needed
2. Write step definitions in `test/steps/*.steps.ts`
3. Add scenario to feature file in `_features/*.feature`

### Guidelines

- **Reuse existing steps** - Check if a step already exists before creating
- **Use consistent selectors** - Follow the project's test ID strategy
- **Keep steps declarative** - Implementation details stay in step definitions
- **One file per feature** - Match step file names to feature file names

### 3. Verify Red State

1. Run `npm run lint` and `npm run typecheck` - code should pass
2. Run `npm test` - tests should FAIL (this is expected and correct)
3. Confirm tests fail because functionality doesn't exist yet, not due to syntax errors

### 4. Commit

```bash
git add _features/ test/
git commit -m "test: add failing tests for issue #$1

Scenarios:
- <list each scenario>

Co-Authored-By: Claude <noreply@anthropic.com>"
```

### 5. Report

Return:

- Commit hash
- Files created/modified
- List of failing tests (scenario names)
- Test output showing failures

---

**Success Criteria:** Tests fail because the functionality doesn't exist yet. This is the expected "red" state.
