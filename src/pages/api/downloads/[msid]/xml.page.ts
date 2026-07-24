import { type NextApiRequest, type NextApiResponse } from 'next';
import { config } from '../../../../config';
import { fetchVersion } from '../../../../fetch-data';
import { generateArticleXmlUri } from '../../../../utils/generators/generate-article-xml-uri';
import { getCanonicalUrl } from '../../../../utils/get-canonical-url';
import { isVor } from '../../../../utils/is-vor';
import { proxyUrlToResponse } from '../../../../utils/proxy-url-to-response';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { msid } = req.query;

  try {
    if (typeof msid !== 'string') {
      res.status(400).send('msid must be a string');
      return;
    }

    const articleWithVersions = await fetchVersion(msid);

    if (!articleWithVersions) {
      res.status(404).end();
      return;
    }

    const downloadFilename = `${articleWithVersions.article.msid}-v${articleWithVersions.article.versionIdentifier}.xml`;
    const canonicalUrl = getCanonicalUrl(articleWithVersions.article.msid, isVor(articleWithVersions), config.tenantDomain);
    const upstreamXmlUrl = generateArticleXmlUri(articleWithVersions.article.msid, articleWithVersions.article.versionIdentifier);

    await proxyUrlToResponse(upstreamXmlUrl, req, res, downloadFilename, canonicalUrl);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    res.status(502).send('Gateway Error');
  }
};
