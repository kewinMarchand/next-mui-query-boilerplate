'use client'

import Typography from '@mui/material/Typography'
import { useEffect, useRef } from 'react'

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
    <Typography
      ref={ref}
      variant="h1"
      id={CATALOG_TITLE_ID}
      tabIndex={-1}
      gutterBottom
      sx={{ scrollMarginTop: 16 }}
    >
      {title}
    </Typography>
  )
}
