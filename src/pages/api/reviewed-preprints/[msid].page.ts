import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchVersion } from '../../../utils/data-fetch';
import {
  errorNotFoundRequest,
  writeResponse,
  enhancedArticleToReviewedPreprintItemResponse,
} from '../reviewed-preprints.page';
import { VersionSummary } from '../../../types';
import { fetchTenantConfigFromRequest } from '../../../utils/data-fetch/fetch-tenant-config';

const serverApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const msid = (Array.isArray(req.query.msid) ? req.query.msid[0] : req.query.msid) ?? '';

  if (msid === '') {
    errorNotFoundRequest(res);
  }

  const tenantConfig = await fetchTenantConfigFromRequest(req);
  if (tenantConfig === false) {
    errorNotFoundRequest(res);
    return;
  }
  const version = await fetchVersion(tenantConfig.id, msid);
  const firstPublished = Object.values(version?.versions || {} as VersionSummary[])
    .reduce((min: null | VersionSummary, v) => ((!min || (min.published && v.published && v.published < min.published)) ? v : min), null);
  if (!version) {
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
