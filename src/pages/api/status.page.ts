import type { NextApiRequest, NextApiResponse } from 'next';
import { config } from '../../config';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const status = {
    code: 200,
    status: 'OK',
    preprints: 0,
    statusItems: { summariesApi: true },
  };

  const summaries = await fetch(`${config.apiServer}/api/preprints`).then((response) => response.json()).catch((error) => error);

  if (summaries?.items?.length >= 0) {
    status.preprints = summaries.items.length;
    status.statusItems.summariesApi = true;
  } else {
    status.statusItems.summariesApi = false;
  }

  res.status(status.code).json(status);
};
