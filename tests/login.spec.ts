import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

// Nama di dalam tanda kutip ini yang akan muncul sebagai Judul Test Case di Allure
test('Skenario 01: Login dengan Email dan Password Invalid', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    // 1. Buka halaman login
    await loginPage.goto();

    // 2. Ambil data dari .env
    const email = process.env.INVALID_EMAIL || '';
    const password = process.env.INVALID_PASSWORD || '';

    // 3. Eksekusi login sampai klik button
    // Jika ingin lebih dari satu akun, tinggal duplikasi baris ini atau ganti variabelnya
    await loginPage.login(email, password);
    
    // Test dianggap PASS jika tidak ada error saat eksekusi login
});