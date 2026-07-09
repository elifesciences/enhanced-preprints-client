export const getXmlUrl = (msid: string, isVor: boolean, domain?: string): string => {
  const prefix = isVor ? 'articles' : 'reviewed-preprints';
  return `${domain ?? ''}/${prefix}/${msid}.xml`;
};
