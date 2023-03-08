import { render, screen } from '@testing-library/react';
import { ReviewContent, terms } from './review-content';

describe('ArticleContent', () => {
  it('renders with a simple string content', async () => {
    render(<ReviewContent content="I am an article"/>);

    expect(screen.getByText('I am an article')).toBeInTheDocument();
  });

  it('renders with a complex html', async () => {
    render(<ReviewContent content={`<h1>A title</h1>

<em>I am an em<em>`}/>);

    expect(screen.getByText('A title')).toBeInTheDocument();
    expect(screen.getByText('A title').tagName).toStrictEqual('H1');

    expect(screen.getByText('I am an em')).toBeInTheDocument();
    expect(screen.getByText('I am an em').tagName).toStrictEqual('EM');
  });

  it('highlights the terms when an assessment', async () => {
    render(<ReviewContent isAssessment={true} content="I am an Important article that is very convincingly dslfkjhas"/>);

    expect(screen.getByText('Important')).toBeInTheDocument();
    expect(screen.getByText('Important').tagName).toStrictEqual('STRONG');

    expect(screen.getByText('convincingly')).toBeInTheDocument();
    expect(screen.getByText('convincingly').tagName).toStrictEqual('STRONG');
  });

  it.each(terms)('highlights the term: %s when review-content is an editors assessment', async (term) => {
    const content = term.includes('[') ? `the term is ${term.replace(/\[.|]/g, '')} and ${term.replace(/\[|.]/g, '')}  and should be bold` : `the term is ${term}  and should be bold`;
    render(<ReviewContent isAssessment={true} content={content}/>);
    if (term.includes('[')) {
      expect(screen.getByText(term.replace(/\[.|]/g, ''))).toBeInTheDocument();
      expect(screen.getByText(term.replace(/\[.|]/g, '')).tagName).toStrictEqual('STRONG');

      expect(screen.getByText(term.replace(/\[|.]/g, ''))).toBeInTheDocument();
      expect(screen.getByText(term.replace(/\[|.]/g, '')).tagName).toStrictEqual('STRONG');
    } else {
      expect(screen.getByText(term)).toBeInTheDocument();
      expect(screen.getByText(term).tagName).toStrictEqual('STRONG');
    }
  });

  it('does not highlight terms unless term is exact', async () => {
    render(<ReviewContent isAssessment={true} content="I am an exceptionally important article that is very good."/>);

    expect(screen.getByText(/exceptionally/).tagName).toStrictEqual('DIV');
    expect(screen.getByText(/important/).tagName).toStrictEqual('STRONG');
  });

  it('shows links to explain assessment terms', async () => {
    render(<ReviewContent isAssessment={true} content="I have reviewed it, and it's good" peerReviewUrl="#"/>);

    expect(screen.getByText('Read the peer reviews')).toBeInTheDocument();
    expect(screen.getByText('About eLife assessments')).toBeInTheDocument();
  });
});
