/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
import { expect, test, describe, afterEach } from 'bun:test';
import { cleanup, render, screen } from '@testing-library/react';
import { citation } from '../../../utils/mocks';
import { ArticleStatus } from './article-status';

describe('ArticleStatus', () => {
  afterEach(cleanup);
  test('renders the article status and type if passed in', () => {
    render(<ArticleStatus articleType="cookie recipe" articleStatus="delicious" pdfUrl='#' doi='www.google.com' title='I am a title' citation={citation} msid="12345"/>);

    expect(screen.getByText('cookie recipe')).toBeTruthy();
    expect(screen.getByText('delicious')).toBeTruthy();
  });
});
