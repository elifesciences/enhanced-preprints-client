import { EnhancedArticleWithVersions } from '../types';
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
  it('should generate the correct status with one article version', () => {
    // Call the function
    const timeline = generateStatus({
      article: version1,
      versions: {
        v1: summariseEnhancedArticleToVersionSummary(version1),
      },
    });

    // Assert the result
    expect(timeline).toEqual({
      type: 'Reviewed Preprint',
      isPreview: false,
      timeline: [
        {
          date: 'Tue Jan 03 2023',
          name: 'Reviewed preprint version 1',
          eventDescription: '(this version)',
        },
        {
          date: 'Mon Jan 02 2023',
          name: 'Posted to bioRxiv',
          link: {
            url: 'https://doi.org/doi-123',
            text: 'Go to bioRxiv',
          },
        },
        {
          date: 'Sun Jan 01 2023',
          name: 'Sent for peer review',
        },
      ],
    });
  });

  it('should generate the correct timeline with two article versions', () => {
    // Call the function
    const timeline = generateStatus({
      article: version2,
      versions: {
        v1: summariseEnhancedArticleToVersionSummary(version1),
        v2: summariseEnhancedArticleToVersionSummary(version2),
      },
    });

    // Assert the result
    expect(timeline).toEqual({
      type: 'Revised Preprint',
      isPreview: false,
      timeline: [
        {
          date: 'Mon Jan 09 2023',
          name: 'Reviewed preprint version 2',
          eventDescription: '(this version)',
        },
        {
          date: 'Tue Jan 03 2023',
          name: 'Reviewed preprint version 1',
          link: {
            text: 'Go to version',
            url: '/reviewed-preprints/1v1',
          },
        },

        {
          date: 'Mon Jan 02 2023',
          name: 'Posted to bioRxiv',
          link: {
            url: 'https://doi.org/doi-123',
            text: 'Go to bioRxiv',
          },
        },
        {
          date: 'Sun Jan 01 2023',
          name: 'Sent for peer review',
        },
      ],
    });
  });

  it('should be a reviewed preprint if article is the same as the first version', () => {
    const timeline = generateStatus({
      article: version1,
      versions: {
        v1: version1,
        v2: version2,
      },
    });

    expect(timeline).toMatchObject({
      type: 'Reviewed Preprint',
    });
  });

  it('should be a revised preprint if article is not the same as the first version', () => {
    const timeline = generateStatus({
      article: version2,
      versions: {
        v1: version1,
        v2: version2,
      },
    });

    expect(timeline).toMatchObject({
      type: 'Revised Preprint',
    });
  });

  it('should be a preview if the published date is empty', () => {
    const previewVersion = {
      ...version1,
    };
    delete previewVersion.published;

    const timeline = generateStatus({
      article: previewVersion,
      versions: {
        v1: previewVersion,
      },
    });

    expect(timeline).toMatchObject({
      isPreview: true,
    });
  });

  it('should be a preview if the published date is in the future', () => {
    const previewVersion = {
      ...version1,
    };
    previewVersion.published = new Date();
    previewVersion.published.setDate(previewVersion.published.getDate() + 1);

    const timeline = generateStatus({
      article: previewVersion,
      versions: {
        v1: previewVersion,
      },
    });

    expect(timeline).toMatchObject({
      isPreview: true,
    });
  });

  it('should not be a preview if the published date is present and represents a date in the past', () => {
    const timeline = generateStatus({
      article: version1,
      versions: {
        v1: version1,
      },
    });

    expect(timeline).toMatchObject({
      isPreview: false,
    });
  });
});
