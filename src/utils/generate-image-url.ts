import { config } from '../config';

export const generateImageUrl = (contentUrl: string): string => (config.imageServer ? `${config.imageServer}/2/${encodeURIComponent(contentUrl)}/full/max/0/default.jpg` : contentUrl);

export const generateImageUrlSized = (contentUrl: string, size: number): string => {
  if (!config.imageServer) return contentUrl;

  return `${config.imageServer}/2/${encodeURIComponent(contentUrl)}/full/${size},/0/default.jpg`;
};
