import { render, screen } from '@testing-library/react';
import { ArticleReviewsTab } from './reviews-tab';
import { peerReview } from '../../../../utils/mocks';
import '../../../../i18n';
import { PeerReview } from '../../../../types';

describe('ReviewsTab', () => {
  it('renders with reviews tab', () => {
    expect(() => render(<ArticleReviewsTab peerReview={peerReview} currentVersion={1} />)).not.toThrow();
  });

  it('displays the appropriate peer review process', () => {
    render(<ArticleReviewsTab peerReview={peerReview} currentVersion={1} />);
    expect(screen.getByText('Not revised:')).toBeInTheDocument();

    render(<ArticleReviewsTab peerReview={peerReview} currentVersion={2} />);
    expect(screen.getByText('Revised:')).toBeInTheDocument();
  });

  it('renders each review in the peer review passed in', () => {
    render(<ArticleReviewsTab peerReview={peerReview} currentVersion={1} />);

    peerReview.reviews
      .forEach(({ text }) => expect(screen.getByText(text)).toBeInTheDocument());
  });

  it('renders the author response when it is in the peer review', () => {
    render(<ArticleReviewsTab peerReview={peerReview} currentVersion={1} />);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    expect(screen.getByText(peerReview.authorResponse!.text)).toBeInTheDocument();
  });

  it('renders the participants section when there are participants', () => {
    const { container } = render(<ArticleReviewsTab peerReview={peerReview} currentVersion={1} />);

    expect(container.querySelector('#editors-and-reviewers')).toBeInTheDocument();
  });

  it('does not render the participants section when there are no participants', () => {
    const peerReviewNoEditors = {
      ...peerReview,
      evaluationSummary: {
        ...peerReview.evaluationSummary,
        participants: [],
      },
    } as PeerReview;
    const { container } = render(<ArticleReviewsTab peerReview={peerReviewNoEditors} currentVersion={1} />);

    expect(container.querySelector('#editors-and-reviewers')).not.toBeInTheDocument();
  });

  it.each([
    {
      description: 'complete',
      peerReviewExample: peerReview,
      expectedJumpToLinks: [
        {
          href: '#review-process',
          text: 'Peer review process',
        },
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
          href: '#review-process',
          text: 'Peer review process',
        },
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
          href: '#review-process',
          text: 'Peer review process',
        },
        {
          href: '#editors-and-reviewers',
          text: 'Editors',
        },
      ],
    },
    {
      description: 'without editors',
      peerReviewExample: {
        evaluationSummary: {
          ...peerReview.evaluationSummary,
          participants: [],
        },
        reviews: [],
      } as PeerReview,
      expectedJumpToLinks: [
        {
          href: '#review-process',
          text: 'Peer review process',
        },
      ],
    },
  ])('passes down the correct headings to jump-to-menu ($description)', ({
    peerReviewExample,
    expectedJumpToLinks,
  }) => {
    const { container } = render(<ArticleReviewsTab peerReview={peerReviewExample} currentVersion={1} />);
    const jumpLinks = container.querySelectorAll('.jump-menu-list__link');

    const jumpLinkValues = Array.from(jumpLinks).map((link: Element) => (
      {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        href: link.getAttribute('href')!,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        text: link.textContent!,
      }
    ));

    expect(jumpLinkValues).toStrictEqual(expectedJumpToLinks);
  });

  it('uses the heading ids for the hrefs in jump-to-menu', () => {
    const { container } = render(<ArticleReviewsTab peerReview={peerReview} currentVersion={1} />);

    const headings = Array.from(container.querySelectorAll('[id]'));
    const ids = headings.map(({ id }) => id);

    const links = Array.from(container.querySelectorAll<HTMLAnchorElement>('.jump-menu-list__link'));
    const hrefs = links.map(({ href }) => href.slice(href.indexOf('#') + 1));

    expect(ids).toStrictEqual(hrefs);
  });
});
