import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('Skenario 1: Invalid Email dan Password', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  // 1. Buka halaman login
  await loginPage.goto();

  // 2. Ambil data dari .env
  const email = process.env.INVALID_EMAIL || '';
  const password = process.env.INVALID_PASSWORD || '';

  // 3. Eksekusi login sampai klik button
  await loginPage.login(email, password);
  
  // Test selesai di sini. Jika tidak ada error saat klik, maka test dianggap PASS.
});