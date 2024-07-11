import { EnhancedArticleWithVersions } from '../../types';
import { isPreprintVersionSummary } from '../type-guards';

export const getLatestVersionWarningUrl = (articleWithVersions: EnhancedArticleWithVersions): string | null => {
  const publishedDesc = Object.values(articleWithVersions.versions) // get the versions in an array
    .filter((ver) => ver.published && new Date(ver.published).getTime() <= (new Date()).getTime()) // get only the versions that have been published
    .sort((a, b) => new Date(a.published!).getTime() - new Date(b.published!).getTime()) // sort them by published date
    .reverse();

  const latestVersion = publishedDesc[0];

  if (latestVersion && latestVersion.versionIdentifier !== articleWithVersions.article.versionIdentifier) {
    return isPreprintVersionSummary(latestVersion) ? `/reviewed-preprints/${articleWithVersions.article.msid}` : `https://doi.org/${latestVersion.doi}`;
  }

  return null;
};
