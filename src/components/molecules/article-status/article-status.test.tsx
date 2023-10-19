import { render, screen } from '@testing-library/react';
import { citation } from '../../../utils/mocks';
import { ArticleStatus } from './article-status';

describe('ArticleStatus', () => {
  it('renders the article status and type if passed in', () => {
    render(<ArticleStatus articleType="cookie recipe" articleStatus="delicious" pdfUrl='#' doi='www.google.com' title='I am a title' citation={citation} msid="12345"/>);

    expect(screen.getByText('cookie recipe')).toBeInTheDocument();
    expect(screen.getByText('delicious')).toBeInTheDocument();
  });
});
