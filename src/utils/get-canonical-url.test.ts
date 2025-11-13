import { getCanonicalUrl } from './get-canonical-url';

describe('getCanonicalUrl', () => {
  const msid = '12345';
  describe('when the article version is not a version of record', () => {
    const isVor = false;
    const canonicalUrl = getCanonicalUrl(msid, isVor);
    it('uses the "/reviewed-preprints" prefix', () => {
      expect(canonicalUrl.startsWith('/reviewed-preprints')).toBe(true);
    });
    it('uses the manuscript ID in the final segment of canonical URL', () => {
      expect(canonicalUrl.endsWith(`/${msid}`)).toBe(true);
    });

    describe('when a canonical domain is configured', () => {
      it.todo('returns a full url with protocol and domain');
    });
  });

  describe('when the article version is a version of record', () => {
    const isVor = true;
    const canonicalUrl = getCanonicalUrl(msid, isVor);
    it('uses the "/articles" prefix', () => {
      expect(canonicalUrl.startsWith('/articles')).toBe(true);
    });

    it('uses the manuscript ID in the final segment of canonical URL', () => {
      expect(canonicalUrl.endsWith(`/${msid}`)).toBe(true);
    });

    describe('when a canonical domain is configured', () => {
      it.todo('returns a full url with protocol and domain');
    });
  });
});
