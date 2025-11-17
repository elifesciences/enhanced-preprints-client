import { type IncomingHttpHeaders } from 'node:http';
import { type NextApiRequest, type NextApiResponse } from 'next';

export const proxyUrlToResponse = async (url: string, res: NextApiResponse, req: NextApiRequest): Promise<Response> => {
  const requestHeaders: IncomingHttpHeaders = req.headers;
  const headers: Record<string, string> = {};
  const whitelistedRequestsHeaders = [
    'accept',
    'cache-control',
    'if-modified-since',
    'if-none-match',
    'referer',
  ];

  Object.entries(requestHeaders)
    .filter(([key]) => whitelistedRequestsHeaders.includes(key))
    .forEach(([key, value]) => {
      if (typeof value === 'string') {
        headers[key] = value;
      }
    });
  const requestInit: RequestInit = { headers };
  const fetched = await fetch(url, requestInit);

  return fetched;
};
