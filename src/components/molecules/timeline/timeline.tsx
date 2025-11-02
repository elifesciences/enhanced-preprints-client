import { Fragment, useEffect, useState } from 'react';
import './timeline.scss';
import { useTranslation } from 'react-i18next';
import { formatDate } from '../../../utils/formatters';
import { type TimelineEvent } from '../../../types';

export type TimelineProps = {
  current?: number;
  events: Array<TimelineEvent>,
};

const constructEventType = (version: number, versionOfRecord: boolean) => {
  if (versionOfRecord) {
    return 'version-of-record';
  }
  return version > 1 ? 'revised' : 'reviewed';
};

export const Timeline = ({ current, events }: TimelineProps) => {
  const sortedEvents = events.sort((a, b) => b.version - a.version);
  const [expanded, setExpanded] = useState<boolean | null>(null);
  const { t } = useTranslation();

  useEffect(() => setExpanded(false), []);
  const expansionText = `${expanded ? 'Hide' : 'Show'} ${sortedEvents.length > 1 && sortedEvents[0].version === current ? `previous version${sortedEvents.length > 2 ? 's' : ''}` : 'all versions'}`;
  return (
    <div className="review-timeline-container">
      <dl className={`review-timeline${expanded !== false ? ' review-timeline--expanded' : ''}`} id="review-timeline" aria-label="Version history">
        {
          sortedEvents.map((event, index) => {
            const typeEventClass = ` review-timeline__event--${constructEventType(event.version, event.versionOfRecord ?? false)}`;
            const activeEventClass = (sortedEvents.length === 1 || (current && current === event.version)) ? ' review-timeline__event--active' : '';
            const evaluationSummaryClass = event.withEvaluationSummary ? ' review-timeline__event--with-evaluation-summary' : '';
            const hidden = (current && current !== event.version && expanded === false);
            const eventName = event.name ?? 'Reviewed Preprint';
            return (
              <Fragment key={index}>
                <dt className={`review-timeline__event review-timeline__event--title${typeEventClass}${activeEventClass}${evaluationSummaryClass}`}{...(hidden ? { style: { display: 'none' } } : {})}>
                  {(current && current !== event.version) ? (
                    <a href={event.url} className="review-timeline__event-link">
                      {eventName}
                    </a>
                  ) : (
                    eventName
                  )}
                </dt>
                <dd className={`review-timeline__event review-timeline__event--detail${typeEventClass}${activeEventClass}${evaluationSummaryClass}`}{...(hidden ? { style: { display: 'none' } } : {})}>
                  {event.versionIndicator && <span className="review-timeline__version">{event.versionIndicator}</span>}
                  {event.datePrefix && <span className="review-timeline__date-prefix">{event.datePrefix}</span>}
                  <time className="review-timeline__date"
                    dateTime={event.date.toISOString()}>{formatDate(event.date)}</time>
                  {activeEventClass && <a className="review-timeline__link"
                    href={`${event.url}/reviews#review-process`}>{event.version > 1 ? t('revised') : t('not_revised')}</a>}
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
