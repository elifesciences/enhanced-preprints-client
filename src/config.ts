if (!process.env.API_SERVER && process.env.NEXT_PHASE !== 'phase-production-build') {
  throw Error('Could not find API_SERVER environment variable');
}

export const config = {
  API_SERVER: process.env.API_SERVER,
};
