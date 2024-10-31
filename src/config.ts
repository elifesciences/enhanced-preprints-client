import { StaticImageData } from 'next/image';

if (!process.env.API_SERVER && (process.env.NEXT_PHASE !== 'phase-production-build' && process.env.NODE_ENV !== 'test')) {
  // eslint-disable-next-line no-console
  console.warn('Could not find API_SERVER environment variable');
}

type Config = {
  showPreviews: boolean
  apiServer?: string,
  iiifServer?: string,
  imageServer?: string,
  gtmId?: string,
  cookiebotId?: string,
  articleCacheAge: string,
  disallowRobots: boolean,
};

export type TenantConfig = {
  id: string,
  layout: string,
  i18nNamespace: string,
  logo: string | StaticImageData,
  colors: {
    primary: string,
    primaryDark: string,
  }
};

export type TenantConfiguredPageProps = {
  tenantConfig: TenantConfig
};

export const config: Config = {
  showPreviews: (!!process.env.SHOW_PREVIEWS) || false,
  apiServer: process.env.API_SERVER,
  imageServer: process.env.NEXT_PUBLIC_IMAGE_SERVER,
  iiifServer: process.env.IIIF_SERVER,
  gtmId: process.env.NEXT_PUBLIC_GTM_ID,
  cookiebotId: process.env.NEXT_PUBLIC_COOKIEBOT_ID,
  articleCacheAge: process.env.ARTICLE_CACHE_AGE || '1800',
  disallowRobots: !!process.env.DISALLOW_ROBOTS,
};
