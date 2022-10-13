import { ArticleStatusProps } from './components/pages/article/article-page';

type ReviewedPreprintConfig = {
  preprintDoi: string,
  status: ArticleStatusProps
};

const preprintConfigs: Record<string, ReviewedPreprintConfig> = {
  /* Unused because of a VoR already existing.
  '10.1101/2022.03.04.482974': {
    preprintDoi: '10.1101/2022.03.04.482974',
    status: {
      articleType: 'Reviewed Preprint',
      status: 'This preprint was published after peer review by eLife.',
      timeline: [
        { name: 'Reviewed Preprint posted', date: '2022-10-20' },
        { name: 'Posted to bioRxiv', date: '2022-03-05', link: { url: 'https://www.biorxiv.org/content/10.1101/2022.03.04.482974', text: 'Go to bioRxiv' } },
        { name: 'Sent for peer review', date: '2022-03-04' },
      ],
    },
  },
  */
  '10.1101/2022.06.24.497502': {
    preprintDoi: '10.1101/2022.06.24.497502',
    status: {
      articleType: 'Reviewed Preprint',
      status: 'This preprint was published after peer review by eLife.',
      timeline: [
        { name: 'Reviewed Preprint posted', date: '2022-10-20' },
        { name: 'Posted to bioRxiv', date: '2022-06-26', link: { url: 'https://www.biorxiv.org/content/10.1101/2022.06.24.497502', text: 'Go to bioRxiv' } },
        { name: 'Sent for peer review', date: '2022-06-24' },
      ],
    },
  },
  '10.1101/2022.07.26.501569': {
    preprintDoi: '10.1101/2022.07.26.501569',
    status: {
      articleType: 'Reviewed Preprint',
      status: 'This preprint was published after peer review by eLife.',
      timeline: [
        { name: 'Reviewed Preprint posted', date: '2022-10-20' },
        { name: 'Posted to bioRxiv', date: '2022-07-28', link: { url: 'https://www.biorxiv.org/content/10.1101/2022.07.26.501569', text: 'Go to bioRxiv' } },
        { name: 'Sent for peer review', date: '2022-07-26' },
      ],
    },
  },
  '10.1101/2022.05.28.493855': {
    preprintDoi: '10.1101/2022.05.28.493855',
    status: {
      articleType: 'Reviewed Preprint',
      status: 'This preprint was published after peer review by eLife.',
      timeline: [
        { name: 'Sent for peer review', date: '2022-07-12', link: { url: 'https://www.biorxiv.org/content/10.1101/2022.05.28.493855', text: 'Go to bioRxiv' } },
        { name: 'Posted to bioRxiv', date: '2022-05-29' },
      ],
    },
  },
  '10.1101/2022.06.30.498369': {
    preprintDoi: '10.1101/2022.06.30.498369',
    status: {
      articleType: 'Reviewed Preprint',
      status: 'This preprint was published after peer review by eLife.',
      timeline: [
        { name: 'Posted to bioRxiv', date: '2022-07-02', link: { url: 'https://www.biorxiv.org/content/10.1101/2022.06.30.498369', text: 'Go to bioRxiv' } },
        { name: 'Sent for peer review', date: '2022-07-01' },
      ],
    },
  },
  '10.1101/2022.05.30.22275761': {
    preprintDoi: '10.1101/2022.05.30.22275761',
    status: {
      articleType: 'Reviewed Preprint',
      status: 'This preprint was published after peer review by eLife.',
      timeline: [
        { name: 'Sent for peer review', date: '2022-06-29', link: { url: 'https://www.medrxiv.org/content/10.1101/2022.05.30.22275761', text: 'Go to medRxiv' } },
        { name: 'Posted to medRxiv', date: '2022-05-31' },
      ],
    },
  },
  '10.1101/2022.07.21.500925': {
    preprintDoi: '10.1101/2022.07.21.500925',
    status: {
      articleType: 'Reviewed Preprint',
      status: 'This preprint was published after peer review by eLife.',
      timeline: [
        { name: 'Posted to bioRxiv', date: '2022-07-22', link: { url: 'https://www.biorxiv.org/content/10.1101/2022.07.21.500925', text: 'Go to bioRxiv' } },
        { name: 'Sent for peer review', date: '2022-07-21' },
      ],
    },
  },
  '10.1101/2020.07.27.223354': {
    preprintDoi: '10.1101/2020.07.27.223354',
    status: {
      articleType: 'Reviewed Preprint',
      status: 'This preprint was published after peer review by eLife.',
      timeline: [
        { name: 'Sent for peer review', date: '2022-07-20', link: { url: 'https://www.biorxiv.org/content/10.1101/2020.07.27.223354', text: 'Go to bioRxiv' } },
        { name: 'Posted to bioRxiv', date: '2022-06-21' },
      ],
    },
  },
  '10.1101/2021.11.12.468444': {
    preprintDoi: '10.1101/2021.11.12.468444',
    status: {
      articleType: 'Reviewed Preprint',
      status: 'This preprint was published after peer review by eLife.',
      timeline: [
        { name: 'Sent for peer review', date: '2022-07-12', link: { url: 'https://www.biorxiv.org/content/10.1101/2021.11.12.468444', text: 'Go to bioRxiv' } },
        { name: 'Posted to bioRxiv', date: '2022-06-29' },
      ],
    },
  },
};

type ManuscriptConfig = ReviewedPreprintConfig & {
  msid: string
  version: string,
};

export const manuscripts: Record<string, ManuscriptConfig> = {
  /* Unused because of a VoR already existing
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
  */
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
  '80993': { // eslint-disable-line quote-props
    msid: '80993',
    version: '1',
    ...preprintConfigs['10.1101/2022.05.28.493855'],
  },
  '80993v1': { // eslint-disable-line quote-props
    msid: '80993',
    version: '1',
    ...preprintConfigs['10.1101/2022.05.28.493855'],
  },
  '80984': { // eslint-disable-line quote-props
    msid: '80984',
    version: '1',
    ...preprintConfigs['10.1101/2022.06.30.498369'],
  },
  '80984v1': { // eslint-disable-line quote-props
    msid: '80984',
    version: '1',
    ...preprintConfigs['10.1101/2022.06.30.498369'],
  },
  '80729': { // eslint-disable-line quote-props
    msid: '80729',
    version: '1',
    ...preprintConfigs['10.1101/2022.05.30.22275761'],
  },
  '80729v1': { // eslint-disable-line quote-props
    msid: '80729',
    version: '1',
    ...preprintConfigs['10.1101/2022.05.30.22275761'],
  },
  '81727': { // eslint-disable-line quote-props
    msid: '81727',
    version: '1',
    ...preprintConfigs['10.1101/2022.07.21.500925'],
  },
  '81727v1': { // eslint-disable-line quote-props
    msid: '81727',
    version: '1',
    ...preprintConfigs['10.1101/2022.07.21.500925'],
  },
  '81274': { // eslint-disable-line quote-props
    msid: '81274',
    version: '1',
    ...preprintConfigs['10.1101/2020.07.27.223354'],
  },
  '81274v1': { // eslint-disable-line quote-props
    msid: '81274',
    version: '1',
    ...preprintConfigs['10.1101/2020.07.27.223354'],
  },
  '81535': { // eslint-disable-line quote-props
    msid: '81535',
    version: '1',
    ...preprintConfigs['10.1101/2021.11.12.468444'],
  },
  '81535v1': { // eslint-disable-line quote-props
    msid: '81535',
    version: '1',
    ...preprintConfigs['10.1101/2021.11.12.468444'],
  },
};
