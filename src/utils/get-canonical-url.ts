export const getCanonicalUrl = (msid: string, isVor?: boolean) => {
  let prefix = '/reviewed-preprints';
  if (isVor) {
    prefix = '/articles';
  }
  return `${prefix}/${msid}`;
};
