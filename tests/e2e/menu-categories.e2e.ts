import { expect, test } from '@playwright/test'

import { useMode } from './helpers'
import { MODES } from './routes'

test.describe('Menu de catégories, ordinateur', () => {
  test.skip(({ isMobile }) => isMobile, 'Menu en cascade réservé aux grands écrans')

  test('s’ouvre au clic et déplie une colonne au survol puis au focus', async ({ page }) => {
    await page.goto('/')
    const toggle = page.getByTestId('layout-category-menu-toggle')
    const menu = page.getByTestId('layout-category-menu')

    await toggle.click()
    await expect(toggle).toHaveAttribute('aria-expanded', 'true')
    await expect(menu).toBeVisible()

    const indoor = menu.getByRole('link', { name: 'Plantes d’intérieur' })
    await indoor.hover()
    await expect(indoor).toHaveAttribute('aria-expanded', 'true')
    await expect(menu.getByRole('link', { name: 'Feuillages' })).toBeVisible()

    await menu.getByRole('link', { name: 'Plantes aquatiques' }).focus()
    await expect(menu.getByRole('link', { name: 'Feuillages' })).toHaveCount(0)
    await expect(menu.getByRole('link', { name: 'Nénuphars' })).toBeVisible()
  })

  test('Échap ferme le panneau et rend le focus au bouton', async ({ page }) => {
    await page.goto('/')
    const toggle = page.getByTestId('layout-category-menu-toggle')

    await toggle.click()
    await page.getByTestId('layout-category-menu').getByRole('link').first().focus()
    await page.keyboard.press('Escape')

    await expect(page.getByTestId('layout-category-menu')).toBeHidden()
    await expect(toggle).toBeFocused()
  })

  test('une feuille navigue et met à jour le fil d’Ariane', async ({ page }) => {
    await page.goto('/')
    await page.getByTestId('layout-category-menu-toggle').click()
    const menu = page.getByTestId('layout-category-menu')

    await menu.getByRole('link', { name: 'Plantes d’intérieur' }).hover()
    await menu.getByRole('link', { name: 'Feuillages' }).hover()
    await menu.getByRole('link', { name: 'Monstera' }).click()

    await expect(page).toHaveURL(/\/catalogue\/plantes-interieur\/feuillages\/monstera$/)
    await expect(page.getByTestId('layout-breadcrumb').getByRole('listitem').last()).toHaveText(
      'Monstera',
    )
    await expect(menu).toBeHidden()
  })

  for (const mode of MODES) {
    test(`le panneau est ancré à son bouton sans pousser la page (mode ${mode})`, async ({
      page,
    }) => {
      await useMode(page, mode)
      await page.goto('/catalogue')
      const toggle = page.getByTestId('layout-category-menu-toggle')
      const headerBefore = await page.locator('header').boundingBox()
      const titleBefore = await page.getByRole('heading', { level: 1 }).boundingBox()

      await toggle.click()
      await page
        .getByTestId('layout-category-menu')
        .getByRole('link', { name: 'Plantes d’intérieur' })
        .hover()
      const button = await toggle.boundingBox()
      const panel = await page.getByTestId('layout-category-menu').boundingBox()
      if (!button || !panel || !headerBefore || !titleBefore) throw new Error('Boîtes introuvables')

      expect(Math.abs(panel.y - (button.y + button.height))).toBeLessThan(12)
      const leftAligned = Math.abs(panel.x - button.x) < 12
      const rightAligned = Math.abs(panel.x + panel.width - (button.x + button.width)) < 12
      expect(leftAligned || rightAligned).toBe(true)
      expect((await page.locator('header').boundingBox())?.height).toBe(headerBefore.height)
      expect((await page.getByRole('heading', { level: 1 }).boundingBox())?.y).toBe(titleBefore.y)
    })
  }
})

test.describe('Menu mobile', () => {
  test.skip(({ isMobile }) => !isMobile, 'Menu latéral réservé aux écrans étroits')

  test('descend et remonte les niveaux en déplaçant le focus sur le titre', async ({ page }) => {
    await page.goto('/')
    const toggle = page.getByTestId('layout-mobile-menu-toggle')
    await toggle.click()
    const menu = page.getByTestId('layout-mobile-menu')

    await expect(menu.getByRole('heading', { name: 'Menu' })).toBeFocused()
    await page.getByTestId('layout-mobile-menu-descend-catalogue').click()
    await expect(menu.getByRole('heading', { name: 'Catalogue' })).toBeFocused()

    await page.getByTestId('layout-mobile-menu-descend-plantes-interieur').click()
    await expect(menu.getByRole('heading', { name: 'Plantes d’intérieur' })).toBeFocused()
    await expect(page.getByTestId('layout-mobile-menu-back')).toHaveText('Retour : Catalogue')
    await expect(menu.getByRole('link', { name: 'Voir toute la catégorie' })).toHaveAttribute(
      'href',
      '/catalogue/plantes-interieur',
    )

    await page.getByTestId('layout-mobile-menu-back').click()
    await expect(menu.getByRole('heading', { name: 'Catalogue' })).toBeFocused()

    await page.keyboard.press('Escape')
    await expect(toggle).toBeFocused()
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })

  test('une feuille ferme le menu et navigue', async ({ page }) => {
    await page.goto('/')
    await page.getByTestId('layout-mobile-menu-toggle').click()
    const menu = page.getByTestId('layout-mobile-menu')

    await page.getByTestId('layout-mobile-menu-descend-catalogue').click()
    await page.getByTestId('layout-mobile-menu-descend-plantes-aquatiques').click()
    await menu.getByRole('link', { name: 'Nénuphars' }).click()

    await expect(page).toHaveURL(/\/catalogue\/plantes-aquatiques\/nenuphars$/)
    await expect(menu).toHaveCount(0)
  })
})
