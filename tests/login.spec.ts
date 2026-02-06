import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPages';


test('User should not be able to login with wrong credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  await loginPage.goto();
  
  // Mengambil data dari .env
  const email = process.env.USER_EMAIL || '';
  const password = process.env.USER_PASSWORD || '';

  await loginPage.login(email, password);

  // Contoh validasi (sesuaikan dengan feedback UI Workday)
  const errorMsg = page.locator('[data-automation-id="errorBanner"]');
  await expect(errorMsg).toBeVisible();
});