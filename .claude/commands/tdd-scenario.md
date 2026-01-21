---
name: tdd-scenario
description: Executes a single TDD Red-Green-Refactor cycle for one scenario and commits. Use this for incremental development.
argument-hint: <issue-number> <scenario-description>
allowed-tools: Bash(git:*), Read, Edit, Glob, Grep
---

# TDD Cycle: $2

Execute ONE complete Red-Green-Refactor cycle for the scenario described above, linked to issue #$1.

**IMPORTANT: This command handles exactly ONE scenario. Do not implement multiple scenarios.**

## 1. Red Phase - Write Failing Test

- Add or update test files following @TESTING.md patterns
- Create test IDs in `test/steps/*.testIds.ts` if needed
- Write step definitions in `test/steps/*.steps.ts`
- Add scenario to feature file in `_features/*.feature`
- Run `npm test` and **verify the new test FAILS**
- If test passes immediately, the test is not testing new behavior - fix it

## 2. Green Phase - Make It Pass

- Write the **minimal** implementation to make the test pass
- Follow patterns in @CLAUDE.md (layer-based Redux architecture)
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

## 5. Verify and Stop

- Run `git log --oneline -1` to confirm commit was created
- **STOP HERE** - Do not continue to other scenarios
- Report back what was implemented and committed

---

**Scope Constraint:** This command implements exactly ONE scenario. If you notice other scenarios that need work, note them but do NOT implement them. Return control after committing.
