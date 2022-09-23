
if (!process.env.API_SERVER) {
  throw Error('Could not find API_SERVER environment variable');
}

export const config = {
  API_SERVER: process.env.API_SERVER,
};
