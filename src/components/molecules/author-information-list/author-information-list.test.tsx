import { render, screen } from '@testing-library/react';
import { Author } from '../../../types';
import { createAuthorId } from '../../../utils/create-author-id';
import { AuthorInformationList } from './author-information-list';

const authors: Author[] = [
  {
    givenNames: ['Thor'],
    familyNames: ['Odinson'],
    affiliations: [
      {
        name: 'The Avengers',
        address: { addressCountry: 'New York' },
      },
    ],
    identifiers: [
      {
        type: 'orcid',
        value: 'http://orcid.org/0000-0002-1234-5678',
      },
      {
        type: 'orcid',
        value: 'http://orcid.org/0000-0002-1234-5679',
      },
    ],
  },
  {
    givenNames: ['Loki'],
    familyNames: ['Laufeyson'],
    affiliations: [{
      name: 'The Revengers',
      address: { addressCountry: 'Sakaar' },
    }],
    identifiers: [
      {
        type: 'orcid',
        value: 'http://orcid.org/0000-0002-1234-5698',
      },
    ],
  },
  {
    givenNames: ['Bruce'],
    familyNames: ['Banner'],
    affiliations: [{
      name: 'The Avengers',
      address: { addressCountry: 'New York' },
    }],
  },
  {
    givenNames: ['The', 'Incredible'],
    familyNames: ['Hulk'],
  },
  {
    givenNames: ['Peter'],
    familyNames: ['Parker'],
    identifiers: [
      {
        type: 'orcid',
        value: 'http://orcid.org/0000-0002-1234-5688',
      },
    ],
  },
  {
    givenNames: ['Valkyrie'],
    familyNames: ['Brunnhilde'],
    affiliations: [{
      name: 'The Valkyrie',
      address: { addressCountry: 'Asgard' },
    }],
  },
];

describe('AuthorInformationList', () => {
  it('renders correctly', () => {
    render(<AuthorInformationList authors={authors}/>);

    expect(screen.getByText('Author information')).toBeInTheDocument();
  });

  it('renders each author in the list', () => {
    render(<AuthorInformationList authors={authors}/>);

    expect(screen.getByText('Thor Odinson')).toBeInTheDocument();
    expect(screen.getByText('Loki Laufeyson')).toBeInTheDocument();
    expect(screen.getByText('Bruce Banner')).toBeInTheDocument();
    expect(screen.getByText('The Incredible Hulk')).toBeInTheDocument();
    expect(screen.getByText('Peter Parker')).toBeInTheDocument();
    expect(screen.getByText('Valkyrie Brunnhilde')).toBeInTheDocument();
  });

  it('renders the authors affiliations', () => {
    render(<AuthorInformationList authors={authors}/>);

    expect(screen.getByText('Thor Odinson').nextSibling).toHaveTextContent('The Avengers');
    expect(screen.getByText('Loki Laufeyson').nextSibling).toHaveTextContent('The Revengers');
    expect(screen.getByText('Bruce Banner').nextSibling).toHaveTextContent('The Avengers');
    expect(screen.getByText('The Incredible Hulk').nextSibling).not.toBeInTheDocument();
    expect(screen.getByText('Valkyrie Brunnhilde').nextSibling).toHaveTextContent('The Valkyrie');
  });

  it('renders the authors ORCID\'s', () => {
    render(<AuthorInformationList authors={authors}/>);

    expect(screen.getByText('Thor Odinson').nextSibling?.nextSibling).toHaveTextContent('0000-0002-1234-5678, 0000-0002-1234-5679');
    expect(screen.getByText('Loki Laufeyson').nextSibling?.nextSibling).toHaveTextContent('0000-0002-1234-5698');
    expect(screen.getByText('Bruce Banner').nextSibling?.nextSibling).not.toBeInTheDocument();
    expect(screen.getByText('The Incredible Hulk').nextSibling).not.toBeInTheDocument();
    expect(screen.getByText('Peter Parker').nextSibling).toHaveTextContent('0000-0002-1234-5688');
    expect(screen.getByText('Valkyrie Brunnhilde').nextSibling?.nextSibling).not.toBeInTheDocument();
  });

  it.each(authors.map((author) => createAuthorId(author)))('should contain an id with the author id', (id) => {
    const { container } = render(<AuthorInformationList authors={authors}/>);

    expect(container.querySelector(`[id="${id}"]`)).toBeInTheDocument();
  });
});
