import { NextApiRequest, NextApiResponse } from 'next';
import { createMocks, createResponse } from 'node-mocks-http';
import fetchMock from 'fetch-mock';
import { fetchVersion } from '../../../../utils/fetch-data';
import handler from './ris.page';

jest.mock('../../../../utils/fetch-data', () => ({
  fetchVersion: jest.fn(),
}));

describe('citation RIS handler', () => {
  const {
    req,
    res,
  }: { req: NextApiRequest; res: NextApiResponse & ReturnType<typeof createResponse> } = createMocks({
    url: '/reviewed-preprints/321.ris',
    query: { msid: '321' },
  });

  afterEach(() => {
    jest.resetAllMocks();
    fetchMock.resetBehavior();
  });

  test('returns 503 if version is not available', async () => {
    (fetchVersion as jest.Mock).mockResolvedValueOnce(null);
    await handler(req, res);

    expect(res.statusCode).toBe(503);
    // eslint-disable-next-line no-underscore-dangle
    expect(res._getData()).toBe('Unable to retrieve citation 321.ris');
  });

  test('returns the citation if available', async () => {
    fetchMock.once(/.*/, `TY  - JOUR
AU  - Brain, Pinky
AU  - Mouse, Pinky
AU  - Rodreigez, Slowpoke
AU  - J Pussycat, Sylvester
AU  - Fudd, Elmer
AU  - Sam, Yosemite
AU  - Leghorn, Fogghorn
AU  - Le Pew, Pepe
AU  - Pig, Porky
AU  - Gonzales, Speedy
AU  - Bunny, Bugs
TI  - Tonight we take over the world!
AB  - A study of world domination by genetically enhanced mice.
PY  - 2022
DO  - 10.7554/eLife.321.1`);
    (fetchVersion as jest.Mock).mockResolvedValueOnce({
      article: {
        preprintDoi: '10.1101/321456',
      },
    });
    await handler(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.getHeader('Content-Type')).toBe('application/x-research-info-systems');
    expect(res.getHeader('Content-Disposition')).toBe('attachment; filename=321.ris');
    // eslint-disable-next-line no-underscore-dangle
    expect(res._getData()).toContain('TI  - Tonight we take over the world!');
    // eslint-disable-next-line no-underscore-dangle
    expect(res._getData()).toContain('DO  - 10.7554/eLife.321.1');
    expect(fetchMock.lastUrl()).toStrictEqual('/undefined/api/citations/10.1101/321456/ris');
  });
});
