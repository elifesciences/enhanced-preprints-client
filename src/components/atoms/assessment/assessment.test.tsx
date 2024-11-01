import { fireEvent, render, screen } from '@testing-library/react';
import { significanceTerms, strengthTerms } from '../../../utils/terms';
import { Assessment } from './assessment';
import { i18n } from '../../../i18n';

let mockPathName = '';
jest.mock('next/navigation', () => ({
  usePathname: () => mockPathName,
}));

describe('Assessment', () => {
  // TODO: remove dependance on elife namespace and/or translation
  i18n.setDefaultNamespace('elife');

  it('renders with a simple string content', async () => {
    mockPathName = '';
    render(<Assessment content="I am an article"/>);

    expect(screen.getByText('I am an article')).toBeInTheDocument();
  });

  it('renders with a complex html', async () => {
    mockPathName = '';
    render(<Assessment content={`<h1>A title</h1>

<em>I am an em<em>`}/>);

    expect(screen.getByText('A title')).toBeInTheDocument();
    expect(screen.getByText('A title').tagName).toStrictEqual('H1');

    expect(screen.getByText('I am an em')).toBeInTheDocument();
    expect(screen.getByText('I am an em').tagName).toStrictEqual('EM');
  });

  it('highlights the terms within the content', async () => {
    mockPathName = '';
    render(<Assessment content="I am an important article that is very convincing dslfkjhas"/>);

    const highlightedElementImportant = document.querySelector('strong.highlighted-term:first-child');
    expect(highlightedElementImportant).toBeInTheDocument();
    expect(highlightedElementImportant).toHaveTextContent('important');

    const highlightedElementConvincing = document.querySelector('strong.highlighted-term:nth-child(2)');
    expect(highlightedElementConvincing).toBeInTheDocument();
    expect(highlightedElementConvincing).toHaveTextContent('convincing');
  });

  it('highlights the terms within the content, regardless of case', async () => {
    mockPathName = '';
    render(<Assessment content="I am an ImPoRtAnt article that is very CONVINCING dslfkjhas"/>);

    expect(screen.getByText('ImPoRtAnt')).toBeInTheDocument();
    expect(screen.getByText('ImPoRtAnt').tagName).toStrictEqual('STRONG');

    expect(screen.getByText('CONVINCING')).toBeInTheDocument();
    expect(screen.getByText('CONVINCING').tagName).toStrictEqual('STRONG');
  });

  it.each([...strengthTerms, ...significanceTerms])('highlights the term: %s when review-content is an editors assessment', async (term) => {
    mockPathName = '';
    render(<Assessment content={`the term is ${term} and should be bold`}/>);

    const highlightedElement = document.querySelector('strong.highlighted-term');
    expect(highlightedElement).toBeInTheDocument();
    expect(highlightedElement).toHaveTextContent(term);
  });

  it('shows links to explain assessment terms', async () => {
    mockPathName = '';
    render(<Assessment content="I have reviewed it, and it's good"/>);

    expect(screen.getByText('Learn more about eLife assessments')).toBeInTheDocument();
    expect(document.querySelector('.assessment__fixed_text a')).toHaveAttribute('href', 'https://elifesciences.org/about/elife-assessments');
  });

  it('has correct aria-expanded attribute values on click', async () => {
    mockPathName = '';
    render(<Assessment content="I have reviewed it, and it's good"/>);

    const expandLinkBefore = screen.getByText('Read more about this assessment');
    expect(expandLinkBefore).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(expandLinkBefore);

    const expandLinkAfter = screen.getByText('Show less');
    expect(expandLinkAfter).toHaveAttribute('aria-expanded', 'true');
  });

  it('renders the DOI when it is passed in', async () => {
    mockPathName = '';
    render(<Assessment content="I am an article" doi="12345-real-DOI"/>);

    expect(screen.getByText('https://doi.org/12345-real-DOI')).toBeInTheDocument();
  });

  describe('pdf route', () => {
    it('does not render the expanded content', () => {
      mockPathName = 'foo/bar/pdf';
      render(<Assessment content="I have reviewed it, and it's good"/>);

      expect(document.querySelector('.assessment-collapsable__hidden')).toBeInTheDocument();
    });

    it('does not render the expand link', () => {
      mockPathName = 'foo/bar/pdf';
      render(<Assessment content="I have reviewed it, and it's good"/>);

      expect(screen.queryByText('Read more about this assessment')).not.toBeInTheDocument();
      expect(screen.queryByText('Show less')).not.toBeInTheDocument();
    });
  });
});
