import { render, screen } from '@testing-library/react';
import { ReviewContent } from './review-content';

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
    render(<ReviewContent isAssessment={true} content="I am an important article that is very convincing dslfkjhas"/>);

    expect(screen.getByText('important')).toBeInTheDocument();
    expect(screen.getByText('important').tagName).toStrictEqual('STRONG');

    expect(screen.getByText('convincing')).toBeInTheDocument();
    expect(screen.getByText('convincing').tagName).toStrictEqual('STRONG');
  });

  it('does not highlight terms unless term is exact', async () => {
    render(<ReviewContent isAssessment={true} content="I am an important article that is very convincingly good."/>);

    expect(screen.queryByText('convincing')).not.toBeInTheDocument();
  });

  it('shows links to explain assessment terms', async () => {
    render(<ReviewContent isAssessment={true} content="I have reviewed it, and it's good" peerReviewUrl="#"/>);

    expect(screen.getByText('Read the peer reviews')).toBeInTheDocument();
    expect(screen.getByText('About eLife assessments')).toBeInTheDocument();
  });
});
