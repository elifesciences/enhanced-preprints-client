if (!process.env.API_SERVER && (process.env.NEXT_PHASE !== 'phase-production-build' && process.env.NODE_ENV !== 'test')) {
  // eslint-disable-next-line no-console
  console.warn('Could not find API_SERVER environment variable');
}

type Config = {
  siteName?: string,
  showPreviews: boolean,
  apiServer?: string,
  iiifServer?: string,
  filesApiPath?: string,
  imageServer?: string,
  gtmId?: string,
  cookiebotId?: string,
  articleCacheAge: string,
  disallowRobots: boolean,
  disableTerms: boolean,
  tenantDomain?: string,
};

export const config: Config = {
  siteName: process.env.NEXT_PUBLIC_SITE_NAME,
  showPreviews: (!!process.env.SHOW_PREVIEWS) || false,
  apiServer: process.env.API_SERVER,
  imageServer: process.env.NEXT_PUBLIC_IMAGE_SERVER,
  filesApiPath: process.env.NEXT_PUBLIC_FILES_API_PATH,
  iiifServer: process.env.IIIF_SERVER,
  gtmId: process.env.NEXT_PUBLIC_GTM_ID,
  cookiebotId: process.env.NEXT_PUBLIC_COOKIEBOT_ID,
  articleCacheAge: process.env.ARTICLE_CACHE_AGE || '1800',
  disallowRobots: !!process.env.DISALLOW_ROBOTS,
  disableTerms: !!process.env.NEXT_PUBLIC_DISABLE_TERMS && ['all', 'true'].includes(process.env.NEXT_PUBLIC_DISABLE_TERMS),
  tenantDomain: process.env.TENANT_DOMAIN,
};
