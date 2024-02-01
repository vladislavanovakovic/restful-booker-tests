import { PlaywrightTestConfig, devices } from '@playwright/test'

function getBaseUrl() {
  const environment = process.env.ENV;
  if (environment == undefined || environment == null) return 'https://automationintesting.online/';
  else if (environment == 'prod') return 'https://automationintesting.online/';
  else if (environment == 'local') return 'http://localhost';
  else if (environment == 'kubeLocal') return 'http://kube.local';
  else if (environment == 'docker') return 'http://rbp-proxy';
  else return 'https://automationintesting.online/';
}


const config: PlaywrightTestConfig = {
  timeout: 60000,
  retries: 0,
  reporter: process.env.CI?  [
    ['list'],
    ['line'],
    ['html', { open: 'never' }],
    ['blob', { outputDir: 'playwright-blob-report' }],
    [
      'allure-playwright',
      {
        detail: true,
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
  ]
  : [
    ['list'],
    ['line'],
    ['html', { open: 'on-failure' }],    
    [
      'allure-playwright',
      {
        detail: true,
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
  ],

  use: {
    baseURL: getBaseUrl(),
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
