import { Author, AuthorNotesData } from '../../types';

export const authorNotes: AuthorNotesData = [
  {
    type: 'corresp',
    id: 'cor1',
    text: 'FAO: steve@rogers.avengers and kara.danvers@katco.com',
  },
  {
    type: 'corresp',
    id: 'cor2',
    text: 'For questions about the multiverse: clark.kent@dailyplanet.com',
  },
  {
    type: 'fn',
    text: 'Generic footnote',
  },
  {
    type: 'fn',
    text: 'These authors contributed equally',
    id: 'fn2',
    label: '*',
  },
  {
    type: 'fn',
    text: 'This is a second footnote',
    id: 'fn3',
    label: '†',
  },
  {
    type: 'fn',
    text: 'This footnote has no label',
    id: 'fn4',
  },
  {
    type: 'fn',
    text: 'Generic footnote with an id',
    id: 'n1',
  },
];

export const authors: Author[] = [
  {
    givenNames: ['Steve'],
    familyNames: ['Rogers'],
    affiliations: [{ name: 'Avengers', address: { addressCountry: 'New York' } }],
    emails: ['steve@rogers.avengers'],
    identifiers: [{ type: 'PropertyValue', propertyID: 'https://registry.identifiers.org/registry/orcid', value: 'http://orcid.org/0000-0002-1234-5678' }, { type: 'orcid', value: 'http://orcid.org/0000-0002-1234-5679' }],
    meta: {
      notes: [
        {
          type: 'corresp',
          rid: 'cor1',
        },
        {
          type: 'fn',
          rid: 'fn2',
        },
      ],
    },
  },
  {
    givenNames: ['Elliot'],
    familyNames: ['Kemp'],
    emails: ['elliot.kemp@x-force.norwich', 'kemp.elliot@x-force.norwich'],
    affiliations: [{ name: 'X-Force', address: { addressCountry: 'Norwich' } }],
  },
  { givenNames: ['Antony'], familyNames: ['Stark'], affiliations: [{ name: 'Avengers', address: { addressCountry: 'New York' } }] },
  { givenNames: ['Natasha'], familyNames: ['Romanov'], affiliations: [{ name: 'Avengers', address: { addressCountry: 'New York' } }] },
  { givenNames: ['Bruce'], familyNames: ['Banner'], affiliations: [{ name: 'Avengers', address: { addressCountry: 'New York' } }] },
  { givenNames: ['Wanda'], familyNames: ['Maximof'], affiliations: [{ name: 'Avengers', address: { addressCountry: 'New York' } }] },
  { givenNames: ['Bucky'], familyNames: ['Barnes'], affiliations: [{ name: 'Avengers', address: { addressCountry: 'New York' } }] },
  {
    givenNames: ['Barry'],
    familyNames: ['Allen'],
    honorificSuffix: 'Jr.',
    affiliations: [{ name: 'Justice League', address: { addressCountry: 'Star City' } }],
    meta: {
      notes: [
        {
          type: 'fn',
          rid: 'fn2',
        },
        {
          type: 'fn',
          rid: 'fn3',
        },
      ],
    },
  },
  { givenNames: ['Jesse'], familyNames: ['Quick'], affiliations: [{ name: 'Justice League', address: { addressCountry: 'Star City' } }] },
  {
    givenNames: ['Kara'],
    familyNames: ['Zor-el'],
    affiliations: [{ name: 'Justice League', address: { addressCountry: 'Arctic' } }],
    emails: ['kara.danvers@katco.com'],
    meta: {
      notes: [
        {
          type: 'corresp',
          rid: 'cor1',
        },
        {
          type: 'fn',
          rid: 'fn4',
        },
      ],
    },
  },
  {
    givenNames: ['Kal'],
    familyNames: ['El'],
    affiliations: [{ name: 'Justice League', address: { addressCountry: 'Arctic' } }],
    emails: ['clark.kent@dailyplanet.com'],
    meta: {
      notes: [
        {
          type: 'corresp',
          rid: 'cor2',
        },
      ],
    },
  },
  {
    givenNames: ['Arthur'],
    familyNames: ['Curry'],
    affiliations: [{ name: 'Justice League', address: { addressCountry: 'Arctic' } }],
    identifiers: [{ type: 'orcid', value: 'http://orcid.org/0000-0002-1234-5688' }],
  },
  { givenNames: ['Oliver'], familyNames: ['Queen'], affiliations: [{ name: 'Justice League', address: { addressCountry: 'Central City' } }] },
  { type: 'Organization', name: 'the Brain Interfacing Laboratory' },
  {
    givenNames: ['Robert', 'John'],
    familyNames: ['Downey'],
    honorificSuffix: 'Jr.',
    affiliations: [{ name: 'Marvel Studios', address: { addressCountry: 'California' } }],
  },
];
