import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path';

/**
 * Membaca variabel lingkungan dari file .env.
 * File .env harus berada di root folder yang sama dengan file ini.
 */
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  /* Mengganti reporter default menjadi Allure dan HTML */
  reporter: [
    ['html'], 
    ['allure-playwright', { outputFolder: 'allure-results' }]
  ],

  use: {
    /* Base URL aplikasi Beca */
    baseURL: 'https://beca.wd105.myworkdayjobs.com',

    /* Mengambil screenshot dan trace hanya jika test gagal */
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // Jika ingin fokus di satu browser dulu agar cepat, firefox dan webkit bisa di-comment
  ],
});