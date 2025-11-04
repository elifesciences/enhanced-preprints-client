import type { NextApiRequest, NextApiResponse } from 'next';
import { pipeline } from 'stream/promises';
import { fetchVersion } from '../../../../utils/data-fetch';

export default async (req: NextApiRequest, res: NextApiResponse) => {
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

  try {
    const fetched = await fetch(pdfUrl);
    if (!fetched.ok || !fetched.body) {
      res.status(502).end();
      return;
    }

    res.setHeader('Content-Type', fetched.headers.get('content-type') || 'application/pdf');
    const contentLength = fetched.headers.get('content-length');
    if (contentLength) {
      res.setHeader('Content-Length', contentLength);
    }
    res.status(200);

    // @ts-ignore
    pipeline(fetched.body, res);
  } catch (err) {
    res.status(502).end();
  }
};
