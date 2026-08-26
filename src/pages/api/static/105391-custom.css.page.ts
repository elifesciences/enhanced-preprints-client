import fs from 'fs';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';

// ts-unused-exports:disable-next-line
export default (req: NextApiRequest, res: NextApiResponse) => {
  const css = fs.readFileSync(path.join(process.cwd(), 'src/pages/api/static/105391-custom.css'), 'utf8');
  res.setHeader('Content-Type', 'text/css');
  res.status(200).send(css);
};
