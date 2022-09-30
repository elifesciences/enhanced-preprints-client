import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { ArticlePage, ArticlePageProps } from '../../../components/pages/article/article-page';
import { config } from '../../../config';
import { Content } from '../../../types/content';

export const Page = (props: { metaData: ArticlePageProps, content: Content }): JSX.Element => (
  <ArticlePage {...props}></ArticlePage>
);

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const doi = Array.isArray(context.params?.doi) ? context.params?.doi?.join('/') ?? context.params?.doi : '';
  const metaData = await fetch(`${config.API_SERVER}/api/reviewed-preprints/${doi}/metadata`).then((res) => res.json());
  const content = await fetch(`${config.API_SERVER}/api/reviewed-preprints/${doi}/content`).then((res) => res.json());
  return {
    props: {
      metaData,
      content,
    },
  };
};

export default Page;
