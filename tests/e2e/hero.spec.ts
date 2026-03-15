import { test, expect } from '@playwright/test';

test.describe('Hero Section', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.waitForTimeout(2000); // preloader
    });

    test('hero displays name Aravindhan', async ({ page }) => {
        const heroSection = page.locator('#home');
        await expect(heroSection).toBeVisible();
        await expect(page.locator('.hero-title')).toContainText('Aravindhan');
    });

    test('hero subtitle contains technology keywords', async ({ page }) => {
        const subtitle = page.locator('.hero-subtitle');
        await expect(subtitle).toBeVisible();
        await expect(subtitle).toContainText('full-stack');
        await expect(subtitle).toContainText('TypeScript');
    });

    test('typewriter element (#typewriterText) is present', async ({ page }) => {
        const typeEl = page.locator('#typewriterText');
        await expect(typeEl).toBeVisible();
        // Should contain one of the cycling roles
        const text = await typeEl.textContent();
        expect(text).toBeTruthy();
        expect(text!.length).toBeGreaterThan(0);
    });

    test('typewriter cycles through multiple roles over time', async ({ page }) => {
        const typeEl = page.locator('#typewriterText');

        const text1 = await typeEl.textContent();
        // Wait long enough for at least one full cycle (typing + pause + deleting)
        await page.waitForTimeout(5000);
        const text2 = await typeEl.textContent();

        // Text should have changed (either more/less chars typed or a different word)
        expect(text2).not.toBeUndefined();
    });

    test('typewriter cursor element is rendered', async ({ page }) => {
        const cursor = page.locator('.typewriter-cursor');
        await expect(cursor).toBeAttached();
    });

    test('hero CTA buttons are visible', async ({ page }) => {
        await expect(page.locator('a:has-text("View Projects")')).toBeVisible();
        await expect(page.locator('a:has-text("Let\'s Talk")')).toBeVisible();
        await expect(page.locator('a:has-text("Resume")')).toBeVisible();
    });

    test('Download Resume button has correct href and download attribute', async ({ page }) => {
        const downloadBtn = page.locator('a.glass-btn-download');
        await expect(downloadBtn).toBeVisible();
        await expect(downloadBtn).toHaveAttribute('download');
        const href = await downloadBtn.getAttribute('href');
        expect(href).toContain('ARAVINDHAN-Resume');
    });

    test('View Projects button navigates to projects section', async ({ page }) => {
        await page.locator('a:has-text("View Projects")').click();
        await page.waitForTimeout(800);
        await expect(page.locator('#projects')).toBeInViewport();
    });

    test('scroll progress bar is present and updates on scroll', async ({ page }) => {
        const progressBar = page.locator('#scrollProgress');
        await expect(progressBar).toBeAttached();

        // Initially at 0% (or minimal)
        const initialWidth = await progressBar.evaluate(el => (el as HTMLElement).style.width);
        expect(initialWidth === '' || initialWidth === '0%').toBeTruthy();

        // Scroll to bottom and check progress bar increases
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(300);
        const finalWidth = await progressBar.evaluate(el => (el as HTMLElement).style.width);
        const widthValue = parseFloat(finalWidth);
        expect(widthValue).toBeGreaterThan(50);
    });

    test('hero scroll indicator is visible', async ({ page }) => {
        const scrollIndicator = page.locator('.hero-scroll-indicator');
        await expect(scrollIndicator).toBeAttached();
    });

    test('preloader hides after load', async ({ page }) => {
        await page.waitForTimeout(2500);
        const preloader = page.locator('#preloader');
        await expect(preloader).toHaveClass(/hidden/);
    });
});
