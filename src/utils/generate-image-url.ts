import { config } from '../config';

export const generateImageUrl = (contentUrl: string): string => (config.imageServer ? `${config.imageServer}/2/${encodeURIComponent(contentUrl)}/full/1024,/0/default.jpg` : contentUrl);
