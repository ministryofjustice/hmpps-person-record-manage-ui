import config from '../config'
import { PaginationDetails } from '../data/model/paginationDetails'
import { PageEllipsis, PageEllipsisItem, PageItem, PageLink, Pagination } from './types/pagination'

const buildPaginationItems = (
  currentPage: number,
  totalPages: number,
  paginationUrl: URL,
  delta: number = 2,
): (PageItem | PageEllipsis)[] => {
  const items: (PageItem | PageEllipsis)[] = []
  const left = Math.max(1, currentPage - delta)
  const right = Math.min(totalPages, currentPage + delta)

  let shouldInsertEllipsis = false

  for (let pageNo = 1; pageNo <= totalPages; pageNo += 1) {
    const isEdge = pageNo === 1 || pageNo === totalPages
    const isWithinRange = pageNo >= left && pageNo <= right

    if (isEdge || isWithinRange) {
      const url = new URL(paginationUrl.href)
      url.searchParams.set('page', String(pageNo))

      items.push(
        PageItem({
          number: pageNo,
          href: url.href,
          current: pageNo === currentPage,
        }),
      )

      shouldInsertEllipsis = true
    } else if (shouldInsertEllipsis) {
      items.push(PageEllipsisItem)
      shouldInsertEllipsis = false
    }
  }

  return items
}

const buildPagination = (route: string, currentPage: number, pagination: PaginationDetails): Pagination => {
  const { isLastPage, totalPages } = pagination
  const paginationUrl = new URL(route, config.ingressUrl)

  const items = buildPaginationItems(currentPage, totalPages, paginationUrl)

  const previousUrl = new URL(paginationUrl.href)
  previousUrl.searchParams.set('page', String(currentPage - 1))
  const previous = currentPage === 1 ? null : PageLink(previousUrl.href)

  const nextUrl = new URL(paginationUrl.href)
  nextUrl.searchParams.set('page', String(currentPage + 1))
  const next = isLastPage ? null : PageLink(nextUrl.href)

  return Pagination({
    previous,
    next,
    items,
  })
}

export default buildPagination
