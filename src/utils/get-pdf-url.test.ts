import { getPdfUrl } from './get-pdf-url';

describe('getPdfUrl', () => {
  const msid = '12345';

  describe('when the article version is not a version of record', () => {
    it('should use the "/reviewed-preprints" prefix', () => {
      const isVor = false;
      const url = getPdfUrl(msid, isVor);

      expect(url).toBe(`/reviewed-preprints/${msid}.pdf`);
    });
  });

  describe('when the article version is a version of record', () => {
    it('should use the "/articles" prefix', () => {
      const isVor = true;
      const url = getPdfUrl(msid, isVor);

      expect(url).toBe(`/articles/${msid}.pdf`);
    });
  });
});
