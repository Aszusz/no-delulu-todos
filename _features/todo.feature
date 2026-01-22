Feature: Todo List

  Scenario: Add a todo with text
    Given I open the todo app
    When I enter "Buy groceries" in the todo input
    And I click the add button
    Then I see "Buy groceries" in the todo list
