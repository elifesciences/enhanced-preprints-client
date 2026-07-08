export const getXmlUrl = (msid: string, isVor: boolean, domain?: string) => {
  const prefix = isVor ? 'articles' : 'reviewed-preprints';
  return `${domain ?? ''}/${prefix}/${msid}.xml`;
};
