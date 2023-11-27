import { Content } from '../types';
import { ImageObjectContent } from '../types/content';
import { generateImageInfo } from './generate-image-url';

const getImageObjects = (content: Content): ImageObjectContent[] => {
  console.log("Get image objects");
  
  if (typeof content === 'string') {
    return [];
  }

  // @ts-ignore
  return (!Array.isArray(content) ? [content] : content).flat(Infinity).filter(filterImageObject);
};

export const filterImageObject = (contentPart: any): any => {
  console.log("CONTENT", contentPart);
  
  if (typeof contentPart === 'string') {
    return false;
  }

  if (Array.isArray(contentPart)) {
    return getImageObjects(contentPart);
  }

  if (contentPart.type !== 'ImageObject' && contentPart.content) {
    return filterImageObject(contentPart.content)
  }

  return contentPart.type === 'ImageObject';
}

export const contentToImgInfo = async (content: Content): Promise<Record<string, { width: number, height: number }>> => {
  const imageObjects = getImageObjects(content);
  console.log(imageObjects);
  

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
