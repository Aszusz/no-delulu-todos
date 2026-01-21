---
name: implement-issue
description: Orchestrates implementation of a GitHub issue by invoking /tdd-scenario for each requirement. Creates one commit per scenario.
argument-hint: [issue-number]
allowed-tools: Bash(git:*), Read, Edit, Glob, Grep
---

# Implement Issue #$1

Orchestrate the implementation of issue #$1 by breaking it into scenarios and executing `/tdd-scenario` for each one.

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

**CRITICAL: Execute `/tdd-scenario $1 "<description>"` for EACH scenario separately.**

For each scenario in your list:

1. Run: `/tdd-scenario $1 "<scenario-description>"`
2. Wait for it to complete and commit
3. Verify commit exists: `git log --oneline -1`
4. Only then proceed to the next scenario

**Do NOT batch scenarios. Do NOT skip the /tdd-scenario command.**

Example sequence:

```
/tdd-scenario $1 "add todo with text input"
  → completes, commits
/tdd-scenario $1 "prevent empty todo submission"
  → completes, commits
/tdd-scenario $1 "toggle todo done status"
  → completes, commits
```

## 6. Verify Commit History

Before creating the PR:

```bash
git log --oneline main..HEAD
```

**Verify:** There should be ONE commit PER scenario. If you see a single commit containing multiple scenarios, something went wrong.

## 7. Submit Pull Request

- Push branch: `git push -u origin feature/issue-$1`
- Create PR using GitHub MCP:
  - Title: `Fixes #$1: [feature summary]`
  - Body: List all scenarios implemented with their commits
  - Reference: `Closes #$1`

---

**Orchestrator Role:** This command PLANS and DELEGATES. The actual TDD work happens in `/tdd-scenario`. Your job is to identify scenarios and invoke that command for each one, verifying commits between invocations.
