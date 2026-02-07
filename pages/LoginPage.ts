import { Page, Locator } from '@playwright/test';

export class LoginPage { 
  readonly page: Page;
  readonly mulaiSekarangBtn: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly masukSekarangBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    
    this.mulaiSekarangBtn = page.locator('a:has-text("Mulai Sekarang")');
    
    this.emailInput = page.locator('input[name="email"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.masukSekarangBtn = page.locator('button[type="submit"]:has-text("Masuk Sekarang")');
  }

  async goto() {
    await this.page.goto('/');
  }

  async clickStart() {
    await this.mulaiSekarangBtn.click();
  }

  async login(email: string, pass: string) {
    // Alur: Klik dari landing page dulu
    if (await this.mulaiSekarangBtn.isVisible()) {
    await this.clickStart();
  }
  await this.emailInput.fill(email);
    
    // Isi form login
    await this.emailInput.fill(email);
    await this.passwordInput.fill(pass);
    
    // Klik tombol Masuk Sekarang
    await this.masukSekarangBtn.click();
  }

  async ensureOnLoginPage() {
    const currentUrl = this.page.url();
    if (!currentUrl.includes('/login')) {
      console.log('--- Navigasi otomatis ke halaman login ---');
      await this.goto();
      await this.clickStart();
      await this.page.waitForURL(/.*login/);
    }
  }
}