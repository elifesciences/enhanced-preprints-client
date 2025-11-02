import { render, screen } from '@testing-library/react';
import { Reference } from './reference';
import { type Reference as ReferenceData } from '../../../types';
import { references } from '../../../utils/mocks';
import '../../../i18n';

describe('Reference', () => {
  const ref: ReferenceData = {
    type: 'Article',
    id: 'c1',
    title: 'Title',
    authors: [],
    url: 'http://www.google.com',
  };
  it('should render all the references passed in as a prop', () => {
    render(<Reference reference={references[0]} />);

    expect(screen.getByText('Resurgent Na currents in four classes of neurons of the cerebellum')).toBeInTheDocument();
    expect(screen.getByText('Afshari FS')).toBeInTheDocument();
    expect(screen.getByText('2019a')).toBeInTheDocument();
    expect(screen.getByText('J. Neurophysiol')).toBeInTheDocument();
    expect(screen.getByText('2843', { exact: false })).toBeInTheDocument();
  });

  it('should render the title as a link if URL is present', () => {
    render(<Reference reference={ref} />);

    expect(screen.getByText('Title')).toHaveAttribute('href', 'http://www.google.com');
  });

  it('should be wrapped in a div if isReferenceList is false', () => {
    render(<Reference reference={references[0]} />);

    expect(screen.getByText(references[0].title).parentElement?.parentElement?.tagName).toStrictEqual('DIV');
  });

  it('should not render an end page if the start page is undefined', () => {
    render(<Reference reference={{ ...references[0], pageStart: undefined }} />);

    expect(screen.queryByText('2843', { exact: false })).not.toBeInTheDocument();
  });

  it('should render eLocation id if it is supplied and pageStart is not', () => {
    render(<Reference reference={references[4]} />);

    expect(screen.queryByText('AB12345', { exact: false })).toBeInTheDocument();
  });

  it('renders the name when an organisation is the author', () => {
    render(<Reference reference={references[2]} />);

    expect(screen.getByText('the Brain Interfacing Laboratory')).toBeInTheDocument();
  });

  it.each(
    [
      [
        {
          publisher: {
            type: 'Organization',
            name: 'Publisher Title Only',
          },
        },
        'Publisher Title Only',
      ],
      [
        {
          publisher: {
            type: 'Organization',
            name: 'Publisher Title',
            address: {
              type: 'PostalAddress',
              addressLocality: 'Locality',
            },
          },
        },
        'Locality: Publisher Title',
      ],
    ],
  )('renders the name and locality of the publisher', (referenceWithPublisher, expectedJournalAndPublisher) => {
    const prepareReference = {
      type: 'Article',
      id: 'c5',
      authors: [],
      datePublished: {
        type: 'Date',
        value: '1985',
      },
      title: 'Environmental Physiology and Biochemistry of Insects',
      ...referenceWithPublisher,
    } as ReferenceData;
    render(<Reference reference={prepareReference} />);

    expect(screen.getByText(expectedJournalAndPublisher)).toBeInTheDocument();
  });

  it('should wrap doi in link', () => {
    render(<Reference reference={references[0]} />);

    expect(screen.getByText('https://doi.org/', { exact: false }).tagName).toStrictEqual('A');
    expect(screen.getByText('https://doi.org/', { exact: false })).toHaveAttribute('href', 'https://doi.org/10.7554/eLife.16135');
  });

  it('should render the label if the reference has one', () => {
    render(<Reference reference={references[0]} />);

    expect(screen.getByText('1.')).toBeInTheDocument();
  });

  it('should display URL link if present', () => {
    render(<Reference reference={ref} />);

    expect(screen.getByText('http://www.google.com').tagName).toStrictEqual('A');
    expect(screen.getByText('http://www.google.com')).toHaveAttribute('href', 'http://www.google.com');
  });

  it('should render the reference name correctly if givenNames is undefined', () => {
    render(<Reference reference={references[0]} />);

    expect(screen.getByText('NoGiven').textContent).toStrictEqual('NoGiven');
  });

  it('should render the publishedYear from the meta property if present', () => {
    render(<Reference reference={references[0]} />);

    expect(screen.getByText('2019a')).toBeInTheDocument();
  });

  it('should render the year from the datePublished property if not in meta', () => {
    render(<Reference reference={references[4]} />);

    expect(screen.getByText('1985')).toBeInTheDocument();
  });

  it('should render without a publishedYear', () => {
    render(<Reference reference={references[3]} />);

    expect(screen.getByText('Given Bugs', { exact: false })).toBeInTheDocument();
  });

  it('should render comment if one is present', () => {
    const refWithComment = {
      ...ref,
      comments: [{
        type: 'Comment' as const,
        commentAspect: 'I am a comment',
      }],
    };
    render(<Reference reference={refWithComment} />);

    expect(screen.getByText('I am a comment')).toBeInTheDocument();
  });

  it('should render multiple comments if more than one is present', () => {
    const refWithComments = {
      ...ref,
      comments: [
        {
          type: 'Comment' as const,
          commentAspect: 'I am a comment',
        },
        {
          type: 'Comment' as const,
          commentAspect: 'I am a second comment',
        },
      ],
    };
    render(<Reference reference={refWithComments} />);

    expect(screen.getByText('I am a comment, I am a second comment')).toBeInTheDocument();
  });

  it('should render chapter with journal title with "In: " before journal', () => {
    render(<Reference reference={references[1]} />);

    expect(screen.getByText('In: ', { exact: false })).toBeInTheDocument();
  });

  it('should render book page range with pp. prefix', () => {
    render(<Reference reference={references[1]} />);

    expect(screen.getByText('pp. ', { exact: false })).toBeInTheDocument();
  });

  it('should render editors', () => {
    render(<Reference reference={references[1]} />);

    expect(screen.getByText(', editors.', { exact: false })).toBeInTheDocument();
  });

  it('should render PubMed link', () => {
    render(<Reference reference={references[0]} />);

    expect(screen.getByText('PubMed', { exact: false }).tagName).toStrictEqual('A');
    expect(screen.getByText('PubMed', { exact: false })).toHaveAttribute('href', 'https://pubmed.ncbi.nlm.nih.gov/24848');
  });

  it('should render Google Scholar link for appropriate type (e.g. journal, book)', () => {
    render(<Reference reference={references[1]} />);

    expect(screen.getByText('Google Scholar', { exact: false }).tagName).toStrictEqual('A');
    expect(
      screen.getByText('Google Scholar', { exact: false }),
    ).toHaveAttribute(
      'href',
      'https://scholar.google.com/scholar_lookup?' +
        'title=The+Role+of+Estrogen+Receptors+in+Cardiovascular+Disease&' +
        'author=L+Aryan&' +
        'author=D+Younessi&' +
        'author=M+Zargari&' +
        'author=S+Banerjee&' +
        'author=J+Agopian&' +
        'author=S+Rahman&' +
        'author=R+Borna&' +
        'publication_year=2019b',
    );
  });

  it('should not render Google Scholar link the type of reference is not supported (patent, software)', () => {
    render(<Reference reference={references[0]} />);

    expect(screen.queryByText('Google Scholar', { exact: false })).not.toBeInTheDocument();
  });
});
