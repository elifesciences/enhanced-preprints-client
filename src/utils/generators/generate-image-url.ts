import { config } from '../../config';

const generateLegacyImageUrl = (contentImageId: string): string => (config.imageServer ? `${config.imageServer}/2/${encodeURIComponent(contentImageId)}/full/max/0/default.jpg` : contentImageId);

const generateLegacyImageUrlSized = (contentImageId: string, size: number): string => {
  if (!config.imageServer) return contentImageId;

  return `${config.imageServer}/2/${encodeURIComponent(contentImageId)}/full/${size},/0/default.jpg`;
};

const generateLegacyImageInfo = async (contentImageId: string): Promise<{ width: number, height: number }> => {
  const infoUrl = `${config.iiifServer}/2/${encodeURIComponent(contentImageId)}/info.json`;
  const imageInfo = await fetch(infoUrl);
  if (!imageInfo.ok) {
    throw Error(`Image info fetch failed with status ${imageInfo.status} for ${contentImageId} (${infoUrl})`);
  }
  const imageJson = await imageInfo.json();
  const { height, width } = imageJson;

  return { height, width };
};

// Replaced the above functions with more configurable versions of the same thing.
// Keeping both allows gradual adoption of the new deployment env vars.
export const generateImageUrl = (contentImageId: string): string => {
  if (!config.iiifPublicUrl) {
    return generateLegacyImageUrl(contentImageId);
  }
  return `${config.iiifPublicUrl?.replace(/\/$/, '')}/${encodeURIComponent(contentImageId)}/full/max/0/default.jpg`;
};

export const generateImageUrlSized = (contentImageId: string, size: number): string => {
  if (!config.iiifPublicUrl) {
    return generateLegacyImageUrlSized(contentImageId, size);
  }
  return `${config.iiifPublicUrl?.replace(/\/$/, '')}/${encodeURIComponent(contentImageId)}/full/${size},/0/default.jpg`;
};

export const generateImageInfo = async (contentImageId: string): Promise<{ width: number, height: number }> => {
  if (!config.iiifUrl) {
    return generateLegacyImageInfo(contentImageId);
  }

  const infoUrl = `${config.iiifUrl?.replace(/\/$/, '')}/${encodeURIComponent(contentImageId)}/info.json`;
  const imageInfo = await fetch(infoUrl);
  if (!imageInfo.ok) {
    throw Error(`Image info fetch failed with status ${imageInfo.status} for ${contentImageId} (${infoUrl})`);
  }
  const imageJson = await imageInfo.json();
  const { height, width } = imageJson;

  return { height, width };
};
