import { render } from '@testing-library/react';
import { ArticleFiguresTab } from './figures-tab';
import { contentToFigures, contentToJsx, contentMock } from '../../../../content';

describe('FiguresTab', () => {
  it('renders with figures tab', () => {
    expect(() => render(<ArticleFiguresTab content={contentToJsx(contentToFigures(contentMock))}/>)).not.toThrow();
  });

  it('renders every figure and table from the content', () => {
    const { container } = render(<ArticleFiguresTab content={contentToJsx(contentToFigures(contentMock))}/>);

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
