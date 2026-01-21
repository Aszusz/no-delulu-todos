import { expect } from '@playwright/test'
import { createBdd } from 'playwright-bdd'
import { testIds } from './todo.testIds'
import { setupDefault, setupWithState } from './harness'

const { Given, When, Then } = createBdd()

export { testIds }

Given('I open the todo app', async ({ page }) => {
  await setupDefault(page)
})

When('I enter {string} in the todo input', async ({ page }, text: string) => {
  await page.getByTestId(testIds.input).fill(text)
})

When('I click the add button', async ({ page }) => {
  await page.getByTestId(testIds.addButton).click()
})

Then(
  'I should see {string} in the todo list',
  async ({ page }, text: string) => {
    const list = page.getByTestId(testIds.list)
    await expect(list.getByTestId(testIds.item)).toContainText(text)
  }
)

Then('I should see no todos in the list', async ({ page }) => {
  const list = page.getByTestId(testIds.list)
  await expect(list.getByTestId(testIds.item)).toHaveCount(0)
})

Then('the add button should be disabled', async ({ page }) => {
  await expect(page.getByTestId(testIds.addButton)).toBeDisabled()
})

Given(
  'I have a todo {string} created at {string}',
  async ({ page }, text: string, dateStr: string) => {
    const createdAt = new Date(dateStr).getTime()
    await setupWithState(page, {
      initialState: {
        todos: [{ id: '1', text, done: false, createdAt }],
      },
    })
  }
)

Then(
  'I should see the timestamp {string} for {string}',
  async ({ page }, timestamp: string, todoText: string) => {
    const items = page.getByTestId(testIds.item)
    const item = items.filter({ hasText: todoText })
    await expect(item.getByTestId(testIds.itemTimestamp)).toContainText(
      timestamp
    )
  }
)

When('I toggle the todo {string}', async ({ page }, text: string) => {
  const items = page.getByTestId(testIds.item)
  const item = items.filter({ hasText: text })
  await item.getByTestId(testIds.itemCheckbox).click()
})

Then(
  'the todo {string} should be marked as done',
  async ({ page }, text: string) => {
    const items = page.getByTestId(testIds.item)
    const item = items.filter({ hasText: text })
    await expect(item.getByTestId(testIds.itemCheckbox)).toBeChecked()
  }
)

Then(
  'the todo {string} should be marked as active',
  async ({ page }, text: string) => {
    const items = page.getByTestId(testIds.item)
    const item = items.filter({ hasText: text })
    await expect(item.getByTestId(testIds.itemCheckbox)).not.toBeChecked()
  }
)
