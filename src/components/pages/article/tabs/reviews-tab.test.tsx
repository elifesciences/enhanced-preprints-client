import { render, screen } from '@testing-library/react';
import { ArticleReviewsTab } from './reviews-tab';
import { peerReview } from '../../../../utils/mocks';

describe('ArticlePage', () => {
  it('renders with reviews tab', () => {
    expect(() => render(<ArticleReviewsTab peerReview={peerReview} />)).not.toThrow();
  });

  it('renders with tabs with correct active label', () => {
    render(<ArticleReviewsTab peerReview={peerReview} />);
    expect(screen.getByText('Editors')).toBeInTheDocument();
    expect(screen.getByText('Professor Charles Xavier')).toBeInTheDocument();
    expect(screen.getByText('senior-editor')).toBeInTheDocument();
    expect(screen.getByText('Somewhere')).toBeInTheDocument();

    expect(screen.getByText('Well done, Stephen.')).toBeInTheDocument();

    expect(screen.getByText('I thank you for the review and take it as irrefutable proof and that I more intelligent that Tony.')).toBeInTheDocument();
  });

  it('renders with tabs with correct active label', () => {
    render(<ArticleReviewsTab peerReview={{ ...peerReview, authorResponse: undefined }} />);

    expect(screen.queryByText('I thank you for the review and take it as irrefutable proof and that I more intelligent that Tony.')).not.toBeInTheDocument();
  });
});
