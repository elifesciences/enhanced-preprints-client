import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { JSX, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { config } from '../../config';
import {
  Content,
  MetaData,
  PeerReview,
  RelatedContent,
} from '../../types';
import { fetchVersion } from '../../utils/fetch-data';
import { ArticleFiguresTab, ArticleFullTextTab, ArticleReviewsTab } from '../../components/pages/article/tabs';
import { ArticlePage, ArticleStatusProps, Tab } from '../../components/pages/article/article-page';
import { contentToText } from '../../utils/content-to-text';
import { TimelineEvent } from '../../components/molecules/timeline/timeline';
import { generateStatus } from '../../utils/generate-article-status';
import { generateTimeline } from '../../utils/generate-timeline';
import { ErrorMessages } from '../../components/atoms/error-messages/error-messages';
import { formatAuthorName } from '../../utils/format-author-name';
import { contentToFigures } from '../../utils/content-to-figures';
import { contentToJsx } from '../../utils/content-to-jsx';
import { contentToHeadings } from '../../utils/content-to-headings';
import { contentToImgInfo } from '../../utils/content-to-img-info';
import '../../i18n';
import { Metrics, isPreprintVersionSummary } from '../../types/enhanced-article';
import { getLatestVersion } from '../../utils/get-latest-version';

type PageProps = {
  metaData: MetaData,
  imgInfo: Record<string, { width: number, height: number }> | null,
  msidWithVersion: string,
  status: ArticleStatusProps,
  relatedContent: RelatedContent[],
  content: Content,
  peerReview: PeerReview | null,
  metrics: Metrics | null,
  previousVersionWarningUrl: string | null,
};

const getPublishedDate = (events: TimelineEvent[]): string | undefined => {
  const publishedEvent = events.find(({ eventDescription }) => eventDescription?.length);
  if (publishedEvent) {
    const date = new Date(publishedEvent.date);
    return `${date.getUTCFullYear()}/${date.getUTCMonth() + 1}/${date.getUTCDate()}`;
  }

  return undefined;
};

export const Page = (props: PageProps) => {
  const routePrefix = props.status.isPreview ? '/previews/' : '/reviewed-preprints/';
  const tabLinks = [
    {
      id: 'fulltext',
      linkElement: <a href={`${routePrefix}${props.msidWithVersion}#tab-content`}>Full text</a>,
    },
    {
      id: 'figures',
      linkElement: <a href={`${routePrefix}${props.msidWithVersion}/figures#tab-content`}>Figures</a>,
    },
    {
      id: 'reviews',
      linkElement: <a href={`${routePrefix}${props.msidWithVersion}/reviews#tab-content`}>Peer review</a>,
    },
  ];

  const headings = contentToHeadings(props.content);
  const figures = contentToFigures(props.content);

  const subPages: { [key: string]: { tabLinks: Tab[], content: () => JSX.Element } } = {
    fulltext: {
      tabLinks,
      // eslint-disable-next-line max-len
      content: () => <ArticleFullTextTab metrics={props.metrics} headings={headings} content={contentToJsx(props.content)} metaData={props.metaData} peerReview={props.peerReview ?? undefined} peerReviewUrl={`${routePrefix}${props.msidWithVersion}/reviews#tab-content`}></ArticleFullTextTab>,
    },
    figures: {
      tabLinks,
      content: () => <ArticleFiguresTab content={contentToJsx(figures)}></ArticleFiguresTab>,
    },
    reviews: {
      tabLinks,
      content: () => (props.peerReview ? <ArticleReviewsTab peerReview={props.peerReview}></ArticleReviewsTab> : <ErrorMessages/>),
    },
    pdf: {
      tabLinks: [],
      content: () => <>
        <ArticleFullTextTab
          metrics={null}
          headings={headings}
          content={contentToJsx(props.content, { imgInfo: props.imgInfo ?? undefined, removePictureTag: true })}
          metaData={props.metaData}
          peerReview={props.peerReview ?? undefined}
          peerReviewUrl={`${routePrefix}${props.msidWithVersion}/reviews#tab-content`}/>
        {subPages.reviews.content()}
      </>,
    },
  };
  const router = useRouter();
  const tabName = useMemo(
    () => {
      if (Array.isArray(router.query.path)) {
        return subPages[router.query.path.slice(-1)[0]] !== undefined ? router.query.path.slice(-1)[0] : 'fulltext';
      }
      return 'fulltext';
    },
    [router.query.path],
  );
  const { tabLinks: tabs } = subPages[tabName];
  const tabContent = subPages[tabName].content();
  const { t } = useTranslation();
  const relatedContent = props.relatedContent.map((item) => {
    const relatedType = t(`related_type_${item.type}`, { defaultValue: t('related_type_default') });
    return {
      ...item,
      type: t(`related_intro_${item.type}`, {
        type: relatedType,
        defaultValue: t('related_intro'),
      }),
    };
  });
  return (
    <>
      <Head>
        <title>{contentToText(props.metaData.title)}</title>
        <meta name="citation_title" content={contentToText(props.metaData.title)}/>
        <meta name="citation_publisher" content={t('publisher_long')}/>
        <meta name="citation_journal_title" content={t('publisher_short')}/>
        <meta name="citation_volume" content={props.metaData.volume}/>
        <meta name="citation_id" content={`RP${props.metaData.msid}`}/>
        <meta name="citation_abstract" content={contentToText(props.metaData.abstract)}/>
        <meta name="citation_doi" content={props.metaData.doi}/>
        <meta name="citation_publication_date" content={getPublishedDate(props.status.timeline)}/>
        {props.metaData.pdfUrl && <meta name="citation_pdf_url" content={props.metaData.pdfUrl}/>}
        <meta name="citation_fulltext_html_url" content={t('reviewed_preprints_url', { msid: props.metaData.msid })}/>
        <meta name="citation_language" content="en"/>
        { props.metaData.authors.map((author, index) => <meta key={index} name="citation_author" content={formatAuthorName(author)} />)}
      </Head>
      <ArticlePage
        previousVersionWarningUrl={props.previousVersionWarningUrl}
        metrics={props.metrics} relatedContent={relatedContent}
        metaData={props.metaData} msidWithVersion={props.msidWithVersion}
        tabs={tabs} status={props.status}
        activeTab={tabName}
      >
        { tabContent }
      </ArticlePage>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<PageProps> = async (context: GetServerSidePropsContext) => {
  if (context.params === undefined || context.params.path === undefined) {
    console.log('no path'); // eslint-disable-line no-console
    return { notFound: true };
  }

  const idParts = [...context.params?.path as string[]];

  if (idParts.length >= 2 && ['fulltext', 'figures', 'reviews', 'pdf'].includes(idParts[idParts.length - 1])) idParts.pop();
  const id = idParts.join('/');

  if (id === undefined) {
    console.log('no id in path'); // eslint-disable-line no-console
    return { notFound: true };
  }

  context.res.setHeader('Cache-Control', `public, max-age=${config.articleCacheAge}`);

  const articleWithVersions = await fetchVersion(id, config.showPreviews || context.req.url?.startsWith('/previews'));

  if (!articleWithVersions) {
    console.log(`Article version not found (${id})`); // eslint-disable-line no-console
    return { notFound: true };
  }

  const latestVersion = getLatestVersion(articleWithVersions);

  let previousVersionWarningUrl = null;
  if (latestVersion.versionIdentifier !== articleWithVersions.article.versionIdentifier) {
    previousVersionWarningUrl = isPreprintVersionSummary(latestVersion) ? `/reviewed-preprints/${articleWithVersions.article.msid}` : latestVersion.url;
  }

  const imgInfo = context.req.url?.endsWith('/pdf') ? await contentToImgInfo(articleWithVersions.article.article.content) : null;

  const status = generateStatus(articleWithVersions);
  const timeline = generateTimeline(articleWithVersions);

  // This is redundant after server has been updated
  if (status.isPreview && !(config.showPreviews || context.req.url?.startsWith('/previews'))) {
    console.log('Preview requested in non-preview environment'); // eslint-disable-line no-console
    return { notFound: true };
  }

  return {
    props: {
      metaData: {
        ...articleWithVersions.article,
        ...articleWithVersions.article.article,
        authors: articleWithVersions.article.article.authors || [],
        msas: articleWithVersions.article.subjects || [],
        version: articleWithVersions.article.versionIdentifier,
      },
      imgInfo,
      msidWithVersion: id,
      content: articleWithVersions.article.article.content,
      status: {
        articleType: status.type,
        status: status.status,
        timeline,
        isPreview: status.isPreview,
      },
      relatedContent: articleWithVersions.article.relatedContent ?? [],
      peerReview: articleWithVersions.article.peerReview ?? null, // cast to null because undefined isn't a JSON value
      metrics: articleWithVersions.metrics ?? null,
      previousVersionWarningUrl,
    },
  };
};

export default Page;
