import { render, screen } from '@testing-library/react';
import { Citation } from './citation';
import { authors, citation } from '../../../utils/mocks';
import { Author } from '../../../types';

describe('Citation', () => {
  const authorNames = authors.map((author: Author) => `${author.givenNames?.join(' ')} ${author.familyNames?.join(' ')}`);

  it.each(authorNames)('renders author: %s', (author) => {
    render(<Citation citation={citation} />);

    expect(screen.getByText(author)).toBeInTheDocument();
  });

  it('renders the year', () => {
    render(<Citation citation={citation} />);

    expect(screen.getByText(citation.year)).toBeInTheDocument();
  });

  it('renders the title', () => {
    render(<Citation citation={citation} />);

    expect(screen.getByText(citation.title)).toBeInTheDocument();
  });

  it('renders the journal', () => {
    render(<Citation citation={citation} />);

    expect(screen.getByText(citation.journal)).toBeInTheDocument();
  });

  it('renders the volume', () => {
    render(<Citation citation={citation} />);

    expect(screen.getByText(`${citation.volume}:`)).toBeInTheDocument();
  });

  it('renders the id', () => {
    render(<Citation citation={citation} />);

    expect(screen.getByText(citation.eLocationId)).toBeInTheDocument();
  });

  it('renders the doi url', () => {
    render(<Citation citation={citation} />);

    expect(screen.getByText(`https://doi.org/${citation.doi}`)).toBeInTheDocument();
  });
});
