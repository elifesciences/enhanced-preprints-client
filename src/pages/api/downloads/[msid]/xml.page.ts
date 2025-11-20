import { type NextApiRequest, type NextApiResponse } from 'next';
import { fetchVersion } from '../../../../utils/data-fetch';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { msid } = req.query;

  if (typeof msid !== 'string') {
    res.status(400).send('msid must be a string');
    return;
  }

  const articleWithVersions = await fetchVersion(msid);

  if (!articleWithVersions) {
    res.status(404).end();
  }
};
