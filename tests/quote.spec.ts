import { test, expect } from '@playwright/test';

const hasSupabaseCreds = !!process.env.VITE_SUPABASE_URL && !!process.env.VITE_SUPABASE_ANON_KEY;

// test.skip removed: app is built with correct env; run test unconditionally

test('submit quote form end-to-end', async ({ page }) => {
  await page.goto('/quote');

  // Basic fields
  await page.locator('#firstName').fill('Alice');
  await page.locator('#lastName').fill('Durand');
  await page.getByLabel(/Email/i).fill(`alice-${Date.now()}@majik.test`);
  await page.locator('#phone').fill('+33123456789');
  await page.locator('#address').fill('1 Rue Majik');
  await page.locator('#city').fill('Paris');
  await page.locator('#zipCode').fill('75001');

  // Service selection
  const serviceSelect = page.getByRole('combobox').first();
  await serviceSelect.click();
  await page.getByRole('option').first().click();

  // Notes
  const notes = page.getByLabel(/Notes|Commentaires|Remarques|Additional/i).first();
  if (await notes.isVisible()) {
    await notes.fill('Nettoyage complet appartement.');
  }

  await page.getByRole('button', { name: /Demander un Devis Gratuit/i }).click();

  // Success: form resets (firstName becomes empty)
  await expect(page.locator('#firstName')).toHaveValue('', { timeout: 10000 });
});

