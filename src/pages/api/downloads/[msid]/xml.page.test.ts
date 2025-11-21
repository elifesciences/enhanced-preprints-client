import { type NextApiResponse, type NextApiRequest } from 'next';
import { createRequest, createResponse } from 'node-mocks-http';
import { fetchVersion } from '../../../../utils/data-fetch';
import handler from './xml.page';
import { proxyUrlToResponse } from '../../../../utils/proxy-url-to-response';
import { generateArticleXmlUri } from '../../../../utils/generators/generate-article-xml-uri';
import { getCanonicalUrl } from '../../../../utils/get-canonical-url';

jest.mock('../../../../utils/data-fetch/fetch-data', () => ({
  fetchVersion: jest.fn(),
}));

jest.mock('../../../../utils/proxy-url-to-response', () => ({
  proxyUrlToResponse: jest.fn(),
}));

jest.mock('../../../../utils/generators/generate-article-xml-uri', () => ({
  generateArticleXmlUri: jest.fn(),
}));

jest.mock('../../../../utils/get-canonical-url', () => ({
  getCanonicalUrl: jest.fn(),
}));

describe('download XML handler', () => {
  describe('Handling unexpected types passed by next.js', () => {
    it('returns 400 if nextjs passes a non-string query msid', async () => {
      const invalidReq: NextApiRequest = createRequest({
        query: { msid: ['321'] },
      });
      const res: NextApiResponse & ReturnType<typeof createResponse> = createResponse();

      await handler(invalidReq, res);

      expect(res.statusCode).toBe(400);
    });
  });

  describe('handling XML requests', () => {
    const msid = 'arbitrary-msid';
    const versionIdentifier = '1';
    const version = {
      article: {
        pdfUrl: 'https://example.com/sample.pdf',
        msid,
        versionIdentifier,
      },
      versions: {
        // eslint-disable-next-line quote-props
        '1': {
          versionIdentifier: '1',
          preprintPosted: '2022-01-01',
        },
      },
    };
    const xmlData = 'arbitrary xml';
    describe('when the msid is invalid', () => {
      it('returns 404', async () => {
        (fetchVersion as jest.Mock).mockResolvedValueOnce(null);
        const req: NextApiRequest = createRequest({
          query: { msid: 'invalid-msid' },
        });
        const res: NextApiResponse & ReturnType<typeof createResponse> = createResponse();

        await handler(req, res);

        expect(res.statusCode).toBe(404);
      });
    });

    describe('when the msid is valid', () => {
      const canonicalUrl = 'arbitraryUrl';
      const articleXmlUri = 'example.com';
      let req: NextApiRequest;
      let res: NextApiResponse & ReturnType<typeof createResponse>;
      beforeEach(() => {
        (fetchVersion as jest.Mock).mockResolvedValueOnce(version);
        (proxyUrlToResponse as jest.Mock).mockImplementationOnce((
          _url,
          _req,
          response,
        ) => {
          response.write(Buffer.from(xmlData));
          response.end();
        });
        (getCanonicalUrl as jest.Mock).mockReturnValueOnce(canonicalUrl);
        (generateArticleXmlUri as jest.Mock).mockReturnValueOnce(articleXmlUri);

        req = createRequest({
          query: { msid },
        });
        res = createResponse();
      });

      afterEach(() => {
        jest.resetAllMocks();
      });

      it('returns 200 with the data from a correct XML url', async () => {
        await handler(req, res);

        expect(res.statusCode).toBe(200);
        // eslint-disable-next-line no-underscore-dangle
        expect(res._getBuffer().toString()).toContain(xmlData);
        expect(proxyUrlToResponse).toHaveBeenCalledWith(articleXmlUri, req, res, expect.anything(), expect.anything());
      });
      it('sets a canonical url', async () => {
        await handler(req, res);
        expect(proxyUrlToResponse).toHaveBeenCalledWith(expect.anything(), req, res, expect.anything(), canonicalUrl);
      });
      it('sets a header to advise browsers to download the file', async () => {
        await handler(req, res);
        expect(proxyUrlToResponse).toHaveBeenCalledWith(expect.anything(), req, res, `${msid}-v${versionIdentifier}.xml`, expect.anything());
      });
    });
  });

  describe('handling unexpected errors', () => {
    describe('when an unexpected error occurs', () => {
      it('returns status 502', async () => {
        (fetchVersion as jest.Mock).mockRejectedValueOnce(new Error('Arbitrary unexpected error.'));
        const req: NextApiRequest = createRequest({ query: { msid: '12345' } });
        const res: NextApiResponse & ReturnType<typeof createResponse> = createResponse();

        await handler(req, res);

        expect(res.statusCode).toBe(502);
      });
    });
  });
});
