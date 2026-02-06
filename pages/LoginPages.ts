import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('input[data-automation-id="email"]');
    this.passwordInput = page.locator('input[data-automation-id="password"]');
    this.signInBtn = page.locator('button[data-automation-id="signInButton"]');
  }

  async goto() {
    await this.page.goto('/en-US/Beca/login');
  }

  async login(email: string, pass: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(pass);
    await this.signInBtn.click();
  }
}