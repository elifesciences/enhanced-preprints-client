import type { NextApiRequest, NextApiResponse } from 'next';
// ts-unused-exports:disable-next-line
export default (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(`<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta charset="utf-8" />
    <title>105391 Claims Tree</title>
  </head>
  <body>
    <h1>105391 Claims Tree</h1>
  </body>
</html>
`); };
