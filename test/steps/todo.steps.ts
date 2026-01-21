import { expect } from '@playwright/test'
import { createBdd } from 'playwright-bdd'
import { testIds } from './todo.testIds'
import { setupDefault } from './harness'

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
