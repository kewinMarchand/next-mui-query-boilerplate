import { expect, test } from '@playwright/test'

import { useMode } from './helpers'
import { MODES, ROUTES } from './routes'

const WIDTHS = [375, 768, 1280] as const

for (const mode of MODES) {
  for (const route of ROUTES) {
    test(`la page ${route} en mode ${mode} ne déborde pas horizontalement`, async ({
      page,
    }, testInfo) => {
      test.skip(testInfo.project.name === 'mobile', 'Les trois largeurs sont couvertes en desktop')
      await useMode(page, mode)

      for (const width of WIDTHS) {
        await page.setViewportSize({ width, height: 900 })
        await page.goto(route)
        await expect(page.getByRole('heading', { level: 1 })).toBeVisible()

        const { scrollWidth, innerWidth } = await page.evaluate(() => ({
          scrollWidth: document.documentElement.scrollWidth,
          innerWidth: window.innerWidth,
        }))
        expect(scrollWidth, `${width}px`).toBeLessThanOrEqual(innerWidth)

        if (route === '/' || route === '/catalogue') {
          await page.screenshot({
            path: testInfo.outputPath(
              `${route === '/' ? 'accueil' : 'catalogue'}-${mode}-${width}.png`,
            ),
            fullPage: true,
          })
        }
      }
    })
  }
}
