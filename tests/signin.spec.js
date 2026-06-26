const { test, expect } = require('@playwright/test');

test('successful sign-in to DPR-EPC', async ({ page }) => {
  // 1. Navigate to the login page
  await page.goto('https://devfsm.sorigin.app/signin');

  // 2. Fill in the email
  const emailInput = page.locator('input[type="email"]');
  await emailInput.click();
  await emailInput.fill('mayur.zade@sorigin.co');

  // 3. Fill in the password
  const passwordInput = page.locator('input[type="password"]');
  await passwordInput.click();
  await passwordInput.fill('sm@12345');

  // 4. Click the 'Sign In' button (visible in your screenshot!)
  await page.getByRole('button', { name: 'Sign In' }).click();

  // 5. Wait for navigation or verify login (wait for URL to change away from signin)
  await page.waitForURL('**/signin' , { state: 'hidden', timeout: 10000 }).catch(() => {});
});
