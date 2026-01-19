# BDD Formulate Phase

Analyze discovered requirements and formulate executable Gherkin scenarios.

This phase requires judgment - not every business rule becomes a scenario, and some rules need many scenarios. The goal is meaningful test coverage, not mechanical transformation.

## Phase 1: Load Discovery

1. **Read the discovery file** - Load `DISCOVERY.yml` from project root
2. **If file not found** - Tell user to run `/discover` first and stop
3. **If blockers exist** - List the blockers and stop (blockers must be resolved first)

## Phase 2: Determine Target Feature File

1. Read TESTING.md for feature file locations, then read existing feature files
2. Use best judgment to decide:
   - **Create new file** if this is a distinct new feature
   - **Modify existing file** if this extends or changes an existing feature

## Phase 3: Analyze Business Rules

Not every business rule maps to a scenario. Analyze each rule to understand what it is:

### Types of Business Rules

**Testable behaviors** - Actions with observable outcomes

- "Increment button increases count by 1" → Needs scenarios
- May need multiple scenarios (happy path, edge cases, errors)

**Design constraints** - Decisions about what we're NOT building

- Usually untestable - you can't prove an absence
- Skip or note as implicit

**Heuristic:** Before dismissing a rule as untestable, ask: "Can I design a scenario where this rule would be violated?" If yes, the behavior is observable and needs a scenario.

**Implicit rules** - Covered by testing other behaviors

- If "increment works" is tested, "no max limit" is implicitly verified
- Don't duplicate coverage

**Compound rules** - Multiple behaviors that test well together

- Some rules naturally combine into a single scenario
- Don't force artificial separation

### Scenario Writing

**Core principle: Describe behavior, not implementation.**

Scenarios are functional requirements, not test scripts. Focus on WHAT the system does, not HOW it does it.

**The test question:** "Will this wording need to change if the implementation changes?"

- If yes → too coupled to implementation, rewrite it
- If no → good, it describes behavior

**Declarative over imperative:**

Bad (imperative - describes UI mechanics):

```gherkin
When I enter "5" in the "amount" field
And I click the "increment" button
Then I should see "6" in the "counter" display
```

Good (declarative - describes behavior):

```gherkin
Given the counter is at 5
When I increment the counter
Then the counter displays 6
```

**Guidelines:**

- **One behavior per scenario** - Each scenario tests one thing
- **Independent scenarios** - No dependencies between scenarios
- **Hide implementation in step definitions** - That's where automation logic belongs
- **Reuse steps** - Check existing features for patterns to reuse

## Phase 4: Write Feature File

- **New file**: Check TESTING.md for the feature file location pattern
- **Existing file**: Append new scenarios after existing ones

### Format

```gherkin
Feature: {name}
  {description}

  Scenario: {descriptive name}
    Given {precondition}
    When {action}
    Then {expected outcome}
```

## Output

Show the generated scenarios.
