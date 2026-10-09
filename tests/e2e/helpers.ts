import { expect } from '@playwright/test'

import type { Mode } from './routes'
import type { Page } from '@playwright/test'

export const useMode = async (page: Page, mode: Mode) => {
  if (mode === 'enhanced') {
    await page.addInitScript(() => localStorage.setItem('a11y-mode', 'enhanced'))
  }
}

/** Le bouton « Filtrer » n'existe qu'une fois le catalogue hydraté (masqué en CSS sur ordinateur). */
export const waitForHydration = (page: Page) =>
  expect(page.getByTestId('catalog-filters-open')).toBeAttached()
