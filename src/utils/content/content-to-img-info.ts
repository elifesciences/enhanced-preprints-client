import { Content } from '../../types';
import { ImageObjectContent } from '../../types/content';
import { generateImageInfo } from '../generators';

const isImageObject = (content: Content): content is ImageObjectContent => {
  if (typeof content === 'undefined') {
    return false;
  }

  if (typeof content === 'string') {
    return false;
  }

  if (Array.isArray(content)) {
    return false;
  }

  return 'type' in content && content.type === 'ImageObject';
};

const getImageObjects = (content: Content): ImageObjectContent[] => {
  if (typeof content === 'undefined') {
    return [];
  }

  if (typeof content === 'string') {
    return [];
  }

  if (Array.isArray(content)) {
    return content.map((part) => getImageObjects(part)).flat();
  }

  if (!isImageObject(content) && 'items' in content) {
    return getImageObjects(content.items);
  }

  if (!isImageObject(content) && 'content' in content) {
    return getImageObjects(content.content);
  }

  if (!isImageObject(content)) {
    return [];
  }

  return [content];
};

export const contentToImgInfo = async (content: Content): Promise<Record<string, { width: number, height: number }>> => {
  const imageObjects = getImageObjects(content);

  return imageObjects
    .filter(({ contentUrl }) => contentUrl)
    .reduce(async (acc, { contentUrl }) => {
      const ret = await acc;
      if (contentUrl) {
        const { height, width } = await generateImageInfo(contentUrl);

        ret[contentUrl] = { height, width };
      }

      return ret;
    }, Promise.resolve({} as Record<string, { width: number, height: number }>));
};
