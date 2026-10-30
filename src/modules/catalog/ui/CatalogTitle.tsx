'use client'

import { useEffect, useRef } from 'react'

import styles from './CatalogTitle.module.css'
import { consumeTitleFocus } from './titleFocus'

interface CatalogTitleProps {
  title: string
  focusKey: string
}

export const CATALOG_TITLE_ID = 'catalog-title'

export const CatalogTitle = ({ title, focusKey }: CatalogTitleProps) => {
  const ref = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (!consumeTitleFocus()) return
    ref.current?.focus()
    ref.current?.scrollIntoView({ block: 'start' })
  }, [focusKey])

  return (
    <h1
      ref={ref}
      id={CATALOG_TITLE_ID}
      tabIndex={-1}
      className={`bui-text bui-text--h1 ${styles.title}`}
    >
      {title}
    </h1>
  )
}
