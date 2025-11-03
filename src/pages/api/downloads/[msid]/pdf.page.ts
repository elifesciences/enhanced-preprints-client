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

  res.status(200).end();
};
