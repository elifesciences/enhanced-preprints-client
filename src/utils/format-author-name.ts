import { Author } from '../types';

export const formatAuthorName = ({ givenNames, familyNames, honorificSuffix }: Author) => `${givenNames ? givenNames.join(' ') : ''} ${familyNames ? familyNames.join(' ') : ''}${honorificSuffix ? ` ${honorificSuffix}` : ''}`.trim();
