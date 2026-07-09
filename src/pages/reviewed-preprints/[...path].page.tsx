import Head from 'next/head';
import { type NextRouter, useRouter } from 'next/router';
import { type JSX, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { getServerSideProps, type ServerSideProps } from './get-server-side-props';
import { ErrorMessages } from '../../components/atoms/error-messages/error-messages';
import { ArticlePage, type Tab } from '../../components/pages/article/article-page';
import { ArticleFiguresTab, ArticleFullTextTab, ArticleReviewsTab } from '../../components/pages/article/tabs';
import { config } from '../../config';
import { type SerialisedTimelineEvent, type TimelineEvent } from '../../types';
import {
  contentToText, contentToFigures, contentToJsx, contentToHeadings,
} from '../../utils/content';
import { formatAuthorName } from '../../utils/formatters';
import { makeNullableOptional } from '../../utils/make-nullable-optional';

// ts-unused-exports:disable-next-line
export { getServerSideProps };

const getPublishedDate = (events: TimelineEvent[], currentVersion: number): string | undefined => {
  const publishedEvent = events.find(({ version }) => version === currentVersion);

  if (publishedEvent) {
    const date = new Date(publishedEvent.date);
    return `${date.getUTCFullYear()}/${date.getUTCMonth() + 1}/${date.getUTCDate()}`;
  }

  return undefined;
};

const stringsToDates = (timeline: SerialisedTimelineEvent[]): TimelineEvent[] => timeline.map((event) => ({ ...event, date: new Date(event.date) }));

const getRoutePrefix = (router: NextRouter) => {
  if (router.asPath.startsWith('/previews/')) {
    return '/previews/';
  }

  if (router.asPath.startsWith('/articles/')) {
    return '/articles/';
  }

  return '/reviewed-preprints/';
};

const Page = ({
  metaData,
  citationDoi,
  imgInfo,
  msidWithVersion,
  timeline,
  relatedContent,
  content,
  peerReview,
  metrics,
  previousVersionWarningUrl,
  versionOfRecord,
}: ServerSideProps) => {
  const { t } = useTranslation();
  const processedTimeline = stringsToDates(timeline);

  const processedTimelineWithTranslations = processedTimeline.map(({
    name, version, datePrefix, ...other
  }) => ({
    version,
    ...other,
    ...(name ? {
      name: t(name),
    } : {}),
    ...(datePrefix ? { datePrefix: t(datePrefix) } : {}),
  }));

  const processedTimelineWithDateAsAStringWithTranslations = timeline.map(({
    name, version, datePrefix, ...other
  }) => ({
    version,
    ...other,
    ...(name ? {
      name: t(name),
    } : {}),
    ...(datePrefix ? { datePrefix: t(datePrefix) } : {}),
  }));

  const router = useRouter();
  const routePrefix = getRoutePrefix(router);
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
      content: () => (peerReview ? <ArticleReviewsTab peerReview={peerReview} currentVersion={+metaData.version} versionOfRecord={versionOfRecord} /> : <ErrorMessages/>),
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

  const retractionNoticeUrl = relatedContent.find((item) => (item.type === 'retraction'))?.url;

  return (
    <>
      <Head>
        <title>{contentToText(metaData.title)}</title>
        <meta name="citation_title" content={contentToText(metaData.title)}/>
        <meta name="citation_publisher" content={t('publisher_long')}/>
        <meta name="citation_journal_title" content={t('publisher_short')}/>
        {metaData.volume && <meta name="citation_volume" content={metaData.volume}/>}
        <meta name="citation_id" content={metaData.eLocationId ?? `RP${metaData.msid}`}/>
        <meta name="citation_abstract" content={contentToText(metaData.abstract)}/>
        <meta name="citation_doi" content={citationDoi ?? metaData.doi}/>
        <meta name="citation_publication_date" content={getPublishedDate(processedTimeline, +metaData.version)}/>
        {metaData.pdfUrl && <meta name="citation_pdf_url" content={metaData.pdfUrl}/>}
        <meta name="citation_xml_url" content={metaData.xmlUrl}/>
        <meta name="citation_fulltext_html_url" content={t('reviewed_preprints_url', { msid: metaData.msid })}/>
        <meta name="citation_language" content="en"/>
        { metaData.authors.map((author, index) => <meta key={index} name="citation_author" content={formatAuthorName(author)} />)}
      </Head>
      <ArticlePage
        previousVersionWarningUrl={makeNullableOptional(previousVersionWarningUrl)}
        citationDoi={citationDoi}
        metrics={makeNullableOptional(metrics)}
        relatedContent={processedRelatedContent}
        metaData={metaData}
        msidWithVersion={msidWithVersion}
        tabs={tabs}
        timeline={processedTimelineWithTranslations}
        timelineWithDatesAsAString={processedTimelineWithDateAsAStringWithTranslations}
        activeTab={tabName}
        retractionNoticeUrl={retractionNoticeUrl}
      >
        { tabContent }
      </ArticlePage>
    </>
  );
};

// ts-unused-exports:disable-next-line
export default Page;
