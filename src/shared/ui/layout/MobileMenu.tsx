'use client'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MuiLink from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import dynamic from 'next/dynamic'
import { useId } from 'react'

import { CATALOG_NAVIGATION } from '@/shared/config'
import { useHydrated } from '@/shared/ui/hooks/useHydrated'
import { useMobileMenu } from '@/shared/ui/hooks/useMobileMenu'
import { Icon, Link } from '@/shared/ui/kit'

import type { NavigationItem, NavigationNode } from '@/shared/config'

// Le panneau n'est utile qu'au clic : son code (Modal, piège de focus) quitte le chargement initial.
const Drawer = dynamic(() => import('@mui/material/Drawer'), { ssr: false })

interface MobileMenuProps {
  navigation: NavigationItem[]
  categoryMenu: NavigationNode[]
}

const ROW_SX = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  minHeight: 48,
  px: 2,
  color: 'text.primary',
  textAlign: 'left',
} as const

const findLevel = (tree: NavigationNode[], levels: string[]) => {
  let nodes = tree
  const trail: NavigationNode[] = []
  for (const id of levels) {
    const node = nodes.find((item) => item.id === id)
    if (!node) break
    trail.push(node)
    nodes = node.children
  }
  return { nodes, trail }
}

export const MobileMenu = ({ navigation, categoryMenu }: MobileMenuProps) => {
  const isHydrated = useHydrated()
  const drawerId = useId()
  const { isOpen, levels, titleRef, open, close, descend, back } = useMobileMenu()

  if (!isHydrated) {
    return (
      <Button
        component={Link}
        href="/plan-du-site"
        color="inherit"
        startIcon={<Icon name="menu" />}
      >
        Menu
      </Button>
    )
  }

  const { nodes, trail } = findLevel(categoryMenu, levels ?? [])
  const current = trail.at(-1)
  const title = levels === null ? 'Menu' : (current?.label ?? CATALOG_NAVIGATION.label)
  const parentName = levels?.length ? (trail.at(-2)?.label ?? CATALOG_NAVIGATION.label) : 'Menu'

  return (
    <>
      <Button
        color="inherit"
        startIcon={<Icon name="menu" />}
        aria-expanded={isOpen}
        aria-controls={drawerId}
        onClick={open}
        data-testid="layout-mobile-menu-toggle"
      >
        Menu
      </Button>
      <Drawer
        open={isOpen}
        onClose={close}
        disableAutoFocus
        slotProps={{
          paper: {
            id: drawerId,
            'aria-labelledby': `${drawerId}-title`,
            role: 'dialog',
            'aria-modal': true,
            sx: { width: 'min(360px, 90vw)' },
          },
        }}
      >
        <Box data-testid="layout-mobile-menu">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1, pl: 2 }}>
            <Typography
              ref={titleRef}
              id={`${drawerId}-title`}
              variant="h6"
              component="h2"
              tabIndex={-1}
              sx={{ flexGrow: 1 }}
            >
              {title}
            </Typography>
            <IconButton aria-label="Fermer le menu" onClick={close} sx={{ width: 48, height: 48 }}>
              <Icon name="x" />
            </IconButton>
          </Box>

          {levels !== null && (
            <Button
              onClick={back}
              startIcon={<Icon name="arrow-left" />}
              data-testid="layout-mobile-menu-back"
              sx={{ justifyContent: 'flex-start', mx: 1 }}
            >
              Retour : {parentName}
            </Button>
          )}

          <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0 }}>
            {levels === null ? (
              navigation.map((item) => (
                <li key={item.href}>
                  {item.href === CATALOG_NAVIGATION.href ? (
                    <Box
                      component="button"
                      type="button"
                      onClick={() => descend()}
                      data-testid="layout-mobile-menu-descend-catalogue"
                      sx={{
                        ...ROW_SX,
                        border: 0,
                        bgcolor: 'transparent',
                        font: 'inherit',
                        cursor: 'pointer',
                      }}
                    >
                      {item.label}
                      <Icon name="chevron-right" />
                    </Box>
                  ) : (
                    <MuiLink component={Link} href={item.href} onClick={close} sx={ROW_SX}>
                      {item.label}
                    </MuiLink>
                  )}
                </li>
              ))
            ) : (
              <>
                <li>
                  <MuiLink
                    component={Link}
                    href={current?.href ?? CATALOG_NAVIGATION.href}
                    onClick={close}
                    sx={{ ...ROW_SX, fontWeight: 600 }}
                  >
                    Voir toute la catégorie
                  </MuiLink>
                </li>
                {nodes.map((node) => (
                  <li key={node.id}>
                    {node.children.length > 0 ? (
                      <Box
                        component="button"
                        type="button"
                        onClick={() => descend(node.id)}
                        data-testid={`layout-mobile-menu-descend-${node.id}`}
                        sx={{
                          ...ROW_SX,
                          border: 0,
                          bgcolor: 'transparent',
                          font: 'inherit',
                          cursor: 'pointer',
                        }}
                      >
                        {node.label}
                        <Icon name="chevron-right" />
                      </Box>
                    ) : (
                      <MuiLink
                        component={Link}
                        href={node.href}
                        onClick={close}
                        data-testid="layout-category-link"
                        sx={ROW_SX}
                      >
                        {node.label}
                      </MuiLink>
                    )}
                  </li>
                ))}
              </>
            )}
          </Box>
        </Box>
      </Drawer>
    </>
  )
}
