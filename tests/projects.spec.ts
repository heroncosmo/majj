import { test, expect } from '@playwright/test';

const hasSupabaseCreds = !!process.env.VITE_SUPABASE_URL && !!process.env.VITE_SUPABASE_ANON_KEY;

test.skip(!hasSupabaseCreds, 'Supabase credentials not configured');

test('upload images and see them in gallery', async ({ page }) => {
  // This test assumes the user is already logged in from previous test or will create one quickly.
  const email = `pro-${Date.now()}@majik.test`;
  const password = 'Majik!12345';

  // Register (autoconfirm is enabled)
  await page.goto('/register');
  await page.getByLabel(/Nom|Pr\u00e9nom|Full Name|Nom Complet/i).fill('Uploader Majik');
  await page.getByLabel(/Email/i).fill(email);
  await page.getByLabel(/T\u00e9l\u00e9phone|Phone/i).fill('+33123456789');
  await page.getByLabel(/Mot de passe|Password/i).fill(password);
  await page.getByRole('button', { name: /Register|S'inscrire|Cr\u00e9er/i }).click();
  await page.waitForTimeout(1000);

  await page.goto('/dashboard');
  await expect(page.getByText(/Nouveau Projet|Ajouter/i)).toBeVisible();

  // Open add project UI if needed
  // Fill fields
  await page.getByLabel(/Titre|Title/i).fill('Projet Test Majik');
  await page.getByLabel(/Type de Service|Service Type/i).selectOption({ index: 1 });
  await page.getByLabel(/Description/i).fill('Description test projet upload.');

  // Upload 2 images (use placeholders from public)
  const file1 = 'public/placeholder.svg';
  const file2 = 'public/placeholder.svg';
  const fileInput = page.locator('input[type="file"]');
  await fileInput.setInputFiles([file1, file2]);

  await page.getByRole('button', { name: /Ajouter le Projet|Add/i }).click();

  // Expect success toast and project listed
  await expect(page.getByText(/succ\u00e8s|success/i)).toBeVisible({ timeout: 10000 });
  await expect(page.getByText(/Projet Test Majik/i)).toBeVisible({ timeout: 10000 });
});

