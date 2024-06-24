import { EnhancedArticle, VersionSummary } from '../../types';
import { ProcessedArticle } from '../../types/enhanced-article';
import { generateTimeline } from './generate-timeline';

const exampleArticle: Omit<ProcessedArticle, 'doi' | 'date'> = {
  abstract: '',
  title: '',
  licenses: [],
  content: '',
  headings: [],
  references: [],
};

const version1: EnhancedArticle = {
  id: '1v1',
  versionIdentifier: '1',
  versionDoi: '10.00001/1v1',

  doi: '10.00001/1',
  msid: '1',

  preprintDoi: 'doi-123',
  preprintUrl: 'https://doi.org/doi-123',
  sentForReview: new Date('2023-01-01'),
  preprintPosted: new Date('2023-01-02'),
  published: new Date('2023-01-03'),

  article: exampleArticle,
};

const version2: EnhancedArticle = {
  id: '1v2',
  versionIdentifier: '2',
  versionDoi: '10.00001/1v1',

  doi: '10.00001/1',
  msid: '1',

  preprintDoi: 'doi-123v2',
  preprintUrl: 'https://doi.org/doi-123v2',
  preprintPosted: new Date('2023-01-05'),
  sentForReview: new Date('2023-01-06'),
  published: new Date('2023-01-09'),

  article: exampleArticle,
};

const version3Summary: VersionSummary = {
  versionIdentifier: '3',
  published: new Date('2023-02-09'),
  url: 'https://doi.org/doi-123v3',
};

const summariseEnhancedArticleToVersionSummary = (article: EnhancedArticle): VersionSummary => ({
  id: article.id,
  doi: article.doi,
  msid: article.msid,
  versionIdentifier: article.versionIdentifier,
  versionDoi: article.versionDoi,

  preprintDoi: article.preprintDoi,
  preprintUrl: article.preprintUrl,
  preprintPosted: article.preprintPosted,
  sentForReview: article.sentForReview,
  published: article.published,
});

describe('generateTimeline', () => {
  it('should generate the correct timeline with one version', () => {
    const timeline = generateTimeline({
      article: version1,
      versions: {
        v1: summariseEnhancedArticleToVersionSummary(version1),
      },
    });

    expect(timeline).toEqual([
      {
        date: 'Tue Jan 03 2023',
        name: 'Reviewed Preprint',
        url: '/reviewed-preprints/1v1',
        version: 1,
        versionIndicator: 'v1',
      },
    ]);
  });

  it('should generate the correct timeline with two article versions', () => {
    const timeline = generateTimeline({
      article: version2,
      versions: {
        v1: summariseEnhancedArticleToVersionSummary(version1),
        v2: summariseEnhancedArticleToVersionSummary(version2),
      },
    });

    expect(timeline).toEqual([
      {
        name: 'Reviewed Preprint',
        url: '/reviewed-preprints/1v2',
        version: 2,
        date: 'Mon Jan 09 2023',
        versionIndicator: 'v2',
      },
      {
        name: 'Reviewed Preprint',
        url: '/reviewed-preprints/1v1',
        version: 1,
        date: 'Tue Jan 03 2023',
        versionIndicator: 'v1',
      },
    ]);
  });

  it('should generate the correct timeline with an external version summary', () => {
    const timeline = generateTimeline({
      article: version2,
      versions: {
        v1: summariseEnhancedArticleToVersionSummary(version1),
        v2: summariseEnhancedArticleToVersionSummary(version2),
        v3: version3Summary,
      },
    });

    expect(timeline).toEqual([
      {
        name: 'Version of Record',
        url: 'https://doi.org/doi-123v3',
        version: 3,
        date: 'Thu Feb 09 2023',
      },
      {
        name: 'Reviewed Preprint',
        url: '/reviewed-preprints/1v2',
        version: 2,
        date: 'Mon Jan 09 2023',
        versionIndicator: 'v2',
      },
      {
        name: 'Reviewed Preprint',
        url: '/reviewed-preprints/1v1',
        version: 1,
        date: 'Tue Jan 03 2023',
        versionIndicator: 'v1',
      },
    ]);
  });

  it('should generate the correct timeline with VOR corrections', () => {
    const timeline = generateTimeline({
      article: version2,
      versions: {
        v1: summariseEnhancedArticleToVersionSummary(version1),
        v2: summariseEnhancedArticleToVersionSummary(version2),
        v3: {
          ...version3Summary,
          corrections: [
            {
              date: new Date('2023-02-10'), 
              content: 'https://doi.org/doi-123v3',
            }
          ]
        },
      },
    });

    expect(timeline).toEqual([
      {
        name: 'Version of Record',
        url: 'https://doi.org/doi-123v3',
        version: 3,
        date: 'Fri Feb 10 2023',
      },
      {
        name: 'Version of Record',
        url: 'https://doi.org/doi-123v3',
        version: 3,
        date: 'Thu Feb 09 2023',
      },
      {
        name: 'Reviewed Preprint',
        url: '/reviewed-preprints/1v2',
        version: 2,
        date: 'Mon Jan 09 2023',
        versionIndicator: 'v2',
      },
      {
        name: 'Reviewed Preprint',
        url: '/reviewed-preprints/1v1',
        version: 1,
        date: 'Tue Jan 03 2023',
        versionIndicator: 'v1',
      },
    ]);
  });
});