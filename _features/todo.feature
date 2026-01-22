Feature: Todo List

  Scenario: Add a todo with text
    Given I open the todo app
    When I enter "Buy groceries" in the todo input
    And I click the add button
    Then I see "Buy groceries" in the todo list

  Scenario: Cannot add empty todo
    Given I open the todo app
    When I click the add button
    Then the todo list is empty

  Scenario: Cannot add whitespace-only todo
    Given I open the todo app
    When I enter "   " in the todo input
    And I click the add button
    Then the todo list is empty

  Scenario: Todo displays creation timestamp
    Given I open the todo app at "2026-01-19T15:45:00"
    When I enter "Buy groceries" in the todo input
    And I click the add button
    Then I see the timestamp "Jan 19, 2026, 3:45 PM" for "Buy groceries"

  Scenario: Toggle todo to done
    Given I open the todo app
    When I enter "Buy groceries" in the todo input
    And I click the add button
    And I toggle the todo "Buy groceries"
    Then the todo "Buy groceries" is marked as done

  Scenario: Toggle todo back to active
    Given I open the todo app
    When I enter "Buy groceries" in the todo input
    And I click the add button
    And I toggle the todo "Buy groceries"
    And I toggle the todo "Buy groceries"
    Then the todo "Buy groceries" is marked as active
