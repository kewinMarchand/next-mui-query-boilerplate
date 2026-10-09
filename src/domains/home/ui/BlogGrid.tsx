import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'

import { Picture } from '@/core/ui/ui-kit'

import { formatPublishedAt } from '../common/models/article'

import type { Article } from '../common/models/article'

interface BlogGridProps {
  status: 'pending' | 'error' | 'success'
  articles: Article.Entity[] | undefined
  errorMessage?: string
}

const GRID_SX = {
  display: 'grid',
  gap: 3,
  gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
} as const

export const BlogGrid = ({ status, articles, errorMessage }: BlogGridProps) => {
  if (status === 'pending') {
    return (
      <Box
        role="status"
        aria-busy="true"
        aria-label="Chargement des articles"
        data-testid="home-blog-loading"
        sx={GRID_SX}
      >
        {[1, 2, 3].map((key) => (
          <Skeleton key={key} variant="rounded" height={160} />
        ))}
      </Box>
    )
  }

  if (status === 'error') {
    return (
      <Alert severity="error" data-testid="home-blog-error">
        {errorMessage}
      </Alert>
    )
  }

  if (!articles?.length) {
    return (
      <Alert severity="info" data-testid="home-blog-empty">
        Aucun article publié pour l'instant. Revenez bientôt !
      </Alert>
    )
  }

  return (
    <Box sx={GRID_SX}>
      {articles.map((article) => (
        <Card
          key={article.id}
          component="article"
          variant="outlined"
          data-testid="home-blog-card"
          sx={{ containerType: 'inline-size' }}
        >
          <Picture
            src={article.image}
            widths={[480, 960]}
            width={960}
            height={540}
            alt=""
            sizes="(min-width: 1440px) 460px, (min-width: 1024px) 33vw, (min-width: 600px) 50vw, 100vw"
            style={{ display: 'block', width: '100%', height: 'auto' }}
          />
          <Box sx={{ p: 2, '@container (min-width: 360px)': { p: 3 } }}>
            <Typography variant="h3" gutterBottom>
              {article.title}
            </Typography>
            <Typography sx={{ mb: 2 }}>{article.excerpt}</Typography>
            <Typography variant="body2" color="text.secondary">
              <time dateTime={article.publishedAt}>{formatPublishedAt(article.publishedAt)}</time>
            </Typography>
          </Box>
        </Card>
      ))}
    </Box>
  )
}
