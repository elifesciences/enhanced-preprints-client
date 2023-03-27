import type { NextApiRequest, NextApiResponse } from 'next';
import { getManuscript, getRppDoi } from '../../../../manuscripts';
import { config } from '../../../../config';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { msid } = req.query;

  if (msid !== undefined && typeof msid === 'string') {
    const manuscript = getManuscript(config.manuscriptConfigFile, msid);

    if (manuscript !== undefined) {
      const doi = getRppDoi(manuscript);
      const filename = `${msid}.bib`;

      const extReq = await fetch(
        `${config.apiServer}/api/citations/${doi}/bibtex`,
      );
      const data = await extReq.text();

      const citation = decodeURI(data);

      if (citation) {
        res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
        res.setHeader('Content-Type', 'application/x-bibtex');
        res.status(200).send(citation);
      } else {
        const error = `Unable to retrieve citation ${filename}`;
        console.error(error); // eslint-disable-line no-console
        res.status(503).send(error);
      }
    } else {
      res.status(404).send(`Cannot find msid configured (${msid})`);
    }
  }
};
