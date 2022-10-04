import { Fragment } from 'react';
import styles from './timeline.module.scss';

export type TimelineEvent = {
  name: string,
  date: string,
};

type TimelineProps = {
  events: TimelineEvent[],
};

export const Timeline = ({ events }: TimelineProps): JSX.Element => (
  <div className={styles['review-timeline']}>
    <dl className={styles['review-timeline__list']}>
      {
        events.map((entry, index) => (
          <Fragment key={index}>
            <dt className={styles['review-timeline__event']}>{entry.name}</dt>
            <dd className={styles['review-timeline__date']}>{new Date(entry.date).toLocaleString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</dd>
          </Fragment>
        ))
      }
    </dl>
    <a className={styles['review-timeline__reviews_link']}>
      Read the peer-review by eLife
    </a>
  </div>
);
