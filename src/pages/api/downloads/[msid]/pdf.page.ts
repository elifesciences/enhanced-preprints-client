import type { NextApiRequest, NextApiResponse } from 'next';
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
    if (!fetched.ok) {
      res.status(502).end();
      return;
    }

    const arrayBuffer = await fetched.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    res.setHeader('Content-Type', fetched.headers.get('content-type') || 'application/pdf');
    res.setHeader('Content-Length', String(buffer.length));
    res.status(200).send('PDFDATA');
  } catch (err) {
    res.status(502).end();
  }
};
