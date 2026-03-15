import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './e2e',
    timeout: 30_000,
    expect: { timeout: 5_000 },
    fullyParallel: true,
    retries: 1,
    workers: process.env.CI ? 2 : undefined,

    reporter: [
        ['html', { outputFolder: 'playwright-report', open: 'never' }],
        ['list']
    ],

    use: {
        baseURL: 'http://localhost:3000',
        headless: true,
        screenshot: 'only-on-failure',
        trace: 'on-first-retry',
        video: 'retain-on-failure',
    },

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },
        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] },
        },
        {
            name: 'Mobile Chrome',
            use: { ...devices['Pixel 5'] },
        },
    ],

    /* Start a local static server before tests */
    webServer: {
        command: 'npx serve ../frontend -p 3000 --no-clipboard',
        url: 'http://localhost:3000',
        reuseExistingServer: !process.env.CI,
        timeout: 10_000,
    },
});
