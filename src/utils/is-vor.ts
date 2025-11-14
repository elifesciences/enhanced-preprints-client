import { type EnhancedArticleWithVersions } from '../types';
import { isVORVersionSummary } from './type-guards';

export const isVor = (articleWithVersions: EnhancedArticleWithVersions) => {
  const versions = Object.values(articleWithVersions.versions);
  return Object.values(versions).some((version) => version.versionIdentifier === articleWithVersions.article.versionIdentifier && isVORVersionSummary(version));
};
