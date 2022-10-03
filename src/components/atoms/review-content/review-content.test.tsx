import { render, screen } from '@testing-library/react';
import { ReviewContent } from './review-content';

describe('ArticleContent', () => {
  it('renders with a simple string content', async () => {
    render(<ReviewContent content="I am an article"/>);

    expect(screen.getByText('I am an article')).toBeInTheDocument();
    expect(screen.getByText('I am an article').tagName).toStrictEqual('P');
  });

  it('renders with a complex markdown', async () => {
    render(<ReviewContent content={`# Markdown title

*I am an em*`}/>);

    expect(screen.getByText('Markdown title')).toBeInTheDocument();
    expect(screen.getByText('Markdown title').tagName).toStrictEqual('H1');

    expect(screen.getByText('I am an em')).toBeInTheDocument();
    expect(screen.getByText('I am an em').tagName).toStrictEqual('EM');
  });
});
