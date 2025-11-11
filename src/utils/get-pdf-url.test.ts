import { getPdfUrl } from "./get-pdf-url";

describe('getPdfUrl', () => {
  it('should return pdf_url with msid replaced', () => {
    const msid = '12345';

    const url = getPdfUrl(msid);

    expect(url).toBe('/reviewed-preprints/12345.pdf');
  });
});
