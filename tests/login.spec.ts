import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe.configure({ mode: 'serial' });

test.describe('Qanaah Login Flow', () => {
  let page: Page;
  let loginPage: LoginPage;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    loginPage = new LoginPage(page);
    // Initial goto hanya di awal sekali
    await loginPage.goto();
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('[Web][Positive] User can verify "Mulai Sekarang"', async () => {
    await loginPage.clickStart();
    await expect(page).toHaveURL(/.*login/);
    await expect(loginPage.emailInput).toBeVisible();
  });

  test('[Web][Negative] User click Masuk Sekarang button', async () => {
    await loginPage.ensureOnLoginPage();
    await loginPage.emailInput.clear();
    await loginPage.passwordInput.clear();
    await loginPage.masukSekarangBtn.click();

    const validationMessage = await loginPage.emailInput.evaluate((node: HTMLInputElement) => node.validationMessage);
    expect(validationMessage).toContain('Please fill out this field');
  });

  test('[Web][Negative] User input valid Email only', async () => {
    await loginPage.ensureOnLoginPage();
    const email = process.env.VALID_EMAIL!;

    await loginPage.emailInput.fill(email);
    await loginPage.passwordInput.clear();
    await loginPage.masukSekarangBtn.click();

    const validationMessage = await loginPage.passwordInput.evaluate((node: HTMLInputElement) => node.validationMessage);
    expect(validationMessage).toContain('Please fill out this field');
  });

  test('[Web][Negative] User input valid Password only', async () => {
    await loginPage.ensureOnLoginPage();
    const password = process.env.VALID_PASSWORD!;

    await loginPage.emailInput.clear();
    await loginPage.passwordInput.fill(password);
    await loginPage.masukSekarangBtn.click();

    const validationMessage = await loginPage.emailInput.evaluate((node: HTMLInputElement) => node.validationMessage);
    expect(validationMessage).toContain('Please fill out this field');
  });

  test('[Web][Negative] User input invalid Format Email', async () => {
    await loginPage.ensureOnLoginPage();
    const emailSalah = 'salahcom'; // Hardcoded agar tidak kena masking GitHub

    await loginPage.emailInput.fill(emailSalah);
    await loginPage.masukSekarangBtn.click();

    const validationMessage = await loginPage.emailInput.evaluate((node: HTMLInputElement) => node.validationMessage);
    expect(validationMessage).toContain('include an \'@\'');
  });

  test('[Web][Negative] User input invalid Email & Password', async () => {
    await loginPage.ensureOnLoginPage();
    const email = process.env.INVALID_EMAIL!;
    const password = process.env.INVALID_PASSWORD!;

    await loginPage.emailInput.fill(email);
    await loginPage.passwordInput.fill(password);
    await loginPage.masukSekarangBtn.click();

    // Pastikan teks ini sesuai dengan yang muncul di UI aplikasi lo
    await expect(page.locator('text=These credentials do not match our records.')).toBeVisible();
  });

  test('[Web][Positive] User input valid Email & Password', async () => {
    await loginPage.ensureOnLoginPage();
    const email = process.env.VALID_EMAIL!;
    const password = process.env.VALID_PASSWORD!;

    await loginPage.emailInput.fill(email);
    await loginPage.passwordInput.fill(password);
    await loginPage.masukSekarangBtn.click();

    await expect(page).toHaveURL(/.*dashboard/);
  });
});