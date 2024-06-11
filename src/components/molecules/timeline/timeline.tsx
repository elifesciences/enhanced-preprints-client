import { Fragment, useEffect, useState } from 'react';
import '../../../i18n';
import './timeline.scss';
import { useTranslation } from 'react-i18next';
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
  const displayEvents = expanded !== false ? sortedEvents : sortedEvents.filter((event, index) => (current && event.version === current) || (!current && index === 0));
  const expansionText = `${expanded ? 'Hide' : 'Show'} ${sortedEvents.length > 1 && sortedEvents[0].version === current ? `previous version${sortedEvents.length > 2 ? 's' : ''}` : 'all versions'}`;
  const { t } = useTranslation();
  return (
    <dl className="review-timeline">
      {
        displayEvents.map((event, index) => {
          const typeClass = (sortedEvents.length === 1 || (current && current === event.version)) ? (` review-timeline__event--${event.version > 1 ? 'revised' : 'reviewed'}`) : '';
          return (
            <Fragment key={index}>
              <dt className={`review-timeline__event${typeClass}`}>
                {(current && current !== event.version) && event.url ? (
                  <a href={event.url} className="review-timeline__event-link">
                    {event.name ?? 'Reviewed Preprint'}
                  </a>
                ) : (
                  event.name ?? 'Reviewed Preprint'
                )}
              </dt>
              <dd className={`review-timeline__detail${typeClass}`}>
                {event.versionIndicator && <span className="review-timeline__version">{event.versionIndicator}</span>}
                <time className="review-timeline__date" dateTime={event.date.toISOString()}>{formatDate(event.date)}</time>
                {typeClass && <a className="review-timeline__link" href={t('process_url')}>{event.version > 1 ? 'Revised by authors' : 'Not revised'}</a>}
              </dd>
            </Fragment>
          );
        })
      }
      {(sortedEvents.length > 1 && expanded !== null) &&
      <span className={`review-timeline__expansion${expanded ? ' review-timeline__expansion--expanded' : ''}`} onClick={() => setExpanded(!expanded)}>{expansionText}</span>}
    </dl>
  );
};
