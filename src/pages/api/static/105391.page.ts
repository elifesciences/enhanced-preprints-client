import type { NextApiRequest, NextApiResponse } from 'next';
import { getHtml } from './105391.html';

// ts-unused-exports:disable-next-line
export default (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(getHtml()); };
