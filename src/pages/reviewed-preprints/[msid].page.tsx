import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { ArticlePage, ArticlePageProps, ArticleStatusProps } from '../../components/pages/article/article-page';
import { config } from '../../config';
import { msids } from '../../manuscripts';
import { Content } from '../../types/content';

export const Page = (props: { metaData: ArticlePageProps, content: Content, status: ArticleStatusProps }): JSX.Element => (
  <ArticlePage {...props}></ArticlePage>
);

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const msid = context.params?.msid;
  if (msid === undefined) {
    console.log('no msid in path'); // eslint-disable-line no-console
    return { props: {} };
  }

  if (Array.isArray(msid)) {
    console.log('multiple ids in path'); // eslint-disable-line no-console
    return { props: {} };
  }

  if (!msids[msid]) {
    console.log('Cannot find msid configured'); // eslint-disable-line no-console
    return { props: {} };
  }

  // map msid to preprint doi
  const { doi } = msids[msid];

  const [metaData, content, status] = await Promise.all([
    await fetch(`${config.apiServer}/api/reviewed-preprints/${doi}/metadata`).then((res) => res.json()),
    await fetch(`${config.apiServer}/api/reviewed-preprints/${doi}/content`).then((res) => res.json()),
    // replace with call for data
    msids[msid].status,
  ]);

  return {
    props: {
      metaData,
      content,
      status,
    },
  };
};

export default Page;
