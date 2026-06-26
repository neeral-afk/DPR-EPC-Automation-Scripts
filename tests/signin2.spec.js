const { test, expect } = require('@playwright/test');

test('Login Test', async ({ page }) => {
    await page.goto('https://devfsm.sorigin.app/signin', {
        waitUntil: 'domcontentloaded'
    });

    await page.locator('input[type="email"]').fill('mayur.zade@sorigin.co');

    await page.locator('input[type="password"]').fill('sm@12345');

    await page.locator('svg.fill-gray-500.size-6').click();

    // Send the Login button inspect element to add the login click.
});