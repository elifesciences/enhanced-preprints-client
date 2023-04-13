import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { config } from '../../../config';
import { getManuscript } from '../../../manuscripts';
import { Content } from '../../../types/content';
import { jsonFetch } from '../../../utils/json-fetch';
import { MetaData } from '../../../types';
import { ArticlePage, ArticleStatusProps } from '../../../components/pages/article/article-page';
import { ArticleFiguresTab } from '../../../components/pages/article/tabs/figures-tab';
import { contentToText } from '../../../utils/content-to-text';

type PageProps = {
  metaData: MetaData,
  msidWithVersion?: string,
  status: ArticleStatusProps,
  content: Content,
};

export const Page = (props: PageProps): JSX.Element => (
  <>
  <Head>
    <title>{contentToText(props.metaData.title)}</title>
  </Head>
  <ArticlePage metaData={props.metaData} msidWithVersion={props.msidWithVersion} status={props.status} activeTab="figures">
    <ArticleFiguresTab content={props.content}></ArticleFiguresTab>
  </ArticlePage>
  </>
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

  const [metaData, content, status] = await Promise.all([
    jsonFetch<MetaData>(`${config.apiServer}/api/reviewed-preprints/${manuscriptConfig.msid}/v${manuscriptConfig.version}/metadata`),
    jsonFetch<Content>(`${config.apiServer}/api/reviewed-preprints/${manuscriptConfig.msid}/v${manuscriptConfig.version}/content`),
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
      msidWithVersion: msid,
      content,
      status,
    },
  };
};

export default Page;
