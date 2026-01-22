import { expect } from '@playwright/test'
import { createBdd } from 'playwright-bdd'
import { testIds } from './todo.testIds'
import { setupDefault } from './harness'

const { Given, When, Then } = createBdd()

export { testIds }

Given('I open the todo app', async ({ page }) => {
  await setupDefault(page)
})

Given(
  'I open the todo app at {string}',
  async ({ page }, dateTimeStr: string) => {
    const timestamp = new Date(dateTimeStr).getTime()
    await page.addInitScript(`{
    const originalNow = Date.now
    Date.now = () => ${timestamp}
  }`)
    await page.goto('/')
    await page.waitForFunction(() => window.__TEST_HARNESS__ !== undefined, {
      timeout: 5000,
    })
    await page.evaluate(() => {
      window.__TEST_HARNESS__?.ready()
    })
  }
)

When('I enter {string} in the todo input', async ({ page }, text: string) => {
  await page.getByTestId(testIds.input).fill(text)
})

When('I click the add button', async ({ page }) => {
  await page.getByTestId(testIds.addButton).click()
})

Then('I see {string} in the todo list', async ({ page }, text: string) => {
  const item = page.getByTestId(testIds.item).filter({ hasText: text })
  await expect(item).toBeVisible()
})

Then('the todo list is empty', async ({ page }) => {
  await expect(page.getByTestId(testIds.item)).toHaveCount(0)
})

Then(
  'I see the timestamp {string} for {string}',
  async ({ page }, timestamp: string, todoText: string) => {
    const item = page.getByTestId(testIds.item).filter({ hasText: todoText })
    await expect(item.getByTestId(testIds.itemTimestamp)).toHaveText(timestamp)
  }
)

When('I toggle the todo {string}', async ({ page }, text: string) => {
  const item = page.getByTestId(testIds.item).filter({ hasText: text })
  await item.getByTestId(testIds.itemToggle).click()
})

Then('the todo {string} is marked as done', async ({ page }, text: string) => {
  const item = page.getByTestId(testIds.item).filter({ hasText: text })
  await expect(item.getByTestId(testIds.itemToggle)).toBeChecked()
})

Then(
  'the todo {string} is marked as active',
  async ({ page }, text: string) => {
    const item = page.getByTestId(testIds.item).filter({ hasText: text })
    await expect(item.getByTestId(testIds.itemToggle)).not.toBeChecked()
  }
)

When('I click delete on the todo {string}', async ({ page }, text: string) => {
  const item = page.getByTestId(testIds.item).filter({ hasText: text })
  await item.getByTestId(testIds.itemDeleteButton).click()
})

Then('I see a confirmation dialog', async ({ page }) => {
  await expect(page.getByTestId(testIds.confirmDialog)).toBeVisible()
})

When('I confirm the deletion', async ({ page }) => {
  await page.getByTestId(testIds.confirmButton).click()
})

When('I cancel the deletion', async ({ page }) => {
  await page.getByTestId(testIds.cancelButton).click()
})

Then(
  'I do not see {string} in the todo list',
  async ({ page }, text: string) => {
    const item = page.getByTestId(testIds.item).filter({ hasText: text })
    await expect(item).toHaveCount(0)
  }
)
