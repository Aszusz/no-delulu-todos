Feature: Todo List

  Scenario: Add a todo
    Given I open the app
    When I enter "Buy groceries" in the todo input
    And I submit the todo
    Then I see "Buy groceries" in the todo list

  Scenario: Cannot add empty todo
    Given I open the app
    When I leave the todo input empty
    Then the add todo button is disabled

  Scenario: Toggle todo status
    Given I open the app
    And I have a todo "Buy groceries"
    When I toggle the todo "Buy groceries"
    Then the todo "Buy groceries" is marked as done

  Scenario: Toggle todo back to active
    Given I open the app
    And I have a done todo "Buy groceries"
    When I toggle the todo "Buy groceries"
    Then the todo "Buy groceries" is marked as active

  Scenario: Delete todo with confirmation
    Given I open the app
    And I have a todo "Buy groceries"
    When I click delete on "Buy groceries"
    Then I see a confirmation dialog
    When I confirm the deletion
    Then I do not see "Buy groceries" in the todo list

  Scenario: Cancel delete todo
    Given I open the app
    And I have a todo "Buy groceries"
    When I click delete on "Buy groceries"
    And I cancel the deletion
    Then I see "Buy groceries" in the todo list

  Scenario: Filter todos - show all
    Given I open the app
    And I have a todo "Active task"
    And I have a done todo "Completed task"
    When I select the "all" filter
    Then I see "Active task" in the todo list
    And I see "Completed task" in the todo list

  Scenario: Filter todos - show active only
    Given I open the app
    And I have a todo "Active task"
    And I have a done todo "Completed task"
    When I select the "active" filter
    Then I see "Active task" in the todo list
    And I do not see "Completed task" in the todo list

  Scenario: Filter todos - show done only
    Given I open the app
    And I have a todo "Active task"
    And I have a done todo "Completed task"
    When I select the "done" filter
    Then I see "Completed task" in the todo list
    And I do not see "Active task" in the todo list

  Scenario: Display creation timestamp
    Given the current time is "2026-01-19T15:45:00"
    And I open the app with test harness
    When I enter "Buy groceries" in the todo input
    And I submit the todo
    Then I see the timestamp "Jan 19, 2026, 3:45 PM" for "Buy groceries"
