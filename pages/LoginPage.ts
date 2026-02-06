import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly mulaiSekarangBtn: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly masukSekarangBtn: Locator; // Nama disesuaikan dengan UI baru

  constructor(page: Page) {
    this.page = page;
    
    // Landing Page Locator
    this.mulaiSekarangBtn = page.locator('a:has-text("Mulai Sekarang")');
    
    // Login Page Locators (Berdasarkan gambar inspect element)
    this.emailInput = page.locator('input[name="email"]');
    this.passwordInput = page.locator('input[name="password"]');
    // Pakai type="submit" karena di gambar itu adalah tombol utama form
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
}