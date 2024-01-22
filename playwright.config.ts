import { PlaywrightTestConfig, devices } from '@playwright/test'


const config: PlaywrightTestConfig = {
  timeout: 60000,
  retries: 0,
  reporter: process.env.CI?  [
    ['list'],
    ['line'],
    ['html', { open: 'never' }],
    [
      'allure-playwright',
      {
        outputFolder: 'allure-results'
      }
    ],
    [
      'monocart-reporter',
      {
        name: 'Monokart Report',
        outputFile: './playwright-monocart-report/index.html'
      }
    ],
    ['blob', { outputDir: 'playwright-blob-report' }],
  ],

  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 15000,
    ignoreHTTPSErrors: true,
    video: 'off',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    }
  ]
}
export default config
