export const getPdfUrl = (msid: string, isVor: boolean) => {
  if (isVor) {
    return `/articles/${msid}.pdf`;
  }
  return `/reviewed-preprints/${msid}.pdf`;
};
