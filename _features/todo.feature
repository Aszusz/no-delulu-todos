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

  Scenario: Delete todo with confirmation
    Given I open the todo app
    When I enter "Buy groceries" in the todo input
    And I click the add button
    And I confirm the deletion
    And I click delete on the todo "Buy groceries"
    Then I should not see "Buy groceries" in the todo list

  Scenario: Cancel todo deletion
    Given I open the todo app
    When I enter "Buy groceries" in the todo input
    And I click the add button
    And I cancel the deletion
    And I click delete on the todo "Buy groceries"
    Then I should see "Buy groceries" in the todo list

  Scenario: Default filter shows all todos
    Given I have the following todos:
      | text          | status |
      | Buy groceries | active |
      | Walk the dog  | done   |
      | Read a book   | active |
    Then I should see 3 todos
    And the "all" filter should be active
