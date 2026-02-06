import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

// Menggunakan mode serial agar test case berjalan berurutan dalam satu konteks
test.describe.configure({ mode: 'serial' });

test.describe('Qanaah Login Flow', () => {
  let page: Page;
  let loginPage: LoginPage;

  test.beforeAll(async ({ browser }) => {
    // Membuat satu page yang akan dipakai untuk semua test case di file ini
    page = await browser.newPage();
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test.afterAll(async () => {
    await page.close();
  });

  // Test Case 1: Navigasi
  test('[Web][Positive] User can verify "Mulai Sekarang"', async () => {
    await loginPage.clickStart();
    
    // Validasi URL dan element
    await expect(page).toHaveURL(/.*login/);
    await expect(loginPage.emailInput).toBeVisible();
  });

  // Test Case 2: Langsung klik Masuk Sekarang tanpa isi apapun
  test('[Web][Negative] User click Masuk Sekarang button', async () => {
    await loginPage.emailInput.clear();
    await loginPage.passwordInput.clear();

    await loginPage.masukSekarangBtn.waitFor({ state: 'visible' });
    await loginPage.masukSekarangBtn.click();

    const validationMessage = await loginPage.emailInput.evaluate((node: HTMLInputElement) => node.validationMessage);
    
    expect(validationMessage).toContain('Please fill out this field');
  });

  // Test Case 3: Hanya input email, password dikosongkan
  test('[Web][Negative] User input valid Email only', async () => {
    const email = process.env.VALID_EMAIL!;

    await loginPage.emailInput.fill(email);
    await loginPage.passwordInput.clear();

    await loginPage.masukSekarangBtn.click();

    const validationMessage = await loginPage.passwordInput.evaluate((node: HTMLInputElement) => node.validationMessage);
    
    expect(validationMessage).toContain('Please fill out this field');
  });

  // Test Case 4: Hanya input password
  test('[Web][Negative] User input valid Password', async () => {
    const password = process.env.VALID_PASSWORD!;

    await loginPage.emailInput.clear();
    await loginPage.passwordInput.fill(password);

    await loginPage.masukSekarangBtn.click();

    const validationMessage = await loginPage.emailInput.evaluate((node: HTMLInputElement) => node.validationMessage);
    
    expect(validationMessage).toContain('Please fill out this field');
  });

 // Test Case 5: Format Email Salah
  test('[Web][Negative] User input invalid Format Email', async () => {
    const email = process.env.INVALID_FORMAT_EMAIL!;
    const password = process.env.INVALID_PASSWORD!;

    await loginPage.emailInput.fill(email);
    await loginPage.passwordInput.fill(password);
    await loginPage.masukSekarangBtn.click();

    const validationMessage = await loginPage.emailInput.evaluate((node: HTMLInputElement) => node.validationMessage);

    expect(validationMessage).toContain('include an \'@\'');
    expect(validationMessage).toContain(email);
  });
  
  // Test Case 6: Email dan Password Salah
  test('[Web][Negative] User input invalid Email & Password', async () => {
    const email = process.env.INVALID_EMAIL!;
    const password = process.env.INVALID_PASSWORD!;

    await loginPage.emailInput.fill(email);
    await loginPage.passwordInput.fill(password);
    await loginPage.masukSekarangBtn.click();

    await expect(page.locator('text=These credentials do not match our records.')).toBeVisible();
  });

  // Test Case 7: Fungsi Login Utama
  test('[Web][Positive] User input valid Email & Password', async () => {
    const email = process.env.VALID_EMAIL!;
    const password = process.env.VALID_PASSWORD!;

    await loginPage.emailInput.clear();
    await loginPage.emailInput.fill(email);
    await loginPage.passwordInput.clear();
    await loginPage.passwordInput.fill(password);
    await loginPage.masukSekarangBtn.click();

    await expect(page).toHaveURL(/.*dashboard/);
  });
});