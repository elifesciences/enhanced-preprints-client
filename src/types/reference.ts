import { Author } from './author';

type PublicationType = 'PublicationVolume' | 'Periodical';

type Publication = {
  type: PublicationType,
  name?: string,
  volumeNumber?: number | string,
  issueNumber?: number,
  isPartOf?: Publication,
};

type Publisher = {
  type: 'Organization',
  name: string,
  address?: {
    type: 'PostalAddress',
    addressLocality: string,
  },
};

export type Reference = {
  type: 'Article',
  id: string,
  title: string,
  url?: string,
  pageEnd?: number | string,
  pageStart?: number | string,
  authors: Array<Author>,
  datePublished?: string | { type: 'Date', value: string },
  isPartOf?: Publication,
  publisher?: Publisher,
  identifiers?: {
    type: string,
    name: string,
    propertyID: string,
    value: string,
  }[],
  meta?: {
    yearPublished?: string,
    label?: string,
  },
};
