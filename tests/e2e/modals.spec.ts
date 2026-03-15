import { test, expect } from '@playwright/test';

test.describe('Project Modals', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.waitForTimeout(2000);
        // Scroll to projects section first
        await page.evaluate(() =>
            document.getElementById('projects')?.scrollIntoView()
        );
        await page.waitForTimeout(500);
    });

    // Helper: open a specific modal by clicking its "View Details" button
    async function openModal(page: any, projectTitleText: string) {
        const article = page.locator(`.project-feature:has(.project-title:has-text("${projectTitleText}"))`);
        const btn = article.locator('button:has-text("View Details")');
        await btn.click();
        await page.waitForTimeout(400);
    }

    test('all 4 "View Details" buttons are present', async ({ page }) => {
        const viewDetailsBtns = page.locator('button:has-text("View Details")');
        await expect(viewDetailsBtns).toHaveCount(4);
    });

    // ==================== Modal 1 — Indoor Positioning ====================
    test('modal-1: Indoor Positioning opens with correct content', async ({ page }) => {
        await openModal(page, 'Indoor Positioning');
        const modal = page.locator('#modal-1');
        await expect(modal).toHaveClass(/active/);
        await expect(modal).toContainText('Indoor Positioning System');
        await expect(modal).toContainText('FastAPI');
        await expect(modal).toContainText('ML');
        await expect(modal).toContainText('IoT');
    });

    test('modal-1 closes when clicking the X button', async ({ page }) => {
        await openModal(page, 'Indoor Positioning');
        await page.locator('#modal-1 .close-modal').click();
        await page.waitForTimeout(400);
        await expect(page.locator('#modal-1')).not.toHaveClass(/active/);
    });

    test('modal-1 closes when clicking outside (overlay)', async ({ page }) => {
        await openModal(page, 'Indoor Positioning');
        await page.locator('#modal-1').click({ position: { x: 10, y: 10 } });
        await page.waitForTimeout(400);
        await expect(page.locator('#modal-1')).not.toHaveClass(/active/);
    });

    // ==================== Modal 2 — EMS ====================
    test('modal-2: Employee Management System opens with correct content', async ({ page }) => {
        await openModal(page, 'Employee Management');
        const modal = page.locator('#modal-2');
        await expect(modal).toHaveClass(/active/);
        await expect(modal).toContainText('Employee Management System');
        await expect(modal).toContainText('Spring Boot');
        await expect(modal).toContainText('MySQL');

        // Verify key functionality bullets
        await expect(modal.locator('ul.modal-list li')).toHaveCount(5);
    });

    test('modal-2 closes when clicking the X button', async ({ page }) => {
        await openModal(page, 'Employee Management');
        await page.locator('#modal-2 .close-modal').click();
        await page.waitForTimeout(400);
        await expect(page.locator('#modal-2')).not.toHaveClass(/active/);
    });

    // ==================== Modal 3 — Portfolio ====================
    test('modal-3: Portfolio Website opens with correct content', async ({ page }) => {
        await openModal(page, 'Portfolio');
        const modal = page.locator('#modal-3');
        await expect(modal).toHaveClass(/active/);
        await expect(modal).toContainText('Portfolio Website with Login');
        await expect(modal).toContainText('JWT');
        await expect(modal).toContainText('Docker');
    });

    test('modal-3 closes when clicking the X button', async ({ page }) => {
        await openModal(page, 'Portfolio');
        await page.locator('#modal-3 .close-modal').click();
        await page.waitForTimeout(400);
        await expect(page.locator('#modal-3')).not.toHaveClass(/active/);
    });

    // ==================== Modal 4 — E-Commerce ====================
    test('modal-4: E-Commerce Website opens with correct content', async ({ page }) => {
        await openModal(page, 'E-Commerce');
        const modal = page.locator('#modal-4');
        await expect(modal).toHaveClass(/active/);
        await expect(modal).toContainText('E-Commerce Full-Stack Website');
        await expect(modal).toContainText('React');
        await expect(modal).toContainText('TypeScript');
        await expect(modal).toContainText('T-shirt');
    });

    test('modal-4 closes when clicking the X button', async ({ page }) => {
        await openModal(page, 'E-Commerce');
        await page.locator('#modal-4 .close-modal').click();
        await page.waitForTimeout(400);
        await expect(page.locator('#modal-4')).not.toHaveClass(/active/);
    });

    // ==================== General modal behavior ====================
    test('body scroll is locked when a modal is open', async ({ page }) => {
        await openModal(page, 'Indoor Positioning');
        const overflow = await page.evaluate(() => document.body.style.overflow);
        expect(overflow).toBe('hidden');
    });

    test('body scroll is restored when modal closes', async ({ page }) => {
        await openModal(page, 'Indoor Positioning');
        await page.locator('#modal-1 .close-modal').click();
        await page.waitForTimeout(400);
        const overflow = await page.evaluate(() => document.body.style.overflow);
        expect(overflow).toBe('');
    });
});
