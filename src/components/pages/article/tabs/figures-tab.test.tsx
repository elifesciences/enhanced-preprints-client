import { render } from '@testing-library/react';
import { content } from '../../../../utils/mocks';
import { ArticleFiguresTab } from './figures-tab';

describe('FiguresTab', () => {
  it('renders with figures tab', () => {
    expect(() => render(<ArticleFiguresTab content={content}/>)).not.toThrow();
  });

  it.todo('renders every figure and table from the content');
});
