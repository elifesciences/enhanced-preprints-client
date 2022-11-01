import { Content } from './content';
import { Reference } from '../components/atoms/reference-list/reference-list';
import { Heading } from '../components/atoms/jump-to-menu/jump-to-menu';
import { Author } from '../components/atoms/authors/authors';

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
