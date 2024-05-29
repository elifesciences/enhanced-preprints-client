import { Fragment } from 'react';
import './improved-timeline.scss';

type ImprovedTimelineItem = {
  version: number,
  date: string,
};

type ImprovedTimelineProps = {
  items: Array<ImprovedTimelineItem>,
};

const formatDate = (date: string): string => new Date(date).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

export const ImprovedTimeline = ({ items }: ImprovedTimelineProps) => (
  <dl className="improved-review-timeline">
    {
      items.map((item, index) => {
        const typeClass = `improved-review-timeline__${item.version > 1 ? 'revised' : 'reviewed'}`;
        return (
          <Fragment key={index}>
            <dt className={`improved-review-timeline__event ${typeClass}`}>Reviewed preprint</dt>
            <dd className={`improved-review-timeline__detail ${typeClass}`}>
              <span className="improved-review-timeline__version">{`v${item.version}`}</span>
              <time className="improved-review-timeline__date" dateTime={item.date.toString()}>{formatDate(item.date)}</time>
              <span className="improved-review-timeline__description">{item.version > 1 ? 'Revised by authors' : 'Not revised'}</span>
            </dd>
          </Fragment>
        );
      })
    }
  </dl>
);
