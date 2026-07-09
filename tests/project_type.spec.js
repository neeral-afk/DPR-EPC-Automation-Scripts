const { test, expect } = require('@playwright/test');

test.setTimeout(120000);

test('Login Test - Navigate to Masters > Project Type > Add Project Type', async ({ page }) => {

    // Generate unique project name
    const projectName = `infosys_${Date.now()}`;

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

    // Wait for Dashboard
    await expect(
        page.locator('button:has-text("Masters")')
    ).toBeVisible({
        timeout: 30000
    });

    // Open Masters
    await page.locator('button:has-text("Masters")').click();

    await page.waitForTimeout(1000);

    // Open Project Type
    await page.getByText('Project Type', {
        exact: true
    }).click();

    // Wait for Project Type page
    await expect(
        page.getByPlaceholder('Search project types... (Ctrl+K)')
    ).toBeVisible({
        timeout: 30000
    });

    // Open Filters
    await page.getByRole('button', {
        name: 'Filters'
    }).click();

    await page.waitForTimeout(1000);

    // Category Filter
    try {

        const categoryInput = page.locator(
            'input[id^="react-select-"][id$="-input"]'
        );

        await categoryInput.click({ force: true });

        await categoryInput.pressSequentially('Solar', {
            delay: 100
        });

        await page.waitForTimeout(1000);

        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('Enter');

        await page.waitForTimeout(1500);

    } catch {

        console.log('Category selection skipped.');

    }

    // Search Existing Project
    const searchBox = page.getByPlaceholder(
        'Search project types... (Ctrl+K)'
    );

    await expect(searchBox).toBeVisible();

    await searchBox.click();
    await searchBox.clear();
    await searchBox.fill('sudarshan');

    await page.waitForTimeout(2000);

    // Click Add Project Type
    await page.getByRole('button', {
        name: 'Add Project Type'
    }).click();

    // Wait for Add Form
    await expect(page.locator('#category')).toBeVisible();

    // Select Category
    await page.locator('#category').selectOption('solar');

    // Enter Project Name
    await page.locator('#name').fill(projectName);

    // Enter Description
    await page.locator('#description').fill('Projects');

    // Click Create Project Type
    await page.getByRole('button', {
        name: 'Create Project Type'
    }).click();

    // Wait for Project Type page
    await expect(
        page.getByPlaceholder('Search project types... (Ctrl+K)')
    ).toBeVisible({
        timeout: 30000
    });

    await page.waitForTimeout(2000);

    // Search Newly Created Project Type
    const finalSearchBox = page.getByPlaceholder(
        'Search project types... (Ctrl+K)'
    );

    await expect(finalSearchBox).toBeVisible({
        timeout: 10000
    });

    await finalSearchBox.click();
    await finalSearchBox.clear();
    await finalSearchBox.fill(projectName);

    await page.waitForTimeout(3000);

    const createdProject = page.locator('tbody tr').filter({
        has: page.getByText(projectName, { exact: true })
    });

    await expect(createdProject).toBeVisible({
        timeout: 15000
    });

    console.log(`✅ Project Type Created Successfully: ${projectName}`);

    const deactivateButton = createdProject.locator(
        'button[title="Click to Deactivate"]'
    );

    await expect(deactivateButton).toBeVisible({
        timeout: 10000
    });

    await deactivateButton.click();

    await page.waitForTimeout(1000);

    const confirmDeactivateButton = page.getByRole('button', {
        name: 'Deactivate',
        exact: true
    });

    await expect(confirmDeactivateButton).toBeVisible({
        timeout: 10000
    });

    await confirmDeactivateButton.click();

    await page.waitForTimeout(3000);

    const activateToggle = createdProject.locator(
        'button[title="Click to Activate"]'
    );

    await expect(activateToggle).toBeVisible({
        timeout: 10000
    });

    console.log('✅ Project Type Deactivated Successfully');

    await activateToggle.click();

    await page.waitForTimeout(1000);

    const confirmActivateButton = page.getByRole('button', {
        name: 'Activate',
        exact: true
    });

    await expect(confirmActivateButton).toBeVisible({
        timeout: 10000
    });

    await confirmActivateButton.click();

    await page.waitForTimeout(3000);
    const deactivateToggle = createdProject.locator(
        'button[title="Click to Deactivate"]'
    );

    await expect(deactivateToggle).toBeVisible({
        timeout: 10000
    });

    console.log('✅ Project Type Activated Successfully');

    // -------------------------
    // Click Edit Button
    // -------------------------
    const editButton = createdProject
        .locator('svg.lucide-square-pen')
        .locator('xpath=ancestor::button');

    await expect(editButton).toBeVisible({
        timeout: 10000
    });

    await editButton.click();

    await page.waitForTimeout(2000);

    console.log('✅ Edit Project Type page opened successfully');

    // -------------------------
    // Update Project Type Name
    // -------------------------
    const updatedProjectName = `gold${Math.floor(Math.random() * 90) + 10}`;

    const projectNameField = page.locator('#name');

    await expect(projectNameField).toBeVisible({
        timeout: 10000
    });

    await projectNameField.click();
    await projectNameField.clear();
    await projectNameField.fill(updatedProjectName);

    await expect(projectNameField).toHaveValue(updatedProjectName);

    console.log(`✅ Project Type Name updated to ${updatedProjectName}`);

    // -------------------------
    // Click Update Project Type
    // -------------------------
    const updateProjectTypeButton = page.getByRole('button', {
        name: 'Update Project Type',
        exact: true
    });

    await expect(updateProjectTypeButton).toBeVisible({
        timeout: 10000
    });

    await updateProjectTypeButton.click();

    // Wait for Project Type list
    await expect(
        page.getByPlaceholder('Search project types... (Ctrl+K)')
    ).toBeVisible({
        timeout: 30000
    });

    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);

    console.log(`✅ Project Type updated successfully to ${updatedProjectName}`);

    // -------------------------
    // Scroll Down
    // -------------------------
    await page.evaluate(() => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    });

    await page.waitForTimeout(2000);

    // -------------------------
    // Click Page 2
    // -------------------------
    const page2Button = page
        .locator('div.flex.items-center.gap-1 button')
        .filter({
            hasText: /^2$/
        })
        .first();

    await expect(page2Button).toBeVisible({
        timeout: 30000
    });

    await page2Button.click();

    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);

    console.log('✅ Successfully navigated to Page 2');

});