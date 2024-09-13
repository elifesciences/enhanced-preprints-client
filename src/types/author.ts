import { Institution } from './institution';

export type Author = {
  type?: 'Person' | 'Organization',
  name?: string,
  givenNames?: string[],
  honorificSuffix?: string,
  familyNames?: string[],
  affiliations?: Institution[],
  identifiers?: {
    type?: string,
    name?: string,
    propertyID?: string,
    value: string,
  }[],
  emails?: string[],
  meta?: {
    notes: {
      type: string,
      rid: string,
      label?: string,
    }[],
  },
};

export type AuthorNotes = {
  type: string,
  text: string,
  id?: string,
  label?: string,
}[];
