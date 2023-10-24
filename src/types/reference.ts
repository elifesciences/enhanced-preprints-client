import { Author } from './author';

type PublicationType = 'PublicationVolume' | 'Periodical';

type Publication = {
  type: PublicationType,
  name?: string,
  volumeNumber?: number | string,
  issueNumber?: number,
  isPartOf?: Publication,
};

export type Reference = {
  type: 'Article',
  id: string,
  title: string,
  url?: string,
  pageEnd?: number | string,
  pageStart?: number | string,
  authors: Array<Author>,
  datePublished: string | { type: 'Date', value: string },
  isPartOf?: Publication,
  identifiers?: {
    type: string,
    name: string,
    propertyID: string,
    value: string,
  }[],
  meta?: {
    label?: string,
  },
};
