import {
  EnhancedArticleWithVersions,
} from '../../types';
import { isExternalVersionSummary, isPreprintVersionSummary } from '../type-guards';
import { SerialisedTimelineEvent } from '../../types/article-timeline';

const getNameWithVersionSuffix = (
  name: string,
  version: number,
  lastVersion: number,
): string => {
  if (version === 1) {
    return `${name}_first_version`;
  }

  if (version === lastVersion) {
    return `${name}_last_version`;
  }

  return name;
};

export const generateTimeline = (version: EnhancedArticleWithVersions): SerialisedTimelineEvent[] => {
  const versionValues = Object.values(version.versions);
  const lastVersion = Math.max(...versionValues.map(({ versionIdentifier }) => +versionIdentifier));
  const timeline: SerialisedTimelineEvent[] = versionValues.reduce<SerialisedTimelineEvent[]>((events, current) => {
    const versionNo = +current.versionIdentifier;
    if (current.published) {
      events.push({
        name: getNameWithVersionSuffix(
          `${isExternalVersionSummary(current) ? 'external_' : ''}timeline_version_title`,
          versionNo,
          lastVersion,
        ),
        url: `${isPreprintVersionSummary(current) ? `/reviewed-preprints/${current.id}` : ''}${isExternalVersionSummary(current) ? current.url : ''}`,
        version: versionNo,
        date: new Date(current.published).toDateString(),
        ...(isPreprintVersionSummary(current) ? {
          versionIndicator: `v${versionNo}`,
        } : {}),
      });
      if (isExternalVersionSummary(current) && current.corrections) {
        current.corrections.forEach((correction) => {
          events.push(
            {
              name: getNameWithVersionSuffix(
                'external_timeline_version_title',
                versionNo,
                lastVersion,
              ),
              url: correction.url,
              version: versionNo,
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
