import { render, screen } from '@testing-library/react';
import { ArticleFlag } from './article-flag';

describe('ArticleFlag', () => {
  it('should render correctly with all the provided props', () => {
    render(<ArticleFlag flagText='flag' isMSA={true} url='www.google.com'/>);
    const flag = screen.getByText('flag');

    expect(flag).toBeInTheDocument();
    expect(flag.classList).toContain('article-flag__link-msa');
    expect(flag.getAttribute('href')).toStrictEqual('www.google.com');
  });

  it('should not have the msa class when not an msa', () => {
    render(<ArticleFlag flagText='flag' isMSA={false} url='www.google.com'/>);
    const flag = screen.getByText('flag');

    expect(flag.classList).not.toContain('article-flag__link-msa');
  });
});
