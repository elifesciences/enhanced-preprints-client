import { getPdfUrl } from './get-pdf-url';

describe('getPdfUrl', () => {
  it('should return pdf_url with msid replaced', () => {
    const msid = '12345';
    const isVor = false;
    const url = getPdfUrl(msid, isVor);

    expect(url).toBe('/reviewed-preprints/12345.pdf');
  });

  describe('when the article version is not a version of record', () => {
    it('should use the "/reviewed-preprints" prefix', () => {
      const msid = '12345';
      const isVor = false;
      const url = getPdfUrl(msid, isVor);

      expect(url).toBe('/reviewed-preprints/12345.pdf');
    });
  });

  describe('when the article version is a version of record', () => {
    it('should use the "/articles" prefix', () => {
      const msid = '12345';
      const isVor = true;
      const url = getPdfUrl(msid, isVor);

      expect(url).toBe('/articles/12345.pdf');
    });
  });
});
