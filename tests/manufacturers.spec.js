const { test, expect } = require('@playwright/test');

test.setTimeout(120000);

test('Login Test - Navigate to Masters > Manufacturers', async ({ page }) => {

    // Generate unique data
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    const locationName = `Location${randomNumber}`;
    const locationCode = `LOC${randomNumber}`;

    // Generate unique model number
    const uniqueModelNumber = `${Math.floor(10 + Math.random() * 90)}${Date.now().toString().slice(-2)}`;

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

    // Wait for dashboard to load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);

    // Open Masters menu (if collapsed)
    const mastersMenu = page.locator('button:has-text("Masters")');

    if (await mastersMenu.count()) {
        await mastersMenu.click();
        await page.waitForTimeout(1000);
    }

    // Navigate to Manufacturers
    await page.locator('a[href="/masters/manufacturers"]').click();

    // Wait for Manufacturers page to load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Verify navigation
    await expect(page).toHaveURL(/.*\/masters\/manufacturers/);

    // Sort A → Z (Models)
    await page.getByRole('button', { name: /^Sort$/ }).click();
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'A → Z' }).click();
    await page.waitForTimeout(2000);

    // Sort Z → A (Models)
    await page.getByRole('button', { name: /^Sort$/ }).click();
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'Z → A' }).click();
    await page.waitForTimeout(2000);

    // Sort Newest First (Models)
    await page.getByRole('button', { name: /^Sort$/ }).click();
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'Newest First' }).click();
    await page.waitForTimeout(2000);

    // Sort Oldest First (Models)
    await page.getByRole('button', { name: /^Sort$/ }).click();
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'Oldest First' }).click();
    await page.waitForTimeout(2000);

    // Search for model
    const searchBox = page.locator('input[placeholder="Search models... (Ctrl+K)"]');
    await searchBox.click();
    await searchBox.fill('MakeModel-443047');
    await page.waitForTimeout(2000);

    // Click Active toggle (Deactivate)
    await page.locator('button[title="Click to Deactivate"]').click();
    await page.waitForTimeout(1000);

    // Click Deactivate confirmation button
    await page.getByRole('button', { name: /^Deactivate$/ }).click();
    await page.waitForTimeout(3000);

    // Click Reactivate toggle
    await page.locator('button[title="Click to Activate"]').click();
    await page.waitForTimeout(1000);

    // Click Activate confirmation button
    await page.getByRole('button', { name: /^Activate$/ }).click();
    await page.waitForTimeout(3000);

    // Click Edit button
    await page.locator('svg.lucide-square-pen').first().click();
    await page.waitForTimeout(2000);

    // Edit Model Number
    const modelNumberInput = page.locator('#modelNumber');
    await modelNumberInput.click();
    await modelNumberInput.clear();
    await modelNumberInput.fill(uniqueModelNumber);
    await page.waitForTimeout(1000);

    // Click Update Make & Model button
    await page.getByRole('button', { name: /Update Make & Model/i }).click();
    await page.waitForTimeout(3000);

    // Click Manufacturers tab
    await page.getByRole('button', { name: /^Manufacturers$/ }).click();
    await page.waitForTimeout(2000);

    // Sort A → Z (Manufacturers)
    await page.getByRole('button', { name: /^Sort$/ }).click();
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'A → Z' }).click();
    await page.waitForTimeout(2000);

    // Sort Z → A (Manufacturers)
    await page.getByRole('button', { name: /^Sort$/ }).click();
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'Z → A' }).click();
    await page.waitForTimeout(2000);

    // Sort Newest First (Manufacturers)
    await page.getByRole('button', { name: /^Sort$/ }).click();
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'Newest First' }).click();
    await page.waitForTimeout(2000);

    // Sort Oldest First (Manufacturers)
    await page.getByRole('button', { name: /^Sort$/ }).click();
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'Oldest First' }).click();
    await page.waitForTimeout(2000);

});