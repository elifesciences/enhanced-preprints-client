import { type IncomingHttpHeaders } from 'node:http';
import { type NextApiRequest, type NextApiResponse } from 'next';
import { pipeline } from 'stream/promises';
import { Readable } from 'stream';
import type { ReadableStream } from 'stream/web';

export const proxyUrlToResponse = async (
  url: string,
  res: NextApiResponse,
  req: NextApiRequest,
  contentDispositionFilename: string,
  canonicalUrl: string,
) => {
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
  if (!fetched.ok || !fetched.body) {
    res.status(502).end();
    return;
  }

  res.setHeader('Content-Type', fetched.headers.get('content-type') || 'application/pdf');
  const contentLength = fetched.headers.get('content-length');
  if (contentLength) {
    res.setHeader('Content-Length', contentLength);
  }
  const whitelistedResponseHeaders = [
    'etag',
    'last-modified',
    'cache-control',
    'date',
    'expires',
    'vary',
  ];

  Array.from(fetched.headers.entries())
    .filter(([key]) => whitelistedResponseHeaders.includes(key))
    .forEach(([key, value]) => res.setHeader(key, value));
  res.setHeader('Content-Disposition', `attachment; filename="${contentDispositionFilename}"`);
  res.setHeader('Link', `<${canonicalUrl}>; rel="canonical"`);
  res.status(200);

  await pipeline(Readable.fromWeb(fetched.body as ReadableStream), res);
};
