import { EnhancedArticle, EnhancedArticleWithVersions } from '../types';
import { generateTimeline } from './generate-timeline';

describe('generateTimeline', () => {
  it('should generate the correct timeline with one article version', () => {
    // Define the input data with one article version
    const enhancedArticle = {
      article: {
        id: '1v1',
        published: new Date('2023-01-03'),
        versionIdentifier: '1',
        preprintPosted: new Date('2023-01-02'),
        preprintDoi: 'doi-123',
        sentForReview: new Date('2023-01-01'),
        article: [],
        msid: '1',
        doi: '10.00001/1v1',
        preprintUrl: 'http://preprint.org/1v1',
      },
      versions: {
        v1: {
          id: '1v1',
          published: new Date('2023-01-03'),
          versionIdentifier: '1',
          preprintPosted: new Date('2023-01-02'),
          preprintDoi: 'doi-123',
          sentForReview: new Date('2023-01-01'),
          article: [],
        },
      },
    };

    // Define the expected output
    const expectedTimeline = [
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
    ];

    // Call the function
    const timeline = generateTimeline(enhancedArticle);

    // Assert the result
    expect(timeline).toEqual(expectedTimeline);
  });

  it('should generate the correct timeline with two article versions', () => {
    // Define the input data with two article versions
    const versions: Record<string, Partial<EnhancedArticle>> = {
      v1: {
        id: '1v1',
        published: new Date('2023-01-03'),
        versionIdentifier: 'v1',
        preprintPosted: new Date('2023-01-02'),
        preprintDoi: 'doi-123',
        sentForReview: new Date('2023-01-01'),
      },
      v2: {
        id: '1v2',
        published: new Date('2023-01-04'),
        versionIdentifier: 'v2',
        preprintPosted: new Date('2023-01-02'),
        preprintDoi: 'doi-123',
        sentForReview: new Date('2023-01-01'),
      },
    };

    const enhancedArticleWithVersions = {
      article: versions.v2,
      versions,
    };

    // Define the expected output
    const expectedTimeline = [
      {
        date: 'Wed Jan 04 2023',
        name: 'Reviewed preprint version v2',
        eventDescription: '(this version)',
      },
      {
        date: 'Tue Jan 03 2023',
        name: 'Reviewed preprint version v1',
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
    ];

    // Call the function
    const timeline = generateTimeline((enhancedArticleWithVersions as EnhancedArticleWithVersions));

    // Assert the result
    expect(timeline).toEqual(expectedTimeline);
  });
});
