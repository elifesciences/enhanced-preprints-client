import type { NextApiRequest, NextApiResponse } from 'next';
import { config } from '../../../config';
import { manuscripts } from '../../../manuscripts';
import { Content } from '../../../types/content';
import { jsonFetch } from '../../../utils/json-fetch';
import { MetaData } from '../../../types';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const msidFound = req.url.match(/\/(?<msid>[0-9]+)$/);
  const msid = msidFound ? msidFound.groups.msid : null;

  if (!manuscripts[msid]) {
    console.log('Cannot find msid configured'); // eslint-disable-line no-console
    return { notFound: true };
  }

  const manuscriptConfig = manuscripts[msid];

  // map msid to preprint doi
  const { preprintDoi } = manuscriptConfig;
  const [metaData, content, status] = await Promise.all([
    jsonFetch<MetaData>(`${config.apiServer}/api/reviewed-preprints/${preprintDoi}/metadata`),
    jsonFetch<Content>(`${config.apiServer}/api/reviewed-preprints/${preprintDoi}/content`),
    // replace with call for data
    manuscripts[msid].status,
  ]);

  res.status(200).json(status);
};
