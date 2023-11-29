import { Author } from '../../types';

export const authors: Author[] = [
  {
    givenNames: ['Steve'],
    familyNames: ['Rogers'],
    affiliations: [{ name: 'Avengers', address: { addressCountry: 'New York' } }],
    identifiers: [{ type: 'PropertyValue', propertyID: 'https://registry.identifiers.org/registry/orcid', value: 'http://orcid.org/0000-0002-1234-5678' }, { type: 'orcid', value: 'http://orcid.org/0000-0002-1234-5679' }],
  },
  { givenNames: ['Elliot'], familyNames: ['Kemp'], affiliations: [{ name: 'X-Force', address: { addressCountry: 'Norwich' } }] },
  { givenNames: ['Antony'], familyNames: ['Stark'], affiliations: [{ name: 'Avengers', address: { addressCountry: 'New York' } }] },
  { givenNames: ['Natasha'], familyNames: ['Romanov'], affiliations: [{ name: 'Avengers', address: { addressCountry: 'New York' } }] },
  { givenNames: ['Bruce'], familyNames: ['Banner'], affiliations: [{ name: 'Avengers', address: { addressCountry: 'New York' } }] },
  { givenNames: ['Wanda'], familyNames: ['Maximof'], affiliations: [{ name: 'Avengers', address: { addressCountry: 'New York' } }] },
  { givenNames: ['Bucky'], familyNames: ['Barnes'], affiliations: [{ name: 'Avengers', address: { addressCountry: 'New York' } }] },
  {
    givenNames: ['Barry'], familyNames: ['Allen'], honorificSuffix: 'Jr.', affiliations: [{ name: 'Justice League', address: { addressCountry: 'Star City' } }],
  },
  { givenNames: ['Jesse'], familyNames: ['Quick'], affiliations: [{ name: 'Justice League', address: { addressCountry: 'Star City' } }] },
  {
    givenNames: ['Kara'], familyNames: ['Zor-el'], affiliations: [{ name: 'Justice League', address: { addressCountry: 'Arctic' } }], emails: ['kara.danvers@katco.com'],
  },
  {
    givenNames: ['Kal'], familyNames: ['El'], affiliations: [{ name: 'Justice League', address: { addressCountry: 'Arctic' } }], emails: ['clark.kent@dailyplanet.com'],
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
