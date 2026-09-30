import { expect, test } from '@playwright/test'

import { ROUTES } from './routes'

for (const route of ROUTES) {
  test(`la page ${route} répond 200 sans erreur console`, async ({ page }) => {
    const errors: string[] = []
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text())
    })

    const response = await page.goto(route)

    expect(response?.status()).toBe(200)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    expect(errors).toEqual([])
  })
}

test('une route inconnue affiche la page 404', async ({ page }) => {
  const response = await page.goto('/route-inexistante')

  expect(response?.status()).toBe(404)
  await expect(page.getByRole('heading', { level: 1, name: 'Page introuvable' })).toBeVisible()
})
