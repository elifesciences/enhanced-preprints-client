import { Reference } from '../../types';

export const references: Reference[] = [
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
      { type: 'Person', familyNames: ['NoGiven'], givenNames: undefined },
    ],
    datePublished: { type: 'Date', value: '1847-01-01T00:00:00.000Z' },
    isPartOf: {
      type: 'PublicationVolume',
      isPartOf: { type: 'Periodical', name: 'J. Neurophysiol' },
      volumeNumber: 92,
    },
    pageEnd: 2843,
    pageStart: 2831,
    title: 'Resurgent Na currents in four classes of neurons of the cerebellum',
    identifiers: [
      {
        type: 'PropertyValue',
        name: 'doi',
        propertyID: 'https://registry.identifiers.org/registry/doi',
        value: '10.7554/eLife.16135',
      },
    ],
    meta: {
      yearPublished: '2019a',
      label: '1.',
    },
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
    datePublished: { type: 'Date', value: '2020-01-01T00:00:00.000Z' },
    isPartOf: { type: 'Periodical', name: 'Int J Mol Sci', volumeNumber: 'volume one' },
    pageStart: 21,
    title: 'The Role of Estrogen Receptors in Cardiovascular Disease',
    identifiers: [
      {
        type: 'PropertyValue',
        name: 'doi',
        propertyID: 'https://registry.identifiers.org/registry/doi',
        value: '10.7554/eLife.16136',
      },
    ],
    meta: {
      yearPublished: '2019b',
      label: '2.',
    },
  },
  {
    type: 'Article',
    id: 'c3',
    authors: [
      {
        type: 'Organization',
        name: 'the Brain Interfacing Laboratory',
      },
    ],
    datePublished: '2021',
    isPartOf: { type: 'Periodical', name: 'Journal of Neurology' },
    pageStart: 21,
    title: 'The Theory of Everything',
    identifiers: [
      {
        type: 'PropertyValue',
        name: 'doi',
        propertyID: 'https://registry.identifiers.org/registry/doi',
        value: '10.1101/123456',
      },
    ],
    meta: {
      yearPublished: '2019c',
      label: '2.',
    },
  },
  {
    type: 'Article',
    id: 'c4',
    authors: [

      { type: 'Person', familyNames: ['Given'], givenNames: ['Bugs'] },
    ],
    pageEnd: 2843,
    pageStart: 2831,
    title: 'Resurgent Na currents in four classes of neurons of the cerebellum, Part 2',
    identifiers: [
      {
        type: 'PropertyValue',
        name: 'doi',
        propertyID: 'https://registry.identifiers.org/registry/doi',
        value: '10.7554/eLife.16135',
      },
    ],
    meta: {
      yearPublished: '2019d',
      label: '1.',
    },
  },
  {
    type: 'Article',
    id: 'c5',
    authors: [
      {
        familyNames: [
          'Hoffman',
        ],
        givenNames: [
          'K.H',
        ],
        type: 'Person',
      },
    ],
    datePublished: {
      type: 'Date',
      value: '1985',
    },
    publisher: {
      address: {
        addressLocality: 'Berlin',
        type: 'PostalAddress',
      },
      name: 'Springer-Verlag',
      type: 'Organization',
    },
    title: 'Environmental Physiology and Biochemistry of Insects',
  },
];
