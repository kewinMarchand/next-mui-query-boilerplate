import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

import { useMode } from '../e2e/helpers'
import { MODES } from '../e2e/routes'

const SECTIONS = [
  'Couleurs',
  'Typographie',
  'Espacements et rayons',
  'Boutons',
  'Formulaires',
  'Retours',
  'Navigation',
  'Médias et cartes',
  'Icônes',
  'Logo',
]

test('la charte graphique répond 200 et présente ses dix sections', async ({ page }) => {
  const response = await page.goto('/charte-graphique')

  expect(response?.status()).toBe(200)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Charte graphique')
  for (const name of SECTIONS) {
    await expect(page.getByRole('heading', { level: 2, name, exact: true })).toBeVisible()
  }
  await expect(
    page.getByText(/Contraste sur fond : \d+\.\d+:1, (AAA|AA|insuffisant)/).first(),
  ).toBeVisible()
  expect(await page.locator('meta[name="robots"]').first().getAttribute('content')).toContain(
    'noindex',
  )
})

for (const mode of MODES) {
  test(`la charte graphique en mode ${mode} ne présente aucune violation axe`, async ({ page }) => {
    await useMode(page, mode)
    await page.goto('/charte-graphique')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()
    expect(results.violations).toEqual([])
  })
}
