import type { NextApiRequest, NextApiResponse } from 'next';
import { config } from '../../../config';
import { getManuscript } from '../../../manuscripts';
import { contentToHtml } from '../../../utils/content-to-html';
import { fetchContent, fetchMetadata, fetchVersion } from '../../../utils/fetch-data';
import {
  errorNotFoundRequest,
  prepareAuthor,
  reviewedPreprintSnippet,
  writeResponse,
  enhancedArticleToReviewedPreprintItemResponse,
} from '../reviewed-preprints.page';
import { VersionSummary } from '../../../types';

const serverApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const msid = (Array.isArray(req.query.msid) ? req.query.msid[0] : req.query.msid) ?? '';

  if (msid === '') {
    errorNotFoundRequest(res);
  }

  const version = await fetchVersion(msid);
  const firstPublished = Object.values(version?.versions || {} as VersionSummary[])
    .reduce((min: null | VersionSummary, v) => ((!min || (min.published && v.published && v.published < min.published)) ? v : min), null);
  if (!version || version === null) {
    errorNotFoundRequest(res);
    return;
  }

  writeResponse(
    res,
    'application/vnd.elife.reviewed-preprint+json; version=1',
    200,
    enhancedArticleToReviewedPreprintItemResponse(version.article, firstPublished?.published ?? null),
  );
};

const manuscriptApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const { msid } = req.query;

  const manuscript = getManuscript(config.manuscriptConfigFile, (Array.isArray(msid) ? msid[0] : msid) ?? '');

  if (manuscript) {
    const [metaData, content] = await Promise.all([
      fetchMetadata(`${msid}/v${manuscript.version}`),
      fetchContent(`${msid}/v${manuscript.version}`),
    ]);

    writeResponse(
      res,
      'application/vnd.elife.reviewed-preprint+json; version=1',
      200,
      { ...reviewedPreprintSnippet(manuscript, metaData), indexContent: `${metaData.authors.map((author) => prepareAuthor(author)).join(', ')} ${contentToHtml(content)}` },
    );
  } else {
    console.log('Cannot find msid configured'); // eslint-disable-line no-console
    errorNotFoundRequest(res);
  }
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (config.automationFlag) {
    return serverApi(req, res);
  }

  return manuscriptApi(req, res);
};
