import { render, screen } from '@testing-library/react';
import { ArticleStatus } from './article-status';

describe('ArticleStatus', () => {
  it('renders the article status and type if passed in', () => {
    render(<ArticleStatus articleType="cookie recipe" articleStatus="delicious" />);

    expect(screen.getByText('cookie recipe')).toBeInTheDocument();
    expect(screen.getByText('delicious')).toBeInTheDocument();
  });
});
