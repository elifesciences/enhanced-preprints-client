import { Content } from './content';
import { Heading } from '../components/atoms/jump-to-menu/jump-to-menu';
import { Author } from './author';
import { Reference } from './reference';

export type MetaData = {
  abstract: Content;
  authors: Author[];
  doi: string;
  headings: Heading[],
  msas: string[],
  msid: string,
  pdfUrl: string,
  references: Reference[],
  title: Content;
  version: string,
};
