import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { config } from '../../config';
import { Content } from '../../types/content';
import { jsonFetch } from '../../utils/json-fetch';
import { MetaData, PeerReview } from '../../types';
import { ArticleFullTextTab } from '../../components/pages/article/tabs/fulltext-tab';
import { ArticlePage, ArticleStatusProps } from '../../components/pages/article/article-page';

type PageProps = {
  metaData: MetaData,
  status: ArticleStatusProps,
  content: Content,
  peerReview: PeerReview,
};

export const Page = (props: PageProps): JSX.Element => (
  <ArticlePage metaData={props.metaData} status={props.status} activeTab="fulltext">
    <ArticleFullTextTab content={props.content} metaData={props.metaData} peerReview={props.peerReview}></ArticleFullTextTab>
  </ArticlePage>
);

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const doiParts = context.params?.doi;
  if (doiParts === undefined) {
    console.log('no doi in path'); // eslint-disable-line no-console
    return { notFound: true };
  }

  if (!Array.isArray(doiParts)) {
    console.log('need multiple ids in path'); // eslint-disable-line no-console
    return { notFound: true };
  }

  if (doiParts.length === 3) {
    const tab = doiParts.pop();
  }

  if (doiParts.length !== 2) {
    console.log('doi not in two parts'); // eslint-disable-line no-console
    return { notFound: true };
  }

  const doi = doiParts.join('/');

  // map msid to preprint doi
  const [metaData, content] = await Promise.all([
    jsonFetch<MetaData>(`${config.apiServer}/api/reviewed-preprints/${doi}/metadata`),
    jsonFetch<Content>(`${config.apiServer}/api/reviewed-preprints/${doi}/content`),
  ]);

  context.res.setHeader('Cache-Control', `public, max-age=${config.articleCacheAge}`);

  return {
    props: {
      metaData: {
        ...metaData,
        msid: `preview-${doi}`,
        version: '0',
        pdfUrl: '',
        msas: [],
      },
      content,
      status: {
        articleType: 'Preview Preprint',
        status: 'This Preview Preprint isn\'t published yet.',
        timeline: [
        ],
      },
    },
  };
};

export default Page;
