import type { NextApiHandler } from 'next';
import { config } from '../../config';

type StatusResponse = {
  code: number;
  status: string;
  preprints: number;
  statusItems: { summariesApi: boolean };
};

const handler: NextApiHandler<StatusResponse> = async (req, res) => {
  const status: StatusResponse = {
    code: 200,
    status: 'OK',
    preprints: 0,
    statusItems: { summariesApi: true },
  };

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  const summaries = await fetch(`${config.apiServer}/api/preprints`).then((response) => response.json()).catch((error) => error);

  if (summaries?.items?.length >= 0) {
    status.preprints = summaries.items.length;
    status.statusItems.summariesApi = true;
  } else {
    status.statusItems.summariesApi = false;
  }

  res.status(status.code).json(status);
};

// ts-unused-exports:disable-next-line
export default handler;
