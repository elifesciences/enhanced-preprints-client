import { references } from './references';
import { authors } from './authors';
import { content } from './content';

export const metaData = {
  doi: '10.1101/2022.04.13.488149',
  abstract: content,
  msid: '123456',
  version: '1',
  pdfUrl: '#',
  msas: ['Mad Science', 'Alchemy'],
  title: 'This is a title',
  authors,
  headings: [{ id: 's1', text: 'Introduction' }],
  references,
  publishedYear: 2022,
};
