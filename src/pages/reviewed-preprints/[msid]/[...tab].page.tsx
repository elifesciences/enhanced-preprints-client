import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { config } from '../../../config';
import { getManuscript, getRppDoi } from '../../../manuscripts';
import { Content, MetaData, PeerReview } from '../../../types';
import { fetchContent, fetchMetadata, fetchReviews } from '../../../utils/fetch-data';
import { ArticleFiguresTab, ArticleFullTextTab, ArticleReviewsTab } from '../../../components/pages/article/tabs';
import { ArticlePage, ArticleStatusProps } from '../../../components/pages/article/article-page';
import { contentToText } from '../../../utils/content-to-text';
import { TimelineEvent } from '../../../components/molecules/timeline/timeline';

type PageProps = {
  metaData: MetaData
  msidWithVersion?: string,
  status: ArticleStatusProps,
  content: Content,
  peerReview: PeerReview,
};

const getPublishedDate = (events: TimelineEvent[]): string | undefined => {
  const publishedEvent = events.find(({ name }) => name === 'Reviewed preprint posted');
  if (publishedEvent) {
    const date = new Date(publishedEvent.date);
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  }

  return undefined;
};

export const Page = (props: PageProps): JSX.Element => {
  const tabs: { [key: string]: () => JSX.Element } = {
    fulltext: () => <ArticleFullTextTab content={props.content} metaData={props.metaData} peerReview={props.peerReview}></ArticleFullTextTab>,
    figures: () => <ArticleFiguresTab content={props.content}></ArticleFiguresTab>,
    reviews: () => <ArticleReviewsTab peerReview={props.peerReview}></ArticleReviewsTab>,
    pdf: () => (<>
        <ArticleFullTextTab content={props.content} metaData={props.metaData} peerReview={props.peerReview}></ArticleFullTextTab>
        <ArticleReviewsTab peerReview={props.peerReview}></ArticleReviewsTab>
      </>),
  };
  const router = useRouter();
  const tabName = useMemo(
    () => (router.query.tab?.[0] && tabs[router.query.tab[0]] !== undefined ? router.query.tab[0] : 'fulltext'),
    [router.query.tab],
  );
  const tab = tabs[tabName]();
  return (
    <>
    <Head>
      <title>{contentToText(props.metaData.title)}</title>
      <meta name="citation_title" content={contentToText(props.metaData.title)}/>
      <meta name="citation_publisher" content="eLife Sciences Publications Limited"/>
      <meta name="citation_journal_title" content="eLife"/>
      <meta name="citation_volume" content={(props.metaData.publishedYear - 2011).toString()}/>
      <meta name="citation_id" content={`RP${props.metaData.msid}`}/>
      <meta name="citation_abstract" content={contentToText(props.metaData.abstract)}/>
      <meta name="citation_doi" content={getRppDoi(props.metaData)}/>
      <meta name="citation_publication_date" content={getPublishedDate(props.status.timeline)}/>
      <meta name="citation_pdf_url" content={props.metaData.pdfUrl}/>
      <meta name="citation_fulltext_html_url" content={`https://elifesciences.org/reviewed-preprints/${props.metaData.msid}`}/>
      <meta name="citation_language" content="en"/>
      { props.metaData.authors.map((author, index) => <meta key={index} name="citation_author" content={`${author.familyNames ? author.familyNames?.join(' ') : ''} ${author.givenNames ? author.givenNames?.join(' ') : ''}`.trim()} />)}
    </Head>
    <ArticlePage metaData={props.metaData} msidWithVersion={props.msidWithVersion} tabs={ tabName === 'pdf' ? [] : undefined } status={props.status} activeTab={tabName}>
      { tab }
    </ArticlePage>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const msid = context.params?.msid;
  if (msid === undefined) {
    console.log('no msid in path'); // eslint-disable-line no-console
    return { notFound: true };
  }

  if (Array.isArray(msid)) {
    console.log('multiple ids in path'); // eslint-disable-line no-console
    return { notFound: true };
  }

  const manuscriptConfig = getManuscript(config.manuscriptConfigFile, msid);

  if (manuscriptConfig === undefined) {
    console.log('Cannot find msid configured'); // eslint-disable-line no-console
    return { notFound: true };
  }

  const [metaData, content, peerReview, status] = await Promise.all([
    fetchMetadata(`${manuscriptConfig.msid}/v${manuscriptConfig.version}`),
    fetchContent(`${manuscriptConfig.msid}/v${manuscriptConfig.version}`),
    fetchReviews(`${manuscriptConfig.msid}/v${manuscriptConfig.version}`),
    // replace with call for data
    manuscriptConfig.status,
  ]);

  context.res.setHeader('Cache-Control', `public, max-age=${config.articleCacheAge}`);

  return {
    props: {
      metaData: {
        ...metaData,
        ...manuscriptConfig.pdfUrl ? { pdfUrl: manuscriptConfig.pdfUrl } : {},
        msid: manuscriptConfig.msid,
        version: manuscriptConfig.version,
        msas: manuscriptConfig.msas,
        publishedYear: manuscriptConfig.publishedYear,
      },
      msidWithVersion: msid,
      content,
      status,
      peerReview,
    },
  };
};

export default Page;
