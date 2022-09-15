import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import { ArticleContent } from './article-content';

describe('ArticleContent', () => {
  it('renders with a simple string content', async () => {
    fetchMock.restore().mock('http://localhost:3000/content/12345', '"I am an article"');
    render(<ArticleContent doi="12345"/>);
    await waitForElementToBeRemoved(() => screen.queryByText('Loading article...'));

    expect(screen.getByText('I am an article')).toBeInTheDocument();
    expect(screen.getByText('I am an article').tagName).toStrictEqual('ARTICLE');
  });

  it('renders with a complex content', async () => {
    fetchMock.restore().mock('http://localhost:3000/content/12345', { type: 'Emphasis', content: 'I am an em' });
    render(<ArticleContent doi="12345"/>);
    await waitForElementToBeRemoved(() => screen.queryByText('Loading article...'));

    expect(screen.getByText('I am an em')).toBeInTheDocument();
    expect(screen.getByText('I am an em').tagName).toStrictEqual('EM');
  });

  it('renders with an array content', async () => {
    fetchMock.restore().mock('http://localhost:3000/content/12345', ['I ', 'am ', 'an ', 'array ']);
    render(<ArticleContent doi="12345"/>);
    await waitForElementToBeRemoved(() => screen.queryByText('Loading article...'));

    expect(screen.getByText('I am an array', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('I am an array').tagName).toStrictEqual('ARTICLE');
  });
});
