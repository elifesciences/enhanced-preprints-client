import { render, screen } from '@testing-library/react';
import { Author } from '../../../types';
import { AuthorList } from './author-list';
import { generateAuthorId } from '../../../utils/generators';
import { authors, authorNotes } from '../../../utils/mocks';

const getName = ({ givenNames, familyNames, honorificSuffix }: Author) => `${givenNames && givenNames.join(' ')} ${familyNames && familyNames.join(' ')}${honorificSuffix ? ` ${honorificSuffix}` : ''}`;
const getFirstAffiliation = ({ affiliations }: Author): string => (affiliations ? affiliations[0].name : '');
const getAffiliationAndAuthor = (author: Author) => ({ name: getName(author), affiliation: getFirstAffiliation(author) });

describe('AuthorList', () => {
  it.each(authors.filter(({ type }) => type !== 'Organization').map(getName))('renders each author in the list: %s', (name) => {
    render(<AuthorList authors={authors} authorNotes={authorNotes} />);

    expect(screen.getByText(name)).toBeInTheDocument();
  });

  it.each(authors.filter(({ type }) => type !== 'Organization').map(getAffiliationAndAuthor))(
    'renders the the affiliation: $affiliation for author: $name',
    ({ affiliation, name }) => {
      render(<AuthorList authors={authors} authorNotes={authorNotes} />);

      expect(screen.getByText(name).nextSibling).toHaveTextContent(affiliation);
    },
  );

  it('renders organizations correctly', () => {
    render(<AuthorList authors={authors} authorNotes={authorNotes} />);

    expect(screen.getByText('the Brain Interfacing Laboratory')).toBeInTheDocument();
  });

  it('renders the authors ORCID\'s', () => {
    render(<AuthorList authors={authors} authorNotes={[]} />);

    expect(screen.getByText('Steve Rogers').nextSibling?.nextSibling).toHaveTextContent('0000-0002-1234-5678, 0000-0002-1234-5679');
    expect(screen.getByText('Antony Stark').nextSibling?.nextSibling).not.toBeInTheDocument();
    expect(screen.getByText('Natasha Romanov').nextSibling?.nextSibling).not.toBeInTheDocument();
    expect(screen.getByText('Arthur Curry').nextSibling?.nextSibling).toHaveTextContent('0000-0002-1234-5688');
    expect(screen.getByText('Oliver Queen').nextSibling?.nextSibling).not.toBeInTheDocument();
  });

  it('does not render other identifiers', () => {
    render(<AuthorList authors={[
      {
        givenNames: ['Arthur'],
        familyNames: ['Curry'],
        affiliations: [{ name: 'Justice League', address: { addressCountry: 'Arctic' } }],
        identifiers: [
          { type: 'PropertyValue', propertyID: 'foo', value: 'should not be rendered' },
          { type: 'PropertyValue', propertyID: 'https://registry.identifiers.org/registry/orcid', value: 'http://orcid.org/0000-0002-1234-5678' },
        ],
      },
    ]} authorNotes={[]} />);

    expect(screen.queryByText('should not be rendered')).not.toBeInTheDocument();
    expect(screen.getByText('0000-0002-1234-5678')).toBeInTheDocument();
  });

  it.each(authors.map(generateAuthorId))('should contain an id with the author id', (id) => {
    const { container } = render(<AuthorList authors={authors} authorNotes={[]} />);

    expect(container.querySelector(`[id="${id}"]`)).toBeInTheDocument();
  });
});
