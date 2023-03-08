import { render, screen } from '@testing-library/react';
import { ArticleReviewsTab } from './reviews-tab';
import { peerReview } from '../../../../utils/mocks';

describe('ReviewsTab', () => {
  it('renders with reviews tab', () => {
    expect(() => render(<ArticleReviewsTab peerReview={peerReview} />)).not.toThrow();
  });

  it('renders each review in the peer review passed in', () => {
    render(<ArticleReviewsTab peerReview={peerReview} />);

    expect(screen.getByText(peerReview.reviews[0].text)).toBeInTheDocument();
    expect(screen.getByText(peerReview.reviews[1].text)).toBeInTheDocument();
  });

  it('renders the author response when it is in the peer review', () => {
    render(<ArticleReviewsTab peerReview={peerReview} />);

    expect(screen.getByText(peerReview.authorResponse!.text)).toBeInTheDocument();
  });
});
