type AuthorName = {
  givenNames?: string[],
  familyNames?: string[],
  honorificSuffix?: string,
};

export const formatAuthorName = ({ givenNames, familyNames, honorificSuffix }: AuthorName): string => `${(givenNames ?? []).join(' ')} ${(familyNames ?? []).join(' ')}${honorificSuffix ? ` ${honorificSuffix}` : ''}`.trim();
