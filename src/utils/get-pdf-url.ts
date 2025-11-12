export const getPdfUrl = (msid: string, isVor: boolean) => {
  let prefix = '/reviewed-preprints';
  if (isVor) {
    prefix = '/articles';
  }
  return `${prefix}/${msid}.pdf`;
};
