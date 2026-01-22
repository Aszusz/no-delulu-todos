import { expect } from '@playwright/test'
import { createBdd } from 'playwright-bdd'
import { testIds } from './todo.testIds'
import { setupDefault, setupWithTimestamp } from './harness'

const { Given, When, Then } = createBdd()

export { testIds }

// Background step
Given('I open the todo app', async ({ page }) => {
  await setupDefault(page)
})

// Input steps
When('I enter {string} in the todo input', async ({ page }, text: string) => {
  await page.getByTestId(testIds.input).fill(text)
})

When('I leave the todo input empty', async ({ page }) => {
  await page.getByTestId(testIds.input).fill('')
})

When('I submit the todo', async ({ page }) => {
  await page.getByTestId(testIds.submitButton).click()
})

// Time injection for timestamp testing
Given('the current time is {string}', async ({ page }, timeString: string) => {
  const timestamp = new Date(timeString).getTime()
  await setupWithTimestamp(page, timestamp)
})

// Todo creation with preconditions
Given('I have an active todo {string}', async ({ page }, text: string) => {
  await page.getByTestId(testIds.input).fill(text)
  await page.getByTestId(testIds.submitButton).click()
  // Verify the todo was created and is active
  const todoItem = page.getByTestId(testIds.item).filter({ hasText: text })
  await expect(todoItem).toBeVisible()
})

Given('I have a done todo {string}', async ({ page }, text: string) => {
  // Create the todo first
  await page.getByTestId(testIds.input).fill(text)
  await page.getByTestId(testIds.submitButton).click()
  // Toggle it to done
  const todoItem = page.getByTestId(testIds.item).filter({ hasText: text })
  await todoItem.getByTestId(testIds.itemToggle).click()
  // Verify it's marked as done
  await expect(todoItem.getByTestId(testIds.itemToggle)).toBeChecked()
})

// Toggle actions
When('I toggle the todo {string}', async ({ page }, text: string) => {
  const todoItem = page.getByTestId(testIds.item).filter({ hasText: text })
  await todoItem.getByTestId(testIds.itemToggle).click()
})

// Delete actions
When('I click delete on the todo {string}', async ({ page }, text: string) => {
  const todoItem = page.getByTestId(testIds.item).filter({ hasText: text })
  await todoItem.getByTestId(testIds.itemDeleteButton).click()
})

When('I confirm the deletion', async ({ page }) => {
  await page.getByTestId(testIds.confirmYes).click()
})

When('I cancel the deletion', async ({ page }) => {
  await page.getByTestId(testIds.confirmNo).click()
})

// Filter actions
When('I select the {string} filter', async ({ page }, filter: string) => {
  const filterTestId =
    filter === 'all'
      ? testIds.filterAll
      : filter === 'active'
        ? testIds.filterActive
        : testIds.filterDone
  await page.getByTestId(filterTestId).click()
})

When('I reload the page', async ({ page }) => {
  await page.reload()
})

// Assertions - visibility
Then('I see a todo with text {string}', async ({ page }, text: string) => {
  const todoItem = page.getByTestId(testIds.item).filter({ hasText: text })
  await expect(todoItem).toBeVisible()
})

Then(
  'the todo {string} is no longer visible',
  async ({ page }, text: string) => {
    const todoItem = page.getByTestId(testIds.item).filter({ hasText: text })
    await expect(todoItem).not.toBeVisible()
  }
)

// Assertions - submit button state
Then('the submit button is disabled', async ({ page }) => {
  await expect(page.getByTestId(testIds.submitButton)).toBeDisabled()
})

// Assertions - timestamp
Then(
  'the todo {string} shows timestamp {string}',
  async ({ page }, text: string, timestamp: string) => {
    const todoItem = page.getByTestId(testIds.item).filter({ hasText: text })
    await expect(todoItem.getByTestId(testIds.itemTimestamp)).toHaveText(
      timestamp
    )
  }
)

// Assertions - todo status
Then('the todo {string} is marked as done', async ({ page }, text: string) => {
  const todoItem = page.getByTestId(testIds.item).filter({ hasText: text })
  await expect(todoItem.getByTestId(testIds.itemToggle)).toBeChecked()
})

Then(
  'the todo {string} is marked as active',
  async ({ page }, text: string) => {
    const todoItem = page.getByTestId(testIds.item).filter({ hasText: text })
    await expect(todoItem.getByTestId(testIds.itemToggle)).not.toBeChecked()
  }
)

// Assertions - confirmation dialog
Then('I see a confirmation dialog', async ({ page }) => {
  await expect(page.getByTestId(testIds.confirmDialog)).toBeVisible()
})

// Assertions - filter state
Then('the {string} filter is selected', async ({ page }, filter: string) => {
  const filterTestId =
    filter === 'all'
      ? testIds.filterAll
      : filter === 'active'
        ? testIds.filterActive
        : testIds.filterDone
  await expect(page.getByTestId(filterTestId)).toHaveAttribute(
    'aria-pressed',
    'true'
  )
})
