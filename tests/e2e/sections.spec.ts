import { test, expect } from '@playwright/test';

test.describe('Content Sections', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.waitForTimeout(2000);
    });

    // ==================== About ====================
    test.describe('About Section', () => {
        test('professional summary is visible', async ({ page }) => {
            const about = page.locator('#about');
            await expect(about).toBeAttached();
            await expect(about.locator('h2')).toContainText('Professional Summary');
            await expect(about.locator('.about-text').first()).toContainText('Full Stack Developer');
        });

        test('"What I Bring to a Team" panel is visible', async ({ page }) => {
            const sidePanel = page.locator('.about-panel-side');
            await expect(sidePanel).toBeAttached();
            await expect(sidePanel).toContainText('What I Bring to a Team');
            await expect(sidePanel.locator('li')).toHaveCount(5);
        });
    });

    // ==================== Experience ====================
    test.describe('Experience Section', () => {
        test('work experience section is visible', async ({ page }) => {
            const exp = page.locator('#experience');
            await expect(exp).toBeAttached();
            await expect(exp.locator('h2')).toContainText('Work Experience');
        });

        test('L&T internship entry shows correct role and dates', async ({ page }) => {
            const showcase = page.locator('.work-showcase');
            await expect(showcase).toBeVisible();
            await expect(showcase.locator('.work-title')).toContainText('Larsen');
            await expect(showcase.locator('.work-category')).toContainText('Feb 2025');
            await expect(showcase.locator('.work-category')).toContainText('May 2025');
        });

        test('experience bullet points are present', async ({ page }) => {
            const bullets = page.locator('.work-showcase .modal-list li');
            await expect(bullets).toHaveCount(3);
            await expect(bullets.first()).toContainText('TypeScript');
        });

        test('tech tags include Playwright, Selenium, Cucumber BDD and CI/CD', async ({ page }) => {
            const tags = page.locator('.work-tools .tag');
            const tagTexts = await tags.allTextContents();
            expect(tagTexts).toContain('Playwright');
            expect(tagTexts).toContain('Selenium');
            expect(tagTexts).toContain('Cucumber BDD');
            expect(tagTexts).toContain('CI/CD');
        });
    });

    // ==================== Education ====================
    test.describe('Education Section', () => {
        test('education section is present', async ({ page }) => {
            const edu = page.locator('#education');
            await expect(edu).toBeAttached();
            await expect(edu.locator('h2')).toContainText('Education');
        });

        test('B.Tech degree card shows correct institution and years', async ({ page }) => {
            const firstCard = page.locator('.edu-card').first();
            await expect(firstCard).toBeAttached();
            await expect(firstCard).toContainText('Bachelor of Technology');
            await expect(firstCard).toContainText('Computer Science');
            await expect(firstCard).toContainText('2021');
            await expect(firstCard).toContainText('2025');
            await expect(firstCard).toContainText('Sri Venkateshwaraa');
        });

        test('3 education entries are present (degree + 2 school)', async ({ page }) => {
            const cards = page.locator('.edu-card');
            await expect(cards).toHaveCount(3);
        });

        test('school entries show Jawahar Higher Secondary School', async ({ page }) => {
            const cards = page.locator('.edu-card');
            await expect(cards.nth(1)).toContainText('Jawahar');
            await expect(cards.nth(2)).toContainText('Jawahar');
        });

        test('education icon badges are rendered', async ({ page }) => {
            const icons = page.locator('.edu-icon-wrap');
            await expect(icons).toHaveCount(3);
        });
    });

    // ==================== Skills ====================
    test.describe('Skills Section', () => {
        test('skills section is visible with heading', async ({ page }) => {
            const skills = page.locator('#skills');
            await expect(skills).toBeAttached();
            await expect(skills.locator('h2')).toContainText('Technical Expertise');
        });

        test('6 skill cards are rendered', async ({ page }) => {
            const cards = page.locator('.skill-card');
            await expect(cards).toHaveCount(6);
        });

        test('skill categories match resume', async ({ page }) => {
            const headings = page.locator('.skill-card h3');
            const texts = await headings.allTextContents();
            expect(texts).toContain('Programming Languages');
            expect(texts).toContain('Frontend Development');
            expect(texts).toContain('Backend Development');
            expect(texts).toContain('Database');
            expect(texts.some(t => t.includes('Testing'))).toBeTruthy();
            expect(texts.some(t => t.includes('Tools'))).toBeTruthy();
        });

        test('resume-specific tech tags are present (Playwright, Selenium, Cucumber BDD)', async ({ page }) => {
            const allTags = page.locator('.skill-card .tag');
            const tagTexts = await allTags.allTextContents();
            expect(tagTexts).toContain('Playwright');
            expect(tagTexts).toContain('Selenium');
            expect(tagTexts).toContain('Cucumber BDD');
            expect(tagTexts).toContain('FastAPI');
            expect(tagTexts).toContain('React');
        });
    });

    // ==================== Projects ====================
    test.describe('Projects Section', () => {
        test('projects section is visible', async ({ page }) => {
            const projects = page.locator('#projects');
            await expect(projects).toBeAttached();
            await expect(projects.locator('h2')).toContainText('Selected Works');
        });

        test('4 project feature articles are rendered', async ({ page }) => {
            const articles = page.locator('.project-feature');
            await expect(articles).toHaveCount(4);
        });

        test('project titles match resume', async ({ page }) => {
            const titles = page.locator('.project-title');
            const texts = await titles.allTextContents();
            expect(texts.some(t => t.includes('Portfolio'))).toBeTruthy();
            expect(texts.some(t => t.includes('Employee Management'))).toBeTruthy();
            expect(texts.some(t => t.includes('Indoor Positioning'))).toBeTruthy();
            expect(texts.some(t => t.includes('E-Commerce'))).toBeTruthy();
        });

        test('project images have lazy loading attribute', async ({ page }) => {
            const lazyImgs = page.locator('.project-visual img[loading="lazy"]');
            await expect(lazyImgs).toHaveCount(3);
        });
    });

    // ==================== Footer ====================
    test.describe('Footer', () => {
        test('footer is visible with correct year', async ({ page }) => {
            const footer = page.locator('footer.footer');
            await expect(footer).toBeAttached();
            await expect(footer).toContainText('2025');
            await expect(footer).toContainText('Aravindhan S');
        });

        test('social links are present', async ({ page }) => {
            const github = page.locator('.footer-socials a[href*="github"]');
            const linkedin = page.locator('.footer-socials a[href*="linkedin"]');
            await expect(github).toBeAttached();
            await expect(linkedin).toBeAttached();
            await expect(github).toHaveAttribute('target', '_blank');
        });
    });
});
