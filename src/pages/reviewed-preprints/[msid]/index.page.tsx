import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { config } from '../../../config';
import { getManuscript } from '../../../manuscripts';
import { Content } from '../../../types/content';
import { fetchContent, fetchMetadata, fetchReviews } from '../../../utils/fetch-data';
import { MetaData, PeerReview } from '../../../types';
import { ArticlePage, ArticleStatusProps, TabOptions } from '../../../components/pages/article/article-page';
import { contentToText } from '../../../utils/content-to-text';
import { ArticleFiguresTab, ArticleFullTextTab, ArticleReviewsTab } from '../../../components/pages/article/tabs';

type PageProps = {
  metaData: MetaData,
  status: ArticleStatusProps,
  content: Content,
  peerReview: PeerReview,
};

export const Page = (props: PageProps): JSX.Element => {
  // const router = useRouter();
  const [tab, setTab] = useState<TabOptions>('fulltext');

  const tabHandler = (event: any, tabId: TabOptions) => {
    event.preventDefault();
    setTab(tabId);
    // TO-DO: Figure out how to set the path without re-routing
    // if (tabId === 'figures') router.push(router.asPath, `${router.asPath}/figures`, { shallow: true });
  };

  return (
    <>
      <Head>
        <title>{contentToText(props.metaData.title)}</title>
      </Head>
      <ArticlePage metaData={props.metaData} status={props.status} activeTab="fulltext" callback={tabHandler} >
        {
          {
            fulltext: <ArticleFullTextTab content={props.content} metaData={props.metaData} peerReview={props.peerReview} />,
            figures: <ArticleFiguresTab content={props.content} />,
            reviews: <ArticleReviewsTab peerReview={props.peerReview} />,
          }[tab]
        }
      </ArticlePage>
    </>
  );
};

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

  const manuscriptConfig = getManuscript(config.manuscriptConfigFile, msid);

  if (manuscriptConfig === undefined) {
    console.log('Cannot find msid configured'); // eslint-disable-line no-console
    return { notFound: true };
  }

  // map msid to preprint doi
  const { preprintDoi } = manuscriptConfig;
  const [metaData, content, peerReview, status] = await Promise.all([
    fetchMetadata(preprintDoi),
    fetchContent(preprintDoi),
    fetchReviews(preprintDoi),
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
      content,
      status,
      peerReview,
    },
  };
};

export default Page;
