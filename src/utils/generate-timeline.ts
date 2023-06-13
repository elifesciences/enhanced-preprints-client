import { EnhancedArticleWithVersions } from '../types';
import { TimelineEvent } from '../components/molecules/timeline/timeline';

export const generateTimeline = (version: EnhancedArticleWithVersions): TimelineEvent[] => {
  const versions = [...Object.values(version.versions), version.article].sort((a, b) => a.published.getTime() - b.published.getTime());
  const timeline: TimelineEvent[] = versions.length === 1 ? [{
    date: new Date(version.article.published).toDateString(),
    name: 'Reviewed preprint posted',
    eventDescription: '(this version)',
  }] : versions.map<TimelineEvent>((current) => (current.id === version.article.id ?
    {
      date: new Date(current.published).toDateString(),
      name: `Reviewed preprint version ${current.versionIdentifier}`,
      eventDescription: '(this version)',
    } : {
      date: new Date(current.published).toDateString(),
      name: `Reviewed preprint version ${current.versionIdentifier}`,
      link: {
        url: `/reviewed-preprints/${current.id}`,
        text: 'Go to version',
      },
    }));

  if (versions[0].preprintPosted !== undefined) {
    timeline.push({
      date: new Date(versions[0].preprintPosted).toDateString(),
      name: 'Posted to bioRxiv',
      link: {
        url: `https://doi.org/${versions[0].preprintDoi}`,
        text: 'Go to bioRxiv',
      },
    });
  }

  if (versions[0].sentForReview !== undefined) {
    timeline.push({
      date: new Date(versions[0].sentForReview).toDateString(),
      name: 'Sent for peer review',
    });
  }

  return timeline;
};
