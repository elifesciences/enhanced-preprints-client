import { EnhancedArticle, VersionSummary } from '../types';
import { ProcessedArticle } from '../types/enhanced-article';
import { generateVersionHistory } from './generate-version-history';

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

describe('generateVersionHistory', () => {
  it('should generate the correct version history with one reviewed preprint', () => {
    const history = generateVersionHistory({
      article: version1,
      versions: {
        v1: summariseEnhancedArticleToVersionSummary(version1),
      },
    });

    expect(history).toEqual([
      {
        date: 'Sun Jan 01 2023',
        label: 'Sent for peer review',
      },
      {
        date: 'Mon Jan 02 2023',
        label: 'Preprint posted',
        url: 'https://doi.org/doi-123',
      },
      {
        date: 'Tue Jan 03 2023',
        label: 'Reviewed Preprint version 1',
        url: '/reviewed-preprints/1v1',
      },
    ]);
  });

  it('should generate the correct version history with two reviewed preprints', () => {
    const history = generateVersionHistory({
      article: version2,
      versions: {
        v1: summariseEnhancedArticleToVersionSummary(version1),
        v2: summariseEnhancedArticleToVersionSummary(version2),
      },
    });

    expect(history).toEqual([
      {
        date: 'Sun Jan 01 2023',
        label: 'Sent for peer review',
      },
      {
        date: 'Mon Jan 02 2023',
        label: 'Preprint posted',
        url: 'https://doi.org/doi-123',
      },
      {
        label: 'Reviewed Preprint version 1',
        url: '/reviewed-preprints/1v1',
        date: 'Tue Jan 03 2023',
      },
      {
        label: 'Reviewed Preprint version 2',
        url: '/reviewed-preprints/1v2',
        date: 'Mon Jan 09 2023',
      },
    ]);
  });

  it('should generate the correct version history with an external version summary', () => {
    const history = generateVersionHistory({
      article: version2,
      versions: {
        v1: summariseEnhancedArticleToVersionSummary(version1),
        v2: summariseEnhancedArticleToVersionSummary(version2),
        v3: version3Summary,
      },
    });

    expect(history).toEqual([
      {
        date: 'Sun Jan 01 2023',
        label: 'Sent for peer review',
      },
      {
        date: 'Mon Jan 02 2023',
        label: 'Preprint posted',
        url: 'https://doi.org/doi-123',
      },
      {
        label: 'Reviewed Preprint version 1',
        url: '/reviewed-preprints/1v1',
        date: 'Tue Jan 03 2023',
      },
      {
        label: 'Reviewed Preprint version 2',
        url: '/reviewed-preprints/1v2',
        date: 'Mon Jan 09 2023',
      },
      {
        label: 'Version of Record published',
        url: 'https://doi.org/doi-123v3',
        date: 'Thu Feb 09 2023',
      },
    ]);
  });
});
