import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { config } from '../../../config';
import { getManuscript } from '../../../manuscripts';
import { Content } from '../../../types/content';
import { fetchContent, fetchMetadata, fetchReviews } from '../../../utils/fetch-data';
import { MetaData, PeerReview } from '../../../types';
import { ArticlePage, ArticleStatusProps, TabOptions } from '../../../components/pages/article/article-page';
import { contentToText } from '../../../utils/content-to-text';
import { ArticleFiguresTab, ArticleFullTextTab, ArticleReviewsTab } from '../../../components/pages/article/tabs';

type PageProps = {
  metaData: MetaData
  msidWithVersion?: string,
  status: ArticleStatusProps,
  content: Content,
  peerReview: PeerReview,
};

export const Page = (props: PageProps): JSX.Element => {
  const [tab, setTab] = useState<TabOptions>('fulltext');

  const tabHandler = (event: React.MouseEvent<HTMLAnchorElement>, tabId: TabOptions) => {
    event.preventDefault();
    setTab(tabId);
    window.history.pushState({}, '', event.currentTarget.href);
    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent);
  };

  useEffect(() => {
    const onLocationChange = (event: PopStateEvent) => {
      event.preventDefault();
      if (event.state?.as !== undefined) {
        if ((event.state?.as as string).includes(props.metaData.msid)) {
          if ((event.state?.as as string).includes('figures')) setTab('figures');
          else if ((event.state?.as as string).includes('reviews')) setTab('reviews');
          else setTab('fulltext');
        } else window.history.back();
      }
    };
    window.addEventListener('popstate', (event) => onLocationChange(event));

    return () => {
      window.removeEventListener('popstate', onLocationChange);
    };
  }, []);

  return (
    <>
      <Head>
        <title>{contentToText(props.metaData.title)}</title>
      </Head>
      <ArticlePage metaData={props.metaData} msidWithVersion={props.msidWithVersion} status={props.status} activeTab={tab} callback={tabHandler} >
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

  const [metaData, content, peerReview, status] = await Promise.all([
    fetchMetadata(`${manuscriptConfig.msid}/v${manuscriptConfig.version}`),
    fetchContent(`${manuscriptConfig.msid}/v${manuscriptConfig.version}`),
    fetchReviews(`${manuscriptConfig.msid}/v${manuscriptConfig.version}`),
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
      peerReview,
    },
  };
};

export default Page;
