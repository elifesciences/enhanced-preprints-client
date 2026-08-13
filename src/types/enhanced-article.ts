import { type Content } from '../content';
import { type Author, type Reference } from '../fetch-data';

type License = {
  type: string,
  url?: string,
  content?: Content,
};

export type ProcessedArticle = {
  title: Content,
  authors?: Author[],
  abstract: Content,
  licenses: License[],
  content: Content,
  references: Reference[],
  meta?: {
    authorNotes?: {
      type: string,
      id?: string,
      text: string,
      label?: string,
    }[],
  },
};

export type ArticleSummary = {
  id: string,
  doi: string,
  title: Content,
  date: Date | null,
};
