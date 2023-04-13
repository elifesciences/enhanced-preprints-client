import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { config } from '../../../config';
import { getManuscript } from '../../../manuscripts';
import { Content } from '../../../types/content';
import { jsonFetch } from '../../../utils/json-fetch';
import { MetaData, PeerReview } from '../../../types';
import { ArticleFullTextTab } from '../../../components/pages/article/tabs/fulltext-tab';
import { ArticlePage, ArticleStatusProps } from '../../../components/pages/article/article-page';
import { contentToText } from '../../../utils/content-to-text';
import { ArticleReviewsTab } from '../../../components/pages/article/tabs';

type PageProps = {
  metaData: MetaData,
  status: ArticleStatusProps,
  content: Content,
  peerReview: PeerReview,
};

export const Page = (props: PageProps): JSX.Element => (
  <>
  <Head>
    <title>{contentToText(props.metaData.title)}</title>
  </Head>
  <ArticlePage metaData={props.metaData} status={props.status} tabs={[]} activeTab="">
    <>
      <ArticleFullTextTab content={props.content} metaData={props.metaData} peerReview={props.peerReview}></ArticleFullTextTab>
      <ArticleReviewsTab peerReview={props.peerReview}></ArticleReviewsTab>
    </>
  </ArticlePage>
  </>
);

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

  const { version } = manuscriptConfig;
  const [metaData, content, peerReview, status] = await Promise.all([
    jsonFetch<MetaData>(`${config.apiServer}/api/reviewed-preprints/${msid}/v${version}/metadata`),
    jsonFetch<Content>(`${config.apiServer}/api/reviewed-preprints/${msid}/v${version}/content`),
    jsonFetch<PeerReview>(`${config.apiServer}/api/reviewed-preprints/${msid}/v${version}/reviews`),
    // replace with call for data
    manuscriptConfig.status,
  ]);

  context.res.setHeader('Cache-Control', `public, max-age=${config.articleCacheAge}`);

  return {
    props: {
      metaData: {
        ...metaData,
        msid: manuscriptConfig.msid,
        version: manuscriptConfig.version,
        pdfUrl: manuscriptConfig.pdfUrl,
        msas: manuscriptConfig.msas,
        publishedYear: manuscriptConfig.publishedYear,
      },
      content,
      status,
      peerReview,
    },
  };
};

export default Page;
