/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
import { expect, test, describe, afterEach } from 'bun:test';
import { cleanup, render, screen } from '@testing-library/react';
import { Citation } from './citation';
import { authors, citation } from '../../../utils/mocks';
import { Author } from '../../../types';

describe('Citation', () => {
  afterEach(cleanup);
  const authorNames = authors.map((author: Author) => `${author.type === 'Organization' && author.name ? author.name : `${(author.givenNames ?? []).join(' ')} ${(author.familyNames ?? []).join(' ')}`}`);

  test.each(authorNames)('renders author: %s', (author) => {
    render(<Citation citation={citation} />);

    expect(screen.getByText(author)).toBeTruthy();
  });

  test('renders the year', () => {
    render(<Citation citation={citation} />);

    expect(screen.getByText(citation.year)).toBeTruthy();
  });

  test('renders the title', () => {
    render(<Citation citation={citation} />);

    expect(screen.getByText(citation.title)).toBeTruthy();
  });

  test('renders the journal', () => {
    render(<Citation citation={citation} />);

    expect(screen.getByText(citation.journal)).toBeTruthy();
  });

  test('renders the volume', () => {
    render(<Citation citation={citation} />);

    expect(screen.getByText(citation.volume)).toBeTruthy();
  });

  test('renders the eLocationId', () => {
    render(<Citation citation={citation} />);

    expect(screen.getByText(citation.eLocationId, { exact: false })).toBeTruthy();
  });

  test('renders the year', () => {
    const { container } = render(<Citation citation={{ ...citation, year: undefined }} />);

    expect(container.querySelector('.citation__authors_list_suffix')).toBeNull();

    const { container: container2 } = render(<Citation citation={{ ...citation, year: 1979 }} />);

    expect(screen.getByText('1979')).not.toThrow();
    expect(container2.querySelector('.citation__authors_list_suffix')).toBeTruthy();
  });

  test('does not render the ":" when eLocationId xor volume', () => {
    render(<Citation citation={{ ...citation, volume: undefined }} />);

    expect(screen.queryByAltText(':78910')).toBeNull();

    render(<Citation citation={{ ...citation, eLocationId: undefined }} />);

    expect(screen.queryByAltText('42:')).toBeNull();
  });

  test('renders the doi url', () => {
    render(<Citation citation={citation} />);

    expect(screen.getByText(`https://doi.org/${citation.doi}`)).toBeTruthy();
  });
});
