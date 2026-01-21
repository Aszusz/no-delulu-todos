import { expect } from '@playwright/test'
import { createBdd } from 'playwright-bdd'
import { testIds } from './todo.testIds'

const { Given, When, Then } = createBdd()

export { testIds }

// Store pending config for harness
let pendingHarnessConfig: { timestamp?: number } = {}

// Given steps

Given('I have a todo {string}', async ({ page }, text: string) => {
  await page.getByTestId(testIds.todoInput).fill(text)
  await page.getByTestId(testIds.todoSubmitButton).click()
})

Given('I have a done todo {string}', async ({ page }, text: string) => {
  await page.getByTestId(testIds.todoInput).fill(text)
  await page.getByTestId(testIds.todoSubmitButton).click()
  await page.getByTestId(testIds.todoToggle + `-${text}`).click()
})

Given(
  'the current time is {string}',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async ({ page: _page }, isoTime: string) => {
    pendingHarnessConfig.timestamp = new Date(isoTime).getTime()
  }
)

Given('I open the app with test harness', async ({ page }) => {
  await page.goto('/')
  await page.waitForFunction(() => window.__TEST_HARNESS__ !== undefined, {
    timeout: 5000,
  })
  const config = pendingHarnessConfig
  await page.evaluate((ts) => {
    if (ts) {
      window.__TEST_HARNESS__?.configure({
        effects: {
          now: () => new Date(ts),
        },
      })
    }
    window.__TEST_HARNESS__?.ready()
  }, config.timestamp)
  pendingHarnessConfig = {}
})

// When steps

When('I enter {string} in the todo input', async ({ page }, text: string) => {
  await page.getByTestId(testIds.todoInput).fill(text)
})

When('I submit the todo', async ({ page }) => {
  await page.getByTestId(testIds.todoSubmitButton).click()
})

When('I leave the todo input empty', async ({ page }) => {
  await page.getByTestId(testIds.todoInput).fill('')
})

When('I toggle the todo {string}', async ({ page }, text: string) => {
  await page.getByTestId(testIds.todoToggle + `-${text}`).click()
})

When('I click delete on {string}', async ({ page }, text: string) => {
  await page.getByTestId(testIds.todoDeleteButton + `-${text}`).click()
})

When('I confirm the deletion', async ({ page }) => {
  await page.getByTestId(testIds.confirmYes).click()
})

When('I cancel the deletion', async ({ page }) => {
  await page.getByTestId(testIds.confirmNo).click()
})

When('I select the {string} filter', async ({ page }, filter: string) => {
  const filterTestId =
    filter === 'all'
      ? testIds.filterAll
      : filter === 'active'
        ? testIds.filterActive
        : testIds.filterDone
  await page.getByTestId(filterTestId).click()
})

// Then steps

Then('I see {string} in the todo list', async ({ page }, text: string) => {
  await expect(page.getByTestId(testIds.todoText + `-${text}`)).toBeVisible()
})

Then(
  'I do not see {string} in the todo list',
  async ({ page }, text: string) => {
    await expect(
      page.getByTestId(testIds.todoText + `-${text}`)
    ).not.toBeVisible()
  }
)

Then('the add todo button is disabled', async ({ page }) => {
  await expect(page.getByTestId(testIds.todoSubmitButton)).toBeDisabled()
})

Then('the todo {string} is marked as done', async ({ page }, text: string) => {
  await expect(page.getByTestId(testIds.todoToggle + `-${text}`)).toBeChecked()
})

Then(
  'the todo {string} is marked as active',
  async ({ page }, text: string) => {
    await expect(
      page.getByTestId(testIds.todoToggle + `-${text}`)
    ).not.toBeChecked()
  }
)

Then('I see a confirmation dialog', async ({ page }) => {
  await expect(page.getByTestId(testIds.confirmDialog)).toBeVisible()
})

Then(
  'I see the timestamp {string} for {string}',
  async ({ page }, timestamp: string, todoText: string) => {
    await expect(
      page.getByTestId(testIds.todoTimestamp + `-${todoText}`)
    ).toHaveText(timestamp)
  }
)
