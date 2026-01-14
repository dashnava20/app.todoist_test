import { BasePage } from './BasePage.js';
import { ENV } from '../utils/env.js';

export class LoginPage extends BasePage {
  constructor(page) {
    super(page);

    this.emailInput = page.locator('input[type="email"]');
    this.passwordInput = page.locator('input[type="password"]');
    this.loginButton = page.locator('button[type="submit"]');
  }

  async open() {
    await this.goto(`${ENV.BASE_URL}/auth/login`);
  }

  async login() {
    await this.type(this.emailInput, ENV.EMAIL);
    await this.type(this.passwordInput, ENV.PASSWORD);
    await this.loginButton.waitFor({ state: 'visible' });
    await this.click(this.loginButton);
  }
}
