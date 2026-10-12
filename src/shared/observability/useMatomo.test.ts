import { renderHook } from '@testing-library/react'

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}))

import { useMatomo } from './useMatomo'

describe('mesure d’audience sans variable', () => {
  it('n’injecte aucun script et ne crée aucune file de commandes', () => {
    renderHook(() => useMatomo())

    expect(document.querySelectorAll('script')).toHaveLength(0)
    expect(window._paq).toBeUndefined()
  })
})
