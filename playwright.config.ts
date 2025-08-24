import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './src/tests',  // де лежать тести
    timeout: 30 * 1000,      // 30 секунд на тест
    expect: {
        timeout: 5000,         // 5 секунд для expect
    },
    fullyParallel: true,      // паралельний запуск
    retries: 1,              // 1 ретрай для flaky тестів
    reporter: [
        ['list'],              // стандартний репортер у консолі
        ['allure-playwright']  // для Allure
    ],
    use: {
        baseURL: 'http://localhost:3000', // твій UI
        headless: true,                   // або false для видимого браузера
        screenshot: 'only-on-failure',    // робити скріншоти при падінні
        video: 'retain-on-failure',       // запис відео при падінні
        trace: 'on-first-retry'           // Playwright Trace для дебагу
    },
    projects: [
        {
            name: 'Chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        // {
        //     name: 'Firefox',
        //     use: { ...devices['Desktop Firefox'] },
        // },
        // {
        //     name: 'WebKit',
        //     use: { ...devices['Desktop Safari'] },
        // },
    ],
});
