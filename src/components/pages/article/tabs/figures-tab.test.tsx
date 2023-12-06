import { render } from '@testing-library/react';
import { content } from '../../../../utils/mocks';
import { ArticleFiguresTab } from './figures-tab';
import { contentToJsx } from '../../../../utils/content-to-jsx';
import { contentToFigures } from '../../../../utils/content-to-figures';

describe('FiguresTab', () => {
  it('renders with figures tab', () => {
    expect(() => render(<ArticleFiguresTab content={contentToJsx(contentToFigures(content))}/>)).not.toThrow();
  });

  it('renders every figure and table from the content', () => {
    const { container } = render(<ArticleFiguresTab content={contentToJsx(contentToFigures(content))}/>);

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
