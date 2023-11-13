import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { JSX, useMemo } from 'react';
import { config } from '../../config';
import { getManuscript, getRppDoi } from '../../manuscripts';
import { Content, MetaData, PeerReview } from '../../types';
import {
  fetchContent, fetchMetadata, fetchReviews, fetchVersion,
} from '../../utils/fetch-data';
import { ArticleFiguresTab, ArticleFullTextTab, ArticleReviewsTab } from '../../components/pages/article/tabs';
import { ArticlePage, ArticleStatusProps, Tab } from '../../components/pages/article/article-page';
import { contentToText } from '../../utils/content-to-text';
import { TimelineEvent } from '../../components/molecules/timeline/timeline';
import { generateStatus } from '../../utils/generate-article-status';
import { generateTimeline } from '../../utils/generate-timeline';
import { ErrorMessages } from '../../components/atoms/error-messages/error-messages';
import { formatAuthorName } from '../../utils/format-author-name';

type PageProps = {
  metaData: MetaData
  msidWithVersion: string,
  status: ArticleStatusProps,
  content: Content,
  peerReview: PeerReview | null,
};

const getPublishedDate = (events: TimelineEvent[]): string | undefined => {
  const publishedEvent = events.find(({ eventDescription }) => eventDescription?.length);
  if (publishedEvent) {
    const date = new Date(publishedEvent.date);
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
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

  const subPages: { [key: string]: { tabLinks: Tab[], content: () => JSX.Element } } = {
    fulltext: {
      tabLinks,
      content: () => <ArticleFullTextTab content={props.content} metaData={props.metaData} peerReview={props.peerReview ?? undefined} peerReviewUrl={`${routePrefix}${props.msidWithVersion}/reviews#tab-content`}></ArticleFullTextTab>,
    },
    figures: {
      tabLinks,
      content: () => <ArticleFiguresTab content={props.content}></ArticleFiguresTab>,
    },
    reviews: {
      tabLinks,
      content: () => (props.peerReview ? <ArticleReviewsTab peerReview={props.peerReview}></ArticleReviewsTab> : <ErrorMessages/>),
    },
    pdf: {
      tabLinks: [],
      content: () => (<>
        {subPages.fulltext.content()}
        {subPages.reviews.content()}
      </>),
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
  return (
    <>
      <Head>
        <title>{contentToText(props.metaData.title)}</title>
        <meta name="citation_title" content={contentToText(props.metaData.title)}/>
        <meta name="citation_publisher" content="eLife Sciences Publications Limited"/>
        <meta name="citation_journal_title" content="eLife"/>
        <meta name="citation_volume" content={props.metaData.volume}/>
        <meta name="citation_id" content={`RP${props.metaData.msid}`}/>
        <meta name="citation_abstract" content={contentToText(props.metaData.abstract)}/>
        <meta name="citation_doi" content={getRppDoi(props.metaData)}/>
        <meta name="citation_publication_date" content={getPublishedDate(props.status.timeline)}/>
        <meta name="citation_pdf_url" content={props.metaData.pdfUrl}/>
        <meta name="citation_fulltext_html_url" content={`https://elifesciences.org/reviewed-preprints/${props.metaData.msid}`}/>
        <meta name="citation_language" content="en"/>
        { props.metaData.authors.map((author, index) => <meta key={index} name="citation_author" content={formatAuthorName(author)} />)}
      </Head>
      <ArticlePage metaData={props.metaData} msidWithVersion={props.msidWithVersion} tabs={tabs} status={props.status} activeTab={tabName}>
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

  // FEATURE FLAG
  if (config.automationFlag) {
    const articleWithVersions = await fetchVersion(id, config.showPreviews || context.req.url?.startsWith('/previews'));

    if (!articleWithVersions) {
      console.log(`Article version not found (${id})`); // eslint-disable-line no-console
      return { notFound: true };
    }

    const status = generateStatus(articleWithVersions);
    const timeline = generateTimeline(articleWithVersions);

    return {
      props: {
        metaData: {
          ...articleWithVersions.article,
          ...articleWithVersions.article.article,
          authors: articleWithVersions.article.article.authors || [],
          msas: articleWithVersions.article.subjects || [],
          version: articleWithVersions.article.versionIdentifier,
        },
        msidWithVersion: id,
        content: articleWithVersions.article.article.content,
        status: {
          articleType: status.type,
          status: status.type === 'Reviewed Preprint' ? 'Published from the original preprint after peer review and assessment by eLife.' : 'Revised by authors after peer review.',
          timeline,
          isPreview: status.isPreview,
        },
        peerReview: articleWithVersions.article.peerReview ?? null, // cast to null because undefined isn't a JSON value
      },
    };
  }

  const manuscriptConfig = getManuscript(config.manuscriptConfigFile, id);

  if (manuscriptConfig === undefined) {
    console.log(`Cannot find msid '${id}' configured`); // eslint-disable-line no-console
    return { notFound: true };
  }

  const [metaData, content, peerReview, status] = await Promise.all([
    fetchMetadata(`${manuscriptConfig.msid}/v${manuscriptConfig.version}`),
    fetchContent(`${manuscriptConfig.msid}/v${manuscriptConfig.version}`),
    fetchReviews(`${manuscriptConfig.msid}/v${manuscriptConfig.version}`),
    manuscriptConfig.status,
  ]);

  return {
    props: {
      metaData: {
        ...metaData,
        ...manuscriptConfig.pdfUrl ? { pdfUrl: manuscriptConfig.pdfUrl } : {},
        msid: manuscriptConfig.msid,
        version: manuscriptConfig.version,
        msas: manuscriptConfig.msas,
        publishedYear: manuscriptConfig.publishedYear,
        volume: `${manuscriptConfig.publishedYear - 2011}`,
        eLocationId: `RP${manuscriptConfig.msid}`,
        license: manuscriptConfig.license || 'https://creativecommons.org/licenses/by/4.0/',
      },
      msidWithVersion: id,
      content,
      status: {
        ...status,
        isPreview: false,
      },
      peerReview,
    },
  };
};

export default Page;
