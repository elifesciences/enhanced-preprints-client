/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
import { expect, test, describe, afterEach } from 'bun:test';
import { cleanup, render } from '@testing-library/react';
import { content } from '../../../../utils/mocks';
import { ArticleFiguresTab } from './figures-tab';

describe('FiguresTab', () => {
  afterEach(cleanup);
  test('renders with figures tab', () => {
    expect(() => render(<ArticleFiguresTab content={content}/>)).not.toThrow();
  });

  test('renders every figure and table from the content', () => {
    const { container } = render(<ArticleFiguresTab content={content}/>);

    const figures = Array.from(container.querySelectorAll('.article-body figure'));
    const ids = figures.map(({ id }) => id);

    expect(ids).toStrictEqual([
      'fig1',
      'fig2',
      'fig3',
      'fig4',
    ]);
  });
});
