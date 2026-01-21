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

When('I click delete on the todo {string}', async ({ page }, text: string) => {
  const items = page.getByTestId(testIds.item)
  const item = items.filter({ hasText: text })
  await item.getByTestId(testIds.itemDeleteButton).click()
})

When('I confirm the deletion', async ({ page }) => {
  page.on('dialog', (dialog) => dialog.accept())
})

When('I cancel the deletion', async ({ page }) => {
  page.on('dialog', (dialog) => dialog.dismiss())
})

Then(
  'I should not see {string} in the todo list',
  async ({ page }, text: string) => {
    const list = page.getByTestId(testIds.list)
    await expect(list).not.toContainText(text)
  }
)

Given('I have the following todos:', async ({ page }, dataTable) => {
  const rows = dataTable.hashes() as { text: string; status: string }[]
  const todos = rows.map((row, i) => ({
    id: String(i + 1),
    text: row.text,
    done: row.status === 'done',
    createdAt: Date.now() - i * 1000,
  }))
  await setupWithState(page, { initialState: { todos } })
})

Then('I should see {int} todos', async ({ page }, count: number) => {
  const list = page.getByTestId(testIds.list)
  await expect(list.getByTestId(testIds.item)).toHaveCount(count)
})

Then(
  'the {string} filter should be active',
  async ({ page }, filter: string) => {
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
  }
)
