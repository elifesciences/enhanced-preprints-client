import {
  EnhancedArticleWithVersions,
} from '../../types';
import { isExternalVersionSummary, isPreprintVersionSummary } from '../type-guards';
import { SerialisedTimelineEvent } from '../../types/article-timeline';

export const generateTimeline = (version: EnhancedArticleWithVersions): SerialisedTimelineEvent[] => {
  const timeline: SerialisedTimelineEvent[] = Object.values(version.versions).reduce<SerialisedTimelineEvent[]>((events, current) => {
    if (current.published) {
      events.push({
        name: `${isExternalVersionSummary(current) ? 'external_' : ''}timeline_version_title`,
        url: `${isPreprintVersionSummary(current) ? `/reviewed-preprints/${current.id}` : ''}${isExternalVersionSummary(current) ? current.url : ''}`,
        version: +current.versionIdentifier,
        date: new Date(current.published).toDateString(),
        ...(isPreprintVersionSummary(current) ? {
          versionIndicator: `v${current.versionIdentifier}`,
        } : {}),
      });
      if (isExternalVersionSummary(current) && current.corrections) {
        current.corrections.forEach((correction) => {
          events.push(
            {
              name: 'external_timeline_version_title',
              url: correction.url,
              version: +current.versionIdentifier,
              date: new Date(correction.date).toDateString(),
              datePrefix: 'external_timeline_version_correction_date_prefix',
            },
          );
        });
      }
    }
    return events;
  }, []);

  return timeline.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};
