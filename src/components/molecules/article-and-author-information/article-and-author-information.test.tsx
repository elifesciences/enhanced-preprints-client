import { render, screen } from '@testing-library/react';
import { Author } from '../../../types';
import { ArticleAndAuthorInformation } from './article-and-author-information';
import { createAuthorId } from '../../../utils/create-author-id';
import { authors, versionHistory } from '../../../utils/mocks';

const getName = ({ givenNames, familyNames, honorificSuffix }: Author) => `${givenNames && givenNames.join(' ')} ${familyNames && familyNames.join(' ')}${honorificSuffix ? ` ${honorificSuffix}` : ''}`;
const getFirstAffiliation = ({ affiliations }: Author): string => (affiliations ? affiliations[0].name : '');
const getAffiliationAndAuthor = (author: Author) => ({ name: getName(author), affiliation: getFirstAffiliation(author) });

describe('ArticleAndAuthorInformation', () => {
  it('renders correctly', () => {
    render(<ArticleAndAuthorInformation authors={authors} versions={versionHistory}/>);

    expect(screen.getByText('Article and author information')).toBeInTheDocument();
  });

  it.each(authors.filter(({ type }) => type !== 'Organization').map(getName))('renders each author in the list: %s', (name) => {
    render(<ArticleAndAuthorInformation authors={authors} versions={[]}/>);

    expect(screen.getByText(name)).toBeInTheDocument();
  });

  it.each(authors.filter(({ type }) => type !== 'Organization').map(getAffiliationAndAuthor))(
    'renders the the affiliation: $affiliation for author: $name',
    ({ affiliation, name }) => {
      render(<ArticleAndAuthorInformation authors={authors} versions={[]}/>);

      expect(screen.getByText(name).nextSibling).toHaveTextContent(affiliation);
    },
  );

  it('renders organizations correctly', () => {
    render(<ArticleAndAuthorInformation authors={authors} versions={[]}/>);

    expect(screen.getByText('the Brain Interfacing Laboratory')).toBeInTheDocument();
  });

  it('renders the authors ORCID\'s', () => {
    render(<ArticleAndAuthorInformation authors={authors} versions={[]}/>);

    expect(screen.getByText('Steve Rogers').nextSibling?.nextSibling).toHaveTextContent('0000-0002-1234-5678, 0000-0002-1234-5679');
    expect(screen.getByText('Antony Stark').nextSibling?.nextSibling).not.toBeInTheDocument();
    expect(screen.getByText('Natasha Romanov').nextSibling?.nextSibling).not.toBeInTheDocument();
    expect(screen.getByText('Arthur Curry').nextSibling?.nextSibling).toHaveTextContent('0000-0002-1234-5688');
    expect(screen.getByText('Oliver Queen').nextSibling?.nextSibling).not.toBeInTheDocument();
  });

  it('does not render other identifiers', () => {
    render(<ArticleAndAuthorInformation authors={[
      {
        givenNames: ['Arthur'],
        familyNames: ['Curry'],
        affiliations: [{ name: 'Justice League', address: { addressCountry: 'Arctic' } }],
        identifiers: [
          { type: 'PropertyValue', propertyID: 'foo', value: 'should not be rendered' },
          { type: 'PropertyValue', propertyID: 'https://registry.identifiers.org/registry/orcid', value: 'http://orcid.org/0000-0002-1234-5678' },
        ],
      },
    ]} versions={[]}/>);

    expect(screen.queryByText('should not be rendered')).not.toBeInTheDocument();
    expect(screen.getByText('0000-0002-1234-5678')).toBeInTheDocument();
  });

  it.each(authors.map(createAuthorId))('should contain an id with the author id', (id) => {
    const { container } = render(<ArticleAndAuthorInformation authors={authors} versions={[]}/>);

    expect(container.querySelector(`[id="${id}"]`)).toBeInTheDocument();
  });

  it('renders version history', () => {
    render(<ArticleAndAuthorInformation authors={[]} versions={versionHistory}/>);

    expect(screen.getByText('Version history')).toBeInTheDocument();
  });

  it('does not renders version history if no versions', () => {
    render(<ArticleAndAuthorInformation authors={[]} versions={[]}/>);

    expect(screen.queryByText('Version history')).not.toBeInTheDocument();
  });
});
