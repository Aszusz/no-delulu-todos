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
