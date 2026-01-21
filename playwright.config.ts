import { defineConfig } from '@playwright/test'
import { defineBddConfig } from 'playwright-bdd'

const testDir = defineBddConfig({
  featuresRoot: '_features',
  steps: 'test/steps/*.ts',
  outputDir: 'test/.gen',
})

export default defineConfig({
  testDir,
  outputDir: 'test/results',
  reporter: [['html', { outputFolder: 'test/report' }]],
  expect: { timeout: 500 },
  use: {
    baseURL: 'http://localhost:5180',
    actionTimeout: 500,
  },
  webServer: {
    command: 'npm run dev:test -- --port 5180',
    url: 'http://localhost:5180',
    reuseExistingServer: !process.env.CI,
  },
})
