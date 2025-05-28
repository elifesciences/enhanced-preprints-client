import {
  VersionHistoryItem,
  VersionSummary,
} from '../../types';
import { isExternalVersionSummary, isPreprintVersionSummary, isVORVersionSummary } from '../type-guards';
import { generateNameWithEvaluationSummarySuffix } from './generate-name-with-evaluation-summary-suffix';

const constructHistoryItemLabel = (version: VersionSummary) => {
  if (isVORVersionSummary(version)) {
    return 'history_version_of_record_title';
  }
  if (isExternalVersionSummary(version)) {
    return 'external_history_version_title';
  }
  return 'history_version_title';
};

const constructHistoryItemUrl = (version: VersionSummary) => {
  if (isPreprintVersionSummary(version)) {
    return `/reviewed-preprints/${version.id}`;
  }
  if (isExternalVersionSummary(version)) {
    return version.url;
  }
  return '';
};

export const generateVersionHistory = (versions: VersionSummary[]): VersionHistoryItem[] => {
  const history: VersionHistoryItem[] = versions.reduce<VersionHistoryItem[]>((events, current) => {
    if (current.published) {
      const versionNo = +current.versionIdentifier;
      const withEvaluationSummary = (isPreprintVersionSummary(current) && current.withEvaluationSummary) ?? false;
      events.push({
        label: generateNameWithEvaluationSummarySuffix(
          constructHistoryItemLabel(current),
          versionNo,
          withEvaluationSummary,
        ),
        url: constructHistoryItemUrl(current),
        date: new Date(current.published).toDateString(),
        version: versionNo,
      });

      if (isExternalVersionSummary(current) && (current.corrections ?? []).length > 0) {
        events.push(...(current.corrections ?? []).map((correction) => ({
          label: 'external_history_version_title_updated',
          url: correction.url,
          date: new Date(correction.date).toDateString(),
          version: versionNo,
        })));
      }
    }
    return events;
  }, []);

  const firstVersion = versions.filter(isPreprintVersionSummary)
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
