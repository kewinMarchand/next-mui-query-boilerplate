'use client'

import MuiLink from '@mui/material/Link'

import { Link } from '@/core/ui/ui-kit'

import { requestTitleFocus } from './titleFocus'

import type { LinkProps } from '@mui/material/Link'

type TitleFocusLinkProps = Omit<LinkProps, 'href'> & { href: string }

/** Lien qui ramène le focus sur le titre de la liste une fois la navigation faite. */
export const TitleFocusLink = ({ onClick, ...props }: TitleFocusLinkProps) => (
  <MuiLink
    component={Link}
    onClick={(event) => {
      requestTitleFocus()
      onClick?.(event)
    }}
    {...props}
  />
)
