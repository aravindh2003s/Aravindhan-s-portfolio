import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        // Wait for preloader to finish
        await page.waitForTimeout(2000);
    });

    test('navbar renders with all required links', async ({ page }) => {
        const nav = page.locator('nav.navbar');
        await expect(nav).toBeVisible();

        const expectedLinks = ['About', 'Experience', 'Education', 'Expertise', 'Selected Works', 'Contact'];
        for (const linkText of expectedLinks) {
            await expect(page.locator(`nav a.nav-link:has-text("${linkText}")`)).toBeVisible();
        }
    });

    test('logo links to home', async ({ page }) => {
        const logo = page.locator('a.logo').first();
        await expect(logo).toHaveAttribute('href', '#home');
        await expect(logo).toContainText('Aravindhan');
    });

    test('clicking nav link scrolls to the correct section', async ({ page }) => {
        await page.locator('a.nav-link:has-text("About")').click();
        await page.waitForTimeout(800);
        const aboutSection = page.locator('#about');
        await expect(aboutSection).toBeInViewport();
    });

    test('clicking Education nav link scrolls to education section', async ({ page }) => {
        await page.locator('a.nav-link:has-text("Education")').click();
        await page.waitForTimeout(800);
        const educationSection = page.locator('#education');
        await expect(educationSection).toBeInViewport();
    });

    test('dark mode toggle button is visible and functional', async ({ page }) => {
        const toggleBtn = page.locator('#themeToggle');
        await expect(toggleBtn).toBeVisible();

        // Default should be dark (moon icon)
        await expect(page.locator('#themeIcon')).toHaveClass(/fa-moon/);

        // Click to switch to light mode
        await toggleBtn.click();
        await expect(page.locator('#themeIcon')).toHaveClass(/fa-sun/);
        await expect(page.locator('body')).toHaveClass(/light-mode/);

        // Preference is persisted in localStorage
        const theme = await page.evaluate(() => localStorage.getItem('theme'));
        expect(theme).toBe('light');

        // Click again to switch back to dark
        await toggleBtn.click();
        await expect(page.locator('#themeIcon')).toHaveClass(/fa-moon/);
        await expect(page.locator('body')).not.toHaveClass(/light-mode/);
    });

    test('localStorage theme preference is restored on reload', async ({ page }) => {
        // Set light mode
        await page.evaluate(() => localStorage.setItem('theme', 'light'));
        await page.reload();
        await page.waitForTimeout(500);
        await expect(page.locator('body')).toHaveClass(/light-mode/);
    });

    test('hamburger menu toggles on mobile viewport', async ({ page, viewport }) => {
        if (!viewport || viewport.width > 768) {
            test.skip();
        }
        const hamburger = page.locator('#hamburger');
        const navMenu = page.locator('#navMenu');

        await expect(hamburger).toBeVisible();
        await hamburger.click();
        await expect(navMenu).toHaveClass(/active/);

        await hamburger.click();
        await expect(navMenu).not.toHaveClass(/active/);
    });

    test('clicking mobile nav link closes the menu', async ({ page, viewport }) => {
        if (!viewport || viewport.width > 768) {
            test.skip();
        }
        await page.locator('#hamburger').click();
        await page.locator('a.nav-link:has-text("About")').click();
        await expect(page.locator('#navMenu')).not.toHaveClass(/active/);
    });
});
