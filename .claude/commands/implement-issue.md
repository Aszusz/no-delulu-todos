---
name: implement-issue
description: Orchestrates implementation of a GitHub issue using Task subagents for each TDD phase. Creates exactly 3 commits.
argument-hint: [issue-number]
---

# Implement Issue #$1

Orchestrate the implementation of issue #$1 by detecting labels and routing to the appropriate workflow.

## 1. Fetch Issue and Detect Labels

- Fetch and read issue #$1 using GitHub MCP
- Extract all labels from the issue
- Parse all acceptance criteria and business rules
- Note any linked issues or dependencies

## 2. Route to Appropriate Workflow

Based on detected labels, route to the specialized workflow:

| Priority | Labels                            | Workflow               | Command             |
| -------- | --------------------------------- | ---------------------- | ------------------- |
| 1        | `design`, `ui`, `frontend`        | Design Workflow        | `/design $1`        |
| 2        | `bug`, `fix`, `hotfix`            | Bug Fix Workflow       | `/bugfix $1`        |
| 3        | `refactor`, `chore`               | Refactor-Only Workflow | `/refactor-only $1` |
| 4        | `feature`, `enhancement`, or none | TDD Workflow           | Continue below      |

**If a specialized workflow is matched:**

```
Skill(
  skill: "[matched-command]",
  args: "$1"
)
```

**If no specialized labels match, continue with TDD workflow below.**

---

## TDD Workflow (Default)

For `feature`, `enhancement`, or unlabeled issues, use the three-phase TDD approach.

### 3. Create Feature Branch

```bash
git checkout -b feature/issue-$1
```

### 4. Explore Codebase

- Search for related features and similar implementations
- Identify existing patterns and conventions in @CLAUDE.md
- Review @TESTING.md for test patterns

### 5. Plan Scenarios

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

### 6. Execute Three TDD Phases

**CRITICAL: Spawn exactly THREE subagents - one per TDD phase. Each phase handles ALL scenarios.**

#### Phase 1: Red

```
Task(
  description: "Red: write failing tests",
  subagent_type: "general-purpose",
  prompt: "Follow the /red command: /red $1 <comma-separated scenarios>"
)
```

**After Red phase:** Verify commit with `git log --oneline -1`

#### Phase 2: Green

```
Task(
  description: "Green: implement scenarios",
  subagent_type: "general-purpose",
  prompt: "Follow the /green command: /green $1 <comma-separated scenarios>"
)
```

**After Green phase:** Verify commit with `git log --oneline -1`

#### Phase 3: Refactor

```
Task(
  description: "Refactor: clean up code",
  subagent_type: "general-purpose",
  prompt: "Follow the /refactor command: /refactor $1"
)
```

**After Refactor phase:** Verify commit with `git log --oneline -1`

### 7. Verify Commit History

Before creating the PR:

```bash
git log --oneline main..HEAD
```

**Verify:** There should be exactly THREE commits:

1. `test: add failing tests for issue #$1`
2. `feat: implement issue #$1`
3. `refactor: clean up issue #$1 implementation`

### 8. Submit Pull Request

- Push branch: `git push -u origin feature/issue-$1`
- Create PR using GitHub MCP:
  - Title: `Fixes #$1: [feature summary]`
  - Body: List all scenarios implemented with their commits
  - Reference: `Closes #$1`

---

## Workflow Summary

| Workflow      | Branch Pattern     | Commits | Commit Prefixes               |
| ------------- | ------------------ | ------- | ----------------------------- |
| TDD (default) | `feature/issue-N`  | 3       | `test:`, `feat:`, `refactor:` |
| Design        | `design/issue-N`   | 1       | `design:`                     |
| Bug Fix       | `fix/issue-N`      | 1       | `fix:`                        |
| Refactor      | `refactor/issue-N` | 1       | `refactor:`                   |

**Orchestrator Role:** This command detects labels to route to specialized workflows (/design, /bugfix, /refactor-only) or executes the default TDD workflow via three Task subagents (Red, Green, Refactor).
