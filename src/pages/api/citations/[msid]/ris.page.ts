import type { NextApiRequest, NextApiResponse } from 'next';
import { getManuscript, getRppVersionDoi } from '../../../../manuscripts';
import { config } from '../../../../config';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { msid } = req.query;

  if (msid === undefined || typeof msid !== 'string') {
    res.status(404).send(`Cannot find msid configured (${msid})`);
    return;
  }

  const manuscript = getManuscript(config.manuscriptConfigFile, msid);
  const filename = `${msid}.ris`;

  if (manuscript === undefined) {
    const error = `Unable to retrieve citation ${filename}`;
    console.error(error); // eslint-disable-line no-console
    res.status(503).send(error);
    return;
  }

  const doi = getRppVersionDoi(manuscript);
  const extReq = await fetch(
    `${config.apiServer}/api/citations/${doi}/ris`,
  );
  const data = await extReq.text();

  const citation = decodeURI(data);

  if (citation) {
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    res.setHeader('Content-Type', 'application/x-research-info-systems');
    res.status(200).send(citation);
  }
};
