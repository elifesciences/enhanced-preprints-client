import { Fragment } from 'react';
import styles from './timeline.module.scss';

type TimelineProps = {
  events?: {
    name: string,
    date: Date,
  }[],
};

const defaultEvents = [
  { name: 'Author response', date: new Date('2022-03-06') },
  { name: 'Peer review', date: new Date('2022-03-03') },
  { name: 'Preprint posted', date: new Date('2021-11-08') },
];

export const Timeline = ({ events = defaultEvents }: TimelineProps): JSX.Element => (
  <div className={styles['review-timeline']}>
    <dl className={styles['review-timeline__list']}>
      {
        events.map((entry, index) => (
          <Fragment key={index}>
            <dt className={styles['review-timeline__event']}>{entry.name}</dt>
            <dd className={styles['review-timeline__date']}>{entry.date.toLocaleString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</dd>
          </Fragment>
        ))
      }
    </dl>
    <a className={styles['review-timeline__reviews_link']}>
      Read the peer-review by eLife
    </a>
  </div>
);
