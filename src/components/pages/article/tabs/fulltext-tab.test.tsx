import { render } from '@testing-library/react';
import { metaData, peerReview, content } from '../../../../utils/mocks';
import { ArticleFullTextTab } from './fulltext-tab';
import { contentToJsx } from '../../../../utils/content';
import '../../../../i18n';

jest.mock('next/navigation', () => ({
  usePathname: () => '',
}));

describe('FulltextTab', () => {
  it('renders with fulltext tab', () => {
    expect(() => render(<ArticleFullTextTab metrics={null} headings={[]} content={contentToJsx(content)} metaData={metaData} peerReview={peerReview}/>)).not.toThrow();
  });

  it('renders content in fulltext tab', () => {
    const { container } = render(<ArticleFullTextTab metrics={null} headings={[]} content={contentToJsx(content)} metaData={metaData} peerReview={peerReview}/>);
    expect(container.querySelector('.article-body > h1')).toHaveTextContent('Introduction');
  });

  it('does not render the evaluation summary', () => {
    const { container } = render(<ArticleFullTextTab metrics={null} headings={[]} content={''} metaData={metaData}/>);

    expect(container.querySelector('#assessment')).toBeNull();
  });

  it('renders the evaluation summary when one is passed in', () => {
    const { container } = render(<ArticleFullTextTab metrics={null} headings={[]} content={''} metaData={metaData} peerReview={peerReview}/>);

    expect(container.querySelector('#assessment>div:first-child')).toHaveTextContent('This paper is important and is very convincing');
  });

  it('passes down the correct headings to jump-to-menu no peer-review', () => {
    const headings = [
      { id: 's1', text: 'Introduction' },
      { id: 's2', text: 'Results' },
      { id: 's3', text: 'Discussion' },
      { id: 's4', text: 'Materials and methods' },
      { id: 's5', text: 'Data and material availability' },
    ];
    const expectedJumpToLinks = [
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
        href: '#article-and-author-information',
        text: 'Article and Author Information',
      },
    ];

    const { container } = render(<ArticleFullTextTab metrics={null} headings={headings} content={''} metaData={metaData} />);
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

  it('passes down the correct headings to jump-to-menu complete', () => {
    const headings = [
      { id: 's1', text: 'Introduction' },
      { id: 's2', text: 'Results' },
      { id: 's3', text: 'Discussion' },
      { id: 's4', text: 'Materials and methods' },
      { id: 's5', text: 'Data and material availability' },
    ];
    const expectedJumpToLinks = [
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
        href: '#article-and-author-information',
        text: 'Article and Author Information',
      },
    ];

    const { container } = render(<ArticleFullTextTab metrics={null} headings={headings} content={''} metaData={metaData} peerReview={peerReview}/>);
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
    const { container } = render(<ArticleFullTextTab metrics={null} headings={[]} content={''} metaData={metaData} peerReview={peerReview}/>);

    const headings = Array.from(container.querySelectorAll('.article-body-container section[id], h1, .heading-1'));
    const ids = headings.map(({ id }) => id);

    const links = Array.from(container.querySelectorAll<HTMLAnchorElement>('.jump-menu-list__link'));
    const hrefs = links.map(({ href }) => href.slice(href.indexOf('#') + 1));

    expect(ids).toStrictEqual(hrefs);
  });
});
