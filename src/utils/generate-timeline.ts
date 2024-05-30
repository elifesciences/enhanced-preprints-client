import { i18n } from '../i18n';
import {
  EnhancedArticleWithVersions, VersionSummary, TimelineEvent,
} from '../types';
import { ExternalVersionSummary, PreprintVersionSummary } from '../types/enhanced-article';

const isPreprintVersionSummary = (version: VersionSummary): version is PreprintVersionSummary => Object.hasOwn(version, 'preprintPosted');
const isExternalVersionSummary = (version: VersionSummary): version is ExternalVersionSummary => Object.hasOwn(version, 'url');
const orderVersionsChronologically = (versions: VersionSummary[]) => versions.filter(isPreprintVersionSummary).sort((a, b) => new Date(a.preprintPosted).getTime() - new Date(b.preprintPosted).getTime());
const getFirstVersion = (version: EnhancedArticleWithVersions) => orderVersionsChronologically(Object.values(version.versions))[0];

export const generateTimeline = (version: EnhancedArticleWithVersions): TimelineEvent[] => {
  const timeline: TimelineEvent[] = Object.values(version.versions).reduce<TimelineEvent[]>((events, current) => {
    if (current.published) {
      events.push({
        date: new Date(current.published).toDateString(),
        // If external version summary then prefix with external_
        name: i18n.t(`${isExternalVersionSummary(current) ? 'external_' : ''}timeline_version_title`, { versionIdentifier: current.versionIdentifier }),
        ...(isPreprintVersionSummary(current) && current.id === version.article.id ?
          {
            eventDescription: '(this version)',
          } : {
            link: {
              url: `${isPreprintVersionSummary(current) ? `/reviewed-preprints/${current.id}` : ''}${isExternalVersionSummary(current) ? current.url : ''}`,
              text: 'Go to version',
            },
          }
        ),
      });
    }
    return events;
  }, []);

  const firstVersion = getFirstVersion(version);

  if (firstVersion.preprintPosted !== undefined) {
    timeline.push({
      date: new Date(firstVersion.preprintPosted).toDateString(),
      name: 'Posted to preprint server',
      link: {
        url: `https://doi.org/${firstVersion.preprintDoi}`,
        text: 'Go to preprint server',
      },
    });
  }

  if (firstVersion.sentForReview !== undefined) {
    timeline.push({
      date: new Date(firstVersion.sentForReview).toDateString(),
      name: 'Sent for peer review',
    });
  }

  return timeline.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};
