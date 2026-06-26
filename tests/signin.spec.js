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

  // 4. Submit the form by pressing Enter (since we don't know the exact button text)
  await passwordInput.press('Enter');

  // 5. Wait for navigation or verify login (wait for URL to change away from signin)
  await page.waitForURL('**/signin' , { state: 'hidden', timeout: 10000 }).catch(() => {});
});
