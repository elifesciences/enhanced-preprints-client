import { render, screen } from '@testing-library/react';
import { citation } from '../../../utils/mocks';
import { ArticleStatus } from './article-status';

describe('ArticleStatus', () => {
  it('renders the article status and type if passed in', () => {
    render(<ArticleStatus timeline={{
      events: [{
        version: 2, date: '2024-05-29', versionIndicator: 'v2', url: '#',
      }],
    }} pdfUrl='#' doi='www.google.com' title='I am a title' citation={citation} msid="12345"/>);

    expect(screen.getByText('Reviewed Preprint')).toBeInTheDocument();
    expect(screen.getByText('v2')).toBeInTheDocument();
    expect(screen.getByText('May 29, 2024')).toBeInTheDocument();
    expect(screen.getByText('Revised by authors')).toBeInTheDocument();
  });
});
