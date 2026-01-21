Feature: Todo List

  Scenario: Add a todo with text input
    Given I open the todo app
    When I enter "Buy groceries" in the todo input
    And I click the add button
    Then I should see "Buy groceries" in the todo list
