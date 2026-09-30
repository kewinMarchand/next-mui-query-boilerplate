import { expect, test } from '@playwright/test'

test.describe('Tâches', () => {
  test('affiche la liste chargée par TanStack Query', async ({ page }) => {
    await page.goto('/taches')

    await expect(page.getByTestId('tasks-list')).toBeVisible()
    await expect(page.getByTestId('tasks-item')).toHaveCount(3)
  })

  test("n'affiche ni erreur ni liste vide quand les données sont là", async ({ page }) => {
    await page.goto('/taches')

    await expect(page.getByTestId('tasks-list')).toBeVisible()
    await expect(page.getByTestId('tasks-error')).toHaveCount(0)
    await expect(page.getByTestId('tasks-empty')).toHaveCount(0)
  })
})
