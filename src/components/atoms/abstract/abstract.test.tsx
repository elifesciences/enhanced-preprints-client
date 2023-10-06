/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
import { cleanup, render, screen } from '@testing-library/react';
import {
  expect, test, describe, afterEach,
} from 'bun:test';
import { Abstract } from './abstract';

describe('ArticleContent', () => {
  afterEach(cleanup);
  test('renders with a simple string content', async () => {
    render(<Abstract content="I am an article"/>);

    expect(screen.getByText('I am an article')).toBeTruthy();
    expect(screen.getByText('I am an article').tagName).toStrictEqual('SECTION');
  });

  test('renders with a complex content', async () => {
    render(<Abstract content={{ type: 'Emphasis', content: 'I am an em' }}/>);

    expect(screen.getByText('I am an em')).toBeTruthy();
    expect(screen.getByText('I am an em').tagName).toStrictEqual('EM');
  });

  test('renders with an array content', async () => {
    render(<Abstract content={['I ', 'am ', 'an ', 'array ']}/>);
    expect(screen.getByText('I am an array', { exact: false })).toBeTruthy();
    expect(screen.getByText('I am an array').tagName).toStrictEqual('SECTION');
  });
});
