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
import { fetchVersion, getLatestVersion } from '../../utils/data-fetch';
import { ArticleFiguresTab, ArticleFullTextTab, ArticleReviewsTab } from '../../components/pages/article/tabs';
import { ArticlePage, ArticleStatusProps, Tab } from '../../components/pages/article/article-page';
import {
  contentToText, contentToImgInfo, contentToFigures, contentToJsx, contentToHeadings,
} from '../../utils/content';
import { generateStatus, generateTimeline, generateVersionHistory } from '../../utils/generators';
import { ErrorMessages } from '../../components/atoms/error-messages/error-messages';
import { formatAuthorName } from '../../utils/formatters';
import '../../i18n';
import { isPreprintVersionSummary } from '../../utils/type-guards';
import { makeNullableOptional } from '../../utils/make-nullable-optional';
import { DatesToStrings } from '../../utils/type-converters';
import { Evaluation } from '../../types/peer-review';

type PageProps = {
  metaData: MetaData,
  imgInfo: Record<string, { width: number, height: number }> | null,
  msidWithVersion: string,
  status: ArticleStatusProps,
  timeline: TimelineEvent[],
  relatedContent: RelatedContent[],
  content: Content,
  peerReview: PeerReview | null,
  metrics: Metrics | null,
  previousVersionWarningUrl: string | null,
};

type SerialisedPageProps = DatesToStrings<PageProps>;

const stringsToDatesInEvalauation = (evaluation: DatesToStrings<Evaluation>): Evaluation => ({
  ...evaluation,
  date: new Date(evaluation.date),
});

const getPublishedDate = (events: TimelineEvent[], currentVersion: number): string | undefined => {
  const publishedEvent = events.find(({ version }) => version === currentVersion);

  if (publishedEvent) {
    const date = new Date(publishedEvent.date);
    return `${date.getUTCFullYear()}/${date.getUTCMonth() + 1}/${date.getUTCDate()}`;
  }

  return undefined;
};

const stringsToDates = (props: SerialisedPageProps): PageProps => {
  const timeline = props.timeline.map((event) => ({
    ...event,
    date: new Date(event.date),
  }));

  const peerReview: PeerReview | null = props.peerReview ? {
    evaluationSummary: stringsToDatesInEvalauation(props.peerReview.evaluationSummary),
    reviews: props.peerReview.reviews.map(stringsToDatesInEvalauation),
    authorResponse: props.peerReview.authorResponse ? stringsToDatesInEvalauation(props.peerReview.authorResponse) : undefined,
  } : null;

  return {
    ...props,
    peerReview,
    timeline,
  };
};

export const Page = (props: SerialisedPageProps) => {
  const processedProps = stringsToDates(props);
  const routePrefix = processedProps.status.isPreview ? '/previews/' : '/reviewed-preprints/';
  const tabLinks = [
    {
      id: 'fulltext',
      linkElement: <a href={`${routePrefix}${processedProps.msidWithVersion}#tab-content`}>Full text</a>,
    },
    {
      id: 'figures',
      linkElement: <a href={`${routePrefix}${processedProps.msidWithVersion}/figures#tab-content`}>Figures</a>,
    },
    {
      id: 'reviews',
      linkElement: <a href={`${routePrefix}${processedProps.msidWithVersion}/reviews#tab-content`}>Peer review</a>,
    },
  ];

  const headings = contentToHeadings(processedProps.content);
  const figures = contentToFigures(processedProps.content);

  const subPages: { [key: string]: { tabLinks: Tab[], content: () => JSX.Element } } = {
    fulltext: {
      tabLinks,
      // eslint-disable-next-line max-len
      content: () => <ArticleFullTextTab metrics={processedProps.metrics} headings={headings} content={contentToJsx(processedProps.content)} metaData={processedProps.metaData} peerReview={processedProps.peerReview ?? undefined} peerReviewUrl={`${routePrefix}${processedProps.msidWithVersion}/reviews#tab-content`}></ArticleFullTextTab>,
    },
    figures: {
      tabLinks,
      content: () => <ArticleFiguresTab content={contentToJsx(figures)}></ArticleFiguresTab>,
    },
    reviews: {
      tabLinks,
      content: () => (processedProps.peerReview ? <ArticleReviewsTab peerReview={processedProps.peerReview}></ArticleReviewsTab> : <ErrorMessages/>),
    },
    pdf: {
      tabLinks: [],
      content: () => <>
        <ArticleFullTextTab
          metrics={null}
          headings={headings}
          content={contentToJsx(processedProps.content, { imgInfo: processedProps.imgInfo ?? undefined, removePictureTag: true })}
          metaData={processedProps.metaData}
          peerReview={processedProps.peerReview ?? undefined}
          peerReviewUrl={`${routePrefix}${processedProps.msidWithVersion}/reviews#tab-content`}/>
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
  const relatedContent = processedProps.relatedContent.map((item) => {
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
        <title>{contentToText(processedProps.metaData.title)}</title>
        <meta name="citation_title" content={contentToText(processedProps.metaData.title)}/>
        <meta name="citation_publisher" content={t('publisher_long')}/>
        <meta name="citation_journal_title" content={t('publisher_short')}/>
        <meta name="citation_volume" content={processedProps.metaData.volume}/>
        <meta name="citation_id" content={`RP${processedProps.metaData.msid}`}/>
        <meta name="citation_abstract" content={contentToText(processedProps.metaData.abstract)}/>
        <meta name="citation_doi" content={processedProps.metaData.doi}/>
        <meta name="citation_publication_date" content={getPublishedDate(processedProps.timeline, +processedProps.metaData.version)}/>
        {processedProps.metaData.pdfUrl && <meta name="citation_pdf_url" content={processedProps.metaData.pdfUrl}/>}
        <meta name="citation_fulltext_html_url" content={t('reviewed_preprints_url', { msid: processedProps.metaData.msid })}/>
        <meta name="citation_language" content="en"/>
        { processedProps.metaData.authors.map((author, index) => <meta key={index} name="citation_author" content={formatAuthorName(author)} />)}
      </Head>
      <ArticlePage
        previousVersionWarningUrl={makeNullableOptional(processedProps.previousVersionWarningUrl)}
        metrics={makeNullableOptional(processedProps.metrics)}
        relatedContent={relatedContent}
        metaData={processedProps.metaData}
        msidWithVersion={processedProps.msidWithVersion}
        tabs={tabs}
        status={processedProps.status}
        timeline={processedProps.timeline}
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
  if (latestVersion && latestVersion.versionIdentifier !== articleWithVersions.article.versionIdentifier) {
    previousVersionWarningUrl = isPreprintVersionSummary(latestVersion) ? `/reviewed-preprints/${articleWithVersions.article.msid}` : latestVersion.url;
  }

  const imgInfo = context.req.url?.endsWith('/pdf') ? await contentToImgInfo(articleWithVersions.article.article.content) : null;

  const status = generateStatus(articleWithVersions);
  const timeline = generateTimeline(articleWithVersions);
  const versionHistory = generateVersionHistory(articleWithVersions);

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
        versionHistory,
      },
      imgInfo,
      msidWithVersion: id,
      content: articleWithVersions.article.article.content,
      status: {
        articleType: status.type,
        status: status.status,
        isPreview: status.isPreview,
      },
      timeline,
      relatedContent: articleWithVersions.article.relatedContent ?? [],
      peerReview: articleWithVersions.article.peerReview ?? null, // cast to null because undefined isn't a JSON value
      metrics: articleWithVersions.metrics ?? null,
      previousVersionWarningUrl,
    } as unknown as PageProps,
  };
};

export default Page;
