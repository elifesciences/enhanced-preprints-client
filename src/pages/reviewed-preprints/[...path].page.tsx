import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { JSX, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { config } from '../../config';
import {
  Content,
  MetaData,
  Metrics,
  PeerReview,
  RelatedContent,
  TimelineEvent,
} from '../../types';
import { fetchVersion, getLatestVersionWarningUrl } from '../../utils/data-fetch';
import { ArticleFiguresTab, ArticleFullTextTab, ArticleReviewsTab } from '../../components/pages/article/tabs';
import { ArticlePage, Tab } from '../../components/pages/article/article-page';
import {
  contentToText, contentToImgInfo, contentToFigures, contentToJsx, contentToHeadings,
} from '../../utils/content';
import { generateTimeline, generateVersionHistory } from '../../utils/generators';
import { ErrorMessages } from '../../components/atoms/error-messages/error-messages';
import { formatAuthorName } from '../../utils/formatters';
import { makeNullableOptional } from '../../utils/make-nullable-optional';
import { SerialisedTimelineEvent } from '../../types/article-timeline';
import { FeaturesData } from '../../features';

type PageProps = {
  siteName?: string,
  metaData: MetaData,
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

const getPublishedDate = (events: TimelineEvent[], currentVersion: number): string | undefined => {
  const publishedEvent = events.find(({ version }) => version === currentVersion);

  if (publishedEvent) {
    const date = new Date(publishedEvent.date);
    return `${date.getUTCFullYear()}/${date.getUTCMonth() + 1}/${date.getUTCDate()}`;
  }

  return undefined;
};

const stringsToDates = ({ timeline }: { timeline: SerialisedTimelineEvent[] }): TimelineEvent[] => timeline.map((event) => ({ ...event, date: new Date(event.date) }));

export const Page = ({
  metaData: rawMetaData,
  imgInfo,
  msidWithVersion,
  timeline,
  relatedContent,
  content,
  peerReview,
  metrics,
  previousVersionWarningUrl,
}: PageProps) => {
  const { t } = useTranslation();
  const processedTimeline = stringsToDates({ timeline }).map(({ name, datePrefix, ...other }) => ({
    ...other,
    ...(name ? { name: t(name) } : {}),
    ...(datePrefix ? { datePrefix: t(datePrefix) } : {}),
  }));
  const router = useRouter();
  const routePrefix = router.asPath.startsWith('/previews/') ? '/previews/' : '/reviewed-preprints/';
  const tabLinks = [
    {
      id: 'fulltext',
      linkElement: <a href={`${routePrefix}${msidWithVersion}#tab-content`}>Full text</a>,
    },
    {
      id: 'figures',
      linkElement: <a href={`${routePrefix}${msidWithVersion}/figures#tab-content`}>Figures</a>,
    },
    {
      id: 'reviews',
      linkElement: <a href={`${routePrefix}${msidWithVersion}/reviews#tab-content`}>Peer review</a>,
    },
  ];

  const headings = contentToHeadings(content);
  const figures = contentToFigures(content);
  const metaData = {
    ...rawMetaData,
    versionHistory: rawMetaData.versionHistory.map(({ label, version, ...other }) => ({
      ...other,
      label: t(label, {
        version,
      }),
    })),
  };

  const hostedFileMatcher = (path: string) => path.startsWith(`${metaData.msid}/v${metaData.version}/`);

  const subPages: { [key: string]: { tabLinks: Tab[], content: () => JSX.Element } } = {
    fulltext: {
      tabLinks,
      // eslint-disable-next-line max-len
      content: () => <ArticleFullTextTab metrics={metrics} headings={headings} content={contentToJsx(content, { hostedFileMatcher, filesApiPath: `${config.filesApiPath}` })} metaData={metaData} peerReview={peerReview ?? undefined} peerReviewUrl={`${routePrefix}${msidWithVersion}/reviews#tab-content`}></ArticleFullTextTab>,
    },
    figures: {
      tabLinks,
      content: () => <ArticleFiguresTab content={contentToJsx(figures)}></ArticleFiguresTab>,
    },
    reviews: {
      tabLinks,
      content: () => (peerReview ? <ArticleReviewsTab peerReview={peerReview} currentVersion={+metaData.version}/> : <ErrorMessages/>),
    },
    pdf: {
      tabLinks: [],
      content: () => <>
        <ArticleFullTextTab
          metrics={null}
          headings={headings}
          content={contentToJsx(content, { imgInfo: imgInfo ?? undefined, removePictureTag: true })}
          metaData={metaData}
          peerReview={peerReview ?? undefined}
          peerReviewUrl={`${routePrefix}${msidWithVersion}/reviews#tab-content`}/>
        {subPages.reviews.content()}
      </>,
    },
  };
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
  const processedRelatedContent = relatedContent.map((item) => {
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
        <title>{contentToText(metaData.title)}</title>
        <meta name="citation_title" content={contentToText(metaData.title)}/>
        <meta name="citation_publisher" content={t('publisher_long')}/>
        <meta name="citation_journal_title" content={t('publisher_short')}/>
        <meta name="citation_volume" content={metaData.volume}/>
        <meta name="citation_id" content={`RP${metaData.msid}`}/>
        <meta name="citation_abstract" content={contentToText(metaData.abstract)}/>
        <meta name="citation_doi" content={metaData.doi}/>
        <meta name="citation_publication_date" content={getPublishedDate(processedTimeline, +metaData.version)}/>
        {metaData.pdfUrl && <meta name="citation_pdf_url" content={metaData.pdfUrl}/>}
        <meta name="citation_fulltext_html_url" content={t('reviewed_preprints_url', { msid: metaData.msid })}/>
        <meta name="citation_language" content="en"/>
        { metaData.authors.map((author, index) => <meta key={index} name="citation_author" content={formatAuthorName(author)} />)}
      </Head>
      <ArticlePage
        previousVersionWarningUrl={makeNullableOptional(previousVersionWarningUrl)}
        metrics={makeNullableOptional(metrics)}
        relatedContent={processedRelatedContent}
        metaData={metaData}
        msidWithVersion={msidWithVersion}
        tabs={tabs}
        timeline={processedTimeline}
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

  const previousVersionWarningUrl = getLatestVersionWarningUrl(articleWithVersions);

  const imgInfo = context.req.url?.endsWith('/pdf') ? await contentToImgInfo(articleWithVersions.article.article.content) : null;

  const timeline = generateTimeline(articleWithVersions);
  const versionHistory = generateVersionHistory(articleWithVersions);

  return {
    props: {
      siteName: config.siteName,
      metaData: {
        ...articleWithVersions.article,
        ...articleWithVersions.article.article,
        authors: articleWithVersions.article.article.authors || [],
        msas: articleWithVersions.article.subjects || [],
        version: articleWithVersions.article.versionIdentifier,
        versionHistory,
        authorNotes: articleWithVersions.article.article.meta?.authorNotes || [],
      },
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
    },
  };
};

export default Page;
