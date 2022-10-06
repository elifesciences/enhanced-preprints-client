import { ArticleStatusProps } from './components/pages/article/article-page';

type ReviewedPreprintConfig = {
  preprintDoi: string,
  status: ArticleStatusProps
};

const preprintConfigs: Record<string, ReviewedPreprintConfig> = {
  '10.1101/2022.03.04.482974': {
    preprintDoi: '10.1101/2022.03.04.482974',
    status: {
      articleType: 'Reviewed Preprint',
      status: 'This preprint has been reviewed by eLife. Authors have responded but not yet submitted a revised edition',
      timeline: [
        { name: 'Peer review', date: '2022-04-07' },
        { name: 'Preprint posted', date: '2022-03-05' },
      ],
    },
  },
  '10.1101/2022.06.24.497502': {
    preprintDoi: '10.1101/2022.06.24.497502',
    status: {
      articleType: 'Reviewed Preprint',
      status: 'This preprint has been reviewed by eLife. Authors have responded but not yet submitted a revised edition',
      timeline: [
        { name: 'Peer review', date: '2022-09-06' },
        { name: 'Preprint posted', date: '2022-06-26' },
      ],
    },
  },
  '10.1101/2022.07.26.501569': {
    preprintDoi: '10.1101/2022.07.26.501569',
    status: {
      articleType: 'Reviewed Preprint',
      status: 'This preprint has been reviewed by eLife. Authors have responded but not yet submitted a revised edition',
      timeline: [
        { name: 'Peer review', date: '2022-09-05' },
        { name: 'Preprint posted', date: '2022-07-28' },
      ],
    },
  },
};

type ManuscriptConfig = ReviewedPreprintConfig & {
  msid: string
  version: string,
};

export const manuscripts: Record<string, ManuscriptConfig> = {
  '77558': { // eslint-disable-line quote-props
    msid: '77558',
    version: '1',
    ...preprintConfigs['10.1101/2022.03.04.482974'],
  },
  '77558v1': { // eslint-disable-line quote-props
    msid: '77558',
    version: '1',
    ...preprintConfigs['10.1101/2022.03.04.482974'],
  },
  '80494': { // eslint-disable-line quote-props
    msid: '80494',
    version: '1',
    ...preprintConfigs['10.1101/2022.06.24.497502'],
  },
  '80494v1': { // eslint-disable-line quote-props
    msid: '80494',
    version: '1',
    ...preprintConfigs['10.1101/2022.06.24.497502'],
  },
  '81926': { // eslint-disable-line quote-props
    msid: '81926',
    version: '1',
    ...preprintConfigs['10.1101/2022.07.26.501569'],
  },
  '81926v1': { // eslint-disable-line quote-props
    msid: '81926',
    version: '1',
    ...preprintConfigs['10.1101/2022.07.26.501569'],
  },
};
