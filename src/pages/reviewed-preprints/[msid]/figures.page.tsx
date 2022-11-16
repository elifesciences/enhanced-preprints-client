import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { config } from '../../../config';
import { getManuscript, manuscripts } from '../../../manuscripts';
import { Content } from '../../../types/content';
import { jsonFetch } from '../../../utils/json-fetch';
import { MetaData } from '../../../types';
import { ArticlePage, ArticleStatusProps } from '../../../components/pages/article/article-page';
import { ArticleFiguresTab } from '../../../components/pages/article/tabs/figures-tab';

const getFigures = (content: Content): Content => {
  if (typeof content === 'undefined') {
    return '';
  }
  if (typeof content === 'string') {
    return content;
  }

  if (Array.isArray(content)) {
    return content.map((part) => getFigures(part));
  }
  switch (content.type) {
    case 'Figure':
      return content;
    default:
      return '';
  }
};

type PageProps = {
  metaData: MetaData,
  status: ArticleStatusProps,
  content: Content,
};

export const Page = (props: PageProps): JSX.Element => (
  <ArticlePage metaData={props.metaData} status={props.status} activeTab="figures">
    <ArticleFiguresTab content={getFigures(props.content)}></ArticleFiguresTab>
  </ArticlePage>
);

export const getServerSideProps: GetServerSideProps<PageProps> = async (context: GetServerSidePropsContext) => {
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
  const [metaData, content, status] = await Promise.all([
    jsonFetch<MetaData>(`${config.apiServer}/api/reviewed-preprints/${preprintDoi}/metadata`),
    jsonFetch<Content>(`${config.apiServer}/api/reviewed-preprints/${preprintDoi}/content`),
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
      },
      content,
      status,
    },
  };
};

export default Page;
