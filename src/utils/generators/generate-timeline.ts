import { i18n } from '../../i18n';
import {
  EnhancedArticleWithVersions,
  TimelineEvent,
} from '../../types';
import { DatesToStrings } from '../type-converters';
import { isExternalVersionSummary, isPreprintVersionSummary } from '../type-guards';

type SerialisedTimelineEvent = DatesToStrings<TimelineEvent>;

export const generateTimeline = (version: EnhancedArticleWithVersions): SerialisedTimelineEvent[] => {
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
