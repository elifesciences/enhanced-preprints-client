import { render, screen } from '@testing-library/react';
import { mockContent } from '../../atoms/article-content/mock-content';
import { ArticlePage } from './article';

describe('SiteHeader', () => {
  it('renders the article page', () => {
    render(<ArticlePage
      content={mockContent}
      msas={['msa1', 'msa2']}
      importance={'important'}
      strengthOfEvidence={'strong'}
      authors={[
        { givenNames: ['Joe'], familyNames: ['Blogs'] },
      ]}
      doi={'10.1101/123456'}
      title={'title'}
      citations={1}
      tweets={2}
      views={3}
    />);

    expect(screen.getByAltText('eLife logo', { exact: false }).parentElement?.parentElement?.classList).toContain('article-page');
  });
});
