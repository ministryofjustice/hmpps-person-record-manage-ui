export type Pagination = {
  previous?: PageLink
  next?: PageLink
  items: PageItem[]
}

export type PageLink = {
  href: string
}

export type PageItem = {
  number: number
  href: string
  current?: boolean
}

export const PageLink = (href: string): PageLink => ({ href })

export const PageItem = (props: PageItem): PageItem => props

export const Pagination = (structure: Pagination): Pagination => structure
