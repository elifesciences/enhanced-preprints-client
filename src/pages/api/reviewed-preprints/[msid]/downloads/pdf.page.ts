import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchVersion } from '../../../../../utils/data-fetch';
import { errorNotFoundRequest } from '../../../reviewed-preprints.page';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const msid = (Array.isArray(req.query.msid) ? req.query.msid[0] : req.query.msid) ?? '';

  const version = await fetchVersion(msid);
  const pdfUrl = version?.article.pdfUrl;

  if (pdfUrl) {
    res.redirect(307, pdfUrl);
  } else {
    errorNotFoundRequest(res);
  }
};
