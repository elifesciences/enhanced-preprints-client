import { config } from '../config';

export const generateImageUrl = (contentImageId: string): string => (config.imageServer ? `${config.imageServer}/2/${encodeURIComponent(contentImageId)}/full/max/0/default.jpg` : contentImageId);

export const generateImageUrlSized = (contentImageId: string, size: number): string => {
  if (!config.imageServer) return contentImageId;

  return `${config.imageServer}/2/${encodeURIComponent(contentImageId)}/full/${size},/0/default.jpg`;
};

export const generateImageInfo = async (contentImageId: string): Promise<{ width: number, height: number }> => {
  const infoUrl = `${config.imageServer}/2/${encodeURIComponent(contentImageId)}/info.json`;
  const imageInfo = await fetch(infoUrl);
  const imageJson = await imageInfo.json();
  const height = imageJson['height'];
  const width = imageJson['width'];

  return { height, width };
};
