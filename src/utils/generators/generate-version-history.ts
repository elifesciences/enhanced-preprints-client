import {
  EnhancedArticleWithVersions, VersionHistoryItem,
} from '../../types';
import { isExternalVersionSummary, isPreprintVersionSummary } from '../type-guards';

export const generateVersionHistory = (version: EnhancedArticleWithVersions): VersionHistoryItem[] => {
  const history: VersionHistoryItem[] = Object.values(version.versions).reduce<VersionHistoryItem[]>((versions, current) => {
    if (current.published) {
      versions.push({
        label: `${isExternalVersionSummary(current) ? 'external_' : ''}history_version_title`,
        url: `${isPreprintVersionSummary(current) ? `/reviewed-preprints/${current.id}` : ''}${isExternalVersionSummary(current) ? current.url : ''}`,
        date: new Date(current.published).toDateString(),
        version: +current.versionIdentifier,
      });

      if (isExternalVersionSummary(current) && (current.corrections ?? []).length > 0) {
        versions.push(...(current.corrections ?? []).map((correction) => ({
          label: 'external_history_version_title_updated',
          url: correction.url,
          date: new Date(correction.date).toDateString(),
          version: +current.versionIdentifier,
        })));
      }
    }
    return versions;
  }, []);

  const firstVersion = Object.values(version.versions).filter(isPreprintVersionSummary)
    .reduce((mostRecent, current) => (!mostRecent || new Date(current.preprintPosted).getTime() < new Date(mostRecent.preprintPosted).getTime() ? current : mostRecent));

  if (firstVersion.preprintPosted !== undefined) {
    history.push({
      date: new Date(firstVersion.preprintPosted).toDateString(),
      label: 'Preprint posted',
      url: `https://doi.org/${firstVersion.preprintDoi}`,
    });
  }

  if (firstVersion.sentForReview !== undefined) {
    history.push({
      date: new Date(firstVersion.sentForReview).toDateString(),
      label: 'Sent for peer review',
    });
  }

  return history.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};
