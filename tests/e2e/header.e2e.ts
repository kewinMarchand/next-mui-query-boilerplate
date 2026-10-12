import { expect, test } from '@playwright/test'

import { useMode } from './helpers'
import { MODES } from './routes'

import type { Locator } from '@playwright/test'

const box = async (locator: Locator) => {
  const value = await locator.boundingBox()
  if (!value) throw new Error('Élément sans boîte')
  return value
}

const centerY = ({ y, height }: { y: number; height: number }) => y + height / 2

test.describe('Header mobile compact', () => {
  test.skip(({ isMobile }) => !isMobile, 'Header compact réservé aux écrans étroits')

  for (const mode of MODES) {
    test(`tient sur une ligne avec deux boutons icône de 44 px (mode ${mode})`, async ({
      page,
    }) => {
      await useMode(page, mode)
      await page.goto('/')

      const logo = page.getByTestId('layout-logo')
      const menu = page.getByTestId('layout-mobile-menu-toggle')
      const a11y = page.getByTestId('a11y-mode-toggle')

      await expect(menu).toHaveAccessibleName('Menu')
      await expect(a11y).toHaveAccessibleName('Accessibilité renforcée')
      await expect(menu).toHaveAttribute('aria-expanded', 'false')
      await expect(a11y).toHaveAttribute('aria-pressed', mode === 'enhanced' ? 'true' : 'false')

      const [logoBox, menuBox, a11yBox] = await Promise.all([box(logo), box(menu), box(a11y)])
      for (const button of [menuBox, a11yBox]) {
        expect(button.width).toBeGreaterThanOrEqual(44)
        expect(button.height).toBeGreaterThanOrEqual(44)
        expect(Math.abs(centerY(button) - centerY(logoBox))).toBeLessThan(logoBox.height / 2)
      }
      expect(menuBox.x).toBeGreaterThan(logoBox.x + logoBox.width - 1)
      expect(a11yBox.x).toBeGreaterThan(menuBox.x + menuBox.width - 1)
    })
  }

  test('le bouton Menu ouvre la navigation et déclare son état', async ({ page }) => {
    await page.goto('/')
    const menu = page.getByTestId('layout-mobile-menu-toggle')

    await menu.click()

    await expect(menu).toHaveAttribute('aria-expanded', 'true')
    await expect(page.getByTestId('layout-mobile-menu')).toBeVisible()
  })
})
