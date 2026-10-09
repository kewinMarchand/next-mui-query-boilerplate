import { expect, test } from '@playwright/test'

const TECHNICAL_TEXT = /\b(error|stack|undefined|exception)\b/i

for (const route of ['/route-inexistante', '/catalogue/categorie-inconnue']) {
  test(`${route} répond 404 avec la page introuvable`, async ({ page }) => {
    const response = await page.goto(route)

    expect(response?.status()).toBe(404)
    await expect(page.getByRole('heading', { level: 1, name: 'Page introuvable' })).toBeVisible()
    await expect(page.getByTestId('errors-home-link')).toHaveAttribute('href', '/')
    expect(await page.locator('meta[name="robots"]').first().getAttribute('content')).toContain(
      'noindex',
    )
  })
}

test('la route de test répond 500 sans texte technique', async ({ page }) => {
  const response = await page.goto('/_erreur-test')

  expect(response?.status()).toBe(500)
  await expect(
    page.getByRole('heading', { level: 1, name: 'Une erreur est survenue' }),
  ).toBeVisible()
  await expect(page.getByTestId('errors-retry')).toBeVisible()
  expect(await page.locator('main').innerText()).not.toMatch(TECHNICAL_TEXT)
})

test('la charte graphique est introuvable en production', async ({ page }) => {
  const response = await page.goto('/charte-graphique')

  expect(response?.status()).toBe(404)
})
