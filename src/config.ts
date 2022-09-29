if (!process.env.API_SERVER && process.env.NEXT_PHASE !== 'phase-production-build') {
  // eslint-disable-next-line no-console
  console.warn('Could not find API_SERVER environment variable');
}

export const config = {
  API_SERVER: process.env.API_SERVER,
  IMAGE_SERVER: process.env.IMAGE_SERVER,
};
