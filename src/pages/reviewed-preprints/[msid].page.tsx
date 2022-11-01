import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import {
  ArticlePage,
  ArticleStatusProps,
} from '../../components/pages/article/article-page';
import { config } from '../../config';
import { manuscripts } from '../../manuscripts';
import { Content } from '../../types/content';
import { jsonFetch } from '../../utils/json-fetch';
import { MetaData, PeerReview } from '../../types';

export const Page = (props: { metaData: MetaData, content: Content, status: ArticleStatusProps, peerReview: PeerReview }): JSX.Element => (
  <ArticlePage {...props}></ArticlePage>
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

  if (!manuscripts[msid]) {
    console.log('Cannot find msid configured'); // eslint-disable-line no-console
    return { notFound: true };
  }

  const manuscriptConfig = manuscripts[msid];

  // map msid to preprint doi
  const { preprintDoi } = manuscriptConfig;
  const [metaData, content, peerReview, status] = await Promise.all([
    jsonFetch<MetaData>(`${config.apiServer}/api/reviewed-preprints/${preprintDoi}/metadata`),
    jsonFetch<Content>(`${config.apiServer}/api/reviewed-preprints/${preprintDoi}/content`),
    jsonFetch<PeerReview>(`${config.apiServer}/api/reviewed-preprints/${preprintDoi}/reviews`),
    // replace with call for data
    manuscripts[msid].status,
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
      },
      content,
      status,
      peerReview,
    },
  };
};

export default Page;
