import { type NextApiResponse, type NextApiRequest } from 'next';
import { createRequest, createResponse } from 'node-mocks-http';
import handler from './xml.page';

describe('download XML handler', () => {
  describe('Handling unexpected types passed by next.js', () => {
    it('returns 400 if nextjs passes a non-string query msid', async () => {
      const invalidReq: NextApiRequest = createRequest({
        url: '/reviewed-preprints/321.xml',
        query: { msid: ['321'] },
      });
      const res: NextApiResponse & ReturnType<typeof createResponse> = createResponse();

      await handler(invalidReq, res);

      expect(res.statusCode).toBe(400);
    });
  });

  describe('handling XML requests', () => {
    describe('when the msid is invalid', () => {
      it.todo('returns 404');
    });

    describe('when the msid is valid', () => {
      it.todo('returns 200 with the data');
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
