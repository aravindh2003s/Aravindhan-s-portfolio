import { test, expect } from '@playwright/test';

test.describe('Contact Section', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.waitForTimeout(2000);
        // Scroll to contact
        await page.evaluate(() =>
            document.getElementById('contact')?.scrollIntoView()
        );
        await page.waitForTimeout(500);
    });

    test('contact section heading is visible', async ({ page }) => {
        const contact = page.locator('#contact');
        await expect(contact).toBeAttached();
        await expect(contact.locator('h2')).toContainText("Let's build something extraordinary");
    });

    test('email contact card is visible with correct address', async ({ page }) => {
        const emailCard = page.locator('.contact-method-card a[href*="mailto"]');
        await expect(emailCard).toBeVisible();
        await expect(emailCard).toHaveAttribute('href', /aravindh2003s@gmail\.com/);
        await expect(emailCard).toContainText('aravindh2003s@gmail.com');
    });

    test('phone contact card is visible with correct number', async ({ page }) => {
        const phoneCard = page.locator('.contact-method-card a[href*="tel"]');
        await expect(phoneCard).toBeVisible();
        await expect(phoneCard).toHaveAttribute('href', /8838544167/);
        await expect(phoneCard).toContainText('+91');
    });

    test('location card shows Chennai, India', async ({ page }) => {
        const locationCard = page.locator('.contact-method-card').filter({ hasText: 'Location' });
        await expect(locationCard).toBeVisible();
        await expect(locationCard).toContainText('Chennai');
    });

    // ==================== Contact Form fields ====================
    test('contact form fields (Name, Email, Message) are visible', async ({ page }) => {
        const form = page.locator('#contactForm');
        await expect(form).toBeVisible();
        await expect(page.locator('#name')).toBeVisible();
        await expect(page.locator('#email')).toBeVisible();
        await expect(page.locator('#message')).toBeVisible();
        await expect(form.locator('button[type="submit"]')).toBeVisible();
    });

    test('form fields have correct placeholder text', async ({ page }) => {
        await expect(page.locator('#name')).toHaveAttribute('placeholder', /John Doe/i);
        await expect(page.locator('#email')).toHaveAttribute('placeholder', /john@example\.com/i);
        await expect(page.locator('#message')).toHaveAttribute('placeholder', /How can I help/i);
    });

    test('name field is required', async ({ page }) => {
        const nameField = page.locator('#name');
        await expect(nameField).toHaveAttribute('required', '');
    });

    test('email field is required and has email type', async ({ page }) => {
        const emailField = page.locator('#email');
        await expect(emailField).toHaveAttribute('required', '');
        await expect(emailField).toHaveAttribute('type', 'email');
    });

    test('message field is required', async ({ page }) => {
        const messageField = page.locator('#message');
        await expect(messageField).toHaveAttribute('required', '');
    });

    // ==================== Form submission (mocked) ====================
    test('successful form submission shows success message', async ({ page }) => {
        // Mock the API endpoint so no backend is needed
        await page.route('**/api/contact', route => {
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({ success: true, message: 'Message transmitted successfully.' }),
            });
        });

        await page.fill('#name', 'Test User');
        await page.fill('#email', 'test@example.com');
        await page.fill('#message', 'Hello, this is a Playwright E2E test message!');
        await page.locator('#contactForm button[type="submit"]').click();

        const formMessage = page.locator('#formMessage');
        await expect(formMessage).toContainText(/transmitted successfully|sent/i, { timeout: 5000 });
        await expect(formMessage).toHaveClass(/success/);
    });

    test('server error on form submission shows error message', async ({ page }) => {
        // Mock API to return error
        await page.route('**/api/contact', route => {
            route.fulfill({
                status: 500,
                contentType: 'application/json',
                body: JSON.stringify({ success: false, message: 'Server error. Please try again.' }),
            });
        });

        await page.fill('#name', 'Test User');
        await page.fill('#email', 'test@example.com');
        await page.fill('#message', 'Error scenario test');
        await page.locator('#contactForm button[type="submit"]').click();

        const formMessage = page.locator('#formMessage');
        await expect(formMessage).toHaveClass(/error/, { timeout: 5000 });
    });

    test('network failure on form submission shows connection error', async ({ page }) => {
        // Abort the request to simulate network failure
        await page.route('**/api/contact', route => route.abort());

        await page.fill('#name', 'Test User');
        await page.fill('#email', 'test@example.com');
        await page.fill('#message', 'Network failure test');
        await page.locator('#contactForm button[type="submit"]').click();

        const formMessage = page.locator('#formMessage');
        await expect(formMessage).toContainText(/error/i, { timeout: 5000 });
        await expect(formMessage).toHaveClass(/error/);
    });

    test('form fields are cleared after successful submission', async ({ page }) => {
        await page.route('**/api/contact', route => {
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({ success: true }),
            });
        });

        await page.fill('#name', 'Clear Test');
        await page.fill('#email', 'clear@test.com');
        await page.fill('#message', 'Should be cleared after send');
        await page.locator('#contactForm button[type="submit"]').click();

        await page.waitForTimeout(1000);
        await expect(page.locator('#name')).toHaveValue('');
        await expect(page.locator('#email')).toHaveValue('');
        await expect(page.locator('#message')).toHaveValue('');
    });
});
