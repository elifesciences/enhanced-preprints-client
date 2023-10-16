import type { NextApiRequest, NextApiResponse } from 'next';
import { config } from '../../../config';
import { getManuscript } from '../../../manuscripts';
import { contentToHtml } from '../../../utils/content-to-html';
import { fetchContent, fetchMetadata } from '../../../utils/fetch-data';
import {
  errorNotFoundRequest,
  prepareAuthor,
  reviewedPreprintSnippet,
  writeResponse,
} from '../reviewed-preprints.page';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { msid } = req.query;

  const manuscript = getManuscript(config.manuscriptConfigFile, (Array.isArray(msid) ? msid[0] : msid) ?? '');

  if (manuscript) {
    const [metaData, content] = await Promise.all([
      fetchMetadata(`${msid}/v${manuscript.version}`),
      fetchContent(`${msid}/v${manuscript.version}`),
    ]);

    writeResponse(
      res,
      'application/vnd.elife.reviewed-preprint-item+json; version=1',
      200,
      { ...reviewedPreprintSnippet(manuscript, metaData), indexContent: `${metaData.authors.map((author) => prepareAuthor(author)).join(', ')} ${contentToHtml(content)}` },
    );
  } else {
    console.log('Cannot find msid configured'); // eslint-disable-line no-console
    errorNotFoundRequest(res);
  }
};
