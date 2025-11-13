import { getCanonicalUrl } from './get-canonical-url';

describe('getCanonicalUrl', () => {
  describe('when the article version is not a version of record', () => {
    it.failing('uses the "/reviewed-preprints" prefix', () => {
      const msid = '12345';
      const canonicalUrl = getCanonicalUrl(msid);

      expect(canonicalUrl.startsWith('/reviewed-preprints')).toBe(true);
    });
    it.todo('uses the manuscript ID in the final segment of canonical URL');

    describe('when a canonical domain is configured', () => {
      it.todo('returns a full url with protocol and domain');
    });
  });

  describe('when the article version is a version of record', () => {
    it.todo('uses the "/articles" prefix');

    it.todo('uses the manuscript ID in the final segment of canonical URL');

    describe('when a canonical domain is configured', () => {
      it.todo('returns a full url with protocol and domain');
    });
  });
});
