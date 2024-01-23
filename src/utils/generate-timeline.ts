import {
  EnhancedArticleWithVersions, VersionSummary, TimelineEvent,
} from '../types';

const orderVersionsChronologically = (versions: VersionSummary[]) => versions.sort((a, b) => new Date(a.preprintPosted).getTime() - new Date(b.preprintPosted).getTime());
const getFirstVersion = (version: EnhancedArticleWithVersions) => orderVersionsChronologically(Object.values(version.versions))[0];

export const generateTimeline = (version: EnhancedArticleWithVersions): TimelineEvent[] => {
  const timeline: TimelineEvent[] = Object.values(version.versions).reduce<TimelineEvent[]>((events, current) => {
    if (current.published) {
      events.push({
        date: new Date(current.published).toDateString(),
        name: 'Endorsed article published',
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
