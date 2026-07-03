const { test, expect } = require('@playwright/test');

test('Login Test - Redirect to Project Type', async ({ page }) => {
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

    // Return to Sign In page
    await page.goto('https://devfsm.sorigin.app/signin', {
        waitUntil: 'networkidle'
    });

    // Login
    await page.locator('input[type="email"]').first().fill('mayur.zade@sorigin.co');
    await page.locator('input[type="password"]').fill('sm@12345');

    await page.getByRole('button', { name: /sign in/i }).click();

    // Wait until redirected to Dashboard
    await page.waitForURL(/dashboard/i, {
        timeout: 30000
    });

    // Verify Dashboard
    await expect(page).toHaveURL(/dashboard/i);

    // Wait before opening Masters menu
    await page.waitForTimeout(300);

    // Click Masters menu
    await page.getByText('Masters').click();

    // Wait for dropdown to expand
    await page.waitForTimeout(300);

    // Click Project Type
    await page.getByText('Project Type').click();

    // Wait for Project Type page
    await page.waitForLoadState('networkidle');

    // Verify Project Type page opened
    await expect(page).toHaveURL(/project-type/i);

    // Wait before opening Filters
    await page.waitForTimeout(300);

    // Click Filters
    await page.getByRole('button', { name: /Filters/i }).click();

    // Wait for Filters panel
    await page.waitForLoadState('networkidle');

    // Filter by Category - Solar
    await page.waitForTimeout(300);
    const categoryInput = page.locator('input[id^="react-select-"]').nth(0);
    await categoryInput.click();
    await categoryInput.fill('solar');
    await page.getByText('solar', { exact: false }).first().click();

    // Wait for filter to apply
    await page.waitForLoadState('networkidle');

    // Filter by Status - Active
    await page.waitForTimeout(300);
    const statusInput = page.locator('input[id^="react-select-"]').nth(1);
    await statusInput.click();
    await statusInput.fill('active');
    await page.getByText('active', { exact: false }).first().click();

    // Wait for filter to apply
    await page.waitForLoadState('networkidle');

    // Search Project Type
    await page.waitForTimeout(300);
    const searchBox = page.locator('input[placeholder="Search project types... (Ctrl+K)"]');
    await expect(searchBox).toBeVisible();
    await searchBox.click();
    await searchBox.fill('sudarshan');

    // Wait for search results
    await page.waitForLoadState('networkidle');
});