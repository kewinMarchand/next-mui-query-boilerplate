import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Suspense } from 'react'

import { BlogGrid } from './BlogGrid'
import { LatestArticles } from './LatestArticles'

export const BlogSection = () => (
  <Box component="section" aria-labelledby="home-blog-title" data-testid="home-blog">
    <Typography variant="h2" id="home-blog-title" sx={{ mb: 2 }}>
      Derniers articles
    </Typography>
    <Suspense fallback={<BlogGrid status="pending" articles={undefined} />}>
      <LatestArticles />
    </Suspense>
  </Box>
)
