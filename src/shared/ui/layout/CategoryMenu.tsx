'use client'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import MuiLink from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import { usePathname } from 'next/navigation'
import { useId } from 'react'

import { CATALOG_NAVIGATION } from '@/shared/config'
import { useCategoryMenu } from '@/shared/ui/hooks/useCategoryMenu'
import { useHydrated } from '@/shared/ui/hooks/useHydrated'
import { Icon, Link } from '@/shared/ui/kit'

import { NavLink } from './NavLink'

import type { NavigationNode } from '@/shared/config'

interface CategoryMenuProps {
  label: string
  nodes: NavigationNode[]
}

const COLUMN_WIDTH = 240

const buildColumns = (nodes: NavigationNode[], openPath: string[]) => {
  const columns = [nodes]
  openPath.forEach((id, level) => {
    const children = columns[level]?.find((node) => node.id === id)?.children
    if (children) columns.push(children)
  })
  return columns
}

export const CategoryMenu = ({ label, nodes }: CategoryMenuProps) => {
  const isHydrated = useHydrated()
  const isActive = usePathname().startsWith(CATALOG_NAVIGATION.href)
  const panelId = useId()
  const { isOpen, openPath, buttonRef, panelRef, close, toggle, openBranch, onKeyDown } =
    useCategoryMenu()

  if (!isHydrated) return <NavLink href={CATALOG_NAVIGATION.href} label={label} />

  return (
    <ClickAwayListener onClickAway={close}>
      <Box onKeyDown={onKeyDown} sx={{ position: 'relative' }}>
        <Button
          ref={buttonRef}
          color="inherit"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={toggle}
          endIcon={<Icon name="chevron-down" />}
          data-testid="layout-category-menu-toggle"
          sx={{ fontWeight: isActive ? 700 : 400, textDecoration: isActive ? 'underline' : 'none' }}
        >
          {label}
        </Button>
        <Paper
          ref={panelRef}
          id={panelId}
          hidden={!isOpen}
          elevation={8}
          data-testid="layout-category-menu"
          sx={{
            position: 'absolute',
            insetBlockStart: '100%',
            insetInlineStart: 0,
            zIndex: 'modal',
            mt: 0.5,
            p: 2,
            width: 'max-content',
            maxWidth: 'calc(100vw - 32px)',
            overflowX: 'auto',
          }}
        >
          <MuiLink
            component={Link}
            href={CATALOG_NAVIGATION.href}
            onClick={close}
            data-testid="layout-category-link"
            sx={{ display: 'inline-flex', alignItems: 'center', minHeight: 44, fontWeight: 600 }}
          >
            Tout le catalogue
          </MuiLink>
          <Box sx={{ display: 'flex', gap: 2 }}>
            {buildColumns(nodes, openPath).map((column, level) => (
              <Box
                component="ul"
                key={level}
                sx={{ listStyle: 'none', m: 0, p: 0, width: COLUMN_WIDTH, flexShrink: 0 }}
              >
                {column.map((node) => {
                  const hasChildren = node.children.length > 0
                  return (
                    <li key={node.id}>
                      <MuiLink
                        component={Link}
                        href={node.href}
                        data-level={level}
                        aria-expanded={hasChildren ? openPath[level] === node.id : undefined}
                        onMouseEnter={() => openBranch(level, node.id, hasChildren)}
                        onFocus={() => openBranch(level, node.id, hasChildren)}
                        onClick={close}
                        data-testid="layout-category-link"
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          minHeight: 44,
                          px: 1,
                          borderRadius: 1,
                          color: 'text.primary',
                          '&[aria-expanded="true"]': { bgcolor: 'action.selected' },
                        }}
                      >
                        {node.label}
                        {hasChildren && <Icon name="chevron-right" size={16} />}
                      </MuiLink>
                    </li>
                  )
                })}
              </Box>
            ))}
          </Box>
        </Paper>
      </Box>
    </ClickAwayListener>
  )
}
