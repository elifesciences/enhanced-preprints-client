import { config } from '../config';

export const generateImageUrl = (contentImageId: string): string => (config.imageServer ? `${config.imageServer}/2/${encodeURIComponent(contentImageId)}/full/max/0/default.jpg` : contentImageId);

export const generateImageUrlSized = (contentImageId: string, size: number): string => {
  if (!config.imageServer) return contentImageId;

  return `${config.imageServer}/2/${encodeURIComponent(contentImageId)}/full/${size},/0/default.jpg`;
};

export const generateImageInfo = async (contentImageId: string): Promise<{ width: number, height: number }> => {
  const infoUrl = `${config.iiifServer}/2/${encodeURIComponent(contentImageId)}/info.json`;
  const imageInfo = await fetch(infoUrl);
  if (!imageInfo.ok) {
    throw Error(`Image info fetch failed with status ${imageInfo.status} (${infoUrl})`);
  }
  const imageJson = await imageInfo.json();
  const { height, width } = imageJson;

  return { height, width };
};
