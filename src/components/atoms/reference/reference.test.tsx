import { render, screen } from '@testing-library/react';
import { Reference } from './reference';
import { Reference as ReferenceData } from '../../../types';
import { references } from '../../../utils/mocks';

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
});
