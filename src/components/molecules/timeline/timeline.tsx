import { Fragment } from 'react';
import styles from './timeline.module.scss';

export type TimelineEvent = {
  name: string,
  date: string,
  link?: {
    text: string,
    url: string,
  }
};

type TimelineProps = {
  events: TimelineEvent[],
};

const formatDate = (date: string): string => new Date(date).toLocaleString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' });

export const Timeline = ({ events }: TimelineProps): JSX.Element => (
  <div className={styles['review-timeline']}>
    <dl className={styles['review-timeline__list']}>
      {
        events.map((entry, index) => (
          <Fragment key={index}>
            <dt className={styles['review-timeline__event']}>{entry.name}</dt>
            <dd className={styles['review-timeline__date']}>
              <span>{formatDate(entry.date)}</span>
              { entry.link && <a className={styles['review-timeline__link']} href={entry.link.url}>{entry.link.text}</a>}
            </dd>
          </Fragment>
        ))
      }
    </dl>
  </div>
);
