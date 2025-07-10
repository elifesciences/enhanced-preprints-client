import { NextApiRequest, NextApiResponse } from 'next';
import { createMocks, createResponse } from 'node-mocks-http';
import fetchMock from 'fetch-mock';
import { fetchVersion } from '../../../../../utils/data-fetch';
import handler from './pdf.page';

jest.mock('../../../../../utils/data-fetch/fetch-data', () => ({
  fetchVersion: jest.fn(),
}));

describe('PDF redirect handler', () => {
  const {
    req,
    res,
  }: { req: NextApiRequest; res: NextApiResponse & ReturnType<typeof createResponse> } = createMocks({
    url: '/reviewed-preprints/321/downloads/pdf',
    query: { msid: '321' },
  });

  afterEach(() => {
    jest.resetAllMocks();
    fetchMock.resetBehavior();
  });

  test('returns 404 if version is not available', async () => {
    (fetchVersion as jest.Mock).mockResolvedValueOnce(null);
    await handler(req, res);

    expect(res.statusCode).toBe(404);
  });
});
