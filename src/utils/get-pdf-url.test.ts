import { getPdfUrl } from './get-pdf-url';

describe('getPdfUrl', () => {
  const msid = '12345';

  describe('when the article version is not a version of record', () => {
    it('uses the "/reviewed-preprints" prefix', () => {
      const isVor = false;
      const url = getPdfUrl(msid, isVor);

      expect(url.startsWith('/reviewed-preprints')).toBe(true);
    });
  });

  describe('when the article version is a version of record', () => {
    it('uses the "/articles" prefix', () => {
      const isVor = true;
      const url = getPdfUrl(msid, isVor);

      expect(url.startsWith('/articles')).toBe(true);
    });
  });
});
