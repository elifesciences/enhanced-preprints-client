import { generateImageInfo } from "./generate-image-url";
import fetchMock from 'fetch-mock';

describe('generate image url', () => {
  afterEach(() => {
    fetchMock.resetBehavior();
  })
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

    await expect(async () => await generateImageInfo('bar'))
    .rejects
    .toThrowError('Image info fetch failed with status 404');
  });
})
