import {
  EnhancedArticleWithVersions, ArticleStatus,
} from '../types';

export const generateStatus = (version: EnhancedArticleWithVersions): ArticleStatus => ({
  type: 'Reviewed Preprint',
  isPreview: !version.article.published || new Date(version.article.published) > (new Date()),
});
