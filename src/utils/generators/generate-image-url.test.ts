import fetchMock from 'fetch-mock';
import { generateImageInfo, generateImageUrl, generateImageUrlSized } from './generate-image-url';

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

  it('uses the config iiifUrl to fetch iiif info if config is set', async () => {
    mockConfig = {
      iiifUrl: 'http://random-iiif-server/iiif',
    };
    fetchMock.once('http://random-iiif-server/iiif/bar/info.json', 404);

    await expect(async () => generateImageInfo('bar'))
      .rejects
      .toThrow('Image info fetch failed with status 404');
  });

  it('prioritises the config iiifUrl over iiifServer', async () => {
    mockConfig = {
      iiifServer: 'http://random-previous-config-iiif-server/iiif',
      iiifUrl: 'http://random-iiif-server/iiif',
    };
    fetchMock.once('http://random-iiif-server/iiif/bar/info.json', 404);

    await expect(async () => generateImageInfo('bar'))
      .rejects
      .toThrow('Image info fetch failed with status 404');
  });
});

describe('generateImageUrl', () => {
  it('uses the config imageServer to generate image url if config is set', async () => {
    mockConfig = {
      imageServer: 'http://arbitrary-iiif-server/iiif-prefix',
    };

    const url = generateImageUrl('bar');

    expect(url).toBe('http://arbitrary-iiif-server/iiif-prefix/2/bar/full/max/0/default.jpg');
  });

  it('uses the config iiifPublicUrl to generate image url if config is set', async () => {
    mockConfig = {
      iiifPublicUrl: 'http://arbitrary-iiif-server/iiif-prefix',
    };

    const url = generateImageUrl('bar');

    expect(url).toBe('http://arbitrary-iiif-server/iiif-prefix/bar/full/max/0/default.jpg');
  });

  it('prioritises the config iiifPublicUrl over imageServer', async () => {
    mockConfig = {
      imageServer: 'http://random-previous-config-iiif-server/iiif',
      iiifPublicUrl: 'http://arbitrary-iiif-server/iiif-prefix',
    };

    const url = generateImageUrl('bar');

    expect(url).toBe('http://arbitrary-iiif-server/iiif-prefix/bar/full/max/0/default.jpg');
  });
});

describe('generateImageUrlSized', () => {
  it('uses the config imageServer to generate image url if config is set', async () => {
    mockConfig = {
      imageServer: 'http://arbitrary-iiif-server/iiif-prefix',
    };

    const url = generateImageUrlSized('bar', 42);

    expect(url).toBe('http://arbitrary-iiif-server/iiif-prefix/2/bar/full/42,/0/default.jpg');
  });

  it('uses the config iiifPublicUrl to generate image url if config is set', async () => {
    mockConfig = {
      iiifPublicUrl: 'http://arbitrary-iiif-server/iiif-prefix',
    };

    const url = generateImageUrlSized('bar', 42);

    expect(url).toBe('http://arbitrary-iiif-server/iiif-prefix/bar/full/42,/0/default.jpg');
  });

  it('prioritises the config iiifPublicUrl over imageServer', async () => {
    mockConfig = {
      imageServer: 'http://random-previous-config-iiif-server/iiif',
      iiifPublicUrl: 'http://arbitrary-iiif-server/iiif-prefix',
    };

    const url = generateImageUrlSized('bar', 42);

    expect(url).toBe('http://arbitrary-iiif-server/iiif-prefix/bar/full/42,/0/default.jpg');
  });
});
