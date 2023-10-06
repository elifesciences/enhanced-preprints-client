/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
import { expect, test, describe, afterEach } from 'bun:test';
import { cleanup, render, screen } from '@testing-library/react';
import { ArticleFlag } from './article-flag';

describe('ArticleFlag', () => {
  afterEach(cleanup);
  test('should render correctly with all the provided props', () => {
    render(<ArticleFlag flagText='flag' url='www.google.com'/>);
    const flag = screen.getByText('flag');

    expect(flag).toBeTruthy();
    expect(flag.classList).toContain('article-flag__link');
    expect(flag.getAttribute('href')).toStrictEqual('www.google.com');
  });
});
