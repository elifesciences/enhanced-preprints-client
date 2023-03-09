import { references } from './references';
import { authors } from './authors';

export const metaData = {
  doi: '10.1101/2022.04.13.488149',
  abstract: 'abstract',
  msid: '123456',
  version: '1',
  pdfUrl: '#',
  msas: ['Mad Science', 'Alchemy'],
  title: 'This is a title',
  authors,
  headings: [
    { id: 's1', text: 'Introduction' },
    { id: 's2', text: 'Results' },
    { id: 's3', text: 'Discussion' },
    { id: 's4', text: 'Materials and methods' },
    { id: 's5', text: 'Data and material availability' },
  ],
  references,
  publishedYear: 2022,
};
