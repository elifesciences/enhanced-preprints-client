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
      status: 'This preprint was published after peer review by eLife.',
      timeline: [
        { name: 'Sent for peer review', date: '2022-03-04' },
        { name: 'Preprint posted', date: '2022-03-05' },
      ],
    },
  },
  '10.1101/2022.06.24.497502': {
    preprintDoi: '10.1101/2022.06.24.497502',
    status: {
      articleType: 'Reviewed Preprint',
      status: 'This preprint was published after peer review by eLife.',
      timeline: [
        { name: 'Sent for peer review', date: '2022-06-24' },
        { name: 'Preprint posted', date: '2022-06-26' },
      ],
    },
  },
  '10.1101/2022.07.26.501569': {
    preprintDoi: '10.1101/2022.07.26.501569',
    status: {
      articleType: 'Reviewed Preprint',
      status: 'This preprint was published after peer review by eLife.',
      timeline: [
        { name: 'Sent for peer review', date: '2022-07-26' },
        { name: 'Preprint posted', date: '2022-07-28' },
      ],
    },
  },
  '10.1101/2022.05.28.493855': {
    preprintDoi: '10.1101/2022.05.28.493855',
    status: {
      articleType: 'Reviewed Preprint',
      status: 'This preprint was published after peer review by eLife.',
      timeline: [
        { name: 'Sent for peer review', date: '2022-12-07' },
        { name: 'Preprint posted', date: '2022-05-29' },
      ],
    },
  },
  '10.1101/2022.06.30.498369': {
    preprintDoi: '10.1101/2022.06.30.498369',
    status: {
      articleType: 'Reviewed Preprint',
      status: 'This preprint was published after peer review by eLife.',
      timeline: [
        { name: 'Sent for peer review', date: '2022-07-01' },
        { name: 'Preprint posted', date: '2022-07-02' },
      ],
    },
  },
  '10.1101/2022.05.30.22275761': {
    preprintDoi: '10.1101/2022.05.30.22275761',
    status: {
      articleType: 'Reviewed Preprint',
      status: 'This preprint was published after peer review by eLife.',
      timeline: [
        { name: 'Sent for peer review', date: '2022-06-29' },
        { name: 'Preprint posted', date: '2022-05-31' },
      ],
    },
  },
  '10.1101/2022.07.21.500925': {
    preprintDoi: '10.1101/2022.07.21.500925',
    status: {
      articleType: 'Reviewed Preprint',
      status: 'This preprint was published after peer review by eLife.',
      timeline: [
        { name: 'Sent for peer review', date: '2022-07-21' },
        { name: 'Preprint posted', date: '2022-07-22' },
      ],
    },
  },
  '10.1101/2020.07.27.223354': {
    preprintDoi: '10.1101/2020.07.27.223354',
    status: {
      articleType: 'Reviewed Preprint',
      status: 'This preprint was published after peer review by eLife.',
      timeline: [
        { name: 'Sent for peer review', date: '2022-07-20' },
        { name: 'Preprint posted', date: '2022-06-21' },
      ],
    },
  },
  '10.1101/2021.11.12.468444': {
    preprintDoi: '10.1101/2021.11.12.468444',
    status: {
      articleType: 'Reviewed Preprint',
      status: 'This preprint was published after peer review by eLife.',
      timeline: [
        { name: 'Sent for peer review', date: '2022-07-12' },
        { name: 'Preprint posted', date: '2022-06-29' },
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
