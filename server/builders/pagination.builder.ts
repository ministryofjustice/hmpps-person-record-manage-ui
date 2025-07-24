import config from '../config'
import { PaginationDetails } from '../data/model/paginationDetails'
import { PageItem, PageLink, Pagination } from './types/pagination'

const buildPagination = (route: string, currentPage: number, pagination: PaginationDetails): Pagination => {
  const { isLastPage, totalPages } = pagination

  const paginationUrl = new URL(route, config.ingressUrl)
  const pages = [...Array(totalPages).keys()]
    .map(p => p + 1)
    .map(pageNo => {
      paginationUrl.searchParams.set('page', String(pageNo))

      return PageItem({
        number: pageNo,
        href: paginationUrl.href,
        current: pageNo === currentPage,
      })
    })

  paginationUrl.searchParams.set('page', String(currentPage - 1))
  const previous = currentPage === 1 ? null : PageLink(paginationUrl.href)

  paginationUrl.searchParams.set('page', String(currentPage + 1))
  const next = isLastPage ? null : PageLink(paginationUrl.href)

  return Pagination({
    previous,
    next,
    items: pages,
  })
}

export default buildPagination
