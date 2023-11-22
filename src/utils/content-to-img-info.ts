import { Content } from '../types';
import { ImageObjectContent } from '../types/content';
import { generateImageInfo } from './generate-image-url';

const getImageObjects = (content: Content): ImageObjectContent[] => {
  if (typeof content === 'string') {
    return [];
  }

  // @ts-ignore
  return (!Array.isArray(content) ? [content] : content).flat(Infinity).filter((contentPart) => {
    if (typeof contentPart === 'string') {
      return false;
    }

    if (Array.isArray(contentPart)) {
      return getImageObjects(content);
    }

    return contentPart.type === 'ImageObject';
  });
};

export const contentToImgInfo = async (content: Content): Promise<Record<string, { width: number, height: number }>> => {
  const imageObjects = getImageObjects(content);

  return imageObjects
    .filter(({ contentUrl }) => contentUrl)
    .reduce(async (acc, { contentUrl }) => {
      const ret = await acc;
      if (contentUrl) {
        const { height, width } = await generateImageInfo(contentUrl);
        // eslint-disable-next-line no-param-reassign
        ret[contentUrl] = { height, width };
      }

      return ret;
    }, Promise.resolve({} as Record<string, { width: number, height: number }>));
};
