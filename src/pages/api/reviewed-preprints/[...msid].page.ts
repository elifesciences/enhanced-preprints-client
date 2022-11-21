import type { NextApiRequest, NextApiResponse } from 'next';
import { config } from '../../../config';
import { manuscripts } from '../../../manuscripts';
import { Content } from '../../../types/content';
import { jsonFetch } from '../../../utils/json-fetch';
import { MetaData } from '../../../types';
import { reviewedPreprintSnippet, writeResponse } from '../reviewed-preprints.page';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const msidFound = req.url.match(/\/(?<msid>[0-9]+)$/);
  const msid = msidFound ? msidFound.groups.msid : null;

  if (msid === null || !manuscripts[msid]) {
    console.log('Cannot find msid configured'); // eslint-disable-line no-console
    return { notFound: true };
  }

  const manuscript = manuscripts[msid];

  const [metaData, content] = await Promise.all([
    jsonFetch<MetaData>(`${config.apiServer}/api/reviewed-preprints/${manuscript.preprintDoi}/metadata`),
    jsonFetch<Content>(`${config.apiServer}/api/reviewed-preprints/${manuscript.preprintDoi}/content`),
  ]);

  writeResponse(
    res,
    'application/vnd.elife.reviewed-preprint-item+json; version=1',
    200,
    reviewedPreprintSnippet(metaData, manuscript)
  );
};
