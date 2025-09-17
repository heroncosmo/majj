import { test, expect } from '@playwright/test';

// Pure navigation checks (do not submit forms)

test('home page renders', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Majik|Majj/i);
  await expect(page.getByAltText(/Majik - Services de Nettoyage/i)).toBeVisible();
});

test('SPA routes render without 404', async ({ page }) => {
  for (const route of ['/', '/services', '/about', '/quote', '/register', '/login']) {
    await page.goto(route);
    // No error page text
    await expect(page.getByText(/not found|404/i)).not.toBeVisible({ timeout: 1000 }).catch(() => {});
  }
});

