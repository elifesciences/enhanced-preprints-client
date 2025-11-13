export const getCanonicalUrl = (msid: string, isVor?: boolean, domain?: string) => {
  let prefix = '/reviewed-preprints';
  if (isVor) {
    prefix = '/articles';
  }
  return `${domain ?? ''}${prefix}/${msid}`;
};
