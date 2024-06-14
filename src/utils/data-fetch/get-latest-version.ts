import { EnhancedArticleWithVersions } from '../../types';

export const getLatestVersion = (articleWithVersions: EnhancedArticleWithVersions) => {
  const publishedDesc = Object.values(articleWithVersions.versions) // get the versions in an array
    .filter((ver) => ver.published && new Date(ver.published).getTime() <= (new Date()).getTime()) // get only the versions that have been published
    .sort((a, b) => new Date(a.published!).getTime() - new Date(b.published!).getTime()) // sort them by published date
    .reverse();

  return publishedDesc.length > 0 ? publishedDesc[0] : null;
};
