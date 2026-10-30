'use client'

import { Link } from '@/shared/ui/kit'

import { requestTitleFocus } from './titleFocus'

import type { ComponentProps } from 'react'

type TitleFocusLinkProps = ComponentProps<typeof Link>

/** Lien qui ramène le focus sur le titre de la liste une fois la navigation faite. */
export const TitleFocusLink = ({ onClick, ...props }: TitleFocusLinkProps) => (
  <Link
    onClick={(event) => {
      requestTitleFocus()
      onClick?.(event)
    }}
    {...props}
  />
)
