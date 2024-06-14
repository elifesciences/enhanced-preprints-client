import { Fragment, useEffect, useState } from 'react';
import '../../../i18n';
import './timeline.scss';
import { formatDate } from '../../../utils/formatters';
import { TimelineEvent } from '../../../types';

export type TimelineProps = {
  current?: number;
  events: Array<TimelineEvent>,
};

export const Timeline = ({ current, events }: TimelineProps) => {
  const sortedEvents = events.sort((a, b) => b.version - a.version);
  const [expanded, setExpanded] = useState<boolean | null>(null);

  useEffect(() => setExpanded(false), []);
  const expansionText = `${expanded ? 'Hide' : 'Show'} ${sortedEvents.length > 1 && sortedEvents[0].version === current ? `previous version${sortedEvents.length > 2 ? 's' : ''}` : 'all versions'}`;
  return (
    <div className="review-timeline-container">
      <dl className={`review-timeline${expanded !== false ? ' review-timeline--expanded' : ''}`} id="review-timeline">
        {
          sortedEvents.map((event, index) => {
            const typeClass = (sortedEvents.length === 1 || (current && current === event.version)) ? (` review-timeline__event--${event.version > 1 ? 'revised' : 'reviewed'}`) : '';
            const hidden = (current && current !== event.version && expanded === false);
            const eventName = event.name ?? 'Reviewed Preprint';
            return (
              <Fragment key={index}>
                <dt className={`review-timeline__event${typeClass}`}{...(hidden ? { style: { display: 'none' } } : {})}>
                  {(current && current !== event.version) ? (
                    <a href={event.url} className="review-timeline__event-link">
                      {eventName}
                    </a>
                  ) : (
                    eventName
                  )}
                </dt>
                <dd className={`review-timeline__detail${typeClass}`}{...(hidden ? { style: { display: 'none' } } : {})}>
                  {event.versionIndicator && <span className="review-timeline__version">{event.versionIndicator}</span>}
                  <time className="review-timeline__date"
                    dateTime={event.date.toISOString()}>{formatDate(event.date)}</time>
                  {typeClass && <a className="review-timeline__link"
                    href={`${event.url}/reviews#review-process`}>{event.version > 1 ? 'Revised by authors' : 'Not revised'}</a>}
                </dd>
              </Fragment>
            );
          })
        }
      </dl>
      {(sortedEvents.length > 1 && expanded !== null) &&
      <button aria-controls="review-timeline" aria-expanded={expanded}
        className={`review-timeline__expansion${expanded ? ' review-timeline__expansion--expanded' : ''}`}
        onClick={() => setExpanded(!expanded)}>{expansionText}</button>}
    </div>
  );
};
