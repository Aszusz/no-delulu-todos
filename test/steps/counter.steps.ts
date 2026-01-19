import { expect } from '@playwright/test'
import { createBdd } from 'playwright-bdd'
import { testIds } from './counter.testIds'

const { Given, When, Then } = createBdd()

export { testIds }

Given('the counter is at {int}', async ({ page }, value: number) => {
  // Use cache-busting param to force full page reload
  await page.goto(`/?t=${Date.now()}`, { waitUntil: 'load' })

  // Verify clean initial state
  const counterValue = page.getByTestId(testIds.value)
  await expect(counterValue).toHaveText('0')

  // Set counter to desired value
  if (value > 0) {
    for (let i = 0; i < value; i++) {
      await page.getByTestId(testIds.incrementButton).click()
    }
  } else if (value < 0) {
    for (let i = 0; i < Math.abs(value); i++) {
      await page.getByTestId(testIds.decrementButton).click()
    }
  }
})

When('I increment the counter', async ({ page }) => {
  await page.getByTestId(testIds.incrementButton).click()
})

When('I decrement the counter', async ({ page }) => {
  await page.getByTestId(testIds.decrementButton).click()
})

When('I reset the counter', async ({ page }) => {
  await page.getByTestId(testIds.resetButton).click()
})

Then('the counter displays {int}', async ({ page }, expected: number) => {
  await expect(page.getByTestId(testIds.value)).toHaveText(String(expected))
})

When('I random increment the counter', async ({ page }) => {
  await page.getByTestId(testIds.randomIncrementButton).click()
})

When('I random decrement the counter', async ({ page }) => {
  await page.getByTestId(testIds.randomDecrementButton).click()
})

When(
  'I random increment the counter {int} times',
  async ({ page }, times: number) => {
    const button = page.getByTestId(testIds.randomIncrementButton)
    for (let i = 0; i < times; i++) {
      await button.click()
    }
  }
)

Then(
  'the counter displays a value between {int} and {int}',
  async ({ page }, min: number, max: number) => {
    const counterValue = page.getByTestId(testIds.value)
    // Wait for the counter to reach a value in the expected range
    await expect(async () => {
      const value = parseInt((await counterValue.textContent()) || '0', 10)
      expect(value).toBeGreaterThanOrEqual(min)
      expect(value).toBeLessThanOrEqual(max)
    }).toPass({ timeout: 2500 })
  }
)

Then(
  'the counter displays a value between {int} and {int} within {int}ms',
  async ({ page }, min: number, max: number, timeoutMs: number) => {
    const counterValue = page.getByTestId(testIds.value)
    // Wait for the counter to stabilize within the time window
    // The timeout enforces the concurrency constraint
    await expect(async () => {
      const value = parseInt((await counterValue.textContent()) || '0', 10)
      expect(value).toBeGreaterThanOrEqual(min)
      expect(value).toBeLessThanOrEqual(max)
    }).toPass({ timeout: timeoutMs })
  }
)
