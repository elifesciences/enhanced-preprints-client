export const getPdfUrl = (msid: string, isVor: boolean, domain?: string, previewUrl?: string): string => {
  if (previewUrl) {
    return previewUrl;
  }

  const prefix = isVor ? 'articles' : 'reviewed-preprints';
  return `${domain ?? ''}/${prefix}/${msid}.pdf`;
};
