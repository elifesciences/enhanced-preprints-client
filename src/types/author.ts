import { Institution } from './institution';

export type Author = {
  type?: 'Person'
  givenNames: string[],
  familyNames: string[],
  affiliations?: Institution[],
};
