import {type EnhancedArticleWithVersions} from '../fetch-data';
import { isVORVersionSummary } from '../fetch-data/version-summary';

export const isVor = (articleWithVersions: EnhancedArticleWithVersions): boolean => {
  const versions = Object.values(articleWithVersions.versions);
  return Object.values(versions).some((version) => version.versionIdentifier === articleWithVersions.article.versionIdentifier && isVORVersionSummary(version));
};
