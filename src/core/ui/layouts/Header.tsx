import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

import { MAIN_NAVIGATION, SITE } from '@/core/config'

import { NavLink } from './NavLink'

export const Header = () => (
  <AppBar position="static" component="header">
    <Container maxWidth="lg">
      <Toolbar disableGutters sx={{ flexWrap: 'wrap', gap: 1 }}>
        <Typography component="p" variant="h6" sx={{ flexGrow: 1 }}>
          {SITE.name}
        </Typography>
        <Box component="nav" aria-label="Navigation principale" sx={{ display: 'flex', gap: 1 }}>
          {MAIN_NAVIGATION.map((item) => (
            <NavLink key={item.href} {...item} />
          ))}
        </Box>
      </Toolbar>
    </Container>
  </AppBar>
)
