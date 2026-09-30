export type Pagination = {
  previous?: PageLink | null
  next?: PageLink | null
  items: (PageItem | PageEllipsis)[]
}

export type PageLink = {
  href: string
}

export type PageItem = {
  number: number
  href: string
  current?: boolean
}

export type PageEllipsis = {
  ellipsis: boolean
}

export const PageLink = (href: string): PageLink => ({ href })

export const PageItem = (props: PageItem): PageItem => props

export const PageEllipsis = (ellipsis: boolean): PageEllipsis => ({ ellipsis })

export const Pagination = (structure: Pagination): Pagination => structure
