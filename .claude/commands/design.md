---
name: design
description: Implement UI/design issues using visual iteration instead of TDD. Creates a single design commit.
argument-hint: [issue-number]
---

# Design Workflow for Issue #$1

Implement the UI/design requirements from issue #$1 using visual iteration and the `/frontend-design` skill.

## 1. Understand Requirements

- Fetch and read issue #$1 using GitHub MCP
- Identify visual/UI requirements, mockups, or design specifications
- Note any specific components, layouts, or styling requirements
- Parse acceptance criteria related to visual appearance

## 2. Create Design Branch

```bash
git checkout -b design/issue-$1
```

## 3. Explore Existing UI Patterns

- Search for related UI components and patterns in the codebase
- Review existing Tailwind CSS usage and design tokens
- Identify reusable components that can be leveraged
- Check for design system conventions in @CLAUDE.md

## 4. Implement Using Frontend Design Skill

Use the `/frontend-design` skill to implement the UI requirements:

```
Skill(
  skill: "frontend-design:frontend-design",
  args: "[description of UI requirements from issue #$1]"
)
```

The frontend-design skill will:

- Create distinctive, production-grade frontend interfaces
- Generate polished code that avoids generic AI aesthetics
- Follow existing patterns and conventions

## 5. Visual Verification

Start the development server and verify the implementation visually:

```bash
npm run dev
```

- Check all visual requirements are met
- Verify responsive behavior if applicable
- Test interactive states (hover, focus, active)
- Ensure accessibility considerations

## 6. Run Quality Checks

```bash
npm run lint && npm run typecheck
```

Fix any linting or type errors before committing.

## 7. Create Single Commit

```bash
git add -A
git commit -m "design: implement UI for issue #$1

- [List key visual changes]
- [Note any new components created]"
```

## 8. Report

Return:

- Commit hash
- Files created/modified
- Summary of visual changes implemented

---

**Workflow Role:** This command focuses on visual iteration rather than test-driven development. Use for issues labeled `design`, `ui`, or `frontend`. Called by `/implement-issue` orchestrator which handles PR creation.
