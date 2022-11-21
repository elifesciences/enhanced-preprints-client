import type { NextApiRequest, NextApiResponse } from 'next';
import { config } from '../../../config';
import { getManuscripts } from '../../../manuscripts';
import { Content } from '../../../types/content';
import { jsonFetch } from '../../../utils/json-fetch';
import { MetaData } from '../../../types';
import { errorNotFoundRequest, reviewedPreprintSnippet, writeResponse } from '../reviewed-preprints.page';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const msidFound = req.url?.match(/\/(?<msid>[A-z0-9]+)$/);
  const msid = msidFound ? msidFound.groups?.msid : null;

  const manuscripts = getManuscripts(config.manuscriptConfigFile);

  if (typeof msid !== 'string' || !manuscripts[msid]) {
    console.log('Cannot find msid configured'); // eslint-disable-line no-console
    errorNotFoundRequest(res);
    return;
  }

  const manuscript = manuscripts[msid];

  const [metaData, content] = await Promise.all([
    jsonFetch<MetaData>(`${config.apiServer}/api/reviewed-preprints/${manuscript.preprintDoi}/metadata`),
    jsonFetch<Content>(`${config.apiServer}/api/reviewed-preprints/${manuscript.preprintDoi}/content`),
  ]);

  const item = reviewedPreprintSnippet(metaData, manuscript);

  writeResponse(
    res,
    'application/vnd.elife.reviewed-preprint-item+json; version=1',
    200,
    // Need to convert content to a string.
    {...item, indexContent: 'content as string' }
  );
};
