import { type EnhancedArticleWithVersions } from '../../types';
import { type IsoDateString } from '../../types/enhanced-article';

export const mock85111: EnhancedArticleWithVersions = {
  article: {
    article: {
      title: 'The locus coeruleus broadcasts prediction errors across the cortex to promote sensorimotor plasticity',
      authors: [],
      abstract: 'abstract',
      content: 'content',
      references: [],
      licenses: [],
      headings: [],
    },
    doi: '10.7554/eLife.85111.1',
    eLocationId: 'RP85111',
    id: '85111v1',
    msid: '85111',
    pdfUrl: 'https://github.com/elifesciences/enhanced-preprints-data/raw/master/data/85111/v1/85111-v1.pdf',
    preprintDoi: '10.1101/2022.11.08.515698',
    preprintPosted: '2022-11-22T00:00:00.000Z' as IsoDateString,
    preprintUrl: 'https://www.biorxiv.org/content/10.1101/2022.11.08.515698v2',
    published: '2023-01-25T14:00:00.000Z' as IsoDateString,
    publishedYear: 2023,
    sentForReview: '2022-11-29T14:20:30.000Z' as IsoDateString,
    subjects: [
      'Neuroscience',
    ],
    versionDoi: '10.7554/eLife.85111.1',
    umbrellaDoi: '10.7554/eLife.85111',
    versionIdentifier: '1',
    volume: '12',
  },
  versions: {
    '85111v1': {
      doi: '10.7554/eLife.85111.1',
      id: '85111v1',
      msid: '85111',
      preprintDoi: '10.1101/2022.11.08.515698',
      preprintPosted: new Date('2022-11-22T00:00:00.000Z'),
      preprintUrl: 'https://www.biorxiv.org/content/10.1101/2022.11.08.515698v2',
      published: new Date('2023-01-25T14:00:00.000Z'),
      sentForReview: new Date('2022-11-29T14:20:30.000Z'),
      versionDoi: '10.7554/eLife.85111.1',
      umbrellaDoi: '10.7554/eLife.85111',
      versionIdentifier: '1',
    },
    '85111v2': {
      doi: '10.7554/eLife.85111.2',
      id: '85111v2',
      msid: '85111',
      preprintDoi: '10.1101/2022.11.08.515698',
      preprintPosted: new Date('2023-03-20T00:00:00.000Z'),
      preprintUrl: 'https://www.biorxiv.org/content/10.1101/2022.11.08.515698v3',
      published: new Date('2023-05-10T14:00:00.000Z'),
      sentForReview: new Date('2023-03-23T10:52:45.000Z'),
      versionDoi: '10.7554/eLife.85111.2',
      umbrellaDoi: '10.7554/eLife.85111',
      versionIdentifier: '2',
    },
    '85111v3': {
      doi: '10.7554/eLife.85111.3',
      versionIdentifier: '3',
      published: new Date('2023-06-07T00:00:00.000Z'),
      url: 'https://elifesciences.org/articles/85111v1',
      corrections: [
        {
          date: new Date('2023-06-20'),
          url: 'https://elifesciences.org/articles/85111v2',
        },
        {
          date: new Date('2023-08-4'),
          url: 'https://elifesciences.org/articles/85111v3',
        },
      ],
    },
  },
  metrics: {
    views: 8889,
    downloads: 245,
    citations: 6,
  },
};
