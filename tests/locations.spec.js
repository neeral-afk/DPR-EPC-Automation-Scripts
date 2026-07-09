const { test, expect } = require('@playwright/test');

test.setTimeout(120000);

test('Login Test - Navigate to Masters > Locations', async ({ page }) => {

    // Generate unique location name and code
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    const locationName = `Location${randomNumber}`;
    const locationCode = `LOC${randomNumber}`;

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

    // Click Masters dropdown
    await page.getByRole('button', { name: /masters/i }).click();
    await page.waitForTimeout(1000);

    // Click Locations
    await page.locator('a[href="/masters/locations"]').click();

    // Wait for Locations page
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/\/masters\/locations/);

    // -------------------- Sort A → Z --------------------

    await page.getByRole('button', { name: 'Sort' }).click();
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'A → Z' }).click();
    await page.waitForTimeout(2000);

    // -------------------- Sort Z → A --------------------

    await page.getByRole('button', { name: 'Sort' }).click();
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'Z → A' }).click();
    await page.waitForTimeout(2000);

    // -------------------- Sort Newest First --------------------

    await page.getByRole('button', { name: 'Sort' }).click();
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'Newest First' }).click();
    await page.waitForTimeout(2000);

    // -------------------- Sort Oldest First --------------------

    await page.getByRole('button', { name: 'Sort' }).click();
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'Oldest First' }).click();
    await page.waitForTimeout(2000);

    // -------------------- Reset Sort --------------------

    await page.getByRole('button', { name: 'Sort' }).click();
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'Reset Sort' }).click();
    await page.waitForTimeout(2000);

    // -------------------- Open Filters --------------------

    await page.getByRole('button', { name: 'Filters' }).click();
    await page.waitForTimeout(2000);

    // -------------------- Click Add Location --------------------

    await page.getByRole('button', { name: 'Add Location' }).click();
    await page.waitForTimeout(2000);

    // -------------------- Enter Unique Location Name --------------------

    await page.locator('#name').fill(locationName);
    await page.waitForTimeout(1000);

    // -------------------- Enter Unique Location Code --------------------

    await page.locator('#code').fill(locationCode);
    await page.waitForTimeout(1000);

    // -------------------- Select Warehouse --------------------

    // Open the Location Type dropdown
    await page.locator('select').click();

    // Select Warehouse
    await page.locator('select').selectOption('Warehouse');

    // Wait for selection
    await page.waitForTimeout(1000);

});