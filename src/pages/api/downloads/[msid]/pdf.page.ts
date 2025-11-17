import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchVersion } from '../../../../utils/data-fetch';
import { getCanonicalUrl } from '../../../../utils/get-canonical-url';
import { config } from '../../../../config';
import { isVor } from '../../../../utils/is-vor';
import { proxyUrlToResponse } from '../../../../utils/proxy-url-to-response';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { msid } = req.query;

    if (typeof msid !== 'string') {
      res.status(400).send('msid must be a string');
      return;
    }

    const articleWithVersions = await fetchVersion(msid);

    if (!articleWithVersions) {
      res.status(404).end();
      return;
    }

    const pdfUrl = articleWithVersions.article?.pdfUrl;
    if (!pdfUrl) {
      res.status(404).end();
      return;
    }
    const downloadFilename = `${articleWithVersions.article.msid}-v${articleWithVersions.article.versionIdentifier}.pdf`;
    const canonicalUrl = getCanonicalUrl(articleWithVersions.article.msid, isVor(articleWithVersions), config.tenantDomain);

    await proxyUrlToResponse(pdfUrl, res, req, downloadFilename, canonicalUrl);
  } catch (err) {
    if (!res.headersSent) {
      res.status(502).end();
    }
  }
};
