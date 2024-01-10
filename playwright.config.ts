import { PlaywrightTestConfig, devices} from '@playwright/test'

const config: PlaywrightTestConfig = {
  timeout: 60000,
  retries: 0,
  reporter: [
    ['list'],
    ['line'],
    ['html', { open: 'on-failure' }],
    ['json', {outputFile: 'test-results/jsonReport.json'}],
    ['junit', {outputFile: 'test-results/junitReport.xml'}],
    ['allure-playwright'],
    ['monocart-reporter', {  
      name: "Monokart Report",
      outputFile: './test-results/monokartReport.html'
  }]

    
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
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    }
  ]
}
export default config
