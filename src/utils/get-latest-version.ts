import { EnhancedArticleWithVersions } from '../types';

export const getLatestVersion = (articleWithVersions: EnhancedArticleWithVersions) => Object.values(articleWithVersions.versions) // get the versions in an array
  .filter((ver) => ver.published !== undefined) // get only the versions that have been published
  .sort((a, b) => new Date(a.published!).getTime() - new Date(b.published!).getTime()) // sort them by published date
  .reverse()[0];
