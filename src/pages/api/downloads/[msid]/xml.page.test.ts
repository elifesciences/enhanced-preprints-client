import { type NextApiResponse, type NextApiRequest } from 'next';
import { createRequest, createResponse } from 'node-mocks-http';
import { fetchVersion } from '../../../../utils/data-fetch';
import handler from './xml.page';
import { proxyUrlToResponse } from '../../../../utils/proxy-url-to-response';
import { generateArticleXmlUri } from '../../../../utils/generators/generate-article-xml-uri';

jest.mock('../../../../utils/data-fetch/fetch-data', () => ({
  fetchVersion: jest.fn(),
}));

jest.mock('../../../../utils/proxy-url-to-response', () => ({
  proxyUrlToResponse: jest.fn(),
}));

jest.mock('../../../../utils/generators/generate-article-xml-uri', () => ({
  generateArticleXmlUri: jest.fn(),
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
      it('returns 200 with the data from a correct XML url', async () => {
        (fetchVersion as jest.Mock).mockResolvedValueOnce(version);
        (proxyUrlToResponse as jest.Mock).mockImplementationOnce((
          _url,
          _req,
          res: NextApiResponse,
        ) => {
          res.write(Buffer.from(xmlData));
          res.end();
        });
        const articleXmlUri = 'example.com';
        (generateArticleXmlUri as jest.Mock).mockReturnValueOnce(articleXmlUri);

        const req: NextApiRequest = createRequest({
          query: { msid },
        });
        const res: NextApiResponse & ReturnType<typeof createResponse> = createResponse();

        await handler(req, res);

        expect(res.statusCode).toBe(200);
        // eslint-disable-next-line no-underscore-dangle
        expect(res._getBuffer().toString()).toContain(xmlData);
        expect(proxyUrlToResponse).toHaveBeenCalledWith(articleXmlUri, req, res, expect.anything(), expect.anything());
      });
      it.todo('sets a canonical url');
      it.todo('sets a header to advise browsers to download the file');
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
