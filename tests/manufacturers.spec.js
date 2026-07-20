const { test, expect } = require('@playwright/test');

test.setTimeout(300000);

test('Login Test - Navigate to Masters > Manufacturers', async ({ page }) => {

    // Generate unique data
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    const locationName = `Location${randomNumber}`;
    const locationCode = `LOC${randomNumber}`;

    // Generate unique model number
    const uniqueModelNumber = `${Math.floor(10 + Math.random() * 90)}${Date.now().toString().slice(-2)}`;

    // Generate unique manufacturer name (2-digit number only)
    const manufacturerName = `Test${Math.floor(10 + Math.random() * 90)}`;

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

    if (await mastersMenu.count()) {
        await mastersMenu.click();
        await page.waitForTimeout(1000);
    }

    // Navigate to Manufacturers
    await page.locator('a[href="/masters/manufacturers"]').click();

    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Verify page
    await expect(page).toHaveURL(/.*\/masters\/manufacturers/);

    // -----------------------------
    // MODELS SORTING
    // -----------------------------

    // A → Z
    await page.getByRole('button', { name: /^Sort$/ }).click();
    await page.getByRole('button', { name: /^A → Z$/ }).waitFor();
    await page.getByRole('button', { name: /^A → Z$/ }).click();
    await page.waitForLoadState('networkidle');

    // Z → A
    await page.getByRole('button', { name: /^Sort$/ }).click();
    await page.getByRole('button', { name: /^Z → A$/ }).waitFor();
    await page.getByRole('button', { name: /^Z → A$/ }).click();
    await page.waitForLoadState('networkidle');

    // Newest First
    await page.getByRole('button', { name: /^Sort$/ }).click();
    await page.getByRole('button', { name: /^Newest First$/ }).waitFor();
    await page.getByRole('button', { name: /^Newest First$/ }).click();
    await page.waitForLoadState('networkidle');

    // Oldest First
    await page.getByRole('button', { name: /^Sort$/ }).click();

    const oldestModel = page.getByRole('button', {
        name: /^Oldest First$/
    });

    await oldestModel.waitFor({
        state: 'visible'
    });

    await oldestModel.click();

    await page.waitForLoadState('networkidle');

    // -----------------------------
    // SEARCH
    // -----------------------------

    const searchBox = page.locator(
        'input[placeholder="Search models... (Ctrl+K)"]'
    );

    await searchBox.click();
    await searchBox.fill('Aditya WS-440 440W');

    await page.waitForTimeout(2000);

    // -----------------------------
    // DEACTIVATE
    // -----------------------------

    await page.locator(
        'button[title="Click to Deactivate"]'
    ).click();

    await page.waitForTimeout(1000);

    await page.getByRole('button', {
        name: /^Deactivate$/
    }).click();

    await page.waitForTimeout(3000);

    // -----------------------------
    // ACTIVATE
    // -----------------------------

    await page.locator(
        'button[title="Click to Activate"]'
    ).click();

    await page.waitForTimeout(1000);

    await page.getByRole('button', {
        name: /^Activate$/
    }).click();

    await page.waitForTimeout(3000);

    // -----------------------------
    // EDIT MODEL
    // -----------------------------

    await page.locator(
        'svg.lucide-square-pen'
    ).first().click();

    await page.waitForTimeout(2000);

    const modelNumberInput = page.locator('#modelNumber');

    await modelNumberInput.click();
    await modelNumberInput.clear();
    await modelNumberInput.fill(uniqueModelNumber);

    await page.waitForTimeout(1000);

    await page.getByRole('button', {
        name: /Update Make & Model/i
    }).click();

    await page.waitForTimeout(3000);

    // -----------------------------
    // MANUFACTURERS TAB
    // -----------------------------

    await page.getByRole('button', {
        name: /^Manufacturers$/
    }).click();

    await page.waitForTimeout(2000);
    // -----------------------------
    // MANUFACTURERS SORTING
    // -----------------------------

    // A → Z
    await page.getByRole('button', { name: /^Sort$/ }).click();

    const manufacturerAToZ = page.getByRole('button', {
        name: /^A → Z$/
    });

    await manufacturerAToZ.waitFor({
        state: 'visible'
    });

    await manufacturerAToZ.click();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Z → A
    await page.getByRole('button', { name: /^Sort$/ }).click();

    const manufacturerZToA = page.getByRole('button', {
        name: /^Z → A$/
    });

    await manufacturerZToA.waitFor({
        state: 'visible'
    });

    await manufacturerZToA.click();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Newest First
    await page.getByRole('button', { name: /^Sort$/ }).click();

    const newestManufacturer = page.getByRole('button', {
        name: /^Newest First$/
    });

    await newestManufacturer.waitFor({
        state: 'visible'
    });

    await newestManufacturer.click();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Oldest First
    await page.getByRole('button', { name: /^Sort$/ }).click();

    const oldestManufacturer = page.getByRole('button', {
        name: /^Oldest First$/
    });

    await oldestManufacturer.waitFor({
        state: 'visible',
        timeout: 10000
    });

    await oldestManufacturer.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    await oldestManufacturer.click({ force: true });

    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);

    // -----------------------------
    // ADD MANUFACTURER
    // -----------------------------

    await page.getByRole('button', {
        name: /Add Manufacturer/i
    }).click();

    await page.waitForTimeout(2000);

    // -----------------------------
    // ENTER MANUFACTURER NAME
    // -----------------------------

    const manufacturerNameInput = page.locator('#name');

    await manufacturerNameInput.click();
    await manufacturerNameInput.clear();
    await manufacturerNameInput.fill(manufacturerName);

    await page.waitForTimeout(1000);
    // -----------------------------
    // ENTER MANUFACTURER CODE
    // -----------------------------

    const manufacturerPrefixes = [
        'AA', 'AB', 'AC', 'AD', 'AE',
        'AF', 'AG', 'AH', 'AJ', 'AK',
        'AL', 'AM', 'AN', 'AP', 'AR',
        'AS', 'AT', 'AU', 'AV', 'AW',
        'AX', 'AY', 'AZ'
    ];

    const manufacturerCode =
        `${manufacturerPrefixes[Math.floor(Math.random() * manufacturerPrefixes.length)]}${Math.floor(10 + Math.random() * 90)}`;

    const manufacturerCodeInput = page.locator('#code');

    await manufacturerCodeInput.click();
    await manufacturerCodeInput.clear();
    await manufacturerCodeInput.fill(manufacturerCode);

    await page.waitForTimeout(1000);
    // -----------------------------
    // ENTER EMAIL ADDRESS
    // -----------------------------

    const emailNumber = Math.floor(1000 + Math.random() * 9000);
    const uniqueEmail = `manufacturer${emailNumber}@testmail.com`;

    const emailInput = page.locator('#contactInfo\\.email');

    await emailInput.click();
    await emailInput.clear();
    await emailInput.fill(uniqueEmail);

    await page.waitForTimeout(1000);
    // -----------------------------
    // ENTER PHONE NUMBER
    // -----------------------------

    // Generate a unique 10-digit phone number
    const uniquePhoneNumber = `9${Math.floor(100000000 + Math.random() * 900000000)}`;

    const phoneInput = page.locator('#contactInfo\\.phone');

    await phoneInput.click();
    await phoneInput.clear();
    await phoneInput.fill(uniquePhoneNumber);

    await page.waitForTimeout(1000);
    // -----------------------------
    // ENTER UNIQUE WEBSITE
    // -----------------------------

    const websiteNumber = Math.floor(1000 + Math.random() * 9000);
    const uniqueWebsite = `https://manufacturer${websiteNumber}.com`;

    const websiteInput = page.locator('#contactInfo\\.website');

    await websiteInput.click();
    await websiteInput.clear();
    await websiteInput.fill(uniqueWebsite);

    await page.waitForTimeout(1000);
    // -----------------------------
    // ENTER DESCRIPTION
    // -----------------------------

    const descriptionInput = page.locator('#description');

    await descriptionInput.click();
    await descriptionInput.clear();
    await descriptionInput.fill('Project-1');

    await page.waitForTimeout(1000);
    // -----------------------------
    // CREATE MANUFACTURER
    // -----------------------------

    await page.getByRole('button', {
        name: /Create Manufacturer/i
    }).click();

    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
    // -----------------------------
    // SEARCH MANUFACTURER
    // -----------------------------

    const manufacturerSearch = page.locator(
        'input[placeholder="Search manufacturers... (Ctrl+K)"]'
    );

    await manufacturerSearch.click();
    await manufacturerSearch.clear();
    await manufacturerSearch.fill('SINENG');

    await page.waitForTimeout(2000);
    // -----------------------------
    // DEACTIVATE MANUFACTURER
    // -----------------------------

    const deactivateToggle = page.locator(
        'button[title="Click to Deactivate"]'
    ).first();

    await deactivateToggle.click();

    await page.waitForTimeout(1000);
    // -----------------------------
    // DEACTIVATE CONFIRMATION
    // -----------------------------

    await page.getByRole('button', {
        name: /^Deactivate$/
    }).click();

    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
    // -----------------------------
    // REACTIVATE MANUFACTURER
    // -----------------------------

    const activateToggle = page.locator(
        'button[title="Click to Activate"]'
    ).first();

    await activateToggle.click();

    await page.waitForTimeout(1000);
    // -----------------------------
    // ACTIVATE CONFIRMATION
    // -----------------------------

    await page.getByRole('button', {
        name: /^Activate$/
    }).click();

    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
    // -----------------------------
    // EDIT MANUFACTURER
    // -----------------------------

    await page.locator('svg.lucide-square-pen').first().click();

    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    // -----------------------------
    // EDIT MANUFACTURER CODE
    // -----------------------------

    // Generate a new manufacturer code
    const updatedManufacturerPrefixes = [
        'BA', 'BB', 'BC', 'BD', 'BE',
        'BF', 'BG', 'BH', 'BJ', 'BK',
        'BL', 'BM', 'BN', 'BP', 'BR',
        'BS', 'BT', 'BU', 'BV', 'BW',
        'BX', 'BY', 'BZ'
    ];

    const updatedManufacturerCode =
        `${updatedManufacturerPrefixes[Math.floor(Math.random() * updatedManufacturerPrefixes.length)]}${Math.floor(1000 + Math.random() * 9000)}`;

    const editManufacturerCodeInput = page.locator('#code');

    await editManufacturerCodeInput.click();
    await editManufacturerCodeInput.clear();
    await editManufacturerCodeInput.fill(updatedManufacturerCode);

    await page.waitForTimeout(1000);
    // -----------------------------
    // UPDATE MANUFACTURER
    // -----------------------------

    await page.getByRole('button', {
        name: /Update Manufacturer/i
    }).click();

    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
    // -----------------------------
    // IMPORT FROM DATABASE TAB
    // -----------------------------

    await page.getByRole('button', {
        name: /Import from Database/i
    }).click();

    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    // -----------------------------
    // SELECT ASSET CATEGORIES
    // -----------------------------

    // MOD – Solar Module
    await page.getByRole('button', {
        name: /MOD\s*–\s*Solar Module/i
    }).click();
    await page.waitForTimeout(500);

    // INV – Inverter
    await page.getByRole('button', {
        name: /INV\s*–\s*Inverter/i
    }).click();
    await page.waitForTimeout(500);

    // SCB – String Combiner Box
    await page.getByRole('button', {
        name: /SCB\s*–\s*String Combiner Box/i
    }).click();
    await page.waitForTimeout(500);

    // TRF – Transformer
    await page.getByRole('button', {
        name: /TRF\s*–\s*Transformer/i
    }).click();
    await page.waitForTimeout(500);

    // CAB – Cable
    await page.getByRole('button', {
        name: /CAB\s*–\s*Cable/i
    }).click();
    await page.waitForTimeout(500);

    // MTB – Mounting Structure
    await page.getByRole('button', {
        name: /MTB\s*–\s*Mounting Structure/i
    }).click();
    await page.waitForTimeout(500);

    // SWG – Switchgear
    await page.getByRole('button', {
        name: /SWG\s*–\s*Switchgear/i
    }).click();
    await page.waitForTimeout(1000);

    // -----------------------------
    // CLEAR SEARCH & SEARCH HAVELLS INDIA
    // -----------------------------

    const importSearch = page.locator(
        'input[placeholder="Search manufacturers or models..."]'
    );

    // Click search box
    await importSearch.click();

    // Clear any previous search completely
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Backspace');
    await importSearch.fill('');

    // Wait for filter to reset
    await page.waitForTimeout(2000);

    // Search Havells India
    await importSearch.fill('Havells India');

    // Wait for filtered results
    await page.waitForTimeout(3000);

    // Clear search again
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Backspace');
    await importSearch.fill('');

    await page.waitForTimeout(2000);

    // -----------------------------
    // DESELECT ALL
    // -----------------------------

    await page.getByRole('button', {
        name: /Deselect All/i
    }).click();

    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // -----------------------------
    // SELECT FIRST 3 MANUFACTURERS
    // -----------------------------

    const checkboxes = page.locator(
        'input[type="checkbox"].accent-green-600'
    );

    await checkboxes.nth(0).check();
    await page.waitForTimeout(500);

    await checkboxes.nth(1).check();
    await page.waitForTimeout(500);

    await checkboxes.nth(2).check();
    await page.waitForTimeout(1000);

    // -----------------------------
    // IMPORT MANUFACTURERS
    // -----------------------------

    await page.getByRole('button', {
        name: /Import.*Manufacturers/i
    }).click();

    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
});