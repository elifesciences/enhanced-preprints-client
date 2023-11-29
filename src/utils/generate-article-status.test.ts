import { EnhancedArticle, ProcessedArticle, VersionSummary } from '../types/enhanced-article';
import { generateStatus } from './generate-article-status';

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

describe('generateStatus', () => {
  it('should be a reviewed preprint if article is the same as the first version', () => {
    const status = generateStatus({
      article: version1,
      versions: {
        v1: summariseEnhancedArticleToVersionSummary(version1),
        v2: summariseEnhancedArticleToVersionSummary(version2),
      },
    });

    expect(status).toMatchObject({
      type: 'Reviewed Preprint',
    });
  });

  it('should be a preview if the published date is empty', () => {
    const previewVersion = {
      ...version1,
    };
    delete previewVersion.published;

    const status = generateStatus({
      article: previewVersion,
      versions: {
        v1: summariseEnhancedArticleToVersionSummary(previewVersion),
      },
    });

    expect(status).toMatchObject({
      isPreview: true,
    });
  });

  it('should be a preview if the published date is in the future', () => {
    const previewVersion = {
      ...version1,
    };
    previewVersion.published = new Date();
    previewVersion.published.setDate(previewVersion.published.getDate() + 1);

    const status = generateStatus({
      article: previewVersion,
      versions: {
        v1: summariseEnhancedArticleToVersionSummary(previewVersion),
      },
    });

    expect(status).toMatchObject({
      isPreview: true,
    });
  });

  it('should not be a preview if the published date is present and represents a date in the past', () => {
    const status = generateStatus({
      article: version1,
      versions: {
        v1: summariseEnhancedArticleToVersionSummary(version1),
      },
    });

    expect(status).toMatchObject({
      isPreview: false,
    });
  });
});
