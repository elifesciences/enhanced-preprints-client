import fetchMock from 'fetch-mock';
import { contentToImgInfo } from './content-to-img-info';

describe('content to image info', () => {
  afterEach(() => {
    fetchMock.hardReset();
  });

  it('returns a valid width and height with a correct url', async () => {
    fetchMock.once(/.*/, { width: 42, height: 84 });

    const result = await contentToImgInfo({ type: 'ImageObject', meta: { inline: false }, contentUrl: '/image/foo' });

    expect(result).toStrictEqual({ '/image/foo': { width: 42, height: 84 } });
  });

  it('fetches the correct url based on content image id', async () => {
    fetchMock.once(/.*/, { width: 42, height: 84 });

    await contentToImgInfo({ type: 'ImageObject', meta: { inline: false }, contentUrl: '12345' });

    expect(fetchMock.lastUrl()).toStrictEqual('/undefined/2/12345/info.json');
  });

  it('throws an error with the correct message when request fails', async () => {
    fetchMock.once(/.*/, 404);

    await expect(async () => contentToImgInfo({ type: 'ImageObject', meta: { inline: false }, contentUrl: '12345' }))
      .rejects
      .toThrow('Image info fetch failed with status 404');
  });
});
