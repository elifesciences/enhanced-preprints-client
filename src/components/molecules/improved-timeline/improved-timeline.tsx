import { Fragment, useEffect, useState } from 'react';
import '../../../i18n';
import './improved-timeline.scss';
import { useTranslation } from 'react-i18next';

type ImprovedTimelineEvent = {
  name?: string,
  url: string,
  version: number,
  versionIndicator?: string,
  date: string,
};

type ImprovedTimelineProps = {
  current?: number;
  events: Array<ImprovedTimelineEvent>,
};

const formatDate = (date: string): string => new Date(date).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

export const ImprovedTimeline = ({ current, events }: ImprovedTimelineProps) => {
  const [expanded, setExpanded] = useState<boolean | null>(null);

  useEffect(() => setExpanded(false), []);
  const displayEvents = events.filter((event, index) => expanded || (current && event.version === current) || (!current && index === 0));
  const expansionText = `${expanded ? 'Hide' : 'Show'} ${events.length > 1 && events[0].version === current ? `previous version${events.length > 2 ? 's' : ''}` : 'all versions'}`;
  const { t } = useTranslation();
  return (
    <dl className="improved-review-timeline">
      {
        displayEvents.map((event, index) => {
          const typeClass = (events.length === 1 || (current && current === event.version)) ? (` improved-review-timeline__event--${event.version > 1 ? 'revised' : 'reviewed'}`) : '';
          return (
            <Fragment key={index}>
              <dt className={`improved-review-timeline__event${typeClass}`}>
                {(current && current !== event.version) && event.url ? (
                  <a href={event.url} className="improved-review-timeline__event-link">
                    {event.name ?? 'Reviewed Preprint'}
                  </a>
                ) : (
                  event.name ?? 'Reviewed Preprint'
                )}
              </dt>
              <dd className={`improved-review-timeline__detail${typeClass}`}>
                {event.versionIndicator && <span className="improved-review-timeline__version">{event.versionIndicator}</span>}
                <time className="improved-review-timeline__date" dateTime={event.date.toString()}>{formatDate(event.date)}</time>
                {typeClass && <a className="improved-review-timeline__link" href={t('process_url')}>{event.version > 1 ? 'Revised by authors' : 'Not revised'}</a>}
              </dd>
            </Fragment>
          );
        })
      }
      {(events.length > 1 && expanded !== null) && <span className={`improved-review-timeline__expansion${expanded ? ' improved-review-timeline__expansion--expanded' : ''}`} onClick={() => setExpanded(!expanded)}>{expansionText}</span>}
    </dl>
  );
};
