import { chromium } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';

export default async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login();

  await page.waitForTimeout(3000);

  // Saving the session state to a file
  await context.storageState({ path: 'storageState.json' });

  await browser.close();
};
