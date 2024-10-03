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

    expect(screen.getByText(name, { exact: false })).toBeInTheDocument();
  });

  it.each(authors.filter(({ type }) => type !== 'Organization').map(getAffiliationAndAuthor))(
    'renders the the affiliation: $affiliation for author: $name',
    ({ affiliation, name }) => {
      render(<AuthorList authors={authors} authorNotes={authorNotes} />);

      expect(screen.getByText(name, { exact: false }).nextSibling).toHaveTextContent(affiliation);
    },
  );

  it('renders organizations correctly', () => {
    render(<AuthorList authors={authors} authorNotes={authorNotes} />);

    expect(screen.getByText('the Brain Interfacing Laboratory')).toBeInTheDocument();
  });

  it('renders the authors ORCID\'s', () => {
    render(<AuthorList authors={authors} authorNotes={[]} />);

    expect(screen.getByText('Steve Rogers', { exact: false }).nextSibling?.nextSibling).toHaveTextContent('0000-0002-1234-5678, 0000-0002-1234-5679');
    expect(screen.getByText('Antony Stark').nextSibling?.nextSibling).not.toBeInTheDocument();
    expect(screen.getByText('Natasha Romanov').nextSibling?.nextSibling).not.toBeInTheDocument();
    expect(screen.getByText('Arthur Curry').nextSibling?.nextSibling).toHaveTextContent('0000-0002-1234-5688');
    expect(screen.getByText('Oliver Queen').nextSibling?.nextSibling).not.toBeInTheDocument();
  });

  it('renders the author\'s email', () => {
    render(<AuthorList authors={authors} authorNotes={[]} />);

    expect(screen.queryByText('steve@rogers.avengers')).not.toBeInTheDocument();
    expect(screen.getByText('elliot.kemp@x-force.norwich, kemp.elliot@x-force.norwich')).toBeInTheDocument();
    expect(screen.getByText('kara.danvers@katco.com')).toBeInTheDocument();
    expect(screen.getByText('clark.kent@dailyplanet.com')).toBeInTheDocument();
  });

  it('renders the corresponding statements', () => {
    render(<AuthorList authors={authors} authorNotes={authorNotes} />);

    expect(screen.getByText('Steve Rogers', { exact: false }).nextSibling?.nextSibling).toHaveTextContent('FAO: steve@rogers.avengers and kara.danvers@katco.com');
    expect(screen.getByText('Kara Zor-el').nextSibling?.nextSibling).toHaveTextContent('For correspondence: kara.danvers@katco.com');
    expect(screen.getByText('Kara Zor-el').nextSibling?.nextSibling?.nextSibling).toHaveTextContent('FAO: steve@rogers.avengers and kara.danvers@katco.com');
    expect(screen.getByText('Kal El').nextSibling?.nextSibling).toHaveTextContent('For correspondence: clark.kent@dailyplanet.com');
    expect(screen.getByText('Kal El').nextSibling?.nextSibling?.nextSibling).toHaveTextContent('For questions about the multiverse: clark.kent@dailyplanet.com');
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

  describe('author-notes', () => {
    describe('author does not have footnote', () => {
      it('has no label on the author title', () => {
        render(<AuthorList authors={[authors[1]]} authorNotes={[]} />);

        expect(screen.queryByText('Elliot Kemp')).toBeInTheDocument();
      });
      it('does not display a footnote', () => {
        render(<AuthorList authors={[authors[1]]} authorNotes={[]} />);

        expect(document.querySelector('.author-list__footnote')).not.toBeInTheDocument();
      });
    });

    describe('author has footnote', () => {
      it('renders the label for the author-notes if there is a note', () => {
        render(<AuthorList authors={[authors[0]]} authorNotes={authorNotes} />);

        expect(screen.queryByText('Steve Rogers*')).toBeInTheDocument();
      });

      it('displays the footnote passed in', () => {
        render(<AuthorList authors={[authors[0]]} authorNotes={authorNotes} />);

        expect(screen.queryByText('* These authors contributed equally')).toBeInTheDocument();
      });

      it('uses the same label for the author title and footnote', () => {
        render(<AuthorList authors={[authors[0]]} authorNotes={authorNotes} />);

        expect(screen.queryByText('Steve Rogers*')).toBeInTheDocument();
        expect(screen.queryByText('* These authors contributed equally')).toBeInTheDocument();
      });

      describe('multiple footnotes', () => {
        it('displays multiple labels', () => {
          render(<AuthorList authors={[authors[7]]} authorNotes={authorNotes} />);

          expect(screen.queryByText('Barry Allen Jr.*†')).toBeInTheDocument();
        });

        it('displays multiple footnotes', () => {
          render(<AuthorList authors={[authors[7]]} authorNotes={authorNotes} />);

          expect(screen.queryByText('* These authors contributed equally')).toBeInTheDocument();
          expect(screen.queryByText('† This is a second footnote')).toBeInTheDocument();
        });
      });
    });
  });
});
