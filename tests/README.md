# 🧪 Playwright E2E Tests — Aravindhan S Portfolio

End-to-end tests written in **TypeScript + Playwright**, matching the automation testing skills demonstrated during the L&T internship experience on the resume.

## 📁 Structure

```
tests/
├── e2e/
│   ├── navigation.spec.ts    # Navbar, dark mode toggle, hamburger menu
│   ├── hero.spec.ts          # Hero content, typewriter, scroll progress, download button
│   ├── sections.spec.ts      # About, Experience, Education, Skills, Projects, Footer
│   ├── modals.spec.ts        # All 4 project modals — open/close, content, body scroll lock
│   └── contact.spec.ts       # Contact form — field validation, mocked API (success/error/network)
├── playwright.config.ts      # Config: Chromium, Firefox, WebKit, Mobile Chrome
├── package.json
└── README.md
```

## 🚀 Quick Start

### 1. Install dependencies

```bash
cd tests
npm install
```

### 2. Install browsers

```bash
npx playwright install --with-deps chromium
# For all browsers:
npx playwright install --with-deps
```

### 3. Run all tests (headless — auto-starts a static server)

```bash
npm test
```

### 4. Run with visible browser

```bash
npm run test:headed
```

### 5. Open interactive Playwright UI

```bash
npm run test:ui
```

### 6. View HTML report after tests run

```bash
npm run test:report
```

## 📊 Coverage Summary

| File | Tests | What's Covered |
|---|---|---|
| `navigation.spec.ts` | 8 | Navbar links, dark mode toggle, localStorage, hamburger menu |
| `hero.spec.ts` | 11 | Hero text, typewriter cycling, CTA buttons, resume download, scroll progress |
| `sections.spec.ts` | 20 | About, Experience (L&T dates), Education (3 cards), Skills (6 cards), Projects (4), Footer |
| `modals.spec.ts` | 11 | All 4 modals open/close, content verification, body scroll lock |
| `contact.spec.ts` | 11 | Form fields, required attrs, mocked success/error/network-failure API responses |

**Total: ~61 tests** across Chromium, Firefox, WebKit, Mobile Chrome

## ⚙️ Tech Stack

| Tool | Purpose |
|---|---|
| **Playwright** | Browser automation framework |
| **TypeScript** | Type-safe test authoring |
| **page.route()** | API mocking (no backend required) |
| **IntersectionObserver / viewport** | Scroll behavior assertions |
| **HTML Reporter** | Test result visualization |

> Tests are designed to run against the **static frontend** (no Spring Boot backend needed).  
> The contact form submission tests mock the `/api/contact` endpoint using `page.route()`.
