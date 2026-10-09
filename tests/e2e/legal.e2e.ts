import { expect, test } from '@playwright/test'

const LEGAL_LINKS = [
  'Mentions légales',
  'Données personnelles',
  'Accessibilité : non conforme',
  'Plan du site',
]

test.describe('Pages légales', () => {
  test('le footer mène aux quatre pages légales', async ({ page }) => {
    await page.goto('/')

    const nav = page.getByRole('navigation', { name: 'Liens légaux' })
    for (const name of LEGAL_LINKS) {
      await expect(nav.getByRole('link', { name })).toBeVisible()
    }
    await expect(
      page.getByRole('contentinfo').getByRole('link', { name: /Charte graphique/ }),
    ).toHaveCount(0)
  })

  test("les mentions légales affichent l'éditeur de la configuration", async ({ page }) => {
    await page.goto('/mentions-legales')

    await expect(page.getByText(/Exemple SAS/).first()).toBeVisible()
  })

  test('la déclaration est non conforme tant qu’aucun audit n’est renseigné', async ({ page }) => {
    await page.goto('/accessibilite')

    await expect(page.getByRole('heading', { level: 1 })).toHaveText("Déclaration d'accessibilité")
    await expect(page.getByTestId('legal-compliance-status')).toContainText('non conforme')
    await expect(page.getByText("Aucun audit n'a encore été réalisé.")).toBeVisible()
    await expect(page.getByTestId('layout-breadcrumb').getByRole('listitem').last()).toHaveText(
      'Déclaration d’accessibilité',
    )
  })

  test('le plan du site liste les pages et toutes les catégories', async ({ page }) => {
    await page.goto('/plan-du-site')

    const sitemap = page.getByTestId('legal-sitemap')
    await expect(sitemap.getByRole('link')).toHaveCount(22)
    await expect(sitemap.getByRole('link', { name: 'Accueil' })).toHaveAttribute('href', '/')
    await expect(sitemap.getByRole('link', { name: 'Nénuphars' })).toHaveAttribute(
      'href',
      '/catalogue/plantes-aquatiques/nenuphars',
    )
  })
})
