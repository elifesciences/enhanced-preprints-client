import {type EnhancedArticle} from './enhanced-article';
import {type Metrics} from './metrics';
import {type VersionSummary} from './version-summary';

export type EnhancedArticleWithVersions = {
  article: EnhancedArticle,
  versions: Record<string, VersionSummary>,
  metrics?: Metrics,
  siteName?: string,
};
