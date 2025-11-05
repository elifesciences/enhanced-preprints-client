import { type NextApiRequest, type NextApiResponse } from 'next';
import { createMocks, type createResponse } from 'node-mocks-http';
import { ReadableStream } from 'stream/web';
import { fetchVersion } from '../../../../utils/data-fetch';
import handler from './pdf.page';

jest.mock('../../../../utils/data-fetch/fetch-data', () => ({
  fetchVersion: jest.fn(),
}));

describe('download PDF handler', () => {
  describe('Handling unexpected types passed by next.js', () => {
    const {
      req,
      res,
    }: { req: NextApiRequest; res: NextApiResponse & ReturnType<typeof createResponse> } = createMocks({
      url: '/reviewed-preprints/321.pdf',
      query: { msid: ['321'] },
    });

    test('returns 400 if nextjs passes a non-string query msid', async () => {
      await handler(req, res);

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
      const mocks: { req: NextApiRequest; res: NextApiResponse & ReturnType<typeof createResponse> } = createMocks({
        url: '/reviewed-preprints/321.pdf',
        query: { msid: '321' },
      });
      req = mocks.req;
      res = mocks.res;
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
      (fetchVersion as jest.Mock).mockResolvedValueOnce({
        article: {
          pdfUrl: 'https://example.com/sample.pdf',
        },
      });

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
        body: ReadableStream.from(['PDFDATA']),
        headers: new Headers({ 'content-type': 'application/pdf' }),
      });

      await handler(req, res);

      expect(res.statusCode).toBe(200);
      // verify body and headers
      // eslint-disable-next-line no-underscore-dangle
      expect(res._isEndCalled()).toBe(true);

      // expect(res._getData()).toContain('PDFDATA');

      expect(res.getHeader('Content-Type') || res.getHeader('content-type')).toBe('application/pdf');
    });

    test('returns 502 when unexpected error occurs', async () => {
      (fetchVersion as jest.Mock).mockRejectedValueOnce(new Error('Unexpected error'));
      await handler(req, res);

      expect(res.statusCode).toBe(502);
    });
  });
});
