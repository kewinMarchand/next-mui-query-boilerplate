import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'

import { CATALOG_NAVIGATION, MAIN_NAVIGATION } from '@/shared/config'

import { A11yModeToggle } from '../a11y-mode/A11yModeToggle'
import { CategoryMenu } from './CategoryMenu'
import { LogoLink } from './LogoLink'
import { MobileMenu } from './MobileMenu'
import { NavLink } from './NavLink'

import type { NavigationNode } from '@/shared/config'

interface HeaderProps {
  categoryMenu: NavigationNode[]
}

export const Header = ({ categoryMenu }: HeaderProps) => (
  <AppBar position="static" component="header">
    <Container>
      <Toolbar disableGutters sx={{ flexWrap: { xs: 'nowrap', lg: 'wrap' }, columnGap: 1, py: 1 }}>
        <LogoLink />
        <Box sx={{ display: { xs: 'block', lg: 'none' } }}>
          <MobileMenu navigation={MAIN_NAVIGATION} categoryMenu={categoryMenu} />
        </Box>
        <Box
          component="nav"
          aria-label="Navigation principale"
          sx={{ display: { xs: 'none', lg: 'block' } }}
        >
          <Box
            component="ul"
            sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, listStyle: 'none', m: 0, p: 0 }}
          >
            {MAIN_NAVIGATION.map((item) => (
              <li key={item.href}>
                {item.href === CATALOG_NAVIGATION.href ? (
                  <CategoryMenu label={item.label} nodes={categoryMenu} />
                ) : (
                  <NavLink {...item} />
                )}
              </li>
            ))}
          </Box>
        </Box>
        <A11yModeToggle />
      </Toolbar>
    </Container>
  </AppBar>
)
