import { test, expect } from '@playwright/test';

// Will be skipped if ANON KEY is missing or invalid (prevents false negatives)
const hasSupabaseCreds = !!process.env.VITE_SUPABASE_URL && !!process.env.VITE_SUPABASE_ANON_KEY;

test.skip(!hasSupabaseCreds, 'Supabase credentials not configured');

test('register + login flow (happy path)', async ({ page }) => {
  const email = `pro-${Date.now()}@majik.test`;
  const password = 'Majik!12345';

  await page.goto('/register');
  await page.getByLabel(/Nom|Prénom|Full Name|Nom Complet/i).fill('Pro Majik');
  await page.getByLabel(/Email/i).fill(email);
  await page.getByLabel(/Téléphone|Phone/i).fill('+33123456789');
  await page.getByLabel(/Mot de passe|Password/i).fill(password);
  await page.getByRole('button', { name: /Register|S'inscrire|Créer/i }).click();

  // Expect redirected or dashboard visible
  await page.waitForURL(/dashboard|login|register/i, { timeout: 10000 });

  // Go to login if needed
  if (!page.url().includes('dashboard')) {
    await page.goto('/login');
    await page.getByLabel(/Email/i).fill(email);
    await page.getByLabel(/Mot de passe|Password/i).fill(password);
    await page.getByRole('button', { name: /Connexion|Login|Se connecter/i }).click();
  }

  await page.waitForURL(/dashboard/i, { timeout: 10000 });
  await expect(page.getByText(/Tableau de bord|Dashboard|Mes Projets/i)).toBeVisible();
});

