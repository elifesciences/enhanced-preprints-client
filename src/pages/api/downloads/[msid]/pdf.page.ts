import type { NextApiRequest, NextApiResponse } from 'next';
import { Readable } from 'stream';
import { pipeline } from 'stream/promises';
import type { ReadableStream } from 'stream/web';
import { type IncomingHttpHeaders } from 'node:http';
import { fetchVersion } from '../../../../utils/data-fetch';
import { i18n } from '../../../../i18n';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { msid } = req.query;

    if (typeof msid !== 'string') {
      res.status(400).send('msid must be a string');
      return;
    }

    const version = await fetchVersion(msid);

    if (!version) {
      res.status(404).end();
      return;
    }

    const pdfUrl = version.article?.pdfUrl;
    if (!pdfUrl) {
      res.status(404).end();
      return;
    }

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
    const fetched = await fetch(pdfUrl, requestInit);
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
    res.setHeader('Content-Disposition', `attachment; filename="${version.article.msid}-v${version.article.versionIdentifier}.pdf"`);
    res.setHeader('Link', `<${i18n.t('canonical_url', { msid: version.article.msid })}>; rel="canonical"`);
    res.status(200);

    await pipeline(Readable.fromWeb(fetched.body as ReadableStream), res);
  } catch (err) {
    if (!res.headersSent) {
      res.status(502).end();
    }
  }
};
