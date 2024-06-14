import { i18n } from '../../i18n';
import {
  EnhancedArticleWithVersions,
} from '../../types';
import { isExternalVersionSummary, isPreprintVersionSummary } from '../type-guards';
import { SerialisedTimelineEvent } from '../../types/article-timeline';
import { DatesToStrings } from '../type-converters';

export const generateTimeline = (version: DatesToStrings<EnhancedArticleWithVersions>): SerialisedTimelineEvent[] => {
  const timeline: SerialisedTimelineEvent[] = Object.values(version.versions).reduce<SerialisedTimelineEvent[]>((events, current) => {
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
