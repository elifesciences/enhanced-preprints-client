import { type NextApiResponse, type NextApiRequest } from 'next';
import { createRequest, createResponse } from 'node-mocks-http';
import { fetchVersion } from '../../../../utils/data-fetch';
import handler from './xml.page';

jest.mock('../../../../utils/data-fetch/fetch-data', () => ({
  fetchVersion: jest.fn(),
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
      it.skip('returns 200 with the data', async () => {
        const xmlData = 'arbitrary xml';
        (fetchVersion as jest.Mock).mockResolvedValueOnce({});
        const req: NextApiRequest = createRequest({
          query: { msid: 'arbitrary-msid' },
        });
        const res: NextApiResponse & ReturnType<typeof createResponse> = createResponse();

        await handler(req, res);

        expect(res.statusCode).toBe(200);
        // eslint-disable-next-line no-underscore-dangle
        expect(res._getBuffer().toString()).toContain(xmlData);
      });
      it.todo('sets a canonical url');
      it.todo('sets a header to advise browsers to download the file');
    });
  });

  describe('handling unexpected errors', () => {
    describe('when an unexpected error occurs', () => {
      it.todo('returns status 502');
    });
  });
});
