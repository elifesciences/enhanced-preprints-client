import type { NextApiRequest, NextApiResponse } from 'next';
import { config } from '../../../config';
import { getManuscript } from '../../../manuscripts';
import { Content } from '../../../types/content';
import { MetaData } from '../../../types';
import { contentToHtml } from '../../../utils/content-to-html';
import { jsonFetch } from '../../../utils/json-fetch';
import { errorNotFoundRequest, reviewedPreprintSnippet, writeResponse } from '../reviewed-preprints.page';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { msid } = req.query;

  const manuscript = getManuscript(config.manuscriptConfigFile, (Array.isArray(msid) ? msid[0] : msid) ?? '');

  if (manuscript) {
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
  } else {
    console.log('Cannot find msid configured'); // eslint-disable-line no-console
    errorNotFoundRequest(res);
  }
};
