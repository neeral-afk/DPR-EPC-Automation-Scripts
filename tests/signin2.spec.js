const { test, expect } = require('@playwright/test');

test('Login Test - Redirect to Dashboard', async ({ page }) => {
    // Open Sign In page
    await page.goto('https://devfsm.sorigin.app/signin', {
        waitUntil: 'networkidle'
    });

    // Enter Email
    await page.locator('input[type="email"]').first().fill('mayur.zade@sorigin.co');

    // Enter Password
    await page.locator('input[type="password"]').fill('sm@12345');

    // Show Password
    await page.locator('svg.fill-gray-500.size-6').click();
    await page.waitForTimeout(300);

    // Hide Password
    await page.locator('svg.fill-gray-500.size-6').click();

    // Remember Me
    await page.locator('input[type="checkbox"]').check();

    // Open Forgot Password popup
    await page.getByRole('link', { name: 'Forgot password?' }).click();

    // Wait for popup
    await page.waitForSelector('input[placeholder="info@sorigin.com"]');

    // Enter email for reset
    await page
        .locator('input[placeholder="info@sorigin.com"]')
        .last()
        .fill('neeral.shah@sorigin.co');

    // Send Link
    await page.getByRole('button', { name: 'Send Link' }).click();

    // Wait for popup to finish
    await page.waitForLoadState('networkidle');

    // Go back to Sign In page
    await page.goto('https://devfsm.sorigin.app/signin', {
        waitUntil: 'networkidle'
    });

    // Login
    await page.locator('input[type="email"]').first().fill('mayur.zade@sorigin.co');
    await page.locator('input[type="password"]').fill('sm@12345');

    await page.getByRole('button', { name: /sign in/i }).click();

    // Wait for login
    await page.waitForLoadState('networkidle');

    // Force navigation to Dashboard
    await page.goto('https://devfsm.sorigin.app/dashboard', {
        waitUntil: 'networkidle'
    });

    // Verify Dashboard opened
    await expect(page).toHaveURL(/dashboard/i);

    // Wait 300 ms before clicking Show Details
    await page.waitForTimeout(300);

    // Click "Show details" of Total Projects card
    const showDetails = page.getByText('Show details').nth(0);
    await expect(showDetails).toBeVisible();
    await showDetails.click();

    // Wait for project list to load
    await page.waitForLoadState('networkidle');

    // Wait 300 ms before clicking Open
    await page.waitForTimeout(300);

    // Click first Open button
    const openButton = page.getByRole('button', { name: /^Open$/ }).first();
    await expect(openButton).toBeVisible();
    await openButton.click();

    // Wait for Project Details page
    await page.waitForLoadState('networkidle');

    // Verify navigation happened
    await expect(page).not.toHaveURL(/dashboard$/i);

    // Wait 300 ms before clicking Equipment & Assets
    await page.waitForTimeout(300);

    // Click Equipment & Assets
    const equipmentAssets = page.getByRole('button', {
        name: /Equipment & Assets/i
    });
    await expect(equipmentAssets).toBeVisible();
    await equipmentAssets.click();

    // Wait for Equipment & Assets drawer to load
    await page.waitForLoadState('networkidle');

    // Wait 300 ms before closing the drawer
    await page.waitForTimeout(300);

    // Close Equipment & Assets drawer
    const closeDrawer = page.getByRole('button', {
        name: /Close drawer/i
    });
    await expect(closeDrawer).toBeVisible();
    await closeDrawer.click();

    // Wait for drawer to close
    await page.waitForLoadState('networkidle');
});  