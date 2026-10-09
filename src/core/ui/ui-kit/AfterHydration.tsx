'use client'

import { useHydrated } from '@/core/ui/hooks/useHydrated'

import type { ReactNode } from 'react'

interface AfterHydrationProps {
  children: ReactNode
  placeholder: ReactNode
}

/**
 * Rend `children` une fois l'application hydratée, `placeholder` avant.
 * Sert aux images hors de l'écran initial : elles ne disputent plus la bande passante à l'image LCP.
 * Sans JavaScript, `<noscript>` les affiche quand même.
 */
export const AfterHydration = ({ children, placeholder }: AfterHydrationProps) =>
  useHydrated() ? (
    children
  ) : (
    <>
      {placeholder}
      <noscript>{children}</noscript>
    </>
  )
