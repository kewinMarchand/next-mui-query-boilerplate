export type PaginationEntry = number | 'ellipsis'

const MAX_PAGES_WITHOUT_ELLIPSIS = 7

/** 1, courante − 1, courante, courante + 1, dernière, avec ellipses au-delà de 7 pages. */
export const paginationWindow = (current: number, pageCount: number): PaginationEntry[] => {
  if (pageCount <= MAX_PAGES_WITHOUT_ELLIPSIS) {
    return Array.from({ length: pageCount }, (_, index) => index + 1)
  }

  const pages = [1, current - 1, current, current + 1, pageCount].filter(
    (page, index, all) => page >= 1 && page <= pageCount && all.indexOf(page) === index,
  )
  return pages.flatMap((page, index) => {
    const previous = pages[index - 1]
    return previous !== undefined && page - previous > 1 ? ['ellipsis' as const, page] : [page]
  })
}
