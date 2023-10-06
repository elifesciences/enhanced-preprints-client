/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
import { expect, test, describe, afterEach } from 'bun:test';
import { cleanup, render, screen } from '@testing-library/react';
import { ArticleContent } from './article-content';

describe('ArticleContent', () => {
  afterEach(cleanup);
  test('renders with a simple string content', async () => {
    render(<ArticleContent content="I am an article"/>);

    expect(screen.getByText('I am an article')).toBeTruthy();
    expect(screen.getByText('I am an article').tagName).toStrictEqual('ARTICLE');
  });

  test('renders with a complex content', async () => {
    render(<ArticleContent content={{ type: 'Emphasis', content: 'I am an em' }}/>);

    expect(screen.getByText('I am an em')).toBeTruthy();
    expect(screen.getByText('I am an em').tagName).toStrictEqual('EM');
  });

  test('renders with an array content', async () => {
    render(<ArticleContent content={['I ', 'am ', 'an ', 'array ']}/>);
    expect(screen.getByText('I am an array', { exact: false })).toBeTruthy();
    expect(screen.getByText('I am an array').tagName).toStrictEqual('ARTICLE');
  });
});
