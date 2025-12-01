import fetchMock from 'fetch-mock';
import { generateImageInfo } from './generate-image-url';

let mockConfig: object | any = {};

jest.mock('../../config', () => ({
  get config() {
    return mockConfig;
  },
}));

describe('generateImageInfo', () => {
  afterEach(() => {
    fetchMock.resetBehavior();
    mockConfig = {};
  });

  it('returns a valid width and height with a correct url', async () => {
    fetchMock.once(/.*/, { width: 42, height: 84 });

    const result = await generateImageInfo('foo');

    expect(result).toStrictEqual({ width: 42, height: 84 });
  });

  it('fetches the correct url based on content image id', async () => {
    fetchMock.once(/.*/, { width: 42, height: 84 });

    await generateImageInfo('12345');

    expect(fetchMock.lastUrl()).toStrictEqual('/undefined/2/12345/info.json');
  });

  it('throws an error with the correct message when request fails', async () => {
    fetchMock.once(/.*/, 404);

    await expect(async () => generateImageInfo('bar'))
      .rejects
      .toThrow('Image info fetch failed with status 404');
  });

  it('uses the config iiifServer to fetch iiif info if config is set', async () => {
    mockConfig = {
      iiifServer: 'http://random-iiif-server/iiif',
    };
    fetchMock.once('http://random-iiif-server/iiif/2/bar/info.json', 404);

    await expect(async () => generateImageInfo('bar'))
      .rejects
      .toThrow('Image info fetch failed with status 404');
  });
});
