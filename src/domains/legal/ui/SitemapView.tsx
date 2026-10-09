import Box from '@mui/material/Box'
import MuiLink from '@mui/material/Link'
import Typography from '@mui/material/Typography'

import { CATALOG_PATH, CATEGORY_TREE, categoryHref, SITE_MAP } from '@/core/config'
import { buildBreadcrumb, PageContainer } from '@/core/ui/layouts'
import { Link } from '@/core/ui/ui-kit'

import type { CategoryNode } from '@/core/config'

const LINK_SX = { display: 'inline-flex', alignItems: 'center', minHeight: 44 } as const

const CategoryList = ({ nodes, parents }: { nodes: CategoryNode[]; parents: string[] }) => (
  <ul>
    {nodes.map((node) => {
      const slugs = [...parents, node.slug]
      return (
        <li key={node.slug}>
          <MuiLink component={Link} href={categoryHref(slugs)} sx={LINK_SX}>
            {node.name}
          </MuiLink>
          {node.children && <CategoryList nodes={node.children} parents={slugs} />}
        </li>
      )
    })}
  </ul>
)

export const SitemapView = () => (
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
          {href === CATALOG_PATH && <CategoryList nodes={CATEGORY_TREE} parents={[]} />}
        </li>
      ))}
    </Box>
  </PageContainer>
)
