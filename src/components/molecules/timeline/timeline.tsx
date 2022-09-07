import { Fragment } from 'react';
import './timeline.scss';

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
  <div className="review-timeline">
    <dl className="review-timeline__list">
      {
        events.map((entry, index) => (
          <Fragment key={index}>
            <dt className="review-timeline__event">{entry.name}</dt>
            <dd className="review-timeline__date">{entry.date.toLocaleDateString()}</dd>
          </Fragment>
        ))
      }
    </dl>
    <a className="review-timeline__reviews_link">
      Read the peer-review by eLife
    </a>
  </div>
);
