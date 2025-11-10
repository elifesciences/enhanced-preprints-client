import { type NextApiRequest, type NextApiResponse } from 'next';
import { createRequest, createResponse } from 'node-mocks-http';
import { ReadableStream } from 'stream/web';
import EventEmitter from 'events';
import { fetchVersion } from '../../../../utils/data-fetch';
import handler from './pdf.page';

jest.mock('../../../../utils/data-fetch/fetch-data', () => ({
  fetchVersion: jest.fn(),
}));

describe('download PDF handler', () => {
  describe('Handling unexpected types passed by next.js', () => {
    test('returns 400 if nextjs passes a non-string query msid', async () => {
      const invalidReq: NextApiRequest = createRequest({
        url: '/reviewed-preprints/321.pdf',
        query: { msid: ['321'] },
      });
      const res: NextApiResponse & ReturnType<typeof createResponse> = createResponse();
      await handler(invalidReq, res);

      expect(res.statusCode).toBe(400);
    });
  });

  describe('Handling PDF requests', () => {
    let req: NextApiRequest;
    let res: NextApiResponse & ReturnType<typeof createResponse>;

    beforeAll(() => {
      global.fetch = jest.fn();
    });

    beforeEach(() => {
      req = createRequest({
        url: '/reviewed-preprints/321.pdf',
        query: { msid: '321' },
        headers: {},
      });
      res = createResponse({
        eventEmitter: EventEmitter,
      });
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    afterAll(() => {
      (global.fetch as jest.Mock).mockRestore();
    });

    test('returns 404 if version is not available', async () => {
      (fetchVersion as jest.Mock).mockResolvedValueOnce(null);
      await handler(req, res);

      expect(res.statusCode).toBe(404);
    });

    test('returns 200 with data if version is available', async () => {
      const msid = '321';
      const versionIdentifier = '1';
      (fetchVersion as jest.Mock).mockResolvedValueOnce({
        article: {
          pdfUrl: 'https://example.com/sample.pdf',
          msid,
          versionIdentifier,
        },
      });

      const pdfData = 'PDFDATA';
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
        body: ReadableStream.from([pdfData]),
        headers: new Headers({ 'content-type': 'application/pdf' }),
      });
      await handler(req, res);

      expect(res.statusCode).toBe(200);
      // verify body and headers
      // eslint-disable-next-line no-underscore-dangle
      expect(res._isEndCalled()).toBe(true);
      // eslint-disable-next-line no-underscore-dangle
      expect(res._getBuffer().toString()).toContain(pdfData);

      expect(res.getHeader('content-type')).toBe('application/pdf');
      expect(res.getHeader('content-disposition')).toBe(`attachment; filename="${msid}-v${versionIdentifier}.pdf"`);
    });

    test('returns a canonical URL in the response header', async () => {
      const msid = '321';
      const versionIdentifier = '1';
      (fetchVersion as jest.Mock).mockResolvedValueOnce({
        article: {
          pdfUrl: 'https://example.com/sample.pdf',
          msid,
          versionIdentifier,
        },
      });

      const pdfData = 'PDFDATA';
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
        body: ReadableStream.from([pdfData]),
        headers: new Headers({ 'content-type': 'application/pdf' }),
      });
      await handler(req, res);

      expect(res.statusCode).toBe(200);

      expect(res.getHeader('link')).toBe(`<https://elifesciences.org/reviewed-preprints/${msid}>; rel="canonical"`);
    });

    test('passes appropriate request headers related to client caching to the pdf source', async () => {
      req.headers = { accept: 'application/pdf' };
      const msid = '321';
      const versionIdentifier = '1';
      (fetchVersion as jest.Mock).mockResolvedValueOnce({
        article: {
          pdfUrl: 'https://example.com/sample.pdf',
          msid,
          versionIdentifier,
        },
      });

      let upstreamHeaders: HeadersInit = {};
      (fetch as jest.Mock).mockImplementationOnce((url: string, request: RequestInit) => {
        upstreamHeaders = request.headers ?? {};
      });
      await handler(req, res);

      expect(Object.keys(upstreamHeaders)).toContain('accept');
    });

    test('does not pass request headers unrelated to client caching to the pdf source', async () => {
      req.headers = { host: 'arbitraryhost.com' };
      const msid = '321';
      const versionIdentifier = '1';
      (fetchVersion as jest.Mock).mockResolvedValueOnce({
        article: {
          pdfUrl: 'https://example.com/sample.pdf',
          msid,
          versionIdentifier,
        },
      });

      let upstreamHeaders: HeadersInit = {};
      (fetch as jest.Mock).mockImplementationOnce((url: string, request: RequestInit) => {
        upstreamHeaders = request.headers ?? {};
      });
      await handler(req, res);

      expect(Object.keys(upstreamHeaders)).not.toContain('host');
    });

    test.todo('returns appropriate response headers related to client caching from the pdf source');

    test.todo('does not return response headers unrelated to client caching from the pdf source');

    test('returns 502 when unexpected error occurs', async () => {
      (fetchVersion as jest.Mock).mockRejectedValueOnce(new Error('Unexpected error'));
      await handler(req, res);

      expect(res.statusCode).toBe(502);
    });
  });
});
