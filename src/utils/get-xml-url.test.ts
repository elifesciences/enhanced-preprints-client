import { getXmlUrl } from './get-xml-url';

describe('getXmlUrl', () => {
  const msid = '12345';
  const domain = 'https://elifesciences.org';

  describe('when the article version is not a version of record', () => {
    const isVor = false;
    const url = getXmlUrl(msid, isVor);
    it('uses the "/reviewed-preprints" prefix', () => {
      expect(url.startsWith('/reviewed-preprints')).toBe(true);
    });

    it('uses the manuscript ID in the basename of the XML URL', () => {
      expect(url.endsWith(`${msid}.xml`)).toBe(true);
    });

    describe('when the canonical domain is configured', () => {
      const expectedUrl = `https://elifesciences.org/reviewed-preprints/${msid}.xml`;
      it('returns a full url with protocol and domain', () => {
        const canonicalUrl = getXmlUrl(msid, isVor, domain);

        expect(canonicalUrl).toBe(expectedUrl);
      });
    });
  });

  describe('when the article version is a version of record', () => {
    const isVor = true;
    const url = getXmlUrl(msid, isVor);

    it('uses the "/articles" prefix', () => {
      expect(url.startsWith('/articles')).toBe(true);
    });

    it('uses the manuscript ID in the basename of the XML URL', () => {
      expect(url.endsWith(`${msid}.xml`)).toBe(true);
    });

    describe('when the canonical domain is configured', () => {
      const expectedUrl = `https://elifesciences.org/articles/${msid}.xml`;
      it('returns a full url with protocol and domain', () => {
        const canonicalUrl = getXmlUrl(msid, isVor, domain);

        expect(canonicalUrl).toBe(expectedUrl);
      });
    });
  });
});
