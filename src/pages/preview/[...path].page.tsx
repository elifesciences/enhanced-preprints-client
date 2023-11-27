import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { config } from '../../config';
import { Content, MetaData } from '../../types';
import { fetchContent, fetchMetadata } from '../../utils/fetch-data';
import { ArticlePage, ArticleStatusProps } from '../../components/pages/article/article-page';
import { ArticleFiguresTab, ArticleFullTextTab } from '../../components/pages/article/tabs';
import { contentToJsx } from '../../utils/content-to-jsx';
import { contentToHeadings } from '../../utils/content-to-headings';

type PageProps = {
  metaData: MetaData,
  msidWithVersion: string,
  status: ArticleStatusProps,
  content: Content,
};

export const Page = (props: PageProps) => {
  const router = useRouter();
  const determineTab = () => {
    if (Array.isArray(router.query.path)) {
      return ['fulltext', 'figures'].includes(router.query.path.slice(-1)[0]) ? router.query.path.slice(-1)[0] : 'fulltext';
    }
    return 'fulltext';
  };
  const tab = determineTab();

  const headings = contentToHeadings(props.content);
  let childTab;
  if (tab === 'fulltext') {
    childTab = <ArticleFullTextTab headings={headings} content={contentToJsx(props.content)} metaData={props.metaData}></ArticleFullTextTab>;
  } else {
    childTab = <ArticleFiguresTab content={contentToJsx(props.content)}></ArticleFiguresTab>;
  }
  return (
    <ArticlePage metaData={props.metaData} msidWithVersion={props.msidWithVersion} status={props.status} activeTab={tab} tabs={[
      {
        id: 'fulltext',
        linkElement: <Link scroll={false} href={`/preview/${props.msidWithVersion}`}>Full text</Link>,
      },
      {
        id: 'figures',
        linkElement: <Link scroll={false} href={`/preview/${props.msidWithVersion}/figures`}>Figures</Link>,
      },
    ]}>
      { childTab }
    </ArticlePage>
  );
};

export const getServerSideProps: GetServerSideProps<PageProps> = async (context: GetServerSidePropsContext) => {
  if (context.params === undefined || context.params.path === undefined) {
    console.log('no path'); // eslint-disable-line no-console
    return { notFound: true };
  }

  const idParts = [...context.params?.path as string[]];

  if (idParts.length >= 2 && ['fulltext', 'figures'].includes(idParts[idParts.length - 1])) idParts.pop();
  const id = idParts.join('/');

  if (id === undefined) {
    console.log('no id in path'); // eslint-disable-line no-console
    return { notFound: true };
  }

  context.res.setHeader('Cache-Control', `public, max-age=${config.articleCacheAge}`);

  const [metaData, content] = await Promise.all([
    fetchMetadata(id),
    fetchContent(id),
  ]);

  return {
    props: {
      metaData: {
        ...metaData,
        msid: `preview-${metaData.doi}`,
        version: '0',
        pdfUrl: '',
        msas: [],
        publishedYear: new Date().getFullYear(),
      },
      msidWithVersion: id,
      content,
      status: {
        articleType: 'Preview Preprint',
        status: 'This Preview Preprint isn\'t published yet.',
        timeline: [
          { name: 'Preview Preprint generated', date: new Date().toDateString() },
        ],
        isPreview: true,
      },
    },
  };
};

export default Page;
