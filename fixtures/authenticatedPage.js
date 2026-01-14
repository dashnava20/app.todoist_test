import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';

export const test = base.extend({
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login();

    await page.waitForURL(/app/, { timeout: 30000 });
    await page.waitForTimeout(3000);

    await use(page);
  },
});

export { expect } from '@playwright/test';
