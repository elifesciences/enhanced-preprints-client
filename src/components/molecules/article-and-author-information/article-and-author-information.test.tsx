import { render, screen } from '@testing-library/react';
import { ArticleAndAuthorInformation } from './article-and-author-information';
import { authors, authorNotes, versionHistory } from '../../../utils/mocks';

describe('ArticleAndAuthorInformation', () => {
  it('renders correctly', () => {
    render(<ArticleAndAuthorInformation authors={authors} authorNotes={authorNotes} versions={versionHistory} />);

    expect(screen.getByText('Article and author information')).toBeInTheDocument();
  });

  it('renders author list', () => {
    const { container } = render(<ArticleAndAuthorInformation authors={authors} authorNotes={authorNotes} versions={[]} />);

    expect(container.querySelector('.author-list')).toBeInTheDocument();
  });

  it('does not renders author list if no versions', () => {
    const { container } = render(<ArticleAndAuthorInformation authors={[]} authorNotes={[]} versions={[]} />);

    expect(container.querySelector('.author-list')).not.toBeInTheDocument();
  });

  it('renders version history', () => {
    render(<ArticleAndAuthorInformation authors={[]} authorNotes={[]} versions={versionHistory} />);

    expect(screen.getByText('Version history')).toBeInTheDocument();
  });

  it('does not renders version history if no versions', () => {
    render(<ArticleAndAuthorInformation authors={[]} authorNotes={[]} versions={[]} />);

    expect(screen.queryByText('Version history')).not.toBeInTheDocument();
  });
});
