import { Content } from './content';
import { Author } from './author';
import { Reference } from './reference';

export type MetaData = {
  abstract: Content;
  authors: Author[];
  doi: string;
  msas: string[],
  msid: string,
  pdfUrl?: string,
  references: Reference[],
  title: Content;
  version: string,
  publishedYear: number,
};
