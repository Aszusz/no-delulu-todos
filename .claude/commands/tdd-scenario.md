---
name: tdd-scenario
description: Executes a single TDD Red-Green-Refactor cycle for one scenario and commits. Use standalone or let /implement-issue orchestrate via subagents.
argument-hint: <issue-number> <scenario-description>
---

# TDD Cycle: $2

Execute ONE complete Red-Green-Refactor cycle for the scenario described above, linked to issue #$1.

**Note:** This command can be run standalone. When using `/implement-issue`, TDD cycles are executed via Task subagents instead (for proper control flow).

**IMPORTANT: This command handles exactly ONE scenario. Do not implement multiple scenarios.**

## 1. Red Phase - Write Failing Test

- Read @TESTING.md for test patterns
- Create test IDs in `test/steps/*.testIds.ts` if needed
- Write step definitions in `test/steps/*.steps.ts`
- Add scenario to feature file in `_features/*.feature`
- Run `npm test` and **verify the new test FAILS**
- If test passes immediately, the test is not testing new behavior - fix it

## 2. Green Phase - Make It Pass

- Read @CLAUDE.md for architecture patterns
- Write the **minimal** implementation to make the test pass
- Modify only what's necessary for THIS scenario
- Run `npm test` and **verify ALL tests PASS**

## 3. Refactor Phase - Clean Up

- Improve code quality while keeping tests green
- Apply @CLAUDE.md patterns and conventions
- Remove duplication if any
- Run `npm run all` (format, lint, typecheck, test)
- **All checks must pass before proceeding**

## 4. Commit This Scenario

After all checks pass, create a commit for THIS scenario only:

```bash
git add <specific files changed>
git commit -m "feat: <scenario-description> (#$1)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

## 5. Verify and Report

- Run `git log --oneline -1` to confirm commit was created
- Report: commit hash, files changed, what was implemented

---

**Scope Constraint:** This command implements exactly ONE scenario. If you notice other scenarios that need work, note them but do NOT implement them.
