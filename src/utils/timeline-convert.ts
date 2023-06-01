import { TimelineEvent } from '../components/molecules/timeline/timeline';
import { Timeline } from '../types/enhanced-article';

export const convertTimeline = (events?: Timeline[]) => (events ? events.sort((a, b) => b.date.getTime() - a.date.getTime())
  .map<TimelineEvent>((event: Timeline) => ({
  name: event.name,
  date: event.date.toDateString(),
  link: event.url ? {
    text: 'Link',
    url: event.url,
  } : undefined,
  eventDescription: event.name ?? '',
})) : []);
