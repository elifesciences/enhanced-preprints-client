import { Institution } from './institution';

export type Author = {
  givenNames: string[],
  familyNames: string[],
  affiliations?: Institution[],
};
