import type { NextApiRequest, NextApiResponse } from 'next';
import { config } from '../../../config';
import { getManuscripts } from '../../../manuscripts';
import { Content } from '../../../types/content';
import { MetaData } from '../../../types';
import { contentToHtml } from '../../../utils/content-to-html';
import { jsonFetch } from '../../../utils/json-fetch';
import { errorNotFoundRequest, reviewedPreprintSnippet, writeResponse } from '../reviewed-preprints.page';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const msidFound = req.url?.match(/\/(?<msid>[A-z0-9]+)$/);
  const msid = msidFound ? msidFound.groups?.msid : null;

  const manuscripts = getManuscripts(config.manuscriptConfigFile);

  if (typeof msid !== 'string' || !manuscripts[msid]) {
    console.log('Cannot find msid configured'); // eslint-disable-line no-console
    errorNotFoundRequest(res);
  } else {
    const manuscript = manuscripts[msid];

    const [metaData, content] = await Promise.all([
      jsonFetch<MetaData>(`${config.apiServer}/api/reviewed-preprints/${manuscript.preprintDoi}/metadata`),
      jsonFetch<Content>(`${config.apiServer}/api/reviewed-preprints/${manuscript.preprintDoi}/content`),
    ]);

    writeResponse(
      res,
      'application/vnd.elife.reviewed-preprint-item+json; version=1',
      200,
      { ...reviewedPreprintSnippet(manuscript, metaData), indexContent: contentToHtml(content) },
    );
  }
};
