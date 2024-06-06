import { i18n } from '../i18n';
import {
  EnhancedArticleWithVersions, VersionSummary, VersionHistoryItem,
} from '../types';
import { ExternalVersionSummary, PreprintVersionSummary } from '../types/enhanced-article';

const isPreprintVersionSummary = (version: VersionSummary): version is PreprintVersionSummary => Object.hasOwn(version, 'preprintPosted');
const isExternalVersionSummary = (version: VersionSummary): version is ExternalVersionSummary => Object.hasOwn(version, 'url');

export const generateVersionHistory = (version: EnhancedArticleWithVersions): VersionHistoryItem[] => {
  const history: VersionHistoryItem[] = Object.values(version.versions).reduce<VersionHistoryItem[]>((versions, current) => {
    if (current.published) {
      versions.push({
        label: i18n.t(`${isExternalVersionSummary(current) ? 'external_' : ''}history_version_title`, {
          version: +current.versionIdentifier,
        }),
        url: `${isPreprintVersionSummary(current) ? `/reviewed-preprints/${current.id}` : ''}${isExternalVersionSummary(current) ? current.url : ''}`,
        date: new Date(current.published).toDateString(),
      });
    }
    return versions;
  }, []);

  return history.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};
