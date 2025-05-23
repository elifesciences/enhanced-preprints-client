import type { NextApiRequest, NextApiResponse } from 'next';
import { config } from '../../../../config';
import { fetchVersion } from '../../../../utils/data-fetch';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const msid = (Array.isArray(req.query.msid) ? req.query.msid[0] : req.query.msid) ?? '';

  const version = await fetchVersion(msid);
  const filename = `${msid}.bib`;

  if (!version) {
    const error = `Unable to retrieve citation ${filename}`;
    console.error(error); // eslint-disable-line no-console
    res.status(503).send(error);
    return;
  }

  const { doi } = version.article;
  const extReq = await fetch(
    `${config.apiServer}/api/citations/${doi}/bibtex`,
  );
  const data = await extReq.text();

  const citation = decodeURI(data);

  if (citation) {
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    res.setHeader('Content-Type', 'application/x-bibtex');
    res.status(200).send(citation);
  }
};
