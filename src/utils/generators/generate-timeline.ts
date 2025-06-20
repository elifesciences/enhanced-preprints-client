import {
  VersionSummary,
} from '../../types';
import {
  isExternalVersionSummary,
  isPreprintVersionSummary,
  isVORVersionSummary,
} from '../type-guards';
import { SerialisedTimelineEvent } from '../../types/article-timeline';
import { generateNameWithEvaluationSummarySuffix } from './generate-name-with-evaluation-summary-suffix';

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

export const generateTimeline = (versions: VersionSummary[]): SerialisedTimelineEvent[] => {
  const timeline: SerialisedTimelineEvent[] = versions.reduce<SerialisedTimelineEvent[]>((events, current) => {
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
