if (!process.env.API_SERVER && process.env.NEXT_PHASE !== 'phase-production-build') {
  // eslint-disable-next-line no-console
  console.warn('Could not find API_SERVER environment variable');
}

export const config = {
  apiServer: process.env.API_SERVER,
  imageServer: process.env.NEXT_PUBLIC_IMAGE_SERVER,
  gtmId: process.env.NEXT_PUBLIC_GTM_ID,
};
