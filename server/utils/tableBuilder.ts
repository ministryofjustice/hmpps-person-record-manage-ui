// types need moving to somewhere sensible
export type Table = {
  caption: string
  head: Heading[]
  rows: Row[]
}

export type Heading = {
  text: string
}

export type Row = Array<TextItem | HtmlItem>

export type TextItem = {
  text: string
}

export type HtmlItem = {
  html: string
}

export const TextItem = (text: string): TextItem => ({ text })

export const LinkItem = (text: string, link: string): HtmlItem => ({
  html: `<a href="${link}" class="govuk-link">${text}</a>`,
})

export const Row = (...items: (TextItem | HtmlItem)[]): Row => items

export const Heading = (text: string): Heading => ({ text })

export const Table = (structure: { caption: string; head: Heading[]; rows: Row[] }): Table => ({
  caption: structure.caption,
  head: structure.head,
  rows: structure.rows,
})
