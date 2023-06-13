import { EnhancedArticleWithVersions } from '../types';
import { generateTimeline } from './generate-timeline';

describe('generateTimeline', () => {
  it('should generate the correct timeline with one article version', () => {
    // Define the input data with one article version
    const version = {
      article: {
        id: '1',
        published: new Date('2023-01-01'),
        versionIdentifier: 'v1',
        preprintPosted: new Date('2023-01-02'),
        preprintDoi: 'doi-123',
        sentForReview: new Date('2023-01-03'),
      },
      versions: {},
    };

    // Define the expected output
    const expectedTimeline = [
      {
        date: 'Sun Jan 01 2023',
        name: 'Reviewed preprint posted',
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
        date: 'Tue Jan 03 2023',
        name: 'Sent for peer review',
      },
    ];

    // Call the function
    const timeline = generateTimeline((version as EnhancedArticleWithVersions));

    // Assert the result
    expect(timeline).toEqual(expectedTimeline);
  });
});
