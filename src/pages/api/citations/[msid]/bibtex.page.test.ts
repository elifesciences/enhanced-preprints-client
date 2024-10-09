import { NextApiRequest, NextApiResponse } from 'next';
import { createMocks, createResponse } from 'node-mocks-http';
import fetchMock from 'fetch-mock';
import { fetchVersion } from '../../../../utils/data-fetch';
import handler from './bibtex.page';

jest.mock('../../../../utils/data-fetch/fetch-data', () => ({
  fetchVersion: jest.fn(),
}));

describe('citation BibTeX handler', () => {
  const {
    req,
    res,
  }: { req: NextApiRequest; res: NextApiResponse & ReturnType<typeof createResponse> } = createMocks({
    url: '/reviewed-preprints/321.bib',
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
    expect(res._getData()).toBe('Unable to retrieve citation 321.bib');
  });

  test('returns the citation if available', async () => {
    fetchMock.once(/.*/, `@article{doi:10.7554/eLife.321.1,
  author = {Brain, Pinky and Mouse, Pinky and Rodreigez, Slowpoke and J Pussycat, Sylvester and Fudd, Elmer and Sam, Yosemite and Leghorn, Fogghorn and Le Pew, Pepe and Pig, Porky and Gonzales, Speedy and Bunny, Bugs},
  title = {Tonight we take over the world!},
  abstract = {A study of world domination by genetically enhanced mice.},
  year = {2022},
  doi = {10.7554/eLife.321.1}
}`);
    (fetchVersion as jest.Mock).mockResolvedValueOnce({
      article: {
        doi: '10.1101/321456',
      },
    });
    await handler(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.getHeader('Content-Type')).toBe('application/x-bibtex');
    expect(res.getHeader('Content-Disposition')).toBe('attachment; filename=321.bib');
    // eslint-disable-next-line no-underscore-dangle
    expect(res._getData()).toContain('title = {Tonight we take over the world!}');
    // eslint-disable-next-line no-underscore-dangle
    expect(res._getData()).toContain('doi = {10.7554/eLife.321.1}');
    expect(fetchMock.lastUrl()).toStrictEqual('/undefined/api/citations/10.1101/321456/bibtex');
  });
});
