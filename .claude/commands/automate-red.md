# BDD Automate (Red Phase)

Implement step definitions for Gherkin scenarios. Tests should fail (red) because the functionality doesn't exist yet.

**Critical:** This phase creates test automation only. Do NOT implement any application functionality.

## Phase 1: Gather Context

Read TESTING.md to understand:

- How to run tests
- Where step definitions live
- Step definition patterns and framework APIs
- Test ID architecture (if applicable)

## Phase 2: Run Tests

1. Run the test command to see which steps are undefined
2. Parse the output to identify:
   - Missing step definitions
   - Which feature files need automation

## Phase 3: Analyze Existing Patterns

1. Read existing step definition files (location specified in TESTING.md)
2. Note patterns for:
   - How the test framework is used
   - How test IDs or selectors are defined
   - How page/component interactions are structured

## Phase 4: Create Step Definitions

For each feature file needing automation:

### 4a. Define Test Selectors

If the project uses a test ID architecture (check TESTING.md):

- Create selector constants following the project's pattern
- Use semantic names for elements
- Follow the project's naming convention

### 4b. Implement Steps

Create step definitions following the patterns in TESTING.md:

- Import required test framework utilities
- Define Given/When/Then step implementations
- Use the project's selector strategy (test IDs, etc.)

### Guidelines

- **Reuse existing steps** - Check if a step already exists before creating a new one
- **Use consistent selectors** - Follow the project's element selection strategy
- **Keep steps declarative** - Implementation details stay in step definitions
- **One file per feature** - Match step file names to feature file names

## Phase 5: Verify Red State

1. Run `npm run lint` and `npm run typecheck` - step definition code should pass
2. Run tests - tests should FAIL because functionality doesn't exist yet
3. Confirm tests fail for the right reasons:
   - Selectors/test IDs don't exist in the DOM yet (expected)
   - Application functionality doesn't exist yet (expected)
4. If tests fail for other reasons (syntax errors, import issues), fix those

## Output

Show:

1. Created/modified step definition files
2. The exported selectors/testIds that the implementation will need
3. Test run output confirming red state (tests failing as expected)

**Remember:** Success in this phase means failing tests. The `/automate-green` phase implements the functionality to make them pass.
