import { i18n } from '../i18n';
import {
  EnhancedArticleWithVersions, VersionSummary, ImprovedTimelineEvent,
} from '../types';
import { ExternalVersionSummary, PreprintVersionSummary } from '../types/enhanced-article';

const isPreprintVersionSummary = (version: VersionSummary): version is PreprintVersionSummary => Object.hasOwn(version, 'preprintPosted');
const isExternalVersionSummary = (version: VersionSummary): version is ExternalVersionSummary => Object.hasOwn(version, 'url');

export const generateImprovedTimeline = (version: EnhancedArticleWithVersions): ImprovedTimelineEvent[] => {
  const timeline: ImprovedTimelineEvent[] = Object.values(version.versions).reduce<ImprovedTimelineEvent[]>((events, current) => {
    if (current.published) {
      events.push({
        name: i18n.t(`${isExternalVersionSummary(current) ? 'external_' : ''}timeline_version_title`),
        url: `${isPreprintVersionSummary(current) ? `/reviewed-preprints/${current.id}` : ''}${isExternalVersionSummary(current) ? current.url : ''}`,
        version: +current.versionIdentifier,
        date: new Date(current.published).toDateString(),
        ...(isPreprintVersionSummary(current) ? {
          versionIndicator: `v${current.versionIdentifier}`,
        } : {}),
      });
    }
    return events;
  }, []);

  return timeline.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};
