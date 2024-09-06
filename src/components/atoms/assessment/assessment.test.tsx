import { fireEvent, render, screen } from '@testing-library/react';
import { significanceTerms, strengthTerms } from '../../../utils/terms';
import { Assessment } from './assessment';

describe('Assessment', () => {
  it('renders with a simple string content', async () => {
    render(<Assessment content="I am an article"/>);

    expect(screen.getByText('I am an article')).toBeInTheDocument();
  });

  it('renders with a complex html', async () => {
    render(<Assessment content={`<h1>A title</h1>

<em>I am an em<em>`}/>);

    expect(screen.getByText('A title')).toBeInTheDocument();
    expect(screen.getByText('A title').tagName).toStrictEqual('H1');

    expect(screen.getByText('I am an em')).toBeInTheDocument();
    expect(screen.getByText('I am an em').tagName).toStrictEqual('EM');
  });

  it('highlights the terms within the content', async () => {
    render(<Assessment content="I am an important article that is very convincing dslfkjhas"/>);

    const highlightedElementImportant = document.querySelector('strong.highlighted-term:first-child');
    expect(highlightedElementImportant).toBeInTheDocument();
    expect(highlightedElementImportant).toHaveTextContent('important');

    const highlightedElementConvincing = document.querySelector('strong.highlighted-term:nth-child(2)');
    expect(highlightedElementConvincing).toBeInTheDocument();
    expect(highlightedElementConvincing).toHaveTextContent('convincing');
  });

  it('highlights the terms within the content, regardless of case', async () => {
    render(<Assessment content="I am an ImPoRtAnt article that is very CONVINCING dslfkjhas"/>);

    expect(screen.getByText('ImPoRtAnt')).toBeInTheDocument();
    expect(screen.getByText('ImPoRtAnt').tagName).toStrictEqual('STRONG');

    expect(screen.getByText('CONVINCING')).toBeInTheDocument();
    expect(screen.getByText('CONVINCING').tagName).toStrictEqual('STRONG');
  });

  it.each([...strengthTerms, ...significanceTerms])('highlights the term: %s when review-content is an editors assessment', async (term) => {
    render(<Assessment content={`the term is ${term} and should be bold`}/>);

    const highlightedElement = document.querySelector('strong.highlighted-term');
    expect(highlightedElement).toBeInTheDocument();
    expect(highlightedElement).toHaveTextContent(term);
  });

  it('shows links to explain assessment terms', async () => {
    render(<Assessment content="I have reviewed it, and it's good" peerReviewUrl="#"/>);

    expect(screen.getByText('Learn more about eLife assessments')).toBeInTheDocument();
    expect(document.querySelector('.review-content-collapsable p a')).toHaveAttribute('href', 'https://elifesciences.org/inside-elife/db24dd46');
  });

  it('has correct aria-expanded attribute values on click', async () => {
    render(<Assessment content="I have reviewed it, and it's good" peerReviewUrl="#"/>);

    const expandLinkBefore = screen.getByText('Read more about this assessment');
    expect(expandLinkBefore).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(expandLinkBefore);

    const expandLinkAfter = screen.getByText('Show less');
    expect(expandLinkAfter).toHaveAttribute('aria-expanded', 'true');
  });
});
