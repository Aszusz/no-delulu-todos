Feature: Simple Todo List
  As a user
  I want to manage a list of todos
  So that I can keep track of tasks I need to complete

  Background:
    Given I open the todo app

  # Add todo with text input
  Scenario: Add a todo with text
    When I enter "Buy groceries" in the todo input
    And I submit the todo
    Then I see a todo with text "Buy groceries"

  # Prevent empty todo submission
  Scenario: Cannot submit empty todo
    When I leave the todo input empty
    Then the submit button is disabled

  Scenario: Cannot submit whitespace-only todo
    When I enter "   " in the todo input
    Then the submit button is disabled

  # Display todo with timestamp
  Scenario: Todo displays creation timestamp
    Given the current time is "Jan 19, 2026 3:45 PM"
    When I enter "Call dentist" in the todo input
    And I submit the todo
    Then I see a todo with text "Call dentist"
    And the todo "Call dentist" shows timestamp "Jan 19, 2026 3:45 PM"

  # Toggle todo status
  Scenario: Toggle todo from active to done
    Given I have an active todo "Write report"
    When I toggle the todo "Write report"
    Then the todo "Write report" is marked as done

  Scenario: Toggle todo from done to active
    Given I have a done todo "Send email"
    When I toggle the todo "Send email"
    Then the todo "Send email" is marked as active

  # Delete todo with confirmation
  Scenario: Delete todo with confirmation
    Given I have an active todo "Old task"
    When I click delete on the todo "Old task"
    Then I see a confirmation dialog
    When I confirm the deletion
    Then the todo "Old task" is no longer visible

  Scenario: Cancel todo deletion
    Given I have an active todo "Keep this task"
    When I click delete on the todo "Keep this task"
    Then I see a confirmation dialog
    When I cancel the deletion
    Then I see a todo with text "Keep this task"

  # Filter todos by all
  Scenario: Filter shows all todos by default
    Given I have an active todo "Active task"
    And I have a done todo "Completed task"
    Then I see a todo with text "Active task"
    And I see a todo with text "Completed task"
    And the "all" filter is selected

  # Filter todos by active
  Scenario: Filter by active todos
    Given I have an active todo "Active task"
    And I have a done todo "Completed task"
    When I select the "active" filter
    Then I see a todo with text "Active task"
    And the todo "Completed task" is no longer visible

  # Filter todos by done
  Scenario: Filter by done todos
    Given I have an active todo "Active task"
    And I have a done todo "Completed task"
    When I select the "done" filter
    Then I see a todo with text "Completed task"
    And the todo "Active task" is no longer visible

  # Reset filter on reload
  Scenario: Filter resets to all on page reload
    Given I have an active todo "Active task"
    And I have a done todo "Completed task"
    When I select the "done" filter
    And I reload the page
    Then the "all" filter is selected
