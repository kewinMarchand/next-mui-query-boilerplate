import Box from '@mui/material/Box'
import MuiLink from '@mui/material/Link'
import Typography from '@mui/material/Typography'

import { getCategoryMenu } from '@/modules/catalog'
import { CATALOG_NAVIGATION, SITE_MAP } from '@/shared/config'
import { Link } from '@/shared/ui/kit'
import { buildBreadcrumb, PageContainer } from '@/shared/ui/layout'

import type { NavigationNode } from '@/shared/config'

const LINK_SX = { display: 'inline-flex', alignItems: 'center', minHeight: 44 } as const

const CategoryList = ({ nodes }: { nodes: NavigationNode[] }) => (
  <ul>
    {nodes.map((node) => (
      <li key={node.id}>
        <MuiLink component={Link} href={node.href} sx={LINK_SX}>
          {node.label}
        </MuiLink>
        {node.children.length > 0 && <CategoryList nodes={node.children} />}
      </li>
    ))}
  </ul>
)

export const SitemapView = async () => {
  const categoryMenu = await getCategoryMenu()

  return (
    <PageContainer breadcrumb={buildBreadcrumb('/plan-du-site')}>
      <Typography variant="h1" gutterBottom>
        Plan du site
      </Typography>
      <Box component="ul" data-testid="legal-sitemap">
        {SITE_MAP.map(({ href, label }) => (
          <li key={href}>
            <MuiLink component={Link} href={href} sx={LINK_SX}>
              {label}
            </MuiLink>
            {href === CATALOG_NAVIGATION.href && <CategoryList nodes={categoryMenu} />}
          </li>
        ))}
      </Box>
    </PageContainer>
  )
}
