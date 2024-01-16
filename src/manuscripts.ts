import { ArticleStatusProps } from './components/pages/article/article-page';

type ReviewedPreprintConfig = {
  preprintDoi: string,
  status: ArticleStatusProps,
  msas: string[],
};

type ManuscriptConfig = {
  msid: string,
  version: string,
  preprintDoi: string,
  publishedYear: number,
  pdfUrl?: string,
  license?: string,
};

export type FullManuscriptConfig = ReviewedPreprintConfig & ManuscriptConfig;

export const getRppVersionDoi = (config: Partial<FullManuscriptConfig>): string => (config.msid && config.version ? `10.7554/eLife.${config.msid}.${config.version}` : '');

export const getRppDoi = (config: Partial<FullManuscriptConfig>): string => (config.msid ? `10.7554/eLife.${config.msid}` : '');
