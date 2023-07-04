import { EnhancedArticleWithVersions } from '../types';
import { TimelineEvent } from '../components/molecules/timeline/timeline';

export const generateTimeline = (version: EnhancedArticleWithVersions): TimelineEvent[] => {
  // Extra sort here the top to ascertain the first version for getting dates
  const versions = Object.values(version.versions).sort((a, b) => new Date(b.preprintPosted).getTime() - new Date(a.preprintPosted).getTime());
  const timeline: TimelineEvent[] = versions.reduce<TimelineEvent[]>((events, current) => {
    if (current.published) {
      events.push(current.id === version.article.id ?
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
        });
    }
    return events;
  }, []);

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

  return timeline.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};
