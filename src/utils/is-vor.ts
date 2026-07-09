import { isVORVersionSummary } from './type-guards';
import { type EnhancedArticleWithVersions } from '../types';

export const isVor = (articleWithVersions: EnhancedArticleWithVersions): boolean => {
  const versions = Object.values(articleWithVersions.versions);
  return Object.values(versions).some((version) => version.versionIdentifier === articleWithVersions.article.versionIdentifier && isVORVersionSummary(version));
};
