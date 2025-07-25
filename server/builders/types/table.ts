export type Table = {
  head: Heading[]
  rows: Row[]
  attributes?: Attributes
}

export type Heading = {
  text: string
}

export type Attributes = {
  id: string
}

export type Row = Array<TextItem | HTMLItem>

export type TextItem = {
  text: string
}

export type HTMLItem = {
  html: string
}

export enum TagColour {
  YELLOW = 'govuk-tag--yellow',
  RED = 'govuk-tag--red',
  GREEN = 'govuk-tag--green',
}

export const TextItem = (text: string): TextItem => ({ text })

export const TagItem = (text: string, colour: TagColour): HTMLItem => ({
  html: `<strong class="govuk-tag ${colour}">${text}</strong>`,
})

export const LinkItem = (text: string, link: string): HTMLItem => ({
  html: `<a href="${link}" class="govuk-link">${text}</a>`,
})

export const Row = (...items: (TextItem | HTMLItem)[]): Row => items

export const Heading = (text: string): Heading => ({ text })

export const Table = (structure: { head: Heading[]; rows: Row[]; attributes?: Attributes }): Table => ({
  head: structure.head,
  rows: structure.rows,
  attributes: structure.attributes,
})
