import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import './timeline.scss';
import '../../../i18n';

type TimelineEventBasic = {
  name: string,
  date: string,
};

type TimelineEventSimple = TimelineEventBasic & {
  link?: undefined,
  eventDescription?: undefined,
};

type TimelineEventWithLink = TimelineEventBasic & {
  link: {
    text: string,
    url?: string,
  },
  eventDescription?: undefined,
};

type TimelineEventWithDescription = TimelineEventBasic & {
  link?: undefined,
  eventDescription: string,
};

export type TimelineEvent = TimelineEventSimple | TimelineEventWithLink | TimelineEventWithDescription;

type TimelineProps = {
  events: Array<TimelineEvent>,
};

const formatDate = (date: string): string => new Date(date).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

export const Timeline = ({ events }: TimelineProps) => {
  const { t } = useTranslation();
  return (
    <div className="review-timeline">
      <dl className="review-timeline__list" aria-label={t('aria_label_timeline')}>
        {
          events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((entry, index) => (
            <Fragment key={index}>
              <dt className="review-timeline__event">{entry.name}</dt>
              <dd className="review-timeline__date">
                <time dateTime={entry.date.toString()}>{formatDate(entry.date)}</time>
                {entry.link && <a className="review-timeline__link" href={entry.link.url} aria-label={entry.name}>{entry.link.text}</a>}
                {entry.eventDescription && <span className="review-timeline__description"> {entry.eventDescription}</span>}
              </dd>
            </Fragment>
          ))
        }
      </dl>
    </div>
  );
};
