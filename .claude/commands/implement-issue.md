---
name: implement-issue
description: Orchestrates implementation of a GitHub issue using Task subagents for each TDD cycle. Creates one commit per scenario.
argument-hint: [issue-number]
---

# Implement Issue #$1

Orchestrate the implementation of issue #$1 by breaking it into scenarios and spawning a **Task subagent** for each TDD cycle.

## 1. Understand Requirements

- Fetch and read issue #$1 using GitHub MCP
- Parse all acceptance criteria and business rules
- Note any labels, linked issues, or dependencies

## 2. Create Feature Branch

```bash
git checkout -b feature/issue-$1
```

## 3. Explore Codebase

- Search for related features and similar implementations
- Identify existing patterns and conventions in @CLAUDE.md
- Review @TESTING.md for test patterns

## 4. Plan Scenarios

Create an ordered list of scenarios to implement. Each scenario should be:

- Small enough for one TDD cycle
- Independently testable
- Mapped to a specific acceptance criterion

Example output:

```
Scenarios for issue #$1:
1. "add todo with text input"
2. "prevent empty todo submission"
3. "toggle todo done status"
...
```

## 5. Implement Scenarios (One at a Time)

**CRITICAL: Use the Task tool with `subagent_type: "general-purpose"` for EACH scenario.**

For each scenario, spawn a subagent with this prompt structure:

````
Task(
  description: "TDD: <short-scenario-name>",
  subagent_type: "general-purpose",
  prompt: """
Execute ONE complete TDD Red-Green-Refactor cycle for issue #$1.

**Scenario:** <scenario-description>

## Instructions

### 1. Red Phase - Write Failing Test
- Read TESTING.md for test patterns
- Create test IDs in `test/steps/*.testIds.ts` if needed
- Write step definitions in `test/steps/*.steps.ts`
- Add scenario to feature file in `_features/*.feature`
- Run `npm test` and verify the new test FAILS

### 2. Green Phase - Make It Pass
- Read CLAUDE.md for architecture patterns
- Write minimal implementation to make the test pass
- Run `npm test` and verify ALL tests PASS

### 3. Refactor Phase - Clean Up
- Improve code quality while keeping tests green
- Run `npm run all` (format, lint, typecheck, test)
- All checks must pass

### 4. Commit
```bash
git add <specific files>
git commit -m "feat: <scenario-description> (#$1)

Co-Authored-By: Claude <noreply@anthropic.com>"
````

### 5. Return Summary

Return: commit hash, files changed, what was implemented.
"""
)

````

After each Task completes:
1. Verify commit exists: `git log --oneline -1`
2. Only then proceed to the next scenario

**Do NOT batch scenarios into a single Task. One Task per scenario.**

## 6. Verify Commit History

Before creating the PR:

```bash
git log --oneline main..HEAD
````

**Verify:** There should be ONE commit PER scenario.

## 7. Submit Pull Request

- Push branch: `git push -u origin feature/issue-$1`
- Create PR using GitHub MCP:
  - Title: `Fixes #$1: [feature summary]`
  - Body: List all scenarios implemented with their commits
  - Reference: `Closes #$1`

---

**Orchestrator Role:** This command PLANS and DELEGATES via Task subagents. Each subagent runs a complete TDD cycle and returns. You maintain control flow between scenarios.
