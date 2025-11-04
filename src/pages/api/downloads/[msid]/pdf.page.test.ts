import { type NextApiRequest, type NextApiResponse } from 'next';
import { createMocks, type createResponse } from 'node-mocks-http';
import fetchMock from 'fetch-mock';
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
    const {
      req,
      res,
    }: { req: NextApiRequest; res: NextApiResponse & ReturnType<typeof createResponse> } = createMocks({
      url: '/reviewed-preprints/321.pdf',
      query: { msid: '321' },
    });

    afterEach(() => {
      jest.resetAllMocks();
      fetchMock.resetBehavior();
      fetchMock.restore();
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

      // Mock the external PDF fetch
      fetchMock.mock('https://example.com/sample.pdf', {
        status: 200,
        body: Buffer.from('PDFDATA'),
        headers: { 'content-type': 'application/pdf' },
      });

      await handler(req, res);

      expect(res.statusCode).toBe(200);
      // verify body and headers
      // eslint-disable-next-line no-underscore-dangle
      expect(res._getData()).toContain('PDFDATA');
      expect(res.getHeader('Content-Type') || res.getHeader('content-type')).toBe('application/pdf');
    });
  });
});
