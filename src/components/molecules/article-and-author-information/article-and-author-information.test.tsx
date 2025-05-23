import {
  getByText,
  queryByText,
  render,
  screen,
} from '@testing-library/react';
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

  it('does not render version history if no versions', () => {
    render(<ArticleAndAuthorInformation authors={[]} authorNotes={[]} versions={[]} />);

    expect(screen.queryByText('Version history')).not.toBeInTheDocument();
  });

  it('renders author notes', () => {
    render(<ArticleAndAuthorInformation authors={[]} authorNotes={authorNotes} versions={[]} />);

    expect(screen.getByText('Author Notes')).toBeInTheDocument();
  });

  it('renders only orphaned author notes', () => {
    render(<ArticleAndAuthorInformation authors={authors} authorNotes={authorNotes} versions={[]} />);
    const authorNotesElement = screen.getByText('Author Notes').parentElement;

    expect(authorNotesElement).toBeInTheDocument();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    expect(getByText(authorNotesElement!, 'Generic footnote')).toBeInTheDocument();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    expect(getByText(authorNotesElement!, 'Generic footnote with an id')).toBeInTheDocument();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    expect(queryByText(authorNotesElement!, 'These authors contributed equally')).not.toBeInTheDocument();
  });

  it('does not render author notes section if no notes', () => {
    render(<ArticleAndAuthorInformation authors={[]} authorNotes={[]} versions={[]} />);

    expect(screen.queryByText('Author Notes')).not.toBeInTheDocument();
  });

  it('does not render author notes section if no unclaimed notes', () => {
    render(<ArticleAndAuthorInformation authors={authors} authorNotes={[authorNotes[0]]} versions={[]} />);

    expect(screen.queryByText('Author Notes')).not.toBeInTheDocument();
  });
});
