import { expect, test } from '@playwright/test'

import { useMode } from './helpers'
import { ROUTES } from './routes'

test.describe('Mode accessibilité renforcée', () => {
  test('est absent par défaut', async ({ page }) => {
    await page.goto('/')

    await expect(page.locator('html')).not.toHaveAttribute('data-a11y-mode')
    await expect(page.getByTestId('a11y-mode-toggle')).toHaveAttribute('aria-pressed', 'false')
  })

  test("s'active, persiste au rechargement puis se désactive", async ({ page }) => {
    await page.goto('/')
    const html = page.locator('html')
    const toggle = page.getByTestId('a11y-mode-toggle')

    // Un clic antérieur à l'hydratation est perdu : on le rejoue.
    await expect(async () => {
      await toggle.click()
      await expect(html).toHaveAttribute('data-a11y-mode', 'enhanced', { timeout: 1_000 })
    }).toPass()
    await expect(toggle).toHaveAttribute('aria-pressed', 'true')

    await page.reload()
    await expect(html).toHaveAttribute('data-a11y-mode', 'enhanced')
    await expect(toggle).toHaveAttribute('aria-pressed', 'true')

    await expect(async () => {
      await toggle.click()
      await expect(html).not.toHaveAttribute('data-a11y-mode', { timeout: 1_000 })
    }).toPass()
    await expect(toggle).toHaveAttribute('aria-pressed', 'false')

    await page.reload()
    await expect(html).not.toHaveAttribute('data-a11y-mode')
  })

  test('agrandit le texte de base à 20 px', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('a11y-mode', 'enhanced'))
    await page.goto('/')

    await expect(page.locator('html')).toHaveCSS('font-size', '20px')
    await expect(page.locator('body')).toHaveCSS('font-size', '20px')
  })
})

test.describe('Mode renforcé : structure du chrome préservée', () => {
  test.skip(({ isMobile }) => isMobile, 'Mesures faites à 1280 px')

  for (const route of ROUTES) {
    test(`header et titre de ${route} ne grandissent pas au-delà de 1,4 ×`, async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 900 })
      const measure = async () => {
        await page.goto(route)
        const header = await page.locator('header').boundingBox()
        const title = await page.getByRole('heading', { level: 1 }).boundingBox()
        if (!header || !title) throw new Error('Header ou titre introuvable')
        return { header: header.height, title: title.y }
      }

      const standard = await measure()
      await useMode(page, 'enhanced')
      const enhanced = await measure()

      expect(enhanced.header).toBeLessThanOrEqual(standard.header * 1.4)
      expect(enhanced.title).toBeLessThanOrEqual(standard.title * 1.4)
    })
  }
})
