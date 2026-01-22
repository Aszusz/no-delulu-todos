---
name: implement-issue
description: Orchestrates implementation of a GitHub issue using Task subagents for each TDD phase. Creates exactly 3 commits.
argument-hint: [issue-number]
---

# Implement Issue #$1

Orchestrate the implementation of issue #$1 by detecting labels, routing to the appropriate workflow, and creating a PR.

## 1. Fetch Issue and Detect Labels

- Fetch and read issue #$1 using GitHub MCP
- Extract all labels from the issue
- Parse all acceptance criteria and business rules
- Note any linked issues or dependencies

## 2. Determine Workflow and Create Branch

Based on detected labels, determine the workflow and create the appropriate branch:

| Priority | Labels                            | Workflow               | Branch Pattern     |
| -------- | --------------------------------- | ---------------------- | ------------------ |
| 1        | `design`, `ui`, `frontend`        | Design Workflow        | `design/issue-$1`  |
| 2        | `bug`, `fix`, `hotfix`            | Bug Fix Workflow       | `fix/issue-$1`     |
| 3        | `refactor`, `chore`               | Refactor-Only Workflow | `refactor/issue-$1`|
| 4        | `feature`, `enhancement`, or none | TDD Workflow           | `feature/issue-$1` |

```bash
git checkout -b [branch-pattern]
```

## 3. Execute Workflow

### If Design Workflow:

```
Skill(
  skill: "design",
  args: "$1"
)
```

### If Bug Fix Workflow:

```
Skill(
  skill: "bugfix",
  args: "$1"
)
```

### If Refactor-Only Workflow:

```
Skill(
  skill: "refactor-only",
  args: "$1"
)
```

### If TDD Workflow (Default):

#### 3a. Explore Codebase

- Search for related features and similar implementations
- Identify existing patterns and conventions in @CLAUDE.md
- Review @TESTING.md for test patterns

#### 3b. Plan Scenarios

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

#### 3c. Execute Three TDD Phases

**CRITICAL: Spawn exactly THREE subagents - one per TDD phase. Each phase handles ALL scenarios.**

**Phase 1: Red**

```
Task(
  description: "Red: write failing tests",
  subagent_type: "general-purpose",
  prompt: "Follow the /red command: /red $1 <comma-separated scenarios>"
)
```

**After Red phase:** Verify commit with `git log --oneline -1`

**Phase 2: Green**

```
Task(
  description: "Green: implement scenarios",
  subagent_type: "general-purpose",
  prompt: "Follow the /green command: /green $1 <comma-separated scenarios>"
)
```

**After Green phase:** Verify commit with `git log --oneline -1`

**Phase 3: Refactor**

```
Task(
  description: "Refactor: clean up code",
  subagent_type: "general-purpose",
  prompt: "Follow the /refactor command: /refactor $1"
)
```

**After Refactor phase:** Verify commit with `git log --oneline -1`

## 4. Verify Commits

Before creating the PR, verify commits exist:

```bash
git log --oneline main..HEAD
```

**Expected commits by workflow:**

| Workflow      | Commits | Prefixes                        |
| ------------- | ------- | ------------------------------- |
| Design        | 1       | `design:`                       |
| Bug Fix       | 1       | `fix:`                          |
| Refactor-Only | 1       | `refactor:`                     |
| TDD (default) | 3       | `test:`, `feat:`, `refactor:`   |

## 5. Submit Pull Request

Push the branch and create PR:

```bash
git push -u origin [branch-name]
```

Create PR using GitHub MCP with:

- **Title:** Based on workflow type and issue summary
  - Design: `Design: [summary] (#$1)`
  - Bug Fix: `Fix: [summary] (#$1)`
  - Refactor: `Refactor: [summary] (#$1)`
  - TDD: `Feat: [summary] (#$1)`
- **Body:** Summary of changes made, referencing commits
- **Reference:** `Closes #$1`

---

## Workflow Summary

| Workflow      | Branch Pattern     | Commits | Commit Prefixes               |
| ------------- | ------------------ | ------- | ----------------------------- |
| TDD (default) | `feature/issue-N`  | 3       | `test:`, `feat:`, `refactor:` |
| Design        | `design/issue-N`   | 1       | `design:`                     |
| Bug Fix       | `fix/issue-N`      | 1       | `fix:`                        |
| Refactor      | `refactor/issue-N` | 1       | `refactor:`                   |

**Orchestrator Role:** This command detects labels, creates the branch, routes to specialized workflows (/design, /bugfix, /refactor-only) or executes the default TDD workflow, then creates the PR for all workflows.
