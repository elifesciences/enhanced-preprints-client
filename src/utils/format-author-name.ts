import { Author } from '../types';

export const formatAuthorName = ({ givenNames, familyNames, honorificSuffix }: Author) => `${(givenNames ?? []).join(' ')} ${(familyNames ?? []).join(' ')}${honorificSuffix ? ` ${honorificSuffix}` : ''}`.trim();
