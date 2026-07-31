import { type Author } from './author';

type Publication = {
  type: 'PublicationVolume' | 'Periodical' | 'CreativeWork' | 'PublicationIssue',
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
    propertyID?: string,
    value: string,
  }[],
  comments?: {
    type: 'Comment',
    commentAspect: string,
  }[],
  meta?: {
    yearPublished?: string,
    label?: string,
    publicationType?: string,
  },
};
