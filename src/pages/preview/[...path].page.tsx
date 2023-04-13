import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import { config } from '../../config';
import { Content } from '../../types/content';
import { jsonFetch } from '../../utils/json-fetch';
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
  const idParts = context.params?.path;
  if (idParts === undefined) {
    console.log('no id in path'); // eslint-disable-line no-console
    return { notFound: true };
  }

  const tab = Array.isArray(idParts) && idParts.length > 2 && ['fulltext', 'figures'].includes(idParts[idParts.length - 1]) ? idParts.pop() : 'fulltext';
  const id = Array.isArray(idParts) ? idParts.join('/') : undefined;

  if (id === undefined) {
    console.log('id not found in path'); // eslint-disable-line no-console
    return { notFound: true };
  }

  const [metaData, content] = await Promise.all([
    jsonFetch<MetaData>(`${config.apiServer}/api/reviewed-preprints/${id}/metadata`),
    jsonFetch<Content>(`${config.apiServer}/api/reviewed-preprints/${id}/content`),
  ]);

  context.res.setHeader('Cache-Control', `public, max-age=${config.articleCacheAge}`);

  return {
    props: {
      tab,
      metaData: {
        ...metaData,
        msid: `preview-${metaData.doi}`,
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
