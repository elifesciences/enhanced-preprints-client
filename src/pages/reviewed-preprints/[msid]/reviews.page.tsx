import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { config } from '../../../config';
import { getManuscript, getManuscripts } from '../../../manuscripts';
import { MetaData, PeerReview } from '../../../types';
import { ArticlePage, ArticleStatusProps } from '../../../components/pages/article/article-page';
import { ArticleReviewsTab } from '../../../components/pages/article/tabs/reviews-tab';
import { contentToText } from '../../../utils/content-to-text';
import { fetchMetadata, fetchReviews } from '../../../utils/fetch-data';

type PageProps = {
  metaData: MetaData,
  status: ArticleStatusProps,
  peerReview: PeerReview
};
export const Page = (props: PageProps): JSX.Element => (
  <>
  <Head>
    <title>{contentToText(props.metaData.title)}</title>
  </Head>
  <ArticlePage metaData={props.metaData} status={props.status} activeTab="reviews">
    <ArticleReviewsTab peerReview={props.peerReview}></ArticleReviewsTab>
  </ArticlePage>
  </>
);

export const getStaticPaths: GetStaticPaths = async () => {
  const manuscripts = getManuscripts(config.manuscriptConfigFile);
  const paths = Object.keys(manuscripts)
    .sort()
    .map((msid) => `/reviewed-preprints/${msid}/reviews`);
  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<PageProps> = async (context: GetStaticPropsContext) => {
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

  // map msid to preprint doi
  const { preprintDoi } = manuscriptConfig;
  const [metaData, peerReview, status] = await Promise.all([
    fetchMetadata(preprintDoi),
    fetchReviews(preprintDoi),
    // replace with call for data
    manuscriptConfig.status,
  ]);

  // context.res.setHeader('Cache-Control', `public, max-age=${config.articleCacheAge}`);

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
      status,
      peerReview,
    },
  };
};

export default Page;
