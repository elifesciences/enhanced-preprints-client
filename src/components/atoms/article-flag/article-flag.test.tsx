import { render, screen } from '@testing-library/react';
import { ArticleFlag } from './article-flag';

describe('ArticleFlag', () => {
  it('should render correctly with all the provided props', () => {
    render(<ArticleFlag flagText='flag' url='www.google.com'/>);
    const flag = screen.getByText('flag');

    expect(flag).toBeInTheDocument();
    expect(flag.classList).toContain('article-flag__link');
    expect(flag.getAttribute('href')).toStrictEqual('www.google.com');
  });
});
