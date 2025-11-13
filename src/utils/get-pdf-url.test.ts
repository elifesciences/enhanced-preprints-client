import { getPdfUrl } from './get-pdf-url';

describe('getPdfUrl', () => {
  const msid = '12345';
  const domain = 'https://elifesciences.org';

  describe('when the article version is not a version of record', () => {
    const isVor = false;
    const url = getPdfUrl(msid, isVor);
    it('uses the "/reviewed-preprints" prefix', () => {
      expect(url.startsWith('/reviewed-preprints')).toBe(true);
    });

    it('uses the manuscript ID in the basename of the PDF URL', () => {
      expect(url.endsWith(`${msid}.pdf`)).toBe(true);
    });

    describe('when the canonical domain is configured', () => {
      const expectedUrl = `https://elifesciences.org/reviewed-preprints/${msid}.pdf`;
      it('should return a full url with protocol and domain', () => {
        const canonicalUrl = getPdfUrl(msid, isVor, domain);

        expect(canonicalUrl).toBe(expectedUrl);
      });
    });
  });

  describe('when the article version is a version of record', () => {
    const isVor = true;
    const url = getPdfUrl(msid, isVor);

    it('uses the "/articles" prefix', () => {
      expect(url.startsWith('/articles')).toBe(true);
    });

    it('uses the manuscript ID in the basename of the PDF URL', () => {
      expect(url.endsWith(`${msid}.pdf`)).toBe(true);
    });

    describe('when the canonical domain is configured', () => {
      const expectedUrl = `https://elifesciences.org/articles/${msid}.pdf`;
      it('should return a full url with protocol and domain', () => {
        const canonicalUrl = getPdfUrl(msid, isVor, domain);

        expect(canonicalUrl).toBe(expectedUrl);
      });
    });
  });
});
