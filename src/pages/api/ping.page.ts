import type { NextApiRequest, NextApiResponse } from 'next';

// ts-unused-exports:disable-next-line
export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).send('pong');
};
