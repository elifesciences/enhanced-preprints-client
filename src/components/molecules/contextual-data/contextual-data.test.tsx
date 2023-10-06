/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
import { expect, test, describe, afterEach } from 'bun:test';
import { cleanup, render, screen } from '@testing-library/react';
import { ContextualData } from './contextual-data';

describe('ContextualData', () => {
  afterEach(cleanup);
  test('renders the properties passed in', () => {
    render(<ContextualData citations={2} tweets={5000} views={12345} />);

    expect(screen.getByText('citations', { exact: false }).textContent).toStrictEqual('2 citations');
    expect(screen.getByText('tweets', { exact: false }).textContent).toStrictEqual('5000 tweets');
    expect(screen.getByText('views', { exact: false }).textContent).toStrictEqual('12345 views');
  });

  test('renders the non plural data labels', () => {
    render(<ContextualData citations={1} tweets={1} views={1} />);

    expect(screen.getByText('citation', { exact: false }).textContent).toStrictEqual('1 citation');
    expect(screen.getByText('tweet', { exact: false }).textContent).toStrictEqual('1 tweet');
    expect(screen.getByText('view', { exact: false }).textContent).toStrictEqual('1 view');
  });

  test('renders the correct zero data labels', () => {
    render(<ContextualData citations={0} tweets={0} views={0} />);

    expect(screen.getByText('citations', { exact: false }).textContent).toStrictEqual('0 citations');
    expect(screen.getByText('tweets', { exact: false }).textContent).toStrictEqual('0 tweets');
    expect(screen.getByText('views', { exact: false }).textContent).toStrictEqual('0 views');
  });
});
