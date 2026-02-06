import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login Scenarios', () => {
  
  test('Skenario 1: Login dengan Akun Valid', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    // Mengambil kredensial valid
    const email = process.env.VALID_EMAIL || '';
    const password = process.env.VALID_PASSWORD || '';

    await loginPage.login(email, password);
    
    // Verifikasi berhasil masuk (contoh: cek URL atau profil)
    await expect(page).toHaveURL(/userHome/);
  });

  test('Skenario 2: Login Gagal dengan Email Salah', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    // Mengambil kredensial invalid
    const email = process.env.INVALID_EMAIL || '';
    const password = process.env.INVALID_PASSWORD || '';

    await loginPage.login(email, password);

    // Verifikasi muncul pesan error
    const errorMsg = page.locator('[data-automation-id="errorBanner"]');
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toContainText('Invalid credentials');
  });

});