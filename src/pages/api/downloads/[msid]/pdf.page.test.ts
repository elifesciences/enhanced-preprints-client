import { type NextApiRequest, type NextApiResponse } from 'next';
import { createRequest, createResponse } from 'node-mocks-http';
import { ReadableStream } from 'stream/web';
import EventEmitter from 'events';
import { fetchVersion } from '../../../../utils/data-fetch';
import handler from './pdf.page';

type SimplePdfResponse = {
  ok: boolean;
  status: number;
  headers: Headers;
  body: ReadableStream;
};

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
    const msid = '321';
    const versionIdentifier = '1';
    const version = {
      article: {
        pdfUrl: 'https://example.com/sample.pdf',
        msid,
        versionIdentifier,
      },
    };
    const pdfData = 'PDFDATA';
    let simplePdfResponse: SimplePdfResponse;

    let res: NextApiResponse & ReturnType<typeof createResponse>;

    beforeAll(() => {
      global.fetch = jest.fn();
    });

    beforeEach(() => {
      req = createRequest({
        url: '/reviewed-preprints/321.pdf',
        query: { msid },
        headers: {},
      });
      res = createResponse({
        eventEmitter: EventEmitter,
      });

      simplePdfResponse = {
        ok: true,
        status: 200,
        body: ReadableStream.from([pdfData]),
        headers: new Headers({
          'content-type': 'application/pdf',
          'content-length': String(pdfData.length),
        }),
      };
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

    describe('if version data is available', () => {
      beforeEach(() => {
        (fetchVersion as jest.Mock).mockResolvedValueOnce(version);
      });

      test('returns 200 with data', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce(simplePdfResponse);
        await handler(req, res);

        expect(res.statusCode).toBe(200);
        // verify body and headers
        // eslint-disable-next-line no-underscore-dangle
        expect(res._isEndCalled()).toBe(true);
        // eslint-disable-next-line no-underscore-dangle
        expect(res._getBuffer().toString()).toContain(pdfData);

        expect(res.getHeader('content-type')).toBe('application/pdf');
        expect(res.getHeader('content-disposition')).toBe(`attachment; filename="${msid}-v${versionIdentifier}.pdf"`);
        expect(res.getHeader('content-length')).toBe(pdfData.length.toString());
      });
    });

    test('returns a canonical URL in the response header', async () => {
      (fetchVersion as jest.Mock).mockResolvedValueOnce(version);

      (fetch as jest.Mock).mockResolvedValueOnce(simplePdfResponse);
      await handler(req, res);

      expect(res.statusCode).toBe(200);

      expect(res.getHeader('link')).toBe(`<https://elifesciences.org/reviewed-preprints/${msid}>; rel="canonical"`);
    });

    test('passes appropriate request headers related to client caching or referral to the pdf source', async () => {
      req.headers = { accept: 'application/pdf' };
      (fetchVersion as jest.Mock).mockResolvedValueOnce(version);

      let upstreamHeaders: HeadersInit = {};
      (fetch as jest.Mock).mockImplementationOnce((url: string, request: RequestInit) => {
        upstreamHeaders = request.headers ?? {};
      });
      await handler(req, res);

      expect(Object.keys(upstreamHeaders)).toContain('accept');
    });

    test('does not pass request headers unrelated to client caching or referral to the pdf source', async () => {
      req.headers = { host: 'arbitraryhost.com' };
      (fetchVersion as jest.Mock).mockResolvedValueOnce(version);

      let upstreamHeaders: HeadersInit = {};
      (fetch as jest.Mock).mockImplementationOnce((url: string, request: RequestInit) => {
        upstreamHeaders = request.headers ?? {};
      });
      await handler(req, res);

      expect(Object.keys(upstreamHeaders)).not.toContain('host');
    });

    test('returns appropriate response headers from the pdf source', async () => {
      (fetchVersion as jest.Mock).mockResolvedValueOnce(version);
      const appropriateResponseHeaders = {
        etag: 'arbitraryETagValue',
        expires: 'arbitraryDateAsString',
        'last-modified': 'arbitraryDateAsString2',
        'cache-control': 'arbitraryCacheControlValue',
        date: 'arbitraryDateAsString3',
        vary: 'arbitraryVaryValue',
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ...simplePdfResponse,
        headers: new Headers({ 'content-type': 'application/pdf', ...appropriateResponseHeaders }),
      });

      await handler(req, res);

      expect(res.getHeader('etag')).toBe('arbitraryETagValue');
      expect(res.getHeader('expires')).toBe('arbitraryDateAsString');
      expect(res.getHeader('last-modified')).toBe('arbitraryDateAsString2');
      expect(res.getHeader('cache-control')).toBe('arbitraryCacheControlValue');
      expect(res.getHeader('date')).toBe('arbitraryDateAsString3');
      expect(res.getHeader('vary')).toBe('arbitraryVaryValue');
    });

    test('does not return inappropriate response headers from the pdf source', async () => {
      (fetchVersion as jest.Mock).mockResolvedValueOnce(version);
      const inappropriateResponseHeaders = {
        'x-arbitrary-header': 'arbitraryHeaderValue',
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ...simplePdfResponse,
        headers: new Headers({ 'content-type': 'application/pdf', ...inappropriateResponseHeaders }),
      });

      await handler(req, res);

      expect(res.getHeader('x-arbitrary-header')).toBeUndefined();
    });

    test('returns 502 when unexpected error occurs', async () => {
      (fetchVersion as jest.Mock).mockRejectedValueOnce(new Error('Unexpected error'));
      await handler(req, res);

      expect(res.statusCode).toBe(502);
    });
  });
});
