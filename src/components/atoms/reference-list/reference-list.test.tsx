import { render, screen } from '@testing-library/react';
import { Reference, ReferenceList } from './reference-list';

const exampleReferences: Reference[] = [
  {
    type: 'Article',
    id: 'c1',
    authors: [
      { type: 'Person', familyNames: ['Afshari'], givenNames: ['FS'] },
      { type: 'Person', familyNames: ['Ptak'], givenNames: ['K'] },
      { type: 'Person', familyNames: ['Khaliq'], givenNames: ['ZM'] },
      { type: 'Person', familyNames: ['Grieco'], givenNames: ['TM'] },
      { type: 'Person', familyNames: ['Slater'], givenNames: ['NT'] },
      { type: 'Person', familyNames: ['McCrimmon'], givenNames: ['DR'] },
      { type: 'Person', familyNames: ['Raman'], givenNames: ['IM'] },
    ],
    datePublished: '2004-01-01T00:00:00.000Z',
    isPartOf: {
      type: 'PublicationVolume',
      isPartOf: { type: 'Periodical', name: 'J. Neurophysiol' },
      volumeNumber: 92,
    },
    pageEnd: 2843,
    pageStart: 2831,
    title: 'Resurgent Na currents in four classes of neurons of the cerebellum',
  },
  {
    type: 'Article',
    id: 'c2',
    authors: [
      { type: 'Person', familyNames: ['Aryan'], givenNames: ['L'] },
      { type: 'Person', familyNames: ['Younessi'], givenNames: ['D'] },
      { type: 'Person', familyNames: ['Zargari'], givenNames: ['M'] },
      { type: 'Person', familyNames: ['Banerjee'], givenNames: ['S'] },
      { type: 'Person', familyNames: ['Agopian'], givenNames: ['J'] },
      { type: 'Person', familyNames: ['Rahman'], givenNames: ['S'] },
      { type: 'Person', familyNames: ['Borna'], givenNames: ['R'] },
      { type: 'Person', familyNames: ['Ruffenach'], givenNames: ['G'] },
      { type: 'Person', familyNames: ['Umar'], givenNames: ['S'] },
      { type: 'Person', familyNames: ['Eghbali'], givenNames: ['M'] },
    ],
    datePublished: '2020-01-01T00:00:00.000Z',
    isPartOf: { type: 'Periodical', name: 'Int J Mol Sci' },
    pageStart: 21,
    title: 'The Role of Estrogen Receptors in Cardiovascular Disease',
  },
];

describe('ReferenceList', () => {
  it('should render all the references passed in as a prop', () => {
    render(<ReferenceList references={exampleReferences} />);

    expect(screen.getByText('Resurgent Na currents in four classes of neurons of the cerebellum')).toBeInTheDocument();
    expect(screen.getByText('The Role of Estrogen Receptors in Cardiovascular Disease')).toBeInTheDocument();

    expect(screen.getByText('Afshari FS')).toBeInTheDocument();
    expect(screen.getByText('Agopian J')).toBeInTheDocument();

    expect(screen.getByText('2004')).toBeInTheDocument();
    expect(screen.getByText('2020')).toBeInTheDocument();

    expect(screen.getByText('Int J Mol Sci')).toBeInTheDocument();
    expect(screen.getByText('J. Neurophysiol')).toBeInTheDocument();

    expect(screen.getByText('Resurgent Na currents in four classes of neurons of the cerebellum').parentElement?.id).toStrictEqual('c1');
    expect(screen.getByText('The Role of Estrogen Receptors in Cardiovascular Disease').parentElement?.id).toStrictEqual('c2');
  });
});
