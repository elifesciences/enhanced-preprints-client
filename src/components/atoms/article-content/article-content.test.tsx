import { render, screen } from '@testing-library/react';
import { ArticleContent } from './article-content';

describe('ArticleContent', () => {
  it('renders with a simple string content', () => {
    render(<ArticleContent content={'I am an article'}/>);

    expect(screen.getByText('I am an article')).toBeInTheDocument();
    expect(screen.getByText('I am an article').tagName).toStrictEqual('ARTICLE');
  });

  it('renders with a complex content', () => {
    render(<ArticleContent content={{ type: 'Emphasis', content: 'I am an em' }}/>);

    expect(screen.getByText('I am an em')).toBeInTheDocument();
    expect(screen.getByText('I am an em').tagName).toStrictEqual('EM');
  });

  it('renders with an array content', () => {
    render(<ArticleContent content={['I ', 'am ', 'an ', 'array ']}/>);

    expect(screen.getByText('I am an array', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('I am an array').tagName).toStrictEqual('ARTICLE');
  });
});
