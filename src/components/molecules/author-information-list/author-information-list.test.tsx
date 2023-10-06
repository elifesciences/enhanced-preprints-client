import { cleanup, render, screen } from '@testing-library/react';
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
import { expect, test, describe, afterEach } from 'bun:test';
import { Author } from '../../../types';
import { AuthorInformationList } from './author-information-list';
import { createAuthorId } from '../../../utils/create-author-id';
import { authors } from '../../../utils/mocks';

const getName = ({ givenNames, familyNames, honorificSuffix }: Author) => `${givenNames && givenNames.join(' ')} ${familyNames && familyNames.join(' ')}${honorificSuffix ? ` ${honorificSuffix}` : ''}`;
const getFirstAffiliation = ({ affiliations }: Author): string => (affiliations ? affiliations[0].name : '');
const getAffiliationAndAuthor = (author: Author) => ({ name: getName(author), affiliation: getFirstAffiliation(author) });

describe('AuthorInformationList', () => {
  afterEach(cleanup);
  test('renders correctly', () => {
    render(<AuthorInformationList authors={authors}/>);

    expect(screen.getByText('Author information')).toBeTruthy();
  });

  test.each(authors.filter(({ type }) => type !== 'Organization').map(getName))('renders each author in the list: %s', (name) => {
    render(<AuthorInformationList authors={authors}/>);

    expect(screen.getByText(name)).toBeTruthy();
  });

  test.each(authors.filter(({ type }) => type !== 'Organization').map(getAffiliationAndAuthor))(
    'renders the the affiliation: $affiliation for author: $name',
    ({ affiliation, name }) => {
      render(<AuthorInformationList authors={authors}/>);

      expect(screen.getByText(name).nextSibling?.textContent).toContain(affiliation);
    },
  );

  test('renders organiizations correctly', () => {
    render(<AuthorInformationList authors={authors}/>);

    expect(screen.getByText('the Brain Interfacing Laboratory')).toBeTruthy();
  });

  test('renders the authors ORCID\'s', () => {
    render(<AuthorInformationList authors={authors}/>);

    expect(screen.getByText('Steve Rogers').nextSibling?.nextSibling?.textContent).toContain('0000-0002-1234-5678, 0000-0002-1234-5679');
    expect(screen.getByText('Antony Stark').nextSibling?.nextSibling).toBeNull();
    expect(screen.getByText('Natasha Romanov').nextSibling?.nextSibling).toBeNull();
    expect(screen.getByText('Arthur Curry').nextSibling?.nextSibling?.textContent).toContain('0000-0002-1234-5688');
    expect(screen.getByText('Oliver Queen').nextSibling?.nextSibling).toBeNull();
  });

  test.each(authors.map(createAuthorId))('should contain an id with the author id', (id) => {
    const { container } = render(<AuthorInformationList authors={authors}/>);

    expect(container.querySelector(`[id="${id}"]`)).toBeTruthy();
  });
});
