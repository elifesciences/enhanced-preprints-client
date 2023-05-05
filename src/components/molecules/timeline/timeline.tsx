import { Fragment } from 'react';
import './timeline.scss';

export type TimelineEvent = {
  name: string,
  date: string,
  link?: {
    text: string,
    url?: string,
  },
  eventDescription?: string,
};

type TimelineProps = {
  events: TimelineEvent[],
  listDescription?: string,
};

const formatDate = (date: string): string => new Date(date).toLocaleString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' });

export const Timeline = ({ events, listDescription }: TimelineProps): JSX.Element => (
  <div className="review-timeline">
    <dl className="review-timeline__list" aria-label={listDescription}>
      {
        events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((entry, index) => (
          <Fragment key={index}>
            <dt className="review-timeline__event">{entry.name}</dt>
            <dd className="review-timeline__date">
              {formatDate(entry.date)}
              { entry.link && <a className="review-timeline__link" href={entry.link.url} aria-label={entry.eventDescription ?? entry.name}>{entry.link.text}</a>}
              {!entry.link && entry.eventDescription && <span className="review-timeline__description">{entry.eventDescription}</span>}
            </dd>
          </Fragment>
        ))
      }
    </dl>
  </div>
);
