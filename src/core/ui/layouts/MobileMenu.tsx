'use client'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MuiLink from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import dynamic from 'next/dynamic'
import { useId } from 'react'

import { CATALOG_PATH, categoryHref } from '@/core/config'
import { useHydrated } from '@/core/ui/hooks/useHydrated'
import { useMobileMenu } from '@/core/ui/hooks/useMobileMenu'
import { Icon, Link } from '@/core/ui/ui-kit'

import type { CategoryNode, NavigationItem } from '@/core/config'

// Le panneau n'est utile qu'au clic : son code (Modal, piège de focus) quitte le chargement initial.
const Drawer = dynamic(() => import('@mui/material/Drawer'), { ssr: false })

interface MobileMenuProps {
  navigation: NavigationItem[]
  tree: CategoryNode[]
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

const findLevel = (tree: CategoryNode[], levels: string[]) => {
  let nodes = tree
  const trail: CategoryNode[] = []
  for (const slug of levels) {
    const node = nodes.find((item) => item.slug === slug)
    if (!node) break
    trail.push(node)
    nodes = node.children ?? []
  }
  return { nodes, trail }
}

export const MobileMenu = ({ navigation, tree }: MobileMenuProps) => {
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

  const { nodes, trail } = findLevel(tree, levels ?? [])
  const current = trail.at(-1)
  const title = levels === null ? 'Menu' : (current?.name ?? 'Catalogue')
  const parentName = levels?.length ? (trail.at(-2)?.name ?? 'Catalogue') : 'Menu'

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
                  {item.href === CATALOG_PATH ? (
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
                    href={categoryHref(levels)}
                    onClick={close}
                    sx={{ ...ROW_SX, fontWeight: 600 }}
                  >
                    Voir toute la catégorie
                  </MuiLink>
                </li>
                {nodes.map((node) => (
                  <li key={node.slug}>
                    {node.children?.length ? (
                      <Box
                        component="button"
                        type="button"
                        onClick={() => descend(node.slug)}
                        data-testid={`layout-mobile-menu-descend-${node.slug}`}
                        sx={{
                          ...ROW_SX,
                          border: 0,
                          bgcolor: 'transparent',
                          font: 'inherit',
                          cursor: 'pointer',
                        }}
                      >
                        {node.name}
                        <Icon name="chevron-right" />
                      </Box>
                    ) : (
                      <MuiLink
                        component={Link}
                        href={categoryHref([...levels, node.slug])}
                        onClick={close}
                        data-testid="layout-category-link"
                        sx={ROW_SX}
                      >
                        {node.name}
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
