import { render, screen } from '@testing-library/react';
import { ArticleReviewsTab } from './reviews-tab';
import { peerReview } from '../../../../utils/mocks';
import { PeerReview } from '../../../../types';

describe('ReviewsTab', () => {
  // This could be useful for other tabs.
  type ExpectedJumpLinksType = {
    description: string,
    peerReviewExample: PeerReview,
    expectedJumpToLinks: {
      href: string,
      text: string,
    }[],
  };

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

  it.each([
    {
      description: 'complete',
      peerReviewExample: peerReview,
      expectedJumpToLinks: [
        {
          href: '#editors-and-reviewers',
          text: 'Editors',
        },
        {
          href: '#peer-review-0',
          text: 'Reviewer #1',
        },
        {
          href: '#peer-review-1',
          text: 'Reviewer #2',
        },
        {
          href: '#author-response',
          text: 'Author Response',
        },
      ],
    },
    {
      description: 'without authorResponse',
      peerReviewExample: {
        evaluationSummary: peerReview.evaluationSummary,
        reviews: peerReview.reviews,
      },
      expectedJumpToLinks: [
        {
          href: '#editors-and-reviewers',
          text: 'Editors',
        },
        {
          href: '#peer-review-0',
          text: 'Reviewer #1',
        },
        {
          href: '#peer-review-1',
          text: 'Reviewer #2',
        },
      ],
    },
    {
      description: 'without reviews',
      peerReviewExample: {
        evaluationSummary: peerReview.evaluationSummary,
        reviews: [],
      },
      expectedJumpToLinks: [
        {
          href: '#editors-and-reviewers',
          text: 'Editors',
        },
      ],
    },
  ])('jump to menu links match content ($description)', ({
    peerReviewExample,
    expectedJumpToLinks,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    description,
  }: ExpectedJumpLinksType) => {
    const { container } = render(<ArticleReviewsTab peerReview={peerReviewExample} />);
    const jumpLinks = container.querySelectorAll('.jump-menu-list__link');

    expect(jumpLinks).toHaveLength(expectedJumpToLinks.length);

    const jumpLinkValues = Array.from(jumpLinks).map((link: Element) => (
      {
        href: link.getAttribute('href')!,
        text: link.textContent!,
      }
    ));

    expect(jumpLinkValues).toStrictEqual(expectedJumpToLinks);
  });
});
