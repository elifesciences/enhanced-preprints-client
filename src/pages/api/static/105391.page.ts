import type { NextApiRequest, NextApiResponse } from 'next';

// ts-unused-exports:disable-next-line
export default (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(`<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="utf-8" />
            <title>static 105391</title>
    </head>
    <body>
    <h1>static 105391</h1>
    </body>
    </html>`); };
