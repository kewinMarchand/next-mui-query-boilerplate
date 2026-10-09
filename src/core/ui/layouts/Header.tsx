import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'

import { CATALOG_PATH, CATEGORY_TREE, MAIN_NAVIGATION } from '@/core/config'

import { A11yModeToggle } from './A11yModeToggle'
import { CategoryMenu } from './CategoryMenu'
import { LogoLink } from './LogoLink'
import { MobileMenu } from './MobileMenu'
import { NavLink } from './NavLink'

export const Header = () => (
  <AppBar position="static" component="header">
    <Container>
      <Toolbar disableGutters sx={{ flexWrap: 'wrap', columnGap: 1, py: 1 }}>
        <LogoLink />
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          <MobileMenu navigation={MAIN_NAVIGATION} tree={CATEGORY_TREE} />
        </Box>
        <Box
          component="nav"
          aria-label="Navigation principale"
          sx={{ display: { xs: 'none', md: 'block' } }}
        >
          <Box
            component="ul"
            sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, listStyle: 'none', m: 0, p: 0 }}
          >
            {MAIN_NAVIGATION.map((item) => (
              <li key={item.href}>
                {item.href === CATALOG_PATH ? (
                  <CategoryMenu label={item.label} tree={CATEGORY_TREE} />
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
