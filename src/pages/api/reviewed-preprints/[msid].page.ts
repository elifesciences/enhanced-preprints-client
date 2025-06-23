import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchVersion } from '../../../utils/data-fetch';
import {
  errorNotFoundRequest,
  hasPublishedDate,
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
  if (!version) {
    errorNotFoundRequest(res);
    return;
  }

  if (!hasPublishedDate(version.article)) {
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

export default async (req: NextApiRequest, res: NextApiResponse) => serverApi(req, res);
