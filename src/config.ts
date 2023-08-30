if (!process.env.API_SERVER && (process.env.NEXT_PHASE !== 'phase-production-build' && process.env.NODE_ENV !== 'test')) {
  // eslint-disable-next-line no-console
  console.warn('Could not find API_SERVER environment variable');
}

type Config = {
  automationFlag: boolean
  showPreviews: boolean
  apiServer?: string,
  imageServer?: string,
  gtmId?: string,
  cookiebotId?: string,
  articleCacheAge: string,
  manuscriptConfigFile: string,
  reviewsConfigFile: string,
  disallowRobots: boolean,
};

export const config: Config = {
  automationFlag: (!!process.env.IS_AUTOMATED) || false,
  showPreviews: (!!process.env.SHOW_PREVIEWS) || false,
  apiServer: process.env.API_SERVER,
  imageServer: process.env.NEXT_PUBLIC_IMAGE_SERVER,
  gtmId: process.env.NEXT_PUBLIC_GTM_ID,
  cookiebotId: process.env.NEXT_PUBLIC_COOKIEBOT_ID,
  articleCacheAge: process.env.ARTICLE_CACHE_AGE || '1800',
  manuscriptConfigFile: process.env.MANUSCRIPT_CONFIG_FILE || './manuscripts.json',
  reviewsConfigFile: process.env.REVIEWS_CONFIG_FILE || './reviews.json',
  disallowRobots: !!process.env.DISALLOW_ROBOTS,
};
