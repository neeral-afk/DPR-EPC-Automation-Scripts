const { test, expect } = require('@playwright/test');

test.setTimeout(300000);

test('Login Test - Navigate to Masters > Assets', async ({ page }) => {

    // Open Sign In page
    await page.goto('https://devfsm.sorigin.app/signin', {
        waitUntil: 'domcontentloaded'
    });

    // Login
    await page.locator('input[type="email"]').fill('mayur.zade@sorigin.co');
    await page.locator('input[type="password"]').fill('sm@12345');

    await page.getByRole('button', {
        name: /sign in/i
    }).click();

    // Wait for dashboard
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);

    // Open Masters menu
    const mastersMenu = page.locator('button:has-text("Masters")');
    await mastersMenu.waitFor({ state: 'visible' });
    await mastersMenu.click();

    // Wait for submenu
    await page.waitForTimeout(1000);

    // Click Assets
    const assetsButton = page.locator('a[href="/masters/assets"]');
    await assetsButton.waitFor({ state: 'visible' });
    await assetsButton.click();

    // Wait for Asset Catalog page
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);

    // Verify navigation
    await expect(page).toHaveURL(/asset-catalog/);

    console.log('Successfully navigated to Masters > Assets');
});