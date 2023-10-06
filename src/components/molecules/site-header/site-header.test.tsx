/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
import { expect, test, describe, afterEach } from 'bun:test';
import { cleanup, render, screen } from '@testing-library/react';
import { SiteHeader } from './site-header';

describe('SiteHeader', () => {
  afterEach(cleanup);
  test('renders the logo image with alt text', () => {
    render(<SiteHeader />);

    expect(screen.getByAltText('eLife logo', { exact: false })).toBeTruthy();
    expect(screen.getByText('Enhanced Preprints')).toBeTruthy();
  });
});
