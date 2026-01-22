---
name: implement-issue
description: Orchestrates implementation of a GitHub issue using Task subagents for each TDD phase. Creates exactly 3 commits.
argument-hint: [issue-number]
---

# Implement Issue #$1

Orchestrate the implementation of issue #$1 using **three phase-based Task subagents**: Red, Green, Refactor. Each phase handles ALL scenarios and creates ONE commit.

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

- Small enough to be independently testable
- Mapped to a specific acceptance criterion

Example output:

```
Scenarios for issue #$1:
1. "add todo with text input"
2. "prevent empty todo submission"
3. "toggle todo done status"
...
```

## 5. Execute Three TDD Phases

**CRITICAL: Spawn exactly THREE subagents - one per TDD phase. Each phase handles ALL scenarios.**

### Phase 1: Red

```
Task(
  description: "Red: write failing tests",
  subagent_type: "general-purpose",
  prompt: "Follow the /red command: /red $1 <comma-separated scenarios>"
)
```

**After Red phase:** Verify commit with `git log --oneline -1`

### Phase 2: Green

```
Task(
  description: "Green: implement scenarios",
  subagent_type: "general-purpose",
  prompt: "Follow the /green command: /green $1 <comma-separated scenarios>"
)
```

**After Green phase:** Verify commit with `git log --oneline -1`

### Phase 3: Refactor

```
Task(
  description: "Refactor: clean up code",
  subagent_type: "general-purpose",
  prompt: "Follow the /refactor command: /refactor $1"
)
```

**After Refactor phase:** Verify commit with `git log --oneline -1`

## 6. Verify Commit History

Before creating the PR:

```bash
git log --oneline main..HEAD
```

**Verify:** There should be exactly THREE commits:

1. `test: add failing tests for issue #$1`
2. `feat: implement issue #$1`
3. `refactor: clean up issue #$1 implementation`

## 7. Submit Pull Request

- Push branch: `git push -u origin feature/issue-$1`
- Create PR using GitHub MCP:
  - Title: `Fixes #$1: [feature summary]`
  - Body: List all scenarios implemented with their commits
  - Reference: `Closes #$1`

---

**Orchestrator Role:** This command PLANS and DELEGATES via three Task subagents (Red, Green, Refactor). Each subagent follows the corresponding /red, /green, or /refactor command. You maintain control flow between phases.
