import { formatAuthorName } from './format-author-name';
import { authors } from '../mocks';

const authorNameStrings = [
  'Steve Rogers',
  'Elliot Kemp',
  'Antony Stark',
  'Natasha Romanov',
  'Bruce Banner',
  'Wanda Maximof',
  'Bucky Barnes',
  'Barry Allen Jr.',
  'Jesse Quick',
  'Kara Zor-el',
  'Kal El',
  'Arthur Curry',
  'Oliver Queen',
  '',
  'Robert John Downey Jr.',
];

describe('formatAuthorName', () => {
  it.each(authors.map((author, index) => ({ author, expected: authorNameStrings[index] })))('concatenates all names together in givenNames surnames suffix order', ({ author, expected }) => {
    expect(formatAuthorName(author)).toStrictEqual(expected);
  });
});
