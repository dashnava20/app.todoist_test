export class BasePage {
  constructor(page) {
    this.page = page;
  }

  async goto(url) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  async click(locator) {
    await locator.waitFor({ state: 'visible' });
    await locator.click();
  }

  async type(locator, text) {
    await locator.waitFor({ state: 'visible' });
    await locator.fill(text);
  }

  async isVisible(locator) {
    return await locator.isVisible().catch(() => false);
  }
}