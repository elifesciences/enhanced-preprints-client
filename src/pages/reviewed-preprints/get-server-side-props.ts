import { type GetServerSideProps, type GetServerSidePropsContext } from 'next';
import { config } from '../../config';
import { type FeaturesData } from '../../features';
import {
  type MetaData,
  type Metrics,
  type PeerReview,
  type RelatedContent,
  type SerialisedTimelineEvent,
  type Content,
} from '../../types';
import { contentToImgInfo } from '../../utils/content';
import { fetchVersion, getLatestVersionWarningUrl } from '../../utils/data-fetch';
import { generateCopyrightYear, generateTimeline, generateVersionHistory } from '../../utils/generators';
import { getPdfUrl } from '../../utils/get-pdf-url';
import { getXmlUrl } from '../../utils/get-xml-url';
import { isVor } from '../../utils/is-vor';
import { isVORVersionSummary } from '../../utils/type-guards';

export type ServerSideProps = {
  siteName?: string,
  metaData: MetaData,
  citationDoi?: string,
  versionOfRecord?: boolean,
  imgInfo: Record<string, { width: number, height: number }> | null,
  msidWithVersion: string,
  timeline: SerialisedTimelineEvent[],
  relatedContent: RelatedContent[],
  content: Content,
  peerReview: PeerReview | null,
  metrics: Metrics | null,
  previousVersionWarningUrl: string | null,
  features: FeaturesData,
};

const constructEnhancedMetaData = (metaData: MetaData, copyrightYear: number) => ({
  ...metaData,
  ...(copyrightYear > 0 ? {
    copyrightYear,
  } : {}),
});

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (context: GetServerSidePropsContext) => {
  if (context.params === undefined || context.params.path === undefined) {
    console.log('no path');
    return { notFound: true };
  }

  const idParts = [...context.params?.path as string[]];

  if (idParts.length >= 2 && ['fulltext', 'figures', 'reviews', 'pdf'].includes(idParts[idParts.length - 1])) idParts.pop();
  const id = idParts.join('/');

  if (id === undefined) {
    console.log('no id in path');
    return { notFound: true };
  }

  context.res.setHeader('Cache-Control', `public, max-age=${config.articleCacheAge}`);

  const articleWithVersions = await fetchVersion(id, config.showPreviews || context.req.url?.startsWith('/previews'));

  if (!articleWithVersions) {
    console.log(`Article version not found (${id})`);
    return { notFound: true };
  }

  const previousVersionWarningUrl = getLatestVersionWarningUrl(articleWithVersions);

  const imgInfo = context.req.url?.endsWith('/pdf') ? await contentToImgInfo(articleWithVersions.article.article.content) : null;

  const versions = Object.values(articleWithVersions.versions);
  const timeline = generateTimeline(versions);
  const copyrightYear = generateCopyrightYear(versions);
  const versionHistory = generateVersionHistory(versions);
  const versionOfRecord = isVor(articleWithVersions);

  const pdfUrl = (config.siteName === 'elife' || articleWithVersions.article.pdfUrl) ? getPdfUrl(id, versionOfRecord, config.tenantDomain) : null;

  const xmlUrl = getXmlUrl(id, versionOfRecord, config.tenantDomain);

  const metaData: MetaData = {
    ...articleWithVersions.article,
    ...(pdfUrl ? { pdfUrl } : {}),
    xmlUrl,
    ...articleWithVersions.article.article,
    authors: articleWithVersions.article.article.authors || [],
    msas: articleWithVersions.article.subjects || [],
    version: articleWithVersions.article.versionIdentifier,
    versionHistory,
    authorNotes: articleWithVersions.article.article.meta?.authorNotes || [],
  };

  const citationDoi = Object.values(versions).filter((version) => isVORVersionSummary(version)).map(({ doi }) => doi).find((doi) => doi) || articleWithVersions.article.doi;

  // Redirect VOR articles from reviewed-preprints to articles path.
  if (versionOfRecord && context.req.url?.startsWith('/reviewed-preprints/')) {
    const redirectUrl = context.req.url?.replace('/reviewed-preprints/', '/articles/') || `/articles/${id}`;
    console.log(`Redirect to ${redirectUrl}`);
    return {
      redirect: {
        destination: redirectUrl,
        permanent: false,
      },
    };
  }

  // Redirect Reviewed Preprints from articles to reviewed-preprints path.
  if (!versionOfRecord && context.req.url?.startsWith('/articles/')) {
    const redirectUrl = context.req.url?.replace('/articles/', '/reviewed-preprints/') || `/reviewed-preprints/${id}`;
    console.log(`Redirect to ${redirectUrl}`);
    return {
      redirect: {
        destination: redirectUrl,
        permanent: false,
      },
    };
  }

  const articlePageProps = {
    siteName: articleWithVersions.siteName ?? config.siteName,
    metaData: constructEnhancedMetaData(metaData, copyrightYear),
    citationDoi,
    versionOfRecord,
    imgInfo,
    msidWithVersion: id,
    content: articleWithVersions.article.article.content,
    timeline,
    relatedContent: articleWithVersions.article.relatedContent ?? [],
    peerReview: articleWithVersions.article.peerReview ?? null, // cast to null because undefined isn't a JSON value
    metrics: articleWithVersions.metrics ?? null,
    previousVersionWarningUrl,
    features: {
      showElifeTerms: !config.disableTerms,
    },
  };

  return {
    props: articlePageProps,
  };
};
