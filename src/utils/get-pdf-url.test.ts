import { getPdfUrl } from './get-pdf-url';

describe('getPdfUrl', () => {
  const msid = '12345';

  it('uses the manuscript ID in the basename of the PDF URL', () => {
    const vorUrl = getPdfUrl(msid, true);
    const notVorUrl = getPdfUrl(msid, false);

    expect(vorUrl.endsWith(`${msid}.pdf`)).toBe(true);
    expect(notVorUrl.endsWith(`${msid}.pdf`)).toBe(true);
  });

  describe('when the article version is not a version of record', () => {
    it('uses the "/reviewed-preprints" prefix', () => {
      const isVor = false;
      const url = getPdfUrl(msid, isVor);

      expect(url.startsWith('/reviewed-preprints')).toBe(true);
    });
  });

  describe('when the article version is a version of record', () => {
    const isVor = true;
    const domain = 'https://elifesciences.org';

    it('uses the "/articles" prefix', () => {
      const url = getPdfUrl(msid, isVor);

      expect(url.startsWith('/articles')).toBe(true);
    });

    describe('when the canonical domain is configured', () => {
      const expectedUrl = `https://elifesciences.org/articles/${msid}.pdf`;
      it('should return a full url with protocol and domain', () => {
        const url = getPdfUrl(msid, isVor, domain);

        expect(url).toBe(expectedUrl);
      });
    });
  });
});
