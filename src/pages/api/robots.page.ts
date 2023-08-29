import type { NextApiRequest, NextApiResponse } from 'next';
import { config } from '../../config';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const disallowList = [
    'Disallow: /previews/',
    'Disallow: /preview/',
  ];

  if (config.disallowRobots) {
    disallowList.push('Disallow /');
  }
  res.send(`
# https://www.robotstxt.org/robotstxt.html
User-agent: *
${disallowList.join('\n')}`);
};
