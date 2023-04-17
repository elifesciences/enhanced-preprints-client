import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import { config } from '../../config';
import { Content } from '../../types/content';
import { fetchContent, fetchMetadata } from '../../utils/fetch-data';
import { MetaData, PeerReview } from '../../types';
import { ArticlePage, ArticleStatusProps } from '../../components/pages/article/article-page';
import { ArticleFiguresTab, ArticleFullTextTab } from '../../components/pages/article/tabs';

type PageProps = {
  tab: 'fulltext' | 'figures',
  metaData: MetaData,
  status: ArticleStatusProps,
  content: Content,
  peerReview: PeerReview,
};

export const Page = (props: PageProps): JSX.Element => {
  let childTab;
  if (props.tab === 'fulltext') {
    childTab = <ArticleFullTextTab content={props.content} metaData={props.metaData} peerReview={props.peerReview}></ArticleFullTextTab>;
  } else {
    childTab = <ArticleFiguresTab content={props.content}></ArticleFiguresTab>;
  }
  return (
    <ArticlePage metaData={props.metaData} status={props.status} activeTab={props.tab} tabs={[
      {
        id: 'fulltext',
        linkElement: <Link scroll={false} href={`/preview/${props.metaData.doi}`}>Full text</Link>,
      },
      {
        id: 'figures',
        linkElement: <Link scroll={false} href={`/preview/${props.metaData.doi}/figures`}>Figures and data</Link>,
      },
    ]}>
      { childTab }
    </ArticlePage>
  );
};

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const doiParts = context.params?.doi;
  if (doiParts === undefined) {
    console.log('no doi in path'); // eslint-disable-line no-console
    return { notFound: true };
  }

  const tab = Array.isArray(doiParts) && doiParts.length > 2 && ['fulltext', 'figures'].includes(doiParts[doiParts.length - 1]) ? doiParts.pop() : 'fulltext';
  const doi = Array.isArray(doiParts) ? doiParts.join('/') : undefined;

  if (doi === undefined) {
    console.log('doi not found in path'); // eslint-disable-line no-console
    return { notFound: true };
  }

  const [metaData, content] = await Promise.all([
    fetchMetadata(doi),
    fetchContent(doi),
  ]);

  context.res.setHeader('Cache-Control', `public, max-age=${config.articleCacheAge}`);

  return {
    props: {
      tab,
      metaData: {
        ...metaData,
        msid: `preview-${doi}`,
        version: '0',
        pdfUrl: '',
        msas: [],
        publishedYear: new Date().getFullYear(),
      },
      content,
      status: {
        articleType: 'Preview Preprint',
        status: 'This Preview Preprint isn\'t published yet.',
        timeline: [
          { name: 'Preview Preprint generated', date: new Date().toDateString() },
        ],
      },
    },
  };
};

export default Page;
