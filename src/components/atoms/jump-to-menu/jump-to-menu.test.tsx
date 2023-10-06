/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
import { expect, test, describe, afterEach } from 'bun:test';
import { cleanup, render, screen } from '@testing-library/react';

import { Heading, JumpToMenu } from './jump-to-menu';

const headings = [
  { id: 's1', text: 'heading 1' },
  { id: 's2', text: 'heading 2' },
  { id: 's3', text: 'heading 3' },
  { id: null, text: 'heading 4' },
] as unknown as Heading[];

describe('JumpToMenu', () => {
  afterEach(cleanup);
  test('should render all the headings passed in as a prop', () => {
    render(<JumpToMenu headings={headings} />);

    expect(screen.getByText('heading 1')).toBeTruthy();
    expect(screen.getByText('heading 2')).toBeTruthy();
    expect(screen.getByText('heading 3')).toBeTruthy();
  });

  test('should check if heading has an id', () => {
    render(<JumpToMenu headings={headings} />);

    expect(screen.queryByText('heading 1')).toBeTruthy();
    expect(screen.queryByText('heading 2')).toBeTruthy();
    expect(screen.queryByText('heading 3')).toBeTruthy();
    expect(screen.queryByText('heading 4')).toBeNull();
  });

  test('should highlight the specified item', () => {
    render(<JumpToMenu headings={headings} />);

    expect(Array.from(screen.getByText('heading 1').parentElement?.classList || [])).toContain('jump-menu-list__item--active');
    expect(Array.from(screen.getByText('heading 2').parentElement?.classList || [])).not.toContain('jump-menu-list__item--active');
    expect(Array.from(screen.getByText('heading 3').parentElement?.classList || [])).not.toContain('jump-menu-list__item--active');
  });
});
