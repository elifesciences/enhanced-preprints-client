import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { TimelineEvent } from '../../components/molecules/timeline/timeline';
import { ArticlePage, ArticlePageProps, ArticleStatus } from '../../components/pages/article/article-page';
import { config } from '../../config';
import { Content } from '../../types/content';

export const Page = (props: { metaData: ArticlePageProps, content: Content, status: ArticleStatus }): JSX.Element => (
  <ArticlePage {...props}></ArticlePage>
);

type PreprintConfig = {
  doi: string,
  articleType: string,
  status: string,
  timeline: TimelineEvent[],
};

const preprintConfigs = {
  '10.1101/2022.03.04.482974': {
    doi: '10.1101/2022.03.04.482974',
    status: {
      type: 'Reviewed Preprint',
      status: 'This preprint has been reviewed by eLife. Authors have responded but not yet submitted a revised edition',
      timeline: [
        { name: 'Peer review', date: '2022-04-07' },
        { name: 'Preprint posted', date: '2022-03-05' },
      ],
    },
  },
  '10.1101/2022.06.24.497502': {
    doi: '10.1101/2022.06.24.497502',
    status: {
      type: 'Reviewed Preprint',
      status: 'This preprint has been reviewed by eLife. Authors have responded but not yet submitted a revised edition',
      timeline: [
        { name: 'Peer review', date: '2022-09-06' },
        { name: 'Preprint posted', date: '2022-06-26' },
      ],
    },
  },
  '10.1101/2022.07.26.501569': {
    doi: '10.1101/2022.07.26.501569',
    status: {
      type: 'Reviewed Preprint',
      status: 'This preprint has been reviewed by eLife. Authors have responded but not yet submitted a revised edition',
      timeline: [
        { name: 'Peer review', date: '2022-09-05' },
        { name: 'Preprint posted', date: '2022-07-28' },
      ],
    },
  },
};

const msids: Record<string, PreprintConfig> = {
  '77558': preprintConfigs['10.1101/2022.03.04.482974'], // eslint-disable-line quote-props
  '77558v1': preprintConfigs['10.1101/2022.03.04.482974'], // eslint-disable-line quote-props
  '80494': preprintConfigs['10.1101/2022.06.24.497502'], // eslint-disable-line quote-props
  '80494v1': preprintConfigs['10.1101/2022.06.24.497502'], // eslint-disable-line quote-props
  '81926': preprintConfigs['10.1101/2022.07.26.501569'], // eslint-disable-line quote-props
  '81926v1': preprintConfigs['10.1101/2022.07.26.501569'], // eslint-disable-line quote-props
};

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
