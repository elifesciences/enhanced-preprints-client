import { render } from '@testing-library/react';
import { content, metaData, peerReview } from '../../../../utils/mocks';
import { ArticleFullTextTab } from './fulltext-tab';

describe('FulltextTab', () => {
  it('renders with fulltext tab', () => {
    expect(() => render(<ArticleFullTextTab content={content} metaData={metaData} peerReview={peerReview}/>)).not.toThrow();
  });

  it('renders the evaluation summary when one is passed in', () => {
    const { container } = render(<ArticleFullTextTab content={content} metaData={metaData} peerReview={peerReview}/>);

    expect(container.querySelector('#assessment')).toHaveTextContent('This paper is important and is very convincingRead the peer reviewsAbout eLife assessments');
  });

  it.each([
    {
      description: 'complete',
      metaDataExample: metaData,
      peerReviewExample: peerReview,
      expectedJumpToLinks: [
        {
          href: '#abstract',
          text: 'Abstract',
        },
        {
          href: '#assessment',
          text: 'eLife assessment',
        },
        {
          href: '#s1',
          text: 'Introduction',
        },
        {
          href: '#s2',
          text: 'Results',
        },
        {
          href: '#s3',
          text: 'Discussion',
        },
        {
          href: '#s4',
          text: 'Materials and methods',
        },
        {
          href: '#s5',
          text: 'Data and material availability',
        },
        {
          href: '#references',
          text: 'References',
        },
        {
          href: '#author-list',
          text: 'Author Information',
        },
      ],
    },
    {
      description: 'no peer review',
      metaDataExample: metaData,
      peerReviewExample: undefined,
      expectedJumpToLinks: [
        {
          href: '#abstract',
          text: 'Abstract',
        },
        {
          href: '#s1',
          text: 'Introduction',
        },
        {
          href: '#s2',
          text: 'Results',
        },
        {
          href: '#s3',
          text: 'Discussion',
        },
        {
          href: '#s4',
          text: 'Materials and methods',
        },
        {
          href: '#s5',
          text: 'Data and material availability',
        },
        {
          href: '#references',
          text: 'References',
        },
        {
          href: '#author-list',
          text: 'Author Information',
        },
      ],
    },
    {
      description: 'no metadata headings',
      metaDataExample: { ...metaData, headings: [] },
      peerReviewExample: undefined,
      expectedJumpToLinks: [
        {
          href: '#abstract',
          text: 'Abstract',
        },
        {
          href: '#references',
          text: 'References',
        },
        {
          href: '#author-list',
          text: 'Author Information',
        },
      ],
    },
  ])('passes down the correct headings to jump-to-menu ($description)', ({
    metaDataExample,
    peerReviewExample,
    expectedJumpToLinks,
  }) => {
    const { container } = render(<ArticleFullTextTab content={content} metaData={metaDataExample} peerReview={peerReviewExample}/>);
    const jumpLinks = container.querySelectorAll('.jump-menu-list__link');

    const jumpLinkValues = Array.from(jumpLinks).map((link: Element) => (
      {
        href: link.getAttribute('href')!,
        text: link.textContent!,
      }
    ));

    expect(jumpLinkValues).toStrictEqual(expectedJumpToLinks);
  });

  it('uses the heading ids for the hrefs in jump-to-menu', () => {
    const { container } = render(<ArticleFullTextTab content={content} metaData={metaData} peerReview={peerReview}/>);

    const headings = Array.from(container.querySelectorAll('section[id], h1, .heading-1'));
    const ids = headings.map(({ id }) => id);

    const links = Array.from(container.querySelectorAll<HTMLAnchorElement>('.jump-menu-list__link'));
    const hrefs = links.map(({ href }) => href.slice(href.indexOf('#') + 1));

    expect(ids).toStrictEqual(hrefs);
  });
});
