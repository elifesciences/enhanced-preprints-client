import { t } from 'i18next';
import { type TimelineEvent } from "./timeline-event";
import {
  type VersionSummary,
} from '../../../types';
import { generateNameWithEvaluationSummarySuffix } from '../../../utils/generators/generate-name-with-evaluation-summary-suffix';
import {
  isExternalVersionSummary,
  isPreprintVersionSummary,
  isVORVersionSummary,
} from '../../../utils/type-guards';

const generateTimelineUrl = (version: VersionSummary): string => {
  if (isPreprintVersionSummary(version)) {
    return `/reviewed-preprints/${version.id}`;
  }
  if (isVORVersionSummary(version)) {
    return `/articles/${version.id}`;
  }
  if (isExternalVersionSummary(version)) {
    return version.url;
  }

  return '';
};

export const translateTimeline = (timeline: TimelineEvent[]) => timeline.map(({
  name, version, datePrefix, ...other
}) => ({
  version,
  ...other,
  ...(name ? {
    name: t(name),
  } : {}),
  ...(datePrefix ? { datePrefix: t(datePrefix) } : {}),
}));

export const constructTimeline = (versions: VersionSummary[]): TimelineEvent[] => {
  const timeline: TimelineEvent[] = versions.reduce<TimelineEvent[]>((events, current) => {
    if (current.published) {
      const versionNo = +current.versionIdentifier;
      const withEvaluationSummary = (isPreprintVersionSummary(current) && current.withEvaluationSummary) ?? false;
      events.push({
        name: generateNameWithEvaluationSummarySuffix(
          `${isVORVersionSummary(current) ? 'vor_' : ''}${isExternalVersionSummary(current) ? 'external_' : ''}timeline_version_title`,
          versionNo,
          withEvaluationSummary,
        ),
        url: generateTimelineUrl(current),
        version: versionNo,
        date: new Date(current.published).toDateString(),
        ...(isPreprintVersionSummary(current) ? {
          versionIndicator: `v${versionNo}`,
        } : {}),
        ...(withEvaluationSummary ? { withEvaluationSummary } : {}),
        ...(isVORVersionSummary(current) ? { versionOfRecord: true } : {}),
      });
      if (isExternalVersionSummary(current) && current.corrections) {
        current.corrections.forEach((correction) => {
          events.push(
            {
              name: 'external_timeline_version_title',
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
