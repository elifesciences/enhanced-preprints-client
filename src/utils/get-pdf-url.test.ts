import { getPdfUrl } from './get-pdf-url';

describe('getPdfUrl', () => {
  it('should return pdf_url with msid replaced', () => {
    const msid = '12345';

    const url = getPdfUrl(msid);

    expect(url).toBe('/reviewed-preprints/12345.pdf');
  });

  describe('when the article version is a reviewed preprint', () => {
    it.todo('should use the "/reviewed-preprints" prefix');
  });

  describe('when the article version is a verson of record', () => {
    it.todo('should use the "/articles" prefix');
  });
});
