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
    this.signInBtn = page.locator('button[data-automation-id="signInSubmitButton"]');
  }

  async goto() {
    await this.page.goto('/en-US/Beca/login'); 
  }

  async login(email: string, pass: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(pass);

    // Tambahkan baris ini untuk memastikan tombol sudah stabil di layar
    await this.signInBtn.waitFor({ state: 'visible' });

    // Gunakan force: true untuk mengklik menembus lapisan "click_filter"
    await this.signInBtn.click({ force: true });
  }
}