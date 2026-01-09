//import { test as base } from '@playwright/test';
import { test, expect } from '@playwright/test';

export const test = base.extend({
  loggedInPage: async ({ page }, use) => {
    // Navigate to login page
    await page.goto('https://app.todoist.com/auth/login');
    await page.waitForLoadState('domcontentloaded');

    // Fill in credentials (use environment variables or parameters for security)
    const emailInput = page.locator('#element-0');
    const passwordInput = page.locator('#element-2');
    await emailInput.fill(process.env.USERNAME || 'default@example.com');
    await passwordInput.fill(process.env.PASSWORD || 'defaultpassword');

    // Click login button
    await page.getByRole('button', { name: 'Log in' }).click();

    // Wait for navigation or specific element to confirm login
    await page.waitForURL('https://app.todoist.com/app/today');

    // Use the logged-in page in tests
    await use(page);
  },
});