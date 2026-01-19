# BDD Automate (Refactor Phase)

Refactor existing code to meet architectural constraints while keeping all checks green.

**Critical:** This phase changes code structure, not behavior. All checks must pass before, during, and after refactoring.

## Input

The user will provide architectural constraints: $ARGUMENTS

If no arguments provided, ask what architectural improvement they want.

## Phase 1: Verify Green State

1. Run `npm run all` (format, lint, typecheck, test)
2. **If any check fails** - Stop immediately. Tell the user all checks must pass before refactoring. Do not proceed.
3. **If all checks pass** - Continue to Phase 2

## Phase 2: Gather Context

1. Read `CLAUDE.md` for existing project architecture and constraints
2. Read `TESTING.md` for test patterns
3. Identify files affected by the requested constraint

**Constraint priority:**

- User-provided constraint takes precedence
- CLAUDE.md constraints apply where they don't conflict
- When in doubt, ask the user

## Phase 3: Plan Refactoring

Use TodoWrite to create a step-by-step refactoring plan:

1. **Analyze current state** - Identify code that violates the constraint
2. **Design target state** - How should the code look after refactoring?
3. **Break into small steps** - Each step must keep all checks passing
4. **Add each step to the todo list** - This provides visibility and tracks progress

### Refactoring Principles

- **Small, incremental changes** - Never make a change so large that debugging failures becomes difficult
- **One concept at a time** - Extract a component, then rename, then move. Not all at once.
- **Run `npm run all` after each change** - Catch regressions immediately
- **Preserve behavior** - If any check fails, you changed behavior, not just structure

## Phase 4: Execute Refactoring

For each planned step:

1. **Make the change** - Apply one refactoring transformation
2. **Run `npm run all`** - Verify all checks still pass
3. **If any check fails:**
   - Revert the change
   - Analyze why it broke
   - Try a smaller step or different approach
4. **If all checks pass** - Proceed to next step

## Phase 5: Verify Final State

1. Run `npm run all` - all checks must pass
2. Verify the architectural constraint is now satisfied
3. List all files that were modified

## Output

Show:

1. Initial `npm run all` output (confirming green before starting)
2. Summary of refactoring steps taken
3. Files modified
4. Final `npm run all` output (confirming still green)
5. How the code now satisfies the constraint

## Guidelines

- **Never skip the initial green check** - Refactoring broken code creates chaos
- **Never push through failing checks** - Stop, revert, rethink
- **Prefer many small commits over one large change** - If asked to commit
- **Don't add features** - Refactoring changes structure, not behavior
- **Don't fix unrelated issues** - Stay focused on the stated constraint
