import { render, screen } from '@testing-library/react';
import { RelatedContent } from './related-content';

describe('Related Content', () => {
  it('renders the related articles passed in as a param', () => {
    render(<RelatedContent articles={[
      {
        type: 'Related Insight',
        title: 'Summary of this article',
        content: 'Some impact statement content on the value of this article',
        url: 'https://elifesciences.org/articles/123456',
      },
      {
        type: 'Discussed in',
        title: 'Podcast related to this article',
        url: 'https://elifesciences.org/podcast/episode123456',
        imageUrl: 'http://placekitten.com/400/400',
      },
    ]}
    />);

    const relatedType1 = screen.getByText('Related Insight');
    expect(relatedType1).toBeInTheDocument();

    const title1 = screen.getByText('Summary of this article');
    expect(title1).toBeInTheDocument();
    expect(title1).toHaveAttribute('href', 'https://elifesciences.org/articles/123456');

    const content1 = screen.getByText('Some impact statement content on the value of this article');
    expect(content1).toBeInTheDocument();

    const relatedType2 = screen.getByText('Discussed in');
    expect(relatedType2).toBeInTheDocument();

    const title2 = screen.getByText('Podcast related to this article');
    expect(title2).toBeInTheDocument();
    expect(title2).toHaveAttribute('href', 'https://elifesciences.org/podcast/episode123456');
  });
});
