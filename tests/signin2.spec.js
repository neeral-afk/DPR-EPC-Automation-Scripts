const { test, expect } = require('@playwright/test');

test('Login Test', async ({ page }) => {
    await page.goto('https://devfsm.sorigin.app/signin', {
        waitUntil: 'networkidle'
    });

    // Login Email
    await page.locator('input[type="email"]').first().fill('mayur.zade@sorigin.co');

    // Login Password
    await page.locator('input[type="password"]').fill('sm@12345');

    // Show Password
    await page.locator('svg.fill-gray-500.size-6').click();
    await page.waitForTimeout(1000);

    // Hide Password
    await page.locator('svg.fill-gray-500.size-6').click();
    await page.waitForTimeout(500);

    // Remember Me
    await page.locator('input[type="checkbox"]').check();

    // Forgot Password
    await page.getByRole('link', { name: 'Forgot password?' }).click();

    // Wait for popup
    await page.waitForSelector('input[placeholder="info@sorigin.com"]');

    // Enter email in Forgot Password popup
    const resetEmail = page.locator('input[placeholder="info@sorigin.com"]').last();
    await resetEmail.click();
    await resetEmail.fill('neeral.shah@sorigin.co');

    // Click Send Link
    await page.getByRole('button', { name: 'Send Link' }).click();

    await page.waitForLoadState('networkidle');
});