Feature: Todo List

  Scenario: Add a todo with text input
    Given I open the todo app
    When I enter "Buy groceries" in the todo input
    And I click the add button
    Then I should see "Buy groceries" in the todo list

  Scenario: Prevent empty todo submission
    Given I open the todo app
    When I enter "" in the todo input
    Then the add button should be disabled
    And I should see no todos in the list

  Scenario: Display todo with creation timestamp
    Given I have a todo "Buy groceries" created at "Jan 19, 2026 3:45 PM"
    Then I should see the timestamp "Jan 19, 2026" for "Buy groceries"

  Scenario: Toggle todo to done
    Given I open the todo app
    When I enter "Buy groceries" in the todo input
    And I click the add button
    And I toggle the todo "Buy groceries"
    Then the todo "Buy groceries" should be marked as done

  Scenario: Toggle todo back to active
    Given I open the todo app
    When I enter "Buy groceries" in the todo input
    And I click the add button
    And I toggle the todo "Buy groceries"
    And I toggle the todo "Buy groceries"
    Then the todo "Buy groceries" should be marked as active
