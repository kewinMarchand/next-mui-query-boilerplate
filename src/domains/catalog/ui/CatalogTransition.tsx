'use client'

import { createContext, useContext, useTransition } from 'react'

import { ProductResults } from './ProductResults'

import type { Catalog } from '../common/models/catalog'
import type { ReactNode, TransitionStartFunction } from 'react'

interface CatalogTransitionValue {
  isPending: boolean
  startTransition: TransitionStartFunction
}

const CatalogTransitionContext = createContext<CatalogTransitionValue | null>(null)

export const CatalogTransitionProvider = ({ children }: { children: ReactNode }) => {
  const [isPending, startTransition] = useTransition()

  return (
    <CatalogTransitionContext.Provider value={{ isPending, startTransition }}>
      {children}
    </CatalogTransitionContext.Provider>
  )
}

export const useCatalogTransition = () => {
  const value = useContext(CatalogTransitionContext)
  if (!value)
    throw new Error('useCatalogTransition doit être utilisé dans CatalogTransitionProvider')
  return value
}

interface PendingResultsProps {
  view: Catalog.View
  children: ReactNode
}

/** Affiche les squelettes pendant qu'un filtre ou un tri recharge la liste. */
export const PendingResults = ({ view, children }: PendingResultsProps) =>
  useCatalogTransition().isPending ? (
    <ProductResults status="pending" products={undefined} view={view} />
  ) : (
    children
  )
