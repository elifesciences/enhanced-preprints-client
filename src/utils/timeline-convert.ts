import { TimelineEvent } from '../components/molecules/timeline/timeline';
import { Timeline } from '../types/enhanced-article';

export const convertTimeline = (events?: Timeline[], preprintServer?: string, currentVersion?: number) => {
  if (events) {
    const versions = events.filter((event) => event.name === 'VERSION_PUBLISHED').length;
    return events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .map<TimelineEvent>((event: Timeline, index: number) => {
      switch (event.name) {
        case 'SENT_FOR_REVIEW':
          return {
            date: new Date(event.date).toDateString(),
            name: 'Sent for peer review',
          };
        case 'PREPRINT_PUBLISHED':
          return {
            date: new Date(event.date).toDateString(),
            name: preprintServer ? `Posted to ${preprintServer}` : 'Preprint posted',
            link: {
              url: event.url,
              text: preprintServer ? `Go to ${preprintServer}` : 'Go to preprint',
            },
          };
        case 'VERSION_PUBLISHED':
          return versions === 1 || (versions > 1 && index === currentVersion) ? {
            date: new Date(event.date).toDateString(),
            name: 'Reviewed preprint posted',
            eventDescription: '(this version)',
          } : {
            date: new Date(event.date).toDateString(),
            name: 'Reviewed preprint posted',
            link: {
              url: event.url,
              text: 'Go to version',
            },
          };
        default:
          return {
            date: new Date().toDateString(),
            name: 'Nothing',
          };
      }
    });
  } return [];
};
