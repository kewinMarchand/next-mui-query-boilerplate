import { expect, test } from '@playwright/test'

import type { Page } from '@playwright/test'

interface BreadcrumbJsonLd {
  '@type': string
  itemListElement: { position: number; name: string; item: string }[]
}

const readBreadcrumbJsonLd = async (page: Page) => {
  const scripts = await page.locator('script[type="application/ld+json"]').allTextContents()
  return scripts
    .map((text): BreadcrumbJsonLd => JSON.parse(text))
    .find((data) => data['@type'] === 'BreadcrumbList')
}

test.describe("Fil d'Ariane", () => {
  test('est présent sur une page interne, dernier élément en aria-current', async ({ page }) => {
    await page.goto('/catalogue/plantes-interieur/feuillages')

    const breadcrumb = page.getByTestId('layout-breadcrumb')
    await expect(breadcrumb.getByRole('listitem')).toHaveText([
      'Accueil',
      'Catalogue',
      'Plantes d’intérieur',
      'Feuillages',
    ])
    await expect(breadcrumb.getByRole('listitem').last()).toHaveAttribute('aria-current', 'page')
    await expect(breadcrumb.getByRole('listitem').last().getByRole('link')).toHaveCount(0)

    const jsonLd = await readBreadcrumbJsonLd(page)
    expect(jsonLd?.itemListElement).toHaveLength(4)
    expect(jsonLd?.itemListElement[3]).toMatchObject({ position: 4, name: 'Feuillages' })
    expect(jsonLd?.itemListElement[3]?.item).toMatch(
      /^https?:\/\/.+\/catalogue\/plantes-interieur\/feuillages$/,
    )
  })

  test("est absent de l'accueil", async ({ page }) => {
    await page.goto('/')

    await expect(page.getByTestId('layout-breadcrumb')).toHaveCount(0)
    expect(await readBreadcrumbJsonLd(page)).toBeUndefined()
  })

  test('mène à la 404 depuis l’accueil', async ({ page }) => {
    await page.goto('/route-inexistante')

    await expect(page.getByTestId('layout-breadcrumb').getByRole('listitem')).toHaveText([
      'Accueil',
      'Page introuvable',
    ])
  })
})
