import { type Content } from '../content';

export type ArticleSummary = {
  id: string,
  doi: string,
  title: Content,
  date: Date | null,
};
