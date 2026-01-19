# BDD Automate (Green Phase)

Implement the minimal functionality to make failing tests pass.

**Critical:** This phase implements only what's needed to satisfy the tests. Follow architectural constraints strictly.

## Phase 1: Gather Context

1. Read `CLAUDE.md` for project architecture and constraints
2. Read `TESTING.md` for:
   - How to run tests
   - Test ID/selector import patterns
   - How to wire test selectors to implementation
3. Read `DISCOVERY.yml` for business rules and scope boundaries
4. Read the step definition files to understand:
   - What selectors/testIds are exported
   - What behaviors the tests expect

## Phase 2: Plan Implementation

If the implementation is non-trivial, enter plan mode to:

- Identify which files need changes
- Break down implementation into small, testable increments
- Ensure plan adheres to all constraints from CLAUDE.md and DISCOVERY.yml

## Phase 3: Implement

### Key Rules

1. **Import selectors from test files** - Never hardcode test IDs or selectors. Follow the import pattern in TESTING.md.

2. **Wire selectors to elements** - Apply imported selectors to your UI elements as specified in TESTING.md.

3. **Minimal implementation** - Only implement what tests require:
   - No extra features beyond DISCOVERY.yml scope
   - No over-engineering or premature abstractions
   - Basic styling only

4. **Follow existing patterns** - Match the codebase's style and conventions

### Implementation Loop

Repeat until all tests pass:

1. **Run tests** - Use the test command from TESTING.md
2. **Analyze failures** - Identify the specific assertion or action failing
3. **Implement fix** - Make the minimal change to address the failure
4. **Verify** - Run tests again

## Phase 4: Verify Green State

1. Run tests - all tests should pass
2. Run the full quality check command (e.g., `npm run all`) - ensure no lint/type/format errors
3. If any checks fail, fix them before completing

## Output

Show:

1. Files created/modified
2. Final test run output confirming green state (all tests passing)
3. Output of quality checks confirming code passes all checks

**Success:** All tests pass and code quality checks are green.
