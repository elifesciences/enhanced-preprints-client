import { render, screen } from '@testing-library/react';
import { ArticleFlagList } from './article-flag-list';

const msas = [
  'Mad Science',
  'Alchemy',
];

describe('ArticleFlagList', () => {
  it('should render with all of the props', () => {
    render(<ArticleFlagList msas={msas} importance="Landmark" strengthOfEvidence="Tour-de-force"/>);

    expect(screen.getByText(msas[0])).toBeInTheDocument();
    expect(screen.getByText(msas[1])).toBeInTheDocument();
    expect(screen.getByText('Landmark')).toBeInTheDocument();
    expect(screen.getByText('Tour-de-force')).toBeInTheDocument();
  });

  it('should correctly pass in the msa flag', () => {
    render(<ArticleFlagList msas={msas} importance="Landmark" strengthOfEvidence="Tour-de-force"/>);

    expect(screen.getByText(msas[0])).toHaveClass('article-flags__link-msa');
    expect(screen.getByText(msas[1])).toHaveClass('article-flags__link-msa');
    expect(screen.getByText('Landmark')).not.toHaveClass('article-flags__link-msa');
    expect(screen.getByText('Tour-de-force')).not.toHaveClass('article-flags__link-msa');
  });
});
