import { test, expect } from '@playwright/test';

const hasSupabaseCreds = !!process.env.VITE_SUPABASE_URL && !!process.env.VITE_SUPABASE_ANON_KEY;

test.skip(!hasSupabaseCreds, 'Supabase credentials not configured');

test('submit quote form end-to-end', async ({ page }) => {
  await page.goto('/quote');

  // Basic fields
  await page.getByLabel(/Pr\u00e9nom|First Name/i).fill('Alice');
  await page.getByLabel(/Nom|Last Name/i).fill('Durand');
  await page.getByLabel(/Email/i).fill(`alice-${Date.now()}@majik.test`);
  await page.getByLabel(/T\u00e9l\u00e9phone|Phone/i).fill('+33123456789');
  await page.getByLabel(/Adresse|Address/i).fill('1 Rue Majik');
  await page.getByLabel(/Ville|City/i).fill('Paris');
  await page.getByLabel(/Code Postal|Zip/i).fill('75001');

  // Service selection
  const serviceSelect = page.getByRole('combobox').first();
  await serviceSelect.click();
  await page.getByRole('option').first().click();

  // Notes
  const notes = page.getByLabel(/Notes|Commentaires|Remarques|Additional/i).first();
  if (await notes.isVisible()) {
    await notes.fill('Nettoyage complet appartement.');
  }

  await page.getByRole('button', { name: /Envoyer|Soumettre|Submit/i }).click();

  // Toast success
  await expect(page.getByText(/Demande de Devis Soumise/i)).toBeVisible({ timeout: 10000 });
});

