// types need moving to somewhere sensible
type Table = {
  caption: string
  head: Heading[]
  rows: Row[]
}

type Heading = {
  text: string
}

type Row = Array<TextItem | HtmlItem>

type TextItem = {
  text: string
}

type HtmlItem = {
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
