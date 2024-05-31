import { Fragment } from 'react';
import '../../../i18n';
import './improved-timeline.scss';
import { useTranslation } from 'react-i18next';

export type ImprovedTimelineEvent = {
  version: number,
  date: string,
};

export type ImprovedTimelineProps = {
  events: Array<ImprovedTimelineEvent>,
};

const formatDate = (date: string): string => new Date(date).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

export const ImprovedTimeline = ({ events }: ImprovedTimelineProps) => {
  const { t } = useTranslation();
  return (
    <dl className="improved-review-timeline">
      {
        events.map((event, index) => {
          const typeClass = `improved-review-timeline__${event.version > 1 ? 'revised' : 'reviewed'}`;
          return (
            <Fragment key={index}>
              <dt className={`improved-review-timeline__event ${typeClass}`}>Reviewed Preprint</dt>
              <dd className={`improved-review-timeline__detail ${typeClass}`}>
                <span className="improved-review-timeline__version">{`v${event.version}`}</span>
                <time className="improved-review-timeline__date" dateTime={event.date.toString()}>{formatDate(event.date)}</time>
                <a className="improved-review-timeline__link" href={t('process_url')}>{event.version > 1 ? 'Revised by authors' : 'Not revised'}</a>
              </dd>
            </Fragment>
          );
        })
      }
    </dl>
  );
};
